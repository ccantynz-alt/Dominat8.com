param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [switch] $IncludeBuild,
  [switch] $CiClean
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }
function Fail($m){ Write-Host ("FATAL " + $m) -ForegroundColor Red; throw $m }

if (-not (Test-Path -LiteralPath $RepoRoot)) { Fail "RepoRoot missing: $RepoRoot" }
Set-Location -LiteralPath $RepoRoot

$pkg = Join-Path $RepoRoot "package.json"
if (-not (Test-Path -LiteralPath $pkg)) { Warn "No package.json. Gates skipped."; exit 0 }

if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Fail "node not found on PATH." }
if (-not (Get-Command npm  -ErrorAction SilentlyContinue)) { Fail "npm not found on PATH." }

if ($CiClean) {
  # Optional: reset node_modules (use sparingly; it's slow)
  if (Test-Path -LiteralPath (Join-Path $RepoRoot "node_modules")) {
    Warn "Removing node_modules (CiClean)..."
    Remove-Item -LiteralPath (Join-Path $RepoRoot "node_modules") -Recurse -Force
  }
}

# install deps (prefer npm ci when lockfile exists)
$hasLock = (Test-Path -LiteralPath (Join-Path $RepoRoot "package-lock.json"))
Info ("Installing deps: " + ($(if ($hasLock) { "npm ci" } else { "npm install" })))
if ($hasLock) { & npm ci | Out-Host } else { & npm install | Out-Host }

# Detect scripts
$detect = @"
const fs=require('fs');
const p=JSON.parse(fs.readFileSync('package.json','utf8'));
const s=(p.scripts||{});
const has=(k)=>Object.prototype.hasOwnProperty.call(s,k);
console.log(JSON.stringify({
  typecheck: has('typecheck') || has('tsc'),
  lint: has('lint'),
  test: has('test'),
  build: has('build')
}));
"@
$json = & node -e $detect 2>$null
if (-not $json) { Fail "Failed to read package.json scripts via node." }
$flags = $json | ConvertFrom-Json

# Run gates in fast order
if ($flags.typecheck) {
  if ((& npm run --silent typecheck 2>$null) -or $LASTEXITCODE -ne 0) {
    # if typecheck missing but tsc exists, try tsc
    if ($LASTEXITCODE -ne 0) { Fail "typecheck failed." }
  } else { Ok "typecheck ok" }
} else { Warn "typecheck script not found; skipping." }

if ($flags.lint) {
  & npm run lint | Out-Host
  if ($LASTEXITCODE -ne 0) { Fail "lint failed." }
  Ok "lint ok"
} else { Warn "lint script not found; skipping." }

if ($flags.test) {
  & npm test | Out-Host
  if ($LASTEXITCODE -ne 0) { Fail "test failed." }
  Ok "test ok"
} else { Warn "test script not found; skipping." }

if ($IncludeBuild) {
  if ($flags.build) {
    & npm run build | Out-Host
    if ($LASTEXITCODE -ne 0) { Fail "build failed." }
    Ok "build ok"
  } else { Warn "build script not found; skipping." }
} else {
  Info "IncludeBuild not set; skipping build."
}

Ok "QUALITY GATES PASS"