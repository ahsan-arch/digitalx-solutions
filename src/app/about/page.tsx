import fs from "fs";
import path from "path";
import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import {
    aboutPrinciples,
    companyProfile,
    heroMetrics,
} from "@/data/redesign";
import { SectionIllustration, AvatarSlot } from "@/components/ui";
import { CertifiedPartnerStrip } from "@/components/ui/partner-strip";
import { ObfuscatedEmail } from "@/components/layout/obfuscated-email";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo";
import factsData from "../../../data/facts.json";

export const metadata: Metadata = {
    ...generatePageMetadata("/about", {
        title: "About Our Custom CRM & AI Engineering Team",
        description:
            "Meet the systems engineers behind custom Next.js CRM portals, GoHighLevel systems, and low-latency AI voice telephony across Australia and the USA.",
    }),
    twitter: {
        card: "summary_large_image",
        title: "About Our Custom CRM & AI Engineering Team | DigitalX",
        description:
            "Meet the systems engineers behind custom Next.js CRM portals, GoHighLevel systems, and low-latency AI voice telephony across Australia and the USA.",
        images: ["/api/og?title=About+Our+Custom+CRM+%26+AI+Engineering+Team&subtitle=DigitalX+Solutions"],
        site: undefined,
        creator: undefined,
    },
};

