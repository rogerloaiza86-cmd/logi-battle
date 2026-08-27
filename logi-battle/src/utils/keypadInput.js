/**
 * Keypad helpers for numeric QuestionCard answers.
 * Kept free of React so championship/training input rules can be unit-tested.
 */

export const KEYPAD_MAX_LENGTH = 6

/**
 * Apply one keypad or keyboard action to the current numeric input.
 * @param {string} current
 * @param {string|number} key
 * @param {{ maxLength?: number }} [options]
 * @returns {string}
 */
export function applyKeypadInput(current, key, options = {}) {
  const maxLength = options.maxLength ?? KEYPAD_MAX_LENGTH
  const value = current == null ? '' : String(current)

  if (key === 'C' || key === 'Escape') return ''
  if (key === 'backspace' || key === 'Backspace') return value.slice(0, -1)

  const digit = String(key)
  if (/^\d$/.test(digit) && value.length < maxLength) {
    return value + digit
  }

  return value
}

/**
 * Competing split-screen cards must not share a window keydown listener:
 * every digit would otherwise be copied into both teams' answers.
 */
export function shouldCaptureGlobalKeyboard({ competingCards = false } = {}) {
  return competingCards !== true
}
