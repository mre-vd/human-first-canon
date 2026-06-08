# Proposal: Project Scaffolding Engine (Skeletons)

## 🎯 Context & Vision
The AI-Process-Architecture currently focus on "How do we work?" by synchronizing rules (`GEMINI.md`, `CLAUDE.md`). However, when starting a new project, developers face the **"Blank Canvas Problem"**. 

The **Scaffolding Engine** aims to solve the "Where do things go?" problem. It will provide interactive, opinionated project skeletons that are inherently aligned with our rule modules.

## 🚀 The Value Proposition
Instead of manually setting up a project and then running discovery/sync, the flow becomes:
**Scaffold (Interactive Wizard)** ➡️ **Auto-Discover** ➡️ **Auto-Sync**. 

This provides an end-to-end "Paved Path" from idea to architecture in seconds.

## 🏗️ Architectural Design

### 1. The `skeletons/` Directory
A new top-level directory containing architectural templates. These are strictly *structural* skeletons (directories, `.gitignore`, initial `package.json`/`go.mod`, and architectural notes).

Example structure:
```text
skeletons/
├── backend/
│   ├── nestjs-clean-architecture/
│   ├── go-standard-layout/
│   └── python-fastapi-domain/
└── frontend/
    ├── react-feature-sliced/
    └── vue-composition/
```

### 2. The Interactive CLI (`bin/scaffold.sh`)
A Node.js powered interactive wizard that acts as an "Architectural Interview":
- **Selection**: Choose category (Backend, Frontend, Fullstack).
- **Stack**: Choose primary technology (React, NestJS, Go, etc.).
- **Pattern**: Choose architectural pattern (Clean Architecture, FSD, MVC).
- **Add-ons**: Toggle Database (Prisma/TypeORM), CI/CD, or Docker.

### 3. Integration Engine
Once the skeleton is copied, the engine will:
1. Automatically run `bin/discover.sh` on the new folder.
2. Automatically run `bin/setup.sh` to inject the correct rules.

## 💎 Key Benefits
- **Zero Configuration**: Compliant with company rules from minute one.
- **Cognitive Relief**: Standardized folder structures across the organization.
- **AI-Ready**: Pre-configured rules mean AI agents immediately understand the new project.

## 🗺️ Phased Implementation Plan
- **Phase 1 (MVP)**: Basic `bin/scaffold.sh` with 2-3 core skeletons.
- **Phase 2**: Full interactive wizard to mix-and-match features.
- **Phase 3**: Support for custom team-specific skeletons from external repos.

---
*This proposal is open for discussion. Please provide feedback on the proposed architecture and user flow.*
