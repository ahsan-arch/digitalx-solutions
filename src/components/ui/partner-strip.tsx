import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ExternalLink } from "lucide-react";
import factsData from "@/data/facts";

import { cn } from "@/lib/utils";

interface CertifiedPartnerStripProps {
  className?: string;
}

export function CertifiedPartnerStrip({ className }: CertifiedPartnerStripProps) {
  const { partnerCertifications } = factsData;

  // Map logo SVGs
  const logoMap: Record<string, string> = {
    GoHighLevel: "/logos/gohighlevel.svg",
    n8n: "/logos/n8n.svg",
    HubSpot: "/logos/hubspot.svg",
  };

  const partnerDetails: Record<string, { role: string; highlight: string }> = {
    GoHighLevel: {
      role: "Official Agency Partner",
      highlight: "Snapshots, AI Voice & CRM Workflows",
    },
    n8n: {
      role: "Certified Workflow Partner",
      highlight: "Custom Webhook & API Orchestration",
    },
    HubSpot: {
      role: "Certified Solutions Partner",
      highlight: "Pipeline Sync & Revenue Operations",
    },
  };

  return (
    <div className={cn("w-full py-6 md:py-8", className)}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/75 shadow-xs">
          <ShieldCheck className="h-4 w-4 text-brand" />
          <span>Certified Automation Partnerships</span>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {partnerCertifications.map((cert) => {
            const logoSrc = logoMap[cert.platform] || "/logos/gohighlevel.svg";
            const details = partnerDetails[cert.platform] || {
              role: cert.credential,
              highlight: "Verified Automation Systems",
            };

            return (
              <div
                key={cert.platform}
                className="group flex flex-col items-center justify-between rounded-2xl border border-border/80 bg-white p-5 shadow-xs transition-all hover:border-brand/40 hover:shadow-sm"
              >
                <div className="relative mb-3.5 h-8 w-28">
                  <Image
                    src={logoSrc}
                    alt={`${cert.platform} certified partner logo`}
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-foreground">
                    {details.role}
                  </div>
                  <div className="mt-1 text-[11px] text-foreground/65 leading-tight">
                    {details.highlight}
                  </div>
                </div>
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
