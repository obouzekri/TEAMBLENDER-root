# Snapshot BD TEAMSPARK

Date du snapshot: 2026-05-09
Source: PostgreSQL local (DB=postgres, host=localhost:5432)
Mode: lecture seule (aucune modification)

## Inventaire des tables (schema public)

- ChallengeResponses: 2
- ChallengeResult: 0
- Challenges: 7
- Experiences: 7
- Members: 8
- ParticipantSessions: 9
- Participants: 16
- SequelizeMeta: 35
- SessionChallenges: 11
- SessionMembers: 2
- Sessions: 6
- TeamChallenges: 0
- Teams: 0
- Users: 15
- participants: 0
- sessions: 0

## Challenges

- 78 | Copuzzle Live | actif
- 79 | Labyrinthe | actif
- 116 | Phrase Mystere | actif
- 117 | Salle Secrete | actif
- 119 | Salle secrete | actif
- 130 | Icebreaker Live | actif
- 131 | Local Page Bridge | actif

## Sessions

- 188 | Test | en_cours | code D74B | owner_id 107
- 227 | cohesion | en_cours | code S6AF | owner_id 108
- 248 | Session Recipe 1778319533522 | preparee | code VEC9 | owner_id 251
- 249 | Session Recipe 1778319545316 | preparee | code 2U22 | owner_id 251
- 250 | Session Recipe 1778319593356 | preparee | code 5WHZ | owner_id 251
- 251 | Session Recipe 1778319612764 | preparee | code 032M | owner_id 251

## Users (15 total)

- 107 | admin@admin.com | role admin | approval approved
- 108 | obouzekri@teamspark.com | role user | approval approved
- 216 | aseghir@teamspark.com | role user | approval approved
- 220 | test1778249403261@mail.com | role user | approval pending
- 221 | testcase1778249403609@mail.com | role user | approval pending
- 226 | test1778282836535@mail.com | role user | approval pending
- 227 | testcase1778282837436@mail.com | role user | approval pending
- 232 | test1778283062943@mail.com | role user | approval pending
- 233 | testcase1778283063556@mail.com | role user | approval pending
- 238 | test.manager@local.dev | role user | approval pending
- 239 | test1778285461969@mail.com | role user | approval pending
- 240 | testcase1778285462413@mail.com | role user | approval pending
- 245 | test1778287304800@mail.com | role user | approval pending
- 246 | testcase1778287305551@mail.com | role user | approval pending
- 251 | admin@test.com | role admin | approval approved

## Echantillons des autres tables

### ChallengeResponses (2)

- id 78 | session_id 227 | challenge_id 117 | participant_id 83 | phase escape_room | prompt_id e1 | response_value "5"
- id 66 | session_id 227 | challenge_id 117 | participant_id 80 | phase escape_room | prompt_id e1 | response_value "5"

### Members (8)

Exemples:
- id 214 | John Doe | test-1778317466761@example.com | owner_id 251
- id 215 | Recipe Participant | participant.recipe.1778319533522@test.com | owner_id 251
- id 216 | Route Probe | participant.routeprobe.1778319573066@test.com | owner_id 251

### ParticipantSessions (9)

Exemples:
- participant_id 178 -> session_id 188
- participant_id 179 -> session_id 188
- participant_id 180 -> session_id 188

### Participants (16)

Exemples:
- id 182 | Smoke Participant | smoke.participant.1778323054065@teamspark.local | approval approved
- id 80 | iyad bouzekri | ibouzekri@teamspark.com | approval approved
- id 81 | lamyae benhlima | lbenhlima@teamspark.com | approval approved

### SessionChallenges (11)

Exemples:
- session_id 188 | challenge_id 116 | position 0
- session_id 188 | challenge_id 117 | position 0
- session_id 188 | challenge_id 78 | position 0

### SessionMembers (2)

- session_id 227 | member_id 87
- session_id 227 | member_id 94

### SequelizeMeta (35)

Table de suivi des migrations appliquees (35 entrees).

## Notes

- Ce snapshot represente l'etat au moment de l'extraction.
- Les champs sensibles (mots de passe hash) ne sont pas inclus dans ce fichier.
