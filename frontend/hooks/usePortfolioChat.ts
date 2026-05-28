"use client";

import { useCallback, useState } from "react";

export type AvatarState = "idle" | "thinking" | "speaking" | "error";

type AskOptions = {
  query: string;
  projectFilter?: string | null;
};

let currentAudioElement: HTMLAudioElement | null = null;

const speakWithBrowserVoice = (text: string, onEnd: () => void) => {
  if (!window.speechSynthesis) {
    onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find((voice) => /en/i.test(voice.lang) && /male|david|mark|daniel/i.test(voice.name)) ||
    voices.find((voice) => /en/i.test(voice.lang));

  if (preferredVoice) utterance.voice = preferredVoice;
  utterance.rate = 0.95;
  utterance.pitch = 0.9;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
};

export function usePortfolioChat() {
  const [answer, setAnswer] = useState<string>("");
  const [sources, setSources] = useState<{ project_name: string; similarity: number }[]>([]);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopAudio = useCallback(() => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    
    if (currentAudioElement) {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
      currentAudioElement = null;
    }

    setAvatarState("idle");
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !text) return;
    
    stopAudio();

    const startSpeak = async () => {
      try {
        setAvatarState("speaking");

        const response = await fetch("/api/speak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          throw new Error(`Kokoro TTS request failed (${response.status})`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        currentAudioElement = new Audio(url);
        currentAudioElement.onended = () => {
          setAvatarState("idle");
          URL.revokeObjectURL(url);
          currentAudioElement = null;
        };
        currentAudioElement.onerror = () => {
          setAvatarState("idle");
          URL.revokeObjectURL(url);
          currentAudioElement = null;
        };
        await currentAudioElement.play();
      } catch (err) {
        console.warn("Kokoro TTS unavailable, falling back to browser speech:", err);
        speakWithBrowserVoice(text, () => setAvatarState("idle"));
      }
    };

    startSpeak();
  }, [stopAudio]);

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
    [stopAudio]
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
