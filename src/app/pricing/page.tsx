import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { HelpCircle, PhoneCall, ShieldCheck } from "lucide-react";
import { SectionIllustration, FAQAccordion } from "@/components/ui";

const MissedCallCalculator = dynamic(
  () => import("@/components/ui/missed-call-calculator").then((m) => m.MissedCallCalculator),
  { loading: () => <div className="h-[420px] rounded-2xl border border-border/80 bg-surface-50" /> }
);
import { PricingTracker } from "@/components/analytics/pricing-tracker";
import { PricingTabs } from "@/components/pricing/pricing-tabs";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/pricing", {
  title: "Custom CRM & AI Automation Pricing",
  description:
    "Fixed-scope custom CRM development tiers and AI automation retainers. 100% IP ownership, zero per-seat fees, and transparent carrier pass-through rates.",
});

const tiers = [
  {
    name: "Missed-Call Recovery",
    price: "$295/mo",
    summary: "For local operators looking to recover missed calls via instant SMS text-back.",
    includes: [
      "Instant missed-call text-back (under 60 seconds)",
      "10DLC A2P brand registration assistance",
      "Two-way SMS conversational triage",
      "Lead notification routing to staff",
      "Monthly recovery performance report",
    ],
    cta: "Start with Recovery",
    highlight: false,
  },
  {
    name: "Launch",
    price: "$750/mo",
    summary: "For solo operators ready to deploy an AI voice receptionist.",
    includes: [
      "AI voice agent (single number)",
      "Missed call text back & recovery (under 60s)",
      "GoHighLevel CRM setup & pipelines",
      "Booking calendar integration",
      "Monthly performance review",
    ],
    cta: "Start with Launch",
    highlight: false,
  },
  {
    name: "Operate",
    price: "$1,500/mo",
    summary: "For multi location teams scaling lead capture and follow up.",
    includes: [
      "Everything in Launch",
      "Web + WhatsApp + SMS chatbot",
      "Multi step nurture sequences",
      "Pipeline + lead scoring",
      "Live ROI dashboard",
      "Bi-weekly optimization calls",
    ],
    cta: "Talk to us",
    highlight: true,
  },
  {
    name: "Scale",
    price: "Custom",
    summary: "For growth teams running paid ads and multi channel automation.",
    includes: [
      "Everything in Operate",
      "Meta + Google Ads ops",
      "Server side tracking + CAPI",
      "Custom n8n workflows",
      "Dedicated growth engineer",
      "Quarterly business review",
    ],
    cta: "Request a quote",
    highlight: false,
  },
];

const pricingFaqs = [
  {
    question: "What is a hybrid custom CRM?",
    answer:
      "A hybrid custom CRM pairs a bespoke, high-performance web interface (built with Next.js and PostgreSQL) with battle-tested enterprise backend APIs like GoHighLevel or HubSpot. This architecture delivers custom data schemas, role-based access control, and 100% IP ownership while eliminating per-seat SaaS licensing taxes and avoiding the high risk of building a CRM entirely from scratch.",
  },
  {
    question: "How much does custom CRM development cost?",
    answer:
      "Custom CRM development at DigitalX Solutions starts at $2,200 for turnkey API setup and webhook integration, $8,500 for a production hybrid custom CRM with bespoke client portals and role-based permissions, and $15,000+ for proprietary multi-tenant white-label platforms. Every project is scoped with fixed milestones and zero recurring seat fees.",
  },
  {
    question: "How long does it take to build a custom CRM?",
    answer:
      "A production-grade hybrid custom CRM typically ships in 3 to 6 weeks. Simple API integrations and workflow configurations deploy in 2 to 3 weeks, while complex proprietary or multi-tenant white-label architectures with custom billing and multi-region telephony take 6 to 10 weeks from architectural discovery to production launch.",
  },
  {
    question: "How does DigitalX Solutions pricing work?",
    answer:
      "We offer two models: fixed-scope milestone pricing for Custom CRM builds (starting at $2,200), and transparent monthly retainers for AI Voice & Telephony operations (from $295 to $1,500/mo, all prices in USD). There are zero per-seat software fees and zero markup on raw carrier telephony minutes.",
  },
  {
    question: "Do you offer custom pricing for high-volume teams?",
    answer:
      "Yes. Our Scale package is fully custom for teams running paid ads, multi-channel automation, or high call volumes. Pricing depends on call volume, ad spend managed, and the number of integrations required. Book a strategy call for a tailored quote.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "Custom CRM builds are fixed-scope with milestone delivery and no recurring software contracts. AI Voice Operate and Scale packages have a 3-month onboarding minimum to build, test, and tune models before switching to month-to-month. Launch is month-to-month from day one.",
  },
  {
    question: "What is included in the setup fee?",
    answer:
      "Setup covers discovery and scoping, AI voice prompt tuning, full GoHighLevel (or your CRM) build, calendar and booking integrations, server-side tracking with CAPI where required, and team SOPs for handover.",
  },
  {
    question: "How do telephony and carrier charges work?",
    answer:
      "Telephony charges (Twilio SIP minutes and outbound SMS carrier fees) are billed at raw carrier pass-through rates directly to your own account, or transparently through GoHighLevel LC Phone. We do not mark up your SMS segments or inbound voice call minutes.",
  },
  {
    question: "Can Australian businesses pay in AUD?",
    answer:
      "Yes. While standard pricing is shown in USD for international parity, all Australian businesses can be invoiced in AUD with Australian GST compliant tax invoices upon request.",
  },
];

