# Presenter notes - Builder session 9: Tracing & observability

**Session goal: builders learn trace/span/run and attach scores to spans - a score tells you what failed, a trace tells you why.**

## Run of show (45 min)

- **0-3 Welcome.** A score tells you what; a trace tells you why. LLM apps have no stack trace - the trace is the substitute.

- **3-18 Concepts (15 min).**
  - Trace, span, run (8 min): a trace is the whole request tree; a span/run is one unit of work (an LLM call, a retrieval, a parse) that nests under a parent.
  - The tools, and attaching scores to spans (rest): LangSmith (hosted), Langfuse and Phoenix (OSS, self-hostable; Phoenix on OpenTelemetry), promptfoo (eval-first CLI, no live-trace UI).

- **18-40 Build-along (22 min).**
  - Sketch the spans of one Recall request (10 min in-page): draw the trace tree for a single Recall query - retrieval span, generation span, parse span - and where a score attaches.

- **40-45 Q&A (5 min).**

## Preflight

- Open b9-tracing-observability.html, Expand all.

- Have a LangSmith key (or a Langfuse/Phoenix instance) ready if demoing a live trace; the exercise is pen-and-paper span-sketching.

- Prep the Recall request path so the span tree matches the running system.

## Never-cut beats

- The non-determinism argument: LLM apps give different outputs for the same input and chain several steps, so a bad answer has no stack trace - only a per-step trace shows which step failed.

- In LangSmith, a "run" is the word for a span - one unit of work that nests into the trace tree. Name it clearly so learners stop treating run and trace as synonyms.

- Attach eval scores to the specific span, so a failing metric points at the exact step.

## Cuts if running long

- Describe the tool landscape verbally instead of demoing a live trace.

- Simplify the span sketch to retrieval + generation only.

## Quiz answers

1. **B** - in LangSmith, a "run" is the same as a span: one logged unit of work that can be a child of another run.

2. **C** - LLM apps are non-deterministic and multi-step, so a bad answer has no stack trace; only a trace shows which step failed.

3. **A** - LangSmith is hosted; Langfuse and Phoenix are OSS and self-hostable; promptfoo is an eval-first CLI with no live-trace UI.

## Common questions + crisp answers

- *"Do I need a hosted tool?"* No - Langfuse and Phoenix self-host. Pick on data-residency and ops appetite; the tracing concepts are identical.

- *"Where do scores live?"* On the span/run they describe, so a low faithfulness score is pinned to the generation step, not the whole request.

- *"How does this set up b10?"* Online eval attaches scores and user feedback to production runs - b9 is the plumbing that b10 monitors.
