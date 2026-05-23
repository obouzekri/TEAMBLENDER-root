# TeamBlender - Audit documentation (2026-05-23)

Objectif: identifier les documents inutiles/depasses pour l'operationnel MVP actuel et clarifier les references actives.

## Decision rapide

### Deprecies (ne plus utiliser en reference active)

1. `docs/process/WORKFLOW_OPERATIONNEL_FUTUR.md`
- Raison: redondant avec le flow unique deja defini et applique.
- Remplacement: `docs/process/FEATURE_TO_PROD_FLOW.md` + regles process associees.

2. `docs/product/readme_creer_nouveau_challenge.md`
- Raison: orientee majoritairement `archive/frontend/...`, potentiellement trompeuse pour les nouvelles features.
- Remplacement: implementation dans `frontend-next/` + backend engines.

3. `docs/product/SALLE_SECRETE_DOCS.md`
- Raison: profonde dependance aux chemins legacy archives et statut produit potentiellement stale.
- Remplacement: references techniques actuelles dans `frontend-next/` et docs process/config.

## Execution appliquee (2026-05-23)

- Les 3 documents deprecies ont ete deplaces sous `docs/history/deprecated-docs/`.
- Des fichiers pointeurs ont ete recrees aux emplacements d'origine pour eviter les liens casses.
- Un nouveau guide actif a ete ajoute: `docs/product/CREATE_CHALLENGE_FRONTEND_NEXT.md`.

## A conserver (historique utile, non operationnel)

- Tout le dossier `docs/history/`: utile comme trace et postmortem, mais non source de verite execution.

## A surveiller / revalider prochainement

1. `docs/architecture/SESSION_CHALLENGE_FLOW.md`
- Contient "Status: Defined (not yet implemented)"; verifier coherence avec l'etat runtime actuel.

2. `docs/architecture/SESSION_STATE_DESIGN.md`
- Contient des formulations "In progress" et references legacy; revalider apres stabilisation session live.

3. `docs/testing/TEST_PLAN_SESSION_SYNC.md`
- Toujours utile pour QA, mais benchmarks (<500ms) a revalider selon strategie realtime/fallback actuelle.

## Regle de gouvernance proposee

- Tout nouveau document produit/process doit indiquer:
  - "Derniere mise a jour"
  - "Statut" (`active`, `draft`, `deprecated`, `archived`)
  - "Source de verite" quand le document n'est pas principal

Cette regle evite les docs contradictoires et les references legacy involontaires.
