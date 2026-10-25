import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  BookOpen,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import { integrationsData, getIntegrationBySlug } from "@/data/integrations";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return integrationsData.map((integration) => ({
    slug: integration.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const integration = getIntegrationBySlug(slug);
  if (!integration) return {};

  const cleanTitle = integration.metaTitle.replace(/\s*\|\s*DigitalX.*$/gi, "").trim();

  return {
    title: cleanTitle,
    description: integration.metaDescription,
    alternates: {
      canonical: `${siteConfig.domain}/integrations/${integration.slug}`,
    },
    openGraph: {
      title: `${cleanTitle} | DigitalX`,
      description: integration.metaDescription,
      url: `${siteConfig.domain}/integrations/${integration.slug}`,
      siteName: "DigitalX Solutions",
      type: "website",
    },
  };
}

export default async function IntegrationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const integration = getIntegrationBySlug(slug);
  if (!integration) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Integrations", url: `${siteConfig.domain}/integrations` },
    { name: integration.name, url: `${siteConfig.domain}/integrations/${integration.slug}` },
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.domain}/integrations/${integration.slug}#service`,
    name: integration.name,
    serviceType: "CRM & Telephony Integration",
    provider: {
      "@type": "Organization",
      name: "DigitalX Solutions",
      url: siteConfig.domain,
    },
    areaServed: [
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "United States" },
    ],
    description: integration.summary,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: integration.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main" className="pb-24 pt-12">
        {/* HERO SECTION */}
        <section className="container-shell">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              <Cpu className="h-3.5 w-3.5" />
              {integration.category} Integration
            </div>
            <h1 className="font-display text-4xl text-foreground md:text-5xl lg:text-6xl font-semibold leading-tight">
              {integration.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
              {integration.summary}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                Schedule Integration Scoping Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/try-voice-agent"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-100"
              >
                <PhoneCall className="h-4 w-4 text-brand" />
                Experience Live Voice Demo
              </Link>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE & PAIN POINT */}
        <section className="container-shell mt-14 md:mt-18">
          <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              The Operational Problem This Integration Eliminates
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80 md:text-base">
              {integration.painPointAddressed}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mr-2 self-center">
                Stack Components:
              </span>
              {integration.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-foreground/80 border border-border/80 shadow-2xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW STEPS */}
        <section className="container-shell mt-14 md:mt-18">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Engineering Architecture
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-foreground">
              How the Data &amp; Telephony Pipeline Executes
            </h2>
            <p className="mt-3 text-sm text-foreground/75 md:text-base">
              Here is the exact step-by-step logic we deploy when an inbound caller connects to your business line.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {integration.workflowSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-border bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-xs font-bold text-brand">
                      {s.step}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-4 rounded-xl bg-surface-50 p-3.5 border border-border/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                    Technical Mechanism:
                  </span>
                  <p className="mt-1 font-mono text-xs text-foreground/85 leading-relaxed">
                    {s.technicalDetail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL SPECIFICATIONS TABLE */}
        <section className="container-shell mt-14 md:mt-18">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Integration Specifications &amp; Latency Benchmarks
            </h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-50 border-b border-border text-xs font-semibold uppercase text-foreground/70">
                  <tr>
                    <th className="p-4">Parameter</th>
                    <th className="p-4">Engineering Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-foreground/80">
                  {integration.technicalSpecifications.map((spec) => (
                    <tr key={spec.label} className="hover:bg-surface-50/50">
                      <td className="p-4 font-semibold text-foreground">{spec.label}</td>
                      <td className="p-4 font-mono text-xs text-foreground/85">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* MISTAKES TO AVOID */}
        <section className="container-shell mt-14 md:mt-18">
          <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 md:p-10">
            <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              Common Setup Mistakes Most Agencies Make
            </div>
            <div className="mt-4 space-y-3">
              {integration.commonMistakesToAvoid.map((mistake, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                  <span className="font-bold text-amber-700 shrink-0">{i + 1}.</span>
                  <p>{mistake}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="container-shell mt-14 md:mt-18">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Common Questions
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-foreground">
              Frequently Asked Technical Questions
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {integration.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-border bg-white p-6 shadow-xs"
              >
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS SILO BLOCK */}
        <section className="container-shell mt-14 md:mt-18">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface-50 p-6">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm mb-4">
                <Layers className="h-4 w-4 text-brand" />
                Related Solution Stacks
              </div>
              <ul className="space-y-2.5">
                {integration.relatedSolutions.map((sol) => (
                  <li key={sol.href}>
                    <Link
                      href={sol.href}
                      className="group flex items-center justify-between text-sm text-foreground/80 hover:text-brand transition-colors"
                    >
                      <span>{sol.title}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-foreground/40 group-hover:text-brand transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface-50 p-6">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm mb-4">
                <BookOpen className="h-4 w-4 text-brand" />
                Supporting Technical Insights
              </div>
              <ul className="space-y-2.5">
                {integration.relatedInsights.map((ins) => (
                  <li key={ins.href}>
                    <Link
                      href={ins.href}
                      className="group flex items-center justify-between text-sm text-foreground/80 hover:text-brand transition-colors"
                    >
                      <span>{ins.title}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-foreground/40 group-hover:text-brand transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-3xl border border-border bg-foreground px-6 py-12 text-white md:px-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
                Ready to Integrate {integration.name} Into Your Business?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                Book a scoping call with our engineering team. We will review your current telephony and CRM setup, map out webhook schemas, and provide a fixed quote with a 14-day delivery timeline.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-surface-100 transition-colors"
                >
                  Book an Architecture Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Browse All Solutions
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
