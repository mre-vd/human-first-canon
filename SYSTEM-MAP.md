# SYSTEM-MAP.md — The Living Map (Project as a Human Body)

A project is navigated as a living tree, not as flat code. The map is the
primary interface: orient at the top in business language, descend to code only
at the point that must change. Grounded in how the **human body** organizes —
and kept honest the way the body keeps itself honest. We build systems for
people, so we model them on the human body, not on biology in general.

The "tree" is the **shape** of the navigation; the biology underneath is human
anatomy. Where the model needs a surface that meets the world, that surface is
the body's own — skin, senses, the linings where exchange happens — not a
plant's leaf.

## The Model
- **Containment tree (the body):** Body (product) → Systems → Organs (modules)
  → Tissues (components) → Surfaces (UI / endpoints / jobs — skin and senses,
  where the body meets the world) → DNA (the code you actually edit).
- **Cross-cutting systems (graphs that ignore the hierarchy):** nervous
  (events), circulatory (data/state), endocrine (config/flags), and the immune
  system below. A feature is a node in the tree AND a set of touches by these
  systems.
- **Anchors are many-to-many:** a node points to its code (`file:symbol`, route,
  event); one node may have many anchors and one file may serve many nodes.
  Never force a clean 1:1 tree.

## Anatomical Classification (Which Organ Is a Feature?)

The principle: an organ is defined by **function**, never by name or
resemblance. A component's organ is what it *does* in the system, read from
objective code signals — not a metaphor ("billing = heart because money flows").
This is the Law of the Name applied to structure.

### The organ roles (function → code signal)

| Organ | Function | Code signal |
|---|---|---|
| Brain / nervous | decision, orchestration | high fan-out, business branching, coordinates others |
| Spine / nerves | carries signals | events / queues, no business logic of its own |
| Heart / circulatory | pumps the lifeblood = data | DB / repositories / state store; nearly everything depends on it |
| Lungs | exchange with the outside | external integrations, third-party API / SDK |
| Digestive | intake → transform | parsers / ETL / upload processing |
| Skin / senses | meets the world | UI / public endpoints (the surfaces) |
| Immune | defense, integrity | auth / validation / guards / tests / rate-limit |
| Skeleton | structural support | shared types / contracts: depended on by many, depends on little |

Start with these roles (Law of the Smallest Mechanism); add a role only when a
real component fits none.

### How Claude classifies
1. Collect signals per component from the dependency graph: fan-in/out, IO kind,
   whether it makes decisions, whether it rejects requests, whether it is
   user-facing, whether it is scheduled, whether it owns data.
2. Match signals to a role → propose the organ **with its evidence and a
   confidence** (e.g., "Immune: middleware that rejects unauthorized requests,
   depends on auth, returns 403").
3. Ambiguous, or fits none → surface to the operator (Proposer-Approver); never
   guess silently.
4. One **primary organ** (containment) plus membership in the cross-cutting
   systems — a cell belongs to an organ yet is served by nerves, blood, and
   immunity.
5. Record the **why** (the evidence), so the classification is re-derivable when
   the code changes — not an opinion.

### The diagnostic
A component that cannot be cleanly classified — brain and heart and lungs at
once — is an architecture smell: it violates *Modular Sovereignty* and is a
candidate for splitting. The anatomy reveals where the body is malformed; the
map is a diagnostic, not a decoration.

## The Artifact

Each project carries a `.map/` folder at its root:
- `feature-tree.yaml` — the map data (the single source the view renders from).
- `index.html` — the local viewer (see The View); opens directly, no server.
- `validate-map.mjs` — the immune validator (see The Immune System).

**Node schema** (every node):
- `id` — stable slug.
- `business` — one-line human description, in domain language.
- `organ` — one role from the taxonomy above, or `mixed` (which is a smell).
- `evidence` — why this organ (the signals that classified it).
- `status` — `active` | `planned` | `deprecated` | `dead`.
- `systems` — cross-cutting touches: any of `nervous` (events), `circulatory` (data), `endocrine` (config), `immune` (defense).
- `flow` — optional Process Flow (`GEMINI.md`).
- `children` — sub-nodes.
- `anchors` — code anchors (`file:symbol`, route, event), **only at surfaces**.

**Stopping rule (granularity).** A node earns its place only by carrying
business meaning. Nodes stop at surfaces; below a surface, implementation lives
as `anchors`, not as more nodes — do not node-ify every function (Law of the
Smallest Mechanism). Status `dead` marks tissue reachable from no nerve ending —
flagged to fall away (backward immunity).

## The View (for humans)

We build for people, so the rendered map must be navigable at a glance, not just
machine-readable. `index.html` MUST provide:
- **Tree view** — the body hierarchy, each node colored by its organ; cross-cutting systems shown as colored edges/badges.
- **Organs view** — a grouped list, organ → its features (the direct answer to "which feature is which organ").
- **Legend** — organ → its color and one-line function; clicking an organ filters to its features.
- **Search & filter** — jump to a feature by name; filter by organ or by cross-cutting system.

The viewer obeys `DESIGN.md`: no emojis (color and text, not icons-as-meaning),
decluttering (detail on demand), and No Dead Ends & The Single Door (back always
works). The map is a tool a human reaches for, not a diagram they decode.

## The Immune System (mandatory)
Any living body needs error-correction or it rots. The immune layer works in
**both** directions:
- **Forward (map → code):** a validator MUST fail when a node's anchor no longer
  resolves to real code — a node that lies is drift, caught automatically (like
  DNA repair and apoptosis).
- **Backward (code → map):** code reachable from no nerve ending (no route, job,
  event, export, or live node) is dead tissue — flagged to fall away. What is
  connected lives; what is not, dies. This is the *Law of the Smallest
  Mechanism* enforced by anatomy.

## Bootstrapping an Existing Body

To build the map for a codebase that already exists:
1. **Find the nerve endings** — enumerate entry points: routes, jobs, event handlers, exported APIs, UI pages.
2. **Walk the graph** — from each entry point, follow the dependency graph; what is reachable is alive.
3. **Cluster into organs** — group reachable code by cohesion (what changes together, what depends on what) into candidate organs.
4. **Name in business language** — give each cluster a domain name a human actually uses.
5. **Classify** — assign each its organ by the Anatomical Classification taxonomy, with evidence.
6. **Surface the dead** — anything reachable from no entry point is dead tissue; list it for removal, do not map it as alive.

Proceed top-down: the whole body at the top levels first (reviewable), then
descend organ by organ to surfaces and anchors.

## How Claude uses it
1. Read the map first; locate the node by business meaning.
2. Descend only into that node's anchors — not the whole codebase.
3. Edit at the locus; update the node; re-validate.
4. Any feature change updates the tree in the same PR (Completeness of
   Execution, `CLAUDE.md`).

## What it is not
Not blind imitation of nature: we keep intentional design, global refactoring,
and the Law of the Smallest Mechanism — no junk DNA, no redundancy. The operator
views the rendered tree; the depth is for the system to maintain.
