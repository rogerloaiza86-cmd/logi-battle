import { supabase } from './supabase'
import { isRealtimeReady, normalizeRoomCode } from './roomCode'

function readRoster(channel) {
  const people = Object.values(channel.presenceState()).flat()
  return {
    hostOnline: people.some((person) => person.role === 'host'),
    teamA: people.filter((person) => person.role === 'player' && person.team === 'A'),
    teamB: people.filter((person) => person.role === 'player' && person.team === 'B'),
  }
}

export function openRoom(code) {
  if (!isRealtimeReady() || !supabase) return null
  const normalized = normalizeRoomCode(code)
  if (!normalized) return null

  const channel = supabase.channel(`room:${normalized}`, {
    config: {
      broadcast: { self: false },
      presence: { key: crypto.randomUUID() },
    },
  })
  const listeners = {
    player_answer: new Set(),
    new_question: new Set(),
    hello: new Set(),
    class_roster: new Set(),
    presence: new Set(),
  }

  channel.on('broadcast', { event: 'player_answer' }, (message) => {
    listeners.player_answer.forEach((fn) => fn(message))
  })
  channel.on('broadcast', { event: 'new_question' }, (message) => {
    listeners.new_question.forEach((fn) => fn(message))
  })
  channel.on('broadcast', { event: 'hello' }, (message) => {
    listeners.hello.forEach((fn) => fn(message))
  })
  channel.on('broadcast', { event: 'class_roster' }, (message) => {
    listeners.class_roster.forEach((fn) => fn(message))
  })
  channel.on('presence', { event: 'sync' }, () => {
    const roster = readRoster(channel)
    listeners.presence.forEach((fn) => fn(roster))
  })

  return {
    code: normalized,
    on(event, fn) {
      listeners[event].add(fn)
      return () => listeners[event].delete(fn)
    },
    subscribe(onStatus) {
      return channel.subscribe(onStatus)
    },
    track(payload) {
      return channel.track(payload)
    },
    send(event, payload) {
      return channel.send({ type: 'broadcast', event, payload })
    },
    roster() {
      return readRoster(channel)
    },
    close() {
      return supabase.removeChannel(channel)
    },
  }
}

export function joinRoom(code, timeoutMs = 4000) {
  const room = openRoom(code)
  if (!room) return Promise.resolve({ room: null, reason: 'offline' })

  return new Promise((resolve) => {
    let settled = false
    const finish = (result) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      if (!result.room) room.close()
      resolve(result)
    }
    const timer = setTimeout(() => finish({ room: null, reason: 'missing' }), timeoutMs)

    room.on('presence', (roster) => {
      if (roster.hostOnline) finish({ room, reason: 'ok' })
    })
    room.subscribe((status) => {
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        finish({ room: null, reason: 'error' })
        return
      }
      if (status === 'SUBSCRIBED' && room.roster().hostOnline) {
        finish({ room, reason: 'ok' })
      }
    })
  })
}
