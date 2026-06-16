# Process Architecture: The Source of Divine Intent

**The global source of Ethics, Rules, and Patterns for digital manifestation.**

## 🧩 The Divine Intent: Pattern & Law

This repository represents the **Divine Intent**—the source of pure ethics, engineering laws, and architectural patterns. The rules are divided to target different agents and workflows:

*   **`GEMINI.md` (Strategic Frame & Analysis):**
    *   *Audience:* Read automatically by **Gemini** (acting as Business Analyst and UX Strategist).
    *   *Content:* Contains ethical standards, writing style/tone, cognitive discipline safeguards, mental rules, and product-level Process Flow registers.
*   **`CLAUDE.md` (Surgical Execution & Guardrails):**
    *   *Audience:* Read automatically by **Claude** (both Claude Coding and Claude Design) at the start of every session.
    *   *Content:* Contains strict, high-priority guardrails, stack-specific coding conventions (React, NestJS, Go, etc.), and UI/UX design rules. Keep this file concise to save Claude's attention budget.
*   **`README.md` in Target Projects (Descriptive Specifications):**
    *   *Audience:* Read manually by developers and AI assistants when starting or exploring a project.
    *   *Content:* Contains descriptive design specifications, typography, color palettes, iconography, and directory/file indexes. Avoid putting large palettes in `CLAUDE.md`.

## 🏗️ The Unified Rulebook

The rules are maintained as two unified, cohesive "books" in the root directory:
- **`CLAUDE.md`**: The master compilation of design principles, general engineering discipline, and specific coding standards for frontends, backends, mobile, and operations.
- **`GEMINI.md`**: The master compilation of ethical protocols, writing tone, cognitive safeguards, and analysis guidelines.

## 🛠️ Usage

This repository acts as the **Global Source of Truth**. Rules are managed here and synchronized to target projects.

### 1. Link a New Project
Create `sync-config.json` in the root (see `sync-config.example.json`):
```json
{
  "projects": [
    {
      "name": "your-project",
      "path": "/absolute/path/to/project"
    }
  ]
}
```

### 2. Synchronize
Run the sync script to distribute the rulebooks:
```bash
node scripts/sync.js
```
The script will directly copy `CLAUDE.md` and `GEMINI.md` from this repository's root to the destination directory of each configured project.

### 3. Maintain Integrity
- **Never hand-edit** rule files in target projects.
- **Update the Law** in the root `CLAUDE.md` and `GEMINI.md` of this repository.
- **Sync** to propagate changes across the entire ecosystem.

---
P.S. These rules are just an instrument. Responsibility for the impact of products born from these rules rests entirely with the individual using them.

