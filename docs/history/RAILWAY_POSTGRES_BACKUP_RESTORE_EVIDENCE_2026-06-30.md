# TeamBlender - Railway Postgres Backup/Restore Evidence

Date: 2026-06-30
Author: Copilot session evidence log

## Scope
- Target objective: backup retention >= 7 days + restoration proof process.
- Environment inspected from linked Railway context snapshot.

## Verified context (CLI)
Command:
```bash
cd backend
railway whoami --json
railway status --json > .railway-status.json
```

Observed:
- Railway account authenticated (workspace available).
- Linked project contains `preview` and `production` environments.
- Service `Postgres` present in both environments.
- `requiredMountPath` is `/var/lib/postgresql/data` and deployment status is `SUCCESS`.

Evidence source:
- `backend/.railway-status.json`

## Backup retention control implemented
- Operational runbook maintained in `docs/runbooks/RAILWAY_POSTGRES_BACKUP_RESTORE_RUNBOOK.md`.
- Explicit retention check step requires `Backups` retention >= 7 days.
- Verification artifacts required after each drill/incident are documented.

## Restoration proof protocol
A restore drill is considered valid only if all checks below are archived:
1. Backup snapshot ID selected in Railway.
2. Restore start/end timestamps.
3. Post-restore checks executed:
   - `npm run check:env:prod`
   - `npm run monitor:health`
   - `npm run smoke:postdeploy:api`
4. Data-loss window acknowledged.

## Notes
- Railway CLI v4 in this environment does not expose a direct backup listing command.
- Therefore, retention confirmation and restore trigger remain dashboard steps, but evidence capture is standardized and auditable via this protocol.
