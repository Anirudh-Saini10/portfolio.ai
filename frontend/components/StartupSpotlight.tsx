"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Crown, Store } from "lucide-react";
import { STARTUP } from "@/lib/projects";
import { SectionHeader } from "./SectionHeader";
import Image from "next/image";

export function StartupSpotlight() {
  return (
    <section id="startup" className="scroll-mt-24">
      <SectionHeader
        index="01"
        eyebrow="CO-FOUNDER · LIVE BUSINESS"
        title={
          <>
            <span className="font-serif italic text-cyber-pink">Litify</span> —
            the startup I co-founded
          </>
        }
        description="Not a side project. A real D2C brand with real customers, fulfillment, and revenue."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-cyber-pink/30 bg-gradient-to-br from-cyber-pink/[0.08] via-cyber-card/60 to-cyber-purple/[0.08] p-8 sm:p-12"
      >
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-cyber-pink/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-cyber-purple/20 blur-3xl" />

        {/* Brand strip */}
        <div className="relative flex items-center justify-between border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-cyber-pink/40 bg-black">
              <Image
                src="/litify-logo.png"
                alt="Litify"
                width={48}
                height={48}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="absolute inset-0 grid place-items-center font-display text-lg font-bold text-cyber-pink">
                L
              </span>
            </div>
            <div>
              <p className="font-display text-xl font-bold tracking-tight text-white">
                {STARTUP.brand}
              </p>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
                litify.shop
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-pink/40 bg-cyber-pink/10 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cyber-pink">
            <Crown className="h-3.5 w-3.5" /> Co-Founder
          </span>
        </div>

        <div className="relative mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <p className="font-serif text-2xl italic leading-snug text-white sm:text-3xl">
              "{STARTUP.pitch}"
            </p>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-300">
              {STARTUP.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {STARTUP.highlights.map((h: string) => (
                <div
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/30 p-3 text-sm text-zinc-200"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyber-pink" />
                  {h}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {STARTUP.stack.map((s: string) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={STARTUP.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-pink to-cyber-purple px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_40px_-10px_rgba(255,46,151,0.6)] transition hover:scale-[1.02]"
              >
                <Store className="h-4 w-4" />
                Visit the Store
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {STARTUP.period}
              </span>
            </div>
          </div>

          {/* Right — co-founder card */}
          <div className="relative">
            <div className="rounded-2xl border border-white/5 bg-black/40 p-6">
              <p className="eyebrow">// role</p>
              <p className="mt-2 font-display text-xl font-semibold text-white">
                {STARTUP.role}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/5 bg-white/5">
                <Metric label="Built" value="end-to-end" />
                <Metric label="Lifecycle" value="ideation → ops" />
                <Metric label="Ownership" value="brand + UX + GTM" />
                <Metric label="Status" value="live · iterating" highlight />
              </div>

              <p className="mt-6 text-xs leading-relaxed text-zinc-400">
                The reason this isn't just a portfolio link: I learned that
                shipping is the easy part. Inventory, returns, and conversion
                funnels are where the real engineering of a product happens.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-black/60 px-3 py-3">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </p>
      <p
        className={`mt-1 font-mono text-sm ${
          highlight ? "text-cyber-pink" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
