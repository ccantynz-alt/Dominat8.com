Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $Base = "main",
  [string] $Head = "",
  [string] $Title = "",
  [string] $Body = "",
  [switch] $LabelAutomerge
)

function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Fail($m){ Write-Host ("FATAL " + $m) -ForegroundColor Red; throw $m }
function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }

if (-not (Test-Path -LiteralPath $RepoRoot)) { Fail "RepoRoot missing: $RepoRoot" }

Push-Location -LiteralPath $RepoRoot
try {
  $porc = (& git status --porcelain)
  if ($porc) { Fail "Working tree not clean. Commit/stash first." }

  if (-not $Head) {
    $Head = (& git rev-parse --abbrev-ref HEAD).Trim()
  }

  if (-not $Title) {
    $Title = "promote: " + $Head + " -> " + $Base
  }

  if (-not $Body) {
    $Body = "Auto-created promote PR by cockpit rail.

Head: " + $Head + "
Base: " + $Base
  }

  Info ("Creating PR: " + $Head + " -> " + $Base)
  & gh pr create --base $Base --head $Head --title $Title --body $Body | Out-Host

  if ($LabelAutomerge) {
    Info "Applying label: automerge"
    & gh pr edit --add-label "automerge" | Out-Host
  }

  Ok "Promote PR created."
} finally { Pop-Location }