import Link from "next/link";
import { listProjectsKv } from "@/lib/admin/kvAdmin";

export const dynamic = "force-dynamic";

function Pill(props: { ok?: boolean; label: string }) {
  return (
    <span className={[
      "inline-flex items-center rounded-full border px-2 py-1 text-[11px]",
      props.ok ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200/90"
               : "border-white/10 bg-white/5 text-white/60"
    ].join(" ")}>
      {props.label}
    </span>
  );
}

export default async function AdminProjects() {
  const items = await listProjectsKv(30);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold tracking-wide text-white/60">PROJECTS</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-sm text-white/60">
          KV-backed list (generated/published detected). This is the “factory queue”.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Project index</div>
            <div className="mt-1 text-[11px] text-white/50">
              Source: projects:index (if present) → else inferred from generated/published latest keys.
            </div>
          </div>
          <Link
            href="/admin/agents"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
          >
            Run bundle →
          </Link>
        </div>

        <div className="mt-5 grid gap-3">
          {items.map((p) => (
            <div key={p.projectId} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{p.projectId}</div>
                  <div className="mt-1 text-[11px] text-white/50">
                    generated:project:{p.projectId}:latest • published:project:{p.projectId}:latest
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill ok={p.hasGenerated} label={p.hasGenerated ? "Generated ✓" : "Generated —"} />
                  <Pill ok={p.hasPublished} label={p.hasPublished ? "Published ✓" : "Published —"} />
                  <Link
                    href={"/?projectId=" + encodeURIComponent(p.projectId)}
                    className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs hover:bg-white/5"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-white/60">
              No projects found yet. (Create one run, or ensure generated/published keys exist.)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}