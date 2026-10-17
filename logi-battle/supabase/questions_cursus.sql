-- Copie interrogeable des banques de cursus.
-- Le jeu lit encore src/data/banques : la bonne réponse ne doit pas
-- être lisible par la clé anonyme. Aucune policy de lecture publique.

create table if not exists public.questions_cursus (
  id text primary key,
  voie text not null check (voie in ('generale', 'technologique', 'professionnelle')),
  annee text not null check (annee in ('seconde', 'premiere', 'terminale')),
  matiere text not null check (matiere in ('francais', 'mathematiques', 'histoire', 'geographie', 'anglais', 'espagnol')),
  programme_id text not null,
  theme text not null,
  enonce text not null,
  options jsonb not null,
  correct_option integer not null check (correct_option between 0 and 3),
  explication text not null,
  created_at timestamptz not null default now()
);

alter table public.questions_cursus enable row level security;
