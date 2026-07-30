# TeamBlender - Documentation Produit et Technique (Etat Reel)

Plateforme professionnelle de team-building pour managers et RH.
Ce README decrit l'etat actuel du projet dans ce monorepo, avec focus sur ce qui est effectivement implemente et utile pour l'exploitation.

## 1. Description du projet

TeamBlender permet a un facilitateur (manager/admin) de:
- creer des sessions,
- assigner des participants,
- choisir et configurer des challenges,
- lancer la session en live,
- faire progresser les challenges,
- consulter les resultats.

Les participants rejoignent individuellement leurs sessions et sont rediriges automatiquement vers le challenge actif.

Architecture produit actuelle:
- Frontend cible: Next.js ([frontend-next](frontend-next))
- Backend API: Node.js/Express + Sequelize ([backend](backend))
- Legacy frontend vanilla retire du repository (historique disponible via Git)

## 2. Etat global du produit

- Cible active: [frontend-next](frontend-next)
- API centrale: [backend/app.js](backend/app.js)
- Realtime challenge: Socket.io sur [backend/server.js](backend/server.js)
- Source de verite catalogue challenges: table `Challenges` (DB)
- Moteurs challenges charges via registry backend + runtime frontend

## 3. Parcours Facilitateur (global)

### 3.1 Etapes UX actuelles
1. Authentification manager/admin.
2. Arrivee sur l'espace manager (home + navigation sessions/participants).
3. Creation/edition de session dans Session Builder.
4. Selection du catalogue challenges + configuration de chaque challenge.
5. Assignation des participants.
6. Lancement de session live.
7. Pilotage en live: challenge suivant, fin de session.
8. Consultation des resultats.
9. Gestion compte/offre depuis la page account.

### 3.2 Ecrans principaux
- Home manager: [frontend-next/app/home/page.js](frontend-next/app/home/page.js)
- Session Builder: [frontend-next/app/session-builder/SessionBuilder.js](frontend-next/app/session-builder/SessionBuilder.js)
- Session Live facilitateur: [frontend-next/app/session-live/[sessionId]/SessionLiveClient.js](frontend-next/app/session-live/[sessionId]/SessionLiveClient.js)
- Account / plan: [frontend-next/app/account/page.js](frontend-next/app/account/page.js)

## 4. Parcours Participant (global)

### 4.1 Etapes UX actuelles
1. Login participant.
2. Liste des sessions assignees.
3. Selection d'une session.
4. Salle d'attente si aucun challenge actif.
5. Redirection automatique vers le challenge actif.
6. Interaction en temps reel challenge (timer, chat, actions de jeu).

### 4.2 Ecran principal
- Page participant: [frontend-next/app/participant/page.js](frontend-next/app/participant/page.js)

## 5. Challenges: etat reel par challenge (facilitateur + participant)

## 5.1 Runtime challenge (socle commun)
- Wrapper runtime: [frontend-next/components/Challenges/ChallengeWrapper.js](frontend-next/components/Challenges/ChallengeWrapper.js)
- Dispatcher frontend des moteurs: [frontend-next/lib/challenges/runtime.js](frontend-next/lib/challenges/runtime.js)
- Hook realtime commun: [frontend-next/lib/challenges/useRealtimeChallenge.js](frontend-next/lib/challenges/useRealtimeChallenge.js)
- Registry backend des engines: [backend/src/challenges/registry/challenge-registry.js](backend/src/challenges/registry/challenge-registry.js)

## 5.2 Escape Room (`escape_room_v1`)
- Frontend: [frontend-next/components/Challenges/EscapeRoom/EscapeRoomChallenge.js](frontend-next/components/Challenges/EscapeRoom/EscapeRoomChallenge.js)
- Backend route dediee: [backend/src/routes/escape-room.route.js](backend/src/routes/escape-room.route.js)

Description actuelle:
- Mode REST (polling + actions), pas full Socket natif pour la logique coeur.
- Enigmes successives, validation de reponses, gestion des tentatives et etats de verdict.

UX facilitateur:
- Demarrage challenge.
- Pilotage de la progression et lecture des feedbacks d'equipe.

UX participant:
- Soumission de reponse,
- Feedback d'etat (attente, divergent, wrong, correct, escaped),
- Synchronisation periodique de l'etat.

## 5.3 Phrase Mystère (`phrase_collaborative_v1`)
- Frontend: [frontend-next/components/Challenges/PhraseCoop/PhraseChallenge.js](frontend-next/components/Challenges/PhraseCoop/PhraseChallenge.js)

Description actuelle:
- Reconstruction collaborative d'une phrase par slots,
- Repartition des mots par participant,
- Options de vision limitee, budget d'indices, chat.

