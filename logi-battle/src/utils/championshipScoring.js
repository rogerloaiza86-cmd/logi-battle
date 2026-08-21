/**
 * Pure championship scoring helpers.
 * Kept free of React so round outcomes can be unit-tested.
 */

export function resolveRoundWinner(teamAStatus, teamBStatus, teamATime, teamBTime) {
  if (teamAStatus === 'correct' && teamBStatus === 'correct') {
    if (teamATime == null && teamBTime == null) return null
    if (teamATime == null) return 'B'
    if (teamBTime == null) return 'A'
    return teamATime < teamBTime ? 'A' : 'B'
  }
  if (teamAStatus === 'correct') return 'A'
  if (teamBStatus === 'correct') return 'B'
  return null
}

export function shouldFinishMatch(ropePosition, roundNumber, totalRounds) {
  return ropePosition >= 100 || ropePosition <= -100 || roundNumber >= totalRounds
}

export function mapBoardWinnerToChampionship(winner) {
  if (winner === 'A') return 'challenger'
  if (winner === 'B') return 'champion'
  return 'draw'
}
