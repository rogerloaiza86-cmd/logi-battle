import { lot } from './lot'

const GT = ['generale', 'technologique']
const GEN = ['generale']
const TEC = ['technologique']
const PRO = ['professionnelle']

export const mathematiquesQuestions = [
  ...lot('ma-gt-2', GT, 'seconde', 'mathematiques', [
    {
      theme: 'Fonctions',
      question: 'Si f(x) = 2x + 1, que vaut f(3) ?',
      options: ['5', '6', '7', '9'],
      correct: 2,
      explanation: 'f(3) = 2 × 3 + 1 = 7. Les fonctions affines font partie du programme de seconde.',
    },
    {
      theme: 'Nombres et calculs',
      question: 'Un prix de 50 € augmente de 20 %. Quel est le nouveau prix ?',
      options: ['60 €', '70 €', '52 €', '100 €'],
      correct: 0,
      explanation: '20 % de 50 € font 10 €. Le nouveau prix est 60 €.',
    },
    {
      theme: 'Statistiques',
      question: 'Dans la série 2, 5, 5, 9, la médiane est :',
      options: ['2', '5', '9', '5,25'],
      correct: 1,
      explanation: 'La série est déjà ordonnée et compte quatre valeurs. La médiane est la moyenne des deux valeurs centrales, ici 5.',
    },
    {
      theme: 'Géométrie',
      question: 'Un triangle a des côtés de 3 cm, 4 cm et 5 cm. Il est :',
      options: ['Rectangle', 'Équilatéral', 'Sans angle droit', 'Impossible à tracer'],
      correct: 0,
      explanation: '3² + 4² = 9 + 16 = 25 = 5². Le triangle est rectangle, réciproque du théorème de Pythagore.',
    },
  ]),
  ...lot('ma-gen-1', GEN, 'premiere', 'mathematiques', [
    {
      theme: 'Suites',
      question: 'La suite définie par u(n) = 3 + 2n est :',
      options: ['Arithmétique de raison 2', 'Géométrique de raison 3', 'Constante', 'De raison −2'],
      correct: 0,
      explanation: 'On ajoute 2 à chaque rang. C’est une suite arithmétique de raison 2 et de premier terme u(0) = 3.',
    },
    {
      theme: 'Dérivation',
      question: 'La dérivée de f(x) = x² est :',
      options: ['x', '2x', 'x³', '2'],
      correct: 1,
      explanation: 'La dérivée de x² est 2x. La dérivation est au programme de la spécialité de première.',
    },
    {
      theme: 'Second degré',
      question: 'Les solutions de x² − 5x + 6 = 0 sont :',
      options: ['2 et 3', '1 et 6', '−2 et −3', '5 et 6'],
      correct: 0,
      explanation: '(x − 2)(x − 3) = x² − 5x + 6. Les racines sont 2 et 3.',
    },
    {
      theme: 'Probabilités conditionnelles',
      question: 'P(A sachant B) se note :',
      options: ['P(A) + P(B)', 'P_B(A)', 'P(A) × P(B) seulement si A et B sont liés', 'P(A ∪ B)'],
      correct: 1,
      explanation: 'La probabilité de A sachant B se note P_B(A). Elle est au programme de spécialité de première.',
    },
  ]),
  ...lot('ma-gen-t', GEN, 'terminale', 'mathematiques', [
    {
      theme: 'Limites',
      question: 'Quand x devient très grand, 1/x se rapproche de :',
      options: ['0', '1', 'l’infini', '−1'],
      correct: 0,
      explanation: 'La limite de 1/x en +∞ est 0. Les limites sont au programme de spécialité de terminale.',
    },
    {
      theme: 'Fonction exponentielle',
      question: 'La dérivée de exp(x) est :',
      options: ['exp(x)', 'x · exp(x)', '1/x', 'ln(x)'],
      correct: 0,
      explanation: 'La fonction exponentielle est égale à sa dérivée.',
    },
    {
      theme: 'Loi binomiale',
      question: 'Une loi binomiale compte le nombre de succès dans :',
      options: [
        'n épreuves indépendantes à deux issues',
        'une seule épreuve sans hasard',
        'une suite arithmétique',
        'un triangle rectangle',
      ],
      correct: 0,
      explanation: 'Le schéma binomial répète n fois, indépendamment, une épreuve à deux issues.',
    },
    {
      theme: 'Fonction exponentielle',
      question: 'exp(0) vaut :',
      options: ['0', '1', 'e', '−1'],
      correct: 1,
      explanation: 'Par définition, exp(0) = 1.',
    },
  ]),
  ...lot('ma-tec-1', TEC, 'premiere', 'mathematiques', [
    {
      theme: 'Analyse',
      question: 'La dérivée de f(x) = 3x² est :',
      options: ['3x', '6x', 'x³', '6'],
      correct: 1,
      explanation: 'La dérivée de 3x² est 6x. L’analyse sert, en première technologique, à étudier des évolutions.',
    },
    {
      theme: 'Suites',
      question: 'Une suite arithmétique de premier terme 10 et de raison 4 a pour terme suivant :',
      options: ['14', '40', '6', '4'],
      correct: 0,
      explanation: 'On ajoute la raison : 10 + 4 = 14.',
    },
    {
      theme: 'Statistiques',
      question: 'Dans un groupe de 25 élèves, 10 ont choisi l’espagnol. La fréquence est :',
      options: ['0,1', '0,4', '2,5', '15'],
      correct: 1,
      explanation: '10 / 25 = 0,4. Les statistiques et probabilités forment une partie du programme.',
    },
    {
      theme: 'Pourcentages',
      question: 'Une grandeur passe de 80 à 100. Le taux d’évolution est :',
      options: ['+20 %', '+25 %', '+80 %', '−20 %'],
      correct: 1,
      explanation: 'La variation est 20 sur une valeur de départ 80, soit 20/80 = 0,25, donc +25 %.',
    },
  ]),
  ...lot('ma-tec-t', TEC, 'terminale', 'mathematiques', [
    {
      theme: 'Analyse',
      question: 'La fonction exp est :',
      options: ['Croissante sur les réels', 'Décroissante sur les réels', 'Constante', 'Négative pour tout x'],
      correct: 0,
      explanation: 'L’exponentielle est strictement croissante. Elle est au programme d’analyse de terminale technologique.',
    },
    {
      theme: 'Statistiques et probabilités',
      question: 'Une probabilité est un nombre :',
      options: ['Entre 0 et 1', 'Toujours supérieur à 1', 'Toujours négatif', 'Égal au taux d’évolution'],
      correct: 0,
      explanation: 'Une probabilité est comprise entre 0 et 1. Ce repère sert toute l’année de probabilités.',
    },
    {
      theme: 'Taux d’évolution',
      question: 'Un stock de 200 baisse de 10 %. Il reste :',
      options: ['190', '180', '20', '210'],
      correct: 1,
      explanation: '10 % de 200 font 20. Il reste 200 − 20 = 180.',
    },
    {
      theme: 'Information chiffrée',
      question: 'Passer de l’indice 100 à l’indice 130 signifie une hausse de :',
      options: ['30 %', '130 %', '13 %', '3 %'],
      correct: 0,
      explanation: 'L’indice 100 est la base. 130 correspond à une hausse de 30 %.',
    },
  ]),
  ...lot('ma-pro-2', PRO, 'seconde', 'mathematiques', [
    {
      theme: 'Pourcentages',
      question: 'Sur 40 colis, 10 sont fragiles. Quelle est la proportion de colis fragiles ?',
      options: ['1/4', '1/2', '1/10', '4'],
      correct: 0,
      explanation: '10/40 = 1/4. Proportionnalité et pourcentages sont travaillés en seconde professionnelle.',
    },
    {
      theme: 'Statistiques',
      question: 'Les notes 8, 10 et 12 ont pour moyenne :',
      options: ['10', '12', '8', '30'],
      correct: 0,
      explanation: '(8 + 10 + 12) / 3 = 10.',
    },
    {
      theme: 'Géométrie',
      question: 'Un rectangle mesure 6 m sur 2 m. Son aire est :',
      options: ['8 m²', '12 m²', '16 m²', '4 m²'],
      correct: 1,
      explanation: 'Aire = longueur × largeur = 6 × 2 = 12 m².',
    },
    {
      theme: 'Algèbre',
      question: 'Si 4x = 20, alors x vaut :',
      options: ['4', '5', '16', '80'],
      correct: 1,
      explanation: 'x = 20 / 4 = 5. Résoudre une équation du premier degré est un attendu de seconde professionnelle.',
    },
  ]),
  ...lot('ma-pro-1', PRO, 'premiere', 'mathematiques', [
    {
      theme: 'Information chiffrée',
      question: 'Une facture de 200 € hors taxes subit une TVA de 20 %. Le montant de la TVA est :',
      options: ['20 €', '40 €', '220 €', '10 €'],
      correct: 1,
      explanation: '20 % de 200 € = 40 €. Le calcul de taxe est un usage direct du taux.',
    },
    {
      theme: 'Fonctions',
      question: 'Si f(x) = 5x, alors f(4) vaut :',
      options: ['9', '20', '45', '1'],
      correct: 1,
      explanation: '5 × 4 = 20. L’image par une fonction linéaire sert à modéliser une situation simple.',
    },
    {
      theme: 'Probabilités',
      question: 'Une probabilité égale à 0 décrit un événement :',
      options: ['Impossible', 'Certain', 'Peu probable mais possible', 'De probabilité 1'],
      correct: 0,
      explanation: 'La probabilité 0 correspond à l’événement impossible, la probabilité 1 à l’événement certain.',
    },
    {
      theme: 'Automatismes',
      question: '30 % de 50, c’est :',
      options: ['15', '80', '3', '150'],
      correct: 0,
      explanation: '30 % = 0,3 et 0,3 × 50 = 15. Les automatismes numériques sont travaillés toute l’année.',
    },
  ]),
  ...lot('ma-pro-t', PRO, 'terminale', 'mathematiques', [
    {
      theme: 'Statistique et probabilités',
      question: 'Deux événements qui ne peuvent pas arriver ensemble sont :',
      options: ['Incompatibles', 'Certains', 'Équiprobables', 'Indépendants par définition'],
      correct: 0,
      explanation: 'Des événements incompatibles n’ont pas d’issue commune. Leur intersection est vide.',
    },
    {
      theme: 'Algèbre – analyse',
      question: 'Une hausse de 10 % suivie d’une baisse de 10 % :',
      options: [
        'Ne ramène pas exactement à la valeur de départ',
        'Ramène toujours à la valeur de départ',
        'Double la valeur',
        'Est impossible à calculer',
      ],
      correct: 0,
      explanation: 'Multiplier par 1,1 puis par 0,9 donne 0,99. On retrouve 99 % de la valeur initiale, pas 100 %.',
    },
    {
      theme: 'Information chiffrée',
      question: 'Un prix passe de 80 € à 100 €. Le taux d’évolution est :',
      options: ['+25 %', '+20 %', '+80 %', '−25 %'],
      correct: 0,
      explanation: '(100 − 80) / 80 = 0,25, soit +25 %.',
    },
    {
      theme: 'Probabilités',
      question: 'Si un événement a une chance sur cinq de se produire, sa probabilité est :',
      options: ['0,2', '0,5', '5', '1,5'],
      correct: 0,
      explanation: '1/5 = 0,2. Ce calcul reste dans le tronc commun, sans le module de trigonométrie réservé au groupement A.',
    },
  ]),
]
