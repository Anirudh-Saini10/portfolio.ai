"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { AvatarState } from "@/hooks/usePortfolioChat";
import clsx from "clsx";

const BAR_COUNT = 9;
const PARTICLE_COUNT = 14;

/**
 * Audio-reactive AI core. Pure SVG + Framer Motion — no Lottie required.
 * - idle: slow breathing core, faint outer ring
 * - thinking: orbiting particles, rotating outer dasharray, purple glow
 * - speaking: vertical frequency bars pulse, cyan glow
 * - error: pink core, static
 */
export function Avatar({ state }: { state: AvatarState }) {
  const isSpeaking = state === "speaking";
  const isThinking = state === "thinking";
  const isError = state === "error";

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        return {
          id: i,
          x: Math.cos(angle) * 90,
          y: Math.sin(angle) * 90,
          delay: i * 0.08,
        };
      }),
    []
  );

  const ringStroke = isError
    ? "#FF2E97"
    : isSpeaking
    ? "#00FFD1"
    : isThinking
    ? "#7B61FF"
    : "rgba(255,255,255,0.18)";

  return (
    <div className="relative grid place-items-center">
      <div className="relative h-64 w-64 sm:h-72 sm:w-72">
        {/* Outer halo */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          animate={{
            opacity: isSpeaking ? [0.55, 0.9, 0.55] : isThinking ? [0.4, 0.7, 0.4] : 0.25,
          }}
          transition={{ duration: isSpeaking ? 1.2 : 2.4, repeat: Infinity }}
          style={{
            background: isError
              ? "radial-gradient(circle, rgba(255,46,151,0.6), transparent 70%)"
              : isSpeaking
              ? "radial-gradient(circle, rgba(0,255,209,0.55), transparent 70%)"
              : "radial-gradient(circle, rgba(123,97,255,0.5), transparent 70%)",
          }}
        />

        {/* Rotating outer ring */}
        <motion.svg
          viewBox="0 0 240 240"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: isThinking ? 360 : isSpeaking ? -360 : 0 }}
          transition={{
            duration: isThinking ? 12 : 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <defs>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00FFD1" stopOpacity="0.35" />
              <stop offset="55%" stopColor="#7B61FF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#06060A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00FFD1" />
              <stop offset="50%" stopColor="#7B61FF" />
              <stop offset="100%" stopColor="#FF2E97" />
            </linearGradient>
          </defs>

          <circle cx="120" cy="120" r="110" fill="url(#coreGrad)" />

          {/* dotted outer ring */}
          <circle
            cx="120"
            cy="120"
            r="108"
            fill="none"
            stroke={ringStroke}
            strokeWidth="1.2"
            strokeDasharray="2 7"
          />

          {/* segmented arcs */}
          <circle
            cx="120"
            cy="120"
            r="92"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1.5"
            strokeDasharray="60 30 30 20"
            strokeLinecap="round"
            opacity={isSpeaking || isThinking ? 0.85 : 0.45}
          />

          {/* tick marks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i / 60) * Math.PI * 2;
            const r1 = 76;
            const r2 = i % 5 === 0 ? 70 : 73;
            const x1 = 120 + Math.cos(a) * r1;
            const y1 = 120 + Math.sin(a) * r1;
            const x2 = 120 + Math.cos(a) * r2;
            const y2 = 120 + Math.sin(a) * r2;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={ringStroke}
                strokeWidth={i % 5 === 0 ? 1.2 : 0.6}
                opacity={i % 5 === 0 ? 0.7 : 0.35}
              />
            );
          })}
        </motion.svg>

        {/* Counter-rotating inner ring */}
        <motion.svg
          viewBox="0 0 240 240"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: isThinking ? -360 : 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="120"
            cy="120"
            r="58"
            fill="none"
            stroke={ringStroke}
            strokeWidth="0.8"
            strokeDasharray="1 5"
            opacity="0.7"
          />
          {/* Orbiting nodes */}
          {[0, 90, 180, 270].map((deg) => {
            const a = (deg * Math.PI) / 180;
            const x = 120 + Math.cos(a) * 58;
            const y = 120 + Math.sin(a) * 58;
            return (
              <circle
                key={deg}
                cx={x}
                cy={y}
                r="2.5"
                fill={isSpeaking ? "#00FFD1" : isThinking ? "#7B61FF" : "#cbd5e1"}
              />
            );
          })}
        </motion.svg>

        {/* Particle field — only when thinking */}
        {isThinking &&
          particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-cyber-purple"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, p.x, 0],
                y: [0, p.y, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.2,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Center core with audio bars */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            className={clsx(
              "relative grid h-28 w-28 place-items-center overflow-hidden rounded-full border backdrop-blur",
              isError
                ? "border-cyber-pink/60 bg-cyber-pink/10"
                : isSpeaking
                ? "border-cyber-cyan/60 bg-cyber-cyan/10"
                : isThinking
                ? "border-cyber-purple/60 bg-cyber-purple/10"
                : "border-white/10 bg-white/[0.03]"
            )}
            animate={{
              scale: isSpeaking ? [1, 1.05, 1] : isThinking ? [1, 1.02, 1] : [1, 1.01, 1],
              boxShadow: isSpeaking
                ? [
                    "0 0 16px rgba(0,255,209,0.35)",
                    "0 0 36px rgba(0,255,209,0.75)",
                    "0 0 16px rgba(0,255,209,0.35)",
                  ]
                : isThinking
                ? [
                    "0 0 12px rgba(123,97,255,0.35)",
                    "0 0 28px rgba(123,97,255,0.65)",
                    "0 0 12px rgba(123,97,255,0.35)",
                  ]
                : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{
              duration: isSpeaking ? 0.55 : 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Frequency bars */}
            <div className="flex h-12 items-end gap-[3px]">
              {Array.from({ length: BAR_COUNT }).map((_, i) => (
                <motion.span
                  key={i}
                  className={clsx(
                    "block w-[3px] rounded-full",
                    isError
                      ? "bg-cyber-pink"
                      : isSpeaking
                      ? "bg-cyber-cyan"
                      : isThinking
                      ? "bg-cyber-purple"
                      : "bg-zinc-400/70"
                  )}
                  animate={{
                    height: isSpeaking
                      ? [
                          `${20 + ((i * 13) % 30)}%`,
                          `${60 + ((i * 17) % 40)}%`,
                          `${30 + ((i * 11) % 45)}%`,
                          `${80 - ((i * 7) % 35)}%`,
                          `${20 + ((i * 13) % 30)}%`,
                        ]
                      : isThinking
                      ? ["25%", "45%", "30%", "55%", "25%"]
                      : "30%",
                  }}
                  transition={{
                    duration: isSpeaking ? 0.6 : 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05,
                  }}
                  style={{ height: "30%" }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status label */}
      <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em]">
        <span
          className={clsx(
            "h-1.5 w-1.5 rounded-full",
            isError
              ? "bg-cyber-pink"
              : isSpeaking
              ? "bg-cyber-cyan"
              : isThinking
              ? "bg-cyber-purple"
              : "bg-zinc-500"
          )}
        />
        <span className="text-zinc-400">{labelFor(state)}</span>
      </div>
    </div>
  );
}

function labelFor(state: AvatarState) {
  switch (state) {
    case "thinking":
      return "retrieving · embedding · ranking";
    case "speaking":
      return "transmitting answer";
    case "error":
      return "signal lost";
    default:
      return "online · idle";
  }
}
