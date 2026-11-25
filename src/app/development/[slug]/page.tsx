import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Code,
  Layers,
  BookOpen,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import { developmentServices, getDevelopmentServiceBySlug } from "@/data/development-services";
import { clientProjects } from "@/data/facts";
import { BuildRoadmapTimeline } from "@/components/development/build-roadmap-timeline";
import { CaseStudyUiVisual } from "@/components/case-studies/case-study-ui-visual";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return developmentServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getDevelopmentServiceBySlug(slug);

  if (!service) {
    return {
      title: "Development Service Not Found | DigitalX",
      description:
        "Explore custom CRM development, resilient API and webhook integrations, AI agent development, and white-label CRM platforms engineered by DigitalX Solutions.",
    };
  }

  const ogUrl = `/api/og?${new URLSearchParams({ title: service.metaTitle }).toString()}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `${siteConfig.domain}/development/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteConfig.domain}/development/${service.slug}`,
      siteName: "DigitalX Solutions",
      type: "website",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: service.metaTitle,
          type: "image/png",
        },
      ],
    },
  };
}

export default async function DevelopmentSlugPage(props: Props) {
  const { slug } = await props.params;
  const service = getDevelopmentServiceBySlug(slug);

  if (service) {
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: "Home", url: siteConfig.domain },
      { name: "Development", url: `${siteConfig.domain}/development` },
      { name: service.name, url: `${siteConfig.domain}/development/${service.slug}` },
    ]);

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteConfig.domain}/development/${service.slug}#service`,
      name: service.name,
      serviceType: service.slug === "custom-crm-development" ? "Custom CRM Development" : "Software Engineering & Automation Architecture",
      provider: {
        "@type": "Organization",
        name: "DigitalX Solutions",
        url: siteConfig.domain,
      },
      areaServed: [
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "United States" },
      ],
      description: service.summary,
      offers: service.slug === "custom-crm-development" ? [
        {
          "@type": "Offer",
          name: "CRM Setup & Integration",
          price: "2200",
          priceCurrency: "USD",
          url: `${siteConfig.domain}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Hybrid Custom CRM Build",
          price: "8500",
          priceCurrency: "USD",
          url: `${siteConfig.domain}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Proprietary / White-Label CRM",
          price: "15000",
          priceCurrency: "USD",
          url: `${siteConfig.domain}/pricing`,
        },
      ] : {
        "@type": "Offer",
        price: "2200",
        priceCurrency: "USD",
        url: `${siteConfig.domain}/pricing`,
      },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.domain}/development/${service.slug}#software`,
      name: service.name,
      description: service.summary,
      url: `${siteConfig.domain}/development/${service.slug}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud, Web, Docker, Linux",
      provider: {
        "@type": "Organization",
        name: "DigitalX Solutions",
        url: siteConfig.domain,
      },
      offers: {
        "@type": "Offer",
        price: "2500.00",
        priceCurrency: "USD",
        url: `${siteConfig.domain}/pricing`,
      },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <main id="main" className="pb-24 pt-12">
          {/* HERO */}
          <section className="container-shell">
            <Link
              href="/development"
              className="mb-6 inline-flex items-center font-mono text-xs font-medium text-foreground/75 transition hover:text-brand"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Development Services
            </Link>

            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-1.5 font-mono text-xs font-medium text-brand">
                <Code className="h-3.5 w-3.5" />
                Custom Architecture Blueprint
              </div>
              <h1 className="font-display text-4xl text-foreground md:text-5xl lg:text-6xl font-semibold leading-tight">
                {service.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
                {service.summary}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
                >
                  Schedule Engineering Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-100"
                >
                  Browse Complementary Solutions
                </Link>
              </div>
            </div>
          </section>

          {/* PROBLEM SOLVED */}
          <section className="container-shell mt-14 md:mt-18">
            <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                The Operational Bottleneck We Eliminate
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80 md:text-base">
                {service.problemSolved}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="font-mono text-xs font-medium text-foreground/75 mr-2 self-center">
                  Stack Technologies:
                </span>
                {service.architecturalComponents.map((comp) => (
                  <span
                    key={comp}
                    className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-foreground/80 border border-border/80 shadow-2xs"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* DELIVERABLES */}
          <section className="container-shell mt-14 md:mt-18">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium text-brand">
                Engineering Deliverables
              </p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-foreground">
                What We Build &amp; Ship to Production
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {service.deliverables.map((deliv, idx) => (
                <div
                  key={deliv.title}
                  className="rounded-2xl border border-border bg-white p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-xs font-bold text-brand-deep">
                        0{idx + 1}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {deliv.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
                      {deliv.description}
                    </p>
                  </div>

                  <div className="mt-4 rounded-xl bg-surface-50 p-3.5 border border-border/60">
                    <span className="font-mono text-[10px] font-medium text-brand">
                      Technical Specification:
                    </span>
                    <p className="mt-1 font-mono text-xs text-foreground/85 leading-relaxed">
                      {deliv.deliverableDetails}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DEDICATED CUSTOM CRM CASE STUDIES & ROADMAP (FOR CUSTOM CRM DEVELOPMENT) */}
          {service.slug === "custom-crm-development" && (
            <>
              {/* Featured Custom CRM Case Studies directly under Deliverables */}
              <section className="container-shell mt-14 md:mt-18">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <p className="font-mono text-xs font-medium text-brand-deep">
                      Illustrative Custom CRM architecture scenarios
                    </p>
                    <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-foreground">
                      Before &amp; After Architecture Outcomes (Illustrative Estimates)
                    </h2>
                    <p className="mt-2 text-sm text-foreground/75">
                      Hybrid custom CRM architectures replace recurring per-seat SaaS CRM licenses with custom Next.js operator portals backed by normalized PostgreSQL schemas. In these illustrative 20-user and 4-clinic models, teams cut modeled licensing fees to $0 per user while unifying customer records across dispatch, telephony, and billing workflows.
                    </p>
                  </div>
                  <Link
                    href="/case-studies"
                    className="text-sm font-semibold text-brand hover:text-brand-deep shrink-0"
                  >
                    View all case studies &rarr;
                  </Link>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  {clientProjects
                    .filter(
                      (p) =>
                        p.id === "hybrid-field-service-crm" ||
                        p.id === "healthcare-patient-portal-crm"
                    )
                    .map((crmStudy) => (
                      <div key={crmStudy.id} className="space-y-4">
                        {"roiStats" in crmStudy &&
                          crmStudy.roiStats &&
                          "beforeStack" in crmStudy &&
                          crmStudy.beforeStack &&
                          "afterStack" in crmStudy &&
                          crmStudy.afterStack && (
                            <CaseStudyUiVisual
                              title={`${crmStudy.industry} — Custom CRM`}
                              mediaPath={"mediaPath" in crmStudy ? (crmStudy.mediaPath as string) : ""}
                              expectedAssetPath={
                                (crmStudy as { expectedAssetPath?: string }).expectedAssetPath ||
                                `public/images/case-studies/${crmStudy.slug}.webp`
                              }
                              sourceLabel={"source" in crmStudy ? (crmStudy.source as string) : "Illustrative estimate"}
                              calculationInputs={"calculationInputs" in crmStudy ? (crmStudy.calculationInputs as string) : undefined}
                              beforeStack={crmStudy.beforeStack as string[]}
                              afterStack={crmStudy.afterStack as string[]}
                              stats={crmStudy.roiStats as { label: string; value: string }[]}
                            />
                          )}
                        <div className="flex items-center justify-between px-1">
                          <span className="text-xs font-medium text-foreground/70">
                            {crmStudy.client} &bull; {crmStudy.industry}
                          </span>
                          <Link
                            href={`/case-studies/${crmStudy.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                          >
                            Read Full Architecture Case Study
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </section>

              {/* Interactive Build Timeline */}
              <section className="container-shell mt-14 md:mt-18">
                <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
                  <div className="max-w-2xl mb-8">
                    <p className="font-mono text-xs font-medium text-brand-deep">
                      6-week delivery cadence
                    </p>
                    <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-foreground">
                      Interactive Production Build Roadmap
                    </h2>
                    <p className="mt-2 text-sm text-foreground/75">
                      Every hybrid custom CRM build follows a structured weekly engineering cadence with concrete staging milestones and zero ambiguity.
                    </p>
                  </div>
                  <BuildRoadmapTimeline />
                </div>
              </section>

              {/* 3-Tier CRM Architecture Ladder */}
              <section className="container-shell mt-14 md:mt-18">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs font-medium text-brand-deep">
                    Architecture pathways
                  </p>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-foreground">
                    Choose Your Custom CRM Maturity Tier
                  </h2>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-xs transition-all hover:border-brand/40 [@media(hover:hover)]:hover:-translate-y-1">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <span className="font-mono text-xs font-semibold text-brand">Tier 1 &bull; $2,200</span>
                        <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                          CRM Setup &amp; Integration
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                          Turnkey GoHighLevel or HubSpot setup paired with bidirectional n8n webhooks into dispatch and accounting systems.
                        </p>
                      </div>
                      <Link
                        href="/solutions/crm-integration"
                        className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                      >
                        Explore CRM Integration <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="h-full rounded-2xl border border-brand/40 bg-white p-6 shadow-xs transition-all hover:border-brand [@media(hover:hover)]:hover:-translate-y-1">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <span className="font-mono text-xs font-semibold text-brand">Tier 2 &bull; $8,500 (Flagship)</span>
                        <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                          Hybrid Custom CRM Build
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                          Bespoke Next.js &amp; PostgreSQL portals layered over proven CRM APIs with RBAC security, zero seat fees, and 100% IP ownership.
                        </p>
                      </div>
                      <Link
                        href="/pricing"
                        className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                      >
                        Compare Hybrid Pricing &amp; TCO <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-xs transition-all hover:border-brand/40 [@media(hover:hover)]:hover:-translate-y-1">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <span className="font-mono text-xs font-semibold text-brand">Tier 3 &bull; $15,000+</span>
                        <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                          Proprietary / White-Label CRM
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                          Multi-tenant SaaS workspaces, automated Stripe subscription/rebilling, custom domains, and executive telemetry.
                        </p>
                      </div>
                      <Link
                        href="/development/white-label-crm-platform"
                        className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                      >
                        Explore White-Label Architecture <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TECHNICAL SPECIFICATIONS */}
          <section className="container-shell mt-14 md:mt-18">
            <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Technical Architecture &amp; Integration Standards
              </h2>
              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-50 border-b border-border text-xs font-semibold uppercase text-foreground/70">
                    <tr>
                      <th className="p-4">Architecture Layer</th>
                      <th className="p-4">Implementation Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground/80">
                    {service.technicalSpecifications.map((spec) => (
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

          {/* TCO COMPARISON TABLE (FOR CUSTOM CRM DEVELOPMENT) */}
          {service.slug === "custom-crm-development" && (
            <section className="container-shell mt-14 md:mt-18">
              <div className="rounded-3xl border border-border bg-white p-6 md:p-10 shadow-xs">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
                    Financial Analysis &amp; Total Cost of Ownership
                  </p>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-foreground">
                    Why a Hybrid Custom CRM Cuts Total Cost of Ownership by 60%+
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                    Off-the-shelf CRMs penalize you every time you hire. Here is the 3-year cost comparison for a 20-person operations team.
                  </p>
                </div>

                <div className="mt-8 overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-surface-50 text-xs font-semibold text-foreground">
                        <th scope="col" className="p-4">Cost Category</th>
                        <th scope="col" className="p-4">Legacy Enterprise CRM (Salesforce / HubSpot Pro)</th>
                        <th scope="col" className="p-4 bg-brand/5 text-brand">DigitalX Hybrid Custom CRM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground/80">
                      <tr className="hover:bg-surface-50/50">
                        <td className="p-4 font-semibold text-foreground">Per-Seat Software Fees (20 Users)</td>
                        <td className="p-4 text-foreground/75 font-mono text-xs">$2,000 – $3,000 / month ($72,000 – $108,000 over 3 yrs)</td>
                        <td className="p-4 font-mono text-xs font-semibold bg-brand/5 text-emerald-700">$0 / month (Unlimited internal &amp; client seats)</td>
                      </tr>
                      <tr className="hover:bg-surface-50/50">
                        <td className="p-4 font-semibold text-foreground">Initial Implementation &amp; Migration</td>
                        <td className="p-4 text-foreground/75 font-mono text-xs">$5,000 – $15,000+ (Consultant fees)</td>
                        <td className="p-4 font-mono text-xs font-semibold bg-brand/5 text-foreground">$8,500 – $15,000 (Fixed-scope build)</td>
                      </tr>
                      <tr className="hover:bg-surface-50/50">
                        <td className="p-4 font-semibold text-foreground">Monthly Cloud Hosting &amp; APIs</td>
                        <td className="p-4 text-foreground/75 font-mono text-xs">Included in seat fees</td>
                        <td className="p-4 font-mono text-xs font-semibold bg-brand/5 text-foreground">~$100 – $250 / month (Direct pass-through)</td>
                      </tr>
                      <tr className="hover:bg-surface-50/50">
                        <td className="p-4 font-semibold text-foreground">3-Year Total Cost of Ownership</td>
                        <td className="p-4 text-foreground/75 font-mono text-xs">$77,000 – $123,000+</td>
                        <td className="p-4 font-mono text-xs font-semibold bg-brand/5 text-emerald-700">$12,100 – $24,000 (60%+ illustrative estimate)</td>
                      </tr>
                      <tr className="hover:bg-surface-50/50">
                        <td className="p-4 font-semibold text-foreground">Asset Ownership</td>
                        <td className="p-4 text-foreground/75 font-mono text-xs">Rented (lose access if you cancel)</td>
                        <td className="p-4 font-mono text-xs font-semibold bg-brand/5 text-emerald-700">100% Owned (Your repo, your database)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-foreground/65 leading-relaxed">
                  <strong>Source: Illustrative estimate.</strong> Calculation inputs: 20 users &times; $100–$150/user/mo ($2,000–$3,000/mo &times; 36 months = $72,000–$108,000) + $5,000–$15,000 onboarding vs. $8,500–$15,000 fixed-scope build + $100–$250/mo direct cloud hosting &times; 36 months ($3,600–$9,000).
                </p>

                {/* Dual CTAs after TCO Proof Section */}
                <div className="mt-6 flex flex-wrap gap-3 pt-5 border-t border-border/70">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep transition"
                  >
                    Book a strategy call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/try-voice-agent"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-100 transition"
                  >
                    Hear a live AI demo
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* MISTAKES TO AVOID */}
          <section className="container-shell mt-14 md:mt-18">
            <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 md:p-10">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                Critical Mistakes to Avoid in Production Builds
              </div>
              <div className="mt-4 space-y-3">
                {service.mistakesToAvoid.map((mistake, i) => (
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
              <p className="font-mono text-xs font-medium text-brand">
                Direct Answers
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-foreground">
                Frequently Asked Implementation Questions
              </h2>
            </div>

            <div className="mt-8 space-y-4">
              {service.faqs.map((faq) => (
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

          {/* INTERNAL LINKS */}
          <section className="container-shell mt-14 md:mt-18">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface-50 p-6">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm mb-4">
                  <Layers className="h-4 w-4 text-brand" />
                  Related Capability Stacks
                </div>
                <ul className="space-y-2.5">
                  {service.relatedSolutions.map((sol) => (
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
                  Supporting Operator Insights
                </div>
                <ul className="space-y-2.5">
                  {service.relatedInsights.map((ins) => (
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
                  Scope Your Custom Development Project
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/80">
                  Speak directly with our senior solutions architect. We will review your technical specifications, evaluate API constraints, and map a fixed-scope milestone delivery plan.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-surface-100 transition-colors"
                  >
                    Book a strategy call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/try-voice-agent"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    Hear a live AI demo
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  notFound();
}