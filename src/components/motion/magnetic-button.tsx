"use client";

import { useRef, type ReactNode } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { MotionProvider } from "./motion-provider";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Tactile spring-damped wrapper for primary actions. Animates strictly via GPU transforms,
 * ignores coarse touch pointers, and degrades gracefully under prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.2,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 24 });
  const y = useSpring(rawY, { stiffness: 320, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    rawX.set(offsetX);
    rawY.set(offsetY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <MotionProvider>
      <m.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        style={{ x, y }}
        className={cn("inline-flex", className)}
      >
        {children}
      </m.div>
    </MotionProvider>
  );
}
