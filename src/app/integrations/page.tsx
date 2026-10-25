import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import { integrationsData } from "@/data/integrations";

export const metadata: Metadata = {
  title: "CRM & Platform Integrations | DigitalX",
  description:
    "Explore supported CRM, telephony, and automation platform integrations engineered by DigitalX Solutions for GoHighLevel, n8n, HubSpot, Twilio, and more.",
  alternates: {
    canonical: `${siteConfig.domain}/integrations`,
  },
};

export default function IntegrationsHubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Integrations", url: `${siteConfig.domain}/integrations` },
  ]);

  const categories = [
    "CRM & Pipelines",
    "Workflow & APIs",
    "Telephony & Voice",
    "Field Services",
    "Scheduling",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main id="main" className="pb-24 pt-12">
        <section className="container-shell">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              <Cpu className="h-3.5 w-3.5" />
              Ecosystem &amp; Architecture
            </div>
            <h1 className="font-display text-4xl text-foreground md:text-5xl lg:text-6xl font-semibold leading-tight">
              Enterprise CRM &amp; Platform Integrations
            </h1>
            <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
              We do not believe in fragile, disconnected software stacks. DigitalX Solutions designs and deploys resilient bi-directional integrations that connect your 24/7 AI voice agents and missed-call recovery systems straight into your primary CRM, calendar, and dispatch boards.
            </p>
          </div>
        </section>

        {/* Integration Categories Grid */}
        <section className="container-shell mt-12 md:mt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {integrationsData.map((integration) => (
              <article
                key={integration.slug}
                className="flex flex-col justify-between rounded-3xl border border-border bg-white p-6 md:p-8 shadow-xs hover:border-brand/40 transition-all hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-surface-100 px-3 py-1 text-[11px] font-semibold text-foreground/70">
                      {integration.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      Production Tested
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
                    {integration.name}
                  </h2>
                  <p className="mt-2 text-xs font-semibold text-brand">
                    {integration.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    {integration.summary.slice(0, 160)}...
                  </p>

                  <div className="mt-5 border-t border-border/60 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
                      Supported Tools
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {integration.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md bg-surface-50 px-2 py-0.5 text-[11px] font-medium text-foreground/70 border border-border/60"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4">
                  <Link
                    href={`/integrations/${integration.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-deep transition-colors"
                  >
                    View Integration Specs <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Custom Integration Callout */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="rounded-3xl border border-border bg-surface-50 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-center">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  Running on a Proprietary or Legacy Database?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75 md:text-base">
                  If your business operates on an industry-specific PMS, custom SQL database, or bespoke ERP, our engineering team builds custom REST/GraphQL middleware, webhooks, and private API connectors to bridge your voice AI directly to your core system.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/development/api-webhook-integrations"
                    className="inline-flex items-center rounded-full bg-brand px-6 py-2.5 text-xs font-semibold text-white hover:bg-brand-deep transition-colors"
                  >
                    Custom API &amp; Webhook Engineering
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-full border border-border bg-white px-6 py-2.5 text-xs font-semibold text-foreground hover:bg-surface-100 transition-colors"
                  >
                    Speak with a Solutions Engineer
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-3">
                  Integration Guarantees
                </h3>
                <ul className="space-y-2.5 text-xs text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Sub-500ms voice turnaround latency
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Australian Privacy Principles &amp; US 10DLC compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Zero double-booking calendar slot locks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Automatic fallback to SMS if line drops
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
