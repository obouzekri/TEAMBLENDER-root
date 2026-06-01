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
- [ ] [POST-MVP] 2FA pour les comptes admin/facilitateur.

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
- [ ] [POST-MVP] Tests E2E avec Playwright (parcours facilitateur + participant).

## 2.4 Base de donnees
- [ ] [CRITIQUE] Backups automatiques Railway PostgreSQL (retention >= 7 jours).
- [ ] [CRITIQUE] Procedure de restauration de backup documentee.
- [ ] [IMPORTANT] Index sur les colonnes frequemment filtrees (engine_key, session_id, user_id).
- [ ] [IMPORTANT] Connection pooling explicite configure.

---

# 3. PERFORMANCE & SCALABILITE

- [ ] [CRITIQUE] Lazy loading des images (next/image avec loading=lazy partout).
- [ ] [CRITIQUE] Analyser les bundles JS (next build --analyze) et reduire les imports inutiles.
- [ ] [IMPORTANT] Cache des requetes frequentes cote backend (config session, resultats) avec TTL court.
- [ ] [IMPORTANT] Pagination sur tous les endpoints liste (/api/sessions, /api/participants, etc.).
- [ ] [IMPORTANT] Compression gzip/brotli activee sur Express (compression middleware).
- [ ] [POST-MVP] CDN pour les assets statiques (images puzzles, icons).
- [ ] [POST-MVP] Verifier que l app est stateless pour le scaling horizontal.

---

# 4. UI / UX — STANDARD STARTUP PREMIUM

## 4.1 Design System
- [ ] [CRITIQUE] Design tokens unifies : finaliser globals.css — toutes les couleurs, espacements, rayons, shadows en variables CSS, aucune valeur en dur dans les composants.
- [ ] [CRITIQUE] Dark mode : ne pas casser l interface si prefers-color-scheme: dark est actif.
- [ ] [CRITIQUE] Typographie : Sora + IBM Plex Sans chargees avec font-display: swap et subsets latins uniquement.
- [ ] [IMPORTANT] Composants UI reutilisables : Button, Input, Badge, Card, Modal, Alert dans components/ui/ avec variants.
- [ ] [IMPORTANT] Etats vides (empty states) : chaque liste a un etat vide illustre et actionnable.
- [ ] [IMPORTANT] Etats de chargement : skeleton screens ou spinners coherents (pas de flash de contenu vide).
- [ ] [IMPORTANT] Micro-animations : transitions subtiles sur interactions cles (hover, modals, feedback boutons).
- [ ] [POST-MVP] Storybook pour documenter les composants.

## 4.2 Accessibilite (a11y)
- [ ] [CRITIQUE] Navigation clavier complete : tous les elements interactifs atteignables au Tab, focus visible.
- [ ] [CRITIQUE] Contraste WCAG AA minimum verifie sur tous les textes.
- [ ] [IMPORTANT] aria-label sur tous les boutons icones, alt sur toutes les images.
- [ ] [IMPORTANT] Roles ARIA sur les composants custom (modals, dropdowns, toasts).

## 4.3 Responsive & Mobile
- [ ] [CRITIQUE] Valider l interface facilitateur sur tablette (usage frequent en salle).
- [ ] [CRITIQUE] Valider l interface participant sur mobile (smartphone en seance).
- [ ] [IMPORTANT] Touch targets >= 44px sur tous les elements interactifs.
- [ ] [IMPORTANT] Tester sur iOS Safari (comportements viewport specifiques).

## 4.4 Experience Utilisateur Cle
- [ ] [CRITIQUE] Onboarding facilitateur : flow guide (creer session -> ajouter participants -> lancer challenge) en moins de 3 minutes.
- [ ] [CRITIQUE] Messages d erreur lisibles par un humain en prod (pas de stack trace, pas de Internal Server Error brut).
- [ ] [CRITIQUE] Feedback toasts : confirmer chaque action utilisateur (sauvegarde, envoi, suppression).
- [ ] [IMPORTANT] Page 404 personnalisee et utile.
- [ ] [IMPORTANT] Page erreur 500 personnalisee.
- [ ] [IMPORTANT] Indicateur de position dans le flow session builder (etapes / breadcrumb).
- [ ] [POST-MVP] Tableau de bord analytique facilitateur (resultats par session, taux de participation).

---

# 5. CHALLENGES

> Regle generale : quand la session n est pas encore lancee par le facilitateur, les participants ne peuvent pas rejoindre. A valider sur chaque challenge.

## 5.1 Mission Critique
- [ ] [BLOQUANT] Bug : clic sur Demarrer ne declenche rien — investiguer et corriger.

## 5.2 Vrai ou Mensonge
- [ ] [BLOQUANT] Bug : clic sur Demarrer sans effet — corriger.

## 5.3 Phrase Mystere
- [ ] [IMPORTANT] Config challenge : selection d une phrase via dropdown (UX coherente).

## 5.4 Labyrinthe
- [ ] [IMPORTANT] Permettre a un participant de voir la progression de l autre et reprendre la ou il s est arrete.

