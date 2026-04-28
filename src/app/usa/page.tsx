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
  email: "info@digitalxsolutions.com",
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
