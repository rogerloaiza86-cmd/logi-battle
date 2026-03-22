/**
 * Green Logistique Challenge - Pôle 3 - U22
 * Compétences : RSE, économie circulaire, limitation des gaspillages
 */

export const wasteCategories = [
  { code: 'DIB', name: 'Déchets Industriels Banals', examples: ['Emballages', 'Carton', 'Plastique non souillé'] },
  { code: 'DIS', name: 'Déchets Industriels Spéciaux', examples: ['Produits chimiques', 'Batteries', 'Huiles usagées'] },
  { code: 'DAC', name: 'Déchets d\'Activité de Soins', examples: ['Masques', 'Gants médicaux', 'Seringues'] },
  { code: 'DMA', name: 'Déchets Ménagers et Assimilés', examples: ['Repas', 'Papiers souillés'] }
];

export const greenLogisticsQuestions = [
  // Concepts RSE et développement durable
  {
    id: 'green_001',
    type: 'rse_concept',
    difficulty: 1,
    question: "Que signifie RSE ?",
    options: [
      'Réglementation des Systèmes d\'Entreprise',
      'Responsabilité Sociétale des Entreprises',
      'Réseau de Service Express',
      'Réduction des Salaires Environnementaux'
    ],
    correctOption: 1,
    explanation: "RSE = Responsabilité Sociétale des Entreprises. Approche volontaire de l'impact social et environnemental.",
    category: 'RSE',
    context: 'Définitions'
  },
  {
    id: 'green_002',
    type: 'eco_concept',
    difficulty: 1,
    question: "Qu'est-ce que l'économie circulaire ?",
    options: [
      'Une économie qui fonctionne 24h/24',
      'Un modèle où les déchets deviennent des ressources (réutiliser, recycler)',
      'Un système financier',
      'Une forme de transport'
    ],
    correctOption: 1,
    explanation: "L'économie circulaire vise à réduire le gaspillage en réutilisant, réparant, recyclant les matériaux en fin de vie.",
    category: 'Économie circulaire',
    context: 'Concepts'
  },
  {
    id: 'green_003',
    type: 'sustainable_logistics',
    difficulty: 2,
    question: "La logistique durable cherche à réduire :",
    options: [
      'Uniquement les coûts',
      'L\'impact environnemental tout en maintenant la performance',
      'Le nombre de salariés',
      'La vitesse de livraison'
    ],
    correctOption: 1,
    explanation: "Logistique durable (Green Logistics) = concilier performance économique et réduction de l'impact environnemental.",
    category: 'Logistique verte',
    context: 'Objectifs'
  },

  // Gestion des déchets
  {
    id: 'green_004',
    type: 'waste_sorting',
    difficulty: 1,
    question: "Une palette en bois cassée est un déchet de type :",
    options: ['DIB (Déchets Industriels Banals)', 'DIS (Spéciaux)', 'DAC (Soins)', 'Dangereux'],
    correctOption: 0,
    explanation: "Bois non souillé = DIB. Il peut être recyclé en granulés de bois ou composté.",
    category: 'Tri sélectif',
    context: 'Déchets bois'
  },
  {
    id: 'green_005',
    type: 'waste_sorting',
    difficulty: 1,
    question: "Des gants souillés par des produits chimiques sont des :",
    options: ['DIB', 'DIS (Déchets Industriels Spéciaux)', 'DASRI', 'Recyclables'],
    correctOption: 1,
    explanation: "Tout déchet souillé par des produits chimiques est un DIS nécessitant une filière spécialisée.",
    category: 'Tri sélectif',
    context: 'Déchets chimiques'
  },
  {
    id: 'green_006',
    type: 'waste_sorting',
    difficulty: 2,
    question: "Un film plastique propre et sec doit être :",
    options: [
      'Jeté avec les ordures ménagères',
      'Trié en DIB pour recyclage',
      'Brûlé sur place',
      'Enterré'
    ],
    correctOption: 1,
    explanation: "Plastique propre = DIB recyclables. Certains entrepôts ont des compacteurs à films plastiques.",
    category: 'Tri sélectif',
    context: 'Plastique'
  },
  {
    id: 'green_007',
    type: 'waste_hierarchy',
    difficulty: 2,
    question: "Dans la hiérarchie des déchets, quelle est l'option PRIVILÉGIÉE ?",
    options: ['Recycler', 'Réduire à la source', 'Valoriser énergétiquement', 'Enfouir'],
    correctOption: 1,
    explanation: "La hiérarchie : 1) Prévention/Réduire, 2) Réutiliser, 3) Recycler, 4) Valorisation, 5) Élimination.",
    category: 'Hiérarchie',
    context: '5R'
  },
  {
    id: 'green_008',
    type: 'waste_reglementation',
    difficulty: 3,
    question: "Le 'pollueur-payeur' est un principe qui veut que :",
    options: [
      'Les habitants paient tous les déchets',
      'Celui qui produit les déchets supporte les coûts de gestion',
      'L\'État paie tout',
      'Les clients paient les emballages'
    ],
    correctOption: 1,
    explanation: "Principe pollueur-payeur : le producteur de déchets supporte financièrement le coût de la gestion de ses déchets.",
    category: 'Réglementation',
    context: 'Pollueur-payeur'
  },

  // Emballages écologiques
  {
    id: 'green_009',
    type: 'packaging',
    difficulty: 1,
    question: "Quel emballage est le plus recyclable ?",
    options: [
      'Carton ondulé',
      'Plastique multi-couches',
      'Polystyrène',
      'Film plastique métallisé'
    ],
    correctOption: 0,
    explanation: "Le carton ondulé est 100% recyclable et biodégradable. Les multi-couches sont difficiles à recycler.",
    category: 'Emballages',
    context: 'Recyclabilité'
  },
  {
    id: 'green_010',
    type: 'packaging',
    difficulty: 2,
    question: "L'écoconception d'un emballage vise à :",
    options: [
      'Augmenter le poids pour le luxe',
      'Réduire l\'impact environnemental dès la conception',
      'Utiliser plus de plastique',
      'Mettre plus de couleurs'
    ],
    correctOption: 1,
    explanation: "Écoconception = intégrer l'environnement dès la conception (moins de matière, recyclable, réutilisable).",
    category: 'Emballages',
    context: 'Écoconception'
  },
  {
    id: 'green_011',
    type: 'packaging',
    difficulty: 2,
    question: "Un emballage 'overpackaging' est :",
    options: [
      'Un emballage supérieur',
      'Un suremballage inutile et excessif',
      'Un emballage pour l\'export',
      'Un emballage renforcé'
    ],
    correctOption: 1,
    explanation: "Overpackaging = suremballage excessif (ex: petite carte SD dans grande boîte). C'est un gaspillage à éviter.",
    category: 'Emballages',
    context: 'Suremballage'
  },

  // Transport et émissions
  {
    id: 'green_012',
    type: 'transport_emissions',
    difficulty: 2,
    question: "Quel mode de transport a la plus faible empreinte carbone par tonne-kilomètre ?",
    options: ['Camion routier', 'Avion', 'Fret ferroviaire', 'Bateau (maritime)'],
    correctOption: 3,
    explanation: "Par t.km : Maritime < Fer < Route < Aviation. Le fret maritime est le plus écologique pour longues distances.",
    category: 'Transport',
    context: 'Empreinte carbone'
  },
  {
    id: 'green_013',
    type: 'transport_optimization',
    difficulty: 2,
    question: "Le 'groupage' de livraisons permet de :",
    options: [
      'Augmenter le nombre de camions',
      'Optimiser le taux de remplissage et réduire les km par colis',
      'Livrer plus vite',
      'Augmenter les coûts'
    ],
    correctOption: 1,
    explanation: "Le groupage consiste à mutualiser les livraisons pour remplir les camions et réduire le nombre de tournées.",
    category: 'Transport',
    context: 'Optimisation'
  },
  {
    id: 'green_014',
    type: 'urban_logistics',
    difficulty: 2,
    question: "Une 'zone de livraison apaisée' en centre-ville vise à :",
    options: [
      'Interdire toute livraison',
      'Organiser les livraisons pour réduire la pollution et les embouteillages',
      'Augmenter les prix',
      'Livrer uniquement le matin'
    ],
    correctOption: 1,
    explanation: "Les zones apaisées organisent les créneaux de livraison, mutualisent les derniers kilomètres pour réduire l'impact.",
    category: 'Transport',
    context: 'Last mile verte'
  },
  {
    id: 'green_015',
    type: 'vehicle',
    difficulty: 3,
    question: "Un véhicule GNV fonctionne avec :",
    options: [
      'Gaz Naturel pour Véhicule (Gaz Naturel Vehicules)',
      'Grand Niveau de Vitesse',
      'Gaz Non Vénéneux',
      'Garantie Nouvelle Voiture'
    ],
    correctOption: 0,
    explanation: "GNV = Gaz Naturel pour Véhicules. Carburant alternatif plus propre que le diesel (moins de particules, NOx).",
    category: 'Transport',
    context: 'Carburants alternatifs'
  },

  // Empreinte carbone
  {
    id: 'green_016',
    type: 'carbon_footprint',
    difficulty: 2,
    question: "L'empreinte carbone d'une expédition dépend principalement de :",
    options: [
      'La couleur du carton',
      'La distance et le mode de transport',
      'Le nom du client',
      'L\'heure de livraison'
    ],
    correctOption: 1,
    explanation: "L'empreinte carbone = f(distance, mode transport, poids, taux de remplissage).",
    category: 'Carbone',
    context: 'Facteurs'
  },
  {
    id: 'green_017',
    type: 'carbon_calculation',
    difficulty: 3,
    scenario: "Comparaison : Livraison de 1 tonne sur 500 km.",
    question: "Quel mode émet le moins de CO2 ?",
    options: [
      'Camion seul (30% rempli)',
      'Ferroviaire (train)',
      'Avion cargo',
      'Camion plein (100%)'
    ],
    correctOption: 1,
    explanation: "Le ferroviaire émet ~20-30g CO2/t.km contre 60-90g pour un camion complet, et bien plus pour l'avion (>500g).",
    category: 'Carbone',
    context: 'Comparaison modes'
  },

  // Économie circulaire
  {
    id: 'green_018',
    type: 'circular_economy',
    difficulty: 2,
    question: "Le 'reverse logistics' (logistique inverse) concerne :",
    options: [
      'Les livraisons en sens interdit',
      'La gestion des retours, recyclages et produits en fin de vie',
      'La logistique en marche arrière',
      'Les erreurs de livraison'
    ],
    correctOption: 1,
    explanation: "Logistique inverse = flux retour : produits en fin de vie, emballages consignés, pièces à recycler.",
    category: 'Économie circulaire',
    context: 'Reverse logistics'
  },
  {
    id: 'green_019',
    type: 'circular_economy',
    difficulty: 2,
    question: "Une consigne d'emballage signifie que :",
    options: [
      'L\'emballage est jeté',
      'L\'emballage est récupéré et réutilisé',
      'L\'emballage est payant',
      'L\'emballage est interdit'
    ],
    correctOption: 1,
    explanation: "La consigne : l'emballage est récupéré, nettoyé et réutilisé plusieurs fois (caisses, bouteilles consignées).",
    category: 'Économie circulaire',
    context: 'Consigne'
  },
  {
    id: 'green_020',
    type: 'circular_economy',
    difficulty: 3,
    question: "Le 'upcycling' c'est :",
    options: [
      'Recycler vers le bas (dégradation)',
      'Recycler vers le haut (donner plus de valeur au déchet)',
        'Jeter plus haut',
      'Acheter plus cher'
    ],
    correctOption: 1,
    explanation: "Upcycling = transformer un déchet en produit de qualité/valorisation supérieure (ex: palettes → meubles design).",
    category: 'Économie circulaire',
    context: 'Upcycling'
  },

  // Énergie et bâtiment
  {
    id: 'green_021',
    type: 'energy',
    difficulty: 2,
    question: "Quelle source d'énergie est considérée comme renouvelable ?",
    options: ['Charbon', 'Pétrole', 'Solaire', 'Gaz naturel'],
    correctOption: 2,
    explanation: "Énergies renouvelables : solaire, éolien, hydraulique, biomasse, géothermie. Pas de combustion fossile.",
    category: 'Énergie',
    context: 'ENR'
  },
  {
    id: 'green_022',
    type: 'building',
    difficulty: 2,
    question: "Un entrepôt 'HQE' (Haute Qualité Environnementale) vise à :",
    options: [
      'Coûter plus cher',
      'Réduire l\'impact environnemental du bâtiment (énergie, eau, matériaux)',
      'Être plus grand',
      'Avoir plus de fenêtres'
    ],
    correctOption: 1,
    explanation: "HQE = certification visant la performance énergétique, gestion des déchets de chantier, confort, biodiversité.",
    category: 'Bâtiment',
    context: 'Certifications'
  },
  {
    id: 'green_023',
    type: 'lighting',
    difficulty: 1,
    question: "Quel éclairage est le plus économique en énergie ?",
    options: ['Ampoules à incandescence', 'LED', 'Néon', 'Halogenes'],
    correctOption: 1,
    explanation: "LED = 5-10x moins énergivore que l'incandescence, durée de vie 10x supérieure.",
    category: 'Énergie',
    context: 'Éclairage'
  },

  // Cas pratiques
  {
    id: 'green_024',
    type: 'decision_scenario',
    difficulty: 3,
    scenario: "Vous devez choisir entre : Option A : emballage plastique bon marché mais non recyclable. Option B : emballage carton +30% de coût mais recyclable.",
    question: "Quel choix privilégier pour une politique RSE ?",
    options: [
      'Option A (coût minimum)',
      'Option B (durable, image RSE, coût global sur cycle de vie)',
      'Ne rien emballer',
      'Alterner selon les humeurs'
    ],
    correctOption: 1,
    explanation: "Vision RSE long terme : le carton recyclable améliore l'image, évite les coûts de mise en décharge, et plaît aux clients.",
    category: 'Décision',
    context: 'Choix emballage'
  },
  {
    id: 'green_025',
    type: 'action_scenario',
    difficulty: 2,
    scenario: "Votre entrepôt génère beaucoup de déchets de carton.",
    question: "Quelle action la plus vertueuse dans la hiérarchie des déchets ?",
    options: [
      'Jeter à la poubelle générale',
      'Recycler le carton',
      'Réutiliser les cartons pour d\'autres expéditions (réemploi)',
      'Brûler pour chauffer'
    ],
    correctOption: 2,
    explanation: "Hiérarchie : Réduire > Réutiliser > Recycler. Réutiliser les cartons (réemploi) est mieux que recycler (qui consomme de l'énergie).",
    category: 'Hiérarchie',
    context: 'Gestion carton'
  }
];

// Fonctions utilitaires
export const getGreenLogisticsQuestion = () => {
  const randomIndex = Math.floor(Math.random() * greenLogisticsQuestions.length);
  return greenLogisticsQuestions[randomIndex];
};

export const getGreenLogisticsQuestionsByCategory = (category) => {
  return greenLogisticsQuestions.filter(q => q.category === category);
};

export const getRandomGreenLogisticsQuestions = (count = 10) => {
  const shuffled = [...greenLogisticsQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default greenLogisticsQuestions;
