# Presenter notes - Builder session 1: Your first metric (live scorecard)

**Session goal: builders run the smallest eval that is still real - a golden set scored live - and read the scorecard like a to-do list.**

## Run of show (45 min)

- **0-3 Welcome.** The smallest eval that is still real: a handful of questions with known answers, run and counted.

- **3-18 Concepts (15 min).**
  - Golden set, run, compare (7 min): questions paired with known-correct answers, agreed in advance.
  - Watch the score move (8 min): introduce the live scorecard - Hit Rate, MRR, Precision@1 - and how changing k moves some numbers and not others.

- **18-40 Build-along (22 min).**
  - Read the scorecard like a to-do list (10 min in-page, rest hands-on): click k=1/3/5 in the .evalbox, connect each number to the misses, find the lowest metric and name the fix.

- **40-45 Q&A (5 min).**

## Preflight

- Open b1-first-metric.html, scroll to the .evalbox, click k=1, k=3, k=5 and confirm the scorecard numbers and the miss list re-render each time.

- The evalbox uses the offline lexical embedder (zero network) - no keys needed for the live demo.

- Optional: a Python env if you want to show the same math outside the page; not required for b1.

## Never-cut beats

- The k=1/3/5 toggle: Hit Rate climbs as k widens (a wider net finds more) while Precision@1 stays fixed (position 1 does not care about k). That divergence is the aha.

- The scorecard as a to-do list: the lowest number is your next task, not a grade.

- Golden means the right answer was agreed in advance - without known answers you are back to vibes.

## Cuts if running long

- Skip recomputing a row by hand; just narrate the formula while toggling k.

- Drop the second worked miss and let learners find the rest in homework.

## Quiz answers

1. **B** - a golden set is questions paired with their known-correct answers, agreed in advance, to compare the system against.

2. **C** - the right answer at rank 2 contributes 0.5 to MRR (one divided by the rank); only the first correct hit counts.

3. **A** - Precision@1 only looks at the single top result, so widening k cannot change it, even as Hit Rate rises.

## Common questions + crisp answers

- *"How big should the golden set be?"* Bigger than feels comfortable - coverage catches more. b2 covers sizing (prioritize volume) in depth.

- *"Is the toy retriever cheating?"* The retriever is simplified so it runs offline, but the eval math - Hit Rate@k, MRR, Precision@1 over a golden set - is exactly what you compute in production.

- *"Which metric do I act on first?"* The lowest one that maps to your product. For a one-answer bot that is usually Precision@1 or MRR (see b3).
