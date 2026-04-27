import { Metadata } from "next";
import Link from "next/link";
import {
    aboutPrinciples,
    companyProfile,
    heroMetrics,
} from "@/data/redesign";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("/about", {
    title: "About DigitalX Solutions | Revenue Systems Partner",
    description:
        "Meet DigitalX Solutions, the team behind integrated web, automation, and performance systems for growth-focused businesses in the USA and Australia.",
});

const milestones = [
    { year: "2022", event: "DigitalX Solutions launched in Sydney, Australia" },
    {
        year: "2023",
        event: "Expanded delivery to the United States and scaled cross-region operations",
    },
    {
        year: "2024",
        event: "Integrated automation and paid media programs into a single execution model",
    },
    {
        year: "Today",
        event: "Partnering with teams that prioritize measurable revenue outcomes over vanity metrics",
    },
];

export default function AboutPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "About", url: `${siteConfig.domain}/about` },
    ]);

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${siteConfig.domain}/about`,
        name: "About DigitalX Solutions",
        description:
            "Learn how DigitalX Solutions operates, what we optimize for, and how we deliver growth systems for clients.",
        url: `${siteConfig.domain}/about`,
        mainEntity: {
            "@id": `${siteConfig.domain}/#organization`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(aboutPageSchema),
                }}
            />

            <main id="main" className="pb-20 pt-12">
                <section className="container-shell">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">About</p>
                    <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight text-foreground md:text-6xl">
                        We build practical growth systems that your team can run after launch.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                        {companyProfile.name} partners with operators who need execution quality, reporting clarity, and
                        measurable outcomes across web, automation, and paid channels.
                    </p>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                        Our work spans the USA and Australia, with delivery designed to fit real team constraints and
                        evolving go-to-market priorities.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep"
                        >
                            Book a strategy call
                        </Link>
                        <Link
                            href="/work"
                            className="inline-flex items-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface-100"
                        >
                            View outcomes
                        </Link>
                    </div>
                </section>

                <section className="container-shell mt-10">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {heroMetrics.map((stat) => (
                            <div key={stat.label} className="rounded-2xl border border-border bg-surface-50 p-5 text-center">
                                <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
                                <div className="mt-1 text-sm text-foreground/60">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="container-shell mt-12">
                    <div className="rounded-3xl border border-border bg-white p-6 md:p-8">
                        <h2 className="font-display text-3xl text-foreground">Our principles</h2>
                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            {aboutPrinciples.map((principle) => (
                                <article key={principle.title} className="rounded-2xl border border-border bg-surface-50 p-5">
                                    <h3 className="text-lg font-semibold text-foreground">{principle.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{principle.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container-shell mt-12">
                    <div className="rounded-3xl border border-border bg-white p-6 md:p-8">
                        <h2 className="font-display text-3xl text-foreground">Journey so far</h2>
                        <div className="mt-6 space-y-5">
                            {milestones.map((m) => (
                                <div key={m.year} className="flex items-start gap-6 rounded-xl border border-border bg-surface-50 p-4">
                                    <div className="min-w-[72px] text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                                        {m.year}
                                    </div>
                                    <div className="text-sm leading-relaxed text-foreground/72">
                                        {m.event}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container-shell mt-12">
                    <div className="rounded-3xl border border-border bg-foreground px-6 py-12 text-center text-white md:px-10">
                        <h2 className="font-display text-3xl md:text-4xl">Want a practical partner for your next growth phase?</h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                            Share your goals and current bottlenecks. We will map a staged delivery plan with clear
                            ownership and measurable outcomes.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-8 inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-foreground"
                        >
                            Start a conversation
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
