import { Hero } from "@/components/Hero";
import { ChatConsole } from "@/components/ChatConsole";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden grain">
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-28 px-6 pb-24 pt-20 sm:px-8 sm:gap-32 sm:pt-24">
        <Hero />
        <ChatConsole />
        <PortfolioShowcase />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
