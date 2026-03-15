import Link from "next/link";

interface RelatedService {
    label: string;
    href: string;
    description: string;
}

const allServices: Record<string, RelatedService> = {
    "web-dev": {
        label: "Web Development",
        href: "/services/web-dev",
        description: "Sub-200ms Next.js websites with SEO-baked architecture",
    },
    "revenue-operations": {
        label: "Revenue Operations",
        href: "/services/revenue-operations",
        description: "GoHighLevel CRM setup, pipeline automation & custom integrations",
    },
    "meta-ads": {
        label: "Meta Ads",
        href: "/services/meta-ads",
        description: "Full-funnel Meta ad systems with server-side CAPI tracking",
    },
    "conversational-ai": {
        label: "Conversational AI",
        href: "/services/conversational-ai",
        description: "AI voice receptionists & WhatsApp chatbots for service businesses",
    },
    "ai-voice-receptionists": {
        label: "AI Voice Receptionists",
        href: "/services/ai-voice-receptionists",
        description: "24/7 AI phone answering, appointment booking & lead qualification",
    },
    "nextjs-development": {
        label: "Next.js Development",
        href: "/services/nextjs-development",
        description: "High-performance Next.js applications with 98+ Lighthouse scores",
    },
    "meta-ads-engineering": {
        label: "Meta Ads Engineering",
        href: "/services/meta-ads-engineering",
        description: "Advanced CAPI tracking, deduplication & attribution engineering",
    },
};

export function RelatedServices({ currentSlug }: { currentSlug: string }) {
    const related = Object.entries(allServices)
        .filter(([key]) => key !== currentSlug)
        .slice(0, 3);

    return (
        <section className="py-16 px-4 md:px-12 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <h2 className="font-display font-bold text-2xl text-white mb-8 tracking-tight">
                    Related Services
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {related.map(([, service]) => (
                        <Link
                            key={service.href}
                            href={service.href}
                            className="p-5 rounded-xl border border-white/5 bg-surface-100/20 hover:bg-surface-100/40 hover:border-cobalt/20 transition-all group"
                        >
                            <div className="text-white font-display font-bold text-sm mb-2 group-hover:text-cobalt transition-colors">
                                {service.label} →
                            </div>
                            <p className="text-white/40 text-xs leading-relaxed">
                                {service.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
