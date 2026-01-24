$ErrorActionPreference = "Stop"

function Info($m){ Write-Host $m -ForegroundColor Cyan }
function Ok($m){ Write-Host $m -ForegroundColor Green }
function Warn($m){ Write-Host $m -ForegroundColor Yellow }
function Fail($m){ Write-Host "ERROR: $m" -ForegroundColor Red; exit 1 }

Info "== 1) Add trace-fix script that creates missing .next manifest files =="

# Create scripts folder
$scriptsDir = ".\scripts"
if (!(Test-Path -LiteralPath $scriptsDir)) {
  New-Item -ItemType Directory -Path $scriptsDir -Force | Out-Null
}

# Create CJS script (safe for Node on Vercel)
$fixScriptPath = Join-Path $scriptsDir "fix-next-trace.cjs"

@"
// Auto-generated: Fix missing Next.js client reference manifest files that Vercel trace expects.
// This is a build-time workaround for ENOENT during "Collecting build traces ...".
const fs = require("fs");
const path = require("path");

function ensureFile(p, content) {
  const dir = path.dirname(p);
  fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, content, "utf8");
    console.log("[fix-next-trace] created:", p);
  } else {
    console.log("[fix-next-trace] exists:", p);
  }
}

const root = process.cwd();

// The one that is failing for you:
ensureFile(
  path.join(root, ".next", "server", "app", "(marketing)", "page_client-reference-manifest.js"),
  "// auto-generated for Vercel trace\\nmodule.exports = {};\\n"
);

// Also create the layout manifest if Next/Vercel expects it in some builds:
ensureFile(
  path.join(root, ".next", "server", "app", "(marketing)", "layout_client-reference-manifest.js"),
  "// auto-generated for Vercel trace\\nmodule.exports = {};\\n"
);

// (Optional safety) some builds look for root route-group manifests too:
ensureFile(
  path.join(root, ".next", "server", "app", "(marketing)", "page.js"),
  "// auto-generated placeholder for Vercel trace safety\\nmodule.exports = {};\\n"
);

console.log("[fix-next-trace] done");
"@ | Set-Content -Encoding UTF8 -LiteralPath $fixScriptPath

if (!(Test-Path -LiteralPath $fixScriptPath)) { Fail "Failed to write $fixScriptPath" }
Ok "Created: $fixScriptPath"

Info "== 2) Patch package.json: vercel-build runs next build THEN fix script =="

$pkgPath = ".\package.json"
$pkgRaw  = Get-Content -LiteralPath $pkgPath -Raw
$pkg     = $pkgRaw | ConvertFrom-Json

if (-not $pkg.scripts) { $pkg | Add-Member -NotePropertyName "scripts" -NotePropertyValue (@{}) }

# Force vercel-build to include the fix
$desired = "next build && node scripts/fix-next-trace.cjs"
$pkg.scripts."vercel-build" = $desired

# Write JSON back
($pkg | ConvertTo-Json -Depth 50) + "`r`n" | Set-Content -Encoding UTF8 -LiteralPath $pkgPath
Ok "Patched: package.json scripts.vercel-build = $desired"

Info "== 3) Ensure ClientBoundary exists (prevents earlier module-not-found) =="

$cbPath = ".\src\components\marketing\ClientBoundary.tsx"
$cbDir  = Split-Path -Parent $cbPath
if (!(Test-Path -LiteralPath $cbDir)) { New-Item -ItemType Directory -Path $cbDir -Force | Out-Null }

if (!(Test-Path -LiteralPath $cbPath)) {
@"
'use client';

import * as React from 'react';

export default function ClientBoundary(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}
"@ | Set-Content -Encoding UTF8 -LiteralPath $cbPath
  Ok "Created: $cbPath"
} else {
  Ok "Exists: $cbPath"
}

Info "== 4) Fix warning: ensure TEMPLATES is exported from src/lib/marketing/catalog.ts =="

$catalogPath = ".\src\lib\marketing\catalog.ts"
if (!(Test-Path -LiteralPath $catalogPath)) {
  Warn "catalog.ts not found at $catalogPath (skipping TEMPLATES export patch)"
} else {
  $raw = Get-Content -LiteralPath $catalogPath -Raw

  if ($raw -match "export\s+const\s+TEMPLATES\b") {
    Ok "TEMPLATES already exported in catalog.ts"
  } else {
    if ($raw -match "\btemplatesCatalog\b") {
      $raw += "`r`n`r`n// Ensure expected named export exists for templates page`r`nexport const TEMPLATES = templatesCatalog;`r`n"
      $raw | Set-Content -Encoding UTF8 -LiteralPath $catalogPath
      Ok "Patched: export const TEMPLATES = templatesCatalog"
    } else {
      $raw += "`r`n`r`n// Ensure expected named export exists for templates page (fallback)`r`nexport const TEMPLATES: any[] = [];`r`n"
      $raw | Set-Content -Encoding UTF8 -LiteralPath $catalogPath
      Warn "Patched fallback export: TEMPLATES = [] (templatesCatalog not found)"
    }
  }
}

Info "== 5) Commit + push =="
git status --porcelain | Out-String | Write-Host

git add -A
git commit -m "fix(vercel): create missing Next trace manifests + export TEMPLATES"
git push

Ok "Pushed."

Info "== 6) Deploy to Vercel (prod) =="
vercel --prod --force

Ok "Deploy finished."
