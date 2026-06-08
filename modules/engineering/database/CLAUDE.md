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
