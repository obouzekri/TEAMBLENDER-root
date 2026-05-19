# TeamBlender - Regle PR: preview Vercel obligatoire avant merge

Derniere mise a jour: 2026-05-10

Objectif: interdire le merge d'une PR sans validation fonctionnelle sur preview Vercel.

## Regle obligatoire

- Toute PR impactant frontend-next, API consommee par frontend, auth, sessions ou challenges doit etre validee en preview Vercel avant merge.
- Si preview absente, inaccessible, ou non validee: merge refuse.

## Definition de Done (preview)

- Preview URL partagee dans la PR.
- Build preview vert.
- Parcours manager valide: login -> home -> session-builder.
- Parcours participant valide: join -> challenge actif.
- Aucun blocage critique observe (UI/API).

## Preuves minimales dans la PR

- URL preview Vercel.
- Captures des ecrans critiques testes.
- Liste courte des tests executes.
- Risques restants et plan rollback.

## Implementation dans ce repository

- Template PR racine mis a jour: `.github/pull_request_template.md`.
- Checklist release pre-main a respecter en plus: `RELEASE_CHECKLIST_PRE_MAIN.md`.
