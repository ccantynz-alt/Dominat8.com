Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string] $RepoRoot = "C:\Temp\FARMS\Dominat8.com",
  [string] $Inbox = (Join-Path "C:\Temp\FARMS\Dominat8.com" "patchpacks\inbox"),
  [string] $Queue = (Join-Path "C:\Temp\FARMS\Dominat8.com" "patches\queue"),
  [string] $Archive = (Join-Path "C:\Temp\FARMS\Dominat8.com" "patchpacks\archive")
)

function Info($m){ Write-Host ("INFO " + $m) -ForegroundColor Gray }
function Ok($m){ Write-Host ("OK   " + $m) -ForegroundColor Green }
function Warn($m){ Write-Host ("WARN " + $m) -ForegroundColor Yellow }

New-Item -ItemType Directory -Path $Inbox -Force | Out-Null
New-Item -ItemType Directory -Path $Queue -Force | Out-Null
New-Item -ItemType Directory -Path $Archive -Force | Out-Null

Info ("Inbox  : " + $Inbox)
Info ("Queue  : " + $Queue)
Info ("Archive: " + $Archive)

$items = Get-ChildItem -LiteralPath $Inbox -Force
if (-not $items -or $items.Count -eq 0) { Ok "No patchpacks in inbox."; exit 0 }

foreach ($it in $items) {
  if ($it.PSIsContainer) {
    Info ("Import folder: " + $it.Name)
    Get-ChildItem -LiteralPath $it.FullName -Recurse -Filter "*.ps1" -File | ForEach-Object {
      $dest = Join-Path $Queue ($_.Name)
      Copy-Item -LiteralPath $_.FullName -Destination $dest -Force
      Ok ("Queued: " + $_.Name)
    }
    Move-Item -LiteralPath $it.FullName -Destination (Join-Path $Archive ($it.Name + ".folder." + (Get-Date -Format "yyyyMMdd_HHmmss"))) -Force
  } elseif ($it.Extension -ieq ".zip") {
    Info ("Import zip: " + $it.Name)
    $tmp = Join-Path $Inbox ("_unz_" + [Guid]::NewGuid().ToString("N"))
    New-Item -ItemType Directory -Path $tmp -Force | Out-Null
    Expand-Archive -LiteralPath $it.FullName -DestinationPath $tmp -Force
    Get-ChildItem -LiteralPath $tmp -Recurse -Filter "*.ps1" -File | ForEach-Object {
      $dest = Join-Path $Queue ($_.Name)
      Copy-Item -LiteralPath $_.FullName -Destination $dest -Force
      Ok ("Queued: " + $_.Name)
    }
    Remove-Item -LiteralPath $tmp -Recurse -Force
    Move-Item -LiteralPath $it.FullName -Destination (Join-Path $Archive ($it.Name + "." + (Get-Date -Format "yyyyMMdd_HHmmss"))) -Force
  } else {
    Warn ("Skipping non-zip file: " + $it.Name)
  }
}

Ok "Patchpack importer finished."