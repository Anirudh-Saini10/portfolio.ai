"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare, Wrench } from "lucide-react";
import { BUILDING_NOW } from "@/lib/projects";
import { SectionHeader } from "./SectionHeader";

export function BuildingNow() {
  const p = BUILDING_NOW;

  const askAboutThis = () => {
    window.dispatchEvent(
      new CustomEvent("portfolio:ask", {
        detail: { slug: p.slug, name: p.name },
      })
    );
  };

  return (
    <section id="building" className="scroll-mt-24">
      <SectionHeader
        index="04"
        eyebrow="BUILDING NOW · IN PROGRESS"
        title={
          <>
            What I'm{" "}
            <span className="font-serif italic text-cyber-purple">
              currently building
            </span>
          </>
        }
        description="An in-flight product. Active development — not a stub, not abandoned."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-cyber-purple/30 bg-cyber-card/40 p-6 sm:p-10"
      >
        {/* Animated gradient corner */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyber-purple/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-1 w-full overflow-hidden">
          <motion.div
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyber-purple to-transparent"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-purple/50 bg-cyber-purple/15 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cyber-purple">
                <Wrench className="h-3 w-3" /> Active Build
              </span>
              <span className="tag">{p.category}</span>
              <span className="tag">{p.year}</span>
              <BuildPing />
            </div>

            <h3 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {p.name}
            </h3>
            <p className="mt-2 text-lg text-cyber-purple/90">{p.tagline}</p>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-300">
              {p.description}
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {(p.bullets ?? []).map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-zinc-300"
                >
                  <span className="mt-2 h-1 w-3 flex-shrink-0 bg-gradient-to-r from-cyber-purple to-cyber-pink" />
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
                  className="inline-flex items-center gap-2 rounded-full bg-cyber-purple px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-glow-purple transition hover:scale-[1.02]"
                >
                  Visit Landing <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <button
                onClick={askAboutThis}
                className="inline-flex items-center gap-2 rounded-full border border-cyber-border bg-white/[0.02] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-zinc-200 transition hover:border-cyber-purple/60 hover:text-cyber-purple"
              >
                <MessageSquare className="h-4 w-4" />
                Ask the AI
              </button>
            </div>
          </div>

          {/* Build log style panel */}
          <div className="relative">
            <div className="rounded-2xl border border-cyber-purple/20 bg-black/60 p-5 font-mono text-[12px] text-zinc-400">
              <div className="flex items-center justify-between border-b border-cyber-border pb-2">
                <span className="text-cyber-purple/90">build.log · petpal</span>
                <span className="text-zinc-600">live</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {[
                  ["+", "pet twin schema", "shipped"],
                  ["+", "claude triage chain", "shipped"],
                  ["~", "emotional memory layer", "in progress"],
                  ["~", "personalized shopping", "in progress"],
                  ["·", "community feed", "queued"],
                  ["·", "iOS shell", "queued"],
                ].map(([sym, item, status], i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between"
                  >
                    <span>
                      <span
                        className={`mr-3 ${
                          sym === "+"
                            ? "text-cyber-cyan"
                            : sym === "~"
                            ? "text-amber-400"
                            : "text-zinc-600"
                        }`}
                      >
                        {sym}
                      </span>
                      {item}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.15em] ${
                        status === "shipped"
                          ? "text-cyber-cyan"
                          : status === "in progress"
                          ? "text-amber-400"
                          : "text-zinc-600"
                      }`}
                    >
                      {status}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function BuildPing() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-pink opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-pink" />
      </span>
      shipping continuously
    </span>
  );
}
