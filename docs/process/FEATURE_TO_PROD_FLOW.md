# TeamBlender - Flow unique: feature -> PR -> preview -> merge -> prod

Derniere mise a jour: 2026-08-01
Statut: actif et applicable en documentation

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
- Pour une mise a jour documentaire pure, la validation minimale consiste a verifier que le changement ne touche pas aux routes, aux services ni aux variables critiques.

## Etape 2 - Pull Request

- Ouvrir une PR vers `main`.
- Completer `.github/pull_request_template.md` en entier.
- Fournir scope, impacts, risques, plan rollback et preuves de test.
- En cas de modification documentaire pure, indiquer explicitement qu’aucun flux applicatif n’a ete modifie.

## Etape 3 - Validation preview (obligatoire)

- Obtenir une preview Vercel verte et accessible.
- Verifier parcours manager et participant sur preview.
- Pour modif backend critique: verifier logs Railway build + runtime.
- Appliquer les regles:
  - `PR_PREVIEW_VALIDATION_RULE.md`
  - `PR_RAILWAY_LOGS_VALIDATION_RULE.md`
- Pour une modification documentaire pure, cette validation peut etre limitee a la verification de non-regression de la structure et du rendu de la documentation.

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
- Pour un changement documentaire pur, le done est atteint lorsque la documentation est claire, coherente et non contradictoire avec l’etat produit actuel.
