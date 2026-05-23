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
-- Autorise la lecture, l'insertion et la modification publique nécessaires au jeu,
-- sans exposer la suppression de parties/questions à la clé anonyme.
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Autoriser la lecture anonyme sur games"
ON public.games FOR SELECT
USING (true);
CREATE POLICY "Autoriser l'insertion anonyme sur games"
ON public.games FOR INSERT
WITH CHECK (true);
CREATE POLICY "Autoriser la mise à jour anonyme sur games"
ON public.games FOR UPDATE
USING (true) 
WITH CHECK (true);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Autoriser la lecture anonyme sur questions"
ON public.questions FOR SELECT
USING (true);
CREATE POLICY "Autoriser l'insertion anonyme sur questions"
ON public.questions FOR INSERT
WITH CHECK (true);
CREATE POLICY "Autoriser la mise à jour anonyme sur questions"
ON public.questions FOR UPDATE
USING (true) 
WITH CHECK (true);

-- Activer le temps réel (Realtime) sur la table games
ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
