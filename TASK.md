# TASK.md — Plan de développement multi-IA (Geronimo Coop)

> **Source** : findings de [`AUDIT.md`](./AUDIT.md) (6 juillet 2026).
> **Exécutants** : Claude Sonnet 5 (`S5-xxx`), GPT 5.5 (`GPT-xxx`), Kimi Code 2.7 (`KC-xxx`), + actions humaines (`H-xxx`).
> **Objectif** : paralléliser sans se marcher dessus, du correctif critique jusqu'aux features long terme.

---

## 0. Mode d'emploi (à lire par chaque IA avant toute tâche)

### Règles de travail
1. **Une tâche = une branche = une PR.** Branche nommée `<id-tache>-<slug>` (ex. `s5-011-subscribe-playergame`). L'ID de tâche apparaît dans le titre du commit et de la PR.
2. **Ne jamais commencer une tâche dont les dépendances (`Deps`) ne sont pas mergées.**
3. **Respecter la propriété des fichiers (§2).** Si ta tâche exige de toucher un fichier appartenant à une autre IA : soit la dépendance est explicite dans ce document, soit tu t'arrêtes et tu signales le conflit dans la PR au lieu de modifier le fichier.
4. **Cocher sa case** dans le tableau de suivi (§8) dans le même commit que la tâche.
5. **Critères d'acceptation obligatoires** : chaque tâche liste les siens ; en plus, pour toute tâche de code : `npm run build` passe, et à partir de la Phase 2 : `npm run lint` et `npm test` passent.
6. **Interdictions globales** : ne jamais committer de secrets ; ne pas introduire de nouvelle dépendance sans que la tâche le prévoie ; ne pas reformater des fichiers hors périmètre de la tâche (les sweeps mécaniques sont des tâches dédiées KC) ; ne pas « améliorer au passage » — ouvrir une note dans la PR à la place.
7. **Langue** : UI et textes en français (typographie française, cf. KC-030) ; code et identifiants en anglais ; commits en français ou anglais mais cohérents.

### Cadence
- Les **phases sont séquentielles**, les tâches **dans une phase sont parallèles** (sauf `Deps`).
- Fin de phase = **point de synchronisation** : tout est mergé sur la branche d'intégration, on rebase, puis phase suivante. Les sweeps mécaniques de Kimi (KC-030, KC-040…) s'exécutent **uniquement aux points de synchronisation**, jamais en parallèle d'autres travaux, car ils touchent des dizaines de fichiers.

---

## 1. Profils des IA et logique de répartition

> ⚠️ Profils **indicatifs**, fondés sur la réputation générale de chaque famille de modèles ; les versions exactes (GPT 5.5, Kimi Code 2.7) évoluent vite. La vraie logique de répartition est la **nature des tâches** : si un modèle déçoit sur son lot, réattribuez par blocs entiers (cf. §7), pas tâche par tâche.

### Claude Sonnet 5 — « le chirurgien du cœur de jeu »
- **Forces exploitées** : raisonnement sur du code asynchrone/temps réel (closures, cycle de vie React, WebSockets), refactoring multi-fichiers cohérent sur grand contexte, rigueur sur les invariants (scores, machine à états), écriture de tests.
- **Faiblesses anticipées** : peut sur-refactorer si le périmètre n'est pas borné → les tâches S5 listent explicitement les fichiers autorisés.
- **Lot attribué** : sécurité, couche temps réel Supabase, boucles de jeu, stores, services, navigation, tests. C'est le lot où une erreur casse tout — il exige le raisonnement le plus fiable.

### GPT 5.5 — « l'architecte de l'expérience »
- **Forces exploitées** : UI/UX, accessibilité (ARIA, sémantique HTML), rédaction (docs, guides de style), connaissance large des standards web (WCAG, Open Graph, PWA), bon jugement produit.
- **Faiblesses anticipées** : sur des edits mécaniques répétitifs, tendance à paraphraser/dériver du pattern demandé → les sweeps répétitifs vont à Kimi, GPT définit les patterns et traite les cas uniques.
- **Lot attribué** : accessibilité, écrans non-cœur-de-jeu (Login, GameSelection, PlayerJoin, HQDashboard, Archives, GameOver), `index.html`/SEO/PWA, documentation, décisions de wording et guide de style.

### Kimi Code 2.7 — « l'ouvrier de masse »
- **Forces exploitées** : débit élevé et faible coût sur les modifications mécaniques à grande échelle (sweeps typographiques, renommages, migration de tokens), très bon en français/données, suppression de code mort sans état d'âme.
- **Faiblesses anticipées** : moins fiable sur la logique asynchrone subtile et les décisions d'architecture → aucune tâche KC ne touche la couche temps réel ni les stores ; chaque tâche KC a un pattern précis défini en amont (souvent par GPT ou Sonnet).
- **Lot attribué** : banques de questions (`src/utils/*Questions.js`), suppressions de code mort, sweeps (typographie FR, tokens couleur, terminologie), données de configuration.

### Humain (Roger) — actions que les IA ne peuvent PAS faire
Révocation de clés, dashboards Supabase/GitHub, décisions de marque. Voir tâches `H-xxx`.

