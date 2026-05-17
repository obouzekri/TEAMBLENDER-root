# TEAMSPARK — POST-MVP

> Items d'architecture et de clean code à traiter après le lancement MVP.
> Priorité : stabilité produit > qualité code

## Backend refactorisation

### Résilience réseau avancée
- [ ] Ajouter un support `Idempotency-Key` sur les mutations critiques (POST `/sessions`, PATCH `flow/complete-active`) pour permettre un retry sûr côté client sans risque de double-exécution

### Structure & clean architecture
- [ ] Ajouter des tests unitaires Jest pour chaque service critique
- [ ] Ajouter `Session.phase` pour workflow multi-étapes (icebreaker -> logique -> cohésion -> debrief)
  - Audit 2026-05-12: `phase` n'existe pas en DB, n'impacte pas MVP
  - `status` + `active_challenge_id` suffisent pour flow MVP

### Sécurité avancée
- [ ] Ajouter du rate limiting sur l'API Express
- [ ] Valider tous les payloads entrants avec des schémas Joi
- [ ] Ajouter de l'audit logging pour les actions sensibles (création/suppression/modification données sensibles)

### Observabilité
- [ ] Mettre en place un système de logging structuré (Winston ou Pino)
- [ ] Ajouter des métriques de performance (APM)
- [ ] Dashboard de monitoring Backend + DB

## Frontend refactorisation

### State management
- [ ] Créer un state manager centralisé pour l'état de session
- [ ] Refactoriser les appels API dans un client unique
- [ ] Ajouter des tests d'intégration pour les flows critiques

## Documentation technique

- [ ] Documenter l'architecture interne backend (flows métier)
- [ ] Documenter les patterns d'erreur attendus (ApiError)
- [ ] Créer un guide de contribution backend + frontend