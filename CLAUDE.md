# CLAUDE.md — Unified Engineering Standards

This document acts as the single source of truth for development and engineering standards. All agents and developers must strictly adhere to these rules.

> **Whenever the task touches words** — copy, microcopy, UI strings, button and error text, naming, content, or a text/copy audit — apply **`WRITING.md`**. Read those rules first: text is governed there, not here.

---

### Canon Routing — Read Only What the Task Touches

This file is the floor — it governs all substantive work. Every **other** canon file is loaded **on demand**: pull only the domain file(s) the task actually touches, and leave the rest unread.

| When the task touches… | Read |
| --- | --- |
| Words — copy, microcopy, UI text, naming, content | `WRITING.md` |
| UI/UX, layout, design execution | `DESIGN.md` |
| Coding in a specific stack | `STACKS.md` (that stack's section) |
| Database, schema, queries, data modeling | `DATABASE.md` |
| CI/CD, Docker, Kubernetes, cloud, infrastructure | `DEVOPS.md` |
| Tests, QA, test strategy | `TESTING.md` |
| Auth, secrets, input validation, crypto, LLM-security | `SECURITY.md` |
| Requirements, user stories, scope, acceptance | `ANALYSIS.md` |
| Sprints, backlog, ceremonies, delivery flow | `AGILE.md` |
| Cross-cutting rules (naming, resource lifecycle, threat modeling, etc.) | `PRINCIPLES.md` |

Touches several domains → read several. Touches none beyond the core → read none. Security stays active on every change regardless (`SECURITY.md`).

---

## 1. UI/UX Design Standards

UI/UX design is a sovereign domain with its own canon: **`DESIGN.md`** — kept separate because design is a distinct discipline, not a subset of code. Before any frontend, layout, or design-execution work, read `DESIGN.md`. Frontend *code* standards live in `STACKS.md`.

---

## 2. Standards of Structural Integrity

### System Integrity Principle

A system is integral only when every part of it (code, data, documentation, tests) is in a state of mutual consistency.

1.  **Completeness of Execution:** A task is not finished if even one aspect (implementation, tests, i18n, migrations, flow descriptions, or versioning) is missing or not updated.
2.  **Contractual Stability:** Changes in one module must ensure the stability of the entire system.
3.  **Alignment with Requirements:** Code is a derivative of business logic. If the implementation deviates from the requirements, the system loses integrity.
4.  **Focused Execution:** No change may leave the system in a hanging intermediate state. A process, once begun, runs to its next **logical checkpoint** — a consistent state it can be fixed at; while it runs, incidental noise and unrelated signals do not interrupt it. The only sanctioned interruption is the operator's explicit signal, in one of two forms: **adjust** (pause at the current checkpoint, correct, continue) or, if it went wrong at the root, **rewind** (roll back to the last good checkpoint and resume from there). Either way, intervention resolves to a checkpoint, never a half-state.
5.  **Pull Request Versioning & Merging:** Any code change introduced via a Pull Request (PR) must bump the version of the project or module where the change occurred. Before merging into the `main` branch, the proposed version must be validated; if that version has already been merged or published in parallel, the version must be bumped to a higher, unique value. Bumping must be finalized before the merge.
6.  **Post-PR Summary:** Upon the completion or merge of a PR, a concise summary of what was accomplished and the specific version containing the changes must be explicitly displayed or documented.
7.  **Rule Synchronization Integrity:** When rules are updated in the source repository (the canon) and synchronized to target projects, the updated files must be committed and pushed to those projects to keep all agents and developers in alignment. Every synced file carries a **provenance backlink** to that source — added automatically on sync — so any copy traces to its origin. Edits belong at the source, never in a derived copy (the next sync overwrites it).

### Modular Sovereignty: The Body of Organs

The system must be built as a collection of autonomous modules.

- **Functional Encapsulation:** Each module owns its domain (logic, state, and UI).
- **Surgical Isolation:** Changes must be localized. A change in the "Billing" module must never require a change in the "Design" module.
- **Contractual Communication:** Modules interact only through predefined public interfaces (APIs/Events). Internal implementation is private to the module.
- **Boy Scout Rule for Modules:** If a module's boundaries become blurred, refactor to restore isolation.

### Design as the Single Source of Truth (SoT)

The design is the absolute single source of truth for all UI, layouts, and visual interactions. Code must be a faithful realization of the design.

### Operational Rest & Focus

- **Trigger over Polling:** Prefer event-driven triggers initiated by user demand.
- **Resource Lifecycle:** Explicitly release connections and background processes upon completion.
- **Minimal Output:** Default to silence. No noise without required action.
- **Discuss first, execute on command:** Wait for the explicit go-signal before changing the manifestation.
- **Work quietly:** The chat is for decisions and outcomes, not narration.
- **Speak technically:** Precise identifiers over vague jargon.

### Silent Within Scope — No Trailing Offers

The chat ends when the task does.

- **No solicited extra work.** At a clean checkpoint, **stop**. Never close with "want me to also…", "should I also…", or any pitch for further scope-adjacent work. The next move is the operator's to raise, not the system's to solicit.
- **In-scope loose ends: fix them silently.** Cleanup inside the task's own scope is done quietly as part of finishing — no announcement, no question.
- **Out-of-scope findings: don't act, don't pitch.** Stay in scope; do not raise it in chat. A genuine, high-confidence risk worth not losing goes to the background-task chip — silently, never as a trailing chat question.
- **Naming a real risk is still required.** A true consequence or risk *in the work just done* is named as a plain fact. The ban is on soliciting more work, not on reporting what was done.

### Session Start: Pull First

`git pull` is the first action of every session — sync the working tree (project + canon) before any work; a stale tree reasons on superseded rules and risks merge conflicts on the synced files.

### Finish to Zero

A task is finished only when it is in a closed state, with all verification and side-effects completed. Don't leave decisions parked without flagging them explicitly.

### Reporting Consequences

If a technical decision or request introduces systemic risk, debt, or a broken invariant, report the observable consequences as technical facts and leave the decision with the operator. A system failure is named as the system's, never attributed to the operator as their own error.

### Operational Guards

- **Dependency Integrity:** Changing external dependencies without explicit intent introduces unpredictable systemic risks, version conflicts, and potential build failures.
- **Surgical Minimalism:** Deviating from the assigned task's scope increases entropy and introduces unsolicited complexity. Changes are strictly limited to what is required for the specific task.

### Deterministic, Rule-Based Behavior

- **Deterministic and rule-based:** product behavior is explicit rules, not model "judgment." No inference, hidden synthesis, or self-made decision in a product unless that capability is the operator's stated, deliberate intent — never smuggled in as a default.
- **No covert observation:** products do not track, profile, or follow users — no behavioral trails, no location surveillance. Telemetry stays the minimum the task needs (*Minimize Retained Metadata*, `SECURITY.md`).
- **Self-deciding is a defect:** any place a product concludes, recommends, or decides on its own — when that was not the explicit intent — is a bug to remove.

### Architecture & Design Principles

Language-agnostic foundations beneath the per-stack rules below. The goal is a structure a human can hold in their head and change without fear.

- **SOLID:** single-responsibility (one reason to change per unit); open-closed (extend without editing the stable core); Liskov (a subtype honors its base's contract); interface-segregation (small, focused interfaces); dependency-inversion (depend on abstractions, not concretions).
- **High cohesion, low coupling:** keep what changes together in one module; minimize what crosses boundaries. Shared mutable state across boundaries is coupling in disguise.
- **Boundaries (Clean / Hexagonal):** keep domain logic free of framework, transport, and persistence detail — those reach the core only through ports/adapters. Dependencies point inward, toward the domain; the domain depends on nothing.
- **Domain-Driven Design, where it earns its weight:** a shared ubiquitous language between code and stakeholders; bounded contexts with explicit contracts at the seams; aggregates that guard their own invariants. Apply DDD to genuinely complex domains, not to CRUD.
- **Composition over inheritance:** assemble behavior from small parts rather than deep class hierarchies.
- **Explicit contracts:** a module *is* its public interface — design it first, keep it small and stable, version it, and never leak internal or DB shapes across it (*DTO Projection*, `SECURITY.md`). Errors are part of the contract.
- **Stateless and idempotent at the edges:** prefer stateless handlers and idempotent operations — they retry, scale, and reason cleanly.
- **The smallest architecture that holds the load:** patterns are tools, not trophies. No microservices, event-sourcing, or CQRS without a named force that demands them; the right architecture is the simplest one that carries the actual load.

---

## 3. Language & Framework Standards

Language- and framework-specific coding standards are a sovereign domain with their own canon: **`STACKS.md`** (Go, JVM, Node.js/NestJS, Python/FastAPI, Rust, Spring Boot/Java, Next.js, React & Web, Svelte, Vue, Flutter). Read the section for the stack you are working in; the universal engineering principles above always apply.

---

## 4. Database Standards

Data is a sovereign domain with its own canon: **`DATABASE.md`** (SQL & NoSQL — schema control, query performance, modeling, partitioning, backup). Read it for any database or data-modeling work.

---

## 5. DevOps, CI/CD & Cloud Infrastructure

Platform and infrastructure engineering is a sovereign domain with its own canon: **`DEVOPS.md`** (IaC, GitOps, CI/CD, Docker, Kubernetes, observability, and cloud/AWS conventions). Read it for any pipeline, container, or infrastructure work.

---

## 6. QA & Testing

Quality engineering is a sovereign domain with its own canon: **`TESTING.md`** (testing pyramid; unit, integration, and E2E strategy; and Playwright automation standards). Read it for any test-strategy or test-authoring work.

---

## 7. Security

Security is a sovereign domain with its own canon: **`SECURITY.md`** (safe-by-default mindset, always/never rules, and the agnostic audit checklist) — **ACTIVE**: a non-negotiable property of every change. Read it for any auth, secrets, input-validation, or LLM-security work.

---

## 8. Business Analysis

Business analysis is a sovereign domain with its own canon: **`ANALYSIS.md`** — turning a need into a clear, buildable, testable shape (requirements, user stories, acceptance criteria, prioritization, stakeholders). Read it for any requirements, scope, or analysis work.

---

## 9. Agile Delivery & Scrum

Agile delivery is a sovereign domain with its own canon: **`AGILE.md`** — the flow by which analyzed work becomes shipped value in small, inspected steps (Scrum/Kanban roles, events, artifacts, Definition of Done, estimation, sustainable pace). Read it for any sprint, backlog, or process-flow work.
