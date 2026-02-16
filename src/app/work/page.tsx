import { generatePageMetadata, seoCopy } from "@/lib/seo";
import { WorkSection } from "@/components/sections/work-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata("/work", seoCopy.work);

export default function WorkPage() {
    return (
        <main className="pt-20">
            <WorkSection />
            <ContactSection />
        </main>
    );
}
