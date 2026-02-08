Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health",
  [string] $StampPath = "/api/d8/stamp",
  [int] $TimeoutSec = 25
)

function Get-Headers([string]$url){
  & curl.exe -s -D - -o NUL --max-time $TimeoutSec 
    -H "Cache-Control: no-cache" 
    -H "Pragma: no-cache" 
    "$url" 2>&1 | Out-String
}

$ts = [int][double]::Parse((Get-Date -UFormat %s))

$u1 = "https://$Domain$ProbePath?ts=$ts"
Write-Host "=== PROBE ===" -ForegroundColor Cyan
Write-Host "URL: $u1"
(Get-Headers $u1).Split("
")[0..30] -join "
" | Out-Host

if ($StampPath) {
  $u2 = "https://$Domain$StampPath?ts=$ts"
  Write-Host ""
  Write-Host "=== STAMP (optional) ===" -ForegroundColor Cyan
  Write-Host "URL: $u2"
  try {
    & curl.exe -s --max-time $TimeoutSec -H "Cache-Control: no-cache" -H "Pragma: no-cache" "$u2" | Out-Host
  } catch {
    Write-Host "STAMP call failed (okay if not installed)." -ForegroundColor Yellow
  }
}