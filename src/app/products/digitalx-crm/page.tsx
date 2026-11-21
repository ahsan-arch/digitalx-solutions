import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, Layers, MessageSquare, PhoneCall, Shield, Terminal } from "lucide-react";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/products/digitalx-crm", {
  title: "DigitalX CRM – Service Operations & Intake Platform",
  description: "Custom service CRM and automated intake software engineered for high-volume trade contractors and clinics. Currently in private engineering preview.",
});

export default function DigitalXCrmPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.domain}/products/digitalx-crm#software`,
    name: "DigitalX CRM",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteConfig.domain}/products/digitalx-crm`,
    description:
      "A custom-engineered service CRM and automated intake platform designed to unify telephony, two-way SMS triage, and job scheduling without seat-tier bloat.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
    },
    author: {
      "@type": "Organization",
      name: "DigitalX Solutions",
      url: siteConfig.domain,
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Products", url: `${siteConfig.domain}/products/digitalx-crm` },
    { name: "DigitalX CRM", url: `${siteConfig.domain}/products/digitalx-crm` },
  ]);

  const features = [
    {
      icon: <PhoneCall className="h-5 w-5 text-brand" />,
      title: "Carrier-Native Telephony Logs",
      description:
        "Direct SIP trunk connectivity logging incoming caller IDs, call durations, and audio recordings directly against customer records.",
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-brand" />,
      title: "Automated SMS Lead Triage",
      description:
        "Instant conversational text-back under 60 seconds whenever a call goes unanswered, capturing caller intent and address details.",
    },
    {
      icon: <Layers className="h-5 w-5 text-brand" />,
      title: "Zero Per-Seat Licensing Bloat",
      description:
        "Architected for businesses with field technicians and office staff who need access without paying $90–$150/month per user seat.",
    },
    {
      icon: <Terminal className="h-5 w-5 text-brand" />,
      title: "Webhook & n8n Native Architecture",
      description:
        "Raw HTTP webhook triggers and structured JSON event pipelines for direct synchronization with accounting, ERP, and inventory software.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main id="main" className="pb-24 pt-12">
        <div className="container-shell max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-brand/20 bg-brand/5 px-2.5 py-1 font-mono text-xs font-medium text-brand">
              <Cpu className="h-3.5 w-3.5" />
              Proprietary Software &bull; Private Preview
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              DigitalX CRM
            </h1>
            <p className="mt-3 text-lg text-brand font-medium">
              Custom Service Operations &amp; Inbound Intake Platform
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
              A streamlined, telephony-native CRM platform built specifically for trade contractors, field services, and healthcare clinics who have outgrown generic spreadsheets but do not want complex per-seat enterprise software.
            </p>
          </div>

          {/* Development Status Banner */}
          <div className="mt-10 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-foreground">
            <div className="flex items-center gap-2 font-semibold text-amber-800">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
              Current Engineering Status: Private Client Preview
            </div>
            <p className="mt-2 text-xs md:text-sm text-foreground/80 leading-relaxed">
              DigitalX CRM is currently undergoing private architectural pilot deployments with select service clients. We are rigorously testing sub-second database indexing, SIP trunking failover, and automated SMS compliance before open commercial availability.
            </p>
          </div>

          {/* Feature Grid */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-foreground text-center">
              Engineered for Service Workflows
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border/80 bg-white p-6 shadow-xs"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-surface-50 p-2.5 border border-border/60">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Target Audience */}
          <section className="mt-12 rounded-2xl border border-border/80 bg-surface-50 p-8">
            <h2 className="font-display text-xl font-bold text-foreground">
              Who DigitalX CRM Is Built For
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Multi-van trade contractors (Plumbing, HVAC, Electrical):</strong> Who need dispatchers and technicians to view incoming call recordings and customer notes without paying for 10 separate enterprise seats.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Metropolitan healthcare &amp; dental clinics:</strong> Seeking centralized triage of after-hours patient inquiries with direct sync to practice calendars.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>High-volume service operators:</strong> Transitioning off Zapier to self-hosted n8n and looking for a database layer optimized for real-time webhooks.
                </span>
              </li>
            </ul>
          </section>

          {/* CTA Box */}
          <section className="mt-12 rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Request Private Preview Access
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs md:text-sm text-foreground/80 leading-relaxed">
              Interested in testing DigitalX CRM for your service business or exploring a custom agency buildout? Speak directly with our engineering team to review system requirements.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-brand-deep transition-colors"
              >
                Inquire About Private Preview
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/solutions/gohighlevel-implementation"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-medium text-foreground hover:bg-surface-50 transition-colors"
              >
                Explore GoHighLevel Solutions
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
