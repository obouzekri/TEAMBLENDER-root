# Session Results Audit

## Executive summary

The current codebase is not using Firebase/Firestore. The active analytics stack is PostgreSQL + Sequelize in the backend, with a Next.js frontend reading session/challenge result endpoints. The existing result layer is centered on one table, `ChallengeResult`, with challenge-specific JSON payloads in `data`, plus `ChallengeResponse` rows for prompt-level answers. That means the project already has enough raw data to compute basic session engagement and per-challenge completion, but not enough formal event data to produce richer collaboration, communication, or adaptive behavior analytics without instrumentation.

The current Results page is a lightweight summary and does not yet model a full session analytics layer; it primarily reads:

- `GET /api/sessions/:sessionId`
- `GET /api/challenge-results/sessions/:sessionId/results`
- `GET /api/challenge-results/sessions/:sessionId/participation-rate`

This is good for basic participation metrics, but it is insufficient for cross-challenge behavioral analytics by itself.

---

## 1. Technical stack and structure

### Stack

- Backend: Node.js + Express
- Database: PostgreSQL via Sequelize ORM
- Frontend: Next.js app router
- Session runtime: challenge engines under `backend/src/challenges/engines`
- Real-time/session orchestration: session service + runtime service + socket events
- Existing analytics/result pipeline: `backend/src/services/challenge-result.service.js` and `backend/src/controllers/challenge-result.controller.js`

### Relevant folders

- `backend/src/models/` — database schema models
- `backend/src/services/` — business logic and result aggregation
- `backend/src/controllers/` — API controller layer
- `backend/src/routes/` — route registration
- `backend/src/challenges/engines/` — challenge implementations
- `backend/src/challenges/registry/` — engine registry
- `frontend-next/app/session-results/[sessionId]/` — current results UI

### Session-related data model

Core tables/models:

- `Session` — top-level session
- `SessionChallenge` — join table between session and challenge
- `Participant` — participant identity and login metadata
- `ParticipantSession` — assignment of a participant to a session
- `Challenge` — challenge catalog entry
- `ChallengeResult` — one row per participant attempt/result for a challenge in a session
- `ChallengeResponse` — prompt/answer rows for challenge input submissions
- `Team`, `TeamChallenge`, etc. — optional team-oriented structures

---

## 2. Pages related to sessions and results

Existing session/result pages in the app:

- `frontend-next/app/session-live/[sessionId]` — live session flow and challenge execution
- `frontend-next/app/session-results/[sessionId]/page.js` — current results page
- `frontend-next/app/session-results/[sessionId]/SessionResultsClient.js` — result aggregation UI

The current result page is not a complete analytics dashboard yet. It shows only aggregated metrics from `ChallengeResult` rows:

- active participants
- participation rate
- played challenges
- attempts
- completed
- average score

This is a basic “result summary” layer, not a full behavioral analytics layer.

---

## 3. Models and relevant data sources

### Session

Source: `backend/src/models/session.model.js`

Available fields:

- `id`
- `name`
- `status` (`preparee`, `en_cours`, `terminee`)
- `owner_id`
- `code`
- `format`
- `modality`
- `session_date`
- `duration_minutes`
- `flow_mode`
- `active_challenge_id`

Status: available and exploitable as session metadata.

### Participant

Source: `backend/src/models/participant.model.js`

Available fields:

- `id`
- `firstname`
- `last_name`
- `name`
- `email`
- `login_identifier`
- `job_title`
- `department`
- `session_id` (legacy field)
- `team_id`
- `created_by`
- `owner_id`
- `approval_status`
- `disabled`

Status: available and exploitable; important for participation counts and participant-level attribution.

### ParticipantSession

Source: `backend/src/models/participant_session.model.js`

Represents session membership. This is the primary source for total invited/assigned participants.

Available fields:

- `participant_id`
- `session_id`
- `created_at`, `updated_at`

Status: available and exploitable.

### SessionChallenge

Source: `backend/src/models/session_challenge.model.js`

Available fields:

- `session_id`
- `challenge_id`
- `config`
- `runtime_state`
- `position`

Status: available and exploitable. It is the session-to-challenge mapping layer.

### Challenge

Source: `backend/src/models/challenge.model.js`

Available fields:

- `id`
- `name`
- `category`
- `description`
- `duration`
- `objectives`
- `type`
- `source`
- `route`
- `engine_key`
- `engine_config`
- `status`
- `formats`
- `min_team_size`
- `max_team_size`
- `participation_mode`

Status: available and exploitable.

### ChallengeResult

Source: `backend/src/models/challenge-result.model.js`

Available fields:

