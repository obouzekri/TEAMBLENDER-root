# TeamBlender - Monorepo

Plateforme professionnelle de team-building pour managers et RH.

> Statut: MVP en preparation
> Objectif de lancement: fin juin / debut juillet 2026

## Quick links

- Documentation centrale: `docs/README.md`
- Backend API: `backend/README.md`
- Frontend Next: `frontend-next/README.md`
- Roadmap active: `todo.md`
- Taches terminees: `docs/done.md`

## 1) Vue d'ensemble

Ce repository central regroupe:
- backend API (auth, sessions, challenges, participants),
- frontend legacy archive (acces explicite uniquement),
- frontend-next (cible produit),
- documentation operationnelle et produit.

## 2) Promesse de valeur

TEAMSPARK renforce la cohesion d'equipe sans logistique lourde.

Valeur livree pour managers et RH:
- Animer des sessions efficaces en moins d'une heure, du lancement au debrief.
- Obtenir des insights concrets sur la dynamique d'equipe, directement exploitables.

Gains cles:
- 0 preparation tech.
- Experience structuree et guidee.
- Resultats RH exploitables.

## 3) KPIs produit (suivi MVP)

Indicateurs cibles pour piloter la valeur delivree:

| KPI | Cible |
|---|---|
| Taux de sessions lancees apres creation | > 70 % |
| Duree moyenne de session | 20 – 40 min |
| Engagement participants (% actifs sur la session) | > 80 % |
| Challenges joues par session | >= 3 |
| Taux de reutilisation manager (sessions > 1) | > 40 % |

## 4) Regle de migration frontend

- `archive/frontend/` = legacy archive (frozen, acces explicite uniquement).
- `frontend-next/` = cible produit pour toutes les nouvelles evolutions.
- Toute nouvelle fonctionnalite demarre dans `frontend-next/`.
- Si un endpoint manque: implementation backend d'abord, puis integration frontend-next.

## 4) Structure des README (consolidee)

| README | Role |
|---|---|
| `README.md` | Point d'entree global (ce fichier) |
| `docs/README.md` | Index de la documentation process/runbooks/config |
| `backend/README.md` | Guide backend (setup, commandes, architecture API) |
| `frontend-next/README.md` | Guide frontend-next (setup, scripts, runbook go-live) |
| `backend/scripts/legacy-experience/README.md` | Archive scripts legacy `Experience` |
| `archive/frontend/src/core/slices/README.md` | Documentation technique locale du store legacy archive |

### Convention de nommage

- Chaque README indique son scope dans son titre (`TEAMSPARK - <Scope>`).
- Les README de reference globale restent nommes `README.md` dans leur dossier.
- Les guides specifiques non index restent dans un fichier explicite (ex: `readme_creer_nouveau_challenge.md`).

### Documents source (DOCX)

- Les documents bureautiques temporaires ne restent pas a la racine.
- Sources historiques: `docs/history/source-docs/`
- Sources produit: `docs/product/`

## 5) Demarrage rapide local

### Backend

```bash
cd backend
npm install
npm start
```

- API locale: `http://localhost:3000/api`
- Healthcheck: `http://localhost:3000/health`
- Test rapide API: `http://localhost:3000/api/test`

### Frontend Next

```bash
cd frontend-next
npm install
npm run dev
```

- App locale: `http://localhost:3100`

## 6) Commandes operationnelles utiles

### Backend

```bash
cd backend
npm run check:env
npm run catalog:check
npm run catalog:backfill:dry
npm run smoke:postdeploy:api
```

### Frontend Next

```bash
cd frontend-next
npm run build
npm run test:smoke
npm run test:smoke:preview
```

## 7) Gouvernance livraison

References principales:
- Workflow livraison: `docs/process/FEATURE_TO_PROD_FLOW.md`
- Gate merge: `docs/process/MERGE_GATE_RULE.md`
- Preview obligatoire: `docs/process/PR_PREVIEW_VALIDATION_RULE.md`
- Smoke preview obligatoire: `docs/process/PREVIEW_SMOKE_PASS_RULE.md`
- Logs Railway obligatoires (modifs backend critiques): `docs/process/PR_RAILWAY_LOGS_VALIDATION_RULE.md`
- Checklist release: `docs/checklists/RELEASE_CHECKLIST_PRE_MAIN.md`
- Procedure rollback: `docs/runbooks/ROLLBACK_FRONTEND_BACKEND_RUNBOOK.md`

## 8) Source de verite challenge catalog

- Source officielle: table `Challenges` en base.
- Les registres fichiers d'engines servent a l'execution, pas a la publication catalogue.
- Un engine code n'est visible dans le builder que s'il est present en DB.

## 9) Liens internes

- Documentation centralisee: `docs/README.md`
- Roadmap active: `todo.md`
- Historique des taches terminees: `docs/done.md`
