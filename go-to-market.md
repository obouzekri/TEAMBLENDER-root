# Go-to-market TeamBlender (analyse + assets prêts à l'emploi)

Date: 2026-10-16  
Statut: Draft opérationnel (sans implémentation produit)

**Mise à jour V2:** le segment retenu est celui des **managers d'équipes hybrides en scale-up**. La section 11 constitue le plan ciblé à utiliser en priorité; les sections 1 à 10 restent le cadrage initial. Les fonctionnalités proposées, objectifs et exemples ne sont ni des capacités garanties en production, ni des résultats commerciaux acquis.

**Extension stratégique:** la section 12 explore la conduite du changement, l'éducation du marché, la montée en compétences, la cohésion dans les établissements éducatifs et les colonies de vacances. Ce sont des pistes à qualifier, pas des marchés déjà validés. Elles élargissent la vision sans imposer un lancement simultané.

## 1) Objectif

Identifier **une évolution développable** qui augmente la conversion, puis structurer un go-to-market exécutable avec:
- approche commerciale,
- segments et potentiel client,
- drafts d'emails,
- exemples de posts LinkedIn,
- plan d'expérimentation.

---

## 2) Analyse rapide de la conversion (constats)

### Ce qui existe déjà (vu dans le repo)
- Positionnement SaaS live clair (préparer -> lancer -> suivre -> résultats).
- Parcours manager/participant structuré.
- Module de proposition de programme déjà présent côté builder (base utile pour une offre guidée).
- Pricing en paliers visible côté produit.

### Frictions probables de conversion
1. **Promesse encore large**: "plateforme de team building" peut sembler générique sans preuve rapide.
2. **Décalage pricing/documentation**: la matrice documentaire et certains éléments de pricing UI ne semblent pas toujours alignés; cela peut créer de la confusion en vente.
3. **Passage essai -> valeur business**: la valeur "mesurable" post-session n'est pas toujours mise en avant comme livrable commercial immédiat.

### Opportunité principale
Transformer la vente d'un outil en vente d'un **résultat rapide**:  
**"Pilote mesuré en 7 jours"**.

---

## 3) Proposition développable prioritaire (levier conversion)

## Feature recommandée: "Pilot-to-Plan"

### Promesse
En 7 jours:
1. création d'une session pilote,
2. animation d'un challenge réel,
3. livraison d'un mini-rapport d'équipe,
4. proposition d'abonnement adaptée.

### Pourquoi cette feature peut mieux convertir
- Réduit le risque perçu (on vend une preuve, pas un abonnement direct).
- Accélère le "time-to-value".
- Donne un support concret au décideur RH/manager pour achat interne.

### Spécification fonctionnelle (niveau draft)
1. **Template "Pilote 30 minutes"** dans la création de session.
2. **Checklist d'onboarding**: objectif, taille d'équipe, date, animateur.
3. **Rapport auto post-session** (format simple): participation, progression, points forts, recommandation de prochaine session.
4. **CTA upgrade contextualisé** vers plan adapté (selon volume/session).
5. **Email post-pilote prérempli** partageable au sponsor interne.

### KPI d'impact (à instrumenter)
- Signup -> session créée
- Session créée -> session lancée
- Session lancée -> session terminée
- Session terminée -> rapport consulté
- Rapport consulté -> plan payant

---

## 4) Approche go-to-market (90 jours)

## Phase 1 (S1-S2): ciblage + message
- Segment primaire: RH/People Ops + managers d'équipes hybrides (20 à 300 collaborateurs).
- Message central: **"Testez une session d'équipe en 7 jours et repartez avec un bilan factuel."**
- Actif clé: one-pager "Pilote mesuré" + exemple de rapport.

## Phase 2 (S3-S6): prospection pilotée
- Outbound: emails + LinkedIn sur ICP ciblés.
- Inbound: contenu LinkedIn orienté problématiques concrètes (cohésion hybride, activation, engagement).
- Objectif: obtenir des pilotes datés (pas seulement des démos).

## Phase 3 (S7-S12): conversion & répétabilité
- Transformer chaque pilote en décision payante (pay-per-session ou Pro).
- Standardiser script de vente, objection handling, séquence de relance.
- Identifier le meilleur canal (fondateur, partenaire, contenu, referrals).

---

## 5) Potentiel client (segments prioritaires)

## ICP A — RH / People Ops (PME et ETI)
- Douleur: animer la cohésion sans charge opérationnelle excessive.
- Trigger: onboarding, changement d'organisation, équipes hybrides.
- Offre d'entrée: pilote accompagné.

## ICP B — Managers d'équipes distribuées
- Douleur: engagement inégal, rituels peu structurés.
- Trigger: baisse de dynamique d'équipe, besoin d'alignement.
- Offre d'entrée: session thématique récurrente.

## ICP C — Cabinets/facilitateurs (partenaires)
- Douleur: industrialiser la delivery de sessions.
- Trigger: besoin de format réplicable multi-clients.
- Offre d'entrée: pack partenaire + volume.

## Comptes à qualifier (liste de travail)
- 30 comptes RH/People Ops (France/Maroc selon priorité commerciale).
- 20 équipes tech/produit en mode hybride.
- 10 partenaires facilitation/formation.

Critères de qualification:
- fréquence d'animation d'équipe,
- distribution géographique des équipes,
- existence d'un budget "people/culture/formation",
- sponsor interne identifié.

---

## 6) Drafts email (prêts à personnaliser)

## Email 1 — Prospection initiale (RH/People Ops)
Objet: Cohésion d'équipe hybride: pilote mesuré en 7 jours

Bonjour {{Prénom}},

Je vous contacte car beaucoup d'équipes RH ont aujourd'hui le même défi: organiser des temps de cohésion efficaces sans alourdir la préparation.

Avec TeamBlender, on propose un format simple:
- 1 session pilote,
- 1 animation live,
- 1 mini-rapport de résultats partageable en interne.

Objectif: vous permettre d'évaluer rapidement si le format mérite un déploiement plus large.

Ouvert(e) à un échange de 20 min cette semaine?

Bien à vous,  
{{Signature}}

---

## Email 2 — Relance courte (J+3/J+5)
Objet: Re: pilote cohésion en 7 jours

Bonjour {{Prénom}},

Je me permets une relance rapide.  
L'idée n'est pas de remplacer vos initiatives actuelles, mais d'ajouter un format prêt à lancer, mesurable, et réutilisable.

Si utile, je peux vous envoyer un exemple de rapport post-session (1 page).

Souhaitez-vous que je vous le partage?

{{Signature}}

---

## Email 3 — Post-pilote (conversion)
Objet: Suite au pilote TeamBlender — proposition de déploiement

Bonjour {{Prénom}},

Merci pour votre participation au pilote.

