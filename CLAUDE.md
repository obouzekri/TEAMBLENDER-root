# TeamBlender — point d'entrée Claude Code

Ce dépôt est le **hub** de la plateforme TeamBlender : vision produit, roadmap,
process et documentation transverse. Le code vit dans deux dépôts séparés,
clonés **dans** ce dossier (ignorés par `.gitignore`) :

| Dossier          | Dépôt GitHub                          | Rôle                                              | Déploiement |
|------------------|---------------------------------------|---------------------------------------------------|-------------|
| `frontend-next/` | `obouzekri/TEAMBLENDER-frontend-next` | Next.js : landing, manager, builder, live, participant | Vercel  |
| `backend/`       | `obouzekri/TEAMBLENDER-backend`       | Express + Sequelize + PostgreSQL + Socket.io + Redis | Railway |

`obouzekri/TEAMBLENDER-frontend` est l'ancien frontend : ne pas y travailler.

## Au démarrage d'une session

1. Vérifier que `backend/` et `frontend-next/` existent et sont des dépôts git.
2. S'ils manquent :
   - **Session cloud (claude.ai/code)** : attacher `obouzekri/TEAMBLENDER-frontend-next`
     et `obouzekri/TEAMBLENDER-backend` avec l'outil `add_repo`, puis les cloner
     dans `./frontend-next` et `./backend`.
   - **En local** : `npm run workspace:setup`.
3. Lire le `CLAUDE.md` de chaque sous-dépôt avant d'y modifier du code.

## Traiter une demande

L'utilisateur formule ses demandes en français, souvent courtes. Pour chacune :

1. Identifier le ou les dépôts concernés (frontend, backend, docs, ou plusieurs).
2. Si la demande cite une issue (`#12`), la lire avec `gh issue view 12 --repo obouzekri/TEAMBLENDER-root`.
3. Pour une demande large ou floue, proposer un plan court avant de coder.
4. Créer une branche **dans chaque dépôt touché**, avec le même nom :
   `feature/…`, `fix/…`, `chore/…` ou `docs/…`.
5. Lancer les vérifications du sous-dépôt (voir son `CLAUDE.md`).
6. Pousser les branches. Ne jamais pousser directement sur `main`
   (voir `docs/process/FEATURE_TO_PROD_FLOW.md`).
7. Terminer par un résumé en français : ce qui a changé, ce qui a été vérifié,
   ce qui reste à valider sur la preview Vercel ou dans les logs Railway.

Une évolution qui touche l'API modifie le backend et le frontend dans la même
demande : garder les contrats (routes, payloads, événements Socket.io) alignés.

## Repères

- Produit : `README-fonctionnel.md` — Technique : `README-technique.md`
- Process de livraison : `docs/process/` (flow feature → PR → preview → prod)
- Architecture sessions/challenges : `docs/architecture/`
- Charte graphique : `docs/product/CHARTE_GRAPHIQUE_ACTUELLE.md`
- Roadmap : issues GitHub de ce dépôt (label `roadmap`) et `todo.md`
- Stratégie : `go-to-market.md`, `docs/TEAMBLENDER_STRATEGIE_COMMERCIALE_FINANCEMENT.md`
