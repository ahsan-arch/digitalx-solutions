import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  const industry = result.industrySlug ? getIndustryBySlug(result.industrySlug) : undefined;
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
    headline: `${result.client}, ${result.industry}`,
    description: result.impact,
    about: result.industry,
    author: { "@id": `${siteConfig.domain}/#organization` },
    publisher: { "@id": `${siteConfig.domain}/#organization` },
  };

  return (
    <main className="pb-32 pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      <article className="mx-auto w-full max-w-prose px-4 md:px-8">
        <Link
          href="/work"
          className="mb-10 inline-flex items-center text-[13px] font-medium text-foreground/40 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to results
        </Link>

        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/40">{result.industry}</p>
        <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] tracking-tight text-foreground">
          {result.client}
        </h1>
        <p className="mt-5 text-base leading-[1.7] text-foreground/55 md:text-[17px]">{result.impact}</p>

        {/* Metrics */}
        <div className="mt-12 grid gap-x-12 gap-y-6 sm:grid-cols-3">
          {result.metrics.map((m) => (
            <div key={m.label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/35">{m.label}</p>
              <p className="mt-1 text-[28px] font-semibold tracking-tight text-foreground">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="divider mt-12" />

        {/* Narrative */}
        <section className="mt-12 space-y-5">
          <h2 className="text-lg font-semibold text-foreground">The story</h2>
          {result.narrative.map((para, i) => (
            <p key={i} className="text-[14px] leading-[1.8] text-foreground/55">{para}</p>
          ))}
        </section>

        {/* Solutions used */}
        {result.solutionsUsed.length > 0 && (
          <>
            <div className="divider mt-12" />
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-foreground">Solutions deployed</h2>
              <div className="mt-4 space-y-2">
                {result.solutionsUsed.map((s) => {
                  const sol = getSolutionBySlug(s);
                  if (!sol) return null;
                  return (
                    <Link
                      key={s}
                      href={`/solutions/${sol.slug}`}
                      className="group flex items-center justify-between border-t border-border/50 py-3 text-[14px]"
                    >
                      <span className="font-medium text-foreground group-hover:text-brand transition-colors">
                        {sol.name}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-foreground/30 group-hover:text-brand transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* Industry link */}
        {industry && (
          <>
            <div className="divider mt-12" />
            <section className="mt-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/35">
                Industry playbook
              </p>
              <h3 className="mt-2 text-[15px] font-semibold text-foreground">{industry.name}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-foreground/50">{industry.summary}</p>
              <Link
                href={`/industries/${industry.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-foreground/50 hover:text-brand transition-colors"
              >
                View {industry.name} playbook <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>
          </>
        )}
      </article>
    </main>
  );
}
