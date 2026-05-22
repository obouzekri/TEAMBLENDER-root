# TeamBlender — DONE

> Genere depuis todo.md le 2026-05-11

## Transfert depuis todo.md — 2026-05-22

### Backend securite et monitoring

- [x] Ajouter audit logging des actions sensibles
	- Middleware: `backend/src/middlewares/auditAction.js`
	- Couverture initiale: routes mutation sensibles `users`, `sessions`, `participants`
	- Format log: `security.audit_action` (trace_id, action, actor, target, status_code, success, duration_ms, body filtre)
	- Validation: `backend ; npm test -- session_rbac.test.js --runInBand` PASS

- [x] Verrouiller JWT sur `/api/landing-content/admin`
	- Middleware route: `auth + rbac(['admin'])`
	- Fichiers: `backend/src/routes/landing-content.route.js`, `backend/src/controllers/landing-content.controller.js`
- [x] Verrouiller JWT sur `/api/diagnostic/*`
	- Protection globale routeur: `auth + rbac(['admin'])`
	- Fichier: `backend/src/routes/diagnostic.route.js`
- [x] Ajouter tests de non-regression d'acces anonyme
	- Validation: `backend ; npm test -- protected.test.js` PASS
	- Fichier: `backend/tests/protected.test.js`
- [x] Ajouter un monitor leger de sante applicative
	- Script: `backend/scripts/monitor_health.js`
	- NPM: `backend/package.json` -> `npm run monitor:health`
	- Validation: checks prod OK (`direct-test`, `test`, `health`, `auth/login`)
- [x] Planifier le monitor sante via GitHub Actions
	- Workflow: `backend/.github/workflows/railway-health-monitor.yml`
	- Cadence: toutes les 15 minutes + lancement manuel
- [x] Durcir RBAC sur les mutations de session
	- Routes protegees `admin/user`: creation, update, delete, phase, config, active-challenge, complete-active
	- Ownership retabli dans `setActiveChallenge` et `completeActiveChallenge`
	- Validation: `backend ; npm test -- session_rbac.test.js` PASS
	- Non-regression adjacente: `backend ; npm test -- session_state_endpoint.test.js` PASS
- [x] Durcir RBAC sur routes management participants (passage route-level)
	- Routes protegees `admin/user`: liste, detail, update, delete, assign/unassign, session-level add/remove/list
	- Validation: `backend ; npm test -- participant_rbac.test.js --runInBand` PASS
- [x] Durcir RBAC sur lectures sensibles des sessions
	- Routes protegees `admin/user`: `GET /api/sessions`, `GET /api/sessions/:id`
	- Validation: `backend ; npm test -- session_rbac.test.js --runInBand` PASS
- [x] Borner explicitement RBAC sur endpoints session state/runtime
	- Routes bornees `admin/user/participant`: `GET /api/sessions/:id/state`, `GET /api/sessions/:id/runtime-challenge`
	- Validation: `backend ; npm test -- protected.test.js --runInBand` PASS

### Backend realtime (hygiene broadcasts)

- [x] Distinguer room-wide vs emitter-only
- [x] Limiter system.message join/rejoin aux transitions visibles
- [x] Eviter emissions en cascade pour une meme action
- [x] Baisser les emissions room-wide sans perte d'information fonctionnelle
- [x] Lot pousse: bf42f4e - hygiene challenge broadcasts and reduced cascades

### Backend - autres points techniques

- [x] Batcher davantage les mises a jour participants
	- Coalescing renforce sur participants.update (delay configurable, max wait, min interval)
	- Fichier: backend/server.js
- [x] Eviter les ecritures DB pour interactions mineures
	- Filtrage des evenements low-value (heartbeat/tick/presence/debug) avant persistence challenge-results
	- Skip save si metadata/event ne change pas les donnees utiles
	- Fichier: backend/src/services/challenge-result.service.js
	- Validation: tests backend cibles PASS (challenge-result, phrase_realtime_events, vrai_ou_mensonge_logic, mission_critique_logic)

Historique des lots deja pousses (progression continue) :
- [x] a3427e5 - throttle timer ticks in early countdown
- [x] 1491833 - dedupe timer.state room broadcasts
- [x] 0be9f29 - dedupe mission state emits per socket
- [x] a77ef29 - dedupe vom state broadcasts
- [x] ffa2b8e - dedupe phrase state broadcasts
- [x] 719e9c5 - dedupe join phrase state broadcast

