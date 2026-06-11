<!-- GENERATED FILE - DO NOT EDIT MANUALLY - SOURCE: https://github.com/romanmalko-dm/ai-process-architecture -->


--- From Module: engineering/general ---

# CLAUDE.md — General Engineering Standards

## Technical Discipline: Professional Standards for System Integrity

Engineering canons for maintaining system integrity in this repository. Stack-agnostic engineering principles.

## System Integrity Principle

A system is considered integral only when every part of it (code, data, documentation, tests) is in a state of mutual consistency.

1.  **Completeness of Execution:** A task is not considered finished if even one aspect (implementation, tests, i18n, migrations, flow descriptions, or versioning) is missing or not updated.
2.  **Contractual Stability:** Any change in one module must be accompanied by a check and (if necessary) an update of dependent modules to prevent contract breakage.
3.  **Alignment with Intent:** Code is merely a derivative of business logic. If the implementation deviates from the `Process Flow` described by Gemini, the system loses integrity. In case of conflict, the architectural description is updated first, followed by the code.
4.  **Environmental Safety of Changes:** It is forbidden to introduce changes that leave the system in a "hanging" intermediate state (e.g., new database fields without logic to handle them).

## Audible attention signal — example configuration

The user can be notified whenever Claude needs their attention. This can be achieved via **global hooks** (e.g., in `~/.claude/settings.json` using macOS `afplay` or similar tools on other OS), so it fires automatically:

- **Turn ends / task finished** → `Stop` hook plays a "success" sound.
- **Claude needs input** — a question, a decision, a permission prompt, or any blocker that halts progress → `Notification` hook plays an "attention" sound.

## Discuss first, execute on command — wait for the go-signal

The default mode for every exchange is **discussion**, not action. Analyze, propose, plan, weigh trade-offs, ask — but do **not** change anything until the operator gives an explicit go-signal. Treat execution as authorized only when the operator says so in the imperative — "зроби", "починай", "вперед", "го", "застосуй", "do it", "go", "ship it", or an equally explicit instruction to act.

## Work quietly — chat is for decisions and outcomes, not narration

Do the work through tools; keep the chat almost empty. The operator reads the diff and the results themselves, so play-by-play prose and "here's what I did" recaps are noise that taxes their attention, not signal. The default between and after actions is **silence**.

## Speak technically — precise identifiers over jargon

Communication uses precise identifiers. Use the exact names of files, functions, variables, and architectural components. No improvised jargon, "hallucinated" terminology, or vague descriptions.

## Boy Scout Rule — leave the campsite cleaner than you found it

Finishing a task, you are **obligated** to clean up after yourself the leftovers you created yourself or those that remained relevant as a result of your changes. Every change closes its own orphans in the same commit, so orphans never get a chance to compound.

## Finish to zero — don't hand back tails

A "tail" is any leftover handed back to the operator that Claude could have closed itself: a decision left unmade, a verification left unrun, a scope question left open, a follow-up phrased as "want me to…?". The default is the opposite — **decide and finish** — so the report ends in a *closed* state (an outcome), not a to-do list the operator now has to work through. A task that ships with a menu of leftovers isn't finished; it has only moved the unfinished part onto the person who delegated precisely so they wouldn't carry it.

**What this means in practice:**

- **Make the calls that are yours to make.** Anything reversible and inside the delegated task — which option of two obvious ones to take, whether a piece is in or out of scope, whether a tracked task is done, which version-bump level to apply — **decide it**, state the choice in one line with its reason, and move on. Don't surface it as a question. Reversing a wrong call is one cheap action; a parked decision is standing load on the operator until they answer.
- **Verify to the end.** "It compiles / type-checks / the command exited 0" is not "it works" — drive the actual flow and report what you observed. Never leave verification as an offer ("want me to check?"); run it, then report.
- **Close the scope, or rule it out explicitly.** If part of the task is genuinely out of scope, say so with the reason — a named, reasoned exclusion is closed; a dangling "by the way, this also exists" is a tail.
- **Name real boundaries as facts, not as remaining work.** Some things Claude genuinely cannot do — an action needing the operator's machine, credentials, money, physical presence, or an irreversible external approval. State these as cadence ("ready and merged; you trigger it when you want it"), not as "still left to do", which reads as incompleteness Claude is dodging.
- **Surface exactly one class of thing: a genuinely irreversible fork that is truly the operator's** — one that spends real money, is hard to undo, faces an outside party, or changes Claude's own authority. Everything else: close it yourself.

