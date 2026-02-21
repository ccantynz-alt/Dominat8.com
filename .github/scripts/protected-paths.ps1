Set-StrictMode -Version Latest
$ErrorActionPreference="Stop"

param(
  [string]$BaseRef = "origin/main",
  [string]$HeadRef = "HEAD",
  [string]$ConfigPath = ".github/protected-paths.json",
  [string]$AllowFile = ".github/ALLOW_PROTECTED_PATHS",
  [string]$PrLabels = "",
  [string]$RequireLabel = ""
)

function Fail([string]$m){ Write-Host $m -ForegroundColor Red; exit 1 }
function Info([string]$m){ Write-Host $m -ForegroundColor Cyan }

if (-not (Test-Path -LiteralPath $ConfigPath)) { Fail "Missing config: $ConfigPath" }
$cfg = Get-Content -LiteralPath $ConfigPath -Raw | ConvertFrom-Json

$protected = @()
foreach($p in $cfg.protectedPaths){ if($p){ $protected += [string]$p } }

# fetch base if needed
try { git fetch --no-tags --prune --depth=50 origin +refs/heads/main:refs/remotes/origin/main | Out-Null } catch {}

# list changed files
$changed = @(git diff --name-only "$BaseRef...$HeadRef" 2>$null)
if ($changed.Count -eq 0) {
  Info "No changed files."
  exit 0
}

# allow override if file exists
if (Test-Path -LiteralPath $AllowFile) {
  Info "ALLOW file present ($AllowFile). Protected paths check overridden."
  exit 0
}

# allow override if label present
$allowLabel = if ($RequireLabel) { $RequireLabel } else { [string]$cfg.allowLabel }
if ($allowLabel -and $PrLabels -match [Regex]::Escape($allowLabel)) {
  Info "Override label present ($allowLabel). Protected paths check overridden."
  exit 0
}

$hits = New-Object System.Collections.Generic.List[string]
foreach($f in $changed){
  foreach($p in $protected){
    if ($p.EndsWith("/")) {
      if ($f -like "$p*") { $hits.Add($f); break }
    } else {
      if ($f -eq $p) { $hits.Add($f); break }
    }
  }
}

if ($hits.Count -gt 0) {
  Write-Host ""
  Write-Host "Protected paths were modified:" -ForegroundColor Yellow
  $hits | Sort-Object -Unique | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
  Write-Host ""
  Fail ([string]$cfg.message)
}

Info "Protected paths check OK."
exit 0
