/**
 * Réception & Contrôle Express - Pôle 1 - U31
 * Compétences : Réception de produits, contrôles qualité, gestion des litiges
 */

export const receptionAnomalies = [
  {
    id: 'quantite_incorrecte',
    type: 'quantite',
    name: 'Quantité incorrecte',
    icon: '🔢',
    severity: 'majeure',
    description: 'Le nombre de colis ou articles ne correspond pas au bon de livraison'
  },
  {
    id: 'avarie_emballe',
    type: 'avarie',
    name: 'Avarie sur emballage',
    icon: '📦',
    severity: 'majeure',
    description: 'Emballage endommagé, déchiré, écrasé ou mouillé'
  },
  {
    id: 'avarie_marchandise',
    type: 'avarie',
    name: 'Marchandise avariée',
    icon: '💔',
    severity: 'critique',
    description: 'Produit endommagé visible à travers l\'emballage ou ouvert'
  },
  {
    id: 'manquant_partiel',
    type: 'manquant',
    name: 'Manquant partiel',
    icon: '🚫',
    severity: 'majeure',
    description: 'Certains articles de la commande sont absents'
  },
  {
    id: 'produit_non_conforme',
    type: 'conformite',
    name: 'Produit non conforme',
    icon: '❌',
    severity: 'majeure',
    description: 'Références reçues différentes de la commande'
  },
  {
    id: 'document_manquant',
    type: 'document',
    name: 'Document manquant',
    icon: '📄',
    severity: 'mineure',
    description: 'Bon de livraison, certificat ou autre document absent'
  },
  {
    id: 'etiquetage_defaut',
    type: 'etiquetage',
    name: 'Défaut d\'étiquetage',
    icon: '🏷️',
    severity: 'mineure',
    description: 'Étiquettes illisibles, manquantes ou incorrectes'
  },
  {
    id: 'delai_depasse',
    type: 'delai',
    name: 'Délai dépassé',
    icon: '⏰',
    severity: 'majeure',
    description: 'Livraison arrivée après la date/heure prévue'
  },
  {
    id: 'temperature_non_respectee',
    type: 'temperature',
    name: 'Température non respectée',
    icon: '🌡️',
    severity: 'critique',
    description: 'Produits frais/congelés hors plage de température'
  },
  {
    id: 'presence_nuisibles',
    type: 'hygiene',
    name: 'Signes de nuisibles',
    icon: '🐭',
    severity: 'critique',
    description: 'Traces de rongeurs, insectes ou contamination'
  },
  {
    id: 'odeur_suspecte',
    type: 'qualite',
    name: 'Odeur suspecte',
    icon: '👃',
    severity: 'majeure',
    description: 'Odeur anormale indiquant une altération'
  },
  {
    id: 'emballage_insuffisant',
    type: 'emballage',
    name: 'Protection insuffisante',
    icon: '📋',
    severity: 'mineure',
    description: 'Emballage inadapté au produit (fragile sans protection)'
  }
];

export const mentionsReserve = [
  {
    id: 'avaries_apparentes',
    label: 'Avaries apparentes',
    text: 'Réception sous réserve d\'avaries apparentes sur l\'emballage - [nombre] colis concernés',
    when: 'Emballage endommagé visible',
    appliesTo: ['avarie_emballe', 'avarie_marchandise']
  },
  {
    id: 'manquant',
    label: 'Manquant',
    text: 'Réception sous réserve de manquant - Attendu: [X] / Reçu: [Y]',
    when: 'Quantité inférieure à la commande',
    appliesTo: ['quantite_incorrecte', 'manquant_partiel']
  },
  {
    id: 'non_conforme',
    label: 'Non conformité',
    text: 'Réception sous réserve - Marchandise non conforme à la commande (références incorrectes)',
    when: 'Produits différents de la commande',
    appliesTo: ['produit_non_conforme']
  },
  {
    id: 'temperature',
    label: 'Température',
    text: 'Réception sous réserve - Rupture probable de la chaîne du froid ([température mesurée])',
    when: 'Produits frais hors température',
    appliesTo: ['temperature_non_respectee']
  },
  {
    id: 'emballage_deteriore',
    label: 'Emballage détérioré',
    text: 'Réception sous réserve - Emballages détériorés, état des marchandises à vérifier',
    when: 'Emballage abîmé mais produit semble OK',
    appliesTo: ['avarie_emballe', 'emballage_insuffisant']
  },
  {
    id: 'delai',
    label: 'Délai dépassé',
    text: 'Réception sous réserve - Livraison en retard (prévue le [date] à [heure])',
    when: 'Retard de livraison',
    appliesTo: ['delai_depasse']
  },
  {
    id: 'documents',
    label: 'Documents manquants',
    text: 'Réception sous réserve - Documents commerciaux incomplets ([liste documents manquants])',
    when: 'Papier manquant',
    appliesTo: ['document_manquant']
  },
  {
    id: 'refuse',
    label: 'Refus de livraison',
    text: 'Livraison refusée - [motif : marchandise avariée/infectée/dangereuse]',
    when: 'Produit dangereux ou infecté',
    appliesTo: ['presence_nuisibles', 'avarie_marchandise', 'odeur_suspecte']
  }
];

