import { Metadata } from "next";
import { generateArticleSchema, generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import { FloatingDock } from "@/components/navigation/floating-dock";
import { Footer } from "@/components/layout";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// In a real app, this would fetch from MDX or a CMS
const articlesData: Record<string, any> = {
    "server-side-tracking-meta-ads": {
        title: "Why Meta Server-Side Tracking (CAPI) is Mandatory for Scale",
        description: "Learn why relying solely on the Meta Pixel destroys ROI, and how implementing the Conversions API ensures accurate attribution in a post-iOS14 world.",
        date: "2024-03-15",
        author: "DigitalX Engineering",
        content: `
## The Death of the Browser Pixel

For years, the Meta (Facebook) Pixel was the gold standard for tracking ad performance. You placed a piece of JavaScript on your site, and it tracked page views, leads, and purchases directly from the user's browser. 

However, with the introduction of iOS 14.5 ATT (App Tracking Transparency), intelligent tracking prevention in Safari (ITP), and ad blockers, the browser pixel is now missing anywhere from 20% to 50% of conversion data.

**What does this mean for your business?**
- **Inflated CPAs:** Meta thinks it cost $150 to acquire a customer when it actually cost $75.
- **Algorithm Degradation:** The AI bidding algorithm receives less high-quality data to find your ideal customers.
- **Lost Retargeting:** You can't retarget visitors who have ad-blockers or opted out of tracking.

## Enter the Conversions API (CAPI)

Server-Side Tracking, specifically Meta's Conversions API, moves the tracking from the user's browser to your server. 

When a user purchases or becomes a lead, your server securely communicates directly with Meta's servers, bypassing the browser entirely.

### How CAPI Restores Your Data

1. **First-Party Data:** Since your server sends the data, it's considered first-party data, making it resilient to browser privacy restrictions.
2. **Deduplication:** When properly configured, both the Pixel and CAPI send events. Meta deduplicates them using an \`event_id\`. If the browser pixel is blocked, the server event still gets through as a fallback.
3. **Enhanced Match Quality:** CAPI allows you to securely harsh and send user data (email, phone number) directly from your backend (e.g., from GoHighLevel or Stripe), dramatically increasing match rates compared to what a browser pixel can reliably capture.

## Implementing Server-Side Tracking

Implementing CAPI is significantly more complex than installing a pixel. It requires:

- A robust backend architecture (Node.js, edge functions, or Google Tag Manager Server Container).
- Strict adherence to data hashing protocols (SHA-256).
- Careful handling of deduplication keys to avoid double-counting conversions.

At DigitalX Solutions, we engineer custom CAPI integrations directly into our Next.js architectures and GoHighLevel workflows, ensuring our clients capture ~99% of their conversion data. This is the foundation of high-scale revenue operations.
    `
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const article = articlesData[resolvedParams.slug];

    if (!article) return { title: 'Not Found' };

    return {
        title: `${article.title} | DigitalX Insights`,
        description: article.description,
        openGraph: {
            type: "article",
            title: article.title,
            description: article.description,
            publishedTime: article.date,
        }
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const article = articlesData[resolvedParams.slug];

    if (!article) {
        notFound();
    }

    const url = `${siteConfig.domain}/insights/${resolvedParams.slug}`;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Insights", url: `${siteConfig.domain}/insights` },
        { name: article.title, url },
    ]);

    const articleSchema = generateArticleSchema({
        headline: article.title,
        description: article.description,
        image: `${siteConfig.domain}/api/og?title=${encodeURIComponent(article.title)}`,
        datePublished: article.date,
        dateModified: article.date,
        authorName: article.author,
        url,
    });

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            <FloatingDock />
            <main id="main" className="bg-background pt-32 pb-24">
                <article className="max-w-3xl mx-auto px-4 sm:px-6">
                    <Link href="/insights" className="inline-flex items-center text-sm font-mono text-cobalt hover:text-white transition-colors mb-12">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                    </Link>

                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm font-mono text-white/40 border-b border-white/10 pb-8">
                            <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>By {article.author}</span>
                        </div>
                    </header>

                    <div
                        className="prose prose-invert prose-cobalt max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-cobalt hover:prose-a:text-cobalt-vivid prose-p:text-white/70 prose-p:leading-relaxed prose-li:text-white/70"
                        dangerouslySetInnerHTML={{
                            __html: article.content
                                .replace(/^## (.*$)/gim, '<h2 class="text-3xl mt-12 mb-6 text-white">$1</h2>')
                                .replace(/^### (.*$)/gim, '<h3 class="text-2xl mt-8 mb-4 text-white">$1</h3>')
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em class="text-white/90">$1</em>')
                                .replace(/^- (.*$)/gim, '<li class="mb-2">$1</li>')
                                .replace(/((?:<li.*?>.*?<\/li>\n?)+)/g, '<ul class="list-disc pl-6 mb-8">$1</ul>')
                                .replace(/^1\. (.*$)/gim, '<li class="mb-2">$1</li>')
                                .replace(/\n\n/g, '<p class="mb-6"></p>')
                                .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-white/10 text-cobalt font-mono text-sm">$1</code>')
                        }}
                    />
                </article>
            </main>
            <Footer />
        </>
    );
}
