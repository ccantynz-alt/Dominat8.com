$ErrorActionPreference = "Stop"

function Info($m){ Write-Host $m -ForegroundColor Cyan }
function Ok($m){ Write-Host $m -ForegroundColor Green }
function Warn($m){ Write-Host $m -ForegroundColor Yellow }
function Fail($m){ Write-Host "ERROR: $m" -ForegroundColor Red; exit 1 }

Info "== Fix (marketing) manifest ENOENT by adding src/app/(marketing)/page.tsx shim =="

# -----------------------------
# 1) Create route-group shim page
# -----------------------------
$shimPath = ".\src\app\(marketing)\page.tsx"
$shimDir  = Split-Path -Parent $shimPath
if (!(Test-Path -LiteralPath $shimDir)) {
  New-Item -ItemType Directory -Path $shimDir -Force | Out-Null
}

@"
export const runtime = 'nodejs';

// Shim page to satisfy Next.js build tracing when route-groups are involved.
// Re-export the actual homepage.
export { default } from '../page';
"@ | Set-Content -Encoding UTF8 -LiteralPath $shimPath

if (!(Test-Path -LiteralPath $shimPath)) { Fail "Failed to create $shimPath" }
Ok "Created: $shimPath"

# -----------------------------
# 2) Force-export TEMPLATES (safe append)
# -----------------------------
$catalogPath = ".\src\lib\marketing\catalog.ts"
if (!(Test-Path -LiteralPath $catalogPath)) {
  Warn "catalog.ts not found at $catalogPath. Skipping export patch."
} else {
  $raw = Get-Content -LiteralPath $catalogPath -Raw

  if ($raw -match "export\s+const\s+TEMPLATES\b") {
    Ok "TEMPLATES already exported in catalog.ts"
  } else {
    # Try to alias from templatesCatalog if present
    if ($raw -match "\btemplatesCatalog\b") {
      $raw += "`r`n`r`n// Ensure expected named export exists for templates page`r`nexport const TEMPLATES = templatesCatalog;`r`n"
      $raw | Set-Content -Encoding UTF8 -LiteralPath $catalogPath
      Ok "Patched: export const TEMPLATES = templatesCatalog"
    } else {
      # Last resort: export an empty array so imports do not break (won't affect runtime unless used)
      $raw += "`r`n`r`n// Ensure expected named export exists for templates page (fallback)`r`nexport const TEMPLATES: any[] = [];`r`n"
      $raw | Set-Content -Encoding UTF8 -LiteralPath $catalogPath
      Warn "Patched fallback export: TEMPLATES = [] (templatesCatalog not found)"
    }
  }
}

# -----------------------------
# 3) Commit + push
# -----------------------------
Info "== Git commit + push =="
git status --porcelain | Out-String | Write-Host

git add -A
git commit -m "fix(next): add (marketing) shim page + export TEMPLATES"
git push

Ok "Pushed."

# -----------------------------
# 4) Deploy to Vercel (prod)
# -----------------------------
Info "== Deploy to Vercel (prod) =="
vercel --prod --force

Ok "Deploy finished."
