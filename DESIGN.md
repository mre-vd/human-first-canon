# DESIGN.md — UI/UX Design Standards

This document is the single source of truth for UI/UX design: visual layout, component composition, and design execution. Design is a sovereign domain — a distinct discipline, not a subset of code — kept separate from the engineering canon (`CLAUDE.md`). Every change to frontends must align with these criteria.

## Design Guardrails

### 1. Design Approval Flow

- **Role:** the designer/AI proposes design ideas, layouts, and implementations.
- **Action:** Present design choices clearly (e.g., Option A vs. Option B) and wait for operator validation before committing to complex, high-risk design changes.

### 2. Aesthetic Frame (No Emojis)

- **Standard:** Emojis lie outside the professional, sleek, and premium frame of the system. Their use introduces visual noise and deviates from the established brand voice.
- **Consequence:** Using emojis in UI components, buttons, or operator-facing text devalues the interface clarity. Styling must be achieved through typography, spacing, and color.

### 3. Verification Checklists

Before submitting or finalizing any UI/UX change, verify:
- [ ] **No Dead Ends:** Does every interactive element (button, link, trigger) lead to a logical, terminal outcome or state change?
- [ ] **Component Recursion:** Are we reusing existing design patterns instead of introducing a new ad-hoc style?
- [ ] **Least Emojis:** Did we check for and remove any accidental emojis?

### 4. Smallest Mechanism (Anti-over-engineering)

- **Principle:** Among solutions that equally preserve the person's control, the one with the **fewest mechanics** wins. Empowering the person does not equal adding more buttons; sometimes the greatest respect is removing a step.
- **Over-engineering Test (Run before adding any control/screen):**
    1. **New need or duplicate path?** If it's a "second button" for an existing need — do not add.
    2. **One mechanism — one job.** If a toggle does two things (e.g., "Focus" = silence + UI rebuild) — split or discard one.
    3. **Attention Budget.** "More control" is insufficient; the mechanism must return more attention than it consumes.
    4. **Mental Model Limit.** No more than two new concepts per screen/ticket. If more — narrow the ticket.
    5. **No UI for the Unbuilt.** Future feature previews or disabled banners belong in the backlog, not on the working screen.
- **Duty to Speak Aloud:** When proposing additions, explicitly identify candidates for over-engineering and present the smallest version first.
- **Post-Task Audit:** Every task ends with the question: "What can be removed, combined, or simplified?"

### 5. No Dead Ends & The Single Door

This is the single home for the dead-end / exit rule; other surfaces point here rather than restating it.
- **No Dead Ends:** Every interactive element (button, link, trigger) resolves to a logical outcome — a state change, confirmation, or next step. Never implement a path that leads nowhere or has no functional outcome.
- **The Single Door:** A screen is entered through one door and left through the same door. There is exactly one "back / return / up / exit" affordance on any given screen, and it returns the person to the context they came from. One way in, one way out.
- **Rules:** No more than one return element per screen. The exit mirrors the entry. Only one may generically say "Back"; others must name their explicit destination. Every render branch provides a back affordance.

### 6. Naming Convention for Components

- **Universal/shared components (patterns, generic building blocks):** name for the transformation, not a structural label — avoid hooks like "Core" or "Central".
- **Applied/domain components (tools tied to a specific sector):** name explicitly for the context (e.g., "MedicalRecord", "GitSync").

### 7. No Speculative "Smart" Affordances

