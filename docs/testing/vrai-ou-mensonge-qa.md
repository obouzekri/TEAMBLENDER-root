# QA Matrix - Vrai ou Mensonge (V1)

## Scope
- Challenge individuel uniquement (aucun mode equipe)
- Machine d etats serveur obligatoire
- Catalogue fixe versionne, sans saisie libre

## Automated execution (done)

### Backend - state machine
- Command: `cd backend && npm test -- --runInBand tests/vrai_ou_mensonge_logic.test.js`
- Result: PASS (8/8)

Covered:
- Nominal cycle N x 3 exact (3 participants)
- Calcul total tours pour 2, 3, 8, 12 participants
- Vote modifiable avant revelation
- Scoring V1 (correct +1, incorrect/absent +0)
- Auto-selection sur timeout selection poseur
- Fallback reveal serveur sur timeout
- Pause/reprise deterministe en deconnexion/reconnexion poseur

### Frontend - critical logic helpers
- Command: `cd frontend-next && npm run test:unit:vom`
- Result: PASS

Covered:
- Calcul `participants x 3`
- Classement final avec ex-aequo

## Manual matrix (to execute in staging)

| Scenario | Expected | Status |
|---|---|---|
| 2 participants full game | exactly 6 tours | Pending manual |
| 3 participants full game | exactly 9 tours | Pending manual |
| 8 participants full game | exactly 24 tours | Pending manual |
| 12 participants full game | exactly 36 tours | Pending manual |
| Non-poseur vote, puis change vote | seul le dernier vote est pris en compte | Pending manual |
| Non-poseur absent | 0 point, tour continue | Pending manual |
| Poseur timeout selection | auto-selection phrase non utilisee | Pending manual |
| Poseur timeout reveal | relance visuelle, modal bloquante, fallback serveur | Pending manual |
| Votant deconnecte | pas de blocage du tour | Pending manual |
| Poseur deconnecte | pause + reprise deterministe | Pending manual |
| Aucun champ libre | aucune creation/edition de phrase possible | Pending manual |
| Egalite finale | affichage ex-aequo | Pending manual |

## Fallback serveur documente (V1)
- Si le poseur ne revele pas avant timeout reveal:
  - relance visuelle a +10s
  - modal bloquante a +16s
  - reveal automatique serveur a +20s
  - verite fallback basee sur `fallback_truth` du statement catalogue

## Notes
- Les timings imposes V1 sont codifies cote serveur.
- Les transitions non valides sont bloquees par la machine d etats.
