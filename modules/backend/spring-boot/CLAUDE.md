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
