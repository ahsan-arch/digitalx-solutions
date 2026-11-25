"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/**
 * Scroll-triggered numeric counter that preserves exact SSR text for crawlers
 * and animates cleanly once when entering the viewport.
 */
export function AnimatedCounter({
  value,
  from = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 0.9,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || prefersReducedMotion || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const controls = animate(from, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(latest),
      onComplete: () => setDisplayValue(value),
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, from, value, duration]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString("en-US");

  const finalFormatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-US");

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {prefix}
        {finalFormatted}
        {suffix}
      </span>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
