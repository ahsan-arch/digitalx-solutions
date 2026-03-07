"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import Link from "next/link";

export const BentoCard = ({
    title,
    content,
    metrics,
    colSpan = 1,
    className,
    href,
}: {
    title: string;
    content: string;
    metrics?: string;
    colSpan?: number;
    className?: string;
    href?: string;
}) => {
    const CardContent = (
        <div className="relative h-full flex flex-col justify-between">
            {/* Hover Gradient — subtle border glow via box-shadow handled by parent */}

            <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl uppercase text-foreground mb-4">
                    {title}
                </h3>
                <p className="font-sans text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                    {content}
                </p>
            </div>

            {metrics && (
                <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-xs text-cobalt tracking-widest uppercase">Result</span>
                    <span className="font-display text-xl md:text-2xl text-white">{metrics}</span>
                </div>
            )}
        </div>
    );

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            className={cn(
                "group relative p-6 md:p-8 bg-surface-100 border border-white/5 transition-colors duration-300 overflow-hidden",
                href ? "cursor-pointer hover:border-cobalt/50 hover:bg-surface-200 hover:shadow-[0_0_30px_-10px_rgba(0,106,255,0.15)]" : "hover:border-white/10",
                colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
                colSpan === 3 ? "md:col-span-3" : "",
                className
            )}
        >
            {href ? (
                <Link href={href} className="block h-full">
                    {CardContent}
                </Link>
            ) : (
                CardContent
            )}
        </motion.div>
    );
};
