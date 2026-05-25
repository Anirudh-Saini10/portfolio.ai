# Portfolio.AI — Aniruddha's AI Twin Portfolio

> An interactive AI-powered developer portfolio where visitors don't just *read* about projects — they **ask questions** and get real, retrieved answers from a live RAG pipeline, delivered by an animated AI avatar with voice.

**Live:** [ai-portfolio-anirudh.vercel.app](https://ai-portfolio-anirudh.vercel.app)

---

## What Is This?

Most developer portfolios are static pages. This one talks back.

Portfolio.AI is a full-stack AI portfolio built around a real RAG (Retrieval-Augmented Generation) pipeline. The **ask.portfolio** interface lets any visitor type a natural language question — *"What's your strongest AI/ML project?"* or *"Why should I hire Aniruddha?"* — and get a specific, cited answer retrieved from a vector knowledge base of project documentation, delivered as text and voice through an animated avatar.

The project itself is also a portfolio project — demonstrating RAG architecture, vector search, LLM integration, and modern full-stack engineering end to end.

---

## Features

- **AI Twin Chatbot** — RAG pipeline over chunked project docs. Ask anything about Aniruddha's work, skills, or background.
- **Animated Avatar** — Cyberpunk-styled avatar that reacts to chat state: idle, thinking, speaking, error.
- **Voice Synthesis** — Browser-native Web Speech API with male English voice preference. Reads AI answers aloud on demand.
- **Portfolio Showcase** — Tabbed project browser: My Startup / Projects / Certifications / Tech Stack. Each card links to live deployments and GitHub repos.
- **My Startup Tab** — Litify (litify.shop), a live D2C e-commerce brand co-founded by Aniruddha, displayed as a featured startup card with metrics.
- **Suggested Questions** — Pre-wired canonical questions that trigger verbatim answers from the system prompt.
- **Contact Form** — EmailJS-powered contact form that delivers messages directly to aniruddhasaini@gmail.com.
- **Cyberpunk UI** — Custom dark theme with cyan/pink neon glow, custom cursor, noise texture, scroll animations via Framer Motion.
- **Backend Waker** — Pings the backend on page load to eliminate cold-start lag.
- **Resume Download** — Direct PDF resume download from the hero.

---

## Architecture

```
Visitor types a question
        │
        ▼
Next.js Frontend (Vercel)
        │  POST /ask  { query }
        ▼
FastAPI Backend (Hugging Face Spaces)
        │
        ├─ 1. Embed query → SentenceTransformer (all-MiniLM-L6-v2)
        │
        ├─ 2. Supabase pgvector → cosine similarity search → Top-5 chunks
        │
        ├─ 3. Build context from retrieved chunks
        │
        └─ 4. Groq LLM (llama-3.1-8b-instant) + System Prompt → Answer
                │
                ▼
        Frontend renders answer text
                │
        User clicks "hear it"
                │
                ▼
        Web Speech API → Browser TTS (male English voice)
                │
                ▼
        Avatar animates → "speaking" state
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework, SSR, API routes |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Scroll animations, avatar state transitions |
| Lucide React | Icons |
| EmailJS | Contact form email delivery |
| Web Speech API | Browser-native TTS voice synthesis |

### Backend
| Technology | Purpose |
|---|---|
| FastAPI | Async Python API server |
| SentenceTransformers (`all-MiniLM-L6-v2`) | Query embedding |
| Supabase (pgvector) | Vector database for cosine similarity search |
| Groq (`llama-3.1-8b-instant`) | LLM for answer generation (500K tokens/day free) |
| Python `asyncio` + ThreadPoolExecutor | Non-blocking inference pipeline |

### Infrastructure
| Service | What runs there |
|---|---|
| Vercel | Next.js frontend — auto-deploys on `git push` |
| Hugging Face Spaces (Docker) | FastAPI backend — free, no sleep |
| Supabase | PostgreSQL + pgvector knowledge base |
| GitHub | Source of truth — `Anirudh-Saini10/portfolio.ai` |

---

## How the RAG Pipeline Works

1. **Seeding** — `backend/seed.py` chunks project documentation (ProctorVision, ATSense, Cadence, SpamSentry, PetPal, Litify) and Aniruddha's bio into ~20 text chunks, embeds each with `all-MiniLM-L6-v2`, and stores them in Supabase with pgvector.

2. **Query** — On each question, the backend embeds the query into the same 384-dimensional space, then calls Supabase's `match_documents` RPC which runs `<=>` cosine similarity and returns the top-5 most relevant chunks.

3. **Generation** — The retrieved chunks are injected as context into a structured prompt sent to Groq's Llama model. The system prompt enforces Aniruddha's voice, canonical answers for suggested questions, and a portfolio CTA for project answers.

4. **Canonical Answers** — For the 6 pre-wired suggested questions, verbatim answers are embedded directly in the system prompt so they're always consistent and accurate, regardless of what pgvector retrieves.

---

## Repository Layout

```
portfolio/
├── backend/
│   ├── app/
│   │   └── main.py          # FastAPI app, system prompt, /ask endpoint
│   ├── seed.py              # Knowledge base seeding script
│   ├── requirements.txt
│   ├── Dockerfile           # For HF Spaces deployment
│   └── Procfile             # For Railway deployment (alternative)
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Main page — composes all sections
│   │   ├── layout.tsx       # Root layout, metadata, fonts
│   │   └── api/speak/       # TTS proxy route (legacy, Web Speech API used now)
│   ├── components/
│   │   ├── Hero.tsx         # Landing section with CTA buttons
│   │   ├── ChatConsole.tsx  # AI chat interface + avatar
│   │   ├── PortfolioShowcase.tsx  # Tabbed project browser
│   │   ├── Contact.tsx      # EmailJS contact form
│   │   ├── Avatar.tsx       # Animated cyberpunk avatar
│   │   └── ...
│   ├── hooks/
│   │   └── usePortfolioChat.ts  # Chat state, RAG fetch, Web Speech API
│   └── lib/
│       ├── projects.ts      # All project data
│       ├── techstack.ts     # Tech stack list
│       └── certifications.ts
│
├── docs/                    # Per-project markdown knowledge base
├── supabase/
│   └── schema.sql           # pgvector schema + match_documents RPC
└── scripts/
    └── ingest.py            # Alternative ingestion script
```

---

## Local Development

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
cp .env.example .env          # Fill in your keys
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # Fill in NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

---

## Deployment

### Backend → Hugging Face Spaces (Docker)

1. Create a Docker Space at [huggingface.co/new-space](https://huggingface.co/new-space)
2. Push `backend/` contents to the Space repo
3. Add secrets: `SUPABASE_URL`, `SUPABASE_KEY`, `GROQ_API_KEY`, `ALLOWED_ORIGINS`

### Frontend → Vercel

1. Import repo at [vercel.com](https://vercel.com), set root directory to `frontend`
2. Add env vars: `NEXT_PUBLIC_API_URL` (HF Spaces backend URL), `NEXT_PUBLIC_EMAILJS_*` keys

### Knowledge Base — Seed Supabase

```bash
cd backend
python seed.py    # Embeds all chunks and upserts into Supabase pgvector
```

---

## Environment Variables

### Backend (`.env`)
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=https://your-hf-space.hf.space
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Projects Featured

| Project | Category | Stack | Status |
|---|---|---|---|
| ProctorVision | Computer Vision | YOLOv8, MediaPipe, FastAPI, React | Live on HF Spaces |
| ATSense | LLM / NLP | Gemini 2.0, Streamlit, Python | Live on Vercel |
| Cadence | Full-Stack | React, Supabase, PostgreSQL, RLS | Live on Vercel |
| SpamSentry | NLP / ML | DistilBERT, PyTorch, HuggingFace | Live on Streamlit |
| PetPal | AI / LLM | Claude, LangChain, Supabase, Next.js | In Active Build |
| Litify | Startup / E-Commerce | WordPress, Razorpay, Elementor Pro | Live at litify.shop |

---

## Certifications Highlighted

- Machine Learning Specialization — Stanford / Coursera (3-course)
- Deep Learning — NPTEL Elite + Silver Medal, IIT Ropar
- Neural Networks and Deep Learning — DeepLearning.AI
- Generative AI Engineering with LLMs — IBM / Coursera
- AI Agents using RAG and LangChain — IBM / Coursera
- Generative AI Applications with RAG — IBM / Coursera

---

## Contact

**Aniruddha Saini**
- Email: aniruddhasaini@gmail.com
- GitHub: [github.com/Anirudh-Saini10](https://github.com/Anirudh-Saini10)
- LinkedIn: [linkedin.com/in/aniruddhasaini](https://linkedin.com/in/anirudh-saini1)
- Portfolio: [ai-portfolio-anirudh.vercel.app](https://ai-portfolio-anirudh.vercel.app)

---

*Built by Aniruddha Saini*
