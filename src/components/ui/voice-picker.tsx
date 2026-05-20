"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Mic, Sparkles, Volume2 } from "lucide-react";
import { voices, type Voice } from "@/lib/voice-agent/voices";
import {
  assignBrowserVoices,
  loadBrowserVoices,
  speakWithBrowser,
  SILENT_WAV,
} from "@/lib/voice-agent/web-speech";
import { cn } from "@/lib/utils";

const SAMPLE_TEXT = "Hi there! Thanks for calling. How can I help you today?";

type Props = {
  selectedId: string | null;
  onSelect: (voice: Voice) => void;
  onBack: () => void;
  onStart: () => void;
};

export function VoicePicker({ selectedId, onSelect, onBack, onStart }: Props) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [premiumUnavailable, setPremiumUnavailable] = useState(false);
  const assignmentsRef = useRef<Map<string, SpeechSynthesisVoice | null>>(new Map());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    loadBrowserVoices().then((list) => {
      assignmentsRef.current = assignBrowserVoices(voices, list);
    });
    return () => {
      abortRef.current?.abort();
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

  async function preview(voice: Voice) {
    abortRef.current?.abort();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    try {
      audioRef.current?.pause();
    } catch {}

    if (!audioRef.current) {
      const a = new Audio();
      a.src = SILENT_WAV;
      a.play().catch(() => {});
      audioRef.current = a;
    }

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setPlayingId(voice.id);

    const playBlob = (blob: Blob) =>
      new Promise<void>((resolve) => {
        const url = URL.createObjectURL(blob);
        const audio = audioRef.current ?? new Audio();
        audio.src = url;
        audioRef.current = audio;
        const done = () => {
          audio.removeEventListener("ended", done);
          audio.removeEventListener("error", done);
          URL.revokeObjectURL(url);
          resolve();
        };
        audio.addEventListener("ended", done);
        audio.addEventListener("error", done);
        ctrl.signal.addEventListener(
          "abort",
          () => {
            try {
              audio.pause();
            } catch {}
            done();
          },
          { once: true }
        );
        audio.play().catch(done);
      });

    try {
      // Primary: Microsoft Edge Neural TTS.
      if (voice.edgeTtsVoice) {
        const res = await fetch("/api/voice-agent/edge-tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: SAMPLE_TEXT, voice: voice.edgeTtsVoice }),
          signal: ctrl.signal,
        });
        if (res.ok) {
          const blob = await res.blob();
          if (blob.size > 0) {
            await playBlob(blob);
            return;
          }
        }
      }

      // Secondary: Groq PlayAI cloud TTS.
      if (voice.groqVoice) {
        const res = await fetch("/api/voice-agent/speech", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: SAMPLE_TEXT, voice: voice.groqVoice }),
          signal: ctrl.signal,
        });
        if (res.ok && res.body) {
          const blob = await res.blob();
          if (blob.size > 0) {
            await playBlob(blob);
            return;
          }
        }
      }

      if (voice.kind === "premium" && voice.elevenLabsVoiceId) {
        const res = await fetch("/api/voice-agent/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: SAMPLE_TEXT, voiceId: voice.elevenLabsVoiceId }),
          signal: ctrl.signal,
        });
        if (res.ok && res.headers.get("X-TTS-Fallback") !== "1") {
          const blob = await res.blob();
          if (blob.size > 0) {
            await playBlob(blob);
            return;
          }
        }
        setPremiumUnavailable(true);
      }

      const browserVoice = assignmentsRef.current.get(voice.id) ?? null;
      await speakWithBrowser(SAMPLE_TEXT, browserVoice, ctrl.signal);
    } catch {
      // ignore
    } finally {
      if (abortRef.current === ctrl) abortRef.current = null;
      setPlayingId((current) => (current === voice.id ? null : current));
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {voices.map((voice) => {
          const selected = selectedId === voice.id;
          const playing = playingId === voice.id;
          return (
            <button
              key={voice.id}
              type="button"
              onClick={() => {
                onSelect(voice);
                void preview(voice);
              }}
              className={cn(
                "group relative flex flex-col items-start gap-3 rounded-2xl border bg-white p-5 text-left transition",
                selected
                  ? "border-brand ring-2 ring-brand/30"
                  : "border-border hover:border-brand/40"
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full",
                      voice.kind === "premium"
                        ? "bg-brand/10 text-brand"
                        : "bg-foreground/5 text-foreground/60"
                    )}
                  >
                    {voice.kind === "premium" ? (
                      <Sparkles className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-foreground">{voice.label}</p>
                      {voice.badge && (
                        <span className="inline-flex items-center rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wider text-white shadow-sm">
                          {voice.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] uppercase tracking-wider text-foreground/50">
                      {voice.kind}
                    </p>
                  </div>
                </div>
                {selected && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
              <p className="text-xs text-foreground/65">{voice.description}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-100 px-2.5 py-1 text-[11px] font-medium text-foreground/70">
                <Volume2 className={cn("h-3 w-3", playing && "animate-pulse text-brand")} />
                {playing ? "Playing sample..." : "Click to hear sample"}
              </span>
            </button>
          );
        })}
      </div>

      {premiumUnavailable && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          Premium voices are not configured on this server. Picking a Premium voice will use the
          closest browser voice instead.
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-foreground/75 transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Edit survey
        </button>
        <button
          type="button"
          onClick={onStart}
          disabled={!selectedId}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          Start live call
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
