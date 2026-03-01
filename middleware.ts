import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // DXL admin auth-check bypass
  if (pathname === "/api/dxl/auth-check" || pathname === "/api/__where__/dxl-auth-check") {
    return NextResponse.next();
  }

  // Legacy probe redirect
  if (pathname === "/api/__probe__" || pathname === "/api/__probe__/") {
    const u = req.nextUrl.clone();
    u.pathname = "/api/probe";
    const res = NextResponse.redirect(u, 307);
    res.headers.set("x-dominat8-mw-legacy", "redirect307");
    return res;
  }

  // Legacy ping redirect
  if (pathname === "/api/__ping__" || pathname === "/api/__ping__/") {
    const u = req.nextUrl.clone();
    u.pathname = "/api/ping";
    const res = NextResponse.redirect(u, 307);
    res.headers.set("x-dominat8-mw-legacy", "redirect307");
    return res;
  }

  // API routes: pass through with marker header
  if (pathname.startsWith("/api/")) {
    const res = NextResponse.next();
    res.headers.set("x-dominat8-mw", "1");
    return res;
  }

  // All other routes: anti-cache headers
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("Surrogate-Control", "no-store");
  return res;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
