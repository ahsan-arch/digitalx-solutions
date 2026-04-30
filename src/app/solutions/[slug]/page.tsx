import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getSolutionBySlug, solutions } from "@/data/redesign";
import { industries } from "@/data/industries";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServicePageSchema,
  siteConfig,
} from "@/lib/seo";

type PageParams = { slug: string };

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return { title: "Solution Not Found" };
  }

  return generatePageMetadata(`/solutions/${solution.slug}`, {
    title: `${solution.name} Solutions | DigitalX Solutions`,
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

  const faqSchema = solution.faqs && solution.faqs.length > 0
    ? generateFAQSchema(solution.faqs)
    : null;

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <section className="container-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Solution</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">{solution.name}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">{solution.summary}</p>
      </section>

      <section className="container-shell mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-border bg-surface-50 p-6 md:p-8">
          <h2 className="font-display text-2xl text-foreground">Outcomes we target</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
            {solution.outcomes.map((outcome) => (
              <li key={outcome}>• {outcome}</li>
            ))}
          </ul>

          <h3 className="mt-8 text-lg font-semibold text-foreground">Capabilities included</h3>
          <ul className="mt-3 grid gap-2 text-sm text-foreground/70 sm:grid-cols-2">
            {solution.capabilities.map((capability) => (
              <li key={capability} className="rounded-xl border border-border bg-white px-3 py-2">
                {capability}
              </li>
            ))}
          </ul>
        </article>

        <aside className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-foreground">Best fit</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">{solution.bestFor}</p>

          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            Start a project
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">Legacy paths redirected</p>
          <ul className="mt-2 space-y-1 text-xs text-foreground/60">
            {solution.legacyPaths.map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>
        </aside>
      </section>

      {solution.faqs && solution.faqs.length > 0 && (
        <section className="container-shell mt-12">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-8">
            <h2 className="font-display text-2xl text-foreground">Frequently asked questions</h2>
            <dl className="mt-6 space-y-6">
              {solution.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                  <dt className="font-display text-lg font-semibold text-foreground">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground/72">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="container-shell mt-12">
        <div className="rounded-3xl border border-border bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl text-foreground">Industry playbooks that pair with this solution</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {relatedIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="rounded-xl border border-border bg-surface-50 p-4 transition hover:border-brand/40"
              >
                <h3 className="text-lg font-semibold text-foreground">{industry.name}</h3>
                <p className="mt-2 text-sm text-foreground/68">{industry.headline}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
                  View playbook
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
