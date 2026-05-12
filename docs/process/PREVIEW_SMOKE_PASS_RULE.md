# TEAMSPARK - Regle passe smoke test preview

Derniere mise a jour: 2026-05-10

Objectif: imposer une passe smoke preview avant merge pour couvrir login, home, session builder et route API test.

## Regle obligatoire

- Toute PR impactant frontend-next, auth, sessions, challenges ou API consommee par le frontend doit executer la passe smoke preview.
- Sans passe smoke preview complete: merge refuse.

## Commandes officielles

Depuis `frontend-next/`:

```powershell
$env:SMOKE_FRONTEND_URL = "https://<preview-vercel-url>"
npm run test:smoke:preview
```

Depuis `backend/`:

```powershell
$env:SMOKE_API_BASE = "https://<preview-backend-url>/api"
$env:SMOKE_ADMIN_EMAIL = "<admin-email>"
$env:SMOKE_ADMIN_PASSWORD = "<admin-password>"
npm run smoke:preview:api
```

## Couverture attendue

- Login manager: PASS
- Home manager accessible apres login: PASS
- Session builder (catalogue visible): PASS
- Route API test (`/api/test`) + preflight login + login API: PASS

## Preuves minimales PR

- URL preview testee
- Sortie des commandes smoke (resume)
- Captures ecran des parcours critiques
- Risques identifies + plan rollback
