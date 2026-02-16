import { generatePageMetadata, seoCopy } from "@/lib/seo";
import { ServicesSection } from "@/components/sections/services-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata("/services", seoCopy.services);

export default function ServicesPage() {
    return (
        <main className="pt-20">
            <ServicesSection />
            <PricingSection />
            <ContactSection />
        </main>
    );
}
