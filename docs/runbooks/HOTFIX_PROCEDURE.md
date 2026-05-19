# TeamBlender - Procedure hotfix

Derniere mise a jour: 2026-05-10

Objectif: corriger rapidement un incident critique en production tout en gardant un minimum de qualite et de tracabilite.

## Quand declencher un hotfix

- Incident P0/P1 en production (auth KO, sessions KO, 5xx critiques, indisponibilite frontend/backend).

## Etapes obligatoires

1. Creer une branche `hotfix/<YYYYMMDD>-<short-label>` depuis `main`.
2. Appliquer le correctif minimal (pas de refactor hors incident).
3. Utiliser un commit conforme au standard deploiement/env.
4. Ouvrir une PR `hotfix/* -> main` avec priorite haute.
5. Executer validation minimale:
   - `cd backend && npm run check:env:prod`
   - `cd backend && npm run smoke:postdeploy:api`
   - `cd frontend-next && npm run test:smoke:login`
6. Verifier logs Railway post-deploiement (minimum 15 min).
7. Merge apres au moins 1 approbation reviewer.
8. Communiquer cloture + impact + actions suivantes.

## Communication minimale

- Debut incident: symptome, impact, owner.
- Pendant hotfix: avancement, ETA, risques.
- Fin incident: root cause, correctif applique, verification, actions preventives.

## Post-hotfix

- Ajouter un resume dans la revue hebdo fiabilite.
- Ouvrir ticket de fond si dette technique identifiee.
