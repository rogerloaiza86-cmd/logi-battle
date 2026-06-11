import { supabase } from './supabase'

// Mode DB : 'local' (mémoire, mono-poste) ou 'supabase'
const DB_MODE = import.meta.env.VITE_DB_MODE || 'local'
const USE_SUPABASE = DB_MODE === 'supabase'

// ===== LOCAL DATABASE =====
const localDB = {
  games: {},
  questions: {},
  channels: {},
  nextGameId: 1,
  nextQuestionId: 1,
}

// ===== GAMES SERVICE =====
export const gamesService = {
  async createGame(teamAName, teamBName, customGameId) {
    if (USE_SUPABASE) {
      const gameId = customGameId || `game_${Date.now()}`
      const newGame = {
        gameId,
        teamAName,
        teamBName,
        status: 'waiting',
        teamA_score: 0,
        teamB_score: 0,
        rope_position: 0,
        current_question_id: null,
      }
      const { error } = await supabase.from('logi_battle_games').insert([newGame])
      if (error) throw error
      return gameId
    }

    const gameId = customGameId || `game_${localDB.nextGameId++}`
    localDB.games[gameId] = {
      gameId,
      teamAName,
      teamBName,
      status: 'waiting',
      teamA_score: 0,
      teamB_score: 0,
      rope_position: 0,
      current_question_id: null,
      createdAt: Date.now(),
      history: [],
    }
    return gameId
  },

  async getGame(gameId) {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('logi_battle_games').select('*').eq('gameId', gameId).single()
      if (error) {
        if (error.code === 'PGRST116') return null // Not found
        throw error
      }
      return data
    }
    return localDB.games[gameId] || null
  },

  async updateGameScore(gameId, teamA_score, teamB_score, rope_position) {
    const updateData = { teamA_score, teamB_score, rope_position }

    if (rope_position >= 100) {
      updateData.status = 'finished'
      updateData.winner = 'A'
    } else if (rope_position <= -100) {
      updateData.status = 'finished'
      updateData.winner = 'B'
    }

    if (USE_SUPABASE) {
      const { error } = await supabase.from('logi_battle_games').update(updateData).eq('gameId', gameId)
      if (error) throw error
      return true
    }

    if (localDB.games[gameId]) {
      Object.assign(localDB.games[gameId], updateData)
    }
    return true
  },

  async updateGameStatus(gameId, status) {
    if (USE_SUPABASE) {
      const { error } = await supabase.from('logi_battle_games').update({ status }).eq('gameId', gameId)
      if (error) throw error
      return true
    }

    if (localDB.games[gameId]) {
      localDB.games[gameId].status = status
    }
    return true
  },

  // Souscription aux changements d'une partie (postgres_changes)
  subscribeToGame(gameId, callback) {
    if (USE_SUPABASE) {
      const channel = supabase
        .channel(`public:logi_battle_games:gameId=eq.${gameId}`)
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'logi_battle_games', filter: `gameId=eq.${gameId}` },
          (payload) => {
            callback(payload.new)
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }

    // Pas de souscription en mode local
    return () => {}
  },

  // Canal Broadcast temps réel d'une partie
  getGameChannel(gameId) {
    if (USE_SUPABASE) {
      if (!localDB.channels[gameId]) {
        localDB.channels[gameId] = supabase.channel(`game_${gameId}`)
      }
      return localDB.channels[gameId]
    }
    return null
  },

  // Canal de lobby (Presence) : qui est connecté, dans quelle équipe.
  // Séparé du canal broadcast pour éviter les doubles souscriptions.
  getLobbyChannel(gameId, presenceKey) {
    if (USE_SUPABASE) {
      const key = `lobby_${gameId}`
      if (!localDB.channels[key]) {
        localDB.channels[key] = supabase.channel(`game_${gameId}_lobby`, {
          config: { presence: { key: presenceKey || crypto.randomUUID() } },
        })
      }
      return localDB.channels[key]
    }
    return null
  },

  releaseLobbyChannel(gameId) {
    const key = `lobby_${gameId}`
    const channel = localDB.channels[key]
    if (channel) {
      supabase.removeChannel(channel)
      delete localDB.channels[key]
    }
  },

  // Libère le canal d'une partie (à appeler au démontage)
  releaseGameChannel(gameId) {
    const channel = localDB.channels[gameId]
    if (channel) {
      supabase.removeChannel(channel)
      delete localDB.channels[gameId]
    }
  },
}

// ===== QUESTIONS SERVICE =====
export const questionsService = {
  async createQuestion(type, difficulty, data, correctAnswer) {
    if (USE_SUPABASE) {
      const questionId = `q_${Date.now()}`
      const { error } = await supabase
        .from('logi_battle_questions')
        .insert([{ id: questionId, type, difficulty, data, correctAnswer }])
      if (error) throw error
      return questionId
    }

    const questionId = `q_${localDB.nextQuestionId++}`
    localDB.questions[questionId] = {
      id: questionId,
      type,
      difficulty,
      data,
      correctAnswer,
      createdAt: Date.now(),
    }
    return questionId
  },

  async getQuestion(questionId) {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('logi_battle_questions').select('*').eq('id', questionId).single()
      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }
      return data
    }
    return localDB.questions[questionId] || null
  },

  async getRandomQuestion(type, difficulty) {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('logi_battle_questions')
        .select('*')
        .eq('type', type)
        .eq('difficulty', difficulty)

      if (error) throw error
      if (!data || data.length === 0) return null

      return data[Math.floor(Math.random() * data.length)]
    }

    const filtered = Object.values(localDB.questions).filter(
      (q) => q.type === type && q.difficulty === difficulty
    )
    return filtered[Math.floor(Math.random() * filtered.length)] || null
  },
}
