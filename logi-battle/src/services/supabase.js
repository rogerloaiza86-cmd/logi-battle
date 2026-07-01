import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const wantsSupabase = import.meta.env.VITE_DB_MODE === 'supabase';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (wantsSupabase && !isSupabaseConfigured) {
  console.warn('Supabase URL ou Anon Key manquante dans le fichier .env');
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