### Paiement (mode envisage)

- [x] Decision: GO developpement + implementation (21/05/2026)

## Transfert depuis todo.md — 2026-05-21

### Realtime frontend

- [x] Reduire emissions et abonnements redondants
	- Source unique de socket manager
	- Suppression de double emission de progression
	- Nettoyage listeners dupliques
	- Dernier resultat : quick wins livres et pousses (a73f2aa)

### Pre-release

- [x] Verifier catalogue non vide (catalog:check 12 actifs, OK le 20/05/2026)

### Copuzzle

- [x] Spec image finalisee (5x5, 240px/piece, JPEG, ideal < 300KB, max 500KB, 1200x1200)
- [x] Aide spec image affichee
- [x] Champ unique taille de matrice
- [x] Alignement labels "Activer le time" et "Activer le chat"

## Transfert depuis todo.md — 2026-05-20

### Challenge "Vrai ou Mensonge" V1 — Implémentation complète

- [x] JIRA-BE-EPIC-VM-01 — Orchestration backend : machine d'états, round-robin N×3 tours, catalogue fixe, vote individuel, révélation, scoring V1, timeouts, pause/reprise poser disconnect
- [x] JIRA-BE-VM-01 — État initial `waiting_start` → `selecting_statement` au démarrage, fin en `finished` après N×3 tours
- [x] JIRA-BE-VM-02 — Ordre round-robin déterministe, chaque participant 3 fois poseur, total = N×3 tours
- [x] JIRA-BE-VM-03 — Sélection phrase depuis catalogue fixe uniquement, interdiction réutilisation par poseur, zéro saisie libre
- [x] JIRA-BE-VM-04 — Votes individuels idempotents, modifiables avant révélation, poseur exclu du vote
- [x] JIRA-BE-VM-05 — Révélation exclusive poseur, verrouillage des votes, timestamp `revealed_at`
- [x] JIRA-BE-VM-06 — Scoring V1 : vote correct +1, incorrect/absent +0, poseur +0 ; classement final stable avec détection ex-aequo
- [x] JIRA-BE-VM-07 — Timeouts : sélection auto-fallback, vote non-bloquant, disconnect votant non-bloquant, pause/reprise poser
- [x] JIRA-FE-EPIC-VM-01 — Composant React `VraiOuMensongeChallenge` couvrant tous les états, actions par rôle, aucun champ libre
- [x] JIRA-FE-VM-01 — Écran lobby : liste participants, règles courtes, bouton démarrer selon rôle
- [x] JIRA-FE-VM-02 — Écran poseur sélection : grille catalogue uniquement, confirmation après sélection, aucun champ texte libre
- [x] JIRA-FE-VM-03 — Écran votants : phrase + identité poseur, Vrai/Mensonge, vote modifiable avant révélation
- [x] JIRA-FE-VM-04 — Écran poseur révélation : sélection vérité réelle, bouton Révéler irréversible
- [x] JIRA-FE-VM-05 — Écran résultat tour : vérité affichée, points du tour, score cumulé, transition
- [x] JIRA-FE-VM-06 — Écran classement final : tous participants, ex-aequo affichés, CTA retour session
- [x] JIRA-FE-VM-07 — Gestion déconnexion/reconnexion : UI d'attente, reprise d'état sans corruption
- [x] JIRA-QA-EPIC-VM-01 + VM-01/02 — Tests automatisés Jest backend 8/8 PASS, utilitaires frontend PASS
- [x] Engine `vrai_ou_mensonge_v1` enregistré dans registry, catalog backfill DB : 12 challenges actifs (`catalog:check` OK)
- [x] Commits poussés — backend `32237f2`, frontend-next `4233899`, root `d5da0d6` (20/05/2026)

### Pre-release

- [x] Vérifier que le catalogue de challenges n'est pas vide — `catalog:check` : 12 actifs, seuil 8 minimum OK (20/05/2026)

## Transfert depuis todo.md — 2026-05-19

