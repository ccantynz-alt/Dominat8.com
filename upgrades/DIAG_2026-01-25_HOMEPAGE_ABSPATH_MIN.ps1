$ErrorActionPreference = "Stop"

function Find-RepoRoot {
  param([string]$StartDir)
  $d = (Resolve-Path -LiteralPath $StartDir).Path
  for ($i=0; $i -lt 30; $i++) {
    if (Test-Path -LiteralPath (Join-Path $d "package.json")) { return $d }
    if (Test-Path -LiteralPath (Join-Path $d ".git"))        { return $d }
    $parent = Split-Path -Parent $d
    if ($parent -eq $d -or [string]::IsNullOrWhiteSpace($parent)) { break }
    $d = $parent
  }
  throw "Could not find repo root (no package.json or .git found) starting from: $StartDir"
}

Write-Host "== DIAG: Absolute Path Minimal ==" -ForegroundColor Cyan
Write-Host ("PWD:    " + (Get-Location).Path)
Write-Host ("ROOT?:  " + $PSScriptRoot)

$RepoRoot = Find-RepoRoot -StartDir $PSScriptRoot
Write-Host ("RepoRoot: " + $RepoRoot) -ForegroundColor Green

$UpgradesDir = Join-Path $RepoRoot "upgrades"
$PagePath    = Join-Path $RepoRoot "src\app\page.tsx"
$WriteTest   = Join-Path $UpgradesDir "_diag_write_test.txt"

Write-Host ""
Write-Host ("UpgradesDir: " + $UpgradesDir)
Write-Host ("PagePath:    " + $PagePath)

Write-Host ""
Write-Host "== 1) WRITE TEST ==" -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $UpgradesDir | Out-Null
$stamp = "DIAG_WRITE_OK " + (Get-Date).ToString("s") + "Z"
Set-Content -LiteralPath $WriteTest -Value $stamp -Encoding UTF8
if (!(Test-Path -LiteralPath $WriteTest)) { throw "WRITE TEST FAILED: $WriteTest was not created." }
Write-Host ("WROTE: " + $WriteTest) -ForegroundColor Green
Write-Host ("VALUE: " + (Get-Content -LiteralPath $WriteTest -TotalCount 1))

Write-Host ""
Write-Host "== 2) PAGE EXISTS + QUICK READ ==" -ForegroundColor Yellow
if (!(Test-Path -LiteralPath $PagePath)) { throw "MISSING: $PagePath" }
Write-Host ("FOUND: " + $PagePath) -ForegroundColor Green

Write-Host ""
Write-Host "Top of src\app\page.tsx (first 20 lines):" -ForegroundColor Cyan
(Get-Content -LiteralPath $PagePath -TotalCount 20) | ForEach-Object { Write-Host $_ }

Write-Host ""
Write-Host "== 3) MARKER SCAN ==" -ForegroundColor Yellow
$all = Get-Content -LiteralPath $PagePath -Raw -Encoding UTF8
$markers = @("HOME_OK","LIVE_OK","Flagship v4","Hero System v6","V6_HERO_SYSTEM_")
foreach ($m in $markers) { Write-Host ("Marker [" + $m + "]: " + $all.Contains($m)) }

Write-Host ""
Write-Host "== 4) LIVE CHECK (Host header) ==" -ForegroundColor Yellow
$Domain = "www.dominat8.com"
$Base   = "https://my-saas-app-5eyw.vercel.app"
$Ts     = [int][double]::Parse((Get-Date -UFormat %s))

try {
  $html = & curl.exe -s -H "Host: $Domain" "$Base/?ts=$Ts"
  if ($LASTEXITCODE -ne 0) { throw "curl.exe failed with exit code $LASTEXITCODE" }
  Write-Host ("LIVE fetch OK. length=" + $html.Length) -ForegroundColor Green
  foreach ($m in @("HOME_OK","LIVE_OK","Flagship v4","Hero System v6","V6_HERO_SYSTEM_")) {
    Write-Host ("LIVE contains [" + $m + "]: " + $html.Contains($m))
  }
} catch {
  Write-Host ("LIVE check failed/skipped: " + $_.Exception.Message) -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "== DIAG COMPLETE ==" -ForegroundColor Cyan
