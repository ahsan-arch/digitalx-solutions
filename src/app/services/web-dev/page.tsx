import { generatePageMetadata, generateBreadcrumbSchema, generateServicePageSchema, seoCopy, siteConfig } from "@/lib/seo";
import { ServicesSection } from "@/components/sections/services-section";
import { ContactSection } from "@/components/sections/contact-section";
import { RelatedServices } from "@/components/sections/related-services";
import { SubPageLayout } from "@/components/layout";

export const metadata = generatePageMetadata("/services/web-dev", seoCopy.webDev);

export default function WebDevPage() {
    const serviceSchema = generateServicePageSchema({
        name: "High-Performance Next.js Web Development",
        description: seoCopy.webDev.description,
        url: `${siteConfig.domain}/services/web-dev`,
        offers: [
            { name: "Website Build", price: "15000", currency: "USD" },
        ],
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Services", url: `${siteConfig.domain}/services` },
        { name: "Web Development", url: `${siteConfig.domain}/services/web-dev` },
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
            <section className="relative py-24 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-display text-white mb-6 uppercase">
                        High-Performance <span className="text-cobalt">Web Development</span>
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        We build custom web development solutions tailored to scale.
                    </p>
                </div>
            </section>
            <ServicesSection />
            <RelatedServices currentSlug="web-dev" />
            <ContactSection />
        </SubPageLayout>
    );
}

