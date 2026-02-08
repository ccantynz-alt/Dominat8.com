# ======================================================================
# PATCH_010_MEGA_BUILD_HOMEPAGE_BUILDER.ps1
# Mega Build Patch:
#  - Adds /builder (full-screen builder UX)
#  - Adds /api/d8/stamp (proof token)
#  - Adds /api/d8/prompt (prompt echo/store endpoint)
#  - Adds global floating "Launch Builder" CTA via layout injection (safe attempt)
# No destructive edits. Creates new files. Minimal layout injection only if found.
# ======================================================================

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com"
)

function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }
function Fail($m){ Write-Host ("FATAL " + $m) -ForegroundColor Red; throw $m }

function Ensure-Dir([string]$dir){
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
}
function Backup-File([string]$Path){
  if (Test-Path -LiteralPath $Path) {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    Copy-Item -LiteralPath $Path -Destination ($Path + ".bak." + $ts) -Force
  }
}
function Write-Utf8NoBom([string]$Path, [string]$Content){
  $enc = New-Object System.Text.UTF8Encoding($false)
  $bytes = $enc.GetBytes($Content)
  Ensure-Dir (Split-Path -Parent $Path)
  [System.IO.File]::WriteAllBytes($Path, $bytes)
}
function Write-File([string]$Path, [string]$Content){
  Backup-File $Path
  Write-Utf8NoBom -Path $Path -Content $Content
  Ok ("Wrote: " + $Path)
}

if (-not (Test-Path -LiteralPath $RepoRoot)) { Fail "RepoRoot missing: $RepoRoot" }
Set-Location -LiteralPath $RepoRoot

# ----------------------------------------------------------------------
# 1) Build stamp module + API route
# ----------------------------------------------------------------------
$stampValue = "D8_STAMP_" + (Get-Date -Format "yyyyMMdd_HHmmss")

$stampTs = Join-Path $RepoRoot "src\d8_build_stamp.ts"
$stampTsContent = @"
export const D8_BUILD_STAMP = `"$stampValue`";
"@
Write-File -Path $stampTs -Content $stampTsContent

$stampApiDir = Join-Path $RepoRoot "src\app\api\d8\stamp"
Ensure-Dir $stampApiDir

$stampApi = Join-Path $stampApiDir "route.ts"
$stampApiContent = @"
import { NextResponse } from 'next/server';
import { D8_BUILD_STAMP } from '@/d8_build_stamp';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(
    { ok: true, stamp: D8_BUILD_STAMP, ts: Date.now() },
    { headers: { 'Cache-Control': 'no-store, max-age=0', 'Pragma': 'no-cache' } }
  );
}
"@
Write-File -Path $stampApi -Content $stampApiContent

# ----------------------------------------------------------------------
# 2) Prompt API route (POST/GET) for builder wiring
# ----------------------------------------------------------------------
$promptApiDir = Join-Path $RepoRoot "src\app\api\d8\prompt"
Ensure-Dir $promptApiDir

$promptApi = Join-Path $promptApiDir "route.ts"
$promptApiContent = @"
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Very lightweight in-memory cache (per-server-instance). Good enough for wiring / demos.
let lastPrompt: string | null = null;

export async function GET() {
  return NextResponse.json(
    { ok: true, lastPrompt, ts: Date.now() },
    { headers: { 'Cache-Control': 'no-store, max-age=0', 'Pragma': 'no-cache' } }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const prompt = typeof body?.prompt === 'string' ? body.prompt : '';
    lastPrompt = prompt || null;

    return NextResponse.json(
      { ok: true, saved: !!lastPrompt, length: lastPrompt ? lastPrompt.length : 0, ts: Date.now() },
      { headers: { 'Cache-Control': 'no-store, max-age=0', 'Pragma': 'no-cache' } }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'BAD_REQUEST', ts: Date.now() },
      { status: 400, headers: { 'Cache-Control': 'no-store, max-age=0', 'Pragma': 'no-cache' } }
    );
  }
}
"@
Write-File -Path $promptApi -Content $promptApiContent

