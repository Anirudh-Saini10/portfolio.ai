# PetPal — Intelligent Pet Companion App

## Overview
PetPal is a breed-aware AI pet companion app that combines a high-fidelity pet
simulation called Pet Twin with AI-driven health triage, personalized shopping,
emotional memory tooling, and community features. It is designed for pet owners
who want a single product that supports both the daily emotional and practical
sides of pet care.

## Tech Stack
- Claude API for conversational intelligence and triage
- Supabase for real-time data, auth, and storage
- LangChain for orchestration of LLM calls and tools
- Frontend deployed on Vercel

## Architecture
PetPal is architected for long-term scalability with a product-first design
philosophy. Conversational and reasoning workloads are routed through the
Claude API via LangChain so prompts, tools, and memory are managed cleanly.
Persistent state, including the pet twin profile and emotional memory, is
stored in Supabase with real-time sync to the client.

## How It Works
1. A user creates a Pet Twin: breed, age, personality traits, and history.
2. Conversations with the pet companion are routed through Claude with
   breed-aware context.
3. AI health triage interprets symptom descriptions and routes the user to
   appropriate next actions.
4. Personalized shopping recommends products tuned to breed, age, and history.
5. Emotional memory tooling persists meaningful interactions over time so the
   companion stays consistent and grows with the pet.
6. Community features connect owners of similar breeds.

## Challenges and Solutions
- Designing for long-term consistency: emotional memory is modeled as a
  first-class data layer in Supabase, not stuffed into prompt context, so it
  scales as conversations grow.
- Orchestrating multi-step LLM flows: LangChain manages tool calls and prompt
  composition cleanly.
- Product-first scope: features are sequenced so each shipping milestone is
  independently useful (twin, then triage, then shopping, then community).

## Status
The landing page is live on Vercel at https://pet-pal-love.vercel.app/. The
full product is in active development from April 2026.

## Links
- Landing page: https://pet-pal-love.vercel.app/
