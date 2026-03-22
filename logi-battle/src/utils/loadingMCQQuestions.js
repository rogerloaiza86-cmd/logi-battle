/**
 * Questions QCM pour le module Plan de Chargement
 * Options équilibrées en longueur
 */

export const loadingMCQQuestions = [
  {
    id: 'load_mcq_001',
    question: "Capacité conteneur 20 pieds en m³ ?",
    options: [
      '24 m³',
      '33 m³',
      '67 m³',
      '76 m³'
    ],
    correctOption: 1,
    explanation: "Un conteneur 20' fait environ 33 m³.",
    category: "Conteneurs",
    difficulty: 1
  },
  {
    id: 'load_mcq_002',
    question: "Capacité conteneur 40' High Cube ?",
    options: [
      '33 m³',
      '55 m³',
      '67 m³',
      '76 m³'
    ],
    correctOption: 3,
    explanation: "Un 40' HC fait environ 76 m³.",
    category: "Conteneurs",
    difficulty: 1
  },
  {
    id: 'load_mcq_003',
    question: "Palettes Europe (80×120 cm) dans un semi ?",
    options: [
      '26',
      '30',
      '33',
      '40'
    ],
    correctOption: 2,
    explanation: "33 palettes Europe dans un semi standard.",
    category: "Camions",
    difficulty: 2
  },
  {
    id: 'load_mcq_004',
    question: "Colis 1m × 1m × 1m. Volume ?",
    options: [
      '0,5 m³',
      '1 m³',
      '1,5 m³',
      '3 m³'
    ],
    correctOption: 1,
    explanation: "1 × 1 × 1 = 1 m³.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'load_mcq_005',
    question: "Principe maximisant le remplissage ?",
    options: [
      'Lourds d\'abord',
      'Cubing 3D',
      'Alphabétique',
      'Colis identiques'
    ],
    correctOption: 1,
    explanation: "Le cubing 3D optimise le remplissage.",
    category: "Optimisation",
    difficulty: 2
  },
  {
    id: 'load_mcq_006',
    question: "20 pieds = combien de mètres ?",
    options: [
      '6 m',
      '12 m',
      '18 m',
      '24 m'
    ],
    correctOption: 0,
    explanation: "20 pieds ≈ 6 mètres.",
    category: "Conteneurs",
    difficulty: 1
  },
  {
    id: 'load_mcq_007',
    question: "Le 'tare' d'un conteneur c'est :",
    options: [
      'Poids max',
      'Poids vide',
      'Capacité m³',
      'Prix location'
    ],
    correctOption: 1,
    explanation: "Tare = poids à vide du conteneur.",
    category: "Vocabulaire",
    difficulty: 1
  },
  {
    id: 'load_mcq_008',
    question: "20 colis de 0,5 m³. Total ?",
    options: [
      '5 m³',
      '8 m³',
      '10 m³',
      '15 m³'
    ],
    correctOption: 2,
    explanation: "20 × 0,5 = 10 m³.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'load_mcq_009',
    question: "Poids max conteneur 20' chargé ?",
    options: [
      '20 t',
      '24 t',
      '28 t',
      '30,5 t'
    ],
    correctOption: 3,
    explanation: "Poids brut max = 30,5 tonnes.",
    category: "Conteneurs",
    difficulty: 2
  },
  {
    id: 'load_mcq_010',
    question: "Règle pour éviter écrasement colis fragiles ?",
    options: [
      'Fragiles d\'abord',
      'Charge max bas',
      'Palettes renforcées',
      'Charger côté'
    ],
    correctOption: 1,
    explanation: "Respecter la charge max du colis du bas.",
    category: "Sécurité",
    difficulty: 2
  },
  {
    id: 'load_mcq_011',
    question: "Semi 90 m³, colis 1,5 m³. Nombre ?",
    options: [
      '50',
      '60',
      '70',
      '80'
    ],
    correctOption: 1,
    explanation: "90 ÷ 1,5 = 60 colis.",
    category: "Calcul",
    difficulty: 2
  },
  {
    id: 'load_mcq_012',
    question: "Qu'est-ce que le 'fill rate' ?",
    options: [
      'Prix carburant',
      '% occupation',
      'Vitesse',
      'Nb livraisons'
    ],
    correctOption: 1,
    explanation: "Fill rate = taux d'occupation du véhicule.",
    category: "KPI",
    difficulty: 2
  },
  {
    id: 'load_mcq_013',
    question: "Hauteur intérieure semi standard ?",
    options: [
      '2,20 m',
      '2,40 m',
      '2,60-2,70 m',
      '3,00 m'
    ],
    correctOption: 2,
    explanation: "Hauteur standard : 2,60 à 2,70 m.",
    category: "Camions",
    difficulty: 2
  },
  {
    id: 'load_mcq_014',
    question: "15 palettes de 800 kg. Poids total ?",
    options: [
      '10 t',
      '12 t',
      '14 t',
      '16 t'
    ],
    correctOption: 1,
    explanation: "15 × 800 = 12 000 kg = 12 t.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'load_mcq_015',
    question: "Outil pour plan chargement optimal ?",
    options: [
      'Excel',
      'Cubing/TMS',
      'GPS',
      'Scanner'
    ],
    correctOption: 1,
    explanation: "Logiciels de cubing ou TMS.",
    category: "Outils",
    difficulty: 2
  },
  {
    id: 'load_mcq_016',
    question: "Que signifie 'LIFO' ?",
    options: [
      'Dernier entré sorti',
      'Charge rapide',
      'Gros sorti',
      'Léger plein'
    ],
    correctOption: 0,
    explanation: "LIFO = Last In First Out.",
    category: "Méthodes",
    difficulty: 2
  },
  {
    id: 'load_mcq_017',
    question: "Camion 24 t, déjà 18 t. Capacité restante ?",
    options: [
      '4 t',
      '6 t',
      '8 t',
      '10 t'
    ],
    correctOption: 1,
    explanation: "24 - 18 = 6 tonnes.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'load_mcq_018',
    question: "Densité standard 'équilibrée' ?",
    options: [
      '100 kg/m³',
      '200 kg/m³',
      '300 kg/m³',
      '400 kg/m³'
    ],
    correctOption: 2,
    explanation: "Densité équilibrée ≈ 300 kg/m³.",
    category: "Densité",
    difficulty: 3
  },
  {
    id: 'load_mcq_019',
    question: "Qu'est-ce qu'un 'surchargement' ?",
    options: [
      'Charger vite',
      'Dépasser capacité',
      'Charger soir',
      'Trop palettes'
    ],
    correctOption: 1,
    explanation: "Surchargement = dépasser la capacité max.",
    category: "Sécurité",
    difficulty: 1
  },
  {
    id: 'load_mcq_020',
    question: "50 cartons 20 kg, 0,1 m³ chacun. Densité ?",
    options: [
      '100 kg/m³',
      '150 kg/m³',
      '200 kg/m³',
      '250 kg/m³'
    ],
    correctOption: 2,
    explanation: "1000 kg ÷ 5 m³ = 200 kg/m³.",
    category: "Calcul",
    difficulty: 3
  },
  {
    id: 'load_mcq_021',
    question: "Longueur standard semi-remorque ?",
    options: [
      '10 m',
      '12 m',
      '13,60 m',
      '16 m'
    ],
    correctOption: 2,
    explanation: "Longueur standard : 13,60 m.",
    category: "Camions",
    difficulty: 1
  },
  {
    id: 'load_mcq_022',
    question: "Volume d'une caisse semi 13,60m × 2,45m × 2,70m ?",
    options: [
      '80 m³',
      '90 m³',
      '100 m³',
      '110 m³'
    ],
    correctOption: 1,
    explanation: "13,60 × 2,45 × 2,70 ≈ 90 m³.",
    category: "Calcul",
    difficulty: 2
  },
  {
    id: 'load_mcq_023',
    question: "Qu'est-ce que le 'cubing' ?",
    options: [
      'Cubique',
      'Optimisation 3D',
      'Mesure',
      'Poids'
    ],
    correctOption: 1,
    explanation: "Cubing = optimisation en 3 dimensions.",
    category: "Vocabulaire",
    difficulty: 2
  },
  {
    id: 'load_mcq_024',
    question: "40 colis, 25 kg chacun. Poids total ?",
    options: [
      '800 kg',
      '1000 kg',
      '1200 kg',
      '1500 kg'
    ],
    correctOption: 1,
    explanation: "40 × 25 = 1000 kg.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'load_mcq_025',
    question: "Qu'est-ce que le 'payload' ?",
    options: [
      'Charge utile',
      'Poids total',
      'Tare',
      'Volume'
    ],
    correctOption: 0,
    explanation: "Payload = charge utile transportable.",
    category: "Vocabulaire",
    difficulty: 2
  }
]

export const getRandomLoadingMCQ = () => {
  return loadingMCQQuestions[Math.floor(Math.random() * loadingMCQQuestions.length)]
}