Résumé:
- Participation: {{x}}%
- Session complétée: {{oui/non}}
- Points forts observés: {{...}}
- Recommandation: {{1 session/mois, onboarding, rituel d'équipe...}}

Si vous souhaitez industrialiser ce format, je vous propose:
- {{offre conseillée}}
- {{cadence recommandée}}

Disponible pour cadrer la suite cette semaine.

{{Signature}}

---

## 7) Exemples de posts LinkedIn

Ces textes sont des brouillons. N'annoncer un pilote, une offre ou un livrable qu'après confirmation de sa disponibilité. Aucun témoignage client n'est établi dans ce document.

## Post 1 — Problème marché (awareness)
Le vrai sujet en équipe hybride n'est pas "faire une activité".  
C'est créer un format répétable qui:
1) se prépare vite,  
2) s'anime sans friction,  
3) produit un résultat exploitable.

C'est exactement ce qu'on teste avec TeamBlender via des pilotes mesurés en 7 jours.

Si vous pilotez RH/People Ops, je peux partager notre trame de pilote.

#teamblending #hybridwork #peopleops #rh #engagement

---

## Post 2 — Retour terrain (preuve)
**Gabarit à publier uniquement après un pilote réel, avec accord du client et données vérifiées.**

Nous avons terminé un pilote TeamBlender avec {{équipe autorisée ou description anonymisée}}.

Le contexte: {{besoin confirmé par le manager}}.
Le format: {{durée réelle}}, {{effectif réel}}, {{challenge joué}}.
Le constat: {{résultat vérifié et définition de la mesure}}.
Le retour du manager: {{citation autorisée, sinon supprimer cette ligne}}.

Ce bilan décrit cette session, pas un diagnostic de cohésion ou une preuve de productivité.

Je peux partager la trame utilisée pour préparer le pilote.

#leadership #management #teamcohesion #saas

---

## Post 3 — Appel à partenaires
Facilitateurs, consultants RH, agences:  
si vous animez des sessions d'équipe, on cherche des partenaires pour tester un format co-brandé:
- sessions prêtes à lancer,
- logique réplicable multi-clients,
- reporting simple pour vos sponsors.

DM ouvert pour en parler.

#facilitation #formation #partenariat #futureofwork

---

## 8) Cadre conformité prospection (France — rappel pratique)

Pour les campagnes email B2B:
- information claire sur l'émetteur et l'objet,
- finalité professionnelle pertinente,
- droit d'opposition simple et immédiat (désinscription),
- conservation de la preuve et gestion des oppositions.

Sources officielles à suivre avant envoi massif:
- CNIL — Prospection commerciale par voie électronique:  
  https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel
- Ministère de l'Économie — obligations sur les courriels commerciaux:  
  https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/entreprises-quelles-sont-vos-obligations-en-matiere-de-courriel-commercial

---

## 9) Plan d'exécution hebdomadaire (6 semaines)

S1: finaliser message + one-pager + template rapport  
S2: constituer 60 comptes cibles + personnalisation légère  
S3: lancer séquence outbound (email + LinkedIn)  
S4: exécuter 5 à 8 pilotes  
S5: proposer offres adaptées + relances décision  
S6: revue funnel + itérations pricing/message/offre

---

## 10) Décision recommandée

Priorité business:
1. lancer l'offre commerciale "Pilote mesuré en 7 jours",  
2. développer la feature "Pilot-to-Plan" (template + rapport auto + CTA upgrade),  
3. mesurer strictement le funnel conversion pilote -> abonnement.

Cette combinaison est probablement le moyen le plus direct de faire progresser la conversion tout en soutenant un go-to-market lisible.

---

## 11) V2 ciblée — Managers d'équipes hybrides en scale-up

### 11.1 Décision et hypothèse à valider

**Ne pas vendre un jeu de plus. Aider un manager à passer de "j'aimerais faire quelque chose avec mon équipe" à une session datée, préparée et justifiable en interne.**

Hypothèse de conversion: le frein n'est pas seulement le manque de preuves après la session. Il peut aussi être l'effort nécessaire pour choisir un format, réunir les collègues et obtenir le feu vert du responsable. Un kit concret, partageable avant le premier lancement, pourrait lever ce frein.

Cette hypothèse n'est pas démontrée par les données du dépôt. La valider en entretien et par un test accompagné avant d'investir dans le développement.

### 11.2 ICP précis, rôles et déclencheurs

Les tailles ci-dessous sont des critères de ciblage proposés, pas une estimation du marché.

| Dimension | Cible initiale |
|---|---|
| Organisation | Scale-up avec plusieurs équipes et fonctionnement hybride ou distribué |
| Taille indicative | 50 à 500 collaborateurs dans l'entreprise; pilote avec une seule équipe |
| Utilisateur champion | Engineering Manager, Product Lead, Customer Success Lead ou responsable d'équipe |
| Groupe pilote | 4 à 6 collègues, uniquement si le challenge et l'offre active acceptent cet effectif |
| Acheteur possible | Manager avec budget délégué; sinon Head of Engineering/Product/CS ou People Ops |
| Vérificateurs éventuels | Finance, achats, IT ou référent protection des données selon les règles internes |
| Déclencheur | Arrivée de collègues, réorganisation, nouvelle équipe distribuée ou rituel collectif à renouveler |
| Signal d'exclusion | Recherche d'un diagnostic psychométrique, d'un grand événement sur mesure ou d'une intégration indispensable non disponible |

Ne pas présenter l'hybridation comme un problème en soi. Chercher un besoin exprimé, une échéance et une personne capable de porter le test.

### 11.3 Fonctionnalité à développer: le « Kit première session »

**Recommandation:** rendre Pilot-to-Plan tangible par un kit de session prêt à adapter et à partager, avant d'automatiser un rapport élaboré.

Parcours cible:
1. Le manager indique l'occasion, la durée disponible et l'effectif estimé, sans importer de données personnelles de collègues.
2. Il obtient une proposition compatible avec le catalogue, les durées et les règles d'effectif.
3. Il consulte une fiche: déroulé, prérequis, rôle de l'animateur, temps de jeu et temps de débrief distincts.
4. Il copie une invitation et un message de demande de validation interne.
5. Après authentification, il retrouve la proposition, la confirme et crée sa session dans les limites de son offre.
6. Après la session, il consulte un bilan factuel et choisit entre une nouvelle session ponctuelle ou une cadence récurrente.

**Angle différenciant:** le manager repart avec de quoi organiser et faire approuver la session, pas uniquement avec une liste de challenges.

#### Découpage et limites

| Périmètre | Proposition | Statut / garde-fou |
|---|---|---|
| Sélection guidée | Réutiliser le moteur de proposition de programme du builder | Déjà documenté; ne pas créer un second algorithme divergent |
| Aperçu avant inscription | Montrer la fiche d'un programme suggéré | Extension envisagée; seulement des informations publiques du catalogue |
| Continuité après inscription | Restaurer les critères et revalider le programme | Extension envisagée; couvrir vérification email et OAuth, expiration, catalogue modifié et quotas |
| Kit à copier | Invitation, script d'animation, demande de budget | Extension envisagée; pas d'envoi automatique aux collègues |
| Bilan | Données disponibles + retour déclaré du manager | Automatisation envisagée; ne pas inventer de métrique indisponible |
| Prochaine session | Reprendre les paramètres et confirmer une nouvelle date | Extension envisagée; pas de création ou de facturation silencieuse |

