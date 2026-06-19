# SECURITY.md — Security Standards

Security is a sovereign domain — kept separate from the engineering canon (`CLAUDE.md`) because it is a distinct discipline. Read this for any auth, secrets, input-validation, or LLM-security work.

> **STATUS: ACTIVE.** Security is a non-negotiable property of every change. These rules apply to all work — validate every change against the audit checklist below before merging.

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

## Threat Modeling: The Adversary Question (Design-Time)

Security starts as a question in design and discussion, not only as implementation-time hardening: **"If someone wanted to do harm — could they, and where?"** Asked before a feature is built, it surfaces the attack surface while it is still cheap to change.

This is the Mirror, not a gate (*The Law of the Name*, `GEMINI.md`): the analysis **names the holes** as facts and hands the operator/architect a map of exposure; the decision to proceed, accept the risk, or mitigate stays with the operator. Holes named early become design choices; holes found late become incidents.

For every consequential feature, ask:

- **Who is the adversary?** An outsider, another user, an insider, a compromised dependency, or the user against themselves.
- **What could they do?** Read or alter data they shouldn't, escalate privilege, exhaust resources, bypass a limit, impersonate, or exfiltrate.
- **What's the blast radius?** One record, one tenant, every user, money, reputation, or irreversible damage.
- **Where's the weakest point?** The boundary that trusts input it shouldn't, the check that can be skipped, the default that fails open.

Record the answer as a short abuse-case / threat note attached to the feature — facts for the operator, not a verdict. The note feeds directly into the audit checklist below at implementation time.

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
