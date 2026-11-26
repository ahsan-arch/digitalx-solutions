"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight fixed top reading progress bar driven by a passive scroll listener
 * updating GPU `transform: scaleX()` directly on `ref.current.style` (zero React
 * re-renders and zero initial Framer Motion bundle cost in the root layout).
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      el.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-brand via-amber-500 to-brand-deep"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
