# TeamBlender - Pixel Architect (MVP Spec)

Derniere mise a jour: 2026-05-28
Statut: concept cadre (pret pour implementation)
Owner propose: Product + Frontend Next + Backend realtime

## 1) Positionnement

Pixel Architect est un challenge collaboratif de construction 3D simplifiee (cubes/voxels en projection isometrique) oriente coordination d equipe sous contraintes.

Promesse equipe:
- Prioriser et s organiser vite
- Communiquer clairement
- Co-construire un resultat tangible

## 2) Objectif du challenge

Construire une structure a partir de cubes dans un temps limite, avec:
- un stock de cubes borne
- une palette de couleurs limitee
- des regles de collaboration explicites

Deux modes de jeu:
- Replication: reproduire un modele impose
- Creatif: inventer une structure selon un theme

## 3) Alignement plateforme (obligatoire)

Pixel Architect reutilise les composants transverses existants:
- Header challenge (meme structure visuelle)
- Panneau de regles (meme UI)
- Bouton Demarrer le challenge sous les regles
- Chrono global (meme logique de countdown)
- Chat temps reel (meme composant)
- Phases: Introduction -> Jeu -> Fin -> Debrief
- Vue facilitateur distincte de la vue participants
- Design tokens et patterns de la charte challenges
- Configurable depuis le session builder

Ajout metier specifique:
- 3 templates preconstruits pour le mode Replication

## 4) Experience de jeu

### 4.1 Introduction

Contenu affiche:
- objectif du challenge
- contraintes actives (temps, cubes, couleurs)
- mode (Replication/Creatif)
- mode de collaboration (Standard/Avance)
- roles si mode Avance

Action:
- le facilitateur clique Demarrer le challenge

### 4.2 Phase Jeu (construction)

Comportement:
- grille 3D simplifiee active
- placement/suppression/deplacement de cubes selon permissions
- synchronisation realtime de la structure
- chrono visible et actif (si active)
- chat actif (si active)
- compteur cubes restants
- palette couleurs autorisees
- indices progressifs (meme logique que Phrase Mystere)

### 4.3 Soumission finale

Fin de chrono:
- verrouillage automatique des interactions de build
- snapshot de la structure finale
- calcul score

Fallback facilitateur:
- action de cloture manuelle possible si chrono desactive

### 4.4 Debrief

Affichage:
- structure finale equipe
- comparaison au modele (mode Replication)
- score global + sous-scores
- timeline rapide (usage des ressources, messages, modifications)
- discussion guidee par facilitateur

## 5) Modes de collaboration

### 5.1 Standard (defaut)

- Canvas partage unique
- Tous voient la meme structure en direct
- Tous peuvent construire (selon role global simple)

Cas d usage:
- onboarding facile
- equipes qui debutent

### 5.2 Avance (roles asymetriques)

Roles assignes par le facilitateur dans un bloc sous les regles et avant le demarrage:
- Architecte: voit le modele (ou consignes completes)
- Builders: construisent sans voir le modele cible

Effet attendu:
- communication obligatoire
- coordination strategique plus forte

## 6) Parametrage Session Builder

## 6.1 Champs

Mode:
- Replication
- Creatif

Collaboration:
- Standard (ecran partage)
- Avance (roles)

Parametres:
- temps (defaut 15 minutes)
- nombre de cubes (defaut 50)
- nombre de couleurs (defaut 3)
- difficulte (facile/moyen/difficile)

Contenu:
- Replication: upload modele ou selection template
- Replication: choix parmi 3 templates predefinis
- Creatif: saisie theme

Options:
- activer/desactiver indices
- activer/desactiver chat
- activer/desactiver chrono

## 6.2 Valeurs par defaut

- mode: Replication
- collaboration: Standard
- temps: 15 min
- cubes: 50
- couleurs: 3
- indices: actifs
- difficulte: moyen

## 7) Templates predefinis (mode Replication)

Template 1 - Tour Signal
- silhouette verticale 3 niveaux
- difficulte: facile
- objectif: alignement de base + gestion hauteur

Template 2 - Pont Croise
- structure horizontale avec contrainte de symetrie
- difficulte: moyen
- objectif: coordination des sous-zones

Template 3 - Agora Pixel
- volume central + extensions laterales
- difficulte: difficile
- objectif: orchestration collective sous pression

Parametres template proposes:
- id
- nom
- difficulte
- dimensions max (x,y,z)
- nombre de cubes cible
- palette recommandee

## 8) Vue Participants (MVP)

Header:
- nom challenge
- statut phase

Zone principale:
- grille de construction 3D simplifiee
- actions build (placer/supprimer/changer couleur)

