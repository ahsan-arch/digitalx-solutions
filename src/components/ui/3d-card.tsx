"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState, useCallback } from "react";
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
    const lastMoveRef = useRef(0);

    useEffect(() => {
        setIsTouchDevice(!window.matchMedia("(hover: hover)").matches);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 200, damping: 25 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 25 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (isTouchDevice) return;
            // Throttle to ~30fps — 3D tilt doesn't need 60fps
            const now = performance.now();
            if (now - lastMoveRef.current < 32) return;
            lastMoveRef.current = now;

            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;
            x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
            y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
        },
        [isTouchDevice, x, y]
    );

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

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
                "relative will-change-transform",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
