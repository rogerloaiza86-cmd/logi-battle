/**
 * Questions QCM pour le module Palettisation
 * Les longueurs des options sont équilibrées pour éviter le biais "la plus longue = bonne réponse"
 */

export const paletteMCQQuestions = [
  {
    id: 'pal_mcq_001',
    question: "Quelle est la dimension standard d'une palette Europe (EUR) ?",
    options: [
      '100 cm × 120 cm',
      '80 cm × 120 cm',
      '100 cm × 100 cm',
      '120 cm × 120 cm'
    ],
    correctOption: 1,
    explanation: "La palette Europe (EUR) fait 80 cm × 120 cm.",
    category: "Dimensions",
    difficulty: 1
  },
  {
    id: 'pal_mcq_002',
    question: "Que signifie 'Ti' dans le calcul de palettisation ?",
    options: [
      'Taille du colis',
      'Colis par couche',
      'Taux occupation',
      'Temps install'
    ],
    correctOption: 1,
    explanation: "Ti = Nombre de colis par couche (parfois appelé 'Turn').",
    category: "Formules",
    difficulty: 1
  },
  {
    id: 'pal_mcq_003',
    question: "Dans la formule, que représente 'Hi' ?",
    options: [
      'Hauteur colis',
      'Hauteur interdite',
      'Nombre couches',
      'Hauteur totale'
    ],
    correctOption: 2,
    explanation: "Hi = Nombre de couches empilables selon la hauteur max.",
    category: "Formules",
    difficulty: 1
  },
  {
    id: 'pal_mcq_004',
    question: "Hauteur maximale standard pour une palette en entrepôt ?",
    options: [
      '1,20 m',
      '1,50 m',
      '1,80 m',
      '2,00 m'
    ],
    correctOption: 2,
    explanation: "La hauteur maximale standard est de 1,80 m (hors charge).",
    category: "Normes",
    difficulty: 2
  },
  {
    id: 'pal_mcq_005',
    question: "Quelle méthode optimise le nombre de colis par couche ?",
    options: [
      'Même sens',
      'Alternance sens',
      'Cartons carrés',
      'Hauteur max'
    ],
    correctOption: 1,
    explanation: "L'alternance de sens (nesting) optimise l'espace.",
    category: "Optimisation",
    difficulty: 2
  },
  {
    id: 'pal_mcq_006',
    question: "Colis 40×30 cm sur palette 80×120 cm. Combien par couche ?",
    options: [
      '4',
      '6',
      '8',
      '10'
    ],
    correctOption: 2,
    explanation: "80÷40=2, 120÷30=4. Total: 2×4 = 8 colis.",
    category: "Calcul",
    difficulty: 2
  },
  {
    id: 'pal_mcq_007',
    question: "Poids max recommandé pour palette manuelle ?",
    options: [
      '500 kg',
      '1000 kg',
      '1500 kg',
      '2000 kg'
    ],
    correctOption: 0,
    explanation: "Le poids maximum recommandé est de 500 kg.",
    category: "Sécurité",
    difficulty: 2
  },
  {
    id: 'pal_mcq_008',
    question: "Palette utilisée une seule fois :",
    options: [
      'Perdue',
      'Jetable',
      'À perdre',
      'Unique'
    ],
    correctOption: 2,
    explanation: "C'est une 'palette à perdre' (non récupérée).",
    category: "Vocabulaire",
    difficulty: 1
  },
  {
    id: 'pal_mcq_009',
    question: "Ti × Hi donne :",
    options: [
      'Poids total',
      'Volume total',
      'Total colis',
      'Hauteur totale'
    ],
    correctOption: 2,
    explanation: "Ti × Hi = Nombre total de colis sur la palette.",
    category: "Formules",
    difficulty: 1
  },
  {
    id: 'pal_mcq_010',
    question: "Palette de 60 colis à 2€. Valeur totale ?",
    options: [
      '100 €',
      '120 €',
      '140 €',
      '160 €'
    ],
    correctOption: 1,
    explanation: "60 × 2€ = 120€.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'pal_mcq_011',
    question: "Contrainte principale pour colis fragiles ?",
    options: [
      'Poids total',
      'Charge max bas',
      'Hauteur entrepôt',
      'Type chariot'
    ],
    correctOption: 1,
    explanation: "Respecter la charge max supportée par le colis du bas.",
    category: "Contraintes",
    difficulty: 3
  },
  {
    id: 'pal_mcq_012',
    question: "Colis 50×40×30 cm, hauteur max 1,50m. Nombre de couches ?",
    options: [
      '3',
      '4',
      '5',
      '6'
    ],
    correctOption: 2,
    explanation: "150 ÷ 30 = 5 couches.",
    category: "Calcul",
    difficulty: 2
  },
  {
    id: 'pal_mcq_013',
    question: "Film pour stabiliser les palettes :",
    options: [
      'Alimentaire',
      'Étirable',
      'Bulles',
      'Adhésif'
    ],
    correctOption: 1,
    explanation: "Le film étirable (stretch) stabilise la palette.",
    category: "Matériel",
    difficulty: 1
  },
  {
    id: 'pal_mcq_014',
    question: "33 palettes × 50 colis. Total ?",
    options: [
      '1500',
      '1650',
      '1800',
      '2000'
    ],
    correctOption: 1,
    explanation: "33 × 50 = 1650 colis.",
    category: "Calcul",
    difficulty: 2
  },
  {
    id: 'pal_mcq_015',
    question: "Norme palettes Europe bois ?",
    options: [
      'ISO 9001',
      'NF EN 13698',
      'CE 178/02',
      'ISO 14001'
    ],
    correctOption: 1,
    explanation: "NF EN 13698-1 définit les palettes Europe.",
    category: "Normes",
    difficulty: 3
  },
  {
    id: 'pal_mcq_016',
    question: "Sur 80 cm de palette, combien de colis de 40 cm ?",
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    correctOption: 1,
    explanation: "80 ÷ 40 = 2 colis.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'pal_mcq_017',
    question: "Qu'est-ce que le 'nesting' ?",
    options: [
      'Empiler',
      'Imbriquer',
      'Séparer',
      'Compter'
    ],
    correctOption: 1,
    explanation: "Le nesting = imbriquer les colis pour optimiser.",
    category: "Vocabulaire",
    difficulty: 2
  },
  {
    id: 'pal_mcq_018',
    question: "Palette avec 4 couches de 12 colis. Total ?",
    options: [
      '36',
      '40',
      '48',
      '52'
    ],
    correctOption: 2,
    explanation: "4 × 12 = 48 colis.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'pal_mcq_019',
    question: "Marquage obligatoire sur palette Europe ?",
    options: [
      'Logo',
      'EUR',
      'CE',
      'ISO'
    ],
    correctOption: 1,
    explanation: "Le marquage 'EUR' est obligatoire sur les palettes Europe.",
    category: "Normes",
    difficulty: 2
  },
  {
    id: 'pal_mcq_020',
    question: "Hauteur max 1,80m - colis 30cm. Hi = ?",
    options: [
      '4',
      '5',
      '6',
      '7'
    ],
    correctOption: 2,
    explanation: "180 ÷ 30 = 6 couches max.",
    category: "Calcul",
    difficulty: 2
  }
]

export const getRandomPaletteMCQ = () => {
  return paletteMCQQuestions[Math.floor(Math.random() * paletteMCQQuestions.length)]
}
