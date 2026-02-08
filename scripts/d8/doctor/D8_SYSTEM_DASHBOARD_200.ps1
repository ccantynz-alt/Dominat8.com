Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health"
)

Write-Host "=== D8 SYSTEM DASHBOARD ===" -ForegroundColor Cyan

Set-Location $RepoRoot

Write-Host ""
Write-Host "Git state:" -ForegroundColor Yellow
git rev-parse --abbrev-ref HEAD
git log -1 --oneline

Write-Host ""
Write-Host "Probe:" -ForegroundColor Yellow
$ts = [int][double]::Parse((Get-Date -UFormat %s))
curl.exe -s -D - -o NUL "https://$Domain$ProbePath?ts=$ts"

Write-Host ""
Write-Host "Workflows:" -ForegroundColor Yellow
Get-ChildItem ".github\workflows" -ErrorAction SilentlyContinue