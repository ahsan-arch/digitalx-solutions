import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { processSteps, solutions } from "@/data/redesign";
import { SectionIllustration } from "@/components/ui";
import {
  generateBreadcrumbSchema,
  generateItemListSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/solutions", {
  title: "Solutions | Web Development, AI Automation, Performance Marketing",
  description:
    "Explore DigitalX Solutions capability stacks across web development, AI automation, and performance marketing for US and Australian teams.",
});

export default function SolutionsHubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Solutions", url: `${siteConfig.domain}/solutions` },
  ]);

  const itemListSchema = generateItemListSchema(
    "DigitalX Solutions Capability Stacks",
    solutions.map((s) => ({
      name: s.name,
      url: `${siteConfig.domain}/solutions/${s.slug}`,
      description: s.summary,
    }))
  );

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <section className="container-shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Solutions</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-6xl">
              Three integrated capabilities. One growth system.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
              Most teams split delivery across multiple vendors. We keep strategy, build, and optimization in one loop so
              decisions are faster and outcomes are measurable.
            </p>
          </div>
          <div className="relative">
            <SectionIllustration src="/illustrations/solutions.svg" priority />
          </div>
        </div>
      </section>

      <section className="container-shell mt-10">
        <div className="grid gap-5 md:grid-cols-3">
          {solutions.map((solution) => (
            <article key={solution.slug} className="rounded-2xl border border-border bg-surface-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">{solution.tagline}</p>
              <h2 className="mt-2 font-display text-2xl text-foreground">{solution.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{solution.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                {solution.outcomes.slice(0, 2).map((outcome) => (
                  <li key={outcome}>• {outcome}</li>
                ))}
              </ul>
              <Link
                href={`/solutions/${solution.slug}`}
                className="mt-6 inline-flex items-center text-sm font-semibold text-brand hover:text-brand-deep"
              >
                View solution
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell mt-14">
        <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
          <h2 className="font-display text-3xl text-foreground">Engagement model</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-border bg-surface-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/68">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
