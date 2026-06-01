import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { SectionIllustration } from "@/components/ui";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generatePricingSchema,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/pricing", {
  title: "Pricing | DigitalX Solutions Automation Packages",
  description:
    "Transparent monthly pricing for AI voice agents, Missed call text back, CRM automation, and growth dashboards for local service businesses.",
});

const tiers = [
  {
    name: "Launch",
    price: "$1,200/mo",
    summary: "For solo operators ready to stop missing calls.",
    includes: [
      "AI voice agent (single number)",
      "Missed call text back",
      "GoHighLevel CRM setup",
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
      "We charge a transparent monthly retainer per package (Launch $1,200, Operate $2,800, Scale Custom — all prices in USD) plus a one-time setup fee of $1,500 to $4,500 depending on integrations and scope. There are no per-seat fees, no surprise overages, and no usage-based billing on AI minutes inside fair-use limits.",
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
              Pick the package that fits your stage. Every tier ships with the systems and reporting we use ourselves ,
              no upsell games, no &ldquo;ask for a quote&rdquo; on the basics.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration src="/illustrations/pricing.svg" priority />
          </div>
        </div>
      </section>

      <section className="container-shell mt-12 grid gap-5 lg:grid-cols-3">
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
        All prices shown in USD. Australian clients can be invoiced in AUD at the current exchange rate &mdash; just ask.
      </p>

      <section className="container-shell mt-16">
        <div className="rounded-lg border border-line-subtle bg-surface-sunken p-6 md:p-10">
          <h2 className="font-display text-display-sm text-ink-primary">Setup &amp; onboarding</h2>
          <p className="mt-3 max-w-3xl text-body text-ink-secondary">
            Every engagement begins with a one-time setup fee that covers discovery, AI prompt tuning, CRM build, and
            integration with your existing stack. Setup typically runs $1,500&ndash;$4,500 depending on scope.
          </p>
        </div>
      </section>
    </main>
  );
}
