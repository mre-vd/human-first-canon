# AI-Process-Architecture: Modular Engineering Rules

**A structured framework for organizing work and managing cognitive load using AI agents.**

> **This project is for architects. A lack of understanding of how to use the principles described herein creates an imbalance in knowledge. These rules should be used to direct AI only after the individual has mastered them through personal experience. To bypass this process is to disrupt the balance, leading to a state of disequilibrium that the person will inevitably have to rectify.**

## 🧩 Core Logic: Gemini & Claude

Efficiency is achieved by separating strategy from implementation:

- **Gemini (Strategy):** Analysis, architectural mapping, and backlog planning.
- **Claude (Execution):** Coding, refactoring, and rigorous validation.

## 🕊️ Ethical Frame

This repository is dedicated to the creation and development of constructive tools. It is intended for use in projects that foster support, utility, and growth. We operate within a frame of positive impact; use cases intended to cause harm or systemic instability are explicitly excluded from the permissions granted by this license. Violating this principle inflicts harm within the shared mental environment, producing a negative impact on the world.

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

Distribute these rules across your projects using the automated engine.

### Quick Start

1. **Discover**: Automatically identify which modules your project needs:
   - **Linux/macOS**: `./bin/discover.sh /path/to/your/project`
   - **Windows**: `bin\discover.bat C:\path\to\your\project`
   - _This will intelligently scan your project and update `sync-config.json`._

2. **Automate**: Run the setup script to enable background synchronization via `cron`:
   - **Linux/macOS**: `./bin/setup.sh --install-cron`
   - **Windows**: `bin\setup.bat` (manually add to Task Scheduler)
3. **Manual Sync**: If you prefer to update rules manually:
   - **Linux/macOS**: `./bin/manual-sync.sh`
   - **Windows**: `bin\manual-sync.bat`

### Advanced Control

The synchronization agent (`setup.sh`) supports several flags:
- `--no-self-update`: Skip automatic `git pull` of this repository.
- `--quiet`: Suppress terminal output (ideal for automation).
- `--uninstall-cron`: Remove the automated sync task.

_Note: You can also control automation by setting `"autoUpdate": false` in your `sync-config.json`._

## 🛠️ Adoption Flow

1. **Initialize:** Clone this repo as your standard foundation.
2. **Configure:** Set local paths in `sync-config.json`.
3. **Sync:** Run the sync tool to update target projects.
4. **Enforce:** Add the generated rules to your AI agent's context.
