# TeamBlender - Creer un nouveau challenge (frontend-next + backend)

Derniere mise a jour: 2026-05-23
Statut: active

Objectif: fournir un flux MVP unique pour ajouter un challenge sans dependre du frontend legacy archive.

## 1) Regles de base

- Cible UI: `frontend-next/`
- Cible backend: `backend/`
- Le catalogue officiel reste la table `Challenges` en base.
- Un engine en fichier sert a l'execution, pas a la publication catalogue.

## 2) Nommage recommande

- `engine_key`: snake_case versionne (ex: `nouveau_challenge_v1`)
- `name`: libelle metier clair
- `engine_config`: JSON compact et stable

## 3) Backend - moteur runtime

Creer un moteur sous:

- `backend/src/challenges/engines/<engine_key>/index.js`

Exemple minimal:

```js
module.exports = {
  key: "nouveau_challenge_v1",
  version: 1,
  buildRuntimeConfig({ challenge }) {
    const defaults = { timeLimitSeconds: 300 };
    return {
      ...defaults,
      ...(challenge.engine_config || {}),
    };
  },
};
```

Notes:

- Le moteur doit rester tolerant aux configs manquantes.
- Eviter tout couplage dur a une session specifique.

## 4) Frontend Next - rendu challenge

Le rendu challenge passe par la route dynamique:

- `/challenges/[engineKey]`

Approche recommandee:

- Ajouter le composant/renderer du challenge dans `frontend-next/components/` (ou sous dossier challenges existant).
- Brancher le rendu selon `engineKey` dans le flux de la route challenge.
- Garder la structure commune (header, chrono, chat, etats de chargement/erreur) alignée avec les autres challenges.

## 5) Publication catalogue (DB)

Le challenge doit etre present en DB pour apparaitre dans le builder.

Champs minimaux a renseigner:

- `name`
- `category`
- `type`
- `source`
- `engine_key`
- `engine_config`
- `status=active`

Verification:

- `cd backend && npm run catalog:check`
- Option API: `cd backend && npm run catalog:check:api`

## 6) Liaison a une session

- Creer/editer une session via le builder.
- Ajouter le challenge a la session.
- Lancer la session et verifier que `active_challenge_id` bascule correctement.

## 7) QA minimale avant merge

Backend:

- `cd backend && npm test`

Frontend:

- `cd frontend-next && npm run build`
- `cd frontend-next && npm run test:smoke:session-builder`

Si impact runtime challenge:

- `cd frontend-next && npm run test:smoke`

## 8) Definition of done

Un nouveau challenge est considere pret si:

1. Le moteur backend charge sans erreur.
2. Le rendu frontend-next fonctionne via `/challenges/[engineKey]`.
3. Le challenge est visible dans le catalogue (DB).
4. Le challenge est ajoutable a une session et jouable.
5. Les checks build/smoke cibles sont verts.

## 9) Documents relies

- Workflow livraison: `docs/process/FEATURE_TO_PROD_FLOW.md`
- Checklist release: `docs/checklists/RELEASE_CHECKLIST_PRE_MAIN.md`
- Backend README: `backend/README.md`
- Frontend README: `frontend-next/README.md`
- Audit docs: `docs/history/DOCS_AUDIT_2026-05-23.md`
