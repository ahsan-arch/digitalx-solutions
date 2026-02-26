import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata(
    "/services/nextjs-development",
    {
        title: "High-Performance Next.js Development Agency | DigitalX Solutions",
        description:
            "Sub-second Next.js websites engineered for conversion. 100 Lighthouse scores, headless CMS, and SEO-baked architectures for brands in the USA & Australia.",
    }
);

export default function NextjsDevelopmentPage() {
    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                <h1 className="text-5xl font-display font-medium mb-6 uppercase tracking-tight text-white">
                    High-Performance <span className="text-acid">Next.js Development</span>
                </h1>
                <p className="text-xl text-foreground-muted font-sans font-light leading-relaxed mb-12">
                    We engineer sub-second web experiences. If it&apos;s not instant, it&apos;s broken.
                    Stop losing conversions to slow load times. Our brutalist web design and
                    SEO-baked Next.js architectures guarantee a 98+ Lighthouse score.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                    <h3 className="text-2xl font-display text-white mb-4">Improve website load time to under 200ms</h3>
                    <p className="text-foreground-muted mb-4">
                        We don&apos;t use bloated WordPress themes. We build custom Next.js
                        frontends connected to headless CMS solutions. The result?
                        Static-site speeds with dynamic, interactive features.
                    </p>
                </div>

                <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                    <h3 className="text-2xl font-display text-white mb-4">SEO-Baked Architecture</h3>
                    <p className="text-foreground-muted mb-4">
                        Every component is built for search engines first. We implement server-side
                        rendering (SSR), advanced WebGL interactions, and automatic semantic JSON-LD
                        structured data right out of the box.
                    </p>
                </div>
            </div>
        </div>
    );
}
