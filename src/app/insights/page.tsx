import { Metadata } from "next";
import Link from "next/link";
import { SectionIllustration } from "@/components/ui";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/insights", {
    title: "Digital Marketing & Performance Engineering Insights | DigitalX Solutions",
    description: "Advanced insights on deep-tech digital marketing, Next.js web development, server side tracking, and CRM automation strategies.",
});

const articles = [
    {
        slug: "n8n-vs-zapier",
        title: "n8n vs Zapier in 2026: Complete Comparison for Business Automation",
        description: "A detailed comparison of n8n and Zapier for business automation. Pricing, features, scalability, and which tool is right for your workflow needs.",
        date: "2025-11-20",
        readTime: "10 min read",
    },
    {
        slug: "ai-voice-receptionists-guide",
        title: "AI Voice Receptionists for Dental Clinics, Salons & Medical Practices: Complete Guide",
        description: "How AI voice receptionists automate phone answering, appointment booking, and lead qualification for healthcare and service businesses.",
        date: "2025-09-05",
        readTime: "8 min read",
    },
    {
        slug: "server-side-tracking-meta-ads",
        title: "Why Meta Server-Side Tracking (CAPI) is Mandatory for Scale",
        description: "Learn why relying solely on the Meta Pixel destroys ROI, and how implementing the Conversions API ensures accurate attribution in a post-iOS14 world.",
        date: "2024-03-15",
        readTime: "6 min read",
    },
];

export default function InsightsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Insights", url: `${siteConfig.domain}/insights` },
    ]);

    return (
        <main id="main" className="pb-20 pt-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