Pour l'aperçu, ne pas exposer de session réelle, de résultats individuels ou de lien d'accès participant. La création, le lancement et les permissions restent contrôlés côté serveur. Si aucune proposition n'est compatible, expliquer quels critères ajuster; ne pas fabriquer un programme.

**MVP recommandé:** un modèle de pilote, la fiche de préparation, les textes à copier et la reprise après connexion. Garder le rapport manuel au début si les données ne permettent pas encore une restitution automatisée fiable.

Hors MVP: diagnostic de personnalité, score global de cohésion, IA générative obligatoire, intégrations Slack/Teams/calendrier, envoi de campagnes, portail partenaire et moteur complet de recommandations RH.

#### Critères d'acceptation du futur développement

- La proposition respecte la durée de jeu cible et les règles d'effectif du catalogue; le débrief est annoncé séparément.
- La création après inscription conserve les critères et explique les changements de disponibilité ou de plan.
- Aucune promesse d'accès ne contourne les droits du compte ou les quotas.
- L'invitation copiée n'inclut un lien participant qu'une fois la session réellement créée et autorisée.
- Le bilan distingue participants assignés, résultats enregistrés et contributions observables; une donnée absente est indiquée comme indisponible.
- Le CTA payant affiche une offre et un montant confirmés par le parcours de facturation, sans paiement automatique.

### 11.4 Positionnement, offre et page de conversion

**Phrase courte:** « Votre prochaine session d'équipe hybride, préparée plutôt qu'improvisée. »

**Promesse à tester:** « Un programme adapté, une invitation prête à copier et un déroulé pour animer votre première session. »

« 30 minutes » désigne un format de session proposé, pas un temps de préparation garanti. « En 7 jours » désigne une fenêtre de pilote à convenir avec le prospect, pas une garantie d'amélioration de la cohésion.

| Élément | Brouillon |
|---|---|
| Titre de page | Préparez votre prochaine session d'équipe hybride |
| Sous-titre | Choisissez votre occasion et votre durée. Repartez avec une proposition de programme et les éléments pour organiser la session. |
| CTA principal futur | Préparer ma première session |
| CTA secondaire | Voir un exemple de déroulé |
| CTA disponible pendant le test manuel | Demander un pilote accompagné |
| Réassurance | Exemple clairement identifié; règles et limites de l'offre visibles avant confirmation |

Ne pas remplacer toutes les pages par ce message avant validation. Tester une page ou une campagne dédiée au segment.

**Offre pilote proposée:** une équipe, un créneau convenu, aide à la préparation, une session et un bilan factuel. Confirmer par écrit le prix, la durée, l'effectif, le niveau d'accompagnement et ce qui est inclus. Ne pas promettre la présence d'un animateur sans capacité opérationnelle confirmée.

Pour tester la volonté de payer, proposer d'abord un pilote payant à périmètre fixe. Une éventuelle session de recherche offerte doit être identifiée comme telle et ne compte pas comme une vente. Aucun prix ferme ici: réconcilier les plans actifs, les limites et le coût d'accompagnement avant devis.

### 11.5 Clients potentiels et constitution d'une liste exploitable

Les lignes suivantes sont des **profils de comptes à rechercher**, pas des entreprises identifiées ni des intentions d'achat vérifiées.

| Profil potentiel | Contact métier à rechercher | Signal public à vérifier | Angle du premier message |
|---|---|---|---|
| Éditeur SaaS avec recrutement distribué | Engineering Manager | Annonces récentes mentionnant travail à distance et équipe concernée | Accueil de nouveaux collègues dans un collectif existant |
| Scale-up avec équipes produit sur plusieurs sites | Product Lead | Page carrière ou organisation décrivant plusieurs implantations | Session commune sans organiser un déplacement |
| Entreprise numérique avec équipe Customer Success distribuée | CS Team Lead | Offre d'emploi ou communication officielle sur cette organisation | Temps collectif distinct des réunions de suivi client |
| Équipe issue d'une nouvelle organisation | Responsable de l'équipe concernée | Réorganisation annoncée publiquement, sans en inférer des tensions | Installer un premier rituel partagé |

Commencer avec **30 comptes**, dans une seule zone francophone que l'équipe peut réellement servir. La langue ne suffit pas à choisir le pays: vérifier accès commercial, paiement, support et obligations locales.

Fiche de prospection à renseigner:

| Champ | Contenu attendu |
|---|---|
| Entreprise et site officiel | Nom réel après recherche |
| Source et date | URL exacte du signal public, date de consultation |
| Signal observé | Fait vérifié, distinct de l'hypothèse de besoin |
| Rôle pertinent | Fonction du manager, sans coordonnées personnelles collectées inutilement |
| Hypothèse | Pourquoi ce format pourrait être utile, à confirmer |
| Qualification | Occasion, effectif, échéance, sponsor, budget et contraintes |
| Suivi | Étape, prochain échange, raison du refus ou opposition |

Score de priorité interne: 0 à 2 points pour chacun des critères suivants: besoin confirmé, échéance dans les 30 jours, sponsor identifié, compatibilité produit et capacité d'achat. Prioriser les comptes à 7/10 ou plus; une opposition ou une incompatibilité indispensable exclut le compte, quel que soit le score.

Le potentiel commercial doit être calculé à partir de la liste réelle: comptes qualifiés × taux de pilote observé × taux d'achat observé × revenu moyen confirmé. Ne pas transformer les 30 comptes de test en estimation du marché total.

### 11.6 Approche commerciale et séquence

1. Vérifier un signal public et sélectionner un seul interlocuteur pertinent par compte.
2. Envoyer un message court lié à ce signal, sans prétendre connaître la dynamique interne.
3. Proposer un exemple de déroulé avant de demander un rendez-vous.
4. En cas d'intérêt, qualifier en 15 minutes puis convenir d'une date de pilote.
5. Faire un bilan et proposer une prochaine session seulement si un besoin récurrent est exprimé.

**Cadence proposée:** email à J0, relance utile à J+4, clôture à J+10. LinkedIn peut remplacer un contact, pas ajouter une relance simultanée sur tous les canaux. Arrêter immédiatement en cas d'opposition, de refus ou de réponse; adapter les délais aux jours ouvrés.

Les brouillons ci-dessous supposent que l'accompagnement et l'exemple de déroulé sont réellement disponibles. Ils ne prétendent pas que le Kit première session est déjà développé.

#### Email J0 — Manager

**Objet:** Un format pour votre prochaine session d'équipe ?

Bonjour {{Prénom}},

J'ai vu {{signal public précis + source}}. Je ne sais pas comment vous organisez vos temps collectifs aujourd'hui.

