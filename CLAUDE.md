# CLAUDE.md — Unified Engineering Standards

This document acts as the single source of truth for development and engineering standards. All agents and developers must strictly adhere to these rules.

> **The ethical foundation lives in `GEMINI.md`** — the apex (Experience and Will belong to the human, the Final Measure, Mirror not Gate) plus the strategy and analysis standards. It governs **every** agent, Claude included — not only Gemini. Read it as part of this canon before substantive work; the engineering rules below are its manifestation, not a replacement.
>
> **Whenever the task touches words** — copy, microcopy, UI strings, button and error text, naming, content, or a text/copy audit — apply `GEMINI.md` → *Writing Style & Tone* (and the apex). Read those rules first: text is governed there, not here.

## 1. UI/UX Design Standards

UI/UX design is a sovereign domain with its own canon: **`DESIGN.md`** — kept separate because design is a distinct discipline, not a subset of code. Before any frontend, layout, or design-execution work, read `DESIGN.md`; it holds the design guardrails (Proposer-Approver, No Emojis, Smallest Mechanism, No Dead Ends & The Single Door, Mirror of Bindings) and the core design principles. Frontend *code* standards remain here in the framework sections below.

---

## 2. Standards of Structural Integrity

### Technical Discipline: The Pattern of the Law

Engineering canons for maintaining system integrity. These rules provide the **Pattern** for manifesting the Divine Intent into digital form. 

### System Integrity Principle

A system is integral only when every part of it (code, data, documentation, tests) is in a state of mutual consistency.

1.  **Completeness of Execution:** A task is not finished if even one aspect (implementation, tests, i18n, migrations, flow descriptions, or versioning) is missing or not updated.
2.  **Contractual Stability:** Changes in one module must ensure the stability of the entire system.
3.  **Alignment with Intent:** Code is a derivative of business logic. If the implementation deviates from the Intent, the system loses integrity.
4.  **Environmental Safety — Focused Execution:** No change may leave the system in a hanging intermediate state. A process, once begun, runs to its next **logical checkpoint** — a consistent state it can be fixed at; while it runs, incidental noise and unrelated signals do not interrupt it. The **only sanctioned interruption is the operator's explicit signal**, in one of two forms: **adjust** (pause at the current checkpoint, correct, continue) or, if it went wrong at the root, **rewind** (roll back to the last good checkpoint and resume from there). Either way, intervention resolves to a checkpoint, never a half-state. Checkpoints stay short, so focus is never a trap; the system ignores **noise**, never a **clear human signal** — will belongs to the human.
5.  **Pull Request Versioning & Merging:** Any code change introduced via a Pull Request (PR) must bump the version of the project or module where the change occurred. Before merging into the `main` branch, the proposed version must be validated; if that version has already been merged or published in parallel, the version must be bumped to a higher, unique value. Bumping must be finalized before the merge.
6.  **Post-PR Summary:** Upon the completion or merge of a PR, a concise summary of what was accomplished and the specific version containing the changes must be explicitly displayed or documented.
7.  **Rule Synchronization Integrity:** When rules or standards are updated in the source repository (`ai-process-architecture`) and synchronized to target projects, the updated compiled files (`CLAUDE.md`, `GEMINI.md`) must be committed and pushed to the remote repositories of those target projects to keep all agents and developers in alignment.

### Modular Sovereignty: The Body of Organs

The system must be built as a collection of autonomous "organs."

- **Functional Encapsulation:** Each module owns its domain (logic, state, and UI). 
- **Surgical Isolation:** Changes must be localized. A change in the "Billing" organ must never require a change in the "Design" organ.
- **Contractual Communication:** Modules interact only through predefined public interfaces (APIs/Events). Internal implementation is private to the module.
- **Boy Scout Rule for Modules:** If a module's boundaries become blurred, refactor to restore its sovereign isolation.

### Design as the Single Source of Truth (SoT)

The design is the absolute Single Source of Truth for all UI, layouts, and visual interactions. Code must be a faithful realization of the design.

### The Principle of Silence & Focus

The engineering manifestation of **The Law of Operational Rest** (`GEMINI.md`).

