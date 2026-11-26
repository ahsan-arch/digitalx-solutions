"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { MotionProvider } from "./motion-provider";
import type { ReactNode } from "react";

interface FadeUpProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  immediate?: boolean;
  className?: string;
}

const EASE_PRECISION: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * GPU-only (transform + opacity) vertical reveal primitive.
 * When `immediate` is true (hero choreography), runs on mount within 600-800ms.
 * Never wraps the SSR H1 to avoid delaying Largest Contentful Paint.
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.42,
  distance = 14,
  immediate = false,
  className,
  ...rest
}: FadeUpProps) {
  if (immediate) {
    return (
      <MotionProvider>
        <m.div
          initial={{ opacity: 0, y: distance }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay, ease: EASE_PRECISION }}
          className={className}
          {...rest}
        >
          {children}
        </m.div>
      </MotionProvider>
    );
  }

  return (
    <MotionProvider>
      <m.div
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration, delay, ease: EASE_PRECISION }}
        className={className}
        {...rest}
      >
        {children}
      </m.div>
    </MotionProvider>
  );
}
