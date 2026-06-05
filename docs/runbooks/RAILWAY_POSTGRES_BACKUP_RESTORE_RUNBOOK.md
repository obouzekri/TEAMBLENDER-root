# TeamBlender - Railway Postgres Backup & Restore Runbook

Date: 2026-06-05
Scope: Railway PostgreSQL backup retention and restoration procedure

## 1) Objective
- Ensure Railway PostgreSQL backups are active with retention >= 7 days.
- Provide a repeatable restoration process for production incidents.

## 2) Preconditions
- Railway project access with permissions on the Postgres service.
- Confirmation of target environment (`production` by default).
- Maintenance window validated when restoring production data.

## 3) Backup retention checklist (Railway dashboard)
1. Open Railway project `Teamblender`.
2. Open Postgres service.
3. Open `Backups` tab.
4. Verify automatic backups are enabled.
5. Verify retention is at least 7 days.
6. Record latest successful backup timestamp in incident log.

## 4) Recovery decision guide
- Use point-in-time restore when recent writes are corrupted.
- Use full backup restore when schema/data is broadly compromised.
- Always estimate data-loss window between selected backup and current time.

## 5) Restore procedure
1. Freeze write operations (maintenance mode or write-lock at app level).
2. In Railway Postgres `Backups`, select the target backup snapshot.
3. Trigger restore to the production database service.
4. Wait for restore completion and service healthy status.
5. Re-run backend checks:

```bash
cd backend
npm run check:env:prod
npm run monitor:health
npm run smoke:postdeploy:api
```

6. Validate key business paths (auth, sessions, challenges).
7. Re-open writes and monitor 30 minutes minimum.

## 6) Post-restore validation
- `GET /api/health` returns `{ "status": "ok", "db": "ok" }`.
- No spike in 5xx in monitor reports.
- Latest user/session/challenge data integrity spot-check passes.

## 7) Rollback of failed restore
- If restore result is invalid, re-run restore with previous known-good backup.
- Keep application in maintenance mode until checks pass.
- Document timeline, selected backups, and final recovery point.

## 8) Evidence to store after each drill/incident
- Backup ID used for restore.
- Start/end timestamps.
- API health and smoke-check outputs.
- Data-loss window acknowledged by stakeholders.
