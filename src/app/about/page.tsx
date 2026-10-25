import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPin, ShieldCheck, UserCheck } from "lucide-react";
import {
    aboutPrinciples,
    companyProfile,
    heroMetrics,
} from "@/data/redesign";
import { SectionIllustration } from "@/components/ui";
import { CertifiedPartnerStrip } from "@/components/ui/partner-strip";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";
import factsData from "../../../data/facts.json";

export const metadata: Metadata = generatePageMetadata("/about", {
    title: "About Our AI & Automation Team",
    description:
        "Meet the engineering team behind AI voice receptionists, GoHighLevel setups, and workflow automations for growing businesses across the USA and Australia.",
});

const milestones = [
    { year: "2022", event: "DigitalX Solutions launched in Sydney, Australia" },
    {
        year: "2023",
        event: "Expanded delivery to the United States and scaled cross region operations",
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
            "Learn how DigitalX Solutions operates, what we optimize for, and how we deliver AI voice agents and CRM automation systems for service businesses.",
        url: `${siteConfig.domain}/about`,
        mainEntity: {
            "@type": "Organization",
            name: "DigitalX Solutions",
            url: siteConfig.domain,
            founder: {
                "@type": "Person",
                name: "Ahsan Architect",
                jobTitle: "Founder & Lead Solutions Engineer",
                url: "https://www.linkedin.com/in/ahsan-architect",
                sameAs: ["https://www.linkedin.com/in/ahsan-architect"],
            },
            address: {
                "@type": "PostalAddress",
                streetAddress: "16 Boldrewood Ave",
                addressLocality: "Casula",
                addressRegion: "NSW",
                postalCode: "2170",
                addressCountry: "AU",
            },
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
                    <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">About</p>
                            <h1 className="mt-3 font-display text-4xl leading-tight text-foreground md:text-6xl">
                                We build practical growth systems that your team can run after launch.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                                {companyProfile.name} partners with operators who need execution quality, reporting clarity, and
                                measurable outcomes across web, automation, and paid channels.
                            </p>
                            <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                                Our work spans the USA and Australia, with delivery designed to fit real team constraints and
                                evolving go to market priorities.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep"
                                >
                                    Book a strategy call
                                </Link>
                                <Link
                                    href="/case-studies"
                                    className="inline-flex items-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface-100"
                                >
                                    View outcomes
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <SectionIllustration
                                src="/illustrations/about.svg"
                                alt="DigitalX Solutions engineering team and enterprise automation architecture"
                                priority
                            />
                        </div>
                    </div>
                </section>

                <section className="container-shell mt-8">
                    <CertifiedPartnerStrip />
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
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">E-E-A-T Leadership & Verification</p>
                                <h2 className="mt-1 font-display text-3xl text-foreground">Engineering Leadership</h2>
                            </div>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Verified Australian Entity
                            </span>
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr]">
                            <div className="rounded-2xl border border-border bg-surface-50 p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-white shadow-sm">
                                        AA
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-semibold text-foreground">Ahsan Architect</h3>
                                        <p className="text-xs font-medium text-brand">Founder &amp; Lead Solutions Engineer</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-foreground/75">
                                    Full-stack systems architect with 8+ years experience designing high-concurrency telephony backends, automated CRM pipelines, and sub-500ms neural AI voice agents for enterprise and local service operators across the USA and Australia.
                                </p>
                                <div className="mt-5 flex items-center gap-3">
                                    <a
                                        href="https://www.linkedin.com/in/ahsan-architect"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-surface-100 transition-colors"
                                    >
                                        <UserCheck className="h-3.5 w-3.5 text-brand" /> LinkedIn Profile
                                        <ExternalLink className="h-3 w-3 text-foreground/50" />
                                    </a>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border bg-surface-50 p-6">
                                <div className="flex items-center gap-2 text-foreground font-semibold">
                                    <MapPin className="h-4 w-4 text-brand" /> Registered Entity &amp; Global Delivery
                                </div>
                                <div className="mt-3 text-sm leading-relaxed text-foreground/75 space-y-2">
                                    <p>
                                        <strong className="text-foreground">Registered Office:</strong> 16 Boldrewood Ave, Casula NSW 2170, Australia.
                                    </p>
                                    <p>
                                        <strong className="text-foreground">Global Delivery Model:</strong> Sydney-registered legal entity with a distributed global remote engineering team providing 24/7 technical operations across US Eastern/Pacific and Australian Eastern/Western time zones.
                                    </p>
                                    <p>
                                        <strong className="text-foreground">Compliance:</strong> Australian Privacy Principles (Privacy Act 1988), US 10DLC A2P Carrier Compliance, and GDPR/CCPA data handling standards.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Partner Certifications Ledger & Proof Links */}
                        <div className="mt-8 border-t border-border pt-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
                                Held Partner Certifications &amp; Verification Proof
                            </h3>
                            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                {factsData.partnerCertifications.map((cert) => (
                                    <div
                                        key={cert.platform}
                                        className="rounded-2xl border border-border bg-surface-50 p-4 flex flex-col justify-between"
                                    >
                                        <div>
                                            <span className="text-xs font-bold text-brand uppercase tracking-wider">
                                                {cert.platform}
                                            </span>
                                            <h4 className="mt-1 text-sm font-semibold text-foreground">
                                                {cert.credential}
                                            </h4>
                                            <p className="mt-1 text-xs text-foreground/60">
                                                Tier: {cert.tier}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-border/70 text-xs">
                                            {cert.proofUrl && cert.proofUrl.startsWith("http") ? (
                                                <a
                                                    href={cert.proofUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-brand font-semibold hover:underline"
                                                >
                                                    View Directory Listing
                                                    <ExternalLink className="ml-1 h-3 w-3" />
                                                </a>
                                            ) : (
                                                <span className="text-amber-700 font-mono text-[11px] block">
                                                    {cert.proofUrl}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                    <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                            Our Operating Principles &amp; Delivery Standards
                        </h2>
                        <p className="mt-2 text-sm text-foreground/70 max-w-2xl">
                            We built DigitalX Solutions to provide honest, high-leverage technical execution without agency fluff or vanity metrics.
                        </p>
                        <div className="mt-6 grid gap-6 sm:grid-cols-3 text-sm text-foreground/75">
                            <div className="rounded-2xl border border-border bg-white p-5">
                                <h3 className="font-semibold text-foreground">1. You Own 100% of the Assets</h3>
                                <p className="mt-2 text-xs leading-relaxed">
                                    All CRM setups, Twilio SIP numbers, n8n workflows, and custom Next.js code are built directly in your cloud accounts. If you ever stop working with us, your operational infrastructure stays fully intact.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border bg-white p-5">
                                <h3 className="font-semibold text-foreground">2. Concrete Telephony Latency Budgets</h3>
                                <p className="mt-2 text-xs leading-relaxed">
                                    We benchmark conversational AI response times under 800ms. An AI voice receptionist that pauses awkwardly frustrates callers; our systems respond with natural conversational timing.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border bg-white p-5">
                                <h3 className="font-semibold text-foreground">3. Zero Hallucination Guardrails</h3>
                                <p className="mt-2 text-xs leading-relaxed">
                                    Our AI agents never invent pricing or commit to appointments without verifying live database availability. When an inquiry falls outside verified parameters, it gracefully routes to your on-call team.
                                </p>
                            </div>
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