- **No unscoped smart UI:** no assistant panels, no "analyse / summarise / recommend" actions, no auto-suggested conclusions or diagnoses unless explicitly scoped as a feature. Controls default to explicit operations: enter, select from a list, apply a template, required-field and completeness checks, show stored records, plot entered values (a chart draws data, it doesn't interpret it).
- **Actions read as the operator's own act**, executed by the tool — not phrased as the system's verdict.
- **No surveillance affordance:** the UI never tracks, follows, or profiles the person — no location trails, no behavioural watching.
- **Lexicon:** copy obeys the conventions in `WRITING.md`.

---

## Core Design Principles

### Decluttering (Interface)

The principle of intentionally removing noise to improve clarity and focus. Every UI element must justify its existence.
- **Interface Decluttering:** Hide complex actions behind "Expert" toggles or progressive disclosure. The primary view must show only what is essential for the current task.
- **Cognitive Load:** Minimize the number of things a person must hold in their head to navigate the interface.

### Progressive Disclosure — UI Grows, It Doesn't Dump

An interface reveals structure progressively — it never dumps the whole structure at once, and in a linear flow it never piles spent steps on top of live ones.

- **Paced by the person:** nothing unfolds before it is reached. The next thing appears when the person's step calls for it, never front-loaded to look feature-rich.
- **Linear flow — one thing at a time:** when a step has done its job (a form submitted, a choice made), it yields its place; the next thing that deserves attention appears where it stood. Spent UI does not linger as noise above the live focus. The appearance of the next block — with its working state — is itself the confirmation the step was accepted (pairs with *Visibility of system status*).
- **Complex UI — disclose by growth:** reveal structure progressively, as the person reaches it — not all at once. Branches expand only when needed; the rest stays collapsed.
- **Collapsed, not deleted:** collapsing a spent step is not deleting it. Earlier states fold into a recoverable history, never thrown away. Offer exactly one small, quiet affordance to bring a step back — to review or change it; the path back is never sealed (*No Dead Ends & The Single Door*).
- **Underlying state persists:** what is shown changes between steps; the underlying state — the entered values, the thread, the work so far — continues beneath. Swapping the view never silently drops the person's data.
- **A clean end:** when the flow completes, it closes to zero with nothing left hanging; the closing screen may carry a brief farewell or summary.
- **Calm transitions:** the transition is a calm grow-in (a brief fade and rise), never a spinner-circus or motion for its own sake. Honour `prefers-reduced-motion`: when reduced, the next block simply appears — the meaning must not live in the animation alone (*Accessibility — Respect reduced motion*).

### Conceptual Consistency & Recursive Familiarity

Interfaces must be architected so that the person's mental model scales effortlessly across the entire system.
- **Component Recursion:** Reuse interaction patterns (e.g., how a "Workbench" or "Sidebar" opens) identically across all modules.
- **Predictable Affordance:** Buttons, links, and status indicators must behave exactly the same way on every screen.
- **Spatial Logic:** If "Primary Actions" are at the bottom-right on Screen 1, they must be there on every subsequent screen.
- **The "Already Known" Test:** Before adding a new UI pattern, ask: "Can I solve this using a pattern the person already knows from other parts of the system?"
- **Logical Outcomes:** See **No Dead Ends & The Single Door** above — every interaction resolves to a clear state change, confirmation, or next step, matching the design specification.

### Logical Navigation Outcomes (Design-to-Result & Symmetrical Recovery)

Every UI interaction, user journey, or navigational flow must lead to a clear, logical, meaningful result.
- **Design guides, operator decides:** the design guides to a result, but the step is taken by the operator. The system never completes actions automatically or conceals the ability to retreat. Forward progress is a suggestion; the final choice belongs to the human.
- **Result is a Spectrum:** a result is not only process completion — it spans a completed action, a draft document/workspace, or clarity (information, an answer, understanding where one stands, even realizing "this cannot be done here").
- **No Silent Dead Ends:** interactive elements never lead to dead ends or exist without purpose. A path into an empty or restricted state must give context and next steps (see **No Dead Ends & The Single Door**).
- **Symmetrical Navigation (Door Principle):** when a flow enters a terminal view through a "door," provide a clear way back out through the same route (symmetrical back-navigation).
- **Actionable Error Recovery:** error states never strand the operator — give clear guidance, hints, or direct actions to correct the error (*Errors speak plainly*).
- **Verification:** during design audit and planning, explicitly verify and document these navigation outcomes, error states, and symmetrical exit paths, so the design stays a reliable guide for the code.

## Interaction & Onboarding Standards

*Contributed externally — distilled from client-communication guidelines and generalized for this canon.*

How a product asks, confirms, and recovers decides whether the person trusts it. These are applied rules for forms, onboarding, and transactional flows.

- **Minimum fields.** Ask only for what the action genuinely needs; everything non-essential is optional. Every extra field is friction and a drop-off point.
- **No registration without value.** Never force account creation that returns nothing to the person. Registration is justified only when it gives concrete value (history, online management, faster repeat use); otherwise let the person complete the task without it. Registration for its own sake is churn.
- **Consent before contact.** Data given for a functional purpose (e.g., a reminder) is not consent for marketing. No promotional messaging without explicit opt-in.
- **Errors speak plainly.** On failure, say what happened and what to do next in plain language — never error codes or technical jargon — and always offer a concrete next step. A system failure is named as the system's, never charged to the person as their own error, and uncertain data is marked as such.
- **Address people by name.** Personalize transactional copy; never "Dear user".
- **Immediate confirmation.** The instant an action succeeds, confirm it in the same beat — never leave the operator guessing whether it was accepted.
- **Exits stay simple.** Reversal actions (cancel, delete, unsubscribe) are one step — no forms, no mandatory "reason". A threshold (leaving, cancelling, completing) may still offer a brief, optional moment — a quiet farewell, a moment to reflect, or the surfacing of a loose end held on another's side — never forced.
- **Restraint over nagging.** At most one re-engagement nudge; silence if unanswered. Repeated prompting is noise that costs trust.

## Accessibility — This Is for Everyone

Design serves everyone, including people with impaired sight, motor control, or attention. Accessibility is the floor, not a feature.
- **Contrast:** meet WCAG AA — at least 4.5:1 for body text, 3:1 for large text and meaningful UI.
- **Never colour alone:** pair colour with text, icon, or shape — state must survive colour-blindness and grayscale.
- **Keyboard-operable:** every action works without a mouse, with a **visible focus** indicator.
- **Touch targets:** comfortably tappable (≈ 44–48px), with spacing between them.
- **Name things for assistive tech:** labels, alt text, and roles so screen readers can announce every control.
- **Respect reduced motion:** honour `prefers-reduced-motion`; never trap meaning in animation alone.
- **Legible by default:** readable sizes, sufficient line spacing, no text baked into images.

## Usability Principles

Battle-tested heuristics filling the remaining gaps *(distilled from Nielsen's usability heuristics and the GOV.UK design principles)*:
- **Visibility of system status:** always show what's happening — loading, progress, saved, offline, error. The operator never guesses. (Pairs with the three async states, `STACKS.md` — Async data — three states.)
- **Match real-world conventions:** use metaphors, ordering, and terms the person already knows; mirror how the task works outside the screen, not the system's internal model.
- **Prevent errors, don't just report them:** good defaults and constraints first; for consequential or destructive actions add a safety step — **undo**, or a confirmation only when the action is truly irreversible.
- **Reversibility & control:** prefer reversible actions and undo over hard confirmations; always offer a clear way out of an unwanted state (extends **No Dead Ends & The Single Door**).
- **Decide with evidence, not opinion:** design from real human needs and data; test and iterate.

## Feedback Loop — A Door to the Makers

Every operator-facing surface offers a clear, accessible way to reach the team — to report something broken, suggest a change, or propose an idea.
- **Always reachable, understandable:** a discoverable, labelled, keyboard-accessible affordance — not buried.
- **Context comes for free:** sending feedback auto-attaches the **current screen** and app version/state — an issue most likely arose where the person just was.
- **No assembled trail (anti-surveillance):** the system does **not** build or attach a behavioural/navigation trail. Context stays the current screen and version (above) plus whatever the person **chooses** to describe or attach; the path is reconstructed from what the human says, not from what the system watched.
- **Invited, never covert:** this is reporting the person *chose* — never always-on surveillance of everyone.

## AI-Drafted Content Is Marked as a Draft

When AI output is a proposed action awaiting approval (a draft email, a generated change), mark it visibly as such (e.g., "proposed · sends only on your approval") rather than presenting it as already done. Confirm the operator's action, instantly, once they actually take it.

## Text & Copy — Source of Truth (External)

Language, tone, and copy rules are **not duplicated** here (single source of truth).
The text canon is **`WRITING.md`** (writing style & tone, lexicon).
