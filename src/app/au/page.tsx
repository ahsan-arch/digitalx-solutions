import type { Metadata } from "next";
import Link from "next/link";
import { SectionIllustration, ServiceAreaMap } from "@/components/ui";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/au", {
  title: "Automation & AI for Australian Service Businesses | DigitalX",
  description:
    "DigitalX Solutions deploys AI voice agents, Missed call recovery, and CRM automation for Australian local service businesses, Sydney, Melbourne, Brisbane, Perth.",
});

const auLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.domain}/au#localbusiness`,
  name: "DigitalX Solutions, Australia",
  url: `${siteConfig.domain}/au`,
  email: "info@digitalxsolutions.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casula",
    addressRegion: "NSW",
    addressCountry: "AU",
  },
  areaServed: { "@type": "Country", name: "Australia" },
  description:
    "AI voice agents, Missed call text back, CRM automation, and growth dashboards for Australian local service businesses.",
};

export default function AuPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Australia", url: `${siteConfig.domain}/au` },
  ]);

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(auLocalBusiness) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-tertiary">Australia</p>
            <h1 className="mt-3 font-display text-display-md leading-tight text-ink-primary md:text-display-lg">
              AI automation for Australian service businesses.
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">
              Built in Casula, deployed across Sydney, Melbourne, Brisbane, and Perth. AI voice, Missed call recovery,
              and CRM systems tuned for Australian customers and Australian Privacy Principles.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration src="/illustrations/au.svg" priority />
          </div>
        </div>
      </section>

      <section className="container-shell mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-lg border border-line-subtle bg-surface-raised p-6 md:p-8">
          <h2 className="font-display text-display-sm text-ink-primary">Why Australian operators pick us</h2>
          <ul className="mt-5 space-y-3 text-body text-ink-secondary">
            <li>• AU-localised AI voice agents, accent-tuned, ABN-aware, GST-conscious.</li>
            <li>• AEDT / AWST / ACDT scheduling baked into every booking flow.</li>
            <li>• Privacy Act &amp; APP-aligned data handling for healthcare and legal verticals.</li>
            <li>• Onshore engineering, fast iteration without offshore time gaps.</li>
            <li>• Local payment integrations (Stripe AU, GoCardless, Ezidebit).</li>
          </ul>
        </div>
        <ServiceAreaMap />
      </section>

      <section className="container-shell mt-16">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Book an AU consultation
        </Link>
      </section>
    </main>
  );
}
