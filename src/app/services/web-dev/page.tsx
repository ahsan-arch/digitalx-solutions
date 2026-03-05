import { generatePageMetadata, generateBreadcrumbSchema, generateServicePageSchema, seoCopy, siteConfig } from "@/lib/seo";
import { ServicesSection } from "@/components/sections/services-section";
import { ContactSection } from "@/components/sections/contact-section";
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
            <ServicesSection />
            <ContactSection />
        </SubPageLayout>
    );
}
