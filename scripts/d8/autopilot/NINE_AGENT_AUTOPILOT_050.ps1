Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health",
  [int] $LoopSeconds = 15,
  [switch] $ApplyPatchesEachLoop,
  [switch] $PromoteWhenGreen,
  [string] $PromoteTo = "main"
)

function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }

$probe  = Join-Path $RepoRoot "scripts\d8\health_probe.ps1"
$patch  = Join-Path $RepoRoot "scripts\d8\patch\AGENT_PATCH_PIPELINE_030.ps1"
$gate   = Join-Path $RepoRoot "scripts\d8\promote\STAGING_TO_PROD_GATE_040.ps1"

if (-not (Test-Path -LiteralPath $probe)) { throw "Missing: $probe" }
if (-not (Test-Path -LiteralPath $patch)) { throw "Missing: $patch" }
if (-not (Test-Path -LiteralPath $gate))  { throw "Missing: $gate" }

Info "Autopilot 050 running..."
Info ("Probe=https://$Domain$ProbePath")
Info ("LoopSeconds=" + $LoopSeconds)
Info ("ApplyPatchesEachLoop=" + $ApplyPatchesEachLoop)
Info ("PromoteWhenGreen=" + $PromoteWhenGreen)

while ($true) {
  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $probe -Domain $Domain -ProbePath $ProbePath -TimeoutSec 20 | Out-Host
  $ok = ($LASTEXITCODE -eq 0)

  if ($ApplyPatchesEachLoop) {
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $patch -RepoRoot $RepoRoot -DeleteAfterApply | Out-Host
  }

  if ($PromoteWhenGreen -and $ok) {
    try {
      & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $gate -RepoRoot $RepoRoot -ToBranch $PromoteTo -Domain $Domain -ProbePath $ProbePath | Out-Host
    } catch {
      Warn ("Promote failed: " + $_.Exception.Message)
    }
  }

  Start-Sleep -Seconds $LoopSeconds
}