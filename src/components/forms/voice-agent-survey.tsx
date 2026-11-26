"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/redesign";
import {
  voiceAgentRoles,
  voiceAgentSurveySchema,
  voiceAgentTones,
  type VoiceAgentSurveyData,
} from "@/lib/schemas/voice-agent";

const industryOptions = [
  ...industries.map((i) => i.name),
  "Salons & Beauty",
  "Restaurants & Hospitality",
  "Fitness & Gyms",
  "Other",
];

type Props = {
  onSubmit: (data: VoiceAgentSurveyData) => void;
};

type Errors = Partial<Record<keyof VoiceAgentSurveyData, string>>;

export function VoiceAgentSurvey({ onSubmit }: Props) {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState<string>(industryOptions[0]);
  const [whatYouDo, setWhatYouDo] = useState("");
  const [agentRole, setAgentRole] = useState<(typeof voiceAgentRoles)[number]>(
    voiceAgentRoles[0]
  );
  const [tone, setTone] = useState<(typeof voiceAgentTones)[number]>("Friendly");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = voiceAgentSurveySchema.safeParse({
      businessName,
      industry,
      whatYouDo,
      agentRole,
      tone,
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof VoiceAgentSurveyData;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  }

  function fillSampleBusiness() {
    setBusinessName("Apex Plumbing & Gas");
    setIndustry(industryOptions[0]);
    setWhatYouDo("24/7 emergency plumbing, burst pipe repair, hot water installation, and drain clearing across Sydney.");
    setAgentRole(voiceAgentRoles[0]);
    setTone("Friendly");
    setErrors({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-white/10 bg-surface-50 p-6 md:p-8"
      noValidate
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <p className="text-xs text-foreground/70">
          Customize your agent persona or load a sample trade business to test in one click.
        </p>
        <button
          type="button"
          onClick={fillSampleBusiness}
          className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/20"
        >
          Fill sample plumbing business
        </button>
      </div>
      <div>
        <label
          htmlFor="va-business-name"
          className="mb-2 block text-sm font-medium text-foreground/75"
        >
          Business name
        </label>
        <input
          id="va-business-name"
          name="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          aria-invalid={!!errors.businessName}
          aria-describedby={errors.businessName ? "va-business-name-error" : undefined}
          className="w-full rounded-xl border border-white/10 bg-[#0d1421]/85 px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
          placeholder="e.g. Acme Plumbing"
        />
        {errors.businessName && (
          <p id="va-business-name-error" className="mt-1.5 text-xs text-red-600">
            {errors.businessName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="va-industry" className="mb-2 block text-sm font-medium text-foreground/75">
          Industry
        </label>
        <select
          id="va-industry"
          name="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#0d1421]/85 px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
        >
          {industryOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="va-what-you-do"
          className="mb-2 block text-sm font-medium text-foreground/75"
        >
          What does your business do?
        </label>
        <textarea
          id="va-what-you-do"
          name="whatYouDo"
          rows={4}
          value={whatYouDo}
          onChange={(e) => setWhatYouDo(e.target.value)}
          aria-invalid={!!errors.whatYouDo}
          aria-describedby={errors.whatYouDo ? "va-what-you-do-error" : undefined}
          className="w-full rounded-xl border border-white/10 bg-[#0d1421]/85 px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
          placeholder="e.g. We do residential AC repair and maintenance across Phoenix. Same day service, 24/7 emergencies."
        />
        {errors.whatYouDo && (
          <p id="va-what-you-do-error" className="mt-1.5 text-xs text-red-600">
            {errors.whatYouDo}
          </p>
        )}
        <p className="mt-1.5 text-xs text-foreground/55">
          The agent will be trained on this for the duration of the call.
        </p>
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-foreground/75">
          What should the agent do on calls?
        </legend>
        <div className="space-y-2">
          {voiceAgentRoles.map((role) => (
            <label
              key={role}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-[#0d1421]/85 p-3 text-sm transition hover:border-brand/40"
            >
              <input
                type="radio"
                name="agentRole"
                value={role}
                checked={agentRole === role}
                onChange={() => setAgentRole(role)}
                className="mt-0.5 accent-brand"
              />
              <span className="text-foreground/85">{role}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="va-tone" className="mb-2 block text-sm font-medium text-foreground/75">
          Tone
        </label>
        <select
          id="va-tone"
          name="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value as (typeof voiceAgentTones)[number])}
          className="w-full rounded-xl border border-white/10 bg-[#0d1421]/85 px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
        >
          {voiceAgentTones.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
      >
        Continue to voice picker
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
