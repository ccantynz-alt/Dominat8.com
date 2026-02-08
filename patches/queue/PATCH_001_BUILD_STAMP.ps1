Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = "C:\Temp\FARMS\Dominat8.com"
Set-Location -LiteralPath $RepoRoot

# Create a stamp file the site can expose
$stampDir = Join-Path $RepoRoot "src"
if (-not (Test-Path -LiteralPath $stampDir)) { throw "Missing src folder: $stampDir" }

$stampValue = "D8_STAMP_" + (Get-Date -Format "yyyyMMdd_HHmmss")
$stampPath = Join-Path $RepoRoot "src\d8_build_stamp.ts"

@"
export const D8_BUILD_STAMP = `"$stampValue`";
"@ | Set-Content -LiteralPath $stampPath -Encoding UTF8

# Add an API route to read it (Next.js app router)
$apiDir = Join-Path $RepoRoot "src\app\api\d8\stamp"
New-Item -ItemType Directory -Path $apiDir -Force | Out-Null

$apiPath = Join-Path $apiDir "route.ts"
@"
import { NextResponse } from 'next/server';
import { D8_BUILD_STAMP } from '@/d8_build_stamp';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    stamp: D8_BUILD_STAMP,
    ts: Date.now()
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Pragma': 'no-cache'
    }
  });
}
"@ | Set-Content -LiteralPath $apiPath -Encoding UTF8

Write-Host "OK   Added /api/d8/stamp endpoint"
