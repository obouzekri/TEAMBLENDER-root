# TeamBlender - Index documentation

Ce dossier centralise la documentation de reference du projet: produit, architecture, processus, runbooks et historique.

L'etat courant du produit est reflechi ici via les liens vers `../todo.md` et `done.md`, avec `frontend-next/` comme cible produit. Le frontend legacy vanilla a ete retire du repository.

## Statut documentation (audit 2026-05-23)

- Audit detaille: `history/DOCS_AUDIT_2026-05-23.md`
- Documents deprecies (a ne plus utiliser comme reference active):
	- `process/WORKFLOW_OPERATIONNEL_FUTUR.md` (archive: `history/deprecated-docs/process/WORKFLOW_OPERATIONNEL_FUTUR.md`)
	- `product/readme_creer_nouveau_challenge.md` (archive: `history/deprecated-docs/product/readme_creer_nouveau_challenge.md`)
	- `product/SALLE_SECRETE_DOCS.md` (archive: `history/deprecated-docs/product/SALLE_SECRETE_DOCS.md`)
- Reference active pour la livraison: `process/FEATURE_TO_PROD_FLOW.md`
- Guide actif creation challenge: `product/CREATE_CHALLENGE_FRONTEND_NEXT.md`

## Quick links

- Workflow principal: `process/FEATURE_TO_PROD_FLOW.md`
- Checklist release: `checklists/RELEASE_CHECKLIST_PRE_MAIN.md`
- Rollback: `runbooks/ROLLBACK_FRONTEND_BACKEND_RUNBOOK.md`
- Variables critiques: `config/CRITICAL_BLOCKING_VARIABLES.md`
- Backlog post-MVP: `product/POST_MVP.md`
- Checklist legacy off: `checklists/LEGACY_FRONTEND_OFF_CHECKLIST.md`
- README global: `../README.md`

## 1) Point d'entree

- Flux principal: `process/FEATURE_TO_PROD_FLOW.md`

## 2) Arborescence documentaire

| Dossier | Contenu |
|---|---|
| `process/` | Regles de livraison, merge gates, standards PR/commit |
| `checklists/` | Checklists obligatoires pre/post migration et pre-release |
| `runbooks/` | Procedures incident, rollback, migration, restoration |
| `config/` | Variables critiques, matrice env, guides CI/GitHub |
| `product/` | Documentation fonctionnelle produit/challenges |
| `history/` | Historique, snapshots, manifests et traces temporelles |

## 3) Documents essentiels

### Process
- `process/FEATURE_TO_PROD_FLOW.md`
- `process/MERGE_GATE_RULE.md`
- `process/PR_PREVIEW_VALIDATION_RULE.md`
- `process/PREVIEW_SMOKE_PASS_RULE.md`
- `process/PR_RAILWAY_LOGS_VALIDATION_RULE.md`

### Checklists
- `checklists/RELEASE_CHECKLIST_PRE_MAIN.md`
- `checklists/POST_MIGRATION_CHECKLIST.md`
- `checklists/LEGACY_FRONTEND_OFF_CHECKLIST.md`

### Runbooks
- `runbooks/ROLLBACK_FRONTEND_BACKEND_RUNBOOK.md`
- `runbooks/HOTFIX_PROCEDURE.md`
- `runbooks/MIGRATION_DATA_LOCAL_TO_RAILWAY_RUNBOOK.md`
- `runbooks/CATALOG_RESTORE_PROCEDURE.md`
- `runbooks/BACKFILL_MINIMAL_RUNBOOK.md`

### Config
- `config/CRITICAL_BLOCKING_VARIABLES.md`
- `config/ENVIRONMENT_VARIABLES_MATRIX.md`
- `config/GITHUB_RELEASE_GUARD_SETUP.md`
- `config/TESTING_GUIDE.md`

### Product
- `product/POST_MVP.md`
- `product/challenge-ideas-backlog.md`
- `product/PIXEL_ARCHITECT_CHALLENGE_SPEC.md`
- `product/CHARTE_GRAPHIQUE_ACTUELLE.md`
- `product/CREATE_CHALLENGE_FRONTEND_NEXT.md`

### History
- `history/REBRAND_DEPLOYMENT_MANIFEST_2026-05-15.md`
- `history/RELEASE_BACKEND_2026-05-18.md`
- `history/DEPLOYMENT_POSTMORTEM_2026-05-09.md`

## 4) Liens transverses

- README global: `../README.md`
- Backend: `../backend/README.md`
- Frontend Next: `../frontend-next/README.md`
- Frontend legacy vanilla: retire du repository (consulter l'historique Git si besoin)
- Roadmap active: `../todo.md`
- Historique done: `done.md`
