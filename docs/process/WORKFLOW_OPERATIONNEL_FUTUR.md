# TEAMSPARK - Workflow operationnel futur

## Objectif
Avoir un process simple, repetable et securise pour:
- coder avec Copilot
- savoir ou coder (environnement)
- lancer localement
- tester avant commit
- deployer en preview puis en production
- garder un historique propre

---

## 1) Environnement de travail (ou coder)

### Environnement principal de developpement
- Code applicatif backend: dossier `backend`
- Code applicatif frontend Next.js: dossier `frontend-next`
- Environnement local: machine locale (Windows), Node.js, terminal PowerShell

### Environnements cibles
- dev (Railway): bac a sable backend
- preview (Railway): pre-production backend
- production (Railway): production backend
- Vercel: frontend-next (preview/prod)

Regle simple:
- Developpement et debug: local
- Validation integration: preview
- Go-live: production uniquement apres checks verts

---

## 2) Collaboration avec Copilot (concret)

### Boucle de travail recommandee
1. Tu me donnes une tache precise (objectif + fichier/page impacte + definition of done).
2. Je lis le code existant et je fais les changements.
3. Je lance/verifie les tests et checks pertinents.
4. Je te donne le resume des changements + risques + prochaines etapes.
5. Tu valides, puis on commit/deploie.

### Format de demande qui marche bien
- Contexte: "sur backend sessions"
- Resultat attendu: "quand X alors Y"
- Contraintes: "pas de refacto global", "pas de changement DB"
- Validation: "quel test prouve que c'est ok"

---

## 3) Cycle standard d'une feature (du code au deploiement)

## Etape A - Creer une branche
Depuis le repo concerne:
- backend: `TEAMSPARK-backend`
- frontend: `TEAMSPARK-frontend-next`

Convention suggeree:
- `feature/<domaine>-<sujet>-YYYYMMDD`
- `fix/<domaine>-<bug>-YYYYMMDD`

Exemples:
- `feature/sessions-runtime-20260510`
- `fix/migrations-preview-20260510`

## Etape B - Developper localement
Backend:
- installer deps: `npm install`
- lancer: `npm start`
- API locale: `http://localhost:8080`

Frontend-next:
- installer deps: `npm install`
- lancer: `npm run dev`
- app locale: `http://localhost:3100`