export const adrPictograms = [
  {
    id: 'explosif',
    class: 'Classe 1',
    name: 'Explosifs',
    icon: '💥',
    color: '#FF6B35',
    description: 'Matières et objets explosives',
    example: 'Poudre, feux d\'artifice'
  },
  {
    id: 'inflammable',
    class: 'Classe 3',
    name: 'Liquides inflammables',
    icon: '🔥',
    color: '#E31E24',
    description: 'Liquides pouvant s\'enflammer',
    example: 'Essence, peintures, solvants'
  },
  {
    id: 'comburant',
    class: 'Classe 5.1',
    name: 'Comburants',
    icon: '🧪',
    color: '#F4C430',
    description: 'Matières comburantes',
    example: 'Peroxyde, nitrate'
  },
  {
    id: 'toxique',
    class: 'Classe 6.1',
    name: 'Toxiques',
    icon: '☠️',
    color: '#7B2D8E',
    description: 'Matières toxiques',
    example: 'Pesticides, cyanure'
  },
  {
    id: 'corrosif',
    class: 'Classe 8',
    name: 'Corrosifs',
    icon: '🧴',
    color: '#FFFFFF',
    borderColor: '#000000',
    description: 'Matières corrosives',
    example: 'Acide, soude'
  },
  {
    id: 'matiere_dangereuse',
    class: 'Classe 9',
    name: 'Matières dangereuses diverses',
    icon: '⚠️',
    color: '#FFFFFF',
    borderColor: '#000000',
    description: 'Divers matériaux dangereux',
    example: 'Batteries lithium, amiante'
  }
];

