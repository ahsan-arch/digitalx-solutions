"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

const packages = [
    {
        name: "Basic",
        price: "$270",
        description: "Quick professional launch",
        features: [
            { name: "Fully functional Next.js Website", included: true },
            { name: "< 200ms loading & 98+ Lighthouse score", included: true },
            { name: "Mobile responsive + SEO-ready architecture", included: true },
            { name: "Basic Meta Pixel + Server-side CAPI setup", included: true },
            { name: "Google Analytics 4 + event tracking", included: true },
            { name: "Deployment (Vercel/Netlify)", included: true },
            { name: "Advanced on-page SEO + Schema markup", included: false },
            { name: "Full Meta CAPI events + Retargeting matrix", included: false },
            { name: "Creative testing structure + Ad account setup", included: false },
            { name: "Headless CMS integration", included: false },
            { name: "Performance creative", value: "No", included: false },
            { name: "Full-funnel Meta ads engineering", included: false },
            { name: "Revenue Ops: CRM + Automation", included: false },
            { name: "Post-launch support", included: false },
            { name: "Revisions", value: "2", included: true },
        ],
    },
    {
        name: "Standard",
        popular: true,
        price: "$640",
        description: "Serious traffic & conversion growth",
        features: [
            { name: "Fully functional Next.js Website", included: true },
            { name: "< 200ms loading & 98+ Lighthouse score", included: true },
            { name: "Mobile responsive + SEO-ready architecture", included: true },
            { name: "Basic Meta Pixel + Server-side CAPI setup", included: true },
            { name: "Google Analytics 4 + event tracking", included: true },
            { name: "Deployment (Vercel/Netlify)", included: true },
            { name: "Advanced on-page SEO + Schema markup", included: true },
            { name: "Full Meta CAPI events + Retargeting matrix", included: true },
            { name: "Creative testing structure + Ad account setup", included: true },
            { name: "Headless CMS integration", included: true },
            { name: "Performance creative", value: "5 ideas", included: true },
            { name: "Full-funnel Meta ads engineering", included: false },
            { name: "Revenue Ops: CRM + Automation", included: false },
            { name: "Post-launch support", included: false },
            { name: "Revisions", value: "3–4", included: true },
        ],
    },
    {
        name: "Premium",
        price: "$1,360",
        description: "Complete growth engine + automation",
        features: [
            { name: "Fully functional Next.js Website", included: true },
            { name: "< 200ms loading & 98+ Lighthouse score", included: true },
            { name: "Mobile responsive + SEO-ready architecture", included: true },
            { name: "Basic Meta Pixel + Server-side CAPI setup", included: true },
            { name: "Google Analytics 4 + event tracking", included: true },
            { name: "Deployment (Vercel/Netlify)", included: true },
            { name: "Advanced on-page SEO + Schema markup", included: true },
            { name: "Full Meta CAPI events + Retargeting matrix", included: true },
            { name: "Creative testing structure + Ad account setup", included: true },
            { name: "Headless CMS integration", included: true },
            { name: "Performance creative", value: "8–10 concepts", included: true },
            { name: "Full-funnel Meta ads engineering", included: true },
            { name: "Revenue Ops: CRM + Automation", included: true },
            { name: "Post-launch support", value: "1 month", included: true },
            { name: "Revisions", value: "Unlimited", included: true },
        ],
    },
];

export function PricingSection() {
    return (
        <section className="py-24 bg-background relative overflow-hidden" id="pricing">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="font-display text-4xl md:text-5xl text-white uppercase mb-6">
                        Transparent <span className="text-cobalt">Pricing</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg">
                        Invest in a system, not just a service. All packages include our signature performance architecture.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl border ${pkg.popular
                                    ? "border-cobalt bg-white/5"
                                    : "border-white/10 bg-white/[0.02]"
                                } flex flex-col`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cobalt text-white px-4 py-1 rounded-full text-sm font-medium uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-display uppercase tracking-wider text-white mb-2">
                                    {pkg.name}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl md:text-5xl font-bold text-white">
                                        {pkg.price}
                                    </span>
                                    <span className="text-white/40 text-sm">USD</span>
                                </div>
                                <p className="text-white/60 text-sm h-10">{pkg.description}</p>
                            </div>

                            <div className="flex-grow space-y-4 mb-8">
                                {pkg.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        {feature.included ? (
                                            <Check className="w-5 h-5 text-cobalt shrink-0 mt-0.5" />
                                        ) : (
                                            <X className="w-5 h-5 text-white/20 shrink-0 mt-0.5" />
                                        )}
                                        <span
                                            className={`text-sm ${feature.included ? "text-white/80" : "text-white/30"
                                                }`}
                                        >
                                            {feature.name}
                                            {feature.value && (
                                                <span className="text-white ml-1 font-medium">
                                                    ({feature.value})
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <MagneticButton
                                className={`w-full py-4 rounded-full font-medium transition-colors ${pkg.popular
                                        ? "bg-cobalt text-white hover:bg-cobalt/90"
                                        : "bg-white/10 text-white hover:bg-white/20"
                                    }`}
                            >
                                Get Started
                            </MagneticButton>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-white/40 text-sm">
                        Prices in USD. Final quote provided after initial consultation.
                    </p>
                </div>
            </div>
        </section>
    );
}
