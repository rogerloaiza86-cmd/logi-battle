# Guide enseignant — Préparer une séance Geronimo Coop en 5 minutes

## Avant la séance (une seule fois)

1. Ouvrez l'application : **https://rogerloaiza86-cmd.github.io/logi-battle/**
2. Connectez-vous avec votre prénom et votre classe (simple identifiant local, aucun mot de passe).
3. Sur poste fixe sans Wi-Fi fiable : l'application s'installe comme une appli (icône « Installer » du navigateur) et les modes **Arène locale** et **Entraînement** fonctionnent hors-ligne.

## Scénario 1 — Arène locale (1 poste, vidéoprojecteur, 2 équipes) · 2 min

1. Menu → choisissez un **module** (Palettisation, Coût transport, Sécurité… ou Mode Mixte).
2. Nommez les deux équipes → **Commencer**.
3. Chaque équipe répond sur sa moitié d'écran ; la corde de traction se déplace à chaque round gagné.
4. Entre chaque round, **8 secondes de correction** s'affichent : c'est le moment de commenter.
5. La difficulté monte automatiquement : rounds 1-3 faciles, 4-7 moyens, 8+ difficiles.

## Scénario 2 — Multijoueur mobiles (élèves sur téléphone) · 3 min

1. Menu → **Mode Live** → choisissez le module : un **QR code** s'affiche.
2. Les élèves scannent le QR (ou saisissent le code `GAME-XXXXX`), entrent leur prénom et choisissent leur équipe.
3. Vous voyez la **liste des connectés** se remplir en temps réel → **Lancer la partie**.
4. Les questions arrivent sur les téléphones ; l'écran projeté montre la question, le score et la corde.
5. Une connexion internet est nécessaire (Supabase). En cas de coupure côté élève, l'appli se reconnecte seule.

## Créer un QCM à partir de votre cours · 5 min

1. Menu → **MES QCM** (barre latérale) → donnez un titre (ex : « Chapitre 3 — La Révolution ») et une matière → **Créer**.
2. Ajoutez vos questions : énoncé, 4 réponses, cochez la bonne, ajoutez une explication (elle s'affiche à la correction).
3. Dès la première question, le QCM est jouable en **Arène** (2 équipes sur un poste) ou en **Live** (QR code, élèves sur mobile) — il apparaît aussi dans le mode Entraînement.
4. **Partage entre collègues** : bouton Exporter (fichier .json) → l'autre professeur l'importe en un clic.
5. **Bibliothèque officielle** : des QCM prêts à l'emploi alignés sur les programmes Bac Pro (BO 2019) sont proposés — ajoutez-les puis modifiez-les librement.

## Matières générales & Culture Générale

- **6 matières** sont jouables dans tous les modes : Français, Mathématiques, Histoire, Géographie, Anglais, Espagnol (+ un mode Mixte matières).
- **Culture Générale** : 300 questions en 3 niveaux (facile / moyen / difficile), choix du niveau au lancement.
- **Chaque battle se joue en 10 questions** : vainqueur à la corde ou au score.

## Scénario 3 — Championnat de classe (sur plusieurs semaines)

1. Menu → **Championnat** → créez votre classe puis vos **trinômes**.
2. Le premier trinôme créé est champion ; les autres le défient match après match.
3. Victoire = 3 pts, nul = 1 pt. Le classement et les défenses de titre sont conservés sur le poste.

## Suivre les élèves

- Menu → **QG** → onglet **Stats** :
  - **Taux de réussite par module** (toute la classe) → repérez les lacunes (ex. classe faible en palettisation).
  - **Tableau par élève** : précision, meilleur score, badges.
  - **Export CSV** : ouvre dans Excel, pour le carnet de notes.
- Les statistiques se remplissent quand les élèves jouent en **mode Entraînement** sur ce poste (les données restent locales au navigateur).

## Bonnes pratiques

- Demandez aux élèves d'utiliser **prénom seul ou pseudo** (pas de nom complet) — les parties en ligne sont automatiquement purgées après 30 jours.
- Le bouton 🔊 dans l'arène coupe les sons.
- « Effacer les données » (QG → Réglages) remet tout à zéro en fin d'année.
