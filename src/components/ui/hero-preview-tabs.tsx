"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Database, PhoneCall, Users, Server, Cpu, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const AudioCallPreview = dynamic(
  () => import("./audio-call-preview").then((mod) => mod.AudioCallPreview),
  { loading: () => <div className="h-[118px] rounded-2xl border border-white/10 bg-[#0d1421]/80" /> }
);

const PILL_SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };
const TAB_TRANSITION = { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const };

export function HeroPreviewTabs() {
  const [activeTab, setActiveTab] = useState<"crm" | "voice">("crm");
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionProvider>
      <div className="w-full rounded-2xl border border-white/15 bg-[#0b111e]/90 p-3.5 shadow-[0_24px_64px_-16px_rgba(2,6,23,0.85),0_0_40px_-14px_rgba(56,189,248,0.2)] backdrop-blur-xl md:p-5">
        {/* Tab Controls */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div
            role="tablist"
            aria-label="Hero Architecture Preview"
            className="relative inline-flex rounded-lg border border-white/10 bg-[#070a11]/90 p-1"
          >
            <button
              type="button"
              role="tab"
              id="hero-tab-crm"
              aria-selected={activeTab === "crm"}
              aria-controls="hero-tabpanel-crm"
              onClick={() => setActiveTab("crm")}
              className={cn(
                "relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                activeTab === "crm"
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {activeTab === "crm" && (
                <m.span
                  layoutId="hero-preview-pill"
                  transition={PILL_SPRING}
                  className="absolute inset-0 rounded-md border border-cyan-400/30 bg-[#142038] shadow-2xs"
                  aria-hidden="true"
                />
              )}
              <Database className="relative z-10 h-3.5 w-3.5 text-cyan-400" />
              <span className="relative z-10">Custom CRM</span>
            </button>

            <button
              type="button"
              role="tab"
              id="hero-tab-voice"
              aria-selected={activeTab === "voice"}
              aria-controls="hero-tabpanel-voice"
              onClick={() => setActiveTab("voice")}
              className={cn(
                "relative z-10 flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                activeTab === "voice"
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {activeTab === "voice" && (
                <m.span
                  layoutId="hero-preview-pill"
                  transition={PILL_SPRING}
                  className="absolute inset-0 rounded-md border border-cyan-400/30 bg-[#142038] shadow-2xs"
                  aria-hidden="true"
                />
              )}
              <PhoneCall className="relative z-10 h-3.5 w-3.5 text-cyan-400" />
              <span className="relative z-10">AI Voice</span>
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-emerald-400/25 bg-emerald-500/10 px-2 py-1 font-mono text-[11px] font-medium text-emerald-300 shrink-0 whitespace-nowrap">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live Stack
          </span>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "crm" ? (
            <m.div
              key="crm"
              id="hero-tabpanel-crm"
              role="tabpanel"
              aria-labelledby="hero-tab-crm"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={TAB_TRANSITION}
              className="pt-4 space-y-3.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-display text-sm font-semibold text-white">
                    Bespoke Operations &amp; Client Portals
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Next.js 15 &bull; PostgreSQL &bull; GHL &amp; HubSpot APIs
                  </p>
                </div>
                <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-cyan-300 shrink-0">
                  $0 Per-Seat Fees
                </span>
              </div>

              {/* Layered Glassmorphic Architecture + GPU Data-Flow Diagram */}
              <div className="rounded-xl border border-white/10 bg-[#070a11]/85 p-3.5 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-cyan-400" />
                    Live Architecture Sync
                  </span>
                  <span className="font-mono text-[10px] text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 px-1.5 py-0.5 rounded">
                    PostgreSQL + n8n Active
                  </span>
                </div>

                {/* 3-Node Pipeline with GPU-only transform beam */}
                <div className="relative py-1">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-10 top-1/2 -translate-y-1/2 h-[2px] overflow-hidden bg-slate-800/80"
                  >
                    {!prefersReducedMotion && (
                      <div className="animate-saas-beam h-full w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    )}
                  </div>

                  <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-lg bg-[#0d1421]/95 p-2.5 border border-white/10 backdrop-blur-sm">
                      <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
                        <Cpu className="h-3.5 w-3.5" />
                      </span>
                      <span className="block text-[10px] font-semibold text-white">Next.js Portal</span>
                      <span className="font-mono text-[9px] text-slate-400">UI &amp; Auth</span>
                    </div>
                    <div className="rounded-lg bg-[#101a2d]/95 p-2.5 border border-cyan-400/35 backdrop-blur-sm shadow-[0_0_24px_-8px_rgba(56,189,248,0.35)]">
                      <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
                        <Database className="h-3.5 w-3.5" />
                      </span>
                      <span className="block text-[10px] font-semibold text-cyan-300">PostgreSQL</span>
                      <span className="font-mono text-[9px] text-slate-300">RBAC Core</span>
                    </div>
                    <div className="rounded-lg bg-[#0d1421]/95 p-2.5 border border-white/10 backdrop-blur-sm">
                      <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-400/25 text-emerald-300">
                        <Server className="h-3.5 w-3.5" />
                      </span>
                      <span className="block text-[10px] font-semibold text-white">n8n &amp; Voice</span>
                      <span className="font-mono text-[9px] text-slate-400">AI Telephony</span>
                    </div>
                  </div>
                </div>

                {/* Layered Glass Pipeline + RBAC Overlay Row */}
                <div className="grid sm:grid-cols-2 gap-2">
                  <div className="rounded-lg bg-[#0d1421]/90 p-2.5 border border-white/10 text-xs flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-[11px]">Pipeline Sync</p>
                      <p className="text-[10px] text-slate-400">Lead &rarr; Proposal</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded border border-emerald-400/25 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300 shrink-0">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      Synced
                    </span>
                  </div>

                  <div className="rounded-lg bg-[#0d1421]/90 p-2.5 border border-white/10 text-xs flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-[11px]">RBAC Roles</p>
                      <p className="text-[10px] text-slate-400">Admin / Staff / Client</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded border border-cyan-400/25 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300 shrink-0">
                      <Lock className="h-2.5 w-2.5" />
                      RLS
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <Link
                  href="/development/custom-crm-development"
                  className="inline-flex items-center gap-1 font-semibold text-cyan-300 hover:text-cyan-200 hover:underline"
                >
                  Explore Custom CRM Blueprint &rarr;
                </Link>
                <span className="font-mono text-[11px] text-slate-400">3–6 Wks Delivery</span>
              </div>
            </m.div>
          ) : (
            <m.div
              key="voice"
              id="hero-tabpanel-voice"
              role="tabpanel"
              aria-labelledby="hero-tab-voice"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={TAB_TRANSITION}
              className="pt-4 space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-white">
                    24/7 Autonomous Inbound Intake
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Twilio SIP &bull; Low-Latency Streaming &bull; Calendar Sync
                  </p>
                </div>
                <span className="rounded-md border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
                  &lt; 60s Recovery
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#070a11]/85 p-3 space-y-2.5">
                <AudioCallPreview
                  src="/demos/plumbing-companies/turn-0.mp3"
                  title="Live Trade Intake Preview"
                  scenario="Emergency Call Triage"
                  callerLabel="Burst Pipe Dispatch"
                />

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-[#0d1421]/90 p-2.5 border border-white/10">
                    <span className="block text-[10px] text-slate-400">Turn Latency</span>
                    <span className="font-mono font-semibold text-emerald-300 text-xs">Under 800ms</span>
                  </div>
                  <div className="rounded-lg bg-[#0d1421]/90 p-2.5 border border-white/10">
                    <span className="block text-[10px] text-slate-400">Missed Call Fallback</span>
                    <span className="font-mono font-semibold text-cyan-300 text-xs">Instant SMS &lt; 60s</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <Link
                  href="/solutions/ai-voice-agents"
                  className="inline-flex items-center gap-1 font-semibold text-cyan-300 hover:text-cyan-200 hover:underline"
                >
                  Explore AI Voice Telephony &rarr;
                </Link>
                <span className="font-mono text-[11px] text-slate-400">5–14 Days Launch</span>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </MotionProvider>
  );
}
