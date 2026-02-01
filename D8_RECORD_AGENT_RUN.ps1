Set-StrictMode -Version Latest
$ErrorActionPreference="Stop"

param(
  [Parameter(Mandatory=$false)][string]$BaseUrl = "http://localhost:3000",
  [Parameter(Mandatory=$false)][string]$Agent = "build-repair",
  [Parameter(Mandatory=$false)][ValidateSet("queued","running","success","failure","skipped")][string]$Status = "running",
  [Parameter(Mandatory=$false)][string]$Summary = "Agent run recorded from PowerShell",
  [Parameter(Mandatory=$false)][string]$Detail = ""
)

$payload = @{
  id = ("ps_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
  agent = $Agent
  status = $Status
  summary = $Summary
  detail = $Detail
  createdAtIso = (Get-Date).ToUniversalTime().ToString("o")
} | ConvertTo-Json -Depth 6

Write-Host "POST $BaseUrl/api/__d8__/agent-runs" -ForegroundColor Cyan
curl.exe -s -S -X POST "$BaseUrl/api/__d8__/agent-runs" -H "content-type: application/json" --data-binary $payload
