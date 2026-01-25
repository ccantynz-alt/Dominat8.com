$ErrorActionPreference = "Stop"

function Find-RepoRoot {
  param([string]$StartDir)
  $d = (Resolve-Path -LiteralPath $StartDir).Path
  for ($i=0; $i -lt 30; $i++) {
    if (Test-Path -LiteralPath (Join-Path $d "package.json")) { return $d }
    if (Test-Path -LiteralPath (Join-Path $d ".git"))        { return $d }
    $parent = Split-Path -Parent $d
    if ($parent -eq $d -or [string]::IsNullOrWhiteSpace($parent)) { break }
    $d = $parent
  }
  throw "Could not find repo root (no package.json or .git found) starting from: $StartDir"
}

Write-Host "== UPGRADE: INSTALL HERO SYSTEM v6 ==" -ForegroundColor Cyan
Write-Host ("PWD:  " + (Get-Location).Path)
Write-Host ("ROOT: " + $PSScriptRoot)

$RepoRoot = Find-RepoRoot -StartDir $PSScriptRoot
Write-Host ("RepoRoot: " + $RepoRoot) -ForegroundColor Green

$PagePath = Join-Path $RepoRoot "src\app\page.tsx"
$WriteTest = Join-Path $RepoRoot "upgrades\_hero_v6_write_test.txt"

if (!(Test-Path -LiteralPath (Split-Path -Parent $PagePath))) {
  throw "Expected folder missing: " + (Split-Path -Parent $PagePath)
}

# Stamp used in HTML so you can prove deploy is updated
$Stamp = "V6_HERO_SYSTEM_" + (Get-Date).ToString("yyyyMMdd_HHmmss")

Write-Host ""
Write-Host ("Target page: " + $PagePath) -ForegroundColor Yellow
Write-Host ("Stamp:       " + $Stamp) -ForegroundColor Yellow

# Write test
Set-Content -LiteralPath $WriteTest -Value ("HERO_V6_WRITE_OK " + (Get-Date).ToString("s") + "Z") -Encoding UTF8
if (!(Test-Path -LiteralPath $WriteTest)) { throw "Write test failed: $WriteTest" }
Write-Host ("WROTE: " + $WriteTest) -ForegroundColor Green

# Full file replacement (simple v6 hero  polished base, we can wow it next)
$NewPage = @"
export const dynamic = "force-dynamic";

export default function HomePage() {
  // PROOF markers (do not remove until we confirm live)
  const BUILD_STAMP = "$Stamp";
  const DEPLOY_ID = BUILD_STAMP;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* PROOF MARKERS */}
      <div className="hidden">
        LIVE_OK HOME_OK Hero System v6 Flagship v4 BUILD_STAMP:{BUILD_STAMP} DEPLOY_ID:{DEPLOY_ID}
      </div>

      {/* HERO v6 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.35),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(16,185,129,0.25),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(236,72,153,0.20),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl px-6 py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
            Dominat8  AI Website Automation
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Build a high-converting website
            <span className="block text-white/80">in minutes  with agents.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/70">
            From idea  pages  copy  SEO  publish. Dominat8 generates a polished site and keeps improving it.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="/templates"
              className="inline-flex items-center justify-center rounded-xl bg-white text-black px-6 py-3 text-base font-medium hover:bg-white/90 transition"
            >
              Start from a template
            </a>
            <a
              href="/use-cases"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-medium text-white hover:bg-white/10 transition"
            >
              See use-cases
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: "Finish-for-me agents", d: "Agents generate structure, content, and upgrades automatically." },
              { t: "SEO baked in", d: "Sitemaps, metadata, and on-page SEO with a single workflow." },
              { t: "Publish fast", d: "Go live instantly  then iterate without breaking production." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className="text-lg font-medium">{c.t}</div>
                <div className="mt-2 text-white/70">{c.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-sm text-white/50">
            Build stamp: <span className="text-white/70">{BUILD_STAMP}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
"@

Set-Content -LiteralPath $PagePath -Value $NewPage -Encoding UTF8

# Verify write
if (!(Test-Path -LiteralPath $PagePath)) { throw "Write failed: page.tsx missing after write" }
$check = Get-Content -LiteralPath $PagePath -Raw -Encoding UTF8
if ($check -notmatch "Hero System v6") { throw "Verification failed: v6 marker not found in page.tsx after write." }
if ($check -notmatch "V6_HERO_SYSTEM_") { throw "Verification failed: V6 stamp marker not found in page.tsx after write." }

Write-Host ("OK WROTE: " + $PagePath) -ForegroundColor Green
Write-Host "OK Verified: Hero System v6 markers present" -ForegroundColor Green

Write-Host ""
Write-Host "NEXT:" -ForegroundColor Cyan
Write-Host "  git add -A"
Write-Host "  git commit -m ""feat(home): install Hero System v6"""
Write-Host "  git push"
Write-Host "  npx --yes vercel@latest --prod --force"
