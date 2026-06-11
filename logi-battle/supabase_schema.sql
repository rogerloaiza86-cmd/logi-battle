-- Geronimo Coop (logi-battle) — schéma Supabase
-- Tables préfixées logi_battle_* (hébergées dans le projet geronimo-compagnon).
-- RLS durci : pas de DELETE public, UPDATE limité aux parties non terminées.
-- Appliqué le 2026-06-11 via migration `logi_battle_schema_hardened`.

CREATE TABLE IF NOT EXISTS public.logi_battle_games (
  "gameId" TEXT PRIMARY KEY,
  "teamAName" TEXT NOT NULL DEFAULT 'Équipe A',
  "teamBName" TEXT NOT NULL DEFAULT 'Équipe B',
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished')),
  "teamA_score" INTEGER NOT NULL DEFAULT 0 CHECK ("teamA_score" >= 0),
  "teamB_score" INTEGER NOT NULL DEFAULT 0 CHECK ("teamB_score" >= 0),
  rope_position INTEGER NOT NULL DEFAULT 0 CHECK (rope_position BETWEEN -100 AND 100),
  current_question_id TEXT,
  winner TEXT CHECK (winner IN ('A', 'B')),
  history JSONB DEFAULT '[]'::jsonb,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.logi_battle_questions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  difficulty INTEGER NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  data JSONB,
  "correctAnswer" JSONB,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.logi_battle_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logi_battle_questions ENABLE ROW LEVEL SECURITY;

-- games : lecture et création publiques (jeu en classe sans compte),
-- mise à jour uniquement tant que la partie n'est pas terminée, jamais de suppression.
CREATE POLICY "logi_battle_games_select" ON public.logi_battle_games
  FOR SELECT USING (true);
CREATE POLICY "logi_battle_games_insert" ON public.logi_battle_games
  FOR INSERT WITH CHECK (status = 'waiting');
CREATE POLICY "logi_battle_games_update" ON public.logi_battle_games
  FOR UPDATE USING (status <> 'finished') WITH CHECK (true);

-- questions : lecture publique, insertion publique, ni update ni delete.
CREATE POLICY "logi_battle_questions_select" ON public.logi_battle_questions
  FOR SELECT USING (true);
CREATE POLICY "logi_battle_questions_insert" ON public.logi_battle_questions
  FOR INSERT WITH CHECK (true);

-- Realtime (postgres_changes) sur les parties
ALTER PUBLICATION supabase_realtime ADD TABLE public.logi_battle_games;

-- Purge RGPD : suppression automatique des parties de plus de 30 jours
CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule(
  'logi-battle-purge-old-games',
  '0 4 * * *',
  $$DELETE FROM public.logi_battle_games WHERE "createdAt" < now() - interval '30 days'$$
);