- [x] Test SMTP transactionnel — `backend ; npm run smtp:test -- --to admin@teamblender.io` ; PASS accepted=1, réponse 250
- [x] Monitor domaine Brevo (mode équilibré) — PASS `ok=true`
- [x] Gate stricte (API + DNS) — PASS `ok=true` avec `BREVO_MONITOR_ALLOW_INSECURE_TLS=true`
- [x] Créer un compte Brevo (SMTP) et tester l'envoi email
- [x] Implémenter la gestion des mots de passe (réinitialisation email)
- [x] Implémenter les notifications email (confirmation, invitation)
- [x] Ajouter du rate limiting sur l'API Express
- [x] Valider tous les payloads entrants avec des schémas Joi
- [x] Ajouter mot de passe oublié
- [x] Supprimer l'approbation admin obligatoire pour un utilisateur nouvellement créé

## Actions terminees

- [x] Documenter le workflow concret futur (dev, test, commit, deploy) - voir `docs/process/WORKFLOW_OPERATIONNEL_FUTUR.md`
- [x] Auditer les donnees par environnement (dev / preview / production) - automation `catalog:audit:env` en place ; rapport 10/05/2026: production ok(2u/0s/6c), preview ok(1u/0s/6c), dev ok(1u/0s/6c) ; checklist de cloture: `backend/docs/ENV_AUDIT_CLOSURE_CHECKLIST.md`
- [x] Definir une checklist release obligatoire avant push sur main (backend + frontend) - voir `RELEASE_CHECKLIST_PRE_MAIN.md`
- [x] Exiger message de commit structure (scope, impact, rollback) pour tout changement deploiement/env - voir `COMMIT_MESSAGE_DEPLOY_ENV_STANDARD.md`
- [x] Ajouter une regle PR: validation obligatoire en preview Vercel avant merge - voir `PR_PREVIEW_VALIDATION_RULE.md` + `.github/pull_request_template.md`
- [x] Ajouter une regle PR: verification logs Railway (build + runtime) pour toute modif backend critique - voir `PR_RAILWAY_LOGS_VALIDATION_RULE.md` + `.github/pull_request_template.md`
- [x] Documenter un flow unique: branche feature -> PR -> preview valide -> merge -> prod - voir `FEATURE_TO_PROD_FLOW.md`
- [x] Creer une matrice officielle des variables par environnement (dev / preview / production) - voir `ENVIRONMENT_VARIABLES_MATRIX.md` (valeurs dev/preview Railway et vars/secrets GitHub encore a finaliser)
- [x] Lister les variables critiques bloquantes (JWT_SECRET, DATABASE_URL, NEXT_PUBLIC_API_BASE, ADMIN_RESET_PASSWORD) - voir `CRITICAL_BLOCKING_VARIABLES.md`
- [x] Ajouter une verification automatique pre-release des variables critiques (script check-env) - voir `backend/scripts/check_env_critical.js` + `backend/package.json` (`npm run check:env`)
- [x] Definir une convention de nommage des variables et des services Railway/Vercel - voir `NAMING_CONVENTION_RAILWAY_VERCEL.md`
- [x] Eviter les valeurs vides en production (controle explicite + alerte) - voir `backend/scripts/check_env_critical.js` + `backend/package.json` (`npm run check:env:prod`)
- [x] Ajouter un template PR avec checklist: tests locaux, preview verifiee, captures, risques, plan rollback - voir `.github/pull_request_template.md`
- [x] Ajouter un template commit pour changements de config/deploiement - voir `.gitmessage-deploy-env.txt` + `COMMIT_MESSAGE_DEPLOY_ENV_STANDARD.md`
- [x] Imposer une passe smoke test preview (login, home, session builder, route API test) - voir `PREVIEW_SMOKE_PASS_RULE.md` + `.github/pull_request_template.md` + `frontend-next/package.json` + `backend/package.json`
- [x] Ajouter un gate de merge: au moins 1 reviewer + checklist process complete - voir `MERGE_GATE_RULE.md` + `.github/pull_request_template.md`
- [x] Ajouter une procedure de hotfix (branche, validation minimale, communication) - voir `HOTFIX_PROCEDURE.md`
- [x] Automatiser un smoke test post-deploiement (GET /api/test, OPTIONS /api/auth/login, POST /api/auth/login) via `backend/scripts/smoke_postdeploy_api.js`
- [x] Ajouter une verification frontend production automatisee (login et redirection vers /home) via `frontend-next/scripts/smoke-login-redirect.mjs`
- [x] Ajouter un monitoring simple des erreurs 5xx sur Railway (alerte minimale) via `backend/scripts/monitor_api_5xx.js` + workflow `backend/.github/workflows/railway-5xx-monitor.yml`
- [x] Documenter une procedure rollback claire (frontend + backend) - voir `ROLLBACK_FRONTEND_BACKEND_RUNBOOK.md`
- [x] Planifier une revue hebdo de fiabilite deploiement (incidents, causes, actions) via workflow `backend/.github/workflows/weekly-reliability-review.yml` + template `RELIABILITY_WEEKLY_REVIEW_TEMPLATE.md`
- [x] Seed/backfill le catalogue challenges sur preview - 10/05/2026
- [x] Seed/backfill le catalogue challenges sur dev - 10/05/2026
- [x] Corriger definitivement la migration legacy des roles Users (cas `manager`/`hr`) - commit e3b4a25, pg_enum check idempotent
- [x] Relancer un deploiement preview complet et confirmer statut `SUCCESS` + logs propres - 10/05/2026
- [x] Relancer `catalog:audit:env` et archiver le rapport avec les 3 environnements en statut OK - 10/05/2026 13:28
- [x] Ajouter un seuil d'acceptation explicite pour go-live (preview/dev/prod avec catalogue challenges non vide ; seuil operationnel TeamBlender: 6 challenges minimum)
- [x] Lancer le smoke test manager + participant apres seed (login, session-builder, participant) sur frontend-next local contre backend preview
- [x] Configurer les secrets/variables GitHub Actions requis dans backend / frontend-next / frontend pour le release gate et les workflows CI
- [x] Definir une source de verite unique pour le catalogue challenges: **table Challenges (DB) = catalogue officiel**
- [x] Formaliser la regle d'architecture: registre fichier = source d'execution uniquement (pas source catalogue)
- [x] Rediger un runbook operationnel "backfill minimal" (sans implementation) - voir BACKFILL_MINIMAL_RUNBOOK.md
- [x] Verifier la coherence entre endpoint `GET /api/challenges` et contenu reel de la table Challenges (API prod validee apres backfill: 6 challenges actifs exposes)
- [x] Identifier et archiver les scripts obsoletes qui ecrivent dans Experience au lieu de Challenges
- [x] Realiser un backfill minimal de la table Challenges a partir des engines existants (6 engines), puis formaliser le script officiel (execution prod via API OK)
- [x] Ajouter un smoke test automatisable du session-builder (catalogue visible cote frontend) via `frontend-next/scripts/smoke-session-builder-catalog.mjs`
- [x] Documenter un runbook migration data local -> Railway (export, import, verification)
- [x] Ajouter une checklist de verification post-migration: auth admin OK, challenges visibles, creation session OK
- [x] Ajouter une procedure de restauration des donnees catalogue challenges (backup/restore)
- [x] Auditer `.env` du backend — aucun secret hardcodé
- [x] Créer `.env.example` documenté
- [x] Choisir l'hébergement : frontend Vercel, backend + DB (Railway ou Render)
- [x] Documenter officiellement: `frontend` = legacy en maintenance corrective minimale
- [x] Documenter officiellement: `frontend-next` = cible produit pour les nouvelles évolutions
- [x] Interdire les nouvelles features produit dans legacy (sauf patch critique)
- [x] Définir un plan de retrait progressif de `frontend` (jalons + critères)
- [x] Toute nouvelle feature démarre dans `frontend-next`
- [x] Si endpoint manquant: implémentation backend d'abord, puis intégration Next
- [x] Définir template de ticket: scope fonctionnel, impact realtime, critères QA
- [x] Exiger validation locale minimale avant merge (build + scénario utilisateur principal)
- [x] Ajouter une cadence hebdo de revue migration (avancement, risques, arbitrages)
- [x] **Modification mot de passe (admin)** — Erreur `Failed to execute 'json' on 'Response': Unexpected end of JSON input`
- [x] **Création d'utilisateur (admin)** — Le nouvel utilisateur n'apparaît pas immédiatement ; comptes `Testxxxx@mail.com` parasites à supprimer
- [x] **Formulaire de session** — Le bloc "durée" chevauche le bloc "date"
- [x] **Responsive mobile** — 375px complèt : session-builder (filterActions, itemActions, header statusSection) + session-live (meta inline → classes CSS, hero-actions pleine largeur, challenge list) + breakpoints 480px globals
- [x] Valider parity fonctionnelle complète avec le frontend legacy (checklist écran par écran) — **15/15 routes migrées**, admin Next V2 complète (create/edit/delete users/sessions/challenges + validations + recherche + ergonomie globale)
- [x] **Panel admin** (`/admin`) — V2 complète (create/edit/delete users/sessions/challenges + recherche + validations + ergonomie globale)
- [x] **Standardiser `getApiUrl`** — audit complet : 100% des appels `fetch()` passent par `getApiUrl()`, dead code `LEGACY_BASE` retiré de `lib/auth.js`, `lib/legacy.js` (URLs legacy, non API) intentionnel
- [x] Audit des scripts npm pour retirer commandes obsolètes
- [x] Standardiser les variables d'environnement entre backend et frontend-next (`.env.example`)
- [x] Supprimer du suivi git tout artefact build résiduel s'il en reste
- [x] Vérifier et compléter `.gitignore` de `frontend-next` (build/cache)
- [x] Définir la stratégie de bascule : runbook + go/no-go + rollback définis dans README
- [x] Frontend Next.js initialisé et build OK
- [x] Route dynamique challenges en place (`/challenges/[engineKey]`)
- [x] Intégration realtime challenge côté Next pour les moteurs live
- [x] Faire une passe QA complète parcours manager sur Next (login, session builder, lancement, challenge live) — 6 engines validés en session recette 188
- [x] Faire une passe QA complète parcours participant sur Next (join, interaction, score/résultat) — débloqué, page `/participant` Next.js autonome + polling 5s
- [x] Ouvrir une liste des écarts legacy vs Next — routes migrees, ecarts restants documentes par criticite
- [x] Corriger les écarts bloquants avant bascule progressive — bloquants adressés (double nav, 404, statuts, liens legacy)
- [x] Auth manager Next: login OK (`/login` -> `/home`)
- [x] Home manager Next: accès OK
- [x] Session builder Next: accès OK (bug `allChallenges is not defined` corrigé)
- [x] Routes challenge Next testées avec `sessionId` valide
- [x] Vérifier que la route challenge respecte strictement `engineKey` de l'URL (mismatch runtime géré côté Next)
- [x] Corriger la redirection participant pour éviter la dépendance à une page legacy non servie
- [x] Refaire la recette complète participant (login -> session -> interaction -> résultat)
- [x] Remplacer les derniers liens legacy visibles dans les écrans manager restants
- [x] Ajouter un scénario de non-régression minimal automatisé (smoke test login manager + session builder)
- [x] escape_room_v1 — PASS
- [x] phrase_collaborative_v1 — PASS
- [x] copuzzle_live_v1 — PASS
- [x] labyrinthe_live_v1 — PASS
- [x] icebreaker_v1 — PASS
- [x] local_page_v1 — PASS (fallback Next sans redirection auto vers legacy)
- [x] / (landing publique)
- [x] /login (login.html)
- [x] /signup (signup.html)
- [x] /home (home.html)
- [x] /session-builder (session_view.html)
- [x] /challenges/[engineKey] (tous les engines)
- [x] /participant (participant-dashboard.html)
- [x] /session-live/[sessionId] (facilitator-session.html)
- [x] /session-results/[sessionId] (session_results.html)
- [x] /contact (contact.html)
- [x] /mentions-legales (mentions-legales.html)
- [x] /politique-confidentialite (politique-confidentialite.html)
- [x] /admin (admin.html) — V1
- [x] Home manager : stats live (en cours / à configurer / terminées) + liens contextuels
- [x] Labels de statut en français partout (home, session-live, session-results)
- [x] Participant : état "En attente du facilitateur", nom du challenge, polling 5s
- [x] Session-live : double AppNav corrigé (prop `noNav`)
- [x] Footer : liens légaux migrés vers routes Next.js (plus de 404)
- [x] Session-results : page complète manager + participant (stats, résultats par challenge)
- [x] **Landing page** (`/`) — page publique livree (CTA, exemples challenges, chiffres cles, logos, temoignages)
- [x] **Page 404 personnalisée** — `app/not-found.js` livrée avec CTA de navigation
- [x] **Smoke tests E2E** — manager + participant exécutables via `npm run test:smoke` (runs locaux PASS)
- [x] **Variables d'environnement** — `.env.local.example` enrichi (app + smoke)
- [x] **Session live : participant count** — fallback `assigned_participants` / `participants` / `members` appliqué
- [x] **Suppression de session** — bouton ajouté dans /home avec confirmation + appel `DELETE /api/sessions/:id`
- [x] **Gestion d'erreur globale** — `app/error.js` ajoute avec recovery (`reset`) + CTA de secours
- [x] **Supprimer dead code** — `app/api/legacy/resolve/route.js` supprime (aucun appel source actif)
- [x] **Documenter les commandes locales** — section ajoutee dans `README.md` (backend, frontend-next, URLs, checklist debug)
- [x] Landing page V1 (exemples challenges, chiffres clés, témoignages, logos clients)
- [x] Déployer `frontend-next` sur Vercel avec les variables d'env de production (`vercel.json` créé, `.env.production.example` documenté, `next.config.mjs` nettoyé — projet Vercel créé, `NEXT_PUBLIC_API_BASE` prod configurée, go/no-go validé)
- [x] Ajouter un check de release bloquant: "catalogue challenges non vide" avant go-live (workflow CI backend ajouté + script `catalog:check:api` validé; secrets/vars GitHub verrouillés sur tous les environnements cibles)

