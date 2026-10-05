# Challenge Analytics Matrix

This matrix maps each challenge currently registered in the backend engine registry to the data it already exposes, the missing instrumentation, and the KPI that can be supported.

Legend:

- Available = already recorded in the current schema
- Missing = not currently persisted reliably
- Not currently available = no evidence in code or schema

## Matrix

| Challenge | Action/Event | Donnée disponible | Donnée à ajouter | KPI possible | Observable behaviour | Priority |
|---|---|---|---|---|---|---|
| `icebreaker_v1` | participant joined / answer submitted | `ParticipantSession`, `ChallengeResponse`, `ChallengeResult` | per-prompts start/end timestamps, message/activity logs if chat exists | participation rate, prompt completion, average response count | number of participants who answered, questions answered, completion spread | High |
| `the_quiz_v1` | question answered / score update | `ChallengeResponse`, `ChallengeResult.score`, `ChallengeResult.data` | per-question correctness, answer timing, leaderboard events, retry flags | score, completion rate, answer latency, participation per round | who answered, which question, how quickly, number of correct replies | High |
| `pixel_architect_v1` | build action / coordination / chat | `ChallengeResult` only loosely; no specific build event model | move events, block placement/removal, assignment of architect/builder, chat messages, timer events | completion rate, edits per participant, coordination signals, collaboration density | number of placements, corrections, shared actions, role activity | High |
| `mission_critique_v1` | task assignment / dependency handling / validation | `ChallengeResult.data` may contain engine-specific values; no standard task event model | task moved, dependency checked, task exchanged, validation attempts, conflicts, corrections | completion rate, dependency handled, decision quality, task contribution | how many tasks were moved, which team members edited, dependency compliance | High |
| `phrase_collaborative_v1` | word placement / correction / chat | `ChallengeResponse` and `ChallengeResult.data` may hold some clues, but no canonical event schema | word placement events, correction events, chat events, reveal actions | completion rate, action count, correction count, coordination | who placed words, corrections after conflict, communication volume | High |
| `labyrinthe_live_v1` | path decision / obstacle event | No dedicated analytics model found | movement events, dead end events, retry attempts, route changes, step-by-step actions | completion time, retries, path efficiency, dead end rate | route decisions, repeated mistakes, backtracking | High |
| `lab_d_innovation_v1` | concept generation / voting | `ChallengeResult` only; no structured session event log | concept created, concept edited, vote cast, feedback message, idea adoption | idea count, voting participation, iteration count | idea generation and refinement patterns | Medium |
| `local_page_v1` | local challenge page interaction | Not currently available as a structured analytics model | page view, interaction events, task completion, user actions | completion rate, interaction count, dwell time | how users interacted with the page, what actions happened | Medium |
| `copuzzle_live_v1` | piece placement / validation | No dedicated analytics model found | piece move, lock, undo, error, completion, time per move | completion time, success rate, retries, piece distribution | number of moves per participant, corrections, collaboration share | High |
| `escape_room_v1` | puzzle solved / clue usage / hint request | `ChallengeResponse` for prompt responses exists; no canonical event stream | puzzle start/end, clue usage, hint request, wrong attempt, time to solve | completion rate, hints used, errors, time per puzzle | how many attempts before solve, who opened clues, who solved which puzzle | High |
| `vrai_ou_mensonge_v1` | turn selection / vote cast / reveal | `ChallengeResult.data` may contain aggregated game state, but there is no common per-event schema | turn start, statement chosen, vote cast, reveal, scoring event | participation, vote accuracy, turn participation, score distribution | who voted, who selected statements, turn involvement balance | High |

### Detailed notes by analytics category

#### Participation

- Current data: `ParticipantSession`, `ChallengeResult`, `ChallengeResponse`
- Current strength: count of participants who started or completed a challenge
- Missing: time spent active, start-to-finish participation duration, action counts by participant

#### Performance

- Current data: `ChallengeResult.score`, `ChallengeResponse`, completion status
- Current strength: challenge completion and score summaries
- Missing: retries, errors, time-to-completion per task, action-level performance signals

#### Collaboration

- Current data: some assignment and runtime snapshot data exists, but no cross-participant shared-action events
- Missing: shared tasks, task handoff, dependency handling, decision-making events, coordination counts

#### Communication

- Current data: not persisted as dedicated message logs
- Missing: messages sent/received, active communicators, response times, interaction counts

#### Adaptability

- Current data: rarely structured; only implied by result data or manual attempts
- Missing: retry signals, strategy changes, changes after failure, reaction to new rules/conditions

#### Coordination

- Current data: partial runtime snapshots and challenge configuration
- Missing: explicit dependency events, corrections, conflicts, coordinated actions, role-based action traces

#### Contribution

- Current data: `ChallengeResponse` volume, `ChallengeResult` rows, participant snapshots
- Missing: standardized per-participant task contribution counts, per-role contribution breakdown, message shares, action shares

---

## Challenge-specific interpretation rules

The matrix is intentionally behavioral and factual. It avoids interpreting the data as personality, leadership quality, or team health. For example:

- Correct: “Participant A performed 32% of recorded actions.”
- Incorrect: “Participant A was the strongest team member.”

- Correct: “The team exchanged 42 messages.”
- Incorrect: “The team had excellent communication.”

This is the right level of analytics for the current project and the requested Reporting/Results page.
