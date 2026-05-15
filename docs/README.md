# TeamBlender - Index documentation

Ce dossier centralise la documentation operationnelle, produit et release.

## Quick links

- Workflow principal: `process/FEATURE_TO_PROD_FLOW.md`
- Checklist release: `checklists/RELEASE_CHECKLIST_PRE_MAIN.md`
- Rollback: `runbooks/ROLLBACK_FRONTEND_BACKEND_RUNBOOK.md`
- Variables critiques: `config/CRITICAL_BLOCKING_VARIABLES.md`
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
| `history/` | Historique, snapshots et traces temporelles |

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

## 4) Liens transverses

- README global: `../README.md`
- Backend: `../backend/README.md`
- Frontend Next: `../frontend-next/README.md`
- Frontend legacy archive (acces explicite): `../archive/frontend/`
- Historique done: `done.md`
