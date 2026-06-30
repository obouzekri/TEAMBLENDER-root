# TeamBlender - Roadmap Post-MVP

> Document de reference des priorites post-MVP.
> Regle produit: stabilite en production et valeur utilisateur avant sophistication architecturale.

## Positionnement produit (Post-MVP)

Utilise en conditions reelles par des managers, RH et facilitateurs pour structurer les decisions collectives et renforcer l'alignement des equipes.

### Proposition de valeur a renforcer
- Clarifier la promesse en une phrase: plus d'alignement, plus d'engagement, meilleure execution.
- Montrer des cas d'usage concrets (kickoff manager, onboarding, atelier multi-sites).
- Rassurer sur le ROI (temps gagne, taux de participation, qualite des decisions).

## Cadre de priorisation

### P0 - Critique (continuite business, legal, securite)
- [ ] Definir les offres (Free / Pro / Enterprise) avec limites explicites (sessions, participants, challenges).
- [ ] Completer et maintenir les pages legales (mentions legales, politique de confidentialite, contact RGPD).
- [ ] Publier des CGU conformes au SaaS B2B.
- [ ] Activer les sauvegardes PostgreSQL Railway avec retention >= 7 jours et conserver une preuve.
- [ ] Configurer la retention: purge automatique des sessions inactives > 12 mois.
- [ ] Ajouter du rate limiting sur l'API Express.
- [ ] Valider les payloads entrants avec Joi sur les endpoints critiques.

### P1 - Important (croissance, fiabilite, adoption)
- [ ] Construire des tests E2E Playwright sur les parcours critiques facilitateur + participant.
- [ ] Monter la couverture de tests backend au-dessus de 70% sur les services critiques (auth, sessions, challenges).
- [ ] Mettre en place un logging backend structure (Winston/Pino) + dashboard de monitoring minimal.
- [ ] Ajouter un tableau de bord analytique facilitateur (resultats session, participation).
- [ ] Ajouter un tableau de bord analytique RH (progression des competences dans le temps).
- [ ] Ajouter un essai gratuit 14 jours sans carte bancaire.
- [ ] Ajouter la gestion des coupons et codes promo.
- [ ] Implementer GTM Consent Mode v2 pour la conformite analytics.
- [ ] Lancer le SEO de base sur les pages publiques (title, meta description, og:image).
- [ ] Ajouter temoignages / logos clients et formulaire de demande de demo.

### P2 - Opportunite (profondeur produit, scale, ecosysteme)
- [ ] Ajouter des niveaux de difficulte par challenge (Facile / Moyen / Difficile).
- [ ] Ajouter un mode asynchrone (sans synchro temps reel).
- [ ] Exposer des integrations via API publique (Slack, Teams, Notion).
- [ ] Preparer une offre white-label pour agences RH et cabinets de conseil.
- [ ] Ajouter des notifications in-app en temps reel (cloche + badge).
- [ ] Introduire un state manager centralise pour les sessions cote frontend.
- [ ] Refactoriser les appels API frontend dans un client unique.
- [ ] Migrer les requetes Sequelize raw restantes vers des methodes ORM natives.

## Roadmap fonctionnelle par domaine

