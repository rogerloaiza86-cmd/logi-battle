# 📋 Document Relais - Logi-Battle

> **Date de dernière mise à jour** : 21 Mars 2026  
> **Version** : 1.0.0  
> **Statut** : Application fonctionnelle - Mode local actif

---

## 🎯 Vue d'ensemble

**Logi-Battle** (aussi nommé LogiDuel) est une application de quiz compétitif en temps réel basée sur des concepts logistiques réels. Deux équipes s'affrontent en répondant à des questions de logistique, le but étant de faire basculer la "corde" de son côté.

### Modes de jeu disponibles
1. **Mode Local** : 2 équipes sur le même écran (split-screen)
2. **Mode Multijoueur (QR Code)** : Les joueurs rejoignent avec leur téléphone
3. **Mode Championnat** : Système de classes, groupes/trinômes et défis du champion

### 🏆 Système de Championnat
- **Classes** : Organisez les élèves par classe (BTS Logistique, Licence, etc.)
- **Groupes/Trinômes** : Créez des équipes de 1 à 3 joueurs
- **Champion** : Le premier groupe créé devient champion, les autres doivent le défier
- **Système de défis** : Les challengers choisissent qui affronte le champion
- **Classement** : Points basés sur victoires/défaites + nombre de défenses du titre
- **Persistence** : Les données sont sauvegardées dans le localStorage

---

## 📁 Structure du Projet

```
Challenge Log/
├── .env                          # Clé API Kimi (agent Python)
├── requirements.txt              # Dépendances Python
├── kimi_agent.py                 # Agent Python pour génération de code
│
└── logi-battle/                  # Application principale (React + Vite)
    ├── .env                      # Configuration Firebase
    ├── package.json              # Dépendances Node.js
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    │
    ├── src/
    │   ├── App.jsx               # Point d'entrée React + Routing
    │   ├── main.jsx              # Bootstrap React
    │   │
    │   ├── components/           # Composants React
    │   │   ├── GameSelection.jsx         # Menu principal (16 modules)
    │   │   ├── GameBoard.jsx             # Plateau de jeu split-screen
    │   │   ├── ChampionshipManager.jsx   # Gestion du championnat
    │   │   ├── ChampionshipBoard.jsx     # Tableau des classements
    │   │   ├── ChampionshipGameBoard.jsx # Jeu en mode championnat
    │   │   ├── GroupManager.jsx          # Gestion des groupes/trinômes
    │   │   ├── TeamSetup.jsx             # Configuration des équipes
    │   │   ├── GameOver.jsx              # Écran de fin de partie
    │   │   ├── RopeAnimation.jsx         # Animation de la corde
    │   │   ├── ParticleEffect.jsx        # Effets de particules
    │   │   ├── ScreenVibration.jsx       # Vibration d'écran
    │   │   ├── HostGame.jsx              # Mode hôte (QR Code)
    │   │   ├── PlayerJoin.jsx            # Page de connexion joueur
    │   │   ├── PlayerGame.jsx            # Interface mobile joueur
    │   │   ├── QuestionCard.jsx          # Carte question (calculs)
    │   │   ├── VocabularyCard.jsx        # QCM Vocabulaire
    │   │   ├── SupplyChainCard.jsx       # Supply Chain
    │   │   ├── ReceptionCard.jsx         # Réception Express
    │   │   ├── StockCard.jsx             # Stock Master 3D
    │   │   ├── SafetyCard.jsx            # Safety First
    │   │   ├── TraceabilityCard.jsx      # Traçabilité Track
    │   │   ├── GreenCard.jsx             # Green Logistique
    │   │   ├── TeamLeaderCard.jsx        # Team Leader
    │   │   ├── JitCard.jsx               # Logistique JIT
    │   │   ├── RouteCard.jsx             # Route Optimizer
    │   │   ├── LegalCard.jsx             # Doc & Légal
    │   │   └── MathCard.jsx              # Calculs Logistiques
    │   │
    │   ├── hooks/
    │   │   ├── useGameStore.js           # State management (Zustand)
    │   │   └── useChampionshipStore.js   # State championnat (Zustand + persist)
    │   │
    │   ├── services/
    │   │   ├── firebase.js           # Config Firebase
    │   │   ├── database.js           # Services DB
    │   │   └── firestoreSchema.js    # Documentation schéma
    │   │
    │   ├── utils/                    # Générateurs de questions
    │   │   ├── questionGenerator.js      # Générateur principal
    │   │   ├── paletteMCQQuestions.js    # QCM Palettisation
    │   │   ├── transportMCQQuestions.js  # QCM Transport
    │   │   ├── loadingMCQQuestions.js    # QCM Chargement
    │   │   ├── gameUtils.js              # Utilitaires de jeu
    │   │   ├── vocabularyQuestions.js
    │   │   ├── supplyChainQuestions.js
    │   │   ├── receptionControlQuestions.js
    │   │   ├── stockManagementQuestions.js
    │   │   ├── safetyQuestions.js
    │   │   ├── traceabilityQuestions.js
    │   │   ├── greenLogisticsQuestions.js
    │   │   ├── teamLeaderQuestions.js
    │   │   ├── jitQuestions.js
    │   │   ├── routeOptimizerQuestions.js
    │   │   ├── legalQuestions.js
    │   │   ├── mathQuestions.js
    │   │   └── cultureQuestions.js       # Culture Générale (2015+)
    │   │
    │   ├── config/
    │   │   └── constants.js          # Constantes globales
    │   │
    │   └── styles/
    │       └── index.css             # Styles Tailwind + custom
    │
    ├── dist/                     # Build production
    └── node_modules/             # Dépendances
```

