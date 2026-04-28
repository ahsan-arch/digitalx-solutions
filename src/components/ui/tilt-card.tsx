"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

type TiltCardProps = {
  href: string;
  className?: string;
  children: ReactNode;
  maxTilt?: number;
};

export function TiltCard({ href, className, children, maxTilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 18, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="relative"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
