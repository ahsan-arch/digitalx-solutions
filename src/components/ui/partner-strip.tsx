import React from "react";
import Image from "next/image";
import { ShieldCheck, Award, CheckCircle2 } from "lucide-react";
import factsData from "@/data/facts";
import { cn } from "@/lib/utils";

interface CertifiedPartnerStripProps {
  className?: string;
}

// Crisp, dedicated partner badge icons that never get blocked by ad blockers
function GhlPartnerLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#2A85FF" />
        <path d="M16 8L8 16h6v8h4v-8h6L16 8z" fill="#FFFFFF" />
      </svg>
      <span className="font-display text-base font-extrabold tracking-tight text-foreground">
        GoHighLevel
      </span>
    </div>
  );
}

function N8nPartnerLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-6 w-7 shrink-0" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="5" width="14" height="14" rx="4" fill="#EA4B71" />
        <circle cx="8" cy="12" r="3" fill="#FFFFFF" />
        <rect x="21" y="5" width="14" height="14" rx="4" fill="#FF6584" />
        <path d="M15 12h6" stroke="#EA4B71" strokeWidth="2.5" />
      </svg>
      <span className="font-display text-base font-extrabold tracking-tight text-foreground">
        n8n
      </span>
    </div>
  );
}

function HubSpotPartnerLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#FF7A59" />
        <circle cx="16" cy="16" r="5" fill="#FFFFFF" />
        <circle cx="16" cy="7" r="2.5" fill="#FFFFFF" />
        <line x1="16" y1="9.5" x2="16" y2="11" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="25" cy="16" r="2.5" fill="#FFFFFF" />
        <line x1="21" y1="16" x2="22.5" y2="16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="font-display text-base font-extrabold tracking-tight text-foreground">
        HubSpot
      </span>
    </div>
  );
}

export function CertifiedPartnerStrip({ className }: CertifiedPartnerStripProps) {
  const partners = [
    {
      platform: "GoHighLevel",
      badge: "Official Agency Partner",
      logo: <GhlPartnerLogo />,
      specialty: "Snapshots, AI Voice Agents & Two-Way SMS",
      tierColor: "text-blue-700 bg-blue-50 border-blue-200",
      accentBorder: "hover:border-[#2A85FF]/50",
    },
    {
      platform: "n8n",
      badge: "Certified Workflow Partner",
      logo: <N8nPartnerLogo />,
      specialty: "Custom Webhook & API Data Orchestration",
      tierColor: "text-rose-700 bg-rose-50 border-rose-200",
      accentBorder: "hover:border-[#EA4B71]/50",
    },
    {
      platform: "HubSpot",
      badge: "Certified Solutions Partner",
      logo: <HubSpotPartnerLogo />,
      specialty: "Pipeline Synchronization & Revenue Operations",
      tierColor: "text-orange-700 bg-orange-50 border-orange-200",
      accentBorder: "hover:border-[#FF7A59]/50",
    },
  ];

  return (
    <div className={cn("w-full py-6 md:py-8", className)}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80 shadow-xs">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Official Certified Partner Ecosystem</span>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.platform}
              className={cn(
                "group relative flex flex-col items-center justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-xs transition-all hover:shadow-md",
                partner.accentBorder
              )}
            >
              <div className="mb-4">{partner.logo}</div>

              <div className="text-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-tight",
                    partner.tierColor
                  )}
                >
                  <Award className="h-3 w-3" />
                  {partner.badge}
                </span>

                <p className="mt-2 text-xs text-foreground/75 leading-relaxed font-medium">
                  {partner.specialty}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Verified Architecture</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlatformIntegrationsStrip() {
  const { integratedPlatforms } = factsData;

  return (
    <div className="border-t border-border/60 pt-8">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55 mb-6">
        Enterprise Systems &amp; Platforms We Integrate With
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
        {integratedPlatforms.map((platform) => (
          <div
            key={platform.name}
            className="flex flex-col items-center gap-1 group"
            title={`${platform.name} — ${platform.relationship}`}
          >
            <div className="relative h-7 w-28">
              <Image
                src={platform.logo}
                alt={`${platform.name} integration logo`}
                fill
                className="object-contain grayscale group-hover:grayscale-0 transition-all"
                loading="lazy"
                sizes="112px"
              />
            </div>
            <span className="text-[10px] text-foreground/50 group-hover:text-foreground/75 transition-colors">
              {platform.relationship.split("/")[0].trim()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
