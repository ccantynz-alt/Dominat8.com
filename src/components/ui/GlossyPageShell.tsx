import React from "react";
import Link from "next/link";
import GlossyIcon, { GlossyIconInline } from "./GlossyIcon";
import type { IconName } from "./GlossyIcon";

export function GlossyNav() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 0 22px",
      }}
    >
      <Link
        href="/"
        aria-label="Dominat8 Home"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          color: "#F3EEFF",
        }}
      >
        <GlossyIcon name="zap" size={34} />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.9,
              fontWeight: 700,
            }}
          >
            Dominat8
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 3 }}>
            AI website builder
          </div>
        </div>
      </Link>

      <nav
        aria-label="Top navigation"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        {[
          { href: "/templates", label: "Templates", icon: "layers" as const },
          { href: "/pricing", label: "Pricing", icon: "credit-card" as const },
          { href: "/use-cases", label: "Use Cases", icon: "briefcase" as const },
          { href: "/faq", label: "FAQ", icon: "question" as const },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: 13,
              color: "rgba(237,234,247,0.82)",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <GlossyIconInline name={l.icon} size={14} />
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function GlossyFooter() {
  return (
    <div
      style={{
        marginTop: 40,
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "center",
        opacity: 0.85,
        fontSize: 12,
        color: "rgba(237,234,247,0.65)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: 18,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <GlossyIconInline name="zap" size={12} />
        &copy; {new Date().getFullYear()} Dominat8
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {[
          { href: "/about", label: "About" },
          { href: "/templates", label: "Templates" },
          { href: "/gallery", label: "Gallery" },
          { href: "/pricing", label: "Pricing" },
          { href: "/faq", label: "FAQ" },
          { href: "/contact", label: "Contact" },
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              color: "rgba(237,234,247,0.70)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(237,234,247,0.20)",
              paddingBottom: 2,
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function GlossyPageHeader({
  icon,
  eyebrow,
  title,
  subtitle,
  ctaHref,
  ctaLabel,
  ctaIcon,
}: {
  icon: IconName;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaIcon?: IconName;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 999,
          background: "linear-gradient(90deg, rgba(168,85,247,0.18), rgba(59,130,246,0.10))",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 10px 40px rgba(168,85,247,0.08)",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(237,234,247,0.85)",
        }}
      >
        <GlossyIconInline name={icon} size={14} />
        {eyebrow}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1
            style={{
              marginTop: 16,
              fontSize: 40,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 900,
              color: "#F6F2FF",
              textShadow: "0 20px 80px rgba(168,85,247,0.12)",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              marginTop: 12,
              maxWidth: 600,
              fontSize: 15,
              lineHeight: 1.55,
              color: "rgba(237,234,247,0.72)",
            }}
          >
            {subtitle}
          </p>
        </div>

        {ctaHref && ctaLabel && (
          <Link
            href={ctaHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 14,
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 13,
              color: "#07070B",
              background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))",
              boxShadow: "0 18px 55px rgba(168,85,247,0.20), 0 10px 24px rgba(59,130,246,0.12)",
              border: "1px solid rgba(255,255,255,0.10)",
              flexShrink: 0,
            }}
          >
            {ctaIcon && <GlossyIconInline name={ctaIcon} size={14} />}
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

export function GlossyCard({
  icon,
  title,
  children,
  kicker,
}: {
  icon: IconName;
  title: string;
  children: React.ReactNode;
  kicker?: string;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        padding: 20,
        background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <GlossyIcon name={icon} size={38} />
        {kicker && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(168,85,247,0.70)",
            }}
          >
            {kicker}
          </span>
        )}
      </div>
      <div style={{ marginTop: 12, fontSize: 15, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>{title}</div>
      <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.55, color: "rgba(237,234,247,0.68)" }}>{children}</div>
    </div>
  );
}

export default function GlossyPageShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 65% 5%, rgba(168,85,247,0.20), rgba(0,0,0,0) 60%)," +
          " radial-gradient(900px 700px at 15% 20%, rgba(59,130,246,0.12), rgba(0,0,0,0) 62%)," +
          " linear-gradient(180deg, #07070B 0%, #07070B 40%, #05050A 100%)",
        color: "#EDEAF7",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        padding: "28px 16px 56px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1160, margin: "0 auto" }}>
        <GlossyNav />
        {children}
        <GlossyFooter />
      </div>
    </main>
  );
}
