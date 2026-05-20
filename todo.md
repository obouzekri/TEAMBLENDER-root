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

## 6) Challenge "Vrai ou Mensonge" - Tickets Jira prets (sans implementation)

### Resume scope V1 (fige)
- [ ] Mode individuel uniquement
- [ ] Round-robin obligatoire
- [ ] 3 affirmations par participant
- [ ] Stock fixe de suggestions uniquement (aucune saisie libre)
- [ ] Tous les non-poseurs votent individuellement (Vrai/Mensonge)
- [ ] Revelation manuelle par le poseur
- [ ] Scoring V1: votant correct +1, incorrect +0, poseur +0

### Epic BE
- [ ] JIRA-BE-EPIC-VM-01 - Orchestration backend du challenge Vrai ou Mensonge
	- Description:
		- Implementer la machine d'etats du challenge, la gestion des tours, le vote, la revelation et le calcul de score V1.
	- Definition of Done:
		- Etats du jeu coherents et tracables
		- Scoring correct sur cas nominaux + cas limites
		- Endpoints/evenements exploitables par le frontend

### Backend tickets
- [ ] JIRA-BE-VM-01 - Creer challenge session + etats globaux
	- Acceptance criteria:
		- Etat initial waiting_start
		- Transition vers selecting_statement au demarrage
		- Fin en finished apres N x 3 tours
	- Estimation: 3 pts
	- Dependencies: aucune

- [ ] JIRA-BE-VM-02 - Generer ordre round-robin sur 3 rounds
	- Acceptance criteria:
		- Ordre deterministe base sur liste participants session
		- Chaque participant apparait exactement 3 fois comme poseur
		- Nombre total de tours = N x 3
	- Estimation: 2 pts
	- Dependencies: JIRA-BE-VM-01

- [ ] JIRA-BE-VM-03 - Gerer selection phrase depuis catalogue fixe
	- Acceptance criteria:
		- Le poseur choisit une phrase catalogue active
		- Interdiction de reutiliser la meme phrase pour le meme poseur dans la session
		- Aucune entree texte libre acceptee par l'API
	- Estimation: 3 pts
	- Dependencies: JIRA-BE-VM-01

- [ ] JIRA-BE-VM-04 - API votes individuels + idempotence
	- Acceptance criteria:
		- Un vote max par votant et par tour
		- Vote modifiable tant que tour non revele
		- Votants eligibles = tous les participants sauf poseur
	- Estimation: 5 pts
	- Dependencies: JIRA-BE-VM-01, JIRA-BE-VM-02

- [ ] JIRA-BE-VM-05 - Revelation et verrouillage du tour
	- Acceptance criteria:
		- Seul le poseur peut declencher la revelation
		- Une fois revele: votes verrouilles
		- Trace timestamp revealed_at
	- Estimation: 3 pts
	- Dependencies: JIRA-BE-VM-04

- [ ] JIRA-BE-VM-06 - Calcul scoring V1 + classement
	- Acceptance criteria:
		- Vote correct: +1
		- Vote incorrect/absent: +0
		- Poseur: +0
		- Classement final stable et reproductible
	- Estimation: 3 pts
	- Dependencies: JIRA-BE-VM-05

- [ ] JIRA-BE-VM-07 - Timeouts et resiliences
	- Acceptance criteria:
		- Timeout selection poseur gere
		- Timeout vote non bloquant
		- Debranchage votant non bloquant
		- Debranchage poseur: pause/reprise selon regle produit
	- Estimation: 5 pts
	- Dependencies: JIRA-BE-VM-02, JIRA-BE-VM-04, JIRA-BE-VM-05

### Epic FE
- [ ] JIRA-FE-EPIC-VM-01 - Experience frontend challenge Vrai ou Mensonge
	- Description:
		- Produire les ecrans et interactions selon etats backend, avec UX claire et rythme court.
	- Definition of Done:
		- Ecrans alignes aux etats
		- Actions disponibles selon role (poseur/votant)
		- Aucun champ libre de phrase

### Frontend tickets
- [ ] JIRA-FE-VM-01 - Ecran lobby challenge
	- Acceptance criteria:
		- Affiche participants
		- Affiche regles courtes (3 affirmations, round-robin)
		- Bouton demarrer visible selon role autorise
	- Estimation: 2 pts
	- Dependencies: JIRA-BE-VM-01

