# Presenter notes - Leader session 6: Building an eval culture

**Session goal: turn eval from a heroic one-off into a habit with an owner, a cadence, and a roadmap - the leader's closing move.**

## Run of show (45 min)

- **0-3 Welcome.** Evaluation is a habit or it is nothing. This session makes it stick after the course ends.

- **3-20 Concepts (17 min).**
  - Eval-driven development (9 min): write the eval first - define success as measurable criteria before you build, then build toward them.
  - The roadmap and where this goes (8 min): the maturity ladder, and how eval grows as systems become agents (tool-call accuracy, goal accuracy, topic adherence).

- **20-40 Exercises (20 min).**
  - Place your org on the ladder (12 min): honest self-rating on the maturity ladder, name the next rung.
  - Assign an owner and a cadence (8 min): who owns the eval, and does it run on a schedule.

- **40-45 Q&A (5 min).** Carry it forward - this is the last leader session; point curious ones at the builder track.

## Preflight

- Open a6-eval-culture.html, Expand all, Projector zoom on.

- Have the maturity ladder SVG ready to zoom.

- Bring the a1 "who owns eval, does it run automatically?" audit question - a6 answers it.

## Never-cut beats

- Write the eval first. It turns "done" into a threshold and surfaces stakeholder disagreement early, before code.

- Feed real production failures back into the golden set - every failure is a free, perfectly representative test case, and the antidote to a stale set.

- Agents raise the stakes: you evaluate the whole path (tool calls, goals, topic adherence), not just the final answer.

## Cuts if running long

- Drop the agent-eval preview to a forward-pointer sentence.

- Trim the ladder exercise to a single show-of-hands self-rating.

## Quiz answers

1. **B** - write the eval first: define success as measurable criteria before you build, then build toward them.

2. **C** - real production failures folded back in with their correct answers, so the system can never quietly regress on them.

3. **A** - evaluation grows for agents: add tool-call accuracy, goal accuracy, topic adherence, and evaluate the path, not just the final answer.

## Common questions + crisp answers

- *"Who should own eval?"* A named person with a schedule, not a side task. Unowned eval lapses within a quarter.

- *"We are at the bottom of the ladder - where do we start?"* One golden set, one measured number, one threshold. b1 in the builder track is exactly that first rung made concrete.

- *"How often should the eval run?"* On every change (regression) and on a fixed cadence for production (online). Cadence plus an owner is what makes it a habit.
