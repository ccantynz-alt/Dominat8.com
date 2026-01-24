$ErrorActionPreference = "Stop"

function Info($m){ Write-Host $m -ForegroundColor Cyan }
function Ok($m){ Write-Host $m -ForegroundColor Green }
function Warn($m){ Write-Host $m -ForegroundColor Yellow }
function Fail($m){ Write-Host "ERROR: $m" -ForegroundColor Red; exit 1 }

Info "== Upgrade: Fix ClientBoundary + catalog exports =="

# -----------------------------
# 1) Create ClientBoundary component
# -----------------------------
$clientBoundaryPath = ".\src\components\marketing\ClientBoundary.tsx"
$clientBoundaryDir  = Split-Path -Parent $clientBoundaryPath
if (!(Test-Path -LiteralPath $clientBoundaryDir)) {
  New-Item -ItemType Directory -Path $clientBoundaryDir -Force | Out-Null
}

# A tiny client wrapper used to force a client boundary when needed.
@"
'use client';

import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

/**
 * ClientBoundary
 * A minimal client component wrapper for layouts/pages that need a client boundary.
 */
export default function ClientBoundary({ children }: Props) {
  return <>{children}</>;
}
"@ | Set-Content -Encoding UTF8 -LiteralPath $clientBoundaryPath

if (!(Test-Path -LiteralPath $clientBoundaryPath)) { Fail "Failed to create $clientBoundaryPath" }
Ok "Created: $clientBoundaryPath"

# -----------------------------
# 2) Patch catalog exports (non-destructive, best-effort)
# -----------------------------
$catalogPath = ".\src\lib\marketing\catalog.ts"
if (!(Test-Path -LiteralPath $catalogPath)) {
  Warn "catalog.ts not found at $catalogPath. Skipping catalog export patch."
} else {
  $raw = Get-Content -LiteralPath $catalogPath -Raw

  $changed = $false

  # Helper: add alias export only if it doesn't already exist.
  function Ensure-AliasExport {
    param(
      [string]$ExportName,
      [string[]]$CandidateVars
    )

    if ($raw -match ("export\s+(const|let|var)\s+" + [regex]::Escape($ExportName) + "\b")) {
      return
    }

    foreach ($v in $CandidateVars) {
      # Match exported OR local const
      if ($raw -match ("export\s+const\s+" + [regex]::Escape($v) + "\b") -or $raw -match ("const\s+" + [regex]::Escape($v) + "\b")) {
        $script:raw += "`r`n`r`n// Alias exports for page imports`r`nexport const $ExportName = $v;`r`n"
        $script:changed = $true
        return
      }
    }

    Warn "Could not find a candidate variable for $ExportName in catalog.ts (tried: $($CandidateVars -join ', ')). Leaving unchanged."
  }

  # Common variable names your file might already define
  Ensure-AliasExport -ExportName "TEMPLATES" -CandidateVars @("templatesCatalog","templates","TEMPLATE_CATALOG","templateCatalog")
  Ensure-AliasExport -ExportName "USE_CASES" -CandidateVars @("useCasesCatalog","useCases","USECASE_CATALOG","useCaseCatalog","use_cases")

  if ($changed) {
    $raw | Set-Content -Encoding UTF8 -LiteralPath $catalogPath
    Ok "Patched alias exports in: $catalogPath"
  } else {
    Ok "No catalog export changes needed."
  }
}

# -----------------------------
# 3) Commit + push
# -----------------------------
Info "== Git commit + push =="
git status --porcelain | Out-String | Write-Host

git add -A

$commitMsg = "fix(marketing): add ClientBoundary + export aliases"
git commit -m $commitMsg

git push

Ok "Pushed."

# -----------------------------
# 4) Deploy to Vercel (production)
# -----------------------------
Info "== Deploy to Vercel (prod) =="
vercel --prod --force

Ok "Deploy command finished."

# -----------------------------
# 5) Verify deploy proof
# -----------------------------
$TS = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$VERCEL_ALIAS = "https://my-saas-app-5eyw.vercel.app"

Info "== Verify: Vercel alias /api/__deploy_proof__ =="
try {
  $r = Invoke-RestMethod "$VERCEL_ALIAS/api/__deploy_proof__?ts=$TS"
  $r | ConvertTo-Json -Depth 10 | Write-Host
  Ok "OK: deploy proof reachable on Vercel alias."
} catch {
  Warn ("Deploy proof not reachable on Vercel alias: " + $_.Exception.Message)
}

Info "== Verify: Host header for www.dominat8.com to same alias =="
try {
  $headersOut = (curl.exe -s -D - -o NUL -H "Host: www.dominat8.com" "$VERCEL_ALIAS/api/__deploy_proof__?ts=$TS")
  $headersOut | Select-String -Pattern "HTTP/|x-vercel-|x-dominat8-|cache-control|location" -CaseSensitive:$false | ForEach-Object { $_.Line } | Write-Host
  Ok "OK: Host header probe ran."
} catch {
  Warn ("Host header probe failed: " + $_.Exception.Message)
}

Ok "DONE"