TeamBlender permet de préparer des défis collaboratifs, de les animer en direct et d'utiliser les résultats pour un débrief.

Nous proposons de tester un format court avec une équipe, avec une aide à la préparation. L'idée: vérifier si cela mérite une place dans vos rituels, sans engager un déploiement global.

Puis-je vous envoyer un exemple de déroulé ?

{{Signature professionnelle et entreprise}}

#### Email J+4 — Apporter un exemple

**Objet:** Re: Un format pour votre prochaine session d'équipe ?

Bonjour {{Prénom}},

Voici le principe du format proposé: 5 minutes de consignes, 15 minutes de défi compatible et 10 minutes de débrief. Le challenge et l'effectif restent à confirmer ensemble.

Le manager repart avec trois questions: qu'est-ce qui a aidé le groupe, qu'est-ce qui l'a ralenti et que souhaite-t-il tester la prochaine fois ?

Ce format correspond-il à une occasion prévue dans votre équipe ?

{{Signature}}

#### Email J+10 — Clôture

**Objet:** Je clos le sujet pour le moment

Bonjour {{Prénom}},

Je n'insiste pas davantage. Si une session d'équipe devient pertinente plus tard, je pourrai vous transmettre un exemple de programme.

Bonne continuation,

{{Signature}}

**Pied de message à adapter et joindre à chaque email de prospection:** « Je vous contacte au titre de votre rôle professionnel, à partir de {{source réelle}}. Informations sur l'utilisation de vos données et vos droits: {{URL réelle de la notice}}. Pour ne plus être contacté, répondez simplement "stop". »

Ne pas envoyer avec des champs non remplacés. Traiter l'opposition avant toute relance, conserver une liste d'exclusion minimale et définir une durée de conservation justifiée. Ce modèle ne remplace pas une validation juridique pour le pays ciblé.

#### Message LinkedIn — Après acceptation d'une invitation

Bonjour {{Prénom}}, merci pour la connexion. Je travaille sur TeamBlender, pour préparer et animer des défis d'équipe en direct. Pour une équipe hybride comme {{contexte vérifié}}, je cherche à comprendre ce qui freine le plus l'organisation: trouver le format, réunir l'équipe ou obtenir le budget. Si le sujet vous concerne, je peux partager une trame de session courte.

Ne pas automatiser une collecte massive ni relancer sur LinkedIn une personne ayant demandé l'arrêt des sollicitations.

#### Email au sponsor — À copier par le manager

**Objet:** Validation d'un test TeamBlender pour {{équipe}}

Je propose de tester une session le {{date}}, pour {{effectif confirmé}} personnes, sur {{durée totale}}.

Objectif pratique: {{occasion et attente réaliste}}.
Périmètre: {{challenge, préparation, animation et bilan convenus}}.
Coût total et conditions: {{montant, devise, taxes et conditions confirmés}}.
Contraintes à valider: {{accès, données, achats éventuels}}.

Après le test, nous regarderons le déroulement, le retour de l'équipe et l'intérêt d'une autre session. Ce n'est pas une évaluation individuelle des collaborateurs.

Peux-tu confirmer l'accord sur ce périmètre avant {{date}} ?

#### Email après pilote — Décision, pas pression

**Objet:** Bilan du test et prochaine étape pour {{équipe}}

Bonjour {{Prénom}},

Voici le bilan de la session du {{date}}:
- {{nombre}} participants assignés; {{nombre}} avec au moins un résultat enregistré;
- {{progression factuelle disponible}};
- votre retour sur la préparation: {{retour réel, ou "à recueillir"}};
- limite ou difficulté rencontrée: {{fait vérifié}}.

Ces chiffres décrivent l'activité enregistrée, pas le niveau de cohésion de l'équipe.

Vous avez évoqué {{prochaine occasion confirmée}}. Préférez-vous une prochaine session ponctuelle, une proposition pour un usage régulier ou en rester à ce test ?

{{Signature}}

### 11.7 Script d'entretien et objections

**Entretien de 15 minutes:** 5 minutes sur le contexte, 5 sur un exemple, 5 sur la décision de test.

Questions:
- Quelle est la prochaine occasion pour laquelle vous cherchez un format collectif ?
- Comment faites-vous aujourd'hui et qu'aimeriez-vous simplifier ?
- Qui anime, pour combien de personnes et avec combien de temps disponible ?
- Qui valide le budget et quelles contraintes d'accès ou de données faut-il vérifier ?
- Qu'est-ce qui vous ferait décider de refaire une session après le test ?

| Objection | Réponse proposée |
|---|---|
| « Nous avons déjà un quiz ou Miro. » | Gardez ce qui fonctionne. Le test doit montrer si le parcours préparation, live et bilan apporte une valeur supplémentaire pour votre usage. |
| « L'équipe n'a pas le temps. » | Ne pas ajouter un rituel sans raison. Vérifions s'il existe un créneau collectif déjà prévu et si un format court y est pertinent. |
| « Mes collègues n'aiment pas le team-building. » | Présentons une activité et ses règles concrètes, sans obligation de confidence personnelle. Si le format ne convient pas, ne pas forcer le pilote. |
| « Comment prouvez-vous le ROI ? » | Nous n'avons pas de preuve causale de productivité. Le test peut mesurer le temps de préparation, le déroulement et l'intérêt déclaré pour recommencer. |
| « Il faut l'accord IT/RH. » | Documenter les données et les accès réels. Ne pas promettre de SSO, d'hébergement particulier ou de certification non vérifiés. |
| « Nous n'avons pas de budget. » | Clarifier s'il existe un circuit d'achat et une échéance. Ne pas confondre intérêt pour une session gratuite et volonté de payer. |

### 11.8 Posts LinkedIn adaptés au manager

Ces brouillons n'incluent aucun résultat client inventé. Vérifier l'offre et préparer la ressource promise avant publication.

#### Post A — Le frein d'organisation

Une session d'équipe peut rester des semaines dans une todo.

Pas forcément faute d'envie.
Il faut choisir le format, trouver un créneau, expliquer les règles et parfois obtenir un accord.

Avec TeamBlender, nous voulons simplifier ce passage entre l'idée et une session réellement organisée.

Notre hypothèse: un programme adapté et une invitation prête à copier peuvent être plus utiles qu'un catalogue supplémentaire.

Managers d'équipes hybrides: quelle étape vous prend le plus de temps aujourd'hui ?

#Management #EquipesHybrides #TeamBuilding

#### Post B — Ressource concrète

Un exemple de session courte à adapter à votre équipe:

- 5 minutes pour expliquer le défi;
- 15 minutes de jeu, si le format retenu le permet;
- 10 minutes pour revenir sur l'expérience.

Trois questions de débrief:
1. Qu'est-ce qui nous a aidés ?
2. Où avons-nous perdu du temps ?
3. Que voulons-nous essayer la prochaine fois ?

Ce n'est pas un diagnostic de l'équipe. C'est un point de départ pour discuter d'une expérience commune.

