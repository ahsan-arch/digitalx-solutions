import { generatePageMetadata, seoCopy } from "@/lib/seo";
import { ServicesSection } from "@/components/sections/services-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata("/services/web-dev", seoCopy.webDev);

export default function WebDevPage() {
    return (
        <main className="pt-20">
            {/* We reuse the services section but this page is targeted for Web Dev SEO */}
            <ServicesSection />
            <ContactSection />
        </main>
    );
}
