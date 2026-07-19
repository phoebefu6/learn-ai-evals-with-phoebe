# Presenter notes - Builder session 6: RAGAS in practice

**Session goal: builders run the RAGAS suite over Recall - one call, four columns - and read the results to split a diagnosis onto retriever vs generator.**

## Run of show (45 min)

- **0-3 Welcome.** One call, four columns, a diagnosis. RAGAS is the metrics from b4 wired into a suite.

- **3-24 Suite + a sample (21 min).**
  - The EvaluationDataset sample: user_input, response, retrieved_contexts, and an optional reference ground truth (needed for completeness/correctness metrics).
  - Running the suite over a small dataset.

- **24-40 Trio + reading results (16 min).**
  - The Nvidia dual-judge trio (Context Relevance, Response Groundedness, Answer Accuracy) on small integer scales - more stable than one judge on a fine-grained scale.
  - Reading the scorecard to locate the failing component.

- **40-45 Q&A (5 min).**

## Preflight

- Open b6-ragas.html, Expand all.

- Have a Python env with RAGAS installed and an API key ready if running the suite live; the exercise (assemble a dataset and predict the lowest metric) is pen-and-paper then code.

- Prep the Recall sample dataset in EvaluationDataset shape.

## Never-cut beats

- The diagnosis split: high faithfulness + low context recall = the retriever, not the prompt. The generator grounded fine on what it got; the right chunks never arrived.

- The Nvidia trio is more stable because it uses two judges on small integer scales ({0,1,2}/2 and {0,2,4}/4), less noisy than one judge on a fine scale.

- Which metrics need a reference column - completeness and correctness do; faithfulness does not.

## Cuts if running long

- Run the suite on a smaller sample or show cached output.

- Trim the trio to the naming and the "dual judge, small scale = stable" point.

## Quiz answers

1. **C** - a sample carries the question, the answer, the retrieved contexts, and optionally a reference ground truth.

2. **A** - faithfulness 0.9 but context recall 0.5 points at the retriever: right info never reached the generator, which stayed grounded in what it got.

3. **B** - the Nvidia trio uses two LLM judges and small integer scales rather than one judge on a fine-grained scale, which is less noisy.

## Common questions + crisp answers

- *"Faithfulness is high, so we're fine?"* Not if context recall is low - that means the retriever starved the generator. Fix chunking, embeddings, or search, not the prompt.

- *"Which metrics can I run without ground truth?"* Faithfulness and response relevancy. Context recall and any correctness metric need the reference column.

- *"Why a suite instead of one metric?"* The columns triangulate: the pattern across them (not any single number) is what points you at the failing component.
