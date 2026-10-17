import { lot } from './lot'

const GT = ['generale', 'technologique']
const GEN = ['generale']
const TEC = ['technologique']
const PRO = ['professionnelle']

export const geographieQuestions = [
  ...lot('ge-gt-2', GT, 'seconde', 'geographie', [
    {
      theme: 'Sociétés et environnements',
      question: 'Le premier thème de géographie de seconde interroge :',
      options: [
        'Les sociétés et les environnements, des équilibres fragiles',
        'La seule Révolution française',
        'La dérivée d’une fonction',
        'Le théâtre du XVIIe siècle',
      ],
      correct: 0,
      explanation: 'Le thème 1 est « Sociétés et environnements : des équilibres fragiles ».',
    },
    {
      theme: 'Territoires, populations et développement',
      question: 'Le thème 2 relie les territoires :',
      options: ['Aux populations et au développement', 'À la seule poésie', 'Aux suites géométriques', 'À l’éloquence'],
      correct: 0,
      explanation: 'Son titre est « Territoires, populations et développement : quels défis ? ».',
    },
    {
      theme: 'Des mobilités généralisées',
      question: 'En seconde, les mobilités sont étudiées comme :',
      options: ['Généralisées', 'Inexistantes', 'Limitées au XVIe siècle', 'Réservées aux océans de terminale'],
      correct: 0,
      explanation: 'Le thème 3 s’intitule « Des mobilités généralisées ».',
    },
    {
      theme: 'L’Afrique australe',
      question: 'Le thème conclusif de géographie de seconde porte sur :',
      options: ['L’Afrique australe', 'La Lune', 'La Méditerranée antique', 'Le Royaume-Uni seulement'],
      correct: 0,
      explanation: 'Le thème 4 est « L’Afrique australe : un espace en profonde mutation ».',
    },
  ]),
  ...lot('ge-gen-1', GEN, 'premiere', 'geographie', [
    {
      theme: 'La métropolisation',
      question: 'La métropolisation désigne :',
      options: [
        'La concentration des populations et des fonctions dans les grandes villes',
        'La disparition de toutes les villes',
        'Le seul exode rural du XIXe siècle',
        'La fonte des glaces',
      ],
      correct: 0,
      explanation: 'Le thème 1 de première générale est « La métropolisation : un processus mondial différencié ».',
    },
    {
      theme: 'Espaces productifs',
      question: 'Le thème 2 étudie :',
      options: [
        'La diversification des espaces et des acteurs de la production',
        'Uniquement les océans',
        'Uniquement la poésie',
        'La Révolution de 1789',
      ],
      correct: 0,
      explanation: 'C’est le titre du thème 2, dans « Les dynamiques d’un monde en recomposition ».',
    },
    {
      theme: 'Espaces ruraux',
      question: 'Le thème 3 pose la question des espaces ruraux en termes de :',
      options: ['Multifonctionnalité ou fragmentation', 'Superficie lunaire', 'Seule industrie lourde', 'Absence d’agriculture'],
      correct: 0,
      explanation: 'Le titre est « Les espaces ruraux : multifonctionnalité ou fragmentation ? ».',
    },
    {
      theme: 'La Chine',
      question: 'Le thème conclusif de première générale est consacré :',
      options: ['À la Chine', 'À l’Antarctique seul', 'À Athènes', 'Au calcul de TVA'],
      correct: 0,
      explanation: 'Le thème conclusif est « La Chine : des recompositions spatiales multiples ».',
    },
  ]),
  ...lot('ge-gen-t', GEN, 'terminale', 'geographie', [
    {
      theme: 'Mers et océans',
      question: 'En terminale générale, les mers et océans sont étudiés comme :',
      options: [
        'Au cœur de la mondialisation',
        'Sans aucun rôle économique',
        'Un thème de seconde seulement',
        'Un chapitre de français',
      ],
      correct: 0,
      explanation: 'Le thème 1 est « Mers et océans : au cœur de la mondialisation ».',
    },
    {
      theme: 'Dynamiques territoriales',
      question: 'Le thème 2 associe les dynamiques territoriales :',
      options: [
        'Aux coopérations et aux tensions dans la mondialisation',
        'À la seule poésie lyrique',
        'Au théorème de Pythagore',
        'À la Révolution de 1789',
      ],
      correct: 0,
      explanation: 'C’est le titre du thème 2 du programme de terminale générale.',
    },
    {
      theme: 'L’Union européenne',
      question: 'Le thème 3 place l’Union européenne :',
      options: [
        'Dans la mondialisation',
        'Hors de tout échange',
        'Au XVe siècle',
        'Dans le programme de seconde professionnelle',
      ],
      correct: 0,
      explanation: 'Le thème 3 est « L’Union européenne dans la mondialisation : des dynamiques complexes ».',
    },
    {
      theme: 'La France et ses régions',
      question: 'Le thème conclusif étudie :',
      options: [
        'La France et ses régions dans l’Union européenne et dans la mondialisation',
        'Uniquement l’Afrique australe',
        'Uniquement Athènes',
        'La suite arithmétique',
      ],
      correct: 0,
      explanation: 'C’est le thème conclusif du programme de géographie de terminale générale.',
    },
  ]),
  ...lot('ge-tec-1', TEC, 'premiere', 'geographie', [
    {
      theme: 'Les dynamiques d’un monde en recomposition',
      question: 'Le programme de géographie de première technologique s’intitule :',
      options: [
        'Les dynamiques d’un monde en recomposition',
        'Mers et océans au cœur de la mondialisation',
        'L’Afrique australe seulement',
        'La France de 1789',
      ],
      correct: 0,
      explanation: 'C’est le titre publié pour la première technologique.',
    },
    {
      theme: 'Recomposition',
      question: 'Une recomposition territoriale désigne :',
      options: [
        'Un changement de l’organisation d’un espace',
        'Une carte qui ne change jamais',
        'Un calcul de dérivée',
        'Une pièce de théâtre',
      ],
      correct: 0,
      explanation: 'Le programme demande de lire comment les espaces se réorganisent.',
    },
    {
      theme: 'Métropolisation',
      question: 'La métropolisation est un processus :',
      options: [
        'De concentration dans les grandes villes',
        'De disparition des villes',
        'Réservé au XVIe siècle',
        'Sans lien avec la population',
      ],
      correct: 0,
      explanation: 'Elle fait partie des dynamiques de recomposition du monde contemporain.',
    },
    {
      theme: 'Acteurs',
      question: 'Ces recompositions mettent en jeu :',
      options: [
        'Des acteurs et des territoires à plusieurs échelles',
        'Un seul individu sans espace',
        'Uniquement des dates de batailles',
        'Uniquement des formules',
      ],
      correct: 0,
      explanation: 'Le programme de première technologique lit les dynamiques spatiales à différentes échelles.',
    },
  ]),
  ...lot('ge-tec-t', TEC, 'terminale', 'geographie', [
    {
      theme: 'Une mise en relation inégale des territoires',
      question: 'Le programme de géographie de terminale technologique présente la mondialisation comme :',
      options: [
        'Une mise en relation inégale des territoires',
        'Une égalité parfaite de tous les lieux',
        'Un phénomène achevé en 1492',
        'Un sujet hors programme',
      ],
      correct: 0,
      explanation: 'Le titre officiel est « La mondialisation : une mise en relation inégale des territoires ».',
    },
    {
      theme: 'Inégalités',
      question: 'Dire que la mise en relation est inégale signifie que :',
      options: [
        'Tous les territoires ne profitent pas de la même façon des échanges',
        'Tous les territoires ont le même poids',
        'Il n’existe plus de frontières',
        'Les échanges ont disparu',
      ],
      correct: 0,
      explanation: 'Le programme insiste sur les écarts entre territoires dans la mondialisation.',
    },
    {
      theme: 'Flux',
      question: 'La mondialisation repose notamment sur des flux :',
      options: ['De marchandises, de capitaux et d’informations', 'Uniquement de poésie', 'Uniquement de dates', 'Sans transport'],
      correct: 0,
      explanation: 'Relier des territoires suppose des flux matériels et immatériels.',
    },
    {
      theme: 'Territoires',
      question: 'Dans ce programme, l’objet géographique central reste :',
      options: ['Le territoire', 'La dérivée', 'Le sonnet', 'La probabilité conditionnelle'],
      correct: 0,
      explanation: 'Le titre place les territoires au centre de la question.',
    },
  ]),
  ...lot('ge-pro-2', PRO, 'seconde', 'geographie', [
    {
      theme: 'Réseaux de production et d’échanges',
      question: 'Le premier thème de géographie de seconde professionnelle porte sur :',
      options: [
        'Des réseaux de production et d’échanges mondialisés',
        'La Révolution française',
        'Le compagnonnage seulement',
        'La fonction exponentielle',
      ],
      correct: 0,
      explanation: 'C’est le premier thème de « Production mondiale et circulation des personnes, des biens et des informations ».',
    },
    {
      theme: 'Circulation des personnes',
      question: 'Le second thème étudie :',
      options: [
        'Une circulation croissante mais diverse des personnes à l’échelle mondiale',
        'L’absence de toute mobilité',
        'Uniquement le théâtre',
        'Uniquement les pourcentages',
      ],
      correct: 0,
      explanation: 'C’est le titre du second thème de géographie de seconde professionnelle.',
    },
    {
      theme: 'Mondialisation',
      question: 'Ces deux thèmes éclairent la mondialisation au :',
      options: ['XXIe siècle', 'XIe siècle', 'Ier siècle', 'Seul XVIe siècle'],
      correct: 0,
      explanation: 'Le programme de seconde professionnelle consacre l’année de géographie à la mondialisation au XXIe siècle.',
    },
    {
      theme: 'Transports',
      question: 'Les circulations de personnes sont favorisées par :',
      options: [
        'L’évolution des transports et le numérique',
        'La disparition de tout réseau',
        'L’absence de routes',
        'Le seul compagnonnage du XIXe siècle',
      ],
      correct: 0,
      explanation: 'Le programme relie ces circulations à l’évolution des transports et à la révolution numérique.',
    },
  ]),
  ...lot('ge-pro-1', PRO, 'premiere', 'geographie', [
    {
      theme: 'Territoire urbain en France',
      question: 'Le premier thème de première professionnelle étudie en France :',
      options: [
        'La métropolisation et la périurbanisation',
        'Uniquement les océans du XVIe siècle',
        'Uniquement Athènes',
        'La suite arithmétique',
      ],
      correct: 0,
      explanation: 'Le thème 1 est « La recomposition du territoire urbain en France : métropolisation et périurbanisation ».',
    },
    {
      theme: 'L’Afrique',
      question: 'Le second thème est consacré :',
      options: [
        'À l’Afrique, un continent en recomposition',
        'À la Lune',
        'À la poésie du Moyen Âge',
        'Au calcul de TVA',
      ],
      correct: 0,
      explanation: 'C’est le titre du thème 2, dans « Recompositions du monde ».',
    },
    {
      theme: 'Périurbanisation',
      question: 'La périurbanisation décrit :',
      options: [
        'L’extension des modes de vie urbains autour des villes',
        'La disparition des villes',
        'Un phénomène marin',
        'Une bataille de 1914',
      ],
      correct: 0,
      explanation: 'Elle est nommée dans le thème sur la recomposition du territoire urbain français.',
    },
    {
      theme: 'Recompositions du monde',
      question: 'Le titre d’ensemble de la géographie de première professionnelle est :',
      options: ['Recompositions du monde', 'France et monde depuis 1945', 'Mers et océans', 'Les Lumières'],
      correct: 0,
      explanation: 'C’est le titre du programme de géographie de première professionnelle.',
    },
  ]),
  ...lot('ge-pro-t', PRO, 'terminale', 'geographie', [
    {
      theme: 'L’accès aux ressources',
      question: 'Le premier thème de terminale professionnelle porte sur l’accès aux ressources pour :',
      options: [
        'Produire, consommer, se loger et se déplacer',
        'Écrire un sonnet',
        'Dériver une fonction',
        'Dater 1789',
      ],
      correct: 0,
      explanation: 'C’est le titre du thème 1, dans « Les hommes face aux changements globaux ».',
    },
    {
      theme: 'Sociétés et risques',
      question: 'Face aux risques, le second thème demande d’étudier comment les sociétés :',
      options: [
        'Anticipent, réagissent, se coordonnent et s’adaptent',
        'Ignorent tout aléa',
        'Suppriment la géographie',
        'Ne cartographient rien',
      ],
      correct: 0,
      explanation: 'Le thème 2 est « Les sociétés et les risques : anticiper, réagir, se coordonner et s’adapter ».',
    },
    {
      theme: 'Changements globaux',
      question: 'Le programme de géographie de terminale professionnelle s’intitule :',
      options: [
        'Les hommes face aux changements globaux',
        'L’expansion du monde connu',
        'La métropolisation de première générale seulement',
        'Le roman du XIXe siècle',
      ],
      correct: 0,
      explanation: 'C’est le titre d’ensemble de l’année.',
    },
    {
      theme: 'Ressources',
      question: 'Produire et se déplacer dépend, dans ce thème :',
      options: [
        'De l’accès aux ressources',
        'D’aucune contrainte',
        'Du seul théâtre',
        'D’une suite géométrique',
      ],
      correct: 0,
      explanation: 'Le thème 1 relie explicitement ressources, production, consommation, logement et déplacement.',
    },
  ]),
]
