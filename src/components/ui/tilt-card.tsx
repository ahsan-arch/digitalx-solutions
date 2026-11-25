import Link from "next/link";
import type { ReactNode } from "react";
import { SpotlightCard } from "@/components/motion/spotlight-card";

type TiltCardProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/**
 * Elevated interactive card link with subtle hover lift and spotlight sheen.
 * Hover lift is disabled on touch devices via @media(hover:hover).
 */
export function TiltCard({ href, className, children }: TiltCardProps) {
  return (
    <SpotlightCard className={`h-full rounded-2xl transition-all duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-md ${className ?? ""}`}>
      <Link
        href={href}
        className="group block h-full"
      >
        {children}
      </Link>
    </SpotlightCard>
  );
}
