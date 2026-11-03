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

- [x] Langue par défaut selon le visiteur (existant : cookie `tb_locale` > `Accept-Language` > FR, dans `frontend-next/proxy.js`) :
  - [x] Bug : `acceptLanguage.includes('en')` passe en anglais un navigateur `fr-FR,fr;q=0.9,en;q=0.8` → prendre la 1re langue supportée par ordre de préférence
  - [x] Les pages publiques SEO sans préfixe (`/`, tarifs…) sont toujours en FR : y appliquer aussi la détection (sans redirection pour les robots)
  - [x] Ajouter le pays de l'IP en secours quand `Accept-Language` ne donne ni FR ni EN (header géo de l'hébergeur, ex. `cf-ipcountry`)
  - [x] Garder le choix manuel prioritaire sur toute détection (déjà le cas via le cookie)

## 🔵 Challenges — expérience facilitateur (revue de la démo, 2026-10-31)

- [ ] Labyrinthe : un cul-de-sac coûte une vie, en plus des pièges invisibles → tester l'équilibrage avec de vrais groupes
- [ ] Pari sur moi : au départ, tous les joueurs ont une médaille à 0 point dans le classement

## 🎨 Design — formulaire « Créer une session » (2026-11-03)

- [x] Agrandir les textes : aide ≥ 13px, labels et chips ≥ 14px, texte du bouton « Créer la session » plus grand
- [x] Différencier les titres de section des labels (16px semi-bold + séparateur ou espace en plus, ou étapes numérotées)
- [x] Déroulement : remplacer les radios par des cartes cliquables (bordure, état sélectionné violet)
- [x] Participants : rendre « Ajouter des participants à l'avance » plus visible (chevron ou bouton secondaire « + Ajouter des participants »)
- [x] Participants : masquer « 0 sélectionné(s) » quand il vaut 0, ou l'afficher en badge à côté du libellé
- [x] Nombre de participants : placeholder « ex. 12 », champ numérique avec un minimum de 1
- [x] Date : aligner le style du champ natif sur les autres champs et bloquer les dates passées
- [x] Objectifs : vérifier que l'état sélectionné des chips est bien visible (fond violet clair, bordure, coche)
- [x] Réduire légèrement la largeur max de la carte (~720px)

## 🎨 Design — espace manager / tableau de bord (2026-11-03)

- [ ] Couleurs : garder une seule couleur d'accent (violet) et réserver les autres couleurs aux statuts
  - [ ] Légendes des chiffres clés : même couleur pour les trois (aujourd'hui bleu / orange / bleu)
  - [ ] « Vue rapide » : supprimer les mots colorés un par un
  - [ ] Même style pour « Créer une session » et « Créer un participant » (aujourd'hui l'un violet, l'autre blanc)
- [ ] Agrandir les petits textes (Recherche, Statut, Dates, « 3 session(s) affichée(s) », « Espace manager ») : ≥ 12–13px
- [ ] Cartes de session :
  - [ ] Ajouter les infos utiles : date (sur toutes les cartes), nombre de participants, type d'atelier
  - [ ] Actions : icônes plus grandes avec libellé ou tooltip, icône du milieu cohérente d'une carte à l'autre
  - [ ] Mettre « Supprimer » dans un menu « ⋯ » plutôt qu'un bouton à bordure rouge toujours visible
  - [ ] Ajouter un bouton principal « Lancer / Rejoindre » visible sur les sessions en cours
  - [ ] Afficher les sessions en cours en premier
- [ ] Bloc « Vue rapide » : le supprimer ou y mettre du contenu utile (prochaine session, checklist de démarrage)
- [ ] Chiffres clés cliquables pour filtrer la liste (ex. « À configurer »)
- [ ] Filtre « Période + » : le remplacer par une icône calendrier, plus parlante
- [ ] Vérifier la session « Test 1 » : « En cours » mais datée du 20 févr. 2022 (bug de données ?)

## 🟣 Démo /demo

- [ ] Démo encore un peu longue (≈ 1 min 50 après la PR #25) : laisser le visiteur choisir 1 ou 2 challenges à voir, ou démarrer automatiquement chaque challenge
