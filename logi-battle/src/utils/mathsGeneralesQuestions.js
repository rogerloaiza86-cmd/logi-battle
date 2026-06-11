/**
 * Banque Mathématiques générales — calcul, fractions, pourcentages,
 * proportionnalité, géométrie, statistiques. Niveau lycée professionnel.
 */

export const mathsGeneralesQuestions = [
  {
    id: 'mg_001',
    question: "Combien font 15 % de 240 € ?",
    options: ['24 €', '36 €', '32 €', '48 €'],
    correctOption: 1,
    explanation: "15 % de 240 = 240 × 0,15 = 36 €. Astuce : 10 % = 24, 5 % = 12, donc 15 % = 36.",
    category: 'Pourcentages',
    difficulty: 1
  },
  {
    id: 'mg_002',
    question: "Un article à 80 € est soldé à -30 %. Quel est son nouveau prix ?",
    options: ['50 €', '56 €', '60 €', '54 €'],
    correctOption: 1,
    explanation: "Réduction : 80 × 0,30 = 24 €. Prix soldé : 80 − 24 = 56 € (ou directement 80 × 0,70).",
    category: 'Pourcentages',
    difficulty: 1
  },
  {
    id: 'mg_003',
    question: "Quelle fraction est égale à 0,75 ?",
    options: ['2/3', '3/4', '4/5', '7/5'],
    correctOption: 1,
    explanation: "3 ÷ 4 = 0,75. C'est aussi 75/100 simplifié par 25.",
    category: 'Fractions',
    difficulty: 1
  },
  {
    id: 'mg_004',
    question: "Combien font 1/2 + 1/4 ?",
    options: ['2/6', '3/4', '1/6', '2/4'],
    correctOption: 1,
    explanation: "On met au même dénominateur : 1/2 = 2/4, puis 2/4 + 1/4 = 3/4. On n'additionne jamais les dénominateurs !",
    category: 'Fractions',
    difficulty: 1
  },
  {
    id: 'mg_005',
    question: "3 kg de pommes coûtent 7,50 €. Combien coûtent 5 kg ?",
    options: ['10,50 €', '12,50 €', '11,25 €', '15 €'],
    correctOption: 1,
    explanation: "Prix au kg : 7,50 ÷ 3 = 2,50 €. Pour 5 kg : 2,50 × 5 = 12,50 € (règle de trois).",
    category: 'Proportionnalité',
    difficulty: 1
  },
  {
    id: 'mg_006',
    question: "Quelle est l'aire d'un rectangle de 8 m sur 5 m ?",
    options: ['13 m²', '40 m²', '26 m²', '80 m²'],
    correctOption: 1,
    explanation: "Aire d'un rectangle = longueur × largeur = 8 × 5 = 40 m². (26 m correspond au périmètre.)",
    category: 'Géométrie',
    difficulty: 1
  },
  {
    id: 'mg_007',
    question: "Quel est le périmètre d'un cercle de rayon 10 cm (π ≈ 3,14) ?",
    options: ['31,4 cm', '62,8 cm', '314 cm', '15,7 cm'],
    correctOption: 1,
    explanation: "Périmètre = 2 × π × r = 2 × 3,14 × 10 = 62,8 cm.",
    category: 'Géométrie',
    difficulty: 2
  },
  {
    id: 'mg_008',
    question: "Résoudre : 3x + 5 = 20",
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 15'],
    correctOption: 1,
    explanation: "3x = 20 − 5 = 15, donc x = 15 ÷ 3 = 5.",
    category: 'Algèbre',
    difficulty: 2
  },
  {
    id: 'mg_009',
    question: "Quelle est la moyenne de 12, 15, 9 et 16 ?",
    options: ['12', '13', '14', '15'],
    correctOption: 1,
    explanation: "Moyenne = (12 + 15 + 9 + 16) ÷ 4 = 52 ÷ 4 = 13.",
    category: 'Statistiques',
    difficulty: 1
  },
  {
    id: 'mg_010',
    question: "Un prix passe de 50 € à 65 €. Quel est le pourcentage d'augmentation ?",
    options: ['15 %', '30 %', '25 %', '20 %'],
    correctOption: 1,
    explanation: "Augmentation : 15 €. En pourcentage : 15 ÷ 50 = 0,30 soit 30 %.",
    category: 'Pourcentages',
    difficulty: 2
  },
  {
    id: 'mg_011',
    question: "Convertir 2,5 heures en minutes :",
    options: ['125 min', '150 min', '250 min', '130 min'],
    correctOption: 1,
    explanation: "2,5 h = 2 h + 0,5 h = 120 min + 30 min = 150 min.",
    category: 'Conversions',
    difficulty: 1
  },
  {
    id: 'mg_012',
    question: "Combien font (−3) × (−4) ?",
    options: ['−12', '12', '−7', '7'],
    correctOption: 1,
    explanation: "Le produit de deux nombres négatifs est positif : (−3) × (−4) = +12.",
    category: 'Calcul',
    difficulty: 1
  },
  {
    id: 'mg_013',
    question: "Dans un triangle rectangle, les côtés de l'angle droit mesurent 3 et 4. Combien mesure l'hypoténuse ?",
    options: ['5', '6', '7', '12'],
    correctOption: 0,
    explanation: "Théorème de Pythagore : h² = 3² + 4² = 9 + 16 = 25, donc h = 5. C'est le fameux triangle 3-4-5.",
    category: 'Géométrie',
    difficulty: 2
  },
  {
    id: 'mg_014',
    question: "Quelle est l'écriture scientifique de 45 000 ?",
    options: ['45 × 10³', '4,5 × 10⁴', '4,5 × 10³', '0,45 × 10⁵'],
    correctOption: 1,
    explanation: "En écriture scientifique, le nombre doit être entre 1 et 10 : 45 000 = 4,5 × 10⁴.",
    category: 'Calcul',
    difficulty: 2
  },
  {
    id: 'mg_015',
    question: "Un véhicule roule à 90 km/h. Quelle distance parcourt-il en 20 minutes ?",
    options: ['25 km', '30 km', '45 km', '18 km'],
    correctOption: 1,
    explanation: "20 min = 1/3 d'heure. Distance = 90 × 1/3 = 30 km.",
    category: 'Proportionnalité',
    difficulty: 2
  },
  {
    id: 'mg_016',
    question: "Quel est le volume d'un pavé de 2 m × 3 m × 4 m ?",
    options: ['9 m³', '24 m³', '12 m³', '20 m³'],
    correctOption: 1,
    explanation: "Volume d'un pavé droit = L × l × h = 2 × 3 × 4 = 24 m³.",
    category: 'Géométrie',
    difficulty: 1
  },
  {
    id: 'mg_017',
    question: "Combien font 7² − 3² ?",
    options: ['16', '40', '49', '46'],
    correctOption: 1,
    explanation: "7² = 49 et 3² = 9, donc 49 − 9 = 40.",
    category: 'Calcul',
    difficulty: 1
  },
  {
    id: 'mg_018',
    question: "Une TVA de 20 % s'applique sur un prix HT de 150 €. Quel est le prix TTC ?",
    options: ['170 €', '180 €', '175 €', '190 €'],
    correctOption: 1,
    explanation: "TVA : 150 × 0,20 = 30 €. TTC = 150 + 30 = 180 € (ou 150 × 1,20).",
    category: 'Pourcentages',
    difficulty: 1
  },
  {
    id: 'mg_019',
    question: "Quelle est la médiane de la série : 3, 7, 8, 12, 15 ?",
    options: ['7', '8', '9', '12'],
    correctOption: 1,
    explanation: "La médiane est la valeur centrale d'une série ordonnée : ici la 3e valeur sur 5, soit 8.",
    category: 'Statistiques',
    difficulty: 2
  },
  {
    id: 'mg_020',
    question: "Développer : 2(x + 3)",
    options: ['2x + 3', '2x + 6', 'x + 6', '2x + 5'],
    correctOption: 1,
    explanation: "On distribue le 2 sur chaque terme : 2 × x + 2 × 3 = 2x + 6.",
    category: 'Algèbre',
    difficulty: 1
  },
  {
    id: 'mg_021',
    question: "Convertir 3 500 g en kilogrammes :",
    options: ['0,35 kg', '3,5 kg', '35 kg', '350 kg'],
    correctOption: 1,
    explanation: "1 kg = 1 000 g, donc 3 500 g = 3,5 kg.",
    category: 'Conversions',
    difficulty: 1
  },
  {
    id: 'mg_022',
    question: "Un capital de 1 000 € placé à 3 % par an rapporte combien d'intérêts en un an ?",
    options: ['3 €', '30 €', '300 €', '33 €'],
    correctOption: 1,
    explanation: "Intérêts simples : 1 000 × 0,03 = 30 € par an.",
    category: 'Pourcentages',
    difficulty: 1
  },
]

export const getMathsGeneralesQuestion = () =>
  mathsGeneralesQuestions[Math.floor(Math.random() * mathsGeneralesQuestions.length)]