---

## ✅ Fonctionnalités Implémentées

### Core Gameplay
- [x] Split-screen 2 équipes (Team A Bleu vs Team B Orange)
- [x] Animation de la corde en temps réel (-100 à +100)
- [x] Timer de 30s par question (20s pour vocabulaire)
- [x] Système de rounds (10 manches)
- [x] Effets visuels (particules, vibration)
- [x] Détection du gagnant par round et par partie

### Modules de Jeu (16 modules)
| Module | Type Questions | Status |
|--------|---------------|--------|
| Palettisation | Calcul numérique | ✅ |
| Coût de Transport | Calcul numérique | ✅ |
| Plan de Chargement | Calcul numérique | ✅ |
| Vocabulaire | QCM (4 options) | ✅ |
| Supply Chain | QCM + Images | ✅ |
| Réception Express | Scénarios | ✅ |
| Stock Master 3D | Calculs de stock | ✅ |
| Safety First | QCM sécurité | ✅ |
| Traçabilité Track | QCM traçabilité | ✅ |
| Green Logistique | QCM RSE | ✅ |
| Team Leader | QCM management | ✅ |
| Logistique JIT | QCM Lean | ✅ |
| Route Optimizer | Géographie/Transport | ✅ |
| Doc & Légal | QCM réglementation | ✅ |
| Calculs Logistiques | Formules | ✅ |
| Culture Générale | QCM général (2015+) | ✅ |
| Mode Mixte | Tous les types | ✅ |

### Mode Multijoueur
- [x] Génération de QR Code pour rejoindre
- [x] Page `/join` pour les joueurs mobiles
- [x] Page `/host` pour l'enseignant
- [x] Saisie de code manuel (format: GAME-XXXXXX)
- [ ] **Synchronisation temps réel Firebase** (À implémenter)

### State Management (Zustand)
```javascript
// État global géré dans useGameStore.js
gameId, gameStatus, teamA, teamB
ropePosition (-100 à 100), currentQuestion
rounds, currentRound, totalRounds (10)
```

---

## 🔧 Configuration & Environnement

### Fichier `.env` (logi-battle/)
```env
# Mode DB: 'local' ou 'firebase'
VITE_DB_MODE=local

# Firebase (optionnel si mode local)
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

### Commandes disponibles
```bash
cd logi-battle

