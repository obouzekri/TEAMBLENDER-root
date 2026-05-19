# TeamBlender - Note de stabilisation deploiement

Date: 09/05/2026
Perimetre: backend Railway + frontend Vercel (production)

## Resume executif

Oui, la plateforme est maintenant stable sur les points critiques verifies:
- Backend Railway accessible et sain (API test 200).
- CORS backend vers frontend Vercel valide (preflight login 200).
- Login admin en production valide (API 200 avec token, redirection UI vers /home).

## Incidents rencontres

### 1) Domaine/port backend Railway incoherent

Symptomes:
- Requetes vers le domaine public Railway en 502.
- API indisponible depuis Vercel.

Cause:
- Port cible du domaine public non aligne avec le port runtime de l'app Node.
- L'app ecoute sur 8080, mais la config reseau pointait ailleurs.

Resolution:
- Correction du port cible Public Networking sur 8080.
- Verification par appels HTTP + logs Railway.

Prevention:
- Verifier systematiquement le couple PORT runtime / target port domaine a chaque nouveau service.

### 2) URL backend obsolete dans le frontend

Symptomes:
- Login frontend en erreur CORS/connexion.
- Appels vers un ancien domaine Railway.

Cause:
- Variable NEXT_PUBLIC_API_BASE incoherente/cassee en production frontend.

Resolution:
- Mise a jour de NEXT_PUBLIC_API_BASE vers:
  https://TeamBlender-backend-qxe5-production.up.railway.app/api
- Redeploiement frontend production et validation du flux login.

Prevention:
- Matrice d'environnements documentee (dev/preview/prod) + check automatique avant release.

### 3) Echec auth backend mal interprete (500 + 401)

Symptomes:
- /api/auth/login renvoyait 500 par moments.
- Fallback participant renvoyait 401.

Causes:
- JWT_SECRET absent en production backend (cause racine du 500 auth).
- Quelques tests CLI envoyaient du JSON mal forme (bruit de diagnostic 400/500 supplementaire).

Resolution:
- Ajout JWT_SECRET dans les variables Railway production.
- Redemarrage service pour prise en compte immediate des variables.
- Normalisation defensive du hash dans auth.service pour limiter les crashes de comparaison.

Prevention:
- Gate de pre-deploiement sur variables critiques obligatoires.
- Script smoke post-deploiement pour login API.

### 4) Compte admin non synchronise avec le mot de passe attendu

Symptomes:
- Identifiants admin fournis non valides au debut.

Cause:
- Password effectif en base non aligne avec la valeur attendue.

Resolution:
- Reset admin via variable ADMIN_RESET_PASSWORD + redemarrage/deploiement.
- Validation login API puis UI (redirection /home).

Prevention:
- Procedure officielle de reset admin en production (runbook court).

## Etat final de stabilite (verifie)

- Railway backend: OK
  - GET /api/test -> 200
  - OPTIONS /api/auth/login (origin Vercel) -> 200
  - POST /api/auth/login admin -> 200 + token
- Vercel frontend: OK
  - Login UI admin valide
  - Redirection manager: /home?userId=1

## Lecons apprises

1. Un deploiement "vert" ne garantit pas la disponibilite si le routage reseau est faux.
2. Les variables d'environnement critiques doivent etre validees avant runtime.
3. Les erreurs backend doivent inclure un code clair et des logs exploitables.
4. Sans runbook commit/push/deploy/preview, les regressions de config sont frequentes.

## Actions recommandees (haute priorite)

1. Definir une checklist release obligatoire (backend + frontend).
2. Ajouter un smoke test auto post-deploiement (health, login, CORS).
3. Documenter une matrice d'environnements (dev, preview, prod) et leurs valeurs.
4. Bloquer le go-live si variables critiques absentes (JWT_SECRET, DATABASE_URL, API base frontend).
5. Standardiser le process de validation preview avant merge main.

## Definition de "stable" retenue ici

Stable = parcours critique login manager operationnel en production, backend joignable, CORS valide, et absence d'erreur bloquante sur les routes critiques testees.