J'ai préparé une trame de session. Je peux vous la transmettre si le sujet vous est utile.

#EngineeringManagement #Facilitation #TravailHybride

#### Post C — Recrutement de pilotes

Vous managez une équipe hybride et cherchez un format pour un prochain temps collectif ?

Nous ouvrons des échanges pour tester TeamBlender avec une équipe: préparation d'un programme, défis collaboratifs en direct et débrief.

L'objectif est simple: vérifier si le format est facile à organiser et s'il mérite d'être réutilisé.

Le périmètre, l'effectif, la date et le tarif du pilote sont convenus avant engagement.

Si vous avez une occasion précise dans les prochaines semaines, écrivez-moi.

#ProductLeadership #Management #TeamBuilding

**Calendrier éditorial de départ:** une publication utile par semaine pendant trois semaines. Mesurer les conversations qualifiées et les pilotes obtenus, pas seulement les vues ou les likes. Réutiliser un retour terrain uniquement avec autorisation.

### 11.9 Test de conversion et indicateurs

**Étape 1 — Concierge, sans développement:** sur 30 comptes ciblés, chercher 10 entretiens et 5 pilotes réalisés. Ce sont des objectifs d'apprentissage, pas une prévision. Construire manuellement les kits et relever les objections, le temps d'accompagnement et les décisions.

**Étape 2 — Développement conditionnel:** automatiser le kit si au moins 3 managers sur 5 pilotes l'utilisent réellement pour organiser ou faire valider la session, et si au moins 2 organisations effectuent ensuite un achat pour une prochaine session. Ces seuils sont des règles de décision proposées sur un petit échantillon, pas une preuve statistique.

Si les managers ne lancent pas, corriger l'accès ou la préparation avant le rapport. S'ils lancent mais ne rachètent pas, examiner le besoin récurrent, la qualité de l'expérience et le prix avant d'ajouter des automatisations.

| Indicateur | Définition et fenêtre proposées |
|---|---|
| Réponse positive | Comptes exprimant un intérêt / comptes contactés, à J+14 du premier contact |
| Activation | Organisations ayant lancé une première session / organisations inscrites du même groupe, à J+14 de l'inscription |
| Usage du kit | Managers utilisant au moins un élément du kit pour organiser le pilote / managers ayant reçu le kit |
| Pilote vers achat suivant | Organisations achetant une prochaine session ou un abonnement / organisations ayant terminé le pilote, dans les 30 jours suivants |
| Récurrence | Organisations ayant lancé une deuxième session / organisations ayant terminé la première, dans les 30 jours suivants |
| Effort de service | Minutes de préparation et d'accompagnement internes par pilote |
| Marge pilote | Revenu net du pilote moins coûts variables et coût du temps d'accompagnement |

Toujours publier les nombres bruts avec les taux et attendre la fin de la fenêtre avant de comparer les cohortes. Un pilote déjà payé et un achat suivant sont deux événements commerciaux distincts.

Pour le futur test produit, comparer le parcours habituel et le parcours avec kit sur une audience comparable. Indicateur principal: première session lancée à J+14; garde-fous: erreurs de création, abandons, coût de support et achats confirmés. Éviter de changer simultanément prix, canal et onboarding. Avec peu de trafic, privilégier les entretiens et les cohortes successives sans prétendre établir une causalité.

**Instrumentation:** conserver les événements existants d'inscription et de lancement; définir ensuite les événements du kit, de création confirmée, de fin de session et de paiement. Un clic d'upgrade n'est pas un achat; une ouverture de résultats n'est pas une fin de session. Vérifier les paiements côté facturation, dédupliquer par organisation et respecter les choix de consentement. Ne pas envoyer de noms, d'emails ou de contenu du débrief dans les analytics.

### 11.10 Plan d'action ciblé sur 30 jours

| Période | Action | Livrable / décision |
|---|---|---|
| Semaine 1 | Vérifier offres et contraintes, préparer une trame, qualifier 30 comptes | Fichier de suivi sourcé, exemple identifié comme fictif, périmètre et tarif confirmés |
| Semaine 2 | Lancer les messages personnalisés et mener les entretiens | Besoins formulés par les managers et pilotes datés |
| Semaine 3 | Réaliser les premiers pilotes, assembler les kits manuellement | Temps passé, usages du kit, bilan factuel et objections |
| Semaine 4 | Proposer une prochaine session et consolider les enseignements | Décision provisoire sur le MVP; poursuivre la mesure jusqu'à J+30 après chaque pilote |

Ne pas annoncer à la fin du mois un taux d'achat à 30 jours pour des pilotes réalisés la semaine précédente.

### 11.11 Références internes et garde-fous avant diffusion

- [Parcours et proposition de programme](README-fonctionnel.md): base de la réutilisation du builder.
- [Stratégie commerciale initiale](docs/TEAMBLENDER_STRATEGIE_COMMERCIALE_FINANCEMENT.md): contexte et incertitudes commerciales.
- [Matrice des offres](docs/product/PRICING_PLANS_MATRIX_V1.md): à rapprocher des plans actifs et du parcours de paiement, sans reprendre ses quotas comme promesse contractuelle.
- [Définition des KPI](docs/session-kpi-definition.md): limites des mesures de participation et de contribution.
- [Modèle analytics](docs/analytics-event-model.md): événements existants, propositions et limites du funnel.

Checklist de diffusion:
- [ ] Le prix, l'effectif et les fonctionnalités annoncés correspondent à l'offre réellement disponible.
- [ ] Les supports distinguent clairement prototype, service accompagné et fonctionnalité livrée.
- [ ] Les champs des messages sont remplacés et chaque signal commercial est sourcé.
- [ ] Le mécanisme d'opposition, la notice et le traitement des données sont opérationnels.
- [ ] Aucun chiffre client, logo, témoignage ou gain de performance n'est utilisé sans preuve et autorisation.
- [ ] L'exemple de bilan est marqué fictif; les données d'un vrai pilote restent confidentielles hors accord.

**Priorité finale pour ce segment:** tester le Kit première session en accompagnement manuel, puis développer ce qui fait effectivement passer les managers de l'intérêt à une session lancée et à un achat suivant. L'automatisation du rapport vient après la validation de ce passage.

---

## 12) Extension — Changement, apprentissage et cohésion éducative

### 12.1 Vision élargie et positionnement à tester

**Thèse:** TeamBlender pourrait devenir un support d'expériences collectives guidées pour faire travailler un groupe ensemble, ouvrir une discussion et préparer une action.

Cela permet d'explorer plusieurs occasions d'achat au-delà du team-building ponctuel:
- accompagner une transformation dans une organisation;
- aider des collaborateurs à exercer des compétences dans une activité suivie d'un débrief;
- faciliter l'intégration et la coopération dans un groupe d'élèves ou d'étudiants;
- proposer des activités collectives encadrées en séjour de vacances.

**Positionnement transversal proposé:** « Des défis collaboratifs pour créer une expérience commune, en tirer des enseignements et préparer la suite. »

