# TODO GLOBAL - TEAMBLENDER

## PRIORITÉ 0 - ARCHITECTURE & STABILITÉ

### Sécurité & opérations
- [ ] Audit de sécurité sur CSP, CORS, gestion des authentifications et rate limiting.
- [ ] Structurer davantage le monitoring et les logs par domaine (auth, sessions, challenges, realtime).
- [ ] Séparer les chemins de diagnostic/debug du cœur métier pour un environnement plus sûr.
- [ ] Formaliser la stratégie de tests par domaine (backend, realtime, challenges, UI).
- [ ] Documenter l’architecture générale du projet pour faciliter la reprise et les évolutions.

---

## PRIORITÉ 1 - RESPONSIVE & UI FIXES

### Session Builder
- [ ] Placer le texte "Voir les règles" juste à côté de l’icône correspondante au niveau des challenges.
- [ ] Adapter la taille du texte à la taille du texte / au contexte visuel.

### Session Builder - bloc session

### Header des challenges

- [ ] Reprendre exactement le même header côté participant sans afficher "Passer au défi suivant" et ℹ️ .

## PRIORITÉ 2 - CHALLENGES GLOBAUX

- [ ] Intégrer le message :
  ✅ Challenge terminé · En attente du facilitateur pour lancer le prochain challenge après le débrief
  directement dans le bloc du challenge terminé.
- [ ] Vérifier le comportement global des transitions entre challenges et états de session.
- [ ] Harmoniser les messages de statut affichés entre facilitateur et participant.

---

## PRIORITÉ 3 - RÈGLES & COHÉRENCE MÉTIER

- [ ] Réaliser un audit complet des règles de tous les challenges.
- [ ] Vérifier la cohérence entre :
  - règles affichées ;
  - calcul du score ;
  - comportement réel du jeu.
- [ ] Corriger toutes les incohérences détectées.
- [ ] Documenter les règles de chaque challenge de manière claire.

---

## PRIORITÉ 4 - CHALLENGE : LABYRINTHE DES SIGNAUX

### Gameplay
- [ ] Ajouter une Optimistic UI pour les déplacements afin d’éliminer la latence visuelle.
- [ ] Détecter automatiquement les impasses : entrée dans une impasse = -1 vie.
- [ ] Supprimer l’indicateur bleu au démarrage sur la grille.

### Progression
- [ ] Mettre en place un système multi-niveaux conçu pour ~20 minutes de jeu.
- [ ] Passage automatique au niveau suivant après validation de la sortie. (3 labyrtinhe)
- [ ] Conserver les vies restantes entre les niveaux.
- [ ] Générer des labyrinthes avec un unique chemin valide.

### Événements dynamiques
- [ ] Ajouter des événements temporaires : Fog of War.

### Documentation
- [ ] Mettre à jour les règles.
- [ ] Recalculer et documenter le système de score.



