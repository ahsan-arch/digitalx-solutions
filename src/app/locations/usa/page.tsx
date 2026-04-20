import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/locations/usa", {
    title: "Web Development & Automation Agency USA | DigitalX Solutions",
    description: "Top-rated Next.js web development and automation agency serving the United States. We engineer digital ecosystems that scale your operations and revenue.",
});

export default function USALocationPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "USA", url: `${siteConfig.domain}/locations/usa` },
    ]);

    return (
        <main id="main" className="pb-20 pt-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <section className="container-shell">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Location</p>
                <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">
                    United States delivery partner for growth-focused teams.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                    We work remotely with US businesses that need stronger conversion systems, cleaner reporting, and
                    faster execution across web, automation, and performance channels.
                </p>
            </section>

            <section className="container-shell mt-10 grid gap-5 md:grid-cols-2">
                <article className="rounded-2xl border border-border bg-surface-50 p-6">
                    <h2 className="text-2xl font-semibold text-foreground">Common engagement goals</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
                        <li>- Improve lead quality from paid media and website traffic</li>
                        <li>- Reduce response lag with CRM and workflow automation</li>
                        <li>- Launch service pages that support regional market expansion</li>
                    </ul>
                </article>

                <article className="rounded-2xl border border-border bg-white p-6">
                    <h2 className="text-2xl font-semibold text-foreground">How we collaborate</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
                        <li>- Weekly operating reviews with clear owners and next actions</li>
                        <li>- Shared dashboards for campaign and conversion visibility</li>
                        <li>- Asynchronous workflow built for distributed teams</li>
                    </ul>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep"
                    >
                        Start a conversation
                    </Link>
                </article>
            </section>

            <section className="container-shell mt-12">
                <div className="rounded-3xl border border-border bg-white p-6 md:p-8">
                    <h2 className="font-display text-3xl text-foreground">Relevant playbooks</h2>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link href="/industries/home-services" className="rounded-full border border-border bg-surface-50 px-4 py-2 text-sm font-medium text-foreground/75">
                            Home Services
                        </Link>
                        <Link href="/industries/healthcare" className="rounded-full border border-border bg-surface-50 px-4 py-2 text-sm font-medium text-foreground/75">
                            Healthcare
                        </Link>
                        <Link href="/industries/professional-services" className="rounded-full border border-border bg-surface-50 px-4 py-2 text-sm font-medium text-foreground/75">
                            Professional Services
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
