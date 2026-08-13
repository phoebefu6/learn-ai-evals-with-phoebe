<!-- phoebe header -->

[![Open the live course](https://img.shields.io/badge/%E2%96%B6%20open%20the%20live%20course-1f6feb?style=for-the-badge)](https://phoebefu6.github.io/learn-ai-evals-with-phoebe/)
[![Star this repo](https://img.shields.io/github/stars/phoebefu6/learn-ai-evals-with-phoebe?style=for-the-badge&label=star%20this%20repo&color=444444)](https://github.com/phoebefu6/learn-ai-evals-with-phoebe/stargazers)
[![Free courses](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fphoebefu6.github.io%2Flearn-with-phoebe%2Fstats.json&query=%24.courses_live&label=free%20courses&style=for-the-badge&color=111111)](https://phoebefu6.github.io/learn-with-phoebe/)

### ▶︎ [Open the live course →](https://phoebefu6.github.io/learn-ai-evals-with-phoebe/)

Free, runs in your browser. No install, no login.

> 📚 Part of **[Learn with Phoebe](https://phoebefu6.github.io/learn-with-phoebe/)** - free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**

<!-- /phoebe header -->

# learn evals with phoebe

A two-track, hands-on course on **LLM and RAG evaluation, plus observability** - by Phoebe Fu.

Anyone can demo an AI system. Evaluation is how you know it actually works, whether your last change helped or broke it, and whether it is still working after launch. This course teaches both how to *lead* an eval effort and how to *build* one.

## Two tracks, 16 sessions

- **🤝 Leader track (6 x 45 min, no code):** why evaluate, what "good" means (the RAG Triad), offline vs online eval, the scorecard to demand, risk / drift / governance, and building an eval culture.
- **🛠️ Builder track (10 x 45 min, Python + a browser scorecard):** first metric, golden sets, retrieval metrics, generation metrics, LLM-as-judge, RAGAS, answer correctness, regression suites in CI, tracing and observability, and online eval + drift.

## The running project

The builder track grades **Recall**, the RAG assistant from [learn-rag-with-phoebe](https://phoebefu6.github.io/learn-rag-with-phoebe/), over the same three corpora. The RAG course ended by asking "is it good?" - this course answers it with numbers.

## Live evaluation scorecard

`assets/eval-live.js` runs a real retrieval evaluation over a 12-question golden set in your browser - Hit Rate@k, MRR, and Precision@1, computed exactly as in production. Change k and watch the metrics move and the misses appear. It runs fully offline with a deliberately simplified lexical retriever; the evaluation math is the real thing.

## Built from official sources

Taught from RAGAS, Anthropic, DeepLearning.AI + TruLens, LangSmith, Langfuse, Arize Phoenix, promptfoo, LlamaIndex, and OpenAI evals. Coverage contract: [`materials/official-course-map.md`](materials/official-course-map.md).

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Static HTML/CSS/JS - no build step. The natural sequel to the RAG course; both feed [learn-langchain-with-phoebe](https://phoebefu6.github.io/learn-langchain-with-phoebe/).
