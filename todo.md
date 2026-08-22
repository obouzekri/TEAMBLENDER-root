
## Responsive

### 
[ ] En affichage mobile / fenêtre réduite, la section "VOS SESSIONS" souffre de deux dysfonctionnements CSS majeurs :

Menu à 3 points (⋮) coupé et inaccessible : Le conteneur possède une hauteur fixe / overflow: auto (ce qui crée une double scrollbar). Par conséquent, lorsque l'utilisateur clique sur les 3 points, le menu déroulant est masqué/rogné par le bord du composant.

Éléments coupés en largeur : Le bouton ⋮ déborde sur le bord droit et n'est pas bien aligné/intégré dans le padding de la carte.

Tâche :

Retire le max-height / overflow: hidden|auto interne sur la carte et son conteneur pour éliminer la double scrollbar et permettre au menu à 3 points de s'afficher au-dessus (z-index: 50 / position: absolute ou Portal).

Ajuste le padding et le dimensionnement de la carte pour que le bouton à 3 points reste parfaitement ancré et visible à l'intérieur en mobile.

## Session builder

## pour tous les challenges

- [ ] mettre "✅
Challenge terminé · En attente du facilitateur pour lancer le prochain challenge après le débrief." intégrer au bloc du challenge 

### Régles

- [ ] faire un pass sur les régles et la cohérence du score

## Labyrinthe des signaux
Optimise la mécanique du mini-jeu Labyrinthe (MazeGame) selon 3 règles :
- Fluidité : Applique une mise à jour optimiste côté client (Optimistic UI) pour les déplacements du joueur afin d'éliminer la latence d'affichage.
- Règle Impasse : Détecte lorsqu'un joueur entre dans une impasse et décrémente automatiquement une vie (lives - 1).
- Affichage : Masque l'indicateur/point bleu (blue-dot / player-marker) de la grille de jeu.
- Implémente un système multi-niveaux et des mécaniques avancées sur le défi MazeGame pour une session de 20 minutes.
Progression : À la sortie d'un niveau, passe automatiquement au labyrinthe suivant en conservant le nombre de vies restantes (lives).
Difficulté : Génère la grille avec un chemin unique valide vers la sortie.
Événements dynamiques : Active un événement temporaire (ex: brouillard de guerre fogOfWar: true ou inverseur de commandes) déclenché au temps/niveau.
Énigme finale : Affiche une modale d'énigme lors de l'accès à la case EXIT finale pour valider la victoire.
- Mettre à jours les régles en conséquences et le calcule du score

## Pari sur moi - Corrections et améliorations

### 1. Synchronisation des participants (BUG CRITIQUE)

Problème :
La vue Facilitateur reste bloquée sur "En attente de X participants..." même lorsque les joueurs sont connectés.

Comportement observé :
- Les participants rejoignent correctement la session.
- La liste des participants ne se rafraîchit pas automatiquement.
- Le bouton "Démarrer le challenge" reste désactivé.
- Un F5 est nécessaire pour voir les nouveaux participants.

Actions demandées :
- Vérifier le mécanisme temps réel utilisé (WebSocket, Socket.io ou autre).
- Écouter les événements d'arrivée et de départ des participants.
- Mettre à jour automatiquement l'état de la session.
- Mettre à jour la liste des participants sans rechargement.
- Activer automatiquement le bouton "Démarrer le challenge" dès que le nombre minimum est atteint.
- Ajouter un fallback par polling si nécessaire.

---

### 2. Vue du poseur pendant les votes

Lorsque les autres participants votent :

Afficher uniquement :

"Votes ouverts"

Supprimer entièrement :
- Le bloc Question
- Le texte de la question
- "Choisissez l'option vraie"

---

### 3. Nettoyage technique

Vérifier si des modèles, composants ou structures de données ont été ajoutés spécifiquement pour le challenge.

Si ces modèles ne sont plus utilisés :
- les supprimer ;
- supprimer les imports inutilisés ;
- supprimer les services et hooks inutilisés ;
- nettoyer les types associés.

Fournir la liste des éléments supprimés.

---

### 4. Refonte UX de l'écran de vote

Conserver :
- thème dark premium ;
- bleu nuit ;
- effets lumineux subtils.

Objectifs :
- compréhension instantanée ;
- moins de charge cognitive ;
- interface plus moderne ;
- expérience de jeu plus fluide.

#### Hiérarchie

Afficher :

DEVINEZ LA RÉPONSE DE

[Avatar]
Mohammed

Question :
Quelle boisson préfère cette personne ?

---

### Réponses

Supprimer le texte "Choisir".

Afficher directement :

☕ Café
🍵 Thé
🧃 Jus

Toute la carte doit être cliquable.

---

### Cartes

- Réduire la hauteur de 30 à 40 %
- Améliorer la lisibilité du texte
- Ajouter un hover premium
- Ajouter une légère animation

Hover :
- légère élévation
- bordure cyan
- glow subtil
- transition fluide

---

### État sélectionné

Après sélection :

✓ Café

avec :
- bordure cyan lumineuse ;
- fond légèrement éclairci ;
- coche visible ;
- feedback immédiat.

---

### 5. Feedback après vote

Lorsque tous les participants ont voté :

Afficher le résultat pendant 2 secondes.

Si la réponse est correcte :

✅ Correct !
Mohammed préfère le café.

Si la réponse est incorrecte :

❌ Incorrect
Mohammed préfère le café.

Après 2 secondes :
- transition automatique ;
- passage au participant suivant ;
- animation fluide.

---

### 6. Généralisation

Appliquer ces améliorations à toutes les cartes de questions du jeu :

- Préférences rapides
- Habitudes
- Talents
- Compétences
- Toutes les catégories futures

# Session live
"Dans le header de la session live (vue facilitateur), ajoute une icône d'information ℹ️ à côté du titre de la session.
Au clic sur cette icône, affiche une popover contenant :
Code de la session (avec un bouton pour le copier dans le presse-papier).
Nombre de participants actuellement connectés / attendus.
Liste des challenges dans l'ordre prévu, en mettant clairement en valeur le challenge en cours."
"pour la vue participant rajouter le même header sans le bouton "passer au defi suivant"

Sur écran fractionné: 
- adapte le header de session live pour qu'ils ne forment qu'une seule ligne horizontale compacte.
- Ajuste la taille de la barre de langue (FR ▾) dans le header supérieur : elle doit avoir une largeur fixe auto-ajustée à son contenu (width: fit-content) pour éviter qu'elle ne s'étire et prenne un espace disproportionné sur l'écran."

# Mode sombre


