"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Database, PhoneCall, Users, Server, Cpu, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const AudioCallPreview = dynamic(
  () => import("./audio-call-preview").then((mod) => mod.AudioCallPreview),
  { loading: () => <div className="h-[118px] rounded-lg border border-border/80 bg-white" /> }
);

export function HeroPreviewTabs() {
  const [activeTab, setActiveTab] = useState<"crm" | "voice">("crm");

  return (
    <div className="w-full rounded-lg border border-border bg-white p-4 shadow-sm md:p-5">
      {/* Clean Editorial Underline Tab Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/80">
        <div
          role="tablist"
          aria-label="Hero Architecture Preview"
          className="flex items-center gap-5"
        >
          <button
            type="button"
            role="tab"
            id="hero-tab-crm"
            aria-selected={activeTab === "crm"}
            aria-controls="hero-tabpanel-crm"
            onClick={() => setActiveTab("crm")}
            className={cn(
              "relative flex items-center gap-1.5 whitespace-nowrap border-b-2 pb-2.5 text-xs font-semibold transition-colors",
              activeTab === "crm"
                ? "border-brand text-foreground"
                : "border-transparent text-foreground/65 hover:text-foreground"
            )}
          >
            <Database className="h-3.5 w-3.5 text-brand" />
            <span>Custom CRM</span>
          </button>

          <button
            type="button"
            role="tab"
            id="hero-tab-voice"
            aria-selected={activeTab === "voice"}
            aria-controls="hero-tabpanel-voice"
            onClick={() => setActiveTab("voice")}
            className={cn(
              "relative flex items-center gap-1.5 whitespace-nowrap border-b-2 pb-2.5 text-xs font-semibold transition-colors",
              activeTab === "voice"
                ? "border-brand text-foreground"
                : "border-transparent text-foreground/65 hover:text-foreground"
            )}
          >
            <PhoneCall className="h-3.5 w-3.5 text-brand" />
            <span>AI Voice</span>
          </button>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 pb-2.5 font-mono text-[11px] font-medium text-emerald-700 shrink-0 whitespace-nowrap">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
          Live Stack
        </span>
      </div>

      {activeTab === "crm" ? (
        <div
          id="hero-tabpanel-crm"
          role="tabpanel"
          aria-labelledby="hero-tab-crm"
          className="pt-4 space-y-3.5"
        >
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <p className="font-display text-sm font-semibold text-foreground">
                Bespoke Operations &amp; Client Portals
              </p>
              <p className="text-[11px] text-foreground/70">
                Next.js 15 &bull; PostgreSQL &bull; GHL &amp; HubSpot APIs
              </p>
            </div>
            <span className="font-mono text-[11px] font-semibold text-brand shrink-0">
              $0 Per-Seat Fees
            </span>
          </div>

          {/* Architectural Data-Flow Diagram */}
          <div className="rounded-lg border border-border/80 bg-surface-sunken p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-border/80 pb-2">
              <span className="font-medium text-foreground flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-brand" />
                Live Architecture Sync
              </span>
              <span className="font-mono text-[11px] font-medium text-emerald-700">
                PostgreSQL + n8n Active
              </span>
            </div>

            {/* 3-Node Pipeline with GPU-only transform beam */}
            <div className="relative py-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-1/2 -translate-y-1/2 h-[2px] overflow-hidden bg-border"
              >
                <div className="animate-saas-beam h-full w-20 bg-gradient-to-r from-transparent via-brand to-transparent" />
              </div>

              <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-md bg-white p-2.5 border border-border/80">
                  <Cpu className="mx-auto mb-1.5 h-4 w-4 text-brand" />
                  <span className="block text-[10px] font-semibold text-foreground">Next.js Portal</span>
                  <span className="font-mono text-[9px] text-foreground/70">UI &amp; Auth</span>
                </div>
                <div className="rounded-md bg-brand/5 p-2.5 border border-brand/30 shadow-xs">
                  <Database className="mx-auto mb-1.5 h-4 w-4 text-brand" />
                  <span className="block text-[10px] font-semibold text-brand">PostgreSQL</span>
                  <span className="font-mono text-[9px] text-foreground/80">RBAC Core</span>
                </div>
                <div className="rounded-md bg-white p-2.5 border border-border/80">
                  <Server className="mx-auto mb-1.5 h-4 w-4 text-emerald-700" />
                  <span className="block text-[10px] font-semibold text-foreground">n8n &amp; Voice</span>
                  <span className="font-mono text-[9px] text-foreground/70">AI Telephony</span>
                </div>
              </div>
            </div>

            {/* Pipeline + RBAC Row */}
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="rounded-md bg-white p-2.5 border border-border/80 text-xs flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-[11px]">Pipeline Sync</p>
                  <p className="text-[10px] text-foreground/70">Lead &rarr; Proposal</p>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-emerald-700 shrink-0">
                  <CheckCircle2 className="h-3 w-3" />
                  Synced
                </span>
              </div>

              <div className="rounded-md bg-white p-2.5 border border-border/80 text-xs flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-[11px]">RBAC Roles</p>
                  <p className="text-[10px] text-foreground/70">Admin / Staff / Client</p>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-brand shrink-0">
                  <Lock className="h-3 w-3" />
                  RLS
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <Link
              href="/development/custom-crm-development"
              className="inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-deep hover:underline"
            >
              Explore Custom CRM Blueprint &rarr;
            </Link>
            <span className="font-mono text-[11px] text-foreground/70">3–6 Wks Delivery</span>
          </div>
        </div>
      ) : (
        <div
          id="hero-tabpanel-voice"
          role="tabpanel"
          aria-labelledby="hero-tab-voice"
          className="pt-4 space-y-3.5"
        >
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <p className="font-display text-sm font-semibold text-foreground">
                24/7 Autonomous Inbound Intake
              </p>
              <p className="text-[11px] text-foreground/70">
                Twilio SIP &bull; Low-Latency Streaming &bull; Calendar Sync
              </p>
            </div>
            <span className="font-mono text-[11px] font-semibold text-emerald-700 shrink-0">
              &lt; 60s Recovery
            </span>
          </div>

          <div className="rounded-lg border border-border/80 bg-surface-sunken p-3 space-y-2.5">
            <AudioCallPreview
              src="/demos/plumbing-companies/turn-0.mp3"
              title="Live Trade Intake Preview"
              scenario="Emergency Call Triage"
              callerLabel="Burst Pipe Dispatch"
            />

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md bg-white p-2.5 border border-border/80">
                <span className="block text-[10px] text-foreground/70">Turn Latency</span>
                <span className="font-mono font-semibold text-emerald-700 text-xs">Under 800ms</span>
              </div>
              <div className="rounded-md bg-white p-2.5 border border-border/80">
                <span className="block text-[10px] text-foreground/70">Missed Call Fallback</span>
                <span className="font-mono font-semibold text-brand text-xs">Instant SMS &lt; 60s</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <Link
              href="/solutions/ai-voice-agents"
              className="inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-deep hover:underline"
            >
              Explore AI Voice Telephony &rarr;
            </Link>
            <span className="font-mono text-[11px] text-foreground/70">5–14 Days Launch</span>
          </div>
        </div>
      )}
    </div>
  );
}
