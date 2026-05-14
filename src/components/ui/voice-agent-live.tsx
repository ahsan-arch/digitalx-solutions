"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Mic, Phone, PhoneOff, Send, Sparkles, Volume2 } from "lucide-react";
import { useVoiceAgent } from "@/lib/voice-agent/use-voice-agent";
import type { Voice } from "@/lib/voice-agent/voices";
import { cn } from "@/lib/utils";

type Props = {
  systemPrompt: string;
  voice: Voice;
  businessName: string;
  agentName: string;
  onExit: () => void;
};

function statusLabel(status: string) {
  switch (status) {
    case "idle":
      return "Tap to start";
    case "listening":
      return "Listening...";
    case "thinking":
      return "Thinking...";
    case "speaking":
      return "Speaking...";
    case "ended":
      return "Call ended";
    case "error":
      return "Error";
    default:
      return status;
  }
}

export function VoiceAgentLive({
  systemPrompt,
  voice,
  businessName,
  agentName,
  onExit,
}: Props) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [textDraft, setTextDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    status,
    transcript,
    interim,
    premiumFallbackNotice,
    micAvailable,
    start,
    stop,
    sendText,
  } = useVoiceAgent({
    systemPrompt,
    voice,
    onError: (msg) => setErrorMsg(msg),
  });

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(id);
  }, [started]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, interim]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  function handleStart() {
    setErrorMsg(null);
    setStarted(true);
    setDuration(0);
    start();
  }

  function handleEnd() {
    stop();
    setStarted(false);
  }

  const isActive = started && status !== "ended" && status !== "error";

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-surface-50 px-5 py-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              isActive ? "bg-green-100 text-green-600" : "bg-brand/10 text-brand"
            )}
          >
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {agentName}{" "}
              {voice.kind === "premium" && (
                <Sparkles className="ml-1 inline h-3 w-3 text-brand" aria-hidden />
              )}
            </p>
            <p className="text-xs text-foreground/55">
              AI Voice Agent for {businessName} - voice: {voice.label}
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
                {formatTime(duration)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Transcript / status area */}
      <div
        ref={scrollRef}
        className="h-[360px] overflow-y-auto p-4"
        style={{ scrollbarWidth: "none" }}
        aria-live="polite"
        aria-atomic="false"
      >
        {!started && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
              <Volume2 className="h-7 w-7 text-brand" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Ready to talk to {agentName}?
            </p>
            <p className="mt-1.5 max-w-xs text-xs text-foreground/60">
              You will hear the agent greet you, then it will listen for your reply. Speak
              naturally - it will respond in {voice.label}&apos;s voice.
            </p>
            <p className="mt-3 text-[11px] text-foreground/50">
              Best in Chrome, Edge, or Safari 14.5+. Allow microphone access when prompted.
            </p>
          </div>
        )}

        {started && (
          <div className="space-y-3">
            {transcript.map((entry, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  entry.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    entry.role === "user"
                      ? "rounded-br-md bg-brand text-white"
                      : "rounded-bl-md border border-border bg-surface-50 text-foreground/85"
                  )}
                >
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider opacity-60">
                    {entry.role === "user" ? "You" : agentName}
                  </p>
                  {entry.text}
                </div>
              </div>
            ))}
            {interim && (
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-brand/40 px-4 py-2.5 text-sm italic text-white">
                  {interim}
                </div>
              </div>
            )}
            {(status === "thinking" || status === "speaking" || status === "listening") && (
              <div className="flex items-center gap-2 px-1 pt-1 text-xs text-foreground/55">
                <span
                  className={cn(
                    "inline-flex h-2 w-2 rounded-full",
                    status === "listening" && "animate-pulse bg-green-500",
                    status === "thinking" && "animate-pulse bg-amber-400",
                    status === "speaking" && "animate-pulse bg-brand"
                  )}
                />
                {statusLabel(status)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notices */}
      {errorMsg && (
        <div className="border-t border-border bg-red-50 px-5 py-2.5 text-xs text-red-700">
          {errorMsg}
        </div>
      )}
      {premiumFallbackNotice && !errorMsg && (
        <div className="border-t border-border bg-amber-50 px-5 py-2.5 text-xs text-amber-800">
          Premium voice unavailable right now - using the closest browser voice.
        </div>
      )}

      {/* Text input fallback — shown when mic isn't available */}
      {started && micAvailable === false && (
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const text = textDraft.trim();
            if (!text || status === "speaking" || status === "thinking") return;
            sendText(text);
            setTextDraft("");
          }}
          className="flex items-center gap-2 border-t border-border bg-white px-4 py-3"
        >
          <input
            type="text"
            value={textDraft}
            onChange={(e) => setTextDraft(e.target.value)}
            placeholder="Type your message to the agent..."
            disabled={status === "speaking" || status === "thinking"}
            className="flex-1 rounded-full border border-border bg-surface-50 px-4 py-2 text-sm text-foreground outline-none focus:border-brand disabled:opacity-60"
            autoFocus
          />
          <button
            type="submit"
            disabled={!textDraft.trim() || status === "speaking" || status === "thinking"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 border-t border-border bg-surface-50 px-5 py-3">
        {!started ? (
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            <Phone className="h-4 w-4" />
            Start live call
          </button>
        ) : (
          <>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5">
              <Mic
                className={cn(
                  "h-4 w-4",
                  micAvailable === false
                    ? "text-foreground/30 line-through"
                    : status === "listening"
                      ? "text-green-600"
                      : "text-foreground/40"
                )}
              />
            </div>
            <button
              type="button"
              onClick={handleEnd}
              className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              <PhoneOff className="h-4 w-4" />
              End call
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5">
              <Volume2
                className={cn(
                  "h-4 w-4",
                  status === "speaking" ? "text-brand" : "text-foreground/40"
                )}
              />
            </div>
          </>
        )}
      </div>

      {(status === "ended" || status === "error") && started === false && transcript.length > 0 && (
        <div className="border-t border-border bg-white px-5 py-3 text-center">
          <button
            type="button"
            onClick={onExit}
            className="text-sm font-medium text-brand hover:underline"
          >
            Pick a different voice or edit the survey
          </button>
        </div>
      )}
    </div>
  );
}
