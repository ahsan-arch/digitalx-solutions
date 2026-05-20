import { Metadata } from "next";
import Link from "next/link";
import { SectionIllustration } from "@/components/ui";
import {
    generateBlogSchema,
    generateBreadcrumbSchema,
    generateItemListSchema,
    generatePageMetadata,
    siteConfig,
} from "@/lib/seo";
import { articlesData, authors } from "@/data/insights-articles";

export const metadata: Metadata = generatePageMetadata("/insights", {
    title: "Digital Marketing & Performance Engineering Insights | DigitalX Solutions",
    description: "Advanced insights on deep-tech digital marketing, Next.js web development, server side tracking, and CRM automation strategies.",
});

const articles = Object.entries(articlesData)
    .map(([slug, a]) => ({
        slug,
        title: a.title,
        description: a.description,
        date: a.date,
        dateModified: a.dateModified,
        authorKey: a.authorKey,
        readTime: a.readTime,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function InsightsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Insights", url: `${siteConfig.domain}/insights` },
    ]);

    const itemListSchema = generateItemListSchema(
        "DigitalX Insights",
        articles.map((a) => ({
            name: a.title,
            url: `${siteConfig.domain}/insights/${a.slug}`,
            description: a.description,
        }))
    );

    const blogSchema = generateBlogSchema(
        articles.map((a) => ({
            title: a.title,
            description: a.description,
            url: `${siteConfig.domain}/insights/${a.slug}`,
            datePublished: a.date,
            dateModified: a.dateModified,
            authorName: authors[a.authorKey]?.name,
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            <section className="container-shell">
                <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Insights</p>
                        <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-6xl">
                            Practical notes on growth engineering and delivery systems.
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                            Read detailed breakdowns on attribution, automation architecture, and high-performance web delivery.
                        </p>
                    </div>
                    <div className="relative">
                        <SectionIllustration src="/illustrations/insights.svg" priority />
                    </div>
                </div>
            </section>

            <section className="container-shell mt-10 grid gap-5">
                {articles.map((article) => (
                    <Link
                        key={article.slug}
                        href={`/insights/${article.slug}`}
                        className="group block rounded-2xl border border-border bg-surface-50 p-6 transition hover:border-brand/45"
                    >
                        <div className="mb-3 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-foreground/55">
                            <time dateTime={article.date}>
                                {new Date(article.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </time>
                            <span className="h-1 w-1 rounded-full bg-foreground/30" />
                            <span>{article.readTime}</span>
                        </div>
                        <h2 className="text-2xl font-display font-semibold text-foreground transition group-hover:text-brand-deep">
                            {article.title}
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/68">{article.description}</p>
                    </Link>
                ))}
            </section>
        </main>
    );
}
