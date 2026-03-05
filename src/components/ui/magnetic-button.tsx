"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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

    useEffect(() => {
        setIsTouchDevice(!window.matchMedia("(hover: hover)").matches);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        if (isTouchDevice) return;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        const distance = { x: clientX - center.x, y: clientY - center.y };

        x.set(distance.x * 0.35);
        y.set(distance.y * 0.35);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

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
                "relative font-medium text-sm md:text-base px-6 py-3 bg-neon text-background rounded-stitch border border-transparent transition-colors hover:bg-neon-vivid",
                "before:absolute before:inset-0 before:z-[-1] before:bg-neon-vivid before:scale-0 before:transition-transform before:duration-300 before:rounded-stitch hover:before:scale-105",
                className
            )}
        >
            {children}
        </motion.button>
    );
};
