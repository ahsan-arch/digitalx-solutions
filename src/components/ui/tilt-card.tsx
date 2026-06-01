import Link from "next/link";
import type { ReactNode } from "react";

type TiltCardProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/**
 * Card link with a lightweight CSS hover lift. Previously used framer-motion
 * for a pointer-tracked 3D tilt, but that pulled the whole animation library
 * into the homepage critical bundle for a decorative, desktop-only effect.
 * A CSS transform gives a near-identical feel with zero JS and better INP.
 */
export function TiltCard({ href, className, children }: TiltCardProps) {
  return (
    <Link
      href={href}
      className={`${className ?? ""} transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transform-none`}
    >
      {children}
    </Link>
  );
}
