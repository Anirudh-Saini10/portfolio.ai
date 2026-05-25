# Portfolio.AI — Interactive RAG Portfolio System

## Overview
Portfolio.AI is the very system you are interacting with right now. It is
Aniruddha's developer portfolio, but instead of static project pages it
exposes a live conversational interface. Visitors ask natural language
questions and receive spoken, retrieved answers from an animated avatar.

## Tech Stack
- Next.js 14 with the App Router, React 18, TypeScript, Tailwind CSS, and
  Framer Motion on the frontend, deployed on Vercel
- Lottie animations for the avatar states (idle, thinking, speaking)
- FastAPI backend deployed on Railway
- Sentence Transformers (all-MiniLM-L6-v2, 384 dimensions) for embeddings
- Supabase PostgreSQL with the pgvector extension for vector storage and
  cosine similarity search
- Google Gemini 1.5 Flash as the answer-generation LLM
- ElevenLabs Turbo v2 for real-time text-to-speech, proxied through a Next.js
  API route to keep the API key server-side

## Architecture
1. The visitor sends a question from the Next.js frontend.
2. The FastAPI backend embeds the question with all-MiniLM-L6-v2.
3. Supabase pgvector returns the top K most similar chunks via a custom
   `match_projects` RPC using cosine similarity.
4. The retrieved chunks are injected into a Gemini 1.5 Flash prompt that is
   constrained to answer only from context.
5. The answer text is streamed back to the frontend, displayed immediately,
   and sent to a Next.js API route that calls ElevenLabs and returns an MP3.
6. The avatar animates while the audio plays.

## Why This Project Exists
Most AI/ML candidates show GitHub repos. This portfolio is itself a deployed,
working AI system that happens to be about Aniruddha's other projects. The
meta-signal is intentional: it proves end-to-end RAG, vector retrieval, LLM
integration, TTS, and full-stack deployment in one cohesive product.

## Outcomes
- Built and deployed an interactive AI portfolio with real RAG, not a
  templated chatbot wrapper.
- Demonstrates command of the full AI application stack.
