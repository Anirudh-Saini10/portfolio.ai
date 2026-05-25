"""Ingest /docs markdown files into Supabase pgvector.

Run once (or whenever docs change):

    python scripts/ingest.py            # incremental (skip existing project)
    python scripts/ingest.py --reset    # wipe table first

Embedding model: all-MiniLM-L6-v2 (384 dim). Do not change without re-ingesting.
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path

from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from supabase import create_client

ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = ROOT / "docs"
ENV_FILE = ROOT / "backend" / ".env"

load_dotenv(ENV_FILE)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise SystemExit(
        "SUPABASE_URL and SUPABASE_KEY must be set (see backend/.env)"
    )


def chunk_text(text: str, size: int = 300, overlap: int = 50) -> list[str]:
    words = text.split()
    if not words:
        return []
    chunks: list[str] = []
    step = max(1, size - overlap)
    for i in range(0, len(words), step):
        chunk = " ".join(words[i : i + size]).strip()
        if chunk:
            chunks.append(chunk)
        if i + size >= len(words):
            break
    return chunks


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--reset",
        action="store_true",
        help="Delete all rows from projects_knowledge before ingesting",
    )
    args = parser.parse_args()

    if not DOCS_DIR.exists():
        raise SystemExit(f"Docs folder not found: {DOCS_DIR}")

    print(f"Loading embedding model (all-MiniLM-L6-v2)...")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    sb = create_client(SUPABASE_URL, SUPABASE_KEY)

    if args.reset:
        print("Wiping projects_knowledge table...")
        sb.table("projects_knowledge").delete().neq("id", 0).execute()

    md_files = sorted(DOCS_DIR.glob("*.md"))
    if not md_files:
        raise SystemExit(f"No markdown files in {DOCS_DIR}")

    total = 0
    for md in md_files:
        project_name = md.stem
        text = md.read_text(encoding="utf-8")

        if not args.reset:
            existing = (
                sb.table("projects_knowledge")
                .select("id")
                .eq("project_name", project_name)
                .limit(1)
                .execute()
            )
            if existing.data:
                print(f"  - Skipping {project_name} (already ingested)")
                continue

        chunks = chunk_text(text)
        if not chunks:
            print(f"  - {project_name}: empty, skipped")
            continue

        embeddings = model.encode(chunks).tolist()
        rows = [
            {
                "project_name": project_name,
                "content": c,
                "embedding": e,
                "metadata": {"source": md.name, "chunk_index": i},
            }
            for i, (c, e) in enumerate(zip(chunks, embeddings))
        ]
        # Insert in batches of 100 to stay under PostgREST payload limits
        for i in range(0, len(rows), 100):
            sb.table("projects_knowledge").insert(rows[i : i + 100]).execute()

        print(f"  + Ingested {len(rows)} chunks for {project_name}")
        total += len(rows)

    print(f"\nDone. Total chunks ingested this run: {total}")


if __name__ == "__main__":
    main()
