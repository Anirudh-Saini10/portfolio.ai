-- Portfolio.AI — Supabase schema
-- Run this in the Supabase SQL Editor.

-- 1. Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Knowledge base table
CREATE TABLE IF NOT EXISTS projects_knowledge (
  id           BIGSERIAL PRIMARY KEY,
  project_name TEXT,
  content      TEXT,
  embedding    VECTOR(384),
  metadata     JSONB,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Vector index (skip for small datasets; add later when rows > 1000)
-- CREATE INDEX IF NOT EXISTS projects_knowledge_embedding_idx
--   ON projects_knowledge
--   USING ivfflat (embedding vector_cosine_ops)
--   WITH (lists = 100);

-- 4. RPC for similarity search (Supabase python client cannot do pgvector via table API)
CREATE OR REPLACE FUNCTION match_projects(
  query_embedding VECTOR(384),
  match_count     INT,
  project_filter  TEXT DEFAULT NULL
)
RETURNS TABLE(
  id BIGINT,
  content TEXT,
  project_name TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    pk.id,
    pk.content,
    pk.project_name,
    1 - (pk.embedding <=> query_embedding) AS similarity
  FROM projects_knowledge pk
  WHERE project_filter IS NULL OR pk.project_name = project_filter
  ORDER BY pk.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
