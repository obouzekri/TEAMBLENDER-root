# Salle Secrète - Documentation Complète 🔐

> Archive context: les chemins `frontend/...` dans ce document sont des references legacy historiques.
> Emplacement actuel legacy: `archive/frontend/...`
> Pour toute nouvelle evolution produit, utiliser `frontend-next/...`.

## Vue d'ensemble

**"Salle secrète"** est une expérience d'escape room immersive et coopérative intégrée à TeamBlender. Les équipes travaillent ensemble pour résoudre 5 énigmes visuelles et interactives en 20 minutes.

- **Type**: Défi coopératif en temps réel
- **Participants**: 3-10 personnes
- **Durée**: 20 minutes (configurable)
- **Plateforme**: Web responsive (dark theme immersif)

---

## Architecture système

### Backend (Node.js + Sequelize)

#### Service: `backend/src/services/escape-room.service.js`
Cœur logique du système.

**Principales fonctions**:
- `getRuntimeState()` - Charge l'état courant avec row lock transactionnel
- `submitParticipantAnswer()` - Enregistre réponse utilisateur
- `tryValidateCollective()` - Vérifie unanimité + correction
  - Outcome: `waiting|divergent|wrong|correct|escaped|max_attempts`
- `unlockHint()` - Déverrouille indice (facilitateur)
- `skipEnigme()` - Passe énigme (facilitateur)
- `forceTimeout()` - Termine session (facilitateur)

**État JSONB** (SessionChallenge.runtime_state):
```json
{
  "current_enigme_index": 2,
  "enigme_attempts": {
    "e1": { "count": 1, "hint_unlocked": true },
    "e2": { "count": 2, "hint_unlocked": false },
    "e3": { "count": 0, "hint_unlocked": false }
  },
  "status": "in_progress",
  "started_at": "2026-05-06T10:30:00Z",
  "finished_at": null
}
```

#### Contrôleur: `backend/src/controllers/escape-room.controller.js`
Routes HTTP (6 endpoints):
- `GET /state` - État courant + enigma config
- `POST /submit` - Soumettre réponse
- `POST /validate` - Trigger validation manuelle
- `POST /hint` - Déverrouiller indice
- `POST /skip` - Passer énigme
- `POST /timeout` - Forcer fin

#### Config Engine: `backend/src/challenges/engines/escape_room_v1/index.js`
Normalisation + validation de configuration.

```javascript
{
  title: "Salle secrète",
  engine_key: "escape_room_v1",
  enigmes: [ /* 5 énigmes */ ],
  timer: { duration_seconds: 1200 },
  max_attempts_per_enigme: 3,
  hint_unlock_mode: "facilitator_only"
}
```

---

### Frontend (Vanilla JS)

#### Moteur: `archive/frontend/src/challenges/engines/escape_room_v1/index.js`
Orchestration client.

**Classe EscapeRoomEngine**:
- Synchronisation avec backend (polling 2s)
- Gestion interactions (soumission, indice, etc.)
- Rendu UI participant + facilitateur
- Détection victoire → affichage écran final

**État client**:
```javascript
{
  sessionId, challengeId, participantId,
  role: "participant|facilitator",
  currentState: { /* État backend */ },
  isVictory: false,
  enigmaRenderer: null,
  pollInterval: null
}
```

#### Enigmas Interactives: `archive/frontend/src/challenges/engines/escape_room_v1/enigmas/`

##### 1. **Code Mural** (`grid.js`)
Grille 3×3 avec cases manquantes.
- UI: Grid layout avec inputs numériques
- Pattern: "Chaque ligne : 1ère + 3ème = 2 × 2ème"
- Réponse: `5`
- Animation: Grid shake (erreur), scale pulse (succès)

##### 2. **Devinette** (`devinette.js`)
Texte mystérieux + input texte.
- UI: Texte italique + glow effect
- Énigme: "Qu'est-ce qui fait le tour de la maison sans bouger ?"
- Réponse: `CLOTURE`
- Animation: Bounce (succès)

##### 3. **Choix Impossible** (`choice_cards.js`)
2 cartes - une stable, une pulsante.
- UI: Dual cards interactives
- Choix A: 1M€ maintenant (stable)
- Choix B: 10M€ 99% (pulsante)
- Réponse: `A` (unanime)
- Animation: Card scale + pulse

##### 4. **Fibonacci** (`fibonacci.js`)
Séquence visuelle progressive.
- UI: Nombres avec animation staggered
- Suite: 0, 1, 1, 2, 3, 5, 8, ?
- Réponse: `13`
- Animation: Nombres bounce en cascade

##### 5. **Visuelle** (`visuelle.js`)
Image + zones cliquables interactives.
- UI: Image + overlays 🔍 sur coins
- Recherche: Trouver objet qui n'apparaît qu'une fois
- Réponse: `CLE`
- Animation: Zone zoom + reveal progressive

#### Factory: `archive/frontend/src/challenges/engines/escape_room_v1/enigma-renderer.js`
Système de plugins pour charger énigmes dynamiquement.

```javascript
createEnigmaRenderer(ui_type, container, enigma, config)
// Dispatch → GridEnigma|DevinettEnigma|ChoixImpossibleEnigma|...
```

