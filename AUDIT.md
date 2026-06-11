# Audit complet — Geronimo Coop (atelier pédagogique logistique)

**Date de l'audit** : 11 juin 2026
**Périmètre** : dépôt `rogerloaiza86-cmd/logi-battle` (application React/Vite `logi-battle/`, scripts annexes, CI, base Supabase)
**Méthode** : revue de code exhaustive (33 composants, ~17 600 lignes), build de production, `npm audit`, test de connectivité Supabase, vérification du contenu pédagogique.

---

## 1. Synthèse exécutive

| Volet | Note | Verdict |
|---|---|---|
| Structure & architecture | 🟡 7/10 | Saine et modulaire, mais ~15 composants morts et un backend Firebase résiduel |
| Sécurité | 🔴 3/10 | Clé API commitée, RLS Supabase totalement ouvert, backend probablement hors service |
| Pertinence pédagogique | 🟢 8,5/10 | ~530 questions sur 16 modules logistiques réels, bien alignés Bac Pro/BTS logistique |
| Qualité & industrialisation | 🔴 2/10 | 0 test, lint cassé, 19 vulnérabilités npm |

### **Avancement global estimé : ≈ 60 %**

| Domaine | Poids | Avancement | Contribution |
|---|---|---|---|
| Gameplay local (arène split-screen, corde, timer) | 20 % | 90 % | 18,0 |
| Contenu pédagogique (16 modules, ~530 questions) | 20 % | 85 % | 17,0 |
| Multijoueur QR / Supabase Broadcast | 15 % | 60 % | 9,0 |
| Championnat & gestion de classe | 10 % | 80 % | 8,0 |
| Authentification & sécurité | 10 % | 15 % | 1,5 |
| Qualité (tests, lint, CI complète) | 10 % | 25 % | 2,5 |
| Features annoncées (sons, badges, stats, chat, PWA) | 10 % | 5 % | 0,5 |
| Documentation | 5 % | 70 % | 3,5 |
| **Total** | **100 %** | | **≈ 60 %** |

> ⚠️ **Point bloquant immédiat** : le projet Supabase configuré dans le `.env` (`ejisurruximdavpcuonb.supabase.co`) ne répond plus et n'existe pas dans le compte Supabase actuel. **Le mode multijoueur et la persistance des parties sont donc très probablement hors service en production**, même si le code est correct.

---

## 2. Audit de structure

### 2.1 Architecture générale

```
logi-battle/                    ← racine du dépôt
├── logi-battle/                ← application React/Vite (le produit)
│   ├── src/components/         ← 33 composants JSX
│   ├── src/hooks/              ← 2 stores Zustand
│   ├── src/services/           ← abstraction DB (supabase / firebase / local)
│   ├── src/utils/              ← 16 banques de questions + générateur
│   └── supabase_schema.sql
├── kimi_agent.py               ← script Python hors sujet (générateur de code Kimi)
├── visuel de l'application/    ← maquettes Stitch (~assets de design)
├── visuel stitch/              ← maquettes Stitch (doublon)
└── .github/workflows/deploy.yml← CI GitHub Pages
```

**Points forts**
- Stack moderne et adaptée : React 18, Vite 5, Zustand, Framer Motion, TailwindCSS.
- Couche d'abstraction base de données propre (`src/services/database.js`) : bascule supabase / firebase / local par variable d'env.
- Générateur de questions centralisé (`questionGenerator.js`, 680 lignes) avec format normalisé `{type, difficulty, title, data, correctAnswer, explanation, hints}`.
- Le build de production passe sans erreur (vérifié : 426 modules, 3,4 s).
- Mode championnat persistant (localStorage) avec classement, défis et défenses de titre.

