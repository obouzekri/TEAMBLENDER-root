# Session State Design — MVP vs Post-MVP

**Last Updated:** 12 May 2026  
**Status:** Decided (MVP approach finalized)

---

## Overview

This document clarifies how session state is managed, what constitutes the "source of truth", and what features are MVP vs Post-MVP.

---

## MVP: The Source of Truth (status + active_challenge_id)

### What exists

| Column | Type | Values | Purpose |
|--------|------|--------|---------|
| `Session.status` | ENUM | `preparee` \| `en_cours` \| `terminee` | Session lifecycle |
| `Session.active_challenge_id` | INT | Challenge ID or NULL | Current challenge for runtime |

### How it works

1. **Manager** creates/launches a session
   - `status` changes: `preparee` → `en_cours` → `terminee`
   - Selects a challenge → `active_challenge_id` = selected ID

2. **Backend** is authoritative
   - DB is the single source of truth
   - API endpoint `/sessions/:id` exposes current `status` + `active_challenge_id`
   - No stale client-side state without reconciliation

3. **Frontend** receives updates
   - Subscribes to `session:state-changed` Socket.io events
   - Polls `/sessions/:id/state` on reconnect (fallback)
   - Never assumes local cache is correct

4. **Participants** see the same challenge
   - All participants receive the same `active_challenge_id`
   - Challenge engine loads dynamically based on `active_challenge_id`
   - Real-time sync < 500ms target

---

## What is NOT in MVP

### ❌ `Session.phase` (does NOT exist)

**Definition:** A columnar field tracking 6 workflow stages (icebreaker → logique → cohésion → debrief)

**Current state:**
- Never created in migrations
- Not in Session model
- Backend never exposes it
- Frontend legacy code references it but it's broken

**Why not MVP:**
- `status` + `active_challenge_id` are sufficient
- Adds DB schema + migration work
- Adds API complexity (when to transition between phases?)
- Not blocking any core functionality

**Where it DOES exist (unrelated):**
- `ChallengeResponses.phase` = response stages per challenge (individual | debrief | commit) — **stable, unchanged**
- Labyrinthe runtime state `phase` = challenge-specific, in-memory — **not persisted**

---

## Post-MVP: Multi-Stage Workflow

### When `Session.phase` might be needed

Only if we want support for:
- Multiple challenge "buckets" (icebreaker phase, then logic phase, then team-building phase)
- Branching workflows (skip a phase, replay a phase)
- Per-phase analytics and timing

### Design (if implemented post-launch)

```sql
ALTER TABLE Sessions ADD COLUMN phase ENUM(
  'setup',
  'icebreaker',
  'logique',
  'cohesion',
  'debrief'
) DEFAULT 'setup';
```

### Implementation notes

- Transition rules: `setup` → `icebreaker` → `logique` → `cohesion` → `debrief`
- Each phase can have N challenges (managed via `SessionChallenge.phase`)
- `active_challenge_id` still points to current challenge within phase
- Backward compatible with MVP (add column, never used)

---

## Decision Matrix

| Feature | MVP | Post-MVP | Status |
|---------|-----|----------|--------|
| Session lifecycle (`status`) | ✅ | ✅ | Implemented |
| Challenge selection (`active_challenge_id`) | ✅ | ✅ | Implemented |
| Backend exposes state via API | ✅ | ✅ | In progress |
| Real-time sync via Socket.io | ✅ | ✅ | In progress |
| Fallback polling | ✅ | ✅ | In progress |
| Multi-stage workflow (`phase` column) | ❌ | ✅ | Deferred |
| Workflow branching (skip/replay) | ❌ | ✅ | Deferred |

---

## Testing this Design

### MVP smoke test

```
1. Manager creates session (status = preparee)
2. Manager adds 2 participants
3. Manager selects Challenge A (active_challenge_id = A_ID)
4. Participants connect → see Challenge A in UI
5. Manager advances to Challenge B (active_challenge_id = B_ID)
6. Participants auto-update → see Challenge B
7. Manager ends session (status = terminee)
8. All verify last state matches backend
```

### Fallback resilience test

```
1. Participant connects via Socket
2. Force disconnect (kill WebSocket)
3. Verify client auto-reconnects
4. Verify state is re-fetched from `/sessions/:id/state`
5. Verify UI reflects current backend state (not stale)
```

---

## References

- **Related task:** Backend > "Temps réel & synchronisation" in `todo.md`
- **API design:** See Backend README for `/sessions/:id/state` endpoint spec
- **Socket.io events:** `session:state-changed`, `session:challenge-changed`
- **Post-MVP item:** "Add Session.phase for multi-stage workflows"
