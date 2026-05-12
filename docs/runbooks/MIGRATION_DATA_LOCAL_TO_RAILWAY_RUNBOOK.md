# TEAMSPARK - Runbook migration data local -> Railway

Date: 2026-05-10  
Scope: migration des donnees applicatives local vers Railway (backend + Postgres)

## 1) Objectif
- Migrer les donnees essentielles local vers Railway sans interruption critique.
- Valider que l'API prod retourne les donnees attendues (Users, Sessions, Challenges).

## 2) Prerequis
- Acces admin Railway (service backend + service Postgres).
- Acces admin API (email/password) pour verification post-migration.
- Backup local disponible avant export.
- Fenetre de migration validee (faible trafic idealement).

## 3) Perimetre minimal a migrer
- `Users` (comptes operationnels)
- `Sessions` (sessions actives/historiques utiles)
- `Challenges` (catalogue officiel)
- Tables de jonction liees aux sessions/challenges si necessaire runtime

## 4) Strategie conseillee
1. Freeze ecriture temporaire locale (pas de nouvelles creations pendant export).
2. Export local des tables cibles.
3. Import dans Railway (staging/preview si possible, puis production).
4. Verification API et smoke tests.
5. Reouverture du flux d'ecriture.

## 5) Verification obligatoire post-import
- Auth admin API OK.
- `GET /api/challenges` non vide et coherent.
- `GET /api/sessions` repond correctement.
- `GET /api/users` repond pour role admin.
- Session-builder affiche le catalogue.

## 6) Commandes utiles (operation)
- Audit environnement via API: `cd backend && npm run catalog:audit:env`
- Check catalogue API non vide: `cd backend && npm run catalog:check:api`
- Smoke session-builder catalogue: `cd frontend-next && npm run test:smoke:session-builder`

## 7) Critere Go/No-Go
Go si:
- Audit env OK sur cible Railway.
- Catalogue API non vide.
- Smoke session-builder OK.

No-Go si:
- Ecart de comptage critique Users/Sessions/Challenges.
- Catalogue vide ou inaccessible.
- Erreurs auth/API bloquees.

## 8) Rollback
- Restaurer la sauvegarde Railway precedente (ou reimport snapshot sain).
- Revalider auth + endpoints clefs.
- Ouvrir incident avec cause racine et action corrective.
