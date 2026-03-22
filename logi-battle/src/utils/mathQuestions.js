/**
 * Calculs Logistiques - U12 - Maths
 * Compétences : Volumes, conversions, taux de rotation, optimisation
 */

export const mathQuestions = [
  // Calculs de volumes et cubage
  {
    id: 'math_001',
    type: 'volume_calculation',
    difficulty: 1,
    question: "Un carton fait 60 cm × 40 cm × 30 cm. Quel est son volume en litres ?",
    options: ['36 L', '72 L', '18 L', '144 L'],
    correctOption: 1,
    explanation: "Volume = 0,60 m × 0,40 m × 0,30 m = 0,072 m³ = 72 litres (1 m³ = 1000 L).",
    category: 'Volumes',
    context: 'Carton'
  },
  {
    id: 'math_002',
    type: 'container_capacity',
    difficulty: 2,
    question: "Un conteneur 20 pieds mesure environ 6m × 2,4m × 2,6m. Quelle est sa capacité théorique en m³ ?",
    options: ['20 m³', '37 m³', '67 m³', '100 m³'],
    correctOption: 1,
    explanation: "6 × 2,4 × 2,6 = 37,44 m³. En pratique, on charge environ 25-30 m³ utiles à cause des pertes d'espace.",
    category: 'Volumes',
    context: 'Conteneur'
  },
  {
    id: 'math_003',
    type: 'pallet_volume',
    difficulty: 2,
    question: "Une palette EUR standard (120×80 cm) est chargée à 1,50 m de hauteur. Volume ?",
    options: ['0,72 m³', '1,44 m³', '2,88 m³', '0,96 m³'],
    correctOption: 1,
    explanation: "1,20 m × 0,80 m × 1,50 m = 1,44 m³.",
    category: 'Volumes',
    context: 'Palette'
  },
  {
    id: 'math_004',
    type: 'loading_optimization',
    difficulty: 3,
    question: "Un camion de 13,60 m × 2,45 m × 2,70 m doit transporter des palettes 120×80 cm. Combien de palettes maximum (empilage 2 niveaux) ?",
    options: ['26', '33', '52', '66'],
    correctOption: 1,
    explanation: "Longueur : 13,60 / 1,20 = 11 palettes. Largeur : 2,45 / 0,80 = 3 palettes. 11 × 3 = 33 palettes/niveau × 2 niveaux = 66, mais contraintes réelles = ~33-52 selon arrangement.",
    correction: "En pratique : 11 de long × 3 de large = 33 par niveau. Avec 2 niveaux = 66 max, mais contraintes poids/hauteur réelles limitent souvent à 33.",
    options: ['26', '33', '52', '66'],
    correctOption: 1,
    explanation: "En arrangement optimal : ~33-34 palettes (1 niveau) ou 66 (2 niveaux théorique). La réponse dépend des contraintes réelles.",
    category: 'Optimisation',
    context: 'Chargement'
  },

  // Conversions
  {
    id: 'math_005',
    type: 'weight_conversion',
    difficulty: 1,
    question: "Combien pèse 1 m³ d'eau ?",
    options: ['1 kg', '10 kg', '100 kg', '1000 kg'],
    correctOption: 3,
    explanation: "Masse volumique de l'eau = 1 kg/L. 1 m³ = 1000 L = 1000 kg = 1 tonne.",
    category: 'Conversions',
    context: 'Masse volumique'
  },
  {
    id: 'math_006',
    type: 'unit_conversion',
    difficulty: 1,
    question: "5 tonnes = ?",
    options: ['500 kg', '5000 kg', '50000 kg', '50 kg'],
    correctOption: 1,
    explanation: "1 tonne = 1000 kg. 5 tonnes = 5000 kg.",
    category: 'Conversions',
    context: 'Tonnes'
  },
  {
    id: 'math_007',
    type: 'dimension_conversion',
    difficulty: 2,
    question: "Une boîte mesure 450 mm × 300 mm × 200 mm. Dimensions en mètres ?",
    options: ['4,5 × 3 × 2 m', '0,45 × 0,30 × 0,20 m', '45 × 30 × 20 m', '0,045 × 0,030 × 0,020 m'],
    correctOption: 1,
    explanation: "Diviser par 1000 : 450 mm = 0,45 m, 300 mm = 0,30 m, 200 mm = 0,20 m.",
    category: 'Conversions',
    context: 'Dimensions'
  },

  // Taux de service et KPI
  {
    id: 'math_008',
    type: 'service_rate',
    difficulty: 2,
    question: "Sur 200 commandes, 180 sont livrées complètes et à temps. Taux de service ?",
    options: ['80%', '90%', '95%', '100%'],
    correctOption: 1,
    explanation: "Taux de service = (180 / 200) × 100 = 90%.",
    category: 'KPI',
    context: 'Taux de service'
  },
  {
    id: 'math_009',
    type: 'stock_rotation',
    difficulty: 2,
    question: "Stock moyen = 500 unités. Ventes annuelles = 3000 unités. Taux de rotation ?",
    options: ['3', '6', '12', '0,5'],
    correctOption: 1,
    explanation: "Rotation = Ventes / Stock moyen = 3000 / 500 = 6 fois par an.",
    category: 'KPI',
    context: 'Rotation stock'
  },
  {
    id: 'math_010',
    type: 'coverage_rate',
    difficulty: 3,
    question: "Stock disponible = 800 unités. Consommation moyenne mensuelle = 400 unités. Couverture de stock ?",
    options: ['15 jours', '1 mois', '2 mois', '3 mois'],
    correctOption: 2,
    explanation: "Couverture = Stock / Consommation mensuelle = 800 / 400 = 2 mois de couverture.",
    category: 'KPI',
    context: 'Couverture'
  },

  // Coûts logistiques
  {
    id: 'math_011',
    type: 'transport_cost',
    difficulty: 2,
    question: "Transport : 2€/km. Distance 350 km. Coût ?",
    options: ['350€', '700€', '175€', '1400€'],
    correctOption: 1,
    explanation: "350 km × 2€/km = 700€.",
    category: 'Coûts',
    context: 'Transport'
  },
  {
    id: 'math_012',
    type: 'storage_cost',
    difficulty: 2,
    question: "Coût de stockage = 10€/m²/mois. Entrepôt de 500 m². Coût annuel ?",
    options: ['5000€', '6000€', '50000€', '60000€'],
    correctOption: 3,
    explanation: "500 m² × 10€ × 12 mois = 60 000€/an.",
    category: 'Coûts',
    context: 'Stockage'
  },
  {
    id: 'math_013',
    type: 'cost_per_order',
    difficulty: 3,
    question: "Coûts logistiques annuels = 120 000€. Nombre de commandes = 4000. Coût par commande ?",
    options: ['20€', '30€', '40€', '50€'],
    correctOption: 1,
    explanation: "120 000 / 4000 = 30€ par commande.",
    category: 'Coûts',
    context: 'Unitaire'
  },

  // Calculs de chargement
  {
    id: 'math_014',
    type: 'loading_rate',
    difficulty: 2,
    question: "Capacité camion = 20 tonnes. Chargement réel = 16 tonnes. Taux de remplissage ?",
    options: ['70%', '75%', '80%', '85%'],
    correctOption: 2,
    explanation: "(16 / 20) × 100 = 80% de taux de remplissage.",
    category: 'Chargement',
    context: 'Taux remplissage'
  },
  {
    id: 'math_015',
    type: 'pallet_calculation',
    difficulty: 2,
    question: "Un client commande 240 colis. Un pallet contient 40 colis. Combien de palettes ?",
    options: ['4', '5', '6', '7'],
    correctOption: 2,
    explanation: "240 / 40 = 6 palettes complètes.",
    category: 'Chargement',
    context: 'Colis/palette'
  },

  // Calculs de temps
  {
    id: 'math_016',
    type: 'time_calculation',
    difficulty: 1,
    question: "Départ 8h30. Trajet 2h30. Arrivée ?",
    options: ['10h00', '10h30', '11h00', '11h30'],
    correctOption: 2,
    explanation: "8h30 + 2h30 = 11h00.",
    category: 'Temps',
    context: 'Horaires'
  },
  {
    id: 'math_017',
    type: 'delivery_time',
    difficulty: 2,
    question: "Commande passée lundi 14h. Délai annoncé : 48h ouvrées. Livraison quand ?",
    options: ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    correctOption: 1,
    explanation: "48h ouvrées = lundi 14h + 48h = mercredi 14h (hors week-end).",
    category: 'Temps',
    context: 'Délais'
  },

  // Calculs divers
  {
    id: 'math_018',
    type: 'average_calculation',
    difficulty: 1,
    question: "Stock début mois = 1000, fin mois = 1200. Stock moyen ?",
    options: ['1000', '1100', '1200', '2200'],
    correctOption: 1,
    explanation: "Stock moyen = (Stock début + Stock fin) / 2 = (1000 + 1200) / 2 = 1100.",
    category: 'Statistiques',
    context: 'Moyenne'
  },
  {
    id: 'math_019',
    type: 'percentage',
    difficulty: 2,
    question: "Prix HT = 1000€. TVA 20%. Prix TTC ?",
    options: ['1000€', '1100€', '1200€', '1250€'],
    correctOption: 2,
    explanation: "1000€ × 1,20 = 1200€ TTC.",
    category: 'Pourcentages',
    context: 'TVA'
  },
  {
    id: 'math_020',
    type: 'break_even',
    difficulty: 3,
    question: "Coût fixe entrepôt = 10 000€/mois. Marge par commande = 5€. Commandes minimum pour rentabilité ?",
    options: ['1000', '2000', '5000', '10000'],
    correctOption: 1,
    explanation: "Seuil de rentabilité = Coûts fixes / Marge unitaire = 10 000 / 5 = 2000 commandes.",
    category: 'Seuil',
    context: 'Rentabilité'
  }
];

// Fonctions utilitaires
export const getMathQuestion = () => {
  const randomIndex = Math.floor(Math.random() * mathQuestions.length);
  return mathQuestions[randomIndex];
};

export const getMathQuestionsByCategory = (category) => {
  return mathQuestions.filter(q => q.category === category);
};

export const getRandomMathQuestions = (count = 10) => {
  const shuffled = [...mathQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default mathQuestions;
