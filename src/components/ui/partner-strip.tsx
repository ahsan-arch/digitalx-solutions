import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ExternalLink } from "lucide-react";
import factsData from "@/data/facts";

export function CertifiedPartnerStrip() {
  const { partnerCertifications } = factsData;

  // Map logo SVGs
  const logoMap: Record<string, string> = {
    GoHighLevel: "/logos/gohighlevel.svg",
    n8n: "/logos/n8n.svg",
    HubSpot: "/logos/hubspot.svg",
  };

  return (
    <section className="border-y border-border/80 bg-surface-50/80 py-6">
      <div className="container-shell">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
              Certified Automation Partners
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {partnerCertifications.map((cert) => {
              const logoSrc = logoMap[cert.platform] || "/logos/gohighlevel.svg";
              const hasValidProof = cert.proofUrl && !cert.proofUrl.includes("[TODO");

              return (
                <div
                  key={cert.platform}
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-white px-4 py-2 shadow-xs transition-all hover:border-brand/40"
                >
                  <div className="relative h-6 w-24 shrink-0">
                    <Image
                      src={logoSrc}
                      alt={`${cert.platform} certified partner logo`}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <div className="border-l border-border/60 pl-3">
                    <div className="text-[11px] font-semibold text-foreground leading-tight">
                      {cert.credential}
                    </div>
                    {hasValidProof ? (
                      <a
                        href={cert.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-brand hover:underline"
                      >
                        Verify Credential <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    ) : (
                      <span className="text-[10px] text-foreground/50">
                        {cert.status}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
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
