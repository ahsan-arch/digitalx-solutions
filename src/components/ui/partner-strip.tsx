import React from "react";
import Image from "next/image";
import { CheckCircle2, ExternalLink } from "lucide-react";
import factsData from "@/data/facts";
import { cn } from "@/lib/utils";

interface CertifiedPartnerStripProps {
  className?: string;
}

function GhlPartnerLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#2A85FF" />
        <path d="M16 8L8 16h6v8h4v-8h6L16 8z" fill="#FFFFFF" />
      </svg>
      <span className="font-display text-base font-semibold text-foreground">
        GoHighLevel
      </span>
    </div>
  );
}

function N8nPartnerLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-6 w-7 shrink-0" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1" y="5" width="14" height="14" rx="3" fill="#EA4B71" />
        <circle cx="8" cy="12" r="3" fill="#FFFFFF" />
        <rect x="21" y="5" width="14" height="14" rx="3" fill="#FF6584" />
        <path d="M15 12h6" stroke="#EA4B71" strokeWidth="2.5" />
      </svg>
      <span className="font-display text-base font-semibold text-foreground">
        n8n
      </span>
    </div>
  );
}

function HubSpotPartnerLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#FF7A59" />
        <circle cx="16" cy="16" r="5" fill="#FFFFFF" />
        <circle cx="16" cy="7" r="2.5" fill="#FFFFFF" />
        <line x1="16" y1="9.5" x2="16" y2="11" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="25" cy="16" r="2.5" fill="#FFFFFF" />
        <line x1="21" y1="16" x2="22.5" y2="16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="font-display text-base font-semibold text-foreground">
        HubSpot
      </span>
    </div>
  );
}

/**
 * Displays supported platform integrations. Certification badges or proof links are
 * strictly conditional on a real `proofUrl` existing in `data/facts.json`.
 */
export function CertifiedPartnerStrip({ className }: CertifiedPartnerStripProps) {
  const proofLookup = new Map(
    factsData.partnerCertifications.map((c) => [c.platform.toLowerCase(), c.proofUrl])
  );

  const platforms = [
    {
      platform: "GoHighLevel",
      logo: <GhlPartnerLogo />,
      specialty: "Snapshots, AI voice agents & two-way SMS",
      proofUrl: proofLookup.get("gohighlevel") || "",
    },
    {
      platform: "n8n",
      logo: <N8nPartnerLogo />,
      specialty: "Custom webhook & API data orchestration",
      proofUrl: proofLookup.get("n8n workflow automation") || "",
    },
    {
      platform: "HubSpot",
      logo: <HubSpotPartnerLogo />,
      specialty: "Pipeline synchronization & revenue operations",
      proofUrl: proofLookup.get("hubspot") || "",
    },
  ];

  return (
    <div className={cn("w-full py-6 md:py-8", className)}>
      <div className="flex flex-col items-center text-center">
        <p className="mb-6 text-xs font-medium text-foreground/75">
          Supported CRM &amp; Workflow Platforms
        </p>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {platforms.map((item) => {
            const hasProof = Boolean(item.proofUrl && item.proofUrl.startsWith("http"));
            return (
              <div
                key={item.platform}
                className="flex flex-col items-center justify-between rounded-xl border border-white/10 bg-surface-50/85 p-6 shadow-xs backdrop-blur-md"
              >
                <div className="mb-4">{item.logo}</div>

                <div className="text-center">
                  <p className="text-xs font-semibold text-foreground/80">
                    Integrates with {item.platform}
                  </p>
                  <p className="mt-2 text-xs text-foreground/75 leading-relaxed">
                    {item.specialty}
                  </p>
                </div>

                {hasProof ? (
                  <a
                    href={item.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:underline"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>View Credential</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="mt-4 text-[11px] font-medium text-foreground/60">
                    Client-owned account setup
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function PlatformIntegrationsStrip() {
  const { integratedPlatforms } = factsData;

  return (
    <div className="border-t border-border/60 pt-8">
      <p className="mb-6 text-center text-xs font-medium text-foreground/75">
        Enterprise systems and platforms we integrate with
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {integratedPlatforms.map((platform) => (
          <div
            key={platform.name}
            className="group flex flex-col items-center gap-1"
            title={`${platform.name}: ${platform.relationship}`}
          >
            <div className="flex h-9 w-32 items-center justify-center rounded-lg border border-white/10 bg-slate-100/95 px-2.5 py-1">
              <Image
                src={platform.logo}
                alt={`${platform.name} integration logo`}
                width={100}
                height={28}
                className="max-h-6 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                style={{ maxHeight: "24px", width: "auto" }}
                loading="lazy"
              />
            </div>
            <span className="text-[11px] text-foreground/75 transition-colors">
              {platform.relationship.split("/")[0].trim()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
