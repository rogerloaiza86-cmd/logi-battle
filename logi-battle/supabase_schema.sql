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
-- Les clients anonymes peuvent créer/lire/mettre à jour les parties en cours,
-- mais ne peuvent pas supprimer les données de jeu.
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur games" ON public.games;
DROP POLICY IF EXISTS "Autoriser la lecture publique sur games" ON public.games;
DROP POLICY IF EXISTS "Autoriser la création publique sur games" ON public.games;
DROP POLICY IF EXISTS "Autoriser la modification publique sur games" ON public.games;
CREATE POLICY "Autoriser la lecture publique sur games"
ON public.games FOR SELECT
USING (true);
CREATE POLICY "Autoriser la création publique sur games"
ON public.games FOR INSERT
WITH CHECK (true);
CREATE POLICY "Autoriser la modification publique sur games"
ON public.games FOR UPDATE
USING (true)
WITH CHECK (true);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur questions" ON public.questions;
DROP POLICY IF EXISTS "Autoriser la lecture publique sur questions" ON public.questions;
DROP POLICY IF EXISTS "Autoriser la création publique sur questions" ON public.questions;
CREATE POLICY "Autoriser la lecture publique sur questions"
ON public.questions FOR SELECT
USING (true);
CREATE POLICY "Autoriser la création publique sur questions"
ON public.questions FOR INSERT
WITH CHECK (true);

-- Activer le temps réel (Realtime) sur la table games
ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
