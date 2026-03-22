# 🎯 Mode Multijoueur avec QR Code

## Présentation

Ce mode permet aux élèves de participer au jeu **avec leur téléphone portable** en scannant un QR code, pendant que l'enseignant affiche le tableau des scores sur son ordinateur/projecteur.

---

## 🚀 Comment l'utiliser

### Pour l'enseignant (Host)

1. **Lancez le serveur** : `npm run dev`
2. **Ouvrez** : `http://localhost:3000` (ou le port affiché)
3. **Cliquez sur "Mode Multijoueur"** sur la page d'accueil
4. **Un QR code s'affiche** - Les élèves peuvent le scanner
5. **Cliquez sur "Lancer la partie"** quand tout le monde est prêt

### Pour les élèves (Players)

1. **Scannez le QR code** avec l'appareil photo de votre téléphone
2. **Entrez votre prénom**
3. **Choisissez votre équipe** (A ou B)
4. **Répondez aux questions** sur votre téléphone !

---

## 📱 Architecture du système

```
┌─────────────────────────────────────────────────────────┐
│  ORDINATEUR ENSEIGNANT (Host)                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Affiche :                                       │   │
│  │  • QR Code pour rejoindre                        │   │
│  │  • Score en temps réel                           │   │
│  │  • Questions et réponses                         │   │
│  │  • Animation de la corde                         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │  TÉLÉPHONE  │ │  TÉLÉPHONE  │ │  TÉLÉPHONE  │
    │   Élève 1   │ │   Élève 2   │ │   Élève N   │
    │  (Équipe A) │ │  (Équipe B) │ │  (Équipe A) │
    └─────────────┘ └─────────────┘ └─────────────┘
```

---

## 🔧 URLs importantes

| URL | Description |
|-----|-------------|
| `/` | Page d'accueil (sélection du mode) |
| `/join` | Page pour les joueurs (rejoindre une partie) |
| `/join?game=GAME-123` | Rejoindre directement avec un code |

---

## 📋 Fonctionnement détaillé

### 1. Création de la partie (Host)

```javascript
// Génération d'un ID unique
const gameId = `GAME-${random(6 characters)}`;
// Exemple: GAME-A3B7K9
```

### 2. QR Code

Le QR code contient une URL du type :
```
http://192.168.1.3:3000/join?game=GAME-A3B7K9
```

**Note** : L'API utilisée pour générer le QR code est gratuite :
```
https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=URL
```

### 3. Connexion des joueurs

Les élèves peuvent rejoindre de 2 façons :
- **Scanner le QR code** → Redirection automatique
- **Entrer le code manuellement** → Saisie de `GAME-XXXXXX`

### 4. Gameplay

1. **Timer de 30 secondes** par question
2. **Les deux équipes répondent en même temps**
3. **Le plus rapide ET correct** gagne le point
4. **La corde bouge** selon les scores
5. **Victoire** à +100 ou -100

---

## 🔮 Prochaines améliorations (Firebase)

Actuellement, le système est en mode **démonstration** (simulation). Pour une vraie utilisation en classe avec synchronisation temps réel :

### Implémentation Firebase nécessaire :

```javascript
// Structure Firestore suggérée :
games/
  {gameId}/
    - status: "waiting" | "playing" | "finished"
    - currentQuestion: {...}
    - teams/
      - A: { score: 0, players: [...] }
      - B: { score: 0, players: [...] }
    - players/
      {playerId}/
        - name: "Thomas"
        - team: "A"
        - score: 5
        - hasAnswered: true|false
```

### Fonctionnalités à ajouter :
- [ ] Synchronisation temps réel des réponses
- [ ] Affichage de la liste des joueurs connectés
- [ ] Chat entre joueurs
- [ ] Mode "prêt" (les joueurs indiquent qu'ils sont prêts)
- [ ] Historique des parties
- [ ] Classement des meilleurs joueurs

---

## 💡 Conseils d'utilisation

### En salle de classe :

1. **Connectez votre ordinateur au projecteur**
2. **Lancez le mode Multijoueur**
3. **Affichez le QR code en grand** (plein écran si possible)
4. **Demandez aux élèves de scanner** avec leur téléphone
5. **Attendez que tout le monde soit connecté**
6. **Lancez la partie !**

### Problèmes courants :

| Problème | Solution |
|----------|----------|
| Le QR code ne se scanne pas | Agrandissez la fenêtre ou utilisez le code manuel |
| Les élèves n'ont pas de téléphone | Mode local (sans QR) sur l'ordinateur |
| Connexion lente | Vérifiez que tous les appareils sont sur le même WiFi |

---

## 🛠️ Développement

### Fichiers créés/modifiés :

```
src/
├── components/
│   ├── HostGame.jsx      # Interface hôte (QR code)
│   ├── PlayerJoin.jsx    # Page de connexion joueur
│   ├── PlayerGame.jsx    # Interface mobile joueur
│   ├── GameSelection.jsx # Ajout du bouton Mode Multijoueur
│   └── GameBoard.jsx     # Modifié pour recevoir les réponses
└── App.jsx               # Ajout des routes /join et /host
```

---

## 📱 Compatibilité

| Appareil | Support |
|----------|---------|
| iPhone (Safari) | ✅ Parfait |
| Android (Chrome) | ✅ Parfait |
| Tablettes | ✅ Fonctionne |
| Ordinateur | ✅ Fonctionne |

**Requis** : Connexion WiFi sur le même réseau que l'ordinateur hôte.
