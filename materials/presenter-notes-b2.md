# Presenter notes - Builder session 2: Building a golden set

**Session goal: builders learn the four qualities of a golden set worth trusting and turn real questions into golden entries - garbage in, garbage score.**

## Run of show (45 min)

- **0-3 Welcome.** Garbage golden set, garbage score. The data your metric depends on is the metric.

- **3-22 Concepts (19 min).**
  - The four qualities of a golden set worth trusting (10 min): representative, sized for coverage, includes hard/ambiguous cases, has agreed answers.
  - Synthetic vs curated: generate, then curate (8 min): LLMs can generate candidate entries; you validate against human judgment before trusting scores.
  - The seed set, scored again (live, ~5 min): the .evalbox showing the seed set rescored.

- **22-40 Build a set (18 min).**
  - Turn 3 real questions into golden entries (12 min): each builder takes 3 real questions from their own system and writes agreed correct answers.

- **40-45 Q&A (5 min).**

## Preflight

- Open b2-golden-set.html, scroll to the .evalbox (the seed set rescored), confirm it renders - it shares the b1 live scorecard component.

- Have a chat AI ready if demoing synthetic generation of candidate entries.

- Ask builders to bring 3 real (anonymized) questions from a system they own.

## Never-cut beats

- Prioritize volume over per-item polish (Anthropic guidance): more questions with slightly lower-signal automated grading beats a few hand-graded gems, because coverage catches more regressions.

- Deliberately include ambiguous cases - they stress-test whether the system asks or declines when there is no clean answer.

- Generate, then curate: validate LLM-generated sets against human judgment on a sample before trusting them at scale.

## Cuts if running long

- Drop the live rescore of the seed set to a screenshot if the room is fluent from b1.

- Reduce the build to 2 golden entries instead of 3.

## Quiz answers

1. **B** - prioritize volume: more questions with slightly lower-signal automated grading beats fewer hand-graded ones, because coverage catches more.

2. **C** - ambiguous cases stress-test how the system and grader handle genuine uncertainty, where the right move may be to ask or decline.

3. **A** - validate an LLM-generated set against human judgment on a sample first (OpenAI guidance); trust is earned per set.

## Common questions + crisp answers

- *"Won't a bigger set slow the eval down?"* Automated grading is what makes volume affordable - that is the trade the guidance assumes.

- *"How do I write the correct answer for an ambiguous case?"* Often the correct behavior is a clarifying question or a decline. Encode that as the reference so the eval can reward it.

- *"Where do the best new entries come from?"* Real production failures, folded back in with their correct answers - the culture point from a6, made hands-on.