Conserver ensuite un message distinct par public. Un responsable de transformation, un formateur, un enseignant et un directeur de séjour n'achètent ni pour les mêmes raisons, ni avec les mêmes contraintes.

Ce positionnement ne démontre pas que les jeux existants enseignent une compétence, changent les comportements ou conviennent aux enfants. Chaque usage exige une validation du contenu, du cadre d'animation et du besoin réel.

### 12.2 Clarifier deux notions différentes

| Notion | Finalité | Exemple pour TeamBlender |
|---|---|---|
| Éducation du marché | Aider des prospects à comprendre une approche, ses usages et ses limites | Expliquer comment passer d'une activité ludique à un débrief utile, sans promettre de diagnostic |
| Montée en compétences | Aider des apprenants à atteindre un objectif pédagogique explicite | Exercer une méthode de coordination, recevoir un retour puis tenter de la réutiliser |

L'éducation du marché est un levier d'acquisition transversal. La formation est un usage produit et une offre commerciale à concevoir avec des professionnels compétents. Produire du contenu pédagogique marketing ne fait pas automatiquement de TeamBlender une plateforme de formation.

### 12.3 Carte des segments et clients potentiels

Les profils ci-dessous sont des cibles de recherche. Aucun établissement, cabinet ou organisme n'est présenté comme client ou prospect intéressé.

| Axe | Clients / organisations à qualifier | Acheteur ou prescripteur | Occasion de test | Critère de qualification déterminant |
|---|---|---|---|---|
| Conduite du changement | Entreprises en transformation et cabinets de conseil | Responsable transformation, Change Manager, direction métier, consultant | Atelier de lancement, nouvelle organisation ou nouveau processus | Projet réel, sponsor et atelier daté |
| Montée en compétences | Services formation, organismes de formation, académies internes | Responsable L&D, ingénieur pédagogique, formateur | Module de communication, coordination ou résolution collective | Objectif pédagogique précis et professionnel capable de l'évaluer |
| Enseignement supérieur | Universités, écoles de commerce ou d'ingénieurs, associations encadrées | Responsable vie étudiante, enseignant, responsable de promotion | Intégration d'une promotion ou projet de groupe | Encadrant, effectif, matériel et cadre d'achat identifiés |
| Écoles et établissements accueillant des mineurs | Établissements scolaires, réseaux éducatifs, associations périscolaires | Direction, enseignant, coordinateur pédagogique | Activité de coopération adaptée à l'âge | Validation pédagogique, protection des mineurs et autorisations applicables |
| Colonies et accueils de loisirs | Organisateurs de séjours, associations, gestionnaires d'accueils collectifs | Organisateur, directeur de séjour, responsable pédagogique | Accueil du groupe ou activité collective encadrée | Projet pédagogique, tranche d'âge, équipement et connexion compatibles |
| Partenaires de distribution | Cabinets de changement, formateurs, associations éducatives | Responsable d'offre ou dirigeant | Co-conception puis animation d'un premier atelier | Partenaire prêt à porter l'animation et à expliciter la valeur ajoutée |

Séparer le nombre de personnes dans l'organisation de l'effectif effectivement compatible avec une session. Une classe ou une colonie entière ne peut pas être promise comme groupe jouable sans vérification des moteurs, des offres et de l'encadrement.

### 12.4 Conduite du changement — Une mise en situation, pas une preuve d'adhésion

**Besoin à explorer:** les ateliers de transformation peuvent manquer d'un support concret pour faire discuter les participants de leur manière de coopérer. Vérifier ce problème en entretien plutôt que le présumer.

**Offre pilote proposée:** « Atelier coopération et changement ».

Trame à co-concevoir avec un professionnel de la conduite du changement:
1. Le sponsor précise le contexte et une question de travail, sans demander de classement individuel.
2. Le facilitateur choisit un défi dont les contraintes permettent d'aborder cette question.
3. Le groupe réalise l'activité.
4. Le facilitateur distingue ce qui s'est passé dans le jeu des situations de travail évoquées volontairement.
5. Le groupe formule une action à essayer dans le contexte réel.
6. Un échange ultérieur vérifie si l'action a été tentée et ce qu'elle a apporté.

Exemple fictif: utiliser une activité de coordination pour ouvrir une discussion sur le partage d'information lors d'un nouveau processus. Ne pas prétendre simuler ce processus si le challenge ne le fait pas.

**Livrables envisageables:** fiche d'atelier, questions de débrief, action collective décidée et date de suivi. Le compte rendu doit être validé par les participants avant circulation et ne pas exposer de propos sensibles.

**Limites:** ni mesure d'adhésion à la transformation, ni détection de salariés « résistants », ni remplacement du dialogue social ou d'un accompagnement spécialisé. La participation au jeu ne démontre pas l'acceptation d'un changement.

**Levier de conversion:** un cabinet ou un sponsor peut acheter un atelier avec une question et un livrable précis plutôt qu'un accès générique au catalogue. À tester avant de développer des scénarios métier.

### 12.5 Montée en compétences — Construire une vraie boucle pédagogique

**Offre à explorer:** « Défi + débrief + mise en pratique » pour des collaborateurs adultes.

Compétences candidates à travailler avec un formateur: communication explicite, coordination, répartition des rôles et résolution collective de problèmes. Leur présence dans un jeu ne prouve pas leur acquisition.

| Étape | Contenu proposé | Preuve recherchée |
|---|---|---|
| Avant | Un objectif observable et une consigne adaptée | Le participant comprend ce qu'il va exercer |
| Pendant | Une activité choisie pour cet objectif | Observations contextualisées, sans diagnostic personnel |
| Après | Débrief et exercice d'application | Le participant explique ou applique la méthode visée |
| À distance | Retour à une date convenue, par exemple deux semaines après | Exemple déclaré ou observé de réutilisation dans une situation réelle |

Exemple d'objectif à faire valider: « À la fin de l'atelier, le groupe peut expliciter qui transmet quelle information et comment vérifier qu'elle est comprise. »

**Fonctionnalités candidates:** fiche d'objectif pédagogique, trame de débrief, notes privées du formateur et suivi d'une action volontaire. Prévoir les droits d'accès et la confidentialité avant toute collecte.

Ne pas proposer de certification, de financement de formation ou de reconnaissance réglementaire sans avoir vérifié les exigences locales et la situation de l'organisme. Les scores du jeu ne doivent pas être utilisés pour évaluer la performance professionnelle des salariés.

**Levier de conversion:** vendre d'abord un module accompagné à un organisme ou une équipe formation, puis tester un besoin de sessions répétées. Ne pas construire un LMS complet avant cette validation.

### 12.6 Écoles, étudiants et cohésion de groupe

**Deux sous-segments à distinguer:**
- enseignement supérieur: accueil de promotion, lancement de projet et coopération entre étudiants; vérifier néanmoins la présence éventuelle de mineurs;
- établissements scolaires: activités soumises à l'âge, au cadre pédagogique et à une validation spécifique par l'établissement.

