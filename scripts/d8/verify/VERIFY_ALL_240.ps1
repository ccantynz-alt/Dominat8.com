param(
  [string] $RepoRoot  = "C:\Temp\FARMS\Dominat8.com",
  [string] $Domain    = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health",
  [string] $StampPath = "/api/d8/stamp"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

function C($m){ Write-Host $m -ForegroundColor Cyan }

C "=== VERIFY ALL 240 ==="

if (-not (Test-Path -LiteralPath $RepoRoot)) { Write-Host "RepoRoot missing" -ForegroundColor Red; exit 2 }
Set-Location -LiteralPath $RepoRoot

Write-Host ""
Write-Host "Git:" -ForegroundColor Yellow
& git.exe rev-parse --abbrev-ref HEAD | Out-Host
& git.exe log -1 --oneline | Out-Host

Write-Host ""
Write-Host "Dependencies:" -ForegroundColor Yellow
@(
  "scripts\d8\health_probe.ps1",
  "scripts\d8\patch\AGENT_PATCH_PIPELINE_030.ps1",
  "scripts\d8\nuclear\NUCLEAR_01_CONTROL_PLANE_LOOP.ps1",
  "scripts\d8\verify\VERIFY_ALL_240.ps1"
) | ForEach-Object {
  $p = Join-Path $RepoRoot $_
  "{0}`t{1}" -f $_, (Test-Path -LiteralPath $p)
} | Out-Host

Write-Host ""
Write-Host "Probe headers:" -ForegroundColor Yellow
$ts = [int][double]::Parse((Get-Date -UFormat %s))
& curl.exe -s -D - -o NUL --max-time 25 -H "Cache-Control: no-cache" -H "Pragma: no-cache" ("https://{0}{1}?ts={2}" -f $Domain,$ProbePath,$ts) |
  Select-Object -First 25 | Out-Host

if ($StampPath) {
  Write-Host ""
  Write-Host "Stamp (optional):" -ForegroundColor Yellow
  try {
    & curl.exe -s --max-time 20 -H "Cache-Control: no-cache" -H "Pragma: no-cache" ("https://{0}{1}?ts={2}" -f $Domain,$StampPath,$ts) | Out-Host
  } catch {}
}

C "=== END VERIFY ==="