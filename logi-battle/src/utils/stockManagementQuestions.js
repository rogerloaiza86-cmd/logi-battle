/**
 * Stock Master 3D - Pôle 1 - U31
 * Compétences : Mise en stock, gestion des emplacements, méthodes FIFO/LIFO
 */

export const stockMethods = [
  {
    id: 'fifo',
    name: 'FIFO',
    fullName: 'First In, First Out',
    description: 'Premier entré, premier sorti',
    useCase: 'Produits périssables, sensibles à la date',
    icon: '🥬',
    color: 'green'
  },
  {
    id: 'lifo',
    name: 'LIFO',
    fullName: 'Last In, First Out',
    description: 'Dernier entré, premier sorti',
    useCase: 'Matériaux de construction, produits non périssables',
    icon: '🧱',
    color: 'orange'
  },
  {
    id: 'fefo',
    name: 'FEFO',
    fullName: 'First Expired, First Out',
    description: 'Premier expiré, premier sorti',
    useCase: 'Produits pharmaceutiques, alimentaires avec DLC courte',
    icon: '💊',
    color: 'red'
  }
];

export const emplacementTypes = [
  {
    code: 'A01-02-03',
    allée: 'A',
    travée: '01',
    niveau: '02',
    position: '03',
    description: 'Allée A, Travée 01, Niveau 2, Position 3'
  },
  {
    code: 'B15-03-01',
    allée: 'B',
    travée: '15',
    niveau: '03',
    position: '01',
    description: 'Zone B, Travée 15, Niveau 3 (haut), Position 1'
  }
];

