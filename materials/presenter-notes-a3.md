# Presenter notes - Leader session 3: Offline vs online

**Session goal: leaders leave knowing offline eval is the gate before ship and online eval is the smoke detector after - and that you need both.**

## Run of show (45 min)

- **0-3 Welcome.** Two moments, two very different jobs. Passing the launch test is not the same as staying good.

- **3-20 Concepts (17 min).**
  - Two kinds of eval (9 min): offline grades against a fixed set with known reference answers before ship; online grades live production traffic with no reference answer.
  - Why you need both (8 min): offline is frozen to the day it was written; only online sees the world drift underneath a live system.

- **20-40 Exercises (20 min).**
  - Offline catches this, online catches that (12 min): sort a list of failure types into which eval would catch each.
  - Design your online signal (8 min): pick a use case, decide what live signal (user feedback, sampled grading) would warn you first.

- **40-45 Q&A (5 min).**

## Preflight

- Open a3-offline-online.html, Expand all, Projector zoom on.

- Have the "support bot after a policy change" story ready - it is the anchor for concept drift and returns in a5 and b10.

- Be ready to explain a sampling rate of 0.1 in plain terms (one in ten graded).

## Never-cut beats

- The frozen-test-set insight: a support bot can pass its offline eval every week and still go wrong in production, because the offline set still holds the old questions and answers.

- The sampling-rate dial: grading every live answer is expensive, so you grade a slice - 0.1 is enough to spot trends, cheap enough to run daily.

- Both, not either: offline gates the launch, online watches the world. Dropping either leaves a blind spot.

## Cuts if running long

- Drop "design your online signal" to homework.

- Trim the failure-sorting exercise to four items instead of the full list.

## Quiz answers

1. **B** - offline grades against a fixed set with known reference answers; online grades live traffic with no reference answer.

2. **C** - the world drifted; the frozen offline set still holds the old questions, so only online eval on live traffic catches it.

3. **A** - a sampling rate of 0.1 means roughly one in ten production answers gets evaluated - enough for trends, cheap enough to run continuously.

## Common questions + crisp answers

- *"If offline passes, why keep spending on online?"* Because offline only knows the world as it was on test-writing day. Documents change, users ask new things, the model gets updated under you - online is the only eval that sees that.

- *"Isn't grading live traffic slow and costly?"* You sample, and you aim the expensive grading at feedback-flagged runs. That is the budget dial, covered hands-on in b10.

- *"Who reads the online signal?"* It needs an owner and an alert threshold, or it becomes a dashboard nobody watches - the culture point in a6.