- **Operational Rest — Zero-Active Waste:** A task is not finished until the system has returned to its baseline minimal-resource state. Energy is expended ONLY for Manifestation in response to explicit intent; post-execution, the system returns to Silence.
  - **Trigger over Polling:** Prefer event-driven triggers initiated by user demand.
  - **Resource Lifecycle:** Explicitly release connections and background processes upon completion.
  - **Cognitive Silence:** Default to silence. No noise without required action.
- **Routine That Teaches Stays with the Human:** Engineering projection of the law of the same name (`GEMINI.md`). Automate only the routine that teaches nothing — reversible throughput, idempotent toil, dead repetition. Routine through which a person learns their craft is formative; do not seize it. The AI stays an **assistant on request** — it generates, analyses, or automates only when explicitly asked, and the human alone decides when they have outgrown a routine and may hand it over. The final decision is always the human's.
- **Discuss first, execute on command:** Wait for the explicit go-signal before changing the manifestation.
- **Work quietly:** The chat is for decisions and outcomes, not narration.
- **Speak technically:** Precise identifiers over vague jargon.

### Session Start: Pull First

The first action of every session is `git pull` — sync the working tree with the remote before doing anything else. This covers both the project and the canon (`CLAUDE.md`, `GEMINI.md`, and the domain files, which arrive via sync). Acting on a stale tree risks merge conflicts and applying superseded rules. Pull first; then work.

### Finish to Zero: The Outcome-Oriented Duty

Claude must decide and finish. Surfacing parked decisions creates a load on the Bridge. A task is finished only when it is in a closed state, with all verification and side-effects completed.

### Ethical Integrity: The Mirror of Consequences

Ethics is the foundation of structural integrity. This section is the engineering manifestation of **The Law of the Name** (rooted in `GEMINI.md`): we do not dictate — we name. **Prohibiting is categorically prohibited.** We do not block or forbid; we provide the **Mirror**. If a technical decision or request introduces systemic risk, debt, or ethical friction, we report the observable consequences as technical facts. The duty of the system is to call things by their names. The decision to proceed remains with the operator, who acts with full awareness of the resulting system state.

### Operational Guards: Protecting the Body

- **Dependency Integrity:** Changing external dependencies without explicit intent introduces unpredictable systemic risks, version conflicts, and potential build failures.
- **Surgical Minimalism:** Deviating from the assigned task's scope increases entropy and introduces unsolicited complexity. Changes are strictly limited to what is required for the specific manifestation.

---

## 3. Go Coding Standards

### Project Organization (Go)

- **Project Layout:** Follow the `golang-standards/project-layout` pattern. Use `cmd/` for binaries, `internal/` for private code, and `pkg/` for reusable libraries.
- **Package Naming:** Use short, lowercase, single-word names for packages. Avoid `util`, `common`, or `base`.

### Go Conventions

#### Error Handling

- **Explicit Checks:** Always check errors immediately. `if err != nil { return err }`.
- **Error Wrapping:** Use `%w` with `fmt.Errorf` to add context while preserving the original error for `errors.Is` or `errors.As`.

#### Concurrency

- **Goroutines:** Use goroutines only when there is actual concurrency needed. Always ensure you have a way to stop/wait for them (using `context` or `sync.WaitGroup`).
- **Channels:** Use channels for communication/orchestration; use `sync.Mutex` for shared state protection.
- **Select:** Use `select` with `context.Done()` to prevent goroutine leaks.

#### Interface Design

- **Small Interfaces:** Prefer small, focused interfaces (e.g., `io.Reader`).
- **Consumer Definition:** Define interfaces where they are _used_, not where they are implemented.

#### Performance

- **Allocation:** Avoid unnecessary allocations. Use `sync.Pool` for frequently allocated/deallocated objects.
- **Pointers:** Use pointers for large structs or when mutation is needed. Use values for small, immutable data.

#### Testing

- **Table-Driven Tests:** Use the table-driven pattern for testing multiple scenarios in a single test function.
- **Benchmarks:** Use `testing.B` for performance-critical code.

---

## 4. JVM Coding Standards

### Project organization (Backend)

- One folder per domain (`<name>/`) containing the resolver/controller, the service, the repository, `dto/`, `entity/`, an optional scheduler, and module-local utils.
- Shared infra lives in a `common/` package; config beans in `config/`.
- A schema/API change goes in the schema file first, then resolver, then regenerate client codegen.
- A DB schema change is a new migration file — never edit an existing migration.

