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
-- Le client public peut rejoindre et mettre à jour une partie, mais ne doit
-- jamais pouvoir supprimer toutes les données via la clé anonyme.
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur games" ON public.games;
DROP POLICY IF EXISTS "games_select_public" ON public.games;
DROP POLICY IF EXISTS "games_insert_public" ON public.games;
DROP POLICY IF EXISTS "games_update_public" ON public.games;
CREATE POLICY "games_select_public"
ON public.games FOR SELECT
USING (true);
CREATE POLICY "games_insert_public"
ON public.games FOR INSERT
WITH CHECK ("gameId" IS NOT NULL);
CREATE POLICY "games_update_public"
ON public.games FOR UPDATE
USING (true)
WITH CHECK ("gameId" IS NOT NULL);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur questions" ON public.questions;
DROP POLICY IF EXISTS "questions_select_public" ON public.questions;
CREATE POLICY "questions_select_public"
ON public.questions FOR SELECT
USING (true);

-- Activer le temps réel (Realtime) sur la table games
ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