export const stockQuestions = [
  // Méthodes de gestion de stock
  {
    id: 'stock_001',
    type: 'method_identification',
    difficulty: 1,
    question: "Pour des produits alimentaires frais avec une date de péremption courte, quelle méthode de gestion de stock utilisez-vous ?",
    options: ['FIFO', 'LIFO', 'FEFO', 'Random'],
    correctOption: 2,
    explanation: "FEFO (First Expired First Out) privilégie les produits dont la date de péremption est la plus proche, essentiel pour les produits frais.",
    category: 'Méthodes de gestion',
    context: 'Produits frais'
  },
  {
    id: 'stock_002',
    type: 'method_identification',
    difficulty: 1,
    question: "Quelle méthode signifie 'Premier entré, Premier sorti' ?",
    options: ['LIFO', 'FIFO', 'FEFO', 'JIT'],
    correctOption: 1,
    explanation: "FIFO = First In First Out. Les premiers produits arrivés sont les premiers à sortir, idéal pour éviter l'obsolescence.",
    category: 'Méthodes de gestion',
    context: 'Rotation stock'
  },
  {
    id: 'stock_003',
    type: 'method_identification',
    difficulty: 2,
    question: "Pour des palettes de ciment (matériau lourd, non périssable), quelle méthode est la plus adaptée ?",
    options: ['FIFO uniquement', 'LIFO', 'FEFO', 'Aucune méthode'],
    correctOption: 1,
    explanation: "LIFO (Last In First Out) convient aux produits non périssables où la rotation n'est pas critique. Le ciment dernier arrivé est souvent plus accessible en haut de pile.",
    category: 'Méthodes de gestion',
    context: 'Matériaux lourds'
  },
  {
    id: 'stock_004',
    type: 'method_application',
    difficulty: 2,
    scenario: "Vous avez reçu 3 lots de yaourts : Lot A (DLC 15/03), Lot B (DLC 20/03), Lot C (DLC 18/03).",
    question: "Dans quel ordre devez-vous les expédier pour respecter la méthode FEFO ?",
    options: ['A → C → B', 'B → C → A', 'C → A → B', 'B → A → C'],
    correctOption: 0,
    explanation: "FEFO : Lot A (15/03) expire le premier, puis C (18/03), puis B (20/03). Ordre : A → C → B.",
    category: 'Application FEFO',
    context: 'DLC produits frais'
  },

  // Adressage et localisation
  {
    id: 'stock_005',
    type: 'address_decoding',
    difficulty: 1,
    question: "Dans le code d'emplacement 'B12-03-02', que signifie '03' ?",
    options: ['Allée B', 'Travée 12', 'Niveau 3', 'Position 2'],
    correctOption: 2,
    explanation: "Le format standard est : Allée-Travée-Niveau-Position. Donc '03' = Niveau 3.",
    category: 'Adressage',
    context: 'Code emplacement'
  },
  {
    id: 'stock_006',
    type: 'address_decoding',
    difficulty: 2,
    question: "Quel code correspond à : Allée D, Travée 05, Niveau 2, Position 1 ?",
    options: ['D05-02-01', 'D-05-02-01', 'D05-2-1', 'All correct'],
    correctOption: 3,
    explanation: "Tous ces formats sont couramment utilisés. Le standard est D05-02-01 mais les variantes existent.",
    category: 'Adressage',
    context: 'Codification'
  },
  {
    id: 'stock_007',
    type: 'emplacement_logic',
    difficulty: 2,
    question: "Vous devez ranger un produit à rotation rapide (vendu souvent). Où le placez-vous ?",
    options: [
      'Niveau 4 (hauteur max)',
      'Niveau 0 (sol) ou Niveau 1',
      'Fond de l\'entrepôt',
      'Zone externe'
    ],
    correctOption: 1,
    explanation: "Les produits à rotation rapide (A) sont placés en zones accessibles (niveaux bas) pour optimiser le picking.",
    category: 'Slotting',
    context: 'Optimisation emplacement'
  },
  {
    id: 'stock_008',
    type: 'emplacement_logic',
    difficulty: 3,
    question: "Un produit lourd (25kg/carton) doit être rangé :",
    options: [
      'En hauteur pour gagner de la place',
      'Au niveau des épaules ou sol pour la sécurité',
      'N\'importe où, c\'est équivalent',
      'Dans une zone externe'
    ],
    correctOption: 1,
    explanation: "Les charges lourdes sont placées entre le sol et les épaules pour éviter les blessures (sécurité ergonomique).",
    category: 'Ergonomie',
    context: 'Sécurité manutention'
  },

  // Calculs de stock
  {
    id: 'stock_009',
    type: 'stock_calculation',
    difficulty: 1,
    question: "Stock initial : 500 unités. Entrées : +200. Sorties : -350. Quel est le stock final ?",
    options: ['250', '350', '450', '650'],
    correctOption: 1,
    explanation: "Stock final = 500 + 200 - 350 = 350 unités.",
    category: 'Calcul stock',
    context: 'Équation de base'
  },
  {
    id: 'stock_010',
    type: 'stock_calculation',
    difficulty: 2,
    question: "Vous avez un stock de sécurité de 100 unités. Stock actuel : 80. Seuil de réapprovisionnement : 150. Devez-vous commander ?",
    options: [
      'Non, stock suffisant',
      'Oui, immédiatement (sous le seuil)',
      'Attendre d\'être à zéro',
      'Commander dans 1 semaine'
    ],
    correctOption: 1,
    explanation: "Le stock actuel (80) est sous le seuil de réappro (150) ET sous le stock de sécurité (100). Il faut commander d'urgence.",
    category: 'Gestion des stocks',
    context: 'Seuils de réappro'
  },
  {
    id: 'stock_011',
    type: 'stock_calculation',
    difficulty: 2,
    question: "Un rack a 5 niveaux. Chaque niveau contient 4 palettes. Combien de palettes maximum sur ce rack ?",
    options: ['15', '20', '25', '30'],
    correctOption: 1,
    explanation: "5 niveaux × 4 palettes = 20 palettes maximum.",
    category: 'Calcul',
    context: 'Capacité rack'
  },
  {
    id: 'stock_012',
    type: 'stock_calculation',
    difficulty: 3,
    question: "Taux de service = (Lignes livrées complètes / Lignes commandées) × 100. Sur 80 lignes commandées, 72 sont livrées complètes. Taux de service ?",
    options: ['80%', '85%', '90%', '95%'],
    correctOption: 2,
    explanation: "(72 / 80) × 100 = 90% de taux de service.",
    category: 'KPI',
    context: 'Taux de service'
  },

  // Inventaire
  {
    id: 'stock_013',
    type: 'inventory_method',
    difficulty: 1,
    question: "Qu'est-ce qu'un inventaire tournant (ou cyclique) ?",
    options: [
      'Un inventaire qui dure très longtemps',
      'Un inventaire réparti sur l\'année par zones',
      'Un inventaire où on compte en tournant',
      'Un inventaire automatique'
    ],
    correctOption: 1,
    explanation: "L'inventaire cyclique répartit les comptages sur toute l'année par zones, plutôt qu'un arrêt complet annuel.",
    category: 'Inventaire',
    context: 'Méthodes'
  },
  {
    id: 'stock_014',
    type: 'inventory_procedure',
    difficulty: 2,
    question: "Avant un inventaire, vous devez :",
    options: [
      'Rien de spécial',
      'Nettoyer, délimiter la zone, bloquer les mouvements',
      'Vendre tous les produits',
      'Appeler le client'
    ],
    correctOption: 1,
    explanation: "La préparation inclut : nettoyage, délimitation de la zone d'inventaire, et blocage des mouvements de stock.",
    category: 'Inventaire',
    context: 'Préparation'
  },
  {
    id: 'stock_015',
    type: 'inventory_anomaly',
    difficulty: 2,
    scenario: "Inventaire théorique : 100 unités. Inventaire réel : 95 unités.",
    question: "Quel écart constatez-vous et quel terme utilise-t-on ?",
    options: [
      'Écart positif (+5), Excédent',
      'Écart négatif (-5), Manquant',
      'Écart nul, tout va bien',
      'Écart inexplicable'
    ],
    correctOption: 1,
    explanation: "Réel (95) < Théorique (100) = Manquant de 5 unités. C'est un écart négatif.",
    category: 'Inventaire',
    context: 'Écarts'
  },
  {
    id: 'stock_016',
    type: 'inventory_anomaly',
    difficulty: 3,
    question: "Vous trouvez 5 unités en trop lors de l'inventaire. Que faites-vous ?",
    options: [
      'Vous les gardez sans rien dire',
      'Vous les jetez',
      'Vous les intégrez au stock avec enquête sur la cause',
      'Vous les donnez au personnel'
    ],
    correctOption: 2,
    explanation: "Un excédent doit être intégré mais nécessite une enquête (erreur de réception, oubli de sortie, etc.).",
    category: 'Inventaire',
    context: 'Gestion écarts'
  },

  // ABC Analysis
  {
    id: 'stock_017',
    type: 'abc_analysis',
    difficulty: 2,
    question: "En analyse ABC, la classe A représente :",
    options: [
      '20% des références = 80% de la valeur',
      '80% des références = 20% de la valeur',
      '50/50',
      'Les produits arrivant en premier'
    ],
    correctOption: 0,
    explanation: "Loi de Pareto : Classe A = ~20% des refs générant ~80% de la valeur (produits à fort contrôle).",
    category: 'Classification',
    context: 'ABC'
  },
  {
    id: 'stock_018',
    type: 'abc_analysis',
    difficulty: 2,
    question: "Un produit Classe C doit être :",
    options: [
      'Contrôlé quotidiennement',
      'Géré avec peu de contrôle (coût de gestion > valeur)',
      'En stock de sécurité élevé',
      'Stocké en hauteur'
    ],
    correctOption: 1,
    explanation: "Les produits C (80% des refs, 5% valeur) ne méritent pas un contrôle coûteux. On les gère simplement.",
    category: 'Classification',
    context: 'ABC'
  },

  // Cas pratiques
  {
    id: 'stock_019',
    type: 'scenario',
    difficulty: 3,
    scenario: `Vous avez 3 références :
- Ref X : vente quotidienne, valeur élevée
- Ref Y : vente mensuelle, valeur moyenne  
- Ref Z : vente annuelle, valeur faible`,
    question: "Comment les classer en ABC ?",
    options: ['X=A, Y=B, Z=C', 'X=C, Y=B, Z=A', 'Tous A', 'Tous C'],
    correctOption: 0,
    explanation: "X (rotation rapide, valeur élevée) = A. Y (moyenne) = B. Z (lente, faible valeur) = C.",
    category: 'Classification',
    context: 'Analyse pratique'
  },
  {
    id: 'stock_020',
    type: 'scenario',
    difficulty: 2,
    scenario: "Vous rangez des produits pharmaceutiques. Un carton a une étiquette 'DLC : 15/03/2024' et un autre 'DLC : 20/05/2024'.",
    question: "Lequel mettez-vous devant pour faciliter le picking ?",
    options: [
      'Celui de mai (date plus lointaine)',
      'Celui de mars (date plus proche)',
      'Peu importe',
      'Les deux côte à côte'
    ],
    correctOption: 1,
    explanation: "Pour FEFO/FIFO, on place les produits à DLC courte devant pour les sortir en priorité.",
    category: 'Organisation',
    context: 'Gestion dates'
  },

  // Sécurité incendie
  {
    id: 'stock_021',
    type: 'safety',
    difficulty: 1,
    question: "Quelle distance de sécurité doit être maintenue devant les issues de secours ?",
    options: ['0,5 mètre', '1 mètre', '2 mètres', '5 mètres'],
    correctOption: 1,
    explanation: "La réglementation impose de maintenir dégagée une largeur d'au moins 1 mètre devant les issues.",
    category: 'Sécurité',
    context: 'Incendie'
  },
  {
    id: 'stock_022',
    type: 'safety',
    difficulty: 2,
    question: "Les produits dangereux doivent être stockés :",
    options: [
      'Avec les produits normaux pour optimiser l\'espace',
      'Dans une zone sécurisée dédiée avec signalétique',
      'Près des issues',
      'En hauteur uniquement'
    ],
    correctOption: 1,
    explanation: "Les produits dangereux nécessitent une zone dédiée avec ventilation, extincteurs adaptés et signalétique.",
    category: 'Sécurité',
    context: 'Produits dangereux'
  },

  // CACES et manutention
  {
    id: 'stock_023',
    type: 'caces',
    difficulty: 1,
    question: "Le CACES est :",
    options: [
      'Un certificat de conduite de chariots',
      'Un logiciel de gestion',
      'Un type de rack',
      'Un contrat de travail'
    ],
    correctOption: 0,
    explanation: "CACES = Certificat d'Aptitude à la Conduite En Sécurité. Obligatoire pour conduire les chariots élévateurs.",
    category: 'Réglementation',
    context: 'CACES'
  },
  {
    id: 'stock_024',
    type: 'caces',
    difficulty: 2,
    question: "La 'charge utile' d'un chariot élévateur correspond à :",
    options: [
      'Le poids total du chariot',
      'Le poids maximum qu\'il peut soulever à charge nominale',
      'Le poids du conducteur',
      'Le poids de la batterie'
    ],
    correctOption: 1,
    explanation: "Charge utile = capacité de levage à hauteur nominale (ex: 2500kg à 3m). Attention, cette capacité diminue avec la hauteur.",
    category: 'Équipement',
    context: 'Chariots'
  },

  // Optimisation 3D
  {
    id: 'stock_025',
    type: 'optimization',
    difficulty: 3,
    question: "Pour optimiser l'occupation d'un rack de 3 niveaux :",
    options: [
      'Remplir chaque niveau complètement avant de passer au suivant',
      'Répartir les charges lourdes en bas et légères en haut',
      'Mettre tout au hasard',
      'Empiler au maximum partout'
    ],
    correctOption: 1,
    explanation: "Optimisation : charges lourdes = bas (stabilité + sécurité), légères = haut. Respect des charges admissibles par niveau.",
    category: 'Optimisation',
    context: 'Rangement rack'
  }
];

// Fonctions utilitaires
export const getStockQuestion = () => {
  const randomIndex = Math.floor(Math.random() * stockQuestions.length);
  return stockQuestions[randomIndex];
};

export const getStockQuestionsByCategory = (category) => {
  return stockQuestions.filter(q => q.category === category);
};

export const getStockQuestionsByDifficulty = (difficulty) => {
  return stockQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomStockQuestions = (count = 10) => {
  const shuffled = [...stockQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default stockQuestions;
