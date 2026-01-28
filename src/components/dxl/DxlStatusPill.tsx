"use client";

import React from "react";

type ProbeOk = {
  ok?: boolean;
  stamp?: string;
  mode?: string;
};

type ActivityOk = {
  ok?: boolean;
  active?: boolean;
  stamp?: string;
  at?: string;
};

function safeText(s: unknown): string {
  if (typeof s === "string") return s;
  if (s === null || s === undefined) return "";
  try { return String(s); } catch { return ""; }
}

export default function DxlStatusPill() {
  const [hidden, setHidden] = React.useState(false);

  const [probe, setProbe] = React.useState<{
    status: "init" | "ok" | "warn";
    line1: string;
    line2: string;
  }>({ status: "init", line1: "System", line2: "Checking…" });

  const [activity, setActivity] = React.useState<{
    active: boolean;
    stamp: string;
  }>({ active: false, stamp: "" });

  React.useEffect(() => {
    let alive = true;

    async function tick() {
      // 1) Probe (existing)
      try {
        const ts = Date.now();
        const res = await fetch(`/api/__probe__?ts=${ts}`, {
          method: "GET",
          cache: "no-store",
          headers: { "x-dxl": "DXL05_20260128" },
        });

        if (!alive) return;

        if (!res.ok) {
          setProbe({ status: "warn", line1: "System", line2: `Limited (${res.status})` });
        } else {
          const j = (await res.json()) as ProbeOk;
          const stamp = safeText(j?.stamp) || "LIVE_OK";
          const mode = safeText(j?.mode) || "ready";
          setProbe({ status: "ok", line1: "System ready", line2: `${stamp} · ${mode}` });
        }
      } catch {
        if (!alive) return;
        setProbe({ status: "warn", line1: "System", line2: "Offline / Limited" });
      }

      // 2) Activity (new)
      try {
        const ts = Date.now();
        const res = await fetch(`/api/dxl/activity?ts=${ts}`, {
          method: "GET",
          cache: "no-store",
          headers: { "x-dxl": "DXL05_20260128" },
        });
        if (!alive) return;

        if (res.ok) {
          const j = (await res.json()) as ActivityOk;
          const active = !!j?.active;
          const stamp = safeText(j?.stamp);
          setActivity({ active, stamp });
        } else {
          setActivity({ active: false, stamp: "" });
        }
      } catch {
        if (!alive) return;
        setActivity({ active: false, stamp: "" });
      }
    }

    tick();

    // Probe can be slower; activity can be a bit more frequent for “alive” feel.
    const id = window.setInterval(tick, 20_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  if (hidden) return null;

  const pillClass =
    activity.active
      ? "dxl-pill dxl-pill--active"
      : probe.status === "ok"
      ? "dxl-pill dxl-pill--ok"
      : probe.status === "warn"
      ? "dxl-pill dxl-pill--warn"
      : "dxl-pill";

  const line1 = activity.active ? "Agents running" : probe.line1;
  const line2 = activity.active
    ? (activity.stamp ? `${activity.stamp} · optimizing…` : "optimizing…")
    : probe.line2;

  return (
    <div className={pillClass} role="status" aria-live="polite">
      <div className="dxl-pill__dot" />
      <div className="dxl-pill__text">
        <div className="dxl-pill__l1">{line1}</div>
        <div className="dxl-pill__l2">{line2}</div>
      </div>

      <button
        type="button"
        className="dxl-pill__x"
        aria-label="Hide system status"
        onClick={() => setHidden(true)}
        title="Hide"
      >
        ×
      </button>
    </div>
  );
}