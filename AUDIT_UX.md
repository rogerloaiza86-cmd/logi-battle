# Audit UX — Geronimo Coop : côté professeur, côté élève

**Date : 11/06/2026** — audit réalisé après la généralisation de l'application (matières générales, QCM professeur, Culture G 3 niveaux, battles en 10 questions).

Méthode : pour chaque persona, on se pose les questions « qu'est-ce qui lui ferait gagner du temps ? », « qu'est-ce qui le ferait revenir ? », « où risque-t-il d'abandonner ? ».

---

## 1. Côté PROFESSEUR — ce qu'il apprécierait

### Ce qui marche déjà bien
- Préparer une séance en < 5 min (modules prêts à l'emploi, QR code immédiat).
- Créer un QCM depuis son cours sans compte ni configuration, et le partager en JSON.
- L'export CSV des stats pour le carnet de notes.
- La correction automatique entre les rounds : le prof commente au lieu de corriger.

### Points de friction identifiés 🔴
| # | Friction | Impact |
|---|---|---|
| P1 | **Pas de pause** pendant une battle : impossible de geler le timer pour développer une explication ou gérer un imprévu de classe | Élevé — c'est LE réflexe prof |
| P2 | Le timer (30 s) et le nombre de questions (10) **ne sont pas réglables** : une classe agitée a besoin de rounds courts, un sujet complexe de rounds longs | Élevé |
| P3 | Les **stats vivent sur un seul poste** (localStorage) : le prof qui change de salle perd tout | Élevé |
| P4 | Pas de **mode examen/évaluation** : le live est un jeu, mais le prof voudrait parfois récupérer les réponses individuelles de CHAQUE élève (pas juste l'équipe) | Moyen |
| P5 | La création de QCM est unitaire : **pas d'import en masse** (coller 10 questions depuis Word/Excel) | Moyen |
| P6 | Aucune **prévisualisation** d'un module : le prof découvre les questions en même temps que les élèves | Moyen |
| P7 | En live, le prof ne voit pas **qui a répondu quoi** pendant le round (juste « a répondu ✓ ») | Faible |

### Propositions concrètes (prof)
1. **Bouton pause** ⏸ dans GameBoard (gèle timer + verrouille les réponses) — petit effort, gros gain. *(P1)*
2. **Réglages de battle** dans TeamSetup : durée du round (15/30/45/60 s), nombre de questions (5/10/15/20), correction courte ou longue. *(P2)*
3. **Import en masse** dans l'éditeur QCM : coller un texte au format simple (`question; A; B; C; D; bonne lettre; explication` — une ligne par question), parsing automatique. Compatible Excel/Word. *(P5)*
4. **Mode « contrôle »** : chaque élève joue pour lui-même (pas d'équipes), le prof récupère un CSV note/élève à la fin. Réutilise PlayerGame quasi tel quel. *(P4)*
5. **Aperçu d'un module** : bouton 👁 sur chaque carte → fait défiler 5 questions exemples. *(P6)*
6. **Stats dans Supabase** (au lieu du localStorage) pour retrouver ses classes sur n'importe quel poste — nécessite le compte enseignant (cf. audit sécurité T4.5). *(P3)*

---

## 2. Côté ÉLÈVE — ce qui le ferait accrocher

### Ce qui marche déjà bien
- Rejoindre en 10 secondes avec un QR code, sans compte.
- Le feedback immédiat (sons, ✓/✗, corde qui bouge) et la correction expliquée.
- Les badges et le score personnel sur mobile.

### Points de friction identifiés 🔴
| # | Friction | Impact |
|---|---|---|
| E1 | Sur mobile, entre les rounds, l'élève **attend passivement** (~8 s de correction + latence) : c'est le moment où il décroche ou ouvre TikTok | Élevé |
| E2 | **Pas de classement individuel** visible : l'équipe gagne ou perd, mais « moi, je suis où ? » | Élevé |
| E3 | Les **badges ne se voient qu'en entraînement** : aucun feedback de progression en battle live | Moyen |
| E4 | Pas de **série (streak)** visible en live : la mécanique la plus addictive des quiz (Kahoot, Duolingo) est absente du multijoueur | Moyen |
| E5 | La **vitesse ne paie pas assez** : répondre juste en 2 s ou en 25 s rapporte pareil (sauf départage) | Moyen |
| E6 | L'élève qui a fini son entraînement n'a **pas de « next step »** (défi du jour, objectif) | Faible |

### Propositions concrètes (élève)
1. **Podium de fin de battle live** 🥇🥈🥉 : classement individuel des joueurs (bonnes réponses + vitesse) affiché sur l'écran projeté et sur chaque mobile à la fin. Les données existent déjà (`player_answer` contient nom, équipe, temps). *(E2)*
2. **Points de vitesse** : 100 pts pour une bonne réponse + bonus dégressif selon le temps restant (comme en entraînement) — affiché « +137 ! » sur le mobile. *(E5)*
3. **Streak visible en live** : « 🔥 ×3 » sur le mobile, et annonce sur l'écran prof (« Sarah enchaîne 5 bonnes réponses ! ») via le journal d'affrontement. *(E4)*
4. **Pendant la correction** sur mobile : afficher la position de l'élève dans le classement provisoire (« Tu es 4e/12 ») — transforme l'attente en motivation. *(E1)*
5. **Badges en live** : les réponses en multijoueur alimentent aussi les stats/badges de l'élève (actuellement seul l'entraînement compte). *(E3)*
6. **Défi du jour** : un mini-objectif quotidien en entraînement (« 5 bonnes réponses en géographie ») avec un badge éphémère. *(E6)*

---

## 3. Mini-jeux & dynamiques de classe proposés

Classés par rapport effort/impact :

| Idée | Principe | Effort | Impact dynamique |
|---|---|---|---|
| **⚡ Round éclair** | 1 round sur 10 aléatoire : 10 s au lieu de 30, points doublés — annoncé par un son + flash visuel | Faible | Fort (pics d'adrénaline) |
| **🃏 Jokers d'équipe** | Chaque équipe a 1 joker « 50/50 » (élimine 2 réponses) et 1 joker « gel » (gèle la corde un round) à poser quand elle veut | Moyen | Fort (stratégie collective, débats d'équipe) |
| **💀 Mort subite** | En cas d'égalité après 10 questions : question unique, première équipe qui répond juste gagne | Faible | Fort (suspense de fin) |
| **🏆 Ligue de la classe** | Classement persistant individuel par classe (points cumulés sur toutes les battles/entraînements), avec divisions Bronze/Argent/Or — remis à zéro chaque trimestre | Moyen | Très fort (raison de revenir) |
| **👑 Le trône** | Le meilleur joueur de la semaine porte une couronne à côté de son nom partout dans l'app | Faible | Fort (statut social) |
| **🎯 Question bonus du prof** | Pendant une battle, le prof peut injecter à la volée UNE question orale et attribuer le point manuellement | Moyen | Moyen (reprend la main sur le jeu) |
| **🧩 Relais par trinôme** | En championnat : chaque membre du trinôme répond à tour de rôle (le mobile désigne qui doit répondre) — évite que le « fort » réponde à tout | Moyen | Fort (inclusion des plus faibles) |
| **📅 Battle royale de fin de trimestre** | Mode spécial : toute la classe en individuel, élimination progressive (le dernier de chaque round sort), jusqu'au champion | Élevé | Très fort (événement) |

### Recommandation de mise en œuvre (3 lots)
- **Lot 1 — quick wins (1-2 jours)** : pause prof, réglages de battle (timer/nb questions), mort subite, podium de fin de live, points de vitesse, streak visible. → transforme déjà l'expérience.
- **Lot 2 — engagement (2-3 jours)** : ligue de la classe avec divisions, badges en live, jokers d'équipe, round éclair, import en masse de questions.
- **Lot 3 — structurel (3-5 jours)** : mode contrôle individuel avec export par élève, stats centralisées Supabase + compte enseignant, relais par trinôme, battle royale.

---

## 4. Verdict

L'application couvre désormais le « quoi » (contenu riche, tous modes, toutes matières). Le prochain levier n'est plus le contenu mais **la boucle d'engagement** : côté élève, rendre chaque seconde active (classement individuel, streaks, vitesse) ; côté prof, donner le contrôle du tempo (pause, réglages) et la mémoire (stats centralisées). Le Lot 1 est le meilleur rapport effort/impact et ne casse rien de l'existant.