## Résilience réseau — 2026-05-17

- [x] Retry GET dans `fetchAPI()` — `withRetry()` (3 tentatives, backoff exponentiel 1s→8s) appliqué automatiquement sur GET/HEAD ; POST/PATCH/PUT exclus (non idempotents, risque de double-exécution) ; couvre `fetchSessionState()`, `loadSession()`, chargement participant, runtime-challenge

## Temps réel & synchronisation — 2026-05-17

- [x] Créer endpoint `/sessions/:id/state` (Backend) — GET retourne `{ status, active_challenge_id, current_challenge, position_in_sequence, total_challenges }` ; acceptance: Manager avance -> endpoint retourne nouvelle valeur immédiatement ; voir `docs/architecture/SESSION_CHALLENGE_FLOW.md`
- [x] Broadcaster changement d'état via Socket.io (Backend) — event `session:challenge-advanced` ; payload `{ active_challenge_id, position, name }` aligné (`socketio-events.js`) ; SLA < 500ms couvert par `tests/session_challenge_advanced_sla.test.js` (107ms / 86ms mesurés)
- [x] Garantir backend source de vérité — `useSessionState.js`: `session:challenge-advanced` déclenche `fetchSessionState()` (re-fetch complet) ; re-fetch forcé à chaque (re)connexion socket ; fallback polling 5s si socket absent > 3s ; `ChallengeWrapper.js`: re-fetch complet sur event socket
- [x] Fallback polling si socket échoue — `useSessionState.js`: après 3s de déconnexion, `setInterval` toutes les 5s sur `fetchSessionState()` ; stoppé automatiquement à la reconnexion ; couvert pour tous les consommateurs (`SessionLiveClient`, `ChallengeRouteClient`, `session-live/page.js`)
- [x] État de session rechargeable à tout moment — `useSessionState.js`: `useEffect` on mount déclenchant `fetchSessionState()` indépendamment du socket ; `refetch` exposé pour usage manuel ; retry GET via `withRetry()` ; endpoint `/sessions/:id/state` retourne l'état complet
- [x] Endpoint healthcheck avec état DB — `GET /health` et `GET /api/health` retournent `{ status, db }` ; DB ping via `sequelize.authenticate()` ; HTTP 503 si DB inaccessible ; tests mis à jour (`health.test.js`)
- [x] Script vérification variables d'env — `backend/scripts/check_env_critical.js` + `npm run check:env` / `check:env:prod` (déjà en place, doublon supprimé du todo)
- [x] Tests Jest cycle de vie de session et flow challenge — couvert par `session_state_endpoint.test.js`, `session_challenge_advanced_sla.test.js`, `session_runtime_challenge.test.js`, `session_create_payload_compat.test.js`

