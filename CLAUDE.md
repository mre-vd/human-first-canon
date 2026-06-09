<!-- GENERATED FILE - DO NOT EDIT MANUALLY - SEE AI-Process-Architecture REPO -->


--- From Module: engineering/general ---

# CLAUDE.md — General Engineering Standards

## Technical Discipline: Professional Standards for System Integrity

Engineering canons for maintaining system integrity in this repository. Stack-agnostic engineering principles.

## Audible attention signal — example configuration

The user can be notified whenever Claude needs their attention. This can be achieved via **global hooks** (e.g., in `~/.claude/settings.json` using macOS `afplay` or similar tools on other OS), so it fires automatically:

- **Turn ends / task finished** → `Stop` hook plays a "success" sound.
- **Claude needs input** — a question, a decision, a permission prompt, or any blocker that halts progress → `Notification` hook plays an "attention" sound.

## Discuss first, execute on command — wait for the go-signal

The default mode for every exchange is **discussion**, not action. Analyze, propose, plan, weigh trade-offs, ask — but do **not** change anything until the operator gives an explicit go-signal. Treat execution as authorized only when the operator says so in the imperative — "зроби", "починай", "вперед", "го", "застосуй", "do it", "go", "ship it", or an equally explicit instruction to act.

## Work quietly — chat is for decisions and outcomes, not narration

Do the work through tools; keep the chat almost empty. The operator reads the diff and the results themselves, so play-by-play prose and "here's what I did" recaps are noise that taxes their attention, not signal. The default between and after actions is **silence**.

## Boy Scout Rule — leave the campsite cleaner than you found it

Finishing a task, you are **obligated** to clean up after yourself the leftovers you created yourself or those that remained relevant as a result of your changes. Every change closes its own orphans in the same commit, so orphans never get a chance to compound.

## Self-review pass before reporting work as done

Finished work is not "I wrote the code, I guess it compiles". Before saying "done", a second pass through your own diff is mandatory. Without it the executor offloads validation onto the user, who already took a step back to delegate.

## Audit loop — iterate until zero bugs

After the self-review pass and before reporting "done", run a focused audit of the changes I just made and **keep iterating until the audit returns zero findings**. The work is complete only when a clean pass finds nothing.

## Git workflow — branch, push progress, ship via PR

All work goes through a feature branch and lands on `main` only through a pull request. `main` is never committed to directly.

## Task status — move the card as the work moves

Work is tracked in a **Task Tracker** (e.g., Linear, Jira, GitHub Issues), and the card's status must mirror reality.

## Work in an isolated worktree, never in the operator's checkout

Multi-step implementation work runs in its **own git worktree**, not in the operator's primary checkout.

## Don't fabricate third-party UI steps

Before emitting any specific menu path / button name / URL for a third-party UI, **look up the platform's current docs for that exact action** (WebFetch / WebSearch).

## Documentation — encapsulate by topic, no duplication

Project documentation files follow the same encapsulation discipline as code: **each file owns its topic**, other files only link to it with a one-line description.

## Security — PAUSED FOR MVP

Security rules and the full audit checklist are **intentionally disabled for the MVP**. They are kept within the standard `CLAUDE.md` flow but marked as paused. See the Security section for details.

## Decluttering — clarity through removal

Decluttering is the principle of intentionally removing anything that does not support the main goal, understanding, or user flow.

## Idempotency for any operation that can be retried

Side-effecting operations whose trigger can fire twice MUST be idempotent. Retries happen — network blips, a consumer crashing, webhook senders retrying.

## Per-project versioning — bump the number so the running build shows the fix

Each shippable project carries its own running semantic version, shown in small font in its own UI. The point is operational: looking at a deployed website, admin panel, or desktop app, you can tell at a glance whether that build already carries a given fix — without diffing commits or asking. The version is per-project, so each surface tells its own story; a fix shipped to admin doesn't silently imply the website got it too.

**One source of truth per project** — the single file the version lives in, and where its UI reads it:

