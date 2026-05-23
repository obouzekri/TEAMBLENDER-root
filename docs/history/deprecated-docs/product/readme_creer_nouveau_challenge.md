# Template: creer un nouveau challenge

> DEPRECIE (2026-05-23): ce template est majoritairement centre sur des chemins legacy archives et ne doit plus servir de base pour des nouvelles features MVP.
> Cible active: `frontend-next/` (UI) + `backend/` (engines/runtime).

> Note migration: les chemins `frontend/...` mentionnes ici decrivent le flux legacy archive.
> Emplacement legacy actuel: `archive/frontend/...`
> Cible pour toute nouvelle implementation: `frontend-next/...`

Ce document sert de modele rapide pour ajouter un nouveau challenge reutilisable, independant de la session.

## 1) Regles produit a respecter

- Un challenge est une entite autonome et reutilisable.
- Une session appelle un challenge, mais le challenge ne depend jamais de la session.
- Le lien technique se fait via `engine_key` + `engine_config`.

## 2) Nommage recommande

- `engine_key`: `snake_case`, stable dans le temps (ex: `copuzzle_live_v1`).
- `route`: chemin/slug d'acces direct UI (ex: `copuzzle_live_challenge.html`).
- `name`: nom lisible metier (ex: `CoPuzzle Live`).

## 3) Backend - structure minimale

Creer un dossier moteur:

- `backend/src/challenges/engines/<engine_key>/index.js`

Exemple minimal:

```js
module.exports = {
  key: "",
  version: 1,
  buildRuntimeConfig({ challenge }) {
    const defaults = { timeLimitSeconds: 300 };
    return {
      ...defaults,
      ...(challenge.engine_config || {}),
    };
  },
};
```

Le backend charge maintenant automatiquement un moteur si le dossier existe et que `engine_key` correspond au nom du dossier.

Optionnel:

- `backend/src/challenges/registry/challenge-registry.js` reste disponible pour des surcharges explicites.

## 4) Frontend - structure minimale

Creer un dossier moteur UI:

- `archive/frontend/src/challenges/engines/<engine_key>/index.js`

Exemple minimal:

```js
export function validateConfig(config = {}) {
  return typeof config === "object" && config !== null;
}

export function init(context) {
  return { context };
}

export function mount({ root, config }) {
  root.innerHTML = `
    <section>
      <h1>Challenge: Test </h1>
      <p>Time limit: ${config.timeLimitSeconds || 300}s</p>
    </section>
  `;
}

export function onEvent() {}

export function unmount({ root }) {
  root.innerHTML = "";
}
```

Le frontend charge maintenant automatiquement un moteur si le dossier existe et que `engine_key` correspond au nom du dossier.

Optionnel:

- `archive/frontend/src/challenges/registry/challenge-registry.js` reste disponible pour des surcharges explicites.

## 5) Page challenge (acces direct admin/home)

Option recommandee pour l'ouverture directe:

- Creer la page: `archive/frontend/src/pages/challenges/<nom_challenge>.html`
- Remplir `route` dans le formulaire admin avec l'une des valeurs suivantes:
  - `mon_challenge.html` si le fichier est dans `archive/frontend/src/pages/challenges/`
  - `challenges/mon_challenge.html` si vous voulez un chemin explicite
  - `https://...` pour un challenge externe
- Si `route` est vide, l'admin et l'accueil essaient automatiquement la convention `archive/frontend/src/pages/challenges/<stem>_challenge.html` a partir de `engine_key`, `slug` ou `name`.

## 6) Champs a remplir dans le formulaire admin

Exemple pret a copier:

- `name`: `CoPuzzle Live`
- `category`: `collaboration`
- `type`: `equipe`
- `source`: `local`
- `route`: `copuzzle_live_challenge.html`
- `engine_key`: `copuzzle_live_v1`
- `engine_config`: `{"maxRounds":3}`
- `status`: `active`

Convention recommandee aujourd'hui:

- page HTML: `archive/frontend/src/pages/challenges/copuzzle_live_challenge.html`
- `route`: `copuzzle_live_challenge.html`
- `engine_key`: `copuzzle_live_v1`

Exemple complet pret a brancher:

- `name`: `Alignment Canvas`
- `category`: `collaboration`
- `type`: `equipe`
- `source`: `local`
- `route`: `alignment_canvas_challenge.html`
- `engine_key`: `alignment_canvas_v1`
- `engine_config`: `{"intro":"Clarifiez la priorite, le signal faible et l engagement collectif."}`

## 7) Lier a une session

1. Creer/editer une session.
2. Selectionner le challenge dans `challenge_ids`.
3. (Optionnel) definir `active_challenge_id` si lancement direct voulu.

## 8) Checklist de validation

- Le challenge est visible dans le catalogue.
- Le bouton "Acceder" fonctionne dans l'admin.
- Le clic sur la carte fonctionne dans l'accueil.
- Le challenge peut etre ajoute a une session.
- Le runtime retourne une config valide via `engine_key`.
- Aucun couplage direct challenge -> session dans le code.

## 9) Template rapide (copier-coller)

Remplacer les placeholders:

- `<engine_key>`
- `<challenge_name>`
- `<challenge_route>`
- `<default_engine_config_json>`

Snippet:

```txt
Engine key: <engine_key>
Name: <challenge_name>
Route: <challenge_route>
Engine config: <default_engine_config_json>

Backend engine file:
backend/src/challenges/engines/<engine_key>/index.js

Legacy archive engine file:
archive/frontend/src/challenges/engines/<engine_key>/index.js

Registries:
backend/src/challenges/registry/challenge-registry.js
archive/frontend/src/challenges/registry/challenge-registry.js

Direct access page:
archive/frontend/src/pages/challenges/<challenge_page>.html
```

## 10) Exemple deja ajoute dans le projet

Challenge exemple cree:

- backend: `backend/src/challenges/engines/alignment_canvas_v1/index.js`
- legacy archive engine: `archive/frontend/src/challenges/engines/alignment_canvas_v1/index.js`
- page directe: `archive/frontend/src/pages/challenges/alignment_canvas_challenge.html`

Ce trio constitue le modele minimal recommande pour un challenge operationnel.
