Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com"
)

Write-Host "=== PATCH QUEUE SUPERVISOR ===" -ForegroundColor Cyan

$queue = Join-Path $RepoRoot "patches\queue"
if (-not (Test-Path $queue)) {
  Write-Host "Queue missing"
  exit
}

$files = Get-ChildItem $queue -Filter "*.ps1"
foreach ($f in $files) {
  Write-Host "Patch:" $f.Name
}