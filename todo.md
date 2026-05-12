# TEAMSPARK — TODO Master

> Dernière mise à jour : 12/05/2026
> Objectif lancement MVP : fin juin / début juillet 2026
> Référence tâches terminées : `docs/done.md`

---

## Mode d'emploi

- `Maintenant` = ce qui débloque directement la bascule MVP.
- `Avant go-live` = indispensable avant ouverture réelle.
- `Prompts VS Code` = banque de formulation technique, séparée des tâches projet.

---

## Top priorities

- [ ] Boucler un flow complet : create session -> launch -> participant join -> play -> results
- [ ] Garantir une synchro temps réel fiable entre manager et participants
- [ ] Ajouter un fallback polling pour la résilience
- [ ] Créer un mode quick session en moins de 2 clics
- [ ] Atteindre au moins 8 challenges fonctionnels avec scoring de base

---

## Maintenant

### Infra & légal go-live

#### Legacy off (frontend archive)
- [ ] Valider la checklist `docs/checklists/LEGACY_FRONTEND_OFF_CHECKLIST.md` et confirmer `legacy OFF by default`

#### Identité & domaine
- [ ] Finaliser le logo de la plateforme
- [ ] Acheter un domaine (OVH ou Namecheap)
- [ ] Créer un compte Brevo (SMTP) et tester l'envoi email

#### Légal & RGPD
- [ ] Compléter les placeholders dans les pages légales
- [x] Vérifier que la suppression utilisateur supprime bien les données (`delete-user.js`)
- [ ] Ajouter une bannière cookies si de l'analytics est activé

### Temps réel & synchronisation
- [ ] Fixer une cible de synchronisation < 500 ms
- [ ] Documenter un fallback polling si Socket.io est indisponible

---

## Avant go-live

### Catalogue & qualité
- [ ] Atteindre 20 challenges fonctionnels et testés

### Fonctionnalités coeur
- [ ] Créer une session depuis un template ou une suggestion
- [x] Afficher la description du challenge pendant la configuration de session
- [ ] Implémenter la gestion des mots de passe (réinitialisation email)
- [ ] Implémenter les notifications email (confirmation, invitation)

### Landing page publique
- [ ] Ajouter les chiffres clés de la plateforme (nb challenges, nb utilisateurs)
- [ ] Ajouter une section logos clients / partenaires
- [ ] Ajouter une section témoignages

---

## Backlog d'idées produit

> Idées de nouveaux challenges : `docs/product/challenge-ideas-backlog.md`

---

## Prompts VS Code

### Backend

#### Structure & clean architecture
- [x] Créer une ApiError class pour standardiser les erreurs métier
- [ ] (POST-MVP) Refactoriser l'app Express pour déplacer toute la logique métier vers les services
- [ ] (POST-MVP) Créer une service layer pour le cycle de vie des sessions
- [ ] (POST-MVP) Ajouter un middleware centralisé de gestion d'erreurs avec bons statuts HTTP
- [ ] (POST-MVP) Ajouter un middleware `requestId` pour tracer les logs

#### Temps réel & synchronisation
- [ ] Créer endpoint `/sessions/:id/state` (Backend)
  - GET retourne: `{ status, active_challenge_id, current_challenge, position_in_sequence, total_challenges }`
  - Acceptance: Manager avance → endpoint retourne nouvelle valeur immédiatement
  - Doc: voir `docs/architecture/SESSION_CHALLENGE_FLOW.md`
- [ ] Broadcaster changement d'état via Socket.io (Backend)
  - Event: `session:challenge-advanced` quand active_challenge_id change
  - Payload: `{ active_challenge_id, position, name }`
  - Acceptance: Tous les clients connectés reçoivent < 500ms
  - Dépendance: endpoint `/sessions/:id/state` doit exister
- [ ] Socket manager avec auto-reconnect (Frontend)
  - Manager: auto-reconnect, buffering d'events, heartbeat
  - Écoute: `session:launched`, `session:challenge-advanced`
  - Acceptance: Disconnection → automatic reconnect < 3s
