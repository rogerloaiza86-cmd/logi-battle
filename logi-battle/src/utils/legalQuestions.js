/**
 * Doc & Légal - U11 - Économie-Droit
 * Compétences : Contrats de transport, responsabilités légales, documents commerciaux
 */

export const legalQuestions = [
  // Documents de transport
  {
    id: 'legal_001',
    type: 'document_cmr',
    difficulty: 1,
    question: "Le CMR est :",
    options: [
      'Convention sur le Marché Routier',
      'Convention relative au contrat de transport international de marchandises par route',
      'Certificat de Mise en Route',
      'Contrat de Maintenance Routière'
    ],
    correctOption: 1,
    explanation: "CMR = Convention relative au contrat de transport international de marchandises par route (1956).",
    category: 'Documents',
    context: 'CMR'
  },
  {
    id: 'legal_002',
    type: 'document_cmr_usage',
    difficulty: 2,
    question: "Le document CMR est obligatoire pour :",
    options: [
      'Tous les transports',
      'Les transports internationaux par route entre pays signataires de la convention',
      'Uniquement les transports en France',
      'Les transports de personnes'
    ],
    correctOption: 1,
    explanation: "Le CMR s'applique aux transports internationaux par route entre pays signataires (plus de 50 pays dont l'UE).",
    category: 'Documents',
    context: 'CMR'
  },
  {
    id: 'legal_003',
    type: 'document_connaissement',
    difficulty: 2,
    question: "Le connaissement maritime (Bill of Lading) est :",
    options: [
      'Un simple reçu',
      'Un titre de transport, reçu et preuve de contrat',
      'Une facture',
      'Un passeport'
    ],
    correctOption: 1,
    explanation: "Le connaissement fait 3 choses : titre exécutoire, reçu de marchandises, preuve du contrat de transport maritime.",
    category: 'Documents',
    context: 'Maritime'
  },
  {
    id: 'legal_004',
    type: 'document_air',
    difficulty: 2,
    question: "Le document de transport aérien s'appelle :",
    options: ['CMR', 'LTA (Lettre de Transport Aérien)', 'Connaissement', 'Bordereau'],
    correctOption: 1,
    explanation: "LTA = Lettre de Transport Aérien (Air Waybill). C'est le document de transport pour le fret aérien.",
    category: 'Documents',
    context: 'Aérien'
  },
  {
    id: 'legal_005',
    type: 'document_lettre_voiture',
    difficulty: 1,
    question: "La lettre de voiture est :",
    options: [
      'Un document pour le transport ferroviaire',
      'Un titre de transport routier national',
      'Un permis de conduire',
      'Une carte grise'
    ],
    correctOption: 1,
    explanation: "La lettre de voiture est le document de transport pour les transports routiers nationaux (distinct du CMR international).",
    category: 'Documents',
    context: 'Routier national'
  },

  // Responsabilités et litiges
  {
    id: 'legal_006',
    type: 'liability_cmr',
    difficulty: 2,
    question: "En CMR, le transporteur est responsable de la marchandise :",
    options: [
      'Uniquement pendant le chargement',
      'Du moment de la prise en charge jusqu\'à la livraison',
      'Uniquement sur autoroute',
      'Jamais'
    ],
    correctOption: 1,
    explanation: "Responsabilité du transporteur du 'pris en charge' jusqu'à la 'livraison' (en CMR et en droit national).",
    category: 'Responsabilité',
    context: 'Période'
  },
  {
    id: 'legal_007',
    type: 'liability_exoneration',
    difficulty: 3,
    question: "Le transporteur peut être exonéré de responsabilité en cas de :",
    options: [
      'Faute du client (emballage défectueux)',
      'Retard de livraison',
      'Erreur de livraison',
      'Vol par le chauffeur'
    ],
    correctOption: 0,
    explanation: "Cas de force majeure, faute du client (emballage insuffisant), vice propre de la marchandise peuvent exonérer le transporteur.",
    category: 'Responsabilité',
    context: 'Exonération'
  },
  {
    id: 'legal_008',
    type: 'litige_avarie',
    difficulty: 2,
    question: "En cas d'avarie lors du transport, qui doit prouver la responsabilité ?",
    options: [
      'Le client (expéditeur)',
      'Le transporteur doit prouver qu\'il n\'est pas responsable',
      'La police',
      'Personne'
    ],
    correctOption: 1,
    explanation: "Responsabilité objective : le transporteur doit prouver son innocence (cas de force majeure, faute du client, etc.).",
    category: 'Litiges',
    context: 'Charge de la preuve'
  },
  {
    id: 'legal_009',
    type: 'litige_reserves',
    difficulty: 2,
    question: "Les réserves doivent être émises :",
    options: [
      'Dans les 24 heures pour les avaries apparentes',
      'Immédiatement ou au moment de la livraison pour les avaries apparentes',
      'Dans un mois',
      'Jamais'
    ],
    correctOption: 1,
    explanation: "Réserves pour avaries apparentes : immédiatement ou au plus tard au moment de la livraison. Avaries cachées : 7 jours après réception.",
    category: 'Litiges',
    context: 'Délais'
  },

  // Indemnisations
  {
    id: 'legal_010',
    type: 'compensation_cmr',
    difficulty: 2,
    question: "En CMR, l'indemnisation maximale est de :",
    options: [
      '8,33 DTS par kilo brut manquant/avarié',
      '100% de la valeur réelle',
      '1000€ maximum',
      'Pas de limite'
    ],
    correctOption: 0,
    explanation: "CMR : plafond de 8,33 DTS (Droits de Tirage Spéciaux) par kilogramme brut manquant ou avarié (environ 10€/kg).",
    category: 'Indemnisation',
    context: 'Plafond CMR'
  },
  {
    id: 'legal_011',
    type: 'insurance',
    difficulty: 2,
    question: "Pour couvrir la valeur totale d'une marchandise, il faut :",
    options: [
      'Rien faire, le transporteur couvre tout',
      'Souscrire une assurance \'tous risques\' spécifique',
      'Emballer mieux',
      'Payer plus cher le transport'
    ],
    correctOption: 1,
    explanation: "Au-delà du plafond CMR, il faut souscrire une assurance complémentaire ou déclarer une valeur spéciale avec supplément de prix.",
    category: 'Assurance',
    context: 'Couverture'
  },

  // Incoterms
  {
    id: 'legal_012',
    type: 'incoterm_exw',
    difficulty: 1,
    question: "En EXW (Ex Works), qui paie le transport principal ?",
    options: ['Le vendeur', "L'acheteur", 'Le transporteur', 'Les deux moitié-moitié'],
    correctOption: 1,
    explanation: "EXW = l'acheteur prend en charge tout à partir de l'usine du vendeur (transport principal, risques, douane).",
    category: 'Incoterms',
    context: 'EXW'
  },
  {
    id: 'legal_013',
    type: 'incoterm_ddp',
    difficulty: 2,
    question: "En DDP (Delivered Duty Paid), qui paie les droits de douane ?",
    options: ['Le vendeur', "L'acheteur", 'Le transitaire', 'Personne'],
    correctOption: 0,
    explanation: "DDP = Delivered Duty Paid. Le vendeur paie tout jusqu'à destination, y compris les droits de douane d'importation.",
    category: 'Incoterms',
    context: 'DDP'
  },
  {
    id: 'legal_014',
    type: 'incoterm_fob',
    difficulty: 2,
    question: "En FOB (Free On Board), le transfert de risque a lieu :",
    options: [
      "À l'usine",
      'Quand la marchandise passe le bastingage du navire (chargement)',
      "À l'arrivée au port",
      'À la frontière'
    ],
    correctOption: 1,
    explanation: "FOB : transfert de risque et coûts quand la marchandise passe le bastingage du navire au port d'embarquement.",
    category: 'Incoterms',
    context: 'FOB'
  },

  // Commerce électronique et données
  {
    id: 'legal_015',
    type: 'rgpd',
    difficulty: 2,
    question: "Le RGPD concerne :",
    options: [
      'La gestion des déchets',
      'La protection des données personnelles',
      'Les routes publiques',
      'Les marchés financiers'
    ],
    correctOption: 1,
    explanation: "RGPD = Règlement Général sur la Protection des Données. Règlement européen sur la vie privée et données personnelles.",
    category: 'RGPD',
    context: 'Données'
  },
  {
    id: 'legal_016',
    type: 'ecommerce',
    difficulty: 2,
    question: "Dans le e-commerce, quel délai de rétractation pour le consommateur ?",
    options: ['7 jours', '14 jours', '30 jours', 'Pas de rétractation'],
    correctOption: 1,
    explanation: "Droit de rétractation de 14 jours pour les achats à distance (internet, téléphone, démarchage).",
    category: 'E-commerce',
    context: 'Rétractation'
  },

  // Contrats commerciaux
  {
    id: 'legal_017',
    type: 'contract',
    difficulty: 1,
    question: "Un contrat de transport doit comporter :",
    options: [
      'Uniquement le prix',
      'Les parties, l\'objet, le prix, la durée/conditions',
      'Uniquement le nom du chauffeur',
      'Rien, un contrat oral suffit toujours'
    ],
    correctOption: 1,
    explanation: "Éléments essentiels : parties (identification), objet (marchandises, trajet), prix, conditions (délai, responsabilité).",
    category: 'Contrats',
    context: 'Éléments'
  },
  {
    id: 'legal_018',
    type: 'cgv',
    difficulty: 2,
    question: "Les CGV (Conditions Générales de Vente) :",
    options: [
      'Sont facultatives',
      'Doivent être communiquées au client avant la commande',
      'Sont secrètes',
      'N\'existent que pour le e-commerce'
    ],
    correctOption: 1,
    explanation: "Les CGV doivent être communiquées avant la commande pour être opposables (mention des prix, conditions de livraison, responsabilité).",
    category: 'CGV',
    context: 'Opposabilité'
  },

  // Douanes
  {
    id: 'legal_019',
    type: 'customs',
    difficulty: 2,
    question: "L'exportateur doit fournir pour le douane :",
    options: [
      'Uniquement sa carte d\'identité',
      'La facture commerciale, le document de transport, éventuellement certificat d\'origine',
      'Un chèque en blanc',
      'Rien, c\'est automatique'
    ],
    correctOption: 1,
    explanation: "Documents douaniers : facture commerciale, document de transport (CMR, connaissement), certificat d'origine si nécessaire.",
    category: 'Douanes',
    context: 'Documents'
  },
  {
    id: 'legal_020',
    type: 'eori',
    difficulty: 2,
    question: "Le numéro EORI sert à :",
    options: [
      'Identifier les entreprises auprès des douanes',
      'Payer moins de taxes',
      'Accéder aux zones piétonnes',
      'Obtenir des réductions de péage'
    ],
    correctOption: 0,
    explanation: "EORI = Economic Operators Registration and Identification. Numéro obligatoire pour les entreprises qui import/export dans l'UE.",
    category: 'Douanes',
    context: 'EORI'
  }
];

// Fonctions utilitaires
export const getLegalQuestion = () => {
  const randomIndex = Math.floor(Math.random() * legalQuestions.length);
  return legalQuestions[randomIndex];
};

export const getLegalQuestionsByCategory = (category) => {
  return legalQuestions.filter(q => q.category === category);
};

export const getRandomLegalQuestions = (count = 10) => {
  const shuffled = [...legalQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default legalQuestions;
