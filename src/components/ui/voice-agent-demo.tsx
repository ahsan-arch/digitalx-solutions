"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, PhoneOff, Mic, Volume2, VolumeX } from "lucide-react";

export type DemoTurn = {
  speaker: "caller" | "agent";
  text: string;
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
  const mutedRef = useRef(false);
  const isCancelledRef = useRef(false);

  // Keep muted ref in sync
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const cleanup = useCallback(() => {
    isCancelledRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    if (animRef.current) clearTimeout(animRef.current);
    timerRef.current = null;
    animRef.current = null;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleTurns, isTyping]);

  /* ── Speak a line using Web Speech API ── */
  const speak = useCallback((text: string, speaker: "caller" | "agent"): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !window.speechSynthesis || mutedRef.current) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = speaker === "agent" ? 1.2 : 0.9;

      // Try to pick distinct voices
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(
        (v) => v.lang.startsWith("en") && /female|samantha|zira|karen|fiona/i.test(v.name)
      );
      const maleVoice = voices.find(
        (v) => v.lang.startsWith("en") && /male|david|daniel|james|george/i.test(v.name)
      );
      const fallbackEn = voices.find((v) => v.lang.startsWith("en"));

      utterance.voice =
        speaker === "agent"
          ? femaleVoice || fallbackEn || null
          : maleVoice || fallbackEn || null;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        resolve();
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const startDemo = useCallback(() => {
    isCancelledRef.current = false;
    cleanup();
    setIsActive(true);
    setVisibleTurns(0);
    setCallDuration(0);
    setIsTyping(false);
    setCurrentSpeaker(null);

    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Pre-load voices (some browsers need this)
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      
      // Unlock Web Speech API on iOS/Android (requires synchronous execution in user event handler)
      const unlockUtterance = new SpeechSynthesisUtterance("");
      unlockUtterance.volume = 0;
      window.speechSynthesis.speak(unlockUtterance);
    }

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
      await speak(turn.text, turn.speaker);

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
