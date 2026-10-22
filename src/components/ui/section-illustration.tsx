"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type SectionIllustrationProps = {
  src: string;
  alt?: string;
  aspect?: string;
  intensity?: number;
  priority?: boolean;
};

function getDefaultAlt(src: string): string {
  const slug = src.split("/").pop()?.replace(/\.[^/.]+$/, "") || "illustration";
  const map: Record<string, string> = {
    about: "DigitalX Solutions engineering team and enterprise automation architecture",
    au: "DigitalX Solutions Australian operations map for AI voice agents and CRM integrations",
    contact: "Schedule a strategy consultation for AI voice receptionists and workflow automations",
    industries: "Industry specific AI automation playbooks for US and Australian service businesses",
    insights: "Technical insights and ROI benchmarks for AI voice receptionists and automations",
    pricing: "Transparent pricing breakdown for AI voice receptionists, GoHighLevel, and n8n",
    process: "DigitalX 4-phase agile methodology for designing and deploying enterprise automations",
    "meta-ads": "Meta Ads Conversion API CAPI server-side tracking and attribution architecture",
    "web-dev": "Modern high-performance Next.js web application architecture and design",
    solutions: "Comprehensive AI voice agents, CRM integrations, and n8n workflow automations",
    usa: "DigitalX Solutions United States service area map for AI automation and CAPI tracking",
    work: "Enterprise client case studies, verified ROI metrics, and automation results",
  };
  return map[slug] || `DigitalX Solutions ${slug.replace(/-/g, " ")} architectural diagram`;
}

export function SectionIllustration({
  src,
  alt = "",
  aspect = "aspect-[4/3]",
  intensity = 1,
  priority = false,
}: SectionIllustrationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -60 * intensity]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.05 * intensity]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.5]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -100 * intensity]);
  const orbBackY = useTransform(scrollYProgress, [0, 1], [0, 35 * intensity]);

  const resolvedAlt = alt && alt.trim().length > 0 ? alt : getDefaultAlt(src);

  return (
    <div ref={ref} className={`relative w-full ${aspect}`}>
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
      <motion.div style={{ y, scale, opacity }} className="relative h-full w-full">
        <Image
          src={src}
          alt={resolvedAlt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
