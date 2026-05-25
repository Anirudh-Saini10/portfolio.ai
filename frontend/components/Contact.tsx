"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { CheckCircle, Github, Linkedin, Loader2, Mail, MapPin, Send } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/projects";

const EMAIL = "aniruddhasaini@gmail.com";
const EMAILJS_SERVICE  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "";
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_KEY      = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY   || "";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) return;

    // If EmailJS is not configured, fall back to mailto:
    if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE || !EMAILJS_KEY) {
      const subject = encodeURIComponent(`Portfolio inquiry — ${name || "no name"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`);
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        { from_name: name, from_email: email, message },
        EMAILJS_KEY
      );
      setStatus("sent");
      setName(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <SectionHeader
        index="06"
        eyebrow="CONTACT · LET'S COLLABORATE"
        title={
          <>
            Get in{" "}
            <span className="font-serif italic text-cyber-cyan">touch</span>
          </>
        }
        description="Have a project in mind, an internship to fill, or just want to chat about AI?"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="grid gap-5 lg:grid-cols-2"
      >
        {/* Left card — contact info */}
        <div className="relative overflow-hidden rounded-3xl border border-cyber-cyan/30 bg-gradient-to-br from-cyber-cyan/10 via-cyber-cyan/5 to-cyber-purple/10 p-7 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyber-cyan/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-cyber-purple/20 blur-3xl" />

          <div className="relative">
            <div className="mb-1 flex items-center gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1 w-1 rounded-full bg-white/50" />
              ))}
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Contact Info
            </h3>

            <ul className="mt-6 space-y-4">
              <InfoRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={EMAIL}
              />
              <InfoRow
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value="Gurgaon, Haryana"
              />
            </ul>

            <div className="mt-7 flex items-center gap-2">
              <Social
                href={LINKEDIN_URL}
                label="LinkedIn"
                tone="cyan"
              >
                <Linkedin className="h-4 w-4" />
              </Social>
              <Social
                href={GITHUB_URL}
                label="GitHub"
                tone="dark"
              >
                <Github className="h-4 w-4" />
              </Social>
              <button
                onClick={() => navigator.clipboard.writeText(EMAIL)}
                aria-label="Copy email"
                title="Copy email address"
                className="grid h-10 w-10 place-items-center rounded-lg bg-cyber-pink text-white transition hover:scale-105"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right card — form */}
        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-cyber-border bg-cyber-card/50 p-7 sm:p-8"
        >
          <div className="space-y-5">
            <Field label="Your Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border border-cyber-border bg-cyber-darker/70 px-4 py-3 font-mono text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyber-cyan/60 focus:shadow-[0_0_0_3px_rgba(0,255,209,0.08)]"
              />
            </Field>

            <Field label="Your Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-cyber-border bg-cyber-darker/70 px-4 py-3 font-mono text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyber-cyan/60 focus:shadow-[0_0_0_3px_rgba(0,255,209,0.08)]"
              />
            </Field>

            <Field label="Your Message">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let's build something together..."
                rows={5}
                className="w-full resize-none rounded-xl border border-cyber-border bg-cyber-darker/70 px-4 py-3 font-mono text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyber-cyan/60 focus:shadow-[0_0_0_3px_rgba(0,255,209,0.08)]"
              />
            </Field>

            {status === "sent" ? (
              <div className="flex items-center gap-3 rounded-xl border border-cyber-cyan/40 bg-cyber-cyan/10 p-4 text-cyber-cyan">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <p className="font-mono text-sm">Message sent! I'll get back to you soon.</p>
              </div>
            ) : (
              <>
                {status === "error" && (
                  <p className="font-mono text-xs text-cyber-pink">
                    Something went wrong. Try emailing directly at {EMAIL}.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!message.trim() || !email.trim() || status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyber-pink to-cyber-purple px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_30px_-10px_rgba(255,46,151,0.6)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </>
            )}
          </div>
        </form>
      </motion.div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.22em] text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-3">
      <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-white">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-zinc-400">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm text-white">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <li>
      <a href={href} className="block transition hover:opacity-90">
        {Inner}
      </a>
    </li>
  ) : (
    <li>{Inner}</li>
  );
}

function Social({
  href,
  label,
  tone,
  children,
}: {
  href: string;
  label: string;
  tone: "cyan" | "dark" | "pink";
  children: React.ReactNode;
}) {
  const styles =
    tone === "cyan"
      ? "bg-cyber-cyan text-black"
      : tone === "pink"
      ? "bg-cyber-pink text-white"
      : "bg-cyber-darker text-white border border-cyber-border";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`grid h-10 w-10 place-items-center rounded-lg transition hover:scale-105 ${styles}`}
    >
      {children}
    </a>
  );
}
