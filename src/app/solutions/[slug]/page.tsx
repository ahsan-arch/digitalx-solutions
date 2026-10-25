import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, MessageSquare, Phone, ShieldCheck, Zap } from "lucide-react";
import { getSolutionBySlug, results, solutions } from "@/data/redesign";
import { industries } from "@/data/industries";
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
  const primarySlugs = solutions.map((solution) => ({ slug: solution.slug }));
  const legacySlugs = [
    { slug: "ai-voice-agents" },
    { slug: "chatbots" },
    { slug: "automated-lead-nurturing" },
    { slug: "crm-integration" },
  ];
  return [...primarySlugs, ...legacySlugs];
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return { title: "Solution Not Found" };
  }

  const formattedTitle =
    solution.metaTitle ||
    (solution.name.toLowerCase().endsWith("implementation") ||
    solution.name.toLowerCase().endsWith("automation") ||
    solution.name.toLowerCase().endsWith("dashboards")
      ? solution.name
      : `${solution.name} Solutions`);

  return generatePageMetadata(`/solutions/${solution.slug}`, {
    title: formattedTitle,
    description: solution.summary,
  });
}

export default async function SolutionDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const relatedIndustries = industries.filter((industry) => industry.relatedSolutionSlugs.includes(solution.slug));
  const relatedCaseStudies = results.filter((r) => r.solutionsUsed.includes(solution.slug));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Solutions", url: `${siteConfig.domain}/solutions` },
    { name: solution.name, url: `${siteConfig.domain}/solutions/${solution.slug}` },
  ]);

  const serviceSchema = generateServicePageSchema({
    name: solution.name,
    description: solution.summary,
    url: `${siteConfig.domain}/solutions/${solution.slug}`,
  });

  const faqSchema =
    solution.faqs && solution.faqs.length > 0 ? generateFAQSchema(solution.faqs) : null;

  const howToSchema =
    solution.workflowSteps && solution.workflowSteps.length > 0
      ? generateHowToSchema({
          name: `${solution.name} Deployment & Operating Workflow`,
          description: `Step-by-step engineering and deployment methodology for ${solution.name} at DigitalX Solutions.`,
          steps: solution.workflowSteps.map((step) => ({
            name: step.name,
            text: `${step.text} ${step.detail}`,
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
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Solution</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">{solution.name}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">{solution.summary}</p>
      </section>

      {/* Overview & Fit with NAP Card */}
      <section className="container-shell mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-border bg-surface-50 p-6 md:p-8">
          <h2 className="font-display text-2xl text-foreground">Targeted Outcomes</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
            {solution.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-lg font-semibold text-foreground">Capabilities Included</h3>
          <ul className="mt-3 grid gap-2 text-sm text-foreground/70 sm:grid-cols-2">
            {solution.capabilities.map((capability) => (
              <li key={capability} className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Verified NAP & Strategy Consultation Card */}
        <aside className="flex flex-col justify-between rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Direct Consultation</p>
            </div>
            <h2 className="mt-2 text-xl font-bold text-foreground">Schedule a Strategy Call</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Speak directly with an AI automation engineer. We assess your CRM, intake flows, and call volume to model exact ROI.
            </p>

            <div className="mt-6 space-y-3 border-t border-border pt-4 text-xs text-foreground/80">
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <div>
                  <span className="font-semibold text-foreground">Direct Line: </span>
                  <a href="tel:+61451413786" className="font-medium text-brand hover:underline">
                    +61 451 413 786
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <div>
                  <span className="font-semibold text-foreground">Operating Hours: </span>
                  <span>Mon–Fri: 8:00am–6:00pm (AEDT & US Eastern coverage)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <div>
                  <span className="font-semibold text-foreground">Verified Office: </span>
                  <span>16 Boldrewood Ave, Casula NSW 2170, Australia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-deep"
            >
              Book a Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/61451413786"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface-50 px-5 py-2.5 text-xs font-semibold text-foreground transition hover:bg-surface-100"
            >
              <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
              Chat on WhatsApp
            </a>
          </div>
        </aside>
      </section>

      {/* Visual 4-Step Intake Workflow Stepper */}
      {solution.workflowSteps && solution.workflowSteps.length > 0 && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">How It Works</p>
              <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
                4-Step Intake & Operating Workflow
              </h2>
              <p className="mt-2 text-sm text-foreground/70">
                Engineered for maximum reliability, sub-second latency, and seamless CRM synchronization.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {solution.workflowSteps.map((step, idx) => (
                <div
                  key={step.name}
                  className="relative flex flex-col justify-between rounded-2xl border border-border bg-surface-50 p-5 transition hover:border-brand/40"
                >
                  <div>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold text-foreground">{step.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/70">{step.text}</p>
                  </div>
                  <p className="mt-4 border-t border-border/80 pt-3 text-[11px] leading-relaxed text-foreground/60 italic">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Specifications Grid */}
      {solution.technicalSpecs && solution.technicalSpecs.length > 0 && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-brand" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Engineering Architecture</p>
            </div>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">Technical Specifications & Standards</h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {solution.technicalSpecs.map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-border bg-white p-5">
                  <p className="text-xs font-medium text-foreground/55">{spec.label}</p>
                  <p className="mt-1 font-display text-lg font-bold text-foreground">{spec.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/65">{spec.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Matrix */}
      {solution.comparison && solution.comparison.length > 0 && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Comparative Analysis</p>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
              DigitalX Architecture vs Traditional Solutions
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Why owner-operated service brands replace call centers and fragile DIY templates with our engineered stack.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-50 text-foreground">
                    <th className="py-3 px-4 font-semibold">Capability / Metric</th>
                    <th className="py-3 px-4 font-bold text-brand bg-brand/5">DigitalX Solutions</th>
                    <th className="py-3 px-4 font-semibold text-foreground/70">Traditional Call Center / Agencies</th>
                    <th className="py-3 px-4 font-semibold text-foreground/50">Manual / In-House DIY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {solution.comparison.map((row) => (
                    <tr key={row.feature} className="hover:bg-surface-50/50">
                      <td className="py-3.5 px-4 font-medium text-foreground">{row.feature}</td>
                      <td className="py-3.5 px-4 font-semibold text-brand bg-brand/5">{row.digitalx}</td>
                      <td className="py-3.5 px-4 text-foreground/70">{row.traditional}</td>
                      <td className="py-3.5 px-4 text-foreground/50">{row.manual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Transparent Investment & ROI Tiers */}
      {solution.pricingTiers && solution.pricingTiers.length > 0 && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Transparent Investment</p>
              <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">Implementation & Management Tiers</h2>
              <p className="mt-2 text-sm text-foreground/70">
                Flat retainers with zero hidden task surcharges. Australian businesses can be billed in AUD; US businesses in USD.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {solution.pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`flex flex-col justify-between rounded-2xl border p-6 md:p-8 bg-white ${
                    tier.highlight ? "border-brand shadow-md ring-1 ring-brand/30" : "border-border"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-bold text-foreground">{tier.name}</h3>
                      {tier.highlight && (
                        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="font-display text-3xl font-extrabold text-foreground md:text-4xl">{tier.price}</span>
                      <span className="text-xs font-medium text-foreground/60">{tier.cadence}</span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-foreground/70">{tier.description}</p>

                    <ul className="mt-6 space-y-2.5 border-t border-border pt-5 text-xs text-foreground/80">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex items-center justify-center rounded-full py-2.5 px-5 text-xs font-semibold transition ${
                      tier.highlight
                        ? "bg-brand text-white hover:bg-brand-deep"
                        : "border border-border bg-surface-50 text-foreground hover:bg-surface-100"
                    }`}
                  >
                    Select {tier.name}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {solution.faqs && solution.faqs.length > 0 && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Expert Guidance</p>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">Frequently Asked Questions</h2>
            <dl className="mt-6 space-y-6">
              {solution.faqs.map((faq) => (
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
      {relatedCaseStudies.length > 0 && (
        <section className="container-shell mt-14">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <h2 className="font-display text-2xl text-foreground">Case Studies Using {solution.name}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((cs) => (
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

      {/* Connected Industry Playbooks */}
      <section className="container-shell mt-14">
        <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
          <h2 className="font-display text-2xl text-foreground">Industry Playbooks That Pair With This Solution</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {relatedIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="rounded-xl border border-border bg-surface-50 p-4 transition hover:border-brand/40"
              >
                <h3 className="text-base font-semibold text-foreground">{industry.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/68">{industry.headline}</p>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand">
                  View playbook
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