- `id`
- `session_id`
- `challenge_id`
- `participant_id`
- `participant_name_snapshot`
- `engine_key`
- `status` (`in_progress`, `completed`, `abandoned`)
- `score`
- `data` (JSONB)
- `started_at`
- `completed_at`
- `created_at`, `updated_at`

Status: this is the main result table. It is exploitable for basic KPIs and challenge score summaries.

### ChallengeResponse

Source: `backend/src/models/challenge_response.model.js`

Available fields:

- `id`
- `session_id`
- `challenge_id`
- `participant_id`
- `participant_name_snapshot`
- `phase`
- `prompt_id`
- `response_value`
- `created_at`, `updated_at`

Status: available and exploitable for prompt-level responses and answer coverage; especially relevant for quiz and response-based challenges.

---

## 4. Current scoring and tracking systems

### Scoring system

The scoring is implemented in `backend/src/services/challenge-result.service.js`:

- `startChallengeResult(...)` creates an in-progress row per participant/challenge/session.
- `recordChallengeEvent(...)` stores event-like payloads in `result.data.events` and flattened metadata into `result.data`.
- `completeChallengeResult(...)` sets `status = 'completed'`, fills `completed_at`, and writes score.
- `deriveBaseScore(data)` tries to infer a score from common fields such as:
  - `score_percent`
  - `completion_percent`
  - `progress_percent`
  - `correct_answers` / `correct`
  - `total_answers` / `total`
- `clampScore(value)` enforces a 0–100 score floor/ceiling.

This means the system supports a normalized numeric score on ChallengeResult, but score semantics vary by challenge engine and are not centrally modeled.

### Event/tracking system

The project does have a primitive event capture path:

- `ChallengeResultService.recordChallengeEvent(resultId, { events, metadata })`
- controller route: `PATCH /api/challenge-results/:id/event`
- sanitized logic removes low-signal event types and metadata keys

This is not a formal analytics event model yet. It is closer to a generic result-event log than a canonical event schema.

Current “event” payload is effectively:

- a collection of event objects in `result.data.events`
- metadata merged into `result.data`

This is good for incremental capture, but still too loose for robust cross-challenge analytics without a standard payload contract.

### Chat/messages system

There is no dedicated `Message` or `ChatMessage` model in the current codebase discovered during audit. The project does have challenge-level runtime configuration that sometimes includes `chat.enabled`, but no persisted message table was found.

This means:

- messages broadcast or used live in challenge UIs are not necessarily persisted as a canonical table;
- communication analytics are currently not available unless chat events are added deliberately.

### Runtime challenge state

Some session/challenge runtime state is stored in `SessionChallenge.runtime_state`, for example participant snapshots and timing. This supports challenge progression and participation snapshot creation but not full behavior analytics.

---

## 5. Data already available

### A. Données déjà disponibles

| Nom | Source | Collection / document | Moment d’enregistrement | Participant / session / challenge | Exploitable telle quelle |
|---|---|---|---|---|---|
| Session name | `Sessions` | `Session` row | Session creation | Session | Oui |
| Session status | `Sessions.status` | `Session` row | Creation + lifecycle updates | Session | Oui |
| Active challenge | `Sessions.active_challenge_id` | `Session` row | Session launch / challenge advance | Session | Oui |
| Assigned participants | `ParticipantSession` | join table | On session assignment | Session + participant | Oui |
| Participant identities | `Participants` | `Participant` row | On participant creation / assignment | Participant | Oui |
| Challenge catalog metadata | `Challenges` | `Challenge` row | Catalog management | Challenge | Oui |
| Session → challenge mapping | `SessionChallenges` | junction table | Session setup / challenge selection | Session + challenge | Oui |
| Challenge attempt start | `ChallengeResult.started_at` + row creation | `ChallengeResult` | When challenge starts | Session + participant + challenge | Oui |
| Challenge completion | `ChallengeResult.status`, `completed_at` | `ChallengeResult` | On challenge completion or abandon | Session + participant + challenge | Oui |
| Challenge score | `ChallengeResult.score` | `ChallengeResult` | On completion | Session + participant + challenge | Oui |
| Challenge-level result payload | `ChallengeResult.data` | `ChallengeResult` | During runtime and completion | Session + participant + challenge | Partiellement |
| Prompt-level answers | `ChallengeResponses` | `ChallengeResponse` row | When participant submits action/answer | Session + participant + challenge + prompt | Oui |
| Participation rate | computed from `ParticipantSession` + `ChallengeResult` | derived | On demand | Session | Oui |
| Participant list snapshot for a challenge | `SessionChallenge.runtime_state.participant_snapshot_ids` | `SessionChallenge` | When challenge is started | Session + challenge | Oui |

### Additional remarks

