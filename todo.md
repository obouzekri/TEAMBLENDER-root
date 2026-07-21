﻿# TODO - Plan d'action priorise (Plateforme + Produit)

## P0 - Blocants (Semaine 1)

- [ ] Lancer migration auth vers cookie HttpOnly + SameSite + CSRF
	- [ ] Migrer frontend pour ne plus lire token depuis storage browser
	- [ ] Definition of done: login/logout/refresh fonctionnels avec cookie + tests e2e auth verts

## P1 - Securite et Qualite (Semaines 2-3)

- [ ] Remplacer lecture directe token depuis localStorage/sessionStorage
- [ ] Ajouter tests integration frontend pour parcours manager/participant
	- Etat local (2026-06-30): script present `frontend-next npm run test:integration:manager-participant`, execution KO sur dependance environnement (`SMOKE_FAIL fetch failed`).
- [ ] Mettre dashboard fiabilite (5xx, latence p95, erreurs socket, paiement)

## P2 - Scalabilite et Robustesse (Mois 2)

- [x] Externaliser etat realtime (rooms/socket) vers Redis adapter
- [ ] Ajouter tests de charge realtime (multi-sessions, multi-participants)


## Produit / UX / Challenges (Parallele)

- [ ] Verifier responsive mobile complet sur parcours manager/participant

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
- [ ] Documenter procedure violation RGPD (72h) + test de simulation
	- [x] Ecrire playbook incident RGPD (detection, qualification, notification, communication)
	- [x] Definir RACI (DPO, tech lead, legal, support) et canaux de crise
	- [x] Executer exercice table-top 60 min et capturer ecarts
	- [x] Definition of done: procedure versionnee + compte-rendu simulation avec actions correctives
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

