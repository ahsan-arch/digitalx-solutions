import type { Metadata } from "next";
import Link from "next/link";
import { SectionIllustration, ServiceAreaMap } from "@/components/ui";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/usa", {
  title: "Automation & AI for US Service Businesses | DigitalX",
  description:
    "DigitalX Solutions delivers AI voice agents, Missed call recovery, and CRM automation for US local service businesses across all 50 states.",
});

const usaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.domain}/usa#localbusiness`,
  name: "DigitalX Solutions, USA",
  url: `${siteConfig.domain}/usa`,
  email: "info@digitalx-solutions.com",
  areaServed: { "@type": "Country", name: "United States" },
  description:
    "AI voice agents, Missed call text back, CRM automation, and growth dashboards for US local service businesses.",
};

export default function UsaPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "USA", url: `${siteConfig.domain}/usa` },
  ]);

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(usaLocalBusiness) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">United States</p>
            <h1 className="mt-3 font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
              AI-powered automation for US local service businesses.
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
            <h3 className="font-display text-title-lg text-ink-primary">All 50 states, remote first</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Outside the cities above, we run engagements across PT, MT, CT, and ET. Time zone aware nurture and
              after hours coverage are baked into every build.
            </p>
          </article>
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
