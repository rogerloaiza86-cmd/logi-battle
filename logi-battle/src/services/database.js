import db from './firebase'
import { supabase } from './supabase'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore'

// Mode DB : 'local', 'firebase', ou 'supabase'
const DB_MODE = import.meta.env.VITE_DB_MODE || 'local'
const USE_FIREBASE = DB_MODE === 'firebase'
const USE_SUPABASE = DB_MODE === 'supabase'

// ===== LOCAL DATABASE =====
const localDB = {
  games: {},
  questions: {},
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
      const { error } = await supabase.from('games').insert([newGame])
      if (error) throw error
      return gameId
    }

    if (!USE_FIREBASE) {
      const gameId = `game_${localDB.nextGameId++}`
      const newGame = {
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
      localDB.games[gameId] = newGame
      return gameId
    }

    const gameId = `game_${Date.now()}`
    try {
      await setDoc(doc(db, 'games', gameId), {
        gameId,
        teamAName,
        teamBName,
        status: 'waiting',
        teamA_score: 0,
        teamB_score: 0,
        rope_position: 0,
        current_question_id: null,
        createdAt: new Date(),
        history: [],
      })
      return gameId
    } catch (error) {
      console.error('Error creating game:', error)
      throw error
    }
  },

  async getGame(gameId) {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('games').select('*').eq('gameId', gameId).single()
      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error
      }
      return data
    }

    if (!USE_FIREBASE) {
      return localDB.games[gameId] || null
    }

    try {
      const gameDoc = await getDoc(doc(db, 'games', gameId))
      return gameDoc.exists() ? gameDoc.data() : null
    } catch (error) {
      console.error('Error getting game:', error)
      throw error
    }
  },

  async updateGameScore(gameId, teamA_score, teamB_score, rope_position) {
    let updateData = {
      teamA_score,
      teamB_score,
      rope_position,
    }

    if (rope_position >= 100) {
      updateData.status = 'finished'
      updateData.winner = 'A'
    } else if (rope_position <= -100) {
      updateData.status = 'finished'
      updateData.winner = 'B'
    }

    if (USE_SUPABASE) {
      const { error } = await supabase.from('games').update(updateData).eq('gameId', gameId)
      if (error) throw error
      return true
    }

    if (!USE_FIREBASE) {
      if (localDB.games[gameId]) {
        Object.assign(localDB.games[gameId], updateData)
      }
      return true
    }

    try {
      await updateDoc(doc(db, 'games', gameId), updateData)
      return true
    } catch (error) {
      console.error('Error updating game score:', error)
      throw error
    }
  },

  async updateGameStatus(gameId, status) {
    if (USE_SUPABASE) {
      const { error } = await supabase.from('games').update({ status }).eq('gameId', gameId)
      if (error) throw error
      return true
    }

    if (!USE_FIREBASE) {
      if (localDB.games[gameId]) {
        localDB.games[gameId].status = status
      }
      return true
    }

    try {
      await updateDoc(doc(db, 'games', gameId), { status })
      return true
    } catch (error) {
      console.error('Error updating game status:', error)
      throw error
    }
  },

  // ---- NEW: Realtime Subscription ----
  subscribeToGame(gameId, callback) {
    if (USE_SUPABASE) {
      const channel = supabase
        .channel(`public:games:gameId=eq.${gameId}`)
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'games', filter: `gameId=eq.${gameId}` },
          (payload) => {
            callback(payload.new)
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }

    if (!USE_FIREBASE) {
      // Pas de vraie souscription en mode local par défaut
      // On retourne une "dummy" unsubscribe function
      return () => {}
    }

    if (!USE_FIREBASE) {
      // Pas de vraie souscription en mode local par défaut
      // On retourne une "dummy" unsubscribe function
      return () => {}
    }

    // TODO: Implémenter Firestore onSnapshot si on repasse à Firebase un jour
    return () => {}
  },

  // ---- NEW: Realtime Broadcast Channel ----
  getGameChannel(gameId) {
    if (USE_SUPABASE) {
      if (!localDB.channels) localDB.channels = {}
      if (!localDB.channels[gameId]) {
        localDB.channels[gameId] = supabase.channel(`game_${gameId}`)
      }
      return localDB.channels[gameId]
    }
    return null
  }
}

// ===== QUESTIONS SERVICE =====
export const questionsService = {
  async createQuestion(type, difficulty, data, correctAnswer) {
    if (USE_SUPABASE) {
      const questionId = `q_${Date.now()}`
      const newQuestion = {
        id: questionId,
        type,
        difficulty,
        data,
        correctAnswer,
      }
      const { error } = await supabase.from('questions').insert([newQuestion])
      if (error) throw error
      return questionId
    }

    if (!USE_FIREBASE) {
      const questionId = `q_${localDB.nextQuestionId++}`
      const newQuestion = {
        id: questionId,
        type,
        difficulty,
        data,
        correctAnswer,
        createdAt: Date.now(),
      }
      localDB.questions[questionId] = newQuestion
      return questionId
    }

    const questionId = `q_${Date.now()}`
    try {
      await setDoc(doc(db, 'questions', questionId), {
        id: questionId,
        type,
        difficulty,
        data,
        correctAnswer,
        createdAt: new Date(),
      })
      return questionId
    } catch (error) {
      console.error('Error creating question:', error)
      throw error
    }
  },

  async getQuestion(questionId) {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('questions').select('*').eq('id', questionId).single()
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error
      }
      return data
    }

    if (!USE_FIREBASE) {
      return localDB.questions[questionId] || null
    }

    try {
      const questionDoc = await getDoc(doc(db, 'questions', questionId))
      return questionDoc.exists() ? questionDoc.data() : null
    } catch (error) {
      console.error('Error getting question:', error)
      throw error
    }
  },

  async getRandomQuestion(type, difficulty) {
    if (USE_SUPABASE) {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('type', type)
        .eq('difficulty', difficulty)

      if (error) throw error
      if (!data || data.length === 0) return null
      
      return data[Math.floor(Math.random() * data.length)]
    }

    if (!USE_FIREBASE) {
      const allQuestions = Object.values(localDB.questions)
      const filtered = allQuestions.filter(q => q.type === type && q.difficulty === difficulty)
      return filtered[Math.floor(Math.random() * filtered.length)] || null
    }

    try {
      const q = query(
        collection(db, 'questions'),
        where('type', '==', type),
        where('difficulty', '==', difficulty)
      )
      const querySnapshot = await getDocs(q)
      const questions = querySnapshot.docs.map(doc => doc.data())
      return questions[Math.floor(Math.random() * questions.length)] || null
    } catch (error) {
      console.error('Error getting random question:', error)
      throw error
    }
  },
}
