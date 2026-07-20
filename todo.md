﻿﻿# TODO - Plan d'action priorise (Plateforme + Produit)

## P0 - Blocants (Semaine 1)

- [x] Corriger la validation env en contexte test (JWT_SECRET et variables critiques)
	- [x] Aligner chargement env test (ordre .env.test, fallback securise, valeurs par defaut interdites)
	- [x] Ajouter garde de demarrage: echec explicite si variable critique manquante en test
	- [x] Ajouter test automatique de validation env en mode CI
	- [x] Definition of done: backend tests lancent sans contournement manuel des variables
	- Preuve locale (2026-07-20): `backend/tests/jest.setup.js`, `backend/tests/critical_env_validation.test.js`, `backend/src/config/env.js`, `backend/.github/workflows/ci.yml`.
- [x] Corriger le test flaky realtime `phrase_realtime_events`
	- [x] Isoler cause de flakiness (timing socket, race condition, ordre des events)
	- [x] Stabiliser fixtures et timers (attentes deterministes, timeout explicite)
	- [x] Ajouter rerun local x10 pour verifier stabilite
	- [x] Definition of done: 10 runs consecutifs verts sans intermittence
	- Preuve locale (2026-07-20): `backend/tests/phrase_realtime_events.test.js` execute 10x consecutifs -> `TOTAL_FAILS=0`.
- [x] Activer un gate de merge bloque si tests backend rouges
	- [x] Configurer workflow CI backend en statut requis sur branche main
	- [x] Bloquer merge si job tests/lint/coverage echoue
	- [x] Documenter la regle de protection dans le runbook engineering
	- [x] Definition of done: impossible de merger une PR avec pipeline backend rouge
	- Preuve locale (2026-07-20): job `backend-ci-required` dans `backend/.github/workflows/ci.yml` + doc `docs/process/MERGE_GATE_RULE.md`.
- [x] Definir une limite dediee upload (taille, debit, auth)
	- [x] Fixer limites techniques (taille max par fichier, debit, types acceptes)
	- [x] Exiger auth + controles anti-abus (rate limit, quotas)
	- [x] Retourner erreurs API standardisees (413/415/429) avec message utilisateur clair
	- [x] Definition of done: limites appliquees et testees (cas valides + depassements)
	- Preuve locale (2026-07-20): `backend/src/controllers/challenge.controller.js` + `backend/tests/challenge_upload_limits.test.js`.
- [ ] Lancer migration auth vers cookie HttpOnly + SameSite + CSRF
	- [x] Introduire cookie session HttpOnly/Secure/SameSite adapte au domaine
	- [x] Ajouter protection CSRF sur endpoints sensibles (state-changing)
	- [ ] Migrer frontend pour ne plus lire token depuis storage browser
	- [ ] Definition of done: login/logout/refresh fonctionnels avec cookie + tests e2e auth verts
	- Etat local (2026-07-20): backend pret en mode dual auth (Bearer + cookie) avec endpoints `/auth/csrf-token`, `/auth/refresh`, `/auth/logout` et middleware CSRF; migration frontend complete + e2e a finaliser.

## P1 - Securite et Qualite (Semaines 2-3)

- [ ] Remplacer lecture directe token depuis localStorage/sessionStorage
- [x] Centraliser la gestion d'auth frontend avec mecanisme unique
	- Preuve locale (2026-06-30): centralisation via `frontend-next/lib/auth-storage.js` + wiring dans `lib/auth.js`, `lib/api.js`, `lib/socket.js`, `lib/paddle.js`.
- [x] Ajouter tests frontend unitaires sur flux critiques (auth, builder, runtime)
	- Preuve locale (2026-06-30): `frontend-next npm run test:unit` -> OK (`TEST_VOM_UTILS_OK`, `TEST_AUTH_OK`, `TEST_SESSION_BUILDER_UTILS_OK`, `TEST_RUNTIME_DISPATCHER_OK`).
- [ ] Ajouter tests integration frontend pour parcours manager/participant
	- Etat local (2026-06-30): script present `frontend-next npm run test:integration:manager-participant`, execution KO sur dependance environnement (`SMOKE_FAIL fetch failed`).
- [ ] Mettre dashboard fiabilite (5xx, latence p95, erreurs socket, paiement)

## P2 - Scalabilite et Robustesse (Mois 2)

- [ ] Externaliser etat realtime (rooms/socket) vers Redis adapter
- [ ] Renforcer reprise sur incident (idempotence actions challenge)
- [ ] Durcir gestion timeouts/reconnexion pendant challenges live
- [ ] Ajouter tests de charge realtime (multi-sessions, multi-participants)
- [ ] Ajouter runbook incident realtime (degradation + recovery)

## Produit / UX / Challenges (Parallele)

- [x] Corriger textes de regles (accents, apostrophes) sur tous les challenges
- [x] Uniformiser format des blocs regles participants (bullet points)
- [x] Finaliser systeme de points Mission Secrete
- [x] Corriger logique Enigme (reponse incoherente: nouvelle tentative ou passage)
- [x] Corriger affichage image challenge quand non chargee
- [x] Corriger ecran vide Pixel Architect (depot impossible)
- [x] Quiz: retirer selection par defaut de reponse
- [x] Quiz: passage automatique a la question suivante apres soumission
- [x] Quiz: afficher reponse correcte en fin de question
- [x] Ajouter classement actuel sous le chat
- [x] Aligner design modal "lancement session" sur modal "prochain challenge"
- [ ] Verifier responsive mobile complet sur parcours manager/participant

