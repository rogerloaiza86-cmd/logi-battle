import { lot } from './lot'

const GT = ['generale', 'technologique']
const PRO = ['professionnelle']

export const francaisQuestions = [
  ...lot('fr-gt-2', GT, 'seconde', 'francais', [
    {
      theme: 'La poésie du Moyen Âge au XVIIIe siècle',
      question: 'En seconde, l’objet d’étude sur la poésie couvre quelle période ?',
      options: [
        'Du Moyen Âge au XVIIIe siècle',
        'Du XIXe siècle au XXIe siècle seulement',
        'Le seul XVIIe siècle',
        'La poésie n’est pas au programme de seconde',
      ],
      correct: 0,
      explanation: 'Le programme de seconde fixe la poésie du Moyen Âge au XVIIIe siècle. La poésie du XIXe au XXIe se traite en première.',
    },
    {
      theme: 'La littérature d’idées et la presse',
      question: 'Quel objet d’étude de seconde associe la littérature d’idées et la presse ?',
      options: [
        'Le théâtre du XVIIe au XXIe siècle',
        'La littérature d’idées et la presse, du XIXe au XXIe siècle',
        'Le roman du Moyen Âge au XVIIIe siècle',
        'La poésie du XIXe siècle seulement',
      ],
      correct: 1,
      explanation: 'En seconde, la littérature d’idées est étudiée avec la presse, du XIXe siècle au XXIe siècle.',
    },
    {
      theme: 'Le roman et le récit',
      question: 'Le roman et le récit, en seconde, portent sur quelle étendue ?',
      options: [
        'Le seul Moyen Âge',
        'Du XVIIIe siècle au XXIe siècle',
        'Du XVIe siècle au XVIIe siècle',
        'Uniquement le roman réaliste du XIXe siècle',
      ],
      correct: 1,
      explanation: 'L’objet d’étude de seconde est « Le roman et le récit du XVIIIe siècle au XXIe siècle ».',
    },
    {
      theme: 'Le théâtre du XVIIe siècle au XXIe siècle',
      question: 'Que demande le programme de seconde pour le théâtre ?',
      options: [
        'De n’étudier que la mise en scène contemporaine, sans texte',
        'D’étudier le théâtre du XVIIe siècle au XXIe siècle',
        'De réserver le théâtre à la classe de terminale',
        'De ne lire que des tragédies antiques',
      ],
      correct: 1,
      explanation: 'Le quatrième objet d’étude de seconde est le théâtre du XVIIe siècle au XXIe siècle.',
    },
  ]),
  ...lot('fr-gt-1', GT, 'premiere', 'francais', [
    {
      theme: 'La poésie du XIXe siècle au XXIe siècle',
      question: 'En première, la poésie au programme commence à quel siècle ?',
      options: [
        'Au Moyen Âge',
        'Au XIXe siècle, jusqu’au XXIe siècle',
        'Au seul XVIIIe siècle',
        'La poésie disparaît en première',
      ],
      correct: 1,
      explanation: 'L’objet d’étude de première est « La poésie du XIXe siècle au XXIe siècle ».',
    },
    {
      theme: 'La littérature d’idées du XVIe siècle au XVIIIe siècle',
      question: 'La littérature d’idées de première couvre quels siècles ?',
      options: [
        'Du XIXe au XXIe siècle',
        'Du XVIe au XVIIIe siècle',
        'Le seul XXIe siècle',
        'Uniquement la presse contemporaine',
      ],
      correct: 1,
      explanation: 'En première, l’objet d’étude est « La littérature d’idées du XVIe siècle au XVIIIe siècle ».',
    },
    {
      theme: 'Le roman et le récit du Moyen Âge au XXIe siècle',
      question: 'Jusqu’où le programme de première étend-il le roman et le récit ?',
      options: [
        'Du Moyen Âge au XXIe siècle',
        'Du seul XIXe siècle',
        'De 1950 à aujourd’hui',
        'Le roman n’est pas un objet d’étude de première',
      ],
      correct: 0,
      explanation: 'En première, le roman et le récit vont du Moyen Âge au XXIe siècle.',
    },
    {
      theme: 'Épreuves anticipées de français',
      question: 'À l’écrit des épreuves anticipées, le bac général propose le choix entre :',
      options: [
        'Un commentaire ou une dissertation',
        'Un QCM ou une dictée',
        'Une contraction suivie d’un essai, comme en voie technologique',
        'Un oral uniquement',
      ],
      correct: 0,
      explanation: 'En voie générale, l’écrit offre un commentaire ou une dissertation. En voie technologique, le second sujet est une contraction suivie d’un essai.',
    },
  ]),
  ...lot('fr-pro-2', PRO, 'seconde', 'francais', [
    {
      theme: 'Devenir soi : écritures autobiographiques',
      question: 'Quel objet d’étude de seconde professionnelle porte sur l’écriture de soi ?',
      options: [
        'Devenir soi : écritures autobiographiques',
        'Vivre aujourd’hui : l’humanité et la technique',
        'Lire et suivre un personnage',
        'Créer, fabriquer : l’invention et l’imaginaire',
      ],
      correct: 0,
      explanation: '« Devenir soi : écritures autobiographiques » est un des trois objets d’étude de la seconde professionnelle.',
    },
    {
      theme: 'S’informer, informer : les circuits de l’information',
      question: 'L’objet d’étude « S’informer, informer » travaille surtout :',
      options: [
        'Les circuits de l’information',
        'La seule poésie du Moyen Âge',
        'Le calcul de volumes',
        'La carte de l’Afrique australe',
      ],
      correct: 0,
      explanation: 'Le programme nomme cet objet « S’informer, informer : les circuits de l’information ».',
    },
    {
      theme: 'Dire et se faire entendre',
      question: '« Dire et se faire entendre » associe la parole à :',
      options: [
        'La statistique',
        'Le théâtre et l’éloquence',
        'La géométrie dans l’espace',
        'La métropolisation',
      ],
      correct: 1,
      explanation: 'L’intitulé complet est « Dire et se faire entendre : la parole, le théâtre, l’éloquence ».',
    },
    {
      theme: 'Dire, écrire, lire le métier',
      question: 'Quelle perspective accompagne les trois années du français en bac pro ?',
      options: [
        'Dire, écrire, lire le métier',
        'La dissertation de terminale générale',
        'La spécialité mathématiques',
        'L’enseignement scientifique',
      ],
      correct: 0,
      explanation: '« Dire, écrire, lire le métier » relie le français à la co-intervention et au métier, en seconde, première et terminale.',
    },
  ]),
  ...lot('fr-pro-1', PRO, 'premiere', 'francais', [
    {
      theme: 'Créer, fabriquer : l’invention et l’imaginaire',
      question: 'En première professionnelle, quel objet d’étude met la poésie au centre de la création ?',
      options: [
        'Créer, fabriquer : l’invention et l’imaginaire',
        'Devenir soi : écritures autobiographiques',
        'S’informer, informer',
        'Vivre aujourd’hui',
      ],
      correct: 0,
      explanation: 'Cet objet d’étude s’appuie sur un recueil poétique et sur le processus de création.',
    },
    {
      theme: 'Lire et suivre un personnage',
      question: 'Le second objet d’étude de première professionnelle s’intitule :',
      options: [
        'Lire et suivre un personnage : itinéraires romanesques',
        'Le théâtre du XVIIe siècle seulement',
        'La presse du XXIe siècle seulement',
        'Fragilités des démocraties',
      ],
      correct: 0,
      explanation: 'Le programme de première fixe « Lire et suivre un personnage : itinéraires romanesques ».',
    },
    {
      theme: 'Itinéraires romanesques',
      question: 'Suivre un personnage romanesque, c’est d’abord :',
      options: [
        'Compter les pages sans lire',
        'Observer comment le récit construit ce personnage',
        'Remplacer le roman par un tableur',
        'Ignorer le narrateur',
      ],
      correct: 1,
      explanation: 'L’objet d’étude demande de lire le roman en suivant la construction du personnage.',
    },
    {
      theme: 'Dire, écrire, lire le métier',
      question: 'En co-intervention, le français de première sert aussi à :',
      options: [
        'Rédiger une note ou un compte rendu lié au métier',
        'Remplacer l’enseignement professionnel',
        'Supprimer toute lecture littéraire',
        'Préparer uniquement la spécialité mathématiques',
      ],
      correct: 0,
      explanation: 'La perspective « Dire, écrire, lire le métier » relie les écrits professionnels aux lectures de l’année.',
    },
  ]),
  ...lot('fr-pro-t', PRO, 'terminale', 'francais', [
    {
      theme: 'Vivre aujourd’hui',
      question: 'La terminale professionnelle a combien d’objets d’étude en français ?',
      options: [
        'Un seul',
        'Quatre, comme la seconde générale',
        'Aucun',
        'Dix',
      ],
      correct: 0,
      explanation: 'L’année est organisée autour de l’objet unique « Vivre aujourd’hui : l’humanité, le monde, les sciences et la technique ».',
    },
    {
      theme: 'L’humanité, le monde, les sciences et la technique',
      question: 'Que réunit le titre de l’objet d’étude de terminale ?',
      options: [
        'L’humanité, le monde, les sciences et la technique',
        'Uniquement la poésie du Moyen Âge',
        'Uniquement le théâtre du XVIIe siècle',
        'La spécialité physique-chimie',
      ],
      correct: 0,
      explanation: 'C’est l’intitulé officiel de l’objet d’étude de terminale professionnelle.',
    },
    {
      theme: 'Argumenter',
      question: 'En terminale professionnelle, le français insiste sur :',
      options: [
        'L’analyse, la synthèse et l’argumentation',
        'La copie d’un texte sans lecture',
        'Le calcul de dérivées',
        'La carte des océans',
      ],
      correct: 0,
      explanation: 'Le programme concentre le travail de lecture et d’expression sur l’analyse, la synthèse et l’argumentation.',
    },
    {
      theme: 'Deux séquences',
      question: 'Comment le programme organise-t-il le traitement de cet objet ?',
      options: [
        'Autour de deux séquences',
        'En une dictée quotidienne sans lecture',
        'En abandonnant toute œuvre',
        'En le réservant à la voie générale',
      ],
      correct: 0,
      explanation: 'Le traitement s’organise autour de deux séquences, dont l’une s’appuie sur une œuvre ou une partie d’œuvre.',
    },
  ]),
]