### Backend conventions

#### Dependency injection

Constructor injection ensures that all required dependencies are available at instantiation and facilitates unit testing. Field injection hides dependencies and complicates testing.

#### Configuration

Config via immutable config objects read once at startup. Grouping related fields into configuration objects provides better structure than multiple single-field injections (@Value).

#### Secrets & credentials

Hardcoding secrets creates a critical security vulnerability. All secrets must originate from environment variables. The request-logging filter must redact secrets to prevent exposure in logs.

#### Entities & DTOs

Returning ORM/DB entities from API fields directly risks leaking sensitive internal fields and tightly couples the API to the database schema. Use DTO projections.

#### Filter at the DB, never re-filter in app code

Filtering in application code after fetching large datasets wastes memory and CPU. Predicate filtering belongs in the SQL `WHERE` clause.

#### Transactions

Transaction boundaries go on the service method. Short transactions minimize database locking and improve concurrency.

#### Error handling

Use specific exception classes. Swallowing exceptions silently hides critical failures and makes the system behavior unpredictable.

#### Logging

Use a structured logger (SLF4J). Use parameterized messages. Log at the right level.

#### Scheduling

Schedulers assume single-instance. Gate every scheduled job with a distributed lock (ShedLock-style) if scaling horizontally.

#### Messaging

Declare exchanges/queues/bindings as config beans. Use durable queues and persistent messages. Message DTOs are records.

#### External services

Wrap external calls in their own service class. Set the ACL and content-type explicitly on uploads.

#### Subprocess execution (media tools etc.)

Invoke subprocesses via the structured builder, not a shell string. Check the exit code and redirect the error stream.

### Catch-up for cron jobs that fire less often than daily

Any scheduled job with a cadence less frequent than daily MUST also expose a boot-time catch-up that compares last successful run against expected fire time.

---

## 5. Node.js & NestJS Coding Standards

### Project Organization (NestJS)

- **Module-per-Domain:** Follow NestJS modularity. Each domain has its own folder containing `.module.ts`, `.controller.ts`, `.service.ts`, `dto/`, and `entities/`.
- **Layered Architecture:** Maintain a clear separation between the Controller (HTTP/Interface), Service (Business Logic), and Repository/Data Access layers.
- **Shared Logic:** Global helpers and shared utilities live in a `common/` or `shared/` directory.
- **Dependency Injection:** Strictly use constructor-based dependency injection. Avoid using the `inject()` function or manual `get()` from the module ref unless absolutely necessary.

### Node.js & NestJS Conventions

#### TypeScript & Typing

- **Strict Typing:** Enable `strict` mode in `tsconfig.json`. Avoid `any`. Use `unknown` for unsafe input and type guards for validation.
- **Interfaces vs. Classes:** Use classes for DTOs (to enable `class-validator`) and interfaces for internal data structures.
- **Path Aliases:** Use path aliases (e.g., `@app/`, `@modules/`) for cleaner imports and to avoid deep relative paths (`../../../`).

#### API Development

- **DTO Validation:** Use `class-validator` and `class-transformer` with the global `ValidationPipe`. Set `whitelist: true` and `forbidNonWhitelisted: true`.
- **Serialization:** Use `@Exclude()` and `@Expose()` from `class-transformer` or NestJS `ClassSerializerInterceptor` to control API response shapes. Never return raw database entities.
- **Versioning:** Use URI-based versioning (e.g., `/v1/users`) configured globally in `main.ts`.

#### Performance & Concurrency

- **Asynchronous Execution:** Use `async/await`. Avoid `sync` versions of `fs` or other I/O operations.
- **Promise Management:** Use `Promise.all()` for independent parallel operations. Avoid "await in a loop" unless sequential execution is strictly required.
- **Error Handling:** Use NestJS `ExceptionFilters` or built-in `HttpException` classes. Avoid catching errors without re-throwing or logging them properly.

#### Database (TypeORM/Prisma)

- **Migrations:** Always use migrations for schema changes. Never allow the ORM to auto-sync schema in production.
- **Database Logic:** Filter data at the database level (SQL `WHERE`). Avoid fetching large datasets and filtering them in memory with `.filter()`.
- **Transactions:** Use transaction managers or decorators for operations involving multiple related database writes.

#### Security

