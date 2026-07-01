# PRINCIPLES.md — Cross-Cutting Engineering Rules

Rules that apply across every stack and domain, referenced by the other canon files. Read together with `CLAUDE.md`.

## Session Start: Pull First

Every session begins with `git pull` — sync the working tree before any analysis or change. A stale tree means reasoning on superseded rules.

## Single Source of Truth

Whenever a piece of state is shared across surfaces, exactly **one** location is the source. Hand-editing derived copies creates state divergence that a later sync will overwrite.

## Naming Convention: Generic vs. Explicit

- **Universal/shared mechanisms** (a library, a cross-cutting utility): keep names focused on the transformation performed. Avoid vague structural labels like "Core", "Central", "System", or "Master" — they say nothing about what the thing does.
- **Domain-specific tools** (a service, a component tied to one context): name them explicitly for that context (e.g. `MedicalRecordScanner`, not `DataProcessor`) — an overly abstract name hides responsibility and makes ownership unclear.

## Change Rationale for High-Risk Work

Architectural changes, dependency upgrades, or complex data mutations require the author to state the rationale explicitly before execution — reviewers and future readers need to know *why*, not just *what*.

## Design-Time Threat Modeling: The Adversary Question

For every consequential feature, during design (not only at implementation time), ask:
- Who is the adversary — outsider, another user, an insider, a compromised dependency?
- What could they do — read/alter data they shouldn't, escalate privilege, exhaust resources, bypass a limit, impersonate, exfiltrate?
- What's the blast radius — one record, one tenant, every user, money, irreversible damage?
- Where's the weakest point — the boundary that trusts input it shouldn't, the check that can be skipped, the default that fails open?

Record the answer as a short note attached to the feature. Full method in `SECURITY.md` → Threat Modeling.

## Explainability

AI-driven or automated decisions in a product must be explainable and logged — able to be traced back to the rule or data that produced them.

## Resource Lifecycle & Event-Driven Design

- Prefer event-driven triggers over polling; poll only when no push/webhook channel exists, and at the lowest frequency the need tolerates.
- Release connections, memory, and background processes explicitly when a task completes — a task is not done until resources are released.
- Avoid speculative "just-in-case" background processing that has no current trigger.

## Automating Routine Work

Reversible, verifiable, low-stakes, judgment-free work (pure throughput, idempotent sync, routine data movement) can run unattended. It must stay idempotent, reconciled (counts/checksums match), and rollbackable — removing a human from the loop never removes the system's own safeguards. Anything irreversible, sensitive, or requiring judgment keeps a human in the loop. Automate only what's been explicitly requested or scoped — don't preemptively take over a manual process without being asked.

## Loop Prevention / Iteration Limit

To prevent infinite automated retry loops (repeated failed builds, tests, or identical tool calls), enforce a strict limit of 10 consecutive attempts for a single micro-task. If unresolved after 10 iterations, halt execution, report the failure details, and request manual guidance instead of consuming further resources.

## SOLID / Architecture Principles

Referenced from `CLAUDE.md` → Architecture & Design Principles: SOLID, high cohesion/low coupling, hexagonal boundaries, DDD where warranted, composition over inheritance, explicit contracts, stateless/idempotent edges, smallest architecture that holds the load.
