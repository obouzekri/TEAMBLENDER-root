# Revue plateforme (2026-10-30)

## 🔴 Priorité 1 — Sécurité / paiement

- [x] Webhooks PayPal et Paddle : refuser la requête si le secret n'est pas configuré (aujourd'hui la vérification est ignorée → un faux webhook peut marquer une facture « paid »)
  - backend/src/controllers/admin-billing.controller.js (paypalWebhook, paddleWebhook)
  - Vérifier que PAYPAL_WEBHOOK_ID et PADDLE_WEBHOOK_SECRET sont définis en prod
  - Paddle : rejeter les signatures dont le timestamp `ts` est trop ancien (anti-rejeu)
- [x] Webhook Payoneer cassé : `Buffer.toString('sha256')` lève « Unknown encoding » → remplacer par un vrai HMAC + comparaison `timingSafeEqual`
  - backend/src/services/payoneer.service.js (verifyWebhookSignature)
  - [ ] Confirmer avec la doc / le support Payoneer le format réel de la signature (en-tête, encodage hex, contenu signé) avant d'activer le webhook
- [ ] Ne plus stocker le JWT dans localStorage/sessionStorage, s'appuyer uniquement sur le cookie httpOnly
  - frontend-next/lib/auth-storage.js, frontend-next/app/admin/AdminClient.js
  - Avec la CSP `'unsafe-inline' 'unsafe-eval'`, une XSS = vol de compte (admin compris)
