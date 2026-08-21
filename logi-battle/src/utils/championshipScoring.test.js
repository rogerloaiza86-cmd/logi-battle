import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  mapBoardWinnerToChampionship,
  resolveRoundWinner,
  shouldFinishMatch,
} from './championshipScoring.js'

describe('resolveRoundWinner', () => {
  it('awards the point to the team that answered correctly after the other missed', () => {
    assert.equal(resolveRoundWinner('wrong', 'correct', 1200, 1800), 'B')
    assert.equal(resolveRoundWinner('correct', 'wrong', 2100, 800), 'A')
  })

  it('uses response time when both answers are correct', () => {
    assert.equal(resolveRoundWinner('correct', 'correct', 900, 1400), 'A')
    assert.equal(resolveRoundWinner('correct', 'correct', 1600, 1100), 'B')
  })

  it('does not award a point when both answers are wrong or still pending', () => {
    assert.equal(resolveRoundWinner('wrong', 'wrong', 500, 700), null)
    assert.equal(resolveRoundWinner('playing', 'playing', null, null), null)
    assert.equal(resolveRoundWinner('wrong', 'playing', 400, null), null)
  })
})

describe('shouldFinishMatch', () => {
  it('ends when the rope is captured or the last round is complete', () => {
    assert.equal(shouldFinishMatch(100, 4, 10), true)
    assert.equal(shouldFinishMatch(-100, 3, 10), true)
    assert.equal(shouldFinishMatch(20, 10, 10), true)
    assert.equal(shouldFinishMatch(20, 9, 10), false)
  })
})

describe('mapBoardWinnerToChampionship', () => {
  it('records a draw instead of inventing a champion win', () => {
    assert.equal(mapBoardWinnerToChampionship('A'), 'challenger')
    assert.equal(mapBoardWinnerToChampionship('B'), 'champion')
    assert.equal(mapBoardWinnerToChampionship(null), 'draw')
  })
})