- **website** → `modules/website/package.json`. Injected into the static export by `next.config.ts` (`env.NEXT_PUBLIC_APP_VERSION`), shown in the Footer.
- **admin** → `modules/admin/frontend/package.json`. Vite define exposes `__APP_VERSION__`, shown in the Sidebar.
- **notary / desktop** → `modules/notary/desktop/src-tauri/tauri.conf.json` (authoritative — it's both the desktop release version and what the CI /updates guard compares against). The notary SPA shows it in its Sidebar via Vite `__APP_VERSION__`, which reads `modules/notary/frontend/package.json` — a mirror the bump keeps in lockstep. The mirror exists because the SPA's Docker build context is only `modules/notary/frontend`, so it physically can't read `tauri.conf.json`; the bump writing both files is what prevents the two from drifting (the exact drift that motivated this rule: the desktop was releasing 0.1.14 while its UI showed 0.1.0).

**Bump it as part of the task.** During the self-review pass, before opening the PR, bump the version of every project the diff touches. Any change to a project's shippable files bumps at least its patch — touch two projects, bump both, independently.

You classify the bump:

- **major** — a breaking change to that project's behavior or public contract (see "API contract changes (Hyrum's Law)").
- **minor** — a new user-facing feature.
- **patch** — everything else that still ships: fix, refactor, chore, style, perf.

**Mechanism** — one command, never hand-edit the version files:

```bash
make bump ARGS="<website|admin|notary> <major|minor|patch>"   # wraps scripts/bump-version.sh
```

For notary it writes both the authoritative `tauri.conf.json` and the mirror `package.json` atomically — so "single source of truth" holds: the editable source is `tauri.conf.json`, `package.json` is tool-written, never hand-edited (consistent with "Generated artifacts have a single source of truth").

The desktop-release CI patch auto-bump is a fallback only. `.github/workflows/desktop-release.yml` still auto-increments the patch if a desktop-affecting PR merged without an in-PR bump, and it mirrors `package.json` too so it can't reintroduce drift. Don't lean on it — bump in the PR with the correct type; CI only patches what you forgot.

**Relationship to the v1.0.0 milestone (next section):** these 0.x running versions are the per-build markers shown in each UI throughout the MVP. The global v1.0.0 tag is the one-time launch milestone after the final audit — a different axis, not a replacement.

**Why a rule:** without it, "is the fix live?" is answered by archaeology — diffing commits against a deploy nobody recorded. A visible per-project version turns it into a glance.

## Versioning — v1.0.0 after the final audit

After the final security audit and all fixes — bump every package to `1.0.0` and tag `v1.0.0`.

## Before deleting code you don't fully understand (Chesterton's Fence)

Run `git log -p <file>` or `git blame -L` and find the PR/commit that added it. If you can't reconstruct why it was put there — leave it and ask.

## API contract changes (Hyrum's Law)

Every shipped API field is consumed by _some_ client — including production app versions you can't update. Treat the schema as a public contract.

## Shell scripts

Any script that uses relative paths MUST `cd "$(dirname "$0")"` as the first command after the shebang.


--- From Module: engineering/security ---

# CLAUDE.md — Security Standards

> **STATUS: PAUSED.** These rules are disabled for the MVP per the operator's call. They are kept here so nothing is lost. **Re-enable before any real launch** (public web, app-store submission, real user PII) by integrating them into the active sections of `CLAUDE.md`.

---

## Security as a Mindset

Security is a non-negotiable property of every change. It is not a separate "task" but a core part of the engineering mindset. Any code written, refactored, or reviewed must be safe by default — no compromises for convenience or speed. We protect the system to protect our users and our peace of mind.

**Always:**

- **Validate and Sanitize:** Every system boundary (API handlers, message consumers, file uploads) must validate input. Never trust client-supplied data.
- **Parameterized Queries:** Use your stack's native parameterized query mechanism (ORM criteria, prepared statements). Never build queries via string concatenation.
- **Authorization over Authentication:** Verify not just _who_ the caller is, but _if_ they are allowed to act on the specific resource. A logged-in user is not automatically permitted to read another user's data.
- **Secret Management:** Keep secrets out of source code, logs, and error messages. Use environment variables or secret managers.
- **DTO Projection:** Project entities to DTOs at the API edge. Never return raw DB models directly, as they may leak sensitive internal fields.
- **Least Privilege:** Give every service, process, and user the minimum permissions required to perform its task.
- **Fail Closed:** If a security check throws an error, the action must be rejected. Never default to "allow" on error.

**Never:**

