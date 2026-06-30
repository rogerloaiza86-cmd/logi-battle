import { createClient } from '@supabase/supabase-js';

const dbMode = import.meta.env.VITE_DB_MODE || 'local';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (dbMode === 'supabase' && !isSupabaseConfigured) {
  console.warn('Supabase est demandé, mais VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY est manquant.');
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
