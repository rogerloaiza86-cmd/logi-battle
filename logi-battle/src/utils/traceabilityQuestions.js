/**
 * Traçabilité Track - Pôle 3 - U22
 * Compétences : Suivi des produits, gestion des retours, chaîne du froid
 */

export const traceabilityQuestions = [
  // Traçabilité générale
  {
    id: 'trace_001',
    type: 'traceability_concept',
    difficulty: 1,
    question: "Qu'est-ce que la traçabilité ?",
    options: [
      'La capacité à suivre un produit à travers toute la chaîne logistique',
      'La vitesse de livraison',
      'Le stockage des marchandises',
      'Le transport international'
    ],
    correctOption: 0,
    explanation: "La traçabilité permet d'identifier et localiser un produit à chaque étape : origine, transformation, distribution.",
    category: 'Concepts',
    context: 'Définition'
  },
  {
    id: 'trace_002',
    type: 'traceability_method',
    difficulty: 1,
    question: "Quel outil est ESSENTIEL pour la traçabilité moderne ?",
    options: [
      'Le code-barres ou QR code',
      'La calculatrice',
      'La règle graduée',
      'Le téléphone fixe'
    ],
    correctOption: 0,
    explanation: "Le code-barres, QR code ou RFID permettent l'identification unique et le suivi automatisé des produits.",
    category: 'Outils',
    context: 'Technologies'
  },
  {
    id: 'trace_003',
    type: 'traceability_law',
    difficulty: 2,
    question: "En France, la traçabilité est obligatoire pour :",
    options: [
      'Tous les produits sans exception',
      'Les produits alimentaires, pharmaceutiques et dangereux',
      'Uniquement les produits importés',
      'Seulement les produits bio'
    ],
    correctOption: 1,
    explanation: "La traçabilité est légalement obligatoire pour les denrées alimentaires, médicaments, et produits dangereux.",
    category: 'Réglementation',
    context: 'Obligations légales'
  },

  // Chaîne du froid
  {
    id: 'trace_004',
    type: 'cold_chain',
    difficulty: 1,
    question: "Quelle est la plage de température pour les produits 'frais' (chambre froide positive) ?",
    options: [
      '-18°C à -25°C',
      '0°C à +4°C',
      '+8°C à +15°C',
      'Température ambiante'
    ],
    correctOption: 1,
    explanation: "Produits frais : 0°C à +4°C. Surgelés : -18°C minimum. Température ambiante : +15°C à +25°C.",
    category: 'Chaîne du froid',
    context: 'Températures'
  },
  {
    id: 'trace_005',
    type: 'cold_chain',
    difficulty: 2,
    question: "Une rupture de la chaîne du froid sur des produits frais peut entraîner :",
    options: [
      'Une amélioration du goût',
      'La prolifération de bactéries et risques sanitaires',
      'Une augmentation de la durée de conservation',
      'Aucun changement'
    ],
    correctOption: 1,
    explanation: "Une rupture de froid (+4°C → +10°C) provoque la multiplication des bactéries et peut rendre le produit dangereux.",
    category: 'Chaîne du froid',
    context: 'Risques sanitaires'
  },
  {
    id: 'trace_006',
    type: 'cold_chain',
    difficulty: 2,
    question: "Vous constatez que la température d'un camion frigorifique est passée de +2°C à +7°C pendant 2 heures.",
    options: [
      'C\'est acceptable, ne rien faire',
      'Noter l\'incident, contrôler les produits et éventuellement isoler le lot',
      'Jeter immédiatement tous les produits',
      'Baisser le thermostat et livrer normalement'
    ],
    correctOption: 1,
    explanation: "Il faut documenter la rupture, évaluer l'impact (temps, température), et décider de la conformité selon le protocole HACCP.",
    category: 'Chaîne du froid',
    context: 'Gestion incident'
  },
  {
    id: 'trace_007',
    type: 'cold_chain',
    difficulty: 3,
    question: "Quel document atteste du respect de la chaîne du froid pendant le transport ?",
    options: [
      'Le bon de livraison uniquement',
      'L\'enregistreur de température (téléthermographe)',
      'La facture',
      'Le permis de conduire'
    ],
    correctOption: 1,
    explanation: "Le téléthermographe enregistre les températures en continu. C'est la preuve traçable du respect de la chaîne du froid.",
    category: 'Chaîne du froid',
    context: 'Documentation'
  },

  // Rappels de produits
  {
    id: 'trace_008',
    type: 'product_recall',
    difficulty: 2,
    question: "Un lot de yaourts est contaminé à la production. Grâce à la traçabilité, vous pouvez :",
    options: [
      'Identifier exactement quels produits sont concernés et où ils sont',
      'Rien faire',
      'Attendre que les clients se plaignent',
      'Retirer tous les yaourts du marché'
    ],
    correctOption: 0,
    explanation: "La traçabilité permet de cibler précisément le lot concerné (numéro, dates, clients) pour un retrait sélectif et rapide.",
    category: 'Rappel produit',
    context: 'Gestion crise'
  },
  {
    id: 'trace_009',
    type: 'product_recall',
    difficulty: 3,
    question: "En cas de rappel d'un produit dangereux, quel délai maximum pour notifier la DGCCRF ?",
    options: [
      '48 heures',
      '24 heures',
      '1 semaine',
      'Aucun délai imposé'
    ],
    correctOption: 0,
    explanation: "Les professionnels doivent notifier les autorités (DGCCRF) dans les 48h en cas de produit dangereux pour la santé.",
    category: 'Rappel produit',
    context: 'Obligations légales'
  },
  {
    id: 'trace_010',
    type: 'product_recall',
    difficulty: 2,
    question: "Le 'lot number' (numéro de lot) permet de :",
    options: [
      'Connaître le prix du produit',
      'Identifier tous les produits issus d\'une même production',
      'Dater l\'achat par le client',
      'Calculer le transport'
    ],
    correctOption: 1,
    explanation: "Le numéro de lot identifie tous les produits fabriqués ensemble (mêmes matières, même jour, même ligne).",
    category: 'Rappel produit',
    context: 'Numérotation'
  },

  // DLC et DDM
  {
    id: 'trace_011',
    type: 'date_labels',
    difficulty: 1,
    question: "Que signifie DLC ?",
    options: [
      'Date Limite de Consommation',
      'Date de Livraison au Client',
      'Durée de Conservation',
      'Date Limite de Commande'
    ],
    correctOption: 0,
    explanation: "DLC = Date Limite de Consommation. Passée cette date, le produit est potentiellement dangereux à consommer.",
    category: 'Dates',
    context: 'DLC vs DDM'
  },
  {
    id: 'trace_012',
    type: 'date_labels',
    difficulty: 2,
    question: "Un produit avec DDM (Date de Durabilité Minimale) peut être consommé :",
    options: [
      'Uniquement avant la DDM',
      'Après la DDM mais peut avoir perdu des qualités (goût, texture)',
      'Jamais, c\'est dangereux',
      'Uniquement cuit'
    ],
    correctOption: 1,
    explanation: "DDM = Date de Durabilité Minimale (DLUO). Passée cette date, le produit peut être consommé mais avec qualité moindre.",
    category: 'Dates',
    context: 'DLC vs DDM'
  },
  {
    id: 'trace_013',
    type: 'date_management',
    difficulty: 2,
    question: "En entrepôt, quel système de rotation appliquez-vous pour les produits avec DLC ?",
    options: [
      'LIFO',
      'FEFO (First Expired First Out)',
      'Aléatoire',
      'Par couleur'
    ],
    correctOption: 1,
    explanation: "FEFO (First Expired First Out) : on sort d'abord les produits dont la DLC est la plus proche, pour minimiser les pertes.",
    category: 'Dates',
    context: 'Gestion stocks'
  },

  // Codes et identification
  {
    id: 'trace_014',
    type: 'barcode',
    difficulty: 1,
    question: "Qu'est-ce qu'un code-barres EAN-13 ?",
    options: [
      'Un code à 13 chiffres identifiant un produit de manière unique',
      'Un prix',
      'Une date de péremption',
      'Un poids'
    ],
    correctOption: 0,
    explanation: "L'EAN-13 est le code-barres standard européen à 13 chiffres identifiant un produit (ex: 3XX... pour la France).",
    category: 'Codes',
    context: 'EAN-13'
  },
  {
    id: 'trace_015',
    type: 'sscc',
    difficulty: 2,
    question: "Le code SSCC (Serial Shipping Container Code) sert à identifier :",
    options: [
      'Un produit individuel',
      'Une unité logistique (palette, colis)',
      'Un magasin',
      'Un camion'
    ],
    correctOption: 1,
    explanation: "Le SSCC (18 chiffres) identifie une unité logistique (palette, carton) pour son suivi dans la supply chain.",
    category: 'Codes',
    context: 'SSCC'
  },
  {
    id: 'trace_016',
    type: 'gs1',
    difficulty: 2,
    question: "GS1 est :",
    options: [
      'Un type de camion',
      'L\'organisation mondiale de standardisation des codes-barres',
      'Un logiciel de traçabilité',
      'Une norme de transport'
    ],
    correctOption: 1,
    explanation: "GS1 est l'organisation internationale qui gère les standards de codes-barres (EAN, SSCC, GLN, etc.).",
    category: 'Codes',
    context: 'GS1'
  },

  // Gestion des retours
  {
    id: 'trace_017',
    type: 'returns',
    difficulty: 2,
    question: "Un client retourne un produit. Quelle information est ESSENTIELLE à enregistrer ?",
    options: [
      'La couleur de l\'emballage',
      'Le numéro de lot et la raison du retour',
      'L\'heure exacte uniquement',
      'Le nom du livreur'
    ],
    correctOption: 1,
    explanation: "Pour la traçabilité retour, il faut : référence produit, numéro de lot, raison du retour, date, canal.",
    category: 'Retours',
    context: 'Procédure'
  },
  {
    id: 'trace_018',
    type: 'returns',
    difficulty: 3,
    question: "Un produit retourné pour défaut doit être :",
    options: [
      'Remis en vente immédiatement',
      'Isolé, identifié et analysé (quarantaine)',
      'Donné au personnel',
      'Jeté systématiquement'
    ],
    correctOption: 1,
    explanation: "Les retours défauts sont placés en quarantaine, identifiés, puis analysés pour déterminer l'action (rebut, retour fournisseur, etc.).",
    category: 'Retours',
    context: 'Quarantaine'
  },

  // Scénarios pratiques
  {
    id: 'trace_019',
    type: 'scenario',
    difficulty: 3,
    scenario: "Alerte : des clients signalent des nausées après avoir consommé un lot de fromage X. Vous êtes responsable logistique.",
    question: "Quelle est votre première action ?",
    options: [
      'Attendre d\'avoir plus d\'informations',
      'Bloquer immédiatement le stock restant du même lot et identifier toutes les destinations',
      'Continuer les livraisons normalement',
      'Appeler les médias'
    ],
    correctOption: 1,
    explanation: "En cas d'alerte sanitaire : 1) Bloquer le stock, 2) Tracer les destinations via le lot, 3) Informer le responsable qualité.",
    category: 'Crisis',
    context: 'Alerte sanitaire'
  },
  {
    id: 'trace_020',
    type: 'scenario',
    difficulty: 2,
    scenario: "Vous recevez une livraison de vaccins. Le téléthermographe indique une température de +10°C au lieu des +2°C à +8°C requis.",
    question: "Que faites-vous ?",
    options: [
      'Accepter la livraison',
      'Refuser la livraison et documenter l\'incident',
      'Remettre au froid et espérer',
      'Ne rien dire'
    ],
    correctOption: 1,
    explanation: "Les vaccins sont sensibles. Une rupture de froid les rend inefficaces voire dangereux. Refus + documentation obligatoires.",
    category: 'Crisis',
    context: 'Produits pharmaceutiques'
  },

  // HACCP
  {
    id: 'trace_021',
    type: 'haccp',
    difficulty: 2,
    question: "HACCP signifie :",
    options: [
      'Hazard Analysis Critical Control Point',
      'Harmonisation des Achats et Contrôles des Produits',
      'Hygiène et Assurance Contrôle des Procédés',
      'Haut Autorité de Contrôle des Produits'
    ],
    correctOption: 0,
    explanation: "HACCP = Hazard Analysis Critical Control Point. Méthode d'analyse des risques et points critiques pour la sécurité alimentaire.",
    category: 'HACCP',
    context: 'Définition'
  },
  {
    id: 'trace_022',
    type: 'haccp',
    difficulty: 3,
    question: "Dans la méthode HACCP, un CCP (Critical Control Point) est :",
    options: [
      'Un point où un contrôle peut éliminer ou réduire un danger',
      'Un point de vente',
      'Un centre d\'appel',
      'Un contrôle comptable'
    ],
    correctOption: 0,
    explanation: "CCP = étape où on peut prévenir, éliminer ou réduire un danger alimentaire à un niveau acceptable (ex: refroidissement rapide).",
    category: 'HACCP',
    context: 'CCP'
  },

  // Traçabilité descendante et remontante
  {
    id: 'trace_023',
    type: 'trace_direction',
    difficulty: 2,
    question: "La traçabilité 'remontante' (upstream) permet de savoir :",
    options: [
      'Où vont les produits (clients)',
      'D\'où viennent les produits (fournisseurs, origine)',
      'Le prix de vente',
      'La quantité vendue'
    ],
    correctOption: 1,
    explanation: "Traçabilité remontante (upstream) : retrouver l'origine (fournisseur, lot, date de production).",
    category: 'Concepts',
    context: 'Directions'
  },
  {
    id: 'trace_024',
    type: 'trace_direction',
    difficulty: 2,
    question: "La traçabilité 'descendante' (downstream) permet de savoir :",
    options: [
      'L\'origine des matières premières',
      'Où ont été livrés les produits (quels clients)',
      'Le coût de production',
      'Le fournisseur'
    ],
    correctOption: 1,
    explanation: "Traçabilité descendante (downstream) : suivre les produits vers l'aval (clients, points de vente, dates de livraison).",
    category: 'Concepts',
    context: 'Directions'
  },
  {
    id: 'trace_025',
    type: 'integrated',
    difficulty: 3,
    question: "Pour être complet, un système de traçabilité doit permettre :",
    options: [
      'Uniquement la traçabilité descendante',
      'Uniquement la traçabilité remontante',
      'La traçabilité dans les deux sens (du fournisseur au client et inversement)',
      'Uniquement le stockage'
    ],
    correctOption: 2,
    explanation: "Une traçabilité complète est BIDIRECTIONNELLE : on peut remonter (origine) et descendre (destination) la chaîne.",
    category: 'Concepts',
    context: 'Intégration'
  }
];

// Fonctions utilitaires
export const getTraceabilityQuestion = () => {
  const randomIndex = Math.floor(Math.random() * traceabilityQuestions.length);
  return traceabilityQuestions[randomIndex];
};

export const getTraceabilityQuestionsByCategory = (category) => {
  return traceabilityQuestions.filter(q => q.category === category);
};

export const getRandomTraceabilityQuestions = (count = 10) => {
  const shuffled = [...traceabilityQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default traceabilityQuestions;
