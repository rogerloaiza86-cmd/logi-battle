export const toRecordMatchWinner = (winner) => {
  if (winner === 'A') return 'challenger'
  if (winner === 'B') return 'champion'
  return 'draw'
}
