"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Home, Briefcase, Zap, Mail } from "lucide-react";

export const FloatingDock = () => {
    const mouseX = useMotionValue(Infinity);

    const links = [
        { icon: Home, label: "Home", href: "#main" },
        { icon: Zap, label: "Services", href: "#services" },
        { icon: Briefcase, label: "Work", href: "#work" },
        { icon: Mail, label: "Contact", href: "#contact" },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex h-14 md:h-16 gap-3 md:gap-4 items-end rounded-2xl bg-surface-200/50 backdrop-blur-md border border-white/10 px-3 md:px-4 pb-2 md:pb-3"
            >
                {links.map((link) => (
                    <DockIcon key={link.label} mouseX={mouseX} icon={link.icon} href={link.href} />
                ))}
            </motion.div>
        </div>
    );
};

function DockIcon({
    mouseX,
    icon: Icon,
    href,
}: {
    mouseX: any;
    icon: any;
    href: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [36, 64, 36]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.a
            ref={ref}
            href={href}
            style={{ width }}
            className="aspect-square w-9 md:w-10 rounded-full bg-surface-300 flex items-center justify-center hover:bg-cobalt transition-colors"
        >
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </motion.a>
    );
}
