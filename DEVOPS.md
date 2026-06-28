# DEVOPS.md — DevOps, CI/CD & Cloud Infrastructure Standards

Platform and infrastructure engineering is a sovereign domain — kept separate from the engineering canon (`CLAUDE.md`) because it is a distinct discipline and role. Read this for any pipeline, container, or infrastructure work.

## DevOps & CI/CD

### Core Principles

- **IaC (Infrastructure as Code):** Every piece of infrastructure is defined in code (Terraform, Pulumi, or K8s manifests). Manual changes via Cloud Consoles create "ghost" infrastructure, architectural drift, and lead to deployment failures as the code no longer reflects reality.
- **GitOps:** The state of the infrastructure reflects the state of the Git repository.

### CI/CD (GitHub Actions)

- **Workflow Modularity:** Use reusable workflows to avoid duplication.
- **Security:** Use OIDC for cloud provider authentication. Never use long-lived secrets/keys.
- **Validation:** Every PR must trigger linting, security scanning (Trivy, Snyk), and unit tests.
- **Version Gates:** The CI/CD pipeline must enforce that any PR with code changes bumps the project/module version. Prior to merging, the pipeline must check for version collisions with parallel merges/releases and require or automate a bump to a higher, unique value if a collision occurs. Any automated bump must be visible and finalized in the PR before merge — the operator sees and verifies the final version state before it lands (*Pull Request Versioning*, `CLAUDE.md`).
- **Post-Merge Release & Summary:** Upon merging a PR, the deployment/release workflow must display or publish a brief summary of what was done and the version containing the changes (e.g., as a GitHub Release, Slack notification, or release log).

### Stable Auto-Pipeline: Fix → Affected Tests → Merge Queue → Auto-Merge

A change should flow to a green `main` with minimal human friction and zero broken-main risk. The proven pipeline shape:

1. **Auto-fix first.** Run formatters and linters in `--fix` mode (Prettier/ESLint, `ruff --fix`, `gofmt`, etc.) and commit the fixes back to the PR automatically — via `pre-commit` locally and a CI auto-fix bot (`pre-commit.ci`, `autofix.ci`) on the PR. Bound it: one fix pass, a visible commit, never a self-triggering loop.
2. **Run only the affected tests.** Gate the PR on the minimal impacted test set (see `TESTING.md` → Test Selection), not the whole suite — the resource rule.
3. **Required checks + branch up to date.** Branch protection / ruleset requires the status checks to pass and the branch to be current with base before merge.
4. **Merge queue for the shared branch.** On busy branches, require a merge queue (GitHub `merge_group`): it tests each PR *as if already merged* with the others ahead of it and serializes the merge, so concurrent PRs can never break `main` via semantic conflicts. Required workflows MUST also trigger on the `merge_group` event, and CI capacity must account for both PR and merge-group runs.
5. **Auto-merge.** Enable auto-merge so a PR lands the instant its required checks pass and approvals are in — combined with the merge queue on high-traffic branches.

**Guardrails:** the full suite still runs nightly and pre-release (selection is never the production gate); auto-merge never bypasses required reviews or the **Version Gates** below; pin third-party actions by commit SHA.

### Local Developer Setup

The pipeline is event-driven — locally it runs through git hooks, never on system boot (boot-time execution would run with no change to test, wasting cycles). The hooks are cross-platform and run identically on **Windows, macOS, and Linux** — in any shell (PowerShell or Git Bash on Windows, bash/zsh on macOS and Linux). One-time setup per clone:

```bash
pip install pre-commit                     # all OSes; alt: brew (macOS), pipx, or the OS package manager (Linux)
pre-commit install                         # auto-fix lint/format on every commit
pre-commit install --hook-type pre-push    # run affected tests before push
```

After that it is automatic: `git commit` runs the auto-fix hooks; `git push` runs the affected-test set and blocks on red. Run manually when needed:

```bash
pre-commit run --all-files                 # fix across the whole repo
nx affected -t test                        # or: pytest --testmon / jest --changedSince=main
```

The `.pre-commit-config.yaml` and the stack-specific test-selection wiring are generated when this canon is applied to a project; each developer only runs `pre-commit install` once.

