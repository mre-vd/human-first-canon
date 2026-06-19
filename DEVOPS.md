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
- **Version Gates:** The CI/CD pipeline must enforce that any PR with code changes bumps the project/module version. Prior to merging, the pipeline must check for version collisions with parallel merges/releases and require or automate a bump to a higher, unique value if a collision occurs.
- **Post-Merge Release & Summary:** Upon merging a PR, the deployment/release workflow must display or publish a brief summary of what was done and the version containing the changes (e.g., as a GitHub Release, Slack notification, or release log).

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