- **Environment Variables:** Use `@nestjs/config` for configuration. Never hardcode secrets or API keys.
- **Authentication/Authorization:** Use NestJS `Guards` for access control. Implement `Passport` strategies for authentication.
- **Data Sanitization:** Always sanitize user input to prevent XSS and SQL injection.

#### Testing

- **Unit Testing:** Write unit tests for services using `jest`. Mock dependencies using `jest.mock()` or NestJS `TestingModule`.
- **E2E Testing:** Implement end-to-end tests for critical API paths using `supertest`.

#### Logging & Monitoring

- **Structured Logging:** Use a professional logger like `pino` or `winston`. Log errors with full stack traces.
- **Health Checks:** Implement a `/health` endpoint using `@nestjs/terminus`.

---

## 6. Python & FastAPI Coding Standards

### Project Organization

- **Directory Structure:** Use a `src/` or `app/` directory. Organize by feature (module-based) rather than by type (e.g., put `router.py`, `service.py`, `models.py` together in a `users/` folder).
- **Environment:** Always use a virtual environment (`venv`, `poetry`, or `pdm`). Use `pyproject.toml` for dependency management.

### FastAPI & Python Conventions

#### Typing & Validation (Pydantic)

- **Type Hints:** Use type hints for all function signatures. Use `typing` module (or built-ins in 3.9+) for complex types.
- **Pydantic Models:** Use Pydantic for request/response validation. Define `BaseModel` schemas for all API interfaces.

#### API Design

- **Dependency Injection:** Leverage FastAPI's `Depends` for authentication, DB sessions, and shared logic.
- **Async/Await:** Use `async def` for I/O bound tasks (DB, API calls). Use standard `def` for CPU-bound tasks to avoid blocking the event loop.
- **Status Codes:** Use `fastapi.status` constants for explicit HTTP response codes.

#### Database (SQLAlchemy/SQLModel)

- **Async Sessions:** Use asynchronous database drivers (e.g., `asyncpg`) and async sessions.
- **Migrations:** Use `Alembic` for schema management.

#### Error Handling

- **Custom Exceptions:** Define custom exception classes and use FastAPI `exception_handlers` to standardize error responses.

#### Testing

- **Pytest:** Use `pytest` for testing. Use `httpx.AsyncClient` for testing FastAPI endpoints.
- **Fixtures:** Use pytest fixtures for DB setup and shared mock data.

#### Formatting & Linting

- **Tools:** Use `ruff` for extremely fast linting and formatting. Adhere to PEP 8.

---

## 7. Rust Coding Standards

### Project Organization (Rust)

- **Workspace Structure:** Use Cargo workspaces for multi-crate projects. Keep `crates/` for internal libraries and `bin/` for entry points.
- **Module Hierarchy:** Follow the `mod.rs` or (preferred) `name.rs` + `name/` directory structure for clarity.
- **Crate Visibility:** Keep items `pub(crate)` by default. Only expose what is necessary for the public API.

### Rust Conventions

#### Error Handling

- **Result Type:** Always return `Result<T, E>`. Use `thiserror` for library errors and `anyhow` for application-level errors.
- **Panic Policy:** Avoid `unwrap()` and `expect()` in production code. Use `match` or `if let` to handle `None` and `Err` cases gracefully.
- **Custom Errors:** Define domain-specific error enums to provide clear context.

#### Memory & Ownership

- **Borrowing:** Prefer references over cloning. Use `Cow` (Clone-on-Write) when a function needs to return either a borrowed or owned value.
- **Smart Pointers:** Use `Arc` for shared ownership across threads and `Box` for heap allocation of large structures or trait objects.
- **Lifetimes:** Name lifetimes explicitly only when the compiler cannot elide them. Prefer simple ownership models.

#### Concurrency

- **Async/Await:** Use `tokio` as the standard async runtime. Avoid blocking the executor with long-running CPU tasks (use `spawn_blocking`).
- **Sync Primitives:** Use `tokio::sync::Mutex` in async contexts instead of `std::sync::Mutex` to avoid deadlocks.

#### Safety

- **Unsafe Code:** Avoid `unsafe` unless strictly necessary for performance or FFI. Document all `unsafe` blocks with a `// SAFETY:` comment explaining why it is sound.

#### Testing

