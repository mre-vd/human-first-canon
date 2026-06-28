# Engineering Standards

A set of technical engineering standards — coding, architecture, data, infrastructure, testing, and security — kept as Markdown files and synced into projects so developers and AI assistants build to one consistent bar.

## Files

**Always active:**
* [CLAUDE.md](CLAUDE.md) — the engineering floor: system integrity, modular sovereignty, architecture (SOLID, boundaries, contracts).

**Read on demand:**
* [STACKS.md](STACKS.md) — per-language/framework coding standards.
* [DATABASE.md](DATABASE.md) — SQL & NoSQL: schema, queries, modeling.
* [DEVOPS.md](DEVOPS.md) — CI/CD, Docker, Kubernetes, cloud.
* [TESTING.md](TESTING.md) — test strategy and automation.
* [SECURITY.md](SECURITY.md) — safe-by-default rules and the audit checklist (active on every change).

## Sync to your projects

1. Edit the rules **here only**, in this repository.
2. Add your projects to `sync-config.json` (see `sync-config.example.json`).
3. Sync to projects: `node scripts/sync.js`
4. Validate: `node scripts/validate.js`

Sync manually, and only when something changed.
