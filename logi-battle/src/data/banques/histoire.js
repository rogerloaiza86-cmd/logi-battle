import { lot } from './lot'

const GT = ['generale', 'technologique']
const GEN = ['generale']
const TEC = ['technologique']
const PRO = ['professionnelle']

export const histoireQuestions = [
  ...lot('hi-gt-2', GT, 'seconde', 'histoire', [
    {
      theme: 'Le monde méditerranéen',
      question: 'Le premier thème d’histoire de seconde porte sur :',
      options: [
        'Le monde méditerranéen, de l’Antiquité au Moyen Âge',
        'La Seconde Guerre mondiale',
        'La construction européenne depuis 1992',
        'La Chine au XXIe siècle',
      ],
      correct: 0,
      explanation: 'Le thème 1 s’intitule « Le monde méditerranéen : empreintes de l’Antiquité et du Moyen Âge ».',
    },
    {
      theme: 'XVe-XVIe siècles',
      question: 'Les XVe et XVIe siècles sont étudiés en seconde comme :',
      options: [
        'Un nouveau rapport au monde et un temps de mutations',
        'La seule guerre de 1914',
        'La Ve République',
        'La décolonisation de 1960',
      ],
      correct: 0,
      explanation: 'Le thème 2 est « XVe-XVIe siècles : un nouveau rapport au monde, un temps de mutations intellectuelles ».',
    },
    {
      theme: 'L’État à l’époque moderne',
      question: 'Le thème sur l’État à l’époque moderne compare surtout :',
      options: ['La France et l’Angleterre', 'La Chine et le Japon', 'Le Brésil et le Canada', 'L’Australie et l’Inde'],
      correct: 0,
      explanation: 'Le thème 3 s’intitule « L’État à l’époque moderne : France et Angleterre ».',
    },
    {
      theme: 'XVIIe et XVIIIe siècles',
      question: 'Les Lumières prennent place dans le thème de seconde consacré :',
      options: [
        'Aux dynamiques et ruptures des sociétés des XVIIe et XVIIIe siècles',
        'À la Première Guerre mondiale',
        'À la métropolisation',
        'Aux mers et océans',
      ],
      correct: 0,
      explanation: 'Le thème 4 étudie les sociétés des XVIIe et XVIIIe siècles, dont les Lumières.',
    },
  ]),
  ...lot('hi-gen-1', GEN, 'premiere', 'histoire', [
    {
      theme: 'L’Europe face aux révolutions',
      question: 'Le programme d’histoire de première générale s’ouvre sur :',
      options: [
        'L’Europe face aux révolutions',
        'La guerre froide',
        'Le monde méditerranéen antique',
        'La Chine des années 1990',
      ],
      correct: 0,
      explanation: 'Le thème 1 est « L’Europe face aux révolutions ». L’étude de la Révolution française ouvre l’année.',
    },
    {
      theme: '1848-1871',
      question: 'La période 1848-1871, en première, sert à étudier :',
      options: [
        'La France dans l’Europe des nationalités',
        'La seule Athènes de Périclès',
        'La décolonisation africaine',
        'Le Brexit',
      ],
      correct: 0,
      explanation: 'Le thème 2 est « La France dans l’Europe des nationalités : politique et société (1848-1871) ».',
    },
    {
      theme: 'La Troisième République avant 1914',
      question: 'Avant 1914, la Troisième République est étudiée comme :',
      options: [
        'Un régime politique et un empire colonial',
        'Un régime qui n’existe pas encore',
        'La monarchie absolue de Louis XIV',
        'L’Union européenne',
      ],
      correct: 0,
      explanation: 'Le thème 3 s’intitule « La Troisième République avant 1914 : un régime politique, un empire colonial ».',
    },
    {
      theme: 'La Première Guerre mondiale',
      question: 'Le programme qualifie la Première Guerre mondiale de :',
      options: [
        '« Suicide de l’Europe » et fin des empires européens',
        'Guerre froide',
        'Révolution de 1789',
        'Ouverture atlantique du XVIe siècle',
      ],
      correct: 0,
      explanation: 'Le thème 4 est « La Première Guerre mondiale : le “suicide de l’Europe” et la fin des empires européens ».',
    },
  ]),
  ...lot('hi-gen-t', GEN, 'terminale', 'histoire', [
    {
      theme: 'Fragilités des démocraties, totalitarismes et Seconde Guerre mondiale',
      question: 'Le premier thème de terminale générale relie :',
      options: [
        'Les fragilités des démocraties, les totalitarismes et la Seconde Guerre mondiale',
        'La Révolution française seule',
        'Le monde méditerranéen antique',
        'La métropolisation',
      ],
      correct: 0,
      explanation: 'C’est le titre du thème 1, dans « Les relations entre les puissances et l’opposition des modèles politiques, des années 1930 à nos jours ».',
    },
    {
      theme: 'Un monde bipolaire',
      question: 'Après 1945, le thème 2 étudie un monde :',
      options: ['Bipolaire', 'Sans aucune puissance', 'Limité à l’Europe de 1815', 'Uniquement maritime'],
      correct: 0,
      explanation: 'Le thème 2 porte sur la multiplication des acteurs internationaux dans un monde bipolaire.',
    },
    {
      theme: 'Les années 1970-1990',
      question: 'Le thème 3 de terminale s’intéresse aux remises en cause :',
      options: [
        'Économiques, politiques et sociales à partir des années 1970',
        'Du seul XVe siècle',
        'De la démocratie athénienne',
        'Des espaces ruraux français uniquement',
      ],
      correct: 0,
      explanation: 'Le thème 3 traite les remises en cause économiques, politiques et sociales des années 1970 aux années 1990.',
    },
    {
      theme: 'Depuis les années 1990',
      question: 'Le dernier thème d’histoire de terminale générale part :',
      options: [
        'Des années 1990, pour le monde, l’Europe et la France',
        'De 1789 seulement',
        'De la Préhistoire',
        'De la guerre de 1870 seulement',
      ],
      correct: 0,
      explanation: 'Le thème 4 est « Le monde, l’Europe et la France depuis les années 1990 ».',
    },
  ]),
  ...lot('hi-tec-1', TEC, 'premiere', 'histoire', [
    {
      theme: 'Construire une nation démocratique',
      question: 'L’histoire de première technologique suit la France :',
      options: [
        'De 1789 aux lendemains de la Première Guerre mondiale',
        'De 1945 à 1960 seulement',
        'Du Moyen Âge au XVe siècle seulement',
        'Depuis les années 1990 seulement',
      ],
      correct: 0,
      explanation: 'Le programme s’intitule « Construire une nation démocratique… : la France de 1789 aux lendemains de la Première Guerre mondiale ».',
    },
    {
      theme: '1789',
      question: '1789 marque, dans ce programme :',
      options: [
        'Le début de la Révolution française',
        'La fin de la Seconde Guerre mondiale',
        'La création de l’euro',
        'La chute du mur de Berlin',
      ],
      correct: 0,
      explanation: 'Le bornage du programme part de 1789, début de la Révolution française.',
    },
    {
      theme: 'Nation démocratique',
      question: 'La question politique centrale de l’année est :',
      options: [
        'La construction d’une nation démocratique',
        'La conquête de l’Amérique au XVIe siècle',
        'La carte de l’Afrique australe',
        'Le calcul d’une fonction',
      ],
      correct: 0,
      explanation: 'Le titre du programme de première technologique place la nation démocratique au centre.',
    },
    {
      theme: 'Première Guerre mondiale',
      question: 'Le programme de première technologique va jusqu’aux lendemains de :',
      options: [
        'La Première Guerre mondiale',
        'La guerre de Cent Ans',
        'La guerre froide',
        'La Révolution de 1848 seulement',
      ],
      correct: 0,
      explanation: 'La période officielle s’achève aux lendemains de la Première Guerre mondiale.',
    },
  ]),
  ...lot('hi-tec-t', TEC, 'terminale', 'histoire', [
    {
      theme: 'Totalitarismes, guerres et démocratie',
      question: 'Le programme d’histoire de terminale technologique s’intitule :',
      options: [
        'Totalitarismes, guerres et démocratie, des années 1920 à nos jours',
        'Le monde méditerranéen antique',
        'La France de Louis XIV seulement',
        'Les grandes découvertes du XVIe siècle',
      ],
      correct: 0,
      explanation: 'C’est le titre publié pour la terminale technologique.',
    },
    {
      theme: 'Années 1920',
      question: 'Ce programme commence :',
      options: ['Dans les années 1920', 'En 1789', 'En 1492', 'En l’an 800'],
      correct: 0,
      explanation: 'Le bornage officiel part des années 1920.',
    },
    {
      theme: 'Totalitarismes',
      question: 'Un régime totalitaire se caractérise par :',
      options: [
        'Une emprise du pouvoir sur la société, hors du pluralisme démocratique',
        'Le respect du pluralisme des partis',
        'L’absence de tout État',
        'Une monarchie élective du Moyen Âge',
      ],
      correct: 0,
      explanation: 'Le thème oppose totalitarismes et démocratie sur la période qui va des années 1920 à nos jours.',
    },
    {
      theme: 'Démocratie',
      question: 'À côté des guerres et des totalitarismes, le programme étudie aussi :',
      options: ['La démocratie', 'Uniquement la géométrie', 'Uniquement la poésie', 'La seule Préhistoire'],
      correct: 0,
      explanation: 'Le titre relie totalitarismes, guerres et démocratie.',
    },
  ]),
  ...lot('hi-pro-2', PRO, 'seconde', 'histoire', [
    {
      theme: 'L’expansion du monde connu',
      question: 'En seconde professionnelle, « L’expansion du monde connu » couvre :',
      options: ['Du XVe au XVIIIe siècle', 'De 1914 à 1918', 'De 1945 à 1962', 'Les années 1990 seulement'],
      correct: 0,
      explanation: 'Le thème étudie la mise en relation des parties du monde entre le XVe et le XVIIIe siècle.',
    },
    {
      theme: 'L’Amérique et l’Europe en révolution',
      question: 'Le thème des révolutions en seconde professionnelle va :',
      options: ['Des années 1760 à 1804', 'De 1914 à 1945', 'De 1947 à 1991', 'Du Moyen Âge au XVe siècle'],
      correct: 0,
      explanation: 'Le thème s’intitule « L’Amérique et l’Europe en révolution, des années 1760 à 1804 ».',
    },
    {
      theme: 'Métiers et compagnonnage',
      question: 'Le dernier thème d’histoire de seconde professionnelle porte sur :',
      options: [
        'Les métiers, les compagnons, le compagnonnage et le chef-d’œuvre au XIXe siècle',
        'La guerre froide',
        'La Ve République',
        'Les mers et les océans',
      ],
      correct: 0,
      explanation: 'C’est le troisième thème du programme de seconde professionnelle.',
    },
    {
      theme: 'Circulations',
      question: 'L’ensemble des deux premiers thèmes éclaire surtout :',
      options: [
        'Les circulations, les colonisations et les révolutions',
        'La seule statistique',
        'Le théâtre du XVIIe siècle',
        'La loi binomiale',
      ],
      correct: 0,
      explanation: 'Éduscol regroupe ces thèmes sous « Circulations, colonisations et révolutions (XVe-XVIIIe siècle) ».',
    },
  ]),
  ...lot('hi-pro-1', PRO, 'premiere', 'histoire', [
    {
      theme: 'Hommes et femmes au travail',
      question: 'Le premier thème d’histoire de première professionnelle étudie le travail :',
      options: [
        'En métropole et dans les colonies françaises, du XIXe siècle au début du XXe',
        'Uniquement au Moyen Âge',
        'Uniquement après 1989',
        'Dans la seule Athènes antique',
      ],
      correct: 0,
      explanation: 'Le thème 1 est « Hommes et femmes au travail en métropole et dans les colonies françaises ».',
    },
    {
      theme: 'Guerres totales',
      question: 'Le second thème couvre les guerres de :',
      options: ['1914 à 1945', '1789 à 1799', '1492 à 1550', '1962 à 1969'],
      correct: 0,
      explanation: 'Il s’intitule « Guerres européennes, guerres mondiales, guerres totales (1914-1945) ».',
    },
    {
      theme: 'États et sociétés en mutations',
      question: 'Le titre d’ensemble du programme d’histoire de première est :',
      options: [
        'États et sociétés en mutations, du XIXe siècle à la première moitié du XXe',
        'La France depuis 1990 seulement',
        'Le monde antique',
        'La mondialisation des échanges au XXIe siècle',
      ],
      correct: 0,
      explanation: 'C’est le titre du programme d’histoire de première professionnelle.',
    },
    {
      theme: '1914-1945',
      question: '1914 et 1945 bornent, dans ce programme :',
      options: [
        'Deux guerres mondiales',
        'La Révolution française',
        'Le compagnonnage du XIXe siècle',
        'L’expansion maritime du XVIe siècle',
      ],
      correct: 0,
      explanation: 'Le thème 2 relie la Première et la Seconde Guerre mondiale entre 1914 et 1945.',
    },
  ]),
  ...lot('hi-pro-t', PRO, 'terminale', 'histoire', [
    {
      theme: 'Le jeu des puissances depuis 1945',
      question: 'Le premier thème de terminale professionnelle part de :',
      options: ['1945', '1789', '1492', '1914 seulement'],
      correct: 0,
      explanation: 'Le thème 1 est « Le jeu des puissances dans les relations internationales depuis 1945 ».',
    },
    {
      theme: 'Vivre en France en démocratie depuis 1945',
      question: 'Le second thème d’histoire étudie :',
      options: [
        'La vie en France en démocratie depuis 1945',
        'La monarchie absolue',
        'Les Lumières seulement',
        'La Méditerranée antique',
      ],
      correct: 0,
      explanation: 'C’est le titre du thème 2 du programme « France et monde depuis 1945 ».',
    },
    {
      theme: 'France et monde depuis 1945',
      question: 'Le programme d’histoire de terminale professionnelle s’intitule :',
      options: [
        'France et monde depuis 1945',
        'L’expansion du monde connu',
        '1848-1871',
        'Le compagnonnage au XIXe siècle',
      ],
      correct: 0,
      explanation: 'C’est le titre d’ensemble publié pour la terminale professionnelle.',
    },
    {
      theme: 'Démocratie',
      question: '« Vivre en démocratie » implique, dans ce thème, de comprendre :',
      options: [
        'Les institutions et la vie politique de la France depuis 1945',
        'Uniquement le calcul d’un pourcentage',
        'Uniquement la poésie du Moyen Âge',
        'La carte des vents',
      ],
      correct: 0,
      explanation: 'Le thème relie l’expérience démocratique française à la période ouverte en 1945.',
    },
  ]),
]
