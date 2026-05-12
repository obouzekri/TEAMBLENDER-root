# TEAMSPARK - Flow unique: feature -> PR -> preview -> merge -> prod

Derniere mise a jour: 2026-05-10

Objectif: definir un seul chemin de livraison autorise pour eviter les regressions de deploiement.

## Regle unique

Tout changement produit/tech suit strictement ce flux:

1. Branche feature
2. Pull Request
3. Validation preview (Vercel)
4. Merge sur `main`
5. Verification production (Railway + Vercel)

Les pushes directs sur `main` sans PR validee sont interdits.

## Etape 1 - Branche feature

- Creer une branche nommee par scope (ex: `feature/...`, `fix/...`, `chore/...`).
- Developper et valider localement les tests minimaux.
- Si changement deploiement/env: appliquer `COMMIT_MESSAGE_DEPLOY_ENV_STANDARD.md`.

## Etape 2 - Pull Request

- Ouvrir une PR vers `main`.
- Completer `.github/pull_request_template.md` en entier.
- Fournir scope, impacts, risques, plan rollback et preuves de test.

## Etape 3 - Validation preview (obligatoire)

- Obtenir une preview Vercel verte et accessible.
- Verifier parcours manager et participant sur preview.
- Pour modif backend critique: verifier logs Railway build + runtime.
- Appliquer les regles:
  - `PR_PREVIEW_VALIDATION_RULE.md`
  - `PR_RAILWAY_LOGS_VALIDATION_RULE.md`

## Etape 4 - Merge sur main

- Merge autorise uniquement si toutes les checks PR sont valides.
- Pas de merge si blocant critique ouvert.
- Merge apres approbation review (au moins 1 reviewer recommande).

## Etape 5 - Verification production

- Executer checklist release: `RELEASE_CHECKLIST_PRE_MAIN.md`.
- Verifier smoke API, smoke login frontend, et monitor 5xx.
- En cas d'incident: appliquer `ROLLBACK_FRONTEND_BACKEND_RUNBOOK.md`.

## Definition de done du flow

- Feature livree en production sans erreur bloquante.
- Preuves de validation presentes dans la PR.
- Rollback possible et documente.
