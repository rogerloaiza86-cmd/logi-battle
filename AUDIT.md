# Audit complet — Geronimo Coop (ex Logi-Battle)

> **Date** : 6 juillet 2026
> **Périmètre** : dépôt `rogerloaiza86-cmd/logi-battle`, branche `master` (commit `f0bd6c2`)
> **Méthodologie** : 9 revues spécialisées menées en parallèle — revue de code & sécurité, architecture, CI/CD (workflows), performance (avec build réel mesuré), accessibilité (WCAG 2.1 AA), SEO/partage, identité de marque, UX writing, brainstorming produit — puis consolidation et déduplication.

---

## Synthèse exécutive

L'application a un vrai potentiel pédagogique : 16 modules de questions (~7 600 lignes de contenu aligné sur le référentiel logistique), un mode duel « tir à la corde », un championnat, un entraînement solo, et une base temps réel Supabase bien choisie. **Mais en l'état, les deux modes de jeu principaux ne fonctionnent pas en production**, la base de données est ouverte en écriture au public, et des secrets sont committés dans git.

### Les 6 constats majeurs

| # | Constat | Gravité |
|---|---------|---------|
| 1 | **Secrets committés dans git** : `.env` racine (clé API Kimi réelle, facturable) et `logi-battle/.env` (URL + clé anon Supabase). Le `.gitignore` n'exclut pas `.env`. | 🔴 Critique |
| 2 | **Base Supabase ouverte à tous** : policies RLS `FOR ALL USING (true) WITH CHECK (true)` — n'importe qui peut lire, modifier et **supprimer** toutes les parties avec la clé anon (publique par nature). | 🔴 Critique |
| 3 | **Le mode multijoueur QR est inopérant en production** : (a) l'URL du QR ignore le base path `/logi-battle/` → 404 GitHub Pages ; (b) le canal temps réel côté élève n'appelle jamais `.subscribe()` → aucune question reçue, aucune réponse envoyée. | 🔴 Critique |
| 4 | **Le mode duel local est injouable** : les 4 boutons de réponse de `GameBoard.jsx` sont factices (texte en dur, sans `onClick`), et la partie ne se termine jamais (stale closures). | 🔴 Critique |
| 5 | **~40 % du code est mort** : 11 des 13 `*Card.jsx` jamais importés, Firebase entier dans le bundle (~113 kB minifié mesurés) alors que l'app tourne en mode Supabase, `questionsService` et `subscribeToGame` jamais appelés. | 🟠 Majeur |
| 6 | **La boucle pédagogique est une coquille vide** : profils, stats, badges, QG et Archives existent en UI mais aucun mode de jeu n'écrit dedans (et QG/Archives lisent de mauvaises clés localStorage) — les écrans de suivi affichent toujours zéro ou des données factices. | 🟠 Majeur |

### Plan d'action recommandé

- **P0 — aujourd'hui (sécurité)** : révoquer la clé Kimi ; régénérer les clés Supabase ; `git rm --cached .env logi-battle/.env` + ajout au `.gitignore` + purge d'historique (`git filter-repo`) ; durcir les policies RLS.
- **P1 — cette semaine (rendre le jeu jouable)** : corriger l'URL du QR (base path), ajouter `.subscribe()` + cleanup des canaux côté élève et hôte, corriger les stale closures de fin de manche, rendre les vraies cartes question dans `GameBoard`, afficher les options QCM sur mobile.
- **P2 — ce mois (assainir)** : supprimer Firebase et le code mort, brancher la boucle de progression (stats/badges/archives), code splitting élève/formateur, corrections accessibilité bloquantes, purge des données factices, unification de la marque.

---

## 1. Sécurité & revue de code (`/code-review`, `/review`, `/security`)

### 🔴 Critique

**C1 — Secrets committés dans git.**
`git ls-files` confirme que `.env` et `logi-battle/.env` sont trackés depuis le commit initial.
- `/.env` : `KIMI_API_KEY=…` — vraie clé API Moonshot, facturable, lue par `kimi_agent.py:17-18`.
- `/logi-battle/.env` : `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` réels (les clés Firebase sont des placeholders, sans impact).
- Cause : `logi-battle/.gitignore:5-6` n'ignore que `.env.local` / `.env.*.local`.
**Actions** : révoquer la clé Kimi immédiatement, régénérer les clés Supabase, retirer les fichiers du suivi, purger l'historique, committer un `.env.example`.

