import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata(
    "/services/ai-voice-receptionists",
    {
        title: "AI Voice Receptionist & Booking Agent | DigitalX Solutions",
        description:
            "24/7 AI voice booking systems for dental clinics, salons, and gyms. Custom inbound conversational AI agents serving the USA & Australia.",
    }
);

export default function AIVoiceReceptionistsPage() {
    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                <h1 className="text-5xl font-display font-medium mb-6 uppercase tracking-tight text-white">
                    <span className="text-acid">Conversational AI</span> Agency
                </h1>
                <p className="text-xl text-foreground-muted font-sans font-light leading-relaxed mb-12">
                    Stop missing calls and losing leads. We build custom 24/7 AI voice receptionists
                    that automatically qualify prospects, handle inbound support, and book appointments
                    directly into your calendar.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                    <h3 className="text-2xl font-display text-white mb-4">AI Voice Receptionist for Dental Clinics</h3>
                    <p className="text-foreground-muted mb-4">
                        Missed calls equal missed revenue. Our specialized AI booking agents can handle
                        patient inquiries, answer FAQs about insurance and procedures, and schedule
                        cleanings seamlessly.
                    </p>
                </div>

                <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                    <h3 className="text-2xl font-display text-white mb-4">AI Booking Agent for Salons and Gyms</h3>
                    <p className="text-foreground-muted mb-4">
                        We integrate inbound AI voice agents with your existing booking software
                        (like Mindbody or Boulevard). The AI handles the front desk 24 hours a day
                        so your staff can focus on the client in front of them.
                    </p>
                </div>
            </div>
        </div>
    );
}
