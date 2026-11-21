import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
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
                "@type": "Organization",
                "@id": `${siteConfig.domain}/#organization`,
                name: "DigitalX Solutions",
                legalName: "DigitalX Solutions",
                url: siteConfig.domain,
                logo: `${siteConfig.domain}/assets/logo.png`,
                telephone: "+61 451 413 786",
                email: "info@digitalx-solutions.com",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "16 Boldrewood Ave",
                    addressLocality: "Casula",
                    addressRegion: "NSW",
                    postalCode: "2170",
                    addressCountry: "AU",
                },
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
                jobTitle: "Founder & CEO",
                description:
                    "Specializes in end-to-end AI voice receptionists, GoHighLevel CRM architectures, self-hosted n8n workflow orchestration, and Twilio/SIP telephony integrations for high-volume service operators across Australia and the United States. Leads system architecture, fast and natural conversational tuning, and strict operational guardrails across all client deployments.",
                worksFor: {
                    "@id": `${siteConfig.domain}/#organization`,
                },
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

            <main id="main" className="pb-20 pt-12">
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
                                    className="inline-flex items-center rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface-100 transition"
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
                                <div className="mt-1 text-sm text-foreground/75">{stat.label}</div>
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
                        <div>
                            <p className="text-xs font-semibold text-brand">Engineering Leadership</p>
                            <h2 className="mt-1 font-display text-3xl text-foreground">Built by Systems Engineers, Not Account Managers</h2>
                            <p className="mt-2 text-sm leading-relaxed text-foreground/70 max-w-3xl">
                                Every telephony stream, CRM pipeline, and n8n workflow at DigitalX Solutions is architected and stress-tested by our core engineering leadership, never outsourced to junior template installers.
                            </p>
                        </div>

                        {/* Leadership Cards */}
                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                            {/* Card 1: Jazib Shahid */}
                            <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface-50 p-6">
                                <div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-white shadow-sm">
                                            JS
                                        </div>
                                        <div>
                                            <h3 className="font-display text-xl font-semibold text-foreground">
                                                Jazib Shahid
                                            </h3>
                                            <p className="text-xs font-semibold text-brand">
                                                Founder &amp; CEO
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-xs leading-relaxed text-foreground/80">
                                        Specializes in end-to-end AI voice receptionists, GoHighLevel CRM architectures, self-hosted n8n workflow orchestration, and Twilio/SIP telephony integrations for high-volume service operators across Australia and the United States. Leads system architecture, fast and natural conversational tuning, and strict operational guardrails across all client deployments.
                                    </p>
                                    <div className="mt-4">
                                        <span className="text-[11px] font-medium text-foreground/75">Core Stack</span>
                                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                                            {["GoHighLevel", "n8n (Self-Hosted & Cloud)", "Twilio SIP", "Vapi", "HubSpot API"].map((tech) => (
                                                <span key={tech} className="rounded-md border border-border bg-white px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                                    <span className="text-xs text-foreground/75">Leadership</span>
                                    <Link
                                        href="/about/team/jazib-shahid"
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                                    >
                                        View Profile
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>

                            {/* Card 2: Ahsan Masood */}
                            <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface-50 p-6">
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
                                        <span className="text-[11px] font-medium text-foreground/75">Core Stack</span>
                                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                                            {["GoHighLevel Snapshots", "SIP Trunking", "10DLC & ACMA Compliance", "CRM Webhooks"].map((tech) => (
                                                <span key={tech} className="rounded-md border border-border bg-white px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                                    <span className="text-xs text-foreground/75">Delivery Engineering</span>
                                    <span className="text-xs text-foreground/50">Systems Specialist</span>
                                </div>
                            </div>
                        </div>

                        {/* Registered Entity & Operational Compliance Block */}
                        <div className="mt-8 rounded-2xl border border-border bg-surface-50 p-6">
                            <div className="flex items-center gap-2 text-foreground font-semibold">
                                <ShieldCheck className="h-4 w-4 text-brand" />
                                <span>Registered Australian Business &amp; Global Operations</span>
                            </div>
                            <div className="mt-4 grid gap-4 md:grid-cols-2 text-xs leading-relaxed text-foreground/75">
                                <div className="space-y-2">
                                    <p>
                                        <strong className="text-foreground">Registered Office:</strong> 16 Boldrewood Ave, Casula NSW 2170, Australia.
                                    </p>
                                    <p>
                                        <strong className="text-foreground">Coverage:</strong> Seamless operational support and monitoring across Australian Eastern Standard Time (AEST) and US Eastern/Pacific (EST/PST) business hours.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p>
                                        <strong className="text-foreground">Privacy &amp; Messaging Standards:</strong> Designed with privacy and messaging rules in mind, including Australian Privacy Principles, ACMA spam standards, and US CTIA/A2P 10DLC messaging compliance.
                                    </p>
                                    <p>
                                        <strong className="text-foreground">Direct Contact:</strong> Direct executive communication available via{" "}
                                        <a href="mailto:info@digitalx-solutions.com" className="text-brand font-medium hover:underline">info@digitalx-solutions.com</a>
                                        {" "}or{" "}
                                        <a href="tel:+61451413786" className="text-brand font-medium hover:underline">+61 451 413 786</a>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Partner Ecosystem & Technical Credentials */}
                        <div className="mt-8 border-t border-border pt-6">
                            <h3 className="text-base font-semibold text-foreground">
                                Platform Integrations &amp; Technical Stacks
                            </h3>
                            <p className="mt-1 text-xs text-foreground/70">
                                Production integrations and delivery standards deployed across client accounts.
                            </p>
                            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                {factsData.partnerCertifications.map((cert) => (
                                    <div
                                        key={cert.platform}
                                        className="rounded-2xl border border-border bg-surface-50 p-5 flex flex-col justify-between"
                                    >
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
                                                    {cert.verificationStandard}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-border/70 text-xs flex items-center justify-between">
                                            <span className="text-[11px] font-medium text-foreground/70">
                                                Integration Architecture
                                            </span>
                                            {cert.proofUrl && cert.proofUrl.startsWith("http") && (
                                                <a
                                                    href={cert.proofUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-brand font-semibold hover:underline"
                                                >
                                                    Platform
                                                    <ExternalLink className="ml-1 h-3 w-3" />
                                                </a>
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
                        <div className="mt-6 rounded-2xl border border-border bg-surface-50 p-6">
                            <span className="font-mono text-xs font-semibold text-brand">Founded 2020</span>
                            <h3 className="mt-2 text-lg font-semibold text-foreground">Engineering Dependable Systems Since 2020</h3>
                            <p className="mt-3 text-sm leading-relaxed text-foreground/75 max-w-3xl">
                                DigitalX Solutions was founded in 2020 to build resilient, production-grade automation systems and web software for service businesses. Over the years, we expanded from custom CRM and webhook architectures to self-hosted n8n data pipelines and low-latency AI voice receptionists across Australia and the United States.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container-shell mt-12">
                    <div className="rounded-3xl border border-border bg-surface-50 p-6 md:p-10">
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                            Our Operating Principles &amp; Delivery Standards
                        </h2>
                        <p className="mt-2 text-sm text-foreground/70 max-w-2xl">
                            We built DigitalX Solutions to provide honest, high-leverage technical execution without agency fluff or vanity metrics. Every system is engineered for resilient uptime, bi-directional database synchronization, and complete operational transparency across production telephony and CRM systems.
                        </p>
                        <div className="mt-6 grid gap-6 sm:grid-cols-3 text-sm text-foreground/75">
                            <div className="rounded-2xl border border-border bg-white p-5">
                                <h3 className="font-semibold text-foreground">1. You Own 100% of the Assets</h3>
                                <p className="mt-2 text-xs leading-relaxed">
                                    All CRM setups, Twilio SIP numbers, n8n workflows, and custom Next.js code are built directly in your cloud accounts. If you ever stop working with us, your operational infrastructure stays fully intact with complete administrative access, environment configurations, and private source repositories.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border bg-white p-5">
                                <h3 className="font-semibold text-foreground">2. Natural Conversational Latency Pacing</h3>
                                <p className="mt-2 text-xs leading-relaxed">
                                    We engineer fast, natural conversational responses. An AI voice receptionist that pauses awkwardly frustrates callers; our systems prioritize low-latency streaming to maintain natural timing, rapid turn-taking, and instant interruption handling.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border bg-white p-5">
                                <h3 className="font-semibold text-foreground">3. Strict Operational Guardrails</h3>
                                <p className="mt-2 text-xs leading-relaxed">
                                    Our AI agents never invent pricing or commit to appointments without verifying live database availability. When an inquiry falls outside verified parameters, it gracefully routes to your on-call team with complete caller context, booking notes, and audio transcripts.
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
                            className="mt-8 inline-flex items-center rounded-xl bg-white px-7 py-3 text-sm font-semibold text-foreground transition"
                        >
                            Start a conversation
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
