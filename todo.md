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
- [ ] [CRITIQUE] Politique de retention : brancher le script de purge des sessions inactives > 12 mois au scheduler Railway (script pret, branchement Railway a faire).
- [ ] [CRITIQUE] Completer et maintenir a jour les pages mentions legales et politique de confidentialite (infos editeur, hebergeur, contact RGPD).

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
- [ ] [IMPORTANT] Page pricing claire (comparatif offres, CTA fort).
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

### Verification
- [ ] [CRITIQUE] GTM Preview : ouvrir le site avec le mode Preview actif, verifier que `gtm.js` est charge et que les tags se declenchent.
- [ ] [CRITIQUE] GA4 DebugView (`analytcis.google.com` > Admin > DebugView) : verifier `page_view` et `cta_click` remontent en temps reel.
- Statut courant: verification GTM Preview/GA4 DebugView encore manuelle (non validee dans cette passe), alerte malware GTM toujours presente sur les versions publiees.
- Tentative du 06/06/2026 (agent): GTM accessible et conteneur publie visible, mais mode Preview non validable en session automatisee (interaction instable/bloquee).
- Tentative du 06/06/2026 (agent): GA4 ouvert, proprieté TeamBlender affiche "Aucune donnée reçue de votre site Web pour l'instant" (ID mesure G-29ZC13R2CM), DebugView non validé.

### RGPD / Consentement
- [ ] [IMPORTANT] ImplÃ©menter GTM Consent Mode v2 : bloquer les tags analytics tant que le consentement n est pas donne.

---

---

# 12. AUTHENTIFICATION & SOCIAL LOGIN

## 12.1 Actions manuelles restantes

- [ ] [CRITIQUE] Tester le flow Google OAuth en local avec un compte de test reel.
- [ ] [IMPORTANT] Verifier que les evenements PostHog `login_oauth` et `signup_oauth` remontent dans GA4 DebugView via GTM.

---

## Vision produit

TeamBlender vise Ã  devenir la plateforme de rÃ©fÃ©rence de team-building digital pour Ã©quipes hybrides, en combinant gamification, analytics RH et collaboration temps rÃ©el.


## Limitations actuelles

- Realtime partiellement hybride (polling + socket)
- Etat runtime non persistant (risque restart)
- Couverture tests limitÃ©e


Challenge: Lab d'innovation 

Multi-utlisateur ( 1 compte RH a plusieurs compte participant)


PHASE 1 — Ice Breaker (5 min)
Objectif : créer de la cohésion rapidement.
Exemples :

Trouver 3 points communs dans l’équipe
Créer un cri d’équipe
Définir un super pouvoir collectif
Score
+50 points bonus participation


Jeux de role

rajouter le nombre de joeurs dans les différents challenges 

Fait passer tout les challenges en revue et donne moi ton avis 

10u3y4bw1ayzs.js:1 Uncaught Error: Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
    at rX (10u3y4bw1ayzs.js:1:47213)
    at o6 (10u3y4bw1ayzs.js:1:88921)
    at iu (10u3y4bw1ayzs.js:1:98800)
    at sd (10u3y4bw1ayzs.js:1:138944)
    at 10u3y4bw1ayzs.js:1:133830
    at se (10u3y4bw1ayzs.js:1:133931)
    at s$ (10u3y4bw1ayzs.js:1:160495)
    at MessagePort.O (10u3y4bw1ayzs.js:1:8660)