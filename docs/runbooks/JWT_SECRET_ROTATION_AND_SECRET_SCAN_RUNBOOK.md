# JWT Secret Rotation and Secret Scan Runbook

## Purpose

This runbook covers two security controls:

- planned rotation of `JWT_SECRET`
- pre-commit secret scanning with `gitleaks`

## 1. JWT Secret Rotation

### Frequency

Rotate `JWT_SECRET` every 90 days, or immediately if a leak is suspected.

### Preparation

1. Generate a new secret with:

   ```bash
   openssl rand -base64 48
   ```

2. Verify the new value is not a placeholder and is at least 48 bytes long.
3. Schedule a short maintenance window.

### Deployment order

1. Update the secret in Railway dev and production.
2. Redeploy the backend so all instances use the new value.
3. Ask users to reconnect if they were authenticated before the rotation.

### Validation

1. Call `/api/health` or a known authenticated endpoint.
2. Test a fresh login.
3. Confirm old sessions are rejected after rotation if token revocation is active.

## 2. Pre-commit Secret Scan

### Hook behavior

The repository uses a managed git hooks path at `.githooks/`.
The pre-commit hook runs:

```bash
gitleaks detect --source . --no-banner --redact --exit-code 1
```

### One-time local setup

Run from the repository root:

```bash
npm run security:hooks:setup
```

### Expected outcome

- Commits fail when `gitleaks` finds a secret.
- The scan runs before the commit is created.

### Troubleshooting

- If `gitleaks` is missing, install it before committing.
- If the hook is not triggered, rerun `npm run security:hooks:setup`.
