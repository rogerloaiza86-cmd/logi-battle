# Feuille de route — Geronimo Coop : de 60 % à 100 %

Plan d'action issu de l'audit du 11/06/2026 ([`AUDIT.md`](./AUDIT.md)).
Chaque phase fait progresser l'avancement global ; les pourcentages sont cumulés.

---

## Phase 0 — Urgences sécurité 🔴 (60 % → 65 %) — ~1 jour

- [ ] **T0.1 — Révoquer la clé API Kimi/Moonshot** compromise (console Moonshot), puis en générer une nouvelle hors Git. *(S1)*
- [ ] **T0.2 — Sortir les `.env` du suivi Git** : `git rm --cached .env logi-battle/.env`, ajouter `.env` et `logi-battle/.env` au `.gitignore`, créer des fichiers `.env.example` sans secrets. *(S1)*
- [ ] **T0.3 — Recréer le backend Supabase** : créer (ou réutiliser) un projet Supabase actif, mettre à jour `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, injecter ces variables comme secrets GitHub Actions dans `deploy.yml` (étape Build). *(S3)*
- [ ] **T0.4 — Corriger le schéma RLS** avant de le rejouer : INSERT + SELECT publics sur `games`, UPDATE limité (filtre sur `status != 'finished'` au minimum), **pas de DELETE public**, table `questions` en lecture seule publique. *(S2)*
- [ ] **T0.5 — Vérifier de bout en bout** : créer une partie, scanner le QR, jouer un round complet hôte + mobile.

## Phase 1 — Assainissement du code 🧹 (65 % → 72 %) — ~2 jours

- [ ] **T1.1 — Supprimer Firebase** : retirer la dépendance `firebase`, `firebase.js`, `firestoreSchema.js`, les branches `USE_FIREBASE` de `database.js` (garder supabase + local). Élimine l'essentiel des 19 vulnérabilités npm. *(S4)*
- [ ] **T1.2 — `npm audit fix`** pour les vulnérabilités restantes (`ws`, etc.).
- [ ] **T1.3 — Trancher le sort des 11 cartes spécialisées** (`SupplyChainCard`, `StockCard`, …) : soit les brancher dans `GameBoard` (recommandé : meilleure UX par module), soit les supprimer. Pas d'entre-deux.
- [ ] **T1.4 — Brancher ou supprimer** `GameOver.jsx`, `ParticleEffect.jsx`, `ScreenVibration.jsx` (le README annonce particules + vibration : les brancher est rapide et valorisant).
- [ ] **T1.5 — QR code local** : remplacer `api.qrserver.com` par le paquet `qrcode` déjà installé (`HostGame.jsx:47`). *(S5)*
- [ ] **T1.6 — Réparer le lint** : installer ESLint + config React (flat config), corriger les erreurs, l'ajouter à la CI.
- [ ] **T1.7 — Nettoyer la racine du dépôt** : déplacer `kimi_agent.py`/`requirements.txt` dans `tools/` (ou les supprimer), fusionner les deux dossiers de maquettes dans `design/`.
- [ ] **T1.8 — Mettre à jour la documentation** : README aligné sur Supabase, suppression des mentions Firebase obsolètes.

## Phase 2 — Fiabiliser le multijoueur 📡 (72 % → 80 %) — ~3 jours

- [ ] **T2.1 — Liste des joueurs connectés** côté hôte (Supabase Presence sur le channel existant) + compteur « X joueurs prêts » avant lancement.
- [ ] **T2.2 — Valider l'existence de la partie** avant de rejoindre (`getGame()` dans `PlayerJoin`) avec message d'erreur clair.
- [ ] **T2.3 — Gérer la reconnexion** : si un mobile perd le réseau, re-souscrire au channel et resynchroniser la question courante depuis la table `games`.
- [ ] **T2.4 — Écran de fin multijoueur** : brancher `GameOver` côté joueurs (broadcast `game_over` avec scores finaux).
- [ ] **T2.5 — Routing `/join` robuste** : hash-routing (`#/join`) ou 404.html de redirection pour GitHub Pages.
- [ ] **T2.6 — Anti-triche minimal** : ne plus accepter de `player_answer` après la fin du timer ; horodater côté hôte. *(S7)*

