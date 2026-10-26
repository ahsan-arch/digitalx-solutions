import type { Metadata } from "next";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, generatePageMetadata, siteConfig } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { articlesData, authors } from "@/data/insights-articles";

function extractFaqsFromContent(content: string): { question: string; answer: string }[] {
    const normalized = content.replace(/\\n/g, '\n').replace(/\\r/g, '').replace(/\r\n/g, '\n');
    const parts = normalized.split(/## Frequently Asked Questions/i);
    if (parts.length < 2) return [];

    const afterFaq = parts[1];
    const endMatch = afterFaq.match(/\n## (?!#)/);
    const faqSection = endMatch ? afterFaq.slice(0, endMatch.index) : afterFaq;

    const qParts = faqSection.split(/\n### /);
    const faqs: { question: string; answer: string }[] = [];

    for (let i = 1; i < qParts.length; i++) {
        const item = qParts[i];
        const firstLineEnd = item.indexOf('\n');
        if (firstLineEnd === -1) continue;
        const question = item.slice(0, firstLineEnd).trim();
        const rawAnswer = item.slice(firstLineEnd).trim();

        const cleanAnswer = rawAnswer
            .split(/\n---\n/)[0]
            .split(/\n\*[^*]+\*\s*$/)[0]
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[*_`#]/g, '')
            .trim();

        if (question && cleanAnswer) {
            faqs.push({ question, answer: cleanAnswer });
        }
    }
    return faqs;
}

export function generateStaticParams() {
    return Object.keys(articlesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const article = articlesData[resolvedParams.slug];

    if (!article) return { title: 'Not Found' };

    const author = authors[article.authorKey];
    const base = generatePageMetadata(`/insights/${resolvedParams.slug}`, {
        title: article.metaTitle || article.title,
        description: article.description,
    });

    return {
        ...base,
        openGraph: {
            ...base.openGraph,
            type: "article",
            publishedTime: article.date,
            modifiedTime: article.dateModified,
            authors: [author.name],
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const article = articlesData[resolvedParams.slug];

    if (!article) {
        notFound();
    }

    const author = authors[article.authorKey];
    const url = `${siteConfig.domain}/insights/${resolvedParams.slug}`;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Insights", url: `${siteConfig.domain}/insights` },
        { name: article.title, url },
    ]);

    const wordCount = article.content.split(/\s+/).filter(Boolean).length;
    const keywords = article.relatedServices.map((s) => s.label);

    const articleSchema = generateArticleSchema({
        headline: article.title,
        description: article.description,
        image: `${siteConfig.domain}/api/og?title=${encodeURIComponent(article.title)}`,
        datePublished: article.date,
        dateModified: article.dateModified,
        author: { name: author.name, url: author.url, jobTitle: author.role },
        url,
        wordCount,
        articleSection: "Engineering Insights",
        keywords,
    });

    const extractedFaqs = extractFaqsFromContent(article.content);
    const faqSchema = extractedFaqs.length > 0 ? generateFAQSchema(extractedFaqs) : null;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}

            <main id="main" className="pb-24 pt-12">
                <article className="mx-auto w-full max-w-reading px-4 md:px-8">
                    <Link href="/insights" className="mb-10 inline-flex items-center font-mono text-caption text-accent hover:text-accent-hover transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                    </Link>

                    <header className="mb-12">
                        <h1 className="font-display text-display-md md:text-display-lg text-ink-primary mb-6">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 font-mono text-caption text-ink-tertiary border-b border-line-subtle pb-8">
                            <time dateTime={article.date}>Published: {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                            {article.dateModified && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-ink-tertiary/50" />
                                    <time dateTime={article.dateModified} className="text-accent font-semibold">
                                        Last Updated: {new Date(article.dateModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </time>
                                </>
                            )}
                            <span className="w-1 h-1 rounded-full bg-ink-tertiary/50" />
                            <span>{article.readTime}</span>
                            <span className="w-1 h-1 rounded-full bg-ink-tertiary/50" />
                            <span>By {author.name}</span>
                        </div>
                    </header>

                    <div className="mb-12 flex items-start gap-4 rounded-lg border border-line-subtle bg-surface-sunken p-4">
                        <div className="h-12 w-12 shrink-0 rounded-full bg-accent-soft flex items-center justify-center text-accent font-display font-semibold text-lg">
                            {author.name.charAt(0)}
                        </div>
                        <div>
                            <div className="text-ink-primary font-display font-semibold text-sm">{author.name}</div>
                            <div className="text-accent font-mono text-xs mb-1">{author.role}</div>
                            <p className="text-ink-secondary text-xs leading-relaxed">{author.bio}</p>
                        </div>
                    </div>

                    <div
                        className="prose prose-slate max-w-none prose-headings:font-display prose-a:text-accent hover:prose-a:text-accent-hover prose-p:text-ink-secondary prose-li:text-ink-secondary"
                        dangerouslySetInnerHTML={{
                            __html: article.content
                                .replace(/^## (.*$)/gim, '<h2 class="text-3xl mt-12 mb-6 text-ink-primary">$1</h2>')
                                .replace(/^### (.*$)/gim, '<h3 class="text-2xl mt-8 mb-4 text-ink-primary">$1</h3>')
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink-primary font-semibold">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em class="text-ink-secondary">$1</em>')
                                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:text-accent-hover underline">$1</a>')
                                .replace(/^\|(.+)\|$/gim, (match) => {
                                    const cells = match.split('|').filter(c => c.trim());
                                    const row = cells.map(c => `<td class="px-4 py-3 border border-line-subtle text-ink-secondary text-sm">${c.trim()}</td>`).join('');
                                    return `<tr>${row}</tr>`;
                                })
                                .replace(/^- (.*$)/gim, '<li class="mb-2">$1</li>')
                                .replace(/((?:<li.*?>.*?<\/li>\n?)+)/g, '<ul class="list-disc pl-6 mb-8">$1</ul>')
                                .replace(/^1\. (.*$)/gim, '<li class="mb-2">$1</li>')
                                .replace(/\n\n/g, '<p class="mb-6"></p>')
                                .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-surface-sunken text-accent font-mono text-sm">$1</code>')
                        }}
                    />

                    {/* Free AI Automation Audit CTA Box */}
                    <div className="my-14 overflow-hidden rounded-2xl border border-brand/40 bg-surface-50 p-8 shadow-sm md:p-10">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                                Free Telephony &amp; Lead Recovery Audit
                            </span>
                            <h3 className="mt-3 font-display text-2xl font-semibold text-foreground md:text-3xl">
                                Discover how many leads you&apos;re currently losing from missed calls
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-foreground/80">
                                Over 80% of after-hours callers hang up when they reach voicemail. Book a free 20-minute AI automation audit and we will inspect your intake workflow, calculate your uncaptured call revenue, and demonstrate how our AI receptionist answers and books clients 24/7.
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-deep"
                                >
                                    Book a free AI automation audit
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/try-voice-agent"
                                    className="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-3.5 text-sm font-semibold text-foreground transition hover:bg-surface-200"
                                >
                                    Test live voice agent
                                </Link>
                            </div>
                        </div>
                    </div>

                    {article.relatedServices.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-line-subtle">
                            <h3 className="text-lg font-display font-semibold text-ink-primary mb-4">Related Services</h3>
                            <div className="flex flex-wrap gap-3">
                                {article.relatedServices.map((s) => (
                                    <Link
                                        key={s.href}
                                        href={s.href}
                                        className="px-4 py-2 rounded-pill border border-accent/35 bg-accent-soft text-accent font-mono text-sm hover:bg-accent/15 transition-colors"
                                    >
                                        {s.label} →
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {article.relatedSlugs.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-line-subtle">
                            <h3 className="text-lg font-display font-semibold text-ink-primary mb-4">Related Articles</h3>
                            <div className="space-y-4">
                                {article.relatedSlugs.map((slug) => {
                                    const related = articlesData[slug];
                                    if (!related) return null;
                                    return (
                                        <Link
                                            key={slug}
                                            href={`/insights/${slug}`}
                                            className="block p-4 rounded-lg border border-line-subtle bg-surface-sunken hover:border-accent/45 transition-colors"
                                        >
                                            <div className="text-ink-primary font-display font-semibold mb-1">{related.title}</div>
                                            <div className="text-ink-secondary text-sm">{related.description}</div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-line-subtle font-mono text-caption text-ink-tertiary">
                        Last updated: {new Date(article.dateModified).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </article>
            </main>
        </>
    );
}
