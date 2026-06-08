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
-- Le client web utilise une clé publique: ne jamais accorder FOR ALL à anon.
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur games" ON public.games;
DROP POLICY IF EXISTS "games_public_select" ON public.games;
DROP POLICY IF EXISTS "games_public_insert" ON public.games;
DROP POLICY IF EXISTS "games_public_update_scores" ON public.games;

CREATE POLICY "games_public_select"
ON public.games FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "games_public_insert"
ON public.games FOR INSERT
TO anon, authenticated
WITH CHECK (
  "gameId" IS NOT NULL
  AND "teamA_score" = 0
  AND "teamB_score" = 0
  AND "rope_position" = 0
);

-- Maintient la compatibilité du mode hôte existant sans permettre DELETE.
-- Pour une intégrité forte des scores, déplacer ces écritures derrière une Function authentifiée.
CREATE POLICY "games_public_update_scores"
ON public.games FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (
  "teamA_score" >= 0
  AND "teamB_score" >= 0
  AND "rope_position" BETWEEN -100 AND 100
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur questions" ON public.questions;
DROP POLICY IF EXISTS "questions_public_select" ON public.questions;

CREATE POLICY "questions_public_select"
ON public.questions FOR SELECT
TO anon, authenticated
USING (true);

-- Activer le temps réel (Realtime) sur la table games
ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
