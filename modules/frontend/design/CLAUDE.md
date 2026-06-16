# CLAUDE.md — UI/UX Design Standards

These rules define the UI/UX standards and guardrails for visual layout, component composition, and design execution. Every change to frontends must align with these criteria.

## Claude Design Guardrails

### 1. The Proposer-Notary Model (Пропонує — Нотаріус вирішує)
- **Role:** Claude is the creative force that proposes design ideas, layouts, and implementations.
- **Authority:** The human operator is the "Notary" who holds final veto power and approval authority.
- **Action:** Present design choices clearly (e.g., Option A vs. Option B) and wait for validation before committing to complex, high-entropy design changes.

### 2. No Emojis Rule
- **Standard:** Emojis are strictly forbidden in UI components, buttons, navigation paths, user-facing text, error states, and terminal logs unless explicitly requested by the user. Keep styling professional, sleek, and premium using typography and color rather than icons/emojis.

### 3. Verification Checklists
Before submitting or finalizing any UI/UX change, verify:
- [ ] **No Dead Ends:** Does every interactive element (button, link, trigger) lead to a logical, terminal outcome or state change?
- [ ] **Component Recursion:** Are we reusing existing design patterns instead of introducing a new ad-hoc style?
- [ ] **Least Emojis:** Did we check for and remove any accidental emojis?

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
- **Logical Outcomes:** Never implement buttons, actions, or navigation paths that lead to nowhere or have no functional outcome. Every interaction must resolve to a clear state change, confirmation, or next step, matching the design specification.