#### Styles: `archive/frontend/src/challenges/engines/escape_room_v1/enigmas.css`
720+ lignes CSS immersifs.
- Thème dark room (#0a0e27)
- Gradients & glows
- Animations spécialisées par enigma
- Responsive (768px breakpoint)
- Accessible (prefers-reduced-motion)

#### Pages HTML

**`escape_room_challenge.html`** (Participant)
- Timer bar + enigma card
- Renderer container (enigmas)
- Feedback zone (6 états: waiting|divergent|wrong|correct|escaped|max_attempts)
- Team responses monitor
- Chat sidebar

**`escape_room_facilitator.html`** (Facilitator)
- Progress bar
- Participants list + response status
- Current enigma info + attempts counter
- Actions: [Unlock Hint] [Skip] [Force Timeout]
- Validation status
- Enigma history

**`escape_room_victory.html`** (Post-Game)
- Portes qui s'ouvrent (3D transform)
- Light burst animation
- Stats display (temps, énigmes, tentatives)
- Confettis particles
- Message félicitations

---

## Données

### Seed Script: `backend/scripts/seed_escape_room_immersive.js`

Crée challenge "Salle secrète" avec 5 énigmes configurées.

```bash
node backend/scripts/seed_escape_room_immersive.js
```

**Output**:
```
✅ Challenge "Salle secrète" créé (ID: 117)
   Engine: escape_room_v1
   Énigmes: 5
   1. 🔢 Code mural (réponse: 5)
     2. ❓ Devinette (réponse: CLOTURE)
     3. ⚖️ Choix impossible (réponse: A)
     4. 📈 Fibonacci (réponse: 13)
     5. 🖼️ Énigme visuelle (réponse: CLE)
```

### Database Schema

**Challenges table**:
- `name`: "Salle secrète"
- `type`: "equipe"
- `source`: "local"
- `engine_key`: "escape_room_v1"
- `engine_config`: JSON (5 énigmes)

**SessionChallenges table** (new):
- `runtime_state`: JSONB (état actuel)

---

## Flux utilisateur

```
1. Manager crée session → Ajoute "Salle secrète"
   ↓
2. Participants rejoignent → Voient page d'attente
   ↓
3. Manager lance → Écran 1: Code Mural
   ↓
4. Équipe résout ensemble → Feedbacks en temps réel
   ↓
5. Réponse correcte → Avance automatiquement → Énigme 2
   ↓
6. Loop 4-5 pour énigmes 2-5
   ↓
7. Après énigme 5 → Victory screen
   ├─ Portes s'ouvrent 🚪
   ├─ Confettis 🎉
   └─ Stats (temps, tentatives)
```

---

## Logique de validation

### Soumission participante
```
1. Participant saisit réponse
2. POST /submit {enigme_id, answer}
3. Service:
   - Normalize answer (trim + uppercase)
   - Save ChallengeResponse
   - Check if all team members responded
   - If all responded:
     a. Compare all answers (unanimity check)
     b. If divergent → outcome: "divergent"
     c. If unanimous:
        - Check against expected_answer
        - If correct → outcome: "correct" → increment enigme_index
        - If wrong → outcome: "wrong", increment attempts
   - If not all responded → outcome: "waiting"
4. Return validation result
5. Client renderUI() → checks if enigme changed
```

### Retours utilisateur
| Outcome | Message | Action |
|---------|---------|--------|
| waiting | "⏳ En attente (X/Y)" | Attend autres |
| divergent | "❌ Réponses ne correspondent pas" | Rééssaye |
| wrong | "❌ Réponse incorrecte (X/3)" | Rééssaye |
| correct | "✅ Correct ! Énigme validée" | Avance auto |
| escaped | "🎉 Salle secrète déverrouillée" | Victory screen |
| max_attempts | "⚠️ Max tentatives atteint" | Game over |

---

## Concurrence & Sécurité

### Transaction-based Row Locking
```sql
SELECT * FROM SessionChallenges 
WHERE id = ? 
FOR UPDATE;  -- Block concurrent updates
```

Garantit qu'une seule avance d'énigme à la fois, même si 3 participants valident simultanément.

### Expected Answer Protection
- Nunca exposé au frontend
- `engine.sanitizeForClient(config)` strips it
- Vérifié en backend uniquement

---

## Configuration

### Facilement personnalisable

```javascript
// backend/scripts/seed_escape_room_immersive.js
const ESCAPE_ROOM_CONFIG = {
  timer: { duration_seconds: 1200 },  // Changer 20min → X min
  max_attempts_per_enigme: 3,         // Changer difficulté
  enigmes: [ /* Ajouter/modifier énigmes */ ]
}
```

### Ajouter une nouvelle énigme

1. Créer `archive/frontend/src/challenges/engines/escape_room_v1/enigmas/mon-enigma.js`
2. Exporter classe avec `.render()`, `.getAnswer()`, `.showFeedback()`
3. Importer dans `enigma-renderer.js`
4. Ajouter à `ENIGMA_TYPES`
5. Ajouter à seed script

---

## Performance

- **Polling**: 2 secondes (balance: real-time vs ressources)
- **State size**: ~300 bytes JSONB (compact)
- **Frontend bundle**: ~15KB gzipped (enigma components)
- **Animations**: GPU-accelerated (transform, opacity)

---

## Roadmap optionnel

- [ ] WebSocket pour real-time au lieu de polling
- [ ] Sounds & musique d'ambiance
- [ ] Leaderboard équipes
- [ ] Replay système
- [ ] Interface édition énigmes (facilitateur)
- [ ] Multi-languages
- [ ] Hint progressif (progressive unlock)

---

## Support & Contact

Pour questions/bugs:
1. Vérifier [TESTING_GUIDE.md](./TESTING_GUIDE.md)
2. Vérifier logs backend (`/src/utils/logger.js`)
3. Vérifier browser console (frontend errors)

---

**Version**: 1.0.0  
**Status**: ✅ Production-Ready  
**Last updated**: May 6, 2026  
**Author**: TeamBlender Dev Team
