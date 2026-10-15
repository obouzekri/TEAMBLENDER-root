# TeamBlender — présentation, financement et stratégie go-to-market

**Document de travail — octobre 2026**

Les éléments décrivant le produit sont tirés du dépôt. Les budgets, objectifs et recommandations commerciales ci-dessous sont des hypothèses de travail, pas des résultats ou engagements déjà réalisés.

## 1. Résumé exécutif

TeamBlender est une plateforme SaaS de team-building en direct. Elle aide les managers, les équipes RH et les facilitateurs à préparer une session, inviter un groupe, lancer des challenges interactifs, suivre la progression et consulter les résultats.

Le produit répond à un problème d’exécution : organiser une activité collective est souvent dispersé entre choix d’activité, préparation, animation et bilan. TeamBlender rassemble ce parcours dans un espace conçu à la fois pour la personne qui anime et pour les participants.

**Proposition de valeur :** transformer une activité d’équipe ponctuelle en une expérience guidée, interactive et mesurable, sans demander au manager de construire lui-même toute l’animation.

**Stade documenté :** MVP SaaS avec parcours manager et participant, sessions live, plusieurs formats de challenge et résultats. Aucune donnée vérifiée de chiffre d’affaires, de clients, de rétention ou de taille de marché n’est disponible dans les documents consultés ; elles ne sont donc pas présentées comme acquises.

## 2. Présentation de la solution

### Le problème

- Avant la session, le manager doit trouver une activité, dimensionner le programme et préparer les participants.
- Pendant la session, il doit expliquer les règles, maintenir le rythme et vérifier que le groupe peut progresser.
- Après la session, le bilan et les résultats sont souvent séparés de l’expérience elle-même.

### La réponse TeamBlender

Un parcours de session dans une seule plateforme :

1. Le facilitateur crée une session et définit son objectif, son effectif prévisionnel et sa durée.
2. Il choisit un challenge ou se fait proposer un programme, puis configure et ordonne les activités.
3. Il invite les participants par profil, lien ou code de session.
4. Il lance et pilote l’expérience en direct avec une progression visible.
5. Il consulte les résultats et termine la session avec un bilan exploitable.

Les participants rejoignent l’expérience et interagissent avec le challenge actif. Les formats actuellement documentés incluent Escape Room, Phrase Mystère, CoPuzzle, Labyrinthe Live, Mission Critique, Vrai ou Mensonge, Pixel Architect et Mots croisés Live.

### Utilisateurs et acheteurs visés

| Rôle | Besoin |
|---|---|
| Acheteur : RH / People Ops, formation ou responsable d’équipe | Répéter des temps collectifs faciles à organiser et cohérents avec les objectifs d’équipe |
| Utilisateur principal : manager / facilitateur | Préparer et animer sans multiplier les outils ni improviser le déroulé |
| Participant | Rejoindre facilement et contribuer à une expérience collective |
| Prescripteur potentiel : consultant, facilitateur ou agence d’animation | Élargir son catalogue et faciliter la livraison de sessions récurrentes |

### Positionnement à tester

**« La plateforme qui fait passer le team-building de l’activité isolée à la session d’équipe préparée, animée et suivie au même endroit. »**

Le différenciateur à démontrer en pilote est la continuité du parcours — préparation, animation live et résultats — plutôt qu’une simple collection de jeux. Cette différenciation est une hypothèse de positionnement et doit être confrontée aux solutions réellement utilisées par les prospects.

## 3. Offre et monétisation

Le produit dispose d’une architecture commerciale par paliers et d’une page de tarifs. Le contenu de cette page distingue actuellement :

| Offre visible dans le parcours de tarification | Limites/valeur indiquées dans l’interface |
|---|---|
| Free | 1 session par mois, jusqu’à 6 participants, catalogue limité à 4 challenges |
| Pay-per-session | 1 session, jusqu’à 6 participants, accès au catalogue complet |
| Pro | Jusqu’à 10 sessions et 30 participants, catalogue complet, résultats, tableau de bord et insights |
| Pro+ | Jusqu’à 60 sessions et 150 participants, 5 utilisateurs manager, gestion multi-comptes |

