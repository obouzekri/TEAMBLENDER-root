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
- [ ] [CRITIQUE] Ajouter un script de validation au demarrage : variables critiques presentes et non-vides (JWT_SECRET, DATABASE_URL, SMTP_*), sinon process.exit(1).
- [ ] [CRITIQUE] Rotation planifiee du JWT_SECRET tous les 90 jours - documenter la procedure dans docs/runbooks/.
- [ ] [CRITIQUE] 0 secrets dans les commits - ajouter un scan pre-commit (ex : gitleaks).
- [ ] [IMPORTANT] .env.example exhaustif et a jour pour backend et frontend-next.

## 1.2 Authentification & Sessions
- [ ] [CRITIQUE] Valider que l expiration JWT est <= 24h. ImplÃ©menter refresh token si necessaire.
- [ ] [CRITIQUE] Blacklister les tokens a la deconnexion explicite (table revoked_tokens ou Redis).
- [ ] [CRITIQUE] Rate-limit /api/auth/login : max 5 tentatives / 15min / IP.
- [ ] [IMPORTANT] Mecanisme de logout de toutes les sessions actives (cas de compromission).

## 1.3 Hardening API
- [ ] [CRITIQUE] Rate-limiting global routes publiques (100 req/min/IP - express-rate-limit).
- [ ] [CRITIQUE] Validation stricte des inputs avec joi ou zod sur tous les endpoints.
- [ ] [CRITIQUE] helmet actif et correctement configure (CSP, HSTS, X-Frame-Options).
- [ ] [CRITIQUE] CORS : liste blanche stricte en production (interdire *).
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


## 2.3 CI/CD & Qualite
- [ ] [IMPORTANT] Coverage tests backend > 70% sur les services critiques (auth, sessions, challenges).

## 2.4 Base de donnees
- [ ] [CRITIQUE] Backups automatiques Railway PostgreSQL (retention >= 7 jours).

---

# 4. UI / UX - STANDARD STARTUP PREMIUM

## 4.4 Experience Utilisateur Cle
- [ ] [CRITIQUE] Onboarding facilitateur : flow guide (creer session -> ajouter participants -> lancer challenge).
- [ ] [CRITIQUE] Messages d erreur lisibles par un humain en prod (pas de stack trace, pas de Internal Server Error brut).
- [ ] [CRITIQUE] Feedback toasts : confirmer chaque action utilisateur (sauvegarde, envoi, suppression).
- [ ] [IMPORTANT] Page 404 personnalisee et utile.
- [ ] [IMPORTANT] Page erreur 500 personnalisee.

- [ ] [POST-MVP] Voir docs/product/POST_MVP.md

---

# 5. CHALLENGES

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

# 6. PAIEMENT & MONETISATION

- [ ] [CRITIQUE] Definir les offres (Free / Pro / Enterprise) et leurs limites (sessions, participants, challenges).
- [ ] [CRITIQUE] Integrer Stripe (Checkout ou Elements) pour paiement mensuel/annuel.
- [ ] [CRITIQUE] Webhooks Stripe : activer/desactiver compte selon statut abonnement.
- [ ] [IMPORTANT] Page pricing claire (comparatif offres, CTA fort).
- [ ] [IMPORTANT] Portail client Stripe pour gestion autonome des abonnements.
- [ ] [IMPORTANT] Factures automatiques envoyees par email.
- [ ] [POST-MVP] Voir docs/product/POST_MVP.md

---

# 7. EMAIL & NOTIFICATIONS

- [ ] [CRITIQUE] Mettre a jour SMTP_FROM_NAME de TEAMSPARK vers TeamBlender dans Railway (dev + prod) et dans .env / .env.example.
- [ ] [CRITIQUE] Email d invitation participant : design HTML branded TeamBlender, lien de connexion direct.
- [ ] [CRITIQUE] Email de confirmation d inscription facilitateur.
- [ ] [IMPORTANT] Email post-session : resume des resultats envoye au facilitateur.
- [ ] [IMPORTANT] Email de relance si session creee mais jamais lancee (J+3).

---

# 8. MARKETING & ACQUISITION

- [ ] [CRITIQUE] Landing page : proposition de valeur claire, benefices concrets, social proof, CTA principal.
- [ ] [CRITIQUE] SEO de base : title, meta description, og:image sur toutes les pages publiques.
- [ ] [IMPORTANT] Section Ressources (guide du team building efficace, use cases).
- [ ] [IMPORTANT] Temoignages / logos clients sur la landing page.
- [ ] [IMPORTANT] Formulaire de demande de demo (CRM ou email).
- [ ] [POST-MVP] Voir docs/product/POST_MVP.md

