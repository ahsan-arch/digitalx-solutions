import Link from "next/link";
import { SectionIllustration } from "@/components/ui";
import {
    generateBreadcrumbSchema,
    generateItemListSchema,
    generatePageMetadata,
    siteConfig,
} from "@/lib/seo";
import { results } from "@/data/redesign";

export const metadata = generatePageMetadata("/work", {
    title: "Results | DigitalX Solutions Case Studies",
    description:
        "Review selected DigitalX Solutions outcomes across home services, healthcare, professional services, and e commerce teams.",
});

export default function WorkPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Results", url: `${siteConfig.domain}/work` },
    ]);

    const itemListSchema = generateItemListSchema(
        "DigitalX Solutions Case Studies",
        results.map((r) => ({
            name: `${r.client} — ${r.industry}`,
            url: `${siteConfig.domain}/work/${r.slug}`,
            description: r.impact,
        }))
    );

    return (
        <main id="main" className="pb-20 pt-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />

            <section className="container-shell">
                <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Results</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-6xl">
                            Outcomes driven by integrated execution.
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                            We focus on revenue quality, conversion efficiency, and operational reliability. The stories below
                            show the type of performance shifts we target.
                        </p>
                    </div>
                    <div className="relative">
                        <SectionIllustration src="/illustrations/work.svg" priority />
                    </div>
                </div>
            </section>

            <section className="container-shell mt-10">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {results.map((result) => (
                        <Link
                            key={result.slug}
                            href={`/work/${result.slug}`}
                            className="group flex flex-col rounded-2xl border border-border bg-surface-50 p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">{result.industry}</p>
                            <h2 className="mt-2 font-display text-2xl text-foreground group-hover:text-brand">{result.client}</h2>
                            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                                <span className="font-medium text-foreground">Challenge: </span>
                                {result.challenge}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-brand">
                                <span className="font-semibold">Impact: </span>
                                {result.impact}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {result.services.map((service) => (
                                    <span
                                        key={service}
                                        className="rounded-full border border-border bg-surface-100 px-3 py-1 text-[11px] font-medium text-foreground/75"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {result.metrics.map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="flex flex-col items-start justify-center rounded-lg border border-border bg-white px-3 py-2 text-xs"
                                    >
                                        <span className="font-semibold text-foreground/60">{metric.label}</span>
                                        <span className="mt-0.5 font-bold text-foreground">{metric.value}</span>
                                    </div>
                                ))}
                            </div>

                            <span className="mt-auto pt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-deep">
                                Read full case study {"->"}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="container-shell mt-12">
                <div className="rounded-3xl border border-border bg-foreground px-6 py-12 text-center text-white md:px-10">
                    <h2 className="font-display text-3xl md:text-4xl">Want similar outcomes in your context?</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                        We can scope a phased plan around your current pipeline, conversion targets, and operating
                        constraints.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-foreground"
                    >
                        Book a strategy call
                    </Link>
                </div>
            </section>
        </main>
    );
}

