# TeamBlender — TODO Master
> Derniere mise a jour : 01/06/2026
> Objectif lancement MVP : fin juin / debut juillet 2026
> Hors MVP : docs/product/POST_MVP.md
> Convention commit : docs/git-convention.md

---

## LEGENDE
- BLOQUANT — ne pas livrer sans ca
- CRITIQUE — livrer avant ou au lancement
- IMPORTANT — ameliore significativement la qualite
- POST-MVP — roadmap future

---

# 1. SECURITE

## 1.1 Secrets & Variables d environnement
- [ ] [BLOQUANT] JWT_SECRET — remplacer la valeur teamsparksecret par une chaine forte (>= 48 bytes, via openssl rand -base64 48) dans Railway dev ET prod. Invalide les sessions actives — coordonner une feneture de maintenance.
- [ ] [BLOQUANT] Supprimer JWT_SECRET=teamsparksecret et SMTP_FROM_NAME=TEAMSPARK du .env local.
- [ ] [BLOQUANT] Auditer toutes les variables Railway (dev / prod) — aucune valeur par defaut faible (Admin1234!, Teamspark@2026, etc.).
- [ ] [CRITIQUE] Ajouter un script de validation au demarrage : variables critiques presentes et non-vides (JWT_SECRET, DATABASE_URL, SMTP_*), sinon process.exit(1).
- [ ] [CRITIQUE] Rotation planifiee du JWT_SECRET tous les 90 jours — documenter la procedure dans docs/runbooks/.
- [ ] [CRITIQUE] 0 secrets dans les commits — ajouter un scan pre-commit (ex : gitleaks).
- [ ] [IMPORTANT] .env.example exhaustif et a jour pour backend et frontend-next.

## 1.2 Authentification & Sessions
- [ ] [CRITIQUE] Valider que l expiration JWT est <= 24h. Implémenter refresh token si necessaire.
- [ ] [CRITIQUE] Blacklister les tokens a la deconnexion explicite (table revoked_tokens ou Redis).
- [ ] [CRITIQUE] Rate-limit /api/auth/login : max 5 tentatives / 15min / IP.
- [ ] [IMPORTANT] Mecanisme de logout de toutes les sessions actives (cas de compromission).
- [ ] [POST-MVP] Voir docs/product/POST_MVP.md

## 1.3 Hardening API
- [ ] [CRITIQUE] Rate-limiting global routes publiques (100 req/min/IP — express-rate-limit).
- [ ] [CRITIQUE] Validation stricte des inputs avec joi ou zod sur tous les endpoints.
- [ ] [CRITIQUE] helmet actif et correctement configure (CSP, HSTS, X-Frame-Options).
- [ ] [CRITIQUE] CORS : liste blanche stricte en production (interdire *).
- [ ] [IMPORTANT] Sanitisation des uploads fichiers (MIME, taille max, renommage, stockage hors webroot).
- [ ] [IMPORTANT] Audit des requetes Sequelize raw — tous les parametres passent par :replacements.

## 1.4 Donnees & RGPD
- [ ] [CRITIQUE] Droit a l effacement : DELETE /api/users/:id supprime toutes les donnees associees.
- [ ] [CRITIQUE] Politique de retention : purger automatiquement les sessions inactives > 12 mois.
- [ ] [CRITIQUE] Pages mentions legales et politique de confidentialite completes et a jour.
- [ ] [IMPORTANT] Banniere cookie conforme (si analytics ou tracking ajoutes).
- [ ] [IMPORTANT] Journal de consentement utilisateur.

---

# 2. INFRASTRUCTURE & DEPLOIEMENT

## 2.1 Railway (Backend)
- [ ] [BLOQUANT] Valider que le pre-deploy (migrations) passe sans erreur apres fix 4ad0c3b (JSON.stringify engine_config + formats).
- [ ] [CRITIQUE] Separer les environnements Railway : dev, staging, production avec variables isolees.
- [ ] [CRITIQUE] Health checks Railway actifs sur /api/health avec timeout adapte.
- [ ] [CRITIQUE] Alertes Railway configurees (downtime, erreurs 5xx, depassement memoire).
- [ ] [IMPORTANT] Runbook de rollback migration documente dans docs/runbooks/.
- [ ] [IMPORTANT] Verifier que toutes les migrations sont idempotentes.

## 2.2 Vercel (Frontend)
- [ ] [CRITIQUE] NEXT_PUBLIC_API_URL pointe sur le bon environnement (dev -> Railway dev, prod -> Railway prod).
- [ ] [CRITIQUE] Previews Vercel configurees pour pointer sur Railway dev.
- [ ] [IMPORTANT] Headers securite dans vercel.json (CSP, HSTS, X-Content-Type-Options).
- [ ] [IMPORTANT] Analytics Vercel actives (Core Web Vitals).

## 2.3 CI/CD & Qualite
- [ ] [CRITIQUE] GitHub Actions : lint + tests backend a chaque push sur main.
- [ ] [CRITIQUE] GitHub Actions : build Next.js a chaque push (detection erreurs avant deploy Vercel).
- [ ] [IMPORTANT] Coverage tests backend > 70% sur les services critiques (auth, sessions, challenges).
- [ ] [IMPORTANT] Scan securite dependances dans le pipeline CI (npm audit).
- [ ] [POST-MVP] Voir docs/product/POST_MVP.md

## 2.4 Base de donnees
- [ ] [CRITIQUE] Backups automatiques Railway PostgreSQL (retention >= 7 jours).
- [ ] [CRITIQUE] Procedure de restauration de backup documentee.
- [ ] [IMPORTANT] Index sur les colonnes frequemment filtrees (engine_key, session_id, user_id).
- [ ] [IMPORTANT] Connection pooling explicite configure.

---

# 3. PERFORMANCE & SCALABILITE



---

# 4. UI / UX — STANDARD STARTUP PREMIUM

## 4.4 Experience Utilisateur Cle
- [x] améliore la visibilité des champs si thème sombre au niveau des naviguateur
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
- [ ] supprimer "Au lancement, ce brief disparaît et la vue de jeu devient active."
- [ ] reduire les sauts de lignes dans les régles

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
- [ ] [POST-MVP] Voir docs/product/POST_MVP.md

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

# 10. DETTE TECHNIQUE & NETTOYAGE

- [ ] [POST-MVP] Voir docs/product/POST_MVP.md

---

# 11. IDEES & ROADMAP POST-MVP

- [ ] [POST-MVP] Voir docs/product/POST_MVP.md


mode sombre / mode clair