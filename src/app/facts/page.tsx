import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Layers, ShieldCheck, ExternalLink, Info } from "lucide-react";
import factsData from "@/data/facts";
import { generateBreadcrumbSchema, generateOrganizationSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/facts", {
  title: "Company Facts & Technical Architecture Summary",
  description:
    "Company facts for DigitalX Solutions (founded 2020): services, Australian & US coverage, pricing ranges in USD/AUD, and illustrative model sources.",
});

export default function FactsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Facts", url: `${siteConfig.domain}/facts` },
  ]);

  const orgSchema = generateOrganizationSchema();
  const { company, leadership, partnerCertifications, servicePricingRanges, tcoModel, performanceMetrics } = factsData;

  const audMultiplier = servicePricingRanges.audRateMultiplier || 1.54;
  const toAud = (usd: number) => `A$${Math.round((usd * audMultiplier) / 10) * 10}`;

  return (
    <main id="main" className="pb-24 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <section className="container-shell max-w-4xl">
        <p className="font-mono text-xs font-medium text-brand-deep">
          Machine-readable and human reference
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
          DigitalX Solutions — Company Facts
        </h1>
        <p className="mt-4 text-base leading-relaxed text-foreground/75">
          {company.oneLineDescription} This reference page is generated directly from our canonical facts dataset and documents entity details, pricing ranges, markets served, and the exact calculation inputs behind any illustrative estimates.
        </p>

        {/* Core Identity */}
        <section className="mt-10 rounded-2xl border border-border bg-white p-6 md:p-8 shadow-xs">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Entity &amp; Leadership Summary
          </h2>
          <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
            Founded in {company.yearFounded}, DigitalX Solutions operates remotely across Australian and US business hours, engineering custom Next.js and PostgreSQL CRMs, GoHighLevel systems, n8n workflows, and AI telephony. Clients retain 100% ownership of source code repositories, CRM sub-accounts, and telephony carrier billing.
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
            <div className="rounded-xl border border-border/70 bg-surface-50 p-4">
              <dt className="font-mono text-xs text-foreground/65">Company Name &amp; Founded</dt>
              <dd className="mt-1 font-semibold text-foreground">{company.legalName} (Founded {company.yearFounded})</dd>
            </div>
            <div className="rounded-xl border border-border/70 bg-surface-50 p-4">
              <dt className="font-mono text-xs text-foreground/65">Markets Served</dt>
              <dd className="mt-1 font-semibold text-foreground">{company.serviceAreaSummary}</dd>
            </div>
            <div className="rounded-xl border border-border/70 bg-surface-50 p-4">
              <dt className="font-mono text-xs text-foreground/65">Founder &amp; Lead Solutions Architect</dt>
              <dd className="mt-1 font-semibold text-foreground">
                <Link href="/about/team/jazib-shahid" className="text-brand hover:underline">
                  {leadership.founder.fullName}
                </Link>
              </dd>
            </div>
            <div className="rounded-xl border border-border/70 bg-surface-50 p-4">
              <dt className="font-mono text-xs text-foreground/65">Direct Contact</dt>
              <dd className="mt-1 font-mono text-xs text-foreground">
                {company.primaryEmail} &bull; {company.phoneAU}
              </dd>
            </div>
          </dl>
        </section>

        {/* Services & Supported Platforms */}
        <section className="mt-10 rounded-2xl border border-border bg-white p-6 md:p-8 shadow-xs">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Core Services &amp; Platform Stack
          </h2>
          <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
            Our core engineering capabilities cover bespoke Next.js and PostgreSQL custom CRM portals, GoHighLevel setup and workflows, self-hosted n8n API automation, and 24/7 AI voice receptionists. Platform certification links appear only when verifiable external credential URLs are listed.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {partnerCertifications.map((item) => {
              const hasProof = Boolean(item.proofUrl && item.proofUrl.startsWith("http"));
              return (
                <div key={item.platform} className="rounded-xl border border-border/70 bg-surface-50 p-4 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-foreground">{item.platform}</span>
                    {hasProof && (
                      <a
                        href={item.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-brand hover:underline"
                      >
                        Verified Proof <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-xs font-medium text-brand">{item.credential}</p>
                  <p className="mt-2 text-xs text-foreground/75 leading-relaxed">{item.deploymentScope}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing Ranges in USD & AUD */}
        <section className="mt-10 rounded-2xl border border-border bg-white p-6 md:p-8 shadow-xs">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Published Pricing Ranges (USD &amp; Indicative AUD)
          </h2>
          <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
            Custom CRM builds carry fixed milestone pricing starting at $2,200 USD ({toAud(2200)} AUD), $8,500 USD ({toAud(8500)} AUD) for hybrid Next.js portals, and $15,000+ USD ({toAud(15000)}+ AUD) for multi-tenant SaaS builds. Ongoing AI voice retainers run from $450/mo to $2,800/mo USD with 0% carrier markup.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-50 font-semibold text-foreground">
                  <th className="p-3">Offering</th>
                  <th className="p-3">USD Range</th>
                  <th className="p-3">Approx. AUD (~{audMultiplier}&times;)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground/80 font-mono text-xs">
                <tr>
                  <td className="p-3 font-sans font-semibold text-foreground">CRM Setup &amp; Integration (One-Time)</td>
                  <td className="p-3">$2,200</td>
                  <td className="p-3">{toAud(2200)}</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold text-foreground">Hybrid Custom CRM Build (One-Time)</td>
                  <td className="p-3">$8,500</td>
                  <td className="p-3">{toAud(8500)}</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold text-foreground">Proprietary / White-Label CRM</td>
                  <td className="p-3">$15,000+</td>
                  <td className="p-3">{toAud(15000)}+</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold text-foreground">{servicePricingRanges.missedCallTextBackTier.name}</td>
                  <td className="p-3">{servicePricingRanges.missedCallTextBackTier.monthlyRetainer}</td>
                  <td className="p-3">{toAud(450)} / mo</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold text-foreground">{servicePricingRanges.aiVoiceReceptionistLaunchTier.name}</td>
                  <td className="p-3">{servicePricingRanges.aiVoiceReceptionistLaunchTier.monthlyRetainer}</td>
                  <td className="p-3">{toAud(1200)} / mo</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold text-foreground">{servicePricingRanges.aiVoiceReceptionistOperateTier.name}</td>
                  <td className="p-3">{servicePricingRanges.aiVoiceReceptionistOperateTier.monthlyRetainer}</td>
                  <td className="p-3">{toAud(2800)} / mo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-foreground/65">{servicePricingRanges.audExchangeRateNote}.</p>
        </section>

        {/* Source Transparency & Hreflang Strategy */}
        <section className="mt-10 rounded-2xl border border-border bg-surface-50 p-6 md:p-8">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Info className="h-4 w-4 text-brand" />
            <h2 className="font-display text-xl">Illustrative Models &amp; Internationalization Strategy</h2>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-foreground/75 leading-relaxed">
            Any financial savings or efficiency models published across the site carry explicit source labels and calculation inputs. International SEO routes use reciprocal hreflang alternates across <code className="rounded bg-white px-1 py-0.5 font-mono text-xs">/</code> (<code className="font-mono text-xs">x-default</code>), <code className="rounded bg-white px-1 py-0.5 font-mono text-xs">/au</code> (<code className="font-mono text-xs">en-AU</code>), and <code className="rounded bg-white px-1 py-0.5 font-mono text-xs">/usa</code> (<code className="font-mono text-xs">en-US</code>).
          </p>
          <div className="mt-4 rounded-xl border border-border bg-white p-4 text-xs text-foreground/75 space-y-2">
            <p>
              <strong className="text-foreground">3-Year CRM TCO Source ({tcoModel.source}):</strong> {tcoModel.calculationInputs}
            </p>
            <p>
              <strong className="text-foreground">Performance Benchmarks Source ({performanceMetrics.source}):</strong> {performanceMetrics.typicalLeadLift} Target missed-call text-back speed: {performanceMetrics.missedCallTextBackLatency}.
            </p>
            <p className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-brand" />
              <span>Machine-readable summary:</span>
              <Link href="/llms.txt" className="font-mono text-brand hover:underline">/llms.txt</Link>
            </p>
          </div>
        </section>

        {/* CTA Strip */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep transition"
          >
            Book a strategy call
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/try-voice-agent"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface-100 transition"
          >
            Hear a live AI demo
          </Link>
        </div>
      </section>
    </main>
  );
}
