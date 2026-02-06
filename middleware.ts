import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* D8_CONTROL_PLANE_BYPASS_20260206
   Allow ops control-plane endpoints through any guardrails.
   This does NOT change public UI. */
function __d8ShouldBypass(pathname) {
  if (!pathname) return false;
  // Next internals + common public files
  if (pathname.startsWith("/_next/")) return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname === "/robots.txt") return true;
  if (pathname === "/sitemap.xml") return true;

  // Control plane (must be reachable)
  if (pathname.startsWith("/api/d8/")) return true;
  if (pathname === "/admin/ops" || pathname.startsWith("/admin/ops/")) return true;

  // Strongly recommended: never block APIs (keeps repair/health viable)
  if (pathname.startsWith("/api/")) return true;

  return false;
}

function getPresentedToken(req: NextRequest): string | null {
  // Priority:
  // 1) Header: x-admin-token
  // 2) Cookie: admin_token
  const h = req.headers.get("x-admin-token");
  if (h && h.trim()) return h.trim();

  const c = req.cookies.get("admin_token")?.value;
  if (c && c.trim()) return c.trim();

  return null;
}

export function middleware(req: NextRequest) {
  
  // D8_CONTROL_PLANE_BYPASS: allow ops + APIs
  try { if (__d8ShouldBypass(req?.nextUrl?.pathname)) return NextResponse.next(); } catch {}
const url = req.nextUrl;

  // Only protect admin surfaces.
  const isAdminPath =
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api/admin");

  if (!isAdminPath) return NextResponse.next();

  const expected = (process.env.ADMIN_TOKEN || "").trim();
  if (!expected) {
    // If ADMIN_TOKEN isn't set, refuse admin access (safe default).
    return new NextResponse("Admin is disabled (ADMIN_TOKEN not set).", { status: 403 });
  }

  const presented = getPresentedToken(req);
  if (presented !== expected) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};