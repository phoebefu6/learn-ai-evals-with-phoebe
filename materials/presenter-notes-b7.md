# Presenter notes - Builder session 7: Answer correctness

**Session goal: builders grade against a known-right answer - factual correctness by claim F1, semantic similarity, and the blend - and see that grounded is not correct.**

## Run of show (45 min)

- **0-3 Recap.** Grounded is not the same as correct. b4 checked the answer against its context; b7 checks it against the truth.

- **3-20 Claim F1 (17 min).**
  - Factual correctness by claim: decompose response and reference into claims, then TP / FP / FN.
  - Precision = TP/(TP+FP), recall = TP/(TP+FN), F1 blends them.

- **20-38 Similarity + blend (18 min).**
  - Semantic similarity: cosine of the response and reference embeddings, 0 to 1.
  - Answer correctness as the weighted blend of factual F1 and semantic similarity.

- **38-45 Q&A (7 min).**

## Preflight

- Open b7-answer-correctness.html, Expand all.

- Have a Python env with RAGAS if demoing; the exercise (write references, then reason about the scores) is pen-and-paper.

- Prep a response with one claim the reference does not support, to walk the FP/precision link.

## Never-cut beats

- The FP/FN mapping: a response claim the reference does not support is a false positive that lowers precision; a reference claim the response missed is a false negative that lowers recall.

- The reference requirement: factual correctness, answer correctness, and semantic similarity all need ground truth. Without it, fall back to faithfulness (grades against retrieved context).

- Grounded is not correct - a faithful answer built on wrong or incomplete sources still fails correctness.

## Cuts if running long

- State the F1 formula and skip the full worked TP/FP/FN tally.

- Compress the blend to "weighted mix of factual F1 and semantic similarity."

## Quiz answers

1. **B** - a response claim the reference does not support is a false positive, which lowers precision (TP/(TP+FP)).

2. **C** - semantic similarity is the cosine of the response embedding and the reference embedding, 0 to 1.

3. **A** - with no ground truth, use faithfulness; it grades against the retrieved context, no reference needed (the correctness metrics all require one).

## Common questions + crisp answers

- *"When do I use faithfulness vs correctness?"* Faithfulness when you only have the retrieved context; correctness when you have an agreed reference answer. Different questions, different data needs.

- *"Why blend F1 and similarity?"* F1 catches added or missed facts; similarity forgives phrasing. The blend rewards an answer that is both factually complete and worded like the reference.

- *"Writing references is expensive - worth it?"* For the high-stakes slice, yes; correctness is the only metric that catches a fluent, grounded, but wrong answer.
