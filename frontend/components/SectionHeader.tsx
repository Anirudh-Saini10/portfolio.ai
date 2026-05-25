"use client";

import { motion } from "framer-motion";

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="eyebrow">
          <span className="text-cyber-cyan/60">{index}</span>
          <span className="mx-2 text-zinc-700">/</span>
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-sm text-sm text-zinc-400 sm:text-right">
          {description}
        </p>
      )}
    </motion.div>
  );
}
