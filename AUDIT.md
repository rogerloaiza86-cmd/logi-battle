# Audit complet — Geronimo Coop (Logi Battle)

Date : 25 septembre 2026  
Périmètre : application React/Vite `logi-battle/`, schéma Supabase, CI GitHub Pages, scripts racine.  
Méthode : lecture du code, contrôle structurel des banques de questions, vérification du dépôt Git public.

## Synthèse

L’application a une identité visuelle et une base de questions logistiques réelles, mais le parcours principal n’est pas jouable. L’écran de duel local affiche des réponses figées et n’enregistre aucun clic. Le championnat et l’entraînement n’utilisent pas les cartes QCM déjà écrites pour 12 modules. Le multijoueur ne s’abonne pas au canal temps réel. Le dépôt GitHub est **public** et contient des secrets ainsi qu’une politique Supabase qui autorise toute écriture anonyme.

| Gravité | Nombre | Thème |
| --- | --- | --- |
| Critique | 6 | Secrets publics, base ouverte, duel injouable, QCM non branchés, score championnat, multijoueur |
| Élevé | 8 | Questions injouables ou fausses, liens QR, fin de partie, clavier partagé |
| Moyen | 7 | Données locales incohérentes, documentation, CI, code mort |
| Faible | 4 | Cosmétique, dépendances inutilisées, logs fictifs |

## Critique

### 1. Secrets dans un dépôt public

Le dépôt `rogerloaiza86-cmd/logi-battle` est public. Sont versionnés :

- `/.env` : clé API Kimi (Moonshot) réelle.
- `/logi-battle/.env` : URL du projet Supabase et clé anon. Vite l’embarque dans le bundle au `npm run build` de GitHub Pages.

`.gitignore` ne couvre que `logi-battle/` et ignore `.env.local`, pas `.env`.

Action : révoquer la clé Kimi immédiatement, faire tourner la clé Supabase si elle a été utilisée, retirer ces fichiers de l’historique Git, et injecter les variables via les secrets CI. La clé anon peut rester côté client **seulement** si les politiques RLS limitent vraiment les opérations.

### 2. Row Level Security ouverte

`logi-battle/supabase_schema.sql` active RLS puis autorise `FOR ALL` avec `USING (true)` et `WITH CHECK (true)` sur `games` et `questions`. Combiné à la clé anon publique, n’importe qui peut lire, modifier et supprimer toutes les parties et questions. Il n’y a pas de contrôle serveur des réponses : le client envoie `isCorrect`.

### 3. Le duel local n’est pas jouable

`GameBoard.jsx` importe `QuestionCard` et `VocabularyCard` mais ne les affiche pas. Les quatre boutons ont des libellés en dur (« 1,2 Mètres », « 2,4 Mètres », « Sans Limite », « Limité par le Poids ») et aucun `onClick`. `handleAnswer` n’est appelé que par un broadcast hôte.

Autres écarts sur ce même écran :

- Noms d’équipes figés (« ÉQUIPE ÉTOILE » / « ÉQUIPE BOUSSOLE »), le store et `TeamSetup` sont ignorés.
- Compteur « QUESTION n/20 » alors que `totalRounds` vaut 10. Aucune fin au bout des manches.
- Journal initial fictif (`User_42`, `CargoKing`) et points affichés `+250` / `-50` alors que le score réel avance de 1.
- Bandeau « points doublés » et jauge « moral 88 % » sans effet sur la partie.
- Boutons statistiques et réglages sans action.

### 4. Douze modules QCM ne s’affichent pas

`ChampionshipGameBoard` et `TrainingMode` n’utilisent `VocabularyCard` que si `question.isMCQ` ou `type === 'vocabulaire'`. Les générateurs supply chain, réception, stock, sécurité, traçabilité, green, team leader, JIT, routes, légal, maths et culture ne posent pas ce drapeau.

Ces questions partent dans `QuestionCard`, un pavé numérique qui compare `parseInt(saisie) === correctAnswer`. Or `correctAnswer` y est l’**index** de l’option (0 à 3), et les options ne sont jamais montrées. Les composants prévus (`SafetyCard`, `MathCard`, `StockCard`, `GreenCard`, `JitCard`, `LegalCard`, `RouteCard`, `ReceptionCard`, `SupplyChainCard`, `TraceabilityCard`, `TeamLeaderCard`) ne sont importés nulle part.

Conséquence : en championnat et en entraînement, seuls le vocabulaire et environ la moitié des questions palettisation / transport / chargement (celles tirées en QCM) sont répondables. Les calculs numériques restent jouables dans ces deux modes.

### 5. Un match nul est enregistré comme victoire du champion

