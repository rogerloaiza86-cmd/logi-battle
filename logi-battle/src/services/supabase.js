import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseMode = import.meta.env.VITE_DB_MODE === 'supabase';

if (isSupabaseMode && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont requis en mode Supabase');
}

export const supabase = isSupabaseMode
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
