/**
 * Questions du bac pro « métiers de la logistique » (arrêté du 8 janvier 2025).
 * Remplace l'ancienne culture générale hors référentiel.
 */

export const cultureQuestions = [
  {
    id: 'ref_001',
    question: "Que couvre la supply chain selon le référentiel du bac pro métiers de la logistique ?",
    options: [
      'Uniquement le transport routier final',
      'Les flux de produits, d’information, de services et financiers, de la matière première au client',
      'Seulement le stockage en entrepôt',
      'La comptabilité fournisseur'
    ],
    correctOption: 1,
    explanation: "Le référentiel définit la supply chain comme l’ensemble des flux physiques, d’information, de services et financiers, de l’achat jusqu’à la livraison.",
    category: 'C1.1',
    hint: 'Pôle 1 — positionner l’activité dans la supply chain'
  },
  {
    id: 'ref_002',
    question: "Quel flux est un flux d’information, et non un flux physique ?",
    options: [
      'Le déplacement d’une palette vers le quai',
      'La transmission du bon de livraison dans le WMS',
      'Le déchargement du camion',
      'Le gerbage en palettier'
    ],
    correctOption: 1,
    explanation: "Le WMS et les documents portent le flux d’information. Le déplacement de la marchandise est un flux physique.",
    category: 'C1.1',
    hint: 'Distinguer flux physiques et flux d’information'
  },
  {
    id: 'ref_003',
    question: "À la réception, quel contrôle permet d’émettre des réserves ?",
    options: [
      'Le contrôle quantitatif et qualitatif des produits et des documents',
      'Le choix de la musique de quai',
      'La couleur des gants uniquement',
      'Le nombre de pauses de l’équipe'
    ],
    correctOption: 0,
    explanation: "C1.4 : contrôler quantité et qualité, identifier avaries ou manquants, puis émettre des réserves et ouvrir un litige si besoin.",
    category: 'C1.4',
    hint: 'Pôle 1 — traiter la réception'
  },
  {
    id: 'ref_004',
    question: "Quelle méthode de rotation sort d’abord les produits dont la date limite est la plus proche ?",
    options: ['LIFO', 'FIFO', 'FEFO', 'Au hasard'],
    correctOption: 2,
    explanation: "FEFO (First Expired, First Out) privilégie la date de péremption. C’est le critère de conservation visé pour les produits datés.",
    category: 'C1.5',
    hint: 'Mise en stock et rotation'
  },
  {
    id: 'ref_005',
    question: "Un client interne, dans le référentiel, est surtout :",
    options: [
      'Un client qui achète sur le site web',
      'Un service de l’organisation, par exemple une ligne de production à approvisionner',
      'Le transporteur externe',
      'Le service des douanes'
    ],
    correctOption: 1,
    explanation: "C2.1 distingue le client interne (ordre de fabrication, ligne de production) du client externe.",
    category: 'C2.1',
    hint: 'Pôle 2 — demande client'
  },
  {
    id: 'ref_006',
    question: "Optimiser une unité de charge, c’est principalement :",
    options: [
      'Empiler sans limite de hauteur ni de masse',
      'Constituer une palette stable qui respecte le client, le produit et le plan de palettisation',
      'Mélanger tous les lots sans étiquette',
      'Laisser le colis au sol dans l’allée'
    ],
    correctOption: 1,
    explanation: "C2.2.3 : choisir le support, garantir l’intégrité des produits et élaborer un plan de palettisation.",
    category: 'C2.2',
    hint: 'Préparation de commandes'
  },
  {
    id: 'ref_007',
    question: "Le picking désigne :",
    options: [
      'Le prélèvement des produits aux emplacements pour préparer une commande',
      'La réparation d’un chariot',
      'La facturation du transport',
      'Le tri des déchets de bureau uniquement'
    ],
    correctOption: 0,
    explanation: "Le savoir associé à C2.2 nomme le picking, le packing et le copacking dans la préparation de commandes.",
    category: 'C2.2',
    hint: 'Circuit de prélèvement'
  },
  {
    id: 'ref_008',
    question: "Contribuer à la logistique industrielle (C2.3), c’est notamment :",
    options: [
      'Approvisionner une ligne de production et tracer les mouvements de stock',
      'Choisir la publicité du produit',
      'Recruter le directeur général',
      'Fixer le prix de vente magasin'
    ],
    correctOption: 0,
    explanation: "C2.3 : approvisionner la ligne, saisir les mouvements, identifier l’impact d’un dysfonctionnement.",
    category: 'C2.3',
    hint: 'Pôle 2 — production'
  },
  {
    id: 'ref_009',
    question: "Organiser une tournée en compte propre comprend :",
    options: [
      'L’itinéraire, le véhicule, le plan de chargement et les temps de conduite et de repos',
      'Uniquement le logo sur le camion',
      'La suppression des documents de transport',
      'Le choix du fournisseur de matière première'
    ],
    correctOption: 0,
    explanation: "C2.4 : élaborer l’itinéraire, respecter la réglementation sociale, choisir le véhicule et le plan de chargement.",
    category: 'C2.4',
    hint: 'Transport en compte propre'
  },
  {
    id: 'ref_010',
    question: "Confier l’expédition à un prestataire externe exige de :",
    options: [
      'Choisir un transporteur au cahier des charges et lui transmettre documents et consignes',
      'Charger sans vérifier le véhicule',
      'Garder le contrat de transport dans un tiroir fermé',
      'Laisser le conducteur partir sans instruction'
    ],
    correctOption: 0,
    explanation: "C2.6 : adéquation du véhicule, obligations du contrat de transport, transmission au conducteur.",
    category: 'C2.6',
    hint: 'Prestataire de transport'
  },
  {
    id: 'ref_011',
    question: "Les supports de charge consignés doivent être :",
    options: [
      'Suivis, contrôlés au retour et tracés dans la base',
      'Jetés dès la livraison',
      'Mélangés aux déchets banals sans comptage',
      'Offerts au conducteur sans écriture'
    ],
    correctOption: 0,
    explanation: "C2.5 : repérer les retours de supports, mettre à jour la base et contrôler quantité et qualité.",
    category: 'C2.5',
    hint: 'Palettes et contenants consignés'
  },
  {
    id: 'ref_012',
    question: "Adapter le processus à un produit sous température dirigée, c’est :",
    options: [
      'Appliquer les contraintes de conservation à la réception, au stockage et à l’expédition',
      'Le stocker avec les produits ambiants pour gagner de la place',
      'Couper la chaîne du froid la nuit',
      'Retirer les étiquettes de température'
    ],
    correctOption: 0,
    explanation: "C3.1 : le processus change selon le produit (température dirigée, pharmaceutique, dangereux, etc.).",
    category: 'C3.1',
    hint: 'Spécificités produit'
  },
  {
    id: 'ref_013',
    question: "La traçabilité (C3.2) sert à :",
    options: [
      'Suivre le produit, le contenant et les données jusqu’au client, y compris les retours',
      'Effacer l’historique des lots',
      'Remplacer le contrôle qualité',
      'Éviter d’utiliser le WMS'
    ],
    correctOption: 0,
    explanation: "Le pôle 3 demande le suivi des flux physiques, des contenants et des données, retours compris.",
    category: 'C3.2',
    hint: 'Qualité et suivi'
  },
  {
    id: 'ref_014',
    question: "Une action RSE attendue sur un poste logistique est :",
    options: [
      'Limiter les gaspillages, notamment énergétiques, et proposer une amélioration concrète',
      'Augmenter les trajets à vide',
      'Laisser les zones de travail encombrées',
      'Jeter les emballages réutilisables'
    ],
    correctOption: 0,
    explanation: "C3.3 : analyser la situation, limiter les gaspillages, remettre la zone en état, mesurer l’impact.",
    category: 'C3.3',
    hint: 'Démarche RSE'
  },
  {
    id: 'ref_015',
    question: "Coordonner une petite équipe (C3.4) inclut :",
    options: [
      'Le passage de consignes, les imprévus, la sécurité et l’accueil des collaborateurs, y compris en situation de handicap',
      'Ignorer les remarques de l’équipe',
      'Réserver les consignes à l’oral sans fin de poste',
      'Exclure un collègue du réveil musculaire'
    ],
    correctOption: 0,
    explanation: "Le référentiel vise l’animation d’une équipe de 4 à 10 personnes, l’inclusion et le réveil musculaire.",
    category: 'C3.4',
    hint: 'Management de proximité'
  },
  {
    id: 'ref_016',
    question: "La recommandation R.489 concerne :",
    options: [
      'La conduite en sécurité des chariots de manutention automoteurs à conducteur porté',
      'Le code de la route des voitures particulières',
      'La paie des intérimaires',
      'L’étiquetage alimentaire uniquement'
    ],
    correctOption: 0,
    explanation: "Le bloc 4 et l’unité U32 s’appuient sur la R.489 (catégories 1B, 3 et 5).",
    category: 'C4.1',
    hint: 'Pôle 4 — engins'
  },
  {
    id: 'ref_017',
    question: "Avant de prendre un chariot, l’opérateur doit :",
    options: [
      'Vérifier l’adéquation à la charge, la plaque de charge, les dispositifs de sécurité et les documents',
      'Démarrer et lever la charge la plus lourde pour tester',
      'Retirer le klaxon s’il fait du bruit',
      'Ignorer les anomalies du sol'
    ],
    correctOption: 0,
    explanation: "C4.1 : adéquation, plaque de charge, contrôle visuel, test des sécurités, documents réglementaires.",
    category: 'C4.1',
    hint: 'Mise en service'
  },
  {
    id: 'ref_018',
    question: "En fin de poste, le cariste doit :",
    options: [
      'Stationner selon le protocole, fourches au sol, et signaler les anomalies',
      'Laisser le chariot en travers de l’allée, clé dessus',
      'Garder la charge levée pour le collègue suivant',
      'Oublier le compte rendu si la tournée est finie'
    ],
    correctOption: 0,
    explanation: "C4.4 : stationnement en sécurité, maintenance de premier niveau si besoin, compte rendu des anomalies.",
    category: 'C4.4',
    hint: 'Fin de poste'
  },
  {
    id: 'ref_019',
    question: "Le port des EPI sur un site logistique est :",
    options: [
      'Adapté au risque du poste (chaussures, gilet, gants, protection bruit ou tête)',
      'Facultatif si l’on connaît le site',
      'Réservé aux visiteurs',
      'Remplacé par un badge'
    ],
    correctOption: 0,
    explanation: "C1.2 : signalétique, protocole et équipements de protection individuelle selon le danger.",
    category: 'C1.2',
    hint: 'Prévention'
  },
  {
    id: 'ref_020',
    question: "Un volume de palette 1,20 m × 0,80 m × 1,50 m vaut :",
    options: ['0,96 m³', '1,44 m³', '2,40 m³', '14,4 m³'],
    correctOption: 1,
    explanation: "1,20 × 0,80 × 1,50 = 1,44 m³. Les savoirs associés demandent surface, volume et conversions (U12).",
    category: 'U12',
    hint: 'Savoir scientifique associé'
  },
  {
    id: 'ref_021',
    question: "Le WMS est utilisé dans le référentiel pour :",
    options: [
      'Gérer l’entrepôt et mettre à jour les données de réception, de stock et de préparation',
      'Dessiner uniquement le logo de l’entreprise',
      'Remplacer le contrat de travail',
      'Calculer la paie des conducteurs'
    ],
    correctOption: 0,
    explanation: "L’environnement numérique cité est le logiciel de gestion d’entrepôt (WMS), avec PDA et tableur.",
    category: 'C1.6',
    hint: 'Système d’information'
  },
  {
    id: 'ref_022',
    question: "Quelle poursuite d’études est citée après ce bac pro ?",
    options: [
      'BTS Gestion des transports et de la logistique associée',
      'CAP Cuisine uniquement',
      'Bac général scientifique obligatoire',
      'Aucun diplôme ne prolonge ce bac'
    ],
    correctOption: 0,
    explanation: "Le référentiel cite le BTS GTLA et le titre de technicien supérieur en méthodes et exploitation logistique.",
    category: 'Diplôme',
    hint: 'Perspectives'
  },
]

export const getRandomCultureQuestion = () => {
  const index = Math.floor(Math.random() * cultureQuestions.length)
  return cultureQuestions[index]
}

export const getRandomCultureQuestions = (count = 10) => {
  const shuffled = [...cultureQuestions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export const getTotalQuestionsCount = () => cultureQuestions.length

export default cultureQuestions
