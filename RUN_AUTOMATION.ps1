Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ==========================
# RUN_AUTOMATION.ps1 (Dominat8.io)
# Local build gate -> Vercel prod deploy -> probe
# ==========================

# Set this once:
$PROD_BASE_URL = "https://www.dominat8.io"

Write-Host "=== D8 Automation: START ===" -ForegroundColor Yellow
Write-Host ("Repo: " + (Get-Location).Path) -ForegroundColor Gray

if (-not (Test-Path -LiteralPath ".\node_modules")) {
  Write-Host "npm install..." -ForegroundColor Yellow
  npm install
}

Write-Host "npm run build (gate)..." -ForegroundColor Yellow
npm run build

Write-Host "Deploying to Vercel (prod)..." -ForegroundColor Yellow
vercel --prod --force

try {
  $ts = [int](Get-Date -UFormat %s)
  $url = "$PROD_BASE_URL/api/__probe__?ts=$ts"
  Write-Host ("Probing: " + $url) -ForegroundColor Yellow
  curl.exe -s -D - --max-time 20 $url | Select-Object -First 60 | Out-Host
} catch {
  Write-Host ("Probe failed (non-fatal): " + $_.Exception.Message) -ForegroundColor DarkYellow
}

Write-Host "=== D8 Automation: DONE ===" -ForegroundColor Green