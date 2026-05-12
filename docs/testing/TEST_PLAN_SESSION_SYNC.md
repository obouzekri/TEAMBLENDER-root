# Test Plan: Session Challenge Flow Sync

**Objective:** Validate real-time sync between manager advancing challenges and participants receiving updates < 500ms

**Date Created:** 12 May 2026

---

## Test Scenario 1: Happy Path (WebSocket Connected)

### Setup
1. Open two browsers (or tabs): Manager and Participant
2. Manager: Create session → add 3 challenges → launch session
3. Participant: Join session (via session code)

### Actions & Expected Results

| Step | Action | Expected | Actual |
|------|--------|----------|--------|
| 1 | Manager views session (should see Challenge 1/3 active) | UI shows "Challenge 1/3" | __ |
| 2 | Participant joins → should see Challenge 1/3 | Participant UI shows Challenge 1/3 | __ |
| 3 | Participant starts answering Challenge 1 | Responses saved to DB | __ |
| 4 | Manager clicks "Next Challenge" button | Backend: active_challenge_id = Challenge 2 | __ |
| 5 | Check timestamp when button clicked | Record exact time T0 | __ |
| 6 | Participant UI updates to Challenge 2/3 | Update happens at T0 + Δ (target Δ < 500ms) | __ |
| 7 | Check Participant's Challenge 1 responses | Still saved in DB (not deleted) | __ |
| 8 | Manager advances to Challenge 3 | Same as step 4-6 | __ |
| 9 | Manager ends session (status = terminee) | Participant can no longer interact | __ |

### Success Criteria
- ✅ All participants see same challenge at same time
- ✅ Sync latency < 500ms (measure with browser DevTools)
- ✅ Responses from incomplete challenges are preserved
- ✅ No UI glitches or race conditions

---

## Test Scenario 2: Late Joiner

### Setup
1. Manager: Create + launch session with Challenge 1 active
2. Participant A: Already in session
3. Participant B: Will join late

### Actions & Expected Results

| Step | Action | Expected | Actual |
|------|--------|----------|--------|
| 1 | Participant A is on Challenge 1/3 | UI shows Challenge 1 | __ |
| 2 | Manager advances to Challenge 2 | Both see Challenge 2 | __ |
| 3 | Participant B joins session (new browser) | Should NOT see Challenge 1, should see Challenge 2 directly | __ |
| 4 | Verify B got state from `/sessions/:id/state` endpoint | Correct state (not historical) | __ |

### Success Criteria
- ✅ Late joiners don't see stale challenges
- ✅ Endpoint returns current state correctly

---

## Test Scenario 3: Socket Disconnect + Fallback Polling

### Setup
1. Manager + Participant connected
2. Simulate network failure on participant side

### Actions & Expected Results

| Step | Action | Expected | Actual |
|------|--------|----------|--------|
| 1 | Participant's WebSocket connected (DevTools: WS frame) | Socket connected state | __ |
| 2 | Participant tabs to DevTools → Network tab, kill WebSocket | Socket manually disconnected | __ |
| 3 | Wait 3 seconds (fallback poll trigger threshold) | After 3s, fallback polling starts | __ |
| 4 | Manager advances Challenge 1 → 2 | UI still shows old challenge (no Socket) | __ |
| 5 | Wait 5 seconds for next poll | UI auto-updates to Challenge 2 via poll (max 5-10s total) | __ |
| 6 | Re-enable network / DevTools WebSocket | Socket reconnects | __ |
| 7 | Manager advances Challenge 2 → 3 | UI updates < 500ms (Socket is back) | __ |

### Success Criteria
- ✅ Fallback polling triggers after ~3s disconnection
- ✅ Participants resync within ~5-10s
- ✅ Socket reconnection resumes < 500ms sync

---

## Test Scenario 4: Multiple Participants Simultaneously

### Setup
1. Manager + 3+ Participants in same session
2. Challenge 1/3 active

### Actions & Expected Results

| Step | Action | Expected | Actual |
|------|--------|----------|--------|
| 1 | All participants see Challenge 1/3 | All see same challenge | __ |
| 2 | Participants 1,2,3 respond (at different times) | All responses saved with different timestamps | __ |
| 3 | Manager advances to Challenge 2 | Broadcast sent once to all | __ |
| 4 | Check all participants' UIs | All see Challenge 2 within ~500ms | __ |
| 5 | Verify responses from Challenge 1 for all | P1: response saved, P2: response saved, P3: response saved (or null if didn't respond) | __ |

### Success Criteria
- ✅ Single broadcast reaches all participants
- ✅ No duplicate broadcasts
- ✅ All responses persisted correctly

---

## Test Scenario 5: Challenge 0% Response (Manager Advances Immediately)

### Setup
1. Challenge 1 active
2. No participants have responded yet

### Actions & Expected Results

| Step | Action | Expected | Actual |
|------|--------|----------|--------|
| 1 | Challenge 1 active, participants not responding | No timeout, no auto-advance | __ |
| 2 | Manager manually clicks "Next" button | Challenge 2 becomes active | __ |
| 3 | Check responses for Challenge 1 | ChallengeResponses table: 0 rows (all null) | __ |
| 4 | Participants receive event | Event sent, UI updates | __ |

### Success Criteria
- ✅ No auto-advance algorithm (manager always controls)
- ✅ Null responses handled correctly

---

## Performance Benchmarks

Measure these in production:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Manager → Backend PATCH latency | < 100ms | Browser DevTools Network tab |
| Socket broadcast latency | < 400ms | Timestamp on Backend emit vs Frontend receive |
| Fallback poll latency | < 5-10s | Time from disconnect to UI update |
| Endpoint `/sessions/:id/state` response | < 50ms | Browser DevTools Network tab |

---

## Regression Test Checklist

- [ ] After each major change, run Test Scenario 1 (Happy Path)
- [ ] Run all scenarios before release
- [ ] Check browser console for errors/warnings
- [ ] Verify no memory leaks (watch DevTools heap over 5-10 min session)
- [ ] Test with slow network (DevTools: throttle to "Slow 4G")
- [ ] Test with packet loss (DevTools: throttle + add 50% packet loss)

---

## Known Limitations / Not in MVP

- ❌ Can't rewind to previous challenge
- ❌ Can't skip a challenge
- ❌ No per-participant challenge customization
- ❌ No time-based auto-advance
- ❌ No % response threshold for auto-advance
