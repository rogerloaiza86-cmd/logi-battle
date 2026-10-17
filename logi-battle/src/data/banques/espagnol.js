import { lot } from './lot'

const GT = ['generale', 'technologique']
const PRO = ['professionnelle']

export const espagnolQuestions = [
  ...lot('es-gt-2', GT, 'seconde', 'espagnol', [
    {
      theme: 'Axe 6 — L’Espagne au-delà des clichés',
      question: '¿Cuál de estas frases evita un cliché sobre España?',
      options: [
        'España es solo siesta y flamenco.',
        'España tiene regiones, lenguas e historias diversas.',
        'En España nadie trabaja.',
        'España no tiene ciudades.',
      ],
      correct: 1,
      explanation: 'En seconde, l’axe 6 obligatoire d’espagnol est « L’Espagne au-delà des clichés ».',
    },
    {
      theme: 'Le village, le quartier, la ville',
      question: '“Vivo en un barrio tranquilo” significa:',
      options: [
        'J’habite un quartier calme',
        'Je pars en voyage',
        'Je n’ai pas de maison',
        'Je parle anglais',
      ],
      correct: 0,
      explanation: 'Le quartier et la ville sont un axe de la thématique de seconde « L’art de vivre ensemble ».',
    },
    {
      theme: 'Sauver la planète',
      question: '“Reciclar” quiere decir:',
      options: ['Recycler', 'Oublier', 'Courir', 'Dormir'],
      correct: 0,
      explanation: 'L’axe « Sauver la planète, penser les futurs possibles » travaille ce lexique.',
    },
    {
      theme: 'Représentation de soi',
      question: '“Me llamo Inès” sirve para:',
      options: ['Se présenter', 'Demander l’heure', 'Refuser', 'Compter'],
      correct: 0,
      explanation: 'Se présenter relève de l’axe « Représentation de soi et rapport à autrui ».',
    },
  ]),
  ...lot('es-gt-1', GT, 'premiere', 'espagnol', [
    {
      theme: 'Axe 6 — L’espace andin',
      question: 'Los Andes son:',
      options: [
        'Una cordillera de América del Sur',
        'Un río de Francia',
        'Una isla del Caribe',
        'Una ciudad de España',
      ],
      correct: 0,
      explanation: 'En première, l’axe 6 obligatoire est « L’espace andin, la colonne vertébrale de l’Amérique du Sud ».',
    },
    {
      theme: 'Identités et échanges',
      question: '“Identidad” se acerca a:',
      options: ['Ce qu’une personne ou un groupe est', 'Un ticket de bus', 'Une formule', 'Une facture'],
      correct: 0,
      explanation: '« Identités et échanges » ouvre la thématique du cycle terminal.',
    },
    {
      theme: 'Diversité et inclusion',
      question: '“Inclusión” significa:',
      options: [
        'Faire une place à chacun',
        'Fermer une porte',
        'Effacer un nom',
        'Répéter une date',
      ],
      correct: 0,
      explanation: '« Diversité et inclusion » est un axe du cycle terminal.',
    },
    {
      theme: 'Fictions et réalités',
      question: 'Una novela es:',
      options: ['Un long récit de fiction', 'Une carte', 'Un horaire', 'Un pourcentage'],
      correct: 0,
      explanation: 'L’axe « Fictions et réalités » s’appuie sur des récits.',
    },
  ]),
  ...lot('es-gt-t', GT, 'terminale', 'espagnol', [
    {
      theme: 'Axe 6 — Les métissages du monde hispanique',
      question: 'El mestizaje en el mundo hispánico designa:',
      options: [
        'Le mélange de populations, de langues et de cultures',
        'Une seule origine sans contact',
        'La disparition de l’espagnol',
        'Une carte muette',
      ],
      correct: 0,
      explanation: 'En terminale, l’axe 6 obligatoire est « La richesse des métissages dans le monde hispanique ».',
    },
    {
      theme: 'Territoire et mémoire',
      question: '“La memoria” es:',
      options: ['La mémoire', 'L’oubli obligatoire', 'Un prix', 'Une heure'],
      correct: 0,
      explanation: 'L’axe « Territoire et mémoire » interroge ce qui reste d’un passé dans un lieu.',
    },
    {
      theme: 'Art et pouvoir',
      question: 'Un mural puede ser:',
      options: [
        'Une œuvre peinte sur un mur, parfois politique',
        'Un ticket de caisse',
        'Une équation',
        'Un passeport',
      ],
      correct: 0,
      explanation: '« Art et pouvoir » est un axe du cycle terminal.',
    },
    {
      theme: 'Innovations scientifiques et responsabilité',
      question: '“Hay que pensar en las consecuencias” insiste en:',
      options: ['La responsabilité', 'Le silence', 'Le hasard seul', 'L’oubli'],
      correct: 0,
      explanation: 'L’axe « Innovations scientifiques et responsabilité » relie une découverte et ses effets.',
    },
  ]),
  ...lot('es-pro-2', PRO, 'seconde', 'espagnol', [
    {
      theme: 'Vie quotidienne',
      question: '“¿Qué hora es?” pregunta:',
      options: ['L’heure', 'Le nom de famille', 'Un prix', 'Un pays'],
      correct: 0,
      explanation: 'Demander l’heure est une situation de la vie quotidienne du programme de bac pro.',
    },
    {
      theme: 'Vie professionnelle',
      question: '“Empiezo a trabajar a las ocho” significa:',
      options: ['Je commence le travail à 8 h', 'Je termine à 8 h', 'Je ne travaille pas', 'J’habite au 8'],
      correct: 0,
      explanation: 'Les horaires relèvent des situations professionnelles.',
    },
    {
      theme: 'Se présenter',
      question: 'Elige la presentación correcta:',
      options: [
        'Hola, me llamo Lina y soy alumna.',
        'Ayer mapa nunca azul.',
        'Cerrado poema siete.',
        'Océano silencio rey.',
      ],
      correct: 0,
      explanation: 'Se présenter est une tâche prioritaire des situations personnelles.',
    },
    {
      theme: 'Consigne simple',
      question: '“Ponte el casco” es:',
      options: ['Une consigne de sécurité', 'Une heure', 'Un prix', 'Une capitale'],
      correct: 0,
      explanation: 'Comprendre une consigne courte vise le niveau A2-B1 du bac pro.',
    },
  ]),
  ...lot('es-pro-1', PRO, 'premiere', 'espagnol', [
    {
      theme: 'Vie professionnelle',
      question: '“La entrega llega tarde” significa:',
      options: ['La livraison est en retard', 'La livraison est gratuite', 'Le client est absent à vie', 'Le colis n’existe pas'],
      correct: 0,
      explanation: 'Signaler un retard est une situation professionnelle de première.',
    },
    {
      theme: 'Demander de l’aide',
      question: '“¿Puede ayudarme?” es:',
      options: ['Une demande d’aide', 'Un refus', 'Une date', 'Un calcul'],
      correct: 0,
      explanation: 'Demander de l’aide fait partie des actes de la vie sociale.',
    },
    {
      theme: 'Message court',
      question: '¿Qué mensaje confirma una cita?',
      options: [
        'Estaré allí a las diez.',
        'Azul nunca mapa.',
        'Océano cerrado verso.',
        'Siete reyes silencio.',
      ],
      correct: 0,
      explanation: 'Confirmer un rendez-vous est un écrit court de la formation.',
    },
    {
      theme: 'Lexique du travail',
      question: 'Un cliente es:',
      options: ['Un client', 'Un outil', 'Un horaire', 'Un plan'],
      correct: 0,
      explanation: 'Le lexique professionnel se construit dans les situations de travail.',
    },
  ]),
  ...lot('es-pro-t', PRO, 'terminale', 'espagnol', [
    {
      theme: 'Rendre compte',
      question: '“Terminé la tarea y revisé la lista” es:',
      options: ['Un compte rendu', 'Une question', 'Un refus de travailler', 'Une poésie imposée'],
      correct: 0,
      explanation: 'Rendre compte d’une tâche fait partie des actes professionnels de terminale.',
    },
    {
      theme: 'Argumenter',
      question: '“Hay que reciclar porque reduce los residuos” da:',
      options: ['Une raison', 'Une heure', 'Un prénom', 'Une capitale'],
      correct: 0,
      explanation: 'Porque introduit une justification, attendue dans l’argumentation simple.',
    },
    {
      theme: 'Vie citoyenne',
      question: '“Votar” significa:',
      options: ['Voter', 'Courir', 'Dormir', 'Effacer'],
      correct: 0,
      explanation: 'Le lexique civique entre dans les situations sociales et citoyennes.',
    },
    {
      theme: 'Interaction',
      question: '“Perdón, no entendí. ¿Puede repetir?” sirve para:',
      options: ['Faire répéter', 'Payer une facture', 'Nommer une capitale', 'Calculer une aire'],
      correct: 0,
      explanation: 'Faire répéter est une stratégie d’interaction du niveau visé en fin de bac pro.',
    },
  ]),
]
