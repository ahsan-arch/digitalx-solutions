import { Metadata } from "next";
import { seoCopy } from "@/lib/seo";
import { WorkSection } from "@/components/sections/work-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
    title: "Our Work | DigitalX Solutions",
    description: "Real numbers. Validated stacks. No fluff. See how we scale revenue for brands.",
};

export default function WorkPage() {
    return (
        <main className="pt-20">
            <WorkSection />
            <ContactSection />
        </main>
    );
}
