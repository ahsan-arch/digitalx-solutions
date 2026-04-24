import Link from "next/link";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";
import { results } from "@/data/redesign";

export const metadata = generatePageMetadata("/work", {
    title: "Results | DigitalX Solutions Case Studies",
    description:
        "Review selected DigitalX Solutions outcomes across home services, healthcare, professional services, and e-commerce teams.",
});

export default function WorkPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Results", url: `${siteConfig.domain}/work` },
    ]);

    return (
        <main id="main" className="pb-20 pt-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <section className="container-shell">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">Results</p>
                <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">
                    Outcomes driven by integrated execution.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                    We focus on revenue quality, conversion efficiency, and operational reliability. The stories below
                    show the type of performance shifts we target.
                </p>
            </section>

            <section className="container-shell mt-10">
                <div className="flex flex-col items-center justify-center rounded-3xl border border-border border-dashed bg-surface-50 py-24 text-center">
                    <h2 className="font-display text-2xl text-foreground md:text-3xl">Adding these soon</h2>
                    <p className="mt-2 text-sm text-foreground/60 md:text-base">We are currently compiling our latest case studies and impact reports. Check back shortly.</p>
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
