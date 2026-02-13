import { Metadata } from "next";
import { seoCopy } from "@/lib/seo";
import { ServicesSection } from "@/components/sections/services-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
    title: seoCopy.revenueOps.title, // Mapping SEO/Marketing to general Services/Revenue Ops
    description: seoCopy.revenueOps.description,
};

export default function ServicesPage() {
    return (
        <main className="pt-20">
            <ServicesSection />
            <PricingSection />
            <ContactSection />
        </main>
    );
}
