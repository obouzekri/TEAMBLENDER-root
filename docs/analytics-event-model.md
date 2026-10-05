# Common Analytics Event Model

## Goal

The project already has result rows and raw responses, but it does not yet have a single, canonical event stream for session analytics. A common event model is the minimum needed to make challenge analytics consistent and reusable across different challenge engines.

## Proposed event contract

```json
{
  "id": "evt_123",
  "sessionId": 42,
  "challengeId": 17,
  "participantId": 18,
  "eventType": "answer_submitted",
  "timestamp": "2026-09-18T14:22:10.000Z",
  "durationMs": 2450,
  "success": true,
  "targetId": "q_3",
  "metadata": {
    "phase": "individual",
    "promptId": "q_3",
    "attempt": 2,
    "correct": true,
    "teamId": 5
  }
}
```

## Recommended fields

- `id`: unique event ID
- `sessionId`: session identifier
- `challengeId`: challenge identifier within the session
- `participantId`: actor (may be null for system or team-level events)
- `eventType`: standardized event type name
- `timestamp`: UTC ISO timestamp
- `durationMs`: useful for timed actions or challenge transitions
- `success`: boolean when relevant
- `targetId`: target object or prompt/task id, when applicable
- `metadata`: free-form structured data that is challenge-specific

---

## Event types used in the current project

These event types correspond to mechanics that already exist or are easy to instrument without changing the gameplay model.

### Core session events

- `session_started`
- `session_completed`
- `participant_joined`
- `participant_left`
- `challenge_started`
- `challenge_completed`

### Interaction and response events

- `answer_submitted`
- `message_sent`
- `decision_made`
- `task_assigned`
- `task_changed`
- `interaction`

### Quality and progress events

- `error`
- `retry`
- `correction`
- `attempt_started`
- `attempt_completed`
- `state_transition`
- `vote_cast`
- `turn_started`

### Challenge-specific patterns

- `piece_placed`
- `piece_removed`
- `puzzle_solved`
- `hint_requested`
- `clue_used`
- `route_changed`

## Source and storage recommendation

### Preferred source of truth

Use a small analytics event table or collection, storing events in a normalized structure. This can sit alongside the existing `ChallengeResult` records without replacing them.

### Current code compatibility

The current project already has an event capture hook in `ChallengeResultService.recordChallengeEvent(...)`. A common event model can be implemented as a wrapper or adapter around this existing API rather than replacing the rest of the logic.

### Why this is valuable

- consistent schema across challenges
- easier KPI computation
- simpler auditing and debugging
- less logic duplication in each challenge UI

---

## Payload examples

### Example: participant joined challenge

```json
{
  "eventType": "participant_joined",
  "sessionId": 42,
  "challengeId": 17,
  "participantId": 18,
  "timestamp": "2026-09-18T14:00:00.000Z",
  "metadata": {
    "role": "participant",
    "teamId": 5
  }
}
```

### Example: answer submitted

```json
{
  "eventType": "answer_submitted",
  "sessionId": 42,
  "challengeId": 17,
  "participantId": 18,
  "targetId": "q_3",
  "timestamp": "2026-09-18T14:03:20.000Z",
  "success": true,
  "metadata": {
    "phase": "individual",
    "promptId": "q_3",
    "attempt": 1
  }
}
```

### Example: retry

```json
{
  "eventType": "retry",
  "sessionId": 42,
  "challengeId": 17,
  "participantId": 18,
  "targetId": "task_2",
  "timestamp": "2026-09-18T14:06:15.000Z",
  "metadata": {
    "reason": "incorrect_solution",
    "attempt": 2
  }
}
```

### Example: message sent

```json
{
  "eventType": "message_sent",
  "sessionId": 42,
  "challengeId": 17,
  "participantId": 18,
  "timestamp": "2026-09-18T14:07:00.000Z",
  "metadata": {
    "channel": "team-chat",
    "messageLength": 87
  }
}
```

---

## Usage

This event model is intended for:

- calculating participation
- measuring challenge completion/time
- spotting retries and errors
- measuring contribution per participant
- measuring communication only when chat or interaction events are stored
- calculating collaboration signals in challenge-specific ways
- building a generic session dashboard without hardcoding each engine separately

The goal is not to add a richer “psychometric” layer; it is to standardize fact-based behavioral signals that can be shown as observable activity.

---

## Retention rules

Recommended defaults:

- keep full event stream for active and recent sessions
- keep aggregated analytics indefinitely for historical reporting
- anonymize or pseudonymize participant identifiers if required for privacy compliance
- store challenge-specific metadata only when necessary for KPI support
- avoid storing raw message content unless it is genuinely needed for compliance, moderation, or post-session review

These rules should be adjusted for local compliance and confidentiality requirements.

---

## Summary

This event model is intentionally minimal but extensible. It can support enough analytics for the current challenge catalog without forcing each engine to adopt a different internal format.
