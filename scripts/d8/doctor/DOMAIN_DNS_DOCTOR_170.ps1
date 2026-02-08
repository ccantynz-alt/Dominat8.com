Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

param(
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health"
)

Write-Host "=== DOMAIN DOCTOR ===" -ForegroundColor Cyan
$ts = [int][double]::Parse((Get-Date -UFormat %s))
$url = "https://$Domain$ProbePath?ts=$ts"

Write-Host "Probing: $url"
curl.exe -s -D - -o NUL "$url"