# ----------------------------------------------------------------------
# 3) Builder page: /builder (full-screen, prompt injection, status panel)
# ----------------------------------------------------------------------
$builderDir = Join-Path $RepoRoot "src\app\builder"
Ensure-Dir $builderDir

$builderPage = Join-Path $builderDir "page.tsx"
$builderPageContent = @"
'use client';

import React, { useEffect, useMemo, useState } from 'react';

type ProbeResult = {
  ok: boolean;
  status?: number;
  text?: string;
  ts: number;
};

function nowStamp() {
  const d = new Date();
  return d.toISOString().replace('T', ' ').slice(0, 19);
}

export default function BuilderPage() {
  const [prompt, setPrompt] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [probe, setProbe] = useState<ProbeResult>({ ok: true, ts: Date.now(), text: 'boot' });
  const [buildStamp, setBuildStamp] = useState<string>('loading...');

  const queryPrompt = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const u = new URL(window.location.href);
    return u.searchParams.get('prompt') || '';
  }, []);

  useEffect(() => {
    // restore
    try {
      const stored = window.localStorage.getItem('d8_builder_prompt') || '';
      const seed = queryPrompt || stored;
      if (seed) setPrompt(seed);
    } catch {}
  }, [queryPrompt]);

  useEffect(() => {
    const t = setTimeout(() => {
      try { window.localStorage.setItem('d8_builder_prompt', prompt); } catch {}
    }, 250);
    return () => clearTimeout(t);
  }, [prompt]);

  async function refreshStatus() {
    const ts = Date.now();

    // Build stamp
    try {
      const r = await fetch('/api/d8/stamp?ts=' + ts, { cache: 'no-store' });
      const j = await r.json().catch(() => null);
      setBuildStamp(j?.stamp || 'unknown');
    } catch {
      setBuildStamp('unavailable');
    }

    // Probe
    try {
      const r = await fetch('/api/d8/health?ts=' + ts, { cache: 'no-store' });
      const text = await r.text().catch(() => '');
      setProbe({ ok: r.ok, status: r.status, text: text?.slice(0, 160) || '', ts });
    } catch (e: any) {
      setProbe({ ok: false, status: 0, text: String(e?.message || e), ts });
    }
  }

  useEffect(() => {
    refreshStatus();
    const i = setInterval(refreshStatus, 10000);
    return () => clearInterval(i);
  }, []);

  async function savePrompt() {
    setSaving(true);
    setSaved(false);
    try {
      const r = await fetch('/api/d8/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ prompt })
      });
      setSaved(r.ok);
    } catch {
      setSaved(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: 16,
      padding: 16
    }}>
      <div style={{
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.10)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        background: 'rgba(255,255,255,0.9)'
      }}>
        <div style={{
          padding: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ fontWeight: 700 }}>Builder</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Full-screen workspace</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={refreshStatus}
              style={{ padding: '8px 10px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.12)', background: 'white', cursor: 'pointer' }}
            >
              Refresh
            </button>
            <button
              onClick={savePrompt}
              disabled={saving}
              style={{
                padding: '8px 10px',
                borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.12)',
                background: saving ? 'rgba(0,0,0,0.05)' : 'black',
                color: saving ? 'black' : 'white',
                cursor: saving ? 'default' : 'pointer'
              }}
            >
              {saving ? 'Saving…' : 'Send Prompt'}
            </button>
          </div>
        </div>

        <div style={{ padding: 14, display: 'grid', gridTemplateRows: 'auto 1fr', gap: 10 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Prompt</div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to build…"
              style={{
                width: '100%',
                minHeight: 120,
                resize: 'vertical',
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,0.12)',
                padding: 12,
                fontSize: 14
              }}
            />
            <div style={{ fontSize: 12, opacity: 0.65 }}>
              Tip: you can open with a seeded prompt: <code>/builder?prompt=...</code>
              {saved ? <span style={{ marginLeft: 10, color: 'green' }}>Saved ✔</span> : null}
            </div>
          </div>

          <div style={{
            borderRadius: 14,
            border: '1px solid rgba(0,0,0,0.10)',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.00))',
            padding: 14,
            overflow: 'auto'
          }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Preview (wired)</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 12 }}>
              This is the “always-fresh” preview surface. Next patch: connect it to your real builder apps.
            </div>

            <div style={{
              borderRadius: 12,
              background: 'white',
              border: '1px solid rgba(0,0,0,0.08)',
              padding: 12
            }}>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Current prompt</div>
              <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12 }}>
                {prompt || '(empty)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.10)',
        padding: 14,
        background: 'rgba(255,255,255,0.9)',
        display: 'grid',
        gap: 12,
        alignContent: 'start'
      }}>
        <div style={{ fontWeight: 700 }}>Status</div>

        <div style={{ display: 'grid', gap: 6 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Build stamp</div>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12 }}>
            {buildStamp}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 6 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Health</div>
          <div style={{ fontSize: 13 }}>
            <span style={{ fontWeight: 700 }}>{probe.ok ? 'GREEN' : 'RED'}</span>
            <span style={{ marginLeft: 8, opacity: 0.7 }}>
              {probe.status ? 'HTTP ' + probe.status : 'n/a'} · {nowStamp()}
            </span>
          </div>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, opacity: 0.85 }}>
            {probe.text || ''}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(0,0,0,0.08)',
          paddingTop: 10,
          fontSize: 12,
          opacity: 0.75
        }}>
          Next: we’ll upgrade homepage hero and wire /builder preview to your real TV/builder surface.
        </div>
      </div>
    </div>
  );
}
"@
Write-File -Path $builderPage -Content $builderPageContent

