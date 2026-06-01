# TeamBlender - Charte graphique actuelle

## 1) Perimetre de reference

Cette charte decrit le systeme visuel actuellement implemente dans le frontend cible:

- Source principale: `frontend-next/app/globals.css`
- Cible produit: `frontend-next/`
- Legacy frontend vanilla: retire du repository (historique Git uniquement)

## 2) Identite visuelle

- Positionnement visuel: professionnel, clair, rassurant, moderne.
- Ambiance generale: surfaces lumineuses, contraste doux, accents teal avec soutien violet.
- Promesse percue: outil manager/RH serieux, guide et orientee resultat.

## 3) Palette de couleurs (tokens actifs)

### Couleurs fondation

- `--bg`: `#f7f8f4`
- `--bg-soft`: `#eef1e7`
- `--card`: `#ffffff`
- `--line`: `#cfd8ca`

### Couleurs texte

- `--ink`: `#1e2a23`
- `--ink-soft`: `#516154`

### Couleurs marque / action

- `--accent`: `#0f766e`
- `--accent-strong`: `#0a5f59`
- `--accent-soft`: `#d9f1ee`
- `--accent-violet`: `#7c3aed`
- `--accent-violet-strong`: `#6d28d9`
- `--accent-violet-soft`: `#f1eaff`

### Etats semantiques

- Erreur: `--error-bg #fff1f1`, `--error-line #ef4444`, `--error-ink #991b1b`
- Succes: `--success-bg #eefbf6`, `--success-line #10b981`, `--success-ink #065f46`

### Couleurs statut session

- En cours: teal (`#0f766e` / `#115e59`)
- Preparee: bleu (`#1d4ed8` / `#1e40af`)
- Terminee: violet (`#7c3aed` / `#6d28d9`)

## 4) Typographie

- Police UI principale: `IBM Plex Sans`, fallback `Segoe UI`, sans-serif.
- Police display: `Sora`, fallback `IBM Plex Sans`, `Segoe UI`, sans-serif.
- Style typographique dominant:
  - Titres: poids fort (700-800), tracking legerement serre selon contexte hero.
  - Labels et meta: uppercase partiel + letter spacing pour clarte.
  - Texte courant: lisible, sobre, avec contraste modere (`--ink-soft` pour secondaire).

## 5) Formes, espacements et elevation

- Rayons dominants:
  - Pills/actions: `999px`
  - Inputs: 8-10px
  - Cartes: 14-24px selon niveau d'importance
- Ombres:
  - Cartes standards: ombres diffuses legeres
  - Hover: elevation renforcee (`translateY` + shadow plus profonde)
- Espacement:
  - Grilles et sections: rythme de 0.75rem a 1.5rem
  - Pages principales: padding vertical genereux (environ 2rem+)

## 6) Surfaces et arriere-plans

- Fond global: combinaison de gradients lineaires + halos radiaux subtils.
- Surfaces principales: blancs casses et verts tres pales.
- Hero blocks: gradients multicouches pour donner profondeur sans effet tape-a-l'oeil.

## 7) Composants UI structurants

### Navigation

- Header sticky avec blur et fond translucide.
- Brand en capsule arrondie, bord fin teinte accent.
- Liens de navigation en pills, etat actif visuel net (fond teinte + soulignement lumineux).
- Menu mobile avec panneau retractable (animation ouverture/fermeture).

### Boutons

- Primaire: gradient accent (`--accent` -> `--accent-strong`), texte blanc.
- Secondaire: fond clair, bord discret, hover teinte accent.
- Mini actions nav: version pill compacte coherente avec le header.

### Cartes

- Cartes fonctionnalites et sessions: fond clair, bord fin, ombre douce.
- A la survol: levee legere (`translateY`) + ombre augmentee.
- Cartes de statut: barre d'accent laterale selon etat.

### Formulaires

- Champs avec fond pale (`--field-bg`) et bord doux.
- Focus: anneau semi-transparent accent.
- Messages d'etat: blocs encadres explicites (erreur/succes).

### Badges et pills

- Usage frequent pour statut, meta, preuves, confiance.
- Style: capsules arrondies, bord fin, contraste maitrise.

## 8) Motion et interactions

- Animations presentes mais sobres:
  - `revealUp` a l'apparition de sections.
  - Pulsation legere sur certains liens actifs.
  - Transitions hover rapides (~0.18s a 0.24s).
- Micro-interactions recurrentes:
  - `translateY(-1px/-2px)` sur hover.
  - Renforcement de bordure et ombre sur focus/hover.

## 9) Responsive actuel

- Breakpoints principaux utilises: 900px, 860px, 768px, 480px.
- Strategie:
  - Passage des grilles multi-colonnes en colonne unique.
  - Navigation desktop -> menu mobile togglable.
  - Actions et boutons qui prennent toute la largeur sur petits ecrans.
  - Reduction de densite visuelle sans rupture de style.

## 10) Regles de coherence a conserver

- Prioriser la lisibilite et la clarte avant les effets visuels.
- Garder l'accent teal comme couleur d'action principale, avec violet reserve aux usages insight/highlight.
- Conserver le langage "surface claire + bord fin + ombre douce".
- Maintenir les pills/badges comme pattern transverse (navigation, statuts, meta).
- Eviter les changements brusques de palette entre pages.

## 11) Note legacy

- L'ancienne base visuelle vanilla a ete retiree du repository.
- Les eventuels besoins de comparaison doivent passer par l'historique Git.
- La reference actuelle pour la charte est `frontend-next/`.
