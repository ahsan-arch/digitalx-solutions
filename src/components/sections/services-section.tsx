"use client";

import { BentoCard } from "@/components/ui/bento-card";
import { services } from "@/data/services";
import { motion } from "framer-motion";

export function ServicesSection() {
  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl text-white uppercase mb-6">
            System <span className="text-cobalt">Architecture</span>
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            We don&apos;t sell &quot;packages&quot;. We build bespoke revenue engines.
            Every component is engineered for speed, scale, and conversion.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {services.map((service) => (
            <BentoCard
              key={service.id}
              title={service.title}
              content={service.description}
              metrics={service.metrics}
              colSpan={service.colSpan}
              href={service.href}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
