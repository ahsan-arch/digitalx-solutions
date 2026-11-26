"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Dark-mode glassmorphic container with subtle cyan cursor-tracking radial spotlight.
 * Updates CSS custom properties directly on ref.current.style (zero React re-renders)
 * and remains inert on coarse touch pointers.
 */
export function SpotlightCard({
  children,
  className,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group/spot relative overflow-hidden transition-colors duration-200 hover:border-cyan-400/35",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(56, 189, 248, 0.14), transparent 70%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
