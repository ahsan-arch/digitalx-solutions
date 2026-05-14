"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/schemas/voice-agent";
import { voices as voiceCatalog, type Voice } from "./voices";
import {
  assignBrowserVoices,
  loadBrowserVoices,
  SILENT_WAV,
  speakWithBrowser,
} from "./web-speech";
import { startContinuousRecorder, type Recorder } from "./audio-recorder";

export type AgentStatus =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "error"
  | "ended";

export type TranscriptEntry = { role: "user" | "assistant"; text: string };

type UseVoiceAgentOptions = {
  systemPrompt: string;
  voice: Voice;
  onError?: (message: string) => void;
};

/** Sentence boundary detector — also flushes long clauses so TTS feels snappy. */
function takeFlushable(buffer: string): { sentence: string | null; rest: string } {
  const match = buffer.match(/[.!?][)"'\s]*\s|[\n]/);
  if (match && match.index !== undefined) {
    const end = match.index + match[0].length;
    return { sentence: buffer.slice(0, end).trim(), rest: buffer.slice(end) };
  }
  if (buffer.length > 120) {
    const commaIdx = buffer.lastIndexOf(", ", 110);
    if (commaIdx > 40) {
      return {
        sentence: buffer.slice(0, commaIdx + 1).trim(),
        rest: buffer.slice(commaIdx + 1),
      };
    }
  }
  return { sentence: null, rest: buffer };
}

export function useVoiceAgent({ systemPrompt, voice, onError }: UseVoiceAgentOptions) {
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [interim, setInterim] = useState<string>("");
  const [premiumFallbackNotice, setPremiumFallbackNotice] = useState(false);
  const [micAvailable, setMicAvailable] = useState<boolean | null>(null);

  const messagesRef = useRef<ChatMessage[]>([]);
  const recorderRef = useRef<Recorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const speakAbortRef = useRef<AbortController | null>(null);
  const browserVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const activeRef = useRef(false);

  /* ───────── Load + pick browser voice once (deduped against full catalog) ───────── */
  useEffect(() => {
    let cancelled = false;
    loadBrowserVoices().then((list) => {
      if (cancelled) return;
      const assignments = assignBrowserVoices(voiceCatalog, list);
      browserVoiceRef.current = assignments.get(voice.id) ?? null;
    });
    return () => {
      cancelled = true;
    };
  }, [voice]);

  /* ───────── Cleanup on unmount ───────── */
  useEffect(() => {
    return () => {
      activeRef.current = false;
      recorderRef.current?.stop();
      recorderRef.current = null;
      try {
        abortRef.current?.abort();
      } catch {}
      try {
        speakAbortRef.current?.abort();
      } catch {}
      try {
        audioRef.current?.pause();
      } catch {}
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }
    };
  }, []);

  /** Play an audio Blob and resolve when ended / aborted. */
  const playAudioBlob = useCallback(
    (blob: Blob, signal: AbortSignal): Promise<void> => {
      return new Promise((resolve) => {
        const url = URL.createObjectURL(blob);
        const audio = audioRef.current ?? new Audio();
        audioRef.current = audio;
        audio.src = url;
        const onDone = () => {
          audio.removeEventListener("ended", onDone);
          audio.removeEventListener("error", onDone);
          URL.revokeObjectURL(url);
          resolve();
        };
        audio.addEventListener("ended", onDone);
        audio.addEventListener("error", onDone);
        signal.addEventListener(
          "abort",
          () => {
            try {
              audio.pause();
            } catch {}
            onDone();
          },
          { once: true }
        );
        audio.play().catch(onDone);
      });
    },
    []
  );

  /* ───────── Play a chunk of text in the chosen voice ─────────
   * Preference order:
   *   1. Groq PlayAI TTS  — cloud, same voice on every device, ~300ms latency
   *   2. ElevenLabs TTS   — when voice.kind === "premium" and key is set
   *   3. Browser TTS      — device-specific voices, instant fallback
   */
  const speakChunk = useCallback(
    async (text: string): Promise<void> => {
      if (!text.trim() || !activeRef.current) return;
      setStatus("speaking");

      const ctrl = new AbortController();
      speakAbortRef.current = ctrl;

      try {
        // Cloud TTS (Groq) — uniform voice across devices.
        if (voice.groqVoice) {
          try {
            const res = await fetch("/api/voice-agent/speech", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text, voice: voice.groqVoice }),
              signal: ctrl.signal,
            });
            if (res.ok && res.body) {
              const blob = await res.blob();
              if (blob.size > 0) {
                await playAudioBlob(blob, ctrl.signal);
                return;
              }
            }
            // res not ok → fall through to ElevenLabs or browser
          } catch {
            if (ctrl.signal.aborted) return;
          }
        }

        // ElevenLabs path (Premium voices)
        if (voice.kind === "premium" && voice.elevenLabsVoiceId) {
          try {
            const res = await fetch("/api/voice-agent/tts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text, voiceId: voice.elevenLabsVoiceId }),
              signal: ctrl.signal,
            });
            if (res.ok && res.headers.get("X-TTS-Fallback") !== "1") {
              const blob = await res.blob();
              if (blob.size > 0) {
                await playAudioBlob(blob, ctrl.signal);
                return;
              }
            }
            setPremiumFallbackNotice(true);
          } catch {
            if (ctrl.signal.aborted) return;
            setPremiumFallbackNotice(true);
          }
        }

        // Last resort: browser native TTS (device-specific voice).
        await speakWithBrowser(text, browserVoiceRef.current, ctrl.signal);
      } finally {
        if (speakAbortRef.current === ctrl) speakAbortRef.current = null;
      }
    },
    [voice, playAudioBlob]
  );

  /* ───────── Stream agent reply: LLM → sentence-by-sentence TTS ───────── */
  const generateAndSpeak = useCallback(async () => {
    if (!activeRef.current) return;
    recorderRef.current?.pause();
    setStatus("thinking");

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    let res: Response;
    try {
      res = await fetch("/api/voice-agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, messages: messagesRef.current }),
        signal: ctrl.signal,
      });
    } catch {
      if (ctrl.signal.aborted) return;
      setStatus("error");
      onError?.("Network error reaching the voice agent.");
      return;
    }

    if (!res.ok || !res.body) {
      if (ctrl.signal.aborted) return;
      setStatus("error");
      onError?.(
        res.status === 503
          ? "Voice agent temporarily unavailable. Add a GROQ_API_KEY to enable it."
          : "The voice agent couldn't respond. Please try again."
      );
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";
    let lastSpeak: Promise<void> = Promise.resolve();

    const enqueue = (sentence: string) => {
      fullText += (fullText ? " " : "") + sentence;
      setTranscript((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === "assistant") {
          return [...prev.slice(0, -1), { role: "assistant", text: fullText }];
        }
        return [...prev, { role: "assistant", text: fullText }];
      });
      lastSpeak = lastSpeak.then(() => speakChunk(sentence));
    };

    try {
      while (activeRef.current) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        while (true) {
          const { sentence, rest } = takeFlushable(buffer);
          if (!sentence) break;
          buffer = rest;
          enqueue(sentence);
        }
      }
    } catch {
      if (ctrl.signal.aborted) return;
    }

    if (buffer.trim()) enqueue(buffer.trim());
    await lastSpeak;

    if (fullText.trim()) {
      messagesRef.current = [
        ...messagesRef.current,
        { role: "assistant", content: fullText.trim() },
      ];
    }

    if (!activeRef.current) return;

    setStatus("listening");
    recorderRef.current?.resume();
  }, [systemPrompt, speakChunk, onError]);

  const generateAndSpeakRef = useRef(generateAndSpeak);
  useEffect(() => {
    generateAndSpeakRef.current = generateAndSpeak;
  }, [generateAndSpeak]);

  /* ───────── Public: start the call ───────── */
  const start = useCallback(async () => {
    if (activeRef.current) return;

    // Mobile audio unlock (must run inside the user click — before any await).
    // Two separate unlocks needed on iOS Safari:
    //   1. <audio> element — for ElevenLabs MP3 playback
    //   2. speechSynthesis — for browser TTS path
    // Each requires being invoked synchronously inside a user gesture.
    try {
      const audio = audioRef.current ?? new Audio();
      audio.src = SILENT_WAV;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } catch {}
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const unlock = new SpeechSynthesisUtterance(" ");
        unlock.volume = 0;
        unlock.rate = 1;
        window.speechSynthesis.speak(unlock);
        // Some iOS versions need an explicit cancel of the silent utterance
        // before the queue accepts the next real one.
        window.speechSynthesis.cancel();
      }
    } catch {}

    activeRef.current = true;
    messagesRef.current = [
      {
        role: "user",
        content:
          "Hi — this is a live test call. Please greet me and start the conversation.",
      },
    ];
    setTranscript([]);
    setInterim("");
    setPremiumFallbackNotice(false);
    setStatus("listening");

    let micFailureMessage: string | null = null;
    const recorder = await startContinuousRecorder({
      onSpeechStart: () => {
        if (!activeRef.current) return;
        setStatus("listening");
        setInterim("(you're speaking…)");
      },
      onSpeechEnd: () => {
        if (!activeRef.current) return;
        setInterim("transcribing…");
        setStatus("thinking");
      },
      onTurn: async (blob) => {
        if (!activeRef.current) return;
        try {
          const fd = new FormData();
          fd.append("audio", blob, "audio.webm");
          const res = await fetch("/api/voice-agent/transcribe", {
            method: "POST",
            body: fd,
          });
          if (!res.ok) {
            console.warn("[voice-agent] transcribe failed:", res.status);
            setInterim("");
            recorderRef.current?.resume();
            setStatus("listening");
            return;
          }
          const data = (await res.json()) as { text?: string };
          const cleaned = (data.text ?? "").trim();
          setInterim("");
          if (!cleaned) {
            recorderRef.current?.resume();
            setStatus("listening");
            return;
          }
          messagesRef.current = [
            ...messagesRef.current,
            { role: "user", content: cleaned },
          ];
          setTranscript((prev) => [...prev, { role: "user", text: cleaned }]);
          void generateAndSpeakRef.current();
        } catch (err) {
          console.warn("[voice-agent] transcribe error", err);
          setInterim("");
          if (activeRef.current) {
            recorderRef.current?.resume();
            setStatus("listening");
          }
        }
      },
      onError: (msg) => {
        // Capture mic failure but don't end the call — fall back to text input.
        micFailureMessage = msg;
      },
    });

    if (!recorder) {
      // Mic failed — continue in text-only mode.
      setMicAvailable(false);
      onError?.(
        (micFailureMessage ?? "Microphone unavailable.") +
          " You can still chat by typing in the box below."
      );
      void generateAndSpeakRef.current();
      return;
    }

    setMicAvailable(true);
    recorderRef.current = recorder;
    recorder.pause(); // Agent speaks first; resume after greeting.

    void generateAndSpeakRef.current();
  }, [onError]);

  /* ───────── Public: send a typed message (fallback when mic isn't available) ───────── */
  const sendText = useCallback((text: string) => {
    const cleaned = text.trim();
    if (!cleaned) return;
    if (!activeRef.current) {
      activeRef.current = true;
      if (messagesRef.current.length === 0) {
        messagesRef.current = [];
      }
      setPremiumFallbackNotice(false);
    }
    messagesRef.current = [
      ...messagesRef.current,
      { role: "user", content: cleaned },
    ];
    setTranscript((prev) => [...prev, { role: "user", text: cleaned }]);
    void generateAndSpeakRef.current();
  }, []);

  /* ───────── Public: stop the call ───────── */
  const stop = useCallback(() => {
    activeRef.current = false;
    recorderRef.current?.stop();
    recorderRef.current = null;
    try {
      abortRef.current?.abort();
    } catch {}
    abortRef.current = null;
    try {
      speakAbortRef.current?.abort();
    } catch {}
    speakAbortRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    try {
      audioRef.current?.pause();
    } catch {}
    setStatus("ended");
    setInterim("");
  }, []);

  return {
    status,
    transcript,
    interim,
    premiumFallbackNotice,
    micAvailable,
    start,
    stop,
    sendText,
  };
}
