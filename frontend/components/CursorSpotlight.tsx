"use client";

import { useEffect } from "react";

/**
 * Tracks the cursor position and exposes it as CSS vars (--spot-x, --spot-y)
 * on the document root. The radial-gradient in globals.css uses them to draw
 * a soft spotlight that follows the user, giving the page an alive, expensive
 * feel without any heavy animation cost.
 */
export function CursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 4;

    const apply = () => {
      root.style.setProperty("--spot-x", `${x}px`);
      root.style.setProperty("--spot-y", `${y}px`);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
