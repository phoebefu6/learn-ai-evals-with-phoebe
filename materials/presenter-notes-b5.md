# Presenter notes - Builder session 5: LLM-as-judge

**Session goal: builders write an LLM judge across the three modes and test it for the biases that make it lie - position, length, self-preference.**

## Run of show (45 min)

- **0-3 Welcome.** The grader is a model too - so it has its own failure modes.

- **3-24 Three judging modes (21 min).**
  - Pointwise (absolute score), pairwise (pick the better of two), reference-based (grade against a known answer).
  - Pairwise is most reliable for comparing two candidates - judges, like humans, choose between two options more consistently than they assign absolute scores.

- **24-40 Biases + calibration (16 min).**
  - Position bias, length/verbosity bias, self-preference bias, and the calibration practice for each.

- **40-45 Q&A (5 min).**

## Preflight

- Open b5-llm-as-judge.html, Expand all.

- Have a Python env / API key ready if demoing a live judge call; the exercise (write a judge, then test for position bias) can be done on paper with a chat AI.

- Prep two candidate answers to Recall's question to run pairwise, in both orders.

## Never-cut beats

- Pairwise beats pointwise for comparisons and is why it drives model/prompt selection - but guard it against position bias.

- Position-bias defense: run each comparison in both orders and only count a win if the judge is consistent; order-dependent picks become ties.

- Self-preference: grade with a different model family than the one that generated the answer; validate against a small human-labeled set (~85% agreement is the MT-Bench benchmark).

## Cuts if running long

- Demo position-bias testing on one pair rather than several.

- Fold reference-based mode into a one-liner; it is the mechanism behind b7.

## Quiz answers

1. **C** - pairwise is most reliable; judges (like humans) choose between two options more consistently than they assign absolute scores.

2. **A** - defuse position bias by running each comparison in both orders and only counting a win if the judge is consistent.

3. **B** - Anthropic's guidance on self-preference: use a different model to evaluate than the model used to generate.

## Common questions + crisp answers

- *"How much can I trust the judge?"* Calibrate it against a small human-labeled set; roughly 85% agreement is the benchmark. Use it where a graded miss is cheap and keep humans on high-stakes calls.

- *"Does temperature help?"* Not for position bias - swapping order and requiring a consistent winner is the fix, not a higher temperature.

- *"Pointwise seems simpler - why not always use it?"* Absolute scores drift and are hard to compare across runs; pairwise is steadier when the question is "which of these two is better."
