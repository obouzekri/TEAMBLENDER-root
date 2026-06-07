# TeamBlender - TODO Master
> Derniere mise a jour : 01/06/2026
> Objectif lancement MVP : fin juin / debut juillet 2026
> Hors MVP : docs/product/POST_MVP.md
> Convention commit : docs/git-convention.md

---

## LEGENDE
- BLOQUANT - ne pas livrer sans ca
- CRITIQUE - livrer avant ou au lancement
- IMPORTANT - ameliore significativement la qualite
- POST-MVP - roadmap future

---

# 1. SECURITE

## 1.1 Secrets & Variables d environnement
- [ ] [BLOQUANT] JWT_SECRET - remplacer la valeur teamsparksecret par une chaine forte (>= 48 bytes, via openssl rand -base64 48) dans Railway dev ET prod. Invalide les sessions actives - coordonner une feneture de maintenance.
- [ ] [BLOQUANT] Supprimer JWT_SECRET=teamsparksecret et SMTP_FROM_NAME=TEAMSPARK du .env local.
- [ ] [BLOQUANT] Auditer toutes les variables Railway (dev / prod) - aucune valeur par defaut faible (Admin1234!, Teamspark@2026, etc.).

## 1.2 Authentification & Sessions

## 1.3 Hardening API
- [ ] [CRITIQUE] Validation stricte des inputs avec joi ou zod sur tous les endpoints.
- [ ] [IMPORTANT] Sanitisation des uploads fichiers (MIME, taille max, renommage, stockage hors webroot).
- [ ] [IMPORTANT] Audit des requetes Sequelize raw - tous les parametres passent par :replacements.

## 1.4 Donnees & RGPD
- [ ] [CRITIQUE] Droit a l effacement : DELETE /api/users/:id supprime toutes les donnees associees.
- [ ] [CRITIQUE] Politique de retention : purger automatiquement les sessions inactives > 12 mois.
- [ ] [CRITIQUE] Pages mentions legales et politique de confidentialite completes et a jour.
- [ ] [IMPORTANT] Banniere cookie conforme (si analytics ou tracking ajoutes).
- [ ] [IMPORTANT] Journal de consentement utilisateur.

---

# 2. INFRASTRUCTURE & DEPLOIEMENT

## CI/CD & Qualite
- [ ] [IMPORTANT] Coverage tests backend > 70% sur les services critiques (auth, sessions, challenges).
	- Etat actuel (2026-06-05): coverage globale backend `Lines 44.52%`, `Functions 44.66%`, `Statements 43.27%`, `Branches 29.27%` (commande: `npm test -- --coverage`).
	- Bloquants mesures: 6 suites en echec (auth/email/billing/realtime/qa), donc impossible d'atteindre >70% sans stabiliser ces tests d'abord.

