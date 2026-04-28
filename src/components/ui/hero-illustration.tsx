"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function HeroIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.5]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbBackY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div ref={ref} className="relative aspect-[4/3] w-full">
      <motion.div
        aria-hidden="true"
        style={{ y: orbBackY }}
        className="pointer-events-none absolute -left-6 top-6 h-24 w-24 rounded-full bg-accent-secondary/15 blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: orbY }}
        className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 rounded-full bg-accent/25 blur-2xl"
      />
      <motion.div
        style={{ y, scale, opacity }}
        className="relative h-full w-full"
      >
        <Image
          src="/hero-illustration.svg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
