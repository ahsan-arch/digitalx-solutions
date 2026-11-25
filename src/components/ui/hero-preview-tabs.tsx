"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Database, PhoneCall, Users, Server, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const AudioCallPreview = dynamic(
  () => import("./audio-call-preview").then((mod) => mod.AudioCallPreview),
  { loading: () => <div className="h-[118px] rounded-2xl border border-border/80 bg-white" /> }
);

export function HeroPreviewTabs() {
  const [activeTab, setActiveTab] = useState<"crm" | "voice">("crm");

  return (
    <div className="w-full rounded-2xl border border-border bg-white p-3 shadow-xs md:p-5">
      {/* Tab Controls */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div
          role="tablist"
          aria-label="Hero Architecture Preview"
          className="relative inline-flex rounded-xl border border-border bg-surface-100 p-1"
        >
          <button
            type="button"
            role="tab"
            id="hero-tab-crm"
            aria-selected={activeTab === "crm"}
            aria-controls="hero-tabpanel-crm"
            onClick={() => setActiveTab("crm")}
            className={cn(
              "relative z-10 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              activeTab === "crm"
                ? "bg-white text-foreground shadow-2xs border border-border/50"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            <Database className="h-3.5 w-3.5 text-brand" />
            <span>Custom CRM Architecture</span>
          </button>

          <button
            type="button"
            role="tab"
            id="hero-tab-voice"
            aria-selected={activeTab === "voice"}
            aria-controls="hero-tabpanel-voice"
            onClick={() => setActiveTab("voice")}
            className={cn(
              "relative z-10 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              activeTab === "voice"
                ? "bg-white text-foreground shadow-2xs border border-border/50"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            <PhoneCall className="h-3.5 w-3.5 text-brand" />
            <span>Live AI Voice Intake</span>
          </button>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
          <span className="inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
          Production Stack
        </span>
      </div>

      {/* Tab Panels */}
      {activeTab === "crm" ? (
        <div
          id="hero-tabpanel-crm"
          role="tabpanel"
          aria-labelledby="hero-tab-crm"
          className="pt-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-sm font-semibold text-foreground">
                Bespoke Operations &amp; Client Portals
              </p>
              <p className="text-[11px] text-foreground/70">
                Next.js 15 &bull; PostgreSQL &bull; GHL &amp; HubSpot APIs
              </p>
            </div>
            <span className="rounded-md bg-brand/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-brand-deep">
              $0 Per-Seat Fees
            </span>
          </div>

          {/* Architecture Data-Flow Diagram */}
          <div className="rounded-xl border border-border/70 bg-surface-50 p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
              <span className="font-medium text-foreground/80 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-brand" />
                Live Architecture Sync
              </span>
              <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                Bi-Directional
              </span>
            </div>

            <div className="relative py-1">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 360 56"
                fill="none"
                aria-hidden="true"
              >
                <line
                  x1="88"
                  y1="28"
                  x2="132"
                  y2="28"
                  stroke="rgba(188, 72, 18, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                <line
                  x1="228"
                  y1="28"
                  x2="272"
                  y2="28"
                  stroke="rgba(38, 98, 84, 0.32)"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
              </svg>

              <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-white p-2 border border-border/70 shadow-2xs">
                  <span className="mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded bg-brand/10 text-brand">
                    <Cpu className="h-3 w-3" />
                  </span>
                  <span className="block text-[10px] font-semibold text-foreground">Next.js Portal</span>
                  <span className="font-mono text-[9px] text-foreground/65">UI &amp; Auth</span>
                </div>
                <div className="rounded-lg bg-white p-2 border border-brand/30 shadow-2xs">
                  <span className="mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded bg-brand/10 text-brand">
                    <Database className="h-3 w-3" />
                  </span>
                  <span className="block text-[10px] font-semibold text-brand">PostgreSQL</span>
                  <span className="font-mono text-[9px] text-foreground/65">RBAC Core</span>
                </div>
                <div className="rounded-lg bg-white p-2 border border-border/70 shadow-2xs">
                  <span className="mx-auto mb-1 flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-700">
                    <Server className="h-3 w-3" />
                  </span>
                  <span className="block text-[10px] font-semibold text-foreground">n8n &amp; Voice</span>
                  <span className="font-mono text-[9px] text-foreground/65">AI Telephony</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-2.5 border border-border/60 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-brand shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-[11px]">Normalized Relational Database</p>
                  <p className="text-[10px] text-foreground/65">PostgreSQL with E.164 phone deduplication</p>
                </div>
              </div>
              <span className="font-mono text-[10px] font-semibold text-foreground">100% Owned IP</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <Link
              href="/development/custom-crm-development"
              className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
            >
              Explore Custom CRM Blueprint &rarr;
            </Link>
            <span className="font-mono text-[11px] text-foreground/65">3–6 Wks Delivery</span>
          </div>
        </div>
      ) : (
        <div
          id="hero-tabpanel-voice"
          role="tabpanel"
          aria-labelledby="hero-tab-voice"
          className="pt-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-sm font-semibold text-foreground">
                24/7 Autonomous Inbound Intake
              </p>
              <p className="text-[11px] text-foreground/70">
                Twilio SIP &bull; Low-Latency Streaming &bull; Calendar Sync
              </p>
            </div>
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-800">
              &lt; 60s Recovery
            </span>
          </div>

          {/* Audio Preview Box */}
          <div className="rounded-xl border border-border/70 bg-surface-50 p-3 space-y-2.5">
            <AudioCallPreview
              src="/demos/plumbing-companies/turn-0.mp3"
              title="Live Trade Intake Preview"
              scenario="Emergency Call Triage"
              callerLabel="Burst Pipe Dispatch"
            />

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-white p-2 border border-border/60">
                <span className="block text-[10px] text-foreground/65">Turn Latency</span>
                <span className="font-mono font-semibold text-emerald-800 text-xs">Under 800ms</span>
              </div>
              <div className="rounded-lg bg-white p-2 border border-border/60">
                <span className="block text-[10px] text-foreground/65">Missed Call Fallback</span>
                <span className="font-mono font-semibold text-brand text-xs">Instant SMS &lt; 60s</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <Link
              href="/solutions/ai-voice-agents"
              className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
            >
              Explore AI Voice Telephony &rarr;
            </Link>
            <span className="font-mono text-[11px] text-foreground/65">5–14 Days Launch</span>
          </div>
        </div>
      )}
    </div>
  );
}
