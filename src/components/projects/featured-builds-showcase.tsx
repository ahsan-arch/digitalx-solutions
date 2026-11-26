"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Database,
  FileCheck2,
  GitBranch,
  Layers,
  Lock,
  Search,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FeaturedBuildSlug =
  | "smart-property-buying"
  | "digitalx-custom-crm"
  | "links-2000-lims";

interface BuildSpec {
  slug: FeaturedBuildSlug;
  index: string;
  name: string;
  domain: string;
  headline: string;
  summary: string;
  architectureNote: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  secondaryHref?: string;
  secondaryLabel?: string;
}

const FEATURED_BUILDS: BuildSpec[] = [
  {
    slug: "smart-property-buying",
    index: "01",
    name: "Smart Property Buying",
    domain: "Property Research & Scoring Engine",
    headline: "Automated off-market harvesting, OCR price extraction, and 100-point property scoring",
    summary:
      "Built for an Australian buyer's agency to replace manual portal logins across 14+ builders. Combines Playwright session automation, RapidOCR + PyMuPDF extraction on image-only price PDFs, PropTrack comparable benchmarking, and Kommo CRM pipeline sync.",
    architectureNote:
      "Python ingestion pipeline · Playwright harvesters · 11 hard rejection gates · Interactive HTML & Excel client reports",
    stack: ["Python", "Playwright", "RapidOCR", "PropTrack", "Kommo CRM"],
    metrics: [
      { label: "Builder portals automated", value: "14+" },
      { label: "Image-only PDFs parsed", value: "57 / 143" },
      { label: "Scoring model gates", value: "100 pts" },
    ],
  },
  {
    slug: "digitalx-custom-crm",
    index: "02",
    name: "DigitalX Custom CRM",
    domain: "Multi-Tenant Operations & Margin SaaS",
    headline: "20 integrated pipeline, margin, RBAC, and webhook modules with zero per-seat fees",
    summary:
      "Our proprietary agency and service operations CRM built on Next.js App Router, Prisma, and PostgreSQL/Supabase. Unifies AU/US Kanban pipelines, 1-click lead-to-client conversion, labor-margin analytics, e-signature proposals, Cmd+K global search, and live webhook endpoints.",
    architectureNote:
      "Next.js App Router · Prisma ORM (12 models) · Admin/Member RBAC · /api/webhooks/{ghl,apollo,meta-ads,n8n}",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts"],
    metrics: [
      { label: "Operations modules", value: "20" },
      { label: "Webhook endpoints", value: "4 REST APIs" },
      { label: "Per-seat license fee", value: "$0 / user" },
    ],
    secondaryHref: "/products/digitalx-crm",
    secondaryLabel: "View CRM product specs",
  },
  {
    slug: "links-2000-lims",
    index: "03",
    name: "Links 2000",
    domain: "ISO/IEC 17025 Calibration LIMS",
    headline: "3-tier cloud metrology workbench migrating legacy VB6 calibration databases",
    summary:
      "Modernized an accredited ISO/IEC 17025:2017 calibration laboratory system from desktop VB6/SQL Server to a resilient React 19, Django REST, and Supabase PostgreSQL RLS architecture covering job orders, customer directories, equipment catalogs, and accredited certificates.",
    architectureNote:
      "React 19 + Vite · Django REST Framework · Supabase Row-Level Security · JCGM 100:2008 GUM uncertainty",
    stack: ["React 19", "TypeScript", "Django REST", "Supabase RLS", "TanStack Query"],
    metrics: [
      { label: "Data routing fallback", value: "3-Tier" },
      { label: "Calibration cert classes", value: "8 Types" },
      { label: "Accreditation standard", value: "ISO 17025" },
    ],
  },
];

