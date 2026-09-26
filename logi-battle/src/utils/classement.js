/** Points de classement : victoire 3, nul 1, défaite 0. */

export function emptyStats(stats = {}) {
  return {
    wins: 0,
    losses: 0,
    draws: 0,
    totalMatches: 0,
    points: 0,
    titleDefenses: 0,
    ...stats,
  }
}

export function applyArenaResult(groups, groupAId, groupBId, winner) {
  return groups.map((group) => {
    if (group.id !== groupAId && group.id !== groupBId) return group
    const stats = emptyStats(group.stats)
    stats.totalMatches += 1
    const playsA = group.id === groupAId
    if (winner !== 'A' && winner !== 'B') {
      stats.draws += 1
      stats.points += 1
    } else if ((winner === 'A' && playsA) || (winner === 'B' && !playsA)) {
      stats.wins += 1
      stats.points += 3
    } else {
      stats.losses += 1
    }
    return { ...group, stats }
  })
}

export function rankGroups(groups) {
  return [...groups]
    .sort((a, b) => {
      const left = emptyStats(a.stats)
      const right = emptyStats(b.stats)
      if (right.points !== left.points) return right.points - left.points
      if (right.wins !== left.wins) return right.wins - left.wins
      return right.titleDefenses - left.titleDefenses
    })
    .map((group, index) => ({
      ...group,
      rank: index + 1,
      isChampion: index === 0,
    }))
}