# ----------------------------------------------------------------------
# 4) Floating CTA component + safe layout injection (if present)
# ----------------------------------------------------------------------
$ctaCompDir = Join-Path $RepoRoot "src\components\d8"
Ensure-Dir $ctaCompDir

$ctaComp = Join-Path $ctaCompDir "D8BuilderLauncher.tsx"
$ctaCompContent = @"
'use client';

import React from 'react';

export default function D8BuilderLauncher() {
  return (
    <a
      href="/builder"
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 9999,
        textDecoration: 'none'
      }}
      aria-label="Launch Builder"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          borderRadius: 999,
          background: 'rgba(0,0,0,0.90)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.16)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          fontSize: 13,
          fontWeight: 700
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 999, background: '#35f28f', display: 'inline-block' }} />
        Launch Builder
      </div>
    </a>
  );
}
"@
Write-File -Path $ctaComp -Content $ctaCompContent

# Safe injection into src/app/layout.tsx (if it exists)
$layoutPath = Join-Path $RepoRoot "src\app\layout.tsx"
if (Test-Path -LiteralPath $layoutPath) {
  $layout = Get-Content -LiteralPath $layoutPath -Raw

  $needsImport = ($layout -notmatch "D8BuilderLauncher")
  $hasBodyClose = ($layout -match "</body>")

  if ($hasBodyClose) {
    if ($needsImport -and ($layout -match "from\s+['""]react['""]")) {
      # insert import after react import (best-effort)
      $layout = $layout -replace "(from\s+['""]react['""];?\s*)", "`$1`nimport D8BuilderLauncher from '@/components/d8/D8BuilderLauncher';`n"
    } elseif ($needsImport -and ($layout -match "export\s+default")) {
      # insert import near top (best-effort)
      $layout = "import D8BuilderLauncher from '@/components/d8/D8BuilderLauncher';`n" + $layout
    }

    if ($layout -notmatch "<D8BuilderLauncher") {
      $layout = $layout -replace "</body>", "  <D8BuilderLauncher />`n</body>"
    }

    Backup-File $layoutPath
    Set-Content -LiteralPath $layoutPath -Value $layout -Encoding UTF8
    Ok "Injected floating Launch Builder CTA into src/app/layout.tsx"
  } else {
    Warn "layout.tsx found but no </body> tag detected; skipping injection."
  }
} else {
  Warn "src/app/layout.tsx not found; skipping floating CTA injection."
}

Ok "MEGA BUILD PATCH complete."
