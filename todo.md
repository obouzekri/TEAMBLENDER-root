# TeamBlender - TODO Master

> Derniere mise a jour : 21/05/2026
> Objectif lancement MVP : fin juin / debut juillet 2026
> Hors MVP : docs/product/POST_MVP.md

## 1) Priorite immediate - Go-live MVP

### Blocages go-live (a traiter en premier)
- [ ] Sante API locale
	- Commande : cd backend ; npm run check:env
	- PASS si : aucune variable critique manquante
	- Dernier resultat : FAIL (JWT_SECRET, DATABASE_URL, NEXT_PUBLIC_API_BASE, ADMIN_RESET_PASSWORD)
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

#### 2.2 Frontend realtime
- [ ] Voir historique des actions terminees dans docs/done.md (transfert du 21/05/2026)

#### 2.3 Backend realtime (hygiene broadcasts)
- [ ] Distinguer room-wide vs emitter-only
- [ ] Limiter system.message join/rejoin aux transitions visibles
- [ ] Eviter emissions en cascade pour une meme action
- [ ] Baisser les emissions room-wide sans perte d'information fonctionnelle

Derniers lots backend deja pousses (progression continue) :
- a3427e5 - throttle timer ticks in early countdown
- 1491833 - dedupe timer.state room broadcasts
- 0be9f29 - dedupe mission state emits per socket
- a77ef29 - dedupe vom state broadcasts
- ffa2b8e - dedupe phrase state broadcasts
- 719e9c5 - dedupe join phrase state broadcast

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

### Backend - autres points techniques
- [ ] Batcher davantage les mises a jour participants
- [ ] Eviter les ecritures DB pour interactions mineures

### Securite
- [ ] Garantir authentification JWT sur toutes les routes protegees
- [ ] Ajouter audit logging des actions sensibles

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

### Phrase collaborative / phrase mystere
- [ ] Corriger texte formulaire : "Reconstruction collective d une phrase avec informations distribuees"
- [ ] Supprimer la phrase : "Les options de configuration dependent du type d'activite."
- [ ] Clarifier configuration templates, faux mots et indices
- [ ] Revoir couleur texte (bleu + blanc) sur infos timer/slots
- [ ] Utiliser des phrases tres connues
- [ ] Corriger la repartition des cases

### Salle secrete
- [ ] Ajouter niveau de difficulte ou creer "Salle secrete 2"
- [ ] Decider si la phrase admin des enigmes est conservee
- [ ] Corriger chrono qui n'avance pas cote participants
- [ ] Ajouter message de succes en fin d'enigme
- [ ] Aligner design chrono manager/facilitateur sur phrase mystere

### Mission critique
- [ ] Corriger le texte vert cote facilitateur
- [ ] Compacter layout cote participants (container, colonnes, cards, timeline, chrono)

### Vrai ou Mensonge
- [ ] Ameliorer UI pour alignement visuel avec les autres challenges

### Copuzzle
- [ ] Ajouter image par defaut + personnalisation
- [ ] Permettre choix image admin ou import image custom

## 6) Auth, onboarding et paiement

### Auth et onboarding
- [ ] Afficher/masquer mot de passe a l'inscription
- [ ] Renommer "creer session" (login) vers "creer un compte"
- [ ] Creer des participants au debut de creation de compte
- [ ] Mieux presenter formulaire de creation de participants

### Paiement (mode envisage)
- [ ] Ne pas bloquer a l'inscription
- [ ] Definir paywall progressif apres activation rapide
	- Exemples de verrou : nombre de missions, nombre de participants, export/scoring
- [ ] Definir message de conversion Pro
- [ ] Implementer paiement Stripe simple et rapide

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