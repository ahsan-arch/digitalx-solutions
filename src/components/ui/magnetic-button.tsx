"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export const MagneticButton = ({
    children,
    className,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const lastMoveRef = useRef(0);

    useEffect(() => {
        setIsTouchDevice(!window.matchMedia("(hover: hover)").matches);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.1 });

    const handleMouseMove = useCallback(
        ({ clientX, clientY }: React.MouseEvent) => {
            if (isTouchDevice) return;
            // Throttle to ~60fps
            const now = performance.now();
            if (now - lastMoveRef.current < 16) return;
            lastMoveRef.current = now;

            const el = ref.current;
            if (!el) return;
            const { left, top, width, height } = el.getBoundingClientRect();
            x.set((clientX - left - width / 2) * 0.3);
            y.set((clientY - top - height / 2) * 0.3);
        },
        [isTouchDevice, x, y]
    );

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={isTouchDevice ? undefined : { x: mouseX, y: mouseY }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={cn(
                "relative font-medium text-sm md:text-base px-6 py-3 bg-neon text-background rounded-stitch border border-transparent transition-colors hover:bg-neon-vivid will-change-transform",
                className
            )}
        >
            {children}
        </motion.button>
    );
};
