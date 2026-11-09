# Revue plateforme (2026-10-30, mise à jour 2026-11-07)

## 🔴 Priorité 1 — Sécurité / paiement

- [ ] Webhook Payoneer : confirmer avec la doc / le support Payoneer le format réel de la signature (en-tête, encodage hex, contenu signé) avant d'activer le webhook
  - backend/src/services/payoneer.service.js (verifyWebhookSignature)
- [ ] PR backend #4 (nodemailer 8 → 10) fusionnée : vérifications en production
  - [ ] Vérifier dans Railway que le backend tourne effectivement sur Node ≥ 20
  - [ ] Envoyer un vrai e-mail : test Brevo API en échec (`BREVO_API_SEND_FAILED`), puis SMTP rejeté (`535 EAUTH`)

## 🐞 Bugs (2026-11-06)

- [ ] Espace admin : supprimer un participant qui a rejoint par code supprime **tous** les participants
- [ ] Préférences de notification : « Impossible de charger vos préférences de notification » (les interrupteurs restent inactifs)

  ![alt text](image-5.png)

  - [ ] Relire et fusionner la PR frontend #83
  - [ ] Si l'erreur apparaît aussi avec un compte organisateur (`user`) : regarder dans l'onglet Réseau le code renvoyé par l'appel (backend local arrêté ou pas à jour ?)
  - [ ] Le compte de test `manager@test.com` (rôle `manager`) reçoit un 403 sur toutes les routes `/users/me` : à supprimer ou à passer en `user`

- [ ] Workflow GitHub « Session Retention Purge » annulé chaque nuit après 6 h (depuis le 29/10) : le script termine en 2 s (`staleSessionCount: 0`) mais le process Node ne se ferme pas, la connexion Sequelize reste ouverte
  - [ ] Une fois GitHub Actions débloqué : lancer le workflow à la main (dry run) et vérifier qu'il finit en vert
- [ ] GitHub Actions bloqué sur le backend depuis le 2026-11-07 : « recent account payments have failed or your spending limit needs to be increased » → GitHub Settings → Billing & plans. Les PR #17, #18 et #19 ont été fusionnées sans CI : relancer la CI sur `main` une fois débloqué

## 🟠 Priorité 2 — Nettoyage technique

- [ ] Découper les fichiers géants : globals.css (~23k lignes), AdminClient.js (5,6k), socket-runtime.js (3,3k), account/page.js (2,7k), SessionBuilder.js (2,4k)
- [x] Tests instables sur `main` : `test:ux:session-layout`, `test:ux:crossword`, `test:ux:planning` ; backend : `crossword_realtime`, `qa_smoke_flow_concurrent_participants`, `challenge-result`, `analytics-event`
  - [x] Nettoyage DB limité à la session des tests, handshake du test Socket.IO aligné sur le mock d'auth, sélecteur cookies localisé, attente du rendu React et grille CoPuzzle mobile corrigés
- [ ] Vercel « Function Storage » à 75 % du quota gratuit (10 Go) (2026-11-04) : les anciennes deployments (surtout les previews) s'accumulent, ~25 Mo de fonctions chacune
  - [ ] Vérifier vers le 2026-11-09 que la purge automatique a bien eu lieu (~150 des 284 deployments) et que Function Storage est retombé vers ~35 % ; sinon `vercel rm <url> --yes`

## 🌍 Langue arabe (AR + RTL) (2026-11-04)

PR fusionnées : frontend #55, #59, #54 / backend #11, #12. L'arabe reste masqué tant que `NEXT_PUBLIC_ENABLED_BETA_LOCALES=ar` (Vercel) / `ENABLED_BETA_LOCALES=ar` (Railway) ne sont pas définis.

- [ ] Console admin : les champs de règles affichés dans l'édition ne sont pas inclus dans la sauvegarde ; `engine_config.rules` est aussi retiré avant l'envoi. Décider si ces champs doivent être persistés ou rendus non éditables
- [ ] Relecture de toutes les traductions arabes par un arabophone natif (avant activation)
- [ ] Ajouter et tester les contenus arabes du quiz et de Mission Critique, puis adapter l'escape room, Phrase mystère et les grilles de mots croisés ; activer chaque moteur dans les deux `challengeLocales` après validation
- [ ] Activer la langue : variables d'environnement Vercel + Railway

## 👥 Comptes participants et e-mails

- [ ] Permettre au participant qui a été rajouté par un code de changer son adresse e-mail et son mot de passe pour les participants qui se sont connectés par le code
## 🧩 Session builder

- [ ] Garder l'étape « Configurer » dans les étapes du session builder, en la signalant comme optionnelle
- [ ] Améliorer la modale du programme guidé : titre, hiérarchie, programme
- [ ] Page « Créer une session » : remarque à préciser

  ![alt text](image-2.png)

## 🔵 Challenges — contenu et gameplay

- [ ] Mission Critique, étape « Problèmes » : mettre en évidence les problèmes déjà choisis avec une autre couleur (participant et vue animateur)

  ![alt text](image-10.png)
  ![alt text](image-11.png)

- [ ] Mission Critique : analyser le challenge et réduire le nombre de phases (aujourd'hui 8 étapes ; piste : Cadrage, Planification, Jour J, Clôture)
- [ ] Pari sur moi : au départ, tous les joueurs ont une médaille à 0 point dans le classement (revue de la démo, 2026-10-31)
- [x] Pixel Architect : conserver la fin au terme du timer ou sur décision de l'animateur ; supprimer le handler `pixel.submit_final` et son état devenus inutiles
  - backend/src/realtime/socket-runtime.js
- [ ] Labyrinthe : tester l'équilibrage avec de vrais groupes
- [ ] Concevoir et tester un atelier d'accueil d'équipe court, sans préparation
- [ ] Debrief final : ajouter des scores de cohésion, leadership…