## 5.5 Copuzzle
- [ ] [CRITIQUE] Config (session builder) : supprimer les 3 images affichees en permanence — afficher uniquement la premiere par defaut, choix via dropdown. Sans regression.
- [ ] [CRITIQUE] Ajouter un espacement entre l image selectionnee et le champ suivant.
- [ ] [IMPORTANT] Vue facilitateur : regle afficher/masquer l image du puzzle.
- [ ] [IMPORTANT] Vue facilitateur : reduire la hauteur de la vue.
- [ ] [IMPORTANT] Vue participant : reduire les sauts de ligne dans le texte des regles.

## 5.6 Salle Secrete
- [ ] [POST-MVP] Definir les regles fonctionnelles et implementer.

## 5.7 Pixel Architect
- [ ] [CRITIQUE] Valider que la migration 20260528124500 s execute correctement en Railway dev apres fix 4ad0c3b.
- [ ] [POST-MVP] Implementer la logique moteur pixel_architect_v1.

## 5.8 Gestion generale des challenges
- [ ] [CRITIQUE] Interface facilitateur : permettre d ajouter et retirer des challenges dans une session.
- [ ] [IMPORTANT] Indicateur de statut challenge (actif, termine, en attente) dans la vue facilitateur.

---

# 6. PAIEMENT & MONETISATION

- [ ] [CRITIQUE] Definir les offres (Free / Pro / Enterprise) et leurs limites (sessions, participants, challenges).
- [ ] [CRITIQUE] Integrer Stripe (Checkout ou Elements) pour paiement mensuel/annuel.
- [ ] [CRITIQUE] Webhooks Stripe : activer/desactiver compte selon statut abonnement.
- [ ] [IMPORTANT] Page pricing claire (comparatif offres, CTA fort).
- [ ] [IMPORTANT] Portail client Stripe pour gestion autonome des abonnements.
- [ ] [IMPORTANT] Factures automatiques envoyees par email.
- [ ] [POST-MVP] Essai gratuit 14 jours sans CB.
- [ ] [POST-MVP] Gestion des coupons et codes promo.

---

# 7. EMAIL & NOTIFICATIONS

- [ ] [CRITIQUE] Mettre a jour SMTP_FROM_NAME de TEAMSPARK vers TeamBlender dans Railway (dev + prod) et dans .env / .env.example.
- [ ] [CRITIQUE] Email d invitation participant : design HTML branded TeamBlender, lien de connexion direct.
- [ ] [CRITIQUE] Email de confirmation d inscription facilitateur.
- [ ] [IMPORTANT] Email post-session : resume des resultats envoye au facilitateur.
- [ ] [IMPORTANT] Email de relance si session creee mais jamais lancee (J+3).
- [ ] [POST-MVP] Notifications in-app temps reel (cloche, badge).

---

# 8. MARKETING & ACQUISITION

- [ ] [CRITIQUE] Landing page : proposition de valeur claire, benefices concrets, social proof, CTA principal.
- [ ] [CRITIQUE] SEO de base : title, meta description, og:image sur toutes les pages publiques.
- [ ] [IMPORTANT] Section Ressources (guide du team building efficace, use cases).
- [ ] [IMPORTANT] Temoignages / logos clients sur la landing page.
- [ ] [IMPORTANT] Formulaire de demande de demo (CRM ou email).
- [ ] [POST-MVP] Programme de parrainage facilitateur.
- [ ] [POST-MVP] Integration analytics privacy-first (Plausible ou PostHog).

---

# 9. CONFORMITE & LEGAL

- [ ] [CRITIQUE] Mentions legales completes (editeur, hebergeur, DPO).
- [ ] [CRITIQUE] CGU adaptees au SaaS B2B.
- [ ] [CRITIQUE] Politique de confidentialite RGPD conforme.
- [ ] [IMPORTANT] DPA (Data Processing Agreement) pour les clients entreprise.
- [ ] [IMPORTANT] Procedure de notification de breach RGPD (72h).

---

# 10. DETTE TECHNIQUE & NETTOYAGE

- [ ] [CRITIQUE] Archiver ou supprimer le dossier archive/ (code legacy frontend vanilla).
- [ ] [IMPORTANT] Nettoyer les migrations .disabled (supprimer ou activer proprement).
- [ ] [IMPORTANT] Standardiser les noms de colonnes DB (choisir entre camelCase et snake_case et uniformiser).
- [ ] [IMPORTANT] Supprimer les console.log de debug en production.
- [ ] [IMPORTANT] Ajouter eslint + prettier sur frontend-next et backend avec config partagee.
- [ ] [POST-MVP] Migrer les requetes Sequelize raw restantes vers les methodes ORM natives.

---

# 11. IDEES & ROADMAP POST-MVP

- [ ] [POST-MVP] Plateforme de developpement des soft skills par le jeu (modules progressifs).
- [ ] [POST-MVP] Niveaux de difficulte par challenge (Facile / Moyen / Difficile).
- [ ] [POST-MVP] Construire une ville en 3D (icograms).
- [ ] [POST-MVP] Completer des mots ou des phrases (challenge langue).
- [ ] [POST-MVP] Tableau de bord analytique RH (suivi competences equipe dans le temps).
- [ ] [POST-MVP] Mode asynchrone (challenge sans synchronisation temps reel).
- [ ] [POST-MVP] API publique pour integrations (Slack, Teams, Notion).
- [ ] [POST-MVP] White-label pour agences RH et cabinets de conseil.
