"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Synthesizes short 8-bit-style blips on click/hover via the Web Audio API.
 * No audio assets needed. Includes a small mute toggle in the top-right.
 * Browsers require a user gesture before audio plays, so the AudioContext is
 * created lazily on the first interaction.
 */
export function SoundProvider() {
  const ctxRef = useRef<AudioContext | null>(null);
  const lastHoverRef = useRef(0);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    // Restore mute preference
    const saved = localStorage.getItem("portfolio-muted");
    if (saved === "1") setMuted(true);
  }, []);

  useEffect(() => {
    const getCtx = () => {
      if (!ctxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        ctxRef.current = new Ctx();
      }
      return ctxRef.current;
    };

    const blip = (
      freq: number,
      durationMs: number,
      type: OscillatorType = "square",
      gain = 0.05
    ) => {
      if (mutedRef.current) return;
      try {
        const ctx = getCtx();
        if (ctx.state === "suspended") void ctx.resume();
        const t = ctx.currentTime;
        const dur = durationMs / 1000;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(gain, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(g).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur);
      } catch {
        /* silent */
      }
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(
        "a, button, [role='button']"
      );
      if (!el) return;
      // Two-tone click — bright on primary, mellow on secondary
      const isPrimary = el.classList.contains("live-cta") ||
        el.classList.contains("btn-neon") ||
        el.tagName === "BUTTON";
      if (isPrimary) {
        blip(880, 60, "square", 0.06);
        setTimeout(() => blip(1320, 50, "square", 0.04), 50);
      } else {
        blip(660, 50, "triangle", 0.05);
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(
        "a, button, [role='button']"
      );
      if (!el) return;
      const now = performance.now();
      if (now - lastHoverRef.current < 90) return;
      lastHoverRef.current = now;
      blip(1200, 28, "triangle", 0.02);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  const toggle = () => {
    setMuted((m) => {
      const next = !m;
      localStorage.setItem("portfolio-muted", next ? "1" : "0");
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      className="fixed bottom-5 right-5 z-50 grid h-10 w-10 place-items-center rounded-md border border-cyber-border bg-cyber-darker/80 text-zinc-300 backdrop-blur transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
