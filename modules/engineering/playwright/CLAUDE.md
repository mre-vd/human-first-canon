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
