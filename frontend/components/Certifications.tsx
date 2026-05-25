"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Brain, Cpu, GraduationCap, Trophy } from "lucide-react";
import { CERTIFICATIONS, type Certification } from "@/lib/certifications";
import { SectionHeader } from "./SectionHeader";

const ICONS: Record<Certification["category"], typeof Award> = {
  ML: Brain,
  DL: Cpu,
  GenAI: BookOpen,
  RAG: BookOpen,
  Algorithms: GraduationCap,
  Award: Trophy,
};

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24">
      <SectionHeader
        index="05"
        eyebrow="CREDENTIALS · CONTINUOUSLY LEARNING"
        title={
          <>
            Certifications &{" "}
            <span className="font-serif italic text-cyber-cyan">awards</span>
          </>
        }
        description="Stanford, IIT Madras, IIT Ropar, IBM, DeepLearning.AI — and university honors."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((c, i) => {
          const Icon = ICONS[c.category];
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.45,
                delay: (i % 6) * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="card group relative overflow-hidden rounded-xl border border-cyber-border bg-cyber-card/50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg border border-cyber-border bg-black/40 text-cyber-cyan transition group-hover:border-cyber-cyan/50">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px] font-semibold leading-snug text-white">
                    {c.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                    {c.issuer}
                  </p>
                  {c.detail && (
                    <p className="mt-2 inline-flex items-center gap-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 px-2 py-0.5 text-[10.5px] text-cyber-cyan">
                      {c.detail}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
