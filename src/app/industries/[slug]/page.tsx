import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  DollarSign,
  MessageSquare,
  Phone,
  Server,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { getIndustryBySlug, industries } from "@/data/industries";
import { getSolutionBySlug, results } from "@/data/redesign";
import { getDemoScript } from "@/data/voice-demos";
import { VoiceAgentDemo } from "@/components/ui/voice-agent-demo";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generatePageMetadata,
  generateServicePageSchema,
  siteConfig,
} from "@/lib/seo";

type PageParams = { slug: string };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  const rawDesc = industry.metaDescription || `Automate ${industry.name.toLowerCase()} with 24/7 AI voice receptionists, instant missed-call text-back, and CRM booking workflows in the US & AU.`;
  const description = rawDesc.length > 155 ? `${rawDesc.slice(0, 151).trim()}...` : rawDesc;

  return generatePageMetadata(`/industries/${industry.slug}`, {
    title: industry.metaTitle || `${industry.name} AI Playbook`,
    description,
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const linkedSolutions = industry.relatedSolutionSlugs
    .map((solutionSlug) => getSolutionBySlug(solutionSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const industryCaseStudies = results.filter((r) => r.industrySlug === industry.slug);
  const demoScript = getDemoScript(slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Industries", url: `${siteConfig.domain}/industries` },
    { name: industry.name, url: `${siteConfig.domain}/industries/${industry.slug}` },
  ]);

  const serviceSchema = generateServicePageSchema({
    name: `${industry.name} AI Automation & Growth Playbook`,
    description: industry.summary,
    url: `${siteConfig.domain}/industries/${industry.slug}`,
  });

  const faqSchema =
    industry.faqs && industry.faqs.length > 0 ? generateFAQSchema(industry.faqs) : null;

  const howToSchema =
    industry.intakeArchitecture && industry.intakeArchitecture.intakeSteps.length > 0
      ? generateHowToSchema({
          name: `${industry.name} Automated Intake & Dispatch Workflow`,
          description: `Operational intake, emergency qualification, and dispatch architecture for ${industry.name}.`,
          steps: industry.intakeArchitecture.intakeSteps.map((step) => ({
            name: step.name,
            text: step.text,
          })),
        })
      : null;

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}

      {/* Hero Header */}
      <section className="container-shell">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            {industry.category}
          </span>
          <span className="text-xs text-foreground/50">•</span>
          <span className="text-xs font-medium text-foreground/60">Production Playbook</span>
        </div>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">
          {industry.h1 || industry.metaTitle || `${industry.name} Automation Playbook`}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-lg">
          {industry.subheadline ? industry.subheadline : `${industry.headline} ${industry.summary}`}
        </p>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep shadow-sm"
          >
            Book a Strategy Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/try-voice-agent"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface-50 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-100"
          >
            <Phone className="mr-2 h-4 w-4 text-brand" />
            Hear a Demo (2 Min)
          </Link>
        </div>

        {industry.trustBanner && (
          <p className="mt-4 text-xs font-medium text-foreground/60 italic">
            &ldquo;{industry.trustBanner}&rdquo;
          </p>
        )}

        {industry.niches && industry.niches.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Core Niches:</span>
            {industry.niches.map((niche) => (
              <span
                key={niche}
                className="rounded-full border border-border bg-surface-50 px-3 py-1 text-xs text-foreground/75"
              >
                {niche}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Operating Challenges & Playbook */}
      <section className="container-shell mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-surface-50 p-6 md:p-8">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <h2 className="font-display text-xl text-foreground">Primary Operating Bottlenecks</h2>
          </div>
          <ul className="mt-5 space-y-3.5 text-sm leading-relaxed text-foreground/72">
            {industry.painPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand" />
            <h2 className="font-display text-xl text-foreground">Recommended Automation System</h2>
          </div>
          <ol className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/72">
            {industry.playbook.map((item, index) => (
              <li key={item} className="flex items-start gap-2.5 rounded-xl border border-border bg-surface-50 p-3">
                <span className="font-semibold text-brand">0{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      {/* 4-Step Intake & Dispatch Protocol */}
      {industry.intakeArchitecture && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Inbound Architecture</p>
              <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
                4-Step Intake & Dispatch Protocol
              </h2>
              <p className="mt-2 text-sm text-foreground/70">
                Engineered to triage high-urgency inquiries immediately while automating routine bookings into your schedule.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {industry.intakeArchitecture.intakeSteps.map((step, idx) => (
                <div
                  key={step.name}
                  className="rounded-2xl border border-border bg-surface-50 p-5 transition hover:border-brand/40"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 font-display text-sm font-semibold text-foreground">{step.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/68">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-border/80 bg-surface-50/60 p-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">Urgency & Emergency Criteria</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/75">
                  {industry.intakeArchitecture.emergencyCriteria}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Dispatch Escalation Protocol</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/75">
                  {industry.intakeArchitecture.dispatchProtocol}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Unit Economics & Revenue Recovery */}
      {industry.unitEconomics && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-600" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Unit Economics & ROI</p>
            </div>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
              Revenue Recovery Modeling for {industry.name}
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Capturing missed calls and after-hours estimate requests generates immediate bottom-line cashflow.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-medium text-foreground/55">Average Job / Patient LTV</p>
                <p className="mt-1 font-display text-xl font-bold text-foreground">
                  {industry.unitEconomics.averageJobValue}
                </p>
                <p className="mt-2 text-xs text-foreground/60">Median ticket across active operators</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-medium text-foreground/55">Monthly Missed Calls</p>
                <p className="mt-1 font-display text-xl font-bold text-foreground">
                  {industry.unitEconomics.monthlyMissedCallsEst}
                </p>
                <p className="mt-2 text-xs text-foreground/60">Typical uncaptured call volume</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-medium text-foreground/55">Recovered Revenue Model</p>
                <p className="mt-1 font-display text-sm font-bold text-emerald-600">
                  {industry.unitEconomics.recoveredRevenueModel.slice(0, 32)}...
                </p>
                <p className="mt-2 text-xs text-foreground/60">{industry.unitEconomics.recoveredRevenueModel}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-medium text-foreground/55">Projected ROI Multiple</p>
                <p className="mt-1 font-display text-xl font-bold text-brand">
                  {industry.unitEconomics.roiMultiple}
                </p>
                <p className="mt-2 text-xs text-foreground/60">Compared to monthly software retainer</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Field Software & CRM Integration Ecosystem */}
      {industry.softwareIntegrations && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-brand" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Software Ecosystem</p>
            </div>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
              Compatible Field Software & CRMs
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              We connect your existing operational stack with native API webhooks and automated GoHighLevel sync.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Primary CRMs</h3>
                <ul className="mt-3 space-y-2 text-xs text-foreground/80">
                  {industry.softwareIntegrations.primaryCrms.map((crm) => (
                    <li key={crm} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      <span>{crm}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-surface-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Field & Practice Software</h3>
                <ul className="mt-3 space-y-2 text-xs text-foreground/80">
                  {industry.softwareIntegrations.fieldSoftware.map((software) => (
                    <li key={software} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      <span>{software}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-surface-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Telephony & Forwarding</h3>
                <ul className="mt-3 space-y-2 text-xs text-foreground/80">
                  {industry.softwareIntegrations.telephony.map((tel) => (
                    <li key={tel} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      <span>{tel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Compliance & Regulatory Safeguards */}
      {industry.complianceAndStandards && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Regulatory Guardrails</p>
            </div>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
              Compliance & Data Privacy Standards
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Engineered to adhere to both US and Australian telecommunications and privacy legislation.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/50">United States</span>
                <h3 className="mt-2 font-display text-base font-bold text-foreground">US Telecommunications & Privacy</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                  {industry.complianceAndStandards.usRegulations}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/50">Australia</span>
                <h3 className="mt-2 font-display text-base font-bold text-foreground">Australian Privacy Principles (APPs)</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                  {industry.complianceAndStandards.auRegulations}
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-foreground/55">
              Data Security: {industry.complianceAndStandards.dataHandling}
            </p>
          </div>
        </section>
      )}

      {/* Voice Demo */}
      {demoScript && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Interactive Voice Demo</p>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
              Listen to our AI Voice Agent handling {industry.name.toLowerCase()} calls
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/68">
              Experience a simulated caller intake flow demonstrating natural conversational pacing, emergency qualification, and live scheduling.
            </p>
            <div className="mt-6 max-w-xl">
              <VoiceAgentDemo script={demoScript} />
            </div>
          </div>
        </section>
      )}

      {/* Traditional vs DigitalX Comparison */}
      {industry.comparison && industry.comparison.length > 0 && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Overcoming Price &amp; Trust Objections</p>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
              Traditional Answering vs. DigitalX AI Automation
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-50 text-foreground">
                    <th className="p-4 font-display font-semibold">Feature</th>
                    <th className="p-4 font-display font-semibold text-foreground/60">Traditional Call Centers / Front Desk</th>
                    <th className="p-4 font-display font-semibold text-brand">DigitalX AI Automation (AU &amp; US)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {industry.comparison.map((row) => (
                    <tr key={row.feature} className="hover:bg-surface-50/50 transition-colors">
                      <td className="p-4 font-medium text-foreground">{row.feature}</td>
                      <td className="p-4 text-foreground/70">{row.traditional}</td>
                      <td className="p-4 font-medium text-brand">{row.digitalx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {industry.faqs && industry.faqs.length > 0 && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Industry Guidance</p>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
              Frequently Asked Questions for {industry.name}
            </h2>
            <dl className="mt-6 space-y-6">
              {industry.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                  <dt className="font-display text-base font-semibold text-foreground md:text-lg">{faq.question}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-foreground/72 md:text-sm">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {industryCaseStudies.length > 0 && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <h2 className="font-display text-2xl text-foreground">{industry.name} Case Studies</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industryCaseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group rounded-xl border border-border bg-surface-50 p-5 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">{cs.industry}</p>
                  <h3 className="mt-2 font-display text-base font-bold text-foreground">{cs.client}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/68">{cs.impact}</p>
                  <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand transition group-hover:text-brand-deep">
                    Read case study
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Connected Solution Stacks */}
      <section className="container-shell mt-14">
        <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
          <h2 className="font-display text-2xl text-foreground">Recommended Solution Stacks for {industry.name}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {linkedSolutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="rounded-xl border border-border bg-white p-5 transition hover:border-brand/40 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground">{solution.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/68">{solution.summary}</p>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand">
                  Explore solution
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation & NAP Callout Card */}
      <section className="container-shell mt-14">
        <div className="flex flex-col justify-between rounded-3xl border border-border bg-white p-6 md:p-10 shadow-sm lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">Custom Scoping</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
              Ready to automate intake for your {industry.name.toLowerCase()} business?
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-foreground/70 md:text-sm">
              We scope a phased implementation tailored to your specific field software, dispatch staff, and call volume. Speak directly with an engineer.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-foreground/80">
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-brand" />
                <a href="tel:+61451413786" className="text-brand font-medium hover:underline">
                  +61 451 413 786
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                <span>16 Boldrewood Ave, Casula NSW 2170, Australia</span>
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep shadow-sm"
            >
              Book a Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/61451413786"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface-50 px-5 py-3 text-xs font-semibold text-foreground transition hover:bg-surface-100"
            >
              <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
