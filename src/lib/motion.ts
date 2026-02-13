/**
 * Framer Motion animation presets for Velocity Digital.
 * Import these into components to keep motion consistent.
 */

import type { Variants, Transition } from "framer-motion";

/* ── Easing Curves ── */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuint: [0.86, 0, 0.07, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
};

/* ── Shared Transitions ── */
export const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const smooth: Transition = {
  duration: 0.6,
  ease: ease.outExpo,
};

/* ── Variant Presets ── */

/** Fade up on scroll — the workhorse */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.outExpo },
  },
};

/** Fade in without vertical movement */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: ease.outExpo },
  },
};

/** Stagger children container */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.outExpo },
  },
};

/** Slide in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.outExpo },
  },
};

/** Scale up — good for cards on hover */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: ease.outExpo },
  },
};

/** Reveal a line from left to right (for decorative elements) */
export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: ease.outExpo },
  },
};
