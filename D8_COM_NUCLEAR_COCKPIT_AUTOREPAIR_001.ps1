# =================================================================================================
# D8_COM_NUCLEAR_COCKPIT_AUTOREPAIR_001.ps1
# Dominat8.com Ã¢â‚¬â€ Cockpit (/admin) + Health API + Auto-Repair (Redeploy Hook + Revalidate) + Guardrails
# PowerShell-only. Copy/paste safe. Creates backups. No visible public UI changes (admin-only routes).
#
# RUN (example):
#   powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\D8_COM_NUCLEAR_COCKPIT_AUTOREPAIR_001.ps1 -RepoRoot "C:\Temp\FARMS\Dominat8.com"
#
# AFTER RUN:
#   1) Add env vars in Vercel: D8_ADMIN_KEY, (optional) D8_VERCEL_DEPLOY_HOOK_URL
#   2) Deploy
#   3) Visit https://www.dominat8.com/admin  (send header X-Admin-Key: <D8_ADMIN_KEY>)
# =================================================================================================

[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [string]$RepoRoot
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ----------------------------------------
# Helpers
# ----------------------------------------
function Fail([string]$m) { Write-Host "FATAL $m" -ForegroundColor Red; exit 1 }
function Ok([string]$m)   { Write-Host "OK   $m" -ForegroundColor Green }
function Info([string]$m) { Write-Host "INFO $m" -ForegroundColor Gray }
function Warn([string]$m) { Write-Host "WARN $m" -ForegroundColor Yellow }

function Ensure-Dir([string]$p) {
  if (-not (Test-Path -LiteralPath $p)) { New-Item -ItemType Directory -Path $p | Out-Null }
}

function Write-Utf8NoBom([string]$Path, [string]$Content) {
  $dir = Split-Path -Parent $Path
  if ($dir) { Ensure-Dir $dir }
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Backup-File([string]$Path) {
  if (Test-Path -LiteralPath $Path) {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    $bak = "$Path.bak_$ts"
    Copy-Item -LiteralPath $Path -Destination $bak -Force
    Info "Backup: $bak"
  }
}

function Git-Exists() {
  try { git --version | Out-Null; return $true } catch { return $false }
}

function Assert-GitClean([string]$root) {
  if (-not (Git-Exists)) { Warn "git not found; skipping clean check."; return }
  Push-Location -LiteralPath $root
  try {
    $porc = git status --porcelain
    if ($porc -and $porc.Trim().Length -gt 0) {
      Write-Host $porc
      Fail "Working tree not clean. Commit/stash first."
    }
  } finally { Pop-Location }
}

function Find-AppRoot([string]$root) {
  # Prefer src/app, otherwise app
  $a = Join-Path $root "src\app"
  if (Test-Path -LiteralPath $a) { return $a }
  $b = Join-Path $root "app"
  if (Test-Path -LiteralPath $b) { return $b }
  # If neither exists, create src/app (safe for app router)
  Ensure-Dir $a
  return $a
}

function Ensure-TSConfigHint([string]$root) {
  # We do not rewrite tsconfig; we only warn if Next app router likely exists.
  if (-not (Test-Path -LiteralPath (Join-Path $root "next.config.js")) -and
      -not (Test-Path -LiteralPath (Join-Path $root "next.config.mjs")) -and
      -not (Test-Path -LiteralPath (Join-Path $root "next.config.ts"))) {
    Warn "No next.config found. If this isn't a Next.js app, stop now."
  }
}

# ----------------------------------------
# Preflight
# ----------------------------------------
if (-not (Test-Path -LiteralPath $RepoRoot)) { Fail "RepoRoot not found: $RepoRoot" }
$RepoRoot = (Resolve-Path -LiteralPath $RepoRoot).Path
Set-Location -LiteralPath $RepoRoot

if (-not (Test-Path -LiteralPath (Join-Path $RepoRoot "package.json"))) { Fail "package.json missing in: $RepoRoot" }
Ensure-TSConfigHint $RepoRoot
Assert-GitClean $RepoRoot

Ok "LOCKED PWD: $(Get-Location)"

# ----------------------------------------
# Layout + Paths
# ----------------------------------------
$appRoot = Find-AppRoot $RepoRoot
$srcRoot = Split-Path -Parent $appRoot  # repo\src OR repo
$hasSrc = (Split-Path -Leaf $srcRoot) -eq "src"

Info "App router root: $appRoot"

# Routes we add (no public UI changes; admin-only)
$pathApiHealth = Join-Path $appRoot "api\health\route.ts"
$pathApiRepair = Join-Path $appRoot "api\repair\route.ts"
$pathAdminPage = Join-Path $appRoot "admin\page.tsx"
$pathAdminLayout = Join-Path $appRoot "admin\layout.tsx"

# Guardrails middleware (scoped only to /admin + /api/repair)
# Prefer src/middleware.ts if src exists, otherwise middleware.ts at repo root.
$pathMiddleware = if ($hasSrc) { Join-Path $RepoRoot "src\middleware.ts" } else { Join-Path $RepoRoot "middleware.ts" }

# Optional: add a local doctor loop script inside repo
$toolsDir = Join-Path $RepoRoot "tools"
$pathDoctorLoop = Join-Path $toolsDir "D8_COM_DOCTOR_LOOP_001.ps1"

# Optional: env example
$pathEnvExample = Join-Path $RepoRoot ".env.example"

# ----------------------------------------
# Content: API /health
# ----------------------------------------
$stamp = "D8_COM_COCKPIT_AUTOREPAIR_001_" + (Get-Date -Format "yyyyMMdd_HHmmss")

$apiHealth = @"
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function nowIso() {
  try { return new Date().toISOString(); } catch { return "unknown"; }
}

export async function GET() {
  const adminKeyPresent = !!process.env.D8_ADMIN_KEY && process.env.D8_ADMIN_KEY.length >= 12;
  const deployHookPresent = !!process.env.D8_VERCEL_DEPLOY_HOOK_URL && process.env.D8_VERCEL_DEPLOY_HOOK_URL.startsWith("https://");

  const body = {
    ok: true,
    service: "dominat8.com",
    stamp: "$stamp",
    time: nowIso(),
    checks: {
      D8_ADMIN_KEY_present: adminKeyPresent,
      D8_VERCEL_DEPLOY_HOOK_URL_present: deployHookPresent,
    },
    meta: {
      node_env: process.env.NODE_ENV ?? null,
      vercel: {
        VERCEL: process.env.VERCEL ?? null,
        VERCEL_ENV: process.env.VERCEL_ENV ?? null,
        VERCEL_URL: process.env.VERCEL_URL ?? null,
        VERCEL_REGION: process.env.VERCEL_REGION ?? null,
        VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      }
    }
  };

  return NextResponse.json(body, { status: 200 });
}
"@

# ----------------------------------------
# Content: API /repair
# - Requires header X-Admin-Key to match env D8_ADMIN_KEY
# - Supports actions:
#   - "redeploy" (POST deploy hook URL) if D8_VERCEL_DEPLOY_HOOK_URL is set
#   - "revalidate" (revalidatePath for "/" by default)
# ----------------------------------------
$apiRepair = @"
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

function unauthorized(msg: string) {
  return NextResponse.json({ ok: false, error: "unauthorized", message: msg }, { status: 401 });
}

function badRequest(msg: string) {
  return NextResponse.json({ ok: false, error: "bad_request", message: msg }, { status: 400 });
}

function nowIso() {
  try { return new Date().toISOString(); } catch { return "unknown"; }
}

async function readJson(req: Request): Promise<any> {
  try { return await req.json(); } catch { return null; }
}

function requireAdmin(req: Request) {
  const expected = process.env.D8_ADMIN_KEY || "";
  if (!expected || expected.length < 12) return { ok: false, reason: "D8_ADMIN_KEY not configured" };

  const got = req.headers.get("x-admin-key") || "";
  if (!got) return { ok: false, reason: "Missing X-Admin-Key header" };
  if (got !== expected) return { ok: false, reason: "Invalid admin key" };

  return { ok: true };
}

async function triggerRedeploy() {
  const hook = process.env.D8_VERCEL_DEPLOY_HOOK_URL || "";
  if (!hook || !hook.startsWith("https://")) {
    return { ok: false, message: "D8_VERCEL_DEPLOY_HOOK_URL not set" };
  }

  const res = await fetch(hook, { method: "POST" });
  const text = await res.text().catch(() => "");
  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    responseText: text?.slice(0, 4000) ?? ""
  };
}

export async function POST(req: Request) {
  const gate = requireAdmin(req);
  if (!gate.ok) return unauthorized(gate.reason);

  const payload = await readJson(req);
  if (!payload) return badRequest("Expected JSON body");

  const action = (payload.action || "").toString().toLowerCase().trim();
  if (!action) return badRequest("Missing 'action'");

  const out: any = {
    ok: true,
    stamp: "$stamp",
    time: nowIso(),
    action,
    notes: [],
    result: null
  };

  if (action === "redeploy") {
    out.notes.push("Redeploy hook invoked (if configured).");
    out.result = await triggerRedeploy();
    out.ok = !!out.result?.ok;
    return NextResponse.json(out, { status: out.ok ? 200 : 502 });
  }

  if (action === "revalidate") {
    const path = (payload.path || "/").toString();
    out.notes.push("Revalidating path.");
    out.result = { path };
    try {
      revalidatePath(path);
      out.ok = true;
      return NextResponse.json(out, { status: 200 });
    } catch (e: any) {
      out.ok = false;
      out.result = { path, error: e?.message || "revalidate failed" };
      return NextResponse.json(out, { status: 500 });
    }
  }

  return badRequest("Unknown action. Supported: redeploy, revalidate");
}
"@

# ----------------------------------------
# Content: /admin UI (minimal, admin-only)
# - Shows health JSON
# - Buttons call /api/repair (redeploy, revalidate)
# - Requires you to send X-Admin-Key header in browser request (use an extension or devtools fetch)
#   This keeps public UI unchanged and avoids adding a visible login system.
# ----------------------------------------
$adminLayout = @"
export const metadata = {
  title: "Dominat8.com Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
        {children}
      </body>
    </html>
  );
}
"@

