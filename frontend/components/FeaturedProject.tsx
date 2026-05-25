"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare, Star } from "lucide-react";
import { FEATURED_PROJECT } from "@/lib/projects";
import { SectionHeader } from "./SectionHeader";

export function FeaturedProject() {
  const p = FEATURED_PROJECT;

  const askAboutThis = () => {
    window.dispatchEvent(
      new CustomEvent("portfolio:ask", {
        detail: { slug: p.slug, name: p.name },
      })
    );
  };

  return (
    <section id="featured" className="scroll-mt-24">
      <SectionHeader
        index="02"
        eyebrow="FEATURED · BEST TECHNICAL BUILD"
        title={
          <>
            The headline build —{" "}
            <span className="font-serif italic text-cyber-cyan">
              real-time CV at scale
            </span>
          </>
        }
        description="The project I'm most proud of. End-to-end computer vision system, deployed and running."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-cyber-border bg-gradient-to-br from-cyber-card/80 via-cyber-darker to-cyber-card/40 p-6 sm:p-10"
      >
        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyber-cyan/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-cyber-purple/20 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          {/* Left — copy */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cyber-cyan">
                <Star className="h-3 w-3 fill-current" /> Featured
              </span>
              <span className="tag">{p.category}</span>
              <span className="tag">{p.year}</span>
            </div>

            <h3 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {p.name}
            </h3>
            <p className="mt-2 text-lg text-cyber-cyan/90">{p.tagline}</p>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-300">
              {p.description}
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {(p.bullets ?? []).map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-zinc-300"
                >
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-gradient-to-r from-cyber-cyan to-cyber-purple" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="live-cta"
                >
                  Live Demo <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <button
                onClick={askAboutThis}
                className="inline-flex items-center gap-2 rounded-full border border-cyber-border bg-white/[0.02] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-zinc-200 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
              >
                <MessageSquare className="h-4 w-4" />
                Ask the AI about it
              </button>
            </div>
          </div>

          {/* Right — visual mock */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-cyber-border bg-gradient-to-br from-black via-cyber-darker to-cyber-purple/20">
              {/* Faux CV HUD */}
              <div className="absolute inset-0 p-5 font-mono text-[10.5px] text-cyber-cyan/80">
                <div className="flex items-center justify-between">
                  <span>● PROCTOR · LIVE</span>
                  <span>SESSION 04A2-19F</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-1.5">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 rounded-full bg-cyber-cyan/30"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: (i % 8) * 0.1,
                      }}
                    />
                  ))}
                </div>

                <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="h-full w-full rounded-full border border-dashed border-cyber-cyan/40"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-3 rounded-full border border-cyber-cyan/30"
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                        integrity
                      </p>
                      <p className="mt-0.5 font-display text-3xl font-bold text-white">
                        92
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 space-y-1.5">
                  <RowMetric label="GAZE OFFSET" value="0.18" status="ok" />
                  <RowMetric label="HEAD POSE" value="-3.4°" status="ok" />
                  <RowMetric label="OBJECT (PHONE)" value="0/24f" status="ok" />
                  <RowMetric label="MAR (SPEECH)" value="0.31" status="warn" />
                </div>
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              // visual sketch · live demo above
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function RowMetric({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "ok" | "warn";
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-cyber-border/70 bg-black/50 px-2 py-1">
      <span className="text-[9.5px] tracking-[0.2em] text-zinc-500">{label}</span>
      <span
        className={`text-[10px] ${
          status === "ok" ? "text-cyber-cyan" : "text-amber-400"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
