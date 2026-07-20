# TeamBlender - Realtime Incident Degradation + Recovery Runbook

Date: 2026-07-20
Scope: incidents temps reel sur sessions live (socket/reconnexion/synchronisation)

## 1) Objectif
- Restaurer rapidement la synchronisation manager/participants pendant un incident realtime.
- Limiter pertes de progression et desynchronisations visibles en session live.

## 2) Symptomes frequents
- Participants bloques sur un challenge obsolete.
- Reconnexion en boucle (socket connect/disconnect repetitif).
- Retards majeurs de propagation evenementielle.
- Erreurs massives `connect_error`, `reconnect_failed`, `timeout`.

## 3) Detection
- Verifier logs backend Socket.IO: erreurs CORS, heartbeat timeout, room cleanup agressif.
- Verifier logs frontend: `connect_error`, etat offline, reconnexion echec.
- Correlation rapide: sessionId, challengeId, timestamp debut incident.

## 4) Containment (mode degrade)
1. Confirmer etat backend source de verite via API `/sessions/:id/state`.
2. Forcer resync runtime challenge cote client (reconnexion ou refresh controle).
3. Si websocket instable, basculer temporairement sur transport polling (deja supporte en host public).
4. Communiquer au facilitateur: "degradation reseau, synchronisation en cours".

## 5) Recovery technique
1. Verifier parametres socket:
   - serveur: `SOCKET_PING_INTERVAL_MS`, `SOCKET_PING_TIMEOUT_MS`, `SOCKET_CONNECT_TIMEOUT_MS`, `SOCKET_MAX_DISCONNECTION_DURATION_MS`
   - client: `NEXT_PUBLIC_SOCKET_CONNECT_TIMEOUT_MS`, `NEXT_PUBLIC_SOCKET_ACK_TIMEOUT_MS`, `NEXT_PUBLIC_SOCKET_RECONNECT_DELAY_MS`, `NEXT_PUBLIC_SOCKET_RECONNECT_DELAY_MAX_MS`, `NEXT_PUBLIC_SOCKET_RECONNECT_ATTEMPTS`
2. Redemarrer service backend si saturation socket confirmee.
3. Revalider progression session avec manager (challenge actif attendu vs observe).
4. Reouvrir flux normal et surveiller 15 min.

## 6) Verification post-recovery
- Aucun `reconnect_failed` en rafale sur 10 min.
- Participants voient le meme `active_challenge_id` que le backend.
- Changement de challenge propagé sur tous les clients en delai acceptable.

## 7) Escalade
- Si impact multi-sessions > 10 min: escalade P1 immediate (Tech Lead + Product).
- Si perte de progression metier: ouvrir incident postmortem avec actions preventives.

## 8) Checklist evidence
- Horodatage incident (debut/retour stable).
- SessionIds impactees.
- Captures logs backend/frontend pertinentes.
- Parametres runtime socket utilises.
- Correctif applique et resultat verification post-recovery.
