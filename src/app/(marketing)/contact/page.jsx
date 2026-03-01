import GlossyPageShell, { GlossyPageHeader, GlossyCard } from "@/components/ui/GlossyPageShell";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import Link from "next/link";

export default function ContactPage() {
  return (
    <GlossyPageShell>
      <GlossyPageHeader
        icon="mail"
        eyebrow="Contact"
        title="Talk to the team"
        subtitle="Tell us what you're building and we'll point you to the fastest path to a premium launch."
        ctaHref="/templates"
        ctaLabel="Generate my site"
        ctaIcon="rocket"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        <div
          style={{
            borderRadius: 20,
            padding: 24,
            background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <GlossyIcon name="mail" size={38} />
            <div style={{ fontSize: 15, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>Email</div>
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: "rgba(237,234,247,0.72)" }}>support@dominat8.com</div>

          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <GlossyIcon name="clock" size={38} />
            <div style={{ fontSize: 15, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>Response time</div>
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: "rgba(237,234,247,0.72)" }}>We aim to reply within 24 hours.</div>
        </div>

        <div
          style={{
            borderRadius: 20,
            padding: 24,
            background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <GlossyIcon name="sparkle" size={38} />
            <div style={{ fontSize: 15, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>Quick note</div>
          </div>
          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: "rgba(237,234,247,0.72)" }}>
            Whether you need help choosing a template, setting up your domain, or understanding the pipeline — we&apos;re here to help.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
            <Link
              href="/pricing"
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
                boxShadow: "0 18px 55px rgba(168,85,247,0.20)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <GlossyIconInline name="credit-card" size={14} /> View pricing
            </Link>
            <Link
              href="/faq"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderRadius: 14,
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 13,
                color: "rgba(237,234,247,0.88)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <GlossyIconInline name="question" size={14} /> Read FAQ
            </Link>
          </div>
        </div>
      </div>

      <section style={{ marginTop: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          <GlossyCard icon="bolt" title="Fast responses">
            We prioritize getting you unblocked quickly so you can ship.
          </GlossyCard>
          <GlossyCard icon="users" title="Dedicated support">
            Pro and Business plans get priority support access.
          </GlossyCard>
          <GlossyCard icon="globe" title="Domain help">
            Need help with DNS, SSL, or domain verification? We walk you through it.
          </GlossyCard>
        </div>
      </section>
    </GlossyPageShell>
  );
}
