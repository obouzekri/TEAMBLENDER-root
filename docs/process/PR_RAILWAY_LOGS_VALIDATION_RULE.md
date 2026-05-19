# TeamBlender - Regle PR: verification logs Railway obligatoire

Derniere mise a jour: 2026-05-10

Objectif: imposer la verification des logs Railway build + runtime pour toute PR backend critique avant merge.

## Regle obligatoire

- Toute PR qui modifie backend, migrations, auth, sessions, challenges, DB config, workflows backend ou variables env backend doit inclure une verification des logs Railway.
- Sans verification logs Railway, la PR est non conforme au process de merge.

## Definition de Done (logs)

- Build Railway verifie: installation dependances, build, migrations.
- Runtime Railway verifie: startup service, endpoints critiques, absence crash loop.
- Aucun motif d'erreur bloquant observe: 5xx repetes, erreurs DB, erreurs auth, reboot boucle.
- Fenetre d'observation documentee dans la PR (minimum 15 minutes post-deploy).

## Preuves minimales dans la PR

- Resume build log Railway (OK/KO + points surveilles).
- Resume runtime log Railway (OK/KO + points surveilles).
- Extrait court des anomalies si presentes + action corrective.

## Fichiers de reference

- Template PR applique: `.github/pull_request_template.md`
- Checklist release pre-main: `RELEASE_CHECKLIST_PRE_MAIN.md`
- Procedure rollback: `ROLLBACK_FRONTEND_BACKEND_RUNBOOK.md`
