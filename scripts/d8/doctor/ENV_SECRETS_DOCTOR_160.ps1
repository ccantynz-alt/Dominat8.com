Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

Write-Host "=== ENV & SECRETS DOCTOR ===" -ForegroundColor Cyan

if (Get-Command gh -ErrorAction SilentlyContinue) {
  Write-Host "GitHub auth:" -ForegroundColor Yellow
  gh auth status
} else {
  Write-Host "gh CLI not installed" -ForegroundColor Yellow
}

if (Get-Command vercel -ErrorAction SilentlyContinue) {
  Write-Host ""
  Write-Host "Vercel env:" -ForegroundColor Yellow
  vercel env ls
} else {
  Write-Host "vercel CLI not installed" -ForegroundColor Yellow
}