/**
 * Question Generator for Logistics & Culture
 * Basé sur le Référentiel Logistique 2025 + Culture Générale
 */

import { getRandomCultureQuestion } from './cultureQuestions'
import { getRandomVocabularyQuestion } from './vocabularyQuestions'
import { getRandomPaletteMCQ } from './paletteMCQQuestions'
import { getRandomTransportMCQ } from './transportMCQQuestions'
import { getRandomLoadingMCQ } from './loadingMCQQuestions'
import { getSupplyChainQuestion } from './supplyChainQuestions'
import { getReceptionQuestion } from './receptionControlQuestions'
import { getStockQuestion } from './stockManagementQuestions'
import { getSafetyQuestion } from './safetyQuestions'
import { getTraceabilityQuestion } from './traceabilityQuestions'
import { getGreenLogisticsQuestion } from './greenLogisticsQuestions'
import { getTeamLeaderQuestion } from './teamLeaderQuestions'
import { getJitQuestion } from './jitQuestions'
import { getRouteOptimizerQuestion } from './routeOptimizerQuestions'
import { getLegalQuestion } from './legalQuestions'
import { getMathQuestion } from './mathQuestions'

// ===== PALETTISATION =====
/**
 * Génère une question de palettisation (calcul ou QCM)
 * Input: Dimensions Colis (Lxlxh) et Palette (120x80)
 * Logic: Calculer Ti (colis par couche) et Hi (nb couches)
 * Output: Nombre total de colis
 */
export const generatePalletizationQuestion = (difficulty = 1, forceCalculation = false) => {
  // 50% de chance d'avoir un QCM sauf si forceCalculation
  if (!forceCalculation && Math.random() < 0.5) {
    const mcq = getRandomPaletteMCQ()
    return {
      type: 'palettisation',
      difficulty: mcq.difficulty,
      title: '📦 Palettisation',
      description: mcq.question,
      data: {
        options: mcq.options,
        correctOption: mcq.correctOption,
        explanation: mcq.explanation,
        category: mcq.category,
        isMCQ: true
      },
      correctAnswer: mcq.correctOption,
      explanation: mcq.explanation,
      hints: [`Catégorie: ${mcq.category}`],
      isMCQ: true
    }
  }
  
  // Question de calcul originale
  let boxLength, boxWidth, boxHeight, maxHeight
  let answer, explanation

  // Palette standard: 120cm x 80cm
  const paletteLength = 120
  const paletteWidth = 80

  if (difficulty === 1) {
    // Facile: dimensions simples
    boxLength = [40, 50, 60][Math.floor(Math.random() * 3)]
    boxWidth = [40, 35, 30][Math.floor(Math.random() * 3)]
    boxHeight = [20, 25, 30][Math.floor(Math.random() * 3)]
    maxHeight = 150

    // Calculer Ti (nombre de colis par couche)
    const tiLengthwise = Math.floor(paletteLength / boxLength)
    const tiWidthwise = Math.floor(paletteWidth / boxWidth)
    const ti = tiLengthwise * tiWidthwise

    // Calculer Hi (nombre de couches)
    const hi = Math.floor(maxHeight / boxHeight)

    // Total
    answer = ti * hi

    explanation = `Ti = ${tiLengthwise} × ${tiWidthwise} = ${ti} colis/couche\nHi = ${maxHeight} ÷ ${boxHeight} = ${hi} couches\nTotal = ${ti} × ${hi} = ${answer} colis`
  } else if (difficulty === 2) {
    // Moyen
    boxLength = [45, 55, 65, 75][Math.floor(Math.random() * 4)]
    boxWidth = [38, 42, 48, 52][Math.floor(Math.random() * 4)]
    boxHeight = [25, 30, 35, 40][Math.floor(Math.random() * 4)]
    maxHeight = [150, 160, 170][Math.floor(Math.random() * 3)]

    const tiLengthwise = Math.floor(paletteLength / boxLength)
    const tiWidthwise = Math.floor(paletteWidth / boxWidth)
    const ti = tiLengthwise * tiWidthwise

    const hi = Math.floor(maxHeight / boxHeight)
    answer = ti * hi

    explanation = `Palette: ${paletteLength}×${paletteWidth} cm\nColis: ${boxLength}×${boxWidth}×${boxHeight} cm\nTi = ${ti} colis/couche | Hi = ${hi} couches\nTotal = ${answer} colis`
  } else {
    // Difficile: avec arrondis et cas limites
    boxLength = [48, 58, 68, 72][Math.floor(Math.random() * 4)]
    boxWidth = [37, 42, 47, 53][Math.floor(Math.random() * 4)]
    boxHeight = [28, 33, 38, 43][Math.floor(Math.random() * 4)]
    maxHeight = [155, 165, 175][Math.floor(Math.random() * 3)]

    const tiLengthwise = Math.floor(paletteLength / boxLength)
    const tiWidthwise = Math.floor(paletteWidth / boxWidth)
    const ti = tiLengthwise * tiWidthwise
    const hi = Math.floor(maxHeight / boxHeight)
    answer = ti * hi

    explanation = `Configuration complexe avec contraintes d'optimisation.\n${answer} colis maximum`
  }

  return {
    type: 'palettisation',
    difficulty,
    title: '📦 Palettisation',
    description: `Combien de colis de dimensions ${boxLength}×${boxWidth}×${boxHeight} cm pouvez-vous mettre sur une palette ${paletteLength}×${paletteWidth} cm (hauteur max: ${maxHeight} cm)?`,
    data: {
      boxLength,
      boxWidth,
      boxHeight,
      paletteLength,
      paletteWidth,
      maxHeight,
    },
    correctAnswer: answer,
    explanation,
    hints: [
      'Calculez le nombre de colis par couche (Ti)',
      'Calculez le nombre de couches (Hi)',
      'Multipliez Ti × Hi',
    ],
  }
}

