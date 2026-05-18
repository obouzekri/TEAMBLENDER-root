# Backend Release 2026-05-18

## Scope
- Repository: TEAMBLENDER-backend
- Branch delivered: main
- Release tag: release-2026-05-18-backend
- Previous backend release tag: release-2026-05-09-backend

## Key Delivered Items
- Brevo SMTP integration with dedicated service and route/controller wiring.
- SMTP test script for transaction validation (`npm run smtp:test`).
- Brevo domain authentication monitor with strict/balanced modes (`npm run monitor:brevo:domain`).
- Structured email send logging and failure mapping for operational diagnosis.
- Unit tests for email service behavior and error handling.
- Session resilience and realtime hardening updates merged with the same release train.

## Validation Snapshot (post-merge)
- `npm run check:env`: FAIL locally (missing `JWT_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_API_BASE`, `ADMIN_RESET_PASSWORD`).
- `npm run smtp:test -- --to admin@teamblender.io`: PASS (`accepted=1`, SMTP `250 queued`).
- `npm run monitor:brevo:domain`: PASS in this network with insecure TLS toggle enabled.
- Domain status: Authenticated confirmed via Brevo API checks.

## Operational Notes
- In network environments with TLS interception/proxy, enable:
  - `BREVO_MONITOR_ALLOW_INSECURE_TLS=true`
- Keep this as an environment-specific workaround and avoid it in standard production runners.

## Commits Since Previous Release Tag
- Total non-merge commits in range: release-2026-05-09-backend..main
- Includes: email integration, challenge/runtime stability, diagnostics, QA smoke coverage, and deployment hardening.
