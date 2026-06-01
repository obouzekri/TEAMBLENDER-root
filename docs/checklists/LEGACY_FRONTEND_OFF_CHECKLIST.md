# TeamBlender - Checklist Legacy Frontend Off

Objectif: garantir que le frontend legacy vanilla reste desactive (retire du repository) et que tous les flux actifs passent par Next.js.

## 1) Gouvernance

- [x] Le dossier legacy vanilla a ete retire du repository.
- [x] La regle officielle est documentee dans `README.md`.
- [x] Les references legacy runtime ont ete retirees de la documentation active.

## 2) Configuration

- [x] Aucun flag runtime legacy n'est necessaire pour les parcours produits.
- [x] Les variables legacy frontend ont ete retirees de la matrice d'environnement.

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

- [ ] Ajouter une verification CI qui echoue si une variable `NEXT_PUBLIC_LEGACY_*` est reintroduite.
- [ ] Ajouter une note de rollback precise dans le runbook release.

## Decision d'etat

- Legacy frontend status: `OFF by default`
- Mode de reactivation: `restauration explicite via historique Git (hors flux standard)`