Dans `App.jsx`, `onMatchEnd` fait :

`result.winner === 'A' ? 'challenger' : 'champion'`

Si `getWinner()` renvoie `null` (égalité), le gagnant devient `'champion'`. `recordMatch` crédite alors une victoire, 3 points et une défense de titre, alors que l’overlay affiche « MATCH NUL ».

### 6. Le mode QR ne synchronise pas les joueurs

- `PlayerGame` enregistre des listeners broadcast mais n’appelle jamais `channel.subscribe()`.
- `HostGame.getPlayerUrl()` construit `origin + /join?game=...` sans la base Vite `/logi-battle/`. Sur GitHub Pages le QR pointe hors de l’application.
- Le champ code a `maxLength={10}` alors qu’un identifiant `GAME-` + 6 caractères fait 11 caractères. La saisie manuelle est tronquée.
- L’hôte n’écoute pas les arrivées : la liste des joueurs reste « En attente » (`handlePlayerJoin` est vide).
- La bonne réponse est envoyée dans le payload `new_question`. Le téléphone peut tricher, et un client peut émettre `isCorrect: true` sans calcul.
- GitHub Pages ne réécrit pas les routes SPA : `/join` n’a pas de `404.html` de repli.
- Le QR est généré par `api.qrserver.com` : l’URL de partie quitte le navigateur. Le paquet `qrcode` est déjà dans `package.json` et n’est pas utilisé.
- `subscribeToGame` ne branche pas Firestore (`onSnapshot` laissé en TODO) et duplique le bloc mode local.

## Élevé

### Attribution de la manche sur un état périmé

`endRound` lit `teamAStatus`, `teamBStatus`, `teamATime` et `teamBTime` au moment du rendu. `handleAnswer` met à jour ces états puis appelle `endRound` dans le même tour. La dernière réponse n’est pas encore visible : l’équipe qui termine le tour peut ne pas marquer, ou le comparatif de temps est faux. Le même schéma est dans `GameBoard` et `ChampionshipGameBoard`. Égalité de temps : l’équipe B gagne toujours (`<` strict).

`setTimeout` teste `gameStatus !== 'finished'` sur la valeur du rendu précédent. Une manche qui fait passer la corde à ±100 peut quand même lancer la question suivante. `incrementTeamAScore` met `gameStatus` à `finished` de façon asynchrone, donc le duel local a le même trou.

### Questions dont l’énoncé ne permet pas de répondre

- Palettisation, difficultés 2 et 3 : le calcul utilise une hauteur max de 150 à 175 cm, le texte affiche toujours « hauteur max : 150 cm », et `data.maxHeight` est forcé à 150.
- Coût de transport, difficultés 2 et 3 : remise, carburant et péage entrent dans le résultat mais ne figurent pas dans l’énoncé. Le joueur ne peut pas calculer.
- Plan de chargement, difficultés 2 et 3 : le taux d’espace utile n’est pas annoncé. En difficulté 1, `20 / 3` produit un flottant ; le pavé numérique ne peut jamais l’égaler (`parseInt` contre `6.666…`).
- Culture, première fiche : « Quelle ville a accueilli les JO d’été 2024 ? » a pour réponse `2024` et pour indice « Ville française ». Les 125 réponses culture sont numériques ; celle-ci ne correspond pas à la question.
- `mathQuestions` `math_004` : clés `options`, `correctOption` et `explanation` dupliquées. L’explication parle de 66 palettes alors que l’option retenue est « 33 ».

Contrôle automatique : les index `correctOption` des banques QCM (vocabulaire 65, et 20 à 25 items par module) sont dans les bornes des options. Le défaut est le branchement UI, pas les index.

### Clavier global en écran partagé

`QuestionCard` écoute `keydown` sur `window`. En championnat, les deux équipes reçoivent les mêmes frappes. Le listener n’est pas nettoyé de façon fiable quand `userInput` change (dépendance incomplète de l’effet).

### Fin de partie et corde

La victoire par corde demande 10 points d’écart (`±10` par manche, bornes `±100`). Sans écart, le duel local ne se termine jamais : `nextRound` du store n’est pas appelé. Le championnat s’arrête après 10 manches via `roundNumber > totalRounds`, avec un décalage d’une manche à cause de l’incrément dans le `setTimeout`.

### Authentification absente

`Login` enregistre prénom et classe dans `localStorage`. Pas de session, pas de rôle enseignant/élève. `JSON.parse` du profil n’est pas protégé : une valeur corrompue bloque le démarrage. La route `/join` exige aussi ce profil avant d’afficher le formulaire mobile.

## Moyen

### Trois silos de données

