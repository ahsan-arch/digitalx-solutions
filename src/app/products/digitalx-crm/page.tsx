import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, Layers, Lock, MessageSquare, PhoneCall, Search, Terminal } from "lucide-react";
import { ArchitecturalProductPreview } from "@/components/projects/featured-builds-showcase";
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
      icon: <Layers className="h-5 w-5 text-brand" />,
      title: "20 Integrated Agency & Ops Modules",
      description:
        "Command Centre KPIs, AU/US lead pipelines, active/churned client retainers, proposals with e-signatures, project boards, and time tracking.",
    },
    {
      icon: <Lock className="h-5 w-5 text-brand" />,
      title: "Role-Based Access & Margin Control",
      description:
        "Interactive RBAC roles (Admin, Manager, Member, Client) keep revenue figures, MRR/ARR, and $75/hr labor-margin analytics restricted to leadership.",
    },
    {
      icon: <Terminal className="h-5 w-5 text-brand" />,
      title: "Native REST Webhook Hub (4 Endpoints)",
      description:
        "Built-in ingestion routes for GoHighLevel (/api/webhooks/ghl), Apollo (/apollo), Meta Ads (/meta-ads), and n8n (/n8n) with live payload logs.",
    },
    {
      icon: <Search className="h-5 w-5 text-brand" />,
      title: "Global Search, Call Logs & Audit Trail",
      description:
        "Cmd+K search across leads, clients, projects, and invoices, paired with call records, security audit logs, and zero per-seat fees.",
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

      <main id="main" className="pb-24 pt-5 md:pt-7">
        <div className="container-shell max-w-5xl">
          {/* Header */}
          <div className="text-center">
            <p className="inline-flex items-center justify-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-brand-deep">
              <Cpu className="h-3.5 w-3.5 text-brand" />
              Proprietary Next.js &amp; Prisma CRM
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-5xl">
              DigitalX CRM
            </h1>
            <p className="mt-3 text-lg text-brand font-medium">
              Custom Agency &amp; Service Operations CRM with Zero Per-Seat Licensing
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
              Built on Next.js App Router, TypeScript, Prisma, and PostgreSQL/Supabase. Unites AU/US lead pipelines, client health and labor-margin analytics, e-signature proposals, and native REST webhook ingestion into one client-owned system.
            </p>
          </div>

          {/* Live Interactive Preview */}
          <div className="mt-10">
            <ArchitecturalProductPreview slug="digitalx-custom-crm" />
          </div>

          {/* Development Status Banner */}
          <div className="mt-8 rounded-2xl border border-border/80 bg-surface-50 p-6 text-foreground">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
                <span>Architecture Stack: Next.js &middot; Prisma &middot; PostgreSQL / Supabase &middot; Recharts</span>
              </div>
              <Link
                href="/case-studies/digitalx-custom-crm"
                className="text-xs font-semibold text-brand hover:underline"
              >
                Inspect full engineering case study &rarr;
              </Link>
            </div>
            <p className="mt-2 text-xs md:text-sm text-foreground/75 leading-relaxed">
              Engineered from the ground up with 12 relational Prisma models, 4 role tiers (Admin, Manager, Member, Client), CSV/PDF executive reporting, and instant webhook listeners for GoHighLevel, Apollo, Meta Ads, and n8n.
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
                  <div className="mb-3 inline-flex rounded-lg bg-surface-50 p-2.5 border border-border/80">
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
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Multi-van trade contractors (Plumbing, HVAC, Electrical):</strong> Who need dispatchers and technicians to view incoming call recordings and customer notes without paying for 10 separate enterprise seats.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Metropolitan healthcare &amp; dental clinics:</strong> Seeking centralized triage of after-hours patient inquiries with direct sync to practice calendars.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
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
                className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-white px-5 py-3 text-sm font-medium text-foreground hover:bg-surface-50 transition-colors"
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
