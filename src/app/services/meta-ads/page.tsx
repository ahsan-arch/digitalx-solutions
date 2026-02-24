import { generatePageMetadata, generateBreadcrumbSchema, generateServicePageSchema, seoCopy, siteConfig } from "@/lib/seo";
import { MetaAdsSection } from "@/components/sections/meta-ads-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = generatePageMetadata("/services/meta-ads", seoCopy.metaAds);

export default function MetaAdsPage() {
    const serviceSchema = generateServicePageSchema({
        name: "Meta Ads Engineering & Server-Side Tracking",
        description: seoCopy.metaAds.description,
        url: `${siteConfig.domain}/services/meta-ads`,
        offers: [
            { name: "Retainer Model", price: "3500", currency: "USD" },
        ],
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Services", url: `${siteConfig.domain}/services` },
        { name: "Meta Ads Engineering", url: `${siteConfig.domain}/services/meta-ads` },
    ]);

    return (
        <main className="pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <MetaAdsSection />
            <ContactSection />
        </main>
    );
}
