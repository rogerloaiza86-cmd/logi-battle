/**
 * Supply Chain Puzzle - Pôle 1 - U31
 * Compétences : Positionner les activités dans la supply chain, identifier les flux
 */

export const supplyChainActors = [
  {
    id: 'fournisseur',
    name: 'Fournisseur',
    icon: '🏭',
    description: 'Produit ou fournit les marchandises',
    position: 'amont'
  },
  {
    id: 'transporteur',
    name: 'Transporteur',
    icon: '🚛',
    description: 'Assure le transport des marchandises',
    position: 'intermediaire'
  },
  {
    id: 'prestataire_3pl',
    name: 'Prestataire 3PL',
    icon: '📦',
    description: 'Third Party Logistics - gère la logistique externe',
    position: 'intermediaire'
  },
  {
    id: 'grossiste',
    name: 'Grossiste',
    icon: '🏪',
    description: 'Achete en gros et revend aux distributeurs',
    position: 'intermediaire'
  },
  {
    id: 'distributeur',
    name: 'Distributeur',
    icon: '🚚',
    description: 'Distribue les produits aux points de vente',
    position: 'intermediaire'
  },
  {
    id: 'entrepot',
    name: 'Entrepôt / DC',
    icon: '🏭',
    description: 'Distribution Center - stocke et prépare les commandes',
    position: 'intermediaire'
  },
  {
    id: 'client_final',
    name: 'Client Final',
    icon: '👤',
    description: 'Consommateur ou utilisateur final du produit',
    position: 'aval'
  },
  {
    id: 'fournisseur_premier',
    name: 'Fournisseur Premier',
    icon: '🔧',
    description: 'Fournit les matières premières ou composants',
    position: 'amont'
  },
  {
    id: 'sous_traitant',
    name: 'Sous-traitant',
    icon: '🔩',
    description: 'Réalise des opérations pour le compte d\'un autre',
    position: 'intermediaire'
  },
  {
    id: 'transitaire',
    name: 'Transitaire',
    icon: '📋',
    description: 'Organise les opérations de transport international',
    position: 'intermediaire'
  }
];

export const supplyChainFluxTypes = [
  {
    id: 'flux_physique',
    name: 'Flux Physique',
    icon: '📦',
    description: 'Mouvement réel des marchandises (produits, matières)',
    color: 'blue',
    examples: ['Expédition de colis', 'Livraison de marchandises', 'Transport de matières premières']
  },
  {
    id: 'flux_info',
    name: 'Flux d\'Information',
    icon: '📧',
    description: 'Échange de données et documents (commandes, factures)',
    color: 'green',
    examples: ['Bon de commande', 'Confirmation de livraison', 'Facture électronique']
  },
  {
    id: 'flux_financier',
    name: 'Flux Financier',
    icon: '💰',
    description: 'Mouvements de paiement et transactions',
    color: 'amber',
    examples: ['Paiement fournisseur', 'Remboursement', 'Lettre de crédit']
  },
  {
    id: 'flux_documentaire',
    name: 'Flux Documentaire',
    icon: '📄',
    description: 'Documents accompagnant les marchandises',
    color: 'purple',
    examples: ['CMR', 'Connaissement', 'Lettre de voiture', 'Certificat d\'origine']
  }
];

