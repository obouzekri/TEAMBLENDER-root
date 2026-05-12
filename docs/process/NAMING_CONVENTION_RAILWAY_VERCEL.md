# TEAMSPARK - Convention de nommage Railway / Vercel

Derniere mise a jour: 2026-05-10

Objectif: standardiser le nommage des services, projets et variables pour eviter les erreurs de configuration entre dev, preview et production.

## 1) Environnements (noms officiels)

- `dev`
- `preview`
- `production`

Regle: ces libelles sont les seules valeurs autorisees dans les docs, scripts et checks.

## 2) Convention de nommage des variables

### 2.1 Format general

- UPPER_SNAKE_CASE uniquement.
- Prefixe metier obligatoire quand applicable (`CATALOG_`, `SMOKE_`, `MONITOR_`, `NEXT_PUBLIC_`).
- Suffixe environnement seulement pour les credentials dedies multi-env (`_DEV`, `_PREVIEW`, `_PRODUCTION`).

Exemples valides:

- `JWT_SECRET`
- `DATABASE_URL`
- `NEXT_PUBLIC_API_BASE`
- `CATALOG_ADMIN_PASSWORD_PREVIEW`

Exemples interdits:

- `jwtSecret`
- `database-url`
- `Next_Public_Api_Base`
- `CATALOG_ADMIN_PASSWORD_preview`

### 2.2 Regle frontend public

- Toute variable exposee au navigateur doit commencer par `NEXT_PUBLIC_`.
- Aucune variable sensible ne doit utiliser `NEXT_PUBLIC_`.

## 3) Convention de nommage des services Railway

Format recommande:

- backend API: `teamspark-backend-<env>`
- database: `teamspark-db-<env>`

Exemples:

- `teamspark-backend-production`
- `teamspark-backend-preview`
- `teamspark-backend-dev`
- `teamspark-db-production`

## 4) Convention de nommage des projets Vercel

Format recommande:

- frontend next: `teamspark-frontend-next-<env>`

Exemples:

- `teamspark-frontend-next-production`
- `teamspark-frontend-next-preview`
- `teamspark-frontend-next-dev`

## 5) Convention GitHub Actions (vars/secrets)

- Noms globaux repository: UPPER_SNAKE_CASE sans suffixe quand la valeur est unique.
- Si separation par environnement necessaire: suffixer `_DEV`, `_PREVIEW`, `_PRODUCTION`.

Exemples:

- `CATALOG_API_BASE`
- `CATALOG_ADMIN_EMAIL`
- `CATALOG_ADMIN_PASSWORD`
- `CATALOG_API_BASE_PREVIEW`

## 6) Regles d'application

- Toute nouvelle variable/service doit respecter cette convention avant merge.
- Toute PR de deploiement/env doit indiquer les noms introduits/modifies.
- Si un nom ne respecte pas la convention: correction obligatoire avant release.

## 7) References

- Matrice variables: `ENVIRONMENT_VARIABLES_MATRIX.md`
- Variables bloquantes: `CRITICAL_BLOCKING_VARIABLES.md`
- Check automatique variables critiques: `backend/scripts/check_env_critical.js`
