
# Post MVP

- challenge crosswords

- consentement cookies : suites a traiter (option A "Gerer les cookies" en footer livree le 2026-09-13)
  - expiration du refus : `getStoredConsentState()` (`frontend-next/lib/consent.js`) n'invalide la decision qu'au changement de `CONSENT_POLICY_VERSION` ; ajouter une peremption a 6 mois sur `updatedAt` (recommandation CNIL) pour re-solliciter l'utilisateur
  - revocation effective du tracking : `unloadGtmContainer()` est appele au passage en refus, mais PostHog / GA restent charges en memoire jusqu'au prochain rechargement ; prevoir un reset explicite (`posthog.opt_out_capturing()` + purge des cookies `_ga*`) ou un reload controle
  - option B (transparence) : bloc "Vos choix" en bas de `/confidentialite` avec l'etat courant, la date de decision et l'historique local (`getConsentHistory()`), en complement du lien footer
  - i18n : les textes du bandeau `CookieConsentBanner.js` sont encore en dur en francais, a passer dans les dictionnaires `fr.js` / `en.js`


