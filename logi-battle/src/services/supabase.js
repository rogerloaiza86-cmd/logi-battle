import { createClient } from '@supabase/supabase-js';

const env = import.meta.env || {};
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (env.VITE_DB_MODE === 'supabase' && !isSupabaseConfigured) {
  console.warn('Supabase URL ou Anon Key manquante dans le fichier .env');
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error('Configuration Supabase manquante: VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont requis en mode supabase.');
  }

  return supabase;
};
