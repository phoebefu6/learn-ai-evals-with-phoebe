# Presenter notes - Builder session 3: Retrieval metrics (scorecard)

**Session goal: builders master the full retrieval family - Precision@k, Recall@k, NDCG alongside Hit Rate and MRR - and defend one metric to gate on.**

## Run of show (45 min)

- **0-3 Welcome.** Two metrics is not enough. Hit Rate and MRR are the front door, not the whole house.

- **3-20 Metrics (17 min).**
  - Precision, recall, and where the metrics read from (9 min): precision = relevant in top k / k (noise); recall = relevant in top k / total relevant (gaps, needs a reference for the denominator).
  - Read the scorecard as formulas (live, ~8 min): the .evalbox, connecting each on-screen number to its formula.
  - NDCG, and choosing the one metric to gate on (9 min): graded relevance across the whole ranking; then match metric to product.

- **20-40 Build + choose (20 min).**
  - Choose Recall's gating metric (10 min): map product profile to metric, read the value off the scorecard, set and justify a threshold that b8's CI gate will enforce.

- **40-45 Q&A (5 min).**

## Preflight

- Open b3-retrieval-metrics.html, scroll to the .evalbox (it defaults to k=3), click k=1/3/5 and confirm the scorecard and the misses re-render, and that Hit Rate diverges from Precision@1 as you move k.

- The retriever is the same offline lexical embedder - zero network, no keys.

- Optional: a Python env with LlamaIndex if demoing the evaluator running the full suite live.

## Never-cut beats

- The precision-vs-recall split: precision catches noise (junk returned), recall catches gaps (relevant missed) and needs a reference to know the total-relevant denominator.

- Metric follows product: one-answer bot gates on Precision@1 or MRR; a research/many-results tool gates on Recall@k or NDCG. For Recall (one grounded answer per query), that points at Precision@1 or MRR.

- A retriever with five metrics and no chosen gate has no gate at all.

## Cuts if running long

- Narrate NDCG conceptually rather than deriving the discount; the gating decision matters more.

- Skip the by-hand recomputation and just toggle k while explaining.

## Quiz answers

1. **C** - precision = relevant in top k / k (noise); recall = relevant in top k / total relevant (gaps, needs the full relevant set as denominator).

2. **A** - NDCG uses graded relevance and scores the whole ranking; MRR uses yes/no relevance and only the first hit's rank.

3. **B** - for a bot that shows one answer, gate on Precision@1 or MRR; only the top result reaches the user.

## Common questions + crisp answers

- *"Why does recall need a reference but precision does not?"* Recall divides by the total number of relevant docs - you can only know that count from a labeled reference. Precision divides by k, which you already have.

- *"Can I gate on more than one metric?"* You can track many, but pick one to block a ship on, or you have no gate at all. b8 turns that single choice into a CI threshold.

- *"When would Recall want NDCG instead?"* If it grows a "show me everything about incident X" mode - the metric follows the product profile.
