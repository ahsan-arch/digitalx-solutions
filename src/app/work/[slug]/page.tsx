import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getResultBySlug, results, getSolutionBySlug, getIndustryBySlug } from "@/data/redesign";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

type PageParams = { slug: string };

export function generateStaticParams() {
  return results.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const result = getResultBySlug(slug);
  if (!result) return { title: "Case Study Not Found" };

  return generatePageMetadata(`/work/${result.slug}`, {
    title: `${result.client} Case Study | ${result.industry}`,
    description: result.impact,
  });
}

export default async function WorkDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const result = getResultBySlug(slug);
  if (!result) notFound();

  const industry = getIndustryBySlug(result.industrySlug);
  const url = `${siteConfig.domain}/work/${result.slug}`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Work", url: `${siteConfig.domain}/work` },
    { name: result.client, url },
  ]);

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    headline: `${result.client} — ${result.industry}`,
    description: result.impact,
    about: result.industry,
    author: { "@id": `${siteConfig.domain}/#organization` },
    publisher: { "@id": `${siteConfig.domain}/#organization` },
  };

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      <article className="mx-auto w-full max-w-prose px-4 md:px-8">
        <Link
          href="/work"
          className="mb-10 inline-flex items-center font-mono text-caption text-accent hover:text-accent-hover"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to results
        </Link>

        <p className="font-mono text-overline text-ink-tertiary">{result.industry}</p>
        <h1 className="mt-3 font-display text-display-md text-ink-primary">{result.client}</h1>
        <p className="mt-4 text-body-lg text-ink-secondary">{result.impact}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {result.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-line-subtle bg-surface-sunken p-5">
              <p className="font-mono text-overline text-ink-tertiary">{m.label}</p>
              <p className="mt-2 font-display text-2xl text-ink-primary">{m.value}</p>
            </div>
          ))}
        </div>

        <section className="mt-12 space-y-5">
          <h2 className="font-display text-display-sm text-ink-primary">The story</h2>
          {result.narrative.map((para, i) => (
            <p key={i} className="text-body text-ink-secondary">{para}</p>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="font-display text-display-sm text-ink-primary">Solutions deployed</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {result.solutionsUsed.map((s) => {
              const sol = getSolutionBySlug(s);
              if (!sol) return null;
              return (
                <Link
                  key={s}
                  href={`/solutions/${sol.slug}`}
                  className="rounded-pill border border-accent/40 bg-accent-soft px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
                >
                  {sol.name}
                </Link>
              );
            })}
          </div>
        </section>

        {industry && (
          <section className="mt-12 rounded-lg border border-line-subtle bg-surface-sunken p-6">
            <p className="font-mono text-overline text-ink-tertiary">Industry playbook</p>
            <h3 className="mt-2 font-display text-title-lg text-ink-primary">{industry.name}</h3>
            <p className="mt-3 text-body-sm text-ink-secondary">{industry.summary}</p>
            <Link
              href={`/industries/${industry.slug}`}
              className="mt-4 inline-flex items-center text-sm font-semibold text-accent hover:text-accent-hover"
            >
              View {industry.name} playbook →
            </Link>
          </section>
        )}
      </article>
    </main>
  );
}
