-- Script SQL à exécuter dans l'éditeur SQL de Supabase (SQL Editor)

-- Table des parties (Games)
CREATE TABLE IF NOT EXISTS public.games (
  "gameId" TEXT PRIMARY KEY,
  "teamAName" TEXT,
  "teamBName" TEXT,
  "status" TEXT DEFAULT 'waiting',
  "teamA_score" INTEGER DEFAULT 0,
  "teamB_score" INTEGER DEFAULT 0,
  "rope_position" INTEGER DEFAULT 0,
  "current_question_id" TEXT,
  "winner" TEXT,
  "history" JSONB DEFAULT '[]'::jsonb,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des questions (si vous souhaitez aussi les stocker sur Supabase)
CREATE TABLE IF NOT EXISTS public.questions (
  "id" TEXT PRIMARY KEY,
  "type" TEXT,
  "difficulty" INTEGER,
  "data" JSONB,
  "correctAnswer" JSONB,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sécurité RLS (Row Level Security)
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Activer l'accès anonyme général sur games" ON public.games;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur questions" ON public.questions;
DROP POLICY IF EXISTS "games_public_select" ON public.games;
DROP POLICY IF EXISTS "games_public_insert" ON public.games;
DROP POLICY IF EXISTS "games_public_update" ON public.games;
DROP POLICY IF EXISTS "questions_public_read" ON public.questions;

REVOKE ALL ON public.games FROM anon, authenticated;
REVOKE ALL ON public.questions FROM anon, authenticated;

GRANT SELECT, INSERT ON public.games TO anon, authenticated;
GRANT UPDATE ("status", "teamA_score", "teamB_score", "rope_position", "current_question_id", "winner", "history")
ON public.games TO anon, authenticated;

CREATE POLICY "games_public_select"
ON public.games FOR SELECT
USING ("gameId" LIKE 'GAME-%');

CREATE POLICY "games_public_insert"
ON public.games FOR INSERT
WITH CHECK (
  "gameId" LIKE 'GAME-%'
  AND "status" IN ('waiting', 'active', 'finished')
  AND "teamA_score" >= 0
  AND "teamB_score" >= 0
  AND "rope_position" BETWEEN -100 AND 100
);

CREATE POLICY "games_public_update"
ON public.games FOR UPDATE
USING ("gameId" LIKE 'GAME-%')
WITH CHECK (
  "gameId" LIKE 'GAME-%'
  AND "status" IN ('waiting', 'active', 'finished')
  AND "teamA_score" >= 0
  AND "teamB_score" >= 0
  AND "rope_position" BETWEEN -100 AND 100
);

-- Les questions contiennent les réponses; elles doivent être gérées côté serveur/admin.

-- Activer le temps réel (Realtime) sur la table games
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