export const supplyChainQuestions = [
  // Questions sur les acteurs
  {
    id: 'sc_001',
    type: 'actor_identification',
    difficulty: 1,
    question: "Qui est responsable du 'dernier kilomètre' dans la supply chain ?",
    options: ['Le fournisseur', 'Le transporteur', 'Le distributeur', 'Le grossiste'],
    correctOption: 1,
    explanation: "Le transporteur assure généralement le dernier kilomètre, c'est-à-dire la livraison finale au client.",
    category: 'Acteurs',
    context: 'Livraison e-commerce'
  },
  {
    id: 'sc_002',
    type: 'actor_identification',
    difficulty: 1,
    question: "Quel acteur stocke les marchandises et prépare les commandes pour les expédier ?",
    options: ['Le transitaire', 'L\'entrepôt / DC', 'Le fournisseur', 'Le client'],
    correctOption: 1,
    explanation: "L'entrepôt ou Distribution Center (DC) gère le stockage et la préparation des commandes.",
    category: 'Acteurs',
    context: 'Gestion de stock'
  },
  {
    id: 'sc_003',
    type: 'actor_identification',
    difficulty: 2,
    question: "Quel acteur gère la logistique à l'extérieur pour le compte d'une entreprise ?",
    options: ['Le sous-traitant', 'Le prestataire 3PL', 'Le transporteur', 'Le grossiste'],
    correctOption: 1,
    explanation: "Le 3PL (Third Party Logistics) est un prestataire externe qui gère tout ou partie de la logistique.",
    category: 'Acteurs',
    context: 'Externalisation'
  },
  {
    id: 'sc_004',
    type: 'actor_identification',
    difficulty: 2,
    question: "Qui organise les opérations de transport international et gère les documents douaniers ?",
    options: ['Le transporteur routier', 'Le transitaire', 'Le fournisseur', 'Le distributeur'],
    correctOption: 1,
    explanation: "Le transitaire est un spécialiste du transport international qui gère les formalités douanières.",
    category: 'Acteurs',
    context: 'Transport international'
  },
  {
    id: 'sc_005',
    type: 'actor_identification',
    difficulty: 1,
    question: "Quel acteur achète en grande quantité et revend aux détaillants ?",
    options: ['Le client final', 'Le grossiste', 'Le sous-traitant', 'Le fournisseur premier'],
    correctOption: 1,
    explanation: "Le grossiste achète en gros aux fabricants et revend aux distributeurs ou détaillants.",
    category: 'Acteurs',
    context: 'Distribution'
  },
  {
    id: 'sc_006',
    type: 'sequence',
    difficulty: 2,
    question: "Dans l'ordre chronologique, quel acteur vient APRES le fabricant ?",
    options: ['Fournisseur premier', 'Grossiste', 'Client final', 'Fournisseur'],
    correctOption: 1,
    explanation: "Le flux typique est : Fournisseur → Fabricant → Grossiste → Distributeur → Client final.",
    category: 'Séquence',
    context: 'Flux logistique'
  },
  
  // Questions sur les flux
  {
    id: 'sc_007',
    type: 'flux_identification',
    difficulty: 1,
    question: "Quel flux correspond à l'envoi d'un bon de commande ?",
    options: ['Flux Physique', 'Flux d\'Information', 'Flux Financier', 'Flux Documentaire'],
    correctOption: 1,
    explanation: "Le bon de commande est un document d'information échangé entre l'acheteur et le vendeur.",
    category: 'Flux',
    context: 'Commande'
  },
  {
    id: 'sc_008',
    type: 'flux_identification',
    difficulty: 1,
    question: "Le paiement d'une facture fournisseur correspond à quel type de flux ?",
    options: ['Flux Physique', 'Flux d\'Information', 'Flux Financier', 'Flux Documentaire'],
    correctOption: 2,
    explanation: "Le paiement est un mouvement financier, donc un flux financier.",
    category: 'Flux',
    context: 'Paiement'
  },
  {
    id: 'sc_009',
    type: 'flux_identification',
    difficulty: 1,
    question: "Le transport effectif d'une palette de marchandises représente :",
    options: ['Flux Physique', 'Flux d\'Information', 'Flux Financier', 'Flux Documentaire'],
    correctOption: 0,
    explanation: "Le déplacement réel des marchandises est le flux physique.",
    category: 'Flux',
    context: 'Transport'
  },
  {
    id: 'sc_010',
    type: 'flux_identification',
    difficulty: 2,
    question: "Le document CMR (transport routier international) fait partie de :",
    options: ['Flux Physique', 'Flux d\'Information', 'Flux Financier', 'Flux Documentaire'],
    correctOption: 3,
    explanation: "Le CMR est un document de transport international, donc un flux documentaire.",
    category: 'Flux',
    context: 'Documents de transport'
  },
  {
    id: 'sc_011',
    type: 'flux_identification',
    difficulty: 2,
    question: "Un email de confirmation d'expédition avec numéro de suivi est un :",
    options: ['Flux Physique', 'Flux d\'Information', 'Flux Financier', 'Flux Documentaire'],
    correctOption: 1,
    explanation: "C'est un échange d'information sur l'état de la livraison.",
    category: 'Flux',
    context: 'Suivi'
  },
  {
    id: 'sc_012',
    type: 'flux_multiple',
    difficulty: 3,
    question: "Lors d'une livraison, quels flux sont présents simultanément ?",
    options: [
      'Uniquement flux physique',
      'Flux physique + Flux documentaire',
      'Flux physique + Flux documentaire + Flux financier',
      'Tous les flux'
    ],
    correctOption: 1,
    explanation: "Une livraison implique le mouvement physique des marchandises et les documents associés (bon de livraison, etc.).",
    category: 'Flux',
    context: 'Livraison complète'
  },

  // Questions sur la chaîne logistique complète
  {
    id: 'sc_013',
    type: 'chain_complete',
    difficulty: 2,
    question: "Dans une supply chain classique, quel est l'ordre correct ?",
    options: [
      'Client → Distributeur → Grossiste → Fabricant → Fournisseur',
      'Fournisseur → Fabricant → Grossiste → Distributeur → Client',
      'Fournisseur → Grossiste → Fabricant → Distributeur → Client',
      'Fabricant → Fournisseur → Grossiste → Distributeur → Client'
    ],
    correctOption: 1,
    explanation: "Le flux logistique va de l'amont (fournisseur) vers l'aval (client final).",
    category: 'Chaîne complète',
    context: 'Organisation'
  },
  {
    id: 'sc_014',
    type: 'actor_role',
    difficulty: 2,
    question: "Quel acteur est situé en 'amont' de la supply chain ?",
    options: ['Le client final', 'Le distributeur', 'Le fournisseur', 'Le transporteur'],
    correctOption: 2,
    explanation: "L'amont désigne les étapes précédentes dans la chaîne, donc les fournisseurs et producteurs.",
    category: 'Concepts',
    context: 'Amont/Aval'
  },
  {
    id: 'sc_015',
    type: 'actor_role',
    difficulty: 2,
    question: "Quel acteur est situé en 'aval' de la supply chain ?",
    options: ['Le fournisseur premier', 'Le fabricant', 'Le client final', 'Le transitaire'],
    correctOption: 2,
    explanation: "L'aval désigne la fin de la chaîne logistique, donc le client final.",
    category: 'Concepts',
    context: 'Amont/Aval'
  },
  {
    id: 'sc_016',
    type: 'scenario',
    difficulty: 3,
    question: "Un produit casse chez le client. Qui est le premier contact pour le retour ?",
    options: ['Le fabricant', 'Le distributeur qui a vendu', 'Le transporteur', 'Le fournisseur'],
    correctOption: 1,
    explanation: "Le client contacte d'abord le distributeur/vendeur qui gère la relation client (SAV).",
    category: 'Scénario',
    context: 'Retour client'
  },
  {
    id: 'sc_017',
    type: 'scenario',
    difficulty: 3,
    question: "Dans l'e-commerce, qui gère généralement le stock et l'expédition ?",
    options: ['Uniquement le site web', 'Un entrepôt logistique (du site ou 3PL)', 'Le client lui-même', 'Les transporteurs uniquement'],
    correctOption: 1,
    explanation: "L'e-commerce utilise des entrepôts (propres ou 3PL) pour stocker et expédier les commandes.",
    category: 'Scénario',
    context: 'E-commerce'
  },
  {
    id: 'sc_018',
    type: 'matching',
    difficulty: 2,
    question: "Associez : Le connaissement maritime → ?",
    options: ['Flux physique', 'Flux financier', 'Flux documentaire', 'Flux d\'information'],
    correctOption: 2,
    explanation: "Le connaissement (Bill of Lading) est le document essentiel du transport maritime.",
    category: 'Documents',
    context: 'Maritime'
  },
  {
    id: 'sc_019',
    type: 'matching',
    difficulty: 2,
    question: "Associez : La livraison à domicile → ?",
    options: ['Flux physique', 'Flux financier', 'Flux documentaire', 'Flux d\'information'],
    correctOption: 0,
    explanation: "La livraison est le déplacement physique de la marchandise.",
    category: 'Flux',
    context: 'Livraison'
  },
  {
    id: 'sc_020',
    type: 'actor_identification',
    difficulty: 3,
    question: "Quel acteur intervient entre le fabricant et le distributeur dans une supply longue ?",
    options: ['Le client final uniquement', 'Le grossiste', 'Le transitaire uniquement', 'Le fournisseur premier'],
    correctOption: 1,
    explanation: "Le grossiste fait le lien entre le fabricant et les distributeurs/détaillants.",
    category: 'Acteurs',
    context: 'Intermédiaires'
  },
  {
    id: 'sc_021',
    type: 'flow_direction',
    difficulty: 3,
    question: "Dans une supply chain, les flux d'information circulent :",
    options: [
      'Uniquement de l\'amont vers l\'aval',
      'Uniquement de l\'aval vers l\'amont',
      'Dans les deux sens (bidirectionnel)',
      'Uniquement entre acteurs adjacents'
    ],
    correctOption: 2,
    explanation: "Les informations circulent dans les deux sens : commandes (aval→amont) et confirmations (amont→aval).",
    category: 'Flux',
    context: 'Circulation'
  },
  {
    id: 'sc_022',
    type: 'scenario',
    difficulty: 2,
    question: "Un importateur français achète des produits en Chine. Qui gère le transport maritime ?",
    options: ['Uniquement le vendeur chinois', 'Uniquement l\'importateur', 'Le transitaire', 'Le client final'],
    correctOption: 2,
    explanation: "Le transitaire organise et coordonne le transport international complexe.",
    category: 'Scénario',
    context: 'Importation'
  },
  {
    id: 'sc_023',
    type: 'concept',
    difficulty: 3,
    question: "La 'supply chain' représente :",
    options: [
      'Uniquement le transport des marchandises',
      'L\'ensemble des flux et acteurs depuis la matière première jusqu\'au client final',
      'Uniquement le stockage en entrepôt',
      'La chaîne de production uniquement'
    ],
    correctOption: 1,
    explanation: "La supply chain englobe tous les flux (physiques, info, financiers) et tous les acteurs de la chaîne de valeur.",
    category: 'Concepts',
    context: 'Définition'
  },
  {
    id: 'sc_024',
    type: 'actor_role',
    difficulty: 2,
    question: "Le 'consommateur final' est aussi appelé :",
    options: ['Fournisseur', 'Client final', 'Distributeur', 'Grossiste'],
    correctOption: 1,
    explanation: "Le client final ou consommateur final est la dernière étape de la chaîne logistique.",
    category: 'Acteurs',
    context: 'Terminologie'
  },
  {
    id: 'sc_025',
    type: 'flux_identification',
    difficulty: 3,
    question: "La confirmation de paiement par virement est un :",
    options: ['Flux physique', 'Flux d\'information', 'Flux financier ET flux d\'information', 'Flux documentaire uniquement'],
    correctOption: 2,
    explanation: "La confirmation de paiement implique à la fois le transfert d'argent (financier) et la notification (information).",
    category: 'Flux',
    context: 'Paiement'
  }
];

// Fonctions utilitaires
export const getSupplyChainQuestion = () => {
  const randomIndex = Math.floor(Math.random() * supplyChainQuestions.length);
  return supplyChainQuestions[randomIndex];
};

export const getSupplyChainQuestionsByCategory = (category) => {
  return supplyChainQuestions.filter(q => q.category === category);
};

export const getSupplyChainQuestionsByDifficulty = (difficulty) => {
  return supplyChainQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomSupplyChainQuestions = (count = 10) => {
  const shuffled = [...supplyChainQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default supplyChainQuestions;
