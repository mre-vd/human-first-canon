# AI-Process-Architecture: Modular Engineering Rules

**A structured framework for organizing work and managing cognitive load using AI agents.**

## 🧩 Core Logic: Gemini & Claude

Efficiency is achieved by separating strategy from implementation:

- **Gemini (Strategy):** Analysis, architectural mapping, and backlog planning.
- **Claude (Execution):** Coding, refactoring, and rigorous validation.

## 🏗️ Rule Modules

The framework is organized into modular specifications in the `modules/` directory:

### Core & Engineering
- **`core`**: Meta-rules, communication, and cognitive discipline.
- **`engineering/general`**: Stack-agnostic engineering standards.
- **`engineering/security`**: Security hardening mandates.
- **`engineering/devops`**: CI/CD, Docker, and Kubernetes patterns.
- **`engineering/cloud`**: AWS and general cloud principles.
- **`engineering/database`**: SQL and NoSQL best practices.
- **`engineering/qa`**: Testing philosophy and automation standards.

### Backend Stacks
- **`backend/jvm`**: JVM, Spring Boot, and Kotlin conventions.
- **`backend/nestjs`**: Node.js and NestJS standards.
- **`backend/go`**: Golang concurrency and project layout.
- **`backend/python`**: Python and FastAPI best practices.
- **`backend/rust`**: Rust safety and performance standards.

### Frontend & Mobile
- **`frontend/react`**: React, TypeScript, and Web standards.
- **`frontend/vue`**: Vue.js and SFC patterns.
- **`frontend/svelte`**: Svelte and SvelteKit conventions.
- **`mobile/flutter`**: Flutter and cross-platform mobile standards.

## 🔄 Rule Synchronization

Distribute these rules across your projects using the built-in engine.

### Setup & Run

1. Copy `sync-config.example.json` to `sync-config.json`.
2. Define projects and modules in `sync-config.json`.
3. Run the sync:
   - **Linux/macOS:** `./bin/sync.sh`
   - **Windows:** `bin\sync.bat`

_Note: The script merges selected modules into `GEMINI.md` and `CLAUDE.md` in the target project root._

## 🛠️ Adoption Flow

1. **Initialize:** Clone this repo as your standard foundation.
2. **Configure:** Set local paths in `sync-config.json`.
3. **Sync:** Run the sync tool to update target projects.
4. **Enforce:** Add the generated rules to your AI agent's context.
