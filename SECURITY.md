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
- **Self-Redacting Secret Types:** Wrap config secrets in a dedicated type whose `toString()` returns a redaction sentinel (e.g. `[REDACTED]`), so a secret cannot leak through a log line, stack trace, or accidental string interpolation even when the central redaction filter misses the call site. Types are exhaustive where filters are not.
- **Placeholder-Only Examples:** Committed example/sample config (`.env.example`, `*.sample`, seed fixtures) must hold only obvious placeholders — never a real key, token, or structurally-valid private key. An example file is the most-copied file in a repo: a real secret there leaks the moment the repo is published, and gets promoted to production by copy-paste. If one placeholder is real, every reviewer assumes none are.
- **DTO Projection:** Project entities to DTOs at the API edge. Never return raw DB models directly, as they may leak sensitive internal fields.
- **Least Privilege:** Give every service, process, and user the minimum permissions required to perform its task.
- **Minimize Retained Metadata:** Keep security-relevant telemetry (last-seen, activity timestamps) at the coarsest precision that still serves its purpose — e.g. day granularity with a per-principal randomized offset — so retained data cannot be repurposed into fine-grained activity tracking.
- **Fail Closed:** If a security check throws an error, the action must be rejected. Never default to "allow" on error.

**Never:**

- Disable security features (CSRF, CORS, rate limiting) "to make it work" during development.
- Bypass auth in dev/staging code paths that could be reached in prod.
- Log raw tokens, passwords, OTP codes, or PII (emails, phone numbers).
- Trust client-controlled headers for security decisions — derive the client IP from the transport layer (the socket's remote address), never from `X-Forwarded-For` or similar, for any authz or rate-limit decision.
- Disclose the existence of internal-only surface: gate internal endpoints behind a source allowlist and answer disallowed callers with `404` (not `403`), so probing cannot map the private API.
- Commit `.env` files, signing keys, or real secrets inside example/sample files (`.env.example`) to the repository.

## Threat Modeling: The Adversary Question (Design-Time)

Security starts as a question in design and discussion, not only as implementation-time hardening: **"If someone wanted to do harm — could they, and where?"** Asked before a feature is built, it surfaces the attack surface while it is still cheap to change.

This is the Mirror, not a gate (*The Law of the Name*, `GEMINI.md`): the analysis **names the holes** as facts and hands the operator/architect a map of exposure; the decision to proceed, accept the risk, or mitigate stays with the operator. Holes named early become design choices; holes found late become incidents.

For every consequential feature, ask:

- **Who is the adversary?** An outsider, another user, an insider, a compromised dependency, or the user against themselves.
- **What could they do?** Read or alter data they shouldn't, escalate privilege, exhaust resources, bypass a limit, impersonate, or exfiltrate.
- **What's the blast radius?** One record, one tenant, every user, money, reputation, or irreversible damage.
- **Where's the weakest point?** The boundary that trusts input it shouldn't, the check that can be skipped, the default that fails open.

Record the answer as a short abuse-case / threat note attached to the feature — facts for the operator, not a verdict. The note feeds directly into the audit checklist below at implementation time.

## Cryptography Standards

Cryptography is easy to call and hard to call correctly. These rules name the
safe defaults; a deviation must be justified against a named authority (NIST,
OWASP, the protocol spec) — never against convenience. The threat is silent:
broken crypto looks identical to working crypto until someone breaks it.

**Always:**

- **Authenticated encryption by default.** Use an AEAD mode — AES-256-GCM or ChaCha20-Poly1305 — so ciphertext carries its own integrity tag. Tampering must be detectable, not silent.
- **Random, unique IV/nonce per message.** Draw the IV from a CSPRNG; never reuse a `(key, nonce)` pair. The IV is not secret — store/transmit it alongside the ciphertext.
- **CSPRNG for every security value.** Keys, IVs, salts, tokens, and OTP secrets come from a cryptographically secure RNG (`crypto.randomBytes`, `SecureRandom`), never `Math.random()` / `rand()`.
- **Vetted primitives only.** bcrypt / scrypt / argon2 for passwords; HKDF for key derivation; HMAC for keyed integrity; an established library (libsodium, WebCrypto, the platform crypto module) for everything else.
- **Constant-time comparison** for secrets, MACs, and tokens (`crypto.timingSafeEqual`, `MessageDigest.isEqual`) — never `===` / `equals`, which leak length and content via timing.
- **Authenticated key wrapping.** Wrap a symmetric key with a real mechanism (RSA-OAEP, AES-KW), not raw RSA or private-key "encryption."
- **Separate keys per purpose**, externalized to env/secret manager, rotated on a schedule and on suspected exposure. Version keys so old ciphertext/tokens stay verifiable across a rotation.
- **Version stored credential hashes** with a scheme prefix (e.g. `2.<hash>`) so the KDF/algorithm can be rotated without a flag-day migration or ambiguity about how an existing hash was derived.

**Never:**

- **ECB mode.** Identical plaintext blocks yield identical ciphertext — it leaks structure and is not semantically secure. There is no safe use of ECB for confidentiality.
- **MD5 or SHA-1 for a security purpose** (integrity, signatures, fingerprints). They are broken against collisions. *If a third party's API contract forces one for interop, that is an external constraint, not your design — name it as such, don't treat it as a defect.*
- **Static or zero IVs, hardcoded keys, or keys in source** (see *Secret Management* / *Placeholder-Only Examples*).
- **Confuse signing with encrypting.** "Private-key encryption" gives integrity to anyone holding the public key — not confidentiality. Pick the property you actually need.
- **Roll your own crypto** — primitive, mode, padding, or protocol — without a published, reviewed design.

## Authentication & Abuse Hardening

- **Fail-open vs. fail-closed is an explicit per-limiter choice.** A rate limiter that fails open trades brute-force safety for availability; one that fails closed does the reverse. Make it a configuration flag, and default sensitive limiters (auth, PIN, registration, password reset) to **fail-closed**.
- **Bound the validity window of time-scoped credentials.** Reject timestamps too far in the past *or* future (not only expired) on tokens, signed URLs, and redemption codes — an unbounded window is an unbounded replay window.
- **Provide an unforgeable freeze/lock state.** On a security trigger (reglock failure, takeover signal) invalidate a credential in place with a marker that can never occur in a valid value, and disconnect live sessions — contain the account without deleting it.
- **Treat validation failures as an abuse signal.** Emit a tagged metric on every input-validation / deserialization rejection (bad encoding, invalid key, unparseable field); a flood of them is free intrusion detection.

## Security Audit Checklist (Agnostic Baseline)

This checklist serves as a standard for auditing changes.

### 1. Core Security

- **Access Control:** Is every endpoint protected by resource-level authorization?
- **Injection:** Are all database queries and shell commands parameterized?
- **Input Validation:** Is there a strict schema/type validation for all inputs?
- **Secrets:** Are there any hardcoded keys, tokens, or sensitive logs?
- **Example Hygiene:** Do committed example/sample files (`.env.example`) contain only placeholders — no real keys, tokens, or private keys?
- **Redaction:** Are sensitive fields (passwords, PII) redacted from logs and error responses?

### 2. Infrastructure & Integration

- **Secure Headers:** Are standard security headers (HSTS, CSP, etc.) configured?
- **TLS/SSL:** Is the connection encrypted? Are certificates managed correctly?
- **Dependencies:** Are third-party libraries pinned and checked for known vulnerabilities (CVEs)?
- **Rate Limiting:** Are expensive or sensitive endpoints protected from brute force or DoS? Do sensitive limiters fail **closed**?
- **Internal Surface:** Are internal-only endpoints restricted by source allowlist and hidden (`404`, not `403`) from disallowed callers?
- **Cryptography:** AEAD mode with a random per-message IV (no ECB)? CSPRNG for keys/tokens? No MD5/SHA-1 for security? Constant-time comparison for secrets/MACs?

### 3. AI & LLM Security (If applicable)

- **Prompt Injection:** Are user inputs treated as untrusted and clearly separated from system instructions?
- **Output Sanitization:** Is model output validated and sanitized before being rendered or stored?
- **Cost Control:** Are there per-user rate limits and budget caps on model calls?

---

_This checklist is intended to be expanded based on the specific technology stack used in the project._
