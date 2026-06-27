# ANALYSIS.md — Business Analysis Standards

Business analysis is a sovereign domain — turning a human need into a clear, buildable, testable shape, without deciding for the human. Read this for requirements, user stories, scope, and acceptance work. The ethical and strategic frame lives in `GEMINI.md` (the apex, *The Law of the Name*, *Raw Intent Clarification*); this file is the method.

## The Analyst Names, the Human Decides

Analysis is a Mirror, not a Gate (`GEMINI.md`): it surfaces needs, options, and consequences as facts and leaves the choice with the stakeholder. It never smuggles a decision into a requirement, and it never infers what the person did not say (*The Dumb Tool*; *The Human Is More Than Their Stated Intent*, `GEMINI.md`).

## Requirements

- **Need before solution:** capture the problem and the who/why first; a requirement phrased as a pre-chosen solution hides the real need and forecloses better options. Ask "what is the person trying to do, and why?"
- **One requirement, one intent:** atomic, unambiguous, testable — if you cannot write its acceptance check, it is not yet a requirement.
- **Functional and non-functional, both named:** the behavior *and* the qualities (performance, security, accessibility, availability) that decide whether the behavior is acceptable.
- **Traceable both ways:** every requirement traces back to a stakeholder need and forward to its acceptance test; orphans are scope creep or dead weight (*Integrity Is Health*, `GEMINI.md`).
- **Explicit non-goals:** state what is *out* of scope as plainly as what is in — the boundary is the frame (*The Frame Is Mutual Safety*, `GEMINI.md`).

## User Stories

- **INVEST:** Independent, Negotiable, Valuable, Estimable, Small, Testable.
- **Shape:** *As a [role], I want [capability], so that [outcome].* The "so that" is the point — a story without an outcome is a task, not a story.
- **Vertical slices:** a story delivers a thin, end-to-end piece of value, never a horizontal layer alone.

## Acceptance Criteria

- **Given / When / Then:** preconditions, action, observable result — concrete and binary (met or not).
- **Agreed before build, with the stakeholder:** acceptance is settled up front, not invented after the fact.
- **Feeds Definition of Ready:** clear value, criteria, and dependencies make a story ready to start (`AGILE.md`).

## Prioritization & Scope

- **MoSCoW:** Must / Should / Could / Won't — and *Won't* is a real, recorded decision, not a silence.
- **Value vs. effort, named honestly:** present the trade-off as facts; the stakeholder chooses (*Proposer-Approver*, `GEMINI.md`).
- **Smallest valuable slice first:** ship the thinnest thing that serves, then iterate (*enough, not perfect*; *Smallest Mechanism*, `GEMINI.md`).

## Stakeholders & Process

- **Map who is affected** — including those downstream and the silent ones; a path that serves one by harming another fails the measure (`GEMINI.md`).
- **Model the real flow first:** map the process as it actually happens before proposing change; name the current-state pain as facts, not blame.
- **Plain language:** specifications are written to be understood by the people who live the process, never in jargon that hides meaning (*Writing Style & Tone*, `WRITING.md`).
