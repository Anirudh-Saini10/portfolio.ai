# ATSense — AI Resume Analyzer

## Overview
ATSense is an LLM-powered ATS-style resume analyzer. A user uploads a resume
and pastes a job description, and the system returns a match score, skill gaps,
resume strengths, and AI-rewritten bullet points tailored to the job.

## Tech Stack
- Google Gemini 2.0 Flash as the underlying LLM
- Streamlit for the interactive UI
- Python backend with custom prompt engineering and JSON parsing
- Vercel for deployment

## Architecture
A modular Python backend separates concerns into three components:
- `gemini_utils` for LLM calls and configuration
- a prompt builder that produces structured JSON-only prompts
- a response parser with custom error handling for malformed model output

The Streamlit frontend collects the resume and job description and renders the
parsed analysis.

## How It Works
1. The user uploads a resume and pastes a job description.
2. The prompt builder constructs a structured prompt that instructs Gemini to
   return strict JSON with fields for match score, skill gaps, strengths, and
   rewritten bullets.
3. Gemini 2.0 Flash returns a JSON response.
4. The custom parser validates and recovers from malformed JSON, surfacing a
   clean structured object to the UI.
5. The UI renders the score, gap analysis, and AI-rewritten bullets.

## Challenges and Solutions
- LLM output reliability: enforced strict JSON-only prompts and built a
  forgiving custom parser to recover from common formatting drift.
- Useful, not generic, feedback: prompts compare resume content against the
  specific job description rather than producing boilerplate advice.
- Modularity: split the backend into prompt-building, LLM call, and parsing
  layers so each can be tested and swapped independently.

## Outcomes
- Deployed live on Vercel at https://atsense-analyse.vercel.app/
- Demonstrates practical prompt engineering, structured-output discipline, and
  shipping LLM apps end-to-end.

## Links
- Live demo: https://atsense-analyse.vercel.app/
