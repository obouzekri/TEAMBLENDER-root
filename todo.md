# Todo produit priorise

## P0 - A finaliser en premier

### Mon compte et tarification
- [ ] Finaliser la page Mon compte selon le wireframe et le contenu attendu.
- [ ] Verifier la coherence visuelle avec le reste de l'application.
- [ ] Ameliorer l'UI de l'Espace Manager (Profil, Securite, Tarification).
- [ ] Clarifier le nom du plan actif dans Mon compte et proposer un chemin d'upgrade plus direct.
- [ ] Supprimer l'option de paiement PayPal.
- [ ] Dans Tarification, remplacer les coches par des croix rouges pour les fonctionnalites non incluses.

### Session live mobile
- [ ] Afficher le brief de mission au-dessus du chrono avant le lancement, cote participant et facilitateur.
- [ ] Reorganiser la section Participants pour eviter le mur de texte.
- [ ] Decouper les regles en 2 blocs: Regles du jeu (3 a 4 puces max) et Bareme des points (version concise).
- [ ] Appliquer cette structure a tous les challenges.
- [ ] Rendre le bouton Demarrer le challenge en pleine largeur sur mobile.
- [ ] Eloigner ou isoler le bouton Terminer des actions d'information sur mobile.
- [ ] Ajouter une confirmation avant Terminer et Passer au challenge suivant.
- [ ] Reduire la taille du titre principal, du sous-titre, des espacements verticaux et des paddings sur mobile.
- [ ] Conserver les textes generaux a 16 px pour eviter le zoom automatique.
- [ ] Ne pas modifier le composant Chrono dans cette passe.
- [ ] Masquer le footer institutionnel sur la route /session-live/.
- [ ] Appliquer ces ajustements de maniere modulaire et reutilisable.

## P1 - Qualite fonctionnelle et coherence produit

### Challenge Pari sur Moi
- [ ] Mettre a jour le texte de configuration avec: "A tour de role, chaque participant partage des informations sur lui-meme. Un defi ludique pour voir a quel point vous connaissez les autres !".
- [ ] Mettre la meme formulation dans Voir les regles.
- [ ] Mettre la meme formulation cote facilitateur lors du lancement de session.
- [ ] Changer le titre du challenge de "SAUREZ-VOUS DISTINGUER LE VRAI DU FAUX ?" a "QUI ME CONNAIT LE MIEUX ?".
- [ ] Supprimer le texte "Les options de configuration dependent du type d'activite.".
- [ ] Corriger l'affichage des bornes de joueurs au format "Min: 2 · Recommande: 4 · Max: 6 joueurs".
- [ ] Verifier que ce format est applique de facon coherente a tous les challenges.
- [ ] Harmoniser les couleurs des titres Brief de la mission, Facilitateur et Participant avec Chrono et Chat.
- [ ] Appliquer cette logique visuelle a l'ensemble des challenges.

### Homepage
- [ ] Aligner le design de Creer une session sur celui de Creer des participants.

### Analytics et notifications
- [ ] Definir et implementer la logique d'analytics prioritaire.
- [ ] Ajouter la notification lorsqu'un utilisateur se connecte.

### Tests
- [ ] Identifier les tests a couvrir en priorite.
- [ ] Ajouter ou corriger les tests existants.
- [ ] Verifier que les tests passent sur la branche en cours.

## P2 - Go-live production

### Payoneer
- [ ] Finaliser la verification du compte Payoneer.
- [ ] Recuperer les identifiants et secrets de production necessaires.

### Backend Railway
- [ ] Connecter le repository backend a Railway.
- [ ] Deployer l'API backend sur Railway.
- [ ] Ajouter un service PostgreSQL si necessaire.
- [ ] Configurer les variables d'environnement de production: NODE_ENV, DATABASE_URL, JWT_SECRET, FRONTEND_URL, CORS_ORIGINS et variables Payoneer.
- [ ] Executer les migrations de base de donnees.
- [ ] Verifier l'URL publique du backend et la sante de l'application.

### Frontend Vercel
- [ ] Connecter le repository frontend a Vercel.
- [ ] Deployer le frontend sur Vercel.
- [ ] Configurer les variables d'environnement cote Vercel: NEXT_PUBLIC_API_URL et NEXT_PUBLIC_APP_URL.
- [ ] Verifier que le domaine Vercel est accessible.

### Reseau et webhooks
- [ ] Ajouter les domaines Vercel et Railway aux origines autorisees cote backend.
- [ ] Configurer l'URL webhook Payoneer vers l'endpoint backend correspondant.
- [ ] Verifier que le webhook est bien recu et traite.

### Validation finale
- [ ] Tester le parcours d'abonnement et de paiement en environnement reel.
- [ ] Valider le flux complet de session live et d'authentification.
- [ ] Corriger les bugs de production identifies.