// ===== COÛT DE TRANSPORT =====
export const generateTransportCostQuestion = (difficulty = 1, forceCalculation = false) => {
  // 50% de chance d'avoir un QCM sauf si forceCalculation
  if (!forceCalculation && Math.random() < 0.5) {
    const mcq = getRandomTransportMCQ()
    return {
      type: 'cout_transport',
      difficulty: mcq.difficulty,
      title: '🚚 Coût de Transport',
      description: mcq.question,
      data: {
        options: mcq.options,
        correctOption: mcq.correctOption,
        explanation: mcq.explanation,
        category: mcq.category,
        isMCQ: true
      },
      correctAnswer: mcq.correctOption,
      explanation: mcq.explanation,
      hints: [`Catégorie: ${mcq.category}`],
      isMCQ: true
    }
  }
  
  // Question de calcul originale
  let distance, weight, costPerKm, costPerTon
  let answer, explanation

  if (difficulty === 1) {
    distance = [100, 150, 200][Math.floor(Math.random() * 3)]
    weight = [5, 10, 15][Math.floor(Math.random() * 3)]
    costPerKm = 2
    costPerTon = 100

    answer = distance * costPerKm + weight * costPerTon
    explanation = `Coût = (${distance} km × ${costPerKm}€/km) + (${weight} tonnes × ${costPerTon}€/tonne)\n= ${distance * costPerKm}€ + ${weight * costPerTon}€ = ${answer}€`
  } else if (difficulty === 2) {
    distance = [250, 350, 450][Math.floor(Math.random() * 3)]
    weight = [20, 25, 30][Math.floor(Math.random() * 3)]
    const discount = [5, 10, 15][Math.floor(Math.random() * 3)]
    costPerKm = 1.8
    costPerTon = 90

    let baseCost = distance * costPerKm + weight * costPerTon
    let discountAmount = (baseCost * discount) / 100
    answer = baseCost - discountAmount

    explanation = `Coût initial: ${baseCost.toFixed(2)}€\nRemise ${discount}%: -${discountAmount.toFixed(2)}€\nCoût final: ${answer.toFixed(2)}€`
  } else {
    distance = [500, 600, 750][Math.floor(Math.random() * 3)]
    weight = [40, 50, 60][Math.floor(Math.random() * 3)]
    const fuel = 1.5
    const toll = 50
    costPerKm = 1.5
    costPerTon = 80

    let baseCost = distance * costPerKm + weight * costPerTon + distance * fuel + toll
    answer = baseCost

    explanation = `Calcul complexe avec carburant et péages:\nCoût = ${answer.toFixed(2)}€`
  }

  return {
    type: 'cout_transport',
    difficulty,
    title: '🚚 Coût de Transport',
    description: `Pour un trajet de ${distance} km avec ${weight} tonnes, quel est le coût total?`,
    data: { distance, weight, costPerKm, costPerTon },
    correctAnswer: Math.round(answer),
    explanation,
    hints: ['Considérez la distance', 'Considérez le poids'],
  }
}

