export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * ROUTING TRUTH — Dominat8
 * If you see this, / is working.
 * HOME_OK
 */

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>
        ROUTING TRUTH CONFIRMED
      </h1>
      <p style={{ marginTop: 16, fontSize: 18, opacity: 0.8 }}>
        You are seeing a real homepage route for <strong>/</strong>.
      </p>
      <p style={{ marginTop: 10, fontSize: 14, opacity: 0.65 }}>
        Build time: {new Date().toISOString()}
      </p>

      <div
        id="d8-build-marker"
        style={{
          position: "fixed",
          bottom: 12,
          right: 12,
          background: "black",
          color: "white",
          padding: "6px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        HOME_OK · ROUTE_OK
      </div>
    </main>
  );
}