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
