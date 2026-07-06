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
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur games" ON public.games;
DROP POLICY IF EXISTS "Lecture publique des parties" ON public.games;
DROP POLICY IF EXISTS "Création publique des parties" ON public.games;

REVOKE ALL ON TABLE public.games FROM anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.games TO anon, authenticated;

CREATE POLICY "Lecture publique des parties"
ON public.games FOR SELECT
USING (true);

CREATE POLICY "Création publique des parties"
ON public.games FOR INSERT
WITH CHECK (
  "status" = 'waiting'
  AND "teamA_score" = 0
  AND "teamB_score" = 0
  AND "rope_position" = 0
  AND "winner" IS NULL
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur questions" ON public.questions;

REVOKE ALL ON TABLE public.questions FROM anon, authenticated;

-- Activer le temps réel (Realtime) sur la table games
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'games'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
  END IF;
END $$;