- **Unit Tests:** Place unit tests in the same file as the code using `cfg(test)` modules.
- **Integration Tests:** Place integration tests in the `tests/` directory.
- **Documentation Tests:** Use doc tests (`/// # Examples`) to keep documentation and examples in sync with the code.

#### Performance

- **Zero-Cost Abstractions:** Leverage traits and generics. Prefer `Iterators` over manual loops.
- **Allocation:** Minimize heap allocations in hot loops. Use `SmallVec` or `ArrayVec` for small fixed-size collections.

---

## 8. Spring Boot & Java Coding Standards

### Technology Stack
- **Java:** 21 (LTS)
- **Framework:** Spring Boot 4.0.x
- **Build Tool:** Gradle (Kotlin or Groovy DSL)
- **Persistence:** Spring Data JPA + Hibernate
- **Migrations:** Flyway

### Core Engineering Principles

#### Package Structure
Follow the functional grouping within modules:
`com.[company].[module].[feature]`
- `[feature].controller` - Web/API Layer
- `[feature].service` - Business Logic Layer
- `[feature].entity` - Domain Entities
- `[feature].repository` - Persistence Layer
- `[feature].dto` - Data Transfer Objects

#### Coding Standards
- **Immutability:** Prefer `record` for DTOs and configuration properties.
- **Validation:** Use `jakarta.validation` (Bean Validation) in Controllers and Entities.
- **Error Handling:** Use `@ControllerAdvice` and a global exception handler. Do not leak internal stack traces.
- **Dependency Injection:** Use Constructor Injection. Avoid `@Autowired` on fields.

#### Persistence & SQL
- **Migrations:** Use Flyway for all schema changes (`src/main/resources/db/migration`).
- **Repositories:** Use Spring Data JPA. For complex queries involving custom logic or specific Postgres features, use `@Query` with native queries or specialized Repository implementations.
- **Transactions:** Use `@Transactional` at the service layer. Keep transactions as short as possible.

#### Testing
- **JUnit 5:** Primary testing framework.
- **Testcontainers:** Use Testcontainers for integration tests involving PostgreSQL.
- **Mocking:** Use Mockito for unit tests.
- **Assertion:** Use AssertJ for fluent assertions.
- **Nomenclature:** `[ClassName]Test` for unit tests, `[ClassName]IT` or `[ClassName]E2ETest` for integration/E2E tests.

### Specific SB 4.0 Patterns
- **Auto-configuration:** Be explicit about custom configurations. Spring Boot 4 requires careful handling of auto-configuration modules (e.g., `flyway-database-postgresql`).
- **Observability:** Enable Actuator endpoints for health and metrics.

---

## 9. Next.js Engineering Standards

### Technology Stack
- **Framework:** Next.js 16+ (App Router)
- **React:** 19+
- **Language:** TypeScript
- **Styling:** Vanilla CSS / CSS Modules
- **Testing:** Vitest + React Testing Library

### Core Engineering Principles

#### Architecture: App Router
- **Server Components (RSC):** Use by default for data fetching and static content.
- **Client Components:** Use sparingly for interactivity (hooks, event listeners). Mark with `'use client'`.
- **Directory Structure:**
  - `app/` - Routing and server-side logic.
  - `components/` - Shared UI components.
  - `service/` - API clients and shared business logic.
  - `hooks/` - Reusable client-side logic.

#### Data Fetching
- **Server-side:** Fetch data directly in RSC using `async/await`.
- **Caching:** Leverage Next.js built-in `fetch` cache and `revalidate`.
- **Error Handling:** Use `error.tsx` for route-level error boundaries.

#### State Management
- **Server State:** Handled by Next.js navigation and URL params.
- **Client State:** Use React `useState`/`useContext` or specialized hooks. Avoid large global state managers if possible.

#### Testing
- **Vitest:** Primary test runner.
- **React Testing Library:** For component testing.
- **Mocks:** Use MSW (Mock Service Worker) for API mocking in tests.
- **Standards:** Test behavior, not implementation. Use accessible queries (e.g., `getByRole`).

### Component Standards
- **CSS Modules:** Use `[ComponentName].module.css` for scoped styling.
- **TypeScript:** Strict typing for props and API responses. No `any`.
- **Performance:** Optimize images using `next/image` and use appropriate loading states (`loading.tsx`).

---

## 10. React & Web Standards

### Code style

