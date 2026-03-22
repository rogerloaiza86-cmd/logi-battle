/**
 * Questions QCM pour le module Coût de Transport
 * Options équilibrées en longueur pour éviter les biais
 */

export const transportMCQQuestions = [
  {
    id: 'tr_mcq_001',
    question: "Coût d'un trajet de 300 km à 1,50 €/km ?",
    options: [
      '400 €',
      '450 €',
      '500 €',
      '550 €'
    ],
    correctOption: 1,
    explanation: "300 × 1,50 = 450 €.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'tr_mcq_002',
    question: "Que signifie 'FOB' ?",
    options: [
      'Franco bord',
      'Fret bateau',
      'Complet bord',
      'Exempt barrière'
    ],
    correctOption: 0,
    explanation: "FOB = Free On Board (Franco à bord).",
    category: "Incoterms",
    difficulty: 2
  },
  {
    id: 'tr_mcq_003',
    question: "Quel incoterm = 'Franco de port' ?",
    options: [
      'EXW',
      'FOB',
      'CIF',
      'DDP'
    ],
    correctOption: 3,
    explanation: "DDP = Delivered Duty Paid (tous frais inclus).",
    category: "Incoterms",
    difficulty: 2
  },
  {
    id: 'tr_mcq_004',
    question: "Transport 500 kg à 2 €/kg. Coût ?",
    options: [
      '800 €',
      '900 €',
      '1000 €',
      '1200 €'
    ],
    correctOption: 2,
    explanation: "500 × 2 = 1000 €.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'tr_mcq_005',
    question: "Qu'est-ce qu'un 'backhaul' ?",
    options: [
      'Retour vide',
      'Chargement retour',
      'Accident',
      'Retard'
    ],
    correctOption: 1,
    explanation: "Backhaul = chargement pour le trajet retour.",
    category: "Vocabulaire",
    difficulty: 2
  },
  {
    id: 'tr_mcq_006',
    question: "Document obligatoire transport international ?",
    options: [
      'Facture',
      'CMR',
      'Bon livraison',
      'Catalogue'
    ],
    correctOption: 1,
    explanation: "Le CMR est obligatoire pour l'international.",
    category: "Documents",
    difficulty: 2
  },
  {
    id: 'tr_mcq_007',
    question: "Trajet 800 €, remise 10%. Prix final ?",
    options: [
      '680 €',
      '700 €',
      '720 €',
      '750 €'
    ],
    correctOption: 2,
    explanation: "800 - 80 = 720 €.",
    category: "Calcul",
    difficulty: 2
  },
  {
    id: 'tr_mcq_008',
    question: "PTAC poids lourd standard ?",
    options: [
      '19 t',
      '26 t',
      '40 t',
      '44 t'
    ],
    correctOption: 3,
    explanation: "PTAC standard en Europe = 44 tonnes.",
    category: "Réglementation",
    difficulty: 2
  },
  {
    id: 'tr_mcq_009',
    question: "Qu'est-ce que le 'groupage' ?",
    options: [
      'Regrouper',
      'Séparer',
      'Un client',
      'Dégroupage'
    ],
    correctOption: 0,
    explanation: "Groupage = regrouper plusieurs expéditions.",
    category: "Vocabulaire",
    difficulty: 1
  },
  {
    id: 'tr_mcq_010',
    question: "20 tonnes à 45 €/tonne. Coût ?",
    options: [
      '800 €',
      '900 €',
      '1000 €',
      '1100 €'
    ],
    correctOption: 1,
    explanation: "20 × 45 = 900 €.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'tr_mcq_011',
    question: "Coût au km moyen camion 2024 ?",
    options: [
      '0,50-0,80 €',
      '1,00-1,50 €',
      '2,00-2,50 €',
      '3,00-3,50 €'
    ],
    correctOption: 1,
    explanation: "Coût moyen : 1,00 à 1,50 €/km.",
    category: "Coûts",
    difficulty: 2
  },
  {
    id: 'tr_mcq_012',
    question: "Carburant 1,80 €/L, 30L/100km, 400 km. Coût ?",
    options: [
      '180 €',
      '216 €',
      '250 €',
      '300 €'
    ],
    correctOption: 1,
    explanation: "(400 × 0,30) × 1,80 = 216 €.",
    category: "Calcul",
    difficulty: 3
  },
  {
    id: 'tr_mcq_013',
    question: "Qu'est-ce que le 'co-loading' ?",
    options: [
      'Deux camions',
      'Partage capacité',
      'Colis lourds',
      'Double facture'
    ],
    correctOption: 1,
    explanation: "Co-loading = partage capacité entre expéditeurs.",
    category: "Vocabulaire",
    difficulty: 2
  },
  {
    id: 'tr_mcq_014',
    question: "Coût représentant ~30% du total ?",
    options: [
      'Péages',
      'Carburant',
      'Conducteur',
      'Entretien'
    ],
    correctOption: 1,
    explanation: "Le carburant représente environ 30%.",
    category: "Coûts",
    difficulty: 2
  },
  {
    id: 'tr_mcq_015',
    question: "Tarif 1200 €, assurance 2%, péages 150 €. Total ?",
    options: [
      '1374 €',
      '1390 €',
      '1400 €',
      '1425 €'
    ],
    correctOption: 0,
    explanation: "1200 + 24 + 150 = 1374 €.",
    category: "Calcul",
    difficulty: 3
  },
  {
    id: 'tr_mcq_016',
    question: "Qu'est-ce qu'une 'charter' ?",
    options: [
      'Contrat long',
      'Location trajet',
      'Type remorque',
      'Document'
    ],
    correctOption: 1,
    explanation: "Charter = location véhicule pour un trajet.",
    category: "Vocabulaire",
    difficulty: 2
  },
  {
    id: 'tr_mcq_017',
    question: "Temps conduite max quotidien Europe ?",
    options: [
      '8 h',
      '9 h',
      '10 h',
      '12 h'
    ],
    correctOption: 1,
    explanation: "Maximum 9 heures (10h max 2×/semaine).",
    category: "Réglementation",
    difficulty: 3
  },
  {
    id: 'tr_mcq_018',
    question: "Fret 2500 €, commission 8%. Montant ?",
    options: [
      '180 €',
      '200 €',
      '220 €',
      '250 €'
    ],
    correctOption: 1,
    explanation: "2500 × 0,08 = 200 €.",
    category: "Calcul",
    difficulty: 2
  },
  {
    id: 'tr_mcq_019',
    question: "Que signifie 'just-in-time' ?",
    options: [
      'Rapide',
      'Au moment besoin',
      'Gratuit',
      'Express'
    ],
    correctOption: 1,
    explanation: "JIT = livraison au moment précis du besoin.",
    category: "Concepts",
    difficulty: 2
  },
  {
    id: 'tr_mcq_020',
    question: "Taux TVA transport marchandises France ?",
    options: [
      '5,5%',
      '10%',
      '20%',
      'Exonéré'
    ],
    correctOption: 2,
    explanation: "TVA standard = 20%.",
    category: "Réglementation",
    difficulty: 2
  },
  {
    id: 'tr_mcq_021',
    question: "Quel est le poids max par essieu ?",
    options: [
      '10 t',
      '11,5 t',
      '13 t',
      '15 t'
    ],
    correctOption: 1,
    explanation: "11,5 tonnes max par essieu en général.",
    category: "Réglementation",
    difficulty: 3
  },
  {
    id: 'tr_mcq_022',
    question: "Distance 450 km, vitesse 90 km/h. Temps ?",
    options: [
      '4 h',
      '5 h',
      '6 h',
      '7 h'
    ],
    correctOption: 1,
    explanation: "450 ÷ 90 = 5 heures.",
    category: "Calcul",
    difficulty: 1
  },
  {
    id: 'tr_mcq_023',
    question: "Qu'est-ce qu'un 'affrètement' ?",
    options: [
      'Location',
      'Vente',
      'Réparation',
      'Contrat'
    ],
    correctOption: 0,
    explanation: "Affrètement = location d'un transport.",
    category: "Vocabulaire",
    difficulty: 2
  },
  {
    id: 'tr_mcq_024',
    question: "Péages 120 €, trajet 600 km à 1,20 €/km. Total ?",
    options: [
      '720 €',
      '840 €',
      '850 €',
      '950 €'
    ],
    correctOption: 1,
    explanation: "(600 × 1,20) + 120 = 840 €.",
    category: "Calcul",
    difficulty: 2
  },
  {
    id: 'tr_mcq_025',
    question: "Quel document pour transport national ?",
    options: [
      'CMR',
      'Lettre voiture',
      'Facture',
      'Bon commande'
    ],
    correctOption: 1,
    explanation: "La lettre de voiture pour le national.",
    category: "Documents",
    difficulty: 2
  }
]

export const getRandomTransportMCQ = () => {
  return transportMCQQuestions[Math.floor(Math.random() * transportMCQQuestions.length)]
}
