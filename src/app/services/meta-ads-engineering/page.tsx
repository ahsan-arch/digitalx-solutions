import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata(
    "/services/meta-ads-engineering",
    {
        title: "Server-Side CAPI Meta Ads Expert | DigitalX Solutions",
        description:
            "Stop iOS14 signal loss and creative fatigue. We build full-funnel Meta ads systems with custom CAPI tracking. Avg 4.2x ROAS for USA & Australia.",
    }
);

export default function MetaAdsEngineeringPage() {
    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                <h1 className="text-5xl font-display font-medium mb-6 uppercase tracking-tight text-white">
                    <span className="text-acid">Meta Ads</span> Engineering
                </h1>
                <p className="text-xl text-foreground-muted font-sans font-light leading-relaxed mb-12">
                    We don&apos;t &quot;boost posts&quot;. We engineer complex tracking architectures to
                    bypass iOS14+ data loss. Our systems feed the Meta algorithm the exact
                    purchase signals it needs to scale your ROAS.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                    <h3 className="text-2xl font-display text-white mb-4">Fix Meta Ads iOS14 Signal Loss</h3>
                    <p className="text-foreground-muted mb-4">
                        If you are relying solely on the Meta Pixel, you are losing 40% of your attribution.
                        We install custom Server-Side Tracking (CAPI) using dedicated cloud environments
                        (like Stape or GCP) to push 100% of event match quality back to the platform.
                    </p>
                </div>

                <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                    <h3 className="text-2xl font-display text-white mb-4">Stop Meta Ads Creative Fatigue</h3>
                    <p className="text-foreground-muted mb-4">
                        We systematically test creatives using rigorous Direct Response frameworks.
                        We analyze 3-second hook rates, hold rates, and click-through rates to iterate
                        daily, preventing your ad sets from burning out.
                    </p>
                </div>
            </div>
        </div>
    );
}
