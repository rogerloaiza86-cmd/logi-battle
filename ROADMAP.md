# Feuille de route — Geronimo Coop : de 60 % à 100 %

Plan d'action issu de l'audit du 11/06/2026 ([`AUDIT.md`](./AUDIT.md)).
**Mise à jour du 11/06/2026 (soir) : les phases 0 à 5 ont été exécutées — avancement ≈ 92 %.**
Restent 4 tâches (dont 2 nécessitent l'enseignant : révocation de clé et recette en classe).

---

## Phase 0 — Urgences sécurité 🔴 — FAIT (sauf T0.1)

- [ ] **T0.1 — Révoquer la clé API Kimi/Moonshot** compromise — ⚠️ **ACTION MANUELLE REQUISE** (console Moonshot). La clé reste visible dans l'historique Git.
- [x] **T0.2 — `.env` retirés du suivi Git**, `.gitignore` complété, `.env.example` créé.
- [x] **T0.3 — Backend Supabase actif** : tables `logi_battle_games` / `logi_battle_questions` hébergées sur le projet `geronimo-compagnon` (gratuit, isolé par préfixe). Variables injectées dans `deploy.yml`. *Pour migrer vers un projet dédié : rejouer `supabase_schema.sql` et changer les 2 variables.*
- [x] **T0.4 — RLS durci** : INSERT/SELECT publics, UPDATE bloqué sur parties terminées, DELETE interdit.
- [x] **T0.5 — Vérifié de bout en bout** avec le rôle `anon` : triche post-partie et suppression refusées.

## Phase 1 — Assainissement du code 🧹 — FAIT

- [x] **T1.1 — Firebase supprimé** (dépendance, services, branches mortes).
- [x] **T1.2 — 0 vulnérabilité npm** (19 → 0 ; montée Vite 8 + plugin-react 6).
- [x] **T1.3 — Cartes spécialisées supprimées** : `GameBoard` utilise désormais `QuestionCard`/`VocabularyCard` (qui couvrent les 16 modules) pour de vraies questions interactives. *Découverte : l'ancienne UI de question était décorative (options en dur, aucun clic possible).*
- [x] **T1.4 — `GameOver` branché** en fin de partie ; `ParticleEffect`/`ScreenVibration` supprimés (jamais utilisés).
- [x] **T1.5 — QR code généré localement** (paquet `qrcode`) — plus d'appel à api.qrserver.com.
- [x] **T1.6 — ESLint réparé** (flat config), 0 erreur, branché en CI. *A révélé 2 questions buguées (clés dupliquées, monologue d'IA dans une explication) — corrigées.*
- [x] **T1.7 — Dépôt rangé** : `tools/`, `design/`.
- [x] **T1.8 — README aligné** sur Supabase.

## Phase 2 — Fiabiliser le multijoueur 📡 — FAIT

- [x] **T2.1 — Liste des joueurs connectés** côté hôte (Supabase Presence).
- [x] **T2.2 — Validation du code de partie** avant de rejoindre.
- [x] **T2.3 — Reconnexion** : détection de coupure, resynchronisation de l'état depuis la table `games`.
- [x] **T2.4 — Fin de partie multijoueur** : broadcast `game_over`, écran victoire/défaite + score personnel sur mobile. *Bug critique corrigé au passage : le canal des joueurs n'était jamais souscrit (les mobiles ne recevaient rien) et seul un clavier numérique existait (les QCM étaient injouables).*
- [x] **T2.5 — URL de join compatible GitHub Pages** (`?game=` sur la page courante, plus de route `/join` à servir).
- [x] **T2.6 — Anti-triche** : réponses refusées hors round actif (timer écoulé inclus), une seule réponse par équipe et par round.

## Phase 3 — Valeur pédagogique 🎓 — FAIT (sauf T3.5, T3.8)

- [x] **T3.1 — Correction entre les rounds** (8 s) : bonne réponse + explication, sur l'écran principal et les mobiles.
- [x] **T3.2 — Statistiques par élève et par module** (store persistant local) : vue enseignant dans le QG (les anciennes stats étaient factices : 75/60/45/80 codés en dur).
- [x] **T3.3 — Export CSV** (Excel UTF-8) depuis le QG.
- [x] **T3.4 — Difficulté progressive** : rounds 1-3 faciles, 4-7 moyens, 8+ difficiles.
- [ ] **T3.5 — Championnat dans Supabase** : reste en localStorage (fonctionnel mono-poste). À faire si besoin multi-postes.
- [x] **T3.6 — Sons** Web Audio (bonne/mauvaise réponse, fin de round, victoire) + bouton muet.
- [x] **T3.7 — 6 badges** (Premiers pas, En feu, Tireur d'élite, Sans faute, Marathonien, Expert) visibles en entraînement et au QG.
- [ ] **T3.8 — Reformulation du module Culture** en QCM contextualisés : travail de contenu (125 questions) non automatisable proprement — à faire avec l'enseignant.

## Phase 4 — Industrialisation ✅ — FAIT (sauf T4.5)

- [x] **T4.1 — Vitest : 121 tests verts** — validité structurelle des ~530 questions (4 options, bonne réponse dans la plage, pas de résidu d'IA), générateur (16 modes + mixte), classement championnat, stats/badges/CSV.
- [x] **T4.2 — Tests des stores** (championnat, stats). Tests de composants UI : non couverts (optionnel).
- [x] **T4.3 — CI complète** : lint + tests bloquants avant build/déploiement.
- [x] **T4.4 — Code-splitting** : 879 Ko → 543 Ko (155 Ko gzip) pour le bundle initial, écrans secondaires en lazy-loading.
- [ ] **T4.5 — Authentification enseignant** (Supabase Auth) : non faite — le RLS durci couvre l'essentiel ; à envisager si les stats migrent dans Supabase.
- [x] **T4.6 — Purge RGPD** : suppression automatique des parties > 30 jours (pg_cron) ; consigne pseudonymes dans le guide enseignant.

## Phase 5 — Finition 🏁 — FAIT (sauf recette + tag)

- [x] **T5.1 — PWA** : manifest, icônes, service worker (arène locale et entraînement utilisables hors-ligne).
- [ ] **T5.2 — Recette en conditions réelles** : ⚠️ à faire par l'enseignant (1 hôte + plusieurs mobiles sur la version déployée).
- [x] **T5.3 — Guide enseignant** : [`GUIDE_ENSEIGNANT.md`](./GUIDE_ENSEIGNANT.md).
- [ ] **T5.4 — Tag `v1.0.0`** : à poser après la recette en classe.

---

## Récapitulatif

| Phase | État | Reste |
|---|---|---|
| 0 — Sécurité | ✅ | Révoquer la clé Kimi (action manuelle) |
| 1 — Assainissement | ✅ | — |
| 2 — Multijoueur | ✅ | — |
| 3 — Pédagogie | 🟢 90 % | Championnat→Supabase (optionnel), refonte module Culture |
| 4 — Industrialisation | 🟢 90 % | Auth enseignant (optionnel) |
| 5 — Finition | 🟢 | Recette en classe, puis tag v1.0.0 |

**Avancement global : ≈ 92 %** (60 % avant exécution). Le passage à 100 % dépend de la recette en classe réelle et des deux choix optionnels ci-dessus.
