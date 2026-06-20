# SYSTEM-MAP.md — The System Map

A project is navigated by its map, not by flat code. The map is the primary
interface: orient at the top in business language, descend to code only at the
boundary that must change. Inspired by how natural systems organize — hierarchy,
cross-cutting flows, reachability, and self-correction — but expressed in
engineering terms.

The map is two structures at once:
- a **containment tree** — where things live;
- a **dependency graph** — how things relate and reach each other.

## The Levels (containment tree)

System (product) → Domains → Modules → Components → Boundaries (entry points /
ports — UI, endpoints, jobs: where the system meets the outside) → Code (the
locus you actually edit).

## The Cross-cutting Layers (graph; ignore the hierarchy)

- **Eventing** — events / messaging.
- **Data** — persistence and shared state.
- **Config** — configuration and flags.
- **Integrity** — security, validation, and tests (the self-correction layer).

A feature is a node in the tree AND a set of touches by these layers. Anchors
are many-to-many: one node may point to many code locations and one file may
serve many nodes — never force a clean 1:1 tree.

## Role Classification (which role is a component?)

A component's role is defined by **function**, read from objective code signals —
not by name or resemblance (the *Mirror of Bindings* and *Law of the Name*,
`GEMINI.md`). Each role also carries a **blast radius**: how far a change to it
ripples.

| Role | Function | Code signal | Blast radius |
|---|---|---|---|
| Orchestrator | coordinates a flow, holds decision logic | high fan-out, business branching | medium–wide |
| Service | encapsulates one domain capability | called by orchestrators/edges, owns logic | local–medium |
| Store | persistence / shared state | DB, repositories; depended on by many | **wide** |
| Gateway | boundary to an external system | third-party SDK / outbound API | local |
| Pipeline | intake → transform → output | parsers / ETL / upload processing | local |
| Edge | meets the world | UI, public endpoints (entry points) | local |
| Guard | defense & integrity | auth / validation / rate-limit / tests | medium |
| Contracts | shared types, interfaces, kernel | depended on by many, depends on little | **wide** |

Start with these roles (*Law of the Smallest Mechanism*); add one only when a
real component fits none. A component that fits none cleanly — or fits several —
is an architecture smell: it likely breaks *Modular Sovereignty* and is a
candidate for splitting. Surface it to the operator with evidence; never guess.

## The Artifact

Each project carries a `.map/` folder at its root:
- `feature-tree.yaml` — the map data (the single source the view renders from, and Claude's primary interface).
- `index.html` — the local viewer (see The View); opens directly, no server.
- `validate-map.mjs` — the integrity check (see below); also emits `index.json`.
- `index.json` — generated **reverse index** (`code path → node ids`), so a file in hand instantly resolves to the feature(s) it serves.

**Node schema** (kept lean — only what speeds real work):
- `id` — stable semantic slug `domain.module.feature` (survives file moves).
- `business` — one-line description, in domain language.
- `role` — one role from the table above (or `mixed` = a smell).
- `risk` — blast radius (`local` | `medium` | `wide`), from the role.
- `evidence` — why this role (the signals that classified it).
- `status` — `active` | `planned` | `deprecated` | `dead`.
- `systems` — cross-cutting touches: any of `eventing`, `data`, `config`, `integrity`.
- `children` — sub-nodes.
- `anchors` — code, **only at boundaries**: `path:symbol`, `METHOD /route`, `event:name` (machine-resolvable).
- `tests` — test anchors, so the map drives affected-test selection (`TESTING.md`).

**Stopping rule (granularity).** A node earns its place only by carrying business
meaning. Nodes stop at boundaries; below a boundary, implementation lives as
`anchors`, not as more nodes — do not node-ify every function. Keep the map lean:
bloat rots, and a map that is not trusted is worse than none.

## The View (for humans)

We build for people, so the rendered map must be navigable at a glance.
`index.html` MUST provide:
- **Tree view** — the containment hierarchy, each node colored by its role; cross-cutting layers as colored edges/badges.
- **Roles view** — grouped list, role → its components (the direct answer to "what is what").
- **Legend** — role → color and function; clicking a role filters to it.
- **Search & filter** — jump by name; filter by role or by cross-cutting layer.

Obeys `DESIGN.md`: no emojis (color and text), decluttering (detail on demand),
No Dead Ends & The Single Door (back always works).

## Integrity (self-correction, mandatory)

A system that cannot detect its own drift rots. `validate-map.mjs` works in
**both** directions and runs in the pipeline (CI + pre-commit, `DEVOPS.md`):
- **Forward (map → code):** fail when a node's anchor no longer resolves to real code — a node that lies is drift.
- **Backward (code → map):** code reachable from no entry point is dead/unreachable — flag it to remove (`status: dead`). What is connected lives; what is not is removed (*Smallest Mechanism*).

A seed is not dead: code *intended but not yet wired* is `planned`, not `dead` —
do not prune what is deliberately incubating. A green validator is the trust
signal: only a map that passes is one Claude may rely on blind.

## How Claude uses it

1. **Orient first.** After `git pull`, read `.map/feature-tree.yaml` before touching code — it is the entry point to every task.
2. **Locate** the node by business meaning; note its `role` and `risk`.
3. **Descend** only into that node's anchors — not the whole codebase. From a file in hand, use `index.json` for the reverse lookup.
4. **Gauge the blast radius** from `risk` before editing (`wide` → expect ripples; verify dependents).
5. **Run only the node's `tests`** (affected-test selection, `TESTING.md`).
6. **Edit, update the node, re-validate.** Any feature change updates the tree in the same PR (*Completeness of Execution*, `CLAUDE.md`).

## Bootstrapping an existing project

1. **Entry points** — enumerate routes, jobs, event handlers, exported APIs, UI screens.
2. **Walk the graph** from them; what is reachable is live.
3. **Cluster** reachable code by cohesion into candidate modules.
4. **Name** each in business language.
5. **Classify** each by the Role table, with evidence and risk.
6. **Surface the dead** — anything reachable from no entry point; list it, do not map it as live.

Proceed top-down: the whole map at the top levels first (reviewable), then
descend module by module to boundaries and anchors.

## What it is not

Not blind imitation of nature: we keep intentional design, global refactoring,
and the *Law of the Smallest Mechanism* — no dead weight, no redundancy beyond
what protects. Enough to serve, not perfect.
