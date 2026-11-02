# Revue plateforme (2026-10-30)

## 🔴 Priorité 1 — Sécurité / paiement

- [ ] Webhook Payoneer : confirmer avec la doc / le support Payoneer le format réel de la signature (en-tête, encodage hex, contenu signé) avant d'activer le webhook
  - backend/src/services/payoneer.service.js (verifyWebhookSignature)
- [ ] Après le déploiement de la PR backend #4 (nodemailer 8 → 10) :
  - [x] Fixer le minimum Node à ≥ 20 dans `backend/package.json` (`engines.node`)
  - [ ] Vérifier dans Railway que le backend tourne effectivement sur Node ≥ 20
  - [ ] Envoyer un vrai e-mail : test Brevo API en échec (`BREVO_API_SEND_FAILED`), puis SMTP rejeté (`535 EAUTH`)

## 🟠 Priorité 2 — Nettoyage technique

- [ ] Découper les fichiers géants : globals.css (~23k lignes), AdminClient.js (5,6k), socket-runtime.js (3,3k), account/page.js (2,7k), SessionBuilder.js (2,4k)
- [ ] Workflow GitHub « Session Retention Purge » en échec chaque nuit (vu les 29, 30 et 31/10)
  - backend/.github/workflows/session-retention-purge.yml
- [x] Supprimer la sauvegarde frontend-next/.git/config.bak-20261101

## 🟡 Priorité 3 — Produit / site (teamblender.io)

- [ ] Section « Équipes qui utilisent TeamBlender » : remplacer les catégories par de vraies preuves (logos, témoignages, chiffres) ou la retirer
- [x] Harmoniser la durée d'une session (défis souvent autour de 20 min, plage de 15–35 min ; Lab d'Innovation : 25–35 min)
- [ ] Page tarifs :
  - [ ] Clarifier « challenges optimisés pour 4–6 personnes » vs 30 / 150 participants (répartition en équipes ?)
  - [ ] Préciser l'essai gratuit (durée, CB requise), TVA, résiliation, validité d'une session à l'unité
- [x] Un seul CTA de contact principal (aujourd'hui : « Parler à un expert », « Demander une démo », « Contacter l'équipe »)
- [ ] « Voyez qui s'implique » : expliquer comment les données individuelles sont présentées et protégées (confiance salariés / RGPD)

## 🔵 Challenges — expérience facilitateur (revue de la démo, 2026-10-31)


- [ ] Labyrinthe : un cul-de-sac coûte une vie, en plus des pièges invisibles → tester l'équilibrage avec de vrais groupes
- [x] Pixel Architect : écran facilitateur allégé (couche active seule, carte modèle et détails d’équipe/indices repliables)
- [ ] Pari sur moi : au départ, tous les joueurs ont une médaille à 0 point dans le classement
- [x] Pari sur moi : délais par défaut ramenés à 20 s pour choisir et voter, configurables dans `engine_config.timing`
- [x] CoPuzzle : la taille du plateau dépend de la largeur de l'écran et non du conteneur (peut déborder) ; libellé « Pièce visible » répété sur chaque case en vue facilitateur

## 🟣 Démo /demo

- [ ] Ajouter un lien vers /demo sur le site (menu, lien sous le bouton du hero, ou « Demander une démo » du pied de page)
- [ ] Démo encore un peu longue (≈ 1 min 50 après la PR #25) : laisser le visiteur choisir 1 ou 2 challenges à voir, ou démarrer automatiquement chaque challenge
- [x] Rendre /demo indexable : ajout dans PUBLIC_SEO_PATHS + textes SEO + données structurées
  - frontend-next/lib/seo.js, frontend-next/lib/structuredData.js
- [ ] Espace manager et préparation encore imités : utiliser les vrais écrans (comme pour les challenges)
- [x] Bilan : remplacer « Progression moyenne » presque toujours à 100 % par le total des actions réalisées
- [x] Chrono accéléré qui saute de 6 à 15 s d'un coup : lisser l'affichage
- [x] Garder synchronisées les copies de la logique serveur (vomGameLogic, pixelLogic, labyLogic, labyMazeSolvability) à chaque modification du backend — le test `npm run test:unit:demo` signale les écarts quand les deux dépôts sont côte à côte
  - frontend-next/lib/demo/challenges
- [x] Test UX de la démo : sans Chromium Playwright installé, lancer avec `PLAYWRIGHT_CHANNEL=msedge npm run test:ux:demo`
- [x] Modèle de PR frontend : retirer `npm run check:typography`, le script n'existe plus