# Session KPI Definition

This document defines the KPI layer that is actually supported by the data currently available in the project. The rules are intentionally strict: no KPI is included unless the underlying data is currently available or can be confidently instrumented without inventing new meaning.

## 1. Session-level KPIs

### 1. Participants

- Name: Participants
- Definition: Total number of unique participant identities assigned to the session
- Formula: Count distinct `ParticipantSession.participant_id` for a session
- Data required: `ParticipantSession`, `Participants`
- Compatible challenges: all
- Interpretation limits: count of invited/assigned participants, not necessarily active participants

### 2. Participation rate

- Name: Participation rate
- Definition: Share of assigned participants who have at least one recorded challenge result in the session
- Formula: `active_participants / total_invited * 100`
- Data required: `ParticipantSession`, `ChallengeResult`
- Compatible challenges: all
- Interpretation limits: measures recorded participation, not necessarily quality or sustained engagement

### 3. Challenges played

- Name: Challenges played
- Definition: Number of distinct challenges with at least one result row for the session
- Formula: Count distinct `challenge_id` in `ChallengeResult` for a session
- Data required: `ChallengeResult`
- Compatible challenges: all
- Interpretation limits: counts challenge attempts, not challenge quality or completion quality

### 4. Challenges completed

- Name: Challenges completed
- Definition: Number of challenge attempts with status `completed`
- Formula: Count rows in `ChallengeResult` where `status = 'completed'`
- Data required: `ChallengeResult`
- Compatible challenges: all
- Interpretation limits: may differ from session completion if some challenges are optional or skipped

### 5. Total duration

- Name: Total duration
- Definition: Session-level elapsed time, if there are reliable timestamps
- Formula: `max(completed_at or updated_at) - min(started_at)` across challenge results or session lifecycle timestamps
- Data required: `ChallengeResult.started_at`, `ChallengeResult.completed_at`, session timestamps
- Compatible challenges: all with reliable start/end data
- Interpretation limits: this is an approximate session duration unless all challenge start/end records are complete and reliable

### 6. Total score

- Name: Total score
- Definition: Sum of participant-level or challenge-level score values that are actually recorded for the session
- Formula: sum of `ChallengeResult.score` for completed rows
- Data required: `ChallengeResult.score`
- Compatible challenges: only those with a valid recorded score
- Interpretation limits: viewing this as a “team total” may be misleading when challenge scoring rules differ across engines

---

## 2. Participation KPIs

### 7. Active participants

- Name: Active participants
- Definition: Distinct participants with at least one challenge result in the session
- Formula: count distinct `participant_id` from `ChallengeResult` for session
- Data required: `ChallengeResult`
- Compatible challenges: all
- Interpretation limits: active participation is not equal to high-quality engagement

### 8. Actions

- Name: Actions
- Definition: Count of recorded actions or answer submissions attributed to a participant in the session
- Formula: count of challenge-specific events or response rows
- Data required: `ChallengeResponse`, `ChallengeResult.data.events`, event logs
- Compatible challenges: all challenge types with recorded actions
- Interpretation limits: a larger action count may mean more retries or more noise, not necessarily better performance

### 9. Contribution distribution

- Name: Contribution distribution
- Definition: Share of total action volume attributable to each participant
- Formula: participant action count / total action count
- Data required: `ChallengeResponse` or event logs aggregated by `participant_id`
- Compatible challenges: those with event-level action data
- Interpretation limits: should be described as observed distribution, not as a personal judgment

### 10. Participants contributing

- Name: Participants contributing
- Definition: Number of participants with at least one recorded action or response
- Formula: count distinct participants with action rows or event rows
- Data required: `ChallengeResponse`, event logs
- Compatible challenges: all with action-level tracking
- Interpretation limits: measures participation breadth, not impact or quality

### 11. Participation balance

- Name: Participation balance
- Definition: Degree to which participation is spread across the group or concentrated in one subset
- Formula: per-participant contribution distribution, optionally measured by Gini-like dispersion or simple variance
- Data required: per-participant action counts
- Compatible challenges: only where action data exists
- Interpretation limits: can reflect challenge format constraints as much as team dynamics

---

## 3. Communication KPIs

These are only valid if a communication mechanism exists and is actually stored.

### 12. Messages sent

- Name: Messages sent
- Definition: Total messages recorded in a challenge session
- Formula: count message events
- Data required: `message_sent` analytics events or message log table
- Compatible challenges: chat-enabled challenges only
- Interpretation limits: count does not imply quality of communication

### 13. Messages per participant

- Name: Messages per participant
- Definition: Total messages sent per participant divided by participant count
- Formula: participant message count / total messages
- Data required: message event logs
- Compatible challenges: chat-enabled challenges only
- Interpretation limits: should be described as volume, not as a quality indicator

### 14. Active communicators

- Name: Active communicators
- Definition: Count of participants who sent at least one message
- Formula: count distinct `participant_id` with `message_sent`
- Data required: message event logs
- Compatible challenges: chat-enabled challenges only
- Interpretation limits: activity does not indicate communication effectiveness

### 15. Response time

- Name: Response time
- Definition: Time between message receipt and participant reply when message-based exchanges exist
- Formula: `reply_at - message_at`
- Data required: message event logs with timestamps
- Compatible challenges: chat-enabled flows only
- Interpretation limits: only valid if actual message tracking is implemented; otherwise unavailable