- React components should be clean and a pleasure to read.
- Do not leave comments in code. The code should be self-explanatory.
- Use a function declaration for components. Use arrow functions for everything else.
- Don't `export` things that aren't consumed outside the file.

### No inline objects/arrays/functions in the render method

Hoisting static objects, arrays, and functions to module-level constants prevents unnecessary re-renders and improves performance.

### Project organization (Front end)

- A screen or reusable component lives in its own folder: `<Name>.tsx` + `index.ts` + a styles module + `components/` + `hooks/`.
- Reusable UI used in 3+ places gets promoted to a shared `components/<name>/`.
- Navigation routes are registered in one central place.
- Genuinely cross-screen global state goes in a small global store; single-screen state stays in the screen.

### Component / UI conventions

- **Host vs simple UI.** A simple UI component renders one thing. Hosts orchestrate state.
- **Props type.** `interface Props` at the top of the component.
- **Hooks know nothing about the host.** A hook does one thing named after itself.
- **SVG icons** live in module-level constants at the bottom of the component.
- **Handler naming:** `{meaning}{event}Handler` — `registrationPressHandler`.

### Async data — three states

Any component that reads async data MUST handle three states:

1. **No data yet** (`!data`) — loader / skeleton.
2. **Error** — visible error UI with a retry path.
3. **Data loaded** — normal render.

### No dead-end screens — back must always work

The React application of **No Dead Ends & The Single Door** (`DESIGN.md`): every screen provides a way to progress or retreat, and every render branch provides a back affordance. Dead ends leave the user stranded and break the navigation harmony.

### Auth rejections must clear the session and bounce to login

When the backend signals that the caller's session is invalid, the client drops the session locally and redirects to login to preserve security integrity.

### Rules of Hooks

Call hooks at the top of the component to ensure consistent execution order. Calling hooks inside conditions, loops, or after early returns violates React's internal state management.

### useEffect

- Include every used identifier in the dep array.
- Return a cleanup function if needed.
- Avoid putting `async` directly on the effect body.

### useMemo / useCallback

Use memoization only when the value goes into another hook's dep array or a `React.memo` child needs a stable prop. Defaulting to memoization adds unnecessary complexity.

### Data client (cache + fetching)

- Mutations that affect another query MUST refetch it.
- fetchPolicy: default `cache-first`.

### Component data depth (Law of Demeter)

A component should consume data **one level deep**. Derive required flags in the host component and pass them down.

### Handler side effects must match the name (Least Astonishment)

A handler should do **only** what its name implies. Extracting teardown/cleanup logic into dedicated functions ensures predictable behavior.

### i18n

- User-facing strings reside in i18n files (`t('key')`). Hardcoding strings in JSX complicates localization and violates the content standard.
- Keys mirror the screen path: `find.proposalEmpty`.
- A key added in one locale file must be added to every other locale file to ensure complete translation.

---

## 11. Svelte Coding Standards

### Project Organization (Svelte/SvelteKit)

- **Routes (SvelteKit):** Follow the directory-based routing structure. Keep logic in `+page.server.ts` or `+page.ts` to separate data loading from presentation.
- **Components:** Organize reusable components in `$lib/components`.
- **Stores:** Place shared state in `$lib/stores`.

### Svelte Conventions

#### Reactive Declarations

- **The $ Sign:** Use `$: label` for reactive statements and derived values. Avoid overusing them; keep them focused on UI synchronization.
- **Store Access:** Use the `$` prefix (e.g., `$userStore`) to auto-subscribe and unsubscribe from stores.

#### Component Design

- **Props:** Use `export let name` for props. Provide default values where applicable.
- **Slots:** Use named slots for flexible component layouts.
- **Events:** Use `createEventDispatcher` for component communication (or `bubbles` for deep events in Svelte 4; standard DOM events in Svelte 5).

#### TypeScript

- **Strong Typing:** Use `lang="ts"` in all `<script>` tags. Define interfaces for props and complex objects.

#### Data Loading (SvelteKit)

- **Server-side Logic:** Use `load` functions in `+page.server.ts` for sensitive data or DB access.
- **Actions:** Use SvelteKit Form Actions for data mutations instead of manual `fetch` calls.

#### Performance

