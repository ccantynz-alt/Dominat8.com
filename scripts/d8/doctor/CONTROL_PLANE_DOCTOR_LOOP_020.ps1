Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health",
  [int] $EverySeconds = 15,
  [switch] $BeepOnRed
)

function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }
function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }

$probe = Join-Path $RepoRoot "scripts\d8\health_probe.ps1"
if (-not (Test-Path -LiteralPath $probe)) { throw "Missing probe: $probe" }

Info "Doctor loop running..."
Info ("Probe: https://$Domain$ProbePath")
Info ("EverySeconds=" + $EverySeconds)

while ($true) {
  $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $probe -Domain $Domain -ProbePath $ProbePath -TimeoutSec 20 | Out-Host
  if ($LASTEXITCODE -eq 0) {
    Ok ("GREEN  " + $ts)
  } else {
    Warn ("RED    " + $ts + " (Exit=" + $LASTEXITCODE + ")")
    if ($BeepOnRed) { [console]::Beep(880,200); Start-Sleep -Milliseconds 75; [console]::Beep(660,200) }
  }
  Start-Sleep -Seconds $EverySeconds
}