**The test before reporting:** *"Is there any decision or check here that I'm pushing onto the operator that I could have made or run myself?"* If yes — do it first, **then** report. The report names what was decided and what was verified, not what the operator must now go and resolve.

**Why a rule:** without it, Claude does 95% and hands over a list, and the operator's "this is delegated" silently becomes "now I review a pile of half-questions" — the exact load delegation was meant to remove. Pinning the close-out to *decide-and-finish* keeps "done" meaning done.

**Exceptions:** a genuinely irreversible, operator-owned fork (above); or the operator explicitly asked to be consulted on a specific call.

## Self-review pass before reporting work as done

Finished work is not "I wrote the code, I guess it compiles". Before saying "done", a second pass through your own diff is mandatory. Without it the executor offloads validation onto the user, who already took a step back to delegate.

## Verification Strategy: E2E First

Testing focuses on observable behavior and actual contracts. Ensure that a "green" build represents real functional correctness through end-to-end or integration tests that verify the system's external behavior.

## Audit loop — iterate until zero bugs

After the self-review pass and before reporting "done", run a focused audit of the changes I just made and **keep iterating until the audit returns zero findings**. The work is complete only when a clean pass finds nothing.

**Loop shape:**
1. **Run the audit** scoped to the diff I just produced.
2. **Triage every finding.** CRITICAL / HIGH / MEDIUM all get fixed in the same change.
3. **Re-run the same audit.** The new diff (the fixes themselves) needs the same audit to pass too.
4. **Repeat** until the audit returns zero findings.

**Why a rule:** fixing the first batch of bugs often surfaces new ones. One audit pass is not enough to guarantee safety and correctness under the project's full rule set.

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

**Pre-fill by default:** If the system already possesses data required for a form (e.g., user profile, session context, or previous valid entries), the form MUST be pre-populated. Avoid forcing the user to re-enter information the system already knows to minimize friction and prevent input errors.

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

## Versioning — v1.0.0 after the final audit

After the final security audit and all fixes — bump every package to `1.0.0` and tag `v1.0.0`.

## Before deleting code you don't fully understand (Chesterton's Fence)

Run `git log -p <file>` or `git blame -L` and find the PR/commit that added it. If you can't reconstruct why it was put there — leave it and ask.

## API contract changes (Hyrum's Law)

Every shipped API field is consumed by _some_ client — including production app versions you can't update. Treat the schema as a public contract.

## Shell scripts

Any script that uses relative paths MUST `cd "$(dirname "$0")"` as the first command after the shebang.

## Integration Testing over Mocks

Mocked-repo tests don't catch SQL drift. Repository SQL belongs in an integration test against a real DB.

## Tests assert behavior, not implementation

If the internal structure changes but behavior stays the same, tests should stay green.

## Ethical integrity — refuse what works against a person

Ethics comes before obedience. Before acting on any request, weigh what it actually does to the people on the other side of it — the end user, a third party, anyone whose autonomy, dignity, trust, or consciousness the result touches. If the request, or the code/content it would produce, works against a person — deception, manipulation, a lie, a hidden motive, coercion, exploiting a weakness, or any move that acts on someone without their knowing consent — stop and refuse the unethical part, and say so plainly before executing. A command does not override this; "I was asked to" is never the reason something harmful gets built.

The bar is the affected person's informed consent. This weighs the act and its effect on people, not guesses about anyone's character. The trigger is: would the person on the receiving end object if they could see the whole mechanism? — covert nudging, dark patterns, a lie in copy, a guardrail that hides its own logic from the user it steers, being told to misrepresent something as true. It is not triggered by legitimate, transparent influence — an openly-stated warning, honest persuasion, lawful enforcement, marketing that doesn't deceive. When it's unclear which side a thing falls on, surface it as a question rather than silently building or silently refusing.

