import { Metadata } from "next";
import { generatePageMetadata, generateBreadcrumbSchema, generateServicePageSchema, siteConfig } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact-section";
import { SubPageLayout } from "@/components/layout";

export const metadata: Metadata = generatePageMetadata(
    "/services/meta-ads-engineering",
    {
        title: "Server-Side CAPI Meta Ads Expert | DigitalX Solutions",
        description:
            "Stop iOS14 signal loss and creative fatigue. We build full-funnel Meta ads systems with custom CAPI tracking. Avg 4.2x ROAS for USA & Australia.",
    }
);

export default function MetaAdsEngineeringPage() {
    const serviceSchema = generateServicePageSchema({
        name: "Meta Ads Engineering & Server-Side CAPI",
        description: "Stop iOS14 signal loss and creative fatigue. We build full-funnel Meta ads systems with custom CAPI tracking.",
        url: `${siteConfig.domain}/services/meta-ads-engineering`,
        offers: [{ name: "Meta Ads Retainer", price: "3500", currency: "USD" }],
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Services", url: `${siteConfig.domain}/services` },
        { name: "Meta Ads Engineering", url: `${siteConfig.domain}/services/meta-ads-engineering` },
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cobalt/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 md:px-12 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[1px] w-8 bg-cobalt/50" />
                        <span className="font-mono text-xs text-cobalt/70 uppercase tracking-widest">
                            Meta Ads Engineering
                        </span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white uppercase mb-6 leading-tight">
                        <span className="text-cobalt">Meta Ads</span> Engineering
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                        We don&apos;t &quot;boost posts&quot;. We engineer complex tracking architectures to
                        bypass iOS14+ data loss. Our systems feed the Meta algorithm the exact
                        purchase signals it needs to scale your ROAS.
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
                                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Signal Recovery</span>
                            </div>
                            <h3 className="text-2xl font-display text-white mb-4">Fix Meta Ads iOS14 Signal Loss</h3>
                            <p className="text-white/60 leading-relaxed">
                                If you are relying solely on the Meta Pixel, you are losing 40% of your attribution.
                                We install custom Server-Side Tracking (CAPI) using dedicated cloud environments
                                (like Stape or GCP) to push 100% of event match quality back to the platform.
                            </p>
                        </div>

                        <div className="p-8 border border-white/10 rounded-2xl bg-surface-100 hover:border-cobalt/30 transition-colors duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-neon shadow-[0_0_8px_theme(colors.neon.DEFAULT)]" />
                                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Creative Systems</span>
                            </div>
                            <h3 className="text-2xl font-display text-white mb-4">Stop Meta Ads Creative Fatigue</h3>
                            <p className="text-white/60 leading-relaxed">
                                We systematically test creatives using rigorous Direct Response frameworks.
                                We analyze 3-second hook rates, hold rates, and click-through rates to iterate
                                daily, preventing your ad sets from burning out.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ContactSection />
        </SubPageLayout>
    );
}
