"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Mic, Phone, PhoneOff, Send, Volume2 } from "lucide-react";
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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1421]/85 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-surface-50 px-5 py-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg",
              isActive
                ? "border border-emerald-400/25 bg-emerald-500/15 text-emerald-300"
                : "bg-brand/10 text-brand"
            )}
          >
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {agentName}
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
              <span className="text-xs font-medium text-foreground/75">
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
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10">
              <Volume2 className="h-7 w-7 text-brand" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Ready to talk to {agentName}?
            </p>
            <p className="mt-1.5 max-w-xs text-xs text-foreground/75">
              You will hear the agent greet you, then it will listen for your reply. Speak
              naturally - it will respond in {voice.label}&apos;s voice.
            </p>
            <p className="mt-3 text-[11px] text-foreground/75">
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
                      : "rounded-bl-md border border-white/10 bg-surface-50 text-foreground/85"
                  )}
                >
                  <p className="mb-0.5 font-mono text-[10px] font-medium opacity-60">
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
        <div className="border-t border-red-500/25 bg-red-500/10 px-5 py-2.5 text-xs text-red-200">
          {errorMsg}
        </div>
      )}
      {premiumFallbackNotice && !errorMsg && (
        <div className="border-t border-white/10 bg-amber-500/10 px-5 py-2.5 text-xs text-amber-300">
          Premium voice unavailable right now - using the closest browser voice.
        </div>
      )}

      {/* Quick Prompts + Text input — always available during the call */}
      {started && status !== "ended" && (
        <div className="border-t border-white/10 bg-[#0d1421]/85">
          <div className="flex flex-wrap items-center gap-1.5 px-4 pt-2.5">
            {[
              "I have an urgent leak",
              "How much does a call-out cost?",
              "Book me tomorrow morning",
            ].map((promptText) => (
              <button
                key={promptText}
                type="button"
                disabled={status === "thinking"}
                onClick={() => sendText(promptText)}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition hover:border-cyan-400/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
              >
                {promptText}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const text = textDraft.trim();
              if (!text || status === "thinking") return;
              sendText(text);
              setTextDraft("");
            }}
            className="flex items-center gap-2 px-4 py-3"
          >
            <input
              type="text"
              value={textDraft}
              onChange={(e) => setTextDraft(e.target.value)}
              placeholder={
                status === "thinking"
                  ? `${agentName} is thinking...`
                  : micAvailable
                    ? "Speak into your mic or type a message here..."
                    : "Type your message to the agent..."
              }
              disabled={status === "thinking"}
              className="flex-1 rounded-lg border border-white/10 bg-surface-50 px-4 py-2 text-sm text-foreground outline-none focus:border-brand disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!textDraft.trim() || status === "thinking"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 border-t border-white/10 bg-surface-50 px-5 py-3">
        {!started ? (
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            <Phone className="h-4 w-4" />
            Start live call
          </button>
        ) : (
          <>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
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
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <PhoneOff className="h-4 w-4" />
              End call
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
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
        <div className="border-t border-white/10 bg-[#0d1421]/85 px-5 py-3 text-center">
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