**C2 — RLS de façade.** `supabase_schema.sql:30-40` :
```sql
CREATE POLICY "Activer l'accès anonyme général sur games"
ON public.games FOR ALL USING (true) WITH CHECK (true);
```
RLS « activé » mais SELECT/INSERT/UPDATE/DELETE anonymes autorisés sur `games` et `questions`. Un élève peut, depuis la console du navigateur, modifier le score ou supprimer toutes les parties pendant un cours.
**Correctif** : policies par opération (lecture publique, INSERT contrôlé, pas de DELETE), écriture des scores via Edge Function, ou a minima UPDATE restreint.

**C3 — Canal temps réel élève jamais souscrit.** `PlayerGame.jsx:18-41` fait `channel.on('broadcast', …)` mais n'appelle jamais `.subscribe()` (seul l'hôte le fait, `GameBoard.jsx:57`). Résultat : l'élève reste bloqué sur « En attente du professeur... », ses réponses (`channel.send()`, `PlayerGame.jsx:87-93`) n'atteignent jamais l'hôte. Aucun cleanup non plus (fuite d'abonnement).

**C4 — Stale closures sur le handler broadcast hôte + handlers dupliqués.** `GameBoard.jsx:50-67` : le handler `player_answer` capture l'état du premier render (`teamAStatus`/`teamBStatus` figés à `'playing'`, `question` à `null`), le cleanup de l'effet est vide, et le canal est mis en cache dans `localDB.channels` (`database.js:205-214`) → au remontage, handlers enregistrés en double (réponses traitées 2×) et second `.subscribe()` sur un canal déjà joint.

**C5 — URL du QR code cassée sur GitHub Pages.** `HostGame.jsx:38-42` construit `${window.location.origin}/join?game=…` en ignorant `base: '/logi-battle/'` (`vite.config.js:5`) ; aucun `404.html` de fallback SPA. Le QR scanné par les élèves aboutit à la 404 de GitHub.
**Correctif** : `` `${origin}${import.meta.env.BASE_URL}?game=${gameId}` `` — la condition `search.includes('game=')` d'`App.jsx:61` route déjà ce format sans 404.html.

### 🟠 Majeur

- **M1 — Duel local injouable** : `GameBoard.jsx:383-397` — 4 boutons de réponse en dur (« 1,2 Mètres »…) sans `onClick` ; `QuestionCard`/`VocabularyCard` importés mais jamais rendus (contrairement à `ChampionshipGameBoard.jsx:292-381`).
- **M2 — La partie ne se termine jamais** : `GameBoard.jsx:150-155` et `ChampionshipGameBoard.jsx:126-131` — le `setTimeout` de fin de manche teste un `gameStatus` capturé avant la mise à jour du score → nouvelles manches lancées derrière l'écran de victoire ; aucun écran de fin en mode local ; « QUESTION n/20 » sans limite réelle (constants dit `TOTAL_ROUNDS: 10`).
- **M3 — La réponse du 2ᵉ répondant est ignorée** : `handleAnswer` appelle `endRound()` dans le même tick que `setTeamBStatus` → si A répond faux puis B juste, `winner = null` et B ne marque pas.
- **M4 — Match nul compté victoire du champion** : `App.jsx:101-113` — `result.winner === 'A' ? 'challenger' : 'champion'` transforme `null` (égalité) en victoire du champion (+3 pts +1 défense) alors que `recordMatch` gère `'draw'`.
- **M5 — Réponse correcte diffusée aux téléphones + QCM injouables sur mobile** : l'hôte broadcast la question entière avec `correctAnswer` (`GameBoard.jsx:100-107`, lisible dans l'onglet réseau = triche triviale) ; et `PlayerGame.jsx:200-219` n'offre qu'un pavé numérique alors que ~13 modules sur 16 sont des QCM dont la réponse est un index d'option — l'élève devrait deviner « 0-3 » sans voir les choix.
- **M6 — QG et Archives toujours vides** : ils lisent `localStorage['logi-battle-championship']` (jamais écrite) alors que le store persiste sous `championship-storage` au format zustand (`{state: {...}}`) ; `logi-battle-game-history` n'est écrit par personne ; `handleClearData` n'efface pas les vraies données.
- **M7 — Clavier global partagé entre les deux équipes** : `QuestionCard.jsx:60-63` écoute `window` → en championnat, chaque chiffre tapé s'écrit dans les deux cartes et Enter soumet pour les deux équipes ; `userInput` jamais réinitialisé au changement de question.
- **M8 — Questions à réponse impossible ou fausse** :
  - `questionGenerator.js:237-241` : division sans `Math.floor` → réponse attendue `6.666…` impossible à saisir en entier ;
  - `questionGenerator.js:85-122` : réponse calculée avec `maxHeight` aléatoire (150-175) mais énoncé affichant toujours « 150 cm » → l'élève qui calcule juste est compté faux ;
  - `mathQuestions.js:42-55` (`math_004`) : clés dupliquées dans l'objet + énoncé (2 niveaux → 66) contredisant la réponse (33) ;
  - `cultureQuestions.js:8-14` : « Quelle **ville** a accueilli les JO 2024 ? » avec réponse attendue `2024` (une année).

