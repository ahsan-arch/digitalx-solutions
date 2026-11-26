type SectionIllustrationProps = {
  src: string;
  alt?: string;
  aspect?: string;
  priority?: boolean;
};

type SpecRow = { label: string; value: string; tone?: "accent" | "success" | "neutral" };

interface HeroSpecCard {
  heading: string;
  subtitle: string;
  rows: SpecRow[];
  footer: string;
}

const SPEC_MAP: Record<string, HeroSpecCard> = {
  pricing: {
    heading: "Pricing Architecture Overview",
    subtitle: "Fixed-scope builds and transparent retainers (USD)",
    rows: [
      { label: "CRM Setup & Integration", value: "$2,200 one-time", tone: "neutral" },
      { label: "Hybrid Custom CRM Build", value: "$8,500 one-time", tone: "accent" },
      { label: "Proprietary / White-Label CRM", value: "$15,000+ scoped", tone: "neutral" },
      { label: "AI Voice & Automation Retainers", value: "$295 – $1,500/mo", tone: "neutral" },
      { label: "Per-Seat Software Fees", value: "$0 / unlimited seats", tone: "success" },
      { label: "Carrier Twilio Markup", value: "0% pass-through", tone: "success" },
    ],
    footer: "AUD invoicing available (~1.54x USD indicative rate)",
  },
  about: {
    heading: "Engineering Leadership & Stack",
    subtitle: "Serving Australian and US businesses since 2020",
    rows: [
      { label: "Custom Portals & Schemas", value: "Next.js 15 + PostgreSQL", tone: "accent" },
      { label: "CRM Foundations", value: "GoHighLevel & HubSpot APIs", tone: "neutral" },
      { label: "Workflow Orchestration", value: "Self-hosted n8n", tone: "neutral" },
      { label: "Voice Telephony", value: "Twilio SIP (< 800ms target)", tone: "neutral" },
      { label: "Asset & Code Ownership", value: "100% client-owned repo", tone: "success" },
    ],
    footer: "Lead Architect: Jazib Shahid",
  },
  contact: {
    heading: "Scoping Session Structure",
    subtitle: "20-minute engineering review",
    rows: [
      { label: "1. Intake Audit", value: "Call volume & CRM bottlenecks", tone: "neutral" },
      { label: "2. Stack Check", value: "Webhook, calendar & SIP fit", tone: "neutral" },
      { label: "3. Fixed Proposal", value: "Milestone pricing & timeline", tone: "accent" },
      { label: "Written Turnaround", value: "Within 1 business day", tone: "success" },
    ],
    footer: "Direct response from engineering leadership",
  },
  au: {
    heading: "Australian Delivery Coverage",
    subtitle: "AEDT / AEST & AWST aligned workflows",
    rows: [
      { label: "Local Telephony", value: "Australian DID & SIP trunks", tone: "neutral" },
      { label: "Compliance Alignment", value: "Privacy Act & Spam Act 2003", tone: "success" },
      { label: "Field & Clinic Integrations", value: "Cliniko, ServiceM8, simPRO, Xero", tone: "neutral" },
      { label: "Invoicing Currency", value: "AUD with GST tax invoices", tone: "accent" },
    ],
    footer: "Serving Australian and US businesses",
  },
  usa: {
    heading: "United States Delivery Coverage",
    subtitle: "EST / CST / PST aligned workflows",
    rows: [
      { label: "Messaging Compliance", value: "TCR 10DLC A2P registration", tone: "success" },
      { label: "Carrier Infrastructure", value: "US local Twilio DID & SIP", tone: "neutral" },
      { label: "Field & Clinic Stacks", value: "ServiceTitan, Jobber, HubSpot, GHL", tone: "neutral" },
      { label: "Missed-Call SMS SLA", value: "Under 60 seconds", tone: "accent" },
    ],
    footer: "Serving Australian and US businesses",
  },
  process: {
    heading: "Production Delivery Cadence",
    subtitle: "Structured weekly milestones",
    rows: [
      { label: "Phase 1 — Discovery", value: "Call logs & data schema audit", tone: "neutral" },
      { label: "Phase 2 — Core Build", value: "CRM, Next.js portal & webhooks", tone: "accent" },
      { label: "Phase 3 — Stress Test", value: "50+ simulated calls & payloads", tone: "neutral" },
      { label: "Phase 4 — Handover", value: "100% repo & credential transfer", tone: "success" },
    ],
    footer: "5–14 days for GHL/Voice • 3–6 weeks for Hybrid CRMs",
  },
  "meta-ads": {
    heading: "Attribution & CAPI Pipeline",
    subtitle: "Server-side signal recovery",
    rows: [
      { label: "Event Collection", value: "First-party server CAPI", tone: "accent" },
      { label: "Signal Protection", value: "SHA-256 PII hashing & dedupe", tone: "success" },
      { label: "CRM Loop", value: "Booked deals synced back to Meta", tone: "neutral" },
      { label: "Setup Window", value: "5–10 business days", tone: "neutral" },
    ],
    footer: "Serving Australian and US businesses",
  },
  "web-dev": {
    heading: "Web Engineering Standards",
    subtitle: "Next.js App Router production builds",
    rows: [
      { label: "Rendering Model", value: "Server Components & SSG", tone: "accent" },
      { label: "Form & Booking Wiring", value: "Direct GHL / HubSpot / n8n", tone: "neutral" },
      { label: "SEO Foundation", value: "Semantic HTML & JSON-LD", tone: "success" },
      { label: "Ownership", value: "100% private Git repository", tone: "success" },
    ],
    footer: "Engineered for speed and conversion",
  },
};

