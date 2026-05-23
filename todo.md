# TeamBlender - TODO Master

> Derniere mise a jour : 23/05/2026
> Objectif lancement MVP : fin juin / debut juillet 2026
> Hors MVP : docs/product/POST_MVP.md

## 0) Fait recemment (session en cours)

### Realtime / backend
- [x] Fix assignment Copuzzle/Phrase base sur participants assignes (source runtime prioritaire)
- [x] Stabilisation sync realtime (polling de coherence + transport fallback)

### UX challenges (frontend)
- [x] Phrase mystere: suppression bloc "Vue globale" cote facilitateur
- [x] Phrase mystere: bouton triangle chrono retabli cote facilitateur
- [x] Titre timer uniformise en "Chrono" sur tous les challenges
- [x] Bouton play chrono reduit legerement (style harmonise)
- [x] Labyrinthe: bloc chrono compact aligne au contenu
- [x] Tous challenges: bloc Chat place sous bloc Chrono
- [x] Tous challenges: Chrono et Chat reduisibles/affichables (participant + facilitateur)
- [x] Passe harmonisation typographie (font-family commune sur challenges + cartes partagees)

## 1) Priorite immediate - Go-live MVP

### Blocages go-live (a traiter en premier)
- [ ] Sante API locale
  - Commande: cd backend ; npm run check:env
  - PASS si: aucune variable critique manquante
  - Dernier resultat: FAIL (JWT_SECRET, DATABASE_URL, NEXT_PUBLIC_API_BASE, ADMIN_RESET_PASSWORD)
- [x] Monitor leger de sante applicative prod
  - Commande: cd backend ; npm run monitor:health
  - Checks: /api/direct-test, /api/test, /api/health, /api/auth/login
  - Dernier resultat: PASS en prod (22/05/2026)
- [ ] Verification Brevo post-check
  - Action: confirmer que teamblender.io est bien Authenticated dans Brevo
  - PASS si: statut Authenticated visible + dernier email test recu
  - Dernier resultat: statut Authenticated confirme par API Brevo, reception inbox a confirmer manuellement

### Ops, conformite, legal
- [ ] Finaliser docs/checklists/LEGACY_FRONTEND_OFF_CHECKLIST.md
- [ ] Completer les placeholders des pages legales
- [ ] Ajouter une banniere cookies si analytics active

## 2) Execution technique MVP

### Realtime Socket - prochaines actions
- [ ] Prioriser quick wins puis optimisations backend a impact
- [ ] Documenter contrat socket (qui emet quoi, pour qui, quand)
- [ ] Valider plan de rollback clair

### QA technique
- [ ] Lancer build complet frontend + backend et corriger erreurs
- [ ] Verifier non-regression flow complet manager + participants (join, timer, challenge advance)

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

## 4) UX / UI et contenu challenge

### General UI/UX
- [ ] Faire une passe accents et apostrophes
- [ ] Verifier UX/UI responsive mobile
- [ ] Lancer QA visuelle mobile guidee (390x844 et 844x390)

### Points challenge restants
- [ ] Phrase mystere: reduire la taille du header participant a 2 lignes max
- [ ] Ajouter configuration visible "Chat active/desactive" et "Messages rapides actifs/desactives"
- [ ] Verifier uniformite finale couleur + contraste sur tous les challenges (QA design)

## 5) Auth, onboarding et paiement

### Auth et onboarding
- [ ] Mieux presenter formulaire de creation de participants

### Paiement
- [ ] Definir paywall progressif final (regles sessions/participants)
- [ ] Implementer paiement Stripe simple MVP
- [ ] Ajouter suivi paiements cote admin
- [ ] Ajouter gestion paiement dans parametres compte utilisateur

## 6) Process release

### Git / PR
- [ ] Si convention retenue: garantir depart de branche depuis develop
- [ ] Standardiser message commit (scope / impact / rollback)
- [ ] Valider preview avant merge PR

### Pre-release
- [ ] Valider variables d'environnement critiques

## 7) Backlog idees a cadrer

### Contraintes produit
- [ ] Supporter plusieurs sessions paralleles par facilitateur avec isolation stricte des donnees

### Positionnement / marketing
- [ ] Clarifier phrase d'accroche ("Contrairement aux ateliers classiques..." / "Sans formateur, sans preparation")
- [ ] Preparer visuels de vente (dashboard, session live, schema workflow, GIF/demo)

### Idees challenges (parking lot)
- [ ] Plateau chacun son role (type monopoly)
- [ ] Challenge detective
- [ ] Types d'enigmes a explorer:
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










