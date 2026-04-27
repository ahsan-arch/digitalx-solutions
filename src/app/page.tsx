import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import {
  heroMetrics,
  processSteps,
  solutions,
  developmentProjects,
  results,
} from "@/data/redesign";

export default function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main id="main" className="pb-24">
        <section className="container-shell pt-14 md:pt-20">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-50 px-6 py-12 shadow-sm md:px-10 md:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/20 blur-3xl"
            />

            <p className="mb-4 inline-flex rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-foreground/70">
              DigitalX Solutions
            </p>
            <h1 className="max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">
              Revenue systems for teams that need faster growth without operational chaos.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/72 md:text-lg">
              We combine web development, AI automation, and performance marketing into one execution model so growth
              strategy and delivery stay aligned.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-100"
              >
                Explore solutions
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-border/80 bg-white/80 p-4">
                  <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                  <p className="mt-1 text-sm text-foreground/65">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-shell mt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Solutions</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">Capability stacks built to work together</h2>
            </div>
            <Link href="/solutions" className="text-sm font-semibold text-brand hover:text-brand-deep">
              View all
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/50">{solution.tagline}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">{solution.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/68">{solution.summary}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
            <Link
              href="/solutions"
              className="group flex flex-col justify-center rounded-2xl border border-dashed border-brand/50 bg-white p-6 transition hover:border-brand hover:bg-surface-50"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/50">All capability stacks</p>
              <h3 className="mt-2 font-display text-2xl text-foreground">See all solutions</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/68">
                Explore every solution we deploy, from AI voice agents to GoHighLevel builds and custom n8n automations.
              </p>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep">
                View solutions
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>

        <section id="development" className="container-shell mt-16 scroll-mt-24">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Development</p>
              <h2 className="mt-2 font-display text-3xl text-foreground md:text-4xl">Featured Projects</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {developmentProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/development/${project.slug}`}
                className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{project.name}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">{project.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/68">{project.overview}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep">
                  View full details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="container-shell mt-16">
          <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
            <h2 className="font-display text-3xl text-foreground md:text-4xl">How engagement works</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-border bg-surface-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">0{index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/68">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-shell mt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl text-foreground md:text-4xl">Selected outcomes</h2>
            <Link href="/work" className="text-sm font-semibold text-brand hover:text-brand-deep">
              See all case studies
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {results.slice(0, 3).map((result) => (
              <Link
                key={result.slug}
                href={`/work/${result.slug}`}
                className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/50">{result.industry}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">{result.client}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/68">{result.impact}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {result.metrics.slice(0, 2).map((metric) => (
                    <span
                      key={metric.label}
                      className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-foreground/70"
                    >
                      {metric.label}: {metric.value}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep">
                  Read case study
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="container-shell mt-16">
          <div className="rounded-3xl border border-border bg-foreground px-6 py-12 text-white md:px-10">
            <h2 className="font-display text-3xl md:text-4xl">Need a growth system your team can actually run?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Bring your goals, current constraints, and timeline. We will map the fastest path to measurable improvement.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground"
              >
                Start with a strategy call
              </Link>
              <Link
                href="/insights"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Read practical insights
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
