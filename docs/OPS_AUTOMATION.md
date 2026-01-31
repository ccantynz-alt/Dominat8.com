# Dominat8.io — Full Automation Ops

## What you have now
- GitHub Actions: push to main => build gate => deploy to Vercel production
- Probe endpoint: /api/__probe__ (no UI changes)
- Local runner: RUN_AUTOMATION.ps1

## One-time GitHub secrets to set (repo -> Settings -> Secrets and variables -> Actions)
Required:
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

Optional (recommended for probe step):
- PROD_BASE_URL   (example: https://www.dominat8.io)

## How to get Vercel IDs (local, PowerShell)
From repo root:
1) vercel login
2) vercel link
3) The file .vercel/project.json will contain orgId and projectId.

## Local one-command
powershell -NoProfile -ExecutionPolicy Bypass -File .\RUN_AUTOMATION.ps1

## CI/CD behavior
- Any push to main triggers build+deploy.
- Vercel deploy swaps to the new version when ready (near-zero downtime).