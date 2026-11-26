"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Database, ShieldCheck, ArrowRightLeft, Rocket } from "lucide-react";

const roadmapSteps = [
  {
    week: "Week 1",
    title: "Schema & Architecture",
    description:
      "Entity-relationship modeling in PostgreSQL, API endpoint mapping (GoHighLevel, HubSpot, Cliniko, ServiceTitan), and role permission boundary definition.",
    deliverable: "ERD Blueprint & Milestone Spec",
    icon: Database,
  },
  {
    week: "Weeks 2–3",
    title: "Next.js Portal & RBAC",
    description:
      "Production frontend engineering with Next.js 15 App Router, tailored operator dashboards, client self-service views, and strict Row-Level Security (RBAC).",
    deliverable: "Staging Web Portal & Auth Layer",
    icon: ShieldCheck,
  },
  {
    week: "Weeks 4–5",
    title: "Legacy Migration & Telephony",
    description:
      "Zero-loss ETL import from legacy CRMs/spreadsheets with E.164 phone deduplication, self-hosted n8n webhooks, and live Twilio SIP call recording sync.",
    deliverable: "Synchronized Production Pipelines",
    icon: ArrowRightLeft,
  },
  {
    week: "Week 6",
    title: "Production Handover",
    description:
      "Automated E2E stress testing, custom domain SSL deployment into your cloud environment, full Git repository transfer, and recorded staff SOP walkthroughs.",
    deliverable: "100% Source Code & IP Ownership",
    icon: Rocket,
  },
];

const EASE_PRECISION: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function BuildRoadmapTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.55"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <MotionProvider>
    <div ref={containerRef} className="relative pl-8 md:pl-10">
      {/* Background track line */}
      <div
        aria-hidden="true"
        className="absolute left-3.5 md:left-4 top-2 bottom-2 w-0.5 bg-border"
      />
      {/* Scroll-driven active progress line */}
      {!prefersReducedMotion ? (
        <m.div
          aria-hidden="true"
          style={{ scaleY, originY: 0 }}
          className="absolute left-3.5 md:left-4 top-2 bottom-2 w-0.5 bg-brand"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute left-3.5 md:left-4 top-2 bottom-2 w-0.5 bg-brand"
        />
      )}

      <div className="space-y-6">
        {roadmapSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <m.div
              key={step.title}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: index * 0.06, ease: EASE_PRECISION }}
              className="relative rounded-2xl border border-white/10 bg-[#0d1421]/85 p-5 md:p-6 shadow-xs transition-colors hover:border-brand/40"
            >
              {/* Timeline marker dot */}
              <span
                aria-hidden="true"
                className="absolute -left-[29px] md:-left-[35px] top-6 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand bg-[#0d1421]/85 shadow-2xs"
              >
                <span className="h-2 w-2 rounded-full bg-brand" />
              </span>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-medium text-brand-deep">
                      {step.week}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <span className="rounded-md border border-white/10 bg-surface-50 px-2.5 py-1 font-mono text-[11px] font-medium text-foreground/75">
                  {step.deliverable}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                {step.description}
              </p>
            </m.div>
          );
        })}
      </div>
    </div>
    </MotionProvider>
  );
}
