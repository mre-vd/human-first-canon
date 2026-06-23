# DESIGN.md — UI/UX Design Standards

This document is the single source of truth for UI/UX design: visual layout, component composition, and design execution. Design is a sovereign domain — a distinct discipline, not a subset of code — kept separate from the engineering canon (`CLAUDE.md`) and the strategy/ethics canon (`GEMINI.md`). Every change to frontends must align with these criteria.

## Claude Design Guardrails (діють на всіх поверхнях)

### 1. The Proposer-Approver Model (Пропонує — Оператор вирішує)
The design-process face of **The Law of the Name** and **Human Authority** (`GEMINI.md`): Claude names options; the operator decides.
- **Role:** Claude is the creative force that proposes design ideas, layouts, and implementations.
- **Authority:** The human operator is the "Approver" who holds final veto power and approval authority.
- **Action:** Present design choices clearly (e.g., Option A vs. Option B) and wait for validation before committing to complex, high-entropy design changes.

### 2. Aesthetic Frame (No Emojis)
- **Standard:** Emojis lie outside the professional, sleek, and premium frame of the system. Their use introduces visual noise and deviates from the established brand voice.
- **Consequence:** Using emojis in UI components, buttons, or user-facing text devalues the interface clarity. Styling must be achieved through typography, spacing, and color.

### 3. Verification Checklists
Before submitting or finalizing any UI/UX change, verify:
- [ ] **No Dead Ends:** Does every interactive element (button, link, trigger) lead to a logical, terminal outcome or state change?
- [ ] **Component Recursion:** Are we reusing existing design patterns instead of introducing a new ad-hoc style?
- [ ] **Least Emojis:** Did we check for and remove any accidental emojis?

### 4. Fundamental Counterweight: Smallest Mechanism (Anti-over-engineering)
The UI/UX manifestation of **The Law of the Smallest Mechanism** (`GEMINI.md`).
- **Principle:** Among solutions that equally preserve the user's authorship and control, the one with the **fewest mechanics** wins. Empowering the user does not equal adding more buttons; sometimes the greatest respect is removing a step.
- **Over-engineering Test (Run before adding any control/screen):**
    1. **New need or duplicate path?** If it's a "second button" for an existing need — do not add.
    2. **One mechanism — one job.** If a toggle does two things (e.g., "Focus" = silence + UI rebuild) — split or discard one.
    3. **Attention Budget.** "More control" is insufficient; the mechanism must return more attention than it consumes.
    4. **Mental Model Limit.** No more than two new mental models per screen/ticket. If more — narrow the ticket.
    5. **No UI for the Unbuilt.** Future feature previews or disabled banners belong in the backlog, not on the working screen.
- **Duty to Speak Aloud:** When proposing additions, explicitly identify candidates for over-engineering and present the smallest version first.
- **Post-Task Audit:** Every task ends with the question: "What can be removed, combined, or simplified?"

### 5. No Dead Ends & The Single Door (Без глухих кутів; Одні двері)
The engineering manifestation of **Logical Navigation Outcomes** (`GEMINI.md`). This is the single home for the dead-end / exit rule; other surfaces point here rather than restating it.
- **No Dead Ends:** Every interactive element (button, link, trigger) resolves to a logical outcome — a state change, confirmation, or next step. Never implement a path that leads nowhere or has no functional outcome.
- **The Single Door:** A screen is entered through one door and left through the same door. There is exactly one "back / return / up / exit" affordance on any given screen, and it returns the user to the context they came from. One way in, one way out.
- **Rules:** No more than one return element per screen. The exit mirrors the entry. Only one may generically say "Back"; others must name their explicit destination. Every render branch provides a back affordance.

### 6. The Mirror of Bindings (Дзеркало Прив'язок)
The engineering manifestation of **The Mirror of Bindings** (`GEMINI.md`): the identity of a component or function must reflect its tier of existence. Applied to code naming:
- **Universal Tier (Laws/Patterns):** Zero-bound. No structural hooks like "Core" or "Central". Focus on the *transformation*.
- **Applied Tier (Tools/Sectors):** Explicitly bound. Must name the context (e.g., "MedicalRecord", "GitSync").

---

## Core Design Principles

### Decluttering (Interface)
The principle of intentionally removing noise to improve clarity and focus. Every UI element must justify its existence.
- **Interface Decluttering:** Hide complex actions behind "Expert" toggles or progressive disclosure. The primary view must show only what is essential for the current task.
- **Cognitive Load:** Minimize the number of things a user must hold in their head to navigate the interface.

