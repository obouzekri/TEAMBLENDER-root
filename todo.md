# TEAMSPARK — TODO Master

> Dernière mise à jour : 16/05/2026
> Objectif lancement MVP : fin juin / début juillet 2026

## Priorités immédiates

- [ ] Boucler un flow complet : create session -> launch -> participant join -> play -> results
- [ ] Garantir une synchro temps réel fiable entre manager et participants
- [ ] Créer un mode quick session en moins de 2 clics
- [ ] Atteindre au moins 8 challenges fonctionnels avec scoring de base

## Maintenant

### Infra & légal go-live

#### Legacy off (frontend archive)
- [ ] Finaliser la checklist `docs/checklists/LEGACY_FRONTEND_OFF_CHECKLIST.md` : base archive et docs en place, reste la validation opérationnelle et les garde-fous de déploiement

#### Identité & domaine
- [ ] Créer un compte Brevo (SMTP) et tester l'envoi email

#### Légal & RGPD
- [ ] Compléter les placeholders dans les pages légales
- [ ] Ajouter une bannière cookies si de l'analytics est activé

### Temps réel & synchronisation
- [ ] Fixer une cible de synchronisation < 500 ms
- [ ] Documenter un fallback polling si Socket.io est indisponible

## Avant go-live

### Catalogue & qualité
- [ ] Atteindre 20 challenges fonctionnels et testés

### Fonctionnalités coeur
- [ ] Créer une session depuis un template ou une suggestion
- [ ] Implémenter la gestion des mots de passe (réinitialisation email)
- [ ] Implémenter les notifications email (confirmation, invitation)

### Landing page publique
- [ ] Ajouter les chiffres clés de la plateforme (nb challenges, nb utilisateurs)
- [ ] Ajouter une section logos clients / partenaires
- [ ] Ajouter une section témoignages

## Technique

### Backend

#### Structure & clean architecture
- [ ] (POST-MVP) Refactoriser l'app Express pour déplacer toute la logique métier vers les services
- [ ] (POST-MVP) Créer une service layer pour le cycle de vie des sessions
- [ ] (POST-MVP) Ajouter un middleware centralisé de gestion d'erreurs avec bons statuts HTTP
- [ ] (POST-MVP) Ajouter un middleware `requestId` pour tracer les logs

#### Temps réel & synchronisation

#### Résilience réseau

#### Performance
- [ ] Optimiser les événements socket pour réduire les émissions inutiles
- [ ] Batcher les mises à jour participants au lieu d'émettre par action
- [ ] Éviter les écritures DB à chaque interaction mineure

#### Sécurité
- [ ] Ajouter du rate limiting sur l'API Express
- [ ] Garantir que toutes les routes protégées exigent une authentification JWT
- [ ] Valider tous les payloads entrants avec des schémas Joi
- [ ] Ajouter de l'audit logging pour les actions sensibles

### Frontend Next

#### State & architecture
- [ ] Créer un state manager centralisé pour l'état de session
- [ ] Garantir que le frontend se resynchronise toujours avec l'état backend
- [ ] Refactoriser les appels API dans un client unique

#### Temps réel
- [ ] Créer un socket manager avec auto-reconnect
- [ ] Forcer une resynchronisation backend à la reconnexion

#### Flow manager
- [ ] Ajouter un mode "quick session" avec challenges prédéfinis
- [ ] Créer un dashboard de statut de session pour le manager

#### Flow participant

#### UX / UI
- [ ] Garantir une seule action primaire par écran
- [ ] Ajouter un feedback visuel sur toutes les actions asynchrones
- [ ] Ajouter un indicateur d'état de connexion (connecté / reconnexion)

#### Synchronisation
- [ ] Garantir que l'UI reflète l'état backend après chaque interaction

### Challenges

#### Engine system
- [x] Implémenter une interface standard de challenge (`init`, `run`, `getResults`)
- [x] Garantir que tous les challenges suivent le même contrat
- [x] Ajouter un registry qui mappe `engine_key` vers l'implémentation

#### Catalogue

#### Runtime
- [x] Charger dynamiquement le moteur actif selon `engine_key`
- [x] Garantir un reset propre de l'état challenge entre deux sessions

### Product / business features

#### Insights

#### Adoption
- [ ] Ajouter des templates de session prédéfinis
- [ ] Créer une création de session en un clic
- [ ] Ajouter un onboarding first-time user

### QA & debug

#### Tests
- [x] Créer des smoke tests pour login, home, création de session
- [x] Tester le flow complet : create -> launch -> participate -> results
- [x] Simuler plusieurs participants qui rejoignent simultanément

#### Debug tools
- [x] Ajouter des logs sur les changements d'état de session
- [x] Créer un debug mode montrant l'état temps réel
- [x] Logger les événements socket pour le troubleshooting

### Workflow

#### Git / PR
- [ ] Garantir que les branches partent de `develop` avant démarrage si cette convention est retenue
- [ ] Générer des messages de commit avec sections scope / impact / rollback
- [ ] Valider la preview avant merge de PR

#### Pre-release
- [ ] Lancer un build complet et détecter les erreurs
- [ ] Vérifier que le catalogue de challenges n'est pas vide
- [ ] Valider les variables d'environnement critiques

## Post-MVP / Refactorisation

> Items d'architecture et de clean code à traiter après le lancement MVP.
> Priorité : stabilité produit > qualité code

### Backend refactorisation

#### Résilience réseau avancée
- [ ] (POST-MVP) Ajouter un support `Idempotency-Key` sur les mutations critiques (POST `/sessions`, PATCH `flow/complete-active`) pour permettre un retry sûr côté client sans risque de double-exécution

#### Structure & clean architecture
- [ ] Ajouter des tests unitaires Jest pour chaque service critique
- [ ] (POST-MVP) Ajouter `Session.phase` pour workflow multi-étapes (icebreaker -> logique -> cohésion -> debrief)
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

## Notes produit

- Le facilitateur/manager peut lancer plusieurs sessions en parallèle. Les données de chaque session doivent rester indépendantes.

### phrase acrocheuse
- Contrairement aux ateliers classiques…”
“Sans formateur, sans préparation”
- UI du produit (dashboard, session live)
Schéma du workflow (avant / pendant / après)
GIF ou simulation



La taille de la photo sur copuzzle :
5x5 → 240px par pièce ✅
< 300 KB (idéal)
max 500 KB
JPEG
 1200 × 1200 px (carré)
 définir qu'une matrice collone=ligne



dans le formulaire de configuration de copuzzle le premier, aligner le text Activer le time avec la box.  et aligner également le text activer le chat avec sa checkbox;

Ajoute le niveau de diffuculté pour l'enigme "salle secrète" ou créer un nouveau challenge "Salle secrète 2" plus difficile

à voir à garder ou pas "Les énigmes sont gérées depuis l'administration du challenge." dans salle secrète

LE Chrono n'avance pas pour les participants dans le challenge salle secrète

un petit message pour dire que l'énigme réussit dans salle secrète

Ajouter mot de passe oubliéer

l'admin n'a pas besoin d'approuver un utilisateur nouvellement créer