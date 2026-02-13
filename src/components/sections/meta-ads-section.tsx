"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, MousePointerClick, DollarSign } from "lucide-react";

export const MetaAdsSection = () => {
    return (
        <section className="py-32 bg-background relative overflow-hidden flex flex-col items-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cobalt/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Copy */}
                <div className="relative z-10 order-2 lg:order-1">
                    <h2 className="font-display text-4xl md:text-6xl text-white uppercase mb-6 leading-tight">
                        Stop Burning <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-cobalt-vivid">
                            Budget.
                        </span>
                    </h2>
                    <p className="text-white/60 text-lg mb-8 max-w-md">
                        We don&apos;t rely on &quot;interest targeting.&quot; We build server-side signal loops
                        that feed high-value conversion data back to the pixel.
                    </p>
                    <ul className="space-y-4 font-mono text-sm text-white/80">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-acid-green rounded-full shadow-[0_0_10px_theme(colors.acid.green)]" />
                            Server-Side CAPI Integration
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-acid-green rounded-full shadow-[0_0_10px_theme(colors.acid.green)]" />
                            Offline Conversion Tracking
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-acid-green rounded-full shadow-[0_0_10px_theme(colors.acid.green)]" />
                            Creative Testing Matrix
                        </li>
                    </ul>
                </div>

                {/* 3D Dashboard Visualization */}
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
                                <TrendingUp className="w-5 h-5 text-acid-green" />
                                <span className="text-xs uppercase text-white/40 tracking-wider">ROAS</span>
                            </div>
                            <div className="text-2xl font-mono text-white font-bold">4.82x</div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 bg-surface-200 border border-white/10 p-4 rounded-lg shadow-xl" style={{ transform: "translateZ(40px)" }}>
                            <div className="flex items-center gap-3 mb-2">
                                <DollarSign className="w-5 h-5 text-cobalt" />
                                <span className="text-xs uppercase text-white/40 tracking-wider">CPA</span>
                            </div>
                            <div className="text-2xl font-mono text-white font-bold">$18.40</div>
                        </div>

                        {/* Main Dashboard UI Mockup */}
                        <div className="h-full w-full bg-surface-300/30 rounded border border-white/5 overflow-hidden flex flex-col">
                            <div className="h-8 bg-surface-300 border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                            </div>
                            <div className="p-4 grid grid-cols-2 gap-4">
                                <div className="h-24 bg-cobalt/10 rounded border border-cobalt/20" />
                                <div className="h-24 bg-white/5 rounded" />
                                <div className="h-24 bg-white/5 rounded col-span-2" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