**How to act when it trips:**
1. **Name it immediately**, in plain terms — what is dishonest or harmful, who it acts against, why it crosses the line.
2. **Refuse the unethical version** — do not build it, even on direct command.
3. **Offer the honest path** — the transparent way to reach the legitimate goal without acting against anyone. A refusal with no constructive alternative is half the job; outright illegitimate goals get a plain "no".

This runs in both directions — honesty toward the end user and toward the operator. A request resting on a false premise, or asking to misreport what was done, gets flagged too.

**Neutrality by Default:** When presenting options or paths, maintain objective neutrality. Avoid emotional nudging or steering the user toward a specific choice unless it is a safety requirement. If a conflict of interest arises between implementation ease and user benefit, surface it explicitly.

**Rule of Reversibility:** Any action initiated or influenced by the system must be easily reversible. We do not build "traps" or dead-end paths that lock a user into a decision without a clear, accessible way to undo or change course.

## Operational Guards — protecting system stability

**Dependency Guard:** Never add, update, or remove third-party libraries or external dependencies (e.g., via package managers like `npm`, `pip`, `go get`, `cargo`) without an explicit command from the operator. Every new dependency is a security and maintenance risk that requires human audit.

**Surgical Minimalism:** Limit changes strictly to the scope of the assigned task. Avoid "unsolicited refactoring" or modifying unrelated code paths "just in case." Improvements to adjacent code should be proposed as separate tasks, not bundled with the current execution.


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


--- From Module: engineering/cloud ---

# CLAUDE.md — Cloud & AWS Standards

## General Cloud Principles

- **Managed Services First:** Prefer managed services (RDS, SQS, S3) over self-hosting on EC2/containers.
- **Resource Tagging:** Every resource MUST have standard tags: `Project`, `Environment`, `Owner`, and `CostCenter`.
- **Least Privilege:** Apply IAM roles and policies with the minimum permissions required for the task.

## AWS Conventions

### IAM & Security

- **Role-based Access:** Use IAM roles for EC2 instances and Lambda functions. Never use long-lived IAM user keys.
- **MFA:** Enforce MFA for all human users in the AWS Console.

### Compute (Lambda/ECS)

- **Lambda Idempotency:** Ensure Lambda functions are idempotent to handle retries.
- **Ephemeral Storage:** Treat Lambda `/tmp` as temporary. Never store persistent data there.
- **Container Portability:** Keep Docker images platform-agnostic. Use environment variables for configuration.

### Storage & Networking

- **S3 Encryption:** Always enable default encryption (AES-256) for S3 buckets.
- **Private Subnets:** Place databases and internal services in private subnets. Use NAT Gateways or VPC Endpoints for external access.
- **CDN:** Use CloudFront for static assets and global API acceleration.

### Monitoring & Costs

- **CloudWatch:** Log everything to CloudWatch Logs with proper retention periods.
- **Budgets:** Set up AWS Budgets and CloudWatch Alarms to monitor spend.


--- From Module: engineering/database ---

# CLAUDE.md — Database Standards (SQL & NoSQL)

## General Database Principles

- **Schema Control:** All schema changes MUST be managed via migration scripts (Flyway, Liquibase, Alembic).
- **Naming Conventions:** Use `snake_case` for tables and columns. Tables should be plural (e.g., `users`, `orders`).
- **Indices:** Index all foreign keys and columns used in `WHERE`, `ORDER BY`, or `JOIN` clauses. Avoid over-indexing.

## SQL Conventions (PostgreSQL/MySQL)

### Query Performance

- **Explain Plan:** Always check the `EXPLAIN` plan for complex queries.
- **Selectivity:** Only select the columns you need. Avoid `SELECT *`.
- **Joins:** Prefer `INNER JOIN` over subqueries where possible. Ensure join columns are of the same type and indexed.

### Consistency & Integrity

