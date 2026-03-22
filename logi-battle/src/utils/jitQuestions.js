/**
 * Logistique Industrielle JIT - Pôle 2 - U21
 * Compétences : Approvisionnement de lignes de production, flux internes
 */

export const jitQuestions = [
  // Concepts JIT
  {
    id: 'jit_001',
    type: 'concept',
    difficulty: 1,
    question: "Que signifie JIT ?",
    options: [
      'Joint International Transport',
      'Just In Time (Juste-à-Temps)',
      'Job Integrated Tracking',
      'Just In Transit'
    ],
    correctOption: 1,
    explanation: "JIT = Just In Time (Juste-à-Temps). Les composants arrivent au moment précis où ils sont nécessaires à la production.",
    category: 'Concepts',
    context: 'Définition'
  },
  {
    id: 'jit_002',
    type: 'concept',
    difficulty: 1,
    question: "Quel est l'objectif principal du JIT ?",
    options: [
      'Avoir le plus de stock possible',
      'Éliminer les gâchis (stocks, délais, défauts)',
      'Augmenter les transports',
      'Produire le plus vite possible'
    ],
    correctOption: 1,
    explanation: "Le JIT vise à éliminer tous les gaspillages : stock, attente, transport inutile, surproduction, défauts.",
    category: 'Concepts',
    context: 'Objectifs'
  },
  {
    id: 'jit_003',
    type: 'comparison',
    difficulty: 2,
    question: "Dans un système traditionnel, on produit :",
    options: [
      'Juste ce qui est nécessaire, quand c\'est nécessaire',
      'En anticipation des besoins (stocks de sécurité)',
      'Uniquement le matin',
      'Jamais le week-end'
    ],
    correctOption: 1,
    explanation: "Traditionnel = production en masse avec stocks anticipés. JIT = production tirée par la demande réelle.",
    category: 'Comparaison',
    context: 'Traditionnel vs JIT'
  },

  // Kanban
  {
    id: 'jit_004',
    type: 'kanban',
    difficulty: 1,
    question: "Le Kanban est :",
    options: [
      'Un logiciel japonais',
      'Un système de signalisation visuelle pour déclencher des approvisionnements',
      'Un type de chariot',
      'Une méthode de comptage'
    ],
    correctOption: 1,
    explanation: "Kanban (carte visuelle) signale le besoin de réapprovisionnement. Quand le stock descend sous un seuil, la carte déclenche l'approvisionnement.",
    category: 'Kanban',
    context: 'Définition'
  },
  {
    id: 'jit_005',
    type: 'kanban_calculation',
    difficulty: 2,
    question: "Une ligne de production consomme 100 pièces/heure. Le temps d'approvisionnement est de 2h. Le conteneur contient 50 pièces. Combien de Kanbans (conteneurs) minimum sont nécessaires ?",
    options: ['2', '4', '5', '10'],
    correctOption: 1,
    explanation: "Formule : (Consommation × Délais) / Contenu conteneur = (100 × 2) / 50 = 4 Kanbans.",
    category: 'Kanban',
    context: 'Calcul'
  },
  {
    id: 'jit_006',
    type: 'kanban_rules',
    difficulty: 2,
    question: "Règle du Kanban : on ne produit que :",
    options: [
      'Quand le chef le décide',
      'Quand on reçoit un signal Kanban du poste aval',
      'Le matin à 8h',
      'Quand on a du temps libre'
    ],
    correctOption: 1,
    explanation: "Le Kanban est le 'ordre de production'. On ne produit que lorsque le poste aval demande (tiré par la demande).",
    category: 'Kanban',
    context: 'Règles'
  },

  // Kitting et approvisionnement
  {
    id: 'jit_007',
    type: 'kitting',
    difficulty: 2,
    question: "Le 'kitting' en production automobile consiste à :",
    options: [
      'Fabriquer des kits de premiers secours',
      'Préparer un ensemble de pièces nécessaires pour une opération spécifique',
      'Emballer les produits finis',
      'Nettoyer les postes de travail'
    ],
    correctOption: 1,
    explanation: "Kitting = préparation d'un kit contenant toutes les pièces nécessaires pour assembler un produit spécifique (synchronisation avec la ligne).",
    category: 'Kitting',
    context: 'Définition'
  },
  {
    id: 'jit_008',
    type: 'kitting_benefits',
    difficulty: 2,
    question: "Quel est l'avantage du kitting séquentiel (livré dans l'ordre de production) ?",
    options: [
      'Plus de stock au poste',
      'Zéro stock au poste de montage, livraison juste-à-temps',
      'Plus de manutention',
      'Plus de paperasse'
    ],
    correctOption: 1,
    explanation: "Le kitting séquentiel (SPS) livre les pièces exactement dans l'ordre des véhicules sur la ligne, éliminant le stock au poste.",
    category: 'Kitting',
    context: 'SPS'
  },

  // Flux internes
  {
    id: 'jit_009',
    type: 'flow_optimization',
    difficulty: 2,
    question: "Dans un atelier en flux tendu, les postes de travail sont disposés :",
    options: [
      'Au hasard',
      'En ligne selon l\'ordre des opérations (enchaînement logique)',
      'En cercle',
      'À l\'extérieur du bâtiment'
    ],
    correctOption: 1,
    explanation: "Disposition en ligne (line layout) selon l'ordre des opérations pour minimiser les transports et attentes.",
    category: 'Flux',
    context: 'Disposition'
  },
  {
    id: 'jit_010',
    type: 'takt_time',
    difficulty: 2,
    question: "Le 'Takt Time' est :",
    options: [
      'Le temps de repos',
      'La cadence de production nécessaire pour répondre à la demande client',
      'Le temps de transport',
      'L\'heure de déjeuner'
    ],
    correctOption: 1,
    explanation: "Takt Time = Temps disponible / Demande client. C'est le rythme auquel on doit produire pour satisfaire la demande sans surproduction.",
    category: 'Takt Time',
    context: 'Cadence'
  },
  {
    id: 'jit_011',
    type: 'takt_calculation',
    difficulty: 3,
    question: "Demande journalière : 480 unités. Temps de travail disponible : 8 heures (480 minutes). Quel est le Takt Time ?",
    options: ['0.5 minute', '1 minute', '2 minutes', '4 minutes'],
    correctOption: 1,
    explanation: "Takt Time = 480 min / 480 unités = 1 minute par unité. Il faut produire 1 unité par minute.",
    category: 'Takt Time',
    context: 'Calcul'
  },

  // Jidoka et qualité
  {
    id: 'jit_012',
    type: 'jidoka',
    difficulty: 2,
    question: "Le 'Jidoka' signifie :",
    options: [
      'Automatisation avec détection d\'anomalies',
      'Une danse japonaise',
      'Un type de robot',
      'Une marque de voiture'
    ],
    correctOption: 0,
    explanation: "Jidoka = autonomation (autonomie + automation). La machine ou l'opérateur s'arrête automatiquement en cas d'anomalie.",
    category: 'Jidoka',
    context: 'Qualité'
  },
  {
    id: 'jit_013',
    type: 'andon',
    difficulty: 2,
    question: "Un 'Andon' est :",
    options: [
      'Un type de moteur',
      'Un système de signalisation visuelle de l\'état de production (vert/jaune/rouge)',
      'Un logiciel de paie',
      'Une marque de chariot'
    ],
    correctOption: 1,
    explanation: "Andon = système de feux (vert=OK, jaune=assistance demandée, rouge=arrêt) pour visualiser l'état de la ligne en temps réel.",
    category: 'Andon',
    context: 'Visual management'
  },
  {
    id: 'jit_014',
    type: 'poka_yoke',
    difficulty: 2,
    question: "Un 'Poka-Yoke' est :",
    options: [
      'Un dispositif qui empêche les erreurs (anti-erreur)',
      'Un type de sushi',
      'Un logiciel de planification',
      'Un type de casque'
    ],
    correctOption: 0,
    explanation: "Poka-Yoke = dispositif de prévention des erreurs (ex: connecteur asymétrique qui ne peut pas être inséré à l'envers).",
    category: 'Poka-Yoke',
    context: 'Anti-erreur'
  },

  // SMED et changements
  {
    id: 'jit_015',
    type: 'smed',
    difficulty: 2,
    question: "SMED signifie :",
    options: [
      'Single Minute Exchange of Die (changement d\'outil en moins de 10 minutes)',
      'Système de Management des Entreprises Défaillantes',
      'Standard Minimum d\'Efficacité Directe',
      'Sécurité des Machines et Équipements Dangereux'
    ],
    correctOption: 0,
    explanation: "SMED = réduire les temps de changement d'outillage pour permettre des séries courtes et flexibles.",
    category: 'SMED',
    context: 'Changements rapides'
  },

  // 5S
  {
    id: 'jit_016',
    type: '5s',
    difficulty: 1,
    question: "Les 5S sont :",
    options: [
      '5 types de salariés',
      'Seiri, Seiton, Seiso, Seiketsu, Shitsuke (Ranger, Ordonner, Nettoyer, Standardiser, Respecter)',
      '5 jours de travail',
      '5 pauses par jour'
    ],
    correctOption: 1,
    explanation: "5S : Seiri (Ranger), Seiton (Ordonner), Seiso (Nettoyer), Seiketsu (Standardiser), Shitsuke (Respecter/Discipline).",
    category: '5S',
    context: 'Organisation'
  },
  {
    id: 'jit_017',
    type: '5s_seiri',
    difficulty: 2,
    question: "La première S (Seiri / Ranger) consiste à :",
    options: [
      'Ranger tout dans des tiroirs',
      'Séparer l\'utile de l\'inutile et éliminer ce qui ne sert pas',
      'Peindre les murs',
      'Mettre des étiquettes'
    ],
    correctOption: 1,
    explanation: "Seiri = trier et éliminer le superflu (outils inutilisés, pièces obsolètes) pour ne garder que l'essentiel.",
    category: '5S',
    context: 'Seiri'
  },

  // Gestion des stocks JIT
  {
    id: 'jit_018',
    type: 'stock_jit',
    difficulty: 2,
    question: "En JIT, le stock idéal est :",
    options: [
      'Maximum pour ne jamais manquer',
      'Minimum (zéro si possible)',
      'Égal à un mois de production',
      'Illimité'
    ],
    correctOption: 1,
    explanation: "JIT vise le 'zéro stock' ou stock minimum. Chaque pièce en stock est considérée comme un gaspillage (immobilisation, risque d'obsolescence).",
    category: 'Stocks',
    context: 'Zéro stock'
  },
  {
    id: 'jit_019',
    type: 'risks',
    difficulty: 3,
    question: "Quel est le principal risque du JIT ?",
    options: [
      'Trop de stock',
      'Rupture de stock si problème chez le fournisseur (pas de tampon)',
      'Trop de personnel',
      'Manque de travail'
    ],
    correctOption: 1,
    explanation: "Risque JIT : fragilité face aux aléas (grève, accident, retard fournisseur). D'où l'importance des fournisseurs fiables et proximité.",
    category: 'Risques',
    context: 'Fragilité'
  },
  {
    id: 'jit_020',
    type: 'fournisseurs',
    difficulty: 2,
    question: "En JIT, la relation avec les fournisseurs est :",
    options: [
      'Strictement commerciale (prix au plus bas)',
      'Un partenariat de long terme avec proximité géographique',
      'Inexistante',
      'Conflictuelle'
    ],
    correctOption: 1,
    explanation: "JIT nécessite des fournisseurs partenaires, fiables, proches géographiquement pour des livraisons fréquentes et rapides.",
    category: 'Fournisseurs',
    context: 'Partenariat'
  }
];

// Fonctions utilitaires
export const getJitQuestion = () => {
  const randomIndex = Math.floor(Math.random() * jitQuestions.length);
  return jitQuestions[randomIndex];
};

export const getJitQuestionsByCategory = (category) => {
  return jitQuestions.filter(q => q.category === category);
};

export const getRandomJitQuestions = (count = 10) => {
  const shuffled = [...jitQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default jitQuestions;
