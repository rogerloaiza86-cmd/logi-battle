# 📚 Component Documentation

## GameBoard.jsx
Le composant principal qui gère le plateau de jeu en split-screen.

### Props
- `gameMode` (string): Mode de jeu selectionné
- `onBack` (function): Callback pour retourner au menu

### Features
- Split-screen pour deux équipes
- Gestion alternée des tours
- Animation de la corde en temps réel
- Effets de vibration et particules
- Gestion des scores

### Usage
```jsx
<GameBoard gameMode="palettisation" onBack={handleBack} />
```

---

## VocabularyCard.jsx
Affiche une question de vocabulaire avec 4 options de réponse (QCM).

### Props
- `question` (object): Objet question avec options
- `team` (string): 'A' ou 'B' pour le style
- `onAnswer` (function): Callback avec résultat (true/false)
- `isAnswering` (boolean): État de vérification
- `disabled` (boolean): Désactiver les interactions

### Question Object
```javascript
{
  id: "q_1704067250000",
  type: "vocabulaire",
  difficulty: 2,
  title: "📚 Vocabulaire Logistique",
  description: "Que signifie TMS ?",
  data: {
    category: "Acronymes",
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOption: 1, // Index de la bonne réponse
    explanation: "TMS = Transportation Management System"
  },
  correctAnswer: 1,
  explanation: "TMS = Transportation Management System",
  hints: ["Catégorie: Acronymes"]
}
```

### Features
- 4 boutons d'options (A, B, C, D)
- Feedback visuel immédiat
- Explication affichée après réponse
- Style adaptatif selon l'équipe

---

## QuestionCard.jsx
Affiche une question et un clavier numérique pour répondre.

### Props
- `question` (object): Objet question avec toutes les données
- `team` (string): 'A' ou 'B' pour le style
- `onAnswer` (function): Callback avec résultat (true/false)
- `isAnswering` (boolean): État de vérification

### Question Object
```javascript
{
  id: "q_1704067250000",
  type: "palettisation",
  difficulty: 2,
  title: "📦 Palettisation",
  description: "Combien de colis...",
  data: { /* specific data */ },
  correctAnswer: 96,
  explanation: "Ti = 4, Hi = 6...",
  hints: ["...", "..."]
}
```

### Features
- Clavier numérique (0-9, C, Backspace)
- Support clavier physique (Enter, Backspace)
- Validation en temps réel
- Feedback visuel (shake, rouge)
- Affichage des hints

### Usage
```jsx
<QuestionCard
  question={question}
  team="A"
  onAnswer={handleAnswer}
  isAnswering={isAnswering}
/>
```

---

## RopeAnimation.jsx
Animation visuelle de la corde de tir à la corde.

### Props
- `position` (number): Position -100 à 100

### Features
- Smooth animation du drapeau
- Gradient di-directionnel (Blue to Orange)
- Affichage du statut (position ou VICTOIRE)
- Responsive design

### Position Mechanics
```
Team A Leading    Neutral    Team B Leading
    -100            0           +100
    |------|------|---|------|------|
  Victoire B            Victoire A
```

---

## GameSelection.jsx
Menu de selection des modules de jeu.

### Features
- Grille de 4 modules
- Animations au hover
- Indicateur de chargement
- Design premium avec gradients

### Modules
1. **Palettisation** - Disposition de colis
2. **Coût de Transport** - Calcul de frais
3. **Plan de Chargement** - Optimisation d'espace
4. **Vocabulaire** - Termes logistiques et acronymes
5. **Culture Générale** - Questions générales
6. **Mode Mixte** - Tous les modules

---

## GameOver.jsx
Écran de fin de partie.

### Props
- `winner` (string): 'A' ou 'B'
- `teamAScore` (number): Score de Team A
- `teamBScore` (number): Score de Team B
- `onRestart` (function): Callback pour relancer

### Features
- Affichage du gagnant
- Comparaison des scores animée
- Boutons Nouveau Duel / Menu

---

## ParticleEffect.jsx
Effet de particules explosives.

### Props
- `particles` (array): Array d'objets particule

### Particle Object
```javascript
{
  id: "unique_id",
  angle: Math.PI * 2,
  distance: 150
}
```

### Features
- Animation radiale
- Disappear progressif
- Burst effect

---

## ScreenVibration.jsx
Effet de vibration d'écran.

### Props
- `active` (boolean): Activer/désactiver

### Features
- Shake animation
- Opacity flash
- 0.4s duration

---

## RopeAnimation Component Tree
```
GameBoard
├── RopeAnimation
├── QuestionCard (Team A)
│   └── ParticleEffect
├── QuestionCard (Team B)
│   └── ParticleEffect
├── ScreenVibration
└── Footer (Status Bar)
```

---

## State Management (Zustand)

### useGameStore Hook
```javascript
const gameStore = useGameStore()

// State
gameStore.teamA.score
gameStore.teamB.score
gameStore.ropePosition
gameStore.currentQuestion
gameStore.gameStatus

// Actions
gameStore.incrementTeamAScore(1)
gameStore.incrementTeamBScore(1)
gameStore.setCurrentQuestion(question)
gameStore.nextRound()
gameStore.resetGame()
```

---

## Question Generators

### generatePalletizationQuestion(difficulty)
Génère une question de palettisation aléatoire.

```javascript
const question = generatePalletizationQuestion(2)
// Returns: {type, difficulty, title, description, data, correctAnswer, explanation, hints}
```

### Difficulty Levels
- **1 (Easy)**: Dimensions simples, calculs directs
- **2 (Medium)**: Dimensions variables, petites complications
- **3 (Hard)**: Cas complexes avec contraintes

### generateTransportCostQuestion(difficulty)
Questions sur coûts de transport.

### generateLoadingPlanQuestion(difficulty)
Questions sur optimisation d'espace.

---

## Styling Classes

### Team Colors
```
Team A (Blue):
.text-blue-400, .bg-blue-500, .border-blue-500

Team B (Orange):
.text-primary, .bg-primary, .border-primary
```

### Utility Classes
```
.keypad-btn        - Styled button
.industrial-pattern - Subtle background
.split-divider     - Divider between teams
.tug-rope-gradient - Rope gradient
.vibrate-screen    - Vibration animation
```

---

## Hooks & Utilities

### Custom Hooks
- `useGameStore` - Global game state (Zustand)

### Utility Functions
```javascript
calculateRopePosition(teamAScore, teamBScore)
determineWinner(ropePosition)
getRandomDifficulty()
getRandomQuestionType()
generateNextQuestion()
```

---

## Best Practices

1. **Always pass props** - Components are stateless where possible
2. **Use Zustand** for global state, not React Context
3. **Animations first** - Use Framer Motion for all animations
4. **Responsive** - Mobile-first approach with md: breakpoints
5. **Dark mode** - Always design for dark mode compatibility

---

## Common Issues

### Question not displaying
Check if `question` prop is not null and has required fields.

### Rope not animating
Ensure `position` is a number between -100 and 100.

### Styles not applying
Clear browser cache and rebuild CSS:
```bash
npm run dev
```

### Particle effects not showing
Check if ParticleEffect component is rendered inside GameBoard.

---

Last updated: February 2025
