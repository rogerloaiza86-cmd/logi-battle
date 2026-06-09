import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { toRecordMatchWinner } from './championshipResults.js'

describe('toRecordMatchWinner', () => {
  it('preserves challenger wins', () => {
    assert.equal(toRecordMatchWinner('A'), 'challenger')
  })

  it('preserves champion wins', () => {
    assert.equal(toRecordMatchWinner('B'), 'champion')
  })

  it('records tied championship matches as draws', () => {
    assert.equal(toRecordMatchWinner(null), 'draw')
  })
})
