import { createClient } from '@supabase/supabase-js';

const dbMode = import.meta.env.VITE_DB_MODE || 'local';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const shouldUseSupabase = dbMode === 'supabase';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (shouldUseSupabase && !isSupabaseConfigured) {
  console.warn('Mode Supabase actif, mais URL ou clé publique manquante dans l’environnement.');
}

export const supabase = shouldUseSupabase && isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
