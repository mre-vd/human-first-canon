# TESTING.md — QA & Testing Standards

Quality engineering is a sovereign domain — kept separate from the engineering canon (`CLAUDE.md`) because it is a distinct discipline and role. Read this for any test-strategy or test-authoring work.

## QA & Testing

### Testing Philosophy

- **Testing Pyramid:** Favor a high volume of unit tests, fewer integration tests, and even fewer end-to-end (E2E) tests.
- **Shift Left:** Integrate testing early in the development lifecycle. Developers are responsible for the quality of their code.
- **Deterministic Tests:** Tests must be reliable and repeatable. Flaky tests MUST be fixed or removed immediately.

### Unit Testing

- **Isolation:** Use mocks and stubs to isolate the unit under test.
- **Naming:** Use clear, descriptive names (e.g., `should_return_error_when_user_id_is_missing`).
- **Coverage:** Aim for high branch coverage in business logic, but don't obsess over 100% total coverage.

### Integration Testing

- **External Systems:** Test interactions with databases, file systems, and external APIs using real or containerized (e.g., Testcontainers) instances.
- **Contract Testing:** Use contract testing (e.g., Pact) for microservice communications to ensure compatibility.

### End-to-End (E2E) Testing

- **Critical Paths:** Focus E2E tests on high-value user journeys (login, checkout, core workflows).
- **Tools:** Use modern frameworks like Playwright or Cypress.
- **Environment:** Run E2E tests in a dedicated staging environment that mirrors production.

### Manual Testing & QA

- **Exploratory Testing:** Perform manual exploratory testing for new features to find edge cases that automated tests might miss.
- **Bug Reporting:** Provide clear steps to reproduce, expected vs. actual results, and relevant logs/screenshots.

### Performance & Security Testing

- **Load Testing:** Run performance tests to identify bottlenecks under high traffic.
- **Security Scanning:** Integrate SAST (Static Analysis) and DAST (Dynamic Analysis) tools into the CI/CD pipeline.

## Test Selection (Run Only What the Change Needs)

The resource rule applied to testing — the engineering face of *Operational Rest / Zero-Active Waste* (`PRINCIPLES.md`): a change runs **only the tests reachable from it**, not the whole suite. Energy is spent only where the change can actually break something.

- **The canon says "tests"; the project names its suites.** This rule governs test *selection*, not test *kinds*. The gate is the same everywhere — "run the affected tests, keep a full nightly" — while *which* suites exist and how each maps to a change is bound per project (Mirror of Bindings, `PRINCIPLES.md`). A project declares its own suites — unit, integration, component, browser E2E (e.g. Playwright), desktop E2E (e.g. Tauri / WebDriver), load — and wires each into the affected-set computation. The tool names below are illustrative, not mandates.
- **Affected-only execution.** Determine the minimal set of tests impacted by a diff and run just those. Three proven approaches — pick what fits the stack:
  - *Build-graph based* — derive affected targets from the dependency graph: `nx affected`, Bazel (`bazel test` over `rdeps`), Turborepo (`--filter=...[origin/main]`) with remote caching.
  - *Coverage-mapped (Test Impact Analysis)* — map each test to the lines it covers, then select tests whose covered lines changed: Datadog TIA, Azure DevOps TIA, `pytest-testmon`, Jest `--changedSince`.
  - *Predictive* — a model trained on past code-change/test-outcome pairs selects the tests most likely to fail (e.g., Develocity Predictive Test Selection).
- **Always keep a full-suite safety net.** Selection can miss (imperfect mappings, non-code dependencies, config/data changes). Run the **entire** suite on a schedule (nightly) and before any release/tag — never let selection be the only gate to production.
- **Cache and parallelize.** Cache build and test results so unchanged work is never re-run; shard the selected tests across runners for wall-clock speed.
- **Selection demands determinism.** Affected-test selection is only trustworthy if tests are isolated and deterministic — see Flakiness below.

## Flakiness & Test Stability

A selective pipeline that auto-merges is only safe if a green result is *trustworthy*. Flaky tests destroy that trust (Atlassian reports ~150k developer-hours/year lost to flakiness across its org).

- **Detect, don't ignore.** Flag a test flaky when it both passes and fails on the same commit (rerun 20–50×) or when its rolling failure rate exceeds ~2% over a 14-day window.
- **Quarantine with a strict SLA.** A test that flakes on the default branch is auto-quarantined (excluded from the merge gate) but **immediately ticketed with an owner**: fix or delete within one sprint. Cap quarantine at ≤5% of the suite with a hard time limit (e.g., 30 days) — quarantine is a temporary state, never a graveyard.
- **No silent retries.** Auto-retry is allowed only with full visibility — every retry is recorded and surfaced. A test that quietly passes on attempt 2 while nobody learns it flaked is an anti-pattern that hides real instability.
- **Determinism is mandatory.** Isolate state (fresh fixtures/containers per test), control time and randomness, allow no inter-test ordering dependencies, and share no mutable external state.

## Playwright Automated Testing

### Core Principles

- **End-to-End focus:** Tests should simulate real user behavior in a production-like environment.
- **Isolation:** Each test should be independent. Manage state (e.g., via DB seeds or API calls) before and after each test.
- **Resilience:** Avoid fragile selectors (e.g., deep CSS/XPath). Use user-facing attributes (labels, roles, text).

### Coding Standards

#### Selectors & Locators
- **Role-based:** `page.getByRole('button', { name: 'Submit' })` - PREFERRED.
- **Label-based:** `page.getByLabel('Username')`.
- **Placeholder:** `page.getByPlaceholder('Email address')`.
- **Data-test-id:** Use `data-testid` only as a last resort.

#### Expectations & Assertions
- **Web-first assertions:** Use `expect(locator).toBeVisible()` or `expect(locator).toHaveText()`. These have built-in auto-wait.
- **Avoid manual timeouts:** Never use `page.waitForTimeout()`. Let Playwright's auto-waiting handle synchronization.

#### Test Structure
- **Gherkin-style naming:** Use `Given/When/Then` logic in test descriptions.
- **Page Object Model (POM):** Use POM for complex applications to encapsulate page logic and selectors.
- **Fixtures:** Leverage custom fixtures for shared setup (e.g., authenticated sessions).

### Execution & Reporting
- **Headless mode:** Run in headless mode for CI.
- **Tracing:** Enable tracing on failure for easier debugging.
- **Parallelization:** Run tests in parallel to minimize execution time.
