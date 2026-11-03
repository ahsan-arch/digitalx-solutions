import Link from "next/link";
import type { ReactNode } from "react";

type TiltCardProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/**
 * Card link with a clean surface highlight transition.
 * Replaced bouncy translateY shifts with deliberate border and background transitions.
 */
export function TiltCard({ href, className, children }: TiltCardProps) {
  return (
    <Link
      href={href}
      className={`group block transition-colors duration-150 ease-out ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
