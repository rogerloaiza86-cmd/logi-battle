/**
 * Utilities for game logic and calculations
 */

/**
 * Calculate rope position based on scores
 * Team A: positive values (max +100)
 * Team B: negative values (min -100)
 */
export const calculateRopePosition = (teamAScore, teamBScore) => {
  const diff = teamAScore - teamBScore
  // Each point = 10 position units
  return Math.max(-100, Math.min(100, diff * 10))
}

/**
 * Determine winner based on rope position
 */
export const determineWinner = (ropePosition) => {
  if (ropePosition >= 100) return 'A'
  if (ropePosition <= -100) return 'B'
  return null
}

/**
 * Format score with leading zeros
 */
export const formatScore = (score) => {
  return score.toString().padStart(4, '0')
}

/**
 * Get difficulty stars
 */
export const getDifficultyStars = (difficulty) => {
  return '⭐'.repeat(difficulty)
}

/**
 * Check if answer is within acceptable range (for floating point)
 */
export const isAnswerCorrect = (userAnswer, correctAnswer, tolerance = 0) => {
  return Math.abs(userAnswer - correctAnswer) <= tolerance
}

/**
 * Generate unique game ID
 */
export const generateGameId = () => {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Generate unique question ID
 */
export const generateQuestionId = () => {
  return `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get team color class
 */
export const getTeamColorClass = (team) => {
  return team === 'A'
    ? {
        primary: 'from-blue-600 to-blue-400',
        light: 'bg-blue-500/10',
        border: 'border-blue-500',
        text: 'text-blue-400',
      }
    : {
        primary: 'from-primary to-amber-400',
        light: 'bg-primary/10',
        border: 'border-primary',
        text: 'text-primary',
      }
}
