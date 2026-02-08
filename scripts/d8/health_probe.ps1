Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $Domain = "www.dominat8.com",
  [string] $ProbePath = "C:\Temp\FARMS\Dominat8.com\scripts\d8\health_probe.ps1",
  [int] $TimeoutSec = 20
)

$ts = [int][double]::Parse((Get-Date -UFormat %s))
$url = "https://$Domain$ProbePath?ts=$ts"

Write-Host ("URL: " + $url)

$out = & curl.exe -s -D - -o NUL --max-time $TimeoutSec 
  -H "Cache-Control: no-cache" 
  -H "Pragma: no-cache" 
  "$url" 2>&1

$text = ($out | Out-String)
$first = ($text -split "(
|
)")[0].Trim()
Write-Host $first

if ($first -match "HTTP/\d+\.\d+\s+(\d+)") {
  $code = [int]$Matches[1]
} else {
  Write-Host "UNKNOWN"
  Write-Host $text
  exit 2
}

if ($code -eq 200) { exit 0 }
exit 1