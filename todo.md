# Revue plateforme (2026-10-30)

## 🔴 Priorité 1 — Sécurité / paiement

- [ ] Webhook Payoneer : confirmer avec la doc / le support Payoneer le format réel de la signature (en-tête, encodage hex, contenu signé) avant d'activer le webhook
  - backend/src/services/payoneer.service.js (verifyWebhookSignature)
- [ ] Après le déploiement de la PR backend #4 (nodemailer 8 → 10) :
  - [ ] Vérifier dans Railway que le backend tourne effectivement sur Node ≥ 20
  - [ ] Envoyer un vrai e-mail : test Brevo API en échec (`BREVO_API_SEND_FAILED`), puis SMTP rejeté (`535 EAUTH`)

## 🟠 Priorité 2 — Nettoyage technique

- [ ] Découper les fichiers géants : globals.css (~23k lignes), AdminClient.js (5,6k), socket-runtime.js (3,3k), account/page.js (2,7k), SessionBuilder.js (2,4k)
- [ ] Workflow GitHub « Session Retention Purge » en échec chaque nuit (vu les 29, 30 et 31/10)
  - backend/.github/workflows/session-retention-purge.yml

## 🟡 Priorité 3 — Produit / site (teamblender.io)

- [ ] Page tarifs :
  - [ ] Préciser l'essai gratuit (durée, CB requise), TVA, résiliation, validité d'une session à l'unité

## 🔵 Challenges — expérience facilitateur (revue de la démo, 2026-10-31)

- [ ] Labyrinthe : un cul-de-sac coûte une vie, en plus des pièges invisibles → tester l'équilibrage avec de vrais groupes
- [ ] Pari sur moi : au départ, tous les joueurs ont une médaille à 0 point dans le classement

## 🟣 Démo /demo

- [ ] Ajouter un lien vers /demo sur le site (menu, lien sous le bouton du hero, ou « Demander une démo » du pied de page)
- [ ] Démo encore un peu longue (≈ 1 min 50 après la PR #25) : laisser le visiteur choisir 1 ou 2 challenges à voir, ou démarrer automatiquement chaque challenge
