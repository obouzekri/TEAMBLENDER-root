# TeamBlender - Pricing plans matrix v1

Date: 2026-07-20
Owner: Product + Backend
Status: Active reference

## 1) Objective
Define explicit Free / Pro / Enterprise limits and keep frontend pricing + backend enforcement aligned.

## 2) Plan matrix (v1)

| Plan | Slug | Active sessions / month | Participants / session owner | Challenge access | Exports | Trial | Intended segment |
|---|---|---:|---:|---|---|---|---|
| Free | `free` | 3 | 10 | Standard catalog only | No export | 14 days | Small team discovery |
| Pro | `pro` | 30 | 100 | Full catalog (`all_challenges`) | CSV export | 14 days | Growing teams |
| Enterprise | `enterprise` | Unlimited (`null`) | Unlimited (`null`) | Full catalog + custom selectors | CSV + PDF export | Custom | Large organizations |

Notes:
- `null` limit means unlimited in backend enforcement.
- Challenge gating is controlled by `features` entries (`all_challenges`, `challenge_engine:*`, `challenge_category:*`, `challenge_id:*`).
- Export capability is controlled by `features` flags (`exports_csv`, `exports_pdf`).

## 3) Overage rules

- Hard cap:
  - Participant creation blocked when `max_users` reached (`PLAN_LIMIT_REACHED`).
  - Session creation blocked when `max_sessions_per_month` reached (`PLAN_LIMIT_REACHED`).
- Soft warning:
  - `/api/users/me/plan-eligibility` returns `eligible=false` with `blockers` before downgrade.
- Upgrade prompt:
  - Error payload includes conversion CTA (`/account?source=paywall`).

## 4) Backend alignment (source of truth)

- Plan storage model:
  - `backend/src/models/pricing-plan.model.js`
  - Key fields: `slug`, `max_users`, `max_sessions_per_month`, `features`, `trial_days`.
- Enforcement:
  - `backend/src/services/pricing-gating.service.js`
  - Participant/session hard caps and challenge filtering.
- API checks:
  - `PATCH /api/users/me/plan` blocks unsafe downgrade (`PLAN_CHANGE_BLOCKED`).
  - `GET /api/users/me/plan-eligibility` provides pre-check blockers.

## 5) Frontend alignment

- Public pricing source:
  - `GET /api/pricing-plans`
- Display:
  - `frontend-next/app/pricing/page.js` shows plan limits and features from API payload.

## 6) Non-regression checks

Validated on 2026-07-20:
- Backend test: `tests/plan_change_gating.test.js`
- Result: 3/3 passing
- Verified behaviors:
  - downgrade preview blockers (`max_users`, `max_sessions_per_month`)
  - downgrade hard block (`PLAN_CHANGE_BLOCKED`)
  - allowed plan change when usage fits plan

## 7) Implementation guardrails

- Any change to limits must update this matrix and corresponding `PricingPlan` seeds/admin values.
- New feature flags must be reflected in both pricing UI text and backend gating logic.
- Keep one canonical slug per commercial plan (`free`, `pro`, `enterprise`).
