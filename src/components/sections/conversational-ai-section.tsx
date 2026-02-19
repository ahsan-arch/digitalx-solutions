"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mic, Zap, Calendar } from "lucide-react";

export const ConversationalAISection = () => {
    return (
        <section className="py-32 bg-background relative overflow-hidden flex flex-col items-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cobalt/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Copy */}
                <div className="relative z-10 order-2 lg:order-1">
                    <h2 className="font-display text-4xl md:text-6xl text-white uppercase mb-6 leading-tight">
                        Ads Bring Traffic. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-cobalt-vivid">
                            AI Closes It.
                        </span>
                    </h2>
                    <p className="text-white/60 text-lg mb-8 max-w-md">
                        Stop losing leads to &quot;I&apos;ll call you back.&quot; Our AI agents qualify, nurture, and book appointments 24/7 via WhatsApp and Voice.
                    </p>
                    <ul className="space-y-4 font-mono text-sm text-white/80">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-acid-green rounded-full shadow-[0_0_10px_theme(colors.acid.green)]" />
                            Instant 24/7 Lead Qualification
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-acid-green rounded-full shadow-[0_0_10px_theme(colors.acid.green)]" />
                            Direct CRM & Calendar Sync
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-acid-green rounded-full shadow-[0_0_10px_theme(colors.acid.green)]" />
                            Human-Like Voice Interactions
                        </li>
                    </ul>
                </div>

                {/* 3D Chat Visualization */}
                <div className="relative z-10 order-1 lg:order-2 perspective-1000 group">
                    <motion.div
                        initial={{ transform: "rotateX(20deg) rotateY(-20deg) rotateZ(5deg)" }}
                        whileHover={{ transform: "rotateX(10deg) rotateY(-10deg) rotateZ(0deg)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full aspect-[4/3] bg-surface-100 border border-white/10 rounded-xl p-6 shadow-2xl relative preserve-3d"
                    >
                        {/* Floating Elements */}
                        <div className="absolute -top-8 -right-8 bg-surface-200 border border-white/10 p-4 rounded-lg shadow-xl" style={{ transform: "translateZ(60px)" }}>
                            <div className="flex items-center gap-3 mb-2">
                                <MessageSquare className="w-5 h-5 text-acid-green" />
                                <span className="text-xs uppercase text-white/40 tracking-wider">Response Time</span>
                            </div>
                            <div className="text-2xl font-mono text-white font-bold">&lt; 2s</div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 bg-surface-200 border border-white/10 p-4 rounded-lg shadow-xl" style={{ transform: "translateZ(40px)" }}>
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar className="w-5 h-5 text-cobalt" />
                                <span className="text-xs uppercase text-white/40 tracking-wider">Bookings</span>
                            </div>
                            <div className="text-2xl font-mono text-white font-bold">+45%</div>
                        </div>

                        {/* Chat UI Mockup */}
                        <div className="h-full w-full bg-surface-300/30 rounded border border-white/5 overflow-hidden flex flex-col p-4 relative">
                            {/* Header */}
                            <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-cobalt flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">AI Assistant</div>
                                    <div className="text-xs text-acid-green flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-acid-green animate-pulse" />
                                        Online
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex flex-col gap-3 font-mono text-xs">
                                <div className="bg-surface-200 self-start p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[85%] border border-white/5 text-white/80">
                                    Hey! I noticed you were looking at our growth plans. Do you have any questions?
                                </div>
                                <div className="bg-cobalt/20 self-end p-3 rounded-tl-lg rounded-bl-lg rounded-br-lg max-w-[85%] border border-cobalt/20 text-white">
                                    Yes, I&apos;m interested in the enterprise tier.
                                </div>
                                <div className="bg-surface-200 self-start p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[85%] border border-white/5 text-white/80">
                                    Great choice. I can schedule a demo for you right now. How does Tuesday at 2 PM sound?
                                </div>
                                {/* Typing indicator */}
                                <div className="self-end flex gap-1 items-center p-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cobalt animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-cobalt animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <div className="w-1.5 h-1.5 rounded-full bg-cobalt animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
