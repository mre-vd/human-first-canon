# SYSTEM-MAP.md — The Living Map (Project as an Organism)

A project is navigated as a living tree, not as flat code. The map is the
primary interface: orient at the top in business language, descend to code only
at the leaf that must change. Grounded in how biology organizes — and kept
honest the way biology keeps itself honest.

It deliberately borrows from **both** the animal body (organs, body systems,
immune defense) and the plant tree (trunk, branches, leaves as the surface that
meets the world). The blend is a tool for navigation, not a claim of one clean
biology.

## The Model
- **Containment tree (the body):** Product → Systems → Organs (modules) →
  Components (tissues) → Leaves (UI / endpoints / jobs — where the system meets
  the world) → Code (the locus you actually edit).
- **Cross-cutting systems (graphs that ignore the hierarchy):** events
  (nervous), data/state (vascular), config/flags (endocrine), and the immune
  system below. A feature is a node in the tree AND a set of touches by these
  systems.
- **Anchors are many-to-many:** a node points to its code (`file:symbol`, route,
  event); one node may have many anchors and one file may serve many nodes.
  Never force a clean 1:1 tree.

## The Artifact
Each project carries `feature-tree.yaml`: every node has a business
description, status, optional flow (the Process Flow template, `GEMINI.md`),
children, and — at leaves — code anchors. It is the single source the visual
diagram is rendered from.

## The Immune Layer (mandatory)
Any complex living system needs error-correction or it rots. A validator MUST
fail when a node's anchor no longer resolves to real code. The map cannot lie;
drift is caught automatically, like DNA repair and apoptosis.

## How Claude uses it
1. Read the map first; locate the node by business meaning.
2. Descend only into that node's anchors — not the whole codebase.
3. Edit at the locus; update the node; re-validate.
4. Any feature change updates the tree in the same PR (Completeness of
   Execution, `CLAUDE.md`).

## What it is not
Not blind imitation of nature: we keep intentional design, global refactoring,
and the Law of the Smallest Mechanism — no biological junk, no redundancy. The
operator views the rendered tree; the depth is for the system to maintain.
