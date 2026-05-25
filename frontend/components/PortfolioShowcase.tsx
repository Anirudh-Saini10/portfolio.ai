"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, Code2, Cpu, Crown, Layers, Store } from "lucide-react";
import Image from "next/image";
import { ALL_PROJECTS, GITHUB_URL, STARTUP, type Project } from "@/lib/projects";
import { CERTIFICATIONS } from "@/lib/certifications";
import { TECH_STACK } from "@/lib/techstack";
import { SectionHeader } from "./SectionHeader";
import { ProjectModal } from "./ProjectModal";

type Tab = "projects" | "startup" | "certifications" | "techstack";

const TABS: { id: Tab; label: string; icon: typeof Layers }[] = [
  { id: "startup", label: "My Startup", icon: Crown },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "techstack", label: "Tech Stack", icon: Cpu },
];

export function PortfolioShowcase() {
  const [tab, setTab] = useState<Tab>("startup");
  const [selected, setSelected] = useState<Project | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="showcase" className="scroll-mt-24">
      <SectionHeader
        index="01"
        eyebrow="SHOWCASE · WORK & SKILLS"
        title={
          <>
            Portfolio{" "}
            <span className="font-serif italic text-cyber-cyan">Showcase</span>
          </>
        }
        description="Explore my journey through projects, certifications, and technical expertise."
      />

      {/* Tab bar */}
      <div className="mb-8 flex items-center gap-1 rounded-2xl border border-cyber-border bg-cyber-darker/70 p-1.5">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition ${
                isActive
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-active"
                  className="absolute inset-0 rounded-xl bg-cyber-purple/20 border border-cyber-purple/40"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {tab === "projects" && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {ALL_PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                onSelect={setSelected}
              />
            ))}
          </motion.div>
        )}

        {tab === "startup" && (
          <motion.div
            key="startup"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-cyber-pink/30 bg-gradient-to-br from-cyber-pink/[0.08] via-cyber-card/60 to-cyber-purple/[0.08] p-8 sm:p-12">
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
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <span className="absolute inset-0 grid place-items-center font-display text-lg font-bold text-cyber-pink">L</span>
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold tracking-tight text-white">{STARTUP.brand}</p>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">litify.shop</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-pink/40 bg-cyber-pink/10 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cyber-pink">
                  <Crown className="h-3.5 w-3.5" /> Co-Founder
                </span>
              </div>

              <div className="relative mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
                <div>
                  <p className="font-serif text-2xl italic leading-snug text-white sm:text-3xl">
                    &ldquo;{STARTUP.pitch}&rdquo;
                  </p>
                  <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-300">{STARTUP.description}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {STARTUP.highlights.map((h: string) => (
                      <div key={h} className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/30 p-3 text-sm text-zinc-200">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyber-pink" />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {STARTUP.stack.map((s: string) => (
                      <span key={s} className="tag">{s}</span>
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
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">{STARTUP.period}</span>
                  </div>
                </div>

                {/* Right — co-founder card */}
                <div className="relative">
                  <div className="rounded-2xl border border-white/5 bg-black/40 p-6">
                    <p className="eyebrow">// role</p>
                    <p className="mt-2 font-display text-xl font-semibold text-white">{STARTUP.role}</p>

                    <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/5 bg-white/5">
                      <StartupMetric label="Built" value="end-to-end" />
                      <StartupMetric label="Lifecycle" value="ideation → ops" />
                      <StartupMetric label="Ownership" value="brand + UX + GTM" />
                      <StartupMetric label="Status" value="live · iterating" highlight />
                    </div>

                    <p className="mt-6 text-xs leading-relaxed text-zinc-400">
                      The reason this isn&apos;t just a portfolio link: I learned that shipping is the easy part.
                      Inventory, returns, and conversion funnels are where the real engineering of a product happens.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "certifications" && (
          <motion.div
            key="certs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="card group rounded-xl border border-cyber-border bg-cyber-card/50 p-4"
              >
                <p className="font-display text-[15px] font-semibold leading-snug text-white">
                  {c.title}
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                  {c.issuer}
                </p>
                {c.detail && (
                  <p className="mt-2 inline-flex rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 px-2 py-0.5 text-[10.5px] text-cyber-cyan">
                    {c.detail}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === "techstack" && (
          <motion.div
            key="tech"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
          >
            {TECH_STACK.map((t, i) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025 }}
                className="card group flex flex-col items-center justify-center gap-3 rounded-xl border border-cyber-border bg-cyber-card/50 p-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.simpleicons.org/${t.slug}/${t.color || "FFFFFF"}`}
                  alt={t.name}
                  className="h-9 w-9 transition-transform group-hover:scale-110"
                  loading="lazy"
                />
                <span className="text-center font-mono text-[10.5px] text-zinc-300">
                  {t.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal project={selected} onClose={closeModal} />
    </section>
  );
}

function StartupMetric({
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
      <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className={`mt-1 font-mono text-sm ${highlight ? "text-cyber-pink" : "text-zinc-100"}`}>
        {value}
      </p>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onSelect(project)}
      className="card group relative cursor-pointer overflow-hidden rounded-2xl border border-cyber-border bg-cyber-card/60 p-5"
    >
      {/* Hover sheen */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyber-cyan/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="tag uppercase tracking-[0.18em] text-cyber-cyan/80">
            {project.category}
          </span>
          <span className="font-mono text-[10.5px] text-zinc-500">
            {project.year}
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-bold text-white">
          {project.name}
        </h3>
        <p className="mt-1 text-xs text-cyber-cyan/80">{project.tagline}</p>

        {project.status === "building" && (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-amber-400">
            <span className="h-1 w-1 animate-pulse rounded-full bg-amber-400" />
            In Progress
          </span>
        )}

        <div className="mt-4 flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="tag text-[9px]">
              {t}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag text-[9px]">+{project.tags.length - 4}</span>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="live-cta flex-1 justify-center text-[11px]"
            >
              Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          <a
            href={project.githubUrl || GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-cyber-border text-zinc-400 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
          >
            <Code2 className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