Panneau lateral:
- bouton regles (meme composant)
- chrono
- chat realtime
- cubes restants
- palette couleurs
- indicateur role (mode Avance)

## 9) Vue Facilitateur (MVP)

- meme base visuelle que participants
- panneau pilotage additionnel:
  - lancement
  - pause/reprise
  - cloture manuelle
  - diffusion indice
  - assignation roles (mode Avance)

Visibilite metier:
- progression equipe
- rythme de construction
- activite communication

## 10) Regles standard (exemple affiche)

- Respecter la limite de cubes
- Utiliser uniquement les couleurs disponibles
- Collaborer efficacement
- Respecter l objectif fixe (mode/consignes)

## 11) Mecanique d indices progressifs

Objectif:
- limiter blocages sans detruire l apprentissage collectif

Cadence proposee:
- indice 1 a 35% du temps ecoule
- indice 2 a 65%
- indice 3 a 85%

Exemples mode Replication:
- Indice 1: orientation globale
- Indice 2: erreur dominante (hauteur/couleur/symetrie)
- Indice 3: zone prioritaire finale

## 12) Systeme de score

Score global sur 100.

Pondération recommandee:
- Precision (Replication) ou Creativite (Creatif): 35
- Collaboration (chat utile + coordination): 20
- Efficacite ressources (cubes/couleurs): 15
- Robustesse structure (coherence globale): 10
- Respect des contraintes (temps/regles): 10
- Bonus rapidite: 10

### 12.1 Detaillage des sous-scores

Precision (Replication):
- correspondance forme: 20
- correspondance couleurs: 10
- ecart volumetrique: 5

Creativite (Creatif):
- respect du theme: 15
- originalite structurelle: 10
- lisibilite de l intention: 10

Collaboration:
- repartition d actions entre membres
- activite communication contextuelle (non-spam)
- faible taux de conflits d edition

Efficacite:
- cubes inutilises ou depasses
- changements couleur inutiles
- revisions tardives evitables

Bonus rapidite:
- applique seulement si objectif principal atteint
- formule lineaire sur temps restant

### 12.2 Metriques additionnelles utiles

- stabilite finale (peu de modifications en fin de partie)
- cadence equipe (actions/minute regularisees)
- ratio corrections/placements

## 13) Runtime payload propose (format cible)

Exemple de clefs utiles cote frontend:

- mode: replication | creatif
- collaborationMode: standard | avance
- difficulty: facile | moyen | difficile
- settings:
  - timeLimitSeconds
  - maxCubes
  - maxColors
  - hintsEnabled
  - chatEnabled
  - timerEnabled
- replication:
  - modelSource: template | upload
  - templateId
  - targetModel (si necessaire pour score serveur)
- creative:
  - theme
- advancedRoles:
  - architectParticipantIds
  - builderParticipantIds
- scoring:
  - weights

## 14) Evenements realtime (MVP)

Client -> serveur:
- cube:place
- cube:remove
- cube:updateColor
- challenge:requestHint
- challenge:submitFinal

Serveur -> clients:
- board:state
- board:delta
- challenge:timerTick
- challenge:hintPushed
- challenge:phaseChanged
- challenge:scoreReady

## 15) Criteres acceptance MVP

Produit:
- challenge configurable en session builder
- modes Replication et Creatif operants
- modes Standard et Avance operants
- debrief avec score global visible

Technique:
- synchronisation multi-participants stable
- verrouillage automatique fin de chrono
- snapshot final persiste
- compatibilite mobile basique (layout 1 colonne)

UX:
- prise en main en moins de 2 minutes
- regles claires avant demarrage
- feedback visuel clair lors du placement de cubes

## 16) Checklist QA minimale

- Builder: tous les champs de config sont sauvegardes/recharges
- Intro: bouton demarrage visible sous regles
- Jeu: placements simultanes sans desync evidente
- Jeu: compteur cubes et palette limites respectes
- Jeu: indices apparaissent selon config
- Fin: blocage automatique sur timeout
- Debrief: score global et sous-scores affiches
- Avance: architecte voit consigne cible, builders non

## 17) Nommage technique suggere

Engine key recommande:
- pixel_architect_v1

Nom catalogue:
- Pixel Architect

Category/type/source (a confirmer avec le referentiel actuel):
- category: team_building
- type: collaborative_realtime
- source: internal

## 18) Non-objectifs MVP (pour garder le scope)

- moteur physique 3D realiste
- rotation libre camera complexe
- marketplace public de templates
- IA de notation qualitative open-text

## 19) Next step implementation (ordre conseille)

1. Cadrer schema engine_config final
2. Implementer moteur backend tolerant aux configs manquantes
3. Integrer renderer challenge dans frontend-next
4. Brancher panel config session builder
5. Ajouter tests smoke cibles et QA manuelle
