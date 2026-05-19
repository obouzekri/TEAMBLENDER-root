# TeamBlender - Matrice officielle des variables par environnement

Derniere mise a jour: 2026-05-10

Objectif: centraliser les variables critiques backend, frontend et CI pour dev / preview / production.

## 1) Backend API (Railway)

| Variable | Criticite | Dev | Preview | Production | Notes |
|---|---|---|---|---|---|
| NODE_ENV | Haute | A definir (`development`) | A definir (`production`) | `production` | Mode runtime Node.js |
| PORT | Haute | Railway auto | Railway auto | Railway auto | Port injecte par plateforme |
| DATABASE_URL | Haute | A definir | A definir | Configure | Connexion DB principale |
| DATABASE_PUBLIC_URL | Haute | A definir | A definir | Configure | Fallback local/scripts si host interne Railway |
| JWT_SECRET | Haute | A definir | A definir | Configure | Requis pour auth JWT |
| DB_NAME | Moyenne | Optionnel | Optionnel | Optionnel | Utilise surtout en local si pas DATABASE_URL |
| DB_USER | Moyenne | Optionnel | Optionnel | Optionnel | Utilise surtout en local si pas DATABASE_URL |
| DB_PASSWORD | Haute | Optionnel | Optionnel | Optionnel | Utilise surtout en local si pas DATABASE_URL |
| DB_HOST | Moyenne | Optionnel | Optionnel | Optionnel | Utilise surtout en local si pas DATABASE_URL |
| DB_PORT | Moyenne | Optionnel | Optionnel | Optionnel | Utilise surtout en local si pas DATABASE_URL |
| DB_SSL | Moyenne | Optionnel | Optionnel | Optionnel | SSL DB (`true`/`false`) |
| DEBUG_SQL | Basse | Optionnel | Optionnel | Optionnel | Traces SQL debug |
| ADMIN_RESET_PASSWORD | Moyenne | Optionnel | Optionnel | Optionnel | Utilise par scripts admin |

## 2) Frontend Next.js (Vercel)

| Variable | Criticite | Dev | Preview | Production | Notes |
|---|---|---|---|---|---|
| NEXT_PUBLIC_API_BASE | Haute | `http://localhost:3000/api` | A definir (URL backend preview) | A configurer avec URL backend prod | Variable front critique |
| NEXT_PUBLIC_LEGACY_BASE | Moyenne | `http://localhost:3000` | Optionnel | Optionnel | Compatibilite archive legacy uniquement |
| LEGACY_BASE_CANDIDATES | Basse | Optionnel | Optionnel | Optionnel | Fallbacks legacy (liste), archive uniquement |
| NEXT_PUBLIC_ENABLE_LEGACY_LINKS | Moyenne | `false` par defaut | `false` par defaut | `false` par defaut | Doit etre active explicitement a `true` pour exposer les liens legacy |

## 3) CI/CD GitHub Actions (backend)

| Type | Nom | Criticite | Etat actuel |
|---|---|---|---|
| Variable | CATALOG_API_BASE | Haute | A finaliser dans GitHub Actions |
| Variable | CATALOG_ADMIN_EMAIL | Haute | A finaliser dans GitHub Actions |
| Secret | CATALOG_ADMIN_PASSWORD | Haute | A finaliser dans GitHub Actions |

Utilise par:
- catalog-release-gate
- railway-5xx-monitor
- weekly-reliability-review

## 4) Variables de scripts smoke/audit (operationnel)

| Variable | Usage | Obligation |
|---|---|---|
| CATALOG_AUDIT_ENVIRONMENTS_FILE | Cibles audit multi-env | Recommandee |
| CATALOG_AUDIT_ENVIRONMENTS_JSON | Cibles audit inline JSON | Optionnelle |
| CATALOG_AUDIT_REPORT_PATH | Chemin rapport audit | Optionnelle |
| CATALOG_API_BASE | Base API pour scripts backend | Recommandee |
| CATALOG_ADMIN_EMAIL | Login admin scripts backend | Recommandee |
| CATALOG_ADMIN_PASSWORD | Password admin scripts backend | Recommandee |
| CATALOG_ADMIN_EMAIL_PRODUCTION / PREVIEW / DEV | Login dedie par env | Optionnelle |
| CATALOG_ADMIN_PASSWORD_PRODUCTION / PREVIEW / DEV | Password dedie par env | Optionnelle |
| SMOKE_API_BASE | Smoke API backend | Optionnelle |
| SMOKE_ADMIN_EMAIL | Smoke API backend | Optionnelle |
| SMOKE_ADMIN_PASSWORD | Smoke API backend | Optionnelle |
| MONITOR_API_BASE | Monitor 5xx | Optionnelle |
| MONITOR_ADMIN_EMAIL | Monitor 5xx | Optionnelle |
| MONITOR_ADMIN_PASSWORD | Monitor 5xx | Optionnelle |
| MONITOR_ALLOW_INSECURE_TLS | Monitor 5xx | Optionnelle |
| SMOKE_FRONTEND_URL | Smoke frontend Next | Optionnelle |
| SMOKE_BACKEND_URL | Smoke frontend Next | Optionnelle |
| SMOKE_MANAGER_EMAIL | Smoke frontend Next | Optionnelle |
| SMOKE_MANAGER_PASSWORD | Smoke frontend Next | Optionnelle |
| SMOKE_PARTICIPANT_PASSWORD | Smoke participant | Optionnelle |
| SMOKE_CHALLENGE_ENGINE | Smoke challenge cible | Optionnelle |
| SMOKE_BROWSER_CHANNEL | Canal navigateur smoke | Optionnelle |

## 5) Regle de gouvernance

- Production ne doit jamais avoir de variable critique vide.
- Toute nouvelle variable critique doit etre ajoutee dans ce fichier le meme jour que son introduction code/workflow.
- Toute PR de deploiement doit inclure la verification de cette matrice.
- Le nommage des variables/services doit respecter `NAMING_CONVENTION_RAILWAY_VERCEL.md`.

## 6) Etat de completion

- Matrice officielle creee: OUI
- Valeurs dev/preview Railway completes: NON (environnements non provisionnes)
- Valeurs GitHub Actions completes: PARTIEL (secrets/vars a finaliser)
