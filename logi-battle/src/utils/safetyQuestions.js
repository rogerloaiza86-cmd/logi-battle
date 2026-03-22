/**
 * Safety First - Pôle 1 & 4 - U31/U32/U33
 * Compétences : Prévention des risques, EPI, sécurité chariots
 */

export const epiCategories = [
  {
    category: 'Tête',
    items: ['Casque de chantier', 'Casque de protection', 'Calot de sécurité'],
    pictogram: '⛑️',
    risks: ['Chutes d\'objets', 'Heurts', 'Projections']
  },
  {
    category: 'Yeux/Visage',
    items: ['Lunettes de sécurité', 'Écran facial', 'Masque de soudure'],
    pictogram: '🥽',
    risks: ['Projections', 'Poussières', 'Radiations']
  },
  {
    category: 'Audition',
    items: ['Bouchons d\'oreilles', 'Casque antibruit', 'Serre-tête'],
    pictogram: '🎧',
    risks: ['Bruit >85dB', 'Impacts sonores']
  },
  {
    category: 'Mains',
    items: ['Gants de manutention', 'Gants chimiques', 'Gants thermiques', 'Gants anti-coupure'],
    pictogram: '🧤',
    risks: ['Coupures', 'Abrasions', 'Produits chimiques', 'Chaleur']
  },
  {
    category: 'Pieds',
    items: ['Chaussures de sécurité (S1-S5)', 'Bottes', 'Surchaussures'],
    pictogram: '🥾',
    risks: ['Chutes d\'objets', 'Perforations', 'Écrasements', 'Glissades']
  },
  {
    category: 'Chute',
    items: ['Harnais antichute', 'Longe', 'Ligne de vie'],
    pictogram: '🪢',
    risks: ['Travail en hauteur', 'Chutes de plain-pied']
  },
  {
    category: 'Corporel',
    items: ['Gilet haute visibilité', 'Tablier', 'Combinaison'],
    pictogram: '🦺',
    risks: ['Visibilité', 'Salissures', 'Produits chimiques']
  }
];

export const dangerSigns = [
  {
    type: 'interdiction',
    color: 'Rond blanc sur fond rouge',
    meaning: 'Action interdite',
    examples: ['Interdit de fumer', 'Interdit de marcher', 'Interdiction de stationner']
  },
  {
    type: 'obligation',
    color: 'Rond bleu sur fond blanc',
    meaning: 'Action obligatoire',
    examples: ['Port des EPI obligatoire', 'Lunettes obligatoires', 'Chaussures de sécurité']
  },
  {
    type: 'danger',
    color: 'Triangle jaune avec bord noir',
    meaning: 'Risque potentiel',
    examples: ['Risque électrique', 'Chariots élévateurs', 'Sol glissant']
  },
  {
    type: 'secours',
    color: 'Rectangle vert sur fond blanc',
    meaning: 'Issue de secours / Équipement de secours',
    examples: ['Sortie de secours', 'Extincteur', 'Poste de secours']
  },
  {
    type: 'incendie',
    color: 'Carré rouge sur fond blanc',
    meaning: 'Équipement incendie',
    examples: ['Extincteur', 'Robinet incendie', 'Alarme incendie']
  }
];