npm run dev       # Développement (localhost:3000)
npm run build     # Build production
npm run preview   # Preview build
npm run lint      # ESLint
```

---

## 📊 Schéma des Données

### Question Object
```javascript
{
  id: "q_1704067250000",
  type: "palettisation|cout_transport|loading_plan|vocabulaire|...",
  difficulty: 1-3,
  title: "📦 Titre",
  description: "Question...",
  data: { /* spécifique au type */ },
  correctAnswer: 96,
  explanation: "Explication...",
  hints: ["Indice 1", "Indice 2"]
}
```

### Game State (Firestore)
```javascript
{
  gameId: "game_1704067200000",
  status: "waiting|active|finished",
  teamAName: "TEAM ALPHA",
  teamBName: "TEAM BRAVO",
  teamA_score: 5,
  teamB_score: 3,
  rope_position: 20, // -100 to 100
  current_question_id: "q_1704067250000",
  rounds: [...],
  createdAt: Timestamp
}
```

---

## 🚧 Points d'Attention / TODOs

### Prioritaires
1. **Firebase Realtime** : Le mode multijoueur est en mode démo (simulation). Implémenter la synchro temps réel pour usage en classe.

2. **Gestion des joueurs** :
   - Liste des joueurs connectés
   - Mode "prêt" pour les joueurs
   - Attribution automatique aux équipes

3. **Statistiques** :
   - Historique des parties
   - Classement des meilleurs joueurs
   - Stats détaillées par module

### Améliorations UX
- [ ] Son lors des bonnes/mauvaises réponses
- [ ] Chat entre joueurs
- [ ] Mode entraînement solo (sans adversaire)
- [ ] Système de badges/achievements
- [ ] Timer visible plus grand

### Techniques
- [ ] Tests automatisés (Jest/Vitest)
- [ ] PWA pour installation mobile
- [ ] Optimisation des animations sur mobile

---

## 🔗 URLs Importantes

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil (sélection module) |
| `/host` | Mode hôte avec QR Code |
| `/join` | Page de connexion joueur |
| `/join?game=GAME-123` | Rejoindre directement une partie |

---

## 🎨 Design System

### Couleurs principales
- **Primary** : `#f49d25` (Orange industriel)
- **Team A** : `#3b82f6` (Bleu)
- **Team B** : `#f49d25` (Orange)
- **Background Dark** : `#221a10`
- **Background Light** : `#f8f7f5`

### Typographie
- **Font** : Lexend (Google Fonts)
- **Icons** : Material Icons

---

## 📱 Compatibilité

| Appareil | Support |
|----------|---------|
| iPhone Safari | ✅ |
| Android Chrome | ✅ |
| Tablettes | ✅ |
| Desktop | ✅ |

**Requis** : Node.js 16+, connexion WiFi pour mode multijoueur

---

## 🐛 Bugs Connus

1. **Aucun** identifié à ce jour

### Si problèmes
```bash
# Clear cache
rm -rf node_modules/.vite
npm run dev

# Port occupé
npm run dev -- --port 3001
```

---

## 📝 Dernières Modifications (À mettre à jour)

| Date | Modification | Fichiers concernés |
|------|--------------|-------------------|
| 2026-03-21 | Création du document relais | `RELAY.md` |
| 2026-03-21 | Agrandissement espace énoncés | `QuestionCard.jsx` |
| 2026-03-21 | Ajout questions QCM Palettisation | `paletteMCQQuestions.js` |
| 2026-03-21 | Ajout questions QCM Transport | `transportMCQQuestions.js` |
| 2026-03-21 | Ajout questions QCM Chargement | `loadingMCQQuestions.js` |
| 2026-03-21 | Intégration QCM dans générateur | `questionGenerator.js`, `GameBoard.jsx`, `VocabularyCard.jsx` |
| 2026-03-21 | Rééquilibrage longueurs réponses QCM | `paletteMCQQuestions.js`, `transportMCQQuestions.js`, `loadingMCQQuestions.js` |
| 2026-03-21 | Création système Championnat | `useChampionshipStore.js`, `ChampionshipManager.jsx`, `GroupManager.jsx`, `ChampionshipBoard.jsx`, `ChampionshipGameBoard.jsx`, `App.jsx`, `GameSelection.jsx` |
| | | |

---

## 🚀 Prochaine Session - Checklist

Avant de reprendre le développement :

- [ ] Vérifier que `npm run dev` fonctionne
- [ ] Confirmer le mode DB souhaité (`local` vs `firebase`)
- [ ] Si Firebase : vérifier les credentials dans `.env`
- [ ] Consulter la section TODOs ci-dessus
- [ ] Mettre à jour la date dans ce document après les modifications

---

## 📚 Documentation Existante

- `README.md` - Vue d'ensemble du projet
- `SETUP.md` - Guide d'installation
- `COMPONENTS.md` - Documentation des composants
- `QRCODE_MODE.md` - Mode multijoueur QR Code
- `TESTING.md` - Guide de testing

---

*Ce document doit être mis à jour à chaque session de développement pour refléter l'état actuel du projet.*
