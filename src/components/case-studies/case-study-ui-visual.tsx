import Image from "next/image";
import { Database, ShieldCheck, FileImage, Info } from "lucide-react";
import {
  ArchitecturalProductPreview,
  type FeaturedBuildSlug,
} from "@/components/projects/featured-builds-showcase";

/**
 * TODO — ASSETS REQUIRED FROM YOU FOR REAL CASE STUDY PROOF:
 * Supply real production screenshots or short walkthrough videos at these paths:
 * 1. public/images/case-studies/hybrid-field-service-crm.webp (or .mp4)
 * 2. public/images/case-studies/healthcare-patient-portal-crm.webp (or .mp4)
 * 3. public/images/case-studies/dental-clinic.webp
 * 4. public/images/case-studies/plumbing-contractor.webp
 * 5. public/images/case-studies/advisory-practice.webp
 *
 * Until a real mediaPath is supplied in data/facts.json, this component renders an honest
 * architectural placeholder without inventing fake client telemetry or redacted UI mockups.
 */

interface CaseStudyUiVisualProps {
  title: string;
  previewSlug?: FeaturedBuildSlug;
  mediaPath?: string;
  mediaType?: "image" | "video";
  mediaAlt?: string;
  expectedAssetPath: string;
  sourceLabel?: string;
  calculationInputs?: string;
  beforeStack: string[];
  afterStack: string[];
  stats: { label: string; value: string }[];
}

export function CaseStudyUiVisual({
  title,
  previewSlug,
  mediaPath,
  mediaType = "image",
  mediaAlt,
  expectedAssetPath,
  sourceLabel = "Illustrative estimate",
  calculationInputs,
  beforeStack,
  afterStack,
  stats,
}: CaseStudyUiVisualProps) {
  const hasRealMedia = Boolean(mediaPath && mediaPath.trim().length > 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1421]/85 overflow-hidden shadow-xs backdrop-blur-md">
      {/* Top Window Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0b111e] px-4 py-2.5 text-xs">
        <span className="font-mono text-[11px] font-medium text-slate-300">
          {title}
        </span>
        <span className="inline-flex items-center gap-1 rounded border border-amber-400/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-300">
          <Info className="h-3 w-3" />
          Source: {sourceLabel}
        </span>
      </div>

      {/* Real Screenshot / Video / Architectural Blueprint Preview */}
      <div className="p-5 bg-[#070a11]/60 border-b border-white/10">
        {hasRealMedia ? (
          mediaType === "video" || mediaPath!.endsWith(".mp4") || mediaPath!.endsWith(".webm") ? (
            <video
              src={mediaPath}
              controls
              preload="metadata"
              className="w-full rounded-xl border border-white/10 bg-black aspect-video object-cover"
              aria-label={mediaAlt || title}
            />
          ) : (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#070a11]">
              <Image
                src={mediaPath!}
                alt={mediaAlt || title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          )
        ) : previewSlug ? (
          <ArchitecturalProductPreview slug={previewSlug} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-[#0d1421]/90 px-5 py-8 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 mb-3">
              <FileImage className="h-5 w-5" />
            </div>
            <p className="font-display text-sm font-semibold text-white">
              Architecture Screenshot / Walkthrough Asset Slot
            </p>
            <p className="mt-1 text-xs text-slate-400 max-w-md">
              Awaiting sanitized production screenshot or demo clip at{" "}
              <code className="rounded bg-[#070a11] border border-white/10 px-1.5 py-0.5 font-mono text-[11px] text-cyan-300">
                {expectedAssetPath}
              </code>
              .
            </p>
          </div>
        )}

        {/* Modeled / Illustrative Metrics & Calculation Inputs */}
        <div className="mt-4 rounded-xl border border-white/10 bg-[#0d1421]/90 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="font-mono text-xs font-medium text-cyan-300">
              Modeled outcome parameters ({sourceLabel})
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-[#070a11]/85 p-3 border border-white/10">
                <span className="block font-display text-base md:text-lg font-semibold text-white">
                  {stat.value}
                </span>
                <span className="block text-[11px] text-slate-400 leading-snug mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {calculationInputs && (
            <p className="mt-3 pt-3 border-t border-white/10 text-[11px] leading-relaxed text-slate-300">
              <strong className="text-white">Calculation inputs:</strong> {calculationInputs}
            </p>
          )}
        </div>
      </div>

      {/* Before / After Architecture Stack */}
      <div className="grid sm:grid-cols-2 text-xs">
        <div className="p-4 bg-[#070a11]/75 border-b sm:border-b-0 sm:border-r border-white/10">
          <span className="font-mono text-[11px] font-medium text-slate-400">
            Before (Fragmented SaaS)
          </span>
          <ul className="mt-2 space-y-1 text-slate-300">
            {beforeStack.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-[#0d1421]/85">
          <span className="font-mono text-[11px] font-medium text-emerald-300 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            After (Owned architecture)
          </span>
          <ul className="mt-2 space-y-1 text-slate-200 font-medium">
            {afterStack.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Database className="h-3 w-3 text-cyan-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