For **self-hosted CI**, install the runner **as a service** so it starts at boot and waits for jobs — **Windows:** install as a service during `config.cmd` (or the runner's service command); **Linux:** `sudo ./svc.sh install` (systemd); **macOS:** `./svc.sh install` (launchd). This runner agent is the only piece that legitimately auto-starts; the pipeline itself stays event-driven.

### Docker & Containers

- **Multi-stage Builds:** Use multi-stage builds to keep production images small and secure.
- **Base Images:** Use minimal base images (Alpine or Distroless).
- **Rootless:** Run containers as non-root users.

### Kubernetes

- **Resource Limits:** Always define `requests` and `limits` for CPU and Memory.
- **Probes:** Define `livenessProbe`, `readinessProbe`, and `startupProbe` for all deployments.
- **Config & Secrets:** Use `ConfigMaps` for configuration and `Secrets` (integrated with Vault/AWS Secrets Manager) for sensitive data.

### Observability

- **Metrics:** Expose Prometheus-compatible `/metrics` endpoints.
- **Logs:** Ensure logs are output in JSON format to stdout for easy aggregation (ELK/Loki).
- **Tracing:** Use OpenTelemetry for distributed tracing in microservices.

## Cloud & Infrastructure

### General Cloud Principles

- **Managed Services First:** Prefer managed services (RDS, SQS, S3) over self-hosting on EC2/containers.
- **Resource Tagging:** Every resource MUST have standard tags: `Project`, `Environment`, `Owner`, and `CostCenter`.
- **Least Privilege:** Apply IAM roles and policies with the minimum permissions required for the task.

### Idle Is Free — Spend Follows Demand

A deployed system at rest must draw no resources and cost nothing; spend is expended only to serve a real demand, after which the system returns to free idle. Idle is the baseline, and idle is free.

- **Scale to zero by default.** Stateless compute scales to zero when idle (serverless / `min-instances=0`). Always-warm capacity is an exception that must name its force — a real latency SLA — never a default. Warmth is paid only where a human's wait is the named cost.
- **No standing resource without a named force.** Every component that runs 24/7 — especially stateful ones (managed databases, caches, brokers) — must justify its idle cost against a named need. Prefer scale-to-zero / pay-per-use managed services (*Managed Services First*). Where a component cannot go to zero, its standing cost is named as a fact to the operator (*The Mirror of Consequences*, `CLAUDE.md`), never left as a silent drain.
- **Wake on event, not on a clock** (*Trigger over Polling*). Prefer an event/webhook that wakes the system only when real work exists over a schedule that wakes it to find nothing. A poll that finds nothing is wasted draw; if no push channel exists, poll at the lowest frequency the need tolerates.
- **Right-size and bound the blast radius.** Allocate the smallest CPU/memory that holds the load; cap maximum scale; set a budget and an alert so a runaway cannot drain spend in silence.
- **Cost is a named consequence.** Surface the cost shape — idle vs per-use, and the dominant driver — as a technical fact at design and review time. A surprise bill is a cost that was hidden.

### AWS Conventions

#### IAM & Security

- **Role-based Access:** Use IAM roles for EC2 instances and Lambda functions. Never use long-lived IAM user keys.
- **MFA:** Enforce MFA for all human users in the AWS Console.

#### Compute (Lambda/ECS)

- **Lambda Idempotency:** Ensure Lambda functions are idempotent to handle retries.
- **Ephemeral Storage:** Treat Lambda `/tmp` as temporary. Never store persistent data there.
- **Container Portability:** Keep Docker images platform-agnostic. Use environment variables for configuration.

#### Storage & Networking

- **S3 Encryption:** Always enable default encryption (AES-256) for S3 buckets.
- **Private Subnets:** Place databases and internal services in private subnets. Use NAT Gateways or VPC Endpoints for external access.
- **CDN:** Use CloudFront for static assets and global API acceleration.

#### Monitoring & Costs

- **CloudWatch:** Log everything to CloudWatch Logs with proper retention periods.
- **Budgets:** Set up AWS Budgets and CloudWatch Alarms to monitor spend.
