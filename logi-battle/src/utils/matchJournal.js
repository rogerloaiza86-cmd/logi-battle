/** Lecture commune des matchs de classe pour le QG et les archives. */

export function scoreLabel(score) {
  if (!score) return ''
  const left = score.A ?? score.teamA
  const right = score.B ?? score.teamB
  if (left == null || right == null) return ''
  return `${left} — ${right}`
}

export function describeMatch(match, groups = [], className = '') {
  const nameOf = (id) => groups.find((group) => group.id === id)?.name || 'Groupe'
  const leftId = match.groupAId || match.challengerId
  const rightId = match.groupBId || match.championId
  const left = nameOf(leftId)
  const right = nameOf(rightId)
  const arena = match.type === 'arena'
  let result = 'Match nul'
  if (arena && match.arenaWinner === 'A') result = `${left} gagne`
  else if (arena && match.arenaWinner === 'B') result = `${right} gagne`
  else if (!arena && match.winner === 'challenger') result = `${left} prend le titre`
  else if (!arena && match.winner === 'champion') result = `${right} conserve le titre`
  return {
    id: match.id,
    date: match.date,
    className,
    left,
    right,
    leftRole: arena ? 'Groupe A' : 'Challenger',
    rightRole: arena ? 'Groupe B' : 'Champion',
    result,
    scoreLabel: scoreLabel(match.score),
    draw: result === 'Match nul',
    duration: match.duration,
    rounds: match.rounds,
  }
}

export function sortMatches(matches) {
  return [...matches].sort((left, right) => new Date(right.date) - new Date(left.date))
}
