"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import type { IconName } from "@/components/ui/GlossyIcon";

type NavItem = { href: string; label: string; hint?: string; icon: IconName };

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function NavList(props: { nav: NavItem[]; pathname: string | null; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-1">
      {props.nav.map((n) => {
        const active = props.pathname === n.href || (n.href !== "/admin" && props.pathname?.startsWith(n.href));
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={props.onNavigate}
            className={cx(
              "group rounded-xl px-3 py-2 transition border",
              active
                ? "bg-white/12 border-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                : "bg-transparent border-transparent hover:bg-white/6 hover:border-white/10"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GlossyIconInline name={n.icon} size={16} />
                <div className="text-sm font-medium text-white/90">{n.label}</div>
              </div>
              <div className="text-[10px] text-white/55 group-hover:text-white/75">{n.hint || ""}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function AdminShellClient(props: { children: React.ReactNode; buildStamp: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav: NavItem[] = useMemo(
    () => [
      { href: "/admin", label: "Dashboard", hint: "Overview", icon: "zap" },
      { href: "/admin/projects", label: "Projects", hint: "Your sites", icon: "layers" },
      { href: "/admin/agents", label: "Agents", hint: "Runs & Bundles", icon: "cpu" },
      { href: "/admin/domains", label: "Domains", hint: "Custom domains", icon: "globe" },
      { href: "/admin/billing", label: "Billing", hint: "Plans & Stripe", icon: "credit-card" },
      { href: "/admin/settings", label: "Settings", hint: "Workspace", icon: "settings" },
    ],
    []
  );

  return (
    <div className="min-h-screen text-white">
      <div className="fixed inset-0 -z-10 bg-[#050712]" />
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-18 [background:radial-gradient(900px_circle_at_18%_12%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(900px_circle_at_82%_18%,rgba(59,130,246,0.18),transparent_58%),radial-gradient(900px_circle_at_50%_86%,rgba(245,158,11,0.10),transparent_60%)]" />
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-70 [background:radial-gradient(1200px_circle_at_50%_40%,transparent_35%,rgba(0,0,0,0.65)_80%)]" />

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-[340px] border-r border-white/15 bg-black/70 backdrop-blur-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GlossyIcon name="zap" size={28} />
                <div>
                  <div className="text-sm font-semibold tracking-wide text-white/95">Dominat8</div>
                  <div className="text-xs text-white/70">Admin Console</div>
                </div>
              </div>
              <button
                className="rounded-xl border border-white/15 bg-white/8 px-3 py-2 text-xs text-white/90 hover:bg-white/12"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-4">
              <div className="mb-2 px-2 text-[11px] font-semibold tracking-wide text-white/65">
                NAVIGATION
              </div>
              <NavList nav={nav} pathname={pathname} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="relative flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex lg:w-[300px] lg:flex-col lg:gap-4 lg:border-r lg:border-white/12 lg:bg-black/35 lg:backdrop-blur-xl">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GlossyIcon name="zap" size={32} />
                <div>
                  <div className="text-sm font-semibold tracking-wide text-white/95">Dominat8</div>
                  <div className="text-xs text-white/70">Admin Console</div>
                </div>
              </div>
              <span className="rounded-full border border-white/15 bg-white/8 px-2 py-1 text-[10px] text-white/80">
                v1
              </span>
            </div>
          </div>

          <nav className="px-4 pb-6">
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wide text-white/65">
              NAVIGATION
            </div>
            <NavList nav={nav} pathname={pathname} />
            <div className="mt-6 rounded-2xl border border-white/12 bg-white/6 p-4">
              <div className="text-xs font-semibold text-white/90" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <GlossyIconInline name="shield" size={14} /> Status
              </div>
              <div className="mt-2 text-[11px] text-white/70">High-contrast mode enabled.</div>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
                <span className="text-[11px] text-white/75">UI baseline: green</span>
              </div>
            </div>
          </nav>
        </aside>

        <main className="flex-1">
          {/* Topbar */}
          <div className="sticky top-0 z-10 border-b border-white/10 bg-black/35 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden rounded-2xl border border-white/15 bg-white/8 px-3 py-2 text-xs text-white/90 hover:bg-white/12"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <GlossyIconInline name="layers" size={14} />
                  Menu
                </button>

                <div className="hidden sm:block">
                  <GlossyIcon name="zap" size={36} />
                </div>

                <div>
                  <div className="text-sm font-semibold tracking-tight text-white/95">Admin</div>
                  <div className="text-[11px] text-white/75">Ship sites faster. Keep it stable.</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="rounded-xl border border-white/15 bg-white/8 px-3 py-2 text-xs text-white/90 hover:bg-white/12"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <GlossyIconInline name="eye" size={14} />
                  View Site
                </Link>
                <Link
                  href="/admin/settings"
                  className="rounded-xl border border-white/12 bg-white/6 px-3 py-2 text-xs text-white/90 hover:bg-white/10"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <GlossyIconInline name="settings" size={14} />
                  Settings
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-6xl px-4 py-8">{props.children}</div>

          {/* Footer stamp */}
          <div className="mx-auto max-w-6xl px-4 pb-10">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-[11px] text-white/70" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <GlossyIconInline name="code" size={12} />
              BUILD_STAMP: <span className="font-mono text-white/85">{props.buildStamp}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