UX facilitateur:
- Ecran de regles + bouton demarrer,
- Vue globale de progression,
- Supervision des slots et score d'avancement.

UX participant:
- Selection/drag&drop de mots,
- Placement sur ses slots autorises,
- Demande d'indice,
- Suivi timer/progression collective.

## 5.4 CoPuzzle (`copuzzle_live_v1`)
- Frontend: [frontend-next/components/Challenges/CoPuzzleLive/CoPuzzleChallenge.js](frontend-next/components/Challenges/CoPuzzleLive/CoPuzzleChallenge.js)

Description actuelle:
- Puzzle collaboratif sur grille configurable,
- Pieces assignees, placement/deplacement,
- Configuration image de reference (defaults/custom), timer, chat.

UX facilitateur:
- Demarrage et supervision,
- Visualisation progression globale.

UX participant:
- Manipulation des pieces assignees,
- Placement sur grille,
- Progression et timer visibles.

## 5.5 Labyrinthe Live (`labyrinthe_live_v1`)
- Frontend: [frontend-next/components/Challenges/LabyrintheLive/LabyrintheLive.js](frontend-next/components/Challenges/LabyrintheLive/LabyrintheLive.js)

Description actuelle:
- Labyrinthe temps reel avec vies,
- Cases revelees dynamiquement,
- Pieges/retours penalises,
- Etats individuels + debrief de fin.

UX facilitateur:
- Lancement, suivi progression d'equipe,
- Observation des etats participants.

UX participant:
- Deplacement cellule par cellule,
- Retours visuels (reveals/traps),
- Objectif sortie en preservant les vies.

## 5.6 Mission Critique (`mission_critique_v1`)
- Frontend: [frontend-next/components/Challenges/MissionCritique/MissionCritiqueChallenge.js](frontend-next/components/Challenges/MissionCritique/MissionCritiqueChallenge.js)

Description actuelle:
- Construction de timeline projet,
- Taches, dependances, phases (cadrage/preparation/execution/cloture),
- Score collectif et penalites.

UX facilitateur:
- Demarrage challenge,
- Supervision de l'ordonnancement,
- Lecture du score/resultat collectif.

UX participant:
- Drag&drop de taches,
- Validation du plan,
- Collaboration via chat.

## 5.7 Vrai ou Mensonge (`vrai_ou_mensonge_v1`)
- Frontend: [frontend-next/components/Challenges/VraiOuMensonge/VraiOuMensongeChallenge.js](frontend-next/components/Challenges/VraiOuMensonge/VraiOuMensongeChallenge.js)

Description actuelle:
- Tours successifs avec un poseur,
- Selection d'affirmation, vote, revelation, scoring,
- Phases explicites (`waiting_start`, `voting_open`, `round_result`, etc.).

UX facilitateur:
- Demarrage partie,
- Pilotage de phase et du reveal,
- Suivi classement.

UX participant:
- Vote vrai/mensonge,
- Feedback de tour,
- Score individuel + classement collectif.

## 5.8 Pixel Architect (`pixel_architect_v1`)
- Frontend: [frontend-next/components/Challenges/PixelArchitect/PixelArchitectChallenge.js](frontend-next/components/Challenges/PixelArchitect/PixelArchitectChallenge.js)
- Engine backend present dans le registry.

Description actuelle:
- Construction voxel 3D collaborative,
- Grille 3D, palette de couleurs, couches (layers),
- Modes replication/creatif selon config.

UX facilitateur:
- Demarrage challenge,
- Diffusion d'indices,
- Suivi progression globale.

UX participant:
- Placement/suppression/coloration de cubes,
- Navigation par niveau,
- Soumission finale de construction.

## 5.9 Engines presents backend mais non exposes comme parcours principal Next
- `icebreaker_v1`
- `local_page_v1`

Ils existent dans la registry backend, mais la cible produit active reste les parcours ci-dessus dans [frontend-next](frontend-next).

## 6. Donnees: stockage et emplacements

## 6.1 Stockage principal (persistant)
- PostgreSQL via Sequelize (Railway en hebergement cible).
- Connexion et bootstrap: [backend/src/models/index.js](backend/src/models/index.js)

Tables metier principales (modele actuel):
- `Users`, `Participants`, `Sessions`, `Challenges`
- `SessionChallenges`, `ParticipantSessions`
- `Teams`, `TeamChallenges`, `Members`, `SessionMembers`
- `ChallengeResults`, `ChallengeResponses`
- `PricingPlans`, `PromoCodes`
- `LandingContentBlocks`

