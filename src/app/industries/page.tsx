import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/redesign";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/industries", {
  title: "Industries | Home Services, Healthcare, Professional Services",
  description:
    "Explore DigitalX Solutions playbooks for home services, healthcare, and professional services teams in the USA and Australia.",
});

export default function IndustriesHubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.domain },
    { name: "Industries", url: `${siteConfig.domain}/industries` },
  ]);

  return (
    <main className="pb-20 pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="container-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Industries</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">
          Sector playbooks adapted to real operational constraints.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
          We do not force a generic framework onto every business. Each playbook maps demand generation, delivery
          operations, and reporting to your customer journey.
        </p>
      </section>

      <section className="container-shell mt-10 grid gap-5 md:grid-cols-3">
        {industries.map((industry) => (
          <article key={industry.slug} className="rounded-2xl border border-border bg-surface-50 p-6">
            <h2 className="font-display text-2xl text-foreground">{industry.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/72">{industry.summary}</p>

            <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">Common blockers</h3>
            <ul className="mt-2 space-y-2 text-sm text-foreground/68">
              {industry.painPoints.slice(0, 2).map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>

            <Link
              href={`/industries/${industry.slug}`}
              className="mt-5 inline-flex items-center text-sm font-semibold text-brand hover:text-brand-deep"
            >
              View industry playbook
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
