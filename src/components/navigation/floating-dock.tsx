"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Home, Briefcase, Zap, Mail } from "lucide-react";

export const FloatingDock = () => {
    const mouseX = useMotionValue(Infinity);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(!window.matchMedia("(hover: hover)").matches);
    }, []);

    const links = [
        { icon: Home, label: "Home", href: "#main" },
        { icon: Zap, label: "Services", href: "#services" },
        { icon: Briefcase, label: "Work", href: "#work" },
        { icon: Mail, label: "Contact", href: "#contact" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
            <motion.div
                onMouseMove={isTouchDevice ? undefined : (e) => mouseX.set(e.pageX)}
                onMouseLeave={isTouchDevice ? undefined : () => mouseX.set(Infinity)}
                className="flex h-14 md:h-16 gap-3 md:gap-4 items-end rounded-2xl bg-surface-200/50 backdrop-blur-md border border-white/10 px-3 md:px-4 pb-2 md:pb-3 shadow-2xl shadow-black/30"
            >
                {links.map((link) => (
                    <DockIcon
                        key={link.label}
                        mouseX={mouseX}
                        icon={link.icon}
                        href={link.href}
                        isTouchDevice={isTouchDevice}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

function DockIcon({
    mouseX,
    icon: Icon,
    href,
    isTouchDevice,
}: {
    mouseX: any;
    icon: any;
    href: string;
    isTouchDevice: boolean;
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
            style={isTouchDevice ? undefined : { width }}
            whileTap={{ scale: 0.9 }}
            className="aspect-square w-9 md:w-10 rounded-full bg-surface-300 flex items-center justify-center hover:bg-cobalt transition-colors duration-200"
        >
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </motion.a>
    );
}