**Offre pilote à explorer:** une activité de coopération animée par un encadrant, suivie de questions adaptées au groupe. Favoriser l'objectif collectif et le droit à l'erreur, sans classement public des élèves.

Questions de qualification:
- Quel est l'âge des participants et quel objectif pédagogique l'encadrant poursuit-il ?
- L'activité est-elle compréhensible sans compte personnel ni adresse email d'élève ?
- Quel matériel est disponible, pour combien de participants et avec quelle connexion ?
- Les élèves ont-ils des besoins d'accessibilité, de lecture ou de langue à prendre en compte ?
- Qui valide le contenu, les conditions d'utilisation et le traitement des données ?

**Fonctionnalités envisageables, non garanties actuellement:** interface adaptée à l'âge, accès supervisé avec pseudonymes non identifiants, consignes simplifiées, contrôles d'animation et contenus relus par des professionnels de l'éducation.

Un mode « un appareil par groupe » pourrait faciliter certains usages mais demande une adaptation et une validation spécifiques. Il ne doit pas être annoncé comme disponible.

**Limites:** ne pas promettre d'amélioration des résultats scolaires, de prévention du harcèlement ou de résolution de difficultés psychologiques. Ne pas présenter les résultats comme une évaluation des capacités d'un élève.

**Levier de conversion:** donner à l'établissement une fiche prête à examiner: objectif, âge visé, matériel, déroulé, données traitées et rôle de l'encadrant. La clarté de ce dossier peut compter davantage qu'une démonstration ludique.

### 12.7 Colonies de vacances et accueils de loisirs

**Besoin à vérifier:** disposer d'activités collectives faciles à prendre en main, adaptées au projet du séjour et à des groupes qui viennent de se rencontrer.

**Offre exploratoire:** un kit d'animation pour une activité ponctuelle encadrée, et non un remplacement des activités physiques, créatives ou de plein air.

Usages candidats:
- accueil et découverte du groupe;
- défi collectif pendant un temps prévu au programme;
- activité de repli lorsque les conditions du séjour le nécessitent.

Contraintes à vérifier avant proposition:
- âge, lecture, durée d'attention et caractère approprié des contenus;
- matériel réellement disponible, accès aux appareils et politique de temps d'écran;
- qualité du réseau; aucun mode hors ligne n'est établi ici;
- accessibilité, consignes et supervision par l'équipe d'animation;
- calendrier d'achat avant le séjour, budget saisonnier et possibilité de réutilisation.

**Évolutions candidates:** fiche animateur imprimable, mode supervisé, bibliothèque par tranche d'âge et éventuellement jeu sur appareil partagé. Une fiche imprimable ne rend pas le moteur de jeu utilisable hors ligne.

**Modèle commercial à tester:** licence pour un séjour ou une période, uniquement après définition des limites, de l'assistance et des droits de réutilisation. Ne pas promettre un forfait illimité ou une marque blanche sans offre opérationnelle.

**Levier de conversion:** démonstration à l'équipe d'animation et validation du kit avant le départ. Éviter la vente directe aux enfants et les messages commerciaux dans leur interface.

### 12.8 Garde-fous transversaux pour les mineurs

Ce sont des conditions préalables à l'ouverture de ces usages, pas une attestation de conformité actuelle.

- Faire valider l'activité et les conditions d'âge par l'organisateur et un professionnel compétent.
- Définir les responsabilités de l'établissement ou de l'organisateur et de TeamBlender, ainsi que la base juridique, l'information et les autorisations applicables dans le pays concerné. Le consentement parental n'est pas une réponse universelle.
- Vérifier les conditions d'utilisation et le fonctionnement réel des comptes avant tout pilote avec des mineurs.
- Minimiser les données: privilégier un accès supervisé et ne pas demander par défaut d'email personnel, de photo, de date de naissance précise ou de donnée sensible.
- Encadrer l'accès aux résultats, la conservation et l'effacement; éviter le suivi individuel entre établissements ou séjours.
- Examiner les échanges entre participants, les contenus libres et les liens partagés; ne pas ouvrir de communication non supervisée avec des inconnus.
- Vérifier les outils analytics et traceurs; ne pas réutiliser par défaut le dispositif marketing destiné aux adultes.
- Prévoir un arrêt de l'activité par l'encadrant, une alternative pour les personnes ne pouvant pas participer et un canal de signalement.
- Ne pas publier de nom, d'image, de résultat identifiable ou de témoignage d'enfant sans validation du cadre applicable et autorisations requises.

Si ces conditions ne sont pas établies, conduire uniquement des entretiens et des démonstrations avec les adultes responsables. Ne pas utiliser un pilote commercial pour contourner cette vérification.

### 12.9 Éducation du marché — Un canal pour toutes les offres

**Objectif:** aider l'acheteur à décider quand une activité collective est utile, comment l'animer et ce qu'il peut raisonnablement en conclure.

| Contenu à préparer | Public | Message clé | Appel à l'action |
|---|---|---|---|
| Guide « Activité, débrief et action: trois étapes distinctes » | Managers, RH, consultants | Un jeu ne produit pas à lui seul un changement durable | Consulter une trame d'atelier |
| Fiche « Participation n'est pas compétence » | Formation, transformation | Distinguer activité enregistrée, apprentissage et transfert | Cadrer un objectif observable |
| Démonstration commentée | Formateurs et facilitateurs | Montrer le rôle de l'animateur, pas seulement l'écran | Demander un atelier de découverte |
| Checklist d'activité éducative | Enseignants et organisateurs | Vérifier âge, matériel, supervision et données avant de lancer | Échanger sur les contraintes |
| Retour terrain autorisé | Un segment précis | Décrire contexte, limites et résultat réel | Explorer un cas comparable |

Privilégier des ressources consultables sans formulaire. Si un email est nécessaire pour envoyer un document, ne pas l'assimiler automatiquement à une inscription à une newsletter.

**Funnel à suivre:** contenu consulté, échange qualifié, projet daté, pilote, achat, réutilisation. Une audience ou des téléchargements ne constituent pas une validation commerciale.

### 12.10 Drafts d'emails par nouvel axe

Brouillons de découverte à personnaliser. Réutiliser le pied d'information et d'opposition de la section 11.6 pour la prospection; contacter les professionnels adultes, jamais les mineurs. Ne pas annoncer une fonctionnalité encore envisagée comme disponible.

#### Email — Responsable transformation ou cabinet

**Objet:** Un support collaboratif pour vos ateliers de changement ?

Bonjour {{Prénom}},

J'ai consulté {{source professionnelle réelle}} au sujet de {{contexte vérifié}}.

Avec TeamBlender, nous explorons un format associant défi collaboratif et débrief animé pour ouvrir une discussion sur les façons de travailler ensemble.

L'objectif n'est pas de mesurer l'adhésion des collaborateurs, mais de fournir une expérience commune à partir de laquelle construire une action.

Seriez-vous disponible pour confronter ce format à un de vos cas d'atelier ?

