# Presenter notes - Leader session 2: What good means (RAG Triad)

**Session goal: give leaders the three words - Context Relevance, Groundedness, Answer Relevance - that turn "was it good?" into a diagnosis.**

## Run of show (45 min)

- **0-3 Welcome.** One number cannot tell you why an answer was bad. "Good" needs three words, not one.

- **3-20 Concepts (17 min).**
  - The RAG Triad (9 min): Context Relevance (right material found?), Groundedness (answer backed by that material?), Answer Relevance (does it address the question?). All three passing is strong evidence the answer is not hallucinated.
  - Retrieval quality vs answer quality (8 min): the Triad splits the pipeline in two - a bad answer is either a search problem or a generation problem, and the Triad tells you which.

- **20-40 Exercises (20 min).**
  - Score a real answer on the Triad (12 min): take one recent AI answer, rate each corner, find the weak corner.
  - Sort the complaints (8 min): map real user complaints to the corner they implicate.

- **40-45 Q&A (5 min).**

## Preflight

- Open a2-what-good-means.html, Expand all, Projector zoom on.

- Have the RAG Triad SVG on screen ready to zoom - it is the spine of the session.

- Bring one real (anonymized) question-and-answer from a live system to score together on the Triad.

## Never-cut beats

- The Triad as a diagnosis, not a grade: low Groundedness = generation invented; low Context Relevance = retrieval missed. That split is the whole leadership payoff.

- "Groundedness is the anti-hallucination check" - break the answer into claims, count the fraction the context supports.

- Never blend the three into one number - a high average can hide one dangerous corner.

## Cuts if running long

- Drop "sort the complaints" to a homework item.

- Compress retrieval-vs-answer to the one-line split if the Triad section ran long.

## Quiz answers

1. **C** - the three corners are Context Relevance, Groundedness, and Answer Relevance (not speed/cost, not tone).

2. **A** - groundedness = break the answer into claims and check what fraction the retrieved context supports. Nine of ten backed = 0.9.

3. **B** - low groundedness means a generation problem; the model invented or drifted from the material it had. Missing context points at retrieval instead.

## Common questions + crisp answers

- *"Why not just ask users if they liked it?"* Users grade Answer Relevance at best and cannot see Groundedness - they cannot tell a supported answer from an invented one. That is exactly the corner that hurts you.

- *"Do all three always matter?"* The weak corner is your action item. A high average across three can still hide one dangerous corner, which is why you never blend them.

- *"Which corner is most dangerous when low?"* Groundedness - a confident, fluent, invented answer looks identical to a correct one.
