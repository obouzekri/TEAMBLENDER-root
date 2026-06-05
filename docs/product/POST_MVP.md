# TeamBlender — POST-MVP

> Items d'architecture et de clean code à traiter après le lancement MVP.
> Priorité : stabilité produit > qualité code

## Items deplaces depuis todo.md (tags [POST-MVP])

### Securite
- [ ] 2FA pour les comptes admin/facilitateur

### CI/CD & Qualite
- [ ] Tests E2E avec Playwright (parcours facilitateur + participant)

### Performance & Scalabilite
- [ ] CDN pour les assets statiques (images puzzles, icons)
- [ ] Verifier que l'app est stateless pour le scaling horizontal

### UI / UX
- [ ] Tableau de bord analytique facilitateur (resultats par session, taux de participation)

### Paiement & Monetisation
- [ ] Essai gratuit 14 jours sans CB
- [ ] Gestion des coupons et codes promo

### Email & Notifications
- [ ] Notifications in-app temps reel (cloche, badge)
- [ ] Valider en environnement reel le rendu des emails post-session et relance J+3, puis ajuster contenu/CTA

### Marketing & Acquisition
- [ ] Integration analytics privacy-first (Plausible ou PostHog)

### Dette technique
- [ ] Migrer les requetes Sequelize raw restantes vers les methodes ORM natives

### Idees & Roadmap produit
- [ ] Plateforme de developpement des soft skills par le jeu (modules progressifs)
- [ ] Niveaux de difficulte par challenge (Facile / Moyen / Difficile)
- [ ] Construire une ville en 3D (icograms)
- [ ] Completer des mots ou des phrases (challenge langue)
- [ ] Tableau de bord analytique RH (suivi competences equipe dans le temps)
- [ ] Mode asynchrone (challenge sans synchronisation temps reel)
- [ ] API publique pour integrations (Slack, Teams, Notion)
- [ ] White-label pour agences RH et cabinets de conseil

## Backend refactorisation

### Résilience réseau avancée
- [ ] Ajouter un support `Idempotency-Key` sur les mutations critiques (POST `/sessions`, PATCH `flow/complete-active`) pour permettre un retry sûr côté client sans risque de double-exécution

### Structure & clean architecture
- [ ] Ajouter des tests unitaires Jest pour chaque service critique
- [ ] Ajouter `Session.phase` pour workflow multi-étapes (icebreaker -> logique -> cohésion -> debrief)
  - Audit 2026-05-12: `phase` n'existe pas en DB, n'impacte pas MVP
  - `status` + `active_challenge_id` suffisent pour flow MVP

### Sécurité avancée
- [ ] Ajouter du rate limiting sur l'API Express
- [ ] Valider tous les payloads entrants avec des schémas Joi
- [ ] Ajouter de l'audit logging pour les actions sensibles (création/suppression/modification données sensibles)

### Observabilité
- [ ] Mettre en place un système de logging structuré (Winston ou Pino)
- [ ] Ajouter des métriques de performance (APM)
- [ ] Dashboard de monitoring Backend + DB

## Frontend refactorisation

### State management
- [ ] Créer un state manager centralisé pour l'état de session
- [ ] Refactoriser les appels API dans un client unique
- [ ] Ajouter des tests d'intégration pour les flows critiques

## Documentation technique

- [ ] Documenter l'architecture interne backend (flows métier)
- [ ] Documenter les patterns d'erreur attendus (ApiError)
- [ ] Créer un guide de contribution backend + frontend

## Items migres depuis todo.md (2026-06-05)

### OAuth / Social login
- [ ] Renseigner dans Google OAuth Consent Screen le lien `App privacy policy` (politique de confidentialite)
- [ ] Renseigner dans Google OAuth Consent Screen le lien `App terms of service` (CGU / mentions legales)
- [ ] Ajouter les secrets Microsoft OAuth dans les env Railway (dev + prod) : `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`
- [ ] Enregistrer les redirect URIs OAuth dans Azure AD pour le mode multi-tenant `common`
- [ ] Tester le flow Microsoft OAuth en local avec un compte de test reel

### Email & Notifications (etat actuel migre)
- SMTP sender aligne: `SMTP_FROM_NAME=TeamBlender` applique sur Railway `production` et `dev` (service backend) + `backend/.env.example` aligne.
- Invitation participant: template HTML TeamBlender avec lien direct `frontend/login?sessionId=<id>`.
- Confirmation facilitateur: email de verification reformule comme confirmation d'inscription + activation compte.
- Post-session: email resume envoye au facilitateur au passage en `terminee` (manuel ou fin dernier challenge).
- Relance J+3: implementee via service + scheduler serveur + script manuel `npm run email:reminder:j3`.