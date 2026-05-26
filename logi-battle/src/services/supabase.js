import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const wantsSupabase = import.meta.env.VITE_DB_MODE === 'supabase';

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

if (wantsSupabase && !hasSupabaseConfig) {
  console.warn('Supabase désactivé: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquante');
}

export const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;
