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

### Tracking & Analytics (etat actuel migre)
- Etat code (2026-06-05): GTM deja injecte via `NEXT_PUBLIC_GTM_ID` et evenements dataLayer deja emis (`cta_click`, `page_view`, `web_performance`, `frontend_error`).
- Runbook operationnel: `docs/runbooks/GTM_GA4_SETUP_RUNBOOK.md` (noms exacts tags/declencheurs/variables + checks GTM Preview et GA4 DebugView).
- Etat GTM (2026-06-06): configuration GA4 publiee (version 2) avec 5 balises, 4 declencheurs, 4 variables.
- Alerte a traiter: GTM signale "logiciel malveillant" sur les balises GA4 publiees (balises mises en veille) ; lever ce blocage avant validation finale analytics.

## Post MVP
Le “Produit / Tarifs / Contact” paraît un peu vide
À terme je verrais :
Fonctionnalités
Cas d’usage
Entreprises
Ressources
Démo

## Post MVP
clarifier encore plus la proposition de valeur
montrer des cas concrets
rassurer sur le ROI et l’engagement des équipes

## Post MVP amélioration navi bar liste déroulante
Si tu veux, je peux aussi te proposer une petite amélioration pour l’animation de fermeture (fade out + scale down) pour que l’UX soit aussi fluide à la fermeture qu’à l’ouverture.


## Post MVP amélioration pour la connexion
Si vous voulez une finition supplémentaire, je peux faire une passe micro-UI dédiée mobile uniquement sur les espacements et la densité visuelle des cards pour les pages de connexion


## Post MVP

Utilisé sur le terrain par des managers, RH et facilitateurs pour structurer des décisions collectives en conditions réelles.

🎯 Recommandations design prioritaires
Créer un moment “wow” visuel (animation, illustration clé, interaction).
Renforcer la hiérarchie visuelle (titres, CTA).
Injecter plus de signaux de jeu (progression, tension, feedback visuel).
Oser un peu plus d’émotion graphique, sans perdre le sérieux B2B.

Si tu veux, je peux :

proposer une direction artistique alternative plus ludique,
faire un avant / après design sur une section précise,
ou te dire comment renforcer le design sans toucher au code (quick wins).

##
#
## PAIEMENT & MONETISATION

- [ ] [CRITIQUE] Definir les offres (Free / Pro / Enterprise) et leurs limites (sessions, participants, challenges).
- [ ] [IMPORTANT] Factures automatiques envoyees par email.

## MARKETING & ACQUISITION


- [ ] [CRITIQUE] SEO de base : title, meta description, og:image sur toutes les pages publiques.
- [ ] [IMPORTANT] Section Ressources (guide du team building efficace, use cases).
- [ ] [IMPORTANT] Temoignages / logos clients sur la landing page.
- [ ] [IMPORTANT] Formulaire de demande de demo (CRM ou email).

---

## CONFORMITE & LEGAL

- [ ] [CRITIQUE] Mentions legales completes (editeur, hebergeur, DPO).
- [ ] [CRITIQUE] CGU adaptees au SaaS B2B.
- [ ] [CRITIQUE] Politique de confidentialite RGPD conforme.
- [ ] [IMPORTANT] DPA (Data Processing Agreement) pour les clients entreprise.
- [ ] [IMPORTANT] Procedure de notification de breach RGPD (72h).
- [ ] [IMPORTANT] Améliorer UI des pages

---

## TRACKING & ANALYTICS

- [ ] [CRITIQUE] GTM Preview : ouvrir le site avec le mode Preview actif, verifier que `gtm.js` est charge et que les tags se declenchent.
- [ ] [CRITIQUE] GA4 DebugView (`analytcis.google.com` > Admin > DebugView) : verifier `page_view` et `cta_click` remontent en temps reel.
- Statut courant: verification GTM Preview/GA4 DebugView encore manuelle (non validee dans cette passe), alerte malware GTM toujours presente sur les versions publiees.
- Tentative du 06/06/2026 (agent): GTM accessible et conteneur publie visible, mais mode Preview non validable en session automatisee (interaction instable/bloquee).
- Tentative du 06/06/2026 (agent): GA4 ouvert, proprieté TeamBlender affiche "Aucune donnée reçue de votre site Web pour l'instant" (ID mesure G-29ZC13R2CM), DebugView non validé.

## RGPD / Consentement
- [ ] [IMPORTANT] ImplÃ©menter GTM Consent Mode v2 : bloquer les tags analytics tant que le consentement n est pas donne.

---

## AUTHENTIFICATION & SOCIAL LOGIN

- [ ] [CRITIQUE] Tester le flow Google OAuth en local avec un compte de test reel.
- [ ] [IMPORTANT] Verifier que les evenements PostHog `login_oauth` et `signup_oauth` remontent dans GA4 DebugView via GTM.

---

## Vision produit

TeamBlender vise Ã  devenir la plateforme de rÃ©fÃ©rence de team-building digital pour Ã©quipes hybrides, en combinant gamification, analytics RH et collaboration temps rÃ©el.


## Limitations actuelles

- Realtime partiellement hybride (polling + socket)
- Etat runtime non persistant (risque restart)
- Couverture tests limitÃ©e

## SECURITE
- [ ] [CRITIQUE] Politique de retention : brancher le script de purge des sessions inactives > 12 mois au scheduler Railway (script pret, branchement Railway a faire).
- [ ] [CRITIQUE] Completer et maintenir a jour les pages mentions legales et politique de confidentialite (infos editeur, hebergeur, contact RGPD).

---

## INFRASTRUCTURE & DEPLOIEMENT

- [ ] [IMPORTANT] Coverage tests backend > 70% sur les services critiques (auth, sessions, challenges).
	- Etat actuel (2026-06-05): coverage globale backend `Lines 44.52%`, `Functions 44.66%`, `Statements 43.27%`, `Branches 29.27%` (commande: `npm test -- --coverage`).
	- Bloquants mesures: 6 suites en echec (auth/email/billing/realtime/qa), donc impossible d'atteindre >70% sans stabiliser ces tests d'abord.

- [ ] [CRITIQUE] Backups automatiques Railway PostgreSQL (retention >= 7 jours).
	- Verification technique: la CLI Railway ne fournit pas de commande native de preuve de retention backup (pas d'API backup exposee via `railway --help`).
	- Action restante: validation manuelle dans Railway Dashboard (service Postgres > Backups) avec evidence retention >= 7 jours.

---
# Post MVP
Multi-utlisateur ( 1 compte RH a plusieurs compte participant)