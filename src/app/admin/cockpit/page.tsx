"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AGENT_FLEET,
  AGENT_COLORS,
  CATEGORY_LABELS,
  type AgentSpec,
  type AgentStatus,
} from "@/src/lib/agents/registry";

/* ─── types ─── */
type AgentRun = {
  id: string;
  agent: string;
  status: "queued" | "running" | "success" | "failure" | "skipped";
  summary?: string;
  detail?: string;
  createdAtIso: string;
  updatedAtIso?: string;
};

type FleetAgent = AgentSpec & { status: AgentStatus; lastRun?: AgentRun };

/* ─── helpers ─── */
function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function relTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function statusDotClass(s: AgentStatus | AgentRun["status"]): string {
  switch (s) {
    case "online":
    case "success":
      return "bg-emerald-400";
    case "running":
      return "bg-blue-400 animate-pulse";
    case "queued":
    case "idle":
      return "bg-amber-400/70";
    case "failure":
    case "error":
      return "bg-rose-400";
    default:
      return "bg-white/30";
  }
}

/* ─── components ─── */

function AgentCard({ agent, onLaunch }: { agent: FleetAgent; onLaunch: (a: AgentSpec) => void }) {
  const colors = AGENT_COLORS[agent.color] || AGENT_COLORS.purple;

  return (
    <div
      className={cx(
        "group relative rounded-2xl border p-4 transition-all hover:bg-white/[0.04]",
        colors.border,
        "border-white/[0.08] bg-white/[0.02]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cx(
              "grid h-9 w-9 place-items-center rounded-xl border",
              colors.bg,
              colors.border
            )}
          >
            <span className={cx("text-xs font-bold", colors.text)}>
              {agent.shortName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white/90">{agent.name}</div>
            <div className="text-[11px] text-white/50">{agent.id}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cx("h-2 w-2 rounded-full", statusDotClass(agent.status))} />
          <span className="text-[10px] text-white/50">{agent.status}</span>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-white/55">{agent.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {agent.capabilities.slice(0, 3).map((cap) => (
          <span
            key={cap}
            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/50"
          >
            {cap}
          </span>
        ))}
        {agent.capabilities.length > 3 && (
          <span className="text-[10px] text-white/40">+{agent.capabilities.length - 3}</span>
        )}
      </div>

      {agent.lastRun && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-black/20 px-2.5 py-1.5">
          <span className={cx("h-1.5 w-1.5 rounded-full", statusDotClass(agent.lastRun.status))} />
          <span className="text-[10px] text-white/60">
            {agent.lastRun.status} &middot; {relTime(agent.lastRun.createdAtIso)}
          </span>
          {agent.lastRun.summary && (
            <span className="ml-auto truncate text-[10px] text-white/40 max-w-[120px]">
              {agent.lastRun.summary}
            </span>
          )}
        </div>
      )}

      <button
        onClick={() => onLaunch(agent)}
        className="mt-3 w-full rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/[0.08] hover:border-white/[0.16]"
      >
        Launch agent
      </button>
    </div>
  );
}

function RunFeedItem({ run }: { run: AgentRun }) {
  const agent = AGENT_FLEET.find((a) => a.id === run.agent);
  const colors = AGENT_COLORS[agent?.color || "purple"] || AGENT_COLORS.purple;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition hover:bg-white/[0.04]">
      <div className="mt-0.5">
        <span className={cx("block h-2 w-2 rounded-full", statusDotClass(run.status))} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cx("text-xs font-semibold", colors.text)}>
            {agent?.shortName || run.agent}
          </span>
          <span className="text-[10px] text-white/40">{run.id.slice(0, 12)}</span>
          <span className="ml-auto text-[10px] text-white/40">{relTime(run.createdAtIso)}</span>
        </div>
        {run.summary && (
          <div className="mt-1 text-xs text-white/60 truncate">{run.summary}</div>
        )}
      </div>
      <div
        className={cx(
          "rounded-md px-2 py-0.5 text-[10px] font-medium",
          run.status === "success" && "bg-emerald-500/10 text-emerald-400",
          run.status === "failure" && "bg-rose-500/10 text-rose-400",
          run.status === "running" && "bg-blue-500/10 text-blue-400",
          run.status === "queued" && "bg-amber-500/10 text-amber-400",
          run.status === "skipped" && "bg-white/5 text-white/40"
        )}
      >
        {run.status}
      </div>
    </div>
  );
}