- [ ] Dépendances : 2 vulnérabilités critiques par repo
  - frontend : `next` → 16.4.3 (+ dompurify)
  - [x] backend : corrigé le 2026-10-31 (PR backend #4) — 0 haute / 0 critique ; 28 modérées restantes
- [ ] Après le déploiement de la PR backend #4 (nodemailer 8 → 10) :
  - Vérifier dans Railway que le backend tourne sur Node ≥ 20 (exigé par nodemailer 10) et fixer la version (`engines` dans backend/package.json)
  - Envoyer un vrai e-mail (formulaire de contact ou mot de passe oublié) : les tests CI simulent l'envoi

## 🟠 Priorité 2 — Nettoyage technique

- [ ] Supprimer les handlers socket legacy `joinSession` / `nextStage` (pas de contrôle d'appartenance à la session, rôle « manager » fourni par le client ; `stageChanged` n'est plus écouté côté front)
  - backend/src/realtime/socket-runtime.js
- [ ] Retirer les routes de debug `/api/test` et `/api/direct-test`, et `morgan('dev')` en prod (backend/app.js)
- [ ] Retirer `backend/.railway-status.raw.txt` du repo (IDs d'infra, pas de secret)
- [ ] Découper les fichiers géants : globals.css (~23k lignes), AdminClient.js (5,6k), socket-runtime.js (3,3k), account/page.js (2,7k), SessionBuilder.js (2,4k)
- [ ] État des challenges live en mémoire (sauf Crossword) : un redéploiement en pleine session perd les parties, pas de scaling horizontal → persister l'état comme pour crossword_live_v1
- [ ] Supprimer les fallbacks « colonne manquante » (findUserByPkSafe, etc.) une fois les migrations stabilisées
- [x] CI backend : la base de test démarrait vide → schéma créé avec `initDb()` avant les tests (PR backend #5, fusionnée le 2026-10-31) : 63/64 suites passent
- [ ] Réécrire `tests/phrase_realtime_events.test.js` : il rejoint le challenge sans authentification et sur une session fictive, ce que le serveur refuse depuis le durcissement temps réel (Crossword) → s'inspirer de `tests/crossword_realtime.test.js` (session réelle, utilisateurs authentifiés)
- [ ] Démarrage sur une base neuve : `npm start` lance les migrations avant `initDb()`, or les migrations supposent que les tables existent → échec sur une base vide (nouvel environnement, restauration)
  - backend/package.json (script start), backend/server.js, backend/migrations
- [ ] Workflow GitHub « Session Retention Purge » en échec chaque nuit (vu les 29, 30 et 31/10)
  - backend/.github/workflows/session-retention-purge.yml

## 🟡 Priorité 3 — Produit / site (teamblender.io)

- [ ] Section « Équipes qui utilisent TeamBlender » : remplacer les catégories par de vraies preuves (logos, témoignages, chiffres) ou la retirer
- [ ] Harmoniser la durée d'une session (≈20 min / 15–30 min dans la FAQ / 25–35 min pour Lab d'Innovation)
- [ ] Page tarifs :
  - [ ] Clarifier « challenges optimisés pour 4–6 personnes » vs 30 / 150 participants (répartition en équipes ?)
  - [ ] Préciser l'essai gratuit (durée, CB requise), TVA, résiliation, validité d'une session à l'unité
  - [ ] Vérifier que le sélecteur €/$ et la remise annuelle −20 % affichent bien les prix
  - [ ] Traduire les termes anglais (Insights, Live facilitation, Dashboard…)
- [ ] Un seul CTA de contact principal (aujourd'hui : « Parler à un expert », « Demander une démo », « Contacter l'équipe »)
- [ ] Un seul libellé pour la page prix (aujourd'hui : Tarifs / Offres / Tarification)
- [ ] « Voyez qui s'implique » : expliquer comment les données individuelles sont présentées et protégées (confiance salariés / RGPD)

## 🔵 Challenges — expérience facilitateur (revue de la démo, 2026-10-31)

- [ ] Harmoniser les scores : aujourd'hui 808 (CoPuzzle), 1 482 (Labyrinthe), 82 (Pixel Architect), quelques points (Pari sur moi) → score sur 100 ou échelle affichée (« 808 / 1 000 max »)
  - backend/src/realtime/socket-runtime.js (buildSummary)
- [ ] Revoir les formules qui récompensent l'agitation : CoPuzzle +0,5 par action (même une pièce mal posée), Labyrinthe +8 par case parcourue
- [ ] Ajouter des questions d'animation dans les débriefs du produit (aujourd'hui uniquement des chiffres ; la démo en propose dans son bilan)
- [ ] Harmoniser les écrans facilitateur entre challenges : emplacement du minuteur, du bouton « Règles », du résumé de fin
- [ ] Labyrinthe : la fenêtre « Victoire collective » couvre la page et bloque le bouton « Challenge suivant » tant qu'elle n'est pas fermée
- [ ] Labyrinthe : règles trop longues (10 puces), le bouton « Démarrer » passe sous le pli sur mobile → résumé en 3 lignes + détail repliable
- [ ] Labyrinthe : un cul-de-sac coûte une vie, en plus des pièges invisibles → tester l'équilibrage avec de vrais groupes
- [ ] Pixel Architect : écran facilitateur très dense (couches, carte modèle, vue 3D, progression, répartition, indices)
- [ ] Pari sur moi : au départ, tous les joueurs ont une médaille à 0 point dans le classement
- [ ] Pari sur moi : 40 s pour choisir l'affirmation puis 40 s pour voter, un tour peut sembler long à ceux qui attendent → délais plus courts ou configurables
- [ ] Valider ces retours en observant de vraies sessions avec des groupes, et auditer le vrai espace manager et le constructeur de session (non couverts par cette revue, la démo les imite)
- [ ] CoPuzzle : la taille du plateau dépend de la largeur de l'écran et non du conteneur (peut déborder) ; libellé « Pièce visible » répété sur chaque case en vue facilitateur
- [ ] Supprimer le code mort `frontend-next/components/Challenges/LabyrintheLive/ProceduralMazeBoard.js` (importé nulle part)

## 🟣 Démo /demo

- [ ] Ajouter un lien vers /demo sur le site (menu, lien sous le bouton du hero, ou « Demander une démo » du pied de page)
- [ ] Démo encore un peu longue (≈ 1 min 50 après la PR #25) : laisser le visiteur choisir 1 ou 2 challenges à voir, ou démarrer automatiquement chaque challenge
- [ ] Rendre /demo indexable : ajout dans PUBLIC_SEO_PATHS + textes SEO + données structurées
  - frontend-next/lib/seo.js, frontend-next/lib/structuredData.js
- [ ] Espace manager et préparation encore imités : utiliser les vrais écrans (comme pour les challenges)
- [ ] Bilan : « Progression moyenne » presque toujours à 100 % → indicateur plus parlant
- [ ] Chrono accéléré qui saute de 6 à 15 s d'un coup : lisser l'affichage
- [ ] Garder synchronisées les copies de la logique serveur (vomGameLogic, pixelLogic, labyLogic, labyMazeSolvability) à chaque modification du backend — le test `npm run test:unit:demo` signale les écarts quand les deux dépôts sont côte à côte
  - frontend-next/lib/demo/challenges
- [ ] Test UX de la démo : sans Chromium Playwright installé, lancer avec `PLAYWRIGHT_CHANNEL=msedge npm run test:ux:demo`
- [ ] Modèle de PR frontend : retirer `npm run check:typography`, le script n'existe plus
