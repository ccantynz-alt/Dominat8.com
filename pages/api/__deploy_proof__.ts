#Requires -Version 5.1
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Fail($msg) {
  Write-Host ""
  Write-Host "ERROR: $msg" -ForegroundColor Red
  exit 1
}

function Info($msg) {
  Write-Host ""
  Write-Host $msg -ForegroundColor Cyan
}

function Ok($msg) {
  Write-Host "OK: $msg" -ForegroundColor Green
}

try { git rev-parse --is-inside-work-tree *> $null } catch { Fail "Not inside a git repository." }

Info "== Git branch check =="
$branch = (git rev-parse --abbrev-ref HEAD).Trim()
if ($branch -ne "main") { Fail "You must be on branch 'main'." }
Ok "On main."

$useSrcPages = Test-Path ".\src\pages"
if ($useSrcPages) {
  $apiDir = ".\src\pages\api"
  $proofFile = ".\src\pages\api\__deploy_proof__.ts"
} else {
  $apiDir = ".\pages\api"
  $proofFile = ".\pages\api\__deploy_proof__.ts"
}

New-Item -ItemType Directory -Force -Path $apiDir | Out-Null

@'
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  res.status(200).json({
    ok: true,
    token: process.env.DEPLOY_PROOF_TOKEN || "D8-MISSING-TOKEN",
    builtAtUtc: new Date().toISOString(),
    gitSha: process.env.VERCEL_GIT_COMMIT_SHA || "unknown",
    vercelEnv: process.env.VERCEL_ENV || "unknown",
  });
}
