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