Modeles de reference:
- [backend/src/models/user.model.js](backend/src/models/user.model.js)
- [backend/src/models/participant.model.js](backend/src/models/participant.model.js)
- [backend/src/models/session.model.js](backend/src/models/session.model.js)
- [backend/src/models/challenge.model.js](backend/src/models/challenge.model.js)
- [backend/src/models/pricing-plan.model.js](backend/src/models/pricing-plan.model.js)
- [backend/src/models/promo-code.model.js](backend/src/models/promo-code.model.js)

## 6.2 Stockage frontend local (client)
Utilisations observees:
- `localStorage`/`sessionStorage` pour auth et contexte utilisateur:
  - `jwt`
  - `currentUser`
  - `targetSessionId`
  - `sessionId`
  - `selectedChallenges`
  - `accountPlanChangeHistory`

Fichiers de reference:
- [frontend-next/app/participant/page.js](frontend-next/app/participant/page.js)
- [frontend-next/app/session-builder/SessionBuilder.js](frontend-next/app/session-builder/SessionBuilder.js)
- [frontend-next/app/account/page.js](frontend-next/app/account/page.js)

## 6.3 Stockage fichiers et journaux applicatifs
- Uploads statiques backend: [backend/uploads](backend/uploads) expose par [backend/app.js](backend/app.js)
- Logs de demandes Pro manuelles (NDJSON) ecrits a l'execution sous `backend/data/pro-upgrade-requests.ndjson`.

## 6.4 Etat runtime non persistant
- Etats realtime des rooms challenge en memoire process (`Map`) dans [backend/server.js](backend/server.js)

## 7. Paiement: existant et regles

Routes backend:
- Billing checkout/pro-request: [backend/src/routes/billing.route.js](backend/src/routes/billing.route.js)
- Plans tarifaires publics/admin: [backend/src/routes/pricing-plan.route.js](backend/src/routes/pricing-plan.route.js)
- Promo codes: [backend/src/routes/promo-code.route.js](backend/src/routes/promo-code.route.js)

Logique actuelle:
- Stripe Checkout abonnement si `STRIPE_SECRET_KEY` configure.
- Fallback manuel Pro request sinon (journalisation locale NDJSON).
- Calcul prix avec cycle mensuel/annuel + remise annuelle + promo code.
- Gating metier selon plan (ex: limites users/sessions selon plan) via service pricing.

Services/controleurs:
- [backend/src/controllers/billing.controller.js](backend/src/controllers/billing.controller.js)
- [backend/src/controllers/pricing-plan.controller.js](backend/src/controllers/pricing-plan.controller.js)
- [backend/src/controllers/promo-code.controller.js](backend/src/controllers/promo-code.controller.js)
- [backend/src/services/pricing-gating.service.js](backend/src/services/pricing-gating.service.js)

Etat reel important:
- Le socle paiement est present (plans, promos, checkout, fallback manuel).
- L'exploitation depend de la configuration Stripe et du parametrage des plans en DB.

## 8. E-mails: existant

### 8.1 Capacites actuelles
- Verification email utilisateur/participant.
- Reset mot de passe.
- Notification session participant.
- Endpoint de test admin SMTP/Brevo.

Fichiers:
- Route test email: [backend/src/routes/email.route.js](backend/src/routes/email.route.js)
- Service envoi SMTP/Brevo API: [backend/src/services/email.service.js](backend/src/services/email.service.js)
- Notifications applicatives: [backend/src/services/email-notifications.service.js](backend/src/services/email-notifications.service.js)

### 8.2 Regles techniques actuelles
- Priorite Brevo API si activee.
- Fallback SMTP possible selon variable `BREVO_API_FALLBACK_SMTP`.
- Validation config minimale SMTP (`SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_EMAIL`).

## 9. UI et UX actuelles

## 9.1 Charte graphique et design global
Socle visuel dans [frontend-next/app/globals.css](frontend-next/app/globals.css):
- Typographies: `var(--font-ui)` pour UI/contenu, `var(--font-display)` pour titres et mise en avant
- Challenges harmonises sur le token UI (`frontend-next/components/Challenges/`)
- Design tokens CSS variables (couleurs, rayons, ombres, motion)
- Navigation sticky premium (top-nav, etat compact/live)
- Style orientee SaaS moderne (surfaces, gradients, composants cartes)

## 9.2 UI (interface)
Composants communs visibles:
- Navigation et branding: [frontend-next/components/AppNav.js](frontend-next/components/AppNav.js), [frontend-next/components/Logo.js](frontend-next/components/Logo.js)
- Feedback utilisateur: [frontend-next/components/ToastContainer.js](frontend-next/components/ToastContainer.js)
- Challenges UI partages: timer/chat/rules panels dans [frontend-next/components/Challenges](frontend-next/components/Challenges)

