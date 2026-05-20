import type { Metadata } from "next";
import Link from "next/link";
import { SectionIllustration, ServiceAreaMap } from "@/components/ui";
import {
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/au", {
  title: "Automation & AI for Australian Service Businesses | DigitalX",
  description:
    "DigitalX Solutions deploys AI voice agents, Missed call recovery, and CRM automation for Australian local service businesses, Sydney, Melbourne, Brisbane, Perth.",
});

const auLocalBusiness = generateLocalBusinessSchema({
  pathname: "/au",
  name: "DigitalX Solutions, Australia",
  description:
    "AI voice agents, Missed call text back, CRM automation, and growth dashboards for Australian local service businesses across Sydney, Melbourne, Brisbane, Perth, Adelaide.",
  addressCountry: "AU",
  addressLocality: "Casula",
  addressRegion: "NSW",
  geo: { latitude: -33.9519, longitude: 150.9054 },
  areaServed: [
    { type: "Country", name: "Australia" },
    { type: "City", name: "Sydney" },
    { type: "City", name: "Melbourne" },
    { type: "City", name: "Brisbane" },
    { type: "City", name: "Perth" },
    { type: "City", name: "Adelaide" },
    { type: "City", name: "Canberra" },
  ],
});

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
        <h2 className="font-display text-display-sm text-ink-primary">Cities we serve across Australia</h2>
        <p className="mt-3 max-w-2xl text-body text-ink-secondary">
          Engineered in Casula, NSW, deployed for service businesses across every Australian capital. We work
          remotely with on site visits scheduled when scope demands it.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Sydney</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Most of our AU client base is in Greater Sydney, from Parramatta tradies to North Shore clinics.
              GoHighLevel, AI voice, and Missed call text back deployed across NSW based home services, healthcare,
              and professional services.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Melbourne</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Melbourne and Geelong service businesses face long inbound queues during peak demand. We deploy AI
              voice agents tuned for Victorian accents, AEDT calendar logic, and Privacy Act aligned data handling
              for medical and legal practices.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Brisbane</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Brisbane and South East Queensland HVAC, roofing, and pool service operators depend on speed to lead.
              Our Missed call text back recovers 30 to 50 percent of after hours callers across SEQ time zones.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Perth</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              AWST puts Perth two hours behind the eastern states, which means local businesses miss calls from
              east coast leads after 5pm WA time. Our 24/7 AI voice agents close that gap end to end.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Automation agency Adelaide</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Adelaide trade and healthcare operators lean heavily on referrals and repeat business. We layer
              automated review, referral, and reactivation flows on top of your existing booking system so the
              network compounds without manual chase.
            </p>
          </article>
          <article className="rounded-lg border border-line-subtle bg-surface-raised p-6">
            <h3 className="font-display text-title-lg text-ink-primary">Regional NSW, VIC, QLD &amp; WA</h3>
            <p className="mt-2 text-body-sm text-ink-secondary">
              Tradies in regional Australia, Newcastle, Wollongong, Toowoomba, Bendigo, Geelong, Bunbury, are
              especially hurt by missed calls. Voice plus SMS automation is the highest ROI investment in this
              segment.
            </p>
          </article>
        </div>
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
