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
-- Les clients anonymes peuvent uniquement créer/lire une partie.
-- Ils ne peuvent pas supprimer de parties, ni lire/écrire la banque de questions
-- qui contient les bonnes réponses.
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur games" ON public.games;
DROP POLICY IF EXISTS "games_public_select" ON public.games;
DROP POLICY IF EXISTS "games_public_insert" ON public.games;
DROP POLICY IF EXISTS "games_public_update" ON public.games;
CREATE POLICY "games_public_select"
ON public.games FOR SELECT
USING (true);
CREATE POLICY "games_public_insert"
ON public.games FOR INSERT
WITH CHECK (true);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur questions" ON public.questions;
DROP POLICY IF EXISTS "questions_public_read" ON public.questions;
DROP POLICY IF EXISTS "questions_public_write" ON public.questions;

-- Activer le temps réel (Realtime) sur la table games
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
