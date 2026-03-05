import { Metadata } from "next";
import { generatePageMetadata, generateBreadcrumbSchema, generateServicePageSchema, siteConfig } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact-section";
import { SubPageLayout } from "@/components/layout";

export const metadata: Metadata = generatePageMetadata(
    "/services/ai-voice-receptionists",
    {
        title: "AI Voice Receptionist & Booking Agent | DigitalX Solutions",
        description:
            "24/7 AI voice booking systems for dental clinics, salons, and gyms. Custom inbound conversational AI agents serving the USA & Australia.",
    }
);

export default function AIVoiceReceptionistsPage() {
    const serviceSchema = generateServicePageSchema({
        name: "AI Voice Receptionist & Booking Agent",
        description: "24/7 AI voice booking systems for dental clinics, salons, and gyms.",
        url: `${siteConfig.domain}/services/ai-voice-receptionists`,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteConfig.domain },
        { name: "Services", url: `${siteConfig.domain}/services` },
        { name: "AI Voice Receptionists", url: `${siteConfig.domain}/services/ai-voice-receptionists` },
    ]);

    return (
        <SubPageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Hero */}
            <section className="relative py-24 overflow-hidden border-b border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cobalt/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 md:px-12 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[1px] w-8 bg-cobalt/50" />
                        <span className="font-mono text-xs text-cobalt/70 uppercase tracking-widest">
                            Voice AI Agents
                        </span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white uppercase mb-6 leading-tight">
                        <span className="text-cobalt">Conversational AI</span> Agency
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                        Stop missing calls and losing leads. We build custom 24/7 AI voice receptionists
                        that automatically qualify prospects, handle inbound support, and book appointments
                        directly into your calendar.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border border-white/10 rounded-2xl bg-surface-100 hover:border-cobalt/30 transition-colors duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-neon shadow-[0_0_8px_theme(colors.neon.DEFAULT)]" />
                                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Dental</span>
                            </div>
                            <h3 className="text-2xl font-display text-white mb-4">AI Voice Receptionist for Dental Clinics</h3>
                            <p className="text-white/60 leading-relaxed">
                                Missed calls equal missed revenue. Our specialized AI booking agents can handle
                                patient inquiries, answer FAQs about insurance and procedures, and schedule
                                cleanings seamlessly.
                            </p>
                        </div>

                        <div className="p-8 border border-white/10 rounded-2xl bg-surface-100 hover:border-cobalt/30 transition-colors duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-neon shadow-[0_0_8px_theme(colors.neon.DEFAULT)]" />
                                <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Salon & Gym</span>
                            </div>
                            <h3 className="text-2xl font-display text-white mb-4">AI Booking Agent for Salons and Gyms</h3>
                            <p className="text-white/60 leading-relaxed">
                                We integrate inbound AI voice agents with your existing booking software
                                (like Mindbody or Boulevard). The AI handles the front desk 24 hours a day
                                so your staff can focus on the client in front of them.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ContactSection />
        </SubPageLayout>
    );
}