## 9.3 UX (experience)
Patterns UX implementes:
- Realtime + fallback polling pour robustesse session state.
- Redirection automatique participant vers challenge actif.
- Flows explicites de session live (confirmation passage challenge, fin session, statuts).
- Gestion des etats async (chargement, reconnecting, erreurs, toasts).

Fichiers cle UX:
- [frontend-next/lib/useSessionState.js](frontend-next/lib/useSessionState.js)
- [frontend-next/app/session-live/[sessionId]/SessionLiveClient.js](frontend-next/app/session-live/[sessionId]/SessionLiveClient.js)
- [frontend-next/app/participant/page.js](frontend-next/app/participant/page.js)

## 10. Hebergement

## 10.1 Frontend
- Vercel (Next.js), configuration: [frontend-next/vercel.json](frontend-next/vercel.json)
- Rewrites frontend -> backend pour `/api`, `/uploads`, `/socket.io`.

## 10.2 Backend
- Railway (service Node).
- Commande process racine: [Procfile](Procfile)

## 10.3 Domaines et origins actifs (observe dans code)
- `teamblender.io` / `www.teamblender.io` autorises en CORS backend.
- Previews Vercel (`*.vercel.app`) autorisees.

Reference CORS/API:
- [backend/app.js](backend/app.js)

## 11. Base de donnees: contenu actuel (niveau fonctionnel)

Ce que le depot confirme aujourd'hui:
- Catalogue challenge supporte par engines:
  - `escape_room_v1`, `phrase_collaborative_v1`, `copuzzle_live_v1`, `labyrinthe_live_v1`, `mission_critique_v1`, `vrai_ou_mensonge_v1`, `pixel_architect_v1`
- Un catalogue data enrichi existe en support: [backend/data/challenge.data.js](backend/data/challenge.data.js)
- Un jeu historique minimal existe: [backend/data/challenge.json](backend/data/challenge.json)
- Plans tarifaires/promo codes modelises en DB et exposes par API admin/public.

Important:
- Le contenu exact des lignes en environnement (dev/prod) depend des migrations executees et des operations admin.
- La source de verite operationnelle des challenges visibles dans le builder reste la table `Challenges` en base.

## 12. Modules partages (reutilisables)

## 12.1 Frontend partages
- Core API/config/socket:
  - [frontend-next/lib/api.js](frontend-next/lib/api.js)
  - [frontend-next/lib/config.js](frontend-next/lib/config.js)
  - [frontend-next/lib/socket.js](frontend-next/lib/socket.js)
- Session/challenge hooks:
  - [frontend-next/lib/useSessionState.js](frontend-next/lib/useSessionState.js)
  - [frontend-next/lib/challenges/useRealtimeChallenge.js](frontend-next/lib/challenges/useRealtimeChallenge.js)
  - [frontend-next/lib/challenges/useChallengeChat.js](frontend-next/lib/challenges/useChallengeChat.js)
  - [frontend-next/lib/challenges/rules.js](frontend-next/lib/challenges/rules.js)
- Session builder:
  - [frontend-next/lib/useSessionBuilder.js](frontend-next/lib/useSessionBuilder.js)

## 12.2 Backend partages
- Middlewares transverses: auth, RBAC, rate limiting, audit action, request id.
- Services transverses: session, participant, pricing gating, email.
- Utilitaires realtime/socket events.

Exemples:
- [backend/src/middlewares](backend/src/middlewares)
- [backend/src/services](backend/src/services)
- [backend/src/utils/socketio-events.js](backend/src/utils/socketio-events.js)

## 13. API principale (resume utile)

Domaines principaux exposes sous `/api`:
- Auth: `/api/auth/*`
- Sessions: `/api/sessions/*`
- Participants: `/api/participants/*`
- Challenges catalogue: `/api/challenges/*`
- Challenge runtime/results/responses
- Pricing/Billing/Promo codes
- Email test admin
- Diagnostic/health

Route map source:
- [backend/app.js](backend/app.js)

## 14. Ce qui est volontairement exclu de ce README

Pour garder une documentation utile et pertinente:
- Les details historiques non necessaires au run quotidien.
- Les workflows legacy archives qui ne pilotent plus la cible produit.
- Les plans non implementes en code (roadmap future).

Roadmap restante:
- [todo.md](todo.md)
- [docs/done.md](docs/done.md)

## 15. Demarrage rapide

Backend:

```bash
cd backend
npm install
npm start
```

Frontend:

```bash
cd frontend-next
npm install
npm run dev
```

URLs locales:
- Frontend: `http://localhost:3100`
- Backend API: `http://localhost:3000/api`
- Health: `http://localhost:3000/health`
