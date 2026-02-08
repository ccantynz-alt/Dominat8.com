Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [switch] $SkipInstall
)

function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Fail($m){ Write-Host ("FATAL " + $m) -ForegroundColor Red; throw $m }

if (-not (Test-Path -LiteralPath $RepoRoot)) { Fail "RepoRoot missing: $RepoRoot" }

Push-Location -LiteralPath $RepoRoot
try {
  if (-not $SkipInstall) {
    if (Test-Path -LiteralPath (Join-Path $RepoRoot "package-lock.json")) {
      Info "npm ci"
      cmd /c "npm ci" | Out-Host
    } else {
      Info "npm install (no package-lock.json found)"
      cmd /c "npm install" | Out-Host
    }
  } else {
    Info "SkipInstall=1"
  }

  Info "npm run lint (if exists)"
  cmd /c "npm run -s lint" | Out-Host

  Info "npm run typecheck (if exists)"
  cmd /c "npm run -s typecheck" | Out-Host

  Info "npm test (if exists)"
  cmd /c "npm test --silent" | Out-Host

  Info "npm run build"
  cmd /c "npm run build" | Out-Host

  Ok "Quality gates OK"
} finally { Pop-Location }