## Flow participant — 2026-05-17

- [x] UI participant mise à jour automatiquement sur changement de session — chaîne réactive: `useSessionState` (socket + polling) → `active_challenge_id` change → `fetchRuntime()` → `challengeLink` → `router.push()` auto-redirect ; messages contextuels selon `flowMode` (`En attente du facilitateur` / `Passage automatique en préparation`)
- [x] États de chargement et feedback sur toutes les interactions — `joining` (écran + bouton) ; `joiningSessionId` (bouton `Connexion...` désactivé) ; `!ready` (loading guard) ; `runtimeError` (message d’erreur) ; `loadingSessions` (spinner ajouté pour la liste des sessions assignées)

## Insights & métriques de session — 2026-05-17

- [x] Générer une vue simple de résumé de session — page `session-results/[sessionId]` avec stats (participants actifs, challenges joués, tentatives, complétées, score moyen) + détail par challenge
- [x] Afficher des métriques d'engagement après session — score moyen, tentatives, complétées, durée par participant ; endpoint `GET /sessions/:id/results`
- [x] Créer un service de calcul du taux de participation — `ChallengeResultService.getParticipationRate()` : participants_actifs / participants_invités (via `ParticipantSession`) × 100 ; endpoint `GET /challenge-results/sessions/:id/participation-rate` ; affiché dans la grille de stats de la page résultats