### Conceptual Consistency & Recursive Familiarity
Interfaces must be architected so that the user's mental model scales effortlessly across the entire system.
- **Component Recursion:** Reuse interaction patterns (e.g., how a "Workbench" or "Sidebar" opens) identically across all modules.
- **Predictable Affordance:** Buttons, links, and status indicators must behave exactly the same way on every screen.
- **Spatial Logic:** If "Primary Actions" are at the bottom-right on Screen 1, they must be there on every subsequent screen.
- **The "Already Known" Test:** Before adding a new UI pattern, ask: "Can I solve this using a pattern the user already knows from other parts of the system?"
- **Logical Outcomes:** See **No Dead Ends & The Single Door** above — every interaction resolves to a clear state change, confirmation, or next step, matching the design specification.

## Interaction & Onboarding Standards

*Contributed externally — distilled from client-communication guidelines and generalized for this canon.*

How a product asks, confirms, and recovers decides whether the user trusts it. These are applied rules for forms, onboarding, and transactional flows.

- **Minimum fields.** Ask only for what the action genuinely needs; everything non-essential is optional. Every extra field is friction and a drop-off point.
- **No registration without value.** Never force account creation that returns nothing to the user. Registration is justified only when it gives concrete value (history, online management, faster repeat use); otherwise let the user complete the task without it. Registration for its own sake is churn.
- **Consent before contact.** Data given for a functional purpose (e.g., a reminder) is not consent for marketing. No promotional messaging without explicit opt-in.
- **Errors speak plainly.** On failure, say what happened and what to do next in plain language — never error codes or technical jargon — and always offer a concrete next step. (The applied form of *No Dead Ends* and of calling things by their names — `GEMINI.md`.)
- **Address people by name.** Personalize transactional copy; never "Dear user".
- **Immediate confirmation.** The instant an action succeeds, confirm it in the same beat — never leave the user guessing whether it was accepted. (A face of **No Dead Ends & The Single Door**.)
- **Exits stay ungated.** Reversal actions (cancel, delete, unsubscribe) are one step — no forms, no mandatory "reason". (The design face of *Friction is the Mirror, never the Gate* — `GEMINI.md`.)
- **Restraint over nagging.** At most one re-engagement nudge; silence if unanswered. Repeated prompting is noise that costs trust. (The interaction face of *Operational Rest / Cognitive Silence*.)

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
- **Visibility of system status:** always show what's happening — loading, progress, saved, offline, error. The user never guesses. (Pairs with the three async states, `CLAUDE.md`.)
- **Match real-world conventions:** use metaphors, ordering, and terms the user already knows; mirror how the task works outside the screen, not the system's internal model.
- **Prevent errors, don't just report them:** good defaults and constraints first; for consequential or destructive actions add a safety step — **undo**, or a confirmation only when the action is truly irreversible.
- **Reversibility & control:** prefer reversible actions and undo over hard confirmations; always offer a clear way out of an unwanted state (extends **No Dead Ends & The Single Door**).
- **Decide with evidence, not opinion:** design from real user needs and data; test and iterate. Objective validation over the illusion of certainty.

## Feedback Loop — A Door to the Makers

Every user-facing surface offers a clear, accessible way to reach the team — to report something broken, suggest a change, or propose an idea. The user's voice is how the system improves (the mechanism behind **Decide with evidence, not opinion**, and the design face of *Frictionless with the Machine, Generative with People* — `GEMINI.md`).
- **Always reachable, understandable:** a discoverable, labelled, keyboard-accessible affordance — not buried (a way out to a human is part of **No Dead Ends & The Single Door**).
- **Context comes for free:** sending feedback auto-attaches the **current screen** and app version/state — an issue most likely arose where the user just was.
- **Richer context, with consent:** the recent in-app navigation trail may be attached so the team sees the path — but **transparently** (the user sees and confirms what is sent), **minimised**, and **opt-in**. Tooling is the project's choice.
- **Invited, never covert:** this is reporting the user *chose* — never always-on surveillance of everyone (*Substance-Check* and *Consent before contact*, `GEMINI.md`). We serve by listening when invited, not by watching.

## Текст і копірайт — джерело правди (зовнішнє)

Правила мови, тону й копірайту тут **не дублюються** (single source of truth).
Канон — глобальний `GEMINI.md` у корінні репозиторію правил, розділи **«Writing Style & Tone»** і **«Logical Navigation Outcomes»** (там і розгорнуте правило «Design Leads / Result is a Spectrum / No Silent Dead Ends»).

> Перед написанням будь-якого тексту/копірайту в продукті — **прочитай той
> `GEMINI.md`** (який копіюється локально в корінь вашого проєкту як `GEMINI.md`).
> Найкоротша локальна витримка для швидкої звірки — `README.md › CONTENT
> FUNDAMENTALS` (якщо передбачено проєктом).
