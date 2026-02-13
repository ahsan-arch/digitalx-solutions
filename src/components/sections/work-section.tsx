"use client";

import { caseStudies } from "@/data/case-studies";
import { ThreeDCard } from "@/components/ui/3d-card";
import { motion } from "framer-motion";

export function WorkSection() {
  return (
    <section id="work" className="py-32 bg-surface-100 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div>
            <h2 className="font-display text-4xl md:text-6xl text-white uppercase mb-6">
              Proven <span className="text-cobalt">Scale</span>
            </h2>
            <p className="text-white/50 max-w-xl text-lg">
              Real numbers. Validated stacks. No fluff.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {caseStudies.map((study, index) => (
            <ThreeDCard key={study.id} className="h-full">
              <div className="h-full bg-surface-200 border border-white/5 p-8 md:p-12 flex flex-col justify-between group-hover:border-cobalt/50 transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-xs text-cobalt bg-cobalt/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {study.industry}
                    </span>
                    <span className="font-mono text-xs text-white/40">
                      {study.client}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl text-white mb-6">
                    {study.challenge}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <p className="text-white/60 font-mono text-sm border-l-2 border-cobalt pl-4">
                      {study.solution}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {study.stack.map(tech => (
                        <span key={tech} className="text-xs text-white/30 bg-white/5 px-2 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  {study.numbers.map((num) => (
                    <div key={num.label}>
                      <div className="font-display text-2xl text-white">{num.value}</div>
                      <div className="font-mono text-[10px] uppercase text-white/40 tracking-wider text-left">{num.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
}
