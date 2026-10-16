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
| POSTHOG_API_HOST | Moyenne | `https://eu.posthog.com` | Region projet | Region projet | Hote API de lecture, distinct de l'hote d'ingestion |
| POSTHOG_PROJECT_ID | Moyenne | Optionnel | Optionnel | Recommande | Projet consulte par les analytics admin |
| POSTHOG_PERSONAL_API_KEY | Haute | Optionnel | Optionnel | Recommande | Secret backend uniquement, cle personnelle avec acces au projet et aux requetes ; jamais un jeton public |

### Depannage des analytics admin PostHog

- Une configuration presente ne garantit pas une connexion reussie. En cas d'echec de la requete principale, le panneau indique une indisponibilite et ne presente pas les valeurs de repli comme des mesures reelles.
- `POSTHOG_AUTHENTICATION_FAILED` (HTTP 401) : remplacer `POSTHOG_PERSONAL_API_KEY` par une cle personnelle valide dans l'environnement du backend, puis redemarrer le backend. Ne jamais copier cette cle dans une variable `NEXT_PUBLIC_*`, dans le code ou dans une conversation.
- `POSTHOG_ACCESS_DENIED` (HTTP 403) : verifier l'acces au projet `POSTHOG_PROJECT_ID` et les permissions de requete de la cle.
- Verifier que `POSTHOG_API_HOST` correspond a la region du compte : `https://eu.posthog.com` ou `https://us.posthog.com`.
- La cle de capture publique et la cle personnelle de lecture sont distinctes ; cet echec de lecture ne prouve pas un echec de capture.
- `Query has hit the max execution time` : l'authentification n'est plus le blocage ; verifier la requete analytics. L'overview utilise une seule lecture bornee des evenements avec des agregations conditionnelles, au lieu de sous-requetes repetant la lecture pour chaque indicateur. Les noms d'evenements, unites et fenetres de 7 a 180 jours restent inchanges. Une reduction de fenetre peut aider au diagnostic, sans remplacer la correction de requete.

Reference : [Cles API personnelles PostHog](https://posthog.com/docs/api/personal-api-keys).

## 2) Frontend Next.js (Vercel)

| Variable | Criticite | Dev | Preview | Production | Notes |
|---|---|---|---|---|---|
| NEXT_PUBLIC_API_BASE | Haute | `http://localhost:3000/api` | A definir (URL backend preview) | A configurer avec URL backend prod | Variable front critique |
| NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN | Moyenne | Optionnel | Optionnel | Recommande | Active la capture PostHog navigateur |
| NEXT_PUBLIC_POSTHOG_HOST | Moyenne | `https://eu.i.posthog.com` (ou region projet) | Region projet | Region projet | Doit correspondre a la region PostHog (EU/US) pour aligner `/ingest` |

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
