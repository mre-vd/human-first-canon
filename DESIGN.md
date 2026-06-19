# DESIGN.md — UI/UX Design Standards

This document is the single source of truth for UI/UX design: visual layout, component composition, and design execution. Design is a sovereign domain — a distinct discipline, not a subset of code — kept separate from the engineering canon (`CLAUDE.md`) and the strategy/ethics canon (`GEMINI.md`). Every change to frontends must align with these criteria.

## Claude Design Guardrails (правило 4 — діє на всіх поверхнях)

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

## Текст і копірайт — джерело правди (зовнішнє)

Правила мови, тону й копірайту тут **не дублюються** (single source of truth).
Канон — глобальний `GEMINI.md` у корінні репозиторію правил, розділи **«Writing Style & Tone»** і **«Logical Navigation Outcomes»** (там і розгорнуте правило «Design Leads / Result is a Spectrum / No Silent Dead Ends»).

> Перед написанням будь-якого тексту/копірайту в продукті — **прочитай той
> `GEMINI.md`** (який копіюється локально в корінь вашого проєкту як `GEMINI.md`).
> Найкоротша локальна витримка для швидкої звірки — `README.md › CONTENT
> FUNDAMENTALS` (якщо передбачено проєктом).