| Donnée | Clé réelle | Clé lue par le QG et les Archives |
| --- | --- | --- |
| Championnat | `championship-storage` (Zustand persist) | `logi-battle-championship` |
| Joueurs bataillon | `logi-battle-players` | `logi-battle-players` (OK) |
| Historique de parties | jamais écrit | `logi-battle-game-history` |

Le tableau de bord et les archives affichent donc un championnat vide. « Effacer les données » ne supprime pas `championship-storage` ni `user_profile`. Le tri d’activité fait `dateB - dateA` sur des chaînes ISO : le résultat est `NaN`.

Les barres de progression des modules (menu et QG) sont des constantes (75 %, 25 %, 100 %…). Les réglages son, musique et durée du timer sont sauvés mais aucun écran de jeu ne les lit. `GAME_CONFIG` et `gameUtils.isAnswerCorrect` ne sont pas utilisés par les cartes.

### Firebase encore initialisé

`VITE_DB_MODE=supabase`, mais `database.js` importe `firebase.js`, qui appelle `initializeApp` avec les placeholders `YOUR_API_KEY`. Le mode local de `createGame` ignore `customGameId`. Le canal broadcast est mis en cache dans l’objet `localDB`, y compris en mode Supabase.

### Documentation et outillage

- `README.md` décrit Firebase, la police Lexend et trois modules. Le code utilise Supabase, Figtree/Fraunces et 16 modules.
- `RELAY.md` (mars 2026) marque encore la synchro Firebase comme à faire, alors qu’un broadcast Supabase partiel existe.
- `npm run lint` lance ESLint, absent des `devDependencies` et sans config.
- Aucun test. `TESTING.md` n’est pas branché à la CI.
- Le workflow Pages build et déploie, sans lint ni test. Les variables Vite viennent du `.env` commité.

### Code mort ou décoratif

Non référencés par un écran actif : `GameOver`, `ParticleEffect`, `ScreenVibration`, les dix cartes métier listées plus haut, `calculateRopePosition`, `API_ENDPOINTS`. `kimi_agent.py` dépend de `python-dotenv` et `requests` ; `requirements.txt` ne déclare que ces usages s’ils y figurent — à vérifier avant exécution, et la clé ne doit plus être lue depuis un fichier versionné.

## Faible

- Avatars Google d’exemple (URLs `lh3.googleusercontent.com/aida-public/...`) dans le store, jamais affichés par le plateau actuel.
- `React.StrictMode` double les effets en développement : deux questions et deux abonnements possibles au montage.
- Dépendances `firebase` et `qrcode` présentes alors que le chemin actif est Supabase + API QR tierce.
- Commentaires et noms d’équipes encore en « TEAM ALPHA / TEAM BRAVO » à côté de l’identité Geronimo.

## Ce qui tient

- Les banques QCM ont des index valides et des explications.
- Le store championnat (création de classe, premier groupe champion, transfert de titre si le challenger gagne, classement points puis victoires) est cohérent **si** `winner` vaut vraiment `'challenger'`, `'champion'` ou `'draw'`.
- Le schéma SQL des tables `games` et `questions` correspond aux champs écrits par `gamesService` / `questionsService`.
- Le design system (couleurs, Figtree, icônes Material) est chargé depuis `index.css`.
- Le mode entraînement borne bien la session à 10 questions, bonus de série compris, pour les types réellement affichés en QCM ou en calcul.

## Ordre de correction recommandé

1. Révoquer la clé Kimi, resserrer les politiques Supabase (insertion de partie par code, mises à jour limitées, pas de lecture de `correctAnswer` par les joueurs), sortir les `.env` du Git.
2. Rebrancher `GameBoard` sur `QuestionCard` / `VocabularyCard` (ou les cartes métier) et supprimer les options en dur.
3. Router chaque `type` vers sa carte. Traiter culture, supply chain, stock, sécurité, etc. comme des QCM, pas comme un pavé numérique.
4. Calculer le gagnant de manche à partir des statuts passés en arguments, pas du state React du rendu précédent. Enregistrer le nul comme `'draw'`.
5. Appeler `subscribe()` côté joueur, inclure `import.meta.env.BASE_URL` dans l’URL du QR, générer le QR en local, allonger le code à 11 caractères, et ajouter le fallback SPA GitHub Pages.
6. Aligner QG et Archives sur `championship-storage`. Afficher dans les énoncés tous les paramètres utilisés par le calcul. Corriger la question JO 2024 et `math_004`.
7. Ajouter ESLint au projet et un test de non-régression : pour chaque type, la carte rend les options et la bonne réponse est sélectionnable.

Cet audit décrit l’état du code. Il ne modifie pas le comportement de l’application.
