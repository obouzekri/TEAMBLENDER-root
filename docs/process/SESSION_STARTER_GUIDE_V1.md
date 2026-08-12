# Guide de demarrage session (v1)

## Positionnement
Ce nouveau parcours est pense pour aller vite, sans perdre le niveau de qualite attendu par un manager RH.

Promesse: une session peut etre creee en quelques secondes, meme sans participants pre-enregistres, puis enrichie progressivement jusqu'au lancement live.

## Pourquoi ce changement
- Moins de friction au demarrage.
- Plus de sessions creees et lancees.
- Meilleure experience manager: on construit d'abord le cadre, puis on complete les details.

## Parcours manager complet

### 1) Creation de session
1. Ouvrir le Session Builder.
2. Renseigner le nom de session (obligatoire).
3. Definir date/heure et mode de progression (optionnel).
4. Creer la session, meme sans participants selectionnes.

Message produit cle: la creation ne bloque plus sur la disponibilite des participants.

### 2) Invitation des participants
1. Copier le lien de participation partageable dans le panneau d'invitation.
2. Partager le lien par email, chat d'equipe ou outil interne.
3. Suivre le nombre d'inscrits depuis le Session Builder.

Message produit cle: le lien est stable et non expirable dans ce scope.

### 3) Ajouter des challenges
1. Parcourir le catalogue d'activites.
2. Ajouter les challenges adaptes a l'objectif de la session.
3. Organiser l'ordre des activities selon la dynamique souhaitee.

Message produit cle: le manager reste maitre du scenario pedagogique.

### 4) Configurer chaque challenge
1. Ouvrir la configuration du challenge choisi.
2. Ajuster les parametres de gameplay (temps, rythme, options specifiques).
3. Sauvegarder la configuration.

Message produit cle: les reglages sont pilotables sans quitter le builder.

### 5) Lancer la session
1. Verifier que le programme est pret.
2. Lancer la session depuis le builder.
3. Piloter la progression en live selon le mode choisi.

Message produit cle: passage naturel du setup au live, sans rupture d'experience.

## Parcours participant (via lien)
1. Ouvrir le lien recu.
2. Saisir prenom (requis), nom (optionnel), email (optionnel).
3. Rejoindre directement la session.
4. Acceder a l'experience en fonction de l'etat live.

## Regles metier
- Limites d'offre appliquees a l'ajout/rejoindre participant.
- En cas de limite atteinte: renvoyer PLAN_LIMIT_REACHED avec message clair.
- Pas d'expiration du lien dans cette version.
- Pas de capacite session explicite dans cette version.

## Messages UX recommandes
- Creation: "Votre session est creee. Vous pouvez inviter des participants maintenant ou plus tard."
- Etat vide participants: "Aucun participant pour l'instant. Partagez le lien de participation pour commencer les inscriptions."
- Limite d'offre: "La limite de participants de votre offre est atteinte."

## Checklist QA minimale
- Creation session avec 0 participant: succes.
- Lien de participation visible et copiable: succes.
- Join via lien avec identite minimale: succes.
- Ajout challenges + configuration challenge: succes.
- Lancement session depuis builder: succes.
- Limite d'offre atteinte: erreur metier claire, sans crash.

## Plan de deploiement
1. Briefer support et sales sur le nouveau parcours manager.
2. Mettre a jour captures ecran et scripts de demo.
3. Ajouter un smoke test quotidien: create empty session -> invite join -> configure challenge -> launch.
4. Suivre les erreurs PLAN_LIMIT_REACHED et SESSION_NOT_FOUND.
