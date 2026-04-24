import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getIndustryBySlug, industries } from "@/data/industries";
import { getSolutionBySlug } from "@/data/redesign";
import { getDemoScript } from "@/data/voice-demos";
import { VoiceAgentDemo } from "@/components/ui/voice-agent-demo";
import {
  generateBreadcrumbSchema,
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

  return generatePageMetadata(`/industries/${industry.slug}`, {
    title: `${industry.name} Growth Playbook | DigitalX Solutions`,
    description: industry.summary,
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

  const demoScript = getDemoScript(slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Industries", url: `${siteConfig.domain}/industries` },
    { name: industry.name, url: `${siteConfig.domain}/industries/${industry.slug}` },
  ]);

  const serviceSchema = generateServicePageSchema({
    name: `${industry.name} Growth Playbook`,
    description: industry.summary,
    url: `${siteConfig.domain}/industries/${industry.slug}`,
  });

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section className="container-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Industry Playbook</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">{industry.name}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">{industry.headline}</p>
      </section>

      <section className="container-shell mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-border bg-surface-50 p-6 md:p-8">
          <h2 className="font-display text-2xl text-foreground">Primary operating challenges</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
            {industry.painPoints.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-foreground">Recommended playbook</h3>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
            {industry.playbook.map((item, index) => (
              <li key={item} className="rounded-xl border border-border bg-white p-3">
                <span className="mr-2 font-semibold text-brand">{index + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </article>

        <aside className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-foreground">Need a tailored rollout?</h2>
          <p className="mt-3 text-sm text-foreground/70">
            We can scope a phased implementation aligned to your existing team capacity, systems, and current campaign
            spend.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            Book a strategy call
          </Link>
        </aside>
      </section>

      {demoScript && (
        <section className="container-shell mt-12">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Live Demo</p>
            <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">Hear how our AI voice agent handles {industry.name.toLowerCase()} calls</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/68">
              This interactive demo shows a real conversation flow — how our AI answers, qualifies, and books appointments for your industry.
            </p>
          </div>
          <div className="max-w-xl">
            <VoiceAgentDemo script={demoScript} />
          </div>
        </section>
      )}

      <section className="container-shell mt-12">
        <div className="rounded-3xl border border-border bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl text-foreground">Recommended solution stacks</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {linkedSolutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="rounded-xl border border-border bg-surface-50 p-4 transition hover:border-brand/40"
              >
                <h3 className="text-lg font-semibold text-foreground">{solution.name}</h3>
                <p className="mt-2 text-sm text-foreground/68">{solution.summary}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
                  View solution
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
