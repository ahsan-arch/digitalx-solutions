"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { DigitalXLogo } from "@/components/ui/logo";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center px-4 md:px-12 bg-background">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cobalt/20 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-acid-purple/10 blur-[120px] rounded-full pointer-events-none opacity-30 mix-blend-screen" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-4 mb-8"
        >
          <DigitalXLogo className="h-8 w-auto text-white" />
          <div className="h-[1px] w-12 bg-cobalt" />
          <span className="font-mono text-cobalt tracking-widest text-sm uppercase">
            Est. 2024 — DigitalX Solutions
          </span>
        </motion.div>

        {/* Massive Headline */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-bold text-[clamp(3rem,12vw,12rem)] leading-[0.85] tracking-tighter text-white uppercase"
            role="presentation"
          >
            We Build
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-baseline gap-4"
          >
            <h1 className="font-display font-bold text-[clamp(3rem,12vw,12rem)] leading-[0.85] tracking-tighter text-white uppercase">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-cobalt to-cobalt-vivid">Performs</span>
            </h1>
          </motion.div>
        </div>

        {/* Description & CTA */}
        <div className="mt-12 flex flex-col md:flex-row gap-12 items-start md:items-end justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white/60 max-w-xl text-lg md:text-xl font-sans leading-relaxed"
          >
            Stop settling for generic templates. We engineer high-performance <span className="text-white">Web Development</span> and <span className="text-white">Meta Ads</span> campaigns
            that capture attention and force conversion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <MagneticButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Start Project
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