**Points faibles**
- **~15 composants jamais utilisés** (~25 % du code composants) : `GameOver.jsx`, `ParticleEffect.jsx`, `ScreenVibration.jsx` et 11 cartes spécialisées (`SupplyChainCard`, `ReceptionCard`, `StockCard`, `SafetyCard`, `TraceabilityCard`, `GreenCard`, `TeamLeaderCard`, `JitCard`, `RouteCard`, `LegalCard`, `MathCard`) créées mais jamais rendues — `GameBoard.jsx` affiche une UI générique codée en dur à la place.
- **Double backend** : Firebase (`firebase` ^10.7.0, `firebase.js`, `firestoreSchema.js`) toujours présent alors que `VITE_DB_MODE=supabase`. C'est ~400 Ko de bundle et la source principale des vulnérabilités npm.
- **Bundle monolithique** : 879 Ko minifié (>500 Ko = alerte Vite), aucun code-splitting.
- Dépôt encombré : `kimi_agent.py` + `requirements.txt` (sans rapport avec l'app), deux dossiers de maquettes redondants avec PNG lourds.
- Pas de routing réel (pas de React Router) : navigation par état local + `window.location.pathname` pour `/join` — fragile avec GitHub Pages (404 sur accès direct à `/join`).
- Doc dispersée et partiellement obsolète : README parle encore de Firebase comme backend principal alors que c'est Supabase.

### 2.2 Flux fonctionnels (état réel)

| Fonction | État | Détail |
|---|---|---|
| Login (pseudo + classe) | ✅ Fonctionnel | Simple localStorage — pas une vraie authentification |
| Arène locale 2 équipes | ✅ Fonctionnel | Corde de traction ±100, timer, 16 modules + mode mixte |
| Entraînement solo | ✅ Fonctionnel | 10 questions, score |
| Championnat (classes, trinômes, défis) | ✅ Fonctionnel | Persistance locale uniquement (perdue si changement de poste) |
| Multijoueur QR (hôte + mobiles) | ⚠️ Code présent, **backend mort** | Broadcast Supabase implémenté, mais le projet Supabase ciblé ne répond plus |
| Archives / QG / Bataillon | ⚠️ Partiels | Écrans présents, fonctionnalités limitées |
| Écran de fin de partie | ❌ | `GameOver.jsx` existe mais n'est jamais appelé |
| Sons, badges, stats joueur, chat, PWA | ❌ | Annoncés dans README/RELAY.md, 0 % implémentés |

---

## 3. Audit de sécurité

### 🔴 S1 — Critique : secret API commité dans Git
Le fichier `.env` racine est **suivi par Git depuis le commit initial** et contient une clé API Moonshot/Kimi en clair :
```
KIMI_API_KEY=19c61c8f-…ded8
```
Le `.gitignore` n'exclut pas `.env` (seulement `.env.local`). Si le dépôt est ou devient public, la clé est compromise (elle l'est de toute façon dans l'historique).
**Action : révoquer la clé chez Moonshot, retirer les `.env` du suivi Git, ajouter `.env` au `.gitignore`.** (purge d'historique optionnelle ensuite).

### 🔴 S2 — Critique : RLS Supabase totalement ouvert
`supabase_schema.sql` lignes 30-40 :
```sql
CREATE POLICY ... ON public.games FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY ... ON public.questions FOR ALL USING (true) WITH CHECK (true);
```
N'importe quel anonyme possédant l'URL + clé publique (toutes deux dans le bundle JS public) peut **lire, modifier et supprimer toutes les parties et questions**, y compris tricher sur les scores en cours de match. Pour un outil de classe, il faut au minimum : INSERT/SELECT publics, UPDATE restreint (par exemple via un token de partie), DELETE interdit.

### 🔴 S3 — Bloquant : backend Supabase inexistant
`VITE_SUPABASE_URL=https://ejisurruximdavpcuonb.supabase.co` ne répond plus et le projet n'apparaît pas dans le compte Supabase (qui contient par ailleurs `geronimo-compagnon`, `Geronimo Assistant pédagogique`, `Geronimo WMS pédagogique`, etc.). Le multijoueur déployé est donc cassé. **Action : recréer/re-pointer un projet Supabase, rejouer `supabase_schema.sql` (corrigé), mettre à jour le `.env` et les secrets de build.**

### 🟠 S4 — Élevé : 19 vulnérabilités npm (1 critique, 4 élevées, 14 modérées)
Principalement via `firebase@10.7.0` (undici, ws…) — **un backend qui n'est plus utilisé**. La suppression de Firebase élimine l'essentiel ; `npm audit fix` traite le reste.

### 🟡 S5 — Moyen : fuite de données vers un service tiers
`HostGame.jsx:47` génère le QR code via `https://api.qrserver.com` (service externe) alors que le paquet npm `qrcode` est déjà installé. Les URL de parties transitent par un tiers. **Action : générer le QR localement avec le paquet `qrcode`.**

### 🟡 S6 — Moyen : pas d'authentification réelle
Le « login » est purement déclaratif (localStorage). Acceptable pour un atelier en classe, mais aucune fonction enseignant (création de questions, suppression de classes) ne doit être considérée comme protégée. À terme : Supabase Auth (au moins un compte enseignant) si des données élèves sont centralisées.

### 🟡 S7 — Moyen : pas de validation côté serveur
Les réponses sont validées côté client et les scores écrits directement par le client hôte. Combiné à S2, un élève outillé peut falsifier un match. Mitigation simple : valider/écrire via une Edge Function Supabase, ou au minimum restreindre l'UPDATE.

### ℹ️ S8 — Conformité RGPD (public scolaire)
Prénoms/pseudos d'élèves potentiellement stockés dans une base cloud sans mention d'information ni durée de rétention. Recommandation : pseudonymes uniquement (déjà encouragé par l'UI), purge automatique des parties (> 30 jours), petite mention « données » dans l'app.

### Bonnes nouvelles
- Aucun `dangerouslySetInnerHTML`, `eval` ni `innerHTML` : pas de vecteur XSS identifié.
- React échappe le rendu par défaut ; les entrées utilisateur sont bornées.
- La clé Supabase exposée est la clé *publishable* (conçue pour être publique) — le vrai problème est S2, pas l'exposition de la clé.
- CI GitHub Actions avec permissions minimales (`contents: read`).

---

## 4. Audit de pertinence pédagogique

**Verdict : c'est le point fort du projet.** Le contenu est réel, varié et aligné sur les référentiels logistique (Bac Pro OTM / BTS GTLA).

| Module | Questions | Pertinence |
|---|---|---|
| Palettisation (Ti × Hi, palette 120×80) | 20 + générateur de calculs | ✅ Cœur de métier, calculs réalistes |
| Coût de transport (distance, gasoil, péages) | 25 + calculs | ✅ Très bon |
| Plan de chargement (volumes conteneurs) | 25 + calculs | ✅ Très bon |
| Vocabulaire pro | 65 | ✅ |
| Culture logistique | 125 | 🟡 Format « année » un peu répétitif |
| Supply chain, Réception, Stocks, Sécurité, Traçabilité, Green, Team Leader, JIT, Tournées, Doc/Légal, Maths | ~300 | ✅ Couverture large du référentiel |
| **Total** | **~530 questions** | |

**Mécaniques pédagogiques pertinentes** : compétition par équipes (corde de traction = feedback visuel immédiat), mode entraînement individuel, championnat par trinômes sur la durée (engagement), explications et indices fournis avec chaque question.

**Axes d'amélioration pédagogique**
1. Les **explications/indices sont sous-exploités** : en mode arène, on passe à la question suivante sans temps de correction — c'est pourtant là que l'apprentissage se fait. Ajouter un écran « correction » de 10 s entre les rounds.
2. **Pas de statistiques par élève ni par module** : l'enseignant ne peut pas repérer les lacunes (ex. classe faible en palettisation). C'est la feature à plus forte valeur pédagogique manquante.
3. **Pas de gestion de difficulté progressive** : le champ `difficulty` (1-3) existe dans les données mais n'est pas exploité par le gameplay.
4. Mode culture : transformer les questions « en quelle année » en QCM contextualisés.
5. Pas d'export des résultats (CSV) pour le carnet de notes de l'enseignant.

---

## 5. Qualité & industrialisation

| Critère | État |
|---|---|
| Tests automatisés | ❌ 0 test, aucun framework (TESTING.md = tests manuels) |
| Lint | ❌ Script `npm run lint` cassé (ESLint non installé, pas de config) |
| CI | ⚠️ Build + déploiement GitHub Pages OK, mais ni lint ni test |
| Build | ✅ Passe (879 Ko — à découper) |
| Vulnérabilités | ❌ 19 (cf. S4) |
| Versioning | 🟡 Messages de commit corrects, pas de tags/releases |

---

## 6. Conclusion

Le projet est **utilisable dès aujourd'hui en mode local (1 poste, 2 équipes)** et son contenu pédagogique est riche et pertinent. En revanche, le **multijoueur est hors service** (projet Supabase disparu), la **sécurité de la base est inexistante** (RLS ouvert) et une **clé API est compromise** dans l'historique Git. L'industrialisation (tests, lint) est à zéro.

**Avancement : ≈ 60 %.** Le plan d'action détaillé pour atteindre 100 % est dans [`ROADMAP.md`](./ROADMAP.md).
