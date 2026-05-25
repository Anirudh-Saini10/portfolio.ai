"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, MessageCircle, Sparkles } from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL, ROLLING_TAGS } from "@/lib/projects";

export function Hero() {
  return (
    <section className="relative pt-4">
      {/* Top status bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex w-fit items-center gap-2 rounded-full border border-cyber-border bg-white/[0.02] px-3 py-1.5 backdrop-blur"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-cyan opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyber-cyan" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.25em] text-zinc-300">
          AVAILABLE FOR AI/ML INTERNSHIPS · 2026
        </span>
      </motion.div>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-8 text-center eyebrow"
      >
        // PORTFOLIO.AI · INTERACTIVE RAG SYSTEM
      </motion.p>

      {/* Name — two lines: ANIRUDDHA / SAINI */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-4 max-w-5xl text-center font-pixel leading-[1.1]"
      >
        <span className="block text-[11vw] text-white sm:text-[80px] lg:text-[100px]">
          ANIRUDDHA
        </span>
        <span className="block holo-text text-[13vw] sm:text-[96px] lg:text-[120px]">
          SAINI
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mx-auto mt-6 max-w-2xl text-balance text-center text-sm leading-relaxed text-zinc-300 sm:text-base"
      >
        <span className="font-semibold text-white">AI/ML Engineer</span> — I
        build AI-powered applications and intelligent software solutions using
        machine learning, LLMs, and full-stack development. My work focuses on
        solving real-world problems through practical and deployable AI systems.
      </motion.p>

      {/* Stat row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cyber-border bg-cyber-border/60 sm:grid-cols-4"
      >
        <Stat label="Academic" value="Dean's List" small />
        <Stat label="Shipped" value="5" suffix="projects" />
        <Stat label="Certifications" value="11+" />
        <Stat label="Co-Founder" value="Litify" mono />
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#chat"
          className="btn-neon group inline-flex items-center gap-2 rounded-full bg-cyber-cyan px-6 py-3 font-mono text-sm font-semibold text-black"
        >
          <Sparkles className="h-4 w-4" />
          Ask my AI portfolio
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber-pink to-cyber-purple px-6 py-3 font-mono text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(255,46,151,0.5)] transition hover:scale-[1.02]"
        >
          <MessageCircle className="h-4 w-4" />
          Contact Me
        </a>
        <a
          href="#showcase"
          className="btn-neon inline-flex items-center gap-2 rounded-full border border-cyber-border bg-white/[0.02] px-6 py-3 font-mono text-sm text-zinc-200 backdrop-blur"
        >
          See the work
        </a>
        <div className="ml-1 flex items-center gap-2">
          <IconLink href={GITHUB_URL} label="GitHub">
            <Github className="h-4 w-4" />
          </IconLink>
          <IconLink href={LINKEDIN_URL} label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </IconLink>
          <button
            onClick={() => navigator.clipboard.writeText("aniruddhasaini@gmail.com")}
            aria-label="Copy email"
            title="Copy email: aniruddhasaini@gmail.com"
            className="grid h-10 w-10 place-items-center rounded-full border border-cyber-border text-zinc-300 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
          >
            <Mail className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Marquee */}
      <div className="mt-14">
        <div className="marquee">
          <div className="marquee-track font-mono text-xs text-zinc-500">
            {[...ROLLING_TAGS, ...ROLLING_TAGS].map((t, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-cyber-cyan/70" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix,
  mono,
  small,
}: {
  label: string;
  value: string;
  suffix?: string;
  mono?: boolean;
  small?: boolean;
}) {
  return (
    <div className="bg-cyber-darker/80 px-5 py-5 text-center">
      <p
        className={`font-bold ${
          small ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"
        } ${mono ? "font-mono tracking-tight text-cyber-cyan" : "text-white"}`}
      >
        {value}
        {suffix && (
          <span className="ml-1 text-xs font-normal text-zinc-500">
            {suffix}
          </span>
        )}
      </p>
      <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </p>
    </div>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-cyber-border text-zinc-300 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
    >
      {children}
    </a>
  );
}
