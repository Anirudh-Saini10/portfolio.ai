# Portfolio.AI — Interactive RAG Portfolio System

An AI-powered developer portfolio for **Aniruddha Saini**. Visitors don't just read project pages — they ask questions and get spoken, retrieved answers from an animated avatar, powered by a real RAG pipeline over project documentation.

## Architecture

```
USER → Next.js (Vercel) → FastAPI (Railway)
                              ↓
              Embed query (all-MiniLM-L6-v2)
                              ↓
              Supabase pgvector — cosine similarity
                              ↓
              Top-K chunks → Gemini 1.5 Flash
                              ↓
              Answer text → ElevenLabs TTS → MP3
                              ↓
        Frontend: animate avatar + show text + play audio
```

## Repository Layout

```
portfolio/
  backend/        FastAPI RAG service
  frontend/       Next.js 14 cyberpunk portfolio
  docs/           Project knowledge base (RAG source of truth)
  scripts/        Supabase ingestion script
  supabase/       SQL schema + RPC function
```

## Quick Start

See `backend/README.md` and `frontend/README.md` for per-service instructions.

High level:

1. Create a Supabase project, enable `pgvector`, run `supabase/schema.sql`.
2. Fill `backend/.env` (Supabase + Gemini keys) and run the ingestion script.
3. Start the FastAPI backend.
4. Fill `frontend/.env.local` (API URL + ElevenLabs key) and run the Next.js app.

## Resume Bullet

> **Portfolio.AI — Interactive RAG Portfolio System**
> Built an AI-powered portfolio featuring an end-to-end RAG pipeline (Supabase pgvector + Gemini 1.5 Flash), real-time TTS voice synthesis (ElevenLabs), animated avatar with audio-sync, and full-stack deployment (Next.js/Vercel + FastAPI/Railway). Answers natural-language queries about projects via cosine-similarity retrieval over chunked project documentation.
