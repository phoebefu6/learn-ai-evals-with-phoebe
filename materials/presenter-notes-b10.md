# Presenter notes - Builder session 10: Online eval & drift

**Session goal: builders design production monitoring for Recall - reference-free, sampled, drift-aware - and graduate the track.**

## Run of show (45 min)

- **0-3 Welcome.** Offline proves it works once; online proves it keeps working.

- **3-18 Concepts (15 min).**
  - Online evaluation (8 min): runs continuously on production traces with no reference answers, on a sampled slice of traffic to control cost.
  - Drift, and the graduation (rest): concept drift (inputs look the same, right answer changed) vs data drift (input distribution shifts); capturing user feedback as a numeric score.

- **18-40 Build-along (22 min).**
  - Design Recall's production monitoring (12 min): pick the sampling rate, the reference-free checks, the feedback capture, and what triggers the expensive judge.

- **40-45 Close (5 min).** After the track - where builders take this next.

## Preflight

- Open b10-online-drift.html, Expand all.

- Have a LangSmith key ready if demoing create_feedback attaching a score to a run; the design exercise is pen-and-paper.

- Recall a3's and a5's drift framing - b10 is the hands-on version.

## Never-cut beats

- Online eval has no answer key: it judges live traffic reference-free and samples (e.g. 10%) to see trends affordably.

- Concept drift: the refund policy changed but the indexed chunk did not, so answers go wrong while inputs look normal - input monitors will not fire.

- User feedback is a numeric score (up=1, down=0) attached to that request's run, and flagged runs are exactly where you spend the pricier LLM judge.

## Cuts if running long

- Demo feedback capture conceptually rather than wiring create_feedback live.

- Trim the monitoring design to sampling rate + one reference-free check.

## Quiz answers

1. **C** - online eval runs continuously on production traces with no reference answers, on a sampled slice of traffic.

2. **A** - concept drift: the inputs look similar but the right answer has changed underneath (the policy moved; the chunk did not).

3. **B** - a thumbs-down is a numeric feedback score (down=0) attached to that request's run, which can also trigger the expensive judge.

## Common questions + crisp answers

- *"How do I catch concept drift if inputs look normal?"* Monitor answer quality on live traffic, not just input distribution - the questions look unchanged, so only the output signal moves.

- *"What sampling rate?"* Start around 10% to control cost while seeing trends, and aim the expensive LLM judge at feedback-flagged runs rather than everything.

- *"Where does the loop close?"* Production failures found here become new golden-set entries (b2, a6), so the offline gate keeps catching what online first caught.
