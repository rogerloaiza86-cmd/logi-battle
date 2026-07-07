import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const shouldUseSupabase = import.meta.env.VITE_DB_MODE === 'supabase';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (shouldUseSupabase && !isSupabaseConfigured) {
  console.warn('Mode Supabase actif, mais VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY est manquant.');
}

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