---

## 4. Collaboration KPIs

These are only valid when event logs or challenge state expose collaboration actions.

### 16. Shared actions

- Name: Shared actions
- Definition: Actions involving more than one participant or requiring coordinated input
- Formula: count of actions with more than one participant involved
- Data required: events with `targetId`, `participantId`, and group identifiers
- Compatible challenges: collaborative or team-based challenges
- Interpretation limits: “shared” is not the same as “effective collaboration”

### 17. Coordinated actions

- Name: Coordinated actions
- Definition: Actions that show multi-step coordination or dependency resolution
- Formula: count of events matching a shared task or dependent sequence
- Data required: task interaction events or dependencies log
- Compatible challenges: tasks with dependencies or shared workflow
- Interpretation limits: requires explicit event modeling to avoid mistaken inferences

### 18. Dependencies handled

- Name: Dependencies handled
- Definition: Number of task dependencies resolved or satisfied during play
- Formula: count of dependency resolution events
- Data required: task assignment and dependency events
- Compatible challenges: challenges with explicit task dependencies
- Interpretation limits: counts observed resolution, not underlying team quality

### 19. Corrections

- Name: Corrections
- Definition: Number of corrections after an invalid or suboptimal action
- Formula: count `correction` events or task changes following failure
- Data required: event logs
- Compatible challenges: those with revision mechanics or task adjustment
- Interpretation limits: more corrections can indicate adaptation, but also complexity or confusion

### 20. Collective decisions

- Name: Collective decisions
- Definition: Count of decisions involving multiple participant inputs or consensus actions
- Formula: count of `decision_made` events with multiple participant signatures or shared target IDs
- Data required: decision events, task logs
- Compatible challenges: challenges with shared decisions
- Interpretation limits: count indicates frequency, not team quality

---

## 5. Performance KPIs

### 21. Score

- Name: Score
- Definition: Challenge score recorded by the challenge engine or result service
- Formula: direct aggregate from `ChallengeResult.score`
- Data required: `ChallengeResult.score`
- Compatible challenges: those with scoring implemented
- Interpretation limits: challenge scoring differs by engine and should not be compared directly across challenge types unless normalized

### 22. Completion rate

- Name: Completion rate
- Definition: Ratio of completed attempts to started attempts
- Formula: `completed_attempts / started_attempts * 100`
- Data required: `ChallengeResult`
- Compatible challenges: all
- Interpretation limits: not a proxy for learning or performance quality

### 23. Success rate

- Name: Success rate
- Definition: Share of attempts finishing successfully according to challenge-specific success conditions
- Formula: success_count / total_attempts
- Data required: `ChallengeResult.status`, engine-specific success metadata
- Compatible challenges: subset with standard success semantics
- Interpretation limits: challenge outcomes vary; direct cross-engine comparison is risky

### 24. Errors

- Name: Errors
- Definition: Number of error events observed from the challenge engine
- Formula: count `error` events
- Data required: event logs
- Compatible challenges: challenge engines with explicit error logging
- Interpretation limits: error counts must be read alongside challenge complexity and constraints

### 25. Retries

- Name: Retries
- Definition: Number of repeated attempts after failure or incorrect action
- Formula: count `retry` events or repeated attempt markers
- Data required: event logs or attempt metadata
- Compatible challenges: challenge engines that expose retries
- Interpretation limits: retry count may indicate persistence, confusion, or difficulty; it is never a direct quality judgment

### 26. Completion time

- Name: Completion time
- Definition: Time elapsed between challenge start and completion for a participant or team
- Formula: `completed_at - started_at`
- Data required: `ChallengeResult.started_at`, `ChallengeResult.completed_at`
- Compatible challenges: all with consistent timestamps
- Interpretation limits: time is not equivalent to quality or effectiveness

---

## 6. Adaptability KPIs

Only use these when explicit adaptation signals exist.

### 27. Strategy changes

- Name: Strategy changes
- Definition: Number of times a participant or team alters approach after a failed attempt or condition change
- Formula: count `state_transition` or `strategy_change` event types
- Data required: event logs
- Compatible challenges: only when strategy tracking exists
- Interpretation limits: strategy changes can be evidence of adaptation; they are not evidence of individual superiority

### 28. Corrections after errors

- Name: Corrections after errors
- Definition: Number of corrections following an error event
- Formula: count `correction` events within a short window after `error`
- Data required: event logs
- Compatible challenges: challenge engines with explicit error + correction flows
- Interpretation limits: not an indicator of teamwork quality by itself

---

## 7. KPI quality rules

The KPI layer must respect the following guardrails:

- If data is not recorded, do not display a synthetic value.
- If a metric is not applicable to a challenge, show `N/A` rather than `0`.
- If a metric is logically unavailable but a challenge may have it in future, show `—` and mark it as unavailable.
- Never infer leadership, intelligence, personality, or RH suitability from raw action counts.
- Keep formulas tied to existing event or database fields.
- Make challenge-specific metrics optional and extensible.

---

## 8. Outcome

This KPI model is intentionally conservative. It allows the project to produce a credible results page without over-claiming analytics that the current system cannot support.
