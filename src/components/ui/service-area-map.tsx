"use client";

import { motion } from "framer-motion";

export function ServiceAreaMap() {
    return (
        <div className="relative w-full aspect-square md:aspect-[4/3] bg-surface-100 rounded-lg overflow-hidden border border-white/10 opacity-50 hover:opacity-100 transition-opacity duration-500" style={{ contain: "content" }}>
            {/* Abstract Map Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Nodes */}
            <LocationNode x="28%" y="35%" label="NYC" delay={0} />
            <LocationNode x="85%" y="28%" label="SYD" delay={0.3} />

            {/* Connection Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                    d="M224,210 Q450,150 680,168"
                    fill="none"
                    stroke="#0df26c"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </svg>

            <div className="absolute bottom-4 left-4 font-mono text-xs text-cobalt tracking-widest uppercase">
                Network_Active
            </div>
        </div>
    );
}

function LocationNode({ x, y, label, delay }: { x: string; y: string; label: string; delay: number }) {
    return (
        <div className="absolute" style={{ left: x, top: y }}>
            <div className="relative">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay, duration: 0.4 }}
                    className="w-3 h-3 bg-cobalt rounded-full relative z-10"
                />
                {/* CSS-only pulse ring — no JS animation loop */}
                <div className="absolute inset-0 bg-cobalt rounded-full animate-ping opacity-30" style={{ animationDuration: "2.5s" }} />
                <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.2 }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-xs text-white font-bold"
                >
                    {label}
                </motion.span>
            </div>
        </div>
    );
}