- **Immutable State:** When updating objects or arrays, use the spread operator (`state = [...state, newItem]`) to trigger reactivity.
- **Transitions:** Use built-in `svelte/transition` for smooth UI interactions without external libraries.

---

## 12. Vue Coding Standards

### Project Organization (Vue)

- **SFC (Single File Components):** Use `.vue` files with the `<script setup>` syntax for better composition and TypeScript support.
- **Component Structure:** Separate components into `base/` (global/UI), `features/` (domain-specific), and `views/` (pages).
- **Composables:** Extract reusable logic into `composables/` (use naming convention `use<Name>`).

### Vue Conventions

#### TypeScript Integration

- **Typed Props/Emits:** Use `defineProps<{ ... }>()` and `defineEmits<{ ... }>()` for type-safe component interfaces.
- **Reactive State:** Use `ref()` for primitive values and `reactive()` for complex objects. Prefer `ref()` for consistency.

#### State Management (Pinia)

- **Modular Stores:** Create one store per domain feature. Avoid one giant global store.
- **Getters & Actions:** Use getters for derived state and actions for mutations and async logic.

#### Routing (Vue Router)

- **Lazy Loading:** Use dynamic imports for route components to optimize bundle size.
- **Navigation Guards:** Centralize authentication and permission checks in router guards.

#### Styling

- **Scoped CSS:** Always use `<style scoped>` to prevent style leakage.
- **CSS Variables:** Use global CSS variables (design tokens) for theming and consistency.

#### Best Practices

- **v-for Keys:** Always provide a unique `:key` for `v-for` directives.
- **Template Logic:** Keep logic in templates minimal. Move complex expressions to `computed` properties.
- **Watchers:** Use `watchEffect` for simple side effects and `watch` when you need access to old/new values.

---

## 13. Flutter Coding Standards

### Project Organization

- **Folder Structure:** Use `lib/src` for implementation details. Organize by `features/` or `modules/`. Each feature contains `data/` (repositories/models), `domain/` (entities/use cases), and `presentation/` (widgets/blocs).
- **Architecture:** Prefer Clean Architecture or a simplified Layered Architecture.

### Flutter Conventions

#### State Management

- **Provider/Riverpod/Bloc:** Choose one and be consistent. For large apps, `Bloc` or `Riverpod` is preferred for explicit state transitions.
- **Immutable State:** Ensure all state classes are immutable (using `freezed` or `equatable`).

#### Widget Design

- **Composition:** Prefer composition over deep inheritance. Break down large `build` methods into smaller, reusable widgets.
- **Const Constructors:** Use `const` constructors whenever possible to improve rendering performance.

#### Navigation

- **GoRouter:** Use `go_router` for declarative, URL-based navigation, especially for web/deep-linking support.

#### Asynchronous Operations

- **Future/Stream:** Use `FutureBuilder` or `StreamBuilder` for UI-bound async data.
- **Error Handling:** Use `try-catch` blocks in repositories/services and map errors to UI-friendly messages.

#### Testing

- **Widget Tests:** Test individual components in isolation.
- **Golden Tests:** Use golden tests to prevent visual regressions.
- **Unit Tests:** Test business logic (Blocs, Services, Repositories).

#### Assets & Localization

- **Generated Code:** Use `flutter_gen` for type-safe asset access and `slang` or `easy_localization` for i18n.

---

## 14. Database Standards

Data is a sovereign domain with its own canon: **`DATABASE.md`** (SQL & NoSQL — schema control, query performance, modeling, partitioning, backup). Read it for any database or data-modeling work.

---

## 15. DevOps, CI/CD & Cloud Infrastructure

Platform and infrastructure engineering is a sovereign domain with its own canon: **`DEVOPS.md`** (IaC, GitOps, CI/CD, Docker, Kubernetes, observability, and cloud/AWS conventions). Read it for any pipeline, container, or infrastructure work.

---

## 16. QA & Testing

Quality engineering is a sovereign domain with its own canon: **`TESTING.md`** (testing pyramid; unit, integration, and E2E strategy; and Playwright automation standards). Read it for any test-strategy or test-authoring work.

---

## 17. Security

Security is a sovereign domain with its own canon: **`SECURITY.md`** (safe-by-default mindset, always/never rules, and the agnostic audit checklist) — **ACTIVE**: a non-negotiable property of every change. Read it for any auth, secrets, input-validation, or LLM-security work.