- `ChallengeResult.data` is currently the main container for challenge-specific details, but it is not standardized. This is useful for the current MVP but not enough for cross-challenge analytics.
- `ChallengeResponse` is highly useful for answer/response analysis but is not a global analytics event log.
- `participant_name_snapshot` is present to avoid broken participant identity after deletion; this is good for historical reporting.

---

## 6. Missing data

The following analytics are currently missing or not reliably persisted:

- chat/message events and message counts
- time-to-first-action
- per-participant action timeline
- task assignment events
- task modification events
- dependency handling events
- retry count and retry reason
- error events and error frequency per participant
- corrections after failure
- strategy changes or tactical pivots
- coordination signals across multiple participants
- true message response latency (only measurable if live message logs are stored)
- user-level communication activity outside challenge response rows
- collaborative decision events
- challenge-specific events like “piece moved”, “tile placed”, “vote cast”, “answer revealed” when not explicitly recorded in `ChallengeResult.data`

This is equivalent to: the project has “outcome data” but not a complete “behavior event stream”.

---

## 7. Data easily addable

The following are relatively low-friction instrumentation opportunities:

- When a participant joins a challenge: `participant_joined`
- When a participant leaves or disconnects: `participant_left`
- When a challenge starts: `challenge_started`
- When a challenge is completed: `challenge_completed`
- When a participant submits an answer: `answer_submitted`
- When a message is sent: `message_sent` (if chat exists)
- When a participant attempts or retries an action: `retry` or `action_started`
- When a participant changes a task/answer: `task_changed` or `decision_made`
- When an error occurs: `error`
- When a result is scored/validated: `result_validated`
- When challenge state changes: `state_transition`

These are straightforward to add to the existing `ChallengeResult` event pipeline, because `recordChallengeEvent` already supports storing event arrays and metadata.

---

## 8. Risks and quality issues

### Duplicate or overlapping data

- `ChallengeResult` and `ChallengeResponse` can overlap in meaning; the same participant action may be represented both as a result row and as raw response rows.
- Some challenge state may be duplicated across `SessionChallenge.runtime_state` and `ChallengeResult.data`.
- If future event logging grows without a schema, duplicates become likely.

### Frontend-calculated metrics versus source-of-truth events

- Participation rate is currently computed from `ChallengeResult` rows and `ParticipantSession`; this is acceptable for a first version.
- If more derived metrics are computed on the frontend directly, they may drift from the real event stream.
- For analytics integrity, metrics should be computed from a canonical event store or aggregated analytics tables rather than ad hoc client logic.

### Non-persisted data

- Any in-memory UI state or ephemeral socket state is not durable.
- If chat or live interactions are not stored, they cannot be analyzed later.
- The project has a risk of “observable but not persistable” analytics if only socket events are used.

### Performance risks

- A session with many participants and long-lived challenge history may read large `ChallengeResult.data` JSON payloads repeatedly.
- Aggregating all raw `ChallengeResult.data` rows on render is expensive if done repeatedly.
- Real-time listeners on large historical session data should be avoided.

### Firestore/NoSQL cost concerns

- There is no Firestore in the current codebase; however, if the project later adds an event store, unbounded event volume can become a cost concern.
- Large `JSONB` payloads in Postgres are cheaper than a document-per-event pattern only if they are controlled and indexed well.

### Privacy risks

- Participant names are denormalized in result snapshots; this helps reporting but adds persistence risk if the participant later changes or is deleted.
- Challenge responses can reveal sensitive preferences or personal information.
- Behavioral logs can be misinterpreted if used for personnel judgments.

### Risk of inaccurate interpretation

- High action count can be mistaken for “better performance” even when it only indicates more retries or more noise.
- Message counts can be mistaken for “good communication” without modeling channel quality or relevance.
- Participation in a challenge does not automatically mean engagement quality.

---

## 9. Key finding: current state vs target state

The existing system supports a useful but limited “session result” model:

- one row per participant/challenge in `ChallengeResult`
- challenge score and status
- raw response rows
- basic session assignment and participation counts

The target state needed for the requested TeamBlender analytics is:

- a canonical event model
- challenge-specific event patterns
- persisted communication logs when chat exists
- time- and action-level analytics
- cross-challenge KPI calculation from a consistent event stream

That target does not exist yet; it must be modeled deliberately.

---

## 10. Bottom line

Today’s current state supports:

- session-level engagement summaries
- participation rate
- challenge completion and average score
- answer-level response analysis

Today’s current state does not support reliably:

- contribution balance by team behavior
- message-based communication analytics
- coworker coordination signals
- retries, corrections, and strategy changes
- challenge-specific collaboration metrics without instrumentation

This is why the next step must be a formal analytics event layer and challenge instrumentation, not a cosmetic redesign of the current page.