// ===== PLAN DE CHARGEMENT =====
export const generateLoadingPlanQuestion = (difficulty = 1, forceCalculation = false) => {
  // 50% de chance d'avoir un QCM sauf si forceCalculation
  if (!forceCalculation && Math.random() < 0.5) {
    const mcq = getRandomLoadingMCQ()
    return {
      type: 'loading_plan',
      difficulty: mcq.difficulty,
      title: '📊 Plan de Chargement',
      description: mcq.question,
      data: {
        options: mcq.options,
        correctOption: mcq.correctOption,
        explanation: mcq.explanation,
        category: mcq.category,
        isMCQ: true
      },
      correctAnswer: mcq.correctOption,
      explanation: mcq.explanation,
      hints: [`Catégorie: ${mcq.category}`],
      isMCQ: true
    }
  }
  
  // Question de calcul originale
  let containerCapacity, packageSize, numberOfPackages
  let answer, explanation

  if (difficulty === 1) {
    containerCapacity = [20, 24, 30][Math.floor(Math.random() * 3)]
    packageSize = [1, 2, 3][Math.floor(Math.random() * 3)]
    numberOfPackages = containerCapacity / packageSize

    answer = numberOfPackages
    explanation = `${containerCapacity} unités ÷ ${packageSize} par colis = ${answer} colis`
  } else if (difficulty === 2) {
    containerCapacity = [40, 45, 50][Math.floor(Math.random() * 3)]
    const usableSpace = Math.floor(containerCapacity * 0.9)
    packageSize = Math.floor(Math.random() * 2) + 2
    answer = Math.floor(usableSpace / packageSize)

    explanation = `Espace utilisable: ${usableSpace} unités\n${usableSpace} ÷ ${packageSize} = ${answer} colis`
  } else {
    containerCapacity = 60
    const efficiency = [0.85, 0.90, 0.95][Math.floor(Math.random() * 3)]
    const usableSpace = Math.floor(containerCapacity * efficiency)
    packageSize = Math.floor(Math.random() * 3) + 2
    answer = Math.floor(usableSpace / packageSize)

    explanation = `Optimisation avancée avec efficacité ${(efficiency * 100).toFixed(0)}%\nRésultat: ${answer} colis`
  }

  return {
    type: 'loading_plan',
    difficulty,
    title: '📊 Plan de Chargement',
    description: `Conteneur capacité ${containerCapacity} unités. Combien de colis de ${packageSize} unités pouvez-vous charger?`,
    data: { containerCapacity, packageSize, numberOfPackages },
    correctAnswer: answer,
    explanation,
    hints: [
      'Divisez la capacité par la taille du colis',
      'Considérez les contraintes spatiales',
    ],
  }
}

// ===== CULTURE GÉNÉRALE =====
export const generateCultureQuestion = () => {
  const cultureQ = getRandomCultureQuestion()
  
  return {
    type: 'culture',
    difficulty: 2,
    title: '🧠 Culture Générale',
    description: cultureQ.question,
    data: {
      category: cultureQ.category,
      hint: cultureQ.hint,
      type: cultureQ.type
    },
    correctAnswer: cultureQ.answer,
    explanation: `La réponse est : ${cultureQ.answer}`,
    hints: [cultureQ.hint],
  }
}

// ===== VOCABULAIRE =====
export const generateVocabularyQuestion = () => {
  const vocabQ = getRandomVocabularyQuestion()
  
  return {
    type: 'vocabulaire',
    difficulty: vocabQ.difficulty,
    title: '📚 Vocabulaire Logistique',
    description: `Définissez : ${vocabQ.term}`,
    data: {
      term: vocabQ.term,
      category: vocabQ.category,
      options: vocabQ.options,
      correctOption: vocabQ.correctOption,
      explanation: vocabQ.explanation
    },
    correctAnswer: vocabQ.correctOption, // La réponse est l'index de l'option
    explanation: vocabQ.explanation,
    hints: [`Catégorie: ${vocabQ.category}`],
    isVocabulary: true // Flag pour différencier
  }
}

// ===== SUPPLY CHAIN =====
export const generateSupplyChainQuestion = () => {
  const supplyQ = getSupplyChainQuestion()
  
  return {
    type: 'supply_chain',
    difficulty: supplyQ.difficulty,
    title: '🧩 Supply Chain Puzzle',
    description: supplyQ.question,
    data: {
      category: supplyQ.category,
      options: supplyQ.options,
      correctOption: supplyQ.correctOption,
      explanation: supplyQ.explanation,
      questionType: supplyQ.type
    },
    correctAnswer: supplyQ.correctOption, // La réponse est l'index de l'option
    explanation: supplyQ.explanation,
    hints: [`Catégorie: ${supplyQ.category}`]
  }
}

