/** Sons courts pilotés par le réglage du QG. Pas de fichier audio externe. */

let context
let music = null

function audio() {
  const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext
  if (!AudioCtx) return null
  if (!context) context = new AudioCtx()
  if (context.state === 'suspended') context.resume()
  return context
}

export function playCue(kind, enabled = true) {
  if (!enabled) return
  const ctx = audio()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = kind === 'ok' ? 660 : 180
  gain.gain.value = 0.04
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16)
  osc.stop(ctx.currentTime + 0.18)
}

export function setMusic(enabled) {
  if (!enabled) {
    music?.stop()
    music = null
    return
  }
  if (music) return
  const ctx = audio()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.value = 110
  gain.gain.value = 0.012
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  music = {
    stop() {
      try { osc.stop() } catch { /* déjà arrêté */ }
    },
  }
}

export function burstParticles() {
  return Array.from({ length: 12 }, (_, index) => ({
    id: `${Date.now()}-${index}`,
    angle: (Math.PI * 2 * index) / 12,
    distance: 80 + (index % 3) * 30,
  }))
}
