Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$PROD_BASE_URL = "https://www.dominat8.io"

Write-Host "=== D8 Local Automation: START ===" -ForegroundColor Yellow
if (-not (Test-Path -LiteralPath ".\node_modules")) { npm install }
npm run build
vercel --prod --force

$ts = [int](Get-Date -UFormat %s)
curl.exe -s -D - --max-time 20 "$PROD_BASE_URL/api/__probe__?ts=$ts" | Select-Object -First 60 | Out-Host
Write-Host "=== D8 Local Automation: DONE ===" -ForegroundColor Green