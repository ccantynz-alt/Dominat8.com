export default function HomePage() {
  const marker = "PHASE6_HERO_BG_OK_20260125_151901";

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* hidden marker for verification */}
      <div style={{ position: "absolute", left: -9999, top: -9999 }}>{marker}</div>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 20px 72px",
        }}
      >
        {/* Background layer (always visible) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/hero/hero-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.1)",
            transform: "scale(1.02)",
          }}
        />

        {/* Vignette + contrast overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(900px 520px at 35% 30%, rgba(124,92,255,0.25), rgba(0,0,0,0) 65%), linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75))",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            width: "min(1080px, 100%)",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(10px)",
              marginBottom: 18,
              fontSize: 13,
              letterSpacing: 0.2,
              opacity: 0.95,
            }}
          >
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: "#7CFFB2" }} />
            Dominat8 — AI website automation
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 4.6vw, 4.1rem)",
              lineHeight: 1.05,
              margin: "0 0 14px",
              letterSpacing: -0.8,
              textShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            Launch a world-class site
            <br />
            in minutes — not weeks.
          </h1>

          <p
            style={{
              maxWidth: 720,
              fontSize: "clamp(1.02rem, 1.35vw, 1.18rem)",
              lineHeight: 1.55,
              opacity: 0.82,
              margin: "0 0 26px",
            }}
          >
            Dominat8 generates your pages, writes SEO, and prepares your publish pipeline —
            so you can ship faster with confidence.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="/new"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 18px",
                borderRadius: 12,
                fontWeight: 800,
                color: "#000",
                background: "linear-gradient(135deg, #7c5cff, #4dd2ff)",
                textDecoration: "none",
              }}
            >
              Build my site
            </a>

            <a
              href="/templates"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 18px",
                borderRadius: 12,
                fontWeight: 700,
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(10px)",
                textDecoration: "none",
              }}
            >
              View templates
            </a>
          </div>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
              maxWidth: 920,
            }}
          >
            {[
              ["Finish-for-me", "Auto-completes your site from a brief."],
              ["SEO V2", "Titles, descriptions, sitemap, and structure."],
              ["Publish-ready", "A clean pipeline from spec → live pages."],
            ].map(([t, d]) => (
              <div
                key={t}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 16,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: 6 }}>{t}</div>
                <div style={{ opacity: 0.78, fontSize: 14, lineHeight: 1.4 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple footer spacer */}
      <section style={{ padding: "22px 20px 48px", opacity: 0.7, textAlign: "center" }}>
        <small>Marker: {marker}</small>
      </section>
    </main>
  );
}
