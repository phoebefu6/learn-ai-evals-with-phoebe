# learn-ai-evals-with-phoebe - official course map

**What this is:** the coverage contract. Maps each session to the real sources it teaches from,
marks coverage (✓ full / ◐ partial / - not by design), lists the verified facts the pages may
state. Built 2026-07-19.

**Course shape:** two tracks, 16 sessions, tier 3 (Advanced). Crimson + slate, editorial-bold.
- **Leader track** (a1-a6): why evaluate, what "good" means, offline vs online, the scorecard to
  demand, risk/drift/governance, building an eval culture.
- **Builder track** (b1-b10): first metric -> golden set -> retrieval metrics -> generation metrics
  -> LLM-as-judge -> RAGAS -> answer correctness -> regression suites -> tracing/observability ->
  online eval + drift.

**Running project:** evaluate **Recall**, the RAG assistant from learn-rag-with-phoebe. Same three
corpora (`assets/rag-corpora.js`, reused). This course grades what that course built - the natural
sequel: RAG b9 opened evaluation; this course is the whole discipline.

**Interactive layer:** `eval-live.js` - an in-browser evaluation scorecard. Runs a real retrieval
evaluation over a 12-question golden set against Recall's corpora, computing **Hit Rate@k, MRR,
Precision@1** exactly as in production. Change k, watch the metrics move and the misses appear.
Honesty note (on every scorecard): retrieval uses the same simplified lexical embedder as the RAG
course playground so it runs offline; the evaluation math is the real thing.

---

## The 80% bar

Each session teaches ~80% of its mapped sources' working concepts. Not reproduced: hosted
dashboards, paid API keys, vendor certificates. Fast-moving: **re-verify RAGAS metric names,
LangSmith URLs, and Anthropic doc paths before delivery** (all moved recently - see caveats).

---

## Leader track coverage

| Session | Teaches | Mapped sources | Cover |
|---|---|---|---|
| a1 · Why evaluate | Vibes don't scale; the cost of a wrong answer; eval as the thing that lets you ship AI with confidence | Anthropic define-success, develop-tests | ✓ |
| a2 · What "good" means | The RAG Triad; retrieval vs generation quality; the metrics a leader must recognize | DeepLearning.AI Advanced RAG (Triad), RAGAS | ✓ |
| a3 · Offline vs online | Test set before ship vs monitoring live traffic; when each applies | LangSmith evaluation-concepts + online-evaluations | ✓ |
| a4 · The scorecard to demand | The 5 numbers to require before trusting/shipping an AI system | Anthropic define-success, RAG Triad, RAGAS | ◐ (scorecard framing is ours) |
| a5 · Risk, drift & governance | Regressions, drift, gaming metrics, when to trust an LLM judge | AWS drift guidance, LLM-as-judge biases | ◐ (governance framing ours) |
| a6 · Eval culture | Who owns eval, eval-driven development, the roadmap, RAG/agents outlook | Anthropic, LangSmith online eval | ◐ |

## Builder track coverage

| Session | Teaches | Mapped sources | Cover |
|---|---|---|---|
| b1 · Your first metric | Hit Rate@k + MRR over a golden set, live scorecard, rank vs threshold | LlamaIndex RetrieverEvaluator, MRR (Wikipedia) | ✓ |
| b2 · Building a golden set | Size, diversity, synthetic vs curated, edge cases, structure for auto-grading | Anthropic develop-tests, RAGAS testset gen, OpenAI evals | ✓ |
| b3 · Retrieval metrics | Context precision, context recall, hit rate, MRR, NDCG, precision/recall@k | RAGAS, LlamaIndex, DCG/NDCG (Wikipedia) | ✓ |
| b4 · Generation metrics | Faithfulness, response relevancy, noise sensitivity, semantic similarity | RAGAS, TruLens Triad | ✓ |
| b5 · LLM-as-judge | Pointwise/pairwise/reference-guided; position/verbosity/self-preference bias; calibration | Zheng et al. 2023 (MT-Bench), Anthropic | ✓ |
| b6 · RAGAS in practice | The metric suite, running an evaluation, the Nvidia dual-judge trio | RAGAS docs | ✓ |
| b7 · Answer correctness | Factual correctness (claim F1) + semantic similarity vs a reference; golden answers | RAGAS answer_correctness, factual_correctness | ✓ |
| b8 · Regression suites | Eval-as-test-suite, threshold gates in CI, catching regressions | promptfoo CI/CD, LangSmith evaluate() | ◐ (CI patterns concept-level) |
| b9 · Tracing & observability | Trace/span/run, LangSmith @traceable + evaluate(), Langfuse, Phoenix (OTel) | LangSmith, Langfuse, Arize Phoenix docs | ✓ |
| b10 · Online eval & drift | Sampling live traffic, user feedback as scores, data vs concept drift, dashboards | LangSmith online-evaluations, AWS drift | ◐ (no single freshness cadence) |

