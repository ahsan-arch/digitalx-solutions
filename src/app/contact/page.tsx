import { generatePageMetadata, generateBreadcrumbSchema, seoCopy, siteConfig } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact-section";
import { SubPageLayout } from "@/components/layout";

export const metadata = generatePageMetadata("/contact", seoCopy.contact);

export default function ContactPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Contact", url: `${siteConfig.domain}/contact` },
    ]);

    return (
        <SubPageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ContactSection />
        </SubPageLayout>
    );
}