### 🟡 Mineur

Tri de dates cassé (`b.date - a.date` sur chaînes ISO → `NaN`, `Archives.jsx:45`, `HQDashboard.jsx:77`) ; à temps égaux l'équipe B gagne toujours ; `VocabularyCard.jsx:184` affiche l'icône « faux » même sur la bonne réponse (fallback `data.correctOption` oublié) ; `npm run lint` inexécutable (script défini mais ESLint absent des devDependencies, aucune config) ; bloc dupliqué copié-collé dans `database.js:188-198` ; QR généré via `api.qrserver.com` (fuite de l'URL de partie vers un tiers, panne si réseau filtré) alors que le paquet `qrcode` est installé et inutilisé ; `JSON.parse` sans try/catch (`BattalionManager.jsx:38-48`) ; aucune séparation formateur/élève (tout utilisateur accède au QG et peut tout réinitialiser).

---

## 2. Architecture (`/architecture`)

### Vue d'ensemble

```
/  (racine git)
├── .env, kimi_agent.py, requirements.txt   ← outillage IA sans lien avec l'app (+ secret)
├── RELAY.md                                ← doc de passation périmée (décrit Firebase, ignore le rebranding)
├── visuel de l'application/, visuel stitch/ ← maquettes (ancienne marque uniquement)
├── .github/workflows/deploy.yml            ← CI GitHub Pages
└── logi-battle/                            ← l'application React 18 + Vite 5
    └── src/
        ├── App.jsx          ← pas de router : cascade de if + 10 useState booléens
        ├── components/ (34) ← 3 boucles de jeu quasi dupliquées + 11 cartes mortes
        ├── hooks/           ← useGameStore, useChampionshipStore (zustand, persist)
        ├── services/        ← database.js : triple backend par if/else (supabase/local/firebase)
        └── utils/           ← 18 banques de questions (~7 600 l.) + questionGenerator (679 l.)
```

### Points forts

- Séparation données/UI des questions, schéma homogène, contenu pédagogique riche.
- Les composants ne consomment que `gamesService` (jamais supabase/firebase en direct).
- `useChampionshipStore` propre (persist versionné, logique de classement lisible).
- Supabase Broadcast bien choisi pour un quiz (latence faible, l'hôte seule autorité d'écriture).
- Mode `local` sans backend pour développer sans clés.

### Problèmes structurels

1. **Code mort massif (~40 %)** : 11 des 13 `*Card.jsx` jamais importés (~2 400 lignes, copies quasi verbatim les unes des autres — `JitCard` et `SafetyCard` identiques ligne à ligne hors table d'icônes) ; `questionsService` (105 l.), `subscribeToGame`, `firestoreSchema.js`, `gameUtils.js`, `GameOver.jsx` : zéro import.
2. **Firebase mort mais embarqué** : config placeholder, TODO explicites (« si on repasse à Firebase un jour »), mais `firebase@^10` importé statiquement et **chaque méthode de `database.js` écrite 3 fois** (branches supabase/local/firebase). Abstraction par if/else, pas par interface.
3. **Trois boucles de jeu dupliquées** : `GameBoard` (456 l.), `ChampionshipGameBoard` (505 l.), `TrainingMode` (468 l.) réimplémentent timer, manches, statuts, particules — avec divergences (d'où les bugs M1-M3 présents à des degrés différents selon l'écran). `ROUND_TIME` redéfini en dur alors que `config/constants.js` existe.
4. **Pas de routing** : machine à états de 10 booléens dans `App.jsx`, `popstate` écouté sans aucun `pushState` émis ; back/refresh ramènent au menu.
5. **Aucun filet de sécurité** : zéro test, lint inexécutable, pas de typage — pour 17 300 lignes avec synchronisation temps réel.
6. **Racine du dépôt hétérogène** : `kimi_agent.py`/`requirements.txt` (expérimentation IA à sortir vers `tools/` ou un autre repo), maquettes à déplacer dans `docs/design/`, `RELAY.md` contredisant l'état réel du projet.

### Recommandations (ordre conseillé)

1. Supprimer le code mort + la dépendance Firebase ; réduire `database.js` à deux adaptateurs (`supabase`, `local`) derrière une interface unique.
2. Extraire un hook commun `useGameRound(mode, options)` pour les 3 boucles de jeu ; centraliser les constantes.
3. Remplacer `getRandomQuestionType(13 booléens positionnels)` et la chaîne de 14 `else if` par une table de correspondance ; registre unique `questionBanks`.
4. Introduire react-router (ou une vraie machine à états) ; puis ESLint + Vitest en ciblant d'abord la logique pure (stores, générateur, classement).

---

## 3. CI/CD — GitHub Actions (`/workflows`)

Fichier : `.github/workflows/deploy.yml` (build Vite + déploiement GitHub Pages).

**Bien** : permissions correctement restreintes (`contents: read`, `pages: write`, `id-token: write`), concurrency `pages` avec annulation, actions officielles v4, cache npm sur le bon lockfile, base path Vite cohérent.

**Problèmes** :
1. 🔴 Le `.env` committé fait que le build de production embarque les clés (cf. §1 C1) — après purge, passer par les *Repository secrets* et un step qui écrit le `.env` de build, ou des variables d'environnement GitHub Actions.
2. 🟠 **Aucune CI de qualité** : pas de step lint/test, et aucun workflow sur `pull_request` — du code cassé peut être mergé sans aucun signal. Ajouter un job `lint + build` (puis `test` quand Vitest existera) déclenché sur PR.
3. 🟡 Déclencheur sur `master` **et** `main` alors que seul `master` existe ; actions non épinglées par SHA ; pas de Dependabot (`.github/dependabot.yml`) pour les mises à jour de sécurité npm/actions.

---

## 4. Performance (`/performance-report`)

### Chiffres mesurés (build réel, `vite v5.4.21`)

| Fichier | Taille | Gzip |
|---|---|---|
| `dist/assets/index-*.js` (chunk unique) | **879 kB** | **247 kB** |
| `dist/assets/index-*.css` | 54 kB | 11 kB |

Poids isolés par builds différentiels : **firebase ~113 kB min (~33 kB gzip, 100 % mort)**, @supabase/supabase-js ~176 kB (utilisé), framer-motion ~102 kB (32 composants, usage décoratif), banques de questions ~250 kB de source, `qrcode` 0 kB (jamais importé).

### Findings

- **P0 — Aucun code splitting** : zéro `React.lazy`/`import()` dans `src/`. La route élève (`/join`) charge tout le back-office formateur (QG, Archives, Championnat, 20 banques de questions, Firebase). En classe, 30 téléphones téléchargent 247 kB gzip chacun, simultanément, souvent en 4G.
- **P0 — Firebase initialisé au chargement** (`firebase.js:16-21`, `initializeApp` avec config placeholder) : poids + travail de démarrage inutiles.
- **P1 — Re-render global chaque seconde** : pattern `useEffect([…, timeLeft])` + `setInterval` recréé à chaque tick sur les 4 écrans de jeu ; aucun `React.memo`/`useMemo` dans le projet ; stores Zustand consommés sans sélecteurs (`useGameStore()` entier) → tout l'écran se re-rend à chaque tick et chaque mutation du store. Coût principal sur mobiles d'entrée de gamme.
- **P1 — Trafic broadcast** : chaque `player_answer` est rediffusé à tous les abonnés du canal (~900 réceptions inutiles par manche à 30 élèves) ; la logique « 2 réponses = fin de manche » n'est de toute façon pas conçue pour 30 joueurs.
- **P2 — Webfonts** : 4 familles via `@import` CSS render-blocking (`index.css:5-7`), dont **deux familles d'icônes redondantes** (Material Icons + Material Symbols variable) ; aucun `preconnect` ; icônes affichées en texte brut au premier chargement.
- **P2 — Dépendances réseau tierces en classe** : QR via `api.qrserver.com`, avatars via `lh3.googleusercontent.com` — points de panne sur réseau d'établissement filtré.

### Recommandations chiffrées

1. Supprimer firebase : **-33 kB gzip mesurés**, effort minime.
2. `React.lazy` par rôle (chunk élève vs chunks formateur) : bundle initial élève estimé **-50 à -70 %**.
3. Fixes realtime (`.subscribe()`, `removeChannel`, refs) — autant fiabilité que perf.
4. Sélecteurs Zustand + `React.memo` + interval unique par écran.
5. Une seule famille d'icônes, 3 graisses de Figtree, `preconnect` dans `index.html`.
6. QR généré localement avec le paquet `qrcode` déjà installé.

---

## 5. Accessibilité — WCAG 2.1 AA (`/accessibility-review`)

Grep exhaustif : **aucune occurrence** de `aria-label`, `htmlFor`, `autoComplete`, `role=`, `aria-live`, `tabIndex` ou `prefers-reduced-motion` dans `src/` (seul un `aria-hidden` dans `BrandMark.jsx`). Conformes : `lang="fr"`, viewport zoomable.

### 🔴 Bloquant

- **B1 — Contrastes insuffisants sur les actions principales** : `text-white` sur or `#f4b942` = **1,77:1** (requis 4,5:1) sur les boutons Valider/Continuer/Rejoindre utilisés par les élèves (`PlayerJoin.jsx:84,159`, `PlayerGame.jsx:229`, `QuestionCard.jsx:156`, `GameOver.jsx:70`…) ; blanc sur sage 2,61:1 ; `text-gray-600` sur fond marine 1,49:1. Le bon pattern existe déjà (`Login.jsx:65` : texte marine sur or = 7,53:1) — à généraliser.
- **B2 — Formulaires sans labels associés** : aucun `htmlFor`/`id` dans le projet ; le champ code de partie n'a qu'un placeholder (qui disparaît à la saisie) ; pas d'`autoComplete`.
- **B3 — Limite de temps ni ajustable ni désactivable (2.2.1)** : `ROUND_TIME = 30` en dur, soumission automatique à 0 s ; le réglage « Durée par question » existe dans le QG (`HQDashboard.jsx:444-451`) mais n'est lu nulle part, et la barre élève divise par 30 en dur.
- **B4 — Icônes sans nom accessible** : toutes les icônes sont des ligatures Material lues « close », « menu », « backspace » en anglais par les lecteurs d'écran ; boutons icône sans `aria-label` ; interrupteurs du QG sans `role="switch"`/`aria-checked` (état transmis par la couleur seule).

### 🟠 Majeur

Aucune live region (timer, scores, « Bonne réponse ! » non annoncés — urgence signalée par la couleur seule) ; cartes cliquables en `div` souris-uniquement (`GameSelection.jsx:362,383`) et menu mobile sans gestion Escape ni focus trap ; état des options QCM porté par la couleur seule, sans `aria-pressed` ; modale GameOver sans `role="dialog"`/`aria-modal`/gestion du focus ; **aucun respect de `prefers-reduced-motion`** (secousse plein écran + voile rouge à chaque mauvaise réponse, animations infinies) ; écouteur clavier global de `QuestionCard` interceptant chiffres/Enter/Backspace au niveau document ; hiérarchie de titres incohérente (pas de `h1`) ; erreurs via `alert()` natif non associées aux champs.

### 🟡 Mineur

Focus visible affaibli (`focus:outline-none` + simple changement de bordure ; la classe `.focus-ring` définie dans `index.css:236` n'est utilisée nulle part) ; cibles tactiles 32 px sur mobile ; `alt="QR Code"` non fonctionnel ; étoiles de difficulté distinguées par la couleur seule ; barre « tir à la corde » sans équivalent non visuel (`role="progressbar"` recommandé).

### Quick wins a11y

(1) brancher `timerDuration` du QG + option sans limite ; (2) `text-[#17314a]` sur tous les fonds or/sage ; (3) `aria-hidden` sur les ligatures + `aria-label` sur les boutons icône ; (4) `<MotionConfig reducedMotion="user">` + media query CSS globale ; (5) `htmlFor`/`id`/`autoComplete` sur les 4 champs.

---

## 6. SEO & partage (`/seo-audit`)

Contexte assumé : outil pédagogique interne distribué par lien et QR code — le SEO de positionnement Google est **hors sujet** (pas de sitemap, pas de SSR/prerendering, pas de JSON-LD : recommandations classiques explicitement écartées). Ce qui compte : partage de lien propre, onglet identifiable, installabilité mobile.

**État** : `index.html` fait 12 lignes — `lang="fr"` ✅, `title` ✅, viewport ✅ ; **tout le reste manque** : meta description, Open Graph/Twitter cards, favicon (404 sur `/favicon.ico`), `theme-color`, manifest PWA. Aucun dossier `public/`.

**Findings priorisés** :
- **P0** — le bug de l'URL QR (cf. §1 C5) : découvert par cet audit aussi, c'est le vrai « SEO » cassé — le lien distribué ne fonctionne pas.
- **P1** — Open Graph absent : aperçu vide/moche quand le formateur partage le lien (Teams, WhatsApp, ENT). Ajouter `og:title/description/image/url/locale` + Twitter card **statiques** dans `index.html` (les crawlers n'exécutent pas le JS). Snippet `<head>` complet + `manifest.webmanifest` prêts à l'emploi disponibles — voir annexe du rapport SEO.
- **P1** — favicon + `apple-touch-icon` + `theme-color: #221a10` + manifest (`display: standalone`) pour l'écran d'accueil des téléphones élèves. Service worker offline non nécessaire (jeu temps réel).
- **P2** — README : corriger Firebase→Supabase et Lexend→Figtree/Fraunces, ajouter l'URL publiée + topics GitHub (`education`, `quiz`, `logistique`, `react`) ; `noindex` volontaire envisageable si l'outil doit rester discret.

---

## 7. Identité de marque (`/brand-review`)

**Verdict : le rebranding « Geronimo Coop » est réel mais superficiel** — la couche visible est renommée, toute l'infrastructure reste « Logi Battle », et il n'existe **aucune maquette ni charte de la nouvelle identité** (grep « geronimo » dans les deux dossiers de maquettes : zéro occurrence ; le PRD et le design system « Industrial Arena » décrivent l'ancienne marque : deep navy `#0c0c1f` + orange `#fea52e` + Lexend, alors que l'app implémente marine `#17314a` + or `#f4b942` + Fraunces/Figtree).

**Incohérences relevées** :
1. **Résidus techniques `logi-battle`** : base path Vite, clés localStorage (`logi-battle-championship`, `logi-battle-players`, `logi-battle-game-history`, `logi-battle-settings` — dans Archives, HQDashboard, BattalionManager), nom du dossier/repo.
2. **Docs pré-rebrand** : README (palette `#f49d25` + police Lexend périmées), TESTING.md, RELAY.md (« Logi-Battle aussi nommé LogiDuel »).
3. **Ton militaire vs nom coopératif** : « BATAILLON », « QG - Command Center », « COMMENCER LE COMBAT », « MES OPÉRATEURS », grades « Recrue → Maître Logisticien » — en tension avec « Coop » et « arène coopérative » (`Login.jsx:30`). À trancher et documenter.
4. **Palette non appliquée** : les tokens `geronimo-*` définis dans `tailwind.config.js` sont quasi inutilisés (0 `bg-geronimo-*`) ; à la place ~260 valeurs hex arbitraires (`[#f4b942]` ×85, `[#1d3d59]` ×59…) + gris froids `slate/gray` massifs hors charte.
5. **Couleurs d'équipes contradictoires** : `constants.js` (bleu `#3b82f6` / or) vs `design-system.css` (sage / coral) — deux systèmes coexistent ; et les noms d'équipes par défaut divergent selon l'écran (ALPHA/OMEGA à la création, ÉTOILE/BOUSSOLE affichés en dur sur le plateau, « Équipe A (Bleu) / B (Orange) » côté élève).

**Recommandations** : source unique pour la palette (tokens Tailwind), migration des clés localStorage avec reprise des données, trancher le registre de ton, mettre à jour la documentation, créer une page de référence visuelle Geronimo.

---

## 8. UX writing / microcopy (`/ux-copy`)

### Corrections factuelles prioritaires (le texte ment à l'utilisateur)

| Où | Problème |
|---|---|
| `GameSelection.jsx:38-47` et modules voisins | Titres/descriptions **sans rapport avec le contenu réel** : le module « Vocabulaire » s'appelle « Gestion de Crise », « Sécurité » s'appelle « Connecteur de Nœuds », « Culture G » = « Garde du Coffre »… `TrainingMode.jsx:24-41` fait déjà correct — s'aligner dessus. |
| `GameSelection.jsx:393-396` | « INITIALISER LE SCAN » / « scannez des IDs de palettes » : le bouton crée en fait une partie hôte. |
| `GameBoard.jsx:32-36, 344-353, 440-448` | Journal pré-rempli de **faux joueurs** (`User_42`, `CargoKing`), « ÉVÉNEMENT CRITIQUE points doublés » jamais appliqué, « MORAL GLOBAL 88% » en dur — en classe, cela détruit la confiance dans le score. |
| `TeamSetup.jsx:260` | « Les équipes répondront alternativement » — faux : elles répondent simultanément, la plus rapide gagne. |
| `TrainingMode.jsx:391` | « sans la pression du temps » — faux : chrono de 45 s actif. |
| `HQDashboard.jsx:252` | Bouton « Documentation » → ouvre `https://github.com` (page d'accueil). |
| Banques de questions | « semme » → « semelle » (`safetyQuestions.js:110`) ; harnais contre « chutes de plain-pied » (contresens métier, `safetyQuestions.js:40`) ; « Interdit de marcher » ; + les erreurs de fond déjà listées en §1 M8. |

### Typographie française

Espaces insécables manquantes avant `! ? :` partout (`constants.js:95-97`, `GameOver.jsx:33`…) ; Title Case anglais systématique (« Parties Jouées » → « Parties jouées ») ; `1,250` → `1 250` (`toLocaleString('fr-FR')`) ; « Ex: » → « Ex. : » ; points de suspension `…`.

### Cohérence terminologique (glossaire à figer)

- Le groupement de joueurs a **quatre noms** : équipe / groupe-trinôme / bataillon / régiment. Proposer : **équipe** (duel A/B), **groupe** (trinôme de championnat), « Bataillon » → « Effectif » ou « Joueurs ».
- Rôle animateur : « professeur » / « hôte » / « QG » → **formateur** partout.
- Match : partie / duel / match / affrontement / combat → **partie** (session), **manche** (question), **match** (championnat).
- Franglais à arbitrer : « Win Rate », « % Win », « QG - Command Center » (doublon bilingue), « Green Logistique » ; réserver l'anglais aux acronymes métier enseignés (WMS, TMS, OTIF — bien traités dans `vocabularyQuestions.js`).
- Voix : vouvoiement partout actuellement ; recommandé : **tutoiement sur les écrans élève** (Login, PlayerJoin, PlayerGame), vouvoiement sur les écrans formateur.
- CTA : verbe d'action + objet (« Créer une partie ») ; bannir « Initialiser ».
- Erreurs actionnables, sans jargon (« base de données », « Firebase », « Modale ») ; remplacer les `alert()`/`confirm()` natifs.

---

## 9. Pistes produit (`/product-brainstorming`)

### Constat central

Le cœur ludique est riche (16 modules, générateurs procéduraux à 3 niveaux de difficulté), mais **toute la boucle pédagogique est une coquille vide** : `BattalionManager` définit `stats` et `achievements` complets, QG/Archives les affichent — et aucun mode de jeu n'écrit dedans. La table Supabase `questions` et `questionsService.createQuestion/getRandomQuestion` existent, entièrement codés, **jamais appelés** : les questions restent figées dans `src/utils/*.js`.

### Top 5 quick wins (impact fort, ancrés dans le code existant)

1. **Brancher la boucle de progression** (S) : faire écrire TrainingMode/GameBoard/Championnat dans les profils et l'historique, corriger le mismatch de clés localStorage — quelques dizaines de lignes transforment trois écrans décoratifs en vrai suivi pédagogique.
2. **QCM sur mobile** (S) : ajouter les boutons A/B/C/D dans `PlayerGame` (le composant existe : `VocabularyCard`) — sans ça, ~13 modules sur 16 sont injouables au téléphone. En profiter pour cesser de diffuser `correctAnswer` (anti-triche).
3. **Export CSV pour le formateur** (S) : toutes les données sont en localStorage JSON structuré ; un bouton dans le QG répond au besoin n°1 d'un formateur (traces, évaluation).
4. **Éditeur de questions formateur** (M) : CRUD sur la table `questions` Supabase déjà créée, services déjà écrits — débloque l'adaptation du contenu au public.
5. **Stats par thème + difficulté adaptative** (M) : chaque question porte déjà `type`/`category`/`difficulty`, `TrainingMode` construit déjà `questionHistory` qu'il jette — agréger par module pour le QG et ajuster la difficulté selon les 5 dernières réponses.

### Autres pistes classées (impact × effort)

- **Pédagogie** : badges réels (S), révision espacée type Leitner (M), mode devoirs asynchrone (L), fiche élève/certificat imprimable (M).
- **Gameplay** : contre-la-montre (S, réutilise TrainingMode), boss final à points doublés (S), points pondérés par difficulté (S), relais de trinôme (M — le concept « trinôme » du championnat n'a aujourd'hui aucun effet en jeu), mode « toute la classe » type Kahoot avec classement individuel (L), sons réels derrière le toggle existant (S).
- **Contenu** : import/export de banques CSV/JSON (M), tags référentiel Bac Pro/BTS par compétence (M), questions à images (M).
- **Technique** : reconnexion en cours de partie via `gamesService.getGame` (M — indispensable dès usage réel en classe), QR local (S), vue projection vidéoprojecteur dédiée (M — explicitement visée par le PRD), PWA (M), auth formateur + RLS digne de ce nom (L).

---

## Annexe — récapitulatif des findings par sévérité

| Sévérité | Nombre | Principaux |
|---|---|---|
| 🔴 Critique | 7 | Secrets git ×2, RLS ouvert, QR 404, canal élève non souscrit, stale closures broadcast, duel local injouable |
| 🟠 Majeur | ~20 | Fin de partie jamais atteinte, scores faux (2ᵉ répondant, match nul), réponse diffusée aux élèves, QG/Archives vides, code mort ~40 %, Firebase embarqué, pas de code splitting, 4 bloquants WCAG, CI sans lint/test, textes trompeurs |
| 🟡 Mineur | ~30 | Typographie FR, tri de dates NaN, focus visible, cibles tactiles, dépendances tierces, docs périmées, nommage |

*Rapport généré le 6 juillet 2026 sur la branche `claude/comprehensive-audit-review-repmii`.*
