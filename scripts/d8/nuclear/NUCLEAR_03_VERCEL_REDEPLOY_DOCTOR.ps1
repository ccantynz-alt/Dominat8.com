Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "/api/d8/health",
  [string] $StampPath = "/api/d8/stamp",
  [switch] $Prod,
  [switch] $Force
)

function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }

if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
  throw "vercel CLI missing. Install it and login: vercel login"
}

Push-Location -LiteralPath $RepoRoot
try {
  Info "Deploying with Vercel CLI..."
  if ($Prod) {
    if ($Force) { cmd /c "vercel --prod --force" | Out-Host } else { cmd /c "vercel --prod" | Out-Host }
  } else {
    if ($Force) { cmd /c "vercel --force" | Out-Host } else { cmd /c "vercel" | Out-Host }
  }

  # Verify probe
  $ts = [int][double]::Parse((Get-Date -UFormat %s))
  $u = "https://$Domain$ProbePath?ts=$ts"
  Info ("Verify probe: " + $u)
  & curl.exe -s -D - -o NUL --max-time 25 -H "Cache-Control: no-cache" -H "Pragma: no-cache" $u | Select-Object -First 25 | Out-Host

  if ($StampPath) {
    try {
      $u2 = "https://$Domain$StampPath?ts=$ts"
      Info ("Verify stamp: " + $u2)
      & curl.exe -s --max-time 20 -H "Cache-Control: no-cache" -H "Pragma: no-cache" $u2 | Out-Host
    } catch { Warn "Stamp check failed (ok if not installed)." }
  }

  Ok "Vercel redeploy doctor finished."
} finally { Pop-Location }