import { Metadata } from "next";
import { generatePageMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo";
import { FloatingDock } from "@/components/navigation/floating-dock";
import { Footer } from "@/components/layout";
import dynamic from "next/dynamic";

const ServicesSection = dynamic(() => import("@/components/sections/services-section").then((mod) => mod.ServicesSection));
const MetaAdsSection = dynamic(() => import("@/components/sections/meta-ads-section").then((mod) => mod.MetaAdsSection));
const WorkSection = dynamic(() => import("@/components/sections/work-section").then((mod) => mod.WorkSection));
const ContactSection = dynamic(() => import("@/components/sections/contact-section").then((mod) => mod.ContactSection));

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
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <FloatingDock />
            <main id="main">
                <section className="relative pt-48 pb-24 px-4 md:px-12 bg-background flex flex-col justify-center min-h-[60vh]">
                    {/* Background Ambience */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cobalt/20 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />

                    <div className="relative z-10 max-w-7xl mx-auto w-full">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] w-12 bg-cobalt" />
                            <span className="font-mono text-cobalt tracking-widest text-sm uppercase">
                                Serving the United States
                            </span>
                        </div>

                        <h1 className="font-display font-bold text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] tracking-tighter text-white uppercase mb-8">
                            Digital Infrastructure <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-cobalt-vivid">Agency USA</span>
                        </h1>

                        <p className="text-white/60 max-w-2xl text-lg md:text-xl font-sans leading-relaxed">
                            Partnering with ambitious US-based businesses to engineer high-performance Next.js websites,
                            scalable CRM automations, and server-side tracking Meta Ads solutions.
                        </p>
                    </div>
                </section>

                <ServicesSection />
                <MetaAdsSection />
                <WorkSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
