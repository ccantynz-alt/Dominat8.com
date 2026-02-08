Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $FromBranch = "",
  [string] $ToBranch = "main",
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health"
)

function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Fail($m){ Write-Host ("FATAL " + $m) -ForegroundColor Red; throw $m }

Push-Location -LiteralPath $RepoRoot
try {
  if (-not $FromBranch) { $FromBranch = (git rev-parse --abbrev-ref HEAD).Trim() }

  $porc = (git status --porcelain)
  if ($porc) { Fail "Working tree not clean. Commit/stash first." }

  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File "scripts\d8\health_probe.ps1" -Domain $Domain -ProbePath $ProbePath -TimeoutSec 20 | Out-Host
  if ($LASTEXITCODE -ne 0) { Fail "Probe not green. Refusing promote." }

  Info ("Promoting " + $FromBranch + " -> " + $ToBranch)

  git fetch origin | Out-Null
  git checkout $ToBranch | Out-Null
  git pull origin $ToBranch | Out-Null
  git merge --no-ff $FromBranch -m ("promote(next5-040): " + $FromBranch + " -> " + $ToBranch) | Out-Null
  git push origin $ToBranch | Out-Null

  Ok ("Promoted to " + $ToBranch)
} finally { Pop-Location }