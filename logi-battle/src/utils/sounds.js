// Effets sonores générés en Web Audio (aucun asset à charger).
// Le réglage muet est persisté dans localStorage.

const MUTE_KEY = 'geronimo_muted'

let audioCtx = null

const getCtx = () => {
  if (typeof window === 'undefined' || !(window.AudioContext || window.webkitAudioContext)) return null
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export const isMuted = () => localStorage.getItem(MUTE_KEY) === '1'

export const setMuted = (muted) => {
  localStorage.setItem(MUTE_KEY, muted ? '1' : '0')
}

export const toggleMuted = () => {
  const next = !isMuted()
  setMuted(next)
  return next
}

const playTone = (frequency, duration, { type = 'sine', volume = 0.15, when = 0 } = {}) => {
  const ctx = getCtx()
  if (!ctx || isMuted()) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = frequency
  gain.gain.setValueAtTime(volume, ctx.currentTime + when)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + when + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime + when)
  osc.stop(ctx.currentTime + when + duration)
}

// Bonne réponse : deux notes ascendantes
export const playCorrect = () => {
  playTone(660, 0.12, { type: 'triangle' })
  playTone(880, 0.2, { type: 'triangle', when: 0.1 })
}

// Mauvaise réponse : note grave descendante
export const playWrong = () => {
  playTone(220, 0.25, { type: 'sawtooth', volume: 0.08 })
  playTone(165, 0.3, { type: 'sawtooth', volume: 0.08, when: 0.12 })
}

// Fin de round
export const playRoundEnd = () => {
  playTone(440, 0.15, { type: 'square', volume: 0.06 })
}

// Victoire : petit arpège
export const playVictory = () => {
  ;[523, 659, 784, 1047].forEach((freq, i) => {
    playTone(freq, 0.25, { type: 'triangle', when: i * 0.15 })
  })
}

// Tic-tac des 5 dernières secondes
export const playTick = () => {
  playTone(1000, 0.05, { type: 'square', volume: 0.04 })
}
