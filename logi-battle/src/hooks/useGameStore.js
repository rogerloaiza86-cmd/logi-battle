import { create } from 'zustand'

export const useGameStore = create((set) => ({
  // Game State
  gameId: null,
  gameStatus: 'waiting', // waiting, active, finished
  teamA: {
    name: 'TEAM ALPHA',
    score: 0,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvPDcm9tdj_cJNrB6oEz0TRfdNqd_C2sbz_aAkgl6kfRjbpMAPXobluonduTU9lBv4WQjT1KYCvq2qVDvXKUhFY2JEc9J8auhuvEKA_2WEx2_PizB1JsBncE6JA2RkitWzs_dkQsQRN1qv0ZtQTRuntGun7Nnt2v-oCjQdOGOKT2EhpbKc_DvgEP9rop_D72xDAqeZwVsdFCMqelkwxrNdf2yFS5n8qA7FBakZuO-NueVRaGIGZCPhiiRlUOe7pUfU5YCZWjtxoIg',
  },
  teamB: {
    name: 'TEAM BRAVO',
    score: 0,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZq5li5UflcludU03mtlM4IQuNt6m2dPF3pqkd2RsaPdQAagV8VnjgvY3jrxsu965r-y81lDcsYXVddi6uFXPEwqoId6P1JMoF9he5jSH570y8LA76FG52WuzBzIjfQHrPZ3tSznFrTkuW3CjBWdcp4czu25RuLrfqx6sY5zbqHs5VPXmNQz9aCSoX-hafvSeWN5h57mtWm1vxzTclyLTFAUFcpvH7ZX8nPpwatMgT4vWA8b_RPDrViiD0EWdN2ZtaPWfa42DXy10',
  },
  ropePosition: 0, // -100 to 100
  currentQuestion: null,
  rounds: [],
  currentRound: 0,
  totalRounds: 10,

  // Actions
  setGameId: (gameId) => set({ gameId }),
  setGameStatus: (status) => set({ gameStatus: status }),
  setTeamNames: (teamAName, teamBName) =>
    set((state) => ({
      teamA: { ...state.teamA, name: teamAName },
      teamB: { ...state.teamB, name: teamBName },
    })),

  incrementTeamAScore: (points = 1) =>
    set((state) => {
      const newScore = state.teamA.score + points
      let newRopePosition = Math.max(-100, Math.min(100, state.ropePosition + 10 * points))
      const newTeamA = { ...state.teamA, score: newScore }

      return {
        teamA: newTeamA,
        ropePosition: newRopePosition,
        gameStatus: newRopePosition >= 100 ? 'finished' : state.gameStatus,
      }
    }),

  incrementTeamBScore: (points = 1) =>
    set((state) => {
      const newScore = state.teamB.score + points
      let newRopePosition = Math.max(-100, Math.min(100, state.ropePosition - 10 * points))
      const newTeamB = { ...state.teamB, score: newScore }

      return {
        teamB: newTeamB,
        ropePosition: newRopePosition,
        gameStatus: newRopePosition <= -100 ? 'finished' : state.gameStatus,
      }
    }),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  nextRound: () =>
    set((state) => ({
      currentRound: state.currentRound + 1,
      gameStatus: state.currentRound + 1 >= state.totalRounds ? 'finished' : state.gameStatus,
    })),

  resetGame: () =>
    set((state) => ({
      gameId: null,
      gameStatus: 'waiting',
      ropePosition: 0,
      currentQuestion: null,
      currentRound: 0,
      teamA: { ...state.teamA, score: 0 },
      teamB: { ...state.teamB, score: 0 },
    })),
}))
