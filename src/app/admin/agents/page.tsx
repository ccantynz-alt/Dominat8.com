import Link from "next/link";
import { ADMIN_DEFAULT_PROJECT_ID, getLatestBundleKv } from "@/lib/admin/kvAdmin";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";

export const dynamic = "force-dynamic";

function StatusDot(props: { status: string }) {
  const s = (props.status || "").toLowerCase();
  const cls =
    s === "ok" ? "bg-emerald-400/80" :
    s === "contract_fail" ? "bg-amber-400/80" :
    s === "error" ? "bg-rose-400/80" :
    "bg-white/30";
  return <span className={"h-2 w-2 rounded-full " + cls} />;
}

export default async function AdminAgents() {
  const projectId = ADMIN_DEFAULT_PROJECT_ID;
  const latest = await getLatestBundleKv(projectId);

  const downloadHref = latest?.runId
    ? `/api/admin/bundles/patch?projectId=${encodeURIComponent(projectId)}&runId=${encodeURIComponent(latest.runId)}`
    : null;

  return (
    <div className="space-y-6">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <GlossyIcon name="cpu" size={36} />
          <div>
            <div className="text-xs font-semibold tracking-wide text-white/60">AGENTS</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Agents & Bundles</h1>
          </div>
        </div>
        <p className="mt-3 text-sm text-white/60">
          KV-backed &ldquo;latest bundle&rdquo; status for <span className="text-white/80">{projectId}</span>.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GlossyIcon name="layers" size={30} />
            <div className="text-sm font-semibold">Latest bundle</div>
          </div>

          {!latest && (
            <div className="mt-3 text-sm text-white/60" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GlossyIconInline name="clock" size={16} />
              No bundle records found yet. Run a bundle once and this page will populate.
            </div>
          )}

          {latest && (
            <>
              <div className="mt-3 grid gap-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60" style={{ display: "flex", alignItems: "center", gap: 4 }}><GlossyIconInline name="code" size={12} /> Run ID</span>
                  <span className="font-mono text-[12px] text-white/80">{latest.runId}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60" style={{ display: "flex", alignItems: "center", gap: 4 }}><GlossyIconInline name="settings" size={12} /> Mode</span>
                  <span className="text-white/80">{latest.mode || "bundle"}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60" style={{ display: "flex", alignItems: "center", gap: 4 }}><GlossyIconInline name="layers" size={12} /> Scripts</span>
                  <span className="text-white/80">{(latest.scriptsCount ?? 0).toString()}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60" style={{ display: "flex", alignItems: "center", gap: 4 }}><GlossyIconInline name="clock" size={12} /> Finished</span>
                  <span className="text-white/80">{latest.finishedAt || "—"}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {downloadHref && (
                  <a
                    href={downloadHref}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    <GlossyIconInline name="arrow-right" size={12} /> Download bundle patch
                  </a>
                )}
                <Link
                  href="/admin/projects"
                  className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs hover:bg-white/5"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <GlossyIconInline name="layers" size={12} /> Projects
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GlossyIcon name="target" size={30} />
            <div className="text-sm font-semibold">Per-agent rows</div>
          </div>
          <div className="mt-2 text-sm text-white/60">
            &ldquo;contract_fail&rdquo; means the guardrails worked (agent refused prose / violated contract).
          </div>

          <div className="mt-4 space-y-2">
            {(latest?.rows || []).slice(0, 12).map((r: any, idx: number) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <StatusDot status={r.status as string} />
                    <div className="text-sm font-medium">{r.agentId}</div>
                  </div>
                  <div className="text-[11px] text-white/50">{r.status}</div>
                </div>
                {r.reason && <div className="mt-1 text-[11px] text-white/50">reason: {r.reason}</div>}
              </div>
            ))}

            {(!latest?.rows || latest.rows.length === 0) && (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/60" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <GlossyIconInline name="clock" size={16} />
                No row data yet. Run a bundle once.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
