"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { DigitalXLogo } from "@/components/ui/logo";
import { WaveMesh } from "@/components/ui/wave-mesh";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center px-4 md:px-12 lg:px-24 pt-8 pb-20 bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-neon/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col h-full">

        {/* Top Navigation Row */}
        <nav className="w-full flex items-center justify-between mb-24">
          <Link href="/" className="flex items-center gap-3 group">
            <DigitalXLogo className="h-8 w-auto text-neon" />
            <span className="font-display font-bold text-xl tracking-tight text-white">DigitalX Solutions</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link href="#expertise" className="text-white/80 hover:text-white font-medium text-sm transition-colors">Expertise</Link>
            <Link href="#pricing" className="text-white/80 hover:text-white font-medium text-sm transition-colors">Pricing</Link>
            <Link href="#case-studies" className="text-white/80 hover:text-white font-medium text-sm transition-colors">Case Studies</Link>
            <MagneticButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Start Project
            </MagneticButton>
          </div>
        </nav>

        {/* Two Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-center w-full">

          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start">

            {/* Pill Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="font-bold text-neon tracking-widest text-xs uppercase">
                Performance Digital Agency
              </span>
            </motion.div>

            {/* Massive Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold text-[clamp(2.5rem,5vw,6rem)] leading-[1.05] tracking-tight text-white mb-6 w-full"
            >
              Flawless <span className="text-neon">Automation</span> <br />
              & High-Performance Web
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-white/60 max-w-lg text-lg md:text-xl font-sans leading-relaxed mb-10 w-full"
            >
              Top-tier agency serving the US and Australia. Stop trading hours for outcomes. We engineer elite <strong>n8n workflows</strong>, <strong>GoHighLevel systems</strong>, and custom web applications that scale your operations while you focus on maximum revenue growth.
            </motion.p>

            {/* CTA Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              <MagneticButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Start Project
              </MagneticButton>
              <button
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 px-6 py-3 rounded-stitch border border-white/10 hover:border-white/30 text-white font-medium transition-all"
              >
                View Our Framework
                <span className="text-neon transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Visual Mesh Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 w-full relative aspect-[4/3] rounded-2xl border border-white/5 bg-gradient-to-b from-[#111] to-[#050505] overflow-hidden flex flex-col justify-end p-8 will-change-transform"
          >
            {/* The Animated 3D Wave Mesh */}
            <WaveMesh />

            {/* Inner "Monthly Efficiency" Card overlay */}
            <div className="relative z-10 w-full rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/70 text-sm font-medium">Monthly Efficiency</span>
                <span className="text-neon font-bold text-sm">+245%</span>
              </div>
              {/* Progress Bar Track */}
              <div className="w-full h-2 rounded-full border border-white/5 bg-white/5 overflow-hidden">
                {/* Progress Bar Fill */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  className="h-full bg-neon rounded-full shadow-[0_0_10px_theme(colors.neon.DEFAULT)]"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
