# Presenter notes - Leader session 5: Risk, drift & governance

**Session goal: leaders learn the eval itself can lie - through drift, gaming, and judge bias - and how to govern against it.**

## Run of show (45 min)

- **0-3 Welcome.** The eval is not automatically the truth. Today: the four ways it fools you and how to guard the guard.

- **3-20 Concepts (17 min).**
  - Four ways eval lies to you (9 min): stale golden set, data drift vs concept drift, Goodhart gaming, and a biased judge.
  - Drift, and when to trust the judge (8 min): concept drift (same question, changed answer) and the practices that make an LLM judge trustworthy.

- **20-40 Exercises (20 min).**
  - Build a risk register for your eval (12 min): list the ways this specific eval could mislead, and the control for each.
  - Write your human-in-the-loop policy (8 min): one paragraph on which decisions a human must still sign.

- **40-45 Q&A (5 min).**

## Preflight

- Open a5-risk-drift.html, Expand all, Projector zoom on.

- Recall a3's drift story - a5 names it concept drift and deepens it.

- Have the "metric that got gamed" (verbosity padding) example from a1 ready to reuse.

## Never-cut beats

- Concept drift: inputs look identical but the right answer changed underneath (a policy or price updated). Input monitors will not fire - you catch it on answer quality.

- Goodhart's law: rising eval scores with falling customer satisfaction means the metric became a target and got gamed.

- Judge hygiene: different model family, swap answer order, control for length, spot-check against human labels.

## Cuts if running long

- Drop the human-in-the-loop paragraph to homework.

- Trim the risk register to the top two risks for the room's shared use case.

## Quiz answers

1. **B** - concept drift: the questions look the same but the correct answer changed (policy or price updated). Input monitors will not fire.

2. **C** - use a different model family to grade, swap answer order to check consistency, and validate against a small human-labeled set.

3. **A** - Goodhart's law: when a measure becomes a target it stops being a good measure; the system games it while hurting the real goal.

## Common questions + crisp answers

- *"How do we know our golden set is stale?"* When production failures no longer resemble your test set. Fold real failures back in (a6) so it stays close to reality.

- *"Can we ever fully trust the LLM judge?"* No - calibrate it. Roughly 85% human agreement is the benchmark; use it where the cost of a graded miss is low and keep humans on the high-stakes calls.

- *"Isn't a rising score always good news?"* Not on its own. Cross-check it against a real-world outcome (satisfaction, complaints); a score climbing while the outcome falls is the gaming signal.
