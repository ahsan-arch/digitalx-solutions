"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function ReceptionistSection() {
  return (
    <section className="relative w-full py-24 flex flex-col items-center bg-background">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-acid-purple/20 blur-[100px] rounded-full pointer-events-none opacity-40 mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cobalt/10 blur-[100px] rounded-full pointer-events-none opacity-20 mix-blend-screen" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl font-bold text-white mb-6"
        >
          AI Receptionist &amp; Booking Agent
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-2xl text-acid-purple mb-8"
        >
          We created an AI-powered dentist receptionist and a smart booking agent for salons and clinics. They handle appointments, answer questions, and interact via voice—making your business available 24/7.
        </motion.p>
        <MagneticButton onClick={() => document.getElementById("ai-voice-agents")?.scrollIntoView({ behavior: "smooth" })}>
          Try Voice Demo
        </MagneticButton>
      </div>
    </section>
  );
}