- Disable security features (CSRF, CORS, rate limiting) "to make it work" during development.
- Bypass auth in dev/staging code paths that could be reached in prod.
- Log raw tokens, passwords, OTP codes, or PII (emails, phone numbers).
- Trust client-controlled headers for security decisions.
- Commit `.env` files or signing keys to the repository.

## Security Audit Checklist (Agnostic Baseline)

This checklist serves as a standard for auditing changes.

### 1. Core Security

- **Access Control:** Is every endpoint protected by resource-level authorization?
- **Injection:** Are all database queries and shell commands parameterized?
- **Input Validation:** Is there a strict schema/type validation for all inputs?
- **Secrets:** Are there any hardcoded keys, tokens, or sensitive logs?
- **Redaction:** Are sensitive fields (passwords, PII) redacted from logs and error responses?

### 2. Infrastructure & Integration

- **Secure Headers:** Are standard security headers (HSTS, CSP, etc.) configured?
- **TLS/SSL:** Is the connection encrypted? Are certificates managed correctly?
- **Dependencies:** Are third-party libraries pinned and checked for known vulnerabilities (CVEs)?
- **Rate Limiting:** Are expensive or sensitive endpoints protected from brute force or DoS?

### 3. AI & LLM Security (If applicable)

- **Prompt Injection:** Are user inputs treated as untrusted and clearly separated from system instructions?
- **Output Sanitization:** Is model output validated and sanitized before being rendered or stored?
- **Cost Control:** Are there per-user rate limits and budget caps on model calls?

---

_This checklist is intended to be expanded based on the specific technology stack used in the project._


--- From Module: engineering/devops ---

# CLAUDE.md — DevOps Standards

## Core Principles

- **IaC (Infrastructure as Code):** Every piece of infrastructure must be defined in code (Terraform, Pulumi, or K8s manifests). Manual changes via Cloud Consoles are forbidden.
- **GitOps:** The state of the infrastructure should reflect the state of the Git repository.

## CI/CD (GitHub Actions)

- **Workflow Modularity:** Use reusable workflows to avoid duplication.
- **Security:** Use OIDC for cloud provider authentication. Never use long-lived secrets/keys.
- **Validation:** Every PR must trigger linting, security scanning (Trivy, Snyk), and unit tests.

## Docker & Containers

- **Multi-stage Builds:** Use multi-stage builds to keep production images small and secure.
- **Base Images:** Use minimal base images (Alpine or Distroless).
- **Rootless:** Run containers as non-root users.

## Kubernetes

- **Resource Limits:** Always define `requests` and `limits` for CPU and Memory.
- **Probes:** Define `livenessProbe`, `readinessProbe`, and `startupProbe` for all deployments.
- **Config & Secrets:** Use `ConfigMaps` for configuration and `Secrets` (integrated with Vault/AWS Secrets Manager) for sensitive data.

## Observability

- **Metrics:** Expose Prometheus-compatible `/metrics` endpoints.
- **Logs:** Ensure logs are output in JSON format to stdout for easy aggregation (ELK/Loki).
- **Tracing:** Use OpenTelemetry for distributed tracing in microservices.


--- From Module: backend/go ---

# CLAUDE.md — Go Standards

## Project Organization (Go)

- **Project Layout:** Follow the `golang-standards/project-layout` pattern. Use `cmd/` for binaries, `internal/` for private code, and `pkg/` for reusable libraries.
- **Package Naming:** Use short, lowercase, single-word names for packages. Avoid `util`, `common`, or `base`.

## Go Conventions

### Error Handling

- **Explicit Checks:** Always check errors immediately. `if err != nil { return err }`.
- **Error Wrapping:** Use `%w` with `fmt.Errorf` to add context while preserving the original error for `errors.Is` or `errors.As`.

### Concurrency

- **Goroutines:** Use goroutines only when there is actual concurrency needed. Always ensure you have a way to stop/wait for them (using `context` or `sync.WaitGroup`).
- **Channels:** Use channels for communication/orchestration; use `sync.Mutex` for shared state protection.
- **Select:** Use `select` with `context.Done()` to prevent goroutine leaks.

### Interface Design

- **Small Interfaces:** Prefer small, focused interfaces (e.g., `io.Reader`).
- **Consumer Definition:** Define interfaces where they are _used_, not where they are implemented.

### Performance

