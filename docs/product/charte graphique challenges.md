# TeamBlender - Charte Graphique Challenges (Reference Unique)

## 1) Objectif

Ce document est la reference visuelle unique pour tous les challenges runtime.
Il complete la charte globale produit et definit un langage UI coherent cote facilitateur et participants.

- Charte globale produit: docs/product/CHARTE_GRAPHIQUE_ACTUELLE.md
- Perimetre cible: frontend-next/components/Challenges/

## 2) Direction visuelle

Positionnement attendu:
- Professionnel
- Clair
- Oriente execution
- Fiable en contexte live

Direction choisie pour les challenges:
- Theme "control room" sombre, lisible et sobre
- Accent principal teal (action)
- Accent secondaire violet reserve aux highlights/insights
- Aucun style "jeu casual" ou surcharge decorative

## 3) Design tokens (obligatoires)

Tous les challenges doivent reposer sur ces tokens. Eviter les couleurs hardcodees hors cas exceptionnel.

### 3.1 Palette challenge

```
--ch-bg-1: #071520;
--ch-bg-2: #0d2331;
--ch-surface-1: rgba(10, 24, 36, 0.9);
--ch-surface-2: rgba(16, 33, 49, 0.9);

--ch-line-soft: rgba(160, 187, 208, 0.22);
--ch-line-strong: rgba(160, 187, 208, 0.46);

--ch-text-main: #e7eff6;
--ch-text-soft: #9cb2c7;

--ch-accent: #28b3d0;
--ch-accent-strong: #1d8aa2;
--ch-accent-soft: rgba(40, 179, 208, 0.16);

--ch-insight: #7c3aed;
--ch-insight-soft: rgba(124, 58, 237, 0.2);

--ch-success: #35b776;
--ch-warn: #f2a640;
--ch-danger: #ef6b6b;

--ch-radius-card: 14px;
--ch-radius-item: 10px;
--ch-shadow-card: 0 12px 28px rgba(2, 9, 16, 0.24);
```

### 3.2 Fond challenge standard

```
background:
	radial-gradient(1200px 560px at 8% -10%, rgba(40, 179, 208, 0.16), transparent 60%),
	radial-gradient(900px 440px at 90% 0%, rgba(55, 183, 118, 0.1), transparent 55%),
	linear-gradient(145deg, var(--ch-bg-1) 0%, var(--ch-bg-2) 60%, #112938 100%);
```

## 4) Typographie

Conserver la regle produit basee sur tokens:
- UI: `var(--font-ui)`
- Display: `var(--font-display)` (uniquement pour titres et mise en avant)

Echelle recommandee:
- H1 challenge: 1.5rem a 1.9rem, weight 700/800
- H2 section: 1rem a 1.2rem, weight 700
- Texte courant: 0.9rem a 1rem
- Meta/badges: 0.72rem a 0.8rem

Regles:
- Harmonisation challenge: toutes les feuilles CSS de `frontend-next/components/Challenges/` utilisent `var(--font-ui)` pour la typographie runtime.
- Numeriques (timer, score): tabular-nums
- Meta et labels: uppercase possible, tracking leger
- Contraste eleve texte/fond en toute circonstance

## 5) Composants transverses (obligatoires)

Chaque challenge doit utiliser les memes patterns visuels pour:

1. Header challenge
- Titre + sous-titre + badges statut
- Bordure soft + surface gradient sombre

2. Card standard
- Border: var(--ch-line-soft)
- Background: surface-1/surface-2
- Radius: var(--ch-radius-card)
- Shadow: var(--ch-shadow-card)

3. Badge
- Capsule arrondie
- Fond sombre legerement teinte
- Bordure visible

4. Boutons
- Primaire: gradient teal
- Secondaire: fond neutre sombre
- Ghost: transparent + bordure
- Hover: translateY(-1px) max

5. Timer
- Timer card unique
- Ring uniforme
- Mapping status/couleur obligatoire:
	- running + >55%: success
	- running + 20-55%: warn
	- running + <20%: danger
	- idle/paused: neutre

6. Chat
- Chat card unique
- Log, input, boutons harmonises
- Messages "mine" visuellement distingues, contraste AA

## 6) Layout par role

### 6.1 Desktop

- Facilitateur: grille 2 colonnes (main + sidebar)
- Participant: grille 2 colonnes compacte, plus dense que facilitateur

### 6.2 Mobile

- Passage en 1 colonne obligatoire <= 980px
- Actions tactiles min-height 44px
- Espacements reduits mais lisibles

### 6.3 Densite UI

- Participant: mode compact prioritaire
- Facilitateur: respiration legere pour pilotage et lecture globale

## 7) Accessibilite et lisibilite

Regles minimales:
- Contraste texte/fond: cible WCAG AA
- Focus visible sur tous les controles interactifs
- Zones cliquables suffisamment larges (>=44px mobile)
- Etats disabled, error, success visuellement explicites

## 8) Motion

Animation autorisee mais utilitaire:
- Hover: 140ms a 200ms
- Transition standard: 160ms a 240ms
- Pas d'animations distrayantes en live

Si prefers-reduced-motion actif:
- Reduire/supprimer animations non essentielles

## 9) Variantes challenge

La base est commune. Les variations sont limitees a l'identite du challenge:

- Escape room: accent secondaire ambre possible pour indices
- Phrase coop: accent secondaire bleu froid pour slots
- Mission critique: codage phase (cadrage/preparation/execution/cloture)
- Vrai ou mensonge: feedback vrai/faux via success/danger
- Copuzzle: emphasis visuelle sur grille et pieces, sans casser la base

Interdit:
- Refaire un theme complet par challenge
- Changer librement timer/chat/header d'un challenge a l'autre

## 10) Regles Copuzzle (MVP)

Reference produit pour configuration par defaut:

Si le manager ne configure rien:
- image par defaut obligatoire
- matrice par defaut: 4x4
- timer actif
- duree par defaut: 20 minutes
- chat actif

Config manager attendue (admin/session builder):
- choix image par defaut (catalogue)
- personnalisation image (upload ou URL selon contraintes techniques)

## 11) Plan d'application recommande

Ordre d'harmonisation conseille:

1. Extraire les tokens challenge partages (fichier commun)
2. Unifier Timer + Chat (composants/styles partages)
3. Aligner Mission Critique, Phrase Coop, Vrai ou Mensonge
4. Aligner Copuzzle et Escape Room
5. QA responsive mobile (390x844 et 844x390)

## 12) Definition of Done (charte respectee)

Un challenge est conforme si:

1. Il utilise les tokens partages et non des couleurs isolees
2. Header/Card/Badge/Timer/Chat suivent les patterns communs
3. Les variantes restent limitees au contenu metier
4. Le rendu mobile est valide
5. Les contrastes et focus states sont conformes

