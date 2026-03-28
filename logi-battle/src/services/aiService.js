/**
 * AI Service for question generation
 * Works with any OpenAI-compatible API (GPT, Claude, etc.)
 * Falls back to mock generation when no API is configured
 */

const AI_API_URL = import.meta.env.VITE_AI_API_URL || null
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY || null

const buildPrompt = ({ topic, courseText, count, format, difficulty, language }) => {
  const difficultyLabel = { easy: 'facile', medium: 'moyen', hard: 'difficile', mixed: 'varié' }[difficulty] || 'moyen'
  const formatLabel = { qcm: 'QCM', vocabulaire: 'vocabulaire (terme/définition)', calcul: 'calcul numérique', mixed: 'mixte (QCM, vocabulaire et calcul)' }[format] || 'QCM'
  const sourceSection = courseText ? `\nTexte source du cours:\n---\n${courseText}\n---\n` : ''

  return `Génère exactement ${count} questions de quiz en ${language === 'fr' ? 'français' : language} sur le thème: "${topic}".${sourceSection}
Format souhaité: ${formatLabel}
Difficulté: ${difficultyLabel}

Réponds UNIQUEMENT avec un objet JSON valide dans ce format exact:
{
  "questions": [
    {
      "type": "qcm",
      "description": "Texte de la question",
      "data": {
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctOption": 0
      },
      "difficulty": 1
    },
    {
      "type": "vocabulaire",
      "description": "Définissez le terme: [terme]",
      "data": {
        "term": "terme logistique",
        "definition": "définition correcte",
        "options": ["définition correcte", "mauvaise définition 1", "mauvaise définition 2", "mauvaise définition 3"],
        "correctOption": 0
      },
      "difficulty": 2
    },
    {
      "type": "calcul",
      "description": "Énoncé de la question de calcul",
      "data": {
        "correctAnswer": 42,
        "unit": "palettes",
        "tolerance": 0
      },
      "difficulty": 3
    }
  ]
}

Règles:
- Pour QCM: 4 options, correctOption est l'index (0-3) de la bonne réponse
- Pour vocabulaire: 4 options incluant la définition correcte, correctOption est l'index (0-3)
- Pour calcul: réponse numérique, préciser l'unité, tolerance en % (0 pour exact)
- difficulty: 1=facile, 2=moyen, 3=difficile
- Toutes les questions doivent être pertinentes pour la logistique et le transport`
}

const parseAIResponse = (data, format) => {
  try {
    const content = data?.choices?.[0]?.message?.content || data?.content?.[0]?.text || ''
    const parsed = typeof content === 'string' ? JSON.parse(content) : content
    const questions = parsed?.questions || []

    return questions.map((q, i) => ({
      id: `cq_${Date.now()}_${i}`,
      type: q.type || (format === 'mixed' ? ['qcm', 'vocabulaire', 'calcul'][i % 3] : format),
      description: q.description || `Question ${i + 1}`,
      data: q.data || { options: ['A', 'B', 'C', 'D'], correctOption: 0 },
      difficulty: q.difficulty || 1,
      aiGenerated: true,
    }))
  } catch (err) {
    console.error('[aiService] Failed to parse AI response:', err)
    return []
  }
}

const generateMockQuestions = ({ topic, count, format, difficulty }) => {
  const difficultyMap = { easy: 1, medium: 2, hard: 3 }
  const questions = []

  const mockQcm = (i, topic) => ({
    id: `cq_${Date.now()}_${i}`,
    type: 'qcm',
    description: `Question ${i + 1} sur le thème: ${topic || 'Logistique'}`,
    data: {
      options: [
        'Première option de réponse',
        'Deuxième option de réponse',
        'Troisième option de réponse',
        'Quatrième option de réponse',
      ],
      correctOption: 0,
    },
    difficulty: difficultyMap[difficulty] || (i % 3) + 1,
    aiGenerated: false,
  })

  const mockVocabulaire = (i, topic) => ({
    id: `cq_${Date.now()}_${i}`,
    type: 'vocabulaire',
    description: `Définissez le terme lié à: ${topic || 'Logistique'}`,
    data: {
      term: `Terme ${i + 1}`,
      definition: 'Définition correcte du terme logistique',
      options: [
        'Définition correcte du terme logistique',
        'Définition incorrecte 1',
        'Définition incorrecte 2',
        'Définition incorrecte 3',
      ],
      correctOption: 0,
    },
    difficulty: difficultyMap[difficulty] || (i % 3) + 1,
    aiGenerated: false,
  })

  const mockCalcul = (i, topic) => ({
    id: `cq_${Date.now()}_${i}`,
    type: 'calcul',
    description: `Calcul ${i + 1} sur le thème: ${topic || 'Logistique'}`,
    data: {
      correctAnswer: (i + 1) * 10,
      unit: 'unités',
      tolerance: 0,
    },
    difficulty: difficultyMap[difficulty] || (i % 3) + 1,
    aiGenerated: false,
  })

  const generators = { qcm: mockQcm, vocabulaire: mockVocabulaire, calcul: mockCalcul }

  for (let i = 0; i < count; i++) {
    const type = format === 'mixed' ? ['qcm', 'vocabulaire', 'calcul'][i % 3] : format
    const gen = generators[type] || mockQcm
    questions.push(gen(i, topic))
  }

  return questions
}

export const aiService = {
  async generateQuestions({ topic, courseText, count, format, difficulty, language = 'fr' }) {
    if (!AI_API_URL || !AI_API_KEY) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return generateMockQuestions({ topic, count, format, difficulty })
    }

    const prompt = buildPrompt({ topic, courseText, count, format, difficulty, language })

    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              "Tu es un expert en création de quiz éducatifs pour la logistique et le transport. Génère des questions au format JSON structuré.",
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return parseAIResponse(data, format)
  },

  isConfigured() {
    return !!(AI_API_URL && AI_API_KEY)
  },
}
