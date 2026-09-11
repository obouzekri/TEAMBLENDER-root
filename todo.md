
- challenge crosswords

- dette rebranding : reste 73 occurrences des couleurs de l'ancienne charte verte codees en dur dans `frontend-next/app/globals.css`
  - valeurs concernees : `rgba(15, 118, 110, α)` (teal) et `rgba(20, 31, 25, α)` / `rgba(18, 50, 37, α)` (ombres vert-gris)
  - pages touchees : landing (`.home-hero`, `.landing-flow`, `.landing-impact-band`, `.proof-grid`, `.hero-*`), pricing, account (`.account-plan-option`), participant (`.participant-form`), session-builder, navigation (`.nav-context`, `.nav-toggle`), `@keyframes navSectionPulse`
  - deja traite : tokens `--field-*`, `--card-shadow*`, `--surface-border`, et le perimetre session-live / session-results / challenge
  - conversion a appliquer (pur changement de teinte, alpha conserve) :
    - `rgba(15, 118, 110, α)` -> `rgba(53, 160, 255, α)`
    - `rgba(20, 31, 25, α)` / `rgba(18, 50, 37, α)` -> `rgba(15, 23, 42, α)`
    - blancs verdatres `#f8fbfa` / `#f5faf7` / `#f7fbfa` / `rgba(244, 251, 248, α)` -> `#f8fbfd` / `#f5f9fd` / `#f7fafd` / `rgba(243, 248, 255, α)`
  - approche recommandee : introduire `--legacy-accent-rgb: 53, 160, 255` et `--legacy-shadow-rgb: 15, 23, 42`, puis migrer page par page avec validation visuelle (ne pas faire de remplacement global a l'aveugle)

