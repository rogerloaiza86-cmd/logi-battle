/**
 * Team Leader Simulator - Pôle 3 - U22
 * Compétences : Coordination d'équipe, gestion des imprévus, management
 */

export const teamLeaderQuestions = [
  // Management d'équipe
  {
    id: 'leader_001',
    type: 'team_management',
    difficulty: 2,
    scenario: "Votre équipe de 5 personnes doit préparer 200 commandes aujourd'hui. À 14h, vous réalisez que vous n'en avez fait que 100.",
    question: "Quelle est votre première action ?",
    options: [
      'Crier sur l\'équipe pour qu\'elle aille plus vite',
      'Analyser les causes du retard et réorganiser le travail',
      'Demander à tout le monde de faire des heures supplémentaires forcées',
      'Ignorer le problème'
    ],
    correctOption: 1,
    explanation: "Un bon leader analyse d'abord (causes du retard : manque de personnel, problème technique, mauvaise organisation ?) puis agit avec discernement.",
    category: 'Management',
    context: 'Gestion crise'
  },
  {
    id: 'leader_002',
    type: 'prioritization',
    difficulty: 2,
    scenario: "Vous avez 3 tâches urgentes simultanément : un client VIP insatisfait, une panne de chariot, et un retard de livraison.",
    question: "Comment priorisez-vous ?",
    options: [
      'Résoudre tout seul en parallèle',
      'Déléguer la panne, gérer le client VIP, suivre la livraison',
      'Ignorer le client et faire réparer le chariot',
      'Attendre que tout se résolve seul'
    ],
    correctOption: 1,
    explanation: "Délégation efficace : affecter la panne à un technicien, gérer personnellement le client VIP (relation), superviser la livraison.",
    category: 'Priorisation',
    context: 'Multitâche'
  },
  {
    id: 'leader_003',
    type: 'communication',
    difficulty: 1,
    question: "Dans une consigne, qu'est-ce qui est le plus important ?",
    options: [
      'Être le plus long possible',
      'Clarté, précision et vérification de la compréhension',
      'Parler très vite',
      'Utiliser un vocabulaire technique complexe'
    ],
    correctOption: 1,
    explanation: "Une bonne communication = message clair + vérification que l'autre a bien compris (feedback).",
    category: 'Communication',
    context: 'Instructions'
  },
  {
    id: 'leader_004',
    type: 'conflict_resolution',
    difficulty: 3,
    scenario: "Deux opérateurs se disputent violemment à cause d'une erreur de picking.",
    question: "Comment gérez-vous ce conflit ?",
    options: [
      'Prendre parti pour le plus ancien',
      'Séparer les deux, écouter chacun calmement, trouver une solution objective',
      'Les licencier immédiatement',
      'Ignorer et laisser continuer'
    ],
    correctOption: 1,
    explanation: "Gestion de conflit : apaiser la situation, écoute active, recherche de solution objective (pas de favoritisme).",
    category: 'Conflit',
    context: 'Médiation'
  },

  // Gestion des imprévus
  {
    id: 'leader_005',
    type: 'crisis_management',
    difficulty: 3,
    scenario: "Un incendie se déclare dans une zone de stockage. Vous êtes chef d'équipe.",
    question: "Quelle est la bonne séquence d'actions ?",
    options: [
      'Évacuer, alerter, secourir',
      'Prendre une photo pour Instagram',
      'Continuer à travailler',
      'Appeler un ami'
    ],
    correctOption: 0,
    explanation: "Conduite à tenir en cas d'incendie : 1) Évacuer (vous et les autres), 2) Alerter (déclencheur, 18/112), 3) Secourir (si possible sans danger).",
    category: 'Crise',
    context: 'Incendie'
  },
  {
    id: 'leader_006',
    type: 'crisis_management',
    difficulty: 2,
    scenario: "3 personnes de votre équipe de 5 sont absentes (maladie) alors que la charge de travail est importante.",
    question: "Comment réagissez-vous ?",
    options: [
      'Abandonner la mission',
      'Réorganiser les tâches, prioriser l\'essentiel, demander du renfort si possible',
      'Obliger les absents à venir travailler malades',
      'Faire tout vous-même'
    ],
    correctOption: 1,
    explanation: "Sous-effectif : prioriser les tâches critiques, réorganiser les postes, demander du renfort, motiver l'équipe restante.",
    category: 'Crise',
    context: 'Sous-effectif'
  },
  {
    id: 'leader_007',
    type: 'urgency_management',
    difficulty: 2,
    scenario: "Un client important arrive sans prévenir pour récupérer une commande urgente.",
    question: "Que faites-vous ?",
    options: [
      'Lui dire de repasser demain',
      'Vérifier immédiatement l\'état de sa commande et le tenir informé',
      'L\'ignorer',
      'Lui donner n\'importe quelle commande'
    ],
    correctOption: 1,
    explanation: "Client VIP imprévu : accueil professionnel, vérification rapide de la commande, communication transparente sur les délais.",
    category: 'Urgence',
    context: 'Client VIP'
  },

  // Handicap et inclusion
  {
    id: 'leader_008',
    type: 'handicap_inclusion',
    difficulty: 2,
    question: "Un collaborateur en situation de handicap rejoint votre équipe. Vous devez :",
    options: [
      'Le traiter différemment des autres avec condescendance',
      'Adapter le poste si nécessaire et l\'intégrer normalement dans l\'équipe',
      'Refuser de l\'intégrer',
      'Lui donner des tâches subalternes uniquement'
    ],
    correctOption: 1,
    explanation: "L'obligation d'adaptation : modifier le poste de travail si nécessaire (aménagement raisonnable) et intégrer la personne dans l'équipe.",
    category: 'Inclusion',
    context: 'Handicap'
  },
  {
    id: 'leader_009',
    type: 'adaptation',
    difficulty: 3,
    scenario: "Un opérateur ne peut plus soulever de charges lourdes à cause d'un problème de dos (avec certificat médical).",
    question: "Quelle est votre conduite ?",
    options: [
      'Le licencier',
      'Adapter son poste (tâches sans charges lourdes, poste de contrôle, informatique)',
      'L\'obliger à soulever quand même',
      'Le mettre à la porte'
    ],
    correctOption: 1,
    explanation: "L'employeur doit aménager le poste (adaptation, réaffectation) avant d'envisager une rupture du contrat.",
    category: 'Inclusion',
    context: 'Aménagement poste'
  },

  // Motivation et management
  {
    id: 'leader_010',
    type: 'motivation',
    difficulty: 2,
    question: "Quelle méthode est la plus efficace pour motiver une équipe sur le long terme ?",
    options: [
      'La peur des sanctions',
      'Reconnaissance, implication et développement des compétences',
      'L\'argent uniquement',
      'Ignorer l\'équipe'
    ],
    correctOption: 1,
    explanation: "La motivation durable vient de : reconnaissance du travail bien fait, implication dans les décisions, possibilité d'évolution.",
    category: 'Motivation',
    context: 'Management'
  },
  {
    id: 'leader_011',
    type: 'feedback',
    difficulty: 2,
    question: "Vous devez faire un retour (feedback) à un opérateur qui fait des erreurs.",
    options: [
      'Le critiquer devant tout le monde',
      'En privé, expliquer l\'erreur, écouter ses explications, trouver des solutions ensemble',
      'Ne rien dire pour ne pas le vexer',
      'Le punir immédiatement'
    ],
    correctOption: 1,
    explanation: "Feedback constructif : en privé, factuel, écoute active, recherche de solutions (formation, procédure mal comprise ?).",
    category: 'Feedback',
    context: 'Correction'
  },
  {
    id: 'leader_012',
    type: 'delegation',
    difficulty: 2,
    question: "La délégation consiste à :",
    options: [
      'Abandonner ses responsabilités',
      'Confier une tâche avec l\'autorité nécessaire et suivre',
      'Donner des ordres sans explication',
      'Faire tout seul'
    ],
    correctOption: 1,
    explanation: "Délégation = confier une mission avec : objectifs clairs, moyens, autorité nécessaire, et points de contrôle.",
    category: 'Délégation',
    context: 'Management'
  },

  // Organisation du travail
  {
    id: 'leader_013',
    type: 'work_organization',
    difficulty: 1,
    question: "Une réunion de briefing matinal doit être :",
    options: [
      'Très longue et détaillée',
      'Courte (10-15 min), précise et participative',
      'Annulée si possible',
      'Uniquement avec les cadres'
    ],
    correctOption: 1,
    explanation: "Briefing efficace : court, objectifs du jour, informations essentielles, écoute des équipes, sécurité.",
    category: 'Organisation',
    context: 'Briefing'
  },
  {
    id: 'leader_014',
    type: 'planning',
    difficulty: 2,
    question: "Pour planifier le travail d'une semaine, vous devez tenir compte de :",
    options: [
      'Uniquement votre humeur',
      'Objectifs, ressources disponibles, priorités, imprévus possibles',
      'Rien, tout se fait au jour le jour',
      'Les soldes uniquement'
    ],
    correctOption: 1,
    explanation: "Bonne planification = anticiper les objectifs, évaluer les ressources (personnel, matériel), gérer les priorités, prévoir des marges pour imprévus.",
    category: 'Planification',
    context: 'Weekly'
  },
  {
    id: 'leader_015',
    type: 'quality_management',
    difficulty: 2,
    scenario: "Vous constatez que votre équipe sacrifie la qualité pour aller plus vite.",
    question: "Que faites-vous ?",
    options: [
      'Vous fermez les yeux tant que c\'est rapide',
      'Rappeler l\'importance qualité, identifier les causes de la lenteur, ajuster les processus',
      'Punir toute l\'équipe',
      'Baisser les standards de qualité'
    ],
    correctOption: 1,
    explanation: "Qualité vs Délai : expliquer l'impact des erreurs (coût retour, client), optimiser les process pour gagner du temps sans sacrifier la qualité.",
    category: 'Qualité',
    context: 'Conformité'
  },

  // Prise de décision
  {
    id: 'leader_016',
    type: 'decision',
    difficulty: 3,
    scenario: "Vous devez choisir entre : livraison rapide mais coûteuse (satisfaction client immédiate) vs livraison standard mais économique (risque de mécontentement).",
    question: "Quel critère doit primer ?",
    options: [
      'Le coût uniquement',
      'La satisfaction client et la réputation à long terme',
      'La rapidité systématique',
      'Le hasard'
    ],
    correctOption: 1,
    explanation: "Décision équilibrée : pour un client stratégique/fidèle, privilégier la satisfaction. Pour un client ponctuel, expliquer les options. Vision long terme.",
    category: 'Décision',
    context: 'Dilemme'
  },
  {
    id: 'leader_017',
    type: 'decision',
    difficulty: 2,
    question: "Vous avez fait une erreur de planification qui impacte l'équipe.",
    options: [
      'Cacher votre erreur',
      'Reconnaître l\'erreur, proposer des solutions, ajuster',
      'Blâmer un subordonné',
      'Ignorer la situation'
    ],
    correctOption: 1,
    explanation: "Un bon leader assume ses erreurs, les communique avec transparence, et propose des solutions pour rectifier le tir.",
    category: 'Décision',
    context: 'Responsabilité'
  },

  // Éthique et valeurs
  {
    id: 'leader_018',
    type: 'ethics',
    difficulty: 2,
    question: "Un client propose un 'dessous de table' pour traiter sa commande en priorité. Que faites-vous ?",
    options: [
      'Accepter discrètement',
      'Refuser poliment mais fermement et appliquer la politique de priorité équitable',
      'Demander plus d\'argent',
      'Ne rien dire'
    ],
    correctOption: 1,
    explanation: "Intégrité : refuser la corruption, appliquer les règles de manière équitable pour tous les clients.",
    category: 'Éthique',
    context: 'Intégrité'
  },
  {
    id: 'leader_019',
    type: 'leadership_style',
    difficulty: 2,
    question: "Le leadership 'participatif' signifie :",
    options: [
      'Ne rien décider seul',
      'Impliquer l\'équipe dans les décisions tout en gardant la responsabilité finale',
      'Laisser faire n\'importe comment',
      'Diriger par la force'
    ],
    correctOption: 1,
    explanation: "Leadership participatif : consultation de l'équipe, prise en compte des avis, mais décision finale et responsabilité assumée par le leader.",
    category: 'Leadership',
    context: 'Styles'
  },
  {
    id: 'leader_020',
    type: 'example',
    difficulty: 1,
    question: "Un leader doit montrer l'exemple en :",
    options: [
      'Arrivant toujours en retard',
      'Respectant les règles de sécurité et les valeurs de l\'entreprise',
      'Critiquant la direction',
      'Travaillant moins que l\'équipe'
    ],
    correctOption: 1,
    explanation: "Exemplarité : le leader doit incarner les valeurs (sécurité, ponctualité, qualité) pour être crédible aux yeux de son équipe.",
    category: 'Exemplarité',
    context: 'Rôle modèle'
  }
];

// Fonctions utilitaires
export const getTeamLeaderQuestion = () => {
  const randomIndex = Math.floor(Math.random() * teamLeaderQuestions.length);
  return teamLeaderQuestions[randomIndex];
};

export const getTeamLeaderQuestionsByCategory = (category) => {
  return teamLeaderQuestions.filter(q => q.category === category);
};

export const getRandomTeamLeaderQuestions = (count = 10) => {
  const shuffled = [...teamLeaderQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default teamLeaderQuestions;
