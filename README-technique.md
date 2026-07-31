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
