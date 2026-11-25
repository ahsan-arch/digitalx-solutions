"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { MotionProvider } from "./motion-provider";
import type { ReactNode } from "react";

interface FadeInViewProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
}

const EASE_PRECISION: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FadeInView({
  children,
  delay = 0,
  duration = 0.4,
  direction = "up",
  distance = 16,
  className,
  ...rest
}: FadeInViewProps) {
  const offset =
    direction === "up"
      ? { y: distance, x: 0 }
      : direction === "down"
      ? { y: -distance, x: 0 }
      : direction === "left"
      ? { x: distance, y: 0 }
      : direction === "right"
      ? { x: -distance, y: 0 }
      : { x: 0, y: 0 };

  return (
    <MotionProvider>
    <m.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
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