// ===== RÉCEPTION & CONTRÔLE =====
export const generateReceptionQuestion = () => {
  const receptionQ = getReceptionQuestion()
  
  return {
    type: 'reception',
    difficulty: receptionQ.difficulty,
    title: '🚛 Réception & Contrôle',
    description: receptionQ.question,
    data: {
      category: receptionQ.category,
      options: receptionQ.options,
      correctOption: receptionQ.correctOption,
      explanation: receptionQ.explanation,
      questionType: receptionQ.type
    },
    correctAnswer: receptionQ.correctOption,
    explanation: receptionQ.explanation,
    hints: [`Catégorie: ${receptionQ.category}`]
  }
}

// ===== STOCK MASTER =====
export const generateStockQuestion = () => {
  const stockQ = getStockQuestion()
  
  return {
    type: 'stock',
    difficulty: stockQ.difficulty,
    title: '📦 Stock Master 3D',
    description: stockQ.question,
    data: {
      category: stockQ.category,
      options: stockQ.options,
      correctOption: stockQ.correctOption,
      explanation: stockQ.explanation,
      questionType: stockQ.type
    },
    correctAnswer: stockQ.correctOption,
    explanation: stockQ.explanation,
    hints: [`Catégorie: ${stockQ.category}`]
  }
}

// ===== SAFETY FIRST =====
export const generateSafetyQuestion = () => {
  const safetyQ = getSafetyQuestion()
  
  return {
    type: 'safety',
    difficulty: safetyQ.difficulty,
    title: '🛡️ Safety First',
    description: safetyQ.question,
    data: {
      category: safetyQ.category,
      options: safetyQ.options,
      correctOption: safetyQ.correctOption,
      explanation: safetyQ.explanation,
      questionType: safetyQ.type
    },
    correctAnswer: safetyQ.correctOption,
    explanation: safetyQ.explanation,
    hints: [`Catégorie: ${safetyQ.category}`]
  }
}

// ===== TRAÇABILITÉ =====
export const generateTraceabilityQuestion = () => {
  const traceQ = getTraceabilityQuestion()
  
  return {
    type: 'traceability',
    difficulty: traceQ.difficulty,
    title: '📡 Traçabilité Track',
    description: traceQ.question,
    data: {
      category: traceQ.category,
      options: traceQ.options,
      correctOption: traceQ.correctOption,
      explanation: traceQ.explanation,
      questionType: traceQ.type
    },
    correctAnswer: traceQ.correctOption,
    explanation: traceQ.explanation,
    hints: [`Catégorie: ${traceQ.category}`]
  }
}

// ===== GREEN LOGISTIQUE =====
export const generateGreenLogisticsQuestion = () => {
  const greenQ = getGreenLogisticsQuestion()
  
  return {
    type: 'green',
    difficulty: greenQ.difficulty,
    title: '🌍 Green Logistique',
    description: greenQ.question,
    data: {
      category: greenQ.category,
      options: greenQ.options,
      correctOption: greenQ.correctOption,
      explanation: greenQ.explanation,
      questionType: greenQ.type
    },
    correctAnswer: greenQ.correctOption,
    explanation: greenQ.explanation,
    hints: [`Catégorie: ${greenQ.category}`]
  }
}

// ===== TEAM LEADER =====
export const generateTeamLeaderQuestion = () => {
  const leaderQ = getTeamLeaderQuestion()
  
  return {
    type: 'team_leader',
    difficulty: leaderQ.difficulty,
    title: '👔 Team Leader',
    description: leaderQ.question,
    data: {
      category: leaderQ.category,
      scenario: leaderQ.scenario,
      options: leaderQ.options,
      correctOption: leaderQ.correctOption,
      explanation: leaderQ.explanation,
      questionType: leaderQ.type
    },
    correctAnswer: leaderQ.correctOption,
    explanation: leaderQ.explanation,
    hints: [`Contexte: ${leaderQ.context}`]
  }
}

