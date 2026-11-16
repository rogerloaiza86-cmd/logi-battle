import { createClient } from '@supabase/supabase-js'

/** Projet Logi Battle. La clé publique ne lit pas le registre sans la clé professeur. */
export const LOGI_BATTLE_URL = 'https://api-logi.fanalio.com'
export const LOGI_BATTLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiZXhwIjoxODI2Mzg5MjQyLCJqdGkiOiJlZGM1YWZkMDYxYTBkM2ZhZDdkOGMwMjcxNTIxNzI4NiJ9.gTFCIYEAwpX8JubWPpfJmrwJgV0QoSu53LRFK0oHHLs'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || LOGI_BATTLE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || LOGI_BATTLE_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
