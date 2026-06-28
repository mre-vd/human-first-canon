# CLAUDE.md — Engineering Standards

Technical engineering standards for all code in this project. This file is the always-active engineering floor; the per-stack and per-domain specifics live in the files below and are read on demand.

## Routing — Read Only What the Task Touches

Pull only the domain file(s) the task actually touches; leave the rest unread.

| When the task touches… | Read |
| --- | --- |
| Coding in a specific stack | `STACKS.md` (that stack's section) |
| Database, schema, queries, data modeling | `DATABASE.md` |
| CI/CD, Docker, Kubernetes, cloud, infrastructure | `DEVOPS.md` |
| Tests, QA, test strategy | `TESTING.md` |
| Auth, secrets, input validation, crypto | `SECURITY.md` |

Security stays active on every change regardless (`SECURITY.md`).

---

## System Integrity

A system is integral only when every part of it — code, data, documentation, tests — is in a state of mutual consistency.

1. **Completeness of Execution:** A task is not finished if even one aspect (implementation, tests, i18n, migrations, versioning) is missing or not updated.
2. **Contractual Stability:** A change in one module must preserve the stability of the whole system.
3. **Alignment with Intent:** Code is a derivative of the specification. If the implementation deviates from the agreed spec, the system loses integrity.
4. **Focused Execution — No Half-States:** No change may leave the system in a hanging intermediate state. A process runs to its next **logical checkpoint** — a consistent state it can be fixed at. Intervention resolves to a checkpoint (adjust at the current one, or rewind to the last good one), never a half-state.
5. **Pull Request Versioning & Merging:** Any change introduced via a PR must bump the version of the project or module where the change occurred. Before merging into `main`, validate the version; if it already exists in parallel, bump to a higher, unique value. Finalize the bump before the merge.
6. **Post-PR Summary:** On completion or merge, display or document a concise summary of what was done and the specific version containing the changes.
7. **Sync Integrity:** Rules edited in the source repository and synced to target projects must be committed and pushed to those projects. Edits belong at the source, never in a derived copy — the next sync overwrites it.

## Modular Sovereignty

Build the system as a collection of autonomous "organs."

- **Functional Encapsulation:** Each module owns its domain — logic, state, and UI.
- **Surgical Isolation:** Changes stay localized. A change in one module must never require a change in an unrelated one.
- **Contractual Communication:** Modules interact only through predefined public interfaces (APIs/events). Internal implementation is private to the module.
- **Boy Scout Rule:** If a module's boundaries blur, refactor to restore its isolation.

## Session Start: Pull First

`git pull` is the first action of every session — sync the working tree before any work. A stale tree risks merge conflicts and acting on superseded code.

## Operational Guards

- **Dependency Integrity:** Do not change external dependencies without explicit intent — version conflicts, systemic risk, and build failures follow.
- **Surgical Minimalism:** Changes are strictly limited to what the task requires. Scope creep increases entropy and introduces unsolicited complexity.

## Architecture & Design Principles

Language-agnostic foundations beneath the per-stack rules. The goal is a structure a developer can hold in their head and change without fear.

- **SOLID:** single-responsibility (one reason to change per unit); open-closed (extend without editing the stable core); Liskov (a subtype honors its base's contract); interface-segregation (small, focused interfaces); dependency-inversion (depend on abstractions, not concretions).
- **High cohesion, low coupling:** keep what changes together in one module; minimize what crosses boundaries. Shared mutable state across boundaries is coupling in disguise.
- **Boundaries (Clean / Hexagonal):** keep domain logic free of framework, transport, and persistence detail — those reach the core only through ports/adapters. Dependencies point inward, toward the domain; the domain depends on nothing.
- **Domain-Driven Design, where it earns its weight:** a shared ubiquitous language; bounded contexts with explicit contracts at the seams; aggregates that guard their own invariants. Apply to genuinely complex domains, not to CRUD.
- **Composition over inheritance:** assemble behavior from small parts rather than deep class hierarchies.
- **Explicit contracts:** a module *is* its public interface — design it first, keep it small and stable, version it, and never leak internal or DB shapes across it. Errors are part of the contract.
- **Stateless and idempotent at the edges:** prefer stateless handlers and idempotent operations — they retry, scale, and reason cleanly.
- **The smallest architecture that holds the load:** no microservices, event-sourcing, or CQRS without a named force that demands them; the right architecture is the simplest one that carries the actual load.

---

## Language & Framework Standards

Per-stack coding standards live in **`STACKS.md`** (Go, JVM, Node.js/NestJS, Python/FastAPI, Rust, Spring Boot/Java, Next.js, React & Web, Svelte, Vue, Flutter). Read the section for the stack you are working in; the universal principles above always apply.

## Database Standards

Data is a sovereign domain — **`DATABASE.md`** (SQL & NoSQL: schema control, query performance, modeling, partitioning, backup). Read it for any database or data-modeling work.

## DevOps, CI/CD & Cloud

Platform and infrastructure engineering — **`DEVOPS.md`** (IaC, GitOps, CI/CD, Docker, Kubernetes, observability, cloud/AWS). Read it for any pipeline, container, or infrastructure work.

## QA & Testing

Quality engineering — **`TESTING.md`** (testing pyramid; unit, integration, and E2E strategy; Playwright automation). Read it for any test-strategy or test-authoring work.

## Security

Security is a non-negotiable property of every change — **`SECURITY.md`** (safe-by-default rules, always/never lists, and the agnostic audit checklist). Read it for any auth, secrets, input-validation, or crypto work.
