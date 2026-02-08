# ======================================================================
# UPGRADE_2026-02-07_DOMINAT8COM_COCKPIT_FOUNDATION_001.ps1
# Cockpit foundation for Dominat8.com (repo + local watchdog)
# ======================================================================

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health",
  [string] $LocalCockpitDir = "C:\Temp\D8_CONTROL\DOMINAT8_COM_COCKPIT"
)

function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }
function Fail($m){ Write-Host ("FATAL " + $m) -ForegroundColor Red; throw $m }

function Ensure-Dir([string]$dir){
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
}

function Backup-File([string]$Path){
  if (Test-Path -LiteralPath $Path) {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item -LiteralPath $Path -Destination ($Path + ".bak." + $ts) -Force
  }
}

function Write-Utf8NoBom([string]$Path, [string]$Content){
  $enc = New-Object System.Text.UTF8Encoding($false)
  $bytes = $enc.GetBytes($Content)
  Ensure-Dir (Split-Path -Parent $Path)
  [System.IO.File]::WriteAllBytes($Path, $bytes)
}

function Write-FileSafely([string]$Path, [string]$Content){
  Backup-File $Path
  Write-Utf8NoBom -Path $Path -Content $Content
  Ok ("Wrote: " + $Path)
}

function Git([string[]]$args){
  $out = & git @args 2>&1
  return ($out | Out-String)
}

function Git-CommitIfNeeded([string]$root, [string]$message){
  Push-Location -LiteralPath $root
  try {
    $porc = (Git @("status","--porcelain")).Trim()
    if ([string]::IsNullOrWhiteSpace($porc)) {
      Warn "No changes to commit for: $message"
      return
    }
    Git @("add","-A") | Out-Null
    Git @("commit","-m",$message) | Out-Null
    Ok ("Committed: " + $message)
  } finally { Pop-Location }
}

# ---- Preconditions
if (-not (Test-Path -LiteralPath $RepoRoot)) { Fail "RepoRoot not found: $RepoRoot" }

Info "RepoRoot : $RepoRoot"
Info "Domain   : $Domain"
Info "ProbePath : $ProbePath"
Info "LocalDir  : $LocalCockpitDir"

# ---- 1) Probe script (repo)
$probePath = Join-Path $RepoRoot "scripts\d8\health_probe.ps1"
$probeScript = @"
Set-StrictMode -Version Latest
`$ErrorActionPreference = "Stop"

param(
  [string] `$Domain = "$Domain",
  [string] `$ProbePath = "$ProbePath",
  [int] `$TimeoutSec = 20
)

`$ts = [int][double]::Parse((Get-Date -UFormat %s))
`$url = "https://`$Domain`$ProbePath?ts=`$ts"

Write-Host ("URL: " + `$url)

# Headers + status line
`$out = & curl.exe -s -D - -o NUL --max-time `$TimeoutSec `
  -H "Cache-Control: no-cache" `
  -H "Pragma: no-cache" `
  "`$url" 2>&1

`$text = (`$out | Out-String)
`$first = (`$text -split "(`r`n|`n)")[0].Trim()
Write-Host `$first

if (`$first -match "HTTP/\d+\.\d+\s+(\d+)") {
  `$code = [int]`$Matches[1]
} else {
  Write-Host "UNKNOWN"
  Write-Host `$text
  exit 2
}

if (`$code -eq 200) { exit 0 }
exit 1
"@
Write-FileSafely -Path $probePath -Content $probeScript
Git-CommitIfNeeded -root $RepoRoot -message "feat(cockpit): add health probe script"

# ---- 2) Watchdog workflow (repo)
$watchdog = Join-Path $RepoRoot ".github\workflows\d8_watchdog.yml"
$watchdogYml = @"
name: D8 Watchdog (Dominat8.com)

on:
  workflow_dispatch:
  schedule:
    - cron: "*/10 * * * *"

permissions:
  contents: read

