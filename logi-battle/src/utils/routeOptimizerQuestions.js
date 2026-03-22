/**
 * Route Optimizer Pro - Pôle 2 - U21
 * Compétences : Organisation des tournées, réglementation sociale, géographie
 */

export const routeOptimizerQuestions = [
  // Réglementation transport
  {
    id: 'route_001',
    type: 'driving_time',
    difficulty: 1,
    question: "Quelle est la durée maximale de conduite quotidienne pour un chauffeur ?",
    options: ['9 heures', '10 heures', '11 heures', '12 heures'],
    correctOption: 0,
    explanation: "Réglementation UE : 9 heures de conduite maximum par jour (peut être portée à 10h maximum 2 fois par semaine).",
    category: 'Temps de conduite',
    context: 'Réglementation'
  },
  {
    id: 'route_002',
    type: 'break_time',
    difficulty: 1,
    question: "Après 4h30 de conduite, un chauffeur doit prendre une pause de :",
    options: ['15 minutes', '30 minutes', '45 minutes', '1 heure'],
    correctOption: 2,
    explanation: "Obligation de 45 minutes de pause après 4h30 de conduite (peut être fractionnée : 15 min + 30 min).",
    category: 'Pauses',
    context: 'Réglementation'
  },
  {
    id: 'route_003',
    type: 'daily_rest',
    difficulty: 2,
    question: "Le repos quotidien normal doit être de :",
    options: ['8 heures', '9 heures', '11 heures', '12 heures'],
    correctOption: 2,
    explanation: "Repos quotidien : 11 heures consécutives minimum (peut être réduit à 9h maximum 3 fois par semaine entre deux périodes de repos hebdomadaires).",
    category: 'Repos',
    context: 'Réglementation'
  },
  {
    id: 'route_004',
    type: 'weekly_rest',
    difficulty: 2,
    question: "Le repos hebdomadaire régulier est de :",
    options: ['24 heures', '35 heures', '45 heures', '48 heures'],
    correctOption: 2,
    explanation: "Repos hebdomadaire : 45 heures consécutives minimum (peut être réduit à 24h avec compensation).",
    category: 'Repos',
    context: 'Hebdomadaire'
  },

  // Chronotachygraphe
  {
    id: 'route_005',
    type: 'tachograph',
    difficulty: 1,
    question: "Le chronotachygraphe sert à :",
    options: [
      'Calculer le prix du carburant',
      'Enregistrer les temps de conduite et de repos',
      'Mesurer la vitesse maximale',
      'Contrôler la température'
    ],
    correctOption: 1,
    explanation: "Le chronotachygraphe (carte conducteur) enregistre les temps de conduite, travail, disponibilité et repos pour contrôle réglementaire.",
    category: 'Chronotachygraphe',
    context: 'Fonction'
  },
  {
    id: 'route_006',
    type: 'tachograph_card',
    difficulty: 2,
    question: "La carte conducteur chronotachygraphe est valable :",
    options: ['1 an', '3 ans', '5 ans', '10 ans'],
    correctOption: 2,
    explanation: "La carte conducteur est valable 5 ans. Elle est personnelle et suit le conducteur d'un véhicule à l'autre.",
    category: 'Chronotachygraphe',
    context: 'Validité'
  },

  // Optimisation des tournées
  {
    id: 'route_007',
    type: 'route_optimization',
    difficulty: 2,
    question: "Quel est le principal critère d'optimisation d'une tournée de livraison ?",
    options: [
      'La distance totale parcourue',
      'Le temps total (conduite + livraison) respectant les contraintes',
      'Le nombre de pauses',
      'La couleur du camion'
    ],
    correctOption: 1,
    explanation: "Optimisation = minimiser le temps total (distance + arrêts) tout en respectant les contraintes (créneaux clients, temps de conduite max).",
    category: 'Optimisation',
    context: 'Critères'
  },
  {
    id: 'route_008',
    type: 'vehicle_loading',
    difficulty: 2,
    question: "Pour optimiser les livraisons, on charge le camion :",
    options: [
      'Au hasard',
      'Dans l\'ordre inverse des livraisons (dernière livraison = première chargée)',
      'Par couleur',
      'Par poids uniquement'
    ],
    correctOption: 1,
    explanation: "Chargement en 'LIFO' (Last In First Out) : la dernière livraison est accessible en premier, évitant de décharger pour accéder à une palette.",
    category: 'Chargement',
    context: 'Optimisation'
  },
  {
    id: 'route_009',
    type: 'delivery_windows',
    difficulty: 2,
    question: "Une livraison a un créneau horaire 14h-16h. Vous arrivez à 13h30.",
    options: [
      'Livrer immédiatement',
      'Attendre 14h pour respecter le créneau client',
      'Repartir et revenir demain',
      'Livrer à 17h'
    ],
    correctOption: 1,
    explanation: "Respecter le créneau client est essentiel en logistique. Arriver trop tôt peut perturber le client qui n'est pas prêt.",
    category: 'Créneaux',
    context: 'Service client'
  },

  // Géographie France
  {
    id: 'route_010',
    type: 'geography',
    difficulty: 1,
    question: "Quelle ville est la capitale de la région Auvergne-Rhône-Alpes ?",
    options: ['Clermont-Ferrand', 'Lyon', 'Grenoble', 'Saint-Étienne'],
    correctOption: 1,
    explanation: "Lyon est la préfecture de la région Auvergne-Rhône-Alpes (depuis 2016).",
    category: 'Géographie',
    context: 'Régions'
  },
  {
    id: 'route_011',
    type: 'geography',
    difficulty: 2,
    question: "Quel est le numéro du département de Marseille ?",
    options: ['13', '83', '84', '04'],
    correctOption: 0,
    explanation: "Marseille est dans le département 13 (Bouches-du-Rhône).",
    category: 'Géographie',
    context: 'Départements'
  },
  {
    id: 'route_012',
    type: 'geography',
    difficulty: 2,
    question: "Quel département d'outre-mer a le code 971 ?",
    options: ['La Réunion', 'Martinique', 'Guadeloupe', 'Guyane'],
    correctOption: 2,
    explanation: "971 = Guadeloupe, 972 = Martinique, 973 = Guyane, 974 = La Réunion, 976 = Mayotte.",
    category: 'Géographie',
    context: 'Outre-mer'
  },
  {
    id: 'route_013',
    type: 'geography',
    difficulty: 3,
    question: "Quelle autoroute relie Paris à Lyon ?",
    options: ['A1', 'A6', 'A7', 'A9'],
    correctOption: 1,
    explanation: "L'A6 (Autoroute du Soleil) relie Paris à Lyon. L'A7 continue vers Marseille.",
    category: 'Géographie',
    context: 'Autoroutes'
  },
  {
    id: 'route_014',
    type: 'geography',
    difficulty: 3,
    question: "Quel est le département le plus peuplé de France métropolitaine ?",
    options: ['Paris (75)', 'Bouches-du-Rhône (13)', 'Rhône (69)', 'Nord (59)'],
    correctOption: 0,
    explanation: "Paris (75) est le département le plus peuplé (> 2 millions d'habitants).",
    category: 'Géographie',
    context: 'Démographie'
  },

  // Coûts de transport
  {
    id: 'route_015',
    type: 'transport_costs',
    difficulty: 2,
    question: "Quel est le coût le plus important dans le transport routier ?",
    options: ['Carburant', 'Personnel (chauffeur)', 'Péages', 'Assurance'],
    correctOption: 1,
    explanation: "Le personnel représente ~40-50% des coûts de transport, devant le carburant (~25-30%) et les péages (~10-15%).",
    category: 'Coûts',
    context: 'Structure'
  },
  {
    id: 'route_016',
    type: 'toll',
    difficulty: 1,
    question: "Le télépéage (badge) permet de :",
    options: [
      'Ne pas payer les péages',
      'Passer sans s\'arrêter aux barrières de péage',
      'Rouler plus vite',
      'Transporter plus de marchandises'
    ],
    correctOption: 1,
    explanation: "Le télépéage permet de passer les barrières sans s'arrêter (passage à 30 km/h), facturation automatique.",
    category: 'Péages',
    context: 'Télépéage'
  },

  // Sécurité routière
  {
    id: 'route_017',
    type: 'driving_safety',
    difficulty: 1,
    question: "Quelle est la vitesse maximale pour un poids lourd sur autoroute en France ?",
    options: ['80 km/h', '90 km/h', '100 km/h', '110 km/h'],
    correctOption: 1,
    explanation: "Limitation à 90 km/h pour les poids lourds (> 3,5t) sur autoroute (sauf dérogation locale).",
    category: 'Sécurité',
    context: 'Vitesse'
  },
  {
    id: 'route_018',
    type: 'driving_safety',
    difficulty: 2,
    question: "La distance de sécurité à respecter derrière un véhicule est au moins :",
    options: [
      '2 mètres',
      '2 secondes de temps de réaction',
      '50 mètres en permanence',
      '1 longueur de camion'
    ],
    correctOption: 1,
    explanation: "Règle des 2 secondes : rester à 2 secondes du véhicule de devant (soit ~50m à 90 km/h).",
    category: 'Sécurité',
    context: 'Distance'
  },

  // Calculs de tournée
  {
    id: 'route_019',
    type: 'calculation',
    difficulty: 2,
    question: "Un trajet de 450 km sur autoroute à 90 km/h moyenne. Durée de conduite ?",
    options: ['4 heures', '5 heures', '6 heures', '7 heures'],
    correctOption: 1,
    explanation: "450 km / 90 km/h = 5 heures de conduite pure. Il faudra ajouter les pauses (45 min après 4h30).",
    category: 'Calcul',
    context: 'Temps'
  },
  {
    id: 'route_020',
    type: 'calculation',
    difficulty: 3,
    question: "Vous avez 4 livraisons : A (8h-10h), B (10h-12h), C (14h-16h), D (9h-11h). Quel ordre optimal ?",
    options: ['A-B-D-C', 'D-A-B-C', 'A-D-B-C', 'B-D-A-C'],
    correctOption: 2,
    explanation: "Ordre chronologique respectant les créneaux : A (8h-10h) → D (9h-11h mais attendre 10h si A finit à 9h30) → B (10h-12h) → C (14h-16h). A-D-B-C permet de respecter tous les créneaux.",
    category: 'Planification',
    context: 'Séquence'
  }
];

// Fonctions utilitaires
export const getRouteOptimizerQuestion = () => {
  const randomIndex = Math.floor(Math.random() * routeOptimizerQuestions.length);
  return routeOptimizerQuestions[randomIndex];
};

export const getRouteOptimizerQuestionsByCategory = (category) => {
  return routeOptimizerQuestions.filter(q => q.category === category);
};

export const getRandomRouteOptimizerQuestions = (count = 10) => {
  const shuffled = [...routeOptimizerQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default routeOptimizerQuestions;