- [ ] JIRA-FE-VM-02 - Ecran poseur: selection phrase catalogue
	- Acceptance criteria:
		- Liste des phrases fixes uniquement
		- Confirmation possible seulement apres selection
		- Aucun champ texte libre present
	- Estimation: 3 pts
	- Dependencies: JIRA-BE-VM-03

- [ ] JIRA-FE-VM-03 - Ecran votants: vote Vrai/Mensonge
	- Acceptance criteria:
		- Affiche phrase et identite poseur
		- Boutons Vrai/Mensonge
		- Vote modifiable avant revelation
	- Estimation: 3 pts
	- Dependencies: JIRA-BE-VM-04

- [ ] JIRA-FE-VM-04 - Ecran poseur: verite + bouton Reveler
	- Acceptance criteria:
		- Poseur indique verite reelle
		- Bouton Reveler declenche cloture de vote
		- Action irreverible cote UI
	- Estimation: 2 pts
	- Dependencies: JIRA-BE-VM-05

- [ ] JIRA-FE-VM-05 - Ecran resultats tour + score cumule
	- Acceptance criteria:
		- Affiche vrai/mensonge reel
		- Affiche points du tour
		- Affiche total cumule et transition vers tour suivant
	- Estimation: 3 pts
	- Dependencies: JIRA-BE-VM-06

- [ ] JIRA-FE-VM-06 - Ecran fin: classement final
	- Acceptance criteria:
		- Classement complet participants
		- Egalites affichees proprement
		- CTA retour session
	- Estimation: 2 pts
	- Dependencies: JIRA-BE-VM-06

- [ ] JIRA-FE-VM-07 - Gestion etats reseau/deconnexion
	- Acceptance criteria:
		- UI d'attente en cas d'interruption
		- Reconnexion restaure l'etat courant
		- Aucun blocage permanent de l'interface
	- Estimation: 5 pts
	- Dependencies: JIRA-BE-VM-07

### Epic QA
- [ ] JIRA-QA-EPIC-VM-01 - Validation fonctionnelle challenge Vrai ou Mensonge
	- Description:
		- Couvrir nominal, limites, resiliences, scoring et UX de comprehension.
	- Definition of Done:
		- Matrice executee
		- Defauts critiques corriges
		- Rapport go/no-go publie

### QA tickets
- [ ] JIRA-QA-VM-01 - Plan de tests nominaux (2, 3, 8, 12 participants)
	- Acceptance criteria:
		- N x 3 tours verifies
		- Ordre round-robin correct
		- Fin de partie automatique validee
	- Estimation: 3 pts
	- Dependencies: JIRA-FE-VM-06

- [ ] JIRA-QA-VM-02 - Tests scoring V1
	- Acceptance criteria:
		- Cas vote correct/incorrect/absence
		- Poseur reste a 0 point
		- Classement final coherent
	- Estimation: 2 pts
	- Dependencies: JIRA-BE-VM-06

- [ ] JIRA-QA-VM-03 - Tests cas limites/timeouts
	- Acceptance criteria:
		- Timeout selection
		- Timeout vote
		- Reveal tardif
		- Votes modifies pre-reveal
	- Estimation: 3 pts
	- Dependencies: JIRA-BE-VM-07, JIRA-FE-VM-07

- [ ] JIRA-QA-VM-04 - Tests deconnexion/reconnexion
	- Acceptance criteria:
		- Deconnexion votant non bloquante
		- Deconnexion poseur reglee selon spec
		- Reprise d'etat sans corruption des scores
	- Estimation: 3 pts
	- Dependencies: JIRA-BE-VM-07, JIRA-FE-VM-07

- [ ] JIRA-QA-VM-05 - Validation UX clarte et rythme
	- Acceptance criteria:
		- Compréhension immediate des actions par role
		- Temps ecran conformes aux cibles produit
		- Aucun ecran ambigu sur l'etat courant
	- Estimation: 2 pts
	- Dependencies: JIRA-FE-VM-06

### Notes de pilotage
- [ ] Priorite recommandee de livraison:
	- Lot 1: BE-01, BE-02, BE-03, FE-01, FE-02
	- Lot 2: BE-04, BE-05, FE-03, FE-04
	- Lot 3: BE-06, FE-05, FE-06, QA-01, QA-02
	- Lot 4: BE-07, FE-07, QA-03, QA-04, QA-05
- [ ] Suggestion planning:
	- Sprint 1: moteur tours + selection catalogue + vote nominal
	- Sprint 2: scoring + robustesse + QA complete