# Logi-Battle - Application de Gamification Logistique

Bienvenue dans **Logi-Battle**, une application de quiz compétitif en temps réel basée sur des concepts logistiques réels !

## 🚀 Quick Start

### Installation des dépendances
\`\`\`bash
cd logi-battle
npm install
\`\`\`

### Lancer le serveur de développement
\`\`\`bash
npm run dev
\`\`\`

L'application sera accessible sur `http://localhost:3000`

## 📚 Architecture

### Stack Technique
- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS + Custom CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Backend**: Firebase (Firestore + Realtime DB)
- **Font**: Lexend (Google Fonts)

### Structure du Projet
```
logi-battle/
├── src/
│   ├── components/        # Composants React
│   │   ├── GameBoard.jsx       # Plateau de jeu principal (split-screen)
│   │   ├── QuestionCard.jsx    # Carte de question avec clavier numérique
│   │   ├── RopeAnimation.jsx   # Animation de la corde
│   │   ├── GameSelection.jsx   # Menu de sélection des modules
│   │   ├── GameOver.jsx        # Écran de fin de jeu
│   │   ├── ParticleEffect.jsx  # Effets de particules
│   │   └── ScreenVibration.jsx # Vibration d'écran
│   ├── hooks/
│   │   └── useGameStore.js     # State management (Zustand)
│   ├── services/
│   │   ├── firebase.js         # Configuration Firebase
│   │   ├── database.js         # Services de base de données
│   │   └── firestoreSchema.js  # Documentation du schéma Firestore
│   ├── utils/
│   │   ├── questionGenerator.js # Générateur de questions (logique métier)
│   │   └── gameUtils.js        # Utilitaires de jeu
│   ├── styles/
│   │   └── index.css           # Styles globaux et animations
│   ├── App.jsx                 # Composant principal
│   └── main.jsx                # Point d'entrée
├── index.html                  # Template HTML
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env                        # Configuration Firebase
└── README.md
```

## 🎮 Features

### 1. **Palettisation** 📦
- Calcul du nombre de colis par palette
- Input: Dimensions des colis et de la palette standard (120x80 cm)
- Logic: Ti (colis/couche) × Hi (nombre de couches)
- Difficulté: 1-3

### 2. **Coût de Transport** 🚚
- Calcul des frais de transport
- Variables: distance, poids, carburant, péages
- Remises et optimisations

### 3. **Plan de Chargement** 📊
- Optimisation de l'espace des conteneurs
- Calcul du nombre de colis chargeable

## 🎯 Gameplay

### Règles
- **Split-Screen**: Team A (Blue) vs Team B (Orange)
- **Rope Animation**: Visualisation en temps réel du lead
  - +100: Victoire Team A
  - -100: Victoire Team B
- **Scoring**: Chaque bonne réponse = +10 position corde
- **Visual Feedback**:
  - ✅ Bonne réponse: Particules explosives + son
  - ❌ Mauvaise réponse: Vibration d'écran + feedback

### Challenge #42
```
Question: "Si un camion transporte 12 palettes et chaque palette a 8 couches, 
quel est le nombre total de couches?"

Logique:
- Nombre de couches = 12 × 8 = 96 couches
```

## 🎨 Design System

### Couleurs
- **Primary**: `#f49d25` (Orange industriel)
- **Team A**: `#3b82f6` (Bleu)
- **Team B**: `#f49d25` (Orange)
- **Background Light**: `#f8f7f5`
- **Background Dark**: `#221a10`

### Typography
- **Font Principal**: Lexend (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Material Icons**: Pour les icônes

### Animations
- **Rope Animation**: Smooth easing (0.5s)
- **Screen Vibration**: Shake effect (0.4s)
- **Particle Burst**: Explosion de particules (0.6s)
- **Rope Movement**: Position update fluid

## 📊 Firestore Schema

### Collection: games
```javascript
{
  gameId: "game_1704067200000",
  status: "active", // waiting, active, finished
  teamAName: "TEAM ALPHA",
  teamBName: "TEAM BRAVO",
  teamA_score: 5,
  teamB_score: 3,
  rope_position: 20, // -100 to 100
  current_question_id: "q_1704067250000",
  rounds: [...],
  createdAt: Timestamp,
  finishedAt: Timestamp
}
```

### Collection: questions
```javascript
{
  id: "q_1704067250000",
  type: "palettisation", // palettisation, cout_transport, loading_plan
  difficulty: 2, // 1-3
  title: "📦 Palettisation",
  description: "Combien de colis...",
  data: {
    boxLength: 50,
    boxWidth: 40,
    boxHeight: 25,
    paletteLength: 120,
    paletteWidth: 80
  },
  correctAnswer: 96,
  explanation: "Ti = 2×2 = 4 colis/couche...",
  hints: ["Calculez Ti", "Calculez Hi", "Multipliez"],
  createdAt: Timestamp
}
```

## 🔧 Configuration Firebase

1. Créez un projet Firebase sur [firebase.google.com](https://firebase.google.com)
2. Activez Firestore et Realtime Database
3. Remplissez les variables d'environnement dans `.env`:
```env
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_auth_domain
VITE_FIREBASE_PROJECT_ID=votre_project_id
VITE_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
VITE_DB_MODE=firebase  # ou 'local' pour le développement
```

## 🚀 Déploiement

### Build pour production
```bash
npm run build
```

### Preview de la build
```bash
npm run preview
```

## 📱 Responsive Design
- ✅ Mobile-first
- ✅ Tablette optimisée
- ✅ Desktop full-screen

## 🎬 Prochaines Features
- [ ] Système de classement global
- [ ] Chat en temps réel
- [ ] Historique des parties
- [ ] Système de badges/achievements
- [ ] API de questions personnalisées
- [ ] Mode entraînement sans IA
- [ ] Stats détaillées par joueur

## 📝 License
MIT License - Copyright (c) 2025

## 🤝 Support
Pour toute question ou suggestion, veuillez contacter le support.

---

**Version**: 1.0.0  
**Last Updated**: February 2025