**À vérifier avant toute communication externe :** les limites de ces offres ne correspondent pas à celles de la matrice documentaire interne `docs/product/PRICING_PLANS_MATRIX_V1.md` (qui indique notamment d’autres quotas et une offre Enterprise). Les prix peuvent également dépendre des plans configurés côté backend, de la devise et du fallback d’affichage. Il faut réconcilier la page tarifaire, les plans actifs en production, leur enforcement backend et la matrice interne avant de publier une grille chiffrée ou de promettre une limite contractuelle.

### Recommandation de modèle

- **Free** : découverte autonome avec un plafond assez bas pour inciter à tester une vraie session, sans remplacer les usages récurrents.
- **Paiement à la session** : achat simple pour un événement ponctuel, un essai en entreprise ou un facilitateur indépendant.
- **Pro** : abonnement pour une équipe qui anime régulièrement.
- **Pro+ / offre organisation** : comptes managers multiples, volume accru et vente accompagnée. N’ajouter des engagements comme SSO, SLA, support dédié ou personnalisation qu’une fois disponibles et contractualisables.

Ne pas figer ici un prix recommandé : tester la disposition à payer sur des entretiens et des pilotes payants, par segment et par marché. Mesurer la conversion, l’usage récurrent, le coût de service et les raisons de refus avant d’optimiser les tarifs.

## 4. Stratégie go-to-market

### Segment de départ

Commencer avec un seul segment accessible aux fondateurs : équipes RH/People Ops et responsables de formation qui organisent régulièrement des sessions, puis les managers d’équipes hybrides ou distribuées. Le facilitateur indépendant et l’agence d’animation sont des canaux partenaires à tester, pas nécessairement le premier client cible.

Choisir le marché géographique initial selon l’accès réel aux prospects et la capacité à vendre et servir dans leur langue. Le produit comporte des parcours français et anglais et des paramètres de devise ; cela ne suffit pas, à lui seul, à prouver une demande dans chaque pays.

### Message par segment

- **RH / People Ops :** un format réutilisable pour animer des temps d’équipe et suivre la participation.
- **Managers :** préparer une session guidée sans avoir à inventer un scénario de bout en bout.
- **Facilitateurs / agences :** structurer et répliquer des sessions interactives ; tester une offre partenaire et le partage de revenus seulement après validation opérationnelle.

### Canaux et séquence de vente

1. **Vente fondatrice ciblée** : entretiens et démonstrations à des responsables RH, formation et managers de réseaux pertinents.
2. **Pilote accompagné** : une session réelle, un objectif explicite, une prise en main guidée, puis un retour du décideur et des participants.
3. **Conversion** : proposer Free pour la découverte, le paiement à la session pour l’usage ponctuel et Pro pour les usages répétés. Conclure les premiers abonnements par une offre pilote limitée et datée, non par une remise permanente.
4. **Répétabilité** : transformer les cas d’usage et retours autorisés en démonstrations, fiches de session et contenus utiles.
5. **Distribution partenaire** : après validation du processus de vente directe, tester des facilitateurs, agences et consultants en formation comme apporteurs ou opérateurs.
6. **Acquisition produit** : optimiser la page d’atterrissage et l’essai libre autour du premier résultat obtenu : création d’une session, démarrage, puis achèvement d’un challenge.

### Plan d’exécution indicatif