## Base de donnees
- [ ] [CRITIQUE] Backups automatiques Railway PostgreSQL (retention >= 7 jours).
	- Verification technique: la CLI Railway ne fournit pas de commande native de preuve de retention backup (pas d'API backup exposee via `railway --help`).
	- Action restante: validation manuelle dans Railway Dashboard (service Postgres > Backups) avec evidence retention >= 7 jours.

---

# 3. UI / UX - STANDARD STARTUP PREMIUM

## Experience Utilisateur Cle
- [ ] [CRITIQUE] Onboarding facilitateur : flow guide (creer session -> ajouter participants -> lancer challenge).
- [ ] [CRITIQUE] Messages d erreur lisibles par un humain en prod (pas de stack trace, pas de Internal Server Error brut).
- [ ] [CRITIQUE] Feedback toasts : confirmer chaque action utilisateur (sauvegarde, envoi, suppression).
- [ ] [IMPORTANT] Page 404 personnalisee et utile.
- [ ] [IMPORTANT] Page erreur 500 personnalisee.



---

# 4. CHALLENGES
## 5.1 Mission Critique
## 5.2 Vrai ou Mensonge
## 5.3 Phrase Mystere
## 5.4 Labyrinthe
## 5.5 Mission critique
## 5.6 Pixel Art
## 5.7 Copuzzle
- [ ] les images ne s'affiche pas toujours au niveau de la session de configuration dans session builder
- [ ] supprimer "Au lancement, ce brief disparaÃ®t et la vue de jeu devient active."
- [ ] reduire les sauts de lignes dans les rÃ¨gles

# 5. PAIEMENT & MONETISATION

- [ ] [CRITIQUE] Definir les offres (Free / Pro / Enterprise) et leurs limites (sessions, participants, challenges).
- [ ] [CRITIQUE] Integrer Stripe (Checkout ou Elements) pour paiement mensuel/annuel.
- [ ] [CRITIQUE] Webhooks Stripe : activer/desactiver compte selon statut abonnement.
- [ ] [IMPORTANT] Page pricing claire (comparatif offres, CTA fort).
- [ ] [IMPORTANT] Portail client Stripe pour gestion autonome des abonnements.
- [ ] [IMPORTANT] Factures automatiques envoyees par email.

---

---

# 7. MARKETING & ACQUISITION

- [ ] [CRITIQUE] Landing page : proposition de valeur claire, benefices concrets, social proof, CTA principal.
- [ ] [CRITIQUE] SEO de base : title, meta description, og:image sur toutes les pages publiques.
- [ ] [IMPORTANT] Section Ressources (guide du team building efficace, use cases).
- [ ] [IMPORTANT] Temoignages / logos clients sur la landing page.
- [ ] [IMPORTANT] Formulaire de demande de demo (CRM ou email).

---

# 9. CONFORMITE & LEGAL

- [ ] [CRITIQUE] Mentions legales completes (editeur, hebergeur, DPO).
- [ ] [CRITIQUE] CGU adaptees au SaaS B2B.
- [ ] [CRITIQUE] Politique de confidentialite RGPD conforme.
- [ ] [IMPORTANT] DPA (Data Processing Agreement) pour les clients entreprise.
- [ ] [IMPORTANT] Procedure de notification de breach RGPD (72h).
- [ ] [IMPORTANT] Améliorer UI des pages

---

# 10. TRACKING & ANALYTICS

### Variables env

### Configuration GTM (interface tagmanager.google.com)
	- Notes d'etat utiles et alerte migrees vers `docs/product/POST_MVP.md` (section "Tracking & Analytics (etat actuel migre)").

### Verification
- [ ] [CRITIQUE] GTM Preview : ouvrir le site avec le mode Preview actif, verifier que `gtm.js` est charge et que les tags se declenchent.
- [ ] [CRITIQUE] GA4 DebugView (`analytcis.google.com` > Admin > DebugView) : verifier `page_view` et `cta_click` remontent en temps reel.
- Statut courant: verification GTM Preview/GA4 DebugView encore manuelle (non validee dans cette passe), alerte malware GTM toujours presente sur les versions publiees.
- Tentative du 06/06/2026 (agent): GTM accessible et conteneur publie visible, mais mode Preview non validable en session automatisee (interaction instable/bloquee).
- Tentative du 06/06/2026 (agent): GA4 ouvert, proprieté TeamBlender affiche "Aucune donnée reçue de votre site Web pour l'instant" (ID mesure G-29ZC13R2CM), DebugView non validé.

### RGPD / Consentement
- [ ] [CRITIQUE] Banniere cookie conforme RGPD avant activation GTM/GA4 en prod (voir section 1.4).
- [ ] [IMPORTANT] ImplÃ©menter GTM Consent Mode v2 : bloquer les tags analytics tant que le consentement n est pas donne.
- [ ] [IMPORTANT] Journal de consentement utilisateur (voir section 1.4).

---

---

# 12. AUTHENTIFICATION & SOCIAL LOGIN

## 12.1 Actions manuelles restantes

- [ ] [CRITIQUE] Tester le flow Google OAuth en local avec un compte de test reel.
- [ ] [IMPORTANT] Verifier que les evenements PostHog `login_oauth` et `signup_oauth` remontent dans GA4 DebugView via GTM.

---



## Vision produit

TeamBlender vise Ã  devenir la plateforme de rÃ©fÃ©rence de team-building digital pour Ã©quipes hybrides, en combinant gamification, analytics RH et collaboration temps rÃ©el.



## Vision produit

TeamBlender vise Ã  devenir la plateforme de rÃ©fÃ©rence de team-building digital pour Ã©quipes hybrides, en combinant gamification, analytics RH et collaboration temps rÃ©el.


## Limitations actuelles

- Realtime partiellement hybride (polling + socket)
- Etat runtime non persistant (risque restart)
- Couverture tests limitÃ©e


Challenge: Lab d'innovation 

Multi-utlisateur ( 1 compte RH a plusieurs compte participant)