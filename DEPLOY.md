# Deploy — Nature-Preserving Audit (Google Cloud Run)

One container serves the static frontend (`docs/`) **and** the minimal backend
(`server/`). The Claude key and the Gmail credentials live **only** as server
secrets — never in the repo, never in the frontend.

## Where your token goes

Your Claude key (`ANTHROPIC_API_KEY`) is a **Cloud Run secret/env var**, set at
deploy time (below). For local testing it goes in `server/.env` (git-ignored).
It is never committed and never sent to the browser.

## Prerequisites

```sh
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
gcloud services enable run.googleapis.com cloudbuild.googleapis.com secretmanager.googleapis.com
```

## Secrets (Secret Manager)

```sh
printf '%s' 'sk-ant-...'      | gcloud secrets create nature-audit-anthropic-key --data-file=-
printf '%s' 'github_pat_...'  | gcloud secrets create nature-audit-github-token  --data-file=-
```

`nature-audit-github-token` is a **fine-grained GitHub PAT** scoped to
`malkoromanievgenovich/human-first-canon` with **Contents: Read & write** and
**Pull requests: Read & write**. It opens suggestion PRs; you review and merge.

## Deploy (from the repo root)

```sh
gcloud run deploy nature-audit \
  --source . \
  --region europe-central2 \
  --allow-unauthenticated \
  --cpu 1 --memory 512Mi \
  --min-instances 0 --max-instances 3 \
  --concurrency 40 \
  --set-secrets ANTHROPIC_API_KEY=nature-audit-anthropic-key:latest,GITHUB_TOKEN=nature-audit-github-token:latest \
  --set-env-vars GITHUB_REPO=malkoromanievgenovich/human-first-canon,GITHUB_BASE=main
```

`--min-instances 0` is the minimal tariff: it scales to zero, so idle ≈ $0 — you
pay only while requests run. First request after idle has a cold start (a few
seconds). The build uses the root `Dockerfile`.

## Local run

```sh
cd server && npm install && cp .env.example .env   # fill in real values in .env
node --env-file=.env server.mjs                    # http://localhost:8080
```

## Open issue to harden (named, not hidden)

`/api/audit` is a public endpoint that spends **your** Claude key. The in-memory
per-IP rate limit (`server.mjs`) is best-effort and resets per instance — it
does not stop determined abuse. Before sharing the URL widely, add a real gate:
Cloud Run min-instances + a CAPTCHA/Turnstile on the frontend, a shared-secret
header, or Cloud Armor. Same applies to `/api/feedback` (lower limit already).
