# TeamBlender — TODO Master

> Dernière mise à jour : 17/05/2026
> Objectif lancement MVP : fin juin / début juillet 2026
> Hors MVP : voir `docs/product/POST_MVP.md`

## 1) Priorité immédiate (MVP)

### Checklist go-live exécutable (backend + Brevo)
- [ ] 1. Santé API locale
	- Commande: cd backend ; npm run check:env
	- PASS si: aucune variable critique manquante
	- Dernier résultat: FAIL (variables critiques manquantes: JWT_SECRET, DATABASE_URL, NEXT_PUBLIC_API_BASE, ADMIN_RESET_PASSWORD)
- [ ] 5. Vérification post-check
	- Action: confirmer dans Brevo que teamblender.io est Authenticated
	- PASS si: statut Authenticated visible + dernier email de test reçu
	- Dernier résultat: statut Authenticated confirmé par API Brevo, réception inbox à confirmer manuellement

### Ops, conformité, identité
- [ ] Finaliser la checklist `docs/checklists/LEGACY_FRONTEND_OFF_CHECKLIST.md` (legacy frontend archive)
- [ ] Compléter les placeholders dans les pages légales
- [ ] Ajouter une bannière cookies si de l'analytics est activé

## 2) Avant go-live

### Catalogue & qualité
- [ ] Atteindre 20 challenges fonctionnels et testés

### Fonctionnalités coeur
- [ ] Créer une session depuis un template ou une suggestion

### Landing page publique
- [ ] Ajouter les chiffres clés de la plateforme (nb challenges, nb utilisateurs)
- [ ] Ajouter une section logos clients / partenaires
- [ ] Ajouter une section témoignages

## 3) Technique MVP

### Backend

#### Performance
- [ ] Optimiser les événements socket pour réduire les émissions inutiles
- [ ] Batcher les mises à jour participants au lieu d'émettre par action
- [ ] Éviter les écritures DB à chaque interaction mineure

#### Sécurité
- [ ] Garantir que toutes les routes protégées exigent une authentification JWT
- [ ] Ajouter de l'audit logging pour les actions sensibles

### Frontend Next

#### Flow manager
- [ ] Ajouter un mode "quick session" avec challenges prédéfinis
- [ ] Créer un dashboard de statut de session pour le manager

## 4) Process release

### Git / PR
- [ ] Garantir que les branches partent de `develop` avant démarrage si cette convention est retenue
- [ ] Générer des messages de commit avec sections scope / impact / rollback
- [ ] Valider la preview avant merge de PR

### Pre-release
- [ ] Lancer un build complet et détecter les erreurs
- [ ] Vérifier que le catalogue de challenges n'est pas vide
- [ ] Valider les variables d'environnement critiques

## 5) Backlog idées à cadrer

### Contraintes produit
- [ ] Le facilitateur/manager peut lancer plusieurs sessions en parallèle. Les données de chaque session doivent rester indépendantes.

### Positionnement & marketing
- [ ] Clarifier la phrase d'accroche : "Contrairement aux ateliers classiques..." / "Sans formateur, sans préparation"
- [ ] Préparer visuels de vente : UI produit (dashboard, session live), schéma workflow (avant/pendant/après), GIF ou simulation



### Salle secrète
- [ ] Ajouter un niveau de difficulté pour l'énigme "salle secrète" ou créer "Salle secrète 2"
- [ ] Décider si garder la phrase "Les énigmes sont gérées depuis l'administration du challenge."
- [ ] Corriger le chrono qui n'avance pas côté participants
- [ ] Ajouter un message de succès quand l'énigme est réussie

### Auth & gestion utilisateurs
### Mobile
- [ ] Check UX/UI au niveau du responsive mobile
- [ ] Lancer une passe QA visuelle guidee mobile (390x844 et 844x390) sur tous les challenges

### Challenge Mission critique

### Mettre un plateau chacun son rôle: type monopoly

### penser à un challenge detective

### ajouter les modules de paiement




### Copuzzle
- [x] Finaliser la spec image Copuzzle : grille 5x5, 240 px par pièce, JPEG, idéal < 300 KB (max 500 KB), 1200x1200 px.
- [x] Si utile, afficher la spécification de l'image dans un libellé d'aide (i).
- [x] Dans le formulaire de matrice, remplacer "colonnes" et "lignes" par un seul champ "taille de matrice".
- [x] Aligner les libellés "Activer le time" et "Activer le chat" avec leurs checkboxes dans le formulaire de configuration Copuzzle

Les tags au niveau de l'espace manager  session builder au niveau des challenges




Faire un passe sur les accents et les apostrophe

