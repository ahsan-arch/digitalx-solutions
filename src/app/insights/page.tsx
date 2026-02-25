import { Metadata } from "next";
import { generatePageMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import { FloatingDock } from "@/components/navigation/floating-dock";
import { Footer } from "@/components/layout";
import Link from "next/link";

export const metadata: Metadata = generatePageMetadata("/insights", {
    title: "Digital Marketing & Performance Engineering Insights | DigitalX Solutions",
    description: "Advanced insights on deep-tech digital marketing, Next.js web development, server-side tracking, and CRM automation strategies.",
});

const articles = [
    {
        slug: "server-side-tracking-meta-ads",
        title: "Why Meta Server-Side Tracking (CAPI) is Mandatory for Scale",
        description: "Learn why relying solely on the Meta Pixel destroys ROI, and how implementing the Conversions API ensures accurate attribution in a post-iOS14 world.",
        date: "2024-03-15",
        readTime: "6 min read",
    }
];

export default function InsightsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Insights", url: `${siteConfig.domain}/insights` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <FloatingDock />
            <main id="main">
                <section className="relative pt-48 pb-24 px-4 md:px-12 bg-background min-h-[50vh]">
                    {/* Background Ambience */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cobalt/20 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />

                    <div className="relative z-10 max-w-7xl mx-auto w-full">
                        <h1 className="font-display font-bold text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter text-white uppercase mb-8">
                            Engineering <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-cobalt-vivid">Insights</span>
                        </h1>

                        <p className="text-white/60 max-w-2xl text-lg md:text-xl font-sans leading-relaxed mb-16">
                            Deep-dives into web performance, advanced Meta tracking architectures, and growth automation systems.
                        </p>

                        <div className="grid gap-8 border-t border-white/10 pt-16">
                            {articles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/insights/${article.slug}`}
                                    className="group block"
                                >
                                    <article className="p-8 rounded-xl border border-white/5 bg-surface-100/50 hover:bg-surface-100/80 transition-colors">
                                        <div className="flex items-center gap-4 text-sm font-mono text-white/40 mb-4">
                                            <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <span>{article.readTime}</span>
                                        </div>
                                        <h2 className="text-2xl font-display font-bold text-white group-hover:text-cobalt transition-colors mb-4">
                                            {article.title}
                                        </h2>
                                        <p className="text-white/60 leading-relaxed max-w-3xl">
                                            {article.description}
                                        </p>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