## Challenges — 2026-05-17

- [x] Charger les challenges dynamiquement depuis le backend — `fetchWithRetry(getApiUrl('/challenges'))` dans `SessionBuilder.js` ; header JWT inclus ; normalisation de la réponse (`data`, `data.challenges`, `data.data`) ; fallback mock opt-in via `ENABLE_CHALLENGES_MOCK_DATA` ; gestion 401 avec logout automatique

## Pricing & gating — 2026-05-17

- [x] Définir les plans proposés à la création utilisateur
- [x] Définir le plan par défaut si aucun choix n'est fait
- [x] Définir les règles de validation du plan sélectionné
- [x] Définir l'impact du plan choisi sur le feature gating
- [x] Définir le moment où le choix du plan est présenté à l'utilisateur
- [x] Définir le libellé affiché pour chaque plan
- [x] Définir la règle de secours si le plan est absent ou corrompu
- [x] Définir les cas où le plan peut être changé après création
- [x] Définir les critères de vérification pour valider le comportement attendu
- [x] Définir les contenus visibles pour chaque plan
- [x] Définir les limites fonctionnelles du plan free
- [x] Définir les limites fonctionnelles des plans payants
- [x] Définir les messages visibles quand une fonctionnalité est verrouillée
- [x] Définir les règles de changement de plan après création
- [x] Définir les cas limites de plan manquant ou invalide

