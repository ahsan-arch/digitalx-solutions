import { Metadata } from "next";
import { seoCopy } from "@/lib/seo";
import { MetaAdsSection } from "@/components/sections/meta-ads-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
    title: seoCopy.metaAds.title,
    description: seoCopy.metaAds.description,
};

export default function MetaAdsPage() {
    return (
        <main className="pt-20">
            <MetaAdsSection />
            <ContactSection />
        </main>
    );
}