| Période | Priorité | Livrables et critères de décision proposés |
|---|---|---|
| Semaines 1–4 | Découverte | 20 entretiens acheteurs/utilisateurs ; documenter le problème, les outils actuels, la fréquence, le budget et les critères d’achat |
| Mois 2–3 | Pilotes | 5 à 8 pilotes accompagnés ; mesurer le temps de préparation, le taux de démarrage et d’achèvement, les irritants et l’intention de réachat |
| Mois 4–6 | Conversion | Formaliser l’offre, les prix et l’onboarding ; viser 10 organisations payantes comme objectif de travail, sous réserve de validation des pilotes |
| Mois 7–12 | Répétabilité | Renforcer les canaux qui convertissent, obtenir des usages récurrents, tester un partenaire ; n’augmenter les dépenses d’acquisition qu’avec un coût d’acquisition et une rétention mesurés |

Ces volumes sont des objectifs proposés, et non des résultats existants.

### Indicateurs à suivre

- **Acquisition** : prospects qualifiés, démonstrations, coût par opportunité et source du prospect.
- **Activation** : comptes créés → session créée → première session démarrée → session terminée.
- **Valeur** : délai entre création et démarrage, part des sessions terminées, réutilisation par facilitateur, participation observée. Les métriques de participation décrivent l’activité enregistrée et ne prouvent pas à elles seules la qualité de l’engagement.
- **Monétisation** : conversion pilote vers paiement, revenu récurrent, revenu par compte, expansion et annulation.
- **Économie commerciale** : coût d’acquisition complet, marge brute par offre et délai de récupération du CAC, à calculer dès qu’il existe suffisamment de ventes.

Établir une définition instrumentée des étapes du funnel et vérifier le consentement analytics. Les documents projet signalent que la mesure analytique n’est pas encore un modèle d’événements canonique et uniformément déployé : ne pas présenter les KPI comme fiables avant validation de la collecte.

## 5. Plan de financement — scénario de travail

### Besoin proposé

**Hypothèse de levée : 300 000 € en pré-amorçage pour financer environ 15 mois d’exécution**, soit un budget moyen de 20 000 € par mois. Ce montant est une proposition de cadrage, pas un besoin confirmé par les comptes de l’entreprise. Il doit être recalculé à partir de la trésorerie disponible, des rémunérations, des coûts employeur, des devis de développement, des impôts et de la juridiction de la société.

### Allocation indicative

| Poste | Budget | Part | Utilisation |
|---|---:|---:|---|
| Équipe et charges | 165 000 € | 55 % | Capacité produit/technique, commercialisation fondatrice et accompagnement client ; effectif à dimensionner selon les coûts réels |
| Produit, cloud et sécurité | 36 000 € | 12 % | Fiabilité du live, instrumentation, hébergement, maintenance, sécurité et outils |
| Vente, acquisition et contenu | 51 000 € | 17 % | Prospection, démonstrations, expérimentations d’acquisition, matériel de vente et cas clients autorisés |
| Juridique, administration et conformité | 18 000 € | 6 % | Contrats, comptabilité, assurance, protection des données et obligations locales |
| Réserve de trésorerie | 30 000 € | 10 % | Aléas, décalage de ventes et coûts imprévus |
| **Total** | **300 000 €** | **100 %** | |

Le plan doit privilégier une équipe réduite et les investissements qui réduisent les risques produit et commerciaux. Ne pas engager les dépenses de croissance avant d’avoir validé le passage du pilote au paiement et l’usage répété.

### Jalons de financement

- **Mois 0–3 :** confirmer le segment, le problème payé et les critères d’achat ; réaliser les premiers pilotes ; fixer une définition fiable des KPI.
- **Mois 4–6 :** convertir les pilotes en paiements, clarifier le packaging, mesurer les premiers usages répétés et corriger les obstacles à l’activation.
- **Mois 7–12 :** démontrer un canal d’acquisition reproductible et une économie de service soutenable ; décider de l’embauche commerciale ou produit supplémentaire sur données.
- **Mois 13–15 :** atteindre une décision informée sur le prochain financement, l’autofinancement ou la réduction du rythme de dépenses, selon la traction réelle.

### Scénarios de financement à examiner

