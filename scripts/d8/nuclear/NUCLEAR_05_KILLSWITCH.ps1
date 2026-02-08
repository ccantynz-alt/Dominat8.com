Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $KillFile = "C:\Temp\D8_CONTROL\DOMINAT8_COM_COCKPIT\KILL_SWITCH.NUCLEAR",
  [ValidateSet("ON","OFF","STATUS")] [string] $Mode = "STATUS"
)

function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }
function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }

switch ($Mode) {
  "ON" {
    New-Item -ItemType File -Path $KillFile -Force | Out-Null
    Ok ("Kill-switch ON: " + $KillFile)
  }
  "OFF" {
    if (Test-Path -LiteralPath $KillFile) { Remove-Item -LiteralPath $KillFile -Force }
    Ok ("Kill-switch OFF: " + $KillFile)
  }
  "STATUS" {
    if (Test-Path -LiteralPath $KillFile) { Warn ("Kill-switch is ON: " + $KillFile) } else { Ok ("Kill-switch is OFF: " + $KillFile) }
  }
}