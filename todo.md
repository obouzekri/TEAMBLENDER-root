# Todo priorisé

## 1. Page Mon compte
- [ ] Finaliser la page Mon compte selon le wireframe / contenu attendu.
- [ ] Vérifier la cohérence visuelle avec le reste de l’application.

## 2. Analytics et notifications
- [ ] Travailler sur la logique d’analytics.
- [ ] Ajouter la notification lorsqu’un utilisateur se connecte.

## 3. Tests
- [ ] Identifier les tests à couvrir prioritairement.
- [ ] Ajouter ou corriger les tests existants.
- [ ] Vérifier que les tests passent sur la branche en cours.

## 4. Challenge « Pari sur moi »

### A. Contenu et copy
- [ ] Mettre à jour le texte de la configuration du challenge avec : « À tour de rôle, chaque participant partage des informations sur lui-même. Un défi ludique pour voir à quel point vous connaissez les autres ! ».
- [ ] Mettre à jour le texte affiché dans la vue « Voir les règles » avec la même formulation.
- [ ] Mettre à jour le texte affiché côté facilitateur lors du lancement de la session avec la même formulation.
- [ ] Changer le titre du challenge de « SAUREZ-VOUS DISTINGUER LE VRAI DU FAUX ? » à « QUI ME CONNAIT LE MIEUX ? ».

### B. Configuration et règles
- [ ] Supprimer le texte « Les options de configuration dépendent du type d’activité. ».
- [ ] Corriger l’affichage des bornes de joueurs au format « Min: 2 · Recommandé: 4 · Max: 6 joueurs ».
- [ ] Vérifier que ce format est appliqué de façon cohérente pour les autres challenges.
- [ ] Définir la durée moyenne des règles à 20 min.
- [ ] Définir les temps de jeu : 40 s pour poser la question, 40 s pour répondre, 10 s pour le résultat.
- [ ] Définir le barème : 0 non posé, 0 non répondu, 1 bonne réponse.

### C. UI / UX du challenge
- [ ] Harmoniser les titres « Brief de la mission », « Facilitateur » et « Participant » avec la même couleur que « Chrono » et « Chat ».
- [ ] Appliquer cette logique visuelle à l’ensemble des challenges.

## 5. Mobile - session live

### A. Structure et lisibilité
- [ ] Afficher le brief de la mission au-dessus du chrono avant le lancement du challenge, côté participant et côté facilitateur.
- [ ] Réorganiser la section « PARTICIPANTS » pour éviter le « mur de texte ».
- [ ] Diviser les règles en deux blocs :
  - [ ] Règles du jeu (3 à 4 puces maximum)
  - [ ] Barème des points (version concise)
- [ ] Appliquer ce format structuré à tous les challenges.

### B. CTA mobile
- [ ] Rendre le bouton « Démarrer le challenge » plein largeur sur mobile.
- [ ] Ajouter un état désactivé si le quota minimum de participants n’est pas atteint.
- [ ] Ajouter un micro-texte d’état du type « En attente de X participants… ».
- [ ] Rendre le bouton très visible quand la session est prête.

### C. Header et sécurité
- [ ] Éloigner ou isoler le bouton « Terminer » des autres actions d’information sur mobile.
- [ ] Ajouter une confirmation avant « Terminer » et « Passer au challenge suivant » pour éviter les clics accidentels.

### D. Responsive UI
- [ ] Réduire la taille du titre principal sur mobile.
- [ ] Réduire la taille du sous-titre et l’espacement vertical sur mobile.
- [ ] Réduire les paddings internes du bloc titre sur mobile.
- [ ] Conserver les textes généraux à 16 px pour éviter le zoom automatique.
- [ ] Ne pas modifier le composant Chrono dans cette passe.

### E. Layout global
- [ ] Masquer le footer institutionnel sur la route /session-live/ pour garder l’espace dédié au jeu.
- [ ] Appliquer ces ajustements de façon modulaire et réutilisable avec Tailwind CSS.

## 6. Bug / incident réseau
- [ ] Investiguer l’erreur CORS / 502 observée sur la connexion Socket.IO vers l’API Railway.
- [ ] Vérifier si le problème vient du backend, du domaine ou de la configuration d’origin.


## 7. UX mobile - redesign des écrans de challenges
- [ ] Revoir la hiérarchie visuelle pour que l’action principale soit visible en moins de 2 secondes.
- [ ] Mettre en avant le joueur actif et la proposition ou la question sélectionnée.
- [ ] Réduire la charge cognitive sur l’écran mobile.
- [ ] Appliquer une direction visuelle moderne, proche d’une interface SaaS / facilitation de workshop.
- [ ] Conserver un ton ludique, mais professionnel.

### Layout recommandé
- [ ] Afficher en haut une carte dédiée au joueur courant, par exemple : « 🎤 Participant 2 est en train de répondre ».
- [ ] Positionner le contenu principal juste en dessous de cette zone.
- [ ] Réduire l’importance visuelle du chrono, du chat et du classement.
- [ ] Traiter le chat et le leaderboard comme des éléments secondaires, visibles uniquement si nécessaire.
- [ ] Structurer l’écran pour mettre en avant l’action en cours et l’élément actif.
