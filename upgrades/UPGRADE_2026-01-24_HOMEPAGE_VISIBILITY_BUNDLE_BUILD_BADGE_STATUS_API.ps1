Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Fail($msg) { throw "ERROR: $msg" }
function Ensure-Dir([string]$Path) { if (-not (Test-Path -LiteralPath $Path)) { New-Item -ItemType Directory -Path $Path | Out-Null } }
function Write-Utf8NoBom([string]$Path, [string]$Content) {
  $enc = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllBytes($Path, $enc.GetBytes($Content))
}

if (-not (Test-Path -LiteralPath ".\.git")) { Fail "Missing .git. cd to repo root first." }

Ensure-Dir ".\src\app"
Ensure-Dir ".\src\app\api"
Ensure-Dir ".\src\app\api\__site_status__"

# -----------------------------------------------------------------------------
# 1) Add API: /api/__site_status__  (NO CACHE) — tells you exactly what is live
# -----------------------------------------------------------------------------
$apiPath = ".\src\app\api\__site_status__\route.ts"
$api = @"
export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const host = req.headers.get("host") || null;

  const gitSha =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_REF || // fallback (branch/ref)
    null;

  const vercelEnv = process.env.VERCEL_ENV || null;
  const vercelUrl = process.env.VERCEL_URL || null;

  const body = {
    ok: true,
    nowIso: new Date().toISOString(),
    host,
    url: url.toString(),
    vercelEnv,
    vercelUrl,
    gitSha,
    gitShaShort: gitSha ? String(gitSha).slice(0, 8) : null,
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}
"@
Write-Utf8NoBom $apiPath $api
Write-Host "Wrote: $apiPath"

# -----------------------------------------------------------------------------
# 2) Patch root layout footer to include a Build Badge (always visible)
#    File: src/app/layout.tsx  (must exist)
# -----------------------------------------------------------------------------
$layoutPath = ".\src\app\layout.tsx"
if (-not (Test-Path -LiteralPath $layoutPath)) {
  Fail "Missing src/app/layout.tsx. (Your project needs the root layout for shared header/footer.)"
}

$layoutText = Get-Content -LiteralPath $layoutPath -Raw

# If badge already present, do nothing.
if ($layoutText -match "x-dominat8-build-badge|Build\s*:\s*\{") {
  Write-Host "Layout already contains a build badge marker. Skipping footer patch."
} else {
  # Insert server-side badge vars right after imports.
  if ($layoutText -match "import type \{ Metadata \} from ""next"";") {
    $layoutText = $layoutText -replace 'import type \{ Metadata \} from "next";\s*', @"
import type { Metadata } from "next";

const __BUILD_SHA = process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "";
const __BUILD_SHA_SHORT = __BUILD_SHA ? String(__BUILD_SHA).slice(0, 8) : "local";
const __VERCEL_ENV = process.env.VERCEL_ENV || "local";
"@
  } else {
    # If imports differ, prepend safely.
    $layoutText = @"
const __BUILD_SHA = process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "";
const __BUILD_SHA_SHORT = __BUILD_SHA ? String(__BUILD_SHA).slice(0, 8) : "local";
const __VERCEL_ENV = process.env.VERCEL_ENV || "local";

"@ + $layoutText
  }

  # Add badge line inside footer block (before closing footer div).
  # We look for the footer container and append a small line.
  $needle = '</div>\s*</footer>'
  if ($layoutText -match $needle) {
    $badge = @"
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] opacity-80">
              <span data-x-dominat8-build-badge>
                Build: <span className="font-mono">{__BUILD_SHA_SHORT}</span> · Env: <span className="font-mono">{__VERCEL_ENV}</span>
              </span>
              <a className="underline-offset-4 hover:underline" href={"/api/__site_status__?ts=" + Date.now()}>
                Live status →
              </a>
            </div>

"@
    $layoutText = [System.Text.RegularExpressions.Regex]::Replace(
      $layoutText,
      $needle,
      ($badge + '</div></footer>'),
      [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )
  } else {
    Fail "Could not find footer closing in src/app/layout.tsx to insert build badge."
  }

  # Write back (UTF-8 no BOM)
  $enc = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllBytes($layoutPath, $enc.GetBytes($layoutText))
  Write-Host "Patched: $layoutPath (Build badge + status link inserted)"
}

# -----------------------------------------------------------------------------
# 3) Commit + push + deploy
# -----------------------------------------------------------------------------
git add -A
$staged = (git diff --cached --name-only)
if ($staged) {
  git commit -m "feat: homepage visibility bundle (build badge + no-cache status API)"
} else {
  Write-Host "No staged changes to commit."
}

git fetch origin
git push origin HEAD:main

Write-Host ""
Write-Host "== Deploy (vercel --prod --force) =="
vercel --prod --force
if ($LASTEXITCODE -ne 0) { Fail "vercel deploy failed." }

Write-Host ""
Write-Host "✅ DEPLOYED: Visibility bundle is live."
Write-Host "Open homepage with cache-bust:"
Write-Host "  https://www.dominat8.com/?ts=$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
Write-Host "Open live status JSON:"
Write-Host "  https://www.dominat8.com/api/__site_status__?ts=$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"