"use client";

import { m, type Variants } from "framer-motion";
import { MotionProvider } from "./motion-provider";
import type { ReactNode } from "react";

const EASE_PRECISION: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  /** When true (e.g. inside an AnimatePresence tab switch), animates immediately instead of waiting for viewport scroll */
  immediate?: boolean;
}

export function StaggerGroup({
  children,
  className,
  staggerDelay = 0.06,
  delayChildren = 0,
  immediate = false,
}: StaggerGroupProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  if (immediate) {
    return (
      <MotionProvider>
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {children}
      </m.div>
      </MotionProvider>
    );
  }

  return (
    <MotionProvider>
    <m.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className={className}
    >
      {children}
    </m.div>
    </MotionProvider>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: EASE_PRECISION,
    },
  },
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <m.div variants={itemVariants} className={className}>
      {children}
    </m.div>
  );
}
