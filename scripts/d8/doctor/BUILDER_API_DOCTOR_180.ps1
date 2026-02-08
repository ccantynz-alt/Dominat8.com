Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

param(
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health",
  [string] $StampPath = "/api/d8/stamp"
)

Write-Host "=== BUILDER/API DOCTOR ===" -ForegroundColor Cyan

$ts = [int][double]::Parse((Get-Date -UFormat %s))

$probe = "https://$Domain$ProbePath?ts=$ts"
Write-Host "Probe:"
curl.exe -s "$probe"

Write-Host ""
Write-Host "Stamp:"
$stamp = "https://$Domain$StampPath?ts=$ts"
curl.exe -s "$stamp"