function QuickLaunchModal({
  agent,
  onClose,
  onRun,
  busy,
}: {
  agent: AgentSpec;
  onClose: () => void;
  onRun: (agent: AgentSpec, task: string, targetPath: string) => void;
  busy: boolean;
}) {
  const [task, setTask] = useState("");
  const [targetPath, setTargetPath] = useState(agent.defaultTargetPath || "src/app");
  const colors = AGENT_COLORS[agent.color] || AGENT_COLORS.purple;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/[0.12] bg-[#0a0a14] p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className={cx("grid h-10 w-10 place-items-center rounded-xl border", colors.bg, colors.border)}>
            <span className={cx("text-sm font-bold", colors.text)}>
              {agent.shortName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-base font-semibold text-white">{agent.name}</div>
            <div className="text-xs text-white/50">{agent.id}</div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <label className="text-xs text-white/60">Target path</label>
            <input
              className="mt-1 w-full rounded-lg border border-white/[0.10] bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-purple-500/50"
              value={targetPath}
              onChange={(e) => setTargetPath(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-white/60">Task description</label>
            <textarea
              className="mt-1 min-h-[120px] w-full rounded-lg border border-white/[0.10] bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-purple-500/50"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder={`Describe what ${agent.shortName} should do...`}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => onRun(agent, task, targetPath)}
            disabled={busy || !task.trim()}
            className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-40"
          >
            {busy ? "Running..." : "Run agent"}
          </button>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/[0.08]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── main page ─── */
export default function DeveloperCockpit() {
  const [runs, setRuns] = useState<AgentRun[]>([]);
  const [launchAgent, setLaunchAgent] = useState<AgentSpec | null>(null);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<"all" | AgentSpec["category"]>("all");

  // Fetch recent runs
  const fetchRuns = useCallback(async () => {
    try {
      const r = await fetch(`/api/__d8__/agent-runs?limit=20&ts=${Date.now()}`, { cache: "no-store" });
      const j = await r.json();
      if (j.ok) setRuns(j.runs || []);
    } catch {
      // silent — cockpit stays functional without live data
    }
  }, []);

  useEffect(() => {
    fetchRuns();
    const iv = setInterval(fetchRuns, 8000);
    return () => clearInterval(iv);
  }, [fetchRuns]);

  // Build fleet with status from runs
  const fleet: FleetAgent[] = useMemo(() => {
    return AGENT_FLEET.map((agent) => {
      const agentRuns = runs.filter((r) => r.agent === agent.id);
      const lastRun = agentRuns[0];
      let status: AgentStatus = "idle";
      if (lastRun?.status === "running") status = "running";
      else if (lastRun?.status === "success") status = "online";
      else if (lastRun?.status === "failure") status = "error";
      return { ...agent, status, lastRun };
    });
  }, [runs]);

  const filteredFleet = filter === "all" ? fleet : fleet.filter((a) => a.category === filter);

  // Stats
  const totalRuns = runs.length;
  const successRuns = runs.filter((r) => r.status === "success").length;
  const activeAgents = fleet.filter((a) => a.status === "online" || a.status === "running").length;

  // Launch handler
  async function handleLaunch(agent: AgentSpec, task: string, targetPath: string) {
    setBusy(true);
    try {
      await fetch("/api/__d8__/agent-runs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          agent: agent.id,
          status: "running",
          summary: task.slice(0, 120),
          detail: `target: ${targetPath}`,
        }),
      });
      setLaunchAgent(null);
      await fetchRuns();
    } catch {
      // error handling via UI
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-xs font-semibold tracking-[0.25em] text-purple-400/80">
              DEVELOPER
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              LIVE
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Cockpit</h1>
          <p className="mt-2 max-w-xl text-sm text-white/60">
            Mission control for the Dominat8 agent fleet. Monitor status, launch agents, and track
            runs in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/agents"
            className="rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-2 text-xs text-white/70 transition hover:bg-white/[0.08]"
          >
            Bundles
          </Link>
          <button
            onClick={fetchRuns}
            className="rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-2 text-xs text-white/70 transition hover:bg-white/[0.08]"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="text-[11px] text-white/50">Fleet size</div>
          <div className="mt-1 text-2xl font-bold text-white">{AGENT_FLEET.length}</div>
          <div className="mt-1 text-[10px] text-white/40">specialized agents</div>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="text-[11px] text-white/50">Active</div>
          <div className="mt-1 text-2xl font-bold text-emerald-400">{activeAgents}</div>
          <div className="mt-1 text-[10px] text-white/40">agents responding</div>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="text-[11px] text-white/50">Recent runs</div>
          <div className="mt-1 text-2xl font-bold text-white">{totalRuns}</div>
          <div className="mt-1 text-[10px] text-white/40">in buffer</div>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="text-[11px] text-white/50">Success rate</div>
          <div className="mt-1 text-2xl font-bold text-white">
            {totalRuns ? `${Math.round((successRuns / totalRuns) * 100)}%` : "\u2014"}
          </div>
          <div className="mt-1 text-[10px] text-white/40">of completed runs</div>
        </div>
      </div>

      {/* Agent fleet */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white/90">Agent Fleet</h2>
          <div className="flex items-center gap-1.5">
            {(["all", "creative", "growth", "ops"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cx(
                  "rounded-lg px-2.5 py-1 text-[11px] font-medium transition",
                  filter === cat
                    ? "bg-white/[0.10] text-white border border-white/[0.15]"
                    : "text-white/50 hover:text-white/70 border border-transparent"
                )}
              >
                {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFleet.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onLaunch={(a) => setLaunchAgent(a)}
            />
          ))}
        </div>
      </div>

      {/* Live run feed */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white/90">Run Feed</h2>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[10px] text-white/50">Auto-refreshing every 8s</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {runs.length === 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
              <div className="text-sm text-white/50">No agent runs yet</div>
              <div className="mt-2 text-xs text-white/35">
                Launch an agent above to see runs appear here in real-time.
              </div>
            </div>
          )}
          {runs.slice(0, 10).map((run) => (
            <RunFeedItem key={run.id} run={run} />
          ))}
          {runs.length > 10 && (
            <div className="text-center text-[11px] text-white/40 py-2">
              +{runs.length - 10} older runs
            </div>
          )}
        </div>
      </div>

      {/* Wiring info */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
        <div className="text-sm font-semibold text-white/80">Agent Wiring</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
            <div className="text-[11px] font-medium text-purple-400">Registry</div>
            <div className="mt-1 text-[11px] text-white/50">src/lib/agents/registry.ts</div>
            <div className="mt-1 text-[10px] text-white/40">{AGENT_FLEET.length} agents cataloged</div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
            <div className="text-[11px] font-medium text-blue-400">Run API</div>
            <div className="mt-1 text-[11px] text-white/50">/api/__d8__/agent-runs</div>
            <div className="mt-1 text-[10px] text-white/40">GET + POST, ring buffer</div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
            <div className="text-[11px] font-medium text-emerald-400">Specs</div>
            <div className="mt-1 text-[11px] text-white/50">agents/*.md</div>
            <div className="mt-1 text-[10px] text-white/40">8 agent prompt modules</div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
            <div className="text-[11px] font-medium text-amber-400">Cockpit</div>
            <div className="mt-1 text-[11px] text-white/50">/admin/cockpit</div>
            <div className="mt-1 text-[10px] text-white/40">Fleet control + launch</div>
          </div>
        </div>
      </div>

      {/* Quick launch modal */}
      {launchAgent && (
        <QuickLaunchModal
          agent={launchAgent}
          onClose={() => setLaunchAgent(null)}
          onRun={handleLaunch}
          busy={busy}
        />
      )}
    </div>
  );
}
