# Session Challenge Flow — MVP Design

**Last Updated:** 12 May 2026  
**Status:** Defined (not yet implemented)

---

## Overview

This document specifies how challenges flow through a session, from manager setup through participant completion and manager advancement.

---

## Setup Phase: Manager Creates Session

### 1. Manager creates session
```
POST /sessions
{
  name: "Q2 Team Offsite",
  owner_id: 42
}

Response:
{
  id: 227,
  status: "preparee",
  active_challenge_id: null,  // No challenge yet
  owner_id: 42
}
```

### 2. Manager adds challenges to session
```
POST /sessions/227/challenges
[
  { challenge_id: 10, position: 1 },  // Icebreaker
  { challenge_id: 15, position: 2 },  // Logic puzzle
  { challenge_id: 20, position: 3 }   // Team building
]

Backend creates:
  SessionChallenge (session_id, challenge_id, position)
  → Ordered list: [10, 15, 20]

Query returns:
{
  challenges: [
    { id: 10, name: "Icebreaker...", position: 1, status: "pending" },
    { id: 15, name: "Logic...", position: 2, status: "pending" },
    { id: 20, name: "Team...", position: 3, status: "pending" }
  ]
}
```

### 3. Manager launches session
```
PATCH /sessions/227
{
  status: "en_cours",
  active_challenge_id: 10  // Start with first challenge
}

Response:
{
  id: 227,
  status: "en_cours",
  active_challenge_id: 10,
  challenges: [
    { id: 10, name: "Icebreaker...", position: 1, status: "active" },
    { id: 15, name: "Logic...", position: 2, status: "pending" },
    { id: 20, name: "Team...", position: 3, status: "pending" }
  ]
}

Socket.io broadcast: "session:launched"
  → All connected participants receive new session state
```

---

## Runtime Phase: Participants Join and Respond

### 4. Participant joins session

```js
// Frontend polls or receives via Socket
GET /sessions/227/state

Response:
{
  id: 227,
  status: "en_cours",
  active_challenge_id: 10,
  current_challenge: {
    id: 10,
    name: "Icebreaker",
    engine_key: "icebreaker",
    config: { ... }
  },
  position_in_sequence: 1,
  total_challenges: 3
}

// Participant UI displays:
// "Challenge 1/3: Icebreaker"
// [Challenge UI renders based on engine_key]
```

### 5. Participant responds to challenge

```
POST /challenge-responses
{
  session_id: 227,
  challenge_id: 10,
  participant_id: 89,
  phase: "individual",        // Part of multi-phase challenges
  prompt_id: "q1",            // Question within challenge
  response_value: "Alice"     // Answer
}

Response:
{
  id: 5421,
  response_value: "Alice",
  created_at: "2026-05-12T14:32:00Z"
}
```

### 6. Multiple participants, staggered responses

```
Participant 1: Responds at 14:32:00 → DB saved
Participant 2: Responds at 14:33:15 → DB saved
Participant 3: Does NOT respond → No row in DB (null implicitly)

If manager advances at 14:33:30:
  - Participant 1: response saved ✅
  - Participant 2: response saved ✅
  - Participant 3: ChallengeResponse missing (null in results)
```

---

## Manager Advancement Phase: Always Manual

### 7. Manager decides: "Advance to next challenge"

```
// Manager UI shows:
// Challenge 1/3: Icebreaker [50% responded]
// [Button: "Next Challenge"]

PATCH /sessions/227
{
  active_challenge_id: 15  // Advance to position 2
}

Response:
{
  id: 227,
  status: "en_cours",
  active_challenge_id: 15,
  current_challenge: {
    id: 15,
    name: "Logic Puzzle",
    engine_key: "copuzzle",
    config: { ... }
  },
  position_in_sequence: 2,
  total_challenges: 3
}

Socket.io broadcast: "session:challenge-advanced"
  {
    active_challenge_id: 15,
    position: 2,
    name: "Logic Puzzle"
  }
```

### 8. Participant UI updates immediately

```js
// Participant receives Socket event: "session:challenge-advanced"
// OR polls GET /sessions/227/state

// UI changes instantly:
// "Challenge 2/3: Logic Puzzle"
// [Previous responses: NOT shown; focus shifts to new challenge]
// [Participant can SEE their previous responses later in results]
```

### 9. No auto-advancement

```
✅ Manager must click "Advance"
❌ No timeout (e.g., "advance after 5 min")
❌ No "% responded" threshold (e.g., "advance when 80% done")

Even if:
  - 0% responded → Manager can advance
  - 100% responded → Manager waits, advances when ready
```

---

## Data Model: Supporting Lists & Ordering

### SessionChallenge Junction Table

```sql
CREATE TABLE SessionChallenges (
  id INT PRIMARY KEY,
  session_id INT,
  challenge_id INT,
  position INT,           -- 1, 2, 3... (ordering)
  status ENUM('pending', 'active', 'completed'),
  created_at TIMESTAMP,
  UNIQUE(session_id, challenge_id)
);

-- Example:
session_id 227:
  - id 1001, challenge_id 10, position 1, status "active"
  - id 1002, challenge_id 15, position 2, status "pending"
  - id 1003, challenge_id 20, position 3, status "pending"
```

