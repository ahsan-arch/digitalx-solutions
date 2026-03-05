import { generatePageMetadata, generateBreadcrumbSchema, generateServicePageSchema, seoCopy, siteConfig } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact-section";
import { SubPageLayout } from "@/components/layout";

export const metadata = generatePageMetadata("/services/revenue-operations", seoCopy.revenueOps);

export default function RevenueOperationsPage() {
    const serviceSchema = generateServicePageSchema({
        name: "Revenue Operations & CRM Automation",
        description: seoCopy.revenueOps.description,
        url: `${siteConfig.domain}/services/revenue-operations`,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Services", url: `${siteConfig.domain}/services` },
        { name: "Revenue Operations", url: `${siteConfig.domain}/services/revenue-operations` },
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

            {/* Hero Section */}
            <section className="py-24 relative overflow-hidden flex flex-col items-center border-b border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cobalt/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="font-display text-5xl md:text-7xl text-white uppercase mb-6 leading-tight">
                        Advanced <span className="text-cobalt">Revenue</span> Operations
                    </h1>
                    <p className="text-white/60 text-xl max-w-2xl mx-auto mb-12">
                        Beyond Zapier. Custom n8n and GoHighLevel architectures that handle complex, multi-step workflows basic agencies can&apos;t touch. Serving businesses in the USA and Australia.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left font-mono text-sm text-white/80">
                        <div className="bg-surface-100 border border-white/5 p-6 rounded-xl">
                            <div className="text-neon mb-2">01 // n8n Workflows</div>
                            Complex self-hosted automation handling data normalization.
                        </div>
                        <div className="bg-surface-100 border border-white/5 p-6 rounded-xl">
                            <div className="text-cobalt mb-2">02 // GoHighLevel Sync</div>
                            Seamless integration between ads, pipelines, and calendars.
                        </div>
                        <div className="bg-surface-100 border border-white/5 p-6 rounded-xl">
                            <div className="text-white mb-2">03 // Custom APIs</div>
                            Connecting financial tools, CRMs, and custom databases.
                        </div>
                    </div>
                </div>
            </section>

            <ContactSection />
        </SubPageLayout>
    );
}
