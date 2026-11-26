"use client";

import { useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { Check, ArrowRight, ShieldCheck, Database, Layers, ChevronDown } from "lucide-react";
import { MotionProvider, SpotlightCard, StaggerGroup, StaggerItem, AnimatedCounter } from "@/components/motion";
import factsData from "@/data/facts";
import { cn } from "@/lib/utils";

interface RetainerTier {
  name: string;
  price: string;
  summary: string;
  includes: string[];
  cta: string;
  highlight: boolean;
}

interface PricingTabsProps {
  retainerTiers: RetainerTier[];
  carrierTable: React.ReactNode;
  calculatorNode: React.ReactNode;
}

const AUD_MULTIPLIER = factsData.servicePricingRanges.audRateMultiplier || 1.54;

function formatCurrencyPrice(usdNumber: number, currency: "USD" | "AUD", suffix = "") {
  if (currency === "USD") {
    return `$${usdNumber.toLocaleString("en-US")}${suffix}`;
  }
  const audApprox = Math.round((usdNumber * AUD_MULTIPLIER) / 10) * 10;
  return `A$${audApprox.toLocaleString("en-US")}${suffix}`;
}

const crmTiers = [
  {
    name: "CRM Setup & Integration",
    usdPrice: 2200,
    priceSuffix: "",
    cadence: "One-Time Build",
    timeline: "2–3 Weeks Delivery",
    summary: "For growing operators needing turnkey GoHighLevel or HubSpot setup paired with custom n8n webhook pipelines.",
    highlight: false,
    badge: "100% Client-Owned Account",
    features: [
      "Pipeline & custom field architecture setup",
      "Bi-directional calendar & dispatch software sync",
      "Automated lead stage & task triggers",
      "Comprehensive staff SOP & admin handover",
      "100% client-owned account from day one",
    ],
    cta: "Scope Your Integration",
    href: "/contact",
  },
  {
    name: "Hybrid Custom CRM Build",
    usdPrice: 8500,
    priceSuffix: "",
    cadence: "One-Time Build",
    timeline: "3–6 Weeks Delivery",
    summary: "Our flagship hybrid model: bespoke Next.js and PostgreSQL portals built on top of enterprise GHL/HubSpot APIs.",
    highlight: true,
    badge: "Most Popular",
    ownershipBadge: "100% Source Code & IP Ownership",
    features: [
      "Everything in Setup & Integration",
      "Bespoke client self-service & staff web portals",
      "Role-Based Access Control (RBAC) security",
      "Legacy data migration & E.164 deduplication",
      "Live telephony & call recording sync",
      "Zero recurring per-seat software licensing fees",
    ],
    cta: "Book an Architecture Call",
    href: "/contact",
  },
  {
    name: "Proprietary / White-Label CRM",
    usdPrice: 15000,
    priceSuffix: "+",
    cadence: "Custom Scope",
    timeline: "6–10 Weeks Delivery",
    summary: "Multi-tenant SaaS architecture with custom billing, multi-agency sub-accounts, and dedicated cloud hosting.",
    highlight: false,
    badge: "Enterprise & Multi-Tenant",
    ownershipBadge: "100% Source Code & IP Ownership",
    features: [
      "Everything in Hybrid Custom CRM",
      "Multi-tenant workspaces & agency sub-accounts",
      "Full white-label custom domain & client branding",
      "Stripe billing & automated subscription engine",
      "Executive revenue & pipeline analytics dashboard",
      "Dedicated CI/CD pipelines & post-launch SLA",
    ],
    cta: "Request Custom Proposal",
    href: "/contact",
  },
];

const aeoBlocks = [
  {
    question: "What is a hybrid custom CRM?",
    answer:
      "A hybrid custom CRM pairs a bespoke, high-performance web interface (built with Next.js and PostgreSQL) with battle-tested enterprise backend APIs like GoHighLevel or HubSpot. This architecture delivers custom data schemas, role-based access control, and 100% IP ownership while eliminating per-seat SaaS licensing taxes and avoiding the high risk of building a CRM entirely from scratch.",
  },
  {
    question: "How much does custom CRM development cost?",
    answer:
      "Custom CRM development at DigitalX Solutions starts at $2,200 USD (~A$3,390 AUD) for turnkey API setup and webhook integration, $8,500 USD (~A$13,090 AUD) for a production hybrid custom CRM with bespoke client portals, and $15,000+ USD (~A$23,100+ AUD) for proprietary multi-tenant platforms with zero recurring seat fees.",
  },
  {
    question: "How long does it take to build a custom CRM?",
    answer:
      "A production-grade hybrid custom CRM typically ships in 3 to 6 weeks. Simple API integrations and workflow configurations deploy in 2 to 3 weeks, while complex proprietary or multi-tenant white-label architectures with custom billing and multi-region telephony take 6 to 10 weeks from architectural discovery to production launch.",
  },
];

const PILL_SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };
const EASE_PRECISION: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PricingTabs({ retainerTiers, carrierTable, calculatorNode }: PricingTabsProps) {
  const [activeTab, setActiveTab] = useState<"crm" | "retainers">("crm");
  const [currency, setCurrency] = useState<"USD" | "AUD">("USD");
  const [openAeoIndices, setOpenAeoIndices] = useState<number[]>([0, 1, 2]);

  const toggleAeoIndex = (idx: number) => {
    setOpenAeoIndices((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  const tcoRows = [
    {
      category: "Per-Seat Software Fees (20 Users)",
      legacy:
        currency === "USD"
          ? "$2,000 – $3,000 / month ($72,000 – $108,000 over 3 yrs)"
          : "A$3,080 – A$4,620 / month (A$110,880 – A$166,320 over 3 yrs)",
      digitalx: `${currency === "USD" ? "$0" : "A$0"} / month (Unlimited internal & client seats)`,
      winner: true,
    },
    {
      category: "Initial Implementation & Migration",
      legacy:
        currency === "USD"
          ? "$5,000 – $15,000+ (Consultant fees)"
          : "A$7,700 – A$23,100+ (Consultant fees)",
      digitalx:
        currency === "USD"
          ? "$8,500 – $15,000 (Fixed-scope build)"
          : "A$13,090 – A$23,100 (Fixed-scope build)",
      winner: false,
    },
    {
      category: "Monthly Cloud Hosting & APIs",
      legacy: "Included in seat fees",
      digitalx:
        currency === "USD"
          ? "~$100 – $250 / month (Direct pass-through)"
          : "~A$155 – A$385 / month (Direct pass-through)",
      winner: false,
    },
    {
      category: "3-Year Total Cost of Ownership (Illustrative estimate)",
      legacy:
        currency === "USD"
          ? "$77,000 – $123,000+"
          : "A$118,580 – A$189,420+",
      digitalx:
        currency === "USD"
          ? "$12,100 – $24,000 (60%+ illustrative savings)"
          : "A$18,630 – A$36,960 (60%+ illustrative savings)",
      winner: true,
    },
    {
      category: "Asset Ownership & Codebase",
      legacy: "Rented (lose access if you cancel)",
      digitalx: "100% Owned (Your repo, your database)",
      winner: true,
    },
  ];

  const formatRetainerPrice = (rawUsdPrice: string) => {
    const match = rawUsdPrice.match(/\$([\d,]+)/);
    if (!match) return rawUsdPrice;
    const numeric = Number(match[1].replace(/,/g, ""));
    if (currency === "USD") return rawUsdPrice;
    const converted = formatCurrencyPrice(numeric, "AUD");
    return `${converted}/mo`;
  };

  return (
    <MotionProvider>
      <div className="w-full">
        {/* Controls Row: Category Tabs + USD/AUD Currency Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div
            role="tablist"
            aria-label="Pricing Categories"
            className="relative inline-flex flex-wrap justify-center gap-1 rounded-xl border border-white/10 bg-[#0d1421] p-1.5 shadow-xs"
          >
            <button
              role="tab"
              id="tab-crm"
              aria-controls="tabpanel-crm"
              aria-selected={activeTab === "crm"}
              onClick={() => setActiveTab("crm")}
              type="button"
              className={cn(
                "relative z-10 flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                activeTab === "crm"
                  ? "text-white"
                  : "text-slate-300 hover:text-white"
              )}
            >
              {activeTab === "crm" && (
                <m.span
                  layoutId="pricing-tab-pill"
                  transition={PILL_SPRING}
                  className="absolute inset-0 rounded-lg border border-cyan-400/35 bg-[#142038] shadow-sm"
                  aria-hidden="true"
                />
              )}
              <Database className="relative z-10 h-4 w-4 text-cyan-400" />
              <span className="relative z-10">Custom CRM &amp; Engineering Builds</span>
              <span className="relative z-10 rounded-md bg-cyan-500/15 border border-cyan-400/25 px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan-300">
                Flagship
              </span>
            </button>

            <button
              role="tab"
              id="tab-retainers"
              aria-controls="tabpanel-retainers"
              aria-selected={activeTab === "retainers"}
              onClick={() => setActiveTab("retainers")}
              type="button"
              className={cn(
                "relative z-10 flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                activeTab === "retainers"
                  ? "text-white"
                  : "text-slate-300 hover:text-white"
              )}
            >
              {activeTab === "retainers" && (
                <m.span
                  layoutId="pricing-tab-pill"
                  transition={PILL_SPRING}
                  className="absolute inset-0 rounded-lg border border-cyan-400/35 bg-[#142038] shadow-sm"
                  aria-hidden="true"
                />
              )}
              <Layers className="relative z-10 h-4 w-4 text-cyan-400" />
              <span className="relative z-10">AI Voice &amp; Automation Retainers</span>
            </button>
          </div>

          {/* USD / AUD Currency Toggle */}
          <div
            role="group"
            aria-label="Select pricing display currency"
            className="inline-flex items-center rounded-xl border border-white/10 bg-[#0d1421] p-1 shadow-2xs"
          >
            {(["USD", "AUD"] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrency(curr)}
                aria-pressed={currency === curr}
                className={cn(
                  "rounded-md px-3.5 py-2 font-mono text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                  currency === curr
                    ? "border border-cyan-400/35 bg-[#142038] text-cyan-300 shadow-2xs"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {currency === "AUD" && (
          <p className="mt-3 text-center text-[11px] text-slate-400">
            {factsData.servicePricingRanges.audExchangeRateNote}.
          </p>
        )}

        {/* SSR-Mounted Tab Panels (both rendered in HTML so search engines & LLMs index all semantic tables) */}
        <div
          id="tabpanel-crm"
          role="tabpanel"
          aria-labelledby="tab-crm"
          aria-hidden={activeTab !== "crm"}
          className={cn("mt-12", activeTab !== "crm" && "hidden")}
        >
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-mono text-xs font-medium text-brand-deep">
                Fixed-scope milestone deliveries
              </p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                Fixed-Scope Custom CRM &amp; Engineering Builds
              </h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-foreground/75">
                Custom CRM builds start at {formatCurrencyPrice(2200, currency)} for turnkey API integration, {formatCurrencyPrice(8500, currency)} for Hybrid Next.js/PostgreSQL portals, and {formatCurrencyPrice(15000, currency, "+")} for multi-tenant platforms. Every build ships on fixed milestones into your cloud infrastructure with zero per-seat fees and full source code ownership.
              </p>
            </div>

            {/* 3-Tier Grid — immediate SSR paint without hydration fade delay */}
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {crmTiers.map((tier) => (
                <div key={tier.name} className="h-full">
                  <SpotlightCard
                    className={cn(
                      "h-full rounded-2xl border bg-[#0d1421]/85 p-6 md:p-8 backdrop-blur-md transition-all duration-200 [@media(hover:hover)]:hover:-translate-y-1",
                      tier.highlight
                        ? "border-cyan-400/50 shadow-[0_0_40px_-14px_rgba(56,189,248,0.28)] ring-1 ring-cyan-400/25 relative overflow-visible"
                        : "border-white/10 shadow-xs"
                    )}
                  >
                    {tier.highlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                        <span className="inline-flex items-center gap-1 rounded-md bg-brand px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
                          {tier.badge}
                        </span>
                      </div>
                    )}

                    <article className="flex h-full flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-xl font-semibold text-white">
                              {tier.name}
                            </h3>
                            <p className="mt-1 font-mono text-xs font-medium text-cyan-300">
                              {tier.timeline}
                            </p>
                          </div>
                          {!tier.highlight && tier.badge && (
                            <span className="rounded-md border border-white/10 bg-[#070a11]/80 px-2 py-0.5 text-[11px] font-medium text-slate-300 shrink-0">
                              {tier.badge}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex items-baseline gap-2">
                          <span className="font-display text-4xl font-semibold tracking-tight text-white">
                            {formatCurrencyPrice(tier.usdPrice, currency, tier.priceSuffix)}
                          </span>
                          <span className="text-xs font-medium text-slate-400">
                            {currency} &bull; {tier.cadence}
                          </span>
                        </div>

                        <p className="mt-3 text-xs md:text-sm text-slate-300 leading-relaxed">
                          {tier.summary}
                        </p>

                        <div className="mt-6 border-t border-white/10 pt-6">
                          <p className="text-xs font-medium text-slate-200">
                            Included architecture deliverables
                          </p>
                          <ul className="mt-3 space-y-2.5 text-xs text-slate-300">
                            {tier.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2">
                                <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10">
                        <Link
                          href={tier.href}
                          className={cn(
                            "group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all",
                            tier.highlight
                              ? "bg-brand text-white shadow-xs hover:bg-brand-deep"
                              : "border border-white/15 bg-white/5 text-white hover:border-cyan-400/40 hover:bg-white/10"
                          )}
                        >
                          <span>{tier.cta}</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </Link>
                        {tier.ownershipBadge && (
                          <p className="mt-2.5 text-center text-[11px] font-medium text-emerald-300 flex items-center justify-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                            {tier.ownershipBadge}
                          </p>
                        )}
                      </div>
                    </article>
                  </SpotlightCard>
                </div>
              ))}
            </div>

            {/* TCO Comparison Table with Source & Calculation Inputs */}
            <section className="mt-16 rounded-3xl border border-white/10 bg-[#0d1421]/85 p-6 md:p-10 shadow-xs backdrop-blur-md">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs font-medium text-cyan-300">
                    Financial model (Illustrative estimate)
                  </p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-white">
                    Why a Hybrid Custom CRM Cuts Total Cost of Ownership by 60%+
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Over 36 months, a 20-user team paying typical enterprise CRM seat fees spends {currency === "USD" ? "$77,000 to $123,000+" : "A$118,580 to A$189,420+"}. Replacing seat subscriptions with a Hybrid Custom CRM models an illustrative 3-year total of {currency === "USD" ? "$12,100 to $24,000" : "A$18,630 to A$36,960"}, cutting modeled 3-year cost by 60%+.
                  </p>
                </div>

                {/* Highlight Animated Counter Callout */}
                <div className="flex items-center gap-5 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-5 py-4 shrink-0">
                  <div>
                    <span className="block font-mono text-[11px] text-emerald-300">
                      Illustrative 3-yr reduction
                    </span>
                    <span className="font-display text-3xl font-semibold text-emerald-300">
                      <AnimatedCounter value={60} suffix="%+" /> Est.
                    </span>
                  </div>
                  <div className="h-10 w-px bg-emerald-400/20" aria-hidden="true" />
                  <div>
                    <span className="block font-mono text-[11px] text-slate-300">
                      Modeled Hybrid TCO
                    </span>
                    <span className="font-mono text-xl font-semibold text-white">
                      <AnimatedCounter
                        value={currency === "USD" ? 12100 : 18630}
                        prefix={currency === "USD" ? "$" : "A$"}
                      />
                    </span>
                  </div>
                </div>
              </div>

              {/* Animated Visual 3-Year Cost Comparison Bars */}
              <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-[#070a11]/80 p-5 md:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-200">Salesforce / HubSpot Enterprise (20 Seats / 3 Yrs)</span>
                    <span className="font-mono font-semibold text-slate-300">
                      {currency === "USD" ? "$77,000 – $123,000+" : "A$118,580 – A$189,420+"}
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                    <m.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.85, ease: EASE_PRECISION }}
                      style={{ originX: 0 }}
                      className="h-full w-full rounded-full bg-slate-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-cyan-300">DigitalX Hybrid Custom CRM (Unlimited Seats / 3 Yrs)</span>
                    <span className="font-mono font-semibold text-emerald-300">
                      {currency === "USD" ? "$12,100 – $24,000" : "A$18,630 – A$36,960"}
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                    <m.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 0.22 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.85, delay: 0.15, ease: EASE_PRECISION }}
                      style={{ originX: 0 }}
                      className="h-full w-full rounded-full bg-emerald-400"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#070a11]/80 text-xs font-semibold text-white">
                      <th scope="col" className="p-4">Cost Category</th>
                      <th scope="col" className="p-4">Legacy Enterprise CRM (Salesforce / HubSpot Pro)</th>
                      <th scope="col" className="p-4 bg-cyan-500/10 text-cyan-300">DigitalX Hybrid Custom CRM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-slate-300">
                    {tcoRows.map((row, idx) => (
                      <m.tr
                        key={row.category}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.3, delay: idx * 0.05, ease: EASE_PRECISION }}
                        className="hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="p-4 font-semibold text-white">{row.category}</td>
                        <td className="p-4 text-slate-300 font-mono text-xs">{row.legacy}</td>
                        <td className={cn("p-4 font-mono text-xs font-semibold bg-cyan-500/[0.06]", row.winner ? "text-emerald-300" : "text-white")}>
                          {row.digitalx}
                        </td>
                      </m.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-200">Source: {factsData.tcoModel.source}.</strong>{" "}
                <strong className="text-slate-200">Calculation inputs:</strong> {factsData.tcoModel.calculationInputs}
              </p>
            </section>

            {/* AEO Direct-Answer Accordions — ALWAYS mounted in SSR HTML DOM */}
            <section className="mt-12 grid gap-4 md:grid-cols-3">
              {aeoBlocks.map((block, index) => {
                const isOpen = openAeoIndices.includes(index);
                const contentId = `aeo-panel-${index}`;
                return (
                  <div
                    key={block.question}
                    className="rounded-2xl border border-white/10 bg-[#0d1421]/85 overflow-hidden transition-colors hover:border-cyan-400/35"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAeoIndex(index)}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      className="flex w-full items-start justify-between gap-3 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                    >
                      <h4 className="font-display text-base font-semibold text-white">
                        {block.question}
                      </h4>
                      <m.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/15 bg-[#070a11] text-slate-300"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </m.span>
                    </button>
                    <m.div
                      id={contentId}
                      aria-hidden={!isOpen}
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.22, ease: EASE_PRECISION }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-xs leading-relaxed text-slate-300 border-t border-white/10 pt-3">
                        {block.answer}
                      </p>
                    </m.div>
                  </div>
                );
              })}
            </section>

            {/* Dual CTA Section */}
            <section className="mt-12 rounded-2xl border border-white/10 bg-[#0d1421]/85 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
              <div>
                <h4 className="font-display text-xl font-semibold text-white">
                  Need a fixed quote for your custom CRM architecture?
                </h4>
                <p className="mt-1 text-sm text-slate-300">
                  Speak directly with our solutions engineering team. We review your data model and provide a milestone proposal.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-brand-deep transition-all"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/try-voice-agent"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                >
                  Hear a live AI demo
                </Link>
              </div>
            </section>
          </div>

          <div
            id="tabpanel-retainers"
            role="tabpanel"
            aria-labelledby="tab-retainers"
            aria-hidden={activeTab !== "retainers"}
            className={cn("mt-12", activeTab !== "retainers" && "hidden")}
          >
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-mono text-xs font-medium text-brand-deep">
                Monthly operational infrastructure
              </p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                Predictable AI Voice &amp; Automation Retainers
              </h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-foreground/75">
                AI voice and automation retainers range from {currency === "USD" ? "$450/mo" : "A$690/mo"} for missed-call SMS recovery to {currency === "USD" ? "$2,800/mo" : "A$4,310/mo"} for multi-location AI receptionists and pipelines. All carrier Twilio telephony usage passes through transparently at 0% markup directly in USD or AUD.
              </p>
            </div>

            {/* Staggered Retainer Grid */}
            <StaggerGroup immediate className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {retainerTiers.map((tier) => (
                <StaggerItem key={tier.name} className="h-full">
                  <SpotlightCard
                    className={cn(
                      "h-full rounded-2xl border bg-[#0d1421]/85 p-6 md:p-8 backdrop-blur-md transition-all duration-200 [@media(hover:hover)]:hover:-translate-y-1",
                      tier.highlight
                        ? "border-cyan-400/50 shadow-[0_0_36px_-14px_rgba(56,189,248,0.28)] ring-1 ring-cyan-400/25 relative"
                        : "border-white/10 shadow-xs"
                    )}
                  >
                    <article className="flex h-full flex-col justify-between">
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-display text-xl font-semibold text-white">{tier.name}</h3>
                          {tier.highlight && (
                            <span className="rounded-md border border-cyan-400/25 bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold text-cyan-300 shrink-0">
                              Most Picked
                            </span>
                          )}
                        </div>
                        <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-white">
                          {formatRetainerPrice(tier.price)}
                        </p>
                        <p className="mt-3 text-xs md:text-sm text-slate-300 leading-relaxed">{tier.summary}</p>

                        <ul className="mt-6 space-y-2.5 text-xs text-slate-300 border-t border-white/10 pt-5">
                          {tier.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-5 border-t border-white/10">
                        <Link
                          href="/contact"
                          className={cn(
                            "inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all",
                            tier.highlight
                              ? "bg-brand text-white hover:bg-brand-deep shadow-xs"
                              : "border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-400/40"
                          )}
                        >
                          {tier.cta}
                        </Link>
                      </div>
                    </article>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <p className="mt-5 text-center text-xs text-slate-400">
              Serving Australian and US businesses. Pricing toggled in {currency}. Australian clients can be invoiced in AUD with GST-compliant tax documentation upon request.
            </p>

            {/* Carrier Pass-Through Table */}
            <div className="mt-12">{carrierTable}</div>

            {/* Revenue Calculator */}
            <div className="mt-12">{calculatorNode}</div>
          </div>
      </div>
    </MotionProvider>
  );
}
