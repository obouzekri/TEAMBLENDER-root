# TeamBlender - GitHub release gate setup

Objectif: rendre le gate de release et les workflows CI utilisables en production sur GitHub Actions.

## Secrets GitHub requis

- `CATALOG_ADMIN_PASSWORD`
- `NEXT_PUBLIC_API_BASE` si vous utilisez une variable de repository ou d'environnement pour le frontend-next

## Variables GitHub recommandees

- `CATALOG_API_BASE` = `https://TeamBlender-backend-qxe5-production.up.railway.app/api`
- `CATALOG_ADMIN_EMAIL` = `admin@admin.com`
- `NEXT_PUBLIC_API_BASE` = `https://TeamBlender-backend-qxe5-preview.up.railway.app/api` pour les PR preview, puis valeur production au moment du go-live

## Actions a faire dans GitHub

1. Ouvrir chaque repository: backend, frontend-next.
2. Aller dans `Settings > Secrets and variables > Actions`.
3. Ajouter les secrets ci-dessus.
4. Ajouter les variables ci-dessus.
5. Verifier que les workflows `CI`, `Catalog Release Gate`, `Railway 5xx Monitor` et `Weekly Reliability Review` disposent des valeurs attendues.

## Critere d'acceptation

- Les workflows s'executent sans valeur manquante.
- Le catalog gate voit un catalogue non vide.
- Les rapports et smokes peuvent etre relances sans modifier le code.
