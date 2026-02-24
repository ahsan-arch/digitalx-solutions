import { generatePageMetadata, generateBreadcrumbSchema, seoCopy, siteConfig } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata("/contact", seoCopy.contact);

export default function ContactPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Contact", url: `${siteConfig.domain}/contact` },
    ]);

    return (
        <main className="pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ContactSection />
        </main>
    );
}