---

## 2. Propriété des fichiers (anti-conflits)

| Zone | Propriétaire | Fichiers |
|---|---|---|
| Cœur de jeu & temps réel | **Sonnet 5** | `src/App.jsx`, `src/services/**`, `src/hooks/**`, `src/components/{GameBoard,ChampionshipGameBoard,PlayerGame,HostGame,TeamSetup,TrainingMode,QuestionCard,VocabularyCard}.jsx`, `supabase_schema.sql`, `vite.config.js`, `.github/workflows/**`, config tests/lint |
| Écrans & expérience | **GPT 5.5** | `index.html`, `public/**`, `src/styles/**`, `tailwind.config.js`, `src/components/{Login,GameSelection,PlayerJoin,HQDashboard,Archives,GameOver,GroupManager,BattalionManager,ChampionshipManager,ChampionshipBoard,BrandMark,ScreenVibration,ParticleEffect,RopeAnimation}.jsx`, `README.md`, `SETUP.md`, `TESTING.md`, `docs/**` |
| Données & sweeps | **Kimi 2.7** | `src/utils/**`, `src/config/constants.js`, suppressions de fichiers morts, sweeps multi-fichiers **aux points de synchro uniquement** |

**Exceptions** : toujours listées dans la tâche (`Fichiers` fait foi). Un sweep KC peut toucher toutes les zones mais seulement au point de synchro, PR relue par le propriétaire de zone (ou l'humain).

---

## 3. PHASE 0 — Sécurité (bloquant, avant tout le reste)

> Séquentiel. Rien d'autre ne démarre tant que P0-fin n'est pas atteint (sauf lecture/préparation).

### H-001 — Révoquer et régénérer les secrets 🔴 `[HUMAIN — IMMÉDIAT]`
- **Faire** : (1) révoquer la clé Kimi (`KIMI_API_KEY` du `.env` racine) sur platform.moonshot.ai ; (2) régénérer les clés API du projet Supabase (Dashboard → Settings → API) ; (3) conserver les nouvelles valeurs HORS du dépôt.
- **Acceptation** : anciennes clés inertes (une requête avec l'ancienne clé échoue).

### S5-001 — Sortir les `.env` du suivi git — `P0` `S` `Deps: —`
- **Fichiers** : `.gitignore` (racine, à créer), `logi-battle/.gitignore`, suppression du suivi de `.env` et `logi-battle/.env`, création `logi-battle/.env.example` et `.env.example` racine (placeholders uniquement).
- **Faire** : `git rm --cached .env logi-battle/.env` ; ajouter `.env` et `*.env` aux deux `.gitignore` ; `.env.example` documentant chaque variable (`VITE_DB_MODE`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, Firebase à retirer en S5-020).
- **Acceptation** : `git ls-files | grep -E '\.env$'` vide ; build local OK avec un `.env` reconstruit à la main.

### H-002 — Purger l'historique git 🔴 `[HUMAIN]` `Deps: S5-001, H-001`
- **Faire** : `git filter-repo --invert-paths --path .env --path logi-battle/.env` (ou BFG), force-push, prévenir tout autre cloneur. Action destructive : décision humaine.
- **Acceptation** : `git log --all --full-history -- .env` vide.

### S5-002 — Durcir les policies RLS Supabase — `P0` `M` `Deps: —`
- **Fichiers** : `supabase_schema.sql` (+ script de migration à appliquer via le dashboard : tâche H-003).
- **Faire** : remplacer les deux policies `FOR ALL USING (true) WITH CHECK (true)` par : `games` → SELECT public ; INSERT public avec `WITH CHECK` sur les colonnes attendues ; UPDATE limité aux colonnes de jeu (`rope_position`, scores, `status`, `winner`) — idéalement via une fonction RPC `SECURITY DEFINER` avec un `host_token` généré à la création de partie ; **aucun DELETE anonyme**. `questions` → SELECT public seul (l'écriture arrivera avec l'éditeur, S5-052).
- **Acceptation** : depuis la console anonyme, `delete()` et `update()` arbitraires échouent ; le flux hôte (création partie, maj score) fonctionne.

### H-003 — Appliquer la migration RLS en production `[HUMAIN]` `Deps: S5-002`

### S5-003 — Secrets côté CI — `P0` `S` `Deps: S5-001`
- **Fichiers** : `.github/workflows/deploy.yml`.
- **Faire** : step qui génère `logi-battle/.env` à partir des *Repository secrets* (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_DB_MODE=supabase`) avant le build. Documenter dans `SETUP.md` (note pour GPT-041).
- **Acceptation** : déploiement Pages vert sans `.env` committé. (Création des secrets GitHub = **H-004** `[HUMAIN]`.)

---

## 4. PHASE 1 — Rendre le jeu jouable (P1)

> Parallèle : Sonnet sur le cœur, Kimi sur les banques de questions, GPT prépare la Phase 3 (audits de patterns, guide de style GPT-042) sans committer de code sur les zones Sonnet.

### Lot Sonnet 5 — chaîne multijoueur & boucles de jeu

**S5-010 — Corriger l'URL du QR code** — `P1` `S` `Deps: —`
- **Fichiers** : `src/components/HostGame.jsx`, `src/App.jsx`.
- **Faire** : `getPlayerUrl()` → `` `${window.location.origin}${import.meta.env.BASE_URL}?game=${gameId}` `` ; dans `App.jsx`, router sur `search.includes('game=')` en premier et `currentPath.endsWith('/join')` en secours.
- **Acceptation** : `npm run build && npm run preview` → l'URL générée ouvre bien l'écran PlayerJoin avec le code pré-rempli, y compris avec `base: '/logi-battle/'`.

**S5-011 — `subscribe()` + cleanup côté élève** — `P1` `M` `Deps: —`
- **Fichiers** : `src/components/PlayerGame.jsx`, `src/services/database.js`.
- **Faire** : appeler `.subscribe()` sur le canal ; retourner un cleanup `supabase.removeChannel(channel)` + invalidation du cache ; sortir le cache des canaux de `localDB` vers un module dédié avec `releaseChannel(gameId)`.
- **Acceptation** : test manuel 2 onglets (hôte + élève) : la question arrive sur l'élève, sa réponse arrive à l'hôte ; pas de handler dupliqué après unmount/remount (vérifier en StrictMode).

**S5-012 — Éliminer les stale closures de l'hôte** — `P1` `M` `Deps: S5-011`
- **Fichiers** : `src/components/GameBoard.jsx`.
- **Faire** : cleanup réel du canal ; handler `player_answer` lisant l'état courant via `useRef` (ou `useGameStore.getState()` + reducer local pour les statuts d'équipe) ; supprimer le journal factice, l'« ÉVÉNEMENT CRITIQUE » et « MORAL GLOBAL 88% » codés en dur (lignes 31-35, 344-353, 440-448).
- **Acceptation** : deux réponses successives déclenchent la fin de manche avec les statuts réels ; plus aucune donnée factice affichée.

**S5-013 — Corriger le calcul du gagnant de manche** — `P1` `M` `Deps: S5-012`
- **Fichiers** : `src/components/GameBoard.jsx`, `src/components/ChampionshipGameBoard.jsx`.
- **Faire** : passer les statuts fraîchement calculés en paramètres à `endRound(statusA, statusB)` (ou calculer le gagnant dans un `useEffect` sur `[teamAStatus, teamBStatus]`) ; à temps égaux, départager aléatoirement ou déclarer la manche nulle (décision : manche nulle).
- **Acceptation** : scénario « A répond faux, B répond juste » → B marque. Test unitaire ajouté dès que Vitest existe (S5-024).

**S5-014 — Fin de partie fiable + écran de fin en mode local** — `P1` `M` `Deps: S5-013`
- **Fichiers** : `GameBoard.jsx`, `ChampionshipGameBoard.jsx`, `src/components/GameOver.jsx` (réactivation), `src/config/constants.js`.
- **Faire** : lire `gameStatus` à jour dans les timeouts (`getState()`), annuler le timeout quand `finished` ; afficher `GameOver` en mode local ; badge manche `x/{TOTAL_ROUNDS}` depuis `constants.js` (supprimer le « /20 » en dur) ; fin de partie à `TOTAL_ROUNDS` ou corde à ±100.
- **Acceptation** : une partie locale se termine toujours (par corde ou par manches) et affiche le vainqueur ; aucune manche ne démarre après la fin.

**S5-015 — Match nul du championnat** — `P1` `S` `Deps: —`
- **Fichiers** : `src/App.jsx` (lignes ~101-113).
- **Faire** : `const winner = result.winner === 'A' ? 'challenger' : result.winner === 'B' ? 'champion' : 'draw'`.
- **Acceptation** : une égalité crédite +1 point à chacun (comportement `recordMatch` existant) et ne compte pas de défense de titre.

**S5-016 — Rendre les vraies cartes question dans GameBoard** — `P1` `M` `Deps: S5-012`
- **Fichiers** : `src/components/GameBoard.jsx`.
- **Faire** : remplacer les 4 boutons factices (l. 383-397) par le rendu `QuestionCard`/`VocabularyCard` par équipe, sur le modèle de `ChampionshipGameBoard.jsx:292-381`.
- **Acceptation** : mode duel local jouable de bout en bout au clavier ET à la souris, pour les deux équipes.

**S5-017 — Ne plus diffuser la réponse correcte** — `P1` `M` `Deps: S5-011, S5-012`
- **Fichiers** : `GameBoard.jsx`, `PlayerGame.jsx`.
- **Faire** : payload `new_question` sans `correctAnswer`/`correctOption`/`explanation` mais **avec** `options`, `category`, `time` réel ; l'élève envoie sa réponse brute (`player_answer: {team, playerId, answer, timeMs}`), l'hôte valide et renvoie le verdict dans `round_end` (avec `explanation` pour l'affichage pédagogique).
- **Acceptation** : l'onglet réseau d'un élève ne contient jamais la réponse avant `round_end` ; le feedback « Bonne/Mauvaise réponse » fonctionne toujours.

**S5-018 — Scoper le clavier de QuestionCard** — `P1` `S` `Deps: S5-016`
- **Fichiers** : `src/components/QuestionCard.jsx`.
- **Faire** : remplacer l'écouteur `window` par un conteneur focusable (`tabIndex={0}` + `onKeyDown`), ignorer si `e.target` est interactif ; reset `userInput` sur changement de `question.id` (pattern de `VocabularyCard.jsx:40-43`).
- **Acceptation** : en championnat, taper des chiffres ne remplit qu'une carte ; la saisie ne persiste pas d'une manche à l'autre.

### Lot Kimi 2.7 — contenu pédagogique (aucun risque de conflit : `src/utils/` seulement)

**KC-010 — Corriger les questions fausses** — `P1` `S` `Deps: —`
- **Fichiers** : `src/utils/cultureQuestions.js`, `mathQuestions.js`, `safetyQuestions.js`.
- **Faire** : JO 2024 → reformuler en « En quelle année Paris a-t-elle accueilli… » (réponse 2024) ; `math_004` → supprimer les clés dupliquées et rendre énoncé/réponse cohérents (1 niveau → 33) ; « semme » → « semelle » ; harnais : retirer « Chutes de plain-pied » → « Chutes de hauteur » ; « Interdit de marcher » → « Interdit aux piétons ».
- **Acceptation** : script de validation (fourni en KC-012) sans erreur ; relecture humaine du diff (contenu noté).

**KC-011 — Corriger le générateur procédural** — `P1` `M` `Deps: —`
- **Fichiers** : `src/utils/questionGenerator.js`.
- **Faire** : `loading_plan` difficulté 1 → ne tirer que des couples divisibles ou `Math.floor` + énoncé cohérent ; palettisation difficultés 2-3 → injecter le `maxHeight` réellement tiré dans l'énoncé (l. 85-122).
- **Acceptation** : pour 1 000 générations de chaque type/difficulté, la réponse est un entier atteignable et l'énoncé contient les valeurs utilisées dans le calcul (test fourni en KC-012).

**KC-012 — Script de validation des banques** — `P1` `M` `Deps: KC-010, KC-011`
- **Fichiers** : `logi-battle/scripts/validate-questions.mjs` (nouveau).
- **Faire** : vérifier pour chaque question : `correctOption` dans les bornes, pas d'options dupliquées, pas de clés dupliquées (parse AST ou heuristique JSON), champs requis présents, énoncés se terminant par `?`, cohérence générateur (boucle de fuzz). Brancher dans la CI (note pour S5-024).
- **Acceptation** : `node scripts/validate-questions.mjs` exit 0 ; échoue si on réintroduit volontairement une erreur.

### Lot GPT 5.5 — préparation (pas de code sur zones Sonnet)

**GPT-001 — Guide de style & glossaire** — `P1` `M` `Deps: —`
- **Fichiers** : `docs/STYLE_GUIDE.md` (nouveau).
- **Faire** : figer le glossaire (formateur/élève/équipe/groupe/partie/manche/match/QG…), la voix par écran (tutoiement élève, vouvoiement formateur), les règles typographiques FR (espaces insécables, pas de Title Case, `Ex. :`, `…`, `toLocaleString('fr-FR')`), la liste des franglais à remplacer (« Win Rate » → « Taux de victoire »…), et les décisions en attente pour H-005. Ce document est le **référentiel des sweeps KC-030/KC-031**.
- **Acceptation** : relu/validé par l'humain (H-005) avant tout sweep.

### H-005 — Décisions de marque `[HUMAIN]` `Deps: GPT-001`
- Trancher : (1) registre militaire assumé OU pivot coopératif (renommages Bataillon/QG/Combat) ; (2) tutoiement élève : oui/non ; (3) couleurs d'équipes officielles (bleu/or de `constants.js` OU sage/coral du design system) ; (4) l'app doit-elle être indexable (sinon `noindex`).

---

## 5. PHASE 2 — Assainissement technique (P2)

> Démarre après merge complet de la Phase 1. Sonnet refactore, Kimi supprime, GPT optimise l'enveloppe.

### Lot Sonnet 5

**S5-020 — Supprimer Firebase, réduire `database.js` à 2 adaptateurs** — `P2` `L` `Deps: Phase 1`
- **Fichiers** : `src/services/database.js`, suppression `src/services/firebase.js` + `firestoreSchema.js`, `package.json` (retrait `firebase`), `.env.example`.
- **Faire** : interface unique `{createGame, getGame, updateGameScore, getGameChannel, releaseChannel}` implémentée par `supabaseAdapter` et `localAdapter`, choisie une fois au démarrage ; supprimer toutes les branches `USE_FIREBASE` et le bloc dupliqué (l. 188-198) ; supprimer `subscribeToGame` (mort) ou le brancher pour la reconnexion (décision : le garder pour S5-051, documenté).
- **Acceptation** : build OK ; taille du bundle JS réduite d'au moins 100 kB minifié (mesurer avant/après dans la PR) ; mode `local` et mode `supabase` fonctionnels.

**S5-021 — Hook commun `useGameRound`** — `P2` `L` `Deps: S5-020`
- **Fichiers** : `src/hooks/useGameRound.js` (nouveau), `GameBoard.jsx`, `ChampionshipGameBoard.jsx`, `TrainingMode.jsx`, `src/config/constants.js`.
- **Faire** : extraire timer (interval unique piloté par `isRoundActive`, pas de recréation par tick), cycle `startNewRound/endRound`, statuts d'équipes, décompte des manches. Constantes (`ROUND_TIME`, `VOCABULARY_TIME`, seuils corde) lues depuis `constants.js` uniquement. Les 3 écrans deviennent des consommateurs.
- **Acceptation** : comportement identique sur les 3 modes (dont les fixes S5-013/014) ; ~-400 lignes nettes ; tests du hook (S5-024).

**S5-022 — Navigation : remplacer les 10 booléens** — `P2` `M` `Deps: S5-021`
- **Fichiers** : `src/App.jsx`.
- **Faire** : soit react-router (routes `/`, `/join`, `/host`, `/championship`, `/training`, `/hq`, `/archives`, `/battalion` — attention base path), soit machine à états unique `screen: '...'` si on refuse la dépendance (décision : **react-router**, standard et gère back/refresh). Intégrer `React.lazy` + `Suspense` par route : chunk élève (`PlayerJoin`/`PlayerGame`) séparé du reste.
- **Acceptation** : back/refresh conservent l'écran ; deep-link `?game=` OK ; build Vite montre ≥ 3 chunks ; le chunk chargé par la route élève ≤ 250 kB minifié.

**S5-023 — ESLint opérationnel** — `P2` `S` `Deps: Phase 1`
- **Fichiers** : `logi-battle/eslint.config.js` (nouveau), `package.json` (devDeps : eslint, plugins react/react-hooks), `.github/workflows/ci.yml` (nouveau : lint+build+validate-questions sur `pull_request`).
- **Acceptation** : `npm run lint` exit 0 (corriger ou désactiver localement avec justification) ; le workflow CI tourne sur PR.

**S5-024 — Vitest + premiers tests** — `P2` `M` `Deps: S5-021, S5-023`
- **Fichiers** : config Vitest, `src/**/*.test.js`.
- **Faire** : tests de la logique pure : classement championnat (`useChampionshipStore` : points, draw, défenses), `questionGenerator` (fuzz : réponses atteignables), gagnant de manche (S5-013), `useGameRound`. Intégrer `npm test` à la CI.
- **Acceptation** : ≥ 25 tests verts, cas de régression M2/M3/M4 de l'audit couverts.

**S5-025 — QR généré localement** — `P2` `S` `Deps: S5-022`
- **Fichiers** : `src/components/HostGame.jsx`.
- **Faire** : remplacer `api.qrserver.com` par le paquet `qrcode` (déjà en deps) en import dynamique côté hôte ; `alt` descriptif (`QR code pour rejoindre la partie ${gameId}`).
- **Acceptation** : QR affiché sans aucune requête externe (vérifier l'onglet réseau).

### Lot Kimi 2.7

**KC-020 — Supprimer le code mort** — `P2` `S` `Deps: Phase 1` ⚠️ *au point de synchro, avant S5-021*
- **Fichiers (suppression)** : `GreenCard,JitCard,LegalCard,MathCard,ReceptionCard,RouteCard,SafetyCard,StockCard,SupplyChainCard,TeamLeaderCard,TraceabilityCard}.jsx`, `src/utils/gameUtils.js` ; vérifier par grep qu'aucun import n'existe avant chaque suppression. (`firestoreSchema.js` part avec S5-020 ; `GameOver.jsx` est réactivé par S5-014 — **ne pas supprimer**.)
- **Acceptation** : build OK ; `grep -r "JitCard\|SafetyCard\|…" src/` vide.

**KC-021 — Registre unique des banques de questions** — `P2` `M` `Deps: KC-012`
- **Fichiers** : `src/utils/questionBanks.js` (nouveau), `src/utils/questionGenerator.js`.
- **Faire** : `export const questionBanks = { jit: jitQuestions, safety: safetyQuestions, … }` ; remplacer `getRandomQuestionType(13 booléens positionnels)` par `getRandomQuestionType(enabledTypes: string[])` et la chaîne de 14 `else if` de `generateNextQuestion` par une lookup table.
- **Acceptation** : tests S5-024 verts ; l'ajout d'un 17ᵉ module ne demande plus qu'une entrée de registre.

**KC-022 — Migration des clés localStorage** — `P2` `S` `Deps: GPT-022`
- **Fichiers** : `src/config/constants.js` (constantes `STORAGE_KEYS`), `Archives.jsx`, `HQDashboard.jsx`, `BattalionManager.jsx`, `Login.jsx`.
- **Faire** : centraliser toutes les clés sous `geronimo-coop-*` dans `constants.js` ; au démarrage, migration one-shot des anciennes clés `logi-battle-*` (copie puis suppression) ; `JSON.parse` systématiquement enveloppé (try/catch + valeur par défaut).
- **Acceptation** : données existantes conservées après migration ; aucune chaîne `logi-battle-` dans `src/` (grep).

### Lot GPT 5.5

**GPT-020 — Webfonts optimisées** — `P2` `S` `Deps: Phase 1`
- **Fichiers** : `src/styles/index.css`, `index.html`, sweep léger des composants utilisant Material Symbols (coordonner avec les propriétaires si hors zone → lister dans la PR).
- **Faire** : garder UNE famille d'icônes (Material Symbols Rounded, subset), Figtree limité à 400/600/700, Fraunces conservé ; remplacer les `@import` CSS par `<link rel="preconnect">` + `<link rel="stylesheet">` dans `index.html`.
- **Acceptation** : plus aucun `@import` de font dans le CSS ; icônes correctes sur tous les écrans ; poids webfonts mesuré en baisse dans la PR.

**GPT-021 — Sélecteurs Zustand + mémoïsation ciblée** — `P2` `M` `Deps: S5-021`
- **Fichiers** : composants de la zone GPT uniquement (`GameSelection`, `GameOver`, `Archives`, `HQDashboard`…) ; pour la zone Sonnet, ouvrir une note listant les sites (`GameBoard.jsx:15`, `HostGame.jsx:10`, `TeamSetup.jsx:6`) → repris par Sonnet dans S5-021.
- **Faire** : `useGameStore(s => s.x)` au lieu du store entier ; `React.memo` sur les panneaux statiques.
- **Acceptation** : React DevTools Profiler — le tick du timer ne re-rend plus les panneaux hors timer.

**GPT-022 — QG & Archives branchés sur les vraies données** — `P2` `M` `Deps: Phase 1`
- **Fichiers** : `HQDashboard.jsx`, `Archives.jsx`.
- **Faire** : lire via `useChampionshipStore` (plus de `localStorage` direct pour le championnat) ; corriger le tri de dates (`new Date(b.date) - new Date(a.date)`) ; `handleClearData` efface les vraies clés (coordonné avec KC-022) ; retirer les stats factices restantes.
- **Acceptation** : après un match de championnat joué, le QG affiche 1 classe / 1 match et les Archives listent le match.

---

## 6. PHASE 3 — Accessibilité & qualité d'expérience (P2/P3)

> GPT pilote. Sonnet ne touche que ce qui traverse le cœur de jeu. Kimi exécute les deux sweeps aux points de synchro.

### Lot GPT 5.5

**GPT-030 — Contrastes** — `P2` `M` — sur fonds or/sage : `text-white` → `text-[#17314a]` (pattern validé : ratio 7,53:1) ; `text-gray-600/500` → `text-gray-400` minimum sur fonds marine. Fichiers zone GPT + note pour Sonnet (QuestionCard, PlayerGame). **Acceptation** : toutes les combinaisons listées en AUDIT §5-B1 ≥ 4,5:1 (vérifier au contrast-checker, captures dans la PR).

**GPT-031 — Formulaires accessibles** — `P2` `S` — `htmlFor`/`id`/`autoComplete` sur les 4 champs (Login ×2, PlayerJoin ×2) ; vrai label pour le code de partie ; `inputMode`/`autoCapitalize` adaptés.

**GPT-032 — Noms accessibles & icônes** — `P2` `M` — `aria-hidden="true"` sur toutes les ligatures Material ; `aria-label` sur chaque bouton icône ; interrupteurs du QG en `role="switch"` + `aria-checked`. (Pattern défini ici ; le sweep multi-fichiers exécuté par **KC-031**.)

**GPT-033 — Live regions** — `P2` `M` — `role="status"`/`aria-live` sur : verdict de réponse (PlayerGame, cartes), annonce « Plus que 5 secondes » (pas chaque tick), journal du GameBoard, scores. Coordonner les fichiers Sonnet via PR conjointe.

**GPT-034 — Modale GameOver conforme** — `P2` `S` `Deps: S5-014` — `role="dialog"`, `aria-modal`, focus initial, boucle de focus, Escape.

**GPT-035 — Reduced motion** — `P2` `S` — `<MotionConfig reducedMotion="user">` dans `main.jsx` (PR conjointe Sonnet), media query CSS globale, `ScreenVibration` désactivé si préférence réduite.

**GPT-036 — Erreurs inline** — `P3` `M` — remplacer `alert()`/`confirm()` par messages inline `role="alert"` + `aria-describedby` (PlayerJoin, GameSelection, HQDashboard) et un composant `ConfirmDialog` accessible.

**GPT-037 — Structure & divers a11y** — `P3` `M` — un `h1` par écran, ordre de titres, `<main>` landmarks, `focus-visible:ring` généralisé (brancher `.focus-ring` existant), cibles tactiles ≥ 44 px, `role="progressbar"` sur la corde, étoiles de difficulté avec `aria-label`.

### Lot Sonnet 5

**S5-030 — Timer réglable et branché** — `P2` `M` `Deps: S5-021, KC-022`
- **Fichiers** : `useGameRound.js`, `HQDashboard.jsx` (coordonné GPT), `PlayerGame.jsx`, `constants.js`.
- **Faire** : `useGameRound` lit `timerDuration` des réglages (clé centralisée) ; option « sans limite » (toggle QG) ; le payload `new_question` porte la durée réelle et la barre élève l'utilise (plus de `/30` en dur).
- **Acceptation** : régler 45 s dans le QG change réellement la durée partout ; mode sans limite : pas d'auto-submit. Satisfait WCAG 2.2.1.

### Lot Kimi 2.7 (sweeps aux points de synchro, référentiel = GPT-001)

**KC-030 — Sweep typographie française** — `P2` `M` `Deps: GPT-001, H-005` — espaces insécables (` `) avant `! ? : ;`, `…`, « Ex. : », fin du Title Case, `toLocaleString('fr-FR')` pour les nombres. Tous fichiers UI. **Acceptation** : grep de contrôle fourni dans la PR ; aucun changement de logique (diff strings-only).

**KC-031 — Sweep terminologie + ARIA icônes** — `P2` `L` `Deps: GPT-032, KC-030` — appliquer le glossaire (formateur partout, équipe/groupe, partie/manche/match, franglais remplacés, renommages actés en H-005) + le pattern GPT-032 (`aria-hidden` ligatures, `aria-label` boutons) sur tous les fichiers. **Acceptation** : grep « professeur|hôte|Win Rate|Bataillon » (selon décisions H-005) vide ; revue par GPT.

---

## 7. PHASE 4 — Marque, SEO & enveloppe (P3)

**GPT-040 — `<head>` complet + assets** — `P3` `M` `Deps: H-005` — meta description, OG/Twitter statiques, favicon SVG + `apple-touch-icon`, `theme-color`, `manifest.webmanifest` (`display: standalone`), `noindex` si décidé ; créer `public/` avec `og-image.png` 1200×630 (générer un visuel sobre aux couleurs Geronimo). Snippet prêt dans AUDIT §6.
**GPT-041 — Documentation à jour** — `P3` `M` — README (Supabase, Figtree/Fraunces, palette réelle, URL publiée, topics suggérés, section déploiement/secrets), SETUP.md, TESTING.md ; fusionner/archiver RELAY.md dans `docs/` ; déplacer `visuel */` → `docs/design/`, `kimi_agent.py` + `requirements.txt` → `tools/` (ou suppression, décision H-006).
**GPT-042 — Page de référence visuelle Geronimo** — `P3` `M` — `docs/design/BRAND.md` : palette (tokens), typo, ton (selon H-005), composants types ; capture des écrans réels.
**KC-040 — Sweep tokens couleur** — `P3` `L` `Deps: GPT-042` ⚠️ point de synchro — remplacer les ~260 hex arbitraires par les tokens Tailwind `geronimo-*` (mapping fourni par GPT-042 : `[#f4b942]`→`primary/geronimo-or`, `[#1d3d59]`/`[#0f2539]`→échelle marine, gris `slate/gray`→échelle dérivée) ; réconcilier les couleurs d'équipes (`constants.js` vs `design-system.css`) selon H-005. **Acceptation** : `grep -r "#f4b942\|#1d3d59" src/components` vide ; diff visuel validé écran par écran (captures dans la PR).
**KC-041 — Titres de modules réalignés** — `P3` `S` — `GameSelection.jsx` : titres/descriptions alignés sur le contenu réel (modèle : `TrainingMode.jsx:24-41`) ; retirer `progress`/`level` factices (ou brancher sur les stats réelles si S5-050 est mergée).

---

## 8. PHASE 5 — Produit long terme (features)

> Ordre recommandé ; chaque feature = mini-spec à écrire dans la PR avant le code.

| ID | Tâche | Qui | Effort | Deps | Résumé |
|---|---|---|---|---|---|
| S5-050 | **Boucle de progression** | Sonnet | M | Ph.2 | `TrainingMode`/`GameBoard`/Championnat écrivent stats + historique (structures `stats`/`achievements` de BattalionManager) via un `useProgressStore` ; QG/Archives les lisent. |
| GPT-050 | **Export CSV formateur** | GPT | S | S5-050 | Bouton QG : élèves × modules × scores × dates → CSV (`;` + BOM UTF-8 pour Excel FR). |
| S5-051 | **Reconnexion en cours de partie** | Sonnet | M | Ph.2 | Au join, fetch de l'état courant (`gamesService.getGame`) + resync broadcast ; un refresh élève ne perd plus la partie. |
| GPT-051 | **Stats par thème dans le QG** | GPT | M | S5-050 | Taux de réussite/temps moyen par `category`/`difficulty` ; vue par élève et par classe. |
| S5-052 | **Éditeur de questions (backend)** | Sonnet | M | S5-002 | Brancher `questionsService` (déjà écrit) ; RLS écriture réservée formateur (token/auth) ; fusion banque perso + intégrée dans `questionBanks`. |
| GPT-052 | **Éditeur de questions (UI)** | GPT | M | S5-052 | Écran CRUD formateur : création, édition, activation par module, aperçu de la question. |
| S5-053 | **Difficulté adaptative** | Sonnet | M | S5-050 | Ajuster `difficulty` (les générateurs la supportent) selon les 5 dernières réponses en entraînement. |
| KC-050 | **Badges réels** | Kimi | S | S5-050 | Définir 15-20 badges (données + conditions pures) ; attribution dans le store ; affichage Archives existant. |
| GPT-053 | **Vue projection TV** | GPT | M | Ph.2 | Route `/screen` : corde plein écran, grand timer, sans contrôles (pilotage depuis l'onglet formateur). |
| KC-051 | **Contre-la-montre** | Kimi | S | S5-021 | Variante TrainingMode : max de questions en 3 min (timer + streak existants). |
| S5-054 | **Boss final / points pondérés** | Sonnet | S | S5-021 | Manche finale difficulté 3 à points doublés ; corde pondérée par difficulté. |
| GPT-054 | **Sons** | GPT | S | H-007 | Brancher le toggle `soundEnabled` (assets libres de droits, `H-007` = validation humaine des sons). |
| S5-055 | **Mode « toute la classe » (Kahoot-like)** | Sonnet | L | S5-051, S5-017 | Presence Supabase (liste réelle des connectés — remplace le stub `handlePlayerJoin`), score individuel par élève, classement final ; revoir le débit broadcast (`self: false`, canal réponses dédié). |
| GPT-055 | **Mode devoirs asynchrone** | GPT+Sonnet | L | S5-052, S5-050 | Assignation module+deadline, jeu solo, remontée des résultats. Spec commune avant découpage. |

---

## 9. Tableau de suivi

> Cocher dans le même commit que la tâche. `[~]` = en cours, `[x]` = mergé, `[!]` = bloqué (expliquer en dessous).

### Phase 0 — Sécurité
- [ ] H-001 Révoquer/régénérer les clés `HUMAIN`
- [ ] S5-001 `.env` hors git + `.env.example`
- [ ] H-002 Purge historique `HUMAIN`
- [ ] S5-002 RLS durci (SQL)
- [ ] H-003 Migration RLS appliquée `HUMAIN`
- [ ] S5-003 Secrets CI
- [ ] H-004 Secrets GitHub créés `HUMAIN`

### Phase 1 — Jouable
- [ ] S5-010 URL QR · [ ] S5-011 subscribe élève · [ ] S5-012 closures hôte · [ ] S5-013 gagnant de manche · [ ] S5-014 fin de partie · [ ] S5-015 match nul · [ ] S5-016 cartes dans GameBoard · [ ] S5-017 anti-triche broadcast · [ ] S5-018 clavier scopé
- [ ] KC-010 questions fausses · [ ] KC-011 générateur · [ ] KC-012 script validation
- [ ] GPT-001 guide de style · [ ] H-005 décisions de marque `HUMAIN`

### Phase 2 — Assainissement
- [ ] KC-020 code mort *(synchro)* · [ ] S5-020 sans Firebase · [ ] S5-021 useGameRound · [ ] S5-022 router + code splitting · [ ] S5-023 ESLint+CI · [ ] S5-024 Vitest · [ ] S5-025 QR local
- [ ] KC-021 registre banques · [ ] GPT-022 QG/Archives réels · [ ] KC-022 clés localStorage
- [ ] GPT-020 webfonts · [ ] GPT-021 sélecteurs Zustand

### Phase 3 — A11y & UX
- [ ] GPT-030 contrastes · [ ] GPT-031 formulaires · [ ] GPT-032 pattern icônes · [ ] GPT-033 live regions · [ ] GPT-034 modale · [ ] GPT-035 reduced motion · [ ] GPT-036 erreurs inline · [ ] GPT-037 structure
- [ ] S5-030 timer réglable
- [ ] KC-030 sweep typo FR *(synchro)* · [ ] KC-031 sweep terminologie+ARIA *(synchro)*

### Phase 4 — Marque & enveloppe
- [ ] GPT-040 head+PWA · [ ] GPT-041 docs · [ ] GPT-042 BRAND.md · [ ] H-006 rangement racine `HUMAIN`
- [ ] KC-040 sweep tokens couleur *(synchro)* · [ ] KC-041 titres modules

### Phase 5 — Produit
- [ ] S5-050 · [ ] GPT-050 · [ ] S5-051 · [ ] GPT-051 · [ ] S5-052 · [ ] GPT-052 · [ ] S5-053 · [ ] KC-050 · [ ] GPT-053 · [ ] KC-051 · [ ] S5-054 · [ ] GPT-054 · [ ] H-007 `HUMAIN` · [ ] S5-055 · [ ] GPT-055

---

## 10. Réattribution & arbitrage

- **Si un modèle échoue 2 fois sur une tâche** : la tâche passe au propriétaire de la zone voisine la plus proche (KC→S5 pour la logique, GPT→KC pour le mécanique, S5→GPT pour l'UI), avec un commentaire dans le tableau.
- **Conflit de merge entre deux IA** : celui qui a mergé en premier a raison ; l'autre rebase. Jamais de force-push sur une branche d'autrui.
- **Doute sur une spec** : la PR pose la question à l'humain plutôt que de deviner ; les décisions actées sont reportées dans `docs/STYLE_GUIDE.md` ou ce fichier.
- **Estimation des efforts** : S ≈ < 1 h de session IA, M ≈ 1 session, L ≈ à découper si ça dépasse 2 sessions.
