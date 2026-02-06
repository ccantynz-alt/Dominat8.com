import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  const adminKeyPresent = !!process.env.D8_ADMIN_KEY && process.env.D8_ADMIN_KEY.length >= 12;
  const deployHookPresent = !!process.env.D8_VERCEL_DEPLOY_HOOK_URL && process.env.D8_VERCEL_DEPLOY_HOOK_URL.startsWith("https://");

  return NextResponse.json({
    ok: true,
    service: "dominat8.com",
    stamp: "D8_COM_API_20260206_185436",
    time: new Date().toISOString(),
    checks: {
      D8_ADMIN_KEY_present: adminKeyPresent,
      D8_VERCEL_DEPLOY_HOOK_URL_present: deployHookPresent
    }
  }, { status: 200 });
}