import { Metadata } from "next";
import { generatePageMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import { FloatingDock } from "@/components/navigation/floating-dock";
import { Footer } from "@/components/layout";

export const metadata: Metadata = generatePageMetadata("/about", {
    title: "About DigitalX Solutions | AI Automation & Web Agency",
    description:
        "Meet the team behind DigitalX Solutions. Founded in 2022, we build custom n8n workflows, GoHighLevel systems, AI voice agents, and Next.js websites for businesses in Australia & USA.",
});

const team = [
    {
        name: "Ahsan Architect",
        role: "Founder & Lead Engineer",
        bio: "Full-stack engineer with 8+ years building high-performance web applications. Expert in Next.js, Node.js, and automation architecture. Previously led engineering teams shipping products to millions of users.",
        expertise: [
            "Next.js & React Architecture",
            "n8n Workflow Automation",
            "GoHighLevel Systems",
            "Server-Side Tracking (Meta CAPI)",
        ],
    },
    {
        name: "Engineering Team",
        role: "Development & Automation",
        bio: "Our distributed team specializes in building enterprise-grade automation pipelines, high-performance websites, and conversational AI agents. We ship fast, test rigorously, and optimise relentlessly.",
        expertise: [
            "Custom API Integrations",
            "AI Voice Agent Development",
            "Performance Engineering",
            "CRM Architecture",
        ],
    },
];

const milestones = [
    { year: "2022", event: "Founded DigitalX Solutions in Sydney, Australia" },
    {
        year: "2023",
        event: "Expanded services to the United States — shipped 20+ projects",
    },
    {
        year: "2024",
        event: "Launched Conversational AI division — AI voice receptionists for healthcare & service businesses",
    },
    {
        year: "2025",
        event: "$18M+ revenue generated for clients — 47+ projects shipped globally",
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
            "Meet the team behind DigitalX Solutions — a premium AI automation and web development agency serving Australia and the USA.",
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

            <FloatingDock />
            <main id="main" className="bg-background">
                {/* Hero */}
                <section className="relative pt-48 pb-24 px-4 md:px-12 min-h-[50vh]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cobalt/15 blur-[150px] rounded-full pointer-events-none opacity-60 mix-blend-screen" />

                    <div className="relative z-10 max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] w-12 bg-cobalt" />
                            <span className="font-mono text-cobalt tracking-widest text-sm uppercase">
                                About Us
                            </span>
                        </div>

                        <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tighter text-white uppercase mb-8">
                            We Build Digital{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-cobalt-vivid">
                                Infrastructure
                            </span>{" "}
                            That Scales
                        </h1>

                        <p className="text-white/60 max-w-2xl text-lg md:text-xl font-sans leading-relaxed mb-6">
                            DigitalX Solutions is a premium AI automation and web
                            development agency founded in 2022 in Sydney, Australia. We
                            serve ambitious businesses across Australia and the United
                            States, engineering custom systems that drive measurable
                            revenue growth.
                        </p>

                        <p className="text-white/60 max-w-2xl text-lg font-sans leading-relaxed">
                            Our team specialises in building what off-the-shelf tools
                            cannot handle: complex n8n automation pipelines, custom
                            GoHighLevel architectures, AI voice receptionists, sub-200ms
                            Next.js websites, and server-side Meta Ads tracking systems.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-20 px-4 md:px-12 border-t border-white/5">
                    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "$18M+", label: "Revenue Generated" },
                            { value: "4.6x", label: "Average ROAS" },
                            { value: "47+", label: "Projects Shipped" },
                            { value: "<2s", label: "Avg Load Time" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl md:text-4xl font-display font-bold text-cobalt mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-mono text-white/40 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section className="py-20 px-4 md:px-12 border-t border-white/5">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-16 tracking-tight">
                            The Team
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {team.map((member) => (
                                <div
                                    key={member.name}
                                    className="p-8 rounded-xl border border-white/5 bg-surface-100/30"
                                >
                                    <h3 className="text-xl font-display font-bold text-white mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-cobalt font-mono text-sm mb-4">
                                        {member.role}
                                    </p>
                                    <p className="text-white/60 leading-relaxed mb-6">
                                        {member.bio}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {member.expertise.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 rounded-full text-xs font-mono bg-cobalt/10 text-cobalt border border-cobalt/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Milestones */}
                <section className="py-20 px-4 md:px-12 border-t border-white/5">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-16 tracking-tight">
                            Our Journey
                        </h2>

                        <div className="space-y-8">
                            {milestones.map((m, i) => (
                                <div key={i} className="flex gap-8 items-start">
                                    <div className="text-cobalt font-mono text-lg font-bold min-w-[60px]">
                                        {m.year}
                                    </div>
                                    <div className="flex-1 text-white/70 text-lg leading-relaxed border-l border-white/10 pl-8">
                                        {m.event}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 px-4 md:px-12 border-t border-white/5">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-16 tracking-tight">
                            How We Work
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Engineering-First",
                                    desc: "Every solution is architected for scale, performance, and maintainability. We don't patch — we build systems that last.",
                                },
                                {
                                    title: "Results Over Aesthetics",
                                    desc: "Beautiful design matters, but only if it converts. Every pixel, every interaction is designed to drive measurable business outcomes.",
                                },
                                {
                                    title: "Radical Transparency",
                                    desc: "Live dashboards, weekly analysis, honest reporting. If something isn't working, you'll hear it from us before you notice it yourself.",
                                },
                            ].map((v) => (
                                <div
                                    key={v.title}
                                    className="p-6 rounded-xl border border-white/5 bg-surface-100/20"
                                >
                                    <h3 className="text-lg font-display font-bold text-white mb-3">
                                        {v.title}
                                    </h3>
                                    <p className="text-white/50 leading-relaxed text-sm">
                                        {v.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-4 md:px-12 border-t border-white/5 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight">
                            Ready to Build Something Real?
                        </h2>
                        <p className="text-white/50 text-lg mb-10 leading-relaxed">
                            We partner with businesses that care about outcomes, not
                            vanity metrics. If that sounds like you, let&apos;s talk.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 bg-cobalt text-white font-display font-bold rounded-lg hover:bg-cobalt-vivid transition-colors text-lg"
                        >
                            Start a Project
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
