
# Post MVP

- challenge crosswords

- consentement cookies : suites a traiter (option A "Gerer les cookies" en footer livree le 2026-09-13)
  - expiration du refus : `getStoredConsentState()` (`frontend-next/lib/consent.js`) n'invalide la decision qu'au changement de `CONSENT_POLICY_VERSION` ; ajouter une peremption a 6 mois sur `updatedAt` (recommandation CNIL) pour re-solliciter l'utilisateur
  - revocation effective du tracking : `unloadGtmContainer()` est appele au passage en refus, mais PostHog / GA restent charges en memoire jusqu'au prochain rechargement ; prevoir un reset explicite (`posthog.opt_out_capturing()` + purge des cookies `_ga*`) ou un reload controle
  - option B (transparence) : bloc "Vos choix" en bas de `/confidentialite` avec l'etat courant, la date de decision et l'historique local (`getConsentHistory()`), en complement du lien footer
  - i18n : les textes du bandeau `CookieConsentBanner.js` sont encore en dur en francais, a passer dans les dictionnaires `fr.js` / `en.js`


- dette rebranding : reste 73 occurrences des couleurs de l'ancienne charte verte codees en dur dans `frontend-next/app/globals.css`
  - valeurs concernees : `rgba(15, 118, 110, α)` (teal) et `rgba(20, 31, 25, α)` / `rgba(18, 50, 37, α)` (ombres vert-gris)
  - pages touchees : landing (`.home-hero`, `.landing-flow`, `.landing-impact-band`, `.proof-grid`, `.hero-*`), pricing, account (`.account-plan-option`), participant (`.participant-form`), session-builder, navigation (`.nav-context`, `.nav-toggle`), `@keyframes navSectionPulse`
  - deja traite : tokens `--field-*`, `--card-shadow*`, `--surface-border`, et le perimetre session-live / session-results / challenge
  - conversion a appliquer (pur changement de teinte, alpha conserve) :
    - `rgba(15, 118, 110, α)` -> `rgba(53, 160, 255, α)`
    - `rgba(20, 31, 25, α)` / `rgba(18, 50, 37, α)` -> `rgba(15, 23, 42, α)`
    - blancs verdatres `#f8fbfa` / `#f5faf7` / `#f7fbfa` / `rgba(244, 251, 248, α)` -> `#f8fbfd` / `#f5f9fd` / `#f7fafd` / `rgba(243, 248, 255, α)`
  - approche recommandee : introduire `--legacy-accent-rgb: 53, 160, 255` et `--legacy-shadow-rgb: 15, 23, 42`, puis migrer page par page avec validation visuelle (ne pas faire de remplacement global a l'aveugle)

