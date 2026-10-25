import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2 } from "lucide-react";
import { ClientProject } from "@/data/facts";

interface ProjectCardProps {
  project: ClientProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Map tools to their SVG logo paths
  const toolLogos: Record<string, string> = {
    "AI Voice Agent": "/logos/elevenlabs.svg",
    "Missed-Call Text-Back": "/logos/twilio.svg",
    Twilio: "/logos/twilio.svg",
    GoHighLevel: "/logos/gohighlevel.svg",
    "Google Calendar": "/logos/google-calendar.svg",
    HubSpot: "/logos/hubspot.svg",
    "n8n Workflow Automation": "/logos/n8n.svg",
    "Meta CAPI": "/logos/meta.svg",
    Stripe: "/logos/stripe.svg",
  };

  const hasLogoPermission = project.permissionToUseNameAndLogo && project.logoFile;

  return (
    <article className="flex flex-col justify-between rounded-3xl border border-border bg-white p-6 md:p-8 shadow-xs hover:border-brand/40 transition-all">
      <div>
        {/* Header: Client Identity & Industry */}
        <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            {hasLogoPermission ? (
              <div className="relative h-10 w-24 shrink-0">
                <Image
                  src={project.logoFile!}
                  alt={`${project.client} verified client logo`}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-100 text-brand font-bold text-sm">
                <Building2 className="h-5 w-5 text-brand" />
              </div>
            )}
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {project.client}
              </h3>
              <span className="text-xs font-medium text-foreground/60">
                {project.industry}
              </span>
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-600/20">
            Verified Case Study
          </span>
        </div>

        {/* Problem & Solution */}
        <div className="mt-5 space-y-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
              Operational Challenge
            </span>
            <p className="mt-1 text-sm text-foreground/75 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
              System Deployed
            </span>
            <p className="mt-1 text-sm text-foreground/85 leading-relaxed font-medium">
              {project.whatWasBuilt}
            </p>
          </div>
        </div>

        {/* Verified Measurable Result */}
        <div className="mt-5 rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-4">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Verified Operational Result
              </span>
              <p className="mt-0.5 text-xs font-semibold text-emerald-950 leading-relaxed">
                {project.measurableResult}
              </p>
            </div>
          </div>
        </div>

        {/* Tools Deployed */}
        <div className="mt-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
            Tools &amp; Infrastructure
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.toolsUsed.map((tool) => {
              const logo = toolLogos[tool];
              return (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface-50 px-2.5 py-1 text-xs text-foreground/75"
                >
                  {logo && (
                    <span className="relative h-3.5 w-3.5 shrink-0">
                      <Image
                        src={logo}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="14px"
                      />
                    </span>
                  )}
                  {tool}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Result & CTA */}
      <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-foreground/60">
          Full technical architecture
        </span>

        <Link
          href={`/case-studies/${project.id}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white"
        >
          View Case Study <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
