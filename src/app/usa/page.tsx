import type { Metadata } from "next";
import Link from "next/link";
import { SectionIllustration, ServiceAreaMap } from "@/components/ui";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata(
  "/usa",
  {
    title: "Automation Services in the USA for Service Businesses",
    description:
      "AI voice agents, missed-call recovery & CRM automation for US service businesses — New York, LA, Chicago, Houston, Miami, Phoenix & all 50 states.",
  },
  { region: "US", placename: "United States" }
);

const usaLocalBusiness = generateLocalBusinessSchema({
  pathname: "/usa",
  name: "DigitalX Solutions, USA",
  description:
    "AI voice agents, Missed call text back, CRM automation, and growth dashboards for US local service businesses across all 50 states.",
  addressCountry: "US",
  areaServed: [
    { type: "Country", name: "United States" },
    { type: "City", name: "New York" },
    { type: "City", name: "Los Angeles" },
    { type: "City", name: "Chicago" },
    { type: "City", name: "Miami" },
    { type: "City", name: "Houston" },
    { type: "City", name: "Phoenix" },
    { type: "City", name: "Austin" },
  ],
});

const usaFaqs = [
  {
    question: "What does DigitalX Solutions do for service businesses in the United States?",
    answer:
      "We build AI voice receptionists, missed call recovery, automated lead nurture, GoHighLevel and CRM systems, and Meta Ads tracking for US service businesses, from home services to medical, dental, and legal practices, across all 50 states.",
  },
  {
    question: "Which US cities does DigitalX Solutions serve?",
    answer:
      "We work remotely with businesses in New York, Los Angeles, Chicago, Houston, Miami, Phoenix, Austin, and every other US market, with time zone aware automation across Eastern, Central, Mountain, and Pacific time.",
  },
  {
    question: "How much does an AI voice agent or automation setup cost in the US?",
    answer:
      "Monthly plans start at 1,200 US dollars for solo operators and 2,800 US dollars for multi location teams, plus a one time setup fee based on scope. Larger custom projects are quoted to fit your goals. All prices are in US dollars.",
  },
  {
    question: "What makes DigitalX Solutions different from other US automation agencies?",
    answer:
      "One team combines web development, AI automation, and performance marketing, so you get strategy and delivery from a single partner instead of juggling vendors. We also build server side tracking with the Meta Conversions API to protect ad measurement after recent privacy changes.",
  },
  {
    question: "Does DigitalX Solutions support US privacy and data expectations?",
    answer:
      "Yes. We build with privacy in mind, support consent based tracking, and align customer data handling with US expectations such as the CCPA, so your data stays protected.",
  },
];

export default function UsaPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "USA", url: `${siteConfig.domain}/usa` },
  ]);
  const faqSchema = generateFAQSchema(usaFaqs);

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(usaLocalBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">United States</p>
            <h1 className="mt-3 font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
              Automation services for US service businesses across all 50 states.
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">
              From Brooklyn brownstones to Austin med spas, we deploy AI voice, Missed call text back, and CRM
              automation so you stop losing local revenue to missed calls and slow follow ups.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration src="/illustrations/usa.svg" priority />
          </div>
        </div>
      </section>

      <section className="container-shell mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-lg border border-line-subtle bg-surface-raised p-6 md:p-8">
          <h2 className="font-display text-display-sm text-ink-primary">Why US operators pick us</h2>
          <ul className="mt-5 space-y-3 text-body text-ink-secondary">
            <li>• English &amp; Spanish AI voice agents tuned to US market vocabulary.</li>
            <li>• Bilingual Missed call text back templates for major service verticals.</li>
            <li>• Server side tracking + CAPI built for iOS 14 ad attribution.</li>
            <li>• GoHighLevel + HubSpot snapshots for plumbers, med spas, lawyers, and gyms.</li>
            <li>• Time zone-aware nurture flows across PT, MT, CT, ET.</li>
          </ul>
        </div>
        <ServiceAreaMap />
      </section>

      <section className="container-shell mt-16">
        <h2 className="font-display text-display-sm text-ink-primary">Cities and regions we serve in the United States</h2>
        <p className="mt-3 max-w-2xl text-body text-ink-secondary">
          We work remotely with US service businesses across every time zone. Below is where most of our US client
          base operates today.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency New York</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              NYC and the tri state area, plumbers, dental clinics, med spas, and law firms use our AI voice agents
              to qualify high volume inbound and book during ET business hours and after.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Los Angeles</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              LA, Orange County, and the Inland Empire run bilingual operations by default. We deploy English plus
              Spanish AI voice agents and Missed call text back templates tuned for the SoCal market.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Chicago</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Chicagoland HVAC, roofing, and home remodeling companies face severe seasonal demand swings. We layer
              storm and seasonal triggers on top of GoHighLevel pipelines so demand surges convert instead of leak.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Miami</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              South Florida med spas, clinics, and home services operate in a 24/7, bilingual market with high ad
              spend. Server side tracking plus CAPI is critical here, browser pixels miss too much for the CPA
              math to work.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Austin</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Austin and Central Texas service businesses scale fast and need automation that keeps up. We deploy
              n8n workflows plus GHL pipelines that handle 5x lead volume without 5x the back office.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Houston</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Houston and the Gulf Coast run high call volumes across home services, medical, and commercial trades in
              a heavily bilingual market. We deploy English plus Spanish AI voice and CAPI tracking so large ad budgets
              stay accountable.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Phoenix</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Phoenix and the Valley see extreme summer HVAC demand in one of the fastest growing metros in the US. We
              wire seasonal triggers and after hours booking onto GoHighLevel so peak demand converts instead of
              ringing out.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">All 50 states, remote first</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Outside the cities above, we run engagements across PT, MT, CT, and ET. Time zone aware nurture and
              after hours coverage are baked into every build.
            </p>
          </article>
        </div>
      </section>

      <section className="container-shell mt-16">
        <h2 className="font-display text-display-sm text-ink-primary">USA frequently asked questions</h2>
        <div className="mt-6 space-y-3">
          {usaFaqs.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-line-subtle bg-surface-raised p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink-primary">
                {faq.question}
              </summary>
              <p className="mt-3 text-body-sm leading-relaxed text-ink-secondary">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container-shell mt-16">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Talk to a US engineer
        </Link>
      </section>
    </main>
  );
}