1. **Pré-amorçage en fonds propres** : adapté à une phase de validation rapide, mais à structurer selon le pays, la gouvernance et la dilution acceptée.
2. **Subventions / aides à l’innovation** : à investiguer selon le siège, l’éligibilité et la nature des travaux, sans les compter dans le plan de base avant accord.
3. **Revenus pilotes et abonnements** : à favoriser dès que possible pour financer l’apprentissage et vérifier la volonté de payer.

La dette ou les engagements de dépenses importants ne sont pas recommandés avant d’avoir stabilisé la demande, la marge et la récurrence des revenus.

## 6. Pitch investisseur

### Version orale — environ 60 secondes

> Les entreprises savent qu’il faut créer des moments de cohésion, mais organiser une expérience qui mobilise réellement toute l’équipe demande encore de préparer l’activité, d’animer le groupe et de faire le bilan avec plusieurs outils. TeamBlender rassemble ce parcours dans une plateforme : le manager construit sa session, invite les participants, anime des challenges en direct et consulte les résultats. Le produit est déjà au stade MVP, avec des parcours manager et participant, plusieurs formats interactifs et un modèle d’offres Free, paiement à la session et abonnements. Notre thèse est qu’en simplifiant la préparation et en rendant l’expérience réutilisable, nous pouvons faire du team-building un usage plus régulier, pas seulement un événement ponctuel. Nous voulons maintenant valider le segment prioritaire, la conversion vers le paiement et la rétention avec des pilotes mesurés. Nous proposons une levée pré-amorçage de 300 000 € pour financer environ 15 mois de validation commerciale, d’amélioration produit et de mise en place d’un canal répétable. Ces chiffres sont un scénario de travail, à confirmer avec la trésorerie et les coûts réels.

### Version courte — environ 20 secondes

> TeamBlender aide les managers et les RH à concevoir, animer et suivre des sessions de team-building interactives dans un seul outil. Le MVP est construit ; la prochaine étape est de transformer des pilotes en usages payants et récurrents. Nous cadrons une levée pré-amorçage de 300 000 € pour financer cette validation sur environ 15 mois.

### Questions à anticiper en rendez-vous

- Quelle preuve montre que les entreprises paieront, puis réutiliseront le produit ?
- Qui achète, qui anime et à quelle fréquence le besoin se répète-t-il ?
- Quelles solutions ou pratiques remplacent TeamBlender aujourd’hui ?
- Quelle offre convertit le mieux : achat à la session ou abonnement ?
- Quelles sont les données vérifiées de clients, revenus, usage et rétention ?
- Quelles capacités sont déjà en production, et quelles promesses restent à construire ?
- Comment le budget, l’équipe et la durée de runway ont-ils été calculés ?

Répondre avec les données effectives et les limites mesurées ; ne pas substituer les objectifs du plan aux résultats.

## 7. Informations nécessaires pour finaliser le dossier investisseur

- Pays d’établissement, forme juridique et devise de levée.
- Taille et rôles de l’équipe, rémunérations prévues et recrutements.
- Trésorerie actuelle, dépenses mensuelles, dettes et financements déjà obtenus.
- Nombre de comptes, organisations payantes, chiffre d’affaires, utilisation et rétention — avec période et définitions.
- Entretiens, pilotes et témoignages pouvant être cités avec autorisation.
- Marché prioritaire, alternatives concurrentes et données de marché sourcées.
- Prix actuellement configurés en production et marge associée à chaque offre.
- Montant, instrument, dilution ou conditions recherchées auprès des investisseurs.

## Sources produit consultées

- `README-fonctionnel.md` — parcours, usages et challenges.
- `README-technique.md` — architecture et fonctionnalités de la plateforme.
- `frontend-next/app/pricing/PricingPageClient.js` et `frontend-next/lib/pricingFallbackPlans.js` — offres affichées et valeurs de repli.
- `docs/product/PRICING_PLANS_MATRIX_V1.md` — matrice tarifaire interne, à réconcilier avec l’interface.
- `docs/analytics-event-model.md` et `docs/session-kpi-definition.md` — limites de mesure et définitions analytiques.
