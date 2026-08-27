import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { applyKeypadInput, shouldCaptureGlobalKeyboard } from './keypadInput.js'

describe('applyKeypadInput', () => {
  it('appends digits up to six characters', () => {
    assert.equal(applyKeypadInput('', 2), '2')
    assert.equal(applyKeypadInput('20', '2'), '202')
    assert.equal(applyKeypadInput('123456', '7'), '123456')
  })

  it('clears and backspaces', () => {
    assert.equal(applyKeypadInput('2024', 'C'), '')
    assert.equal(applyKeypadInput('2024', 'Backspace'), '202')
  })
})

describe('shouldCaptureGlobalKeyboard', () => {
  it('disables the window listener when two teams share one screen', () => {
    assert.equal(shouldCaptureGlobalKeyboard({ competingCards: false }), true)
    assert.equal(shouldCaptureGlobalKeyboard({ competingCards: true }), false)
  })
})
