/**
 * Banque Anglais — vocabulaire, grammaire, conjugaison, anglais professionnel.
 */

export const anglaisQuestions = [
  {
    id: 'en_001',
    question: "Comment dit-on « entrepôt » en anglais ?",
    options: ['Workshop', 'Warehouse', 'Storehouse room', 'Backshop'],
    correctOption: 1,
    explanation: "Warehouse = entrepôt. Workshop = atelier. À connaître absolument en logistique internationale !",
    category: 'Vocabulaire pro',
    difficulty: 1
  },
  {
    id: 'en_002',
    question: "Complete: \"She ____ to London last year.\"",
    options: ['go', 'goes', 'went', 'gone'],
    correctOption: 2,
    explanation: "« Last year » indique un passé révolu → prétérit : went (go / went / gone).",
    category: 'Grammaire',
    difficulty: 1
  },
  {
    id: 'en_003',
    question: "Que signifie « delivery » ?",
    options: ['La commande', 'La livraison', 'Le retour', 'La facture'],
    correctOption: 1,
    explanation: "Delivery = livraison. Order = commande, return = retour, invoice = facture.",
    category: 'Vocabulaire pro',
    difficulty: 1
  },
  {
    id: 'en_004',
    question: "Complete: \"I have been working here ____ 2020.\"",
    options: ['for', 'since', 'during', 'ago'],
    correctOption: 1,
    explanation: "Since + point de départ (2020) ; for + durée (4 years) ; ago après une durée (4 years ago).",
    category: 'Grammaire',
    difficulty: 2
  },
  {
    id: 'en_005',
    question: "Quel est le contraire de « cheap » ?",
    options: ['Free', 'Expensive', 'Big', 'Poor'],
    correctOption: 1,
    explanation: "Cheap = bon marché ; expensive = cher.",
    category: 'Vocabulaire',
    difficulty: 1
  },
  {
    id: 'en_006',
    question: "Comment traduire « Veuillez trouver ci-joint » dans un e-mail professionnel ?",
    options: ['Please find attached', 'Please look joined', 'You can see here', 'Watch the document'],
    correctOption: 0,
    explanation: "« Please find attached » est la formule standard pour signaler une pièce jointe.",
    category: 'Anglais pro',
    difficulty: 2
  },
  {
    id: 'en_007',
    question: "Complete: \"If I ____ rich, I would travel the world.\"",
    options: ['am', 'was/were', 'will be', 'would be'],
    correctOption: 1,
    explanation: "Conditionnel type 2 : If + prétérit (was/were), would + base verbale.",
    category: 'Grammaire',
    difficulty: 2
  },
  {
    id: 'en_008',
    question: "Que signifie « to ship » dans un contexte commercial ?",
    options: ['Naviguer', 'Expédier', 'Embaucher', 'Vendre'],
    correctOption: 1,
    explanation: "To ship = expédier (pas uniquement par bateau !). Shipment = expédition.",
    category: 'Vocabulaire pro',
    difficulty: 1
  },
  {
    id: 'en_009',
    question: "Quel est le pluriel de « child » ?",
    options: ['Childs', 'Children', 'Childes', 'Childrens'],
    correctOption: 1,
    explanation: "Child → children : pluriel irrégulier (comme man → men, foot → feet).",
    category: 'Grammaire',
    difficulty: 1
  },
  {
    id: 'en_010',
    question: "\"The meeting is scheduled ____ Monday morning.\"",
    options: ['at', 'in', 'on', 'by'],
    correctOption: 2,
    explanation: "On + jour (on Monday) ; at + heure (at 9 am) ; in + mois/année (in June).",
    category: 'Grammaire',
    difficulty: 2
  },
  {
    id: 'en_011',
    question: "Que veut dire « ASAP » ?",
    options: ['As Soon As Possible', 'All Safe And Protected', 'Ask Someone About Prices', 'As Simple As Possible'],
    correctOption: 0,
    explanation: "ASAP = As Soon As Possible (dès que possible), très courant dans les e-mails professionnels.",
    category: 'Anglais pro',
    difficulty: 1
  },
  {
    id: 'en_012',
    question: "Comment dit-on « chariot élévateur » en anglais ?",
    options: ['Lift truck cart', 'Forklift', 'Elevator car', 'Carry lifter'],
    correctOption: 1,
    explanation: "Forklift (ou forklift truck) = chariot élévateur. Pallet truck = transpalette.",
    category: 'Vocabulaire pro',
    difficulty: 1
  },
  {
    id: 'en_013',
    question: "Complete: \"There isn't ____ milk left.\"",
    options: ['many', 'much', 'a lot', 'few'],
    correctOption: 1,
    explanation: "Much + indénombrable (milk) ; many + dénombrable (bottles). « There isn't much milk. »",
    category: 'Grammaire',
    difficulty: 2
  },
  {
    id: 'en_014',
    question: "Que signifie « I'm looking forward to hearing from you » ?",
    options: ["Je regarde devant moi", "Dans l'attente de votre réponse", "Je vous écoute attentivement", "Je vous ai entendu"],
    correctOption: 1,
    explanation: "Formule de clôture d'e-mail : « dans l'attente de votre réponse / au plaisir de vous lire ».",
    category: 'Anglais pro',
    difficulty: 2
  },
  {
    id: 'en_015',
    question: "Quel verbe irrégulier : « take » au participe passé ?",
    options: ['Taked', 'Took', 'Taken', 'Taking'],
    correctOption: 2,
    explanation: "Take / took / taken. « Took » est le prétérit, « taken » le participe passé.",
    category: 'Conjugaison',
    difficulty: 1
  },
  {
    id: 'en_016',
    question: "Comment demander poliment de l'aide en anglais ?",
    options: ['Help me now', 'Could you help me, please?', 'You help me', 'I want help'],
    correctOption: 1,
    explanation: "« Could you... please? » est la forme polie standard pour faire une demande.",
    category: 'Communication',
    difficulty: 1
  },
  {
    id: 'en_017',
    question: "Que signifie « warehouse receipt » ?",
    options: ["Le reçu d'entrepôt", "La recette de l'entrepôt", "L'adresse de l'entrepôt", "Le plan de l'entrepôt"],
    correctOption: 0,
    explanation: "Receipt = reçu / récépissé. Warehouse receipt = document attestant la réception de marchandises.",
    category: 'Vocabulaire pro',
    difficulty: 2
  },
  {
    id: 'en_018',
    question: "\"He ____ TV when I arrived.\"",
    options: ['watched', 'was watching', 'is watching', 'watches'],
    correctOption: 1,
    explanation: "Action en cours dans le passé interrompue par une autre → past continuous : was watching.",
    category: 'Conjugaison',
    difficulty: 2
  },
  {
    id: 'en_019',
    question: "Quelle est la bonne traduction de « horaire » (de travail) ?",
    options: ['Hourly', 'Schedule', 'Clock', 'Timing list'],
    correctOption: 1,
    explanation: "Schedule = horaire, planning, emploi du temps. « What's your schedule today? »",
    category: 'Vocabulaire',
    difficulty: 1
  },
  {
    id: 'en_020',
    question: "Que veut dire « lead time » en supply chain ?",
    options: ["Le temps de pause", "Le délai d'approvisionnement", "L'heure de pointe", "Le temps de travail"],
    correctOption: 1,
    explanation: "Lead time = délai entre la commande et la réception — indicateur clé de la supply chain.",
    category: 'Vocabulaire pro',
    difficulty: 2
  },
]

export const getAnglaisQuestion = () =>
  anglaisQuestions[Math.floor(Math.random() * anglaisQuestions.length)]
