export const dynamic = "force-dynamic";

import GlossyPageShell, { GlossyPageHeader } from "@/components/ui/GlossyPageShell";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import Link from "next/link";

async function getGallery() {
  const base = process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "";
  const url = (base ? base : "") + "/api/gallery/list";
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return { ok: false, cards: [] };
    return await res.json();
  } catch {
    return { ok: false, cards: [] };
  }
}

export default async function GalleryPage() {
  const data = await getGallery();
  const cards = data && Array.isArray(data.cards) ? data.cards : [];

  return (
    <GlossyPageShell>
      <GlossyPageHeader
        icon="eye"
        eyebrow="Gallery"
        title="Real published projects"
        subtitle="See what's been built with Dominat8 — live sites generated, published, and running on custom domains."
        ctaHref="/templates"
        ctaLabel="Generate a project"
        ctaIcon="rocket"
      />

      {cards.length === 0 ? (
        <div
          style={{
            borderRadius: 20,
            padding: 28,
            background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <GlossyIcon name="layers" size={38} />
            <div style={{ fontSize: 16, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>Gallery is empty</div>
          </div>
          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: "rgba(237,234,247,0.68)" }}>
            No projects have been published to the gallery yet. Generate your first site to see it featured here.
          </p>

          <div
            style={{
              marginTop: 16,
              borderRadius: 14,
              padding: 16,
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, color: "rgba(237,234,247,0.75)" }}>
              <GlossyIconInline name="sparkle" size={14} />
              Next steps
            </div>
            <ol style={{ marginTop: 10, paddingLeft: 18, fontSize: 13, lineHeight: 1.8, color: "rgba(237,234,247,0.60)" }}>
              <li>Generate a project from a template</li>
              <li>Publish it to your domain</li>
              <li>It will appear in this gallery automatically</li>
            </ol>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
            <Link
              href="/templates"
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
              <GlossyIconInline name="rocket" size={14} /> Generate a project
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {cards.map((c) => (
            <a
              key={c.projectId}
              href={c.url || ("/p/" + c.projectId)}
              style={{
                display: "block",
                borderRadius: 20,
                overflow: "hidden",
                background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  height: 140,
                  background:
                    "radial-gradient(600px circle at 30% 20%, rgba(168,85,247,0.20), transparent 55%), radial-gradient(500px circle at 80% 60%, rgba(59,130,246,0.15), transparent 55%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <GlossyIcon name="globe" size={44} />
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ fontSize: 11, color: "rgba(237,234,247,0.55)", display: "flex", alignItems: "center", gap: 6 }}>
                  <GlossyIconInline name={c.hasPublished ? "check" : "eye"} size={12} />
                  {c.hasPublished ? "Published" : "Indexed"}
                </div>
                <div style={{ marginTop: 8, fontSize: 16, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>{c.title}</div>
                <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.55, color: "rgba(237,234,247,0.65)" }}>{c.desc}</div>
                <div
                  style={{
                    marginTop: 14,
                    fontSize: 13,
                    fontWeight: 800,
                    color: "rgba(200,170,255,0.90)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <GlossyIconInline name="arrow-right" size={14} /> Open
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </GlossyPageShell>
  );
}
