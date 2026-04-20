import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/locations/australia", {
    title: "Web Development & Automation Agency Australia | DigitalX Solutions",
    description: "Top-rated Next.js web development and automation agency serving Australia. We engineer digital ecosystems that scale your operations and revenue locally and globally.",
});

export default function AustraliaLocationPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Australia", url: `${siteConfig.domain}/locations/australia` },
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
                    Australia-first execution with global operating standards.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                    We partner with Australian teams that want to tighten their growth engine through stronger websites,
                    practical automation, and cleaner acquisition measurement.
                </p>
            </section>

            <section className="container-shell mt-10 grid gap-5 md:grid-cols-2">
                <article className="rounded-2xl border border-border bg-surface-50 p-6">
                    <h2 className="text-2xl font-semibold text-foreground">Where we help most</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
                        <li>- Scaling lead flow without sacrificing qualification quality</li>
                        <li>- Replacing manual ops with durable CRM automation</li>
                        <li>- Improving conversion from paid traffic and inbound demand</li>
                    </ul>
                </article>

                <article className="rounded-2xl border border-border bg-white p-6">
                    <h2 className="text-2xl font-semibold text-foreground">Delivery cadence</h2>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/72">
                        <li>- Weekly planning and async implementation updates</li>
                        <li>- Monthly strategy checkpoints with decision support</li>
                        <li>- Shared KPI tracking across funnel and operations</li>
                    </ul>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep"
                    >
                        Discuss your roadmap
                    </Link>
                </article>
            </section>

            <section className="container-shell mt-12">
                <div className="rounded-3xl border border-border bg-white p-6 md:p-8">
                    <h2 className="font-display text-3xl text-foreground">Local and sector-focused playbooks</h2>
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
