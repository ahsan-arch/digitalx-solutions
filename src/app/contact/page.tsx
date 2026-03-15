import { generatePageMetadata, generateBreadcrumbSchema, seoCopy, siteConfig } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact-section";
import { SubPageLayout } from "@/components/layout";

export const metadata = generatePageMetadata("/contact", seoCopy.contact);

export default function ContactPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Contact", url: `${siteConfig.domain}/contact` },
    ]);

    const contactPageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${siteConfig.domain}/contact`,
        name: "Contact DigitalX Solutions",
        description: seoCopy.contact.description,
        url: `${siteConfig.domain}/contact`,
        mainEntity: {
            "@id": `${siteConfig.domain}/#organization`,
        },
    };

    return (
        <SubPageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            <ContactSection />
        </SubPageLayout>
    );
}
