"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Play, Pause, Volume2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

/* ── Audio Demo Data ── */
const demos = [
    {
        id: "dentist",
        label: "Listen to AI Dentist Demo",
        industry: "Dental Clinic",
        src: "/demos/dentist-demo.mp3", // ← Drop your file here
    },
    {
        id: "salon",
        label: "Listen to Salon Booking Demo",
        industry: "Hair Salon",
        src: "/demos/salon-demo.mp3", // ← Drop your file here
    },
];

/* ── Industry Use Cases ── */
const useCases = [
    {
        icon: "🦷",
        title: "Dental Clinics",
        description:
            "Automate appointment scheduling, insurance verification, and patient follow ups 24/7.",
        glow: "from-cobalt to-cobalt-vivid",
    },
    {
        icon: "✂️",
        title: "Salons & Spas",
        description:
            "Handle bookings, reschedules, and service inquiries without a front desk.",
        glow: "from-acid-purple to-cobalt",
    },
    {
        icon: "🏋️",
        title: "Gyms & Studios",
        description:
            "Manage class bookings, membership inquiries, and trial sign-ups autonomously.",
        glow: "from-acid-green/80 to-cobalt",
    },
    {
        icon: "🏥",
        title: "Medical Clinics",
        description:
            "Qualify patients, schedule consultations, and handle prescription refill requests.",
        glow: "from-cobalt-vivid to-acid-purple",
    },
];

/* ── Animated Waveform Bar ── */
function WaveBar({ index, isPlaying }: { index: number; isPlaying: boolean }) {
    const seed = ((index * 7 + 3) % 13) / 13;
    const seed2 = ((index * 11 + 5) % 17) / 17;
    return (
        <motion.div
            className="w-1 rounded-full bg-gradient-to-t from-cobalt to-cobalt-vivid will-change-[height]"
            animate={
                isPlaying
                    ? {
                        height: [8, 20 + seed * 16, 6, 24 + seed2 * 12, 10],
                    }
                    : { height: 6 }
            }
            transition={
                isPlaying
                    ? {
                        duration: 0.8 + seed * 0.4,
                        repeat: Infinity,
                        repeatType: "mirror" as const,
                        delay: index * 0.04,
                        ease: "linear",
                    }
                    : { duration: 0.2 }
            }
        />
    );
}

/* ── Voice Demo Card ── */
function VoiceDemoCard({
    demo,
}: {
    demo: (typeof demos)[number];
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = useCallback(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {
                /* file not found — waveform still animates for visual demo */
            });
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const handleEnded = useCallback(() => setIsPlaying(false), []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
        >
            <div className="relative bg-surface-100 border border-white/10 rounded-xl p-6 overflow-hidden hover:border-cobalt/30 transition-colors duration-500">
                {/* Ambient glow */}
                <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[40px] pointer-events-none transition-opacity duration-500 ${isPlaying ? "opacity-30" : "opacity-0 group-hover:opacity-15"
                        } bg-cobalt`}
                />

                {/* Terminal-style header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-acid-green shadow-[0_0_8px_theme(colors.acid.green)]" />
                    <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                        {demo.industry} | Voice Agent
                    </span>
                </div>

                {/* Waveform Visualizer */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={togglePlay}
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaying
                            ? "bg-cobalt shadow-lg shadow-cobalt/40"
                            : "bg-surface-300 hover:bg-cobalt/20 border border-white/10"
                            }`}
                        aria-label={isPlaying ? "Pause demo" : "Play demo"}
                    >
                        <AnimatePresence mode="wait">
                            {isPlaying ? (
                                <motion.div
                                    key="pause"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                >
                                    <Pause size={18} className="text-white" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="play"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                >
                                    <Play size={18} className="text-white ml-0.5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Waveform */}
                    <div className="flex-1 flex items-center justify-center gap-[3px] h-10">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <WaveBar key={i} index={i} isPlaying={isPlaying} />
                        ))}
                    </div>

                    <Volume2
                        size={16}
                        className={`flex-shrink-0 transition-colors duration-300 ${isPlaying ? "text-cobalt" : "text-white/20"
                            }`}
                    />
                </div>

                {/* Label */}
                <p className="text-sm text-white/70 font-sans">{demo.label}</p>

                {/* Hidden audio element */}
                <audio ref={audioRef} src={demo.src} onEnded={handleEnded} preload="none" />
            </div>
        </motion.div>
    );
}

/* ── Main Section ── */
export function ConversationalAISection() {
    return (
        <section
            id="ai-voice-agents"
            className="py-32 bg-background relative overflow-hidden"
        >
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-cobalt/8 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-acid-purple/6 blur-[80px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-20"
                >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-6">
                        <Phone size={16} className="text-cobalt" />
                        <div className="h-[1px] w-8 bg-cobalt/50" />
                        <span className="font-mono text-xs text-cobalt/70 uppercase tracking-widest">
                            AI Voice Agents
                        </span>
                    </div>

                    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white uppercase leading-[0.95] mb-6">
                        Never Miss a Lead Again.{" "}
                        <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-cobalt-vivid">
                            Deploy 24/7 AI Voice Receptionists.
                        </span>
                    </h2>

                    <p className="text-white/50 max-w-3xl text-lg md:text-xl leading-relaxed">
                        Custom engineered AI voice agents that sound completely human.
                        Perfect for Dentist Clinics, Hair Salons, Gyms, and Medical
                        Practices. They answer calls, qualify leads, and book slots directly
                        into your calendar without human intervention.
                    </p>
                </motion.div>

                {/* ── Interactive Voice Demo Cards ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-24"
                >
                    <h3 className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">
                        {"// hear the difference"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {demos.map((demo) => (
                            <VoiceDemoCard key={demo.id} demo={demo} />
                        ))}
                    </div>
                </motion.div>

                {/* ── Use Case Grid ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-16"
                >
                    <h3 className="font-mono text-xs text-white/30 uppercase tracking-widest mb-8">
                        {"// industries we serve"}
                    </h3>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.08 } },
                        }}
                    >
                        {useCases.map((uc) => (
                            <motion.div
                                key={uc.title}
                                variants={{
                                    hidden: { opacity: 0, y: 16 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                                }}
                                className="group relative bg-surface-100 border border-white/[0.06] rounded-xl p-6 hover:border-white/15 transition-colors duration-300 overflow-hidden"
                            >
                                {/* Hover glow — simple gradient overlay */}
                                <div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 bg-gradient-to-br ${uc.glow} pointer-events-none`}
                                />

                                {/* Icon */}
                                <div className="text-3xl mb-4 relative z-10">{uc.icon}</div>

                                {/* Title */}
                                <h4 className="font-display text-lg text-white uppercase mb-2 relative z-10">
                                    {uc.title}
                                </h4>

                                {/* Description */}
                                <p className="text-sm text-white/40 leading-relaxed relative z-10">
                                    {uc.description}
                                </p>

                                {/* Status indicator */}
                                <div className="flex items-center gap-2 mt-4 relative z-10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-acid-green shadow-[0_0_6px_theme(colors.acid.green)]" />
                                    <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider">
                                        Ready to deploy
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                    <MagneticButton
                        onClick={() =>
                            document
                                .getElementById("contact")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Get Your AI Receptionist
                    </MagneticButton>
                    <p className="font-mono text-xs text-white/25">
                        Custom built. Live in 48 hours. Cancel anytime.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
