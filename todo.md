# TeamBlender - TODO Master

> Derniere mise a jour : 22/05/2026
> Objectif lancement MVP : fin juin / debut juillet 2026
> Hors MVP : docs/product/POST_MVP.md

## 1) Priorite immediate - Go-live MVP

### Blocages go-live (a traiter en premier)
- [ ] Sante API locale
	- Commande : cd backend ; npm run check:env
	- PASS si : aucune variable critique manquante
	- Dernier resultat : FAIL (JWT_SECRET, DATABASE_URL, NEXT_PUBLIC_API_BASE, ADMIN_RESET_PASSWORD)
- [x] Monitor leger de sante applicative prod
	- Commande : cd backend ; npm run monitor:health
	- Checks : /api/direct-test, /api/test, /api/health, /api/auth/login
	- Dernier resultat : PASS en prod (22/05/2026)
- [ ] Verification Brevo post-check
	- Action : confirmer que teamblender.io est bien Authenticated dans Brevo
	- PASS si : statut Authenticated visible + dernier email test recu
	- Dernier resultat : statut Authenticated confirme par API Brevo, reception inbox a confirmer manuellement

### Ops, conformite, legal
- [ ] Finaliser docs/checklists/LEGACY_FRONTEND_OFF_CHECKLIST.md
- [ ] Completer les placeholders des pages legales
- [ ] Ajouter une banniere cookies si analytics active

## 2) Execution technique MVP

### Realtime Socket - chantier principal
- [ ] Optimiser les evenements socket pour reduire les emissions inutiles

#### 2.1 Baseline et mesures
- [ ] Baseline metriques temps reel (scenario reproductible)
	- Scenario cible : 1 manager + 3 participants, meme challenge, meme sequence
	- Evenements suivis : timer.tick, participants.update, session:challenge-advanced, challenge:event
	- Process : POST /api/diagnostic/realtime-reset -> run before -> checkpoint before -> run after -> checkpoint after -> compare
	- PASS si : tableau avant/apres complet (volume/min, payload moyen, pic, top events), sans regression fonctionnelle
	- Dernier resultat : baseline historique capturee, checkpoints memoire a rejouer dans une fenetre unique before/after


#### 2.4 Strategie timer temps reel
- [ ] Definir la source de verite temps cote serveur + contrat d'affichage client
- [ ] Coalescer/throttler tick global, conserver warning/timeout separes
- [ ] Valider fluidite manager/participant avec baisse reseau

#### 2.5 Validation et non-regression
- [ ] Construire checklist QA realtime (join, reconnect, changement challenge, timer, fin)
- [ ] Comparer mesures avant/apres sur le meme scenario exact
- [ ] Atteindre reduction cible >= 30% emissions inutiles avec 0 regression bloquante

#### 2.6 Rollout progressif
- [ ] Prioriser quick wins puis optimisations backend a impact
- [ ] Documenter contrat socket (qui emet quoi, pour qui, quand)
- [ ] Valider plan de rollback clair

### Securite
- [x] Garantir authentification JWT sur toutes les routes protegees
	- Dernier resultat : PASS sur audit routes Express + patch `/api/landing-content/admin` et `/api/diagnostic/*` + test `protected.test.js` vert (22/05/2026)
- [x] Ajouter audit logging des actions sensibles
	- Dernier resultat : middleware `auditAction` ajoute + branchement sur mutations sensibles `users`, `sessions`, `participants` ; logs structures `security.audit_action` (trace_id, actor, target, status, duration, body filtre) ; test `session_rbac.test.js` PASS (22/05/2026)
- [ ] Affiner RBAC route par route (admin / user / participant)
	- Dernier resultat : routes mutation `sessions` verrouillees pour `admin/user` + ownership retabli sur `active-challenge` et `complete-active` + routes management `participants` verrouillees `admin/user` (liste, detail, update, delete, assign/unassign) + tests `session_rbac` et `participant_rbac` verts (22/05/2026)

## 3) Produit et fonctionnalites MVP

### Fonctionnalites coeur
- [ ] Creer une session depuis un template ou une suggestion
- [ ] Ajouter un mode quick session (manager)
- [ ] Creer un dashboard de statut de session manager

### Landing page publique
- [ ] Ajouter chiffres cles (nombre challenges, utilisateurs)
- [ ] Ajouter section logos clients/partenaires
- [ ] Ajouter section temoignages

### Catalogue et qualite
- [ ] Atteindre 20 challenges fonctionnels et testes

## 4) Process release

### Git / PR
- [ ] Si convention retenue : garantir depart de branche depuis develop
- [ ] Standardiser message commit (scope / impact / rollback)
- [ ] Valider preview avant merge PR

### Pre-release
- [ ] Lancer build complet et corriger erreurs
- [ ] Valider variables d'environnement critiques

## 5) UX / UI et contenu challenge

### General UI/UX
- [ ] Faire une passe accents et apostrophes
- [ ] Verifier UX/UI responsive mobile
- [ ] Lancer QA visuelle mobile guidee (390x844 et 844x390)



### Salle secrete

- [ ] Corriger chrono qui n'avance pas cote participants
- [ ] Ajouter message de succes en fin d'enigme


## 6) Auth, onboarding et paiement

### Auth et onboarding

- [ ] Mieux presenter formulaire de creation de participants

### Paiement (mode envisage)
- [ ] Ne pas bloquer a l'inscription (enlever du formulaire d'inscription)
- [ ] Definir paywall progressif apres activation rapide
	- Exemples de verrou : nombre de sessions = 2, nombre de participants = 4.
- [ ] Definir message de conversion Pro
- [ ] Implementer paiement Stripe simple et rapide
- [] ajouter au niveau de l'admin une page pour le suivi des paiement et au niveau des utilisateurs ..
- [] ajouter au niveau de paramétre du compte la page manager la partie paiement 

## 7) Backlog idees a cadrer


### Contraintes produit
- [ ] Supporter plusieurs sessions paralleles par facilitateur avec isolation stricte des donnees

### Positionnement / marketing
- [ ] Clarifier phrase d'accroche ("Contrairement aux ateliers classiques..." / "Sans formateur, sans preparation")
- [ ] Preparer visuels de vente (dashboard, session live, schema workflow, GIF/demo)

### Idées challenges (parking lot)
- [ ] Plateau chacun son role (type monopoly)
- [ ] Challenge detective
- [ ] Types d'enigmes a explorer :
	- Elements identiques
	- Trier les bonbons
	- Flux robotique
	- Dessiner une ligne
	- Blocs puzzle
	- Mots croises / recherche de mots
	- Tour de Hanoi
	- Relier les points
	- Memoire (fantomes caches)
	- Liste de courses
	- Trouver la paire
	- Passer la balle
	- Numero de telephone
	- Code secret
	- Attention
	- Scene de crique
	- Chasse au tresor
	- Chiffre manquant
	- Compter les fans
	- Anagrammes
	- Trouver l'intrus
	- Election

### Notes diverses a traiter
- [ ] Ajouter les bons tags/filtres dans l'espace manager session builder
- [ ] Informer au moment d'ajout challenge : config par defaut, nb joueurs challenge, nb participants session
- [ ] Reduire taille des cards timeline par phase


