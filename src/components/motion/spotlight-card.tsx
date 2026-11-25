import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Quiet editorial raised surface card with clean hairline border step on hover.
 * Replaces glowing radial gradient washes so cards read calmly without AI-slop shine.
 */
export function SpotlightCard({
  children,
  className,
}: SpotlightCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden transition-colors duration-200 hover:border-border-strong",
        className
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
