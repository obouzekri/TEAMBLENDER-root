# Revue plateforme (2026-10-30)

## 🔴 Priorité 1 — Sécurité / paiement

- [ ] Webhook Payoneer : confirmer avec la doc / le support Payoneer le format réel de la signature (en-tête, encodage hex, contenu signé) avant d'activer le webhook
  - backend/src/services/payoneer.service.js (verifyWebhookSignature)
- [ ] Ne plus stocker le JWT dans localStorage/sessionStorage, s'appuyer uniquement sur le cookie httpOnly
  - frontend-next/lib/auth-storage.js, frontend-next/app/admin/AdminClient.js
  - Avec la CSP `'unsafe-inline' 'unsafe-eval'`, une XSS = vol de compte (admin compris)
- [ ] Après le déploiement de la PR backend #4 (nodemailer 8 → 10) :
  - Vérifier dans Railway que le backend tourne sur Node ≥ 20 (exigé par nodemailer 10) et fixer la version (`engines` dans backend/package.json)
  - Envoyer un vrai e-mail (formulaire de contact ou mot de passe oublié) : les tests CI simulent l'envoi

## 🟠 Priorité 2 — Nettoyage technique

- [ ] Découper les fichiers géants : globals.css (~23k lignes), AdminClient.js (5,6k), socket-runtime.js (3,3k), account/page.js (2,7k), SessionBuilder.js (2,4k)
- [ ] Réécrire `tests/phrase_realtime_events.test.js` : il rejoint le challenge sans authentification et sur une session fictive, ce que le serveur refuse depuis le durcissement temps réel (Crossword) → s'inspirer de `tests/crossword_realtime.test.js` (session réelle, utilisateurs authentifiés)
- [ ] Démarrage sur une base neuve : `npm start` lance les migrations avant `initDb()`, or les migrations supposent que les tables existent → échec sur une base vide (nouvel environnement, restauration)
  - backend/package.json (script start), backend/server.js, backend/migrations
- [ ] Workflow GitHub « Session Retention Purge » en échec chaque nuit (vu les 29, 30 et 31/10)
  - backend/.github/workflows/session-retention-purge.yml
- [ ] Plantages sur ce poste : chaque coupure laisse des fichiers à moitié écrits, remplis d'octets NUL (vu dans frontend-next/.git/config, refs/remotes/origin/main, le reflog de feat/score-scale et .next) → vérifier le disque, l'antivirus et la veille / l'alimentation
- [ ] Supprimer la sauvegarde frontend-next/.git/config.bak-20261101
- [ ] Branche frontend-next `fix/pricing-display-amounts` (travail sur la page tarifs, partie de main, hors PR #32) :
  - [ ] Lancer `npm run test:ux:pricing` (serveur `npm run dev` requis), puis pousser la branche et ouvrir la PR
  - [ ] Valider le prix Pro+ du fallback : 690 → 696 DH/mois (aligné sur l'ancien calcul 64 € / 0,092)
- [ ] Tests UX `test-participant-management-ux` et `test-session-live-layout` : ne passent qu'avec `npm run dev` (ils cherchent les noms de classes CSS modules de développement) → les rendre compatibles avec un build de production ou le préciser dans le README

## 🟡 Priorité 3 — Produit / site (teamblender.io)

- [ ] Section « Équipes qui utilisent TeamBlender » : remplacer les catégories par de vraies preuves (logos, témoignages, chiffres) ou la retirer
- [ ] Harmoniser la durée d'une session (≈20 min / 15–30 min dans la FAQ / 25–35 min pour Lab d'Innovation)
- [ ] Page tarifs :
  - [ ] Clarifier « challenges optimisés pour 4–6 personnes » vs 30 / 150 participants (répartition en équipes ?)
  - [ ] Préciser l'essai gratuit (durée, CB requise), TVA, résiliation, validité d'une session à l'unité
- [ ] Un seul CTA de contact principal (aujourd'hui : « Parler à un expert », « Demander une démo », « Contacter l'équipe »)
- [ ] « Voyez qui s'implique » : expliquer comment les données individuelles sont présentées et protégées (confiance salariés / RGPD)

## 🔵 Challenges — expérience facilitateur (revue de la démo, 2026-10-31)

- [ ] Harmoniser les scores : aujourd'hui 808 (CoPuzzle), 1 482 (Labyrinthe), 82 (Pixel Architect), quelques points (Pari sur moi) → score sur 100 ou échelle affichée (« 808 / 1 000 max »)
  - backend/src/realtime/socket-runtime.js (buildSummary)
- [ ] Revoir les formules qui récompensent l'agitation : CoPuzzle +0,5 par action (même une pièce mal posée), Labyrinthe +8 par case parcourue
- [ ] Ajouter des questions d'animation dans les débriefs du produit (aujourd'hui uniquement des chiffres ; la démo en propose dans son bilan)
- [ ] Labyrinthe : la fenêtre « Victoire collective » couvre la page et bloque le bouton « Challenge suivant » tant qu'elle n'est pas fermée
- [ ] Labyrinthe : règles trop longues (10 puces), le bouton « Démarrer » passe sous le pli sur mobile → résumé en 3 lignes + détail repliable
- [ ] Labyrinthe : un cul-de-sac coûte une vie, en plus des pièges invisibles → tester l'équilibrage avec de vrais groupes
- [ ] Pixel Architect : écran facilitateur très dense (couches, carte modèle, vue 3D, progression, répartition, indices)
- [ ] Pari sur moi : au départ, tous les joueurs ont une médaille à 0 point dans le classement
- [ ] Pari sur moi : 40 s pour choisir l'affirmation puis 40 s pour voter, un tour peut sembler long à ceux qui attendent → délais plus courts ou configurables
- [ ] Valider ces retours en observant de vraies sessions avec des groupes, et auditer le vrai espace manager et le constructeur de session (non couverts par cette revue, la démo les imite)
- [ ] CoPuzzle : la taille du plateau dépend de la largeur de l'écran et non du conteneur (peut déborder) ; libellé « Pièce visible » répété sur chaque case en vue facilitateur

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