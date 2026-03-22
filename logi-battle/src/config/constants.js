/**
 * Global Constants and Configuration
 */

export const GAME_CONFIG = {
  // Rope mechanics
  ROPE_RANGE: { MIN: -100, MAX: 100, START: 0 },
  POINTS_PER_CORRECT_ANSWER: 1,
  ROPE_POSITION_PER_POINT: 10,

  // Game flow
  TOTAL_ROUNDS: 10,
  QUESTION_TYPES: ['palettisation', 'cout_transport', 'loading_plan', 'vocabulaire', 'supply_chain', 'reception', 'stock', 'safety', 'traceability', 'green', 'team_leader', 'jit', 'route', 'legal', 'math'],
  
  // Difficulty distribution
  DIFFICULTY_DISTRIBUTION: {
    1: 0.5,  // 50% easy
    2: 0.35, // 35% medium
    3: 0.15, // 15% hard
  },

  // Timing (in ms)
  ANSWER_FEEDBACK_DELAY: 1500,
  VIBRATION_DURATION: 400,
  PARTICLE_ANIMATION_DURATION: 600,

  // Team colors
  TEAM_A_COLOR: {
    primary: '#3b82f6',
    gradient: 'from-blue-600 to-blue-400',
    lightBg: 'bg-blue-500/10',
    border: 'border-blue-500',
    text: 'text-blue-400',
  },
  TEAM_B_COLOR: {
    primary: '#f49d25',
    gradient: 'from-primary to-amber-400',
    lightBg: 'bg-primary/10',
    border: 'border-primary',
    text: 'text-primary',
  },

  // Animations
  ANIMATION_EASE: 'easeOut',
  ROPE_ANIMATION_DURATION: 0.5,
}

export const QUESTION_DEFAULTS = {
  PALETTISATION: {
    PALETTE_LENGTH: 120,   // cm
    PALETTE_WIDTH: 80,     // cm
    MAX_HEIGHT: 150,       // cm
  },
  TRANSPORT: {
    COST_PER_KM: 2,
    COST_PER_TON: 100,
  },
  LOADING: {
    EFFICIENCY_RATIO: 0.9,
  },
}

export const UI_CONSTANTS = {
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
  },
  Z_INDEX: {
    ROPE: 50,
    DIVIDER: 40,
    PARTICLE: 30,
    MODAL: 50,
    TOOLTIP: 40,
  },
}

export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  GAMES: '/api/games',
  QUESTIONS: '/api/questions',
  ROUNDS: '/api/rounds',
}

export const ERROR_MESSAGES = {
  FIREBASE_INIT: 'Impossible de se connecter à Firebase. Mode local activé.',
  NO_QUESTION: 'Aucune question disponible pour ce type et cette difficulté.',
  INVALID_GAME: 'Identifiant de jeu invalide.',
  NETWORK_ERROR: 'Erreur réseau. Veuillez vérifier votre connexion.',
}

export const SUCCESS_MESSAGES = {
  GAME_CREATED: 'Partie créée avec succès!',
  ANSWER_CORRECT: '✨ Bravo! Bonne réponse!',
  GAME_FINISHED: '🎉 Partie terminée!',
}

export default {
  GAME_CONFIG,
  QUESTION_DEFAULTS,
  UI_CONSTANTS,
  API_ENDPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
}
