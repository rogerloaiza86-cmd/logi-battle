import { lot } from './lot'

const GT = ['generale', 'technologique']
const PRO = ['professionnelle']

export const anglaisQuestions = [
  ...lot('an-gt-2', GT, 'seconde', 'anglais', [
    {
      theme: 'Axe 6 — Les pays du Commonwealth',
      question: 'The Commonwealth is a group of countries mostly linked by:',
      options: [
        'Their historical tie to the United Kingdom',
        'Membership of the European Union only',
        'The same capital city',
        'The Spanish language',
      ],
      correct: 0,
      explanation: 'En seconde, l’axe 6 d’anglais est obligatoire : « Les pays du Commonwealth : héritages, unité, diversité ».',
    },
    {
      theme: 'Sauver la planète, penser les futurs possibles',
      question: 'Which word names energy that can be renewed?',
      options: ['Coal', 'Renewable', 'Plastic', 'Exhausted'],
      correct: 1,
      explanation: 'L’axe « Sauver la planète, penser les futurs possibles » appartient à la thématique de seconde « L’art de vivre ensemble ».',
    },
    {
      theme: 'Le village, le quartier, la ville',
      question: '“I live in a quiet neighbourhood” means:',
      options: [
        'J’habite un quartier calme',
        'Je travaille à l’usine',
        'Je voyage demain',
        'Je n’ai pas d’adresse',
      ],
      correct: 0,
      explanation: 'Le quartier et la ville forment l’un des huit axes de seconde.',
    },
    {
      theme: 'Représentation de soi',
      question: '“She introduced herself” means she:',
      options: ['Said who she was', 'Left the room', 'Closed the book', 'Bought a ticket'],
      correct: 0,
      explanation: 'Se présenter relève de l’axe « Représentation de soi et rapport à autrui ».',
    },
  ]),
  ...lot('an-gt-1', GT, 'premiere', 'anglais', [
    {
      theme: 'Axe 6 — Les aires anglophones américaines',
      question: 'Which city is in the United States?',
      options: ['Chicago', 'Manchester', 'Dublin', 'Ottawa'],
      correct: 0,
      explanation: 'En première, l’axe 6 obligatoire porte sur les aires anglophones américaines. Chicago est aux États-Unis.',
    },
    {
      theme: 'Identités et échanges',
      question: '“Identity” is closest to:',
      options: ['Who a person or a group is', 'A train ticket', 'A maths formula', 'A kitchen tool'],
      correct: 0,
      explanation: '« Identités et échanges » est le premier axe du cycle terminal, « Gestes fondateurs et mondes en mouvement ».',
    },
    {
      theme: 'Citoyenneté et mondes virtuels',
      question: 'A digital footprint is:',
      options: [
        'The trace left by online activity',
        'A shoe size',
        'A paper map',
        'A silent film',
      ],
      correct: 0,
      explanation: 'L’axe « Citoyenneté et mondes virtuels » interroge les usages numériques.',
    },
    {
      theme: 'Diversité et inclusion',
      question: '“Inclusion” means:',
      options: [
        'Making sure people are not left out',
        'Closing a door',
        'Learning a date',
        'Writing a receipt',
      ],
      correct: 0,
      explanation: '« Diversité et inclusion » est un axe du cycle terminal.',
    },
  ]),
  ...lot('an-gt-t', GT, 'terminale', 'anglais', [
    {
      theme: 'Axe 6 — Le Royaume-Uni et ses nations',
      question: 'Which nation is part of the United Kingdom?',
      options: ['Scotland', 'The Republic of Ireland', 'Canada', 'New Zealand'],
      correct: 0,
      explanation: 'En terminale, l’axe 6 obligatoire est « Le Royaume-Uni et ses nations ». L’Écosse en fait partie ; la république d’Irlande n’en fait pas partie.',
    },
    {
      theme: 'Territoire et mémoire',
      question: '“A memorial” is a place or an object that:',
      options: ['Helps people remember', 'Sells food', 'Measures speed', 'Replaces a passport'],
      correct: 0,
      explanation: 'L’axe « Territoire et mémoire » travaille la façon dont un lieu garde une trace du passé.',
    },
    {
      theme: 'Fictions et réalités',
      question: 'A novel is:',
      options: ['A long fictional story', 'A bus ticket', 'A science law', 'A map scale'],
      correct: 0,
      explanation: '« Fictions et réalités » est un axe du cycle terminal.',
    },
    {
      theme: 'Innovations scientifiques et responsabilité',
      question: '“Scientists should consider the consequences” insists on:',
      options: ['Responsibility', 'Silence', 'Forgetfulness', 'Chance only'],
      correct: 0,
      explanation: 'L’axe « Innovations scientifiques et responsabilité » relie la découverte et ses effets.',
    },
  ]),
  ...lot('an-pro-2', PRO, 'seconde', 'anglais', [
    {
      theme: 'Vie quotidienne',
      question: '“What time is it?” asks for:',
      options: ['The time', 'A surname', 'A price', 'A country'],
      correct: 0,
      explanation: 'Demander l’heure relève des situations de la vie quotidienne du programme de langues du bac pro.',
    },
    {
      theme: 'Vie professionnelle',
      question: '“I start work at 8” means:',
      options: ['Je commence à 8 h', 'Je termine à 8 h', 'Je ne travaille pas', 'J’habite au 8'],
      correct: 0,
      explanation: 'Les horaires de travail appartiennent aux situations professionnelles du programme.',
    },
    {
      theme: 'Se présenter',
      question: 'Choose the best introduction:',
      options: [
        'Hello, my name is Léa and I am a student.',
        'Yesterday ocean purple.',
        'Map scale seventeen.',
        'Closed finished never.',
      ],
      correct: 0,
      explanation: 'Se présenter est une tâche prioritaire des situations personnelles et sociales.',
    },
    {
      theme: 'Comprendre une consigne simple',
      question: '“Please wear your helmet” is:',
      options: ['Une consigne de sécurité', 'Une formule de politesse pour partir', 'Une question sur l’heure', 'Un prix'],
      correct: 0,
      explanation: 'Comprendre une consigne courte fait partie des actes de communication du bac pro, niveau visé vers A2-B1.',
    },
  ]),
  ...lot('an-pro-1', PRO, 'premiere', 'anglais', [
    {
      theme: 'Vie professionnelle',
      question: '“The delivery is late” means:',
      options: ['La livraison est en retard', 'La livraison est annulée à vie', 'Le client est le patron', 'Le colis est gratuit'],
      correct: 0,
      explanation: 'Rendre compte d’un aléa professionnel est une situation du programme de première.',
    },
    {
      theme: 'Vie sociale',
      question: '“Could you help me?” is:',
      options: ['Une demande d’aide', 'Un refus', 'Une date historique', 'Un calcul'],
      correct: 0,
      explanation: 'Demander de l’aide poliment relève des actes de la vie sociale.',
    },
    {
      theme: 'Écrire un message court',
      question: 'Which message can confirm a meeting?',
      options: [
        'I will be there at 10.',
        'Blue yesterday never map.',
        'Ocean closed poem.',
        'Seven kings silent.',
      ],
      correct: 0,
      explanation: 'Confirmer un rendez-vous est un écrit court attendu dans la formation.',
    },
    {
      theme: 'Lexique du travail',
      question: 'A customer is:',
      options: ['Un client', 'Un outil', 'Un horaire', 'Un plan'],
      correct: 0,
      explanation: 'Le lexique du travail est travaillé dans les situations professionnelles.',
    },
  ]),
  ...lot('an-pro-t', PRO, 'terminale', 'anglais', [
    {
      theme: 'Rendre compte',
      question: '“I finished the task and checked the list” is:',
      options: ['Un compte rendu d’action', 'Une excuse pour partir', 'Une question', 'Un poème'],
      correct: 0,
      explanation: 'Rendre compte d’une tâche réalisée est un acte professionnel du cycle terminal.',
    },
    {
      theme: 'Argumenter simplement',
      question: '“We should recycle because it reduces waste” gives:',
      options: ['Une raison', 'Une heure', 'Un prénom', 'Une capitale'],
      correct: 0,
      explanation: 'Justifier un choix avec because relève de l’argumentation simple attendue en terminale.',
    },
    {
      theme: 'Vie citoyenne',
      question: '“Vote” means:',
      options: ['Voter', 'Courir', 'Dormir', 'Effacer'],
      correct: 0,
      explanation: 'Le vocabulaire civique entre dans les situations de la vie sociale et citoyenne.',
    },
    {
      theme: 'Interaction',
      question: '“I’m sorry, I didn’t understand. Could you repeat?” is used to:',
      options: ['Faire répéter', 'Refuser un salaire', 'Présenter un théorème', 'Lire une carte muette'],
      correct: 0,
      explanation: 'Faire préciser un message est une stratégie d’interaction du niveau B1 visé en fin de bac pro.',
    },
  ]),
]