export default function PricingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Pricing", url: `${siteConfig.domain}/pricing` },
  ]);

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${siteConfig.domain}/pricing#catalog`,
    name: "DigitalX Solutions Custom CRM & AI Automation Pricing",
    itemListElement: [
      {
        "@type": "Offer",
        name: "CRM Setup & Integration",
        price: "2200",
        priceCurrency: "USD",
        description: "GoHighLevel or HubSpot CRM setup, custom n8n webhook integrations, calendar/dispatch sync, and SOP handover.",
        url: `${siteConfig.domain}/pricing#crm-setup`,
      },
      {
        "@type": "Offer",
        name: "Hybrid Custom CRM Build",
        price: "8500",
        priceCurrency: "USD",
        description: "Bespoke Next.js/React portals, PostgreSQL/Supabase backend, RBAC, legacy migration, and telephony sync.",
        url: `${siteConfig.domain}/pricing#hybrid-crm`,
      },
      {
        "@type": "Offer",
        name: "Proprietary / White-Label CRM",
        price: "15000",
        priceCurrency: "USD",
        description: "Multi-tenant SaaS architecture, white-label branding, Stripe billing, executive analytics, and CI/CD pipelines.",
        url: `${siteConfig.domain}/pricing#white-label-crm`,
      },
      ...tiers.map((tier) => ({
        "@type": "Offer",
        name: `${tier.name} Retainer`,
        description: tier.summary,
        price: tier.price.replace(/[^0-9]/g, "") || "750",
        priceCurrency: "USD",
        billingDuration: "P1M",
        url: `${siteConfig.domain}/pricing#${tier.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      })),
    ],
  };

  const faqSchema = generateFAQSchema(pricingFaqs);

  const carrierTableNode = (
    <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-10 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <PhoneCall className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground">
            Carrier Pass-Through &amp; Telephony Unit Economics
          </h3>
          <p className="text-xs md:text-sm text-foreground/75">
            We believe in total billing transparency. Here is exactly what carrier infrastructure costs.
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border/80 bg-surface-50 text-xs font-semibold text-foreground">
              <th scope="col" className="p-3.5">Component</th>
              <th scope="col" className="p-3.5">Provider / Protocol</th>
              <th scope="col" className="p-3.5">Direct Carrier Cost</th>
              <th scope="col" className="p-3.5">DigitalX Markup</th>
              <th scope="col" className="p-3.5">Typical Monthly Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground/80">
            <tr className="hover:bg-surface-50/50">
              <td className="p-3.5 font-medium text-foreground">Inbound Phone Number</td>
              <td className="p-3.5 font-mono text-xs">Twilio Local DID</td>
              <td className="p-3.5 font-mono text-xs">$1.15 &ndash; $2.50 / month</td>
              <td className="p-3.5 font-semibold text-emerald-700">0% (Pass-through)</td>
              <td className="p-3.5 font-mono text-xs">$2 / line</td>
            </tr>
            <tr className="hover:bg-surface-50/50">
              <td className="p-3.5 font-medium text-foreground">AI Voice Inbound Minutes</td>
              <td className="p-3.5 font-mono text-xs">Twilio SIP / AI Voice Infrastructure</td>
              <td className="p-3.5 font-mono text-xs">~$0.07 &ndash; $0.11 / min</td>
              <td className="p-3.5 font-semibold text-emerald-700">Included in Tier</td>
              <td className="p-3.5 font-mono text-xs">Covered under fair-use</td>
            </tr>
            <tr className="hover:bg-surface-50/50">
              <td className="p-3.5 font-medium text-foreground">Two-Way SMS Segments</td>
              <td className="p-3.5 font-mono text-xs">Twilio / GoHighLevel LC Phone</td>
              <td className="p-3.5 font-mono text-xs">$0.0079 &ndash; $0.012 / segment</td>
              <td className="p-3.5 font-semibold text-emerald-700">0% (Pass-through)</td>
              <td className="p-3.5 font-mono text-xs">$15 &ndash; $45 / mo (500-2,000 texts)</td>
            </tr>
            <tr className="hover:bg-surface-50/50">
              <td className="p-3.5 font-medium text-foreground">10DLC Brand &amp; Campaign</td>
              <td className="p-3.5 font-mono text-xs">The Campaign Registry (US)</td>
              <td className="p-3.5 font-mono text-xs">$4 one-time + $1.50&ndash;$10/mo</td>
              <td className="p-3.5 font-semibold text-emerald-700">0% (We file for you)</td>
              <td className="p-3.5 font-mono text-xs">Direct registry fee</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-foreground/65">
        Unlike traditional call answering services that charge $1.75 to $3.50 per live receptionist minute with 3-minute minimums,
        our AI systems answer immediately with zero queue times and flat monthly software support.
      </p>
    </div>
  );

  const calculatorNode = (
    <div>
      <MissedCallCalculator defaultBookingUrl="/contact" />
    </div>
  );

  return (
    <main className="pb-20 pt-5 md:pt-7">
      <PricingTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-medium text-brand-deep">
              Predictable unit economics and zero per-seat fees
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-foreground">
              Custom CRM Builds &amp; AI Automation Pricing
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/75">
              Pick the model that fits your operational stage. Fixed-scope milestones for custom Next.js CRM portals, or predictable monthly retainers for 24/7 AI voice receptionists with transparent carrier billing.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration
              src="/illustrations/pricing.svg"
              alt="Transparent pricing breakdown for custom CRM development, AI voice receptionists, and workflow automation"
              priority
            />
          </div>
        </div>
      </section>

      {/* Interactive Tabs: Custom CRM Builds vs. AI Voice Retainers */}
      <section className="container-shell mt-14">
        <PricingTabs
          retainerTiers={tiers}
          carrierTable={carrierTableNode}
          calculatorNode={calculatorNode}
        />
      </section>

      {/* Setup & Onboarding Scope */}
      <section className="container-shell mt-16">
        <div className="rounded-2xl border border-border/80 bg-surface-50 p-6 md:p-10 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Setup &amp; Onboarding Scope</h2>
              <p className="mt-1 text-xs md:text-sm text-foreground/75 max-w-2xl leading-relaxed">
                Every onboarding engagement follows three structured engineering phases: auditing inbound bottlenecks and CRM data schemas, configuring clean pipelines or Next.js portals with webhook routing, and running 50+ synthetic stress tests across regional accents and edge cases before production launch.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-foreground/80">
            <div className="rounded-xl border border-border/80 bg-white p-5 shadow-xs">
              <h3 className="font-display text-base font-semibold text-foreground">1. Operational Discovery</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                We audit call recordings, map booking friction, analyze customer objection patterns, and document staff dispatch workflows to blueprint data models and prompts.
              </p>
            </div>
            <div className="rounded-xl border border-border/80 bg-white p-5 shadow-xs">
              <h3 className="font-display text-base font-semibold text-foreground">2. Architecture &amp; CRM Build</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                Clean GoHighLevel or HubSpot pipeline configuration, Next.js portal scaffolding, calendar availability rules, custom fields, and two-way webhook integrations.
              </p>
            </div>
            <div className="rounded-xl border border-border/80 bg-white p-5 shadow-xs">
              <h3 className="font-display text-base font-semibold text-foreground">3. Synthetic Stress Testing</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                We run 50+ scripted test calls and simulated webhook payloads covering edge cases, regional accents, interruption handling, and warm transfers before going live.
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs text-foreground/70">
            GHL &amp; AI Voice Launch: 5–14 Days | Custom CRM Builds: 3–6 Weeks. One-time setup fees typically range between $495 and $3,000 depending on CRM complexity, multi-location requirements, and custom legacy database connections.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="container-shell mt-16">
        <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-10 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="mt-1 text-xs md:text-sm text-foreground/75 max-w-2xl leading-relaxed">
                Clear answers covering fixed-scope Custom CRM builds ($2,200 to $15,000+), monthly AI voice retainers ($295 to $1,500/mo), USD/AUD currency billing, transparent carrier pass-through rates with 0% markup, and source-code IP ownership terms.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <FAQAccordion items={pricingFaqs} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-shell mt-16">
        <div className="rounded-2xl saas-grid-bg border border-border/80 border-t-[3px] border-t-brand bg-white p-8 text-center md:p-12 shadow-sm">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Want a fixed quote for your custom CRM or call volume?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-ink-secondary leading-relaxed">
            Book a 20-minute discovery call with our engineering leadership. Serving Australian and US businesses with clear, line-item milestone proposals.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep shadow-xs"
            >
              Book a strategy call
            </Link>
            <Link
              href="/try-voice-agent"
              className="inline-flex items-center rounded-lg border border-border/80 bg-surface-sunken px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-200 hover:border-brand/40"
            >
              Hear a live AI demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
