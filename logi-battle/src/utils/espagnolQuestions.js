/**
 * Banque Espagnol — vocabulaire, grammaire, conjugaison, espagnol professionnel.
 */

export const espagnolQuestions = [
  {
    id: 'es_001',
    question: "Comment dit-on « bonjour » (le matin) en espagnol ?",
    options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hola adiós'],
    correctOption: 1,
    explanation: "Buenos días (matin), buenas tardes (après-midi), buenas noches (soir/nuit).",
    category: 'Vocabulaire',
    difficulty: 1
  },
  {
    id: 'es_002',
    question: "Que signifie « almacén » ?",
    options: ['Le magasin / entrepôt', 'Le bureau', 'Le camion', 'La commande'],
    correctOption: 0,
    explanation: "El almacén = l'entrepôt (ou le magasin de stockage). Mot clé de la logistique hispanophone.",
    category: 'Vocabulaire pro',
    difficulty: 1
  },
  {
    id: 'es_003',
    question: "Complétez : « Yo ____ español » (parler)",
    options: ['hablas', 'hablo', 'habla', 'hablan'],
    correctOption: 1,
    explanation: "Hablar au présent : yo hablo, tú hablas, él habla, nosotros hablamos, ellos hablan.",
    category: 'Conjugaison',
    difficulty: 1
  },
  {
    id: 'es_004',
    question: "Quel est l'article correct : « ____ problema » ?",
    options: ['La', 'El', 'Los', 'Las'],
    correctOption: 1,
    explanation: "Malgré sa terminaison en -a, « problema » est masculin : el problema (comme el día, el mapa).",
    category: 'Grammaire',
    difficulty: 2
  },
  {
    id: 'es_005',
    question: "Comment dit-on « la livraison » en espagnol ?",
    options: ['La entrega', 'La llegada', 'La salida', 'La tienda'],
    correctOption: 0,
    explanation: "La entrega = la livraison. Entregar = livrer/remettre.",
    category: 'Vocabulaire pro',
    difficulty: 1
  },
  {
    id: 'es_006',
    question: "Que veut dire « ¿Cuánto cuesta? » ?",
    options: ['Où est-ce ?', 'Combien ça coûte ?', 'Quelle heure est-il ?', "Qu'est-ce que c'est ?"],
    correctOption: 1,
    explanation: "¿Cuánto cuesta? = Combien ça coûte ? Indispensable pour le commerce.",
    category: 'Communication',
    difficulty: 1
  },
  {
    id: 'es_007',
    question: "Complétez : « Nosotros ____ en Madrid » (vivre)",
    options: ['vivo', 'vivimos', 'viven', 'vives'],
    correctOption: 1,
    explanation: "Vivir au présent : nosotros vivimos. Les verbes en -ir font -imos à la 1re personne du pluriel.",
    category: 'Conjugaison',
    difficulty: 1
  },
  {
    id: 'es_008',
    question: "« Ser » ou « estar » : « El paquete ____ en el camión. »",
    options: ['es', 'está', 'son', 'eres'],
    correctOption: 1,
    explanation: "Estar pour la localisation (où ?) : el paquete está en el camión. Ser pour l'identité/caractéristique.",
    category: 'Grammaire',
    difficulty: 2
  },
  {
    id: 'es_009',
    question: "Quel jour est « miércoles » ?",
    options: ['Mardi', 'Mercredi', 'Jeudi', 'Samedi'],
    correctOption: 1,
    explanation: "Lunes, martes, miércoles, jueves, viernes, sábado, domingo.",
    category: 'Vocabulaire',
    difficulty: 1
  },
  {
    id: 'es_010',
    question: "Comment dit-on « le camion » en espagnol ?",
    options: ['El coche', 'El camión', 'La camioneta grande', 'El tren'],
    correctOption: 1,
    explanation: "El camión = le camion. El coche = la voiture, el tren = le train.",
    category: 'Vocabulaire pro',
    difficulty: 1
  },
  {
    id: 'es_011',
    question: "Que signifie « el pedido » dans un contexte commercial ?",
    options: ['Le pied', 'La commande', 'Le paiement', 'Le client'],
    correctOption: 1,
    explanation: "El pedido = la commande. Hacer un pedido = passer une commande.",
    category: 'Vocabulaire pro',
    difficulty: 2
  },
  {
    id: 'es_012',
    question: "Complétez : « Ayer ____ al trabajo en bus » (aller, passé simple)",
    options: ['voy', 'fui', 'iré', 'iba'],
    correctOption: 1,
    explanation: "« Ayer » (hier) → pretérito indefinido : fui (ir : fui, fuiste, fue...).",
    category: 'Conjugaison',
    difficulty: 3
  },
  {
    id: 'es_013',
    question: "Comment compte-t-on « 15 » en espagnol ?",
    options: ['Cinco', 'Quince', 'Cincuenta', 'Diecicinco'],
    correctOption: 1,
    explanation: "15 = quince. 50 = cincuenta. Attention aux nombres irréguliers de 11 à 15 (once, doce, trece, catorce, quince).",
    category: 'Vocabulaire',
    difficulty: 1
  },
  {
    id: 'es_014',
    question: "Que veut dire « ¡Cuidado! » ?",
    options: ['Bienvenue !', 'Attention !', 'Au revoir !', "D'accord !"],
    correctOption: 1,
    explanation: "¡Cuidado! = Attention ! / Prudence ! — à connaître pour la sécurité au travail.",
    category: 'Communication',
    difficulty: 1
  },
  {
    id: 'es_015',
    question: "Quelle est la traduction de « la fecha de entrega » ?",
    options: ['La date de livraison', 'La fiche de paie', "La file d'attente", 'La fête du village'],
    correctOption: 0,
    explanation: "La fecha = la date ; la entrega = la livraison. La fecha de entrega = la date de livraison.",
    category: 'Vocabulaire pro',
    difficulty: 2
  },
  {
    id: 'es_016',
    question: "Complétez : « ¿____ está el almacén? » (Où)",
    options: ['Qué', 'Dónde', 'Cuándo', 'Quién'],
    correctOption: 1,
    explanation: "¿Dónde? = où ? ; ¿qué? = quoi ; ¿cuándo? = quand ; ¿quién? = qui.",
    category: 'Grammaire',
    difficulty: 1
  },
  {
    id: 'es_017',
    question: "Que signifie « gracias por su pedido » ?",
    options: ['Merci pour votre commande', 'Bonjour à votre équipe', 'Au revoir et à bientôt', 'Votre colis est perdu'],
    correctOption: 0,
    explanation: "Gracias por... = merci pour... ; su pedido = votre commande (vouvoiement).",
    category: 'Communication',
    difficulty: 1
  },
  {
    id: 'es_018',
    question: "Quel pays n'a PAS l'espagnol comme langue officielle ?",
    options: ['Le Mexique', 'Le Brésil', "L'Argentine", 'La Colombie'],
    correctOption: 1,
    explanation: "Au Brésil, on parle portugais. L'espagnol est officiel dans une vingtaine de pays.",
    category: 'Culture',
    difficulty: 1
  },
  {
    id: 'es_019',
    question: "« Hay » signifie :",
    options: ['Il a', 'Il y a', 'Ici', 'Hier'],
    correctOption: 1,
    explanation: "Hay = il y a (invariable) : « hay tres cajas » = il y a trois cartons.",
    category: 'Grammaire',
    difficulty: 1
  },
  {
    id: 'es_020',
    question: "Comment dit-on « tout de suite / immédiatement » ?",
    options: ['Mañana', 'En seguida', 'Despacio', 'A veces'],
    correctOption: 1,
    explanation: "En seguida = tout de suite. Mañana = demain, despacio = lentement, a veces = parfois.",
    category: 'Vocabulaire',
    difficulty: 2
  },
]

export const getEspagnolQuestion = () =>
  espagnolQuestions[Math.floor(Math.random() * espagnolQuestions.length)]