jobs:
  probe:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Probe
        shell: pwsh
        run: |
          pwsh -NoProfile -File scripts/d8/health_probe.ps1 -Domain "$Domain" -ProbePath "$ProbePath" -TimeoutSec 20
"@
Write-FileSafely -Path $watchdog -Content $watchdogYml
Git-CommitIfNeeded -root $RepoRoot -message "feat(cockpit): add watchdog workflow"

# ---- 3) Safe auto-merge workflow (repo) label: automerge
$automerge = Join-Path $RepoRoot ".github\workflows\d8_safe_auto_merge.yml"
$automergeYml = @"
name: D8 Safe Auto-Merge (label gated)

on:
  pull_request:
    types: [labeled, synchronize, reopened, ready_for_review]

permissions:
  contents: write
  pull-requests: write

jobs:
  enable_automerge:
    if: contains(github.event.pull_request.labels.*.name, 'automerge')
    runs-on: ubuntu-latest
    steps:
      - name: Enable auto-merge (squash)
        uses: peter-evans/enable-pull-request-automerge@v3
        with:
          token: \${{ secrets.GITHUB_TOKEN }}
          pull-request-number: \${{ github.event.pull_request.number }}
          merge-method: squash
"@
Write-FileSafely -Path $automerge -Content $automergeYml
Git-CommitIfNeeded -root $RepoRoot -message "feat(cockpit): add safe auto-merge workflow"

# ---- 4) Local watchdog loop (local machine)
Ensure-Dir $LocalCockpitDir
$localRunner = Join-Path $LocalCockpitDir "RUN_D8_WATCHDOG_LOCAL.ps1"
$localScript = @"
Set-StrictMode -Version Latest
`$ErrorActionPreference = "Stop"

param(
  [string] `$RepoRoot = "$RepoRoot",
  [string] `$Domain = "$Domain",
  [string] `$ProbePath = "$ProbePath",
  [int] `$EverySeconds = 15,
  [switch] `$BeepOnRed
)

function Ok(`$m){ Write-Host ("OK   " + `$m) -ForegroundColor Green }
function Warn(`$m){ Write-Host ("WARN " + `$m) -ForegroundColor Yellow }
function Info(`$m){ Write-Host ("INFO " + `$m) -ForegroundColor Gray }

`$probe = Join-Path `$RepoRoot "scripts\d8\health_probe.ps1"
if (-not (Test-Path -LiteralPath `$probe)) { throw "Missing probe script: `$probe" }

Info "Local watchdog loop running..."
Info ("Probe: https://`$Domain`$ProbePath")

while (`$true) {
  `$ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File `$probe -Domain `$Domain -ProbePath `$ProbePath -TimeoutSec 20 | Out-Host
  if (`$LASTEXITCODE -eq 0) {
    Ok ("GREEN  " + `$ts)
  } else {
    Warn ("RED    " + `$ts + " (Exit=" + `$LASTEXITCODE + ")")
    if (`$BeepOnRed) { [console]::Beep(880,200); Start-Sleep -Milliseconds 75; [console]::Beep(660,200) }
  }
  Start-Sleep -Seconds `$EverySeconds
}
"@
Write-FileSafely -Path $localRunner -Content $localScript
Ok "Local watchdog installed"

Write-Host ""
Write-Host "================= NEXT ACTIONS =================" -ForegroundColor Cyan
Write-Host "1) Push branch so workflows exist on GitHub:" -ForegroundColor Yellow
Write-Host '   git push -u origin HEAD' -ForegroundColor Green
Write-Host ""
Write-Host "2) Run probe locally:" -ForegroundColor Yellow
Write-Host ('   powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\d8\health_probe.ps1" -Domain "'+$Domain+'" -ProbePath "'+$ProbePath+'"') -ForegroundColor Green
Write-Host ""
Write-Host "3) Start local watchdog:" -ForegroundColor Yellow
Write-Host ('   powershell -NoProfile -ExecutionPolicy Bypass -File "'+$localRunner+'"'+' -EverySeconds 15 -BeepOnRed') -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
