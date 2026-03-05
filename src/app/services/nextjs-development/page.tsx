import { Metadata } from "next";
import { generatePageMetadata, generateBreadcrumbSchema, generateServicePageSchema, siteConfig } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact-section";
import { SubPageLayout } from "@/components/layout";

export const metadata: Metadata = generatePageMetadata(
    "/services/nextjs-development",
    {
        title: "High-Performance Next.js Development Agency | DigitalX Solutions",
        description:
            "Sub-second Next.js websites engineered for conversion. 100 Lighthouse scores, headless CMS, and SEO-baked architectures for brands in the USA & Australia.",
    }
);

export default function NextjsDevelopmentPage() {
    const serviceSchema = generateServicePageSchema({
        name: "High-Performance Next.js Development",
        description: "Sub-second Next.js websites engineered for conversion. 100 Lighthouse scores, headless CMS, and SEO-baked architectures.",
        url: `${siteConfig.domain}/services/nextjs-development`,
        offers: [{ name: "Website Build", price: "15000", currency: "USD" }],
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Services", url: `${siteConfig.domain}/services` },
        { name: "Next.js Development", url: `${siteConfig.domain}/services/nextjs-development` },
    ]);

    return (
        <SubPageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Hero */}
            <section className="relative py-24 overflow-hidden border-b border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 md:px-12 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[1px] w-8 bg-cobalt/50" />
                        <span className="font-mono text-xs text-cobalt/70 uppercase tracking-widest">
                            Web Development
                        </span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white uppercase mb-6 leading-tight">
                        High-Performance <span className="text-cobalt">Next.js</span> Development
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                        We engineer sub-second web experiences. If it&apos;s not instant, it&apos;s broken.
                        Stop losing conversions to slow load times. Our SEO-baked Next.js architectures
                        guarantee a 98+ Lighthouse score.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border border-white/10 rounded-2xl bg-surface-100 hover:border-cobalt/30 transition-colors duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-neon shadow-[0_0_8px_theme(colors.neon.DEFAULT)]" />
                                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Performance</span>
                            </div>
                            <h3 className="text-2xl font-display text-white mb-4">Load Time Under 200ms</h3>
                            <p className="text-white/60 leading-relaxed">
                                We don&apos;t use bloated WordPress themes. We build custom Next.js
                                frontends connected to headless CMS solutions. The result?
                                Static-site speeds with dynamic, interactive features.
                            </p>
                        </div>

                        <div className="p-8 border border-white/10 rounded-2xl bg-surface-100 hover:border-cobalt/30 transition-colors duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-neon shadow-[0_0_8px_theme(colors.neon.DEFAULT)]" />
                                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">SEO Architecture</span>
                            </div>
                            <h3 className="text-2xl font-display text-white mb-4">SEO-Baked Architecture</h3>
                            <p className="text-white/60 leading-relaxed">
                                Every component is built for search engines first. We implement server-side
                                rendering (SSR), advanced WebGL interactions, and automatic semantic JSON-LD
                                structured data right out of the box.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ContactSection />
        </SubPageLayout>
    );
}
