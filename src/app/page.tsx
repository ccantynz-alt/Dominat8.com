export const dynamic = "force-dynamic";
export const revalidate = 0;

import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import Link from "next/link";

const features = [
  { icon: "bolt" as const, title: "AI-Powered Generation", desc: "Describe your business. Get a full site spec, pages, and copy — generated in minutes, not weeks." },
  { icon: "target" as const, title: "Conversion-First Design", desc: "Every section is engineered for action: hero, trust strip, features, proof, pricing, CTA ladder." },
  { icon: "layers" as const, title: "Premium Templates", desc: "Start with proven layouts for SaaS, local service, portfolio, agency, product landing, and more." },
  { icon: "globe" as const, title: "Publish & Map Domains", desc: "Ship to your custom domain with one click. SSL provisioned, DNS verified, live in seconds." },
  { icon: "cpu" as const, title: "Agent-Driven Pipeline", desc: "Automated agents handle SEO, metadata, sitemap, robots.txt, and ongoing optimization passes." },
  { icon: "shield" as const, title: "Build-Gated Deploys", desc: "Nothing ships unless the build is green. No silent failures, no broken production." },
];

const steps = [
  { num: "01", icon: "sparkle" as const, title: "Describe your idea", desc: "Enter a brief about your business. The AI generates a full site spec with pages, sections, and copy." },
  { num: "02", icon: "code" as const, title: "Review & refine", desc: "Preview your generated site. Swap sections, edit copy, reorder — iterate until it's perfect." },
  { num: "03", icon: "rocket" as const, title: "Publish & grow", desc: "Ship to your domain. Run SEO passes. Track performance. Scale with confidence." },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 65% 5%, rgba(168,85,247,0.22), rgba(0,0,0,0) 60%)," +
          " radial-gradient(900px 700px at 15% 20%, rgba(59,130,246,0.14), rgba(0,0,0,0) 62%)," +
          " linear-gradient(180deg, #07070B 0%, #07070B 40%, #05050A 100%)",
        color: "#EDEAF7",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        padding: "28px 16px 56px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1160, margin: "0 auto" }}>
        {/* NAV */}
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
                AI website builder for conversion-first sites
              </div>
            </div>
          </Link>

          <nav
            aria-label="Top navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {[
              { href: "/templates", label: "Templates", icon: "layers" as const },
              { href: "/pricing", label: "Pricing", icon: "credit-card" as const },
              { href: "/gallery", label: "Gallery", icon: "eye" as const },
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

        {/* HERO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 18,
            alignItems: "stretch",
            marginTop: 6,
          }}
        >
          <section style={{ padding: "18px 8px 8px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, rgba(168,85,247,0.18), rgba(59,130,246,0.10))",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 10px 40px rgba(168,85,247,0.08)",
                color: "rgba(237,234,247,0.92)",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              <GlossyIconInline name="sparkle" size={14} />
              <span style={{ opacity: 0.95 }}>AI-Powered Website Factory</span>
            </div>

            <h1
              style={{
                marginTop: 16,
                fontSize: 50,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                fontWeight: 900,
                color: "#F6F2FF",
                textShadow: "0 20px 80px rgba(168,85,247,0.18)",
              }}
            >
              Your site should do more than{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                look good
              </span>
              .
            </h1>

            <p
              style={{
                marginTop: 14,
                maxWidth: 640,
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(237,234,247,0.78)",
              }}
            >
              Dominat8 builds polished, conversion-first pages fast — with AI agents that handle
              generation, SEO, and publishing so you can focus on growing.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18, alignItems: "center" }}>
              <Link
                href="/templates"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "12px 18px",
                  borderRadius: 14,
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "#07070B",
                  background:
                    "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))",
                  boxShadow:
                    "0 18px 55px rgba(168,85,247,0.26), 0 10px 24px rgba(59,130,246,0.16)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <GlossyIconInline name="rocket" size={16} /> Start Building Now
              </Link>

              <Link
                href="/pricing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "12px 18px",
                  borderRadius: 14,
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "rgba(237,234,247,0.88)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                }}
              >
                <GlossyIconInline name="credit-card" size={16} /> View Pricing
              </Link>
            </div>
          </section>

          {/* PREVIEW CARD */}
          <aside
            id="preview"
            aria-label="Preview card"
            style={{
              borderRadius: 20,
              padding: 14,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow:
                "0 30px 90px rgba(0,0,0,0.45), 0 20px 55px rgba(168,85,247,0.10)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -60,
                background:
                  "radial-gradient(closest-side at 70% 30%, rgba(168,85,247,0.32), rgba(0,0,0,0) 70%)," +
                  " radial-gradient(closest-side at 30% 70%, rgba(59,130,246,0.20), rgba(0,0,0,0) 70%)",
                filter: "blur(14px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { label: "AI GENERATED", icon: "cpu" as const },
                  { label: "SEO READY", icon: "chart" as const },
                  { label: "CONVERSION FIRST", icon: "target" as const },
                ].map((t) => (
                  <div
                    key={t.label}
                    style={{
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      padding: "8px 10px",
                      borderRadius: 999,
                      background: "rgba(0,0,0,0.35)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(237,234,247,0.85)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <GlossyIconInline name={t.icon} size={12} />
                    {t.label}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 14,
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(237,234,247,0.84)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <GlossyIcon name="eye" size={28} />
                Live Preview
              </div>

              <div
                style={{
                  marginTop: 12,
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,0,0,0.35)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: "10px 12px",
                    borderBottom: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {["#f43f5e", "#facc15", "#22c55e"].map((c) => (
                      <span
                        key={c}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 999,
                          background: c,
                          boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.82, fontWeight: 800 }}>dominat8.com</div>
                </div>

                <div
                  style={{
                    padding: 12,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    fontSize: 12,
                    lineHeight: 1.55,
                    color: "rgba(237,234,247,0.80)",
                  }}
                >
                  <div style={{ marginBottom: 10, fontWeight: 900, opacity: 0.95, display: "flex", alignItems: "center", gap: 6 }}>
                    <GlossyIconInline name="check" size={14} />
                    BUILD OK — Site Generated
                  </div>
                  <div style={{ opacity: 0.7 }}>
                    Your premium site is live and conversion-ready.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.5, color: "rgba(237,234,247,0.72)", display: "flex", alignItems: "center", gap: 6 }}>
                <GlossyIconInline name="bolt" size={14} />
                Powered by AI agents — generation to publish in minutes.
              </div>
            </div>
          </aside>
        </div>

        {/* FEATURES GRID */}
        <section style={{ marginTop: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: "linear-gradient(90deg, rgba(168,85,247,0.15), rgba(59,130,246,0.08))",
                border: "1px solid rgba(255,255,255,0.10)",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(237,234,247,0.85)",
              }}
            >
              <GlossyIconInline name="star" size={14} />
              Why Dominat8
            </div>
            <h2
              style={{
                marginTop: 14,
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "#F6F2FF",
              }}
            >
              Everything you need to ship premium sites
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  borderRadius: 18,
                  padding: 20,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
                }}
              >
                <GlossyIcon name={f.icon} size={44} />
                <div style={{ marginTop: 14, fontSize: 15, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>{f.title}</div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55, color: "rgba(237,234,247,0.68)" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginTop: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: "linear-gradient(90deg, rgba(59,130,246,0.15), rgba(168,85,247,0.08))",
                border: "1px solid rgba(255,255,255,0.10)",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(237,234,247,0.85)",
              }}
            >
              <GlossyIconInline name="zap" size={14} />
              How It Works
            </div>
            <h2
              style={{
                marginTop: 14,
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "#F6F2FF",
              }}
            >
              Three steps to a premium website
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {steps.map((s) => (
              <div
                key={s.num}
                style={{
                  borderRadius: 18,
                  padding: 22,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <GlossyIcon name={s.icon} size={44} />
                  <div style={{ fontSize: 28, fontWeight: 900, color: "rgba(168,85,247,0.25)" }}>{s.num}</div>
                </div>
                <div style={{ marginTop: 14, fontSize: 15, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>{s.title}</div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55, color: "rgba(237,234,247,0.68)" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          style={{
            marginTop: 48,
            borderRadius: 24,
            padding: 32,
            background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(59,130,246,0.08))",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 30px 90px rgba(0,0,0,0.3), 0 20px 55px rgba(168,85,247,0.08)",
            textAlign: "center",
          }}
        >
          <GlossyIcon name="rocket" size={56} style={{ margin: "0 auto" }} />
          <h2 style={{ marginTop: 16, fontSize: 28, fontWeight: 900, color: "#F6F2FF" }}>
            Ready to build something premium?
          </h2>
          <p style={{ marginTop: 10, fontSize: 15, color: "rgba(237,234,247,0.72)", maxWidth: 500, margin: "10px auto 0" }}>
            Start free. Generate your first site in minutes. Upgrade when you want full automation.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
            <Link
              href="/templates"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 14,
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 14,
                color: "#07070B",
                background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))",
                boxShadow: "0 18px 55px rgba(168,85,247,0.26), 0 10px 24px rgba(59,130,246,0.16)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <GlossyIconInline name="bolt" size={16} /> Get Started Free
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 14,
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 14,
                color: "rgba(237,234,247,0.88)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              }}
            >
              <GlossyIconInline name="mail" size={16} /> Talk to Us
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <div
          style={{
            marginTop: 34,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
            opacity: 0.85,
            fontSize: 12,
            color: "rgba(237,234,247,0.65)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <GlossyIconInline name="zap" size={12} />
            &copy; {new Date().getFullYear()} Dominat8
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/contact", label: "Contact" },
              { href: "/about", label: "About" },
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
      </div>
    </main>
  );
}