## Phase 3 — Valeur pédagogique 🎓 (80 % → 90 %) — ~4 jours

- [ ] **T3.1 — Écran de correction entre les rounds** (10 s) affichant `explanation` et `hints` de la question — l'apprentissage se joue là.
- [ ] **T3.2 — Statistiques par élève et par module** : taux de réussite par type de question, persisté dans Supabase ; vue enseignant dans `HQDashboard` (qui devient enfin utile).
- [ ] **T3.3 — Export CSV des résultats** (par classe / par session) pour le carnet de notes.
- [ ] **T3.4 — Exploiter la difficulté progressive** : commencer difficulté 1, monter à 2-3 selon le score (le champ `difficulty` existe déjà).
- [ ] **T3.5 — Championnat dans Supabase** : migrer `useChampionshipStore` du localStorage vers la base (suivi multi-postes, persistance réelle pour l'enseignant).
- [ ] **T3.6 — Sons** (bonne/mauvaise réponse, fin de round) avec bouton mute — annoncé depuis la v1.
- [ ] **T3.7 — Badges simples** : 5-6 achievements (série de 5 bonnes réponses, sans-faute, etc.) persistés avec le profil.
- [ ] **T3.8 — Reformuler le module Culture** en QCM contextualisés (au lieu de « en quelle année »).

## Phase 4 — Industrialisation ✅ (90 % → 97 %) — ~3 jours

- [ ] **T4.1 — Vitest + React Testing Library** : tests unitaires des fonctions critiques (`questionGenerator` : validité des ~530 questions — 4 options, bonne réponse incluse ; `gameUtils` ; logique de classement `useChampionshipStore`).
- [ ] **T4.2 — Tests de composants** : Login, TeamSetup, QuestionCard, flux GameBoard (mock du channel).
- [ ] **T4.3 — CI complète** : lint + tests bloquants avant build/déploiement dans `deploy.yml`.
- [ ] **T4.4 — Code-splitting** : lazy-loading des écrans secondaires (Championship, Training, Archives) pour passer sous 500 Ko initial.
- [ ] **T4.5 — Authentification enseignant** (Supabase Auth, un seul compte) protégeant la gestion des classes, le QG et l'export. *(S6)*
- [ ] **T4.6 — Purge RGPD** : suppression automatique des parties > 30 jours (cron Supabase) + mention « données » dans l'app. *(S8)*

## Phase 5 — Finition 🏁 (97 % → 100 %) — ~2 jours

- [ ] **T5.1 — PWA** : manifest + service worker (utilisation hors-ligne du mode local/entraînement en atelier sans Wi-Fi).
- [ ] **T5.2 — Recette en conditions réelles** : une session complète avec une classe (1 hôte + 10 mobiles), corrections issues du terrain.
- [ ] **T5.3 — Guide enseignant** : 1 page « préparer une séance en 5 minutes ».
- [ ] **T5.4 — Tag `v1.0.0`** + release GitHub.

---

## Récapitulatif

| Phase | Objectif | Effort estimé | Avancement cumulé |
|---|---|---|---|
| 0 | Sécurité + backend vivant | 1 j | 65 % |
| 1 | Code sain, deps saines | 2 j | 72 % |
| 2 | Multijoueur fiable | 3 j | 80 % |
| 3 | Valeur pédagogique | 4 j | 90 % |
| 4 | Tests, CI, auth, RGPD | 3 j | 97 % |
| 5 | PWA, recette, release | 2 j | **100 %** |

**Effort total estimé : ~15 jours de développement.**
Ordre impératif : la phase 0 d'abord (clé compromise + backend mort), le reste peut être réordonné selon les priorités de classe.