- **Allocation:** Avoid unnecessary allocations. Use `sync.Pool` for frequently allocated/deallocated objects.
- **Pointers:** Use pointers for large structs or when mutation is needed. Use values for small, immutable data.

### Testing

- **Table-Driven Tests:** Use the table-driven pattern for testing multiple scenarios in a single test function.
- **Benchmarks:** Use `testing.B` for performance-critical code.


--- From Module: backend/jvm ---

# CLAUDE.md — JVM & Backend Standards

## Project organization (Backend)

- One folder per domain (`<name>/`) containing the resolver/controller, the service, the repository, `dto/`, `entity/`, an optional scheduler, and module-local utils.
- Shared infra lives in a `common/` package; config beans in `config/`.
- A schema/API change goes in the schema file first, then resolver, then regenerate client codegen.
- A DB schema change is a new migration file — never edit an existing migration.

## Backend conventions

### Dependency injection

Always use constructor injection. Never inject on fields.

### Configuration

Config via immutable config objects read once at startup. Never use a single-field injection (`@Value`) for multiple related fields.

### Secrets & credentials

Never hardcode secrets. Every secret comes from an env var. The request-logging filter must never log secrets.

### Entities & DTOs

Don't return ORM/DB entities from API fields directly. Project to a DTO or restrict via the schema.

### Filter at the DB, never re-filter in app code

Predicate filtering belongs **only** in the SQL `WHERE` clause. Don't `.filter()` the result in the service afterwards. Pass time/threshold parameters into the query, don't hardcode `NOW()`.

### Transactions

Transaction boundaries go on the service method. Keep transactions as short as possible.

### Error handling

Use specific exception classes. Never silently swallow exceptions.

### Logging

Use a structured logger (SLF4J). Use parameterized messages. Log at the right level.

### Scheduling

Schedulers assume single-instance. Gate every scheduled job with a distributed lock (ShedLock-style) if scaling horizontally.

### Messaging

Declare exchanges/queues/bindings as config beans. Use durable queues and persistent messages. Message DTOs are records.

### External services

Wrap external calls in their own service class. Set the ACL and content-type explicitly on uploads.

### Subprocess execution (media tools etc.)

Invoke subprocesses via the structured builder, not a shell string. Check the exit code and redirect the error stream.

## Catch-up for cron jobs that fire less often than daily

Any scheduled job with a cadence less frequent than daily MUST also expose a boot-time catch-up that compares last successful run against expected fire time.


--- From Module: backend/nestjs ---

# CLAUDE.md — Node.js & NestJS Standards

## Project Organization (NestJS)

- **Module-per-Domain:** Follow NestJS modularity. Each domain has its own folder containing `.module.ts`, `.controller.ts`, `.service.ts`, `dto/`, and `entities/`.
- **Layered Architecture:** Maintain a clear separation between the Controller (HTTP/Interface), Service (Business Logic), and Repository/Data Access layers.
- **Shared Logic:** Global helpers and shared utilities live in a `common/` or `shared/` directory.
- **Dependency Injection:** Strictly use constructor-based dependency injection. Avoid using the `inject()` function or manual `get()` from the module ref unless absolutely necessary.

## Node.js & NestJS Conventions

### TypeScript & Typing

- **Strict Typing:** Enable `strict` mode in `tsconfig.json`. Avoid `any`. Use `unknown` for unsafe input and type guards for validation.
- **Interfaces vs. Classes:** Use classes for DTOs (to enable `class-validator`) and interfaces for internal data structures.
- **Path Aliases:** Use path aliases (e.g., `@app/`, `@modules/`) for cleaner imports and to avoid deep relative paths (`../../../`).

### API Development

- **DTO Validation:** Use `class-validator` and `class-transformer` with the global `ValidationPipe`. Set `whitelist: true` and `forbidNonWhitelisted: true`.
- **Serialization:** Use `@Exclude()` and `@Expose()` from `class-transformer` or NestJS `ClassSerializerInterceptor` to control API response shapes. Never return raw database entities.
- **Versioning:** Use URI-based versioning (e.g., `/v1/users`) configured globally in `main.ts`.

### Performance & Concurrency

