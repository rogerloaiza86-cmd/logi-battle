import { createClient } from '@supabase/supabase-js'

/** Projet Logi Battle. La clé publique ne lit pas le registre sans la clé professeur. */
export const LOGI_BATTLE_URL = 'https://woyfjjyfahxrfffeeghn.supabase.co'
export const LOGI_BATTLE_KEY = 'sb_publishable_vOStMGkfbtaDwot9Gkx7CQ_1-oJfqb_'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || LOGI_BATTLE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || LOGI_BATTLE_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
