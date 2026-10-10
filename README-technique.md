# README technique - TeamBlender

Ce document décrit l’état technique actuel du monorepo TeamBlender, avec un focus sur l’architecture, les composants principaux, les services et le fonctionnement opérationnel.

## 1. Vision technique

TeamBlender est une plateforme de team-building professionnelle avec :
- un frontend Next.js moderne pour les parcours manager, participant et session live ;
- un backend Node.js/Express avec Sequelize et Socket.io ;
- une base de données PostgreSQL utilisée en environnement cible ;
- une logique de challenges pilotée par un registre backend et un runtime frontend.

## 2. Architecture globale

### Frontend cible
- Dossier principal : [frontend-next](frontend-next)
- Framework : Next.js
- Rôle : interface manager, builder de sessions, suivi live, parcours participant

### Backend
- Dossier principal : [backend](backend)
- Stack : Node.js, Express, Sequelize, Socket.io
- Rôle : API métier, realtime, stockage, authentification, billing, email

### Monorepo
- Racine : [readme.md](readme.md)
- Documentation complémentaire : [docs/readme.md](docs/readme.md)

## 3. Composants principaux

### Frontend
- Pages principales :
  - [frontend-next/app/home/page.js](frontend-next/app/home/page.js)
  - [frontend-next/app/session-builder/SessionBuilder.js](frontend-next/app/session-builder/SessionBuilder.js)
  - [frontend-next/app/session-live/[sessionId]/SessionLiveClient.js](frontend-next/app/session-live/[sessionId]/SessionLiveClient.js)
  - [frontend-next/app/participant/page.js](frontend-next/app/participant/page.js)
- Composants partagés :
  - [frontend-next/components/AppNav.js](frontend-next/components/AppNav.js)
  - [frontend-next/components/ToastContainer.js](frontend-next/components/ToastContainer.js)
  - [frontend-next/components/Challenges](frontend-next/components/Challenges)
- Logique transverses :
  - [frontend-next/lib/api.js](frontend-next/lib/api.js)
  - [frontend-next/lib/config.js](frontend-next/lib/config.js)
  - [frontend-next/lib/socket.js](frontend-next/lib/socket.js)
  - [frontend-next/lib/useSessionState.js](frontend-next/lib/useSessionState.js)

### Backend
- Point d’entrée principal : [backend/app.js](backend/app.js)
- Serveur temps réel : [backend/server.js](backend/server.js)
- Modèles de données : [backend/src/models](backend/src/models)
- Routes métier : [backend/src/routes](backend/src/routes)
- Services transverses : [backend/src/services](backend/src/services)
- Middlewares : [backend/src/middlewares](backend/src/middlewares)

## 4. Gestion des challenges

Les challenges sont intégrés via un modèle de runtime commun :
- wrapper frontend : [frontend-next/components/Challenges/ChallengeWrapper.js](frontend-next/components/Challenges/ChallengeWrapper.js)
- dispatcher runtime : [frontend-next/lib/challenges/runtime.js](frontend-next/lib/challenges/runtime.js)
- hook realtime : [frontend-next/lib/challenges/useRealtimeChallenge.js](frontend-next/lib/challenges/useRealtimeChallenge.js)
- registre backend : [backend/src/challenges/registry/challenge-registry.js](backend/src/challenges/registry/challenge-registry.js)

Challenges actuellement présents dans le parcours principal :
- Escape Room
- Phrase Mystère
- CoPuzzle
- Labyrinthe Live
- Mission Critique
- Vrai ou Mensonge
- Pixel Architect

## 5. Données et stockage

### Base de données
- Système : PostgreSQL via Sequelize
- Initialisation et connexion : [backend/src/models/index.js](backend/src/models/index.js)

### Contexte et gestion des participants de session
- La migration [20261010-add-session-planning-context.js](backend/migrations/20261010-add-session-planning-context.js)
  ajoute `expected_participant_count` et `objective`, facultatifs et persistants.
- La migration [20261010193000-session-participant-exclusions.js](backend/migrations/20261010193000-session-participant-exclusions.js)
  persiste les exclusions. Les migrations doivent être appliquées avant
  l'utilisation de ces fonctionnalités ; le script de démarrage backend
  exécute `sequelize-cli db:migrate`.
