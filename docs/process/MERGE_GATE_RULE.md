# TeamBlender - Gate de merge

Derniere mise a jour: 2026-05-10

Objectif: interdire le merge sans revue minimale et sans checklist process complete.

## Regle obligatoire

- Minimum 1 reviewer humain approuve avant merge.
- Checklist PR complete dans `.github/pull_request_template.md`.
- En cas de point bloqueur non valide: merge refuse.

## Mise en oeuvre

- Regle process appliquee dans le template PR (section Merge Gate).
- Configuration GitHub recommandee (hors repository):
  - branch protection sur `main`
  - minimum 1 approving review
  - interdiction du merge si checks requis en echec

## Evidence PR

- Reviewer d'approbation visible
- Checklist completee et verifiee
