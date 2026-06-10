import assert from 'node:assert/strict'
import { createJoinUrl, isJoinRoute, normalizeAppPath } from './routing.js'

assert.equal(normalizeAppPath('/logi-battle/join', '/logi-battle/'), '/join')
assert.equal(normalizeAppPath('/logi-battle', '/logi-battle/'), '/')
assert.equal(isJoinRoute('/logi-battle/join', '', '/logi-battle/'), true)
assert.equal(isJoinRoute('/logi-battle/', '?game=GAME-123', '/logi-battle/'), true)
assert.equal(
  createJoinUrl('https://example.github.io', 'GAME-123', '/logi-battle/'),
  'https://example.github.io/logi-battle/join?game=GAME-123'
)

console.log('routing helpers ok')