- [ ] Fallback polling quand Socket échoue (Frontend)
  - Si Socket disconnect > 3s: poll `/sessions/:id/state` toutes les 5s
  - Si reconnect: stop polling
  - Acceptance: Offline → back online → state in sync < 10s
- [ ] Garantir backend source de vérité
  - Jamais de cache client sans reconciliation
  - À chaque changement d'état: frontend re-fetch depuis backend
  - Acceptance: Client invalide cache → force refresh → state ok

#### Résilience réseau
- [ ] Ajouter une logique de retry pour les opérations API critiques
- [ ] Créer un fallback polling quand la connexion socket échoue
- [ ] Garantir qu'un état de session puisse être rechargé complètement à tout moment

#### Performance
- [ ] Optimiser les événements socket pour réduire les émissions inutiles
- [ ] Batcher les mises à jour participants au lieu d'émettre par action
- [ ] Éviter les écritures DB à chaque interaction mineure

#### Sécurité
- [ ] Ajouter du rate limiting sur l'API Express
- [ ] Garantir que toutes les routes protégées exigent une authentification JWT
- [ ] Valider tous les payloads entrants avec des schémas Joi
- [ ] Ajouter de l'audit logging pour les actions sensibles

#### QA / scripts
- [ ] Ajouter un endpoint healthcheck retournant état DB + serveur
- [ ] Créer un script pour vérifier les variables d'environnement avant démarrage
- [ ] Ajouter des tests Jest pour le cycle de vie de session et le flow challenge

### Frontend Next

#### State & architecture
- [ ] Créer un state manager centralisé pour l'état de session
- [ ] Garantir que le frontend se resynchronise toujours avec l'état backend
- [ ] Refactoriser les appels API dans un client unique

#### Temps réel
- [ ] Créer un socket manager avec auto-reconnect
- [ ] Ajouter un fallback polling si le socket échoue
- [ ] Forcer une resynchronisation backend à la reconnexion

#### Flow manager
- [ ] Ajouter un mode "quick session" avec challenges prédéfinis
- [ ] Créer un dashboard de statut de session pour le manager

#### Flow participant
- [ ] Garantir que l'UI participant se mette à jour automatiquement sur changement de session
- [ ] Ajouter des états de chargement et feedback sur toutes les interactions

#### UX / UI
- [ ] Garantir une seule action primaire par écran
- [ ] Ajouter un feedback visuel sur toutes les actions asynchrones
- [ ] Ajouter un indicateur d'état de connexion (connecté / reconnexion)

#### Synchronisation
- [ ] Forcer un rechargement de l'état de session toutes les X secondes en fallback
- [ ] Garantir que l'UI reflète l'état backend après chaque interaction

### Challenges

#### Engine system
- [ ] Implémenter une interface standard de challenge (`init`, `run`, `getResults`)
- [ ] Garantir que tous les challenges suivent le même contrat
- [ ] Ajouter un registry qui mappe `engine_key` vers l'implémentation

#### Catalogue
- [ ] Charger les challenges dynamiquement depuis le backend
- [ ] Ajouter des filtres par type, durée, difficulté
- [ ] Limiter les challenges visibles selon le plan utilisateur

#### Runtime
- [ ] Charger dynamiquement le moteur actif selon `engine_key`
- [ ] Garantir un reset propre de l'état challenge entre deux sessions

### Product / business features

#### Pricing & gating
- [ ] Implémenter du feature gating selon le plan d'abonnement
- [ ] Restreindre le nombre de participants pour les utilisateurs free
- [ ] Limiter les challenges disponibles sur le plan free

#### Insights
- [ ] Créer un service de calcul du taux de participation
- [ ] Afficher des métriques d'engagement après session
- [ ] Générer une vue simple de résumé de session

#### Adoption
- [ ] Ajouter des templates de session prédéfinis
- [ ] Créer une création de session en un clic
- [ ] Ajouter un onboarding first-time user

### QA & debug

