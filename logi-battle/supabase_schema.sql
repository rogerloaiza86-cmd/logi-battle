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
-- Les clients publics peuvent créer/rejoindre une partie et mettre à jour son état,
-- mais ils ne doivent jamais pouvoir supprimer des données ni modifier les questions.
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur games" ON public.games;
DROP POLICY IF EXISTS "Lecture publique des parties" ON public.games;
DROP POLICY IF EXISTS "Creation publique des parties" ON public.games;
DROP POLICY IF EXISTS "Mise a jour publique bornee des parties" ON public.games;

REVOKE DELETE ON public.games FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.games TO anon, authenticated;

CREATE POLICY "Lecture publique des parties"
ON public.games FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Creation publique des parties"
ON public.games FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'waiting'
  AND teamA_score = 0
  AND teamB_score = 0
  AND rope_position = 0
);

CREATE POLICY "Mise a jour publique bornee des parties"
ON public.games FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (
  status IN ('waiting', 'active', 'finished')
  AND teamA_score >= 0
  AND teamB_score >= 0
  AND rope_position BETWEEN -100 AND 100
  AND (winner IS NULL OR winner IN ('A', 'B'))
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Activer l'accès anonyme général sur questions" ON public.questions;
DROP POLICY IF EXISTS "Lecture publique des questions" ON public.questions;

REVOKE INSERT, UPDATE, DELETE ON public.questions FROM anon, authenticated;
GRANT SELECT ON public.questions TO anon, authenticated;

CREATE POLICY "Lecture publique des questions"
ON public.questions FOR SELECT
TO anon, authenticated
USING (true);

-- Activer le temps réel (Realtime) sur la table games
ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
