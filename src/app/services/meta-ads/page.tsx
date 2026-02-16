import { generatePageMetadata, seoCopy } from "@/lib/seo";
import { MetaAdsSection } from "@/components/sections/meta-ads-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata("/services/meta-ads", seoCopy.metaAds);

export default function MetaAdsPage() {
    return (
        <main className="pt-20">
            <MetaAdsSection />
            <ContactSection />
        </main>
    );
}
