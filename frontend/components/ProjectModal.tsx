"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code2, MessageSquare, Star, Wrench, X } from "lucide-react";
import type { Project } from "@/lib/projects";
import { GITHUB_URL } from "@/lib/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  const askAboutThis = () => {
    if (!project) return;
    onClose();
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("portfolio:ask", {
          detail: { slug: project.slug, name: project.name },
        })
      );
    }, 300);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto p-4 backdrop-blur-md sm:p-8"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-cyber-border bg-gradient-to-br from-cyber-card/95 via-cyber-darker to-cyber-card/90 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-cyber-border bg-cyber-darker/80 text-zinc-300 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Gradient blob */}
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyber-cyan/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-cyber-purple/15 blur-3xl" />

            <div className="relative p-7 sm:p-10">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-2">
                {project.status === "featured" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cyber-cyan">
                    <Star className="h-3 w-3 fill-current" /> Featured
                  </span>
                )}
                {project.status === "building" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-purple/50 bg-cyber-purple/10 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cyber-purple">
                    <Wrench className="h-3 w-3" /> Active Build
                  </span>
                )}
                <span className="tag uppercase tracking-[0.18em]">
                  {project.category}
                </span>
                <span className="tag">{project.year}</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                {project.name}
              </h2>
              <p className="mt-1 text-base text-cyber-cyan/90">
                {project.tagline}
              </p>

              <p className="mt-5 text-[15px] leading-relaxed text-zinc-300">
                {project.description}
              </p>

              {project.bullets && project.bullets.length > 0 && (
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {project.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-zinc-300"
                    >
                      <span className="mt-2 h-1 w-3 flex-shrink-0 bg-gradient-to-r from-cyber-cyan to-cyber-purple" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-cyber-border/60 pt-6">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="live-cta"
                  >
                    Live Demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                <a
                  href={project.githubUrl || GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyber-border bg-white/[0.02] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-zinc-200 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
                >
                  <Code2 className="h-4 w-4" />
                  Source Code
                </a>
                <button
                  onClick={askAboutThis}
                  className="inline-flex items-center gap-2 rounded-full border border-cyber-border bg-white/[0.02] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-zinc-200 transition hover:border-cyber-purple/60 hover:text-cyber-purple"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask the AI
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
