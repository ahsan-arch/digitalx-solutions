import { generatePageMetadata, generateBreadcrumbSchema, seoCopy, siteConfig } from "@/lib/seo";
import { ServicesSection } from "@/components/sections/services-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SubPageLayout } from "@/components/layout";

export const metadata = generatePageMetadata("/services", seoCopy.services);

export default function ServicesPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Services", url: `${siteConfig.domain}/services` },
    ]);

    return (
        <SubPageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ServicesSection />
            <PricingSection />
            <ContactSection />
        </SubPageLayout>
    );
}
