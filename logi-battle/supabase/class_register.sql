-- Registre de classe Logi Battle.
-- La table n'est pas lisible par la clé publique.
-- Seules les fonctions acceptent un code de classe et une clé professeur.

create schema if not exists private;
revoke all on schema private from public;
revoke all on schema private from anon, authenticated;

create extension if not exists pgcrypto with schema extensions;

create table private.class_registers (
  class_code text primary key,
  teacher_key_hash text not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  constraint class_code_format check (class_code ~ '^[A-Z2-9]{8}$')
);

alter table private.class_registers enable row level security;
revoke all on table private.class_registers from public, anon, authenticated;
