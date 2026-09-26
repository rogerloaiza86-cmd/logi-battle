/** Fichier de reprise des classes, lisible sur un autre ordinateur. */

export const REGISTER_FORMAT = 'geronimo-classes'
const NIVEAUX = new Set(['seconde', 'premiere', 'terminale'])

function cleanText(value, max) {
  return String(value || '').trim().slice(0, max)
}

function sanitizeGroup(group) {
  if (!group || typeof group.name !== 'string' || !group.name.trim()) return null
  const stats = group.stats || {}
  return {
    id: cleanText(group.id, 80) || `group_${Date.now()}`,
    name: cleanText(group.name, 40),
    members: Array.isArray(group.members) ? group.members.map((member) => cleanText(member, 40)).filter(Boolean).slice(0, 6) : [],
    classId: group.classId || null,
    createdAt: group.createdAt || new Date().toISOString(),
    stats: {
      wins: Number(stats.wins) || 0,
      losses: Number(stats.losses) || 0,
      draws: Number(stats.draws) || 0,
      totalMatches: Number(stats.totalMatches) || 0,
      points: Number(stats.points) || 0,
      titleDefenses: Number(stats.titleDefenses) || 0,
    },
    isChampion: Boolean(group.isChampion),
    history: Array.isArray(group.history) ? group.history.slice(0, 100) : [],
  }
}

export function sanitizeClass(cls) {
  if (!cls || typeof cls.name !== 'string' || !cls.name.trim()) return null
  const online = cls.online?.code && cls.online?.teacherKey
    ? { code: cleanText(cls.online.code, 8).toUpperCase(), teacherKey: cleanText(cls.online.teacherKey, 80) }
    : null
  return {
    id: cleanText(cls.id, 80) || `class_${Date.now()}`,
    name: cleanText(cls.name, 80),
    description: cleanText(cls.description, 200),
    niveau: NIVEAUX.has(cls.niveau) ? cls.niveau : 'seconde',
    createdAt: cls.createdAt || new Date().toISOString(),
    groups: Array.isArray(cls.groups) ? cls.groups.slice(0, 40).map(sanitizeGroup).filter(Boolean) : [],
    matches: Array.isArray(cls.matches) ? cls.matches.slice(0, 500) : [],
    currentChampion: cls.currentChampion || null,
    rankings: [],
    online,
  }
}

export function buildRegisterFile(classes) {
  return {
    format: REGISTER_FORMAT,
    version: 1,
    exportedAt: new Date().toISOString(),
    classes: (classes || []).map(sanitizeClass).filter(Boolean),
  }
}

export function parseRegisterFile(raw) {
  let parsed = raw
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw)
    } catch {
      return { ok: false, error: 'Ce fichier est illisible.' }
    }
  }
  if (parsed?.format !== REGISTER_FORMAT || !Array.isArray(parsed.classes)) {
    return { ok: false, error: 'Ce fichier ne vient pas de Geronimo Coop.' }
  }
  const classes = parsed.classes.map(sanitizeClass).filter(Boolean)
  if (!classes.length) return { ok: false, error: 'Aucune classe dans ce fichier.' }
  return { ok: true, classes }
}

export function classForCloud(cls) {
  const clean = sanitizeClass(cls)
  if (!clean) return null
  return { ...clean, online: clean.online ? { code: clean.online.code } : null }
}