$adminPage = @"
"use client";

import React from "react";

type Health = any;

function now() {
  try { return new Date().toLocaleString(); } catch { return "now"; }
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = React.useState<string>("");
  const [health, setHealth] = React.useState<Health>(null);
  const [log, setLog] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState<boolean>(false);

  function pushLog(m: string) {
    setLog((x) => [`[`${now()}] `${m}`, ...x].slice(0, 200));
  }

  async function fetchHealth() {
    setBusy(true);
    try {
      pushLog("Fetching /api/health ...");
      const res = await fetch("/api/health", { cache: "no-store" });
      const json = await res.json();
      setHealth(json);
      pushLog(`Health ok=`${json?.ok} stamp=`${json?.stamp || "n/a"}`);
    } catch (e: any) {
      pushLog(`Health fetch failed: `${e?.message || e}`);
    } finally {
      setBusy(false);
    }
  }

  async function repair(action: "redeploy" | "revalidate", path?: string) {
    if (!adminKey || adminKey.length < 12) {
      pushLog("Admin key missing/too short (set it in the box).");
      return;
    }
    setBusy(true);
    try {
      pushLog(`Calling /api/repair action=`${action} ...`);
      const res = await fetch("/api/repair", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-admin-key": adminKey
        },
        body: JSON.stringify({ action, path })
      });
      const json = await res.json();
      pushLog(`Repair response status=`${res.status} ok=`${json?.ok}`);
      pushLog(JSON.stringify(json).slice(0, 4000));
    } catch (e: any) {
      pushLog(`Repair failed: `${e?.message || e}`);
    } finally {
      setBusy(false);
    }
  }

  React.useEffect(() => { fetchHealth(); }, []);

  return (
    <div style={{ padding: 16, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ margin: "8px 0 4px 0" }}>Dominat8.com Cockpit</h1>
      <div style={{ color: "#555", marginBottom: 12 }}>
        Admin-only. Public UI untouched. This page uses X-Admin-Key to access repair actions.
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 12,
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 12
      }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Admin Key (D8_ADMIN_KEY)</label>
          <input
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="paste D8_ADMIN_KEY here"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
          <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
            This key is never stored server-side by the UI. It is sent only as a request header when you click actions.
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button disabled={busy} onClick={fetchHealth} style={btn()}>
            Refresh Health
          </button>
          <button disabled={busy} onClick={() => repair("revalidate", "/")} style={btn()}>
            Revalidate /
          </button>
          <button disabled={busy} onClick={() => repair("redeploy")} style={btnDanger()}>
            Redeploy (Deploy Hook)
          </button>
        </div>

        <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Health Snapshot</div>
          <pre style={pre()}>{health ? JSON.stringify(health, null, 2) : "Loading..."}</pre>
        </div>

        <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Event Log</div>
          <pre style={pre()}>{log.length ? log.join("\n") : "No events yet."}</pre>
        </div>
      </div>
    </div>
  );
}

function btn(): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontWeight: 600
  };
}

function btnDanger(): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #f1c0c0",
    background: "#fff5f5",
    cursor: "pointer",
    fontWeight: 700
  };
}

function pre(): React.CSSProperties {
  return {
    margin: 0,
    padding: 12,
    background: "#0b0f19",
    color: "white",
    borderRadius: 12,
    overflowX: "auto",
    fontSize: 12,
    lineHeight: 1.35
  };
}
"@

# ----------------------------------------
# Content: middleware (scoped guardrails)
# - Only protects:
#    /admin (page)
#    /api/repair (endpoint)
# - Allows /api/health publicly (safe)
# ----------------------------------------
$middleware = @"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname || "";

  // Only protect admin + repair endpoints
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isRepair = pathname === "/api/repair" || pathname.startsWith("/api/repair/");

  if (!isAdmin && !isRepair) {
    return NextResponse.next();
  }

  const expected = process.env.D8_ADMIN_KEY || "";
  if (!expected || expected.length < 12) {
    // If not configured, hard-deny protected routes (safer default).
    return new NextResponse("Admin key not configured", { status: 503 });
  }

  const got = req.headers.get("x-admin-key") || "";
  if (!got || got !== expected) {
    // For pages, return 404 to avoid advertising admin surface.
    if (isAdmin) return new NextResponse("Not Found", { status: 404 });
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/repair/:path*"]
};
"@

# ----------------------------------------
# Content: local doctor loop (Windows)
# - Hits prod endpoints repeatedly
# - If health fails -> optionally triggers redeploy (if you provide AdminKey)
# ----------------------------------------
$doctorLoop = @"
# D8_COM_DOCTOR_LOOP_001.ps1
# Local watchdog for Dominat8.com (PowerShell-only)
#
# Example:
#   powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tools\D8_COM_DOCTOR_LOOP_001.ps1 -BaseUrl "https://www.dominat8.com" -AdminKey "<D8_ADMIN_KEY>" -LoopSeconds 30
#
[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [string]$BaseUrl,

  [Parameter(Mandatory=$false)]
  [string]$AdminKey = "",

  [int]$LoopSeconds = 30,

  [int]$TimeoutSeconds = 20
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ok([string]$m){ Write-Host "OK   $m" -ForegroundColor Green }
function Info([string]$m){ Write-Host "INFO $m" -ForegroundColor Gray }
function Warn([string]$m){ Write-Host "WARN $m" -ForegroundColor Yellow }
function Fail([string]$m){ Write-Host "FAIL $m" -ForegroundColor Red }

function Get-Json([string]$url) {
  $res = Invoke-WebRequest -UseBasicParsing -Uri $url -Method GET -TimeoutSec $TimeoutSeconds
  return ($res.Content | ConvertFrom-Json)
}

function Post-Json([string]$url, [hashtable]$body, [hashtable]$headers) {
  $json = ($body | ConvertTo-Json -Depth 20)
  $res = Invoke-WebRequest -UseBasicParsing -Uri $url -Method POST -TimeoutSec $TimeoutSeconds -Headers $headers -ContentType "application/json" -Body $json
  return ($res.Content | ConvertFrom-Json)
}

$BaseUrl = $BaseUrl.TrimEnd("/")
$healthUrl = "$BaseUrl/api/health"
$repairUrl = "$BaseUrl/api/repair"

Info "Target: $BaseUrl"
Info "Health:  $healthUrl"
Info "Repair:  $repairUrl"
Info "LoopSeconds=$LoopSeconds TimeoutSeconds=$TimeoutSeconds"
if ($AdminKey) { Info "AdminKey: (set)" } else { Warn "AdminKey not provided; repair actions disabled." }

while ($true) {
  try {
    $ts = [int](Get-Date -UFormat %s)
    $u = "$healthUrl?ts=$ts"
    $h = Get-Json $u

    if ($h.ok -ne $true) {
      Fail "Health ok != true"
      throw "health_not_ok"
    }

    $k1 = $h.checks.D8_ADMIN_KEY_present
    $k2 = $h.checks.D8_VERCEL_DEPLOY_HOOK_URL_present
    Ok ("Health ok stamp={0} adminKeyPresent={1} deployHookPresent={2}" -f ($h.stamp), $k1, $k2)
  }
  catch {
    Fail "Health check failed: $($_.Exception.Message)"

    if ($AdminKey -and $AdminKey.Length -ge 12) {
      try {
        Warn "Attempting repair: redeploy"
        $headers = @{ "X-Admin-Key" = $AdminKey }
        $r = Post-Json $repairUrl @{ action="redeploy" } $headers
        if ($r.ok -eq $true) {
          Ok "Repair redeploy triggered."
        } else {
          Fail ("Repair redeploy failed: {0}" -f ($r | ConvertTo-Json -Depth 10))
        }
      } catch {
        Fail "Repair call failed: $($_.Exception.Message)"
      }
    }
  }

  Start-Sleep -Seconds $LoopSeconds
}
"@

# ----------------------------------------
# Content: .env.example (append safely)
# ----------------------------------------
$envAppend = @"

# --- Dominat8.com Cockpit + Auto-Repair ---
# REQUIRED (min 12 chars):
D8_ADMIN_KEY=REPLACE_ME_WITH_LONG_RANDOM
# OPTIONAL (Vercel Deploy Hook URL):
D8_VERCEL_DEPLOY_HOOK_URL=
"@

# ----------------------------------------
# APPLY PATCH (with backups)
# ----------------------------------------
$writes = @(
  @{ Path = $pathApiHealth;    Content = $apiHealth },
  @{ Path = $pathApiRepair;    Content = $apiRepair },
  @{ Path = $pathAdminLayout;  Content = $adminLayout },
  @{ Path = $pathAdminPage;    Content = $adminPage },
  @{ Path = $pathMiddleware;   Content = $middleware },
  @{ Path = $pathDoctorLoop;   Content = $doctorLoop }
)

Write-Host ""
Info "=== WRITING FILES (with backups) ==="

foreach ($w in $writes) {
  $p = $w.Path
  $c = $w.Content
  Backup-File $p
  Write-Utf8NoBom $p $c
  Ok "Wrote: $p"
}

# Append env example if it exists; otherwise create it
Write-Host ""
Info "=== ENV EXAMPLE ==="
if (Test-Path -LiteralPath $pathEnvExample) {
  $raw = Get-Content -LiteralPath $pathEnvExample -Raw
  if ($raw -notmatch "D8_ADMIN_KEY") {
    Backup-File $pathEnvExample
    Write-Utf8NoBom $pathEnvExample ($raw.TrimEnd() + $envAppend + "`r`n")
    Ok "Updated: $pathEnvExample (appended cockpit vars)"
  } else {
    Ok ".env.example already mentions D8_ADMIN_KEY (no change)"
  }
} else {
  Write-Utf8NoBom $pathEnvExample ($envAppend.Trim() + "`r`n")
  Ok "Created: $pathEnvExample"
}

# ----------------------------------------
# Postflight: quick sanity report
# ----------------------------------------
Write-Host ""
Info "=== POSTFLIGHT ==="
if (Git-Exists) {
  Push-Location -LiteralPath $RepoRoot
  try {
    $porc = git status --porcelain
    Ok "Git status (porcelain):"
    $porc | Out-Host
  } finally { Pop-Location }
} else {
  Warn "git not available; skipped status."
}

Write-Host ""
Ok "DONE: Cockpit + Health + Repair + Guardrails installed (no public UI changes)."

Write-Host ""
Write-Host "NEXT ACTIONS (PROD):" -ForegroundColor Yellow
Write-Host "1) In Vercel project for Dominat8.com set env:" -ForegroundColor Yellow
Write-Host "   - D8_ADMIN_KEY = (long random string, >= 12 chars)" -ForegroundColor Yellow
Write-Host "   - (optional) D8_VERCEL_DEPLOY_HOOK_URL = your Vercel Deploy Hook URL" -ForegroundColor Yellow
Write-Host "2) Deploy to production." -ForegroundColor Yellow
Write-Host "3) Test health:" -ForegroundColor Yellow
Write-Host "   curl.exe -s https://www.dominat8.com/api/health | more" -ForegroundColor Yellow
Write-Host "4) Open cockpit:" -ForegroundColor Yellow
Write-Host "   https://www.dominat8.com/admin" -ForegroundColor Yellow
Write-Host "   Paste D8_ADMIN_KEY into the box, click actions." -ForegroundColor Yellow
Write-Host ""
Write-Host "LOCAL AUTO-REPAIR LOOP (optional):" -ForegroundColor Yellow
Write-Host "  powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$pathDoctorLoop`" -BaseUrl `"https://www.dominat8.com`" -AdminKey `"<D8_ADMIN_KEY>`" -LoopSeconds 30" -ForegroundColor Yellow
Write-Host ""
Write-Host "SECURITY NOTE:" -ForegroundColor Yellow
Write-Host "  /admin is hidden behind X-Admin-Key and returns 404 when unauthorized." -ForegroundColor Yellow
Write-Host "  /api/repair is protected and returns 401 when unauthorized." -ForegroundColor Yellow
Write-Host ""
