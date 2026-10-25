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
import { developmentProjects } from "@/data/redesign";

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
    return { title: "Service Not Found" };
  }

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
      serviceType: "Software Engineering & Automation Architecture",
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
          {/* HERO */}
          <section className="container-shell">
            <Link
              href="/development"
              className="mb-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-foreground/60 transition hover:text-brand"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Development Services
            </Link>

            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
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
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mr-2 self-center">
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
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
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
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-xs font-bold text-brand">
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
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
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
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
                    Book an Architecture Call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/development"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    View All Development Services
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  // Fallback for legacy developmentProjects
  const project = developmentProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Development", url: `${siteConfig.domain}/development` },
    { name: project.name, url: `${siteConfig.domain}/development/${project.slug}` },
  ]);

  return (
    <main className="container-shell py-20 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Link
        href="/development"
        className="mb-8 inline-flex items-center text-sm font-medium text-foreground/60 transition hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to projects
      </Link>

      <div className="rounded-3xl border border-border bg-surface-50 p-8 md:p-16">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          Technical Build Specification
        </span>
        <h1 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
          {project.name}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          {project.overview}
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl text-foreground font-semibold">Core Architecture &amp; Stack</h2>
            <ul className="mt-4 space-y-2">
              {project.techStack.map((item) => (
                <li key={item} className="flex items-center text-sm text-foreground/75">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-foreground font-semibold">Deliverables &amp; Outcomes</h2>
            <ul className="mt-4 space-y-2">
              {project.features.map((item) => (
                <li key={item} className="flex items-center text-sm text-foreground/75">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex items-center justify-between">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep"
          >
            Inquire About Similar Architecture
          </Link>
        </div>
      </div>
    </main>
  );
}