export default function AboutPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "About", url: `${siteConfig.domain}/about` },
    ]);

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AboutPage",
                "@id": `${siteConfig.domain}/about`,
                name: "About DigitalX Solutions",
                description:
                    "Meet the systems engineers and automation architects behind DigitalX Solutions: AI voice receptionists, GoHighLevel setups, and resilient workflow automation pipelines.",
                url: `${siteConfig.domain}/about`,
                mainEntity: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
            },
            {
                "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
                "@id": `${siteConfig.domain}/#organization`,
                name: "DigitalX Solutions",
                legalName: "DigitalX Solutions",
                url: siteConfig.domain,
                logo: `${siteConfig.domain}/icon.svg`,
                telephone: "+61 451 413 786",
                email: "info@digitalx-solutions.com",
                foundingDate: "2020",
                areaServed: [
                    { "@type": "Country", name: "Australia" },
                    { "@type": "Country", name: "United States" },
                ],
                founder: {
                    "@id": `${siteConfig.domain}/about#jazib-shahid`,
                },
                sameAs: [
                    "https://www.linkedin.com/company/digitalx-solutions-aus/",
                    "https://www.facebook.com/people/Digitalx-solutions/61588252343955/",
                    "https://www.instagram.com/digitalx_solutions/",
                    "https://github.com/digitalx-solutions",
                ],
            },
            {
                "@type": "Person",
                "@id": `${siteConfig.domain}/about#jazib-shahid`,
                name: "Jazib Shahid",
                jobTitle: "Founder & Lead Solutions Architect",
                description:
                    "Full-stack automation and CRM architect specializing in custom Next.js and PostgreSQL portals, self-hosted n8n orchestration, GoHighLevel CRM systems, and low-latency AI voice telephony. Jazib leads system architecture and production delivery for service businesses, healthcare clinics, and B2B operators across Australia and the United States.",
                worksFor: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
                knowsAbout: [
                    "Custom CRM Development",
                    "Next.js",
                    "PostgreSQL",
                    "GoHighLevel",
                    "n8n",
                    "AI Voice Agents",
                ],
                url: `${siteConfig.domain}/about/team/jazib-shahid`,
            },
            {
                "@type": "Person",
                "@id": `${siteConfig.domain}/about#ahsan-masood`,
                name: "Ahsan Masood",
                jobTitle: "Senior CRM & Telephony Engineer",
                description:
                    "Specializes in GoHighLevel multi-location snapshot engineering, bi-directional webhook synchronization, carrier compliance (A2P 10DLC and Australian ACMA SMS standards), and automated lead-routing logic. Ensures clean data hygiene, CRM custom field mapping, and zero lead leakage across multi-step agency and contractor accounts.",
                worksFor: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
                url: `${siteConfig.domain}/about`,
            },
        ],
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

            <main id="main" className="pb-20 pt-5 md:pt-7">
                <section className="container-shell">
                    <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                        <div>
                            <p className="text-xs font-medium text-brand">
                                Engineering and Operations
                            </p>
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
                                    className="inline-flex items-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep transition"
                                >
                                    Book a strategy call
                                </Link>
                                <Link
                                    href="/case-studies"
                                    className="inline-flex items-center rounded-xl border border-border/80 bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface-100 transition"
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
                            <div key={stat.label} className="rounded-2xl border border-border/80 bg-surface-50 p-5 text-center">
                                <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
                                <div className="mt-1 text-sm text-foreground/75">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="container-shell mt-12">
                    <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-8">
                        <h2 className="font-display text-3xl text-foreground">Our principles</h2>
                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            {aboutPrinciples.map((principle) => (
                                <article key={principle.title} className="rounded-2xl border border-border/80 bg-surface-50 p-5">
                                    <h3 className="text-lg font-semibold text-foreground">{principle.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{principle.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container-shell mt-12">
                    <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-8">
                        <div>
                            <p className="text-xs font-semibold text-brand">Leadership &amp; Company Verification</p>
                            <h2 className="mt-1 font-display text-3xl text-foreground">Built by Systems Engineers, Not Account Managers</h2>
                            <p className="mt-2 text-sm leading-relaxed text-foreground/70 max-w-3xl">
                                Every telephony stream, CRM pipeline, and n8n workflow at DigitalX Solutions is architected and stress-tested by our core engineering leadership, never outsourced to junior template installers.
                            </p>
                        </div>

                        {/* Leadership Cards */}
                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                            {/* Card 1: Jazib Shahid */}
                            <div className="h-full rounded-2xl border border-border/80 bg-surface-50 p-6 transition-colors hover:border-brand/40">
                            <div className="flex h-full flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-4">
                                        <AvatarSlot
                                            src={fs.existsSync(path.join(process.cwd(), "public/images/jazib-shahid.jpg")) ? "/images/jazib-shahid.jpg" : ""}
                                            alt="Jazib Shahid"
                                            fallbackText="JS"
                                            className="h-14 w-14"
                                            showRing
                                        />
                                        <div>
                                            <h3 className="font-display text-xl font-semibold text-foreground">
                                                Jazib Shahid
                                            </h3>
                                            <p className="text-xs font-semibold text-brand">
                                                Founder &amp; Lead Solutions Architect
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-xs leading-relaxed text-foreground/80">
                                        Full-stack automation and CRM architect specializing in custom Next.js and PostgreSQL portals, self-hosted n8n orchestration, GoHighLevel CRM systems, and low-latency AI voice telephony. Jazib leads system architecture and production delivery for service businesses, healthcare clinics, and B2B operators across Australia and the United States.
                                    </p>
                                    <div className="mt-4">
                                        <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/70">Core Stack</span>
                                        <p className="mt-1 font-mono text-[11px] leading-relaxed text-foreground/85">
                                            {["Custom Next.js Portals", "PostgreSQL & Supabase", "GoHighLevel", "n8n (Self-Hosted)", "Twilio SIP"].join(" · ")}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between">
                                    <span className="text-xs text-foreground/75">Leadership</span>
                                    <div className="flex items-center gap-3">
                                        {factsData.leadership?.founder?.linkedinUrl && factsData.leadership.founder.linkedinUrl.startsWith("http") && (
                                            <a
                                                href={factsData.leadership.founder.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex min-h-[44px] items-center gap-1 text-xs font-semibold text-brand hover:underline"
                                            >
                                                LinkedIn
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                        <Link
                                            href="/about/team/jazib-shahid"
                                            className="inline-flex min-h-[44px] items-center gap-1 text-xs font-semibold text-brand hover:underline"
                                        >
                                            View Profile
                                            <ExternalLink className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </div>

                            {/* Card 2: Ahsan Masood */}
                            <div className="h-full rounded-2xl border border-border/80 bg-surface-50 p-6 transition-colors hover:border-brand/40">
                            <div className="flex h-full flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-white shadow-sm">
                                            AM
                                        </div>
                                        <div>
                                            <h3 className="font-display text-xl font-semibold text-foreground">
                                                Ahsan Masood
                                            </h3>
                                            <p className="text-xs font-semibold text-brand">
                                                Senior CRM &amp; Telephony Engineer
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-xs leading-relaxed text-foreground/80">
                                        Specializes in GoHighLevel multi-location snapshot engineering, bi-directional webhook synchronization, carrier compliance (A2P 10DLC and Australian ACMA SMS standards), and automated lead-routing logic. Ensures clean data hygiene, CRM custom field mapping, and zero lead leakage across multi-step agency and contractor accounts.
                                    </p>
                                    <div className="mt-4">
                                        <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/70">Core Stack</span>
                                        <p className="mt-1 font-mono text-[11px] leading-relaxed text-foreground/85">
                                            {["GoHighLevel Snapshots", "SIP Trunking", "10DLC & ACMA Compliance", "CRM Webhooks"].join(" · ")}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between">
                                    <span className="text-xs text-foreground/75">Delivery Engineering</span>
                                    {factsData.leadership?.technicalLead?.linkedinUrl && factsData.leadership.technicalLead.linkedinUrl.startsWith("http") ? (
                                        <a
                                            href={factsData.leadership.technicalLead.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-[44px] items-center gap-1 text-xs font-semibold text-brand hover:underline"
                                        >
                                            LinkedIn
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    ) : (
                                        <span className="text-xs text-foreground/75">Systems Specialist</span>
                                    )}
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* Service Coverage & Contact Block */}
                        <div className="mt-8 rounded-2xl border border-border/80 bg-surface-50 p-6">
                            <div className="flex items-center gap-2 text-foreground font-semibold">
                                <ShieldCheck className="h-4 w-4 text-brand" />
                                <span>Serving Australian and US Businesses</span>
                            </div>
                            <div className="mt-4 grid gap-4 md:grid-cols-2 text-xs leading-relaxed text-foreground/75">
                                <div className="space-y-2">
                                    <p>
                                        <strong className="text-foreground">Service Coverage:</strong> Serving Australian and US businesses across AEST/AEDT, AWST, and US Eastern/Pacific (EST/PST) operating hours.
                                    </p>
                                    <p>
                                        <strong className="text-foreground">Delivery Model:</strong> Remote engineering team with direct calendar &amp; live Slack/WhatsApp support channels.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <strong className="text-foreground">Direct Contact:</strong>
                                        <span>Direct communication via</span>
                                        <ObfuscatedEmail className="text-xs" />
                                        <span>or</span>
                                        <a
                                            href="tel:+61451413786"
                                            className="inline-flex min-h-[44px] items-center text-brand font-medium hover:underline"
                                        >
                                            +61 451 413 786
                                        </a>.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Partner Ecosystem & Technical Capabilities */}
                        <div className="mt-8 border-t border-border/80 pt-6">
                            <h3 className="text-base font-semibold text-foreground">
                                Platform &amp; Engineering Capabilities
                            </h3>
                            <p className="mt-1 text-xs text-foreground/70">
                                We build on battle-tested web, CRM, and workflow orchestration stacks with full client account and code ownership.
                            </p>
                            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {factsData.partnerCertifications.map((cert) => {
                                    const hasProof = Boolean(cert.proofUrl && cert.proofUrl.startsWith("http"));
                                    return (
                                    <div
                                        key={cert.platform}
                                        className="h-full rounded-2xl border border-border/80 bg-surface-50 p-5 transition-all hover:border-brand/40 [@media(hover:hover)]:hover:-translate-y-0.5"
                                    >
                                    <div className="flex h-full flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs font-semibold text-brand">
                                                    {cert.platform}
                                                </span>
                                            </div>
                                            <h4 className="mt-2 text-sm font-semibold text-foreground">
                                                {cert.credential}
                                            </h4>
                                            <div className="mt-3 space-y-2 text-xs text-foreground/70">
                                                <p>
                                                    <strong className="text-foreground/90">Deployment Scope:</strong>{" "}
                                                    {cert.deploymentScope}
                                                </p>
                                                <p>
                                                    <strong className="text-foreground/90">Delivery Standard:</strong>{" "}
                                                    {cert.deliveryStandard || (cert as Record<string, unknown>).verificationStandard as string}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-border/80 text-xs flex items-center justify-between">
                                            <span className="text-[11px] font-medium text-foreground/70">
                                                {hasProof ? "Certified" : cert.status}
                                            </span>
                                            {hasProof && (
                                                <a
                                                    href={cert.proofUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-brand font-semibold hover:underline"
                                                >
                                                    View Proof
                                                    <ExternalLink className="ml-1 h-3 w-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container-shell mt-12">
                    <div className="rounded-2xl border border-border/80 bg-white p-6 md:p-8">
                        <h2 className="font-display text-3xl text-foreground">Journey so far</h2>
                        <div className="mt-6 rounded-2xl border border-border/80 bg-surface-50 p-6">
                            <span className="font-mono text-xs font-semibold text-brand">Founded 2020</span>
                            <h3 className="mt-2 text-lg font-semibold text-foreground">Engineering Dependable Systems Since 2020</h3>
                            <p className="mt-3 text-sm leading-relaxed text-foreground/75 max-w-3xl">
                                DigitalX Solutions was founded in 2020 to build resilient, production-grade automation systems and web software for service businesses. Over the years, we expanded from custom CRM and webhook architectures to self-hosted n8n data pipelines and low-latency AI voice receptionists across Australia and the United States.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container-shell mt-12">
                    <div className="rounded-2xl border border-border/80 bg-surface-50 p-6 md:p-10">
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                            Our Operating Principles &amp; Delivery Standards
                        </h2>
                        <p className="mt-2 text-sm text-foreground/70 max-w-2xl">
                            We built DigitalX Solutions to provide honest, high-leverage technical execution without agency fluff or vanity metrics. Every system is engineered for resilient uptime, bi-directional database synchronization, and complete operational transparency across production telephony and CRM systems.
                        </p>
                        <div className="mt-6 grid gap-6 sm:grid-cols-3 text-sm text-foreground/75">
                            <div className="rounded-2xl border border-border/80 bg-white p-5">
                                <h3 className="font-semibold text-foreground">1. You Own 100% of the Assets</h3>
                                <p className="mt-2 text-xs leading-relaxed">
                                    All CRM setups, Twilio SIP numbers, n8n workflows, and custom Next.js code are built directly in your cloud accounts. If you ever stop working with us, your operational infrastructure stays fully intact with complete administrative access, environment configurations, and private source repositories.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border/80 bg-white p-5">
                                <h3 className="font-semibold text-foreground">2. Natural Conversational Latency Pacing</h3>
                                <p className="mt-2 text-xs leading-relaxed">
                                    We engineer fast, natural conversational responses under 800ms. An AI voice receptionist that pauses awkwardly frustrates callers; our systems prioritize low-latency streaming to maintain natural timing, rapid turn-taking, and instant interruption handling.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border/80 bg-white p-5">
                                <h3 className="font-semibold text-foreground">3. Operational Guardrails</h3>
                                <p className="mt-2 text-xs leading-relaxed">
                                    Our AI agents never invent pricing or commit to appointments without verifying live database availability. When an inquiry falls outside predefined parameters, it gracefully routes to your on-call team with complete caller context, booking notes, and audio transcripts.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container-shell mt-12">
                    <div className="rounded-2xl saas-grid-bg border border-border/80 border-t-[3px] border-t-brand bg-white px-6 py-12 text-center shadow-sm md:px-10">
                        <h2 className="font-display text-3xl text-foreground md:text-4xl">Want a practical partner for your next growth phase?</h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary md:text-base">
                            Share your goals and current bottlenecks. We will map a staged delivery plan with clear
                            ownership and measurable outcomes.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-8 inline-flex items-center rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-white shadow-xs hover:bg-brand-deep transition-colors"
                        >
                            Start a conversation
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
