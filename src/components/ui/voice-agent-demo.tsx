"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, PhoneOff, Mic, Volume2, VolumeX } from "lucide-react";

// 40-byte silent WAV. Played once inside the click handler so mobile
// browsers (iOS Safari, mobile Chrome) "unlock" the audio element for
// later programmatic play() calls outside the user gesture.
const SILENT_WAV =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

export type DemoTurn = {
  speaker: "caller" | "agent";
  text: string;
  audioUrl?: string;
};

export type DemoScript = {
  businessName: string;
  agentName: string;
  turns: DemoTurn[];
};

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:300ms]" />
    </span>
  );
}

/* ── Sound-wave visualizer bar ── */
function SoundWave({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <span className="ml-2 inline-flex items-end gap-[2px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-current"
          style={{
            animation: `soundbar 0.6s ease-in-out ${i * 0.08}s infinite alternate`,
            height: `${6 + Math.random() * 8}px`,
          }}
        />
      ))}
    </span>
  );
}

export function VoiceAgentDemo({ script }: { script: DemoScript }) {
  const [isActive, setIsActive] = useState(false);
  const [visibleTurns, setVisibleTurns] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<"caller" | "agent" | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speakResolveRef = useRef<(() => void) | null>(null);
  const mutedRef = useRef(false);
  const isCancelledRef = useRef(false);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();
      } catch {}
      audioRef.current = null;
    }
    setIsSpeaking(false);
    if (speakResolveRef.current) {
      const r = speakResolveRef.current;
      speakResolveRef.current = null;
      r();
    }
  }, []);

  // Keep muted ref in sync; if user mutes mid-playback, pause the audio so
  // the conversation continues silently. We pause rather than destroying
  // the element so unmuting later still works (the audioRef stays "unlocked").
  useEffect(() => {
    mutedRef.current = muted;
    if (muted && audioRef.current) {
      try { audioRef.current.pause(); } catch {}
      setIsSpeaking(false);
      if (speakResolveRef.current) {
        const r = speakResolveRef.current;
        speakResolveRef.current = null;
        r();
      }
    }
  }, [muted]);

  const cleanup = useCallback(() => {
    isCancelledRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    if (animRef.current) clearTimeout(animRef.current);
    timerRef.current = null;
    animRef.current = null;
    stopAudio();
  }, [stopAudio]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleTurns, isTyping]);

  /* ── Play a pre-recorded MP3 for one turn ── */
  const speak = useCallback((audioUrl?: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !audioUrl || mutedRef.current || isCancelledRef.current) {
        resolve();
        return;
      }

      // Reuse the unlocked audio element created inside the click handler.
      const audio = audioRef.current;
      if (!audio) {
        resolve();
        return;
      }

      speakResolveRef.current = resolve;

      const finish = () => {
        audio.removeEventListener("ended", finish);
        audio.removeEventListener("error", finish);
        if (speakResolveRef.current === resolve) {
          speakResolveRef.current = null;
          setIsSpeaking(false);
          resolve();
        }
      };

      audio.addEventListener("ended", finish);
      audio.addEventListener("error", finish);

      audio.src = audioUrl;
      audio.load();
      setIsSpeaking(true);
      audio.play().catch(() => finish());
    });
  }, []);

  const startDemo = useCallback(() => {
    cleanup();
    isCancelledRef.current = false;
    setIsActive(true);
    setVisibleTurns(0);
    setCallDuration(0);
    setIsTyping(false);
    setCurrentSpeaker(null);

    // Mobile browsers (iOS Safari especially) require the first audio.play()
    // to come directly from a user gesture. Create the audio element here
    // inside the click handler and play a silent buffer to unlock it; later
    // turn audio can then play without a fresh gesture.
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = SILENT_WAV;
    audio.play().catch(() => {});
    audioRef.current = audio;

    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    let turnIndex = 0;

    async function showNext() {
      if (isCancelledRef.current || turnIndex >= script.turns.length) return;

      const turn = script.turns[turnIndex];
      setCurrentSpeaker(turn.speaker);
      setIsTyping(true);

      // Brief typing pause
      await new Promise((r) => {
        animRef.current = setTimeout(r, turn.speaker === "agent" ? 900 : 600);
      });

      if (isCancelledRef.current) return;

      // Show the message
      setIsTyping(false);
      setCurrentSpeaker(null);
      turnIndex++;
      setVisibleTurns(turnIndex);

      // Speak it
      await speak(turn.audioUrl);

      if (isCancelledRef.current) return;

      // Small pause between turns
      if (turnIndex < script.turns.length) {
        await new Promise((r) => {
          animRef.current = setTimeout(r, 400);
        });
        if (!isCancelledRef.current) {
          showNext();
        }
      }
    }

    animRef.current = setTimeout(showNext, 600);
  }, [script, cleanup, speak]);

  const endDemo = useCallback(() => {
    cleanup();
    setIsActive(false);
    setVisibleTurns(0);
    setCallDuration(0);
    setIsTyping(false);
    setCurrentSpeaker(null);
  }, [cleanup]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface-50 px-5 py-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                isActive ? "bg-green-100 text-green-600" : "bg-brand/10 text-brand"
              }`}
            >
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="flex items-center text-sm font-semibold text-foreground">
                {script.agentName}
                <SoundWave active={isSpeaking && currentSpeaker === null} />
              </p>
              <p className="text-xs text-foreground/55">
                AI Voice Agent for {script.businessName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isActive && (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-medium text-foreground/60">
                  {formatTime(callDuration)}
                </span>
              </>
            )}
            <button
              onClick={() => setMuted((m) => !m)}
              className="ml-1 rounded-full p-1.5 text-foreground/40 transition hover:bg-foreground/5 hover:text-foreground/70"
              title={muted ? "Unmute voice" : "Mute voice"}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Conversation area */}
        <div ref={scrollRef} className="h-[340px] overflow-y-auto p-4" style={{ scrollbarWidth: "none" }}>
          {!isActive && visibleTurns === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
                <Volume2 className="h-7 w-7 text-brand" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Hear how our AI handles calls for {script.businessName}
              </p>
              <p className="mt-1.5 max-w-xs text-xs text-foreground/60">
                Press play to listen to a live demo conversation — our AI voice agent answering, qualifying, and booking.
              </p>
            </div>
          )}

          {(isActive || visibleTurns > 0) && (
            <div className="space-y-3">
              {script.turns.slice(0, visibleTurns).map((turn, i) => (
                <div
                  key={i}
                  className={`flex ${turn.speaker === "caller" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      turn.speaker === "caller"
                        ? "rounded-br-md bg-brand text-white"
                        : "rounded-bl-md border border-border bg-surface-50 text-foreground/85"
                    }`}
                  >
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider opacity-60">
                      {turn.speaker === "caller" ? "Caller" : script.agentName}
                    </p>
                    {turn.text}
                  </div>
                </div>
              ))}

              {isTyping && currentSpeaker && (
                <div className={`flex ${currentSpeaker === "caller" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      currentSpeaker === "caller"
                        ? "rounded-br-md bg-brand text-white"
                        : "rounded-bl-md border border-border bg-surface-50 text-foreground/50"
                    }`}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 border-t border-border bg-surface-50 px-5 py-3">
          {!isActive ? (
            <button
              onClick={startDemo}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
            >
              <Phone className="h-4 w-4" />
              {visibleTurns > 0 ? "Replay demo call" : "Start demo call"}
            </button>
          ) : (
            <>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5">
                <Mic className="h-4 w-4 text-foreground/40" />
              </div>
              <button
                onClick={endDemo}
                className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                <PhoneOff className="h-4 w-4" />
                End call
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5">
                <Volume2 className="h-4 w-4 text-foreground/40" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
