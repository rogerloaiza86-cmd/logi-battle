# Plan de développement — matières et filières

Date : 17 octobre 2026.

Geronimo Coop sait faire jouer la logistique du bac pro. Ce plan ouvre le lycée général, le lycée technologique et l’enseignement général du bac pro, matière par matière, sans mélanger les programmes.

## Règle d’alignement

Une question n’entre dans une banque que si elle porte sur un thème nommé par le programme de cette voie et de cette année. Le bulletin officiel et l’intitulé du programme sont enregistrés avec la question. Histoire et géographie restent deux matières, même quand l’horaire officiel les réunit.

Le français de terminale générale et technologique n’est pas inventé : après les épreuves anticipées, cet horaire devient la philosophie. La philosophie est une phase suivante, pas une case déguisée en français.

## Ce qui est en place

- Catalogue des voies, des années et des six matières : `logi-battle/src/data/cursus.js`.
- Filières nommées : générale, STMG, STI2D, STL, ST2S, STD2A, STHR, enseignement général du bac pro, métiers de la logistique.
- Références de programmes : `logi-battle/src/data/programmes.js`.
- Banques de départ, quatre questions par programme : `logi-battle/src/data/banques/`.
- Salle, duel sur un seul écran et entraînement peuvent tirer ces questions.
- Schéma SQL prêt, sans lecture publique de la bonne réponse : `logi-battle/supabase/questions_cursus.sql`.
- Le contrôle `npm test` vérifie chaque cellule jouable.

La seconde générale et la seconde technologique partagent les mêmes textes. À partir de la première, l’histoire-géographie et les mathématiques divergent. En voie générale, les mathématiques de première et de terminale sont celles de la **spécialité**. En voie technologique, ce sont celles du tronc commun. En bac pro, les questions de terminale évitent les modules réservés à un groupement (trigonométrie du groupement A, vecteurs du groupement B).

## Sources suivies

| Matière | Voie | Texte |
| --- | --- | --- |
| Français, maths, histoire-géographie, langues | Générale et technologique, seconde et cycle terminal | BO spécial n° 1 du 22 janvier 2019 et, pour la terminale, BO spécial n° 8 du 25 juillet 2019 |
| Français, histoire-géographie, maths, langues | Seconde professionnelle | BO spécial n° 5 du 11 avril 2019 |
| Ces mêmes matières | Première et terminale professionnelles | BO spécial n° 1 du 6 février 2020 |
| Logistique | Bac pro métiers de la logistique | Arrêté du 8 janvier 2025, déjà branché |

Les pages éduscol correspondantes sont citées dans `programmes.js`.

Les arrêtés de mathématiques du 26 février 2026, publiés au BO n° 14 du 2 avril 2026, ne sont pas encore la base des questions. En juillet 2026, éduscol présentait encore les programmes de 2019 comme ceux en vigueur. La première relecture de la phase 2 confirme la date d’application, puis réécrit les banques de maths si le texte a changé.

## Phases

### Phase 1 — Banques de classe

Porter chaque cellule jouable de 4 à au moins 40 questions, relues par un enseignant de la matière. Conserver quatre choix, l’explication, le thème et la source. Mélanger la place de la bonne réponse. Ajouter, en langues, des consignes de compréhension orale seulement quand les fichiers audio existent.

Cellules déjà ouvertes : 52 combinaisons voie × année × matière, dont plusieurs partagent le même texte en seconde et pour les langues du cycle terminal général et technologique. Le français de terminale générale et technologique reste fermé.

### Phase 2 — Textes nouveaux et philosophie

- Relire les programmes de mathématiques du 26 février 2026 et les appliquer s’ils sont entrés en vigueur.
- Ouvrir la philosophie en terminale générale et technologique, à la place du français.
- Distinguer, en langues, le niveau visé LVA (vers B2) et LVB (vers B1) sans changer les axes culturels.

### Phase 3 — Spécialités et référentiels professionnels

Écrire les enseignements de série, qui ne sont pas le tronc commun :

- STMG : management, sciences de gestion, droit, économie.
- STI2D : innovation, ingénierie et développement durable.
- STL, ST2S, STD2A, STHR : spécialités propres.
- Pour chaque bac pro autre que la logistique : le référentiel de diplôme, sur le même modèle que `docs/referentiel/`.
- En maths de bac pro : trois banques de cycle terminal, groupements A, B et C, là où les modules divergent.

### Phase 4 — Banque vivante

Importer `questions_cursus` dans Supabase avec la clé de service, jamais avec la clé anonyme. Un enseignant pourra proposer une question ; elle ne rejoint la banque jouable qu’après relecture du thème de programme. La correction d’une salle reste sur l’écran hôte tant que le serveur ne note pas lui-même.

## Hors de ce plan

Le collège, le CAP comme parcours complet, et les spécialités générales autres que les mathématiques (HGGSP, LLCE, SES, etc.) ne sont pas dans cette première ouverture. HGGSP et LLCE peuvent réutiliser plus tard les banques d’histoire, de géographie et de langues, avec leurs propres thèmes.
