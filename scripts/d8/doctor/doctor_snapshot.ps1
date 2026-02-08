Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $OutDir = ""
)

function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }

if (-not $OutDir) {
  $OutDir = Join-Path $RepoRoot ("evidence\D8_SNAPSHOT_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
}

New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
Info ("OutDir=" + $OutDir)

Push-Location -LiteralPath $RepoRoot
try {
  # Core git state
  (& git rev-parse --abbrev-ref HEAD) | Set-Content -LiteralPath (Join-Path $OutDir "branch.txt") -Encoding UTF8
  (& git log -5 --oneline) | Set-Content -LiteralPath (Join-Path $OutDir "git_log_5.txt") -Encoding UTF8
  (& git status --porcelain) | Set-Content -LiteralPath (Join-Path $OutDir "git_status_porcelain.txt") -Encoding UTF8

  # Key files existence
  $checks = @(
    ".github/workflows/d8_watchdog.yml",
    ".github/workflows/d8_safe_auto_merge.yml",
    ".github/workflows/d8_protected_paths_guardrail.yml",
    ".github/workflows/d8_quality_gates.yml",
    "scripts/d8/health_probe.ps1",
    "scripts/d8/gates/run_quality_gates.ps1",
    "scripts/d8/guardrails/check_protected_paths.ps1"
  )

  $lines = foreach ($c in $checks) {
    $p = Join-Path $RepoRoot $c
    "{0}	{1}" -f $c, (Test-Path -LiteralPath $p)
  }

  $lines | Set-Content -LiteralPath (Join-Path $OutDir "existence_checks.txt") -Encoding UTF8

  Ok "Snapshot created."
  Write-Host ("SNAPSHOT_DIR: " + $OutDir) -ForegroundColor Cyan
} finally { Pop-Location }