// ===== JIT =====
export const generateJitQuestion = () => {
  const jitQ = getJitQuestion()
  
  return {
    type: 'jit',
    difficulty: jitQ.difficulty,
    title: '🏭 Logistique JIT',
    description: jitQ.question,
    data: {
      category: jitQ.category,
      options: jitQ.options,
      correctOption: jitQ.correctOption,
      explanation: jitQ.explanation,
      questionType: jitQ.type
    },
    correctAnswer: jitQ.correctOption,
    explanation: jitQ.explanation,
    hints: [`Catégorie: ${jitQ.category}`]
  }
}

// ===== ROUTE OPTIMIZER =====
export const generateRouteOptimizerQuestion = () => {
  const routeQ = getRouteOptimizerQuestion()
  
  return {
    type: 'route',
    difficulty: routeQ.difficulty,
    title: '🚛 Route Optimizer',
    description: routeQ.question,
    data: {
      category: routeQ.category,
      options: routeQ.options,
      correctOption: routeQ.correctOption,
      explanation: routeQ.explanation,
      questionType: routeQ.type
    },
    correctAnswer: routeQ.correctOption,
    explanation: routeQ.explanation,
    hints: [`Catégorie: ${routeQ.category}`]
  }
}

// ===== LÉGAL =====
export const generateLegalQuestion = () => {
  const legalQ = getLegalQuestion()
  
  return {
    type: 'legal',
    difficulty: legalQ.difficulty,
    title: '⚖️ Doc & Légal',
    description: legalQ.question,
    data: {
      category: legalQ.category,
      options: legalQ.options,
      correctOption: legalQ.correctOption,
      explanation: legalQ.explanation,
      questionType: legalQ.type
    },
    correctAnswer: legalQ.correctOption,
    explanation: legalQ.explanation,
    hints: [`Catégorie: ${legalQ.category}`]
  }
}

// ===== MATHS =====
export const generateMathQuestion = () => {
  const mathQ = getMathQuestion()
  
  return {
    type: 'math',
    difficulty: mathQ.difficulty,
    title: '🧮 Calculs Logistiques',
    description: mathQ.question,
    data: {
      category: mathQ.category,
      options: mathQ.options,
      correctOption: mathQ.correctOption,
      explanation: mathQ.explanation,
      questionType: mathQ.type
    },
    correctAnswer: mathQ.correctOption,
    explanation: mathQ.explanation,
    hints: [`Catégorie: ${mathQ.category}`]
  }
}

// ===== QUESTION GENERATOR =====
export const generateRandomQuestion = (type, difficulty = 1) => {
  const generators = {
    palettisation: generatePalletizationQuestion,
    cout_transport: generateTransportCostQuestion,
    loading_plan: generateLoadingPlanQuestion,
    culture: generateCultureQuestion,
    vocabulaire: generateVocabularyQuestion,
    supply_chain: generateSupplyChainQuestion,
    reception: generateReceptionQuestion,
    stock: generateStockQuestion,
    safety: generateSafetyQuestion,
    traceability: generateTraceabilityQuestion,
    green: generateGreenLogisticsQuestion,
    team_leader: generateTeamLeaderQuestion,
    jit: generateJitQuestion,
    route: generateRouteOptimizerQuestion,
    legal: generateLegalQuestion,
    math: generateMathQuestion,
  }

  const generator = generators[type]
  if (!generator) throw new Error(`Unknown question type: ${type}`)

  return generator(difficulty)
}

// ===== UTILITY FUNCTIONS =====
export const getRandomDifficulty = () => {
  const rand = Math.random()
  if (rand < 0.5) return 1
  if (rand < 0.85) return 2
  return 3
}

export const getRandomQuestionType = (excludeTypes = []) => {
  const allTypes = [
    'palettisation', 'cout_transport', 'loading_plan',
    'supply_chain', 'reception', 'stock', 'safety',
    'traceability', 'green', 'team_leader', 'jit',
    'route', 'legal', 'math', 'culture', 'vocabulaire'
  ]
  const types = allTypes.filter(t => !excludeTypes.includes(t))
  return types[Math.floor(Math.random() * types.length)]
}

export const generateNextQuestion = (gameMode = 'all') => {
  const type = gameMode === 'all'
    ? getRandomQuestionType([])
    : gameMode

  const skipDifficultyTypes = ['vocabulaire', 'supply_chain', 'reception', 'stock', 'safety', 'traceability', 'green', 'team_leader', 'jit', 'route', 'legal', 'math']
  const difficulty = skipDifficultyTypes.includes(type) ? null : getRandomDifficulty()
  return generateRandomQuestion(type, difficulty)
}
