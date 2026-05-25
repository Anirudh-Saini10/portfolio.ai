"use client";

import { useCallback, useState } from "react";

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
  const stopAudio = useCallback(() => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setAvatarState("idle");
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Split into sentences to avoid Chrome's ~200-char cutoff bug
    const chunks = text.match(/[^.!?\n]+[.!?\n]*/g) ?? [text];
    let i = 0;

    const next = () => {
      if (i >= chunks.length) { setAvatarState("idle"); return; }
      const utt = new SpeechSynthesisUtterance(chunks[i++].trim());
      utt.rate = 0.93;
      utt.pitch = 0.85;
      utt.lang = "en-US";

      const voices = window.speechSynthesis.getVoices();
      const preferred = [
        "Google UK English Male",
        "Microsoft David - English (United States)",
        "Daniel",
        "Alex",
      ];
      const voice =
        preferred.reduce<SpeechSynthesisVoice | null>(
          (found, name) => found ?? voices.find((v) => v.name === name) ?? null,
          null
        ) ??
        voices.find(
          (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("male")
        ) ??
        null;
      if (voice) utt.voice = voice;

      utt.onend = next;
      utt.onerror = () => setAvatarState("idle");
      window.speechSynthesis.speak(utt);
    };

    setAvatarState("speaking");
    next();
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