---

## Verified facts the pages may state (with sources)

**Metric definitions (RAGAS, docs.ragas.io)**
- Faithfulness = (claims supported by context) / (total claims). Hallucination check. No reference; LLM-judge.
- Response Relevancy (formerly Answer Relevancy) = mean cosine similarity between N LLM-generated questions (default 3) from the answer and the original question. On-topic, NOT accuracy.
- Context Precision@K = ranking quality of retrieved chunks (precision@k weighted by relevance).
- Context Recall = (reference claims supported by retrieved context) / (total reference claims). REQUIRES a reference.
- Factual Correctness = claim-based P/R/F1 via NLI vs reference. Answer Correctness = factual F1 + semantic similarity (weights tunable; default split not published - do not quote a number).
- Noise Sensitivity = incorrect claims / total claims (lower is better).
- RAGAS renamed Answer Relevancy -> Response Relevancy in v0.2+; Faithfulness/Context Precision/Context Recall keep names.

**Retrieval ranking metrics**
- Hit Rate@k = fraction of queries with a ground-truth doc in top-k.
- MRR = mean of 1/rank of the first relevant doc (0 if none). Only the first hit matters. Worked example: ranks 3,2,1 -> (1/3+1/2+1)/3 ≈ 0.61.
- Precision@k = relevant in top-k / k. Recall@k = relevant in top-k / total relevant.
- NDCG@k = DCG@k / IDCG@k; graded relevance, rank-discounted. Range 0-1.
- LlamaIndex RetrieverEvaluator metric names: hit_rate, mrr, precision, recall, ap, ndcg.

**RAG Triad (DeepLearning.AI Advanced RAG / TruLens)**
- Context Relevance (are retrieved chunks relevant to the query?), Groundedness (is the answer supported by context?), Answer Relevance (does the answer address the question?). All three pass -> strong evidence of low hallucination.
- Course by Jerry Liu (LlamaIndex) + Anupam Datta (TruEra). Lessons: intro, advanced RAG pipeline, RAG Triad, sentence-window retrieval, auto-merging retrieval.

**LLM-as-judge (Zheng et al. 2023, MT-Bench)**
- Modes: pointwise (score one on a rubric), pairwise (pick better of two), reference-guided (score vs gold).
- GPT-4 judge ~85% agreement with human preferences (higher than human-human in the paper).
- Biases: position bias (favor first), verbosity bias (favor longer), self-enhancement/self-preference (favor own family).
- Calibration: swap positions and require consistency; reference-guided judging; chain-of-thought; few-shot; use a DIFFERENT model family as judge than the one under test; validate against a small human-labeled set.

**Building a golden set (Anthropic, OpenAI evals, RAGAS)**
- Anthropic: prioritize volume over per-item quality; mirror the real-world task distribution; structure for automated grading (multiple-choice/string/code/LLM-graded); dedicate cases to edge cases incl. intentionally ambiguous ones.
- RAGAS testset generation: builds a knowledge graph from docs, generates a mix of single-hop and multi-hop queries (default distribution 0.5 / 0.25 / 0.25), testset_size configurable.
- OpenAI: LLMs can generate synthetic eval data; validate model-graded evals against human judgment before scaling.

