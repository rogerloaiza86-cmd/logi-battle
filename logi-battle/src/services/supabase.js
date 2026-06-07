import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseMode = import.meta.env.VITE_DB_MODE === 'supabase';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (isSupabaseMode && !isSupabaseConfigured) {
  console.warn('Supabase est active mais VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY est manquante.');
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const requireSupabase = () => {
  if (!supabase) {
    throw new Error('Configuration Supabase manquante. Définissez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY ou utilisez VITE_DB_MODE=local.');
  }

  return supabase;
};
