import { Metadata } from "next";
import { seoCopy } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
    title: seoCopy.contact.title,
    description: seoCopy.contact.description,
};

export default function ContactPage() {
    return (
        <main className="pt-20">
            <ContactSection />
        </main>
    );
}
