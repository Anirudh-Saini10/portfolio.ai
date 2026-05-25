"use client";

import { useCallback, useRef, useState } from "react";

export type AvatarState = "idle" | "thinking" | "speaking" | "error";

type AskOptions = {
  query: string;
  projectFilter?: string | null;
};

export function usePortfolioChat() {
  const [answer, setAnswer] = useState<string>("");
  const [sources, setSources] = useState<{ project_name: string; similarity: number }[]>([]);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    setAvatarState("idle");
  }, []);

  const speak = useCallback(async (text: string) => {
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const detail = await res.json().catch(() => ({}));
        throw new Error(`TTS failed (${res.status}): ${JSON.stringify(detail)}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      setAvatarState("speaking");
      audio.onended = () => {
        setAvatarState("idle");
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } catch (e) {
      // TTS is non-fatal — text answer is already shown
      setAvatarState("idle");
      console.warn("TTS error:", e);
    }
  }, []);

  const ask = useCallback(
    async ({ query, projectFilter }: AskOptions) => {
      if (!query.trim()) return;
      stopAudio();
      setIsLoading(true);
      setError(null);
      setAnswer("");
      setSources([]);
      setAvatarState("thinking");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      try {
        const res = await fetch(`${apiUrl}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            project_filter: projectFilter ?? null,
          }),
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Backend error ${res.status}: ${text || res.statusText}`);
        }
        const data: { answer: string; sources: typeof sources } = await res.json();
        setAnswer(data.answer);
        setSources(data.sources || []);
        setIsLoading(false);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Something went wrong";
        setError(msg);
        setAvatarState("error");
        setIsLoading(false);
      }
    },
    [speak, stopAudio]
  );

  return {
    answer,
    sources,
    avatarState,
    isLoading,
    error,
    ask,
    speak,
    stopAudio,
  };
}
