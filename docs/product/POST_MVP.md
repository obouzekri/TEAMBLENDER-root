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


# TODO - Plan d'action priorise (Plateforme + Produit)

## P0 - Blocants (Semaine 1)

- [ ] Lancer migration auth vers cookie HttpOnly + SameSite + CSRF
	- [ ] Migrer frontend pour ne plus lire token depuis storage browser
	- [ ] Definition of done: login/logout/refresh fonctionnels avec cookie + tests e2e auth verts

## P1 - Securite et Qualite (Semaines 2-3)

- [ ] Remplacer lecture directe token depuis localStorage/sessionStorage
- [ ] Ajouter tests integration frontend pour parcours manager/participant
	- Etat local (2026-06-30): script present `frontend-next npm run test:integration:manager-participant`, execution KO sur dependance environnement (`SMOKE_FAIL fetch failed`).
- [ ] Mettre dashboard fiabilite (5xx, latence p95, erreurs socket, paiement)


## Priorites paralleles Post-MVP (Business + Conformite + Adoption)

### P0 parallele - Business continuity / legal

- [ ] Activer sauvegardes PostgreSQL Railway avec retention >= 7 jours + preuve de restauration
	- [ ] Activer politique de backup quotidienne et retention >= 7 jours sur environnement prod
	- [ ] Executer un test de restauration sur environnement de verification
	- [ ] Definition of done: preuve horodatee backup + rapport restauration reussi
	- Etat local (2026-07-20): runbook + evidence refreshes dans `docs/runbooks/RAILWAY_POSTGRES_BACKUP_RESTORE_RUNBOOK.md` et `docs/history/RAILWAY_POSTGRES_BACKUP_RESTORE_EVIDENCE_2026-07-20.md`; confirmation retention >= 7 jours et restore drill restent a valider via dashboard Railway (Backups).

### P1 parallele - Croissance / preuve de valeur
- [ ] Construire E2E Playwright parcours critiques facilitateur + participant
	- [ ] Definir 4 parcours critiques: inscription/login facilitateur, creation session, join participant, lancement + completion challenge
	- [ ] Stabiliser data seed de test + cleanup automatique entre specs
	- [ ] Ajouter execution CI headless (report + screenshot/video sur echec)
	- [ ] Definition of done: pipeline vert sur 3 runs consecutifs sans flaky
- [ ] Monter couverture backend > 70% sur domaines critiques (auth, sessions, challenges)
	- [ ] Mesurer baseline couverture par module (auth/sessions/challenges)
	- [ ] Ajouter tests manquants sur cas d'erreur et regles metier
	- [ ] Activer gate CI: echec si couverture globale < 70% ou module critique < 65%
	- [ ] Definition of done: rapport coverage archive dans PR
- [ ] Activer GTM Consent Mode v2 + lever l'alerte malware GTM
	- [ ] Implementer consent default denied (ad_storage, analytics_storage, ad_user_data, ad_personalization)
	- [ ] Debloquer update consent apres action utilisateur explicite
	- [ ] Auditer conteneur GTM (tags/scripts tiers) et retirer element suspect a l'origine de l'alerte
	- [ ] Definition of done: Tag Assistant OK + alerte malware resolue dans Search Console/outil securite
- [ ] Verifier GA4 DebugView (page_view, cta_click, login_oauth, signup_oauth)
	- [ ] Instrumenter/valider schema evenementiel unique (noms + params)
	- [ ] Verifier emission en local et preprod avec DebugView
	- [ ] Controler non-duplication des events sur navigation
	- [ ] Definition of done: capture horodatee des 4 events dans DebugView
- [ ] Lancer SEO de base pages publiques (title, meta description, og:image)
	- [ ] Definition of done: score technique SEO de base valide sur page d'accueil + page pricing
- [ ] Ajouter preuve de valeur en front public: cas d'usage, temoignages, logos clients, CTA demo
	- [ ] Ajouter section cas d'usage (manager, RH, equipe distribuee)
	- [ ] Ajouter bloc temoignages credibles (3) + logos clients/entreprises pilotes
	- [ ] Ajouter CTA demo persistant (hero + mid-page + footer)
	- [ ] Definition of done: parcours public complet avec au moins 3 points de preuve visibles sans scroll excessif
- [ ] Ajouter essai gratuit 14 jours sans carte bancaire
	- [x] Adapter flow signup pour flag trial_start + trial_end
	- [ ] Ajouter reminders email J+10/J+13 + CTA upgrade
	- [x] Definition of done: creation compte trial testee de bout en bout + conversion vers offre payante possible

### P2 parallele - Structure produit
- [ ] Finaliser OAuth Microsoft en prod (secrets Railway + redirect URIs Azure AD)
	- [ ] Verifier variables prod Railway (client_id, client_secret, callback_url)
	- [ ] Aligner redirect URIs Azure AD (prod + fallback) et tester round-trip complet
	- [ ] Ajouter tests smoke login Microsoft (succes, refus consentement, erreur provider)
	- [ ] Definition of done: connexion Microsoft fonctionnelle en prod avec logs d'audit
- [ ] Ajouter 2FA admin/facilitateur
	- [ ] Choisir methode 2FA (TOTP prioritaire) + definir policy d'enforcement par role
	- [ ] Implementer enrollement, verification, recovery codes et revoke appareil
	- [ ] Ajouter garde-fous UX (grace period, backup flow en cas de perte device)
	- [ ] Definition of done: 2FA obligatoire sur roles cibles + tests d'integration verts
- [ ] Ajouter facturation automatique par email
	- [ ] Definir evenements facture (achat, renouvellement, echec paiement, remboursement)
	- [ ] Generer email facture avec piece jointe/lien PDF et references legales minimales
	- [ ] Journaliser envoi + relance automatique sur echec delivery
	- [ ] Definition of done: facture envoyee automatiquement sur 3 cas de test consecutifs
- [ ] Continuer durcissement i18n phase 2 (detection JSX hardcode + allowlist CI)
	- [ ] Etendre detection hardcoded strings sur composants critiques restants
	- [ ] Mettre a jour allowlist CI avec justification explicite par exception
	- [ ] Ajouter verification PR: echec si nouvelle chaine hardcodee non justifiee
	- [ ] Definition of done: 0 nouvelle chaine hardcodee non autorisee sur 2 sprints

## Gouvernance execution

- [ ] Decouper en PR courtes par lot (P0.1, P0.2, P0.3...)
	- [ ] Limiter chaque PR a 1 objectif principal + 1 risque max
	- [ ] Cible taille PR: <= 400 lignes modifiees (hors snapshots/lockfiles)
	- [ ] Definition of done: backlog mappe en lots numerotes avec owner + ETA
- [ ] Exiger preuves dans chaque PR (tests, build, smoke)
	- [ ] Bloquer merge si checklist preuves incomplete
	- [ ] Definition of done: 100% des PR mergees avec preuves attachees
- [ ] Ajouter retro hebdo fiabilite (incidents, causes, actions)
	- [ ] Instaurer rituel hebdo 30 min (incidents, top causes, actions preventives)
	- [ ] Tenir journal des actions avec owner + date cible
	- [ ] Definition of done: 4 retros consecutives tenues et archivees
- [ ] Mesurer avancement avec KPI: taux tests verts, 5xx, regressions prod
	- [ ] Definir source de verite KPI (CI, logs backend, monitoring)
	- [ ] Publier tableau de bord hebdo partage produit/tech
	- [ ] Definition of done: tendance KPI visible sur 4 semaines


