# TeamBlender - Railway Backend Runbook (Migrations, Health, Alerts)

Date: 2026-06-05
Scope: Backend Railway (dev, staging, production)

## 1) Objectif
- Garantir un pre-deploy fiable (migrations Sequelize) avant mise en production.
- Isoler strictement les environnements Railway (dev / staging / production).
- Activer des probes health et des alertes exploitables.
- Documenter un rollback rapide en cas d'echec migration.

## 2) Prerequis
- Acces Railway project + service backend + service PostgreSQL.
- Railway CLI installe (`railway --version`).
- Acces repo backend local.
- Compte admin API de test (pour smoke tests post-deploy).

## 3) Separation des environnements Railway
Principe: 1 environnement Railway = 1 jeu de variables, aucune reutilisation de secrets entre dev/staging/prod.

Checklist par environnement:
- Creer/valider les environnements `dev`, `staging`, `production`.
- Verifier que chaque environnement a ses propres valeurs pour:
  - `DATABASE_URL`
  - `DATABASE_PUBLIC_URL` (si utilise)
  - `JWT_SECRET`
  - `SMTP_*`
  - `NEXT_PUBLIC_API_BASE` (si necessaire pour scripts backend)
- Confirmer que `JWT_SECRET` differe entre les 3 environnements.
- Interdire les valeurs placeholder / faibles.

Validation locale (par environnement):
1. Selectionner l'environnement Railway cible.
2. Lancer le check critique env.

Commandes type:
```bash
cd backend
npm run check:env
```

## 4) Validation pre-deploy migrations
Depuis `backend/`:

```bash
# 1) Voir l'etat des migrations
npx sequelize-cli db:migrate:status

# 2) Executer les migrations en attente
npx sequelize-cli db:migrate

# 3) Re-verifier qu'il ne reste rien en pending
npx sequelize-cli db:migrate:status
```

Critere de succes:
- `db:migrate` retourne exit code 0.
- Toutes les migrations sont en statut `up`.

## 5) Idempotence des migrations
Verification heuristique locale disponible:

```bash
cd backend
node -e "const fs=require('fs');const path='migrations';const files=fs.readdirSync(path).filter(f=>f.endsWith('.js')).sort();const risky=[];for(const f of files){const c=fs.readFileSync(path+'/'+f,'utf8');const hasAdd=/\\baddColumn\\b|\\bcreateTable\\b|\\baddConstraint\\b|\\baddIndex\\b/.test(c);const hasRemove=/\\bremoveColumn\\b|\\bdropTable\\b|\\bremoveConstraint\\b|\\bremoveIndex\\b/.test(c);const hasGuard=/describeTable|showAllTables|IF EXISTS|IF NOT EXISTS|try\\s*\\{[\\s\\S]{0,180}?(describeTable|showAllTables)/.test(c);if((hasAdd||hasRemove)&&!hasGuard)risky.push(f);}console.log(JSON.stringify({total:files.length,riskyCount:risky.length,risky},null,2));"
```

Critere de succes:
- `riskyCount = 0`.

## 6) Health checks Railway
Endpoint cible:
- `GET /api/health`

Contrat attendu:
- HTTP 200 si DB OK
- Payload: `{ "status": "ok", "db": "ok" }`
- HTTP 503 si DB KO

Configuration recommandee Railway:
- Path: `/api/health`
- Timeout: 10s
- Interval: 30s
- Failure threshold: 3

Validation:
```bash
cd backend
npm run monitor:health
```

## 7) Alertes Railway et applicatives
Alertes minimales a activer (par environnement):
- Downtime / service unreachable.
- Taux erreurs HTTP 5xx eleve.
- Depassement memoire service.

En plus cote applicatif:
```bash
cd backend
npm run monitor:api:5xx
npm run monitor:health
```

Recommendation:
- Rattacher les alertes a un canal unique (email equipe + webhook incident).
- Definir un owner d'astreinte par environnement.

## 8) Rollback migration (procedure)
Quand rollbacker:
- Migration KO en pre-deploy.
- Regression fonctionnelle critique post-deploy.

Procedure:
1. Geler les nouveaux deploiements.
2. Identifier la derniere migration appliquee (`db:migrate:status`).
3. Revenir d'un cran:

```bash
cd backend
npx sequelize-cli db:migrate:undo
```

4. Si necessaire, revenir de plusieurs migrations:

```bash
cd backend
npx sequelize-cli db:migrate:undo:all --to <migration_file.js>
```

5. Reexecuter smoke tests:

```bash
cd backend
npm run smoke:postdeploy:api
npm run monitor:health
```

6. Documenter RCA + corrective action avant nouveau deploy.

## 9) Go/No-Go rapide
Go si:
- Check env OK.
- Migrations `up` sans erreur.
- Health `/api/health` stable.
- Alertes actives sur downtime/5xx/memoire.

No-Go si:
- Migrations en echec ou pending inattendu.
- Health instable.
- Alerting non configure.
