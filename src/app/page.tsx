export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  // D8: Keep this intentionally simple and robust.
  // The real "locked hero" visuals live in the rendered markup below
  // (inline styles so it can't go plain if Tailwind fails).
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 0 22px",
          }}
        >
          <a
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
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.95), rgba(59,130,246,0.75))",
                boxShadow:
                  "0 10px 30px rgba(168,85,247,0.25), 0 10px 30px rgba(59,130,246,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            />
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
          </a>

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
              { href: "#preview", label: "Preview" },
              { href: "/templates", label: "Templates" },
              { href: "/pricing", label: "Pricing" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 13,
                  color: "rgba(237,234,247,0.82)",
                  textDecoration: "none",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

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
                padding: "8px 12px",
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
              <span style={{ opacity: 0.95 }}>Craftify-style hero</span>
              <span style={{ opacity: 0.65 }}>inline-styled fallback</span>
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
              Dominat8 builds polished, conversion-first pages fast — with a locked visual layer that
              still renders properly even if Tailwind/classes fail to load.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18, alignItems: "center" }}>
              <a
                href="/builder"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "12px 16px",
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
                Start Building Now <span aria-hidden="true">→</span>
              </a>

              <a
                href="#preview"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "12px 16px",
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
                Watch video <span aria-hidden="true">▶</span>
              </a>
            </div>
          </section>

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
                {["LIVE_OK", "BUILD PROOF", "NO-TAILWIND SAFE"].map((t) => (
                  <div
                    key={t}
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
                    }}
                  >
                    {t}
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
                }}
              >
                Live Preview (Proof)
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
                  <div style={{ marginBottom: 10, fontWeight: 900, opacity: 0.95 }}>
                    HOME_OK • Locked Hero Render
                  </div>
                  <div style={{ opacity: 0.7 }}>
                    If you see this card styled, your homepage can’t “go plain” anymore.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.5, color: "rgba(237,234,247,0.72)" }}>
                Tip: add <span style={{ fontWeight: 900, color: "rgba(237,234,247,0.90)" }}>?ts=</span> to bust cache.
              </div>
            </div>
          </aside>
        </div>

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
          <div>© {new Date().getFullYear()} Dominat8</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <a
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

