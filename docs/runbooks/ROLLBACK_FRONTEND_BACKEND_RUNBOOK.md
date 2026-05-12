# TEAMSPARK - Procedure rollback frontend + backend

Date: 2026-05-10

## 1) Objectif
Restauration rapide d'un etat stable en cas de regression critique apres deploiement.

## 2) Critere de declenchement
- Echec login global (manager/participant)
- API instable (5xx repetes)
- Session-builder inutilisable
- Incident bloquant production non corrigible en hotfix rapide

## 3) Rollback backend (Railway)
1. Identifier le dernier deploiement stable dans Railway.
2. Rediriger le service vers ce deploiement (redeploy/restart selon procedure Railway interne).
3. Verifier:
   - `GET /api/test`
   - `POST /api/auth/login`
   - `GET /api/challenges`
4. Si incident data: appliquer procedure de restauration catalogue (`CATALOG_RESTORE_PROCEDURE.md`).

## 4) Rollback frontend (Vercel)
1. Identifier le dernier deploiement stable dans Vercel.
2. Promouvoir/redeployer ce build stable en production.
3. Verifier:
   - `/login`
   - login manager -> `/home`
   - `/session-builder`

## 5) Verification post-rollback
- `cd backend && npm run smoke:postdeploy:api`
- `cd frontend-next && npm run test:smoke:login`
- `cd frontend-next && npm run test:smoke:session-builder`

## 6) Communication incident
- Publier statut incident (debut/fin impact)
- Mentionner version rollback cible
- Capturer cause racine preliminaire

## 7) Cloture
- Ajouter postmortem court (cause, detection, prevention)
- Planifier corrective definitive avant prochain deploiement
