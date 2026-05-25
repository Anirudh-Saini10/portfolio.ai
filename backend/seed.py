"""
Seed the Supabase vector database with project knowledge chunks.
Run once: python seed.py
"""
from __future__ import annotations
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from supabase import create_client

load_dotenv()

sb = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
model = SentenceTransformer("all-MiniLM-L6-v2")

CHUNKS = [
    # ── Personal bio & philosophy ──────────────────────────────────────────
    {
        "project_name": "general",
        "content": (
            "Aniruddha Saini builds AI products. Not demos — things that actually run, "
            "handle real users, and solve real problems. He is a final-year B.Tech CSE + AI/ML "
            "student at Manipal University Jaipur, graduating 2026, based in Gurgaon, Haryana. "
            "He co-founded Litify and ran the full product lifecycle end-to-end from zero to a "
            "live platform. On the engineering side he has shipped systems ranging from real-time "
            "AI exam proctoring with computer vision to LLM-powered tools in production. "
            "Short-term focused on applied AI engineering. Longer-term targeting an MBA at a "
            "serious European program — because the most interesting work happens where technical "
            "depth meets strategic leadership. "
            "Contact: aniruddhasaini@gmail.com. GitHub: github.com/Anirudh-Saini10. "
            "LinkedIn: linkedin.com/in/aniruddhasaini."
        ),
    },
    {
        "project_name": "general",
        "content": (
            "Aniruddha's mindset: decision-making is the most underrated skill in any room. "
            "Not frameworks, not gut instinct alone — the ability to weigh trade-offs clearly, "
            "move under uncertainty, and own the outcome. That is the real differentiator. "
            "He is available for AI/ML engineering internships and full-time roles in 2026. "
            "Strongest areas: computer vision, NLP, LLM fine-tuning, RAG pipelines, and "
            "full-stack development with React, Next.js, FastAPI, and Supabase. "
            "He has shipped 6 projects and earned 11+ certifications. "
            "Currently building PetPal — an AI pet companion with a Pet Twin simulation "
            "and intelligent health triage using Claude and LangChain."
        ),
    },

    # ── ProctorVision ──────────────────────────────────────────────────────
    {
        "project_name": "ProctorVision",
        "content": (
            "ProctorVision is an AI-powered remote exam proctoring platform. Live at proctorvision.onrender.com. "
            "Educators create exams with MCQ and short-answer questions, share 6-character join codes "
            "with candidates, and monitor them in real time via a live console with risk meters per candidate. "
            "The AI pipeline watches for phone and object detection using YOLOv8n, face presence and gaze "
            "using MediaPipe Face Mesh, multiple faces for proxy detection, tab switching, and audio anomalies. "
            "Webcam frames stream at 5 FPS via WebSocket. Risk score 0-100 decays naturally when behaviour "
            "normalises. Every violation triggers an evidence snapshot so proctors see exactly what the AI saw. "
            "Auto-grades MCQs instantly. Generates downloadable PDF integrity reports post-exam. "
            "Candidates join with a code and name — no account needed. Browser-based camera calibration, no install."
        ),
    },
    {
        "project_name": "ProctorVision",
        "content": (
            "ProctorVision tech stack and architecture: React 18 frontend with Vite and Tailwind CSS, "
            "FastAPI Python backend, YOLOv8 (Ultralytics) for object detection, MediaPipe Face Mesh "
            "for gaze and face count, OpenCV for frame processing, native WebSocket for real-time relay "
            "between candidate browser and proctor dashboard, JWT auth with bcrypt and python-jose, "
            "SQLModel and SQLite for zero-ops database, ReportLab for PDF report generation. "
            "Deployed on Render as a single service — frontend built into backend, same origin, no CORS. "
            "Future roadmap: multimodal VLM proctor agent that reasons before escalating to eliminate "
            "false positives, per-candidate eye-tracking calibration, screen recording, live two-way chat."
        ),
    },

    # ── Litify ────────────────────────────────────────────────────────────
    {
        "project_name": "Litify",
        "content": (
            "Litify is an e-commerce startup brand that Aniruddha co-founded with his co-founder. Live at litify.shop. "
            "It is a live online store that sells curated products with real customers and real orders. "
            "The platform includes a full storefront, cart, coupon codes, Razorpay payment integration, and live order management. "
            "Aniruddha and his co-founder built it end-to-end together. "
            "Aniruddha led the product ideation, product design, marketing strategy, brand identity, and overall business direction."
        ),
    },
    {
        "project_name": "Litify",
        "content": (
            "As co-founder of Litify, Aniruddha's role was on the product and business side: "
            "product ideation, UI/UX design decisions, marketing strategy, customer acquisition, brand identity, and go-to-market execution. "
            "Together they took the business from zero to a live operation with real customers. "
            "This experience gives Aniruddha a rare product and founder mindset — he understands the full picture, not just the engineering."
        ),
    },

    # ── Cadence ───────────────────────────────────────────────────────────
    {
        "project_name": "Cadence",
        "content": (
            "Cadence is a Goal Setting and Performance Tracking Portal built for AtomQuest Hackathon 1.0. "
            "Live at cadence-growth.vercel.app. "
            "Full enterprise OKR system: employees author weighted goals across 8 thrust areas with "
            "real-time validation enforcing total weightage equals 100 percent, minimum 10 percent per goal, "
            "maximum 8 goals. Managers approve via a structured workflow. Quarterly check-ins auto-score "
            "using 5 UoM formulas: Min (lower is better), Max (higher is better), Zero (zero equals success), "
            "Timeline (deadline-based milestones), Milestone (binary gates). "
            "Admin governs performance cycles, audits every action, monitors org-wide analytics with "
            "bar charts and pie charts, exports CSV data, sends escalation emails via Resend. "
            "Row-level security enforces the role model directly at the database layer."
        ),
    },
    {
        "project_name": "Cadence",
        "content": (
            "Cadence tech stack: React 18, Vite, TypeScript, TailwindCSS, shadcn/ui, Zustand for auth state, "
            "TanStack Query for server state with 5s stale time caching, Supabase Postgres + Auth + RLS, "
            "Recharts for analytics visualisations, Resend for email notifications, Vercel for deployment. "
            "Zero backend code — all business logic enforced at the database layer via RLS policies and triggers. "
            "Demo switcher lets judges instantly flip between Employee, Manager, and Admin dashboards "
            "without re-authenticating. Built by Aniruddha Saini for AtomQuest."
        ),
    },

    # ── ATSense ───────────────────────────────────────────────────────────
    {
        "project_name": "ATSense",
        "content": (
            "ATSense is an LLM-powered ATS resume analyzer. Live at atsense-wheat.vercel.app. "
            "Upload or paste a resume alongside a job description. ATSense returns: "
            "ATS Match Score 0-100 with Strong/Moderate/Weak classification, "
            "matching skills the resume already has, missing skills that are critical gaps, "
            "resume strengths, improvement suggestions, AI-optimised bullet points rewritten to match the JD, "
            "and a plain-English match explanation. "
            "The prompt engineers Gemini Flash to return only valid JSON with a fixed schema — "
            "no markdown, no preamble. A custom parser strips formatting artifacts. "
            "Client-side PDF extraction via pdfjs-dist — no server upload needed."
        ),
    },
    {
        "project_name": "ATSense",
        "content": (
            "ATSense tech stack: Next.js 16 with TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, "
            "pdfjs-dist for client-side PDF text extraction, Google Gemini Flash via Node.js SDK, "
            "custom JSON prompt engineering and parser, deployed on Vercel. "
            "Demonstrates Aniruddha's prompt engineering skills — making LLM output deterministic "
            "and parseable every time by designing a strict JSON schema and enforcing it in the prompt."
        ),
    },

    # ── SpamSentry ────────────────────────────────────────────────────────
    {
        "project_name": "SpamSentry",
        "content": (
            "SpamSentry is an NLP spam classifier. Fine-tuned DistilBERT on 5574 real SMS messages "
            "achieving 97 percent accuracy. Users paste a message and instantly see spam or not spam. "
            "Trained end-to-end with a custom PyTorch tokenisation pipeline and full data preprocessing. "
            "Live at spamsentry-scam-detector.streamlit.app. "
            "Demonstrates Aniruddha's NLP and transformer fine-tuning skills — building from raw dataset "
            "to production model with no shortcuts."
        ),
    },
    {
        "project_name": "SpamSentry",
        "content": (
            "SpamSentry tech stack: PyTorch, DistilBERT, Hugging Face Transformers, Streamlit. "
            "The project shows proficiency in the full ML lifecycle: data pipeline design, "
            "transformer fine-tuning, evaluation, and deployment. "
            "DistilBERT was chosen for its balance of speed and accuracy for text classification."
        ),
    },

    # ── PetPal ────────────────────────────────────────────────────────────
    {
        "project_name": "PetPal",
        "content": (
            "PetPal is an AI companion app for pet owners, currently Aniruddha's flagship project in active development. "
            "It builds a digital Pet Twin that learns your pet's personality over time through interactions. "
            "Features: AI health triage via Claude that gives breed-aware medical guidance, "
            "an emotional memory layer that tracks your pet's mood history, "
            "and breed-aware product recommendations. "
            "The Pet Twin simulation is the core innovation — it creates a persistent AI model of your specific pet. "
            "Live preview at pet-pal-love.vercel.app. "
            "Stack: Claude, LangChain, Supabase, Next.js."
        ),
    },

    # ── Certifications & achievements ─────────────────────────────────────
    {
        "project_name": "certifications",
        "content": (
            "Aniruddha holds 11+ certifications: "
            "Machine Learning Specialization (Stanford University, Coursera, 3-course series), "
            "Introduction to Machine Learning — Elite Certification (NPTEL, IIT Madras), "
            "Deep Learning — Elite + Silver Medal (NPTEL, IIT Ropar), "
            "Neural Networks and Deep Learning (DeepLearning.AI), "
            "Generative AI Engineering with LLMs including Fine-Tuning Transformers (IBM, Coursera), "
            "AI Agents using RAG and LangChain (IBM, Coursera), "
            "Generative AI Applications with RAG and LangChain (IBM, Coursera), "
            "Design and Analysis of Algorithms (NPTEL), "
            "Dean's List Academic Excellence (Manipal University Jaipur), "
            "Student Excellence Award (Manipal University Jaipur), "
            "Model United Nations Awardee."
        ),
    },

    # ── Why hire Aniruddha ────────────────────────────────────────────────
    {
        "project_name": "general",
        "content": (
            "Why hire Aniruddha Saini for an AI/ML role: "
            "He does not build demos — he ships products that run, handle real users, and solve real problems. "
            "He has co-founded a startup, shipped 6 projects across computer vision, NLP, and LLMs, "
            "and earned 11+ certifications from Stanford, IIT, IBM, and DeepLearning.AI. "
            "He understands the full stack — from fine-tuning transformers to deploying FastAPI backends "
            "to building React frontends. He thinks like a founder and executes like an engineer. "
            "He is available for AI/ML internships and full-time roles in 2026. "
            "Decision-making under uncertainty and owning outcomes are his core strengths."
        ),
    },
]


def seed():
    print(f"Seeding {len(CHUNKS)} chunks into Supabase...")
    for i, chunk in enumerate(CHUNKS):
        vec = model.encode(chunk["content"]).tolist()
        resp = sb.table("projects_knowledge").insert(
            {
                "project_name": chunk["project_name"],
                "content": chunk["content"],
                "embedding": vec,
            }
        ).execute()
        if not resp.data:
            print(f"  ERROR on [{i+1}/{len(CHUNKS)}] {chunk['project_name']}: insert returned no data")
            raise RuntimeError("Insert failed — did you run supabase/schema.sql first?")
        print(f"  [{i+1}/{len(CHUNKS)}] {chunk['project_name']}")
    print("Done! Vector database seeded.")


if __name__ == "__main__":
    seed()
