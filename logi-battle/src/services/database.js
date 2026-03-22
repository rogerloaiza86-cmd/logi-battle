import db from './firebase'
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

// Mode local ou Firebase
const USE_FIREBASE = import.meta.env.VITE_DB_MODE === 'firebase'

// ===== LOCAL DATABASE =====
const localDB = {
  games: {},
  questions: {},
  nextGameId: 1,
  nextQuestionId: 1,
}

// ===== GAMES SERVICE =====
export const gamesService = {
  async createGame(teamAName, teamBName) {
    if (!USE_FIREBASE) {
      const gameId = `game_${localDB.nextGameId++}`
      const newGame = {
        gameId,
        teamAName,
        teamBName,
        status: 'waiting', // waiting, active, finished
        teamA_score: 0,
        teamB_score: 0,
        rope_position: 0, // range -100 to 100
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
    if (!USE_FIREBASE) {
      if (localDB.games[gameId]) {
        localDB.games[gameId].teamA_score = teamA_score
        localDB.games[gameId].teamB_score = teamB_score
        localDB.games[gameId].rope_position = rope_position

        // Check for winner
        if (rope_position >= 100) {
          localDB.games[gameId].status = 'finished'
          localDB.games[gameId].winner = 'A'
        } else if (rope_position <= -100) {
          localDB.games[gameId].status = 'finished'
          localDB.games[gameId].winner = 'B'
        }
      }
      return true
    }

    try {
      const updateData = {
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

      await updateDoc(doc(db, 'games', gameId), updateData)
      return true
    } catch (error) {
      console.error('Error updating game score:', error)
      throw error
    }
  },

  async updateGameStatus(gameId, status) {
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
}

// ===== QUESTIONS SERVICE =====
export const questionsService = {
  async createQuestion(type, difficulty, data, correctAnswer) {
    if (!USE_FIREBASE) {
      const questionId = `q_${localDB.nextQuestionId++}`
      const newQuestion = {
        id: questionId,
        type, // palettisation, cout_transport, loading_plan
        difficulty, // 1-3
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