- Le générateur [sessionProgram.mjs](frontend-next/lib/sessionProgram.mjs)
  propose uniquement des challenges actifs exécutables, selon l'objectif,
  les plages de participants connues et la durée cible. Le serveur continue
  de valider les challenges et les conditions réelles de lancement.
- Les tests frontend ciblés sont `npm run test:unit:builder`,
  `npm run test:ux:planning` et `npm run test:ux:builder`.
  Les tests UX utilisent des réponses API simulées, sur le frontend local.

### Modèles métier principaux
- [backend/src/models/user.model.js](backend/src/models/user.model.js)
- [backend/src/models/participant.model.js](backend/src/models/participant.model.js)
- [backend/src/models/session.model.js](backend/src/models/session.model.js)
- [backend/src/models/challenge.model.js](backend/src/models/challenge.model.js)
- [backend/src/models/pricing-plan.model.js](backend/src/models/pricing-plan.model.js)
- [backend/src/models/promo-code.model.js](backend/src/models/promo-code.model.js)

### Stockage client
Le frontend utilise encore localStorage et sessionStorage pour certains contextes utilisateur, notamment :
- jwt
- currentUser
- targetSessionId
- sessionId
- selectedChallenges

### Stockage runtime
Les états de room challenge sont gérés en mémoire dans le process backend pour le realtime.

## 6. Fonctionnalités techniques transverses

### Authentification et sécurité
- Auth backend et routes associées
- Middleware d’authentification et contrôle d’accès

### Paiement
- Routes billing : [backend/src/routes/billing.route.js](backend/src/routes/billing.route.js)
- Plans et promos : [backend/src/routes/pricing-plan.route.js](backend/src/routes/pricing-plan.route.js) et [backend/src/routes/promo-code.route.js](backend/src/routes/promo-code.route.js)
- Logique Stripe ou fallback manuel selon configuration

### Emails
- Service d’envoi : [backend/src/services/email.service.js](backend/src/services/email.service.js)
- Notifications : [backend/src/services/email-notifications.service.js](backend/src/services/email-notifications.service.js)

## 7. Déploiement et environnement

### Frontend
- Déploiement ciblé : Vercel
- Configuration : [frontend-next/vercel.json](frontend-next/vercel.json)

### Backend
- Déploiement ciblé : Railway
- Processus racine : [Procfile](Procfile)

### Variables d’environnement
Le fonctionnement dépend de la configuration des variables liées à :
- base de données
- Stripe
- email / SMTP / Brevo
- CORS et domaines autorisés

## 8. Démarrage local

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend-next
npm install
npm run dev
```

### URLs locales
- Frontend : http://localhost:3100
- Backend API : http://localhost:3000/api
- Health : http://localhost:3000/health

## 9. État actuel

L’architecture actuelle est fonctionnelle pour un MVP SaaS orienté sessions live, challenges collaboratifs et gestion facilitateur/participant. La cible produit active reste le frontend Next.js, tandis que le frontend vanilla legacy est retiré du dépôt comme référence historique.
# Crossword Live

- Engine: `crossword_live_v1`, using the existing registry, runtime dispatcher,
  session builder and Socket.IO challenge event envelope.
- The server resolves authenticated identity and session access for crossword
  joins/actions; client configuration and claimed role are not authoritative.
- `CrosswordRuntimes` stores the private game state and absolute server deadline.
  PostgreSQL row locks serialize word attribution across connections/processes.
  Hidden answers are loaded from the server library and never included in public
  grid/configuration payloads.
- Terminal results are written transactionally to `ChallengeResult`, including
  individual word scores, solved words and collective completion. Crossword result
  mutation through participant REST endpoints is rejected.
- Run migrations through the existing migration workflow before serving the new
  engine; the catalog migration adds the challenge without replacing existing rows.
- Validate all bilingual layouts with `cd backend` then `npm run crossword:validate`.
  Run focused backend tests with `npm test -- --runInBand crossword`.
- Frontend checks: `npm run test:ux:crossword` (real global theme tokens,
  keyboard/input flows, light/dark contrast and mobile overflow) and
  `npm run test:unit:session-locale`. The UX harness substitutes shared wrappers;
  it is not a substitute for a real five-participant playtest.
- Content is original project-authored material. Automated layout validation does
  not substitute for human clue/difficulty review and a five-player playtest.
