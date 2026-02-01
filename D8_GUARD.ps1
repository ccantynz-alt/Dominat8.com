Set-StrictMode -Version Latest
$ErrorActionPreference="Stop"

$expected = "ccantynz-alt/Dominat8.com.git"
$origin = (git remote get-url origin | Out-String).Trim()

if ($origin -notlike "*Dominat8.com*") {
  throw "WRONG REPO. origin=$origin (expected Dominat8.com)"
}

if (-not (Test-Path -LiteralPath ".vercel\project.json")) {
  throw "Missing .vercel\project.json — run: vercel link"
}

Write-Host "OK: repo + vercel link look correct." -ForegroundColor Green