- **Asynchronous Execution:** Use `async/await`. Avoid `sync` versions of `fs` or other I/O operations.
- **Promise Management:** Use `Promise.all()` for independent parallel operations. Avoid "await in a loop" unless sequential execution is strictly required.
- **Error Handling:** Use NestJS `ExceptionFilters` or built-in `HttpException` classes. Avoid catching errors without re-throwing or logging them properly.

### Database (TypeORM/Prisma)

- **Migrations:** Always use migrations for schema changes. Never allow the ORM to auto-sync schema in production.
- **Database Logic:** Filter data at the database level (SQL `WHERE`). Avoid fetching large datasets and filtering them in memory with `.filter()`.
- **Transactions:** Use transaction managers or decorators for operations involving multiple related database writes.

### Security

- **Environment Variables:** Use `@nestjs/config` for configuration. Never hardcode secrets or API keys.
- **Authentication/Authorization:** Use NestJS `Guards` for access control. Implement `Passport` strategies for authentication.
- **Data Sanitization:** Always sanitize user input to prevent XSS and SQL injection.

### Testing

- **Unit Testing:** Write unit tests for services using `jest`. Mock dependencies using `jest.mock()` or NestJS `TestingModule`.
- **E2E Testing:** Implement end-to-end tests for critical API paths using `supertest`.

### Logging & Monitoring

- **Structured Logging:** Use a professional logger like `pino` or `winston`. Log errors with full stack traces.
- **Health Checks:** Implement a `/health` endpoint using `@nestjs/terminus`.


--- From Module: backend/python ---

# CLAUDE.md — Python & FastAPI Standards

## Project Organization

- **Directory Structure:** Use a `src/` or `app/` directory. Organize by feature (module-based) rather than by type (e.g., put `router.py`, `service.py`, `models.py` together in a `users/` folder).
- **Environment:** Always use a virtual environment (`venv`, `poetry`, or `pdm`). Use `pyproject.toml` for dependency management.

## FastAPI & Python Conventions

### Typing & Validation (Pydantic)

- **Type Hints:** Use type hints for all function signatures. Use `typing` module (or built-ins in 3.9+) for complex types.
- **Pydantic Models:** Use Pydantic for request/response validation. Define `BaseModel` schemas for all API interfaces.

### API Design

- **Dependency Injection:** Leverage FastAPI's `Depends` for authentication, DB sessions, and shared logic.
- **Async/Await:** Use `async def` for I/O bound tasks (DB, API calls). Use standard `def` for CPU-bound tasks to avoid blocking the event loop.
- **Status Codes:** Use `fastapi.status` constants for explicit HTTP response codes.

### Database (SQLAlchemy/SQLModel)

- **Async Sessions:** Use asynchronous database drivers (e.g., `asyncpg`) and async sessions.
- **Migrations:** Use `Alembic` for schema management.

### Error Handling

- **Custom Exceptions:** Define custom exception classes and use FastAPI `exception_handlers` to standardize error responses.

### Testing

- **Pytest:** Use `pytest` for testing. Use `httpx.AsyncClient` for testing FastAPI endpoints.
- **Fixtures:** Use pytest fixtures for DB setup and shared mock data.

### Formatting & Linting

- **Tools:** Use `ruff` for extremely fast linting and formatting. Adhere to PEP 8.


--- From Module: backend/rust ---

# CLAUDE.md — Rust Standards

## Project Organization (Rust)

- **Workspace Structure:** Use Cargo workspaces for multi-crate projects. Keep `crates/` for internal libraries and `bin/` for entry points.
- **Module Hierarchy:** Follow the `mod.rs` or (preferred) `name.rs` + `name/` directory structure for clarity.
- **Crate Visibility:** Keep items `pub(crate)` by default. Only expose what is necessary for the public API.

## Rust Conventions

### Error Handling

- **Result Type:** Always return `Result<T, E>`. Use `thiserror` for library errors and `anyhow` for application-level errors.
- **Panic Policy:** Avoid `unwrap()` and `expect()` in production code. Use `match` or `if let` to handle `None` and `Err` cases gracefully.
- **Custom Errors:** Define domain-specific error enums to provide clear context.

### Memory & Ownership

- **Borrowing:** Prefer references over cloning. Use `Cow` (Clone-on-Write) when a function needs to return either a borrowed or owned value.
- **Smart Pointers:** Use `Arc` for shared ownership across threads and `Box` for heap allocation of large structures or trait objects.
- **Lifetimes:** Name lifetimes explicitly only when the compiler cannot elide them. Prefer simple ownership models.

