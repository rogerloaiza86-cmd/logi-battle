# 📥 Téléchargement des Assets Stitch

## Méthode manuelle (recommandée)

L'API Stitch nécessite une authentification spécifique qui ne permet pas le téléchargement automatique direct.

### Étapes pour télécharger les designs :

1. **Connectez-vous à Stitch** : https://stitch.design
2. **Accédez à votre projet** : ID `15376714455160995880`
3. **Pour chaque écran**, cliquez sur :
   - Le menu "..." ( trois points )
   - "Export" ou "Télécharger"
   - Format : PNG ou SVG

### Liste des écrans à télécharger :

| # | Nom | ID | Fichier de sortie |
|---|-----|----|-------------------|
| 1 | Logi-Battle PRD | `16b170a7248f404b920585b5a2050843` | `01-Logi-Battle-PRD.png` |
| 2 | Design System | `asset-stub-assets-13ea904b83084a57b98e0f086c0fafae-1774119115659` | `02-Design-System.png` |
| 3 | Plateau de Jeu (Split-Screen) | `e30ab989b7f24092a1e094dfad0f3a7e` | `03-Plateau-de-Jeu.png` |
| 4 | Accueil - Sélection des Modules | `cb085e04910e4083bd47f72b26b6fb93` | `04-Accueil-Modules.png` |
| 5 | Gestion des Classes | `af3ce373994a4a54bd9e290dc8124a35` | `05-Gestion-Classes.png` |
| 6 | Tableau de Bord - L'Arène | `9f4bbb8b5d2841488b1e196bf469ae0f` | `06-Tableau-de-Bord.png` |
| 7 | Gestion des Groupes | `1907a9c848454e029ff64b094eb78f67` | `07-Gestion-Groupes.png` |
| 8 | Fin de Match - Cérémonie de Victoire | `b431e1bd0ab54a2a8ca8801efd5895a0` | `08-Fin-de-Match.png` |

### Alternative : Export du projet complet

Dans Stitch, vous pouvez aussi :
1. Aller dans les paramètres du projet
2. Sélectionner "Export Project"
3. Choisir le format (Figma, Sketch, etc.)

### Informations de connexion

- **Clé API** : `AQ.Ab8RN6LHlLbVy4yG3W_OJq3I1wiYUFmtbMyTq-RZ-vL_A2gbXw`
- **Project ID** : `15376714455160995880`

---

## Structure des assets

Placez les fichiers téléchargés dans ce dossier :

```
visuel de l'application/
├── stitch-assets/
│   ├── 01-Logi-Battle-PRD.png
│   ├── 02-Design-System.png
│   ├── 03-Plateau-de-Jeu.png
│   ├── 04-Accueil-Modules.png
│   ├── 05-Gestion-Classes.png
│   ├── 06-Tableau-de-Bord.png
│   ├── 07-Gestion-Groupes.png
│   └── 08-Fin-de-Match.png
└── README-DOWNLOAD.md
```

## Prochaines étapes

Une fois les assets téléchargés, vous pourrez :
1. Extraire les codes couleurs
2. Identifier les composants réutilisables
3. Créer les styles CSS/Tailwind correspondants
4. Implémenter les animations décrites