#### Tests
- [ ] Créer des smoke tests pour login, home, création de session
- [ ] Tester le flow complet : create -> launch -> participate -> results
- [ ] Simuler plusieurs participants qui rejoignent simultanément

#### Debug tools
- [ ] Ajouter des logs sur les changements d'état de session
- [ ] Créer un debug mode montrant l'état temps réel
- [ ] Logger les événements socket pour le troubleshooting

### Workflow

#### Git / PR
- [ ] Garantir que les branches partent de `develop` avant démarrage si cette convention est retenue
- [ ] Générer des messages de commit avec sections scope / impact / rollback
- [ ] Valider la preview avant merge de PR

#### Pre-release
- [ ] Lancer un build complet et détecter les erreurs
- [ ] Vérifier que le catalogue de challenges n'est pas vide
- [ ] Valider les variables d'environnement critiques

---

## Post-MVP / Refactorisation

> Items d'architecture et de clean code à traiter après le lancement MVP.
> Priorité : stabilité produit > qualité code

### Backend refactorisation

#### Structure & clean architecture
- [ ] Refactoriser l'app Express pour déplacer toute la logique métier vers les services
- [ ] Créer une service layer pour le cycle de vie des sessions
- [ ] Ajouter un middleware centralisé de gestion d'erreurs avec bons statuts HTTP (converter toutes les erreurs au format ApiError)
- [ ] Ajouter un middleware `requestId` pour tracer les logs
- [ ] Ajouter des tests unitaires Jest pour chaque service critique
- [ ] (POST-MVP) Ajouter `Session.phase` pour workflow multi-étapes (icebreaker → logique → cohésion → debrief)
  - Audit 2026-05-12: `phase` n'existe pas en DB, n'impacte pas MVP
  - `status` + `active_challenge_id` suffisent pour flow MVP

#### Sécurité avancée
- [ ] Ajouter du rate limiting sur l'API Express
- [ ] Valider tous les payloads entrants avec des schémas Joi
- [ ] Ajouter de l'audit logging pour les actions sensibles (création/suppression/modification données sensibles)

#### Observabilité
- [ ] Mettre en place un système de logging structuré (Winston ou Pino)
- [ ] Ajouter des métriques de performance (APM)
- [ ] Dashboard de monitoring Backend + DB

### Frontend refactorisation

#### State management
- [ ] Créer un state manager centralisé pour l'état de session
- [ ] Refactoriser les appels API dans un client unique
- [ ] Ajouter des tests d'intégration pour les flows critiques

### Documentation technique

- [ ] Documenter l'architecture interne backend (flows métier)
- [ ] Documenter les patterns d'erreur attendus (ApiError)
- [ ] Créer un guide de contribution backend + frontend


- Que veut dire cette erreur "07lhk_q6pmm3r.js:1 QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'selectedChallenges' exceeded the quota.
064lr-fclj_.l.js:1 Global Next error boundary caught an error: QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'selectedChallenges' exceeded the quota.
    at 0w~40y-xvxx12.js:1:34594
    at iv (07lhk_q6pmm3r.js:1:102969)
    at up (07lhk_q6pmm3r.js:1:127008)
    at ud (07lhk_q6pmm3r.js:1:126670)
    at up (07lhk_q6pmm3r.js:1:126988)
    at ud (07lhk_q6pmm3r.js:1:126670)
    at up (07lhk_q6pmm3r.js:1:127955)
    at ud (07lhk_q6pmm3r.js:1:126670)
    at up (07lhk_q6pmm3r.js:1:127053)
    at ud (07lhk_q6pmm3r.js:1:126670)"
- ajouter le chat au niveau du challenge "salle secrète"
- tout les challenges ne démarre qu'une fois le facilitateur/manager démarre le chrono
- Corrige cette erreur "07lhk_q6pmm3r.js:1 The specified value "NaN" cannot be parsed, or is out of range." je pense qu'on peut la corrige en prenant la durée total des différents challenges séléctioné dans la session