## Priorites paralleles Post-MVP (Business + Conformite + Adoption)

### P0 parallele - Business continuity / legal
- [ ] Definir offres Free / Pro / Enterprise avec limites explicites (sessions, participants, challenges)
	- [ ] Fixer limites chiftrees par plan (sessions actives, participants/session, bibliotheque challenges, exports)
	- [ ] Definir regles de depassement (hard cap, soft warning, upgrade prompt)
	- [ ] Aligner pricing page + backend enforcement (flags plan + checks API)
	- [ ] Definition of done: matrice des plans versionnee + test de non-regression des limites
- [x] Publier CGU SaaS B2B + finaliser pages legales (mentions, confidentialite, contact RGPD)
	- [x] Finaliser textes juridiques minimaux avec perimetre B2B clair (responsabilites, disponibilite, donnees)
	- [x] Publier pages publiques: /cgu, /mentions-legales, /confidentialite, /contact-rgpd
	- [x] Verifier coherence liens footer/header + accessibilite mobile
	- [x] Definition of done: pages accessibles en production + date de mise a jour visible
- [ ] Activer sauvegardes PostgreSQL Railway avec retention >= 7 jours + preuve de restauration
	- [ ] Activer politique de backup quotidienne et retention >= 7 jours sur environnement prod
	- [x] Documenter procedure de restauration pas a pas (runbook)
	- [ ] Executer un test de restauration sur environnement de verification
	- [ ] Definition of done: preuve horodatee backup + rapport restauration reussi
	- Etat local (2026-06-30): runbook et trace de verification ajoutes dans `docs/runbooks/RAILWAY_POSTGRES_BACKUP_RESTORE_RUNBOOK.md` et `docs/history/RAILWAY_POSTGRES_BACKUP_RESTORE_EVIDENCE_2026-06-30.md`; validation backup retention + restore final a confirmer via dashboard Railway (Backups).
- [x] Configurer retention donnees: purge automatique sessions inactives > 12 mois
	- [ ] Definir politique retention (objet concerne, base legale, exceptions)
	- [x] Implementer job planifie de purge/anonymisation des sessions inactives > 12 mois
	- [x] Ajouter journal d'execution (nombre de lignes affectees + erreurs)
	- [ ] Definition of done: run automatique valide sur 2 cycles sans erreur
	- Preuve locale (2026-06-30): `backend/.github/workflows/session-retention-purge.yml` + `backend/scripts/purge_stale_sessions.js` (JSON summary + details par session).
- [x] Completer validation Joi sur endpoints critiques encore non couverts
	- [x] Cartographier endpoints critiques restants (auth, sessions, challenges, paiements/webhooks)
	- [x] Ajouter schemas Joi sur payload, params et query pour chaque endpoint cible
	- [ ] Ajouter tests integration sur cas invalides (400 attendus) + cas valides
	- [ ] Definition of done: 0 endpoint critique sans validation + suite tests verte
	- Preuve locale (2026-06-30): schemas ajoutes dans `backend/src/validators/api-input.validator.js` + wiring dans `backend/src/routes/challenge.route.js`, `backend/src/routes/session.route.js`, `backend/src/routes/quiz.route.js`, `backend/src/routes/challenge-result.routes.js`, `backend/src/routes/team.route.js`.

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
	- [ ] Renseigner title + meta description uniques par page publique cle
	- [ ] Ajouter OG tags minimaux (og:title, og:description, og:image, og:type)
	- [ ] Ajouter sitemap.xml + robots.txt et soumettre dans Search Console
	- [ ] Definition of done: score technique SEO de base valide sur page d'accueil + page pricing
- [ ] Ajouter preuve de valeur en front public: cas d'usage, temoignages, logos clients, CTA demo
	- [ ] Ajouter section cas d'usage (manager, RH, equipe distribuee)
	- [ ] Ajouter bloc temoignages credibles (3) + logos clients/entreprises pilotes
	- [ ] Ajouter CTA demo persistant (hero + mid-page + footer)
	- [ ] Definition of done: parcours public complet avec au moins 3 points de preuve visibles sans scroll excessif
- [ ] Ajouter essai gratuit 14 jours sans carte bancaire
	- [ ] Ajouter messaging pricing clair: "Essai gratuit 14 jours, sans carte bancaire"
	- [ ] Adapter flow signup pour flag trial_start + trial_end
	- [ ] Ajouter reminders email J+10/J+13 + CTA upgrade
	- [ ] Definition of done: creation compte trial testee de bout en bout + conversion vers offre payante possible

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
- [ ] Documenter procedure violation RGPD (72h) + test de simulation
	- [ ] Ecrire playbook incident RGPD (detection, qualification, notification, communication)
	- [ ] Definir RACI (DPO, tech lead, legal, support) et canaux de crise
	- [ ] Executer exercice table-top 60 min et capturer ecarts
	- [ ] Definition of done: procedure versionnee + compte-rendu simulation avec actions correctives
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
	- [ ] Ajouter template PR obligatoire (tests executes, captures, risques, rollback)
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

