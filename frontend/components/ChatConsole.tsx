"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Square, Sparkles } from "lucide-react";
import { usePortfolioChat } from "@/hooks/usePortfolioChat";
import { SUGGESTED_QUESTIONS } from "@/lib/projects";
import { Avatar } from "./Avatar";
import { SectionHeader } from "./SectionHeader";

export function ChatConsole() {
  const [query, setQuery] = useState("");
  const { answer, sources, avatarState, isLoading, error, ask, stopAudio } =
    usePortfolioChat();

  // Allow project cards to populate the input via a custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const { detail } = e as CustomEvent<{ slug: string; name: string }>;
      const q = `Tell me about ${detail.name}.`;
      setQuery(q);
      void ask({ query: q, projectFilter: detail.slug });
      const el = document.getElementById("chat");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("portfolio:ask", handler as EventListener);
    return () =>
      window.removeEventListener("portfolio:ask", handler as EventListener);
  }, [ask]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask({ query });
  };

  return (
    <section id="chat" className="scroll-mt-24">
      <SectionHeader
        index="00"
        eyebrow="LIVE · INTERACTIVE RAG"
        title={
          <>
            Ask the AI{" "}
            <span className="font-serif italic text-cyber-cyan">
              anything about my work
            </span>
          </>
        }
        description="Real RAG over project docs · Groq llama-3.1-8b · Kokoro voice."
      />

      <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:sticky lg:top-8"
        >
          <Avatar state={avatarState} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-cyber-border bg-gradient-to-br from-cyber-card/80 to-cyber-darker p-5 sm:p-7"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-cyber-cyan/10 blur-3xl" />

          <div className="relative mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyber-cyan" />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyber-cyan">
                ask.portfolio
              </h3>
              <span className="hidden sm:inline font-mono text-[10px] text-zinc-500">
                · Aniruddha&apos;s AI Twin
              </span>
            </div>
            {avatarState === "speaking" && (
              <button
                onClick={stopAudio}
                className="inline-flex items-center gap-1 rounded-full border border-cyber-border px-3 py-1 text-xs text-zinc-300 hover:border-cyber-cyan/60 hover:text-cyber-cyan"
              >
                <Square className="h-3 w-3" /> stop
              </button>
            )}
          </div>

          <form onSubmit={onSubmit} className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about Aniruddha's projects..."
              className="w-full rounded-2xl border border-cyber-border bg-cyber-darker/70 px-5 py-4 pr-14 font-mono text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyber-cyan/60 focus:shadow-[0_0_0_4px_rgba(0,255,209,0.08)]"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              aria-label="Send"
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl bg-cyber-cyan text-black transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuery(q);
                  void ask({ query: q });
                }}
                className="rounded-full border border-cyber-border bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-zinc-400 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="relative mt-5 min-h-[160px] rounded-2xl border border-cyber-border/70 bg-black/40 p-5">
            <AnimatePresence mode="wait">
              {error ? (
                <motion.p
                  key="err"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-sm text-cyber-pink"
                >
                  {error}
                </motion.p>
              ) : isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  {["embedding query", "querying pgvector", "ranking chunks", "calling groq llama"].map(
                    (line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.18 }}
                        className="flex items-center gap-2 font-mono text-xs text-zinc-500"
                      >
                        <motion.span
                          className="h-1 w-1 rounded-full bg-cyber-cyan"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        />
                        {line}...
                      </motion.div>
                    )
                  )}
                </motion.div>
              ) : answer ? (
                <motion.div
                  key="ans"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-zinc-100">
                    {answer}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 font-mono text-sm text-zinc-500"
                >
                  <span className="text-cyber-cyan">&gt;</span>
                  <span>awaiting query</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-cyber-cyan"
                  >
                    _
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