export const safetyQuestions = [
  // EPI - Équipements de Protection Individuelle
  {
    id: 'safety_001',
    type: 'epi_identification',
    difficulty: 1,
    scenario: "Un opérateur travaille dans une zone de stockage où des palettes sont empilées à 4 mètres de hauteur.",
    question: "Quel EPI est obligatoire dans cette zone ?",
    options: ['Gants uniquement', 'Casque de chantier', 'Chaussures de sécurité', 'Tous ces EPI'],
    correctOption: 3,
    explanation: "En zone de stockage haut : casque (chutes d'objets), chaussures de sécurité (écrasements), gants (manutention).",
    category: 'EPI',
    context: 'Zone stockage'
  },
  {
    id: 'safety_002',
    type: 'epi_identification',
    difficulty: 1,
    question: "Quelles chaussures portez-vous pour travailler en entrepôt logistique ?",
    options: [
      'Baskets de sport',
      'Chaussures de ville',
      'Chaussures de sécurité (normées)',
      'Sandales fermées'
    ],
    correctOption: 2,
    explanation: "Les chaussures de sécurité (norme EN ISO 20345) sont obligatoires avec coque de protection et semme anti-perforation.",
    category: 'EPI',
    context: 'Chaussures'
  },
  {
    id: 'safety_003',
    type: 'epi_selection',
    difficulty: 2,
    scenario: "Vous devez manipuler des produits chimiques corrosifs pour nettoyer des emplacements.",
    question: "Quel EPI pour les mains est adapté ?",
    options: [
      'Gants de manutention standard',
      'Gants chimiques (nitrile ou néoprène)',
      'Gants en coton',
      'Pas de gants nécessaires'
    ],
    correctOption: 1,
    explanation: "Les produits chimiques nécessitent des gants spécifiques résistants aux agents chimiques (nitrile, néoprène, latex selon le produit).",
    category: 'EPI',
    context: 'Produits chimiques'
  },
  {
    id: 'safety_004',
    type: 'epi_selection',
    difficulty: 2,
    scenario: "Travail près d'une zone où des chariots élévateurs circulent en permanence.",
    question: "Quel EPI améliore la visibilité ?",
    options: [
      'Casque de chantier',
      'Gilet haute visibilité (fluo/réfléchissant)',
      'Chaussures de sécurité',
      'Gants de protection'
    ],
    correctOption: 1,
    explanation: "Le gilet HV (Haute Visibilité) jaune/orange fluo avec bandes réfléchissantes permet d'être vu par les caristes.",
    category: 'EPI',
    context: 'Visibilité'
  },
  {
    id: 'safety_005',
    type: 'epi_defect',
    difficulty: 2,
    scenario: "Vous constatez que votre casque de sécurité a une fissure sur la coque.",
    question: "Que devez-vous faire ?",
    options: [
      'Continuer à l\'utiliser, ce n\'est qu\'une petite fissure',
      'Le réparer avec du scotch',
      'Le signaler et le remplacer immédiatement',
      'L\'utiliser uniquement pour des travaux légers'
    ],
    correctOption: 2,
    explanation: "Un EPI endommagé ne protège plus correctement. Il doit être retiré du service et remplacé immédiatement.",
    category: 'EPI',
    context: 'Maintenance EPI'
  },

  // Chariots élévateurs - CACES
  {
    id: 'safety_006',
    type: 'caces_rule',
    difficulty: 1,
    question: "Quel document est obligatoire pour conduire un chariot élévateur ?",
    options: [
      'Permis de conduire B',
      'CACES (Catégorie correspondante)',
      'Attestation employeur',
      'Aucun document'
    ],
    correctOption: 1,
    explanation: "Le CACES (Cat 1, 3, 5 selon le type de chariot) est obligatoire et doit être renouvelé tous les 10 ans (5 ans pour les -25 ans).",
    category: 'CACES',
    context: 'Réglementation'
  },
  {
    id: 'safety_007',
    type: 'caces_safety',
    difficulty: 2,
    scenario: "Un chariot élévateur circule dans une allée de stockage.",
    question: "Qui a la priorité ?",
    options: [
      'Le piéton',
      'Le chariot élévateur',
      'Celui qui arrive en premier',
      'Celui qui klaxonne le plus fort'
    ],
    correctOption: 0,
    explanation: "La priorité est toujours aux piétons. Le cariste doit s'arrêter et/ou klaxonner pour alerter.",
    category: 'CACES',
    context: 'Règles circulation'
  },
  {
    id: 'safety_008',
    type: 'caces_technical',
    difficulty: 2,
    question: "Qu'est-ce qui détermine la stabilité d'un chariot élévateur ?",
    options: [
      'La vitesse maximale',
      'Le triangle de stabilité (centre de gravité)',
      'La couleur du chariot',
      'L\'âge du conducteur'
    ],
    correctOption: 1,
    explanation: "Le chariot est stable tant que son centre de gravité reste dans le 'triangle de stabilité' formé par les roues directrices et la roue directrice arrière.",
    category: 'CACES',
    context: 'Stabilité'
  },
  {
    id: 'safety_009',
    type: 'caces_load',
    difficulty: 3,
    scenario: "Un chariot doit lever une charge de 2000kg à 4 mètres de hauteur.",
    question: "Que doit vérifier le cariste ?",
    options: [
      'Que la charge est bien centrée',
      'Que la capacité résiduelle du chariot permet ce levage',
      'Que le mât est bien vertical',
      'Toutes ces réponses'
    ],
    correctOption: 3,
    explanation: "La capacité de levage diminue avec la hauteur. Il faut vérifier le diagramme de charge, le centrage, et la verticalité du mât.",
    category: 'CACES',
    context: 'Levage hauteur'
  },
  {
    id: 'safety_010',
    type: 'caces_zone',
    difficulty: 2,
    question: "Quelle signalisation doit être présente dans les zones de circulation de chariots ?",
    options: [
      'Aucune signalisation',
      'Lignes au sol, panneaux de danger, limitations de vitesse',
      'Uniquement des panneaux stop',
      'Des miroirs uniquement'
    ],
    correctOption: 1,
    explanation: "Les zones de chariots doivent être balisées (lignes au sol), signalées (panneaux danger), avec limitations de vitesse et miroirs aux intersections.",
    category: 'CACES',
    context: 'Signalisation'
  },

  // Risques et dangers
  {
    id: 'safety_011',
    type: 'risk_identification',
    difficulty: 1,
    scenario: "Une palette est mal centrée sur les fourches du chariot et penche sur le côté.",
    question: "Quel est le risque principal ?",
    options: [
      'Risque de chute de la charge',
      'Risque de rayure du chariot',
      'Risque de retard',
      'Aucun risque'
    ],
    correctOption: 0,
    explanation: "Une charge mal centrée peut basculer et tomber, risquant de blesser des personnes ou d'endommager des biens.",
    category: 'Risques',
    context: 'Chute de charge'
  },
  {
    id: 'safety_012',
    type: 'risk_identification',
    difficulty: 2,
    scenario: "Vous constatez une flaque d'huile sur le sol d'une allée de circulation.",
    question: "Quel est le risque ? Quelle est la première action ?",
    options: [
      'Risque d\'incendie - Appeler les pompiers',
      'Risque de glissade - Baliser et nettoyer immédiatement',
      'Risque d\'inondation - Ignorer',
      'Aucun risque'
    ],
    correctOption: 1,
    explanation: "L'huile au sol crée un risque de glissade (chutes). Il faut baliser la zone et nettoyer immédiatement.",
    category: 'Risques',
    context: 'Sol glissant'
  },
  {
    id: 'safety_013',
    type: 'risk_identification',
    difficulty: 2,
    question: "Un bruit constant de 90dB dans l'entrepôt représente un risque pour :",
    options: [
      'La vue',
      'L\'ouïe',
      'Le toucher',
      'L\'odorat'
    ],
    correctOption: 1,
    explanation: "Au-delà de 85dB régulièrement, il y a risque de lésions auditives. Protection obligatoire : bouchons ou casque antibruit.",
    category: 'Risques',
    context: 'Bruit'
  },

  // Signalisation
  {
    id: 'safety_014',
    type: 'sign_identification',
    difficulty: 1,
    question: "Un panneau rond BLEU avec pictogramme blanc indique :",
    options: [
      'Un danger',
      'Une interdiction',
      'Une obligation',
      'Une issue de secours'
    ],
    correctOption: 2,
    explanation: "Rond BLEU = Obligation (ex: port de casque, port de gants). Rouge = Interdiction, Jaune = Danger, Vert = Secours.",
    category: 'Signalisation',
    context: 'Couleurs'
  },
  {
    id: 'safety_015',
    type: 'sign_identification',
    difficulty: 1,
    question: "Un panneau triangulaire JAUNE avec bord noir signale :",
    options: [
      'Une obligation',
      'Un danger potentiel',
      'Une interdiction',
      'Un équipement de secours'
    ],
    correctOption: 1,
    explanation: "Triangle jaune = Danger (attention chariots, sol glissant, risque électrique, etc.).",
    category: 'Signalisation',
    context: 'Formes'
  },
  {
    id: 'safety_016',
    type: 'sign_identification',
    difficulty: 2,
    question: "Un extincteur est signalé par un panneau :",
    options: [
      'Rond bleu',
      'Carré rouge',
      'Triangle jaune',
      'Rectangle vert'
    ],
    correctOption: 1,
    explanation: "Carré rouge = Moyens de lutte contre l'incendie (extincteurs, robinets d'incendie armés).",
    category: 'Signalisation',
    context: 'Incendie'
  },

  // Situations dangereuses
  {
    id: 'safety_017',
    type: 'situation_spot',
    difficulty: 2,
    scenario: "Image mentale : Un opérateur grimpe sur une palette pour atteindre un carton en hauteur.",
    question: "Quels sont les dangers ?",
    options: [
      'Chute de hauteur',
      'Chute de la charge',
      'Blessure au dos',
      'Tous ces risques'
    ],
    correctOption: 3,
    explanation: "Grimper sur une palette = chute possible + palette instable + effort en hauteur (dos). Utiliser un escabeau ou échelle adaptée.",
    category: 'Situations dangereuses',
    context: 'Hauteur'
  },
  {
    id: 'safety_018',
    type: 'situation_spot',
    difficulty: 3,
    scenario: "Un chariot élévateur soulève une charge de 1500kg. Le conducteur descend pour vérifier un détail tout en laissant la charge en l'air.",
    question: "Quel est le danger principal ?",
    options: [
      'Le chariot va démarrer seul',
      'La charge peut tomber si le système hydraulique lâche',
      'Le conducteur va oublier où il est',
      'Aucun danger'
    ],
    correctOption: 1,
    explanation: "Une charge en l'air présente un risque si défaillance hydraulique. Règle d'or : Ne jamais laisser une charge en suspension si on quitte le poste.",
    category: 'Situations dangereuses',
    context: 'Charge suspendue'
  },
  {
    id: 'safety_019',
    type: 'situation_spot',
    difficulty: 2,
    question: "Vous voyez un opérateur pousser manuellement une palette de 500kg sur une rampe inclinée.",
    options: [
      'C\'est une bonne méthode de travail',
      'C\'est dangereux : risque de perdre le contrôle et d\'écrasement',
      'C\'est acceptable si on va lentement',
      'Il faut le faire à deux'
    ],
    correctOption: 1,
    explanation: "Pousser une charge lourde en pente = perte de contrôle possible. Utiliser un transpalette adapté ou chariot élévateur.",
    category: 'Situations dangereuses',
    context: 'Manutention manuelle'
  },

  // Évacuation et secours
  {
    id: 'safety_020',
    type: 'evacuation',
    difficulty: 1,
    question: "En cas d'alarme incendie, que faites-vous en premier ?",
    options: [
      'Finir votre travail en cours',
      'Évacuer immédiatement par les issues de secours',
      'Appeler un collègue',
      'Prendre vos affaires personnelles'
    ],
    correctOption: 1,
    explanation: "L'ordre est : Alerte (avertir), Évacuer, Secourir (si possible). Évacuer immédiatement sans prendre de risques.",
    category: 'Évacuation',
    context: 'Incendie'
  },
  {
    id: 'safety_021',
    type: 'evacuation',
    difficulty: 2,
    question: "Les issues de secours doivent toujours être :",
    options: [
      'Verrouillées pour la sécurité',
      'Dégagées et libres d\'accès',
      'Utilisées pour stocker des produits',
      'Fermées à clé'
    ],
    correctOption: 1,
    explanation: "Les issues de secours DOIVENT rester dégagées en permanence. C'est une obligation légale vitale.",
    category: 'Évacuation',
    context: 'Issues'
  },
  {
    id: 'safety_022',
    type: 'first_aid',
    difficulty: 2,
    question: "Un collègue s'est coupé légèrement au doigt. Vous :",
    options: [
      'Appelez immédiatement le SAMU',
      'Lui faites un garrot',
      'Lavez la plaie et appliquez un pansement propre',
      'Ignorez, ce n\'est rien'
    ],
    correctOption: 2,
    explanation: "Pour une coupure légère : nettoyer à l'eau et savon, désinfecter si nécessaire, protéger avec pansement. Consulter si saignement persistant.",
    category: 'Premiers secours',
    context: 'Coupure'
  },

  // Ergonomie
  {
    id: 'safety_023',
    type: 'ergonomics',
    difficulty: 2,
    question: "Pour soulever une charge lourde, la bonne technique est :",
    options: [
      'Plier les genoux, dos droit, tenir la charge près du corps',
      'Se pencher en avant, dos rond',
      'Soulever rapidement d\'un coup',
      'Tenir la charge à bout de bras'
    ],
    correctOption: 0,
    explanation: "Technique : pieds écartés, plier les genoux (pas le dos), tenir la charge proche du corps, ne pas tourner en soulevant.",
    category: 'Ergonomie',
    context: 'Manutention manuelle'
  },
  {
    id: 'safety_024',
    type: 'ergonomics',
    difficulty: 2,
    question: "La limite réglementaire de charge pour une manutention manuelle occasionnelle est de :",
    options: [
      '15 kg pour homme, 10 kg pour femme',
      '25 kg pour homme, 15 kg pour femme',
      '50 kg pour tout le monde',
      'Pas de limite légale'
    ],
    correctOption: 0,
    explanation: "Recommandations : 25kg homme/15kg femme pour charges fréquentes. Au-delà, utiliser des aides mécaniques.",
    correction: "En France, les valeurs limites recommandées sont 25kg (homme) et 15kg (femme) pour une manutention fréquente. Pour l'occasionnel : 30kg/20kg. Mais l'employeur doit évaluer les risques.",
    category: 'Ergonomie',
    context: 'Limites poids'
  },
  {
    id: 'safety_025',
    type: 'ergonomics',
    difficulty: 3,
    question: "Vous travaillez sur écran toute la journée. Quelle règle respectez-vous ?",
    options: [
      'Travailler 8h d\'affilée sans pause',
      'Faire une pause de 5 minutes toutes les heures, regarder au loin',
      'Baisser la luminosité au minimum',
      'Augmenter la taille de police à 200%'
    ],
    correctOption: 1,
    explanation: "Règle des 20-20-20 : toutes les 20min, regarder à 20 pieds (6m) pendant 20 secondes. Pauses régulières obligatoires.",
    category: 'Ergonomie',
    context: 'Travail sur écran'
  }
];

// Fonctions utilitaires
export const getSafetyQuestion = () => {
  const randomIndex = Math.floor(Math.random() * safetyQuestions.length);
  return safetyQuestions[randomIndex];
};

export const getSafetyQuestionsByCategory = (category) => {
  return safetyQuestions.filter(q => q.category === category);
};

export const getSafetyQuestionsByDifficulty = (difficulty) => {
  return safetyQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomSafetyQuestions = (count = 10) => {
  const shuffled = [...safetyQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default safetyQuestions;
