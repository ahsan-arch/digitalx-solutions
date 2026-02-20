"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

const growthPackages = [
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
            { name: "Deployment (Vercel, Netlify)", included: true },
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
            { name: "Deployment (Vercel, Netlify)", included: true },
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
            { name: "Deployment (Vercel, Netlify)", included: true },
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

const automationPackages = [
    {
        name: "Simple Automation",
        price: "$1,500+",
        description: "Basic routing & CRM sync",
        features: [
            { name: "One-time Build Fee", included: true },
            { name: "Basic lead routing workflows", included: true },
            { name: "GoHighLevel pipeline sync", included: true },
            { name: "n8n Cloud Execution", included: true },
            { name: "Standard Retainer (Optional)", value: "$2.5k/mo", included: false },
            { name: "Custom API Integrations", included: false },
            { name: "Financial tool sync", included: false },
            { name: "Custom AI Agents", included: false },
            { name: "Self-Hosted Privacy", included: false },
        ],
    },
    {
        name: "Intermediate RevOps",
        popular: true,
        price: "$5,000+",
        description: "Multi-tool data normalization",
        features: [
            { name: "One-time Build Fee", included: true },
            { name: "Advanced lead routing workflows", included: true },
            { name: "GoHighLevel & CRM pipeline sync", included: true },
            { name: "Custom API Integrations", included: true },
            { name: "Financial tool sync (QuickBooks, Xero)", included: true },
            { name: "Standard Retainer (Req.)", value: "$2.5k–$5k/mo", included: true },
            { name: "Monitoring & Uptime alerts", included: true },
            { name: "Custom AI Agents", included: false },
            { name: "Deep database syncing", included: false },
        ],
    },
    {
        name: "Enterprise Architecture",
        price: "$25k+",
        description: "Full-scale revenue orchestration",
        features: [
            { name: "One-time Build Fee", included: true },
            { name: "Replaces high-cost SaaS (Gong, Clari)", included: true },
            { name: "Custom AI Agents & Voice bots", included: true },
            { name: "Deep database syncing & normalization", included: true },
            { name: "Self-Hosted Privacy setup", included: true },
            { name: "Advanced Retainer (Req.)", value: "$10k+/mo", included: true },
            { name: "Proactive Revenue Optimization", included: true },
            { name: "Custom Python and Node services", included: true },
            { name: "24/7 Priority Support", included: true },
        ],
    },
];

// ... (imports)
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { TerminalInput } from "@/components/ui/terminal-input";

// ... (packages array)

const formSchema = z.object({
    name: z.string().min(2, "Name_Required"),
    email: z.string().email("Invalid_Email"),
    description: z.string().min(10, "Description_Required"),
});

type FormData = z.infer<typeof formSchema>;

export function PricingSection() {
    const [activeTab, setActiveTab] = useState<"growth" | "automation">("growth");
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const packages = activeTab === "growth" ? growthPackages : automationPackages;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        if (!selectedPlan) return;
        setStatus("submitting");
        try {
            const res = await fetch("/api/pricing-inquiry", {
                method: "POST",
                body: JSON.stringify({
                    ...data,
                    planName: selectedPlan.name,
                    planPrice: selectedPlan.price,
                }),
            });

            if (res.ok) {
                setStatus("success");
                reset();
                // Close modal after 2 seconds on success
                setTimeout(() => {
                    setSelectedPlan(null);
                    setStatus("idle");
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (e) {
            setStatus("error");
        }
    };

    return (
        <section className="py-24 bg-background relative overflow-hidden" id="pricing">
            {/* ... (existing JSX for section header) */}
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                {/* ... (header content) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="font-display text-4xl md:text-5xl text-white uppercase mb-6">
                        Transparent <span className="text-cobalt">Pricing</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg mb-8">
                        Invest in a system, not just a service. All packages include our signature performance architecture.
                    </p>

                    {/* Toggle Switch */}
                    <div className="flex bg-white/5 p-1 rounded-full w-fit mx-auto backdrop-blur-sm border border-white/10 relative z-20">
                        <button
                            onClick={() => setActiveTab("growth")}
                            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "growth" ? "text-white" : "text-white/50 hover:text-white/80"}`}
                        >
                            {activeTab === "growth" && (
                                <motion.div
                                    layoutId="pricingTab"
                                    className="absolute inset-0 bg-cobalt rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            Web & Growth
                        </button>
                        <button
                            onClick={() => setActiveTab("automation")}
                            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "automation" ? "text-white" : "text-white/50 hover:text-white/80"}`}
                        >
                            {activeTab === "automation" && (
                                <motion.div
                                    layoutId="pricingTab"
                                    className="absolute inset-0 bg-cobalt rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            Bespoke Automation Systems
                        </button>
                    </div>
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
                            {/* ... (existing card content) */}
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
                                onClick={() => setSelectedPlan({ name: pkg.name, price: pkg.price })}
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
                {/* ... (footer text) */}
                <div className="mt-12 text-center text-white/40 text-sm space-y-2">
                    <p>Prices in USD. Final quote provided after initial consultation.</p>
                    {activeTab === "automation" && (
                        <p>Automation build fees are one-time. Retainers cover monitoring, API uptime, and workflow adjustments.</p>
                    )}
                </div>
            </div>

            <Modal
                isOpen={!!selectedPlan}
                onClose={() => {
                    setSelectedPlan(null);
                    setStatus("idle");
                    reset();
                }}
                title={`Get Started: ${selectedPlan?.name}`}
            >
                {status === "success" ? (
                    <div className="text-center py-8">
                        <div className="text-acid-green text-xl font-mono mb-4">✓ Request_Sent</div>
                        <p className="text-white/60">Check your email for confirmation.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-1">
                            <TerminalInput
                                label="NAME"
                                {...register("name")}
                                placeholder="Your Name"
                            />
                            {errors.name && <span className="text-red-500 text-xs font-mono">{errors.name.message}</span>}
                        </div>
                        <div className="space-y-1">
                            <TerminalInput
                                label="EMAIL"
                                {...register("email")}
                                placeholder="you@company.com"
                            />
                            {errors.email && <span className="text-red-500 text-xs font-mono">{errors.email.message}</span>}
                        </div>
                        <div className="space-y-1">
                            <TerminalInput
                                label="PROJECT_DETAILS"
                                {...register("description")}
                                placeholder="Tell us about your goals..."
                            />
                            {errors.description && <span className="text-red-500 text-xs font-mono">{errors.description.message}</span>}
                        </div>

                        <MagneticButton className="w-full mt-4">
                            {status === "submitting" ? "Processing..." : "Submit_Request"}
                        </MagneticButton>
                    </form>
                )}
            </Modal>
        </section>
    );
}