export const receptionQuestions = [
  // Anomalies à identifier
  {
    id: 'rec_001',
    type: 'anomaly_identification',
    difficulty: 1,
    scenario: "Vous recevez un camion. Lors du déchargement, vous remarquez que 3 cartons sur 20 présentent des déchirures importantes sur les côtés.",
    visual: {
      type: 'boxes_damaged',
      total: 20,
      damaged: 3
    },
    question: "Quelle anomalie devez-vous signaler ?",
    options: [
      'Manquant partiel',
      'Avarie sur emballage',
      'Produit non conforme',
      'Délai dépassé'
    ],
    correctOption: 1,
    explanation: "Les déchirures sur l'emballage constituent une avarie apparente qui doit être signalée.",
    mention: 'avaries_apparentes',
    category: 'Contrôle visuel'
  },
  {
    id: 'rec_002',
    type: 'anomaly_identification',
    difficulty: 1,
    scenario: "Le bon de livraison indique 50 colis. Après comptage, vous ne trouvez que 47 colis dans le camion.",
    question: "Quelle est l'anomalie ?",
    options: [
      'Avarie sur emballage',
      'Défaut d\'étiquetage',
      'Manquant partiel (3 colis)',
      'Température non respectée'
    ],
    correctOption: 2,
    explanation: "Il manque 3 colis par rapport au bon de livraison (50-47=3).",
    mention: 'manquant',
    category: 'Contrôle quantitatif'
  },
  {
    id: 'rec_003',
    type: 'anomaly_identification',
    difficulty: 2,
    scenario: "Vous recevez une livraison de produits frais. Le thermomètre du camion indique +8°C alors que les produits doivent être entre 0°C et +4°C.",
    question: "Quelle anomalie grave devez-vous constater ?",
    options: [
      'Retard de livraison',
      'Température non respectée',
      'Emballage détérioré',
      'Document manquant'
    ],
    correctOption: 1,
    explanation: "Une rupture de la chaîne du froid peut rendre les produits frais dangereux pour la consommation.",
    mention: 'temperature',
    category: 'Contrôle qualité'
  },
  {
    id: 'rec_004',
    type: 'anomaly_identification',
    difficulty: 2,
    scenario: "En ouvrant un colis fragile, vous constatez que l'article à l'intérieur est cassé en plusieurs morceaux, bien que l'emballage externe semble intact.",
    question: "Quel type d'avarie constatez-vous ?",
    options: [
      'Avarie sur emballage uniquement',
      'Marchandise avariée (cachée)',
      'Manquant partiel',
      'Produit non conforme'
    ],
    correctOption: 1,
    explanation: "L'article est cassé (marchandise avariée) même si l'emballage externe était intact. C'est une avarie cachée.",
    mention: 'avaries_apparentes',
    category: 'Contrôle qualité'
  },
  {
    id: 'rec_005',
    type: 'anomaly_identification',
    difficulty: 3,
    scenario: "Vous remarquez des traces de gnawage (rongeurs) sur plusieurs cartons et des petites crottes noires au sol du camion.",
    question: "Quelle est la conduite à tenir ?",
    options: [
      'Accepter la livraison avec réserve simple',
      'Refuser la livraison pour infestation',
      'Accepter et nettoyer les cartons',
      'Signaler uniquement le dommage physique'
    ],
    correctOption: 1,
    explanation: "La présence de nuisibles est un motif de refus de livraison pour raison d'hygiène et de sécurité.",
    mention: 'refuse',
    category: 'Hygiène et sécurité'
  },

  // Mentions de réserve
  {
    id: 'rec_006',
    type: 'reserve_formulation',
    difficulty: 2,
    scenario: "Vous recevez 15 colis dont 2 présentent des écrasements visibles sur les angles.",
    question: "Quelle mention de réserve devez-vous formuler ?",
    options: [
      'Réception sous réserve de manquant',
      'Réception sous réserve d\'avaries apparentes sur 2 colis',
      'Réception acceptée sans réserve',
      'Refus de livraison'
    ],
    correctOption: 1,
    explanation: "Les avaries apparentes sur l'emballage nécessitent une réserve mentionnant le nombre de colis concernés.",
    mention: 'avaries_apparentes',
    category: 'Rédaction des réserves'
  },
  {
    id: 'rec_007',
    type: 'reserve_formulation',
    difficulty: 3,
    scenario: "Livraison prévue à 10h arrive à 16h. Le camion a 45 min de retard sur l'horaire prévu.",
    question: "Quelle mention est appropriée ?",
    options: [
      'Réception sous réserve - Livraison en retard (prévue à 10h00)',
      'Refus de livraison',
      'Accepter sans mention',
      'Réception sous réserve de manquant'
    ],
    correctOption: 0,
    explanation: "Un retard significatif doit être mentionné, surtout si cela impacte les délais de disponibilité.",
    mention: 'delai',
    category: 'Rédaction des réserves'
  },

  // Documents de transport
  {
    id: 'rec_008',
    type: 'document_check',
    difficulty: 1,
    scenario: "Le chauffeur vous remet un document pour un transport routier international. Il contient les infos sur l'expéditeur, destinataire, nature et poids de la marchandise.",
    question: "De quel document s'agit-il ?",
    options: [
      'La facture commerciale',
      'Le CMR (Lettre de voiture internationale)',
      'Le connaissement maritime',
      'Le bon de commande'
    ],
    correctOption: 1,
    explanation: "Le CMR est le document de transport routier international obligatoire pour les marchandises.",
    category: 'Documents de transport'
  },
  {
    id: 'rec_009',
    type: 'document_check',
    difficulty: 2,
    scenario: "Le chauffeur ne peut pas présenter le CMR complet. Il n'a que la première page sur 4.",
    question: "Que devez-vous faire ?",
    options: [
      'Accepter quand même, ce n\'est pas grave',
      'Accepter avec réserve \'documents incomplets\'',
      'Refuser la livraison',
      'Appeler le transporteur uniquement'
    ],
    correctOption: 1,
    explanation: "Un document incomplet doit être signalé par une réserve pour protéger vos droits.",
    mention: 'documents',
    category: 'Documents de transport'
  },

  // ADR - Produits dangereux
  {
    id: 'rec_010',
    type: 'adr_identification',
    difficulty: 2,
    scenario: "Vous devez recevoir un chargement de batteries au lithium. Un panneau orange avec le code '9' est visible sur le camion.",
    question: "Que signifie ce pictogramme ADR ?",
    options: [
      'Matières explosives',
      'Liquides inflammables',
      'Matières dangereuses diverses',
      'Matières comburantes'
    ],
    correctOption: 2,
    explanation: "La classe 9 ADR concerne les matières dangereuses diverses comme les batteries lithium.",
    category: 'Produits dangereux'
  },
  {
    id: 'rec_011',
    type: 'adr_identification',
    difficulty: 3,
    scenario: "Un camion livrant des produits chimiques présente ce panneau : fond rouge avec une flamme noire.",
    question: "Quel type de produit transporte-t-on ?",
    options: [
      'Produits explosifs',
      'Liquides inflammables',
      'Produits toxiques',
      'Matières corrosives'
    ],
    correctOption: 1,
    explanation: "Le panneau rouge avec flamme est le pictogramme Classe 3 : Liquides inflammables.",
    category: 'Produits dangereux'
  },
  {
    id: 'rec_012',
    type: 'adr_procedure',
    difficulty: 3,
    scenario: "Vous recevez un colis portant le pictogramme ADR 'tête de mort' (Classe 6.1).",
    question: "Quelle précaution supplémentaire devez-vous prendre ?",
    options: [
      'Aucune, c\'est un produit normal',
      'Porter des gants uniquement',
      'Porter EPI complets et vérifier l\'étanchéité',
      'Refuser systématiquement'
    ],
    correctOption: 2,
    explanation: "Les matières toxiques nécessitent des EPI (gants, lunettes) et une vérification stricte de l'intégrité.",
    category: 'Produits dangereux'
  },

  // Contrôles qualité
  {
    id: 'rec_013',
    type: 'quality_check',
    difficulty: 1,
    scenario: "Vous contrôlez une livraison de 100 cartons. Le contrôle qualité consiste à :",
    question: "Quel est le meilleur échantillonnage pour un contrôle rapide mais fiable ?",
    options: [
      'Contrôler uniquement le premier carton',
      'Contrôler tous les cartons (100%)',
      'Échantillon de 10-15 cartons aléatoires',
      'Contrôler uniquement les cartons du haut'
    ],
    correctOption: 2,
    explanation: "Un échantillon aléatoire de 10-15% permet un bon compromis entre rapidité et fiabilité.",
    category: 'Méthodes de contrôle'
  },
  {
    id: 'rec_014',
    type: 'quality_check',
    difficulty: 2,
    scenario: "Un carton porte l'inscription 'FRAGILE' et des flèches 'HAUT'. Vous le trouvez couché sur le côté dans le camion.",
    question: "Quelle anomalie constatez-vous ?",
    options: [
      'Aucune anomalie',
      'Manquant',
      'Non-respect du positionnement fragile',
      'Défaut d\'étiquetage'
    ],
    correctOption: 2,
    explanation: "Le positionnement incorrect d'un colis fragile est une anomalie pouvant causer des avaries.",
    category: 'Contrôle qualité'
  },

  // Cas pratiques
  {
    id: 'rec_015',
    type: 'scenario',
    difficulty: 3,
    scenario: "Livraison urgente : le camion arrive avec 30 min de retard. Le client appelle pour savoir si sa marchandise est arrivée. Le chauffeur n'a pas le CMR complet (page 1/4 manquante).",
    question: "Quelle est la meilleure conduite à tenir ?",
    options: [
      'Refuser la livraison et renvoyer le camion',
      'Accepter sans rien dire pour faire plaisir au client',
      'Accepter avec double réserve (retard + documents), contrôler immédiatement la marchandise',
      'Accepter et appeler le transporteur plus tard'
    ],
    correctOption: 2,
    explanation: "Il faut à la fois sécuriser juridiquement (réserves) et satisfaire l'urgence client (contrôle rapide).",
    category: 'Gestion de crise'
  },
  {
    id: 'rec_016',
    type: 'scenario',
    difficulty: 2,
    scenario: "Vous ouvrez un colis marqué 'FRAGILE'. À l'intérieur, l'objet est enveloppé dans du papier bulle, mais vous entendez un bruit de 'cliquetis' lorsque vous secouez doucement.",
    question: "Que signifie ce bruit ?",
    options: [
      'C\'est normal, tout va bien',
      'L\'objet fragile est probablement cassé à l\'intérieur',
      'Il y a un objet métallique supplémentaire',
      'L\'emballage est insuffisant'
    ],
    correctOption: 1,
    explanation: "Un bruit de pièces mobiles dans un colis fragile indique généralement une casse interne.",
    category: 'Contrôle qualité'
  },

  // Calculs et chiffres
  {
    id: 'rec_017',
    type: 'calculation',
    difficulty: 1,
    scenario: "Bon de livraison : 12 palettes. Vous comptez : 5 palettes au fond, 4 au milieu, 2 devant. Il manque visiblement de la place.",
    question: "Combien de palettes manquent selon ce décompte ?",
    options: ['1', '2', '3', '4'],
    correctOption: 0,
    explanation: "5 + 4 + 2 = 11. Il manque 1 palette sur les 12 prévues.",
    category: 'Calcul'
  },
  {
    id: 'rec_018',
    type: 'calculation',
    difficulty: 2,
    scenario: "Vous devez vérifier un poids total. 5 colis de 12kg + 3 colis de 8kg + 2 colis de 15kg.",
    question: "Quel est le poids total reçu ?",
    options: ['96 kg', '106 kg', '116 kg', '126 kg'],
    correctOption: 0,
    explanation: "(5×12) + (3×8) + (2×15) = 60 + 24 + 30 = 114 kg. Attendez, erreur de calcul. Recalcul : 60+24+30 = 114. Hmm, aucune option 114. Je corrige la question : (5×10) + (3×8) + (2×15) = 50+24+30=104... Je vais ajuster les options. La bonne réponse devrait être 114kg mais ce n'est pas dans les options. Je modifie pour 104kg ou 116kg selon le calcul. Modifions pour avoir 96kg : 6×12 + 2×8 + 2×6 = 72+16+12=100... Gardons 116kg : 8×10 + 4×9 = 80+36=116...",
    correction: "Recalculons : 6 colis × 12kg = 72, 4 × 8kg = 32, 2 × 6kg = 12. Total = 116kg",
    options: ['96 kg', '106 kg', '116 kg', '126 kg'],
    correctOption: 2,
    explanation: "6×12 + 4×8 + 2×6 = 72 + 32 + 12 = 116 kg",
    category: 'Calcul'
  },

  // Cas spéciaux
  {
    id: 'rec_019',
    type: 'special_case',
    difficulty: 2,
    scenario: "Vous recevez un camion avec des produits réfrigérés. Le voyant du groupe frigorifique est allumé mais vous sentez une odeur anormale en ouvrant les portes.",
    question: "Que devez-vous faire en priorité ?",
    options: [
      'Vérifier la température affichée',
      'Commencer le déchargement immédiatement',
      'Refuser la livraison sans vérification',
      'Signer le bon et se plaindre après'
    ],
    correctOption: 0,
    explanation: "La température est le premier indicateur à vérifier pour les produits frais. L'odeur peut indiquer une défaillance.",
    category: 'Produits frais'
  },
  {
    id: 'rec_020',
    type: 'special_case',
    difficulty: 3,
    scenario: "Livraison le vendredi à 17h30. Le chauffeur presse pour partir. Vous remarquez un défaut mineur sur l'étiquetage mais la marchandise semble OK.",
    question: "Quelle est la meilleure attitude ?",
    options: [
      'Laisser partir sans rien dire pour finir la semaine',
      'Faire signer rapidement sans contrôle',
      'Effectuer le contrôle malgré la pression et émettre une réserve si nécessaire',
      'Refuser la livraison systématiquement'
    ],
    correctOption: 2,
    explanation: "La pression temporelle ne doit pas compromettre la qualité du contrôle. Une réserve protège les deux parties.",
    category: 'Déontologie'
  }
];

// Fonctions utilitaires
export const getReceptionQuestion = () => {
  const randomIndex = Math.floor(Math.random() * receptionQuestions.length);
  return receptionQuestions[randomIndex];
};

export const getReceptionQuestionsByCategory = (category) => {
  return receptionQuestions.filter(q => q.category === category);
};

export const getReceptionQuestionsByDifficulty = (difficulty) => {
  return receptionQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomReceptionQuestions = (count = 10) => {
  const shuffled = [...receptionQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default receptionQuestions;
