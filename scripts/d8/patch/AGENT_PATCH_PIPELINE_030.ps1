Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $QueueDir = "",
  [switch] $DeleteAfterApply
)

function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }

if (-not $QueueDir) { $QueueDir = Join-Path $RepoRoot "patches\queue" }
if (-not (Test-Path -LiteralPath $QueueDir)) { New-Item -ItemType Directory -Path $QueueDir -Force | Out-Null }

Info ("QueueDir=" + $QueueDir)

$patches = Get-ChildItem -LiteralPath $QueueDir -Filter "*.ps1" -File | Sort-Object Name
if (-not $patches -or $patches.Count -eq 0) { Ok "No queued patches."; exit 0 }

foreach ($p in $patches) {
  Info ("Applying: " + $p.Name)
  try {
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $p.FullName -RepoRoot $RepoRoot | Out-Host
    Ok ("Applied: " + $p.Name)

    if ($DeleteAfterApply) {
      Remove-Item -LiteralPath $p.FullName -Force
      Ok ("Deleted: " + $p.Name)
    } else {
      # move to applied
      $appliedDir = Join-Path $QueueDir "..\applied"
      New-Item -ItemType Directory -Path $appliedDir -Force | Out-Null
      Move-Item -LiteralPath $p.FullName -Destination (Join-Path $appliedDir ($p.Name + ".applied." + (Get-Date -Format "yyyyMMdd_HHmmss"))) -Force
      Ok ("Archived: " + $p.Name)
    }
  } catch {
    Warn ("Patch FAILED: " + $p.Name)
    Warn ("Error: " + $_.Exception.Message)

    # quarantine
    $badDir = Join-Path $QueueDir "..\bad"
    New-Item -ItemType Directory -Path $badDir -Force | Out-Null
    Move-Item -LiteralPath $p.FullName -Destination (Join-Path $badDir ($p.Name + ".bad." + (Get-Date -Format "yyyyMMdd_HHmmss"))) -Force
    Warn ("Quarantined: " + $p.Name)
    exit 2
  }
}

Ok "Patch pipeline finished."