### Concurrency

- **Async/Await:** Use `tokio` as the standard async runtime. Avoid blocking the executor with long-running CPU tasks (use `spawn_blocking`).
- **Sync Primitives:** Use `tokio::sync::Mutex` in async contexts instead of `std::sync::Mutex` to avoid deadlocks.

### Safety

- **Unsafe Code:** Avoid `unsafe` unless strictly necessary for performance or FFI. Document all `unsafe` blocks with a `// SAFETY:` comment explaining why it is sound.

### Testing

- **Unit Tests:** Place unit tests in the same file as the code using `cfg(test)` modules.
- **Integration Tests:** Place integration tests in the `tests/` directory.
- **Documentation Tests:** Use doc tests (`/// # Examples`) to keep documentation and examples in sync with the code.

### Performance

- **Zero-Cost Abstractions:** Leverage traits and generics. Prefer `Iterators` over manual loops.
- **Allocation:** Minimize heap allocations in hot loops. Use `SmallVec` or `ArrayVec` for small fixed-size collections.


--- From Module: frontend/react ---

# CLAUDE.md — React & Web Standards

## Code style

- React components should be clean and a pleasure to read.
- Do not leave comments in code. The code should be self-explanatory.
- Use a function declaration for components. Use arrow functions for everything else.
- Don't `export` things that aren't consumed outside the file.

## No inline objects/arrays/functions in the render method

Do not create objects, arrays, or functions inline in a React component's render method. Hoist static values to module-level constants.

## Project organization (Front end)

- A screen or reusable component lives in its own folder: `<Name>.tsx` + `index.ts` + a styles module + `components/` + `hooks/`.
- Reusable UI used in 3+ places gets promoted to a shared `components/<name>/`.
- Navigation routes are registered in one central place.
- Genuinely cross-screen global state goes in a small global store; single-screen state stays in the screen.

## Component / UI conventions

- **Host vs simple UI.** A simple UI component renders one thing. Hosts orchestrate state.
- **Props type.** `interface Props` at the top of the component.
- **Hooks know nothing about the host.** A hook does one thing named after itself.
- **SVG icons** live in module-level constants at the bottom of the component.
- **Handler naming:** `{meaning}{event}Handler` — `registrationPressHandler`.

## Async data — three states

Any component that reads async data MUST handle three states:

1. **No data yet** (`!data`) — loader / skeleton.
2. **Error** — visible error UI with a retry path.
3. **Data loaded** — normal render.

## No dead-end screens — back must always work

A user must NEVER end up stuck on a screen they can't leave. Every render branch MUST contain a back affordance.

## Auth rejections must clear the session and bounce to login

When the backend signals that the caller's session is invalid, the client MUST drop the session locally **and** redirect to login.

## Rules of Hooks

Never call a hook inside a condition, loop, or **after an early `return`**. All hook calls must happen at the top of the component.

## useEffect

- Include every used identifier in the dep array.
- Return a cleanup function if needed.
- Don't put `async` directly on the effect body.

## useMemo / useCallback

Don't memoize by default. Use only when the value goes into another hook's dep array or a `React.memo` child needs a stable prop.

## Data client (cache + fetching)

- Mutations that affect another query MUST refetch it.
- fetchPolicy: default `cache-first`.

## Component data depth (Law of Demeter)

A component should consume data **one level deep**. Derive required flags in the host component and pass them down.

## Handler side effects must match the name (Least Astonishment)

A handler should do **only** what its name implies. Extract teardown/cleanup logic into dedicated functions.

## i18n

- No user-facing strings in JSX. Always `t('key')`.
- Keys mirror the screen path: `find.proposalEmpty`.
- A key added in one locale file MUST be added to every other locale file.


--- From Module: frontend/svelte ---

# CLAUDE.md — Svelte Standards

## Project Organization (Svelte/SvelteKit)

- **Routes (SvelteKit):** Follow the directory-based routing structure. Keep logic in `+page.server.ts` or `+page.ts` to separate data loading from presentation.
- **Components:** Organize reusable components in `$lib/components`.
- **Stores:** Place shared state in `$lib/stores`.

## Svelte Conventions

### Reactive Declarations

