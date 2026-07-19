# Presenter notes - Leader session 1: Why evaluate

**Session goal: send leaders out able to make the one-line case for an eval budget - a system you cannot measure is one you cannot safely ship.**

## Run of show (45 min)

- **0-3 Welcome.** Set the frame: every demo looks good, that is what a demo is for. Today is about the discipline that tells you if it actually works.

- **3-20 Concepts (17 min).**
  - The confidence trap (9 min): fluency is not correctness. Walk the SVG - two identical confident answers, one right, one wrong. Eval is the only thing that separates them.
  - The three questions (8 min): ship it? (offline), better or worse? (regression), still good? (online). Most teams do the first once and stop.

- **20-40 Exercises (20 min).**
  - Price a wrong answer (12 min): each person picks one owned use case, names the highest-stakes question, writes what a confident wrong answer costs, sets a ship threshold.
  - The "how would we know" audit (8 min): the four questions to put to a team in one meeting.

- **40-45 Q&A (5 min).** Land the homework: the five questions to ask the data team this week.

## Preflight

- Open a1-why-evaluate.html, click "Expand all", flip on Projector zoom.

- Have a chat AI open for the two "Try it now" prompts (the highlight-reel explainer, the risk-pricing partner).

- Pen and paper for the room - both exercises are no-code.

- Skim the a3 preview line (online eval on live traffic) so the "support bot that aged badly" example lands with a forward pointer.

## Never-cut beats

- The confidence trap SVG. This is the emotional core - a right answer and a convincing wrong one look identical, and you shipped both.

- "Good enough is a number, not a feeling." This is the sentence that unlocks the budget.

- The audit question: "If quality dropped in production tomorrow, how long until we noticed?" The most honest answer for most teams is "when customers complain."

## Cuts if running long

- Drop the self-study card "why you cannot outsource this to the model is smart now" - it is already marked read-after.

- Trim the second exercise to two of the four audit questions.

- The LLM-as-judge preview can shrink to one sentence; it is fully covered in a5.

## Quiz answers

1. **B** - a demo is a hand-picked highlight reel; it shows the system CAN be right, not how often. Selection bias is built in.

2. **C** - ship it (offline gate), better or worse (regression), still good (online). The three moments across the lifecycle.

3. **A** - LLM-as-judge is legitimate and necessary to scale, but it has length/position/self-preference bias and must be calibrated and spot-checked.

## Common questions + crisp answers

- *"Models are so good now, do we still need this?"* More than ever - a more fluent model writes more convincing wrong answers and gets trusted with bigger decisions. Capability raises the cost of not measuring.

- *"Is this expensive?"* The offline gate is cheap; the expensive thing is a silent wrong answer at scale. You are buying down risk on the answers that matter.

- *"Where does my team start?"* One golden set of representative questions with known answers, and a measured error rate. That is b1 made concrete.