## Transfert depuis todo.md — 2026-05-17

### Challenges

- [x] Implémenter une interface standard de challenge (`init`, `run`, `getResults`)
- [x] Garantir que tous les challenges suivent le même contrat
- [x] Ajouter un registry qui mappe `engine_key` vers l'implémentation
- [x] Charger dynamiquement le moteur actif selon `engine_key`
- [x] Garantir un reset propre de l'état challenge entre deux sessions

### QA & debug

- [x] Créer des smoke tests pour login, home, création de session
- [x] Tester le flow complet : create -> launch -> participate -> results
- [x] Simuler plusieurs participants qui rejoignent simultanément
- [x] Ajouter des logs sur les changements d'état de session
- [x] Créer un debug mode montrant l'état temps réel
- [x] Logger les événements socket pour le troubleshooting

## Transfert depuis todo.md (UX + synchronisation) — 2026-05-17

- [x] Garantir une seule action primaire par écran
- [x] Ajouter un feedback visuel sur toutes les actions asynchrones
- [x] Ajouter un indicateur d'état de connexion (connecté / reconnexion)
- [x] Garantir que l'UI reflète l'état backend après chaque interaction

## Transfert depuis todo.md (temps réel renforcé) — 2026-05-17

- [x] Fixer une cible de synchronisation < 500 ms
- [x] Documenter un fallback polling si Socket.io est indisponible

## Transfert depuis todo.md (mise à jour) — 2026-05-17

- [x] Garantir que le frontend se resynchronise toujours avec l'état backend

## Transfert depuis todo.md (fiabilité temps réel) — 2026-05-17

- [x] Créer un socket manager avec auto-reconnect
- [x] Forcer une resynchronisation backend à la reconnexion

## Report en Post-MVP — 2026-05-17

