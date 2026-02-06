import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // NUKE_006: hard bypass for API + Next internals + static assets (prevents /api/* -> /404 via rewrites)
  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname.startsWith("/_next/") ||
    req.nextUrl.pathname.startsWith("/favicon") ||
    req.nextUrl.pathname.startsWith("/robots") ||
    req.nextUrl.pathname.startsWith("/sitemap") ||
    req.nextUrl.pathname.startsWith("/assets") ||
    req.nextUrl.pathname.match(/\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|txt|xml)$/i)
  ) {
    return NextResponse.next();
  }
  
  
  
  // D8_MW_ARGS_BYPASS_20260206_203956 (parameter-name-safe bypass)
  try {
    const __req: any = (arguments as any)[0];
    const __p: string = (__req?.nextUrl?.pathname || "");
    if (
      __p.startsWith("/api/") ||
      __p.startsWith("/_next/") ||
      __p === "/favicon.ico" ||
      __p === "/robots.txt" ||
      __p === "/sitemap.xml" ||
      __p === "/admin/ops" || __p.startsWith("/admin/ops/")
    ) {
      return NextResponse.next();
    }
  } catch {}
// === D8_ENGINE_0072B_TRUTH_AND_LEGACY ===
  const __d8_path = req.nextUrl.pathname
  const __d8_stamp = "D8_MW_TRUTH_0072B_20260128_234407"

  if (__d8_path === "/api/__probe__" || __d8_path === "/api/__probe__/") {
    const u = req.nextUrl.clone()
    u.pathname = "/api/probe"
    const res = NextResponse.redirect(u, 307)
    res.headers.set("x-dominat8-mw-legacy", "redirect307")
    res.headers.set("x-dominat8-mw-hit", __d8_stamp)
    res.headers.set("x-dominat8-mw-path", __d8_path)
    return res
  }

  if (__d8_path === "/api/__ping__" || __d8_path === "/api/__ping__/") {
    const u = req.nextUrl.clone()
    u.pathname = "/api/ping"
    const res = NextResponse.redirect(u, 307)
    res.headers.set("x-dominat8-mw-legacy", "redirect307")
    res.headers.set("x-dominat8-mw-hit", __d8_stamp)
    res.headers.set("x-dominat8-mw-path", __d8_path)
    return res
  }
  // === /D8_ENGINE_0072B_TRUTH_AND_LEGACY ===
const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api/")) {
    const res = NextResponse.next(); res.headers.set("x-dominat8-mw", "1"); return res;
}
// Do NOT rewrite/redirect routes here. Just set anti-cache headers.
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("Surrogate-Control", "no-store");
  return res;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)",
    "/api/__probe__",
    "/api/__ping__",
  ],
};