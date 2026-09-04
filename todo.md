# TODO GLOBAL - TEAMBLENDER

## PRIORITÉ 0 - ARCHITECTURE & STABILITÉ

### Sécurité & opérations

- [x] Audit de sécurité sur CSP, CORS, gestion des authentifications et rate limiting.
  - CSP : Helmet actif, mais la politique est explicitement désactivée dans [backend/app.js](backend/app.js), ce qui supprime la protection XSS/Clickjacking à la source. À traiter en priorité pour l’API et le frontend.
  - CORS : configuration centralisée et stricte dans [backend/src/config/runtime-config.js](backend/src/config/runtime-config.js) et [backend/src/utils/cors-origin.js](backend/src/utils/cors-origin.js). Origines autorisées et whitelist Vercel ; bonnes pratiques globalement respectées.
  - Authentification : JWT obligatoire via [backend/src/config/env.js](backend/src/config/env.js), vérification via [backend/src/middlewares/auth.middleware.js](backend/src/middlewares/auth.middleware.js), cookies HttpOnly/Secure/SameSite gérés dans [backend/src/controllers/auth.controller.js](backend/src/controllers/auth.controller.js), et protection CSRF dans [backend/src/middlewares/csrf.middleware.js](backend/src/middlewares/csrf.middleware.js). Bon niveau de sécurité, avec vigilance sur le cross-site cookie + OAuth callback validation.
  - Rate limiting : protections globales et ciblées présentes dans [backend/src/middlewares/rateLimiter.js](backend/src/middlewares/rateLimiter.js) pour auth/login et uploads. Paramètres raisonnés, sans bypass en production.
  - À corriger rapidement : réactiver une CSP restrictive (idéalement côté frontend Next + headers API si nécessaire), vérifier le domaine/cookie `AUTH_COOKIE_DOMAIN` en production, et documenter la rotation `JWT_SECRET` avec scan des secrets.
- [x] Structurer davantage le monitoring et les logs par domaine (auth, sessions, challenges, realtime).
- [x] Séparer les chemins de diagnostic/debug du cœur métier pour un environnement plus sûr.
- [x] Formaliser la stratégie de tests par domaine (backend, realtime, challenges, UI).
- [x] Documenter l’architecture générale du projet pour faciliter la reprise et les évolutions.





