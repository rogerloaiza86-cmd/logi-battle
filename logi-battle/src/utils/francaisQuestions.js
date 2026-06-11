/**
 * Banque Français — grammaire, orthographe, conjugaison, vocabulaire, littérature
 * Niveau lycée professionnel
 */

export const francaisQuestions = [
  {
    id: 'fr_001',
    question: "Quelle est la bonne orthographe ?",
    options: ['Je me suis permise de venir (femme)', 'Je me suis permis de venir (femme)', 'Je me suis permit de venir', 'Je me suis permi de venir'],
    correctOption: 1,
    explanation: "Avec « se permettre », le participe passé reste invariable car le COD (« de venir ») est placé après : « je me suis permis ».",
    category: 'Orthographe',
    difficulty: 3
  },
  {
    id: 'fr_002',
    question: "Quel est le pluriel de « un chou » ?",
    options: ['Des chous', 'Des choux', 'Des chouxs', 'Des choues'],
    correctOption: 1,
    explanation: "Bijou, caillou, chou, genou, hibou, joujou, pou prennent un X au pluriel.",
    category: 'Orthographe',
    difficulty: 1
  },
  {
    id: 'fr_003',
    question: "« Les colis que j'ai ____ sont arrivés. » Quelle forme est correcte ?",
    options: ['envoyé', 'envoyés', 'envoyée', 'envoyer'],
    correctOption: 1,
    explanation: "Le participe passé avec « avoir » s'accorde avec le COD placé avant : « que » (= les colis) → envoyés.",
    category: 'Grammaire',
    difficulty: 2
  },
  {
    id: 'fr_004',
    question: "Quelle phrase est correcte ?",
    options: ["Si j'aurais su, je serais venu", "Si j'avais su, je serais venu", "Si j'avais su, je venais", "Si je saurais, je viendrais"],
    correctOption: 1,
    explanation: "Après « si », jamais de conditionnel : « si j'avais su » (plus-que-parfait) + conditionnel passé dans la principale.",
    category: 'Conjugaison',
    difficulty: 2
  },
  {
    id: 'fr_005',
    question: "Que signifie le mot « procrastiner » ?",
    options: ['Travailler très vite', 'Remettre au lendemain', 'Parler en public', 'Critiquer quelqu\'un'],
    correctOption: 1,
    explanation: "Procrastiner = remettre systématiquement les choses à plus tard (du latin cras, « demain »).",
    category: 'Vocabulaire',
    difficulty: 1
  },
  {
    id: 'fr_006',
    question: "Quel est le synonyme de « éphémère » ?",
    options: ['Éternel', 'Passager', 'Solide', 'Rapide'],
    correctOption: 1,
    explanation: "Éphémère = qui dure très peu de temps, passager. Son contraire est durable ou éternel.",
    category: 'Vocabulaire',
    difficulty: 1
  },
  {
    id: 'fr_007',
    question: "Qui a écrit « Les Misérables » ?",
    options: ['Émile Zola', 'Victor Hugo', 'Gustave Flaubert', 'Honoré de Balzac'],
    correctOption: 1,
    explanation: "Victor Hugo a publié Les Misérables en 1862, roman majeur du XIXe siècle (Jean Valjean, Cosette, Gavroche).",
    category: 'Littérature',
    difficulty: 1
  },
  {
    id: 'fr_008',
    question: "Quelle figure de style dans « Cette obscure clarté qui tombe des étoiles » ?",
    options: ['Une métaphore', 'Un oxymore', 'Une hyperbole', 'Une litote'],
    correctOption: 1,
    explanation: "L'oxymore associe deux mots contradictoires : « obscure » et « clarté » (Corneille, Le Cid).",
    category: 'Littérature',
    difficulty: 2
  },
  {
    id: 'fr_009',
    question: "Conjuguez : « Il faut que tu ____ à l'heure. »",
    options: ['es', 'est', 'sois', 'soit'],
    correctOption: 2,
    explanation: "« Il faut que » entraîne le subjonctif : que tu sois. « Soit » correspond à il/elle.",
    category: 'Conjugaison',
    difficulty: 2
  },
  {
    id: 'fr_010',
    question: "Quelle est la nature du mot « rapidement » ?",
    options: ['Un adjectif', 'Un adverbe', 'Un nom commun', 'Une préposition'],
    correctOption: 1,
    explanation: "Les mots en -ment formés sur un adjectif (rapide → rapidement) sont des adverbes : ils modifient un verbe.",
    category: 'Grammaire',
    difficulty: 1
  },
  {
    id: 'fr_011',
    question: "Quelle phrase ne contient PAS de faute ?",
    options: ['Ils se sont lavés les mains', 'Ils se sont lavé les mains', 'Ils se sont laver les mains', 'Ils se s\'ont lavé les mains'],
    correctOption: 1,
    explanation: "Le COD « les mains » est placé après le verbe : le participe reste invariable → « ils se sont lavé les mains ».",
    category: 'Orthographe',
    difficulty: 3
  },
  {
    id: 'fr_012',
    question: "Que signifie l'expression « avoir le compas dans l'œil » ?",
    options: ['Être myope', 'Estimer les distances avec précision', 'Être en colère', 'Voir double'],
    correctOption: 1,
    explanation: "Avoir le compas dans l'œil = savoir évaluer des mesures ou distances à vue d'œil, sans instrument.",
    category: 'Expressions',
    difficulty: 1
  },
  {
    id: 'fr_013',
    question: "Dans une lettre de motivation, quelle formule de politesse est appropriée ?",
    options: ['Salut, à bientôt !', 'Veuillez agréer mes salutations distinguées', 'Bisous', 'Cordialement bien à vous merci'],
    correctOption: 1,
    explanation: "« Veuillez agréer, Madame, Monsieur, mes salutations distinguées » est la formule professionnelle standard.",
    category: 'Communication',
    difficulty: 1
  },
  {
    id: 'fr_014',
    question: "Quel est le contraire de « bénéfique » ?",
    options: ['Profitable', 'Néfaste', 'Magnifique', 'Pacifique'],
    correctOption: 1,
    explanation: "Néfaste = qui cause du tort, nuisible. C'est l'antonyme de bénéfique (qui fait du bien).",
    category: 'Vocabulaire',
    difficulty: 1
  },
  {
    id: 'fr_015',
    question: "« Quoique » ou « quoi que » : « ____ tu fasses, préviens-moi. »",
    options: ['Quoique', 'Quoi que', 'Les deux sont possibles', 'Aucun des deux'],
    correctOption: 1,
    explanation: "« Quoi que » (en deux mots) = quelle que soit la chose que. « Quoique » (en un mot) = bien que.",
    category: 'Orthographe',
    difficulty: 3
  },
  {
    id: 'fr_016',
    question: "Quel registre de langue : « Ce film était vachement chouette » ?",
    options: ['Soutenu', 'Courant', 'Familier', 'Littéraire'],
    correctOption: 2,
    explanation: "« Vachement » et « chouette » relèvent du registre familier, à éviter dans un écrit professionnel.",
    category: 'Communication',
    difficulty: 1
  },
  {
    id: 'fr_017',
    question: "Qui a écrit « L'Étranger » (1942) ?",
    options: ['Jean-Paul Sartre', 'Albert Camus', 'Marcel Proust', 'André Malraux'],
    correctOption: 1,
    explanation: "Albert Camus, prix Nobel de littérature 1957, a écrit L'Étranger, dont le héros est Meursault.",
    category: 'Littérature',
    difficulty: 2
  },
  {
    id: 'fr_018',
    question: "Comment s'accorde « tout » dans « Elles sont ____ contentes » ?",
    options: ['tout', 'toute', 'toutes', 'touts'],
    correctOption: 2,
    explanation: "Devant un adjectif féminin commençant par une consonne, « tout » adverbe s'accorde : toutes contentes.",
    category: 'Grammaire',
    difficulty: 3
  },
  {
    id: 'fr_019',
    question: "Quelle est la bonne orthographe ?",
    options: ['Un dilemne', 'Un dilemme', 'Un dilème', 'Un dillemme'],
    correctOption: 1,
    explanation: "Dilemme s'écrit avec deux M (et non « dilemne », erreur fréquente) : choix difficile entre deux options.",
    category: 'Orthographe',
    difficulty: 2
  },
  {
    id: 'fr_020',
    question: "Dans « Le chauffeur livre la marchandise », quelle est la fonction de « la marchandise » ?",
    options: ['Sujet', 'COD', 'COI', 'Complément circonstanciel'],
    correctOption: 1,
    explanation: "« La marchandise » répond à la question « livre quoi ? » : c'est le complément d'objet direct (COD).",
    category: 'Grammaire',
    difficulty: 1
  },
  {
    id: 'fr_021',
    question: "Que signifie « un argument fallacieux » ?",
    options: ['Un argument convaincant', 'Un argument trompeur', 'Un argument scientifique', 'Un argument répété'],
    correctOption: 1,
    explanation: "Fallacieux = trompeur, destiné à induire en erreur. Utile à repérer dans un débat ou une publicité.",
    category: 'Vocabulaire',
    difficulty: 2
  },
  {
    id: 'fr_022',
    question: "« Davantage » ou « d'avantage » : « Il veut gagner ____ d'argent. »",
    options: ["d'avantage", 'davantage', 'Les deux', "d'avantages"],
    correctOption: 1,
    explanation: "« Davantage » (en un mot) = plus. « D'avantage » (en deux mots) = de bénéfice : « il n'y a pas d'avantage à... ».",
    category: 'Orthographe',
    difficulty: 2
  },
]

export const getFrancaisQuestion = () =>
  francaisQuestions[Math.floor(Math.random() * francaisQuestions.length)]