---

# 9. CONFORMITE & LEGAL

- [ ] [CRITIQUE] Mentions legales completes (editeur, hebergeur, DPO).
- [ ] [CRITIQUE] CGU adaptees au SaaS B2B.
- [ ] [CRITIQUE] Politique de confidentialite RGPD conforme.
- [ ] [IMPORTANT] DPA (Data Processing Agreement) pour les clients entreprise.
- [ ] [IMPORTANT] Procedure de notification de breach RGPD (72h).

---

# 10. TRACKING & ANALYTICS

### Variables env

### Configuration GTM (interface tagmanager.google.com)
- [ ] [BLOQUANT] Creer variable constante `GA4 Measurement ID` = `G-XXXXXXXXXX`.
- [ ] [BLOQUANT] Creer tag **GA4 Configuration** (type Google Analytics : GA4) - trigger : All Pages - Measurement ID : variable ci-dessus.
- [ ] [CRITIQUE] Creer declencheur **Custom Event** sur `cta_click` (correspond au `event` pousse dans `dataLayer`).
- [ ] [CRITIQUE] Creer tag **GA4 Event** `cta_click` - trigger : declencheur custom ci-dessus - parametres : `cta_name`, `cta_label`, `cta_destination`.
- [ ] [CRITIQUE] Creer tags GA4 Event pour les autres evenements existants : `page_view`, `web_performance`, `frontend_error`.
- [ ] [IMPORTANT] Publier le conteneur GTM (version + description) avant mise en production.

### Verification
- [ ] [CRITIQUE] GTM Preview : ouvrir le site avec le mode Preview actif, verifier que `gtm.js` est charge et que les tags se declenchent.
- [ ] [CRITIQUE] GA4 DebugView (`analytcis.google.com` > Admin > DebugView) : verifier `page_view` et `cta_click` remontent en temps reel.
- [ ] [IMPORTANT] Etendre `cta_click` aux autres CTA cles : bouton "Creer une session", bouton "Lancer le challenge", bouton "Se connecter".

### RGPD / Consentement
- [ ] [CRITIQUE] Banniere cookie conforme RGPD avant activation GTM/GA4 en prod (voir section 1.4).
- [ ] [IMPORTANT] ImplÃ©menter GTM Consent Mode v2 : bloquer les tags analytics tant que le consentement n est pas donne.
- [ ] [IMPORTANT] Journal de consentement utilisateur (voir section 1.4).

---

---

# 12. AUTHENTIFICATION & SOCIAL LOGIN

> Etat actuel (04/06/2026) : email/password complet (login, register, reset password, email verify, rate limit, bcrypt, JWT). Manque : OAuth social, avatar, champs provider sur le modele.

## 12.1 Actions manuelles restantes

- [x] [CRITIQUE] Ajouter les secrets Google OAuth dans les env Railway (dev + prod) : `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- [x] [CRITIQUE] Enregistrer les redirect URIs OAuth Google dans Google Cloud Console pour les callbacks backend et les origines frontend de prod/dev.
- [ ] [POST-MVP] Renseigner dans Google OAuth Consent Screen le lien `App privacy policy` (politique de confidentialite).
- [ ] [POST-MVP] Renseigner dans Google OAuth Consent Screen le lien `App terms of service` (CGU / mentions legales).
- [ ] [POST-MVP] Ajouter les secrets Microsoft OAuth dans les env Railway (dev + prod) : `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`.
- [ ] [POST-MVP] Enregistrer les redirect URIs OAuth dans Azure AD pour le mode multi-tenant `common`.
- [ ] [CRITIQUE] Tester le flow Google OAuth en local avec un compte de test reel.
- [ ] [POST-MVP] Tester le flow Microsoft OAuth en local avec un compte de test reel.
- [ ] [IMPORTANT] Verifier que les evenements PostHog `login_oauth` et `signup_oauth` remontent dans GA4 DebugView via GTM.

---

# 13. IDEES & ROADMAP POST-MVP

mode sombre / mode clair


## Vision produit

TeamBlender vise Ã  devenir la plateforme de rÃ©fÃ©rence de team-building digital pour Ã©quipes hybrides, en combinant gamification, analytics RH et collaboration temps rÃ©el.



## Vision produit

TeamBlender vise Ã  devenir la plateforme de rÃ©fÃ©rence de team-building digital pour Ã©quipes hybrides, en combinant gamification, analytics RH et collaboration temps rÃ©el.


## Limitations actuelles

- Realtime partiellement hybride (polling + socket)
- Etat runtime non persistant (risque restart)
- Couverture tests limitÃ©e





