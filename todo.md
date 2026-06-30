﻿# TODO - Plan d'action priorise (Plateforme + Produit)

## P0 - Blocants (Semaine 1)

- [x] Stabiliser la CI backend (objectif: suite de tests verte)
	- Preuve locale (2026-06-30): `backend npm test -- --runInBand` -> 24/24 suites vertes, 98/98 tests.
- [ ] Corriger la validation env en contexte test (JWT_SECRET et variables critiques)
- [ ] Corriger le test flaky realtime `phrase_realtime_events`
- [ ] Activer un gate de merge bloque si tests backend rouges
- [ ] Durcir l'endpoint upload image (retirer exemption globale de rate limit)
- [ ] Definir une limite dediee upload (taille, debit, auth)
- [ ] Lancer migration auth vers cookie HttpOnly + SameSite + CSRF

## P1 - Securite et Qualite (Semaines 2-3)

- [ ] Remplacer lecture directe token depuis localStorage/sessionStorage
- [ ] Centraliser la gestion d'auth frontend avec mecanisme unique
- [ ] Ajouter tests frontend unitaires sur flux critiques (auth, builder, runtime)
- [ ] Ajouter tests integration frontend pour parcours manager/participant
- [ ] Mettre dashboard fiabilite (5xx, latence p95, erreurs socket, paiement)
- [ ] Standardiser tracking event produit (session/user/challenge)
- [ ] Corriger warning Next: migration `middleware` vers `proxy`

## P2 - Scalabilite et Robustesse (Mois 2)

- [ ] Externaliser etat realtime (rooms/socket) vers Redis adapter
- [ ] Renforcer reprise sur incident (idempotence actions challenge)
- [ ] Durcir gestion timeouts/reconnexion pendant challenges live
- [ ] Ajouter tests de charge realtime (multi-sessions, multi-participants)
- [ ] Ajouter runbook incident realtime (degradation + recovery)

## Produit / UX / Challenges (Parallele)

- [ ] Corriger textes de regles (accents, apostrophes) sur tous les challenges
- [ ] Uniformiser format des blocs regles participants (bullet points)
- [ ] Finaliser systeme de points Mission Secrete
- [ ] Corriger logique Enigme (reponse incoherente: nouvelle tentative ou passage)
- [ ] Corriger affichage image challenge quand non chargee
- [ ] Corriger ecran vide Pixel Architect (depot impossible)
- [ ] Quiz: retirer selection par defaut de reponse
- [ ] Quiz: passage automatique a la question suivante apres soumission
- [ ] Quiz: afficher reponse correcte en fin de question
- [ ] Ajouter classement actuel sous le chat
- [ ] Aligner design modal "lancement session" sur modal "prochain challenge"
- [ ] Verifier responsive mobile complet sur parcours manager/participant

## Priorites paralleles Post-MVP (Business + Conformite + Adoption)

### P0 parallele - Business continuity / legal
- [ ] Definir offres Free / Pro / Enterprise avec limites explicites (sessions, participants, challenges)
- [ ] Publier CGU SaaS B2B + finaliser pages legales (mentions, confidentialite, contact RGPD)
- [ ] Activer sauvegardes PostgreSQL Railway avec retention >= 7 jours + preuve de restauration
- [ ] Configurer retention donnees: purge automatique sessions inactives > 12 mois
- [ ] Completer validation Joi sur endpoints critiques encore non couverts

### P1 parallele - Croissance / preuve de valeur
- [ ] Construire E2E Playwright parcours critiques facilitateur + participant
- [ ] Monter couverture backend > 70% sur domaines critiques (auth, sessions, challenges)
- [ ] Activer GTM Consent Mode v2 + lever l'alerte malware GTM
- [ ] Verifier GA4 DebugView (page_view, cta_click, login_oauth, signup_oauth)
- [ ] Lancer SEO de base pages publiques (title, meta description, og:image)
- [ ] Ajouter preuve de valeur en front public: cas d'usage, temoignages, logos clients, CTA demo
- [ ] Ajouter essai gratuit 14 jours sans carte bancaire

### P2 parallele - Structure produit
- [ ] Finaliser OAuth Microsoft en prod (secrets Railway + redirect URIs Azure AD)
- [ ] Ajouter 2FA admin/facilitateur
- [ ] Documenter procedure violation RGPD (72h) + test de simulation
- [ ] Ajouter facturation automatique par email
- [ ] Continuer durcissement i18n phase 2 (detection JSX hardcode + allowlist CI)

## Gouvernance execution

- [ ] Decouper en PR courtes par lot (P0.1, P0.2, P0.3...)
- [ ] Exiger preuves dans chaque PR (tests, build, smoke)
- [ ] Ajouter retro hebdo fiabilite (incidents, causes, actions)
- [ ] Mesurer avancement avec KPI: taux tests verts, 5xx, regressions prod