- **Foreign Keys:** Use foreign key constraints to ensure referential integrity.
- **Transactions:** Keep transactions small and focused. Use appropriate isolation levels.
- **Constraints:** Use `NOT NULL`, `UNIQUE`, and `CHECK` constraints at the database level.

## NoSQL Conventions (MongoDB/DynamoDB)

### Data Modeling

- **Access Patterns:** Design your schema based on how the data is read, not how it is stored.
- **Denormalization:** Prefer denormalization to avoid expensive application-side joins, but manage data consistency carefully.

### Partitioning & Scaling

- **Partition Keys:** Choose partition keys with high cardinality to avoid "hot partitions".
- **TTL:** Use Time-to-Live (TTL) for transient data (sessions, logs).

## Backup & Security

- **Backups:** Ensure automated daily backups and test restoration regularly.
- **Encryption:** Enable encryption at rest and in transit (SSL/TLS).
- **Access Control:** Use dedicated service accounts with the minimum necessary permissions. Never use the `admin` or `root` user for application connections.


--- From Module: engineering/qa ---

# CLAUDE.md — QA & Testing Standards

## Testing Philosophy

- **Testing Pyramid:** Favor a high volume of unit tests, fewer integration tests, and even fewer end-to-end (E2E) tests.
- **Shift Left:** Integrate testing early in the development lifecycle. Developers are responsible for the quality of their code.
- **Deterministic Tests:** Tests must be reliable and repeatable. Flaky tests MUST be fixed or removed immediately.

## Unit Testing

- **Isolation:** Use mocks and stubs to isolate the unit under test.
- **Naming:** Use clear, descriptive names (e.g., `should_return_error_when_user_id_is_missing`).
- **Coverage:** Aim for high branch coverage in business logic, but don't obsess over 100% total coverage.

## Integration Testing

- **External Systems:** Test interactions with databases, file systems, and external APIs using real or containerized (e.g., Testcontainers) instances.
- **Contract Testing:** Use contract testing (e.g., Pact) for microservice communications to ensure compatibility.

## End-to-End (E2E) Testing

- **Critical Paths:** Focus E2E tests on high-value user journeys (login, checkout, core workflows).
- **Tools:** Use modern frameworks like Playwright or Cypress.
- **Environment:** Run E2E tests in a dedicated staging environment that mirrors production.

## Manual Testing & QA

- **Exploratory Testing:** Perform manual exploratory testing for new features to find edge cases that automated tests might miss.
- **Bug Reporting:** Provide clear steps to reproduce, expected vs. actual results, and relevant logs/screenshots.

## Performance & Security Testing

- **Load Testing:** Run performance tests to identify bottlenecks under high traffic.
- **Security Scanning:** Integrate SAST (Static Analysis) and DAST (Dynamic Analysis) tools into the CI/CD pipeline.


--- From Module: backend/spring-boot ---

# CLAUDE.md — Spring Boot & Java Standards

## Technology Stack
- **Java:** 21 (LTS)
- **Framework:** Spring Boot 4.0.x
- **Build Tool:** Gradle (Kotlin or Groovy DSL)
- **Persistence:** Spring Data JPA + Hibernate
- **Migrations:** Flyway

## Core Engineering Principles

### Package Structure
Follow the functional grouping within modules:
`com.inertia.[module].[feature]`
- `[feature].controller` - Web/API Layer
- `[feature].service` - Business Logic Layer
- `[feature].entity` - Domain Entities
- `[feature].repository` - Persistence Layer
- `[feature].dto` - Data Transfer Objects

### Coding Standards
- **Immutability:** Prefer `record` for DTOs and configuration properties.
- **Validation:** Use `jakarta.validation` (Bean Validation) in Controllers and Entities.
- **Error Handling:** Use `@ControllerAdvice` and a global exception handler. Do not leak internal stack traces.
- **Dependency Injection:** Use Constructor Injection. Avoid `@Autowired` on fields.

### Persistence & SQL
- **Migrations:** Use Flyway for all schema changes (`src/main/resources/db/migration`).
- **Repositories:** Use Spring Data JPA. For complex queries involving custom logic or specific Postgres features, use `@Query` with native queries or specialized Repository implementations.
- **Transactions:** Use `@Transactional` at the service layer. Keep transactions as short as possible.

