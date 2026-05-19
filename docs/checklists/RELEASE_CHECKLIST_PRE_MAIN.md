# TeamBlender - Checklist release obligatoire avant push sur main

Derniere mise a jour: 2026-05-10

Objectif: securiser tout changement impactant deploiement, configuration ou parcours critiques avant push sur `main`.

## Regle d'application

- Cette checklist est obligatoire pour backend et frontend-next.
- Un seul item bloqueur en echec => push sur `main` interdit.
- Les preuves (logs, captures, commandes) doivent etre conservees dans la PR.

## 1) Verification environnement (bloquant)

- [ ] Variables critiques presentes et non vides selon [ENVIRONMENT_VARIABLES_MATRIX.md](ENVIRONMENT_VARIABLES_MATRIX.md).
- [ ] Verification automatique pre-release executee: `cd backend && npm run check:env`
- [ ] Controle explicite valeurs vides en production execute: `cd backend && npm run check:env:prod` (alerte explicite sur stderr + echec bloquant)
- [ ] Backend production: `JWT_SECRET` et `DATABASE_URL` verifies.
- [ ] Frontend production: `NEXT_PUBLIC_API_BASE` verifie (URL API prod, sans slash final).
- [ ] CI GitHub: `CATALOG_API_BASE`, `CATALOG_ADMIN_EMAIL`, `CATALOG_ADMIN_PASSWORD` verifies.

## 2) Verification backend locale (bloquant)

Depuis [backend/package.json](backend/package.json):

- [ ] Installation dependances: `npm install`
- [ ] Tests backend: `npm test`
- [ ] Gate catalogue API non vide: `npm run catalog:check:api`
- [ ] Smoke post-deploiement API (ou equivalent env cible): `npm run smoke:postdeploy:api`
- [ ] Monitoring 5xx script executable: `npm run monitor:api:5xx`

## 3) Verification frontend-next locale (bloquant)

Depuis [frontend-next/package.json](frontend-next/package.json):

- [ ] Installation dependances: `npm install`
- [ ] Build production: `npm run build`
- [ ] Smoke login manager: `npm run test:smoke:login`
- [ ] Smoke session-builder catalogue: `npm run test:smoke:session-builder`

## 4) Verification preview avant merge (bloquant)

- [ ] Preview Vercel creee et accessible.
- [ ] Parcours manager verifies sur preview: login -> home -> session-builder -> session-live -> resultats.
- [ ] Parcours participant verifie sur preview: join -> challenge actif -> etat final.
- [ ] Aucune erreur critique frontend (console) et backend (logs Railway) sur le parcours principal.

## 5) Verification deploiement/backend Railway (bloquant)

- [ ] Build Railway backend OK.
- [ ] Runtime Railway backend OK (pas de crash boot, pas de boucle restart).
- [ ] Endpoint sante/reponse API valides (`/api/test`, login, endpoints critiques sessions/challenges/users).
- [ ] Pas de 5xx persistants apres verification monitor.

## 6) Decision Go / No-Go

- [ ] GO uniquement si tous les points bloquants sont valides.
- [ ] NO-GO immediat si regression auth, sessions, catalogue challenges, ou erreur 5xx critique.
- [ ] En cas de NO-GO: appliquer [ROLLBACK_FRONTEND_BACKEND_RUNBOOK.md](ROLLBACK_FRONTEND_BACKEND_RUNBOOK.md).

## 7) Trace PR obligatoire

Inclure dans la PR:

- [ ] Resultat des commandes executees (backend + frontend-next).
- [ ] URL preview testee.
- [ ] Captures ecrans des parcours critiques.
- [ ] Risques identifies + plan rollback.
