# TODO GLOBAL - TEAMBLENDER

## PRIORITÉ 0 - ARCHITECTURE & STABILITÉ

### Backend / runtime
- [x] Refactor backend bootstrap : séparer le démarrage du serveur, les routes, les services et le runtime Socket.IO.
- [x] Clarifier la logique de state temps réel : isoler les rooms, timers, cleanup et événements par challenge.
- [x] Centraliser la configuration des variables d’environnement, CORS et reverse proxy.
- [x] Séparer les moteurs de challenge des fichiers de runtime serveur pour améliorer la lisibilité et les tests.
- [x] Clarifier les responsabilités entre API, realtime, monitoring et debug.

### Frontend / composition
- [x] Split landing page : découper [frontend-next/app/page.js](frontend-next/app/page.js) en sous-composants plus petits.
- [x] Extraire les contenus statiques de la page d’accueil dans un module de données/section dédié.
- [x] Réduire le couplage visuel et fonctionnel de la landing page pour faciliter les évolutions UI.

### Sécurité & opérations
- [ ] Audit de sécurité sur CSP, CORS, gestion des authentifications et rate limiting.
- [ ] Structurer davantage le monitoring et les logs par domaine (auth, sessions, challenges, realtime).
- [ ] Séparer les chemins de diagnostic/debug du cœur métier pour un environnement plus sûr.
- [ ] Formaliser la stratégie de tests par domaine (backend, realtime, challenges, UI).
- [ ] Documenter l’architecture générale du projet pour faciliter la reprise et les évolutions.

---

## PRIORITÉ 1 - RESPONSIVE & UI FIXES

### Home > Cartes de session
- [ ] Déplacer le menu ⋮ en haut à droite de la carte.
- [ ] Corriger la popover/modale ouverte depuis ⋮ pour qu’elle soit entièrement visible.
- [ ] Reprendre le comportement déjà utilisé sur les cartes participants.

### Menu hamburger dans home
- [ ] Supprimer les cadres et bordures des entrées :
  - Sessions
  - Participants
  - Compte

### Session Builder
- [ ] Placer le texte "Voir les règles" juste à côté de l’icône correspondante au niveau des challenges.
- [ ] Adapter la taille du texte à la taille du texte / au contexte visuel.

### Session Builder - bloc session
- [ ] Supprimer entièrement le badge/tag "Brouillon" dans le bloc de session.
- [ ] Réduire les espaces inutiles dans le bloc de session.

### Header des challenges
- [ ] Corriger la popover du bouton ℹ️ tronquée à droite côté facilitateur.
- [ ] Vérifier overflow, z-index et positionnement pour une visibilité complète.
- [ ] Reprendre la nouvelle disposition du header : [Nom Session] [Nom Challenge] [Nombre Participants] [ℹ️].
- [ ] Garantir une seule ligne, sans retour à la ligne, même sur écran fractionné.
- [ ] Conserver le design actuel des informations et améliorer uniquement le bouton ℹ️.
- [ ] Reprendre exactement le même header côté participant.
- [ ] Ne pas afficher "Passer au défi suivant" côté participant.

---

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
- [ ] Passage automatique au niveau suivant après validation de la sortie.
- [ ] Conserver les vies restantes entre les niveaux.
- [ ] Générer des labyrinthes avec un unique chemin valide.

### Événements dynamiques
- [ ] Ajouter des événements temporaires : Fog of War.

### Documentation
- [ ] Mettre à jour les règles.
- [ ] Recalculer et documenter le système de score.

---

## PRIORITÉ 5 - CHALLENGE : PIXEL ARCHITECTE

- [ ] Rétablir la visibilité de l’arène du challenge.
- [ ] Reprendre l’affichage des différentes couches côté à côte, 3 par ligne, au niveau de l’arène.
- [ ] Supprimer les couches à droite qui masquent la zone de jeu.
- [ ] Vérifier le comportement visuel et le layout sur écrans standards et fractionnés.

---

## NOTES / CONTEXTE

- La priorité architecture doit être traitée avant les améliorations de gameplay avancées, car le risque de complexité et d’effets de bord est plus élevé dans le runtime backend et les états temps réel.
- Les tâches UI doivent être validées visuellement avec le comportement existant sur les cartes participants pour rester cohérent avec le design.
- Les tâches règles / gameplay doivent être validées sur la cohérence entre interface, score et logique réelle.