{{Signature}}

#### Email — Responsable formation ou organisme

**Objet:** Tester un défi collaboratif dans un module de formation

Bonjour {{Prénom}},

Nous souhaitons étudier avec des professionnels de la formation comment intégrer TeamBlender à un module de coopération ou de communication.

L'approche envisagée: un objectif observable, une activité adaptée, un débrief et une mise en pratique. Nous ne présentons pas les scores du jeu comme une preuve d'acquisition.

Avez-vous un module pour lequel une mise en situation collective mériterait d'être testée ?

{{Signature}}

#### Email — Enseignement ou vie étudiante

**Objet:** Échange sur vos activités d'intégration et de coopération

Bonjour {{Prénom}},

Je vous contacte au sujet de {{programme ou responsabilité vérifiés}}.

Nous explorons l'usage de défis collaboratifs encadrés pour l'intégration d'un groupe ou le lancement d'un projet collectif.

Avant toute proposition, nous souhaitons comprendre vos objectifs, les âges concernés, le matériel disponible et vos exigences pédagogiques et de protection des données.

Accepteriez-vous un échange de découverte ? Il ne s'agit pas à ce stade d'annoncer une offre scolaire déjà validée.

{{Signature}}

#### Email — Organisateur de colonies ou d'accueils de loisirs

**Objet:** Vos besoins d'activités collectives pour les prochains séjours

Bonjour {{Prénom}},

Nous étudions une adaptation de TeamBlender aux activités de coopération encadrées en séjour.

Avant de concevoir une offre, nous souhaitons comprendre les contraintes des équipes d'animation: âge des groupes, appareils, connexion, temps d'écran et préparation des activités.

Auriez-vous un retour à partager sur ce qui vous serait réellement utile ? Aucun test avec des mineurs ne serait organisé avant validation du cadre et du contenu.

{{Signature}}

### 12.11 Exemples de posts LinkedIn

#### Post — Conduite du changement

Faire jouer une équipe ne prouve pas qu'elle adhère à un changement.

En revanche, une expérience collective peut offrir un point de départ concret pour discuter:
- de la circulation de l'information;
- de la répartition des rôles;
- de ce que le groupe souhaite essayer autrement.

C'est cette articulation entre défi, débrief et action que nous souhaitons explorer avec TeamBlender.

Professionnels de la conduite du changement: à quelles conditions ce support serait-il utile dans vos ateliers ?

#ConduiteDuChangement #Facilitation #IntelligenceCollective

#### Post — Montée en compétences

Participation, réussite dans un jeu et acquisition d'une compétence sont trois choses différentes.

Pour utiliser un défi en formation, la question n'est pas seulement « est-ce engageant ? ».

Il faut aussi préciser:
1. Ce que l'on veut exercer.
2. Ce que l'on peut observer.
3. Comment débriefer.
4. Comment réutiliser l'apprentissage ailleurs.

Nous souhaitons confronter cette approche à des formateurs et responsables pédagogiques pour TeamBlender.

Quelle compétence se prête le mieux, selon vous, à une mise en situation collective ?

#Formation #DeveloppementDesCompetences #PedagogieActive

#### Post — Cohésion éducative et séjours

Une activité de coopération ne se transpose pas telle quelle d'une entreprise à une école ou à une colonie.

L'âge, les consignes, les appareils disponibles, l'accessibilité, les données et le rôle de l'encadrant changent tout.

Nous explorons ces contextes pour TeamBlender en commençant par écouter les adultes qui les connaissent: enseignants, responsables de vie étudiante et équipes d'animation.

Avant de parler d'outil, quelle est votre contrainte principale pour organiser une activité collective ?

#Education #Animation #Cooperation

### 12.12 Priorisation et validation — Élargir sans se disperser

Ordre d'exploration proposé, fondé sur la proximité avec le produit documenté, et non sur une taille de marché démontrée:

| Priorité | Axe | Pourquoi explorer dans cet ordre | Condition avant investissement produit |
|---|---|---|---|
| 1 | Managers hybrides | Segment déjà cadré et parcours existant proche | Valider lancement et achat suivant selon la section 11 |
| 2 | Changement et formation d'adultes | Réutilisation possible des sessions et du débrief avec un partenaire expert | Obtenir un cas concret, un animateur compétent et une volonté de payer |
| 3 | Enseignement supérieur | Occasion collective proche, mais contraintes institutionnelles à comprendre | Valider encadrement, âges, budget et données |
| 4 | Écoles, colonies et accueils de loisirs | Potentiel d'usage à étudier, adaptation et protection des mineurs plus exigeantes | Valider le cadre pédagogique, juridique et technique avant un pilote |

**Sprint exploratoire séparé du développement:** mener trois entretiens avec des adultes responsables pour chacun des quatre axes: changement, formation, établissements éducatifs et séjours. Ces 12 entretiens sont une cible de recherche, pas une campagne de vente déjà lancée.

Pour chaque entretien, documenter:
- un usage concret et sa date;
- la solution actuelle et ce qu'elle ne permet pas;
- l'acheteur et le circuit de décision;
- le budget ou la manière de le déterminer;
- les adaptations indispensables;
- les contraintes d'animation, de données et d'âge;
- la prochaine étape acceptée, plutôt qu'une simple réaction positive.

Ne sélectionner qu'un nouvel axe pour un premier test accompagné. Seuil proposé: au moins deux interlocuteurs décrivent un besoin comparable et l'un accepte une prochaine étape datée avec un périmètre et un budget discutés. Ce signal justifie un test, pas la construction d'une verticale complète.

### 12.13 Conséquences pour la roadmap et la conversion

**Socle réutilisable à privilégier:** fiche de session par objectif, programme compatible, guide d'animation, questions de débrief et bilan factuel. C'est une extension cohérente du Kit première session.

**Adaptations à ne pas mutualiser aveuglément:** contenus enfants, gestion des comptes, droits sur les résultats, collecte de notes, règles de conservation et modalités d'animation. Une simple page marketing par segment ne suffit pas à rendre le produit adapté.

Leviers de conversion à comparer:
- entreprise: obtenir une validation interne et une date;
- changement: rattacher l'atelier à une question de projet;
- formation: présenter un objectif et un dispositif pédagogique crédibles;
- école: permettre une validation du cadre pédagogique et des données;
- colonie: démontrer une prise en main compatible avec les conditions du séjour.

Mesurer séparément, par axe, les projets qualifiés, délais de décision, pilotes autorisés, achats, réutilisations et coûts d'adaptation. Ne pas agréger les taux d'une scale-up et d'un établissement scolaire comme s'ils suivaient le même parcours.

**Décision stratégique:** garder les managers hybrides comme point d'entrée commercial, explorer changement et formation avec des partenaires, puis n'ouvrir les usages éducatifs et de loisirs qu'après validation de leur cadre spécifique. L'éducation du marché soutient ces étapes par des contenus utiles, honnêtes et adaptés à chaque acheteur.
