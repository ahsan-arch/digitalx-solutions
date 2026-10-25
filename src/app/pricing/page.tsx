import type { Metadata } from "next";
import Link from "next/link";
import { Check, HelpCircle, PhoneCall, ShieldCheck, Zap } from "lucide-react";
import { SectionIllustration } from "@/components/ui";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generatePricingSchema,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/pricing", {
  title: "Transparent AI Automation Pricing",
  description:
    "Transparent pricing for AI voice receptionists, missed-call text-back, and GoHighLevel CRM workflows for businesses across the United States and Australia.",
});

const tiers = [
  {
    name: "Missed-Call Recovery",
    price: "$450/mo",
    summary: "For local operators looking to recover missed calls via instant SMS text-back.",
    includes: [
      "Instant missed-call text-back (<30s)",
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
    price: "$1,200/mo",
    summary: "For solo operators ready to deploy an AI voice receptionist.",
    includes: [
      "AI voice agent (single number)",
      "Missed call text back & recovery",
      "GoHighLevel CRM setup & pipelines",
      "Booking calendar integration",
      "Monthly performance review",
    ],
    cta: "Start with Launch",
    highlight: false,
  },
  {
    name: "Operate",
    price: "$2,800/mo",
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
    question: "How does DigitalX Solutions pricing work?",
    answer:
      "We charge a transparent monthly retainer per package (Standalone Missed-Call Recovery from $450, Launch AI Voice from $1,200, Operate $2,800, Scale Custom — all prices in USD) plus a one-time setup fee of $1,500 to $4,500 depending on integrations and scope. There are no per-seat fees, no surprise overages, and no usage-based billing on AI minutes inside fair-use limits.",
  },
  {
    question: "Do you offer custom pricing for high-volume teams?",
    answer:
      "Yes. Our Scale package is fully custom for teams running paid ads, multi-channel automation, or high call volumes. Pricing depends on call volume, ad spend managed, and the number of integrations required. Book a strategy call for a tailored quote.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "Operate and Scale packages have a 3-month minimum so we have enough runway to build, deploy, and optimize. After that, billing is month-to-month. Launch is fully month-to-month from day one.",
  },
  {
    question: "What is included in the setup fee?",
    answer:
      "Setup covers discovery and scoping, AI voice prompt tuning, full GoHighLevel (or your CRM) build, calendar and booking integrations, server-side tracking with CAPI where required, and team SOPs for handover.",
  },
  {
    question: "How do telephony and carrier charges work?",
    answer:
      "Telephony charges (Twilio or Telnyx SIP minutes and outbound SMS carrier fees) are billed at raw carrier pass-through rates directly to your own account, or transparently through GoHighLevel LC Phone. We do not mark up your SMS segments or inbound voice call minutes.",
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

  const pricingSchema = generatePricingSchema(
    tiers.map((tier) => ({
      name: `${tier.name} Package`,
      description: tier.summary,
      price: tier.price === "Custom" ? "Custom" : tier.price,
      priceCurrency: "USD",
      billingPeriod: "MONTH",
      url: `${siteConfig.domain}/pricing#${tier.name.toLowerCase()}`,
    })),
  );

  const faqSchema = generateFAQSchema(pricingFaqs);

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">Pricing</p>
            <h1 className="mt-3 font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
              Predictable monthly pricing. No agency retainers stacked on retainers.
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">
              Pick the package that fits your stage. Every tier ships with the systems and reporting we use ourselves &mdash;
              no upsell games, no &ldquo;ask for a quote&rdquo; on the basics.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration
              src="/illustrations/pricing.svg"
              alt="Transparent pricing breakdown for AI voice receptionists, GoHighLevel setup, and n8n automations"
              priority
            />
          </div>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="container-shell mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className={`rounded-lg border p-6 md:p-8 ${tier.highlight
              ? "border-accent bg-surface-raised shadow-md"
              : "border-line-subtle bg-surface-raised"
              }`}
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl text-ink-primary">{tier.name}</h2>
              {tier.highlight && (
                <span className="rounded-pill bg-accent-soft px-3 py-1 text-overline text-accent">
                  Most picked
                </span>
              )}
            </div>
            <p className="mt-2 font-display text-display-sm text-ink-primary">{tier.price}</p>
            <p className="mt-3 text-body-sm text-ink-secondary">{tier.summary}</p>

            <ul className="mt-6 space-y-3 text-body-sm text-ink-secondary">
              {tier.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={`mt-8 inline-flex w-full items-center justify-center rounded-pill px-5 py-3 text-sm font-semibold transition ${tier.highlight
                ? "bg-accent text-white hover:bg-accent-hover"
                : "border border-ink-primary text-ink-primary hover:bg-ink-primary hover:text-ink-on-inverse"
                }`}
            >
              {tier.cta}
            </Link>
          </article>
        ))}
      </section>

      <p className="container-shell mt-5 text-center text-sm text-ink-tertiary">
        All prices shown in USD. Australian clients can be invoiced in AUD with GST-compliant documentation &mdash; just ask.
      </p>

      {/* Telephony Economics & Pass-Through Costs Breakdown */}
      <section className="container-shell mt-16">
        <div className="rounded-xl border border-line-subtle bg-surface-raised p-6 md:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-display-sm text-ink-primary">
                Carrier Pass-Through &amp; Telephony Unit Economics
              </h2>
              <p className="text-body-sm text-ink-secondary">
                We believe in total billing transparency. Here is exactly what carrier infrastructure costs.
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line-subtle bg-surface-sunken text-xs font-semibold uppercase tracking-wider text-ink-tertiary">
                <tr>
                  <th className="p-3">Component</th>
                  <th className="p-3">Provider / Protocol</th>
                  <th className="p-3">Direct Carrier Cost</th>
                  <th className="p-3">DigitalX Markup</th>
                  <th className="p-3">Typical Monthly Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-subtle text-ink-secondary">
                <tr>
                  <td className="p-3 font-medium text-ink-primary">Inbound Phone Number</td>
                  <td className="p-3">Twilio / Telnyx Local DID</td>
                  <td className="p-3">$1.15 &ndash; $2.50 / month</td>
                  <td className="p-3 font-semibold text-emerald-600">0% (Pass-through)</td>
                  <td className="p-3">$2 / line</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink-primary">AI Voice Inbound Minutes</td>
                  <td className="p-3">Telnyx SIP + Deepgram + ElevenLabs</td>
                  <td className="p-3">~$0.07 &ndash; $0.11 / min</td>
                  <td className="p-3 font-semibold text-emerald-600">Included in Tier</td>
                  <td className="p-3">Covered under fair-use</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink-primary">Two-Way SMS Segments</td>
                  <td className="p-3">Twilio / GoHighLevel LC Phone</td>
                  <td className="p-3">$0.0079 &ndash; $0.012 / segment</td>
                  <td className="p-3 font-semibold text-emerald-600">0% (Pass-through)</td>
                  <td className="p-3">$15 &ndash; $45 / mo (500-2,000 texts)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink-primary">10DLC Brand &amp; Campaign</td>
                  <td className="p-3">The Campaign Registry (US)</td>
                  <td className="p-3">$4 one-time + $1.50&ndash;$10/mo</td>
                  <td className="p-3 font-semibold text-emerald-600">0% (We file for you)</td>
                  <td className="p-3">Direct registry fee</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-ink-tertiary">
            Unlike traditional call answering services that charge $1.75 to $3.50 per live receptionist minute with 3-minute minimums, 
            our AI systems answer immediately with zero queue times and flat monthly software support.
          </p>
        </div>
      </section>

      {/* Setup & Onboarding Scope */}
      <section className="container-shell mt-12">
        <div className="rounded-xl border border-line-subtle bg-surface-sunken p-6 md:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-display-sm text-ink-primary">Setup &amp; Onboarding Scope</h2>
              <p className="text-body-sm text-ink-secondary">
                Every system is custom-engineered to your exact operations, not deployed from generic templates.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-ink-secondary">
            <div className="rounded-lg border border-line-subtle bg-surface-raised p-5">
              <h3 className="font-display text-base font-semibold text-ink-primary">1. Operational Discovery</h3>
              <p className="mt-2 text-xs leading-relaxed">
                We audit call recordings, map booking friction, analyze customer objection patterns, and document staff dispatch workflows to blueprint the voice prompts.
              </p>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-raised p-5">
              <h3 className="font-display text-base font-semibold text-ink-primary">2. Architecture &amp; CRM Build</h3>
              <p className="mt-2 text-xs leading-relaxed">
                Clean GoHighLevel or HubSpot pipeline configuration, calendar availability rule setup, custom fields, and two-way webhook integrations with dispatch software.
              </p>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-raised p-5">
              <h3 className="font-display text-base font-semibold text-ink-primary">3. Synthetic Stress Testing</h3>
              <p className="mt-2 text-xs leading-relaxed">
                We run 50+ scripted test calls covering background trade noise, heavy regional accents, interruption handling, and warm transfers before going live.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-ink-secondary">
            One-time setup fees typically range between $1,500 and $4,500 depending on CRM complexity, multi-location requirements, and custom legacy database connections.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="container-shell mt-16">
        <div className="rounded-xl border border-line-subtle bg-surface-raised p-6 md:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-display-sm text-ink-primary">Frequently Asked Questions</h2>
              <p className="text-body-sm text-ink-secondary">
                Straightforward answers about our billing models, usage limits, and commitments.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {pricingFaqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-line-subtle bg-surface-sunken p-5">
                <h3 className="font-display text-base font-semibold text-ink-primary">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-shell mt-16">
        <div className="rounded-xl bg-surface-inverse p-8 text-center md:p-12">
          <h2 className="font-display text-display-sm text-ink-on-inverse">
            Want a fixed quote for your exact call volume?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-body text-ink-on-inverse/80">
            Book a 20-minute discovery call with our engineering team in Casula NSW. We will audit your current intake workflow and provide a clear, line-item proposal.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
            >
              Book a scoping call
            </Link>
            <Link
              href="/try-voice-agent"
              className="inline-flex items-center rounded-pill border border-line-subtle bg-white/10 px-6 py-3 text-sm font-semibold text-ink-on-inverse transition hover:bg-white/20"
            >
              Try live voice demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