**Offline vs online (LangSmith)**
- Offline: pre-deploy, against a dataset with reference outputs; catches regressions between versions.
- Online: continuous, on production traces, NO reference; sampling rate (e.g. 0.1 = 10%) controls cost; catches live-quality issues; can filter to user-feedback-flagged runs.

**Drift (AWS Prescriptive Guidance)**
- Data drift = statistical shift in input distribution (measure via input-embedding distribution shift; Wasserstein distance, not KS, for high-dim embeddings; alert on threshold).
- Concept drift = the input->desired-output relationship changes (prompts look similar but the right answer changed); relies on business metrics + feedback.
- Layer 2: sample drifted prompts, use an LLM-as-judge to classify the cause (new topic / intent shift / complexity / language style).

**Human feedback (LangSmith)**
- Thumbs up/down as numeric scores via create_feedback(score=1/0); attach to any child run (critique retrieval vs generation separately); annotation queues (single-run rubric or pairwise A/B).

**Tooling**
- LangSmith (hosted): trace = collection of runs; run == span; @traceable decorator; env LANGSMITH_TRACING=true + LANGSMITH_API_KEY; evaluate(target, data, evaluators=[...]).
- Langfuse (OSS, self-hostable): @observe; traces/observations, scores, datasets, sessions.
- Arize Phoenix (OSS): OpenTelemetry/OpenInference spans; portable instrumentation; LLM + code + human evals.
- promptfoo (OSS CLI, CI): promptfooconfig.yaml (prompts x providers x tests/assert); assert types contains/equals/similar/llm-rubric; `promptfoo eval`; regression gate via exit code / threshold on pass rate.
- OpenAI Evals: basic (data-driven, known answers) vs model-graded evals; registry; no-code JSON+YAML path.

**Anthropic grading methods**
- Code-based (exact match, string, ROUGE-L, cosine similarity) - fastest/cheapest, prefer when task allows.
- LLM-based (Likert 1-5, binary classification) - subjective qualities; use a DIFFERENT model to grade.
- Human - fallback + to validate LLM graders; does not scale.
- Success criteria: Specific, Measurable, Achievable, Relevant; usually multidimensional.

---

## Not covered by design (say so)

- Hosted dashboards, paid API keys, vendor certificates - stay with the official tools.
- Deep statistical drift math (Wasserstein internals) - named, not derived.
- Agent-specific eval (tool-call accuracy, agent goal accuracy, topic adherence) - mentioned in b6/a6 as where this goes next (LangChain/agents), not taught in depth.
- The exact internal scoring code of TruLens Triad and LlamaIndex hit_rate/MRR - definitions taught, line-level code is in the libraries.

## Re-verify before delivery (fast-moving)

1. RAGAS metric names (Answer -> Response Relevancy; Factual Correctness) and Answer Correctness default weights.
2. LangSmith docs moved to docs.langchain.com/langsmith/ (old docs.smith.langchain.com 308-redirects).
3. Anthropic docs moved to platform.claude.com (docs.claude.com 302-redirects).

## Sources (fetched + verified 2026-07-19)

RAGAS (metrics index, faithfulness, context precision/recall, response relevancy, noise sensitivity, factual correctness, semantic similarity, answer correctness, nvidia metrics, testset generation) · DeepLearning.AI Building & Evaluating Advanced RAG · TruLens RAG Triad · LlamaIndex evaluating module + retrieval usage · Wikipedia DCG/NDCG + MRR · Zheng et al. 2023 (MT-Bench, LLM-as-judge) · LangSmith (observability concepts, quickstart, evaluate, evaluation-concepts, online-evaluations, attach-user-feedback) · Langfuse docs · Arize Phoenix docs · promptfoo (config, CI/CD) · OpenAI Evals · Anthropic (define-success, develop-tests) · AWS Prescriptive Guidance (drift).
