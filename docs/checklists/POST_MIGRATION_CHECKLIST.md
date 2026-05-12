# TEAMSPARK - Checklist verification post-migration

Date: 2026-05-10

## 1) Sante backend/API
- [ ] `GET /api/test` OK
- [ ] `POST /api/auth/login` admin OK
- [ ] `GET /api/users` (admin) OK
- [ ] `GET /api/sessions` OK
- [ ] `GET /api/challenges` OK et non vide

## 2) Catalogue challenges
- [ ] Nombre de challenges attendu present
- [ ] Les 6 engine_key attendus sont visibles via API
- [ ] Aucune incoherence evidente (status/route/type)

## 3) Frontend manager
- [ ] Login manager OK
- [ ] Acces `/home` OK
- [ ] Acces `/session-builder` OK
- [ ] Catalogue visible dans session-builder

## 4) Frontend participant (minimum)
- [ ] Participant peut acceder a sa session
- [ ] Lien challenge actif present

## 5) Automatisation (si disponible)
- [ ] `cd backend && npm run catalog:check:api` OK
- [ ] `cd backend && npm run catalog:audit:env` OK
- [ ] `cd frontend-next && npm run test:smoke:session-builder` OK

## 6) Validation finale
- [ ] Aucun 5xx critique dans logs Railway post-migration
- [ ] Decision Go-Live documentee (date + operateur)