- **The $ Sign:** Use `$: label` for reactive statements and derived values. Avoid overusing them; keep them focused on UI synchronization.
- **Store Access:** Use the `$` prefix (e.g., `$userStore`) to auto-subscribe and unsubscribe from stores.

### Component Design

- **Props:** Use `export let name` for props. Provide default values where applicable.
- **Slots:** Use named slots for flexible component layouts.
- **Events:** Use `createEventDispatcher` for component communication (or `bubbles` for deep events in Svelte 4; standard DOM events in Svelte 5).

### TypeScript

- **Strong Typing:** Use `lang="ts"` in all `<script>` tags. Define interfaces for props and complex objects.

### Data Loading (SvelteKit)

- **Server-side Logic:** Use `load` functions in `+page.server.ts` for sensitive data or DB access.
- **Actions:** Use SvelteKit Form Actions for data mutations instead of manual `fetch` calls.

### Performance

- **Immutable State:** When updating objects or arrays, use the spread operator (`state = [...state, newItem]`) to trigger reactivity.
- **Transitions:** Use built-in `svelte/transition` for smooth UI interactions without external libraries.


--- From Module: frontend/vue ---

# CLAUDE.md — Vue Standards

## Project Organization (Vue)

- **SFC (Single File Components):** Use `.vue` files with the `<script setup>` syntax for better composition and TypeScript support.
- **Component Structure:** Separate components into `base/` (global/UI), `features/` (domain-specific), and `views/` (pages).
- **Composables:** Extract reusable logic into `composables/` (use naming convention `use<Name>`).

## Vue Conventions

### TypeScript Integration

- **Typed Props/Emits:** Use `defineProps<{ ... }>()` and `defineEmits<{ ... }>()` for type-safe component interfaces.
- **Reactive State:** Use `ref()` for primitive values and `reactive()` for complex objects. Prefer `ref()` for consistency.

### State Management (Pinia)

- **Modular Stores:** Create one store per domain feature. Avoid one giant global store.
- **Getters & Actions:** Use getters for derived state and actions for mutations and async logic.

### Routing (Vue Router)

- **Lazy Loading:** Use dynamic imports for route components to optimize bundle size.
- **Navigation Guards:** Centralize authentication and permission checks in router guards.

### Styling

- **Scoped CSS:** Always use `<style scoped>` to prevent style leakage.
- **CSS Variables:** Use global CSS variables (design tokens) for theming and consistency.

### Best Practices

- **v-for Keys:** Always provide a unique `:key` for `v-for` directives.
- **Template Logic:** Keep logic in templates minimal. Move complex expressions to `computed` properties.
- **Watchers:** Use `watchEffect` for simple side effects and `watch` when you need access to old/new values.


--- From Module: mobile/flutter ---

# CLAUDE.md — Flutter Standards

## Project Organization

- **Folder Structure:** Use `lib/src` for implementation details. Organize by `features/` or `modules/`. Each feature contains `data/` (repositories/models), `domain/` (entities/use cases), and `presentation/` (widgets/blocs).
- **Architecture:** Prefer Clean Architecture or a simplified Layered Architecture.

## Flutter Conventions

### State Management

- **Provider/Riverpod/Bloc:** Choose one and be consistent. For large apps, `Bloc` or `Riverpod` is preferred for explicit state transitions.
- **Immutable State:** Ensure all state classes are immutable (using `freezed` or `equatable`).

### Widget Design

- **Composition:** Prefer composition over deep inheritance. Break down large `build` methods into smaller, reusable widgets.
- **Const Constructors:** Use `const` constructors whenever possible to improve rendering performance.

### Navigation

- **GoRouter:** Use `go_router` for declarative, URL-based navigation, especially for web/deep-linking support.

### Asynchronous Operations

- **Future/Stream:** Use `FutureBuilder` or `StreamBuilder` for UI-bound async data.
- **Error Handling:** Use `try-catch` blocks in repositories/services and map errors to UI-friendly messages.

### Testing

- **Widget Tests:** Test individual components in isolation.
- **Golden Tests:** Use golden tests to prevent visual regressions.
- **Unit Tests:** Test business logic (Blocs, Services, Repositories).

### Assets & Localization

- **Generated Code:** Use `flutter_gen` for type-safe asset access and `slang` or `easy_localization` for i18n.
