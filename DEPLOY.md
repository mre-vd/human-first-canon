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

## Secrets (recommended — Secret Manager, not plain env vars)

```sh
printf '%s' 'sk-ant-...'              | gcloud secrets create anthropic-key   --data-file=-
printf '%s' 'roman.malko@gmail.com'   | gcloud secrets create gmail-user      --data-file=-
printf '%s' 'xxxxxxxxxxxxxxxx'        | gcloud secrets create gmail-app-pass   --data-file=-
```

`gmail-app-pass` is a 16-char **Google App Password** (Google Account → Security
→ 2-Step Verification → App passwords), not your Gmail login.

## Deploy (from the repo root)

```sh
gcloud run deploy nature-audit \
  --source . \
  --region europe-central2 \
  --allow-unauthenticated \
  --cpu 1 --memory 512Mi \
  --min-instances 0 --max-instances 3 \
  --concurrency 40 \
  --set-secrets ANTHROPIC_API_KEY=anthropic-key:latest,GMAIL_USER=gmail-user:latest,GMAIL_APP_PASSWORD=gmail-app-pass:latest \
  --set-env-vars FEEDBACK_TO=roman.malko@gmail.com
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
