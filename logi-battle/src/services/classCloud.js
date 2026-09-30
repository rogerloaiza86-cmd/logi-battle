import { supabase } from './supabase'
import { ROOM_ALPHABET } from './roomCode'
import { classForCloud } from '../utils/classRegisterFile'

function randomToken(length) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => ROOM_ALPHABET[byte % ROOM_ALPHABET.length]).join('')
}

export function createClassCode() {
  return randomToken(8)
}

export function createTeacherKey() {
  return randomToken(32)
}

export function cloudReady() {
  return Boolean(supabase)
}

const saveTails = new Map()

/** Une classe = une publication à la fois. La suivante attend, sinon un aller-retour lent écrase le registre le plus récent. */
export function enqueueSave(code, task) {
  const previous = saveTails.get(code) || Promise.resolve()
  const next = previous.then(task, task)
  saveTails.set(code, next)
  return next
}

export function saveClassOnline(cls, online) {
  if (!supabase) return Promise.resolve({ ok: false, error: 'La liaison en ligne n’est pas prête.' })
  if (!online?.code || !online?.teacherKey) return Promise.resolve({ ok: false, error: 'Code ou clé manquant.' })
  const payload = classForCloud({ ...cls, online })
  return enqueueSave(online.code, async () => {
    const { error } = await supabase.rpc('save_class_register', {
      p_code: online.code,
      p_key: online.teacherKey,
      p_payload: payload,
    })
    if (error) return { ok: false, error: 'La publication a été refusée. Vérifiez la clé professeur.' }
    return { ok: true }
  })
}

export async function loadClassOnline(code, teacherKey) {
  if (!supabase) return { ok: false, error: 'La liaison en ligne n’est pas prête.' }
  const normalized = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
  const { data, error } = await supabase.rpc('load_class_register', {
    p_code: normalized,
    p_key: teacherKey,
  })
  if (error || !data) return { ok: false, error: 'Code ou clé professeur refusé.' }
  return {
    ok: true,
    classData: {
      ...data,
      online: { code: normalized, teacherKey },
    },
  }
}
