"use client";

import { useEffect } from "react";

/**
 * Square custom cursor: a tiny solid square that tracks the mouse 1:1, plus a
 * larger outlined square that lerps behind it. Grows + recolors on hover over
 * interactive elements. Disabled on touch/no-hover devices.
 */
export function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      const target = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor='hover'], input, textarea"
      );
      if (target) {
        ring.classList.add("cursor-ring--hover");
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          ring.classList.add("cursor-ring--text");
        } else {
          ring.classList.remove("cursor-ring--text");
        }
      } else {
        ring.classList.remove("cursor-ring--hover");
        ring.classList.remove("cursor-ring--text");
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onDown = () => ring.classList.add("cursor-ring--down");
    const onUp = () => ring.classList.remove("cursor-ring--down");
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return null;
}