function SmartPropertyBuyingCanvas() {
  const [subTab, setSubTab] = useState<"scoring" | "ocr" | "pipeline">("scoring");

  const sampleLots = [
    {
      lot: "Lot 412 · Marsden Park NSW",
      builder: "Highland Homes (E-Agent)",
      score: "91 / 100",
      confidence: "HIGH",
      status: "Shortlisted",
      price: "$785,000 Fixed",
    },
    {
      lot: "Lot 118 · Ripley Valley QLD",
      builder: "Paramount Living",
      score: "84 / 100",
      confidence: "HIGH",
      status: "Benchmarked",
      price: "$692,000 Turnkey",
    },
    {
      lot: "Lot 209 · Fraser Rise VIC",
      builder: "Bathla Group",
      score: "Rejected",
      confidence: "Gate: outside_radius",
      status: "Filtered",
      price: "$740,000 Package",
    },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#070a11]/90 overflow-hidden shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0b111e] px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <Building2 className="h-4 w-4 text-cyan-400 shrink-0" />
          <span className="truncate text-xs font-semibold text-white">
            SPB Research &amp; Benchmarking Workbench
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#070a11] p-0.5 text-[11px]">
          {(
            [
              ["scoring", "Scoring Matrix"],
              ["ocr", "OCR Extraction"],
              ["pipeline", "Kommo Sync"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSubTab(key)}
              className={cn(
                "rounded-md px-2.5 py-1 font-medium transition-colors",
                subTab === key
                  ? "bg-[#142038] text-cyan-300 border border-cyan-400/25"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {subTab === "scoring" && (
          <>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-3">
                <p className="text-[11px] text-slate-400">Sources harvested</p>
                <p className="mt-1 font-mono text-base font-semibold text-white tabular-nums">14 Portals</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-3">
                <p className="text-[11px] text-slate-400">Hard filter gates</p>
                <p className="mt-1 font-mono text-base font-semibold text-white tabular-nums">11 Checks</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-3">
                <p className="text-[11px] text-slate-400">Comps provider</p>
                <p className="mt-1 font-mono text-base font-semibold text-emerald-300">PropTrack</p>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 divide-y divide-white/10">
              {sampleLots.map((row) => (
                <div
                  key={row.lot}
                  className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{row.lot}</p>
                    <p className="text-[11px] text-slate-400">
                      {row.builder} · Confidence: {row.confidence}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[11px] text-slate-300">{row.price}</span>
                    <span
                      className={cn(
                        "rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium",
                        row.status === "Filtered"
                          ? "border-white/10 bg-[#070a11] text-slate-400"
                          : "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                      )}
                    >
                      {row.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {subTab === "ocr" && (
          <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Image-Only PDF Recovery Pipeline</span>
              <span className="rounded-md border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                RapidOCR + PyMuPDF
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              When builder stocklists contain flattened image tables instead of selectable text (57 of 143 E-Agent sheets), <code className="font-mono text-[11px] text-cyan-300">_ocr_rows</code> renders raster pages via PyMuPDF and extracts structured lot pricing into SQLite.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="rounded-lg bg-[#070a11] border border-white/10 p-2.5">
                <span className="block text-[11px] text-slate-400">Deduplication key</span>
                <span className="font-mono text-[11px] font-medium text-white">builder + lot + suburb + price</span>
              </div>
              <div className="rounded-lg bg-[#070a11] border border-white/10 p-2.5">
                <span className="block text-[11px] text-slate-400">Client export formats</span>
                <span className="font-mono text-[11px] font-medium text-white">HTML Report · XLSX · CSV</span>
              </div>
            </div>
          </div>
        )}

        {subTab === "pipeline" && (
          <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-4 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Kommo CRM &amp; OS-Vault Auth Flow</span>
              <span className="rounded-md border border-white/10 bg-[#070a11] px-2 py-0.5 font-mono text-[11px] text-slate-300">
                keyring &rarr; .env
              </span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span><code className="font-mono text-[11px] text-cyan-300">brief_parser.py</code> converts buyer criteria into validated <code className="font-mono text-[11px] text-cyan-300">ClientBrief</code> constraints</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span><code className="font-mono text-[11px] text-cyan-300">kommo_agent.py</code> syncs shortlisted packages &amp; brochure URLs into buyer stages</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Zero plaintext passwords stored in codebase via OS keyring credential resolution</span>
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
          <span>Architectural sample view · illustrative lot records</span>
          <span className="font-mono text-slate-300">spb-ai-property-research-agent</span>
        </div>
      </div>
    </div>
  );
}

function DigitalXCrmCanvas() {
  const [roleView, setRoleView] = useState<"ADMIN" | "MEMBER">("ADMIN");
  const [activeMod, setActiveMod] = useState<"command" | "webhooks">("command");

  const isAdmin = roleView === "ADMIN";

  return (
    <div className="rounded-xl border border-white/10 bg-[#070a11]/90 overflow-hidden shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0b111e] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold text-white">DigitalX CRM · Command Centre</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#070a11] px-2 py-1 text-[11px] text-slate-400">
            <Search className="h-3 w-3 text-cyan-400" />
            <span className="font-mono">Cmd+K</span>
          </div>
          <div className="flex items-center rounded-lg border border-white/10 bg-[#070a11] p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setRoleView("ADMIN")}
              className={cn(
                "rounded-md px-2 py-1 font-medium transition-colors",
                isAdmin ? "bg-[#142038] text-cyan-300 border border-cyan-400/25" : "text-slate-400 hover:text-white"
              )}
            >
              Admin RBAC
            </button>
            <button
              type="button"
              onClick={() => setRoleView("MEMBER")}
              className={cn(
                "rounded-md px-2 py-1 font-medium transition-colors",
                !isAdmin ? "bg-[#142038] text-cyan-300 border border-cyan-400/25" : "text-slate-400 hover:text-white"
              )}
            >
              Ops Member
            </button>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-[148px_1fr]">
        <div className="border-b sm:border-b-0 sm:border-r border-white/10 bg-[#0b111e]/80 p-3 space-y-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveMod("command")}
            className={cn(
              "w-full text-left rounded-lg px-2.5 py-1.5 font-medium transition-colors",
              activeMod === "command"
                ? "bg-[#142038] text-white border border-cyan-400/25"
                : "text-slate-400 hover:text-white"
            )}
          >
            Pipeline &amp; Margins
          </button>
          <button
            type="button"
            onClick={() => setActiveMod("webhooks")}
            className={cn(
              "w-full text-left rounded-lg px-2.5 py-1.5 font-medium transition-colors",
              activeMod === "webhooks"
                ? "bg-[#142038] text-white border border-cyan-400/25"
                : "text-slate-400 hover:text-white"
            )}
          >
            Webhook Hub (4)
          </button>
          <div className="pt-2 border-t border-white/10 mt-2 space-y-1 text-[11px] text-slate-400 px-2.5">
            <p>Proposals &amp; eSign</p>
            <p>Call Records</p>
            <p>Audit Log</p>
            <p>Time Tracking</p>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {activeMod === "command" ? (
            <>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-2.5">
                  <p className="text-[11px] text-slate-400">Active Retainer MRR</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-white">
                    {isAdmin ? "$18,400 / mo" : "Restricted"}
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-2.5">
                  <p className="text-[11px] text-slate-400">AU / US Open Leads</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-white">14 Qualified</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-2.5">
                  <p className="text-[11px] text-slate-400">Avg Client Margin</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-emerald-300">
                    {isAdmin ? "64% Net" : "Ops Masked"}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 divide-y divide-white/10 text-xs">
                <div className="flex items-center justify-between px-3 py-2">
                  <div>
                    <p className="font-semibold text-white">AU Trade Operator · Sydney</p>
                    <p className="text-[11px] text-slate-400">AI Voice + GHL Snapshot · Health 92/100</p>
                  </div>
                  <span className="rounded border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                    WON &rarr; Active
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <div>
                    <p className="font-semibold text-white">US Dental Practice · Austin</p>
                    <p className="text-[11px] text-slate-400">Proposal v2 Sent · 1-Click Client Convert</p>
                  </div>
                  <span className="rounded border border-white/10 bg-[#070a11] px-2 py-0.5 font-mono text-[11px] text-slate-300">
                    {isAdmin ? "$3,200 Setup" : "Stage: Proposal"}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 divide-y divide-white/10 text-xs">
              {[
                { ep: "POST /api/webhooks/ghl", desc: "GoHighLevel pipeline & SMS events" },
                { ep: "POST /api/webhooks/apollo", desc: "Apollo outbound sequence replies" },
                { ep: "POST /api/webhooks/meta-ads", desc: "Meta Lead Form + CAPI attribution" },
                { ep: "POST /api/webhooks/n8n", desc: "Self-hosted workflow payload ingest" },
              ].map((hook) => (
                <div key={hook.ep} className="flex items-center justify-between gap-2 px-3 py-2">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] font-semibold text-cyan-300 truncate">{hook.ep}</p>
                    <p className="text-[11px] text-slate-400">{hook.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300 shrink-0">
                    <Terminal className="h-3 w-3" />
                    200 OK
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
            <span>RBAC state switch updates margin &amp; MRR visibility live</span>
            <span className="font-mono text-slate-300">Prisma + Next.js</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Links2000Canvas() {
  const [tierView, setTierView] = useState<"certs" | "routing">("certs");

  const certRows = [
    { name: "Pressure Safety Valve", std: "ISO/IEC 17025:2017 · Sec 7.8", status: "Issued" },
    { name: "4–20 mA Differential Transmitter", std: "EURAMET cg-17 · Traceable", status: "Verified" },
    { name: "Cleanroom Laminar Flow Cabinet", std: "ISO 14644 · Airflow & HEPA", status: "Issued" },
    { name: "Bourdon & Digital Pressure Gauge", std: "BS EN 837 Multipoint", status: "In Review" },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#070a11]/90 overflow-hidden shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0b111e] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <FileCheck2 className="h-4 w-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold text-white">Links 2000 · ISO/IEC 17025 LIMS</span>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#070a11] p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setTierView("certs")}
            className={cn(
              "rounded-md px-2.5 py-1 font-medium transition-colors",
              tierView === "certs" ? "bg-[#142038] text-cyan-300 border border-cyan-400/25" : "text-slate-400 hover:text-white"
            )}
          >
            Calibration Certs
          </button>
          <button
            type="button"
            onClick={() => setTierView("routing")}
            className={cn(
              "rounded-md px-2.5 py-1 font-medium transition-colors",
              tierView === "routing" ? "bg-[#142038] text-cyan-300 border border-cyan-400/25" : "text-slate-400 hover:text-white"
            )}
          >
            3-Tier Routing
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {tierView === "certs" ? (
          <>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-3">
                <p className="text-[11px] text-slate-400">Compliance</p>
                <p className="mt-1 font-mono text-sm font-semibold text-white">ISO 17025</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-3">
                <p className="text-[11px] text-slate-400">Uncertainty guide</p>
                <p className="mt-1 font-mono text-sm font-semibold text-white">JCGM 100</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-3">
                <p className="text-[11px] text-slate-400">Database RLS</p>
                <p className="mt-1 font-mono text-sm font-semibold text-emerald-300">Active</p>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 divide-y divide-white/10 text-xs">
              {certRows.map((row) => (
                <div key={row.name} className="flex items-center justify-between gap-2 px-3.5 py-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{row.name}</p>
                    <p className="text-[11px] text-slate-400">{row.std}</p>
                  </div>
                  <span className="rounded border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300 shrink-0">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-white/10 bg-[#0d1421]/90 p-4 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 font-semibold text-white">
              <GitBranch className="h-4 w-4 text-cyan-400" />
              <span>Resilient Tri-Tier Data Routing Architecture</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-[#070a11] border border-white/10 p-2.5">
                <span className="font-medium text-white">1. Primary Cloud DB · Supabase PostgreSQL</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-300">
                  <Lock className="h-3 w-3" /> RLS Enforced
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#070a11] border border-white/10 p-2.5">
                <span className="font-medium text-white">2. Secondary API · Django REST (Python 3.12)</span>
                <span className="font-mono text-[11px] text-slate-300">SQLite / DRF</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#070a11] border border-white/10 p-2.5">
                <span className="font-medium text-white">3. Offline Cache · TanStack Query Client Store</span>
                <span className="font-mono text-[11px] text-slate-300">Zero Downtime</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
          <span>Migrated from legacy VB6 + SQL Server schema</span>
          <span className="font-mono text-slate-300">React 19 · Django · Supabase</span>
        </div>
      </div>
    </div>
  );
}

export function ArchitecturalProductPreview({ slug }: { slug: FeaturedBuildSlug }) {
  if (slug === "smart-property-buying") return <SmartPropertyBuyingCanvas />;
  if (slug === "digitalx-custom-crm") return <DigitalXCrmCanvas />;
  return <Links2000Canvas />;
}

export function FeaturedBuildsShowcase({
  heading = "Shipped Software & Engineering Systems",
  subheading = "Explore real production architectures built across Australian property intelligence, multi-tenant custom CRM SaaS, and ISO-accredited laboratory systems.",
}: {
  heading?: string;
  subheading?: string;
}) {
  const [activeSlug, setActiveSlug] = useState<FeaturedBuildSlug>("smart-property-buying");
  const active = FEATURED_BUILDS.find((b) => b.slug === activeSlug) || FEATURED_BUILDS[0];

  return (
      <div className="rounded-3xl border border-white/10 bg-[#0d1421]/85 p-6 md:p-10 shadow-xs backdrop-blur-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/10 pb-6">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-cyan-300">Flagship engineering portfolio</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-white md:text-4xl">{heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{subheading}</p>
          </div>

          <div
            role="tablist"
            aria-label="Flagship Software Systems"
            className="flex flex-wrap gap-2"
          >
            {FEATURED_BUILDS.map((build) => {
              const selected = build.slug === activeSlug;
              return (
                <button
                  key={build.slug}
                  type="button"
                  role="tab"
                  id={`build-tab-${build.slug}`}
                  aria-selected={selected}
                  aria-controls={`build-panel-${build.slug}`}
                  onClick={() => setActiveSlug(build.slug)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors",
                    selected
                      ? "border-cyan-400/40 bg-brand text-white"
                      : "border-white/10 bg-[#070a11]/80 text-slate-300 hover:border-white/25 hover:text-white"
                  )}
                >
                  <span className={cn("font-mono text-[11px]", selected ? "text-white" : "text-cyan-300")}>
                    {build.index}
                  </span>
                  <span>{build.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Build Content */}
        <div
          id={`build-panel-${active.slug}`}
          role="tabpanel"
          aria-labelledby={`build-tab-${active.slug}`}
          className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#070a11]/85 px-2.5 py-1 text-xs font-medium text-slate-200">
                <Layers className="h-3.5 w-3.5 text-cyan-400" />
                <span>{active.domain}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white leading-snug">
                {active.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{active.summary}</p>
              <p className="mt-3 text-xs font-mono text-slate-400">{active.architectureNote}</p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {active.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-white/10 bg-[#070a11]/85 p-3">
                  <span className="block font-display text-lg font-semibold text-white tabular-nums">
                    {metric.value}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-slate-400">{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {active.stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#070a11]/80 px-2.5 py-1 text-xs font-medium text-slate-200"
                >
                  <ShieldCheck className="h-3 w-3 text-cyan-400" />
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={`/case-studies/${active.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white hover:bg-brand-deep transition-colors"
              >
                Read architecture case study
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              {active.secondaryHref && active.secondaryLabel ? (
                <Link
                  href={active.secondaryHref}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  {active.secondaryLabel}
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Scope a similar build
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ArchitecturalProductPreview slug={active.slug} />
          </div>
        </div>
      </div>
  );
}
