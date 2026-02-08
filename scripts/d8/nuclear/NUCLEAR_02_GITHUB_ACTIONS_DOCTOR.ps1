Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [int] $Limit = 15,
  [switch] $RerunFailed
)

function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }
function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "gh CLI missing. Install GitHub CLI + run: gh auth login"
}

Push-Location -LiteralPath $RepoRoot
try {
  & gh auth status | Out-Host
  Info "Recent runs:"
  & gh run list --limit $Limit | Out-Host

  Info "Failed runs:"
  $failed = & gh run list --limit $Limit --json databaseId,conclusion,displayTitle,status,createdAt --jq ".[] | select(.conclusion==\"failure\") | .databaseId"
  if (-not $failed) {
    Ok "No failed runs in recent history."
    exit 0
  }

  $ids = ($failed | Out-String).Trim() -split "(
|
)" | Where-Object { $_ }
  Warn ("Failed run IDs: " + ($ids -join ", "))

  if ($RerunFailed) {
    foreach ($id in $ids) {
      Warn ("Re-running failed run: " + $id)
      & gh run rerun $id | Out-Host
    }
  }

  # Evidence bundle (quick)
  $eDir = Join-Path $RepoRoot ("evidence\GHA_DOCTOR_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
  New-Item -ItemType Directory -Path $eDir -Force | Out-Null
  (& gh run list --limit $Limit) | Set-Content -LiteralPath (Join-Path $eDir "runs.txt") -Encoding UTF8
  Ok ("Evidence: " + $eDir)
} finally { Pop-Location }