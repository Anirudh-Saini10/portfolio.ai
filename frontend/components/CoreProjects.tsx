"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { CORE_PROJECTS, type Project } from "@/lib/projects";
import { SectionHeader } from "./SectionHeader";

export function CoreProjects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <SectionHeader
        index="03"
        eyebrow="SHIPPED · ML / FULL-STACK"
        title={
          <>
            More live builds —{" "}
            <span className="font-serif italic text-cyber-cyan">
              each deployed and running
            </span>
          </>
        }
        description="Production-style projects across LLMs, applied NLP, and database engineering."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CORE_PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const askAboutThis = () => {
    window.dispatchEvent(
      new CustomEvent("portfolio:ask", {
        detail: { slug: project.slug, name: project.name },
      })
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="card group relative flex flex-col overflow-hidden rounded-2xl border border-cyber-border bg-cyber-card/60 p-6"
    >
      {/* hover gradient sheen */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyber-cyan/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="flex items-center justify-between">
        <span className="tag uppercase tracking-[0.18em] text-cyber-cyan/80">
          {project.category}
        </span>
        <span className="font-mono text-[10.5px] text-zinc-500">{project.year}</span>
      </div>

      <h3 className="mt-5 font-display text-2xl font-bold text-white">
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-cyber-cyan/90">{project.tagline}</p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="live-cta flex-1 justify-center"
          >
            Live Demo <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
        <button
          onClick={askAboutThis}
          aria-label={`Ask AI about ${project.name}`}
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-cyber-border bg-white/[0.02] text-zinc-300 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
        >
          <MessageSquare className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}
