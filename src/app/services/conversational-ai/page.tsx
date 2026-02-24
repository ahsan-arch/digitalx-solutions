import { generatePageMetadata, generateBreadcrumbSchema, generateServicePageSchema, seoCopy, siteConfig } from "@/lib/seo";
import { ConversationalAISection } from "@/components/sections/conversational-ai-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata("/services/conversational-ai", seoCopy.conversationalAI);

export default function ConversationalAIPage() {
    const serviceSchema = generateServicePageSchema({
        name: "Conversational AI — WhatsApp & Voice Agents",
        description: seoCopy.conversationalAI.description,
        url: `${siteConfig.domain}/services/conversational-ai`,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Services", url: `${siteConfig.domain}/services` },
        { name: "Conversational AI", url: `${siteConfig.domain}/services/conversational-ai` },
    ]);

    return (
        <main className="pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ConversationalAISection />
            <ContactSection />
        </main>
    );
}
