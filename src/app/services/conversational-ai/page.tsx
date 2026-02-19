import { generatePageMetadata, seoCopy } from "@/lib/seo";
import { ConversationalAISection } from "@/components/sections/conversational-ai-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata("/services/conversational-ai", seoCopy.conversationalAI);

export default function ConversationalAIPage() {
    return (
        <main className="pt-20">
            <ConversationalAISection />
            <ContactSection />
        </main>
    );
}
