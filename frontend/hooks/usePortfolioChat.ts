"use client";

import { useCallback, useState } from "react";

export type AvatarState = "idle" | "thinking" | "speaking" | "error";

type AskOptions = {
  query: string;
  projectFilter?: string | null;
};

// Singleton variables to cache the TTS model across hook re-renders
let kokoroInstance: any = null;
let kokoroInitPromise: Promise<any> | null = null;
let currentAudioElement: HTMLAudioElement | null = null;
let currentAudioSource: AudioBufferSourceNode | null = null;

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

    if (currentAudioSource) {
      currentAudioSource.stop();
      currentAudioSource.disconnect();
      currentAudioSource = null;
    }

    setAvatarState("idle");
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined") return;
    
    stopAudio();

    const startSpeak = async () => {
      try {
        setAvatarState("speaking");
        
        // Dynamically import to avoid SSR errors
        const { KokoroTTS } = await import("kokoro-js");

        if (!kokoroInstance) {
          if (!kokoroInitPromise) {
            kokoroInitPromise = KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", {
              dtype: "q8",
              device: "wasm",
            });
          }
          kokoroInstance = await kokoroInitPromise;
        }

        // Generate audio with requested male voice
        const audioOutput = await kokoroInstance.generate(text, { voice: "am_adam" });
        
        // Handle playback based on the output format from kokoro-js
        if (audioOutput.toBlob) {
          const blob = await audioOutput.toBlob("audio/wav");
          const url = URL.createObjectURL(blob);
          currentAudioElement = new Audio(url);
          currentAudioElement.onended = () => {
            setAvatarState("idle");
            URL.revokeObjectURL(url);
          };
          currentAudioElement.onerror = () => setAvatarState("idle");
          await currentAudioElement.play();
        } else if (audioOutput.audio) {
          // Fallback to Web Audio API if it returns raw Float32Array
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          const audioCtx = new AudioContextClass();
          const sampleRate = audioOutput.sampling_rate || 24000;
          const buffer = audioCtx.createBuffer(1, audioOutput.audio.length, sampleRate);
          buffer.getChannelData(0).set(audioOutput.audio);
          
          currentAudioSource = audioCtx.createBufferSource();
          currentAudioSource.buffer = buffer;
          currentAudioSource.connect(audioCtx.destination);
          currentAudioSource.onended = () => setAvatarState("idle");
          currentAudioSource.start(0);
        } else if (audioOutput.data) {
          // Fallback to basic Blob if it has data property
          const blob = new Blob([audioOutput.data], { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          currentAudioElement = new Audio(url);
          currentAudioElement.onended = () => {
            setAvatarState("idle");
            URL.revokeObjectURL(url);
          };
          currentAudioElement.onerror = () => setAvatarState("idle");
          await currentAudioElement.play();
        } else {
          console.error("Unknown Kokoro audio output format", audioOutput);
          setAvatarState("idle");
        }

      } catch (err) {
        console.error("TTS Generation Error:", err);
        setAvatarState("idle");
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
