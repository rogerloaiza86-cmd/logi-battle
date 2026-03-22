# 🧪 Testing Guide

## Development Testing

### 1. Local Mode Testing
For testing without Firebase:

```bash
npm run dev
```

The app will use local storage for game state.

### 2. Test Game Flow

#### Step 1: Start Game
1. http://localhost:3000
2. Sélectionnez un module (e.g., "Palettisation")
3. La page GameBoard s'affiche

#### Step 2: Answer Questions
1. Vous voyez une question sur Team A side (gauche)
2. Utilisez le clavier numérique ou keyboard
3. Validez votre réponse
4. Team B voit l'autre côté

#### Step 3: Check Rope Animation
- Observez la corde se déplacer
- Elle devrait glisser vers le bleu si Team A gagne
- Elle devrait glisser vers l'orange si Team B gagne

#### Step 4: Play Until End
- Continuez jusqu'à ce que la position atteigne ±100
- Vous verrez l'écran GameOver
- Cliquez "Nouveau Duel" pour rejouer

---

## Test Cases

### ✅ Basic Gameplay
- [ ] Application lance sans erreurs
- [ ] Écran de sélection affiche 4 modules
- [ ] Clic sur module → GameBoard affiche
- [ ] Questions s'affichent correctement
- [ ] Clavier numérique fonctionne
- [ ] Soumission de réponse fonctionne

### ✅ Rope Animation
- [ ] Rope position = 0 au démarrage
- [ ] Position += 10 pour chaque bon Team A
- [ ] Position -= 10 pour chaque bon Team B
- [ ] Animation smooth (0.5s)
- [ ] Drapeau suit la position

### ✅ Scoring
- [ ] Score Team A s'incrémente
- [ ] Score Team B s'incrémente
- [ ] Rope position = (scoreA - scoreB) * 10
- [ ] Vic reached à ±100

### ✅ Visual Feedback
- [ ] Particules explosent sur bonne réponse
- [ ] Écran vibre sur mauvaise réponse
- [ ] Message d'erreur s'affiche
- [ ] Vibration stop après 0.4s

### ✅ Responsive Design
- [ ] Mobile (375px): OK
- [ ] Tablet (768px): OK
- [ ] Desktop (1024px+): OK

### ✅ Keyboard Input
- [ ] Touches 0-9 ajoutent des chiffres
- [ ] Enter soumet la réponse
- [ ] Backspace efface le dernier chiffre
- [ ] Clavier physique fonctionne

---

## Manual Testing Checklist

### Visual Tests
```
[ ] Colors are correct (primary=#f49d25, Team A=blue)
[ ] Fonts load correctly (Lexend)
[ ] Icons display (Material Icons)
[ ] No console errors
[ ] Dark mode applied
[ ] Responsive breakpoints work
```

### Gameplay Tests
```
[ ] Question data displays correctly
[ ] Hints show
[ ] Explanation shows after answer
[ ] Score updates correctly
[ ] Rope animates smoothly
[ ] No lag or stuttering
[ ] Particles disappear after 0.6s
[ ] Vibration animation plays
```

### Edge Cases
```
[ ] Division by zero handled
[ ] Very large numbers handled
[ ] Negative numbers handled
[ ] Empty input handled
[ ] Spam clicking handled
[ ] Quick answer switching works
```

---

## Browser Compatibility

Test on these browsers:
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

---

## Performance Testing

### Lighthouse Audit
```bash
npm run build
npm run preview
# Open DevTools > Lighthouse
```

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Load Time
- First Paint: < 2s
- Interactive: < 3s
- Total: < 5s

---

## Firebase Integration Testing

### Setup
1. Create Firebase project
2. Enable Firestore
3. Fill `.env` with credentials
4. Set `VITE_DB_MODE=firebase`
5. Run `npm run dev`

### Tests
- [ ] Game data saves to Firestore
- [ ] Questions load from Firestore
- [ ] Real-time updates work
- [ ] Score syncs across devices
- [ ] Rope animates in real-time

### Firestore Rules (Testing)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /games/{document=**} {
      allow read, write: if true;
    }
    match /questions/{document=**} {
      allow read: if true;
    }
    match /rounds/{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Production: Update security rules!**

---

## Automated Testing (Future)

```bash
npm test -- --watch
```

Test suite structure:
```
__tests__/
├── components/
│   ├── GameBoard.test.jsx
│   ├── QuestionCard.test.jsx
│   └── RopeAnimation.test.jsx
├── utils/
│   ├── questionGenerator.test.js
│   └── gameUtils.test.js
└── hooks/
    └── useGameStore.test.js
```

---

## Debug Mode

Add this to `.env`:
```
VITE_DEBUG=true
```

This enables:
- Console logging of state changes
- Visual debug info on screen
- Slower animations (2x)
- No vibration (easier to debug)

---

## Common Testing Issues

### "CORS error" in Firebase
- Check Firebase project settings
- Verify API key in .env
- Check Firestore rules

### "Module not found"
```bash
npm install
rm -rf node_modules/.vite
npm run dev
```

### "Port 3000 already in use"
```bash
npm run dev -- --port 3001
```

### "Styles not applied"
```bash
npm run dev
# Hard refresh browser (Ctrl+Shift+R)
```

---

## Test Data

### Sample Question
```javascript
{
  id: "q_test_1",
  type: "palettisation",
  difficulty: 1,
  title: "📦 Palettisation Simple",
  description: "Combien de colis de 50×40×25 cm sur une palette 120×80 cm?",
  data: {
    boxLength: 50,
    boxWidth: 40,
    boxHeight: 25,
    paletteLength: 120,
    paletteWidth: 80
  },
  correctAnswer: 24,
  explanation: "Ti = 2×2 = 4 colis/couche. Hi = 150÷25 = 6 couches. Total = 4×6 = 24",
  hints: ["Calculez Ti", "Calculez Hi", "Multipliez Ti×Hi"]
}
```

---

## Performance Metrics

### Ideal Metrics
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Animation FPS: 60 fps

### Monitoring
```javascript
// In App.jsx
if (import.meta.env.VITE_DEBUG) {
  console.log('Performance metrics:', performance.now())
}
```

---

**Last updated**: February 2025  
**Version**: 1.0.0
