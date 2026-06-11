# 🎨 Prompt pour Stitch - Amélioration Visuelle Logi-Battle

## 📱 Type d'Application
**Logi-Battle** (ou LogiDuel) est une application web de quiz compétitif éducatif pour l'apprentissage de la logistique. C'est une application React + Vite utilisée principalement sur écran d'ordinateur/projecteur en classe.

---

## 🎯 Fonctionnalités Principales

### 1. **Mode Standard (Split-Screen)**
- Deux équipes s'affrontent sur le même écran
- Système de "tir à la corde" visuel (rope animation)
- Questions de logistique avec timer
- 16 modules de jeu différents

### 2. **Mode Championnat** 🏆
- Gestion de classes (BTS Logistique, etc.)
- Création de groupes/trinômes (1-3 joueurs)
- Système de champion avec défis
- Classement et historique des matchs

### 3. **Mode Multijoueur QR Code**
- L'enseignant affiche un QR code
- Les élèves rejoignent avec leur téléphone
- Réponses en temps réel

---

## 🖼️ Écrans à Designer

### Écran 1: Page d'Accueil / Sélection des Modules
**Contenu actuel:**
- Header avec logo "LogiDuel"
- Grille de 16 modules de jeu (cartes avec icône, titre, description)
- Boutons "Mode Championnat" et "Mode Multijoueur"
- Footer avec informations

**Améliorations souhaitées:**
- Design plus moderne et premium
- Animations au survol des cartes
- Effet "glassmorphism" ou "neumorphism"
- Meilleure hiérarchie visuelle

### Écran 2: Plateau de Jeu (Split-Screen)
**Contenu actuel:**
- Barre de progression "corde" en haut (bleu vs orange)
- Split-screen: Team A (gauche, bleu) vs Team B (droite, orange)
- Timer central
- Carte de question avec clavier numérique ou QCM
- Header des équipes avec avatar, nom, score

**Améliorations souhaitées:**
- Design plus immersif et compétitif
- Effets visuels lors des réponses (particules, vibrations)
- Animations fluides de la corde
- Interface plus "gaming"

### Écran 3: Mode Championnat - Gestion des Classes
**Contenu actuel:**
- Liste des classes (cartes)
- Formulaire création de classe
- Informations champion actuel

**Améliorations souhaitées:**
- Design "trophée" / cérémonie
- Effets spéciaux pour le champion
- Interface administrative claire

### Écran 4: Mode Championnat - Gestion des Groupes
**Contenu actuel:**
- Liste des groupes/trinômes
- Formulaire création (nom + 3 membres max)
- Stats des groupes (victoires, défaites, points)
- Banner du champion actuel

**Améliorations souhaitées:**
- Cartes de profil pour chaque groupe
- Effet "couronne" pour le champion
- Visualisation des stats avec graphiques

### Écran 5: Mode Championnat - Tableau de Bord
**Contenu actuel:**
- Grand banner du champion
- Onglets: Classement / Défier / Historique
- Liste des challengers
- Bouton "Commencer le match"

**Améliorations souhaitées:**
- Design "arène" / combat
- Effets dramatiques pour le champion
- Interface de sélection de challenger stylisée
- Historique visuel type timeline

### Écran 6: Écran de Fin de Match Championnat
**Contenu actuel:**
- Résultat (Nouveau Champion / Défense Réussie / Match Nul)
- Score final
- Bouton retour

**Améliorations souhaitées:**
- Animation de victoire épique
- Confettis, effets spéciaux
- Cérémonie de remise du titre

---

## 🎨 Direction Artistique Actuelle

### Palette de Couleurs
```
Primary:       #f49d25 (Orange industriel)
Team A:        #3b82f6 (Bleu)
Team B:        #f49d25 (Orange)
Background:    #221a10 (Foncé chaud)
Background:    #1a1a2e (Alternative bleu foncé)
Surface:       #16213e (Cards)
Text:          #ffffff (Blanc)
Text muted:    #a0a0a0 (Gris)
Success:       #22c55e (Vert)
Danger:        #ef4444 (Rouge)
Warning:       #eab308 (Jaune)
```

### Typographie
- **Police principale**: Lexend (Google Fonts)
- **Icônes**: Material Icons

### Style Actuel
- Dark mode uniquement
- Cards avec bordures arrondies (rounded-2xl)
- Dégradés subtils
- Effet "industriel" / logistique

---

## ✨ Améliorations Souhaitées

### Général
1. **Effet Glassmorphism** sur les cards principales
2. **Animations de transition** fluides entre les écrans
3. **Micro-interactions** sur tous les boutons
4. **Effet de profondeur** (ombres, layers)
5. **Particles/effets** en arrière-plan subtils

### Spécifique Jeu
1. **Animation de la corde** plus réaliste (tension, vibration)
2. **Effet de "coup de poing"** lors des réponses correctes
3. **Screen shake** amélioré sur mauvaise réponse
4. **Timer** plus visuel (cercle, pulsation)

### Spécifique Championnat
1. **Effet de "spotlight"** sur le champion
2. **Trophées 3D** ou icônes animées
3. **Badges** pour les accomplissements
4. **Transitions** type "versus fighting game"

### Responsive
- Priorité: **Desktop/Tablette** (utilisé sur projecteur)
- Secondaire: Mobile (pour le mode QR)

---

## 🎮 Références Visuelles Souhaitées

### Style Gaming/Esport
- Interfaces de jeux compétitifs (Rocket League, Fortnite)
- Écrans de versus (Street Fighter, Tekken)
- Leaderboards gaming

### Style Industriel/Logistique
- Couleurs: Orange sécurité, bleu entreprise
- Éléments: Conteneurs, palettes, camions (subtils)
- Ambiance: Entrepôt moderne, high-tech

### Style Éducatif Premium
- Duolingo (gamification)
- Kahoot (compétition)
- Brilliant (clarté)

---

## 📐 Contraintes Techniques

- **Framework**: React + TailwindCSS
- **Animations**: Framer Motion (déjà utilisé)
- **Icônes**: Material Icons (déjà utilisé)
- **Polices**: Lexend (déjà utilisée)
- **Pas d'images lourdes** (performance sur projecteur)
- **SVG** préféré pour les illustrations

---

## 🎯 Objectifs

1. **Rendre l'application plus "fun" et engageante**
2. **Créer un sentiment de compétition** digne des esports
3. **Valoriser le champion** (effet "star")
4. **Clarté** malgré l'accumulation d'effets visuels
5. **Accessibilité** (contraste, lisibilité)

---

## 📦 Livrables Attendus

1. **Mockups** de chaque écran clé (Figma/Sketch/Adobe XD)
2. **Design System** (composants réutilisables)
3. **Palette finale** avec codes couleurs exacts
4. **Spécifications animations** (durées, easings)
5. **Assets** (icônes, illustrations SVG si nécessaire)

---

## 💡 Idées Bonus

- **Mode sombre/clair** (actuellement que sombre)
- **Thèmes saisonniers** (Noël, été)
- **Animations de célébration** personnalisées par module
- **Avatar personnalisables** pour les groupes
- **Effet sonore visuel** (ondes, vibrations)

---

**Contexte**: Application utilisée en classe par un professeur de logistique avec des élèves de BTS. L'objectif est de rendre l'apprentissage ludique et compétitif tout en gardant un aspect professionnel.