## Etape C - Verifier avant commit
Backend (minimum):
- `npm test`
- `npm run check:env`
- si sujet catalogue: `npm run catalog:check:api` (avec variables d'env)

Frontend-next (minimum):
- `npm run build`
- `npm run test:smoke:login`
- `npm run test:smoke:session-builder`

Si impact bout en bout:
- `npm run test:smoke` dans `frontend-next`

## Etape D - Commit propre
Regle de commit:
- 1 commit = 1 intention claire
- message type conventional commit

Exemples:
- `feat(session): add active challenge runtime guard`
- `fix(migrations): make roles migration idempotent`
- `chore(docs): add operational workflow`

Checklist pre-commit:
- code compile
- tests critiques verts
- pas de secrets en dur
- diff relu

## Etape E - Push et PR
- push la branche
- ouvrir PR vers `main`
- ajouter description:
  - ce qui change
  - comment tester
  - risques/rollback

## Etape F - Deploiement preview
Backend Railway:
- verifier deploiement: `railway deployment list --environment preview --service TEAMSPARK-backend-Qxe5 --json`
- verifier logs: `railway logs --environment preview --service TEAMSPARK-backend-Qxe5 --latest`
- verifier sante: `GET /api/health` = 200

Frontend preview:
- verifier URL preview Vercel
- verifier parcours login -> home -> session builder -> session live

## Etape G - Validation go/no-go
Go si:
- smoke tests critiques OK
- pas d'erreur bloquante dans logs
- checks catalogue/env OK
- user journey principal OK (manager + participant)

No-go si:
- migration instable
- endpoint critique en echec
- regressions UI/UX majeures

## Etape H - Production
- merge PR vers `main`
- deploy production
- recheck post-deploy:
  - health
  - login
  - sessions
  - challenges

---

## 4) Strategie de test (quoi tester concretement)

## A. Tests backend
Minimum a chaque changement backend:
- auth (login user/participant)
- sessions (create/read/update/delete)
- challenges (catalog read)
- migrations si schema touche

Commandes utiles:
- `npm test`
- `npm run check:env:prod`
- `npm run smoke:postdeploy:api`

## B. Tests frontend-next
Minimum a chaque changement frontend:
- login et redirection role
- chargement home manager
- session builder (catalog + selection)
- session live (challenge actif)

Commandes utiles:
- `npm run build`
- `npm run test:smoke:preview`
- `npm run test:smoke:participant`

## C. Tests data/catalogue
Avant go-live:
- verifier catalogue non vide sur env cible
- verifier coherence API/DB
- verifier audit multi-env

Commandes utiles:
- `npm run catalog:check:api`
- `npm run catalog:coherence`
- `npm run catalog:audit:env`

---

## 5) Cadence recommandee (future)

Par ticket:
1. Dev local
2. Tests locaux
3. PR
4. Preview validation
5. Merge
6. Prod validation rapide

Par semaine:
- 1 revue fiabilite (erreurs 5xx, incidents, regressions)
- 1 revue backlog tech (dettes, migrations, observabilite)

---

## 6) Decision tree rapide

Si tu modifies seulement UI:
- frontend-next local -> smoke login/session-builder -> preview Vercel

Si tu modifies API sans schema:
- backend local -> tests + smoke API -> preview Railway

Si tu modifies schema/migrations:
- test migration local -> preview Railway -> audit env -> go/no-go

Si tu touches auth/sessions/challenges:
- tester manager et participant obligatoirement

---

## 7) Definition of done (DoD) TEAMSPARK
Une tache est "done" seulement si:
- code merge sur la bonne branche
- tests critiques verts
- preview validee
- production stable (si deploye)
- todo et documentation mis a jour

---

## 8) Template de demande rapide a Copilot
Copier-coller:

"Contexte: <backend|frontend-next>\nObjectif: <resultat metier attendu>\nContraintes: <pas de refacto global, etc.>\nTests attendus: <commands + user flow>\nDefinition of done: <critere observable>"

---

## 9) Version 2 - Checklists ultra-pratiques

## A. Checklist jour de dev (rapide)
1. Ouvrir la branche de travail feature/* ou fix/*.
2. Lancer backend local: npm start (dans backend).
3. Lancer frontend local: npm run dev (dans frontend-next).
4. Coder avec Copilot sur une seule intention a la fois.
5. Verifier localement le parcours impacte (manager et/ou participant).
6. Lancer les tests minimum:
  - backend: npm test
  - frontend: npm run build
7. Si sujet session/challenge/login, lancer en plus:
  - frontend-next: npm run test:smoke:preview
8. Relire le diff (pas de secrets, pas de changements hors sujet).
9. Commit propre avec message clair.
10. Push et ouverture de PR avec section Comment tester.

## B. Checklist jour de release preview
1. Verifier que la PR est mergee sur main.
2. Verifier le deploiement Railway preview:
  - railway deployment list --environment preview --service TEAMSPARK-backend-Qxe5 --json
3. Verifier les logs preview:
  - railway logs --environment preview --service TEAMSPARK-backend-Qxe5 --latest
4. Verifier endpoint sante backend:
  - GET /api/health doit repondre 200
5. Verifier frontend preview Vercel sur parcours critique:
  - login
  - home manager
  - session builder
  - session live
6. Lancer checks catalogue/env:
  - npm run catalog:check:api
  - npm run catalog:audit:env
7. Decision go/no-go:
  - GO si pas d'erreur bloquante + smoke OK
  - NO-GO sinon, rollback ou correctif rapide

## C. Checklist jour de release production
1. Confirmer que preview est validee.
2. Deploy production backend et frontend.
3. Verifier immediatement:
  - health
  - login user/participant
  - sessions
  - challenges
4. Surveiller logs 10 a 15 minutes post-release.
5. Si incident:
  - figer les merges
  - appliquer rollback prevu
  - ouvrir une note incident courte
6. Mettre a jour todo et done avec preuves de validation.
