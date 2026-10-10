# README fonctionnel - TeamBlender

Ce document présente le produit tel qu’il est perçu par un manager, un facilitateur ou un participant. L’objectif est de décrire le parcours utilisateur, les usages attendus et la valeur métier du produit.

## 1. Présentation du produit

TeamBlender est une plateforme professionnelle de team-building conçue pour aider les managers et les RH à animer des sessions de cohésion, d’alignement et d’engagement en mode live.

L’objectif est de proposer une expérience simple, structurée et engageante pour :
- créer une session de groupe ;
- inviter des participants ;
- choisir un challenge adapté ;
- lancer l’activité en direct ;
- suivre la progression en temps réel ;
- obtenir un résultat clair à la fin de la session.

## 2. Publics concernés

### Facilitateur / manager
Le facilitateur prépare la session, choisit les activités, pilote le déroulé et suit les résultats.

### Participant
Le participant rejoint une session, participe à l’activité assignée et interagit avec le groupe.

## 3. Parcours facilitateur

### Étapes principales
1. Se connecter à l’espace manager.
2. Créer ou éditer une session.
3. Sélectionner un ou plusieurs challenges.
4. Configurer les paramètres du challenge.
5. Assigner les participants.
6. Lancer la session en direct.
7. Piloter les étapes de la session.
8. Consulter les résultats et la fin de session.

### Expérience attendue
Le facilitateur doit pouvoir organiser rapidement une expérience de groupe sans friction, avec une logique claire et un suivi visuel de la progression.

## 4. Parcours participant

### Étapes principales
1. Se connecter à la session attribuée.
2. Consulter les sessions disponibles.
3. Rejoindre la bonne session.
4. Attendre le démarrage si aucun challenge n’est actif.
5. Participer au challenge en temps réel.
6. Voir les résultats ou la progression collective.

### Expérience attendue
Le participant doit pouvoir rejoindre l’activité simplement, comprendre rapidement ses actions et se sentir impliqué dans le déroulé collectif.

## 5. Fonctionnalités métier clés

### Création de sessions
Le manager peut préparer une session structurée avec des participants et des activités définies.

### Déroulé live
La session peut être lancée et pilotée en direct, avec un suivi de l’avancement des challenges.

### Challenges interactifs
Le produit propose plusieurs formats de challenge collaboratifs ou compétitifs, adaptés à des contextes professionnels.

### Suivi et résultats
Le facilitateur peut consulter l’évolution de la session et les résultats obtenus à la fin.

## 6. Challenges proposés

Le produit couvre actuellement plusieurs formats de challenges, parmi lesquels :
- Escape Room
- Phrase Mystère
- CoPuzzle
- Labyrinthe Live
- Mission Critique
- Vrai ou Mensonge
- Pixel Architect
- Mots croisés Live / Crossword Live

### Mots croisés Live

Une grille commune pour 2 à 5 participants, avec un chronomètre de 15 minutes
par défaut (configurable de 5 à 30 minutes). Le facilitateur choisit une grille
dans une bibliothèque de 30 grilles par langue. La langue sélectionnée par le
facilitateur au lancement de la session s'applique aux challenges des participants.

Le participant sélectionne un mot, lit sa définition hors de la grille et
propose une réponse dans un champ unique. Le premier à valider correctement gagne
un point ; chaque mot rapporte une seule fois. Les erreurs ne retirent aucun point.
Les lettres trouvées aident les autres joueurs aux intersections.

Les réponses ignorent casse, accents, espaces, apostrophes et tirets, mais pas les
synonymes ou changements de nombre. Un délai de deux secondes entre les essais et
une limite de cinq erreurs sur un mot en trente secondes limitent les tentatives
en rafale. Les mots ne sont pas réservés pendant la saisie.

La progression collective, les scores et les découvertes sont visibles en direct.
Les nouveaux arrivants peuvent jouer ; une reconnexion restitue la partie.
Le chronomètre serveur continue après déconnexion du facilitateur, sans pause.
La grille complète, l'échéance serveur ou un arrêt manuel terminent la partie.
Les scores, mots trouvés et mots non résolus sont conservés dans les résultats.
Les scores identiques restent ex aequo.

L'interface prend en charge le clavier, le mobile et les thèmes clair/sombre.
La V1 ne propose ni éditeur, ni génération de grilles à la demande, ni mode équipes,
ni lettres offertes ou indices supplémentaires.

Chaque challenge a un objectif de participation, de collaboration et de progression claire.

## 7. Valeur produit

TeamBlender vise à offrir :
- une expérience professionnelle et crédible ;
- un rythme de session simple à piloter ;
- une forte immersion collaborative ;
- une logique adaptée à des usages RH, management et formation.

## 8. Positionnement actuel

Le produit est aujourd’hui orienté MVP SaaS : il couvre les usages fondamentaux de préparation, lancement et suivi de sessions interactives. La priorité reste la clarté de l’expérience utilisateur, la simplicité d’utilisation et la capacité à évoluer vers une plateforme plus large à l’avenir.
