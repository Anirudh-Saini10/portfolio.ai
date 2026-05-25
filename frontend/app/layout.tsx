import type { Metadata } from "next";
import "./globals.css";
import { BackendWaker } from "@/components/BackendWaker";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { CustomCursor } from "@/components/CustomCursor";
import { SoundProvider } from "@/components/SoundProvider";
import { TopBar } from "@/components/TopBar";
import { display, mono, serif, pixel } from "./fonts";

export const metadata: Metadata = {
  title: "Aniruddha Saini · Portfolio.AI",
  description:
    "Interactive AI-powered portfolio. Ask anything about Aniruddha's projects — answered live by a RAG pipeline over project docs.",
  metadataBase: new URL("https://portfolio.ai"),
  openGraph: {
    title: "Aniruddha Saini · Portfolio.AI",
    description:
      "Ask anything about my projects — answered live by RAG over project docs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${mono.variable} ${serif.variable} ${pixel.variable}`}
    >
      <body className="antialiased selection:bg-cyber-cyan/30 selection:text-white">
        <CursorSpotlight />
        <CustomCursor />
        <SoundProvider />
        <TopBar />
        <BackendWaker />
        {children}
      </body>
    </html>
  );
}