### Session

```sql
CREATE TABLE Sessions (
  id INT PRIMARY KEY,
  name VARCHAR,
  status ENUM('preparee', 'en_cours', 'terminee'),
  active_challenge_id INT,  -- Points to Challenge.id (currently active)
  owner_id INT,
  ...
);

-- Example:
id 227, active_challenge_id = 10 (Icebreaker is current)
```

### ChallengeResponses

```sql
CREATE TABLE ChallengeResponses (
  id INT PRIMARY KEY,
  session_id INT,
  challenge_id INT,
  participant_id INT,
  phase ENUM('individual', 'debrief', 'commit'),
  prompt_id VARCHAR,
  response_value TEXT,     -- NULL if participant didn't respond
  created_at TIMESTAMP
);

-- Example (after manager advances from Challenge 10 to Challenge 15):
-- Challenge 10 responses:
  session_id 227, challenge_id 10, participant_id 89, response_value "Alice"  ✅
  session_id 227, challenge_id 10, participant_id 90, response_value "Bob"    ✅
  session_id 227, challenge_id 10, participant_id 91, response_value NULL     (didn't respond)

-- Challenge 15 responses (just started):
  (empty, or new responses as they come in)
```

---

## Key Behaviors

| Aspect | MVP Behavior |
|--------|--------------|
| **Advancement trigger** | Manager manual click only |
| **Advancement timing** | Any time (0% to 100% response) |
| **Response saving** | Persisted immediately, kept even after advancement |
| **Unresponded participants** | NULL in ChallengeResponses (no row created) |
| **UI update on advancement** | Instant (Socket.io < 500ms or poll) |
| **Challenge ordering** | By `SessionChallenge.position` |
| **Active indicator** | `Session.active_challenge_id` + `SessionChallenge.status = 'active'` |

---

## Sync Strategy: Source of Truth

### Backend is authoritative

```
Manager clicks "Advance" (Challenge 10 → 15)
  ↓
Backend: UPDATE Sessions SET active_challenge_id = 15
  ↓
Backend: UPDATE SessionChallenges SET status = 'completed' WHERE challenge_id = 10
  ↓
Socket.io: emit "session:challenge-advanced" to all participants
  ↓
Participants receive event (< 500ms)
  ↓
Frontend: fetch GET /sessions/227/state and re-render
  ↓
All participants see Challenge 15
```

### Fallback polling (if Socket disconnects)

```
Participant loses connection at 14:35:00
  ↓
Frontend auto-reconnects at 14:35:05
  ↓
Frontend: poll GET /sessions/227/state
  ↓
Backend: returns { active_challenge_id: 15, ... }
  ↓
Frontend: detects change, re-renders Challenge 15
  ↓
Participant now in sync
```

---

## API Endpoints (To Implement)

### Backend

- `POST /sessions` — Create session
- `POST /sessions/:id/challenges` — Add challenges to session
- `PATCH /sessions/:id` — Update session (status, active_challenge_id)
- `GET /sessions/:id/state` — Get current session state (fallback poll endpoint)
- `POST /challenge-responses` — Save participant response
- `GET /sessions/:id/challenges` — List challenges in order
- Socket.io: `session:launched` → broadcast to all
- Socket.io: `session:challenge-advanced` → broadcast to all

### Frontend (Manager)

- Load session + challenge list
- Display "Advance to Challenge X" buttons
- Show response count per challenge
- Click → PATCH /sessions/:id with new active_challenge_id

### Frontend (Participant)

- Connect to session
- Display current challenge (active_challenge_id)
- Show "Challenge N/M" progress indicator
- Listen to Socket "session:challenge-advanced"
- Re-fetch state on reconnect

---

## Testing This Design

### Smoke test: Sequential advancement

```
1. Manager creates session + adds 3 challenges
2. Manager launches (active_challenge_id = 10)
3. Participant joins → sees Challenge 1/3
4. Participant responds
5. Manager clicks "Next Challenge" (active_challenge_id = 15)
6. Participant's UI updates instantly
7. Participant sees Challenge 2/3
8. Verify participant's previous response is saved
9. Repeat for Challenge 3
10. Manager ends session (status = terminee)
```

### Resilience test: Participant joins late

```
1. Manager launches with Challenge 10 active
2. Participant A joins → sees Challenge 10 ✅
3. Manager advances to Challenge 15
4. Participant B joins late (late to session)
5. Participant B should see Challenge 15 (current), not Challenge 10
6. Can Participant B see Challenge 10 in "previous challenges"? (UX decision)
```

### Sync test: Challenge advancement with 0% response

```
1. Manager launches Challenge 10
2. No participants respond (0% response rate)
3. Manager clicks "Next Challenge" immediately
4. All participants get Challenge 15
5. Verify no response entries created for non-responders
```

---

## Edge Cases Not in MVP

- ❌ Manager rewinds to previous challenge
- ❌ Manager skips a challenge (goes 10 → 20, skips 15)
- ❌ Multiple managers in same session (who controls advancement?)
- ❌ Time-based progress (manager doesn't see wall-clock timer, just button)
- ❌ Per-participant challenge customization (all see same challenge)