## 1) Securite et conformite
- [ ] 2FA pour les comptes admin/facilitateur.
- [ ] Audit logging pour les actions sensibles (creation/modification/suppression d'entites critiques).
- [ ] Modele DPA (Data Processing Agreement) pour les clients entreprise.
- [ ] Procedure de notification de violation RGPD (72h) documentee et testee.

## 2) Authentification et OAuth
- [ ] Renseigner les liens politique de confidentialite et CGU dans Google OAuth Consent Screen.
- [ ] Ajouter les secrets Microsoft OAuth sur Railway (dev + prod): `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`.
- [ ] Enregistrer les redirect URIs Azure AD pour le mode multi-tenant `common`.
- [ ] Valider le flow Google OAuth en local avec un compte de test reel.
- [ ] Valider le flow Microsoft OAuth en local avec un compte de test reel.

## 3) Analytics et tracking
- [ ] Resoudre l'alerte malware GTM et republier des tags GA4 propres.
- [ ] Valider GTM Preview sur prod/staging avec preuve de verification.
- [ ] Valider en temps reel les evenements GA4 DebugView (`page_view`, `cta_click`).
- [ ] Valider de bout en bout les evenements OAuth (`login_oauth`, `signup_oauth`).

Etat actuel:
- L'integration GTM et les evenements dataLayer existent deja dans le code.
- Le runbook operationnel existe: `docs/runbooks/GTM_GA4_SETUP_RUNBOOK.md`.
- Dernier blocage observe: alerte malware GTM qui met en pause les tags publies.

## 4) Infrastructure et scalabilite
- [ ] Verifier que l'application reste stateless pour le scaling horizontal.
- [x] Utiliser un CDN pour les assets statiques (images/icones/medias challenges).
	- Statut: implemente cote frontend via `NEXT_PUBLIC_CDN_ORIGIN` (`assetPrefix` Next.js) + `NEXT_PUBLIC_CDN_IMAGE_HOSTS` (allowlist `next/image`).
	- Action prod: renseigner le domaine CDN (ex: `https://cdn.teamblender.io`) dans les variables d'environnement Vercel.
- [x] Ajouter des metriques APM pour les performances backend et base de donnees.
	- Statut: implemente cote backend via Prometheus (`prom-client`) avec endpoint `GET /api/monitoring/metrics` (protege par `ENABLE_METRICS` + `METRICS_TOKEN`).
	- Mesures exposees: latence HTTP (`teamblender_http_request_duration_seconds`) et latence requetes DB Sequelize (`teamblender_db_query_duration_ms`).
- [ ] Stabiliser les suites de tests backend en echec avant de durcir le gate de coverage.

Baseline technique actuelle (2026-06-05):
- Snapshot coverage backend: Lines 44.52%, Functions 44.66%, Statements 43.27%, Branches 29.27%.
- Blocage connu: plusieurs suites en echec (auth/email/billing/realtime/qa).

## 5) Produit et monetisation
- [ ] Generer et envoyer automatiquement les factures par email.
- [ ] Enrichir la navigation publique autour des sections valeur: Fonctionnalites, Cas d'usage, Entreprises, Ressources, Demo.
- [ ] Ameliorer la finition UI des pages de connexion (densite et espacements mobile).
- [ ] Affiner l'animation de fermeture des menus deroulants (fade/scale fluide).

## 6) Documentation et qualite engineering
- [ ] Documenter l'architecture interne backend et les flows metier.
- [ ] Documenter les patterns d'erreur API attendus (`ApiError`).
- [ ] Creer un guide de contribution backend/frontend.
- [ ] Ajouter des tests unitaires Jest pour chaque service backend critique.
- [ ] Continuer la phase 2 de durcissement i18n (detection JSX hardcode avec allowlist progressive en CI).

## 7) Vision produit moyen terme (backlog)
- [ ] Plateforme de developpement des soft skills via modules progressifs.
- [ ] Format de challenge collaboratif de construction de ville en 3D.
- [ ] Challenges langue (completer des mots/phrases en collaboration).
- [ ] Modele multi-utilisateur (un compte RH pilotant plusieurs comptes participants).

## Cas d'usage concrets a mettre en avant

### 1) Kickoff manager du lundi
Des equipes leadership en contexte hybride alignent les priorites et repartent avec un plan d'execution concret en moins de 30 minutes.

### 2) Onboarding premiere semaine
Des nouveaux collaborateurs repartis sur plusieurs sites creent rapidement du lien grace a des rituels interactifs structures et une participation visible.

### 3) Atelier d'execution multi-sites
Des equipes distribuees coordonnent objectifs et actions dans des delais courts via un format de facilitation commun.
