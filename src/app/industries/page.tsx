import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries, industryCategories, getIndustriesByCategory } from "@/data/industries";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/industries", {
  title: "Industries We Serve | 50+ Sector Playbooks | USA & Australia",
  description:
    "Explore DigitalX Solutions automation playbooks for home services, healthcare, professional services, beauty, hospitality, automotive, and more.",
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

        {/* Category quick-nav */}
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Industry categories">
          {industryCategories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-foreground/70 transition hover:border-brand/40 hover:text-brand"
            >
              {category}
            </a>
          ))}
        </nav>
      </section>

      {industryCategories.map((category) => {
        const categoryIndustries = getIndustriesByCategory(category);
        const anchorId = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        return (
          <section key={category} id={anchorId} className="container-shell mt-14 scroll-mt-24">
            <h2 className="mb-6 font-display text-2xl text-foreground md:text-3xl">{category}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categoryIndustries.map((industry) => (
                <article key={industry.slug} className="group rounded-2xl border border-border bg-surface-50 p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm">
                  <h3 className="font-display text-xl text-foreground">{industry.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/72">{industry.summary}</p>

                  <h4 className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">Common blockers</h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-foreground/68">
                    {industry.painPoints.slice(0, 2).map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>

                  <Link
                    href={`/industries/${industry.slug}`}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep"
                  >
                    View industry playbook
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