function getSlug(src: string): string {
  return src.split("/").pop()?.replace(/\.[^/.]+$/, "") || "about";
}

/**
 * Renders a crisp, high-contrast architectural summary card in pure HTML/CSS
 * matching the page's exact technical scope — eliminating generic SVG blobs
 * and avoiding image LCP delays.
 */
export function SectionIllustration({
  src,
  alt = "",
}: SectionIllustrationProps) {
  const slug = getSlug(src);
  const spec = SPEC_MAP[slug] || {
    heading: alt ? alt.slice(0, 48) : "DigitalX Architecture Overview",
    subtitle: "Serving Australian and US businesses",
    rows: [
      { label: "Custom CRM Portals", value: "Next.js + PostgreSQL", tone: "accent" },
      { label: "Workflow Orchestration", value: "Self-hosted n8n & webhooks", tone: "neutral" },
      { label: "Telephony & Recovery", value: "24/7 AI Voice + < 60s SMS", tone: "neutral" },
      { label: "Code & Data Ownership", value: "100% Client Owned", tone: "success" },
    ],
    footer: "Fixed-scope milestones and direct carrier billing",
  };

  return (
    <div
      aria-label={alt || spec.heading}
      className="w-full rounded-2xl border border-white/15 bg-[#0b111e]/90 p-5 md:p-6 shadow-[0_20px_50px_-16px_rgba(2,6,23,0.8)] backdrop-blur-xl"
    >
      <div className="border-b border-white/10 pb-3.5">
        <p className="font-display text-base font-semibold text-white">
          {spec.heading}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">{spec.subtitle}</p>
      </div>

      <dl className="mt-3 divide-y divide-white/10">
        {spec.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 py-2.5 text-xs"
          >
            <dt className="text-slate-300">{row.label}</dt>
            <dd
              className={
                row.tone === "accent"
                  ? "font-mono font-semibold tabular-nums text-cyan-300 text-right"
                  : row.tone === "success"
                  ? "font-mono font-semibold tabular-nums text-emerald-300 text-right"
                  : "font-mono font-medium tabular-nums text-white text-right"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 border-t border-white/10 pt-3 text-[11px] font-mono text-slate-400">
        {spec.footer}
      </div>
    </div>
  );
}
