/**
 * Firestore Schema Documentation
 * 
 * COLLECTIONS:
 * ============
 * 
 * 1. games/
 *    ├── gameId (string) - Unique game identifier
 *    ├── status (string) - 'waiting' | 'active' | 'finished'
 *    ├── teamA_name (string) - Team A name
 *    ├── teamB_name (string) - Team B name
 *    ├── teamA_score (number) - Team A points
 *    ├── teamB_score (number) - Team B points
 *    ├── rope_position (number) - Range: -100 to 100
 *    ├── current_question_id (string) - Current active question
 *    ├── rounds (array) - Round history
 *    ├── createdAt (timestamp)
 *    └── finishedAt (timestamp)
 * 
 * 2. questions/
 *    ├── id (string) - Question ID
 *    ├── type (string) - 'palettisation' | 'cout_transport' | 'loading_plan' | 'vocabulaire' | 'supply_chain' | 'reception' | 'stock' | 'safety' | 'traceability' | 'green' | 'team_leader' | 'jit' | 'route' | 'legal' | 'math'
 *    ├── difficulty (number) - 1-3 (1=easy, 3=hard)
 *    ├── title (string) - Question title
 *    ├── description (string) - Question description
 *    ├── data (object) - Question-specific data
 *    │  └── For palettisation:
 *    │     ├── boxLength (number)
 *    │     ├── boxWidth (number)
 *    │     ├── boxHeight (number)
 *    │     ├── paletteLength (number)
 *    │     └── paletteWidth (number)
 *    ├── correctAnswer (number)
 *    ├── explanation (string)
 *    ├── hints (array)
 *    └── createdAt (timestamp)
 * 
 * 3. rounds/
 *    ├── roundId (string)
 *    ├── gameId (string) - Reference to game
 *    ├── roundNumber (number)
 *    ├── questionId (string) - Reference to question
 *    ├── teamA_answered (boolean)
 *    ├── teamA_answer (number)
 *    ├── teamB_answered (boolean)
 *    ├── teamB_answer (number)
 *    ├── rope_position_before (number)
 *    ├── rope_position_after (number)
 *    └── timestamp (timestamp)
 * 
 * INDEXING RECOMMENDATIONS:
 * ========================
 * questions: (type, difficulty)
 * games: (status, createdAt)
 * rounds: (gameId, roundNumber)
 */

export const firestoreSchema = {
  collections: {
    games: 'games',
    questions: 'questions',
    rounds: 'rounds',
  },
  gameStatuses: {
    WAITING: 'waiting',
    ACTIVE: 'active',
    FINISHED: 'finished',
  },
  questionTypes: {
    PALETTISATION: 'palettisation',
    TRANSPORT_COST: 'cout_transport',
    LOADING_PLAN: 'loading_plan',
    VOCABULARY: 'vocabulaire',
    SUPPLY_CHAIN: 'supply_chain',
    RECEPTION: 'reception',
    STOCK: 'stock',
    SAFETY: 'safety',
    TRACEABILITY: 'traceability',
    GREEN: 'green',
    TEAM_LEADER: 'team_leader',
    JIT: 'jit',
    ROUTE: 'route',
    LEGAL: 'legal',
    MATH: 'math',
  },
  difficulties: {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3,
  }
}
