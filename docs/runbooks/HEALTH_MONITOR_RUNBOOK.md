# TeamBlender - Runbook monitor sante

Derniere mise a jour: 2026-05-22

Objectif: verifier rapidement que le backend expose bien les endpoints critiques et que la base repond via le healthcheck applicatif.

## Quand l'utiliser

- Apres deploiement backend.
- Apres incident production ou suspicion de degradation Railway.
- En verification periodique simple sans entrer dans les logs applicatifs.

## Ce que verifie le monitor

- `GET /api/direct-test`
- `GET /api/test`
- `GET /api/health`
- `POST /api/auth/login`

Alerting operationnel associe:

- `backend/.github/workflows/railway-health-monitor.yml` pour la degradation/downtime apparente via `/api/health`
- `backend/.github/workflows/railway-5xx-monitor.yml` pour les explosions de 5xx
- `backend/.github/workflows/railway-memory-monitor.yml` pour la pression memoire Railway

Le monitor echoue si:

- un endpoint retourne un statut non OK,
- `/api/health` ne retourne pas `{"status":"ok","db":"ok"}`,
- le login admin ne renvoie pas de token.

## Utilisation locale manuelle

Depuis `backend`:

```bash
npm run monitor:health
```

Variables utiles:

- `MONITOR_HEALTH_API_BASE` - base API cible. Defaut: `https://teamblender.io/api`
- `MONITOR_HEALTH_ADMIN_EMAIL` - email admin de verification
- `MONITOR_HEALTH_ADMIN_PASSWORD` - mot de passe admin de verification
- `MONITOR_HEALTH_ITERATIONS` - nombre de passages consecutifs
- `MONITOR_HEALTH_INTERVAL_MS` - attente entre passages

Exemple PowerShell:

```powershell
$env:MONITOR_HEALTH_API_BASE='https://teamblender.io/api'
$env:MONITOR_HEALTH_ADMIN_EMAIL='admin@admin.com'
$env:MONITOR_HEALTH_ADMIN_PASSWORD='***'
$env:MONITOR_HEALTH_ITERATIONS='3'
$env:MONITOR_HEALTH_INTERVAL_MS='15000'
npm run monitor:health
```

## Contrainte TLS locale

Si Node echoue avec `self-signed certificate in certificate chain` sur un reseau avec proxy/certificat intermediaire, utiliser temporairement:

```powershell
$env:MONITOR_HEALTH_ALLOW_INSECURE_TLS='1'
```

Ne pas conserver ce flag par defaut en production.

## Workflow GitHub Actions

Workflow planifie:

- `backend/.github/workflows/railway-health-monitor.yml`
- `backend/.github/workflows/railway-5xx-monitor.yml`
- `backend/.github/workflows/railway-memory-monitor.yml`

Cadence:

- toutes les 15 minutes
- execution manuelle possible via `workflow_dispatch`

Variables/secrets attendus:

- variable `MONITOR_HEALTH_API_BASE` ou fallback `https://teamblender.io/api`
- variable `MONITOR_HEALTH_ADMIN_EMAIL` ou fallback `CATALOG_ADMIN_EMAIL`
- secret `MONITOR_HEALTH_ADMIN_PASSWORD` ou fallback `CATALOG_ADMIN_PASSWORD`

## Lecture du resultat

- `ok: true` sur chaque iteration: service observe sain
- `ok: false`: verifier immediatement
	- deploiement recent
	- logs Railway
	- reponse `/api/health`
	- login admin et variables critiques

## Action immediate si echec

1. Rejouer `npm run monitor:health` en manuel pour confirmer.
2. Verifier `npm run check:env:prod` si suspicion de variable manquante.
3. Verifier les logs Railway build + runtime.
4. Si impact utilisateur confirme, appliquer la procedure [HOTFIX_PROCEDURE.md](HOTFIX_PROCEDURE.md).