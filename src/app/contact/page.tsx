import { generatePageMetadata, seoCopy } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata("/contact", seoCopy.contact);

export default function ContactPage() {
    return (
        <main className="pt-20">
            <ContactSection />
        </main>
    );
}
