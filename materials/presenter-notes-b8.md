# Presenter notes - Builder session 8: Regression suites

**Session goal: builders turn the eval into a CI gate that blocks a bad ship - a metric you do not gate on is decoration.**

## Run of show (45 min)

- **0-3 Recap.** A metric you do not gate on is decoration. Today it becomes a gate that can stop a deploy.

- **3-20 Suite as tests (17 min).**
  - The eval suite is a test suite: golden set entries as test cases, run in CI on every change.
  - promptfoo assertions - contains (string match), similar (embedding distance), llm-rubric (LLM-as-judge wired in).

- **20-38 The CI gate (18 min).**
  - The gate script exits non-zero when the pass rate breaches the threshold; the pipeline reads that exit code and blocks.
  - Anchoring the threshold to the currently shipped version's score so it catches a real drop.

- **38-45 Q&A (7 min).**

## Preflight

- Open b8-regression-suites.html, Expand all.

- Have a Python env / promptfoo installed if demoing the gate; the exercise (define Recall's gate) is a design task on paper.

- Have b3's chosen gating metric and threshold to hand - b8 enforces exactly that line.

## Never-cut beats

- What actually blocks the deploy: a non-zero exit code from the gate script, not a red dashboard or an email. CI reads the exit code.

- Anchor the threshold to the known-good baseline, so the gate detects a regression from today rather than chasing an unreachable 100%.

- Map the three promptfoo assertion types to when you use each - deterministic checks first, llm-rubric where judgment is needed.

## Cuts if running long

- Demo one assertion type live and describe the others.

- Skip the CI YAML walkthrough; the exit-code concept is the load-bearing idea.

## Quiz answers

1. **C** - a non-zero exit code from the gate script blocks the deploy; the pipeline reads the exit code (0 continues, non-zero stops).

2. **A** - llm-rubric uses an LLM to grade output against your plain-language criteria; contains is a string match, similar is embedding distance.

3. **B** - set the threshold from the shipped version's score so the gate catches a drop from where you already are, not an arbitrary number.

## Common questions + crisp answers

- *"Why not gate at 100%?"* You would never ship - and it does not describe a regression. The gate's job is to catch getting worse than today's baseline.

- *"Which assertion should I default to?"* Cheapest that works: contains or similar for deterministic checks, llm-rubric only where the criterion needs judgment.

- *"How does this connect to b3?"* b3 chose the one metric to gate on; b8 wires that metric and threshold into CI so a bad change cannot merge.
