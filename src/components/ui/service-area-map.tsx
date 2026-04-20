"use client";

import { motion } from "framer-motion";

export function ServiceAreaMap() {
    return (
        <div
            className="relative w-full aspect-square md:aspect-[4/3] bg-surface-sunken rounded-lg overflow-hidden border border-line-subtle"
            style={{ contain: "content" }}
        >
            {/* Abstract grid backdrop */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        `linear-gradient(to right, rgb(var(--ink-tertiary) / 0.10) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink-tertiary) / 0.10) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Location nodes */}
            <LocationNode x="28%" y="35%" label="NYC" delay={0} />
            <LocationNode x="85%" y="28%" label="SYD" delay={0.3} />

            {/* Connection line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                    d="M224,210 Q450,150 680,168"
                    fill="none"
                    stroke="rgb(var(--accent-primary))"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.75 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </svg>

            <div className="absolute bottom-4 left-4 font-mono text-overline text-ink-secondary">
                Network active
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
                    className="w-3 h-3 bg-accent rounded-full relative z-10"
                />
                <div
                    className="absolute inset-0 bg-accent rounded-full animate-ping opacity-40"
                    style={{ animationDuration: "2.5s" }}
                />
                <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.2 }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-caption text-ink-primary font-semibold"
                >
                    {label}
                </motion.span>
            </div>
        </div>
    );
}
