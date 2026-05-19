# TeamBlender - Variables critiques bloquantes

Derniere mise a jour: 2026-05-10

Objectif: lister les variables dont l'absence ou la mauvaise valeur bloque la mise en production.

## Variables bloquantes (MVP)

| Variable | Cote | Pourquoi c'est bloquant | Symptomes si invalide/absente | Verification minimale |
|---|---|---|---|---|
| JWT_SECRET | Backend (Railway) | Signature/verification JWT (auth manager/admin/participant) | Echecs login, tokens invalides, routes protegees inaccessibles | Login API + acces endpoint protege |
| DATABASE_URL | Backend (Railway) | Connexion principale PostgreSQL en runtime backend | Boot KO, erreurs DB, sessions/challenges indisponibles | Demarrage backend + requete DB via endpoint API |
| NEXT_PUBLIC_API_BASE | Frontend (Vercel) | Pointe le frontend-next vers l'API active | Login KO, donnees absentes, erreurs fetch/cors | Login manager sur frontend + navigation home/session-builder |
| ADMIN_RESET_PASSWORD | Operations backend | Rotation/reparation compte admin via script d'urgence | Impossible de reset admin si compte bloque | Execution script admin de reset sur environnement cible |

## Regle d'application

- Si une seule variable bloquante est absente ou invalide en production, release/merge deploiement refuse.
- Toute modification de ces variables doit inclure un plan rollback et une verification post-changement.

## Checklist de verification rapide

1. Verifier presence des 4 variables sur l'environnement cible.
2. Verifier format/valeur attendue (notamment URL API sans slash final pour `NEXT_PUBLIC_API_BASE`).
3. Executer les smokes critiques (auth + endpoints principaux).
4. Documenter resultat dans la PR (preuve + horodatage).

## References

- Matrice complete: `ENVIRONMENT_VARIABLES_MATRIX.md`
- Checklist release: `RELEASE_CHECKLIST_PRE_MAIN.md`
- Standard commit deploiement/env: `COMMIT_MESSAGE_DEPLOY_ENV_STANDARD.md`
