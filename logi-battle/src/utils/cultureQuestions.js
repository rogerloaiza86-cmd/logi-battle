/**
 * Base de données Culture Générale (2015-2025)
 * Questions variées : actualités, sport, cinéma, technologie, sciences, etc.
 */

export const cultureQuestions = [
  // 2025
  {
    question: "Quelle ville a accueilli les Jeux Olympiques d'été 2024 ?",
    answer: 2024,
    type: "annee",
    category: "Sport",
    hint: "Ville française"
  },
  {
    question: "En quelle année Leonardo DiCaprio a-t-il enfin remporté l'Oscar du meilleur acteur ?",
    answer: 2016,
    type: "annee",
    category: "Cinéma",
    hint: "Pour le film The Revenant"
  },
  {
    question: "Quelle année marque le début de la pandémie de COVID-19 ?",
    answer: 2020,
    type: "annee",
    category: "Actualité",
    hint: "Année du confinement mondial"
  },
  {
    question: "En quelle année le Royaume-Uni a-t-il voté pour le Brexit ?",
    answer: 2016,
    type: "annee",
    category: "Politique",
    hint: "Référendum du 23 juin"
  },
  {
    question: "Quelle année voit l'élection d'Emmanuel Macron comme Président de la République française ?",
    answer: 2017,
    type: "annee",
    category: "Politique",
    hint: "Premier mandat"
  },
  {
    question: "En quelle année Notre-Dame de Paris a-t-elle été ravagée par un incendie ?",
    answer: 2019,
    type: "annee",
    category: "Actualité",
    hint: "15 avril"
  },
  {
    question: "Quelle année marque la mort de la reine Elizabeth II ?",
    answer: 2022,
    type: "annee",
    category: "Actualité",
    hint: "8 septembre"
  },
  {
    question: "En quelle année la Coupe du Monde de football 2022 a-t-elle eu lieu au Qatar ?",
    answer: 2022,
    type: "annee",
    category: "Sport",
    hint: "Victoire de l'Argentine"
  },
  {
    question: "Quelle année voit le lancement du premier iPhone sans bouton physique (iPhone X) ?",
    answer: 2017,
    type: "annee",
    category: "Technologie",
    hint: "10 ans de l'iPhone"
  },
  {
    question: "En quelle année SpaceX a-t-elle envoyé ses premiers astronautes dans l'espace ?",
    answer: 2020,
    type: "annee",
    category: "Espace",
    hint: "Mission Crew Dragon"
  },
  // Plus de questions 2020-2025
  {
    question: "Quelle année marque l'invasion de l'Ukraine par la Russie ?",
    answer: 2022,
    type: "annee",
    category: "Actualité",
    hint: "24 février"
  },
  {
    question: "En quelle année le film 'Avengers: Endgame' est-il sorti ?",
    answer: 2019,
    type: "annee",
    category: "Cinéma",
    hint: "Film le plus rentable de l'histoire"
  },
  {
    question: "Quelle année voit l'attentat contre Charlie Hebdo ?",
    answer: 2015,
    type: "annee",
    category: "Actualité",
    hint: "7 janvier"
  },
  {
    question: "En quelle année les accords de Paris sur le climat ont-ils été signés ?",
    answer: 2015,
    type: "annee",
    category: "Environnement",
    hint: "COP21"
  },
  {
    question: "Quelle année marque la victoire de la France à la Coupe du Monde de football ?",
    answer: 2018,
    type: "annee",
    category: "Sport",
    hint: "En Russie"
  },
  {
    question: "En quelle année le premier trailer de GTA VI a été publié ?",
    answer: 2023,
    type: "annee",
    category: "Jeux Vidéo",
    hint: "Décembre"
  },
  {
    question: "Quelle année voit la sortie du film 'Barbie' de Greta Gerwig ?",
    answer: 2023,
    type: "annee",
    category: "Cinéma",
    hint: "Phenomène rose"
  },
  {
    question: "En quelle année Taylor Swift a-t-elle sorti l'album '1989 (Taylor's Version)' ?",
    answer: 2023,
    type: "annee",
    category: "Musique",
    hint: "Octobre"
  },
  {
    question: "Quelle année marque le décès de Kobe Bryant ?",
    answer: 2020,
    type: "annee",
    category: "Sport",
    hint: "Crash d'hélicoptère"
  },
  {
    question: "En quelle année le sauvetage des enfants thaïlandais de la grotte de Tham Luang a eu lieu ?",
    answer: 2018,
    type: "annee",
    category: "Actualité",
    hint: "Juillet"
  },
  // Questions chiffres/données
  {
    question: "Combien de saisons compte la série 'Game of Thrones' ?",
    answer: 8,
    type: "nombre",
    category: "Séries",
    hint: "Dernière saison en 2019"
  },
  {
    question: "Combien de pays font partie de l'Union Européenne en 2024 ?",
    answer: 27,
    type: "nombre",
    category: "Politique",
    hint: "Après le Brexit"
  },
  {
    question: "En combien de temps (en heures) la Terre fait-elle un tour complet sur elle-même ?",
    answer: 24,
    type: "nombre",
    category: "Science",
    hint: "Un jour"
  },
  {
    question: "Combien de planètes compte notre système solaire ?",
    answer: 8,
    type: "nombre",
    category: "Espace",
    hint: "Pluton n'est plus une planète depuis 2006"
  },
  {
    question: "Combien de joueurs compte une équipe de football sur le terrain ?",
    answer: 11,
    type: "nombre",
    category: "Sport",
    hint: "Dont le gardien"
  },
  {
    question: "Combien de continents existe-t-il sur Terre ?",
    answer: 7,
    type: "nombre",
    category: "Géographie",
    hint: "Afrique, Amérique du Nord, Amérique du Sud, Antarctique, Asie, Europe, Océanie"
  },
  {
    question: "Combien de lettres compte l'alphabet français ?",
    answer: 26,
    type: "nombre",
    category: "Culture",
    hint: "Comme l'anglais"
  },
  {
    question: "Combien de couleurs primaires existe-t-il en peinture ?",
    answer: 3,
    type: "nombre",
    category: "Art",
    hint: "Rouge, jaune, bleu"
  },
  {
    question: "Combien de dents un adulte possède-t-il normalement ?",
    answer: 32,
    type: "nombre",
    category: "Santé",
    hint: "Dents de sagesse incluses"
  },
  {
    question: "Combien de doigts possède une main humaine ?",
    answer: 5,
    type: "nombre",
    category: "Biologie",
    hint: "Pouce inclus"
  },
  // Questions années supplémentaires
  {
    question: "En quelle année le Titanic a-t-il coulé ?",
    answer: 1912,
    type: "annee",
    category: "Histoire",
    hint: "14-15 avril"
  },
  {
    question: "Quelle année marque la fin de la Seconde Guerre mondiale ?",
    answer: 1945,
    type: "annee",
    category: "Histoire",
    hint: "8 mai en Europe"
  },
  {
    question: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",
    answer: 1969,
    type: "annee",
    category: "Espace",
    hint: "Apollo 11"
  },
  {
    question: "Quelle année voit la chute du mur de Berlin ?",
    answer: 1989,
    type: "annee",
    category: "Histoire",
    hint: "9 novembre"
  },
  {
    question: "En quelle année Facebook (Meta) a-t-il été créé ?",
    answer: 2004,
    type: "annee",
    category: "Technologie",
    hint: "Par Mark Zuckerberg"
  },
  {
    question: "Quelle année marque la création de YouTube ?",
    answer: 2005,
    type: "annee",
    category: "Technologie",
    hint: "Février"
  },
  {
    question: "En quelle année l'iPhone est-il sorti pour la première fois ?",
    answer: 2007,
    type: "annee",
    category: "Technologie",
    hint: "Par Steve Jobs"
  },
  {
    question: "Quelle année voit la sortie du film 'Black Panther' ?",
    answer: 2018,
    type: "annee",
    category: "Cinéma",
    hint: "Marvel"
  },
  {
    question: "En quelle année 'La Casa de Papel' a-t-elle été diffusée pour la première fois ?",
    answer: 2017,
    type: "annee",
    category: "Séries",
    hint: "Série espagnole"
  },
  {
    question: "Quelle année marque le premier vol commercial du Concorde ?",
    answer: 1976,
    type: "annee",
    category: "Histoire",
    hint: "21 janvier"
  },
  // Calculs et données
  {
    question: "Quel est le résultat de 15 × 4 ?",
    answer: 60,
    type: "calcul",
    category: "Mathématiques",
    hint: "15 + 15 + 15 + 15"
  },
  {
    question: "Combien de secondes compte une minute ?",
    answer: 60,
    type: "nombre",
    category: "Temps",
    hint: "60 minutes = 1 heure"
  },
  {
    question: "Combien de minutes compte une heure ?",
    answer: 60,
    type: "nombre",
    category: "Temps",
    hint: "60 secondes × 60"
  },
  {
    question: "Combien de jours compte une année non bissextile ?",
    answer: 365,
    type: "nombre",
    category: "Temps",
    hint: "366 pour les bissextiles"
  },
  {
    question: "Combien de trimestres compte une année ?",
    answer: 4,
    type: "nombre",
    category: "Temps",
    hint: "3 mois chacun"
  },
  {
    question: "Quel est le résultat de 100 ÷ 4 ?",
    answer: 25,
    type: "calcul",
    category: "Mathématiques",
    hint: "Un quart de 100"
  },
  {
    question: "Combien de côtés compte un hexagone ?",
    answer: 6,
    type: "nombre",
    category: "Géométrie",
    hint: "Hexa = 6"
  },
  {
    question: "Combien de faces compte un dé à jouer standard ?",
    answer: 6,
    type: "nombre",
    category: "Jeux",
    hint: "Numérotées de 1 à 6"
  },
  {
    question: "Combien de sommets compte un triangle ?",
    answer: 3,
    type: "nombre",
    category: "Géométrie",
    hint: "Trois côtés, trois angles"
  },
  {
    question: "Combien de cordes compte une guitare standard ?",
    answer: 6,
    type: "nombre",
    category: "Musique",
    hint: "Mi, La, Ré, Sol, Si, Mi"
  },
  // Géographie
  {
    question: "Combien de régions compte la France métropolitaine ?",
    answer: 13,
    type: "nombre",
    category: "Géographie",
    hint: "Avant 2016, il y en avait 22"
  },
  {
    question: "Combien de départements compte la France (métropole + DOM-TOM) ?",
    answer: 101,
    type: "nombre",
    category: "Géographie",
    hint: "96 en métropole + 5 DOM"
  },
  {
    question: "Combien de fuseaux horaires compte la Russie ?",
    answer: 11,
    type: "nombre",
    category: "Géographie",
    hint: "Pays le plus vaste du monde"
  },
  {
    question: "Combien d'États compte les États-Unis ?",
    answer: 50,
    type: "nombre",
    category: "Géographie",
    hint: "48 contigus + Alaska + Hawaï"
  },
  {
    question: "Combien de pays compte l'Afrique ?",
    answer: 54,
    type: "nombre",
    category: "Géographie",
    hint: "Continent le plus peuplé"
  },
  // Sport
  {
    question: "Combien de sets gagnants faut-il pour remporter un match de tennis en Grand Chelem (hommes) ?",
    answer: 3,
    type: "nombre",
    category: "Sport",
    hint: "5 sets maximum"
  },
  {
    question: "Combien de points compte un touchdown au football américain ?",
    answer: 6,
    type: "nombre",
    category: "Sport",
    hint: "Sans le bonus"
  },
  {
    question: "Combien de joueurs compte une équipe de basket sur le terrain ?",
    answer: 5,
    type: "nombre",
    category: "Sport",
    hint: "Par équipe"
  },
  {
    question: "Combien de manches compte un match de baseball ?",
    answer: 9,
    type: "nombre",
    category: "Sport",
    hint: "Innings"
  },
  {
    question: "Combien de tours compte le Tour de France cycliste ?",
    answer: 21,
    type: "nombre",
    category: "Sport",
    hint: "Environ 3 semaines"
  },
  // Sciences
  {
    question: "Combien d'os compte le corps humain adulte ?",
    answer: 206,
    type: "nombre",
    category: "Biologie",
    hint: "Plus de 300 chez le bébé"
  },
  {
    question: "Combien de paires de chromosomes possède l'être humain ?",
    answer: 23,
    type: "nombre",
    category: "Biologie",
    hint: "46 chromosomes au total"
  },
  {
    question: "Quelle est la température de fusion de la glace (en °C) ?",
    answer: 0,
    type: "nombre",
    category: "Physique",
    hint: "À pression atmosphérique"
  },
  {
    question: "Combien de sens traditionnels possède l'être humain ?",
    answer: 5,
    type: "nombre",
    category: "Biologie",
    hint: "Vue, ouïe, toucher, goût, odorat"
  },
  {
    question: "Combien de dents de lait a un enfant ?",
    answer: 20,
    type: "nombre",
    category: "Santé",
    hint: "Tomberont pour les définitives"
  },
  // Arts et Culture
  {
    question: "Combien de symphonies a composé Beethoven ?",
    answer: 9,
    type: "nombre",
    category: "Musique",
    hint: "La 9ème contient l'Ode à la joie"
  },
  {
    question: "Combien de tableaux composent la série 'Les Nymphéas' de Monet ?",
    answer: 250,
    type: "nombre",
    category: "Art",
    hint: "Environ, peints sur 30 ans"
  },
  {
    question: "Combien de pièces Shakespeare a-t-il écrites ?",
    answer: 37,
    type: "nombre",
    category: "Littérature",
    hint: "Environ"
  },
  {
    question: "Combien de films compte la saga Harry Potter (principale) ?",
    answer: 8,
    type: "nombre",
    category: "Cinéma",
    hint: "7 livres mais 8 films"
  },
  {
    question: "Combien de saisons compte la série 'Friends' ?",
    answer: 10,
    type: "nombre",
    category: "Séries",
    hint: "De 1994 à 2004"
  },
  // Jeux Vidéo
  {
    question: "En quelle année Minecraft est-il sorti officiellement ?",
    answer: 2011,
    type: "annee",
    category: "Jeux Vidéo",
    hint: "Créé par Notch"
  },
  {
    question: "En quelle année Fortnite Battle Royale est-il sorti ?",
    answer: 2017,
    type: "annee",
    category: "Jeux Vidéo",
    hint: "Phénomène mondial"
  },
  {
    question: "Combien de joueurs compte une partie de Among Us ?",
    answer: 10,
    type: "nombre",
    category: "Jeux Vidéo",
    hint: "Maximum"
  },
  {
    question: "En quelle année est sorti The Legend of Zelda: Breath of the Wild ?",
    answer: 2017,
    type: "annee",
    category: "Jeux Vidéo",
    hint: "Avec la Switch"
  },
  {
    question: "En quelle année Pokémon Go a-t-il été lancé ?",
    answer: 2016,
    type: "annee",
    category: "Jeux Vidéo",
    hint: "Été 2016"
  },
  // Questions récentes 2024-2025
  {
    question: "En quelle année a eu lieu le mariage du Prince Harry et Meghan Markle ?",
    answer: 2018,
    type: "annee",
    category: "Actualité",
    hint: "19 mai"
  },
  {
    question: "Quelle année marque le retour de Johnny Hallyday sur scène après son cancer (avant son décès) ?",
    answer: 2015,
    type: "annee",
    category: "Musique",
    hint: "Tournée 'Rester Vivant'"
  },
  {
    question: "En quelle année les attentats du Bataclan ont-ils eu lieu ?",
    answer: 2015,
    type: "annee",
    category: "Actualité",
    hint: "13 novembre"
  },
  {
    question: "Quelle année voit le lancement de Disney+ en France ?",
    answer: 2020,
    type: "annee",
    category: "Streaming",
    hint: "31 mars"
  },
  {
    question: "En quelle année le nombre d'habitants sur Terre a dépassé 8 milliards ?",
    answer: 2022,
    type: "annee",
    category: "Démographie",
    hint: "15 novembre"
  },
  {
    question: "Quelle année marque le premier vol de l'hélicoptère Ingenuity sur Mars ?",
    answer: 2021,
    type: "annee",
    category: "Espace",
    hint: "Premier vol motorisé sur une autre planète"
  },
  {
    question: "En quelle année le James Webb Space Telescope a-t-il été lancé ?",
    answer: 2021,
    type: "annee",
    category: "Espace",
    hint: "25 décembre"
  },
  {
    question: "Quelle année voit la création de l'IA ChatGPT par OpenAI ?",
    answer: 2022,
    type: "annee",
    category: "Technologie",
    hint: "30 novembre"
  },
  {
    question: "En quelle année le SMS a-t-il fêté ses 30 ans ?",
    answer: 2022,
    type: "annee",
    category: "Technologie",
    hint: "Premier SMS envoyé en 1992"
  },
  {
    question: "Quelle année marque l'interdiction des vols commerciaux du Concorde ?",
    answer: 2003,
    type: "annee",
    category: "Histoire",
    hint: "24 octobre dernier vol"
  },
  // Calculs
  {
    question: "Quel est le résultat de 7 × 8 ?",
    answer: 56,
    type: "calcul",
    category: "Mathématiques",
    hint: "Tables de multiplication"
  },
  {
    question: "Quel est le résultat de 12 × 12 ?",
    answer: 144,
    type: "calcul",
    category: "Mathématiques",
    hint: "Carré parfait"
  },
  {
    question: "Quel est le résultat de 1000 ÷ 8 ?",
    answer: 125,
    type: "calcul",
    category: "Mathématiques",
    hint: "Division"
  },
  {
    question: "Quel est le résultat de 9 × 9 ?",
    answer: 81,
    type: "calcul",
    category: "Mathématiques",
    hint: "Carré de 9"
  },
  {
    question: "Combien de minutes compte 2 heures et 30 minutes ?",
    answer: 150,
    type: "calcul",
    category: "Temps",
    hint: "120 + 30"
  },
  // Divers
  {
    question: "Combien de lettres compte le mot 'international' ?",
    answer: 13,
    type: "nombre",
    category: "Langue",
    hint: "i-n-t-e-r-n-a-t-i-o-n-a-l"
  },
  {
    question: "Combien de voyelles compte l'alphabet français ?",
    answer: 6,
    type: "nombre",
    category: "Langue",
    hint: "A, E, I, O, U, Y"
  },
  {
    question: "Combien de saisons compte une année ?",
    answer: 4,
    type: "nombre",
    category: "Temps",
    hint: "Printemps, été, automne, hiver"
  },
  {
    question: "Combien de points cardinaux existe-t-il ?",
    answer: 4,
    type: "nombre",
    category: "Géographie",
    hint: "Nord, Sud, Est, Ouest"
  },
  {
    question: "Combien de places compte un jury populaire en France (assises) ?",
    answer: 9,
    type: "nombre",
    category: "Justice",
    hint: "6 jurés + 3 magistrats"
  },
  // Plus de questions années
  {
    question: "En quelle année le Canal de Suez a-t-il été inauguré ?",
    answer: 1869,
    type: "annee",
    category: "Histoire",
    hint: "17 novembre"
  },
  {
    question: "Quelle année marque la fin de la Première Guerre mondiale ?",
    answer: 1918,
    type: "annee",
    category: "Histoire",
    hint: "11 novembre"
  },
  {
    question: "En quelle année la Tour Eiffel a-t-elle été inaugurée ?",
    answer: 1889,
    type: "annee",
    category: "Histoire",
    hint: "Exposition universelle"
  },
  {
    question: "Quelle année voit la première émission de 'Koh-Lanta' ?",
    answer: 2001,
    type: "annee",
    category: "Télévision",
    hint: "4 août"
  },
  {
    question: "En quelle année 'The Voice' a-t-elle été créée ?",
    answer: 2012,
    type: "annee",
    category: "Télévision",
    hint: "Version française"
  },
  {
    question: "Quelle année marque le tout premier film de l'Univers Cinématographique Marvel (Iron Man) ?",
    answer: 2008,
    type: "annee",
    category: "Cinéma",
    hint: "Début du MCU"
  },
  {
    question: "En quelle année est sorti 'Avatar' de James Cameron ?",
    answer: 2009,
    type: "annee",
    category: "Cinéma",
    hint: "Film le plus rentable pendant 10 ans"
  },
  {
    question: "Quelle année voit la sortie de 'Titanic' ?",
    answer: 1997,
    type: "annee",
    category: "Cinéma",
    hint: "James Cameron"
  },
  {
    question: "En quelle année Google a-t-il été fondé ?",
    answer: 1998,
    type: "annee",
    category: "Technologie",
    hint: "4 septembre"
  },
  {
    question: "Quelle année marque la création de l'Union Européenne (Traité de Maastricht) ?",
    answer: 1992,
    type: "annee",
    category: "Politique",
    hint: "7 février"
  },
  {
    question: "En quelle année le Berlin Wall est-il tombé ?",
    answer: 1989,
    type: "annee",
    category: "Histoire",
    hint: "9 novembre"
  },
  {
    question: "Quelle année voit la mort de Michael Jackson ?",
    answer: 2009,
    type: "annee",
    category: "Musique",
    hint: "25 juin"
  },
  {
    question: "En quelle année Lady Gaga a-t-elle sorti son premier album 'The Fame' ?",
    answer: 2008,
    type: "annee",
    category: "Musique",
    hint: "Single 'Just Dance'"
  },
  {
    question: "Quelle année marque le premier titre de Champion du Monde de l'équipe de France de handball masculine ?",
    answer: 1995,
    type: "annee",
    category: "Sport",
    hint: "En Islande"
  },
  {
    question: "En quelle année Zinedine Zidane a-t-il marqué son coup de tête en finale du Mondial ?",
    answer: 1998,
    type: "annee",
    category: "Sport",
    hint: "12 juillet, deux buts de la tête"
  },
  {
    question: "Quelle année voit le sacre de Rafael Nadal à Roland-Garros pour la première fois ?",
    answer: 2005,
    type: "annee",
    category: "Sport",
    hint: "Il avait 19 ans"
  },
  {
    question: "En quelle année la France a-t-elle organisé l'Euro de football ?",
    answer: 2016,
    type: "annee",
    category: "Sport",
    hint: "Finaliste contre le Portugal"
  },
  {
    question: "Quelle année marque le dernier sacre de la France en Coupe Davis ?",
    answer: 2017,
    type: "annee",
    category: "Sport",
    hint: "Avec Lucas Pouille"
  },
  {
    question: "En quelle année Kylian Mbappé a-t-il été sacré champion du monde ?",
    answer: 2018,
    type: "annee",
    category: "Sport",
    hint: "Il avait 19 ans"
  },
  {
    question: "Quelle année voit la première participation du VAR en Coupe du Monde ?",
    answer: 2018,
    type: "annee",
    category: "Sport",
    hint: "En Russie"
  },
  // Plus de calculs et nombres
  {
    question: "Combien de syllabes compte un alexandrin ?",
    answer: 12,
    type: "nombre",
    category: "Littérature",
    hint: "Vers classique français"
  },
  {
    question: "Combien de dés utilise-t-on au jeu de Yahtzee ?",
    answer: 5,
    type: "nombre",
    category: "Jeux",
    hint: "Cinq dés"
  },
  {
    question: "Combien de cases compte un plateau d'échecs ?",
    answer: 64,
    type: "nombre",
    category: "Jeux",
    hint: "8 × 8"
  },
  {
    question: "Combien de pièces chaque joueur a-t-il au début d'une partie d'échecs ?",
    answer: 16,
    type: "nombre",
    category: "Jeux",
    hint: "1 roi, 1 dame, 2 tours, 2 fous, 2 cavaliers, 8 pions"
  },
  {
    question: "Combien de trous compte un terrain de golf standard ?",
    answer: 18,
    type: "nombre",
    category: "Sport",
    hint: "Parcours complet"
  },
  {
    question: "Combien de périodes compte un match de hockey sur glace ?",
    answer: 3,
    type: "nombre",
    category: "Sport",
    hint: "20 minutes chacune"
  },
  {
    question: "Combien de rangs compte une armée de bataille dans un jeu de cartes standard ?",
    answer: 13,
    type: "nombre",
    category: "Jeux",
    hint: "As à Roi"
  },
  {
    question: "Combien de cartes compte un jeu de tarot français ?",
    answer: 78,
    type: "nombre",
    category: "Jeux",
    hint: "56 cartes classiques + 21 atouts + 1 excuse"
  },
  {
    question: "Combien de couleurs compte un arc-en-ciel ?",
    answer: 7,
    type: "nombre",
    category: "Nature",
    hint: "Violet, indigo, bleu, vert, jaune, orange, rouge"
  },
  {
    question: "Combien de pattes possède une araignée ?",
    answer: 8,
    type: "nombre",
    category: "Nature",
    hint: "Arachnide"
  }
];

// Mélanger et sélectionner aléatoirement
export const getRandomCultureQuestions = (count = 10) => {
  const shuffled = [...cultureQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Obtenir une question aléatoire
export const getRandomCultureQuestion = () => {
  const randomIndex = Math.floor(Math.random() * cultureQuestions.length);
  return cultureQuestions[randomIndex];
};

// Nombre total de questions disponibles
export const getTotalQuestionsCount = () => cultureQuestions.length;
