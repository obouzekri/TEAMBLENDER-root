# TEAMSPARK - Checklist Legacy Frontend Off

Objectif: garantir que le frontend legacy archive reste non utilise par defaut, tout en restant accessible uniquement sur demande explicite.

## 1) Gouvernance

- [x] Le dossier legacy est archive sous `archive/frontend/`.
- [x] La regle officielle est documentee dans `README.md`.
- [x] Le mode d'acces explicite est documente dans `frontend-next/README.md`.

## 2) Configuration

- [x] `NEXT_PUBLIC_ENABLE_LEGACY_LINKS=false` par defaut.
- [x] Les liens legacy ne s'affichent que si `NEXT_PUBLIC_ENABLE_LEGACY_LINKS=true`.
- [ ] Aucun environnement preview/production n'active `NEXT_PUBLIC_ENABLE_LEGACY_LINKS=true`.

## 3) Application Next

- [x] Les nouveaux parcours pointent vers routes Next uniquement.
- [x] Le fallback legacy est limite aux cas explicites.
- [ ] Revue manuelle des ecrans challenge pour confirmer qu'aucun flux principal n'ouvre legacy.

## 4) Documentation

- [x] Index docs mis a jour avec la checklist legacy off.
- [x] Matrice des variables mise a jour avec flag explicite.
- [ ] Les documents produit qui referencent `frontend/` sont tagues "archive context" ou migres vers Next.

## 5) Validation operationnelle

- [ ] Build frontend-next vert en local.
- [ ] Smoke tests manager + participant verts.
- [ ] Verification manuelle: landing, signup, login, session-builder, session-live, session-results.

## 6) Guardrail final

- [ ] Ajouter une verification CI qui echoue si `NEXT_PUBLIC_ENABLE_LEGACY_LINKS=true` en preview/production.
- [ ] Ajouter une note de rollback precise dans le runbook release.

## Decision d'etat

- Legacy frontend status: `OFF by default`
- Mode de reactivation: `explicite, temporaire, et documente`
