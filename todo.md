﻿﻿# TODO - Plan d'action priorise (Plateforme + Produit)

## P0 - Blocants (Semaine 1)

- [ ] Corriger la validation env en contexte test (JWT_SECRET et variables critiques)
- [ ] Corriger le test flaky realtime `phrase_realtime_events`
- [ ] Activer un gate de merge bloque si tests backend rouges
- [ ] Definir une limite dediee upload (taille, debit, auth)
- [ ] Lancer migration auth vers cookie HttpOnly + SameSite + CSRF

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
- [ ] Publier CGU SaaS B2B + finaliser pages legales (mentions, confidentialite, contact RGPD)
	- [ ] Finaliser textes juridiques minimaux avec perimetre B2B clair (responsabilites, disponibilite, donnees)
	- [ ] Publier pages publiques: /cgu, /mentions-legales, /confidentialite, /contact-rgpd
	- [ ] Verifier coherence liens footer/header + accessibilite mobile
	- [ ] Definition of done: pages accessibles en production + date de mise a jour visible
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
- [ ] Ajouter 2FA admin/facilitateur
- [ ] Documenter procedure violation RGPD (72h) + test de simulation
- [ ] Ajouter facturation automatique par email
- [ ] Continuer durcissement i18n phase 2 (detection JSX hardcode + allowlist CI)

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

