import { supabase } from './supabase'

/** Code court de salle, sans caractère ambigu (0/O, 1/I). */

export const ROOM_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function createRoomCode() {
  const bytes = new Uint8Array(5)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => ROOM_ALPHABET[byte % ROOM_ALPHABET.length]).join('')
}

export function normalizeRoomCode(raw) {
  const cleaned = String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
  const body = cleaned.startsWith('GAME') && cleaned.length > 4 ? cleaned.slice(4) : cleaned
  return body.slice(0, 5)
}

export function isRealtimeReady() {
  return Boolean(supabase)
}

export function roomEntryLabel() {
  const base = import.meta.env.BASE_URL || '/'
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  return `${window.location.host}${prefix}`
}

export function roomJoinUrl(code) {
  const base = import.meta.env.BASE_URL || '/'
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  return `${window.location.origin}${prefix}/join?game=${code}`
}

export function goToJoin() {
  const base = import.meta.env.BASE_URL || '/'
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  window.history.pushState({}, '', `${prefix}/join`)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
