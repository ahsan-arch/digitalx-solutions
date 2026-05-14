"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Check } from "lucide-react";
import { VoiceAgentSurvey } from "@/components/forms/voice-agent-survey";
import { VoicePicker } from "@/components/ui/voice-picker";
import { VoiceAgentLive } from "@/components/ui/voice-agent-live";
import { buildSystemPrompt } from "@/lib/voice-agent/build-system-prompt";
import { getVoice, type Voice } from "@/lib/voice-agent/voices";
import { isSpeechRecognitionSupported } from "@/lib/voice-agent/web-speech";
import type { VoiceAgentSurveyData } from "@/lib/schemas/voice-agent";
import { cn } from "@/lib/utils";

type Stage = "survey" | "picker" | "live";

const AGENT_NAME = "Aria";

const stages: { id: Stage; label: string }[] = [
  { id: "survey", label: "Survey" },
  { id: "picker", label: "Pick a voice" },
  { id: "live", label: "Talk live" },
];

export function VoiceAgentExperience() {
  const [stage, setStage] = useState<Stage>("survey");
  const [survey, setSurvey] = useState<VoiceAgentSurveyData | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [browserSupported, setBrowserSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // We no longer require SpeechRecognition (using MediaRecorder + Whisper),
    // but a hint is still useful for very old browsers.
    setBrowserSupported(
      typeof navigator !== "undefined" &&
        !!navigator.mediaDevices?.getUserMedia &&
        typeof MediaRecorder !== "undefined"
    );
    // Touch the legacy check so unused imports don't trip linting.
    void isSpeechRecognitionSupported;
  }, []);

  const systemPrompt = useMemo(() => {
    if (!survey) return "";
    const agentName =
      selectedVoice && selectedVoice.id !== "aria" ? selectedVoice.label : AGENT_NAME;
    return buildSystemPrompt(survey, agentName);
  }, [survey, selectedVoice]);

  function handleSurveySubmit(data: VoiceAgentSurveyData) {
    setSurvey(data);
    if (!selectedVoice) setSelectedVoice(getVoice("aria") ?? null);
    setStage("picker");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleVoiceSelect(voice: Voice) {
    setSelectedVoice(voice);
  }

  function handleStartLive() {
    if (!selectedVoice || !survey) return;
    setStage("live");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleExitLive() {
    setStage("picker");
  }

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <ol className="flex items-center justify-center gap-2 text-xs sm:gap-4 sm:text-sm">
        {stages.map((s, i) => {
          const idx = stages.findIndex((x) => x.id === stage);
          const isActive = stage === s.id;
          const isDone = i < idx;
          return (
            <li key={s.id} className="flex items-center gap-2 sm:gap-3">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold",
                  isActive && "bg-brand text-white",
                  isDone && "bg-brand/15 text-brand",
                  !isActive && !isDone && "bg-foreground/5 text-foreground/55"
                )}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "font-medium",
                  isActive ? "text-foreground" : "text-foreground/55"
                )}
              >
                {s.label}
              </span>
              {i < stages.length - 1 && <span className="h-px w-6 bg-border sm:w-10" />}
            </li>
          );
        })}
      </ol>

      {browserSupported === false && stage !== "survey" && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Live voice isn&apos;t supported in this browser.</p>
            <p className="mt-1 text-xs">
              You can still complete the survey and chat by typing, but for full voice support
              try Chrome, Edge, or Safari 14.5+.
            </p>
          </div>
        </div>
      )}

      {/* Stage content */}
      {stage === "survey" && <VoiceAgentSurvey onSubmit={handleSurveySubmit} />}

      {stage === "picker" && survey && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface-50 px-5 py-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/55">
              Your agent will know
            </p>
            <p className="mt-1 text-foreground/85">
              <span className="font-semibold">{survey.businessName}</span> - {survey.industry} -{" "}
              {survey.tone.toLowerCase()} tone. Goal:{" "}
              <span className="italic">&ldquo;{survey.agentRole}&rdquo;</span>.
            </p>
          </div>
          <VoicePicker
            selectedId={selectedVoice?.id ?? null}
            onSelect={handleVoiceSelect}
            onBack={() => setStage("survey")}
            onStart={handleStartLive}
          />
        </div>
      )}

      {stage === "live" && survey && selectedVoice && (
        <VoiceAgentLive
          systemPrompt={systemPrompt}
          voice={selectedVoice}
          businessName={survey.businessName}
          agentName={selectedVoice.label}
          onExit={handleExitLive}
        />
      )}
    </div>
  );
}
