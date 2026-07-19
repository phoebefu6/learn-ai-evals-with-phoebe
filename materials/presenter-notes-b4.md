# Presenter notes - Builder session 4: Generation metrics

**Session goal: builders grade the answer, not the search - faithfulness, response relevancy, noise sensitivity, semantic similarity - and know which need ground truth.**

## Run of show (45 min)

- **0-3 Welcome.** Two answers, both retrieved perfectly, one still wrong. Retrieval metrics cannot see that; generation metrics can.

- **3-24 Faithfulness + relevancy (21 min).**
  - Faithfulness (9 min): fraction of the answer's claims supported by the retrieved context - the hallucination detector, no reference needed.
  - Response relevancy (rest): whether the answer stays on the topic asked; on-topic, not accuracy. A confidently wrong but on-topic answer can still score high.

- **24-40 Noise + similarity (16 min).**
  - Noise sensitivity: incorrect claims / total claims under noisy context - needs ground truth, and lower is better.
  - Semantic similarity: closeness to a reference answer, forgiving phrasing.

- **40-45 Q&A (5 min).**

## Preflight

- Open b4-generation-metrics.html, Expand all.

- Have a Python env with RAGAS installed if demoing faithfulness live; the exercise itself is pen-and-paper (score a faithful vs an unfaithful answer by hand).

- Prep one grounded answer and one that invented a claim, to score together.

## Never-cut beats

- Faithfulness = supported claims / total claims, no reference required - it is the direct hallucination check and the one that most often catches a dangerous answer.

- Direction matters: faithfulness and relevancy are "higher is better"; noise sensitivity is "lower is better" because it counts errors. Learners mix this up constantly.

- Relevancy measures focus, not truth - separate it explicitly from correctness (that is b7).

## Cuts if running long

- Compress semantic similarity to one sentence; it returns in b7's blend.

- Drop the second hand-scored example.

## Quiz answers

1. **B** - RAGAS faithfulness = the fraction of claims in the answer supported by the retrieved context (supported / total), no reference needed.

2. **C** - response relevancy measures whether the answer stays on the topic asked - on-topic, not accuracy.

3. **A** - noise sensitivity counts incorrect claims over total claims, so fewer mistakes means a lower, better number (the reverse of faithfulness).

## Common questions + crisp answers

- *"If faithfulness is high, is the answer correct?"* No - it only means the answer stuck to its sources. If the sources are wrong or incomplete, a faithful answer can still be wrong. Correctness needs a reference (b7).

- *"Why does relevancy use generated questions?"* It has the LLM generate N questions from the answer and compares them to the original by cosine - a proxy for "did this stay on topic."

- *"Which of these need ground truth?"* Noise sensitivity does; faithfulness and relevancy do not. That drives which you can run on unlabeled production data.
