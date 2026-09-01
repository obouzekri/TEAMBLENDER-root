# RESPONSIVE & UI FIXES


## Home > Cartes de session
- Déplacer le menu ⋮ en haut à droite de la carte.
- Corriger la popover/modale ouverte depuis ⋮ pour qu'elle soit entièrement visible.
- Reprendre le comportement déjà utilisé sur les cartes participants.

## Menu hamburger dans home
- Supprimer les cadres et bordures des entrées :
  - Sessions
  - Participants
  - Compte

## Session Builder
- Placer le texte "Voir les règles" juste à côté de l'icône correspondante au niveau des challenges - la taille du texte adaptée à la taille du texte

---

# CHALLENGES (GLOBAL)

- Intégrer le message :
  ✅ Challenge terminé · En attente du facilitateur pour lancer le prochain challenge après le débrief
  directement dans le bloc du challenge terminé.

---

# RÈGLES

- Réaliser un audit complet des règles de tous les challenges.
- Vérifier la cohérence entre :
  - règles affichées ;
  - calcul du score ;
  - comportement réel du jeu.
- Corriger toute incohérence détectée.

---

# CHALLENGE : LABYRINTHE DES SIGNAUX

## Gameplay
- Ajouter une Optimistic UI pour les déplacements afin d'éliminer la latence visuelle.
- Détecter automatiquement les impasses :
  - entrée dans une impasse = -1 vie.
- Supprimer l'indicateur bleu au démarage sur la grille.

## Progression
- Mettre en place un système multi-niveaux conçu pour ~20 minutes de jeu.
- Passage automatique au niveau suivant après validation de la sortie.
- Conserver les vies restantes entre les niveaux.
- Générer des labyrinthes avec un unique chemin valide.

## Événements dynamiques
Ajouter des événements temporaires :
- Fog of War.

## Documentation
- Mettre à jour les règles.
- Recalculer et documenter le système de score.

---

# SESSION Builder

Pour le bloc session :
"test 11
Brouillon
2 participant(s)
..."
Supprimer entièrement le badge/tag "Brouillon".
Reduire les espaces inutile.
---

# HEADER DES CHALLENGES

## Header facilitateur

Problème :
La modale ouverte depuis le bouton ℹ️ est tronquée à droite.

Corrections :
- Garantir une visibilité complète de la popover.
- Vérifier overflow, z-index et positionnement.

Nouvelle disposition du header :

[Nom Session] [Nom Challenge] [Nombre Participants] [ℹ️]

Contraintes :
- Tous les éléments sur une seule ligne.
- Conserver le design actuel des informations.
- Améliorer uniquement le bouton ℹ️.
- Aucun retour à la ligne même en écran fractionné.

## Header Participant

- Reprendre exactement le même header.
- Ne pas afficher "Passer au défi suivant".

## Challenge: pixel architecte

l'arene du challlenge n'est plus visible, il y'avait avant les différents couche lister cote à cote 3 par ligne au niveau de l'arena. supprimer les couches à droite