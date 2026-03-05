"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThreeDCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(!window.matchMedia("(hover: hover)").matches);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseXFromCenter = e.clientX - rect.left - width / 2;
            const mouseYFromCenter = e.clientY - rect.top - height / 2;
            x.set(mouseXFromCenter / width);
            y.set(mouseYFromCenter / height);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={
                isTouchDevice
                    ? undefined
                    : {
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }
            }
            className={cn(
                "relative transition-all duration-200 ease-linear will-change-transform",
                className
            )}
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute -inset-4 rounded-xl bg-cobalt/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />
            {children}
        </motion.div>
    );
};
