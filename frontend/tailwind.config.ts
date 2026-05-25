import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: "#00FFD1",
          purple: "#7B61FF",
          pink: "#FF2E97",
          dark: "#0A0A0F",
          darker: "#06060A",
          card: "#0F121C",
          border: "#1E2333",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(0, 255, 209, 0.35)",
        "glow-purple": "0 0 24px rgba(123, 97, 255, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2.4s ease-in-out infinite alternate",
        scan: "scan 6s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 12px rgba(0,255,209,0.25)" },
          "100%": { boxShadow: "0 0 28px rgba(0,255,209,0.7)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
