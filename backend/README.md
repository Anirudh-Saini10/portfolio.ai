# Portfolio.AI Backend (FastAPI)

RAG service: embeds the visitor's question, retrieves top-K chunks from Supabase pgvector, and asks Gemini 1.5 Flash for a concise answer.

## Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
# fill SUPABASE_URL, SUPABASE_KEY, GEMINI_API_KEY
```

## Ingest project docs

Run once after editing files in `../docs/`:

```powershell
python ../scripts/ingest.py
```

## Run

```powershell
uvicorn app.main:app --reload --port 8000
```

Health check: http://localhost:8000/health

## Test the RAG endpoint

```powershell
curl -X POST http://localhost:8000/ask `
  -H "Content-Type: application/json" `
  -d '{"query": "Tell me about ProctorVision"}'
```

## Deploy (Railway)

1. Create a Railway project from the `backend/` folder.
2. Set env vars: `SUPABASE_URL`, `SUPABASE_KEY`, `GEMINI_API_KEY`, `ALLOWED_ORIGINS`.
3. Start command:
   ```
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
