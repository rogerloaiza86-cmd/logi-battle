import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildJoinUrl,
  getCorrectAnswer,
  isAnswerCorrect,
  sanitizeQuestionForPlayer,
} from './liveGame.js'

test('buildJoinUrl preserves the Vite base path used by GitHub Pages', () => {
  assert.equal(
    buildJoinUrl('https://example.com', 'GAME ABC', '/logi-battle/'),
    'https://example.com/logi-battle/join?game=GAME%20ABC'
  )
})

test('getCorrectAnswer keeps zero-valued answers', () => {
  assert.equal(getCorrectAnswer({ correctAnswer: 0 }), 0)
  assert.equal(getCorrectAnswer({ data: { correctOption: 0 } }), 0)
})

test('isAnswerCorrect validates submitted answers on the host side', () => {
  assert.equal(isAnswerCorrect({ correctAnswer: 42 }, '42'), true)
  assert.equal(isAnswerCorrect({ data: { correctOption: 0 } }, 0), true)
  assert.equal(isAnswerCorrect({ answer: 'Palette' }, ' palette '), true)
  assert.equal(isAnswerCorrect({ correctAnswer: 7 }, '8'), false)
})

test('sanitizeQuestionForPlayer removes answer-bearing fields recursively', () => {
  const sanitized = sanitizeQuestionForPlayer({
    id: 'q1',
    description: 'Question',
    correctAnswer: 1,
    answer: 1,
    explanation: 'secret',
    data: {
      options: ['A', 'B'],
      correctOption: 1,
      explanation: 'secret',
    },
  })

  assert.deepEqual(sanitized, {
    id: 'q1',
    description: 'Question',
    data: {
      options: ['A', 'B'],
    },
  })
}
