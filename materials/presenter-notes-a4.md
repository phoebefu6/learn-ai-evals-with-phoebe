# Presenter notes - Leader session 4: The scorecard to demand

**Session goal: replace "94% accuracy" with a five-number scorecard leaders can read and a ship threshold set on purpose.**

## Run of show (45 min)

- **0-3 Welcome.** One blended number can describe a safe system and a dangerous one. Today you learn what to demand instead.

- **3-20 Concepts (17 min).**
  - The five numbers (10 min): walk each row - retrieval quality, faithfulness/groundedness, answer relevance, plus cost and latency. Faithfulness is the dangerous one when it is low.
  - Reading it without a data-science degree (8 min): what each number means in business terms, and which one you never let slide.

- **20-40 Exercises (20 min).**
  - Build your acceptance scorecard (12 min): fill the five rows for one owned use case, set a threshold per row before seeing results.
  - Ship or do-not-ship (8 min): read a sample card and make the call.

- **40-45 Q&A (5 min).**

## Preflight

- Open a4-the-scorecard.html, Expand all, Projector zoom on.

- Have last session's Triad framing handy - the five numbers extend it.

- If leaders did a1's cost-of-wrong sheet, ask them to bring it; a4 turns it into a threshold.

## Never-cut beats

- "One number hides a failure in the average." Show how a 94% blend can conceal a poor faithfulness score.

- Set the threshold before the eval runs. A bar chosen after the fact drifts toward whatever the system happened to score.

- Faithfulness low = the most dangerous failure: a confident, fluent, invented answer that looks identical to a correct one.

## Cuts if running long

- Drop "ship or do-not-ship" to a discussion prompt.

- Collapse latency and cost into one "operational" line if time is tight - the quality trio is the priority.

## Quiz answers

1. **C** - ask to see the single number broken into separate ones, because one blended score can hide a serious failure in the average.

2. **A** - faithfulness measures whether every claim is backed by the retrieved source rather than invented; it is the direct hallucination check.

3. **B** - the ship threshold is set on purpose before the eval runs, driven by the cost of a wrong answer for this use case.

## Common questions + crisp answers

- *"What is a good threshold?"* There is no universal number. It comes from the cost of being wrong for that use case - draft suggestions and automated payouts do not share a bar.

- *"Why five numbers, not three?"* The Triad is the quality core; cost and latency are the operational reality. A card that ignores cost ships something you cannot afford to run.

- *"The team only reports one number - now what?"* Ask for the breakout. If they cannot produce it, there is no real scorecard yet, only a headline.
