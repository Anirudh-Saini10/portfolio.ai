"use client";

import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Fixed corner UI: a SYS_READY status badge on the left and a RESUME button on
 * the right, in the style of vintage terminal HUDs.
 */
export function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Top-left: system status */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="fixed left-5 top-5 z-40 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.25em] text-zinc-500"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-sm bg-cyber-cyan opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-sm bg-cyber-cyan" />
        </span>
        <span className="text-cyber-cyan/80">sys_ready</span>
        <span className="text-zinc-700">·</span>
        <span>{time}</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          _
        </motion.span>
      </motion.div>

      {/* Top-right: resume button */}
      <motion.a
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        href="/Aniruddha_Saini_Resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="group fixed right-5 top-5 z-40 inline-flex items-center gap-2 border border-cyber-border bg-cyber-darker/80 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-200 backdrop-blur transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
        data-cursor="hover"
      >
        <FileDown className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        Resume
      </motion.a>
    </>
  );
}