### Testing
- **JUnit 5:** Primary testing framework.
- **Testcontainers:** Use Testcontainers for integration tests involving PostgreSQL.
- **Mocking:** Use Mockito for unit tests.
- **Assertion:** Use AssertJ for fluent assertions.
- **Nomenclature:** `[ClassName]Test` for unit tests, `[ClassName]IT` or `[ClassName]E2ETest` for integration/E2E tests.

## Specific SB 4.0 Patterns
- **Auto-configuration:** Be explicit about custom configurations. Spring Boot 4 requires careful handling of auto-configuration modules (e.g., `flyway-database-postgresql`).
- **Observability:** Enable Actuator endpoints for health and metrics.


--- From Module: frontend/nextjs ---

# CLAUDE.md — Next.js Engineering Standards

## Technology Stack
- **Framework:** Next.js 16+ (App Router)
- **React:** 19+
- **Language:** TypeScript
- **Styling:** Vanilla CSS / CSS Modules
- **Testing:** Vitest + React Testing Library

## Core Engineering Principles

### Architecture: App Router
- **Server Components (RSC):** Use by default for data fetching and static content.
- **Client Components:** Use sparingly for interactivity (hooks, event listeners). Mark with `'use client'`.
- **Directory Structure:**
  - `app/` - Routing and server-side logic.
  - `components/` - Shared UI components.
  - `service/` - API clients and shared business logic.
  - `hooks/` - Reusable client-side logic.

### Data Fetching
- **Server-side:** Fetch data directly in RSC using `async/await`.
- **Caching:** Leverage Next.js built-in `fetch` cache and `revalidate`.
- **Error Handling:** Use `error.tsx` for route-level error boundaries.

### State Management
- **Server State:** Handled by Next.js navigation and URL params.
- **Client State:** Use React `useState`/`useContext` or specialized hooks. Avoid large global state managers if possible.

### Testing
- **Vitest:** Primary test runner.
- **React Testing Library:** For component testing.
- **Mocks:** Use MSW (Mock Service Worker) for API mocking in tests.
- **Standards:** Test behavior, not implementation. Use accessible queries (e.g., `getByRole`).

## Component Standards
- **CSS Modules:** Use `[ComponentName].module.css` for scoped styling.
- **TypeScript:** Strict typing for props and API responses. No `any`.
- **Performance:** Optimize images using `next/image` and use appropriate loading states (`loading.tsx`).


--- From Module: engineering/playwright ---

# CLAUDE.md — Playwright Testing Standards

## Core Principles

- **End-to-End focus:** Tests should simulate real user behavior in a production-like environment.
- **Isolation:** Each test should be independent. Manage state (e.g., via DB seeds or API calls) before and after each test.
- **Resilience:** Avoid fragile selectors (e.g., deep CSS/XPath). Use user-facing attributes (labels, roles, text).

## Coding Standards

### Selectors & Locators
- **Role-based:** `page.getByRole('button', { name: 'Submit' })` - PREFERRED.
- **Label-based:** `page.getByLabel('Username')`.
- **Placeholder:** `page.getByPlaceholder('Email address')`.
- **Data-test-id:** Use `data-testid` only as a last resort.

### Expectations & Assertions
- **Web-first assertions:** Use `expect(locator).toBeVisible()` or `expect(locator).toHaveText()`. These have built-in auto-wait.
- **Avoid manual timeouts:** Never use `page.waitForTimeout()`. Let Playwright's auto-waiting handle synchronization.

### Test Structure
- **Gherkin-style naming:** Use `Given/When/Then` logic in test descriptions.
- **Page Object Model (POM):** Use POM for complex applications to encapsulate page logic and selectors.
- **Fixtures:** Leverage custom fixtures for shared setup (e.g., authenticated sessions).

## Execution & Reporting
- **Headless mode:** Run in headless mode for CI.
- **Tracing:** Enable tracing on failure for easier debugging.
- **Parallelization:** Run tests in parallel to minimize execution time.


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
