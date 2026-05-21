# TeamBlender — TODO Master

> Dernière mise à jour : 20/05/2026
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
	- [ ] Baseline métriques temps réel (avant modifs)
		- Action: mesurer sur une session type reproductible (1 manager + 3 participants, même challenge, même séquence d'actions) sans modifier la mécanique existante
		- Action: relever pendant la même fenêtre la fréquence des événements émis/reçus par room et par écran critique
		- Action: suivre les événements bruyants (`timer.tick`, `participants.update`, `session:challenge-advanced`, `challenge:event`) avec leur volume et leur taille de payload
		- Action: exécuter un run propre via diagnostic (`POST /api/diagnostic/realtime-reset` -> scénario "before" -> `POST /api/diagnostic/realtime-checkpoint/before`), sans modifier le code métier
		- Action: après optimisations, répéter le même scénario puis capturer `after` et comparer (`POST /api/diagnostic/realtime-checkpoint/after` + `GET /api/diagnostic/realtime-compare?before=before&after=after`)
		- PASS si: tableau "avant" disponible avec scénario, durée de mesure, nb d'émissions/minute, taille payload moyenne, pic max et top événements les plus fréquents, sans régression fonctionnelle ni changement de comportement observé
	- [ ] Frontend: réduire les émissions et abonnements redondants
		- Action: définir une source unique de socket côté page manager (éviter connexions multiples concurrentes) sans changer la mécanique métier
		- Action: supprimer la double émission client de progression challenge quand le backend diffuse déjà l'événement, sans modifier le comportement fonctionnel attendu
		- Action: lister les listeners dupliqués qui déclenchent plusieurs refetch pour un même événement, sans supprimer de trigger utile
		- PASS si: 1 seule connexion socket active par écran critique + 1 seul trigger de refresh par événement métier, sans régression visible
	- [ ] Backend: hygiène des broadcasts room
		- Action: distinguer les événements utiles au room complet vs uniquement à l'émetteur, sans changer les données reçues par les utilisateurs concernés
		- Action: limiter les `system.message` de join/rejoin aux transitions réellement visibles pour les utilisateurs, sans retirer un signal nécessaire
		- Action: éviter les émissions en cascade (`participants.update` successifs pour une même action), en conservant l'état final attendu
		- PASS si: baisse mesurée des émissions room-wide sans perte d'information fonctionnelle ni changement de mécanique
	- [ ] Stratégie timer temps réel
		- Action: définir la source de vérité du temps côté serveur et le contrat d'affichage côté clients, sans déplacer la logique métier côté vue
		- Action: réduire la fréquence de diffusion globale (tick coalescé/throttlé) et envoyer les jalons critiques séparément (warning/timeout), sans changer les seuils ni les transitions
		- PASS si: chrono perçu fluide côté manager/participants avec moins d'émissions réseau et même comportement fonctionnel
	- [ ] Validation & non-régression
		- Action: construire une checklist QA realtime (join, reconnect, changement de challenge, timer, fin de challenge) couvrant manager et participant
		- Action: comparer métriques avant/après sur le même scénario, sans changer les entrées de test ni les séquences d'action
		- PASS si: réduction cible >= 30% des émissions inutiles et 0 régression fonctionnelle bloquante
	- [ ] Rollout progressif
		- Action: appliquer d'abord les quick wins frontend, puis les optimisations backend à plus fort impact, en gardant le comportement actuel
		- Action: documenter les décisions de contrat d'événements socket (qui émet quoi, pour qui, quand) avant toute évolution de mécanique
		- PASS si: plan de déploiement validé + procédure de rollback claire + aucun changement de contrat non prévu
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
- [x] Vérifier que le catalogue de challenges n'est pas vide — `catalog:check` 12 actifs, OK (20/05/2026)
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


Type d'enigme:
- Elèments identiques
- Trier les bonbons
flux robotique
Dessine une ligne
blocs puzzle
Mot croisés
recherche de mots
tour de hanoi
relier les points
Mémoire:
- fantôme cachés
Liste de courses
trouver la paire
passer la balle
Numéro de téléphone
Code secret
Attention
Elements identique
Scène de crique
chasse au trèsor
Chiffre manquant
Compter les fans
anagrammes
Trouver l'intrus
Election

## 6) Challenge "Vrai ou Mensonge" — IMPLÉMENTÉ ✅ (20/05/2026)

> Tous les tickets Jira (BE, FE, QA) transférés vers `docs/done.md`.
> Engine `vrai_ou_mensonge_v1` : 8/8 tests Jest PASS, composant React + CSS, catalog backfill OK.



corriger les accent et apostrophe au niveau du formulaire du challenge  "phrase collaborative" : "Reconstruction collective d une phrase avec informations distribuees."
supprime cette phrase "Les options de configuration dépendent du type d'activité."
quelle la configuration des template 
quelle la configuration de faux mot  et d'indices

Améliore le chrono au niveau du challenge "salle secrète"  au niveau de manager/facilitateur pour qu'il ressemble au chrono actuelle de phrase mystère. 

je pense carrement à mettre le composant (design du chrono) à part et en faire appel à chaque fois ou j'en ai besoin au niveau d'un challenge (l'image en pièce jointe) et le design que je cherche. que pense tu sans rien implémenter.
Le point clé pour éviter les galères:

Séparer “affichage” et “logique temps”.
Le composant chrono doit rester surtout visuel, piloté par des entrées claires (durée, temps restant, état, urgence).
La source de vérité du temps doit rester côté session/challenge (pas dupliquée dans chaque vue), sinon désync manager/participant.

voir mot de passe lors de l'inscription
modifier créer session pour login vers créer un compte

Module de paiement non pas sur l'inscription 
Créer des participants au début de la création d'un compte
formulaire de création de participants à afficher bien 
sur le filtre affichier les bon paramétres et tags
enregistrer en bas 
copuzzle image par défaut, et personnalisation 

reduire la taille des cartes au niveau  du timeline  par phases reduire la taille