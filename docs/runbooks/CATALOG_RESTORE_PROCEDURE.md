# TEAMSPARK - Procedure restauration catalogue challenges

Date: 2026-05-10

## 1) Quand declencher
- Catalogue vide en production.
- Regressions critiques de donnees Challenges.
- Incident de migration affectant la table `Challenges`.

## 2) Pre-checks
- Verifier auth admin API.
- Verifier disponibilite backend Railway.
- Identifier le dernier etat sain (snapshot/export/date).

## 3) Chemin de restauration prioritaire
1. Restaurer snapshot DB `Challenges` depuis backup valide.
2. Verifier `GET /api/challenges` (non vide, statuts actifs valides).
3. Verifier session-builder cote frontend.

## 4) Chemin de restauration rapide (fallback operationnel)
- Executer backfill API idempotent (6 engines de base):
  - `cd backend && npm run catalog:backfill:api`
- Valider ensuite:
  - `cd backend && npm run catalog:check:api`

## 5) Validation post-restore
- `GET /api/challenges` retourne un catalogue non vide.
- Les engine_key critiques sont presents.
- Session-builder affiche des cartes challenge.

## 6) Communication incident
- Notifier equipe produit/tech.
- Documenter: symptome, action de restauration, heure, impact, prevention.

## 7) Prevention
- Garder gate release actif (`catalog:check:api`).
- Executer audit env regulier (`catalog:audit:env`).
- Conserver snapshots DB periodiques.
