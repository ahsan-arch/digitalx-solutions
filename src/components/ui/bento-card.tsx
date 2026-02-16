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
    delay = 0,
    href,
}: {
    title: string;
    content: string;
    metrics?: string;
    colSpan?: number;
    className?: string;
    delay?: number;
    href?: string;
}) => {
    const CardContent = (
        <div className="relative h-full flex flex-col justify-between">
            {/* Hover Gradient Blob */}
            <div className="absolute -inset-24 bg-cobalt/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className={cn(
                "group relative p-6 md:p-8 bg-surface-100 border border-white/5 transition-all duration-500 overflow-hidden",
                href ? "cursor-pointer hover:border-cobalt/50 hover:bg-surface-200" : "hover:border-white/10",
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
