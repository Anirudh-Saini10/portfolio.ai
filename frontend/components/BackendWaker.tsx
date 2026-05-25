"use client";

import { useEffect, useState } from "react";

/**
 * Pings the FastAPI /health endpoint on first load so Railway cold starts
 * happen before the user actually asks a question. Shows a subtle banner
 * while the system is waking.
 */
export function BackendWaker() {
  const [status, setStatus] = useState<"booting" | "ready" | "down">("booting");

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
      setStatus("ready");
      return;
    }
    const controller = new AbortController();
    fetch(`${url}/health`, { signal: controller.signal })
      .then((r) => setStatus(r.ok ? "ready" : "down"))
      .catch(() => setStatus("down"));
    return () => controller.abort();
  }, []);

  if (status === "ready") return null;

  return (
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <div className="glass flex items-center gap-2 rounded-full border border-cyber-border px-4 py-2 text-xs text-cyber-cyan">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-cyan opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-cyan" />
        </span>
        {status === "booting"
          ? "Initializing system..."
          : "Backend offline — answers may be unavailable"}
      </div>
    </div>
  );
}
