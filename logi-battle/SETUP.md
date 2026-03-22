# SETUP & INSTALLATION GUIDE

## Pre-requisites
- Node.js 16+ et npm/yarn
- Compte Firebase (optionnel, mode local disponible)
- VS Code avec extensions recommendées

## Installation Steps

### 1. Installation des dépendances
```bash
cd logi-battle
npm install
```

### 2. Configuration Firebase (Optionnel)
Si vous voulez utiliser Firebase:

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Créez un nouveau projet
3. Activez Firestore Database et Realtime Database
4. Allez dans "Project Settings" > "Your apps"
5. Copiez vos credentials
6. Remplissez le `.env`:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_DB_MODE=firebase
```

**Pour le développement (mode local):**
```env
VITE_DB_MODE=local
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 4. Build pour production
```bash
npm run build
npm run preview
```

## 🎮 First Game

1. Lancez l'application
2. Sélectionnez un module:
   - **Palettisation**: Problèmes de disposition de palettes
   - **Coût de Transport**: Calcul des frais de logistique
   - **Plan de Chargement**: Optimisation d'espace
   - **Mode Mixte**: Tous les modules

3. Deux équipes répondent alternativement
4. La corde se déplace selon les bonnes réponses
5. Première équipe à 100% (ou -100%) gagne!

## 📁 Project Structure

```
src/
├── components/        # Composants React
├── hooks/            # Custom hooks & state management
├── services/         # Firebase & database services
├── utils/            # Helpers & utilities
├── config/           # Configuration & constants
├── styles/           # Global styles & CSS
├── App.jsx
└── main.jsx
```

## 🔧 Development Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'primary': '#f49d25',      // Orange
  'background-dark': '#221a10'
}
```

### Question Types
Edit `src/utils/questionGenerator.js` pour ajouter de nouveaux types.

### Animations
Modifiez les durées dans `src/config/constants.js`.

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- --port 3001
```

### Clear cache
```bash
rm -rf node_modules/.vite
npm run dev
```

### Firebase not connecting
Vérifiez:
- Vos credentials Firebase dans `.env`
- Votre connexion internet
- Les CORS settings dans Firebase

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase Docs](https://firebase.google.com/docs)

## 🚀 Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
netlify deploy
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

---

**Need help?** Check the [README.md](./README.md) ou contactez le support.
