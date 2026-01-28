"use client";

import React from "react";

type DxlEvent = {
  id: string;
  at: string;
  kind: string;
  title: string;
  detail?: string;
};

type ApiResp = {
  ok?: boolean;
  events?: DxlEvent[];
  at?: string;
  source?: string;
};

function safeStr(s: unknown): string {
  if (typeof s === "string") return s;
  if (s === null || s === undefined) return "";
  try { return String(s); } catch { return ""; }
}

function timeAgo(iso: string): string {
  try {
    const t = new Date(iso).getTime();
    const d = Date.now() - t;
    const sec = Math.max(1, Math.floor(d / 1000));
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    return `${day}d ago`;
  } catch {
    return "";
  }
}

export default function DxlToasts() {
  const [hidden, setHidden] = React.useState(false);
  const [toasts, setToasts] = React.useState<DxlEvent[]>([]);
  const lastSeenRef = React.useRef<string>("");

  React.useEffect(() => {
    if (hidden) return;

    let alive = true;

    async function poll() {
      try {
        const ts = Date.now();
        const since = lastSeenRef.current ? `&since=${encodeURIComponent(lastSeenRef.current)}` : "";
        const res = await fetch(`/api/dxl/event?ts=${ts}${since}`, { method: "GET", cache: "no-store" });
        if (!alive) return;

        if (!res.ok) return;

        const j = (await res.json()) as ApiResp;
        const events = Array.isArray(j?.events) ? j.events : [];

        if (events.length > 0) {
          // server returns newest-first
          lastSeenRef.current = events[0].id;

          setToasts(prev => {
            const merged = [...events, ...prev];
            // dedupe by id
            const seen = new Set<string>();
            const uniq: DxlEvent[] = [];
            for (const e of merged) {
              if (!e?.id || seen.has(e.id)) continue;
              seen.add(e.id);
              uniq.push(e);
            }
            return uniq.slice(0, 4);
          });

          // auto-expire each new toast
          for (const e of events) {
            window.setTimeout(() => {
              setToasts(prev => prev.filter(x => x.id !== e.id));
            }, 6500);
          }
        }
      } catch {
        // ignore
      }
    }

    poll();
    const id = window.setInterval(poll, 6000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [hidden]);

  if (hidden) return null;
  if (toasts.length === 0) return null;

  return (
    <div className="dxl-toasts" aria-live="polite" aria-relevant="additions">
      <button className="dxl-toasts__hide" onClick={() => setHidden(true)} aria-label="Hide notifications" title="Hide">
        Hide
      </button>

      {toasts.map(t => (
        <div key={t.id} className="dxl-toast">
          <div className="dxl-toast__top">
            <div className={"dxl-toast__kind dxl-toast__kind--" + safeStr(t.kind || "optimized")}>
              {safeStr(t.kind || "optimized").toUpperCase()}
            </div>
            <div className="dxl-toast__ago">{timeAgo(t.at)}</div>
          </div>

          <div className="dxl-toast__title">{safeStr(t.title)}</div>
          {t.detail ? <div className="dxl-toast__detail">{safeStr(t.detail)}</div> : null}
        </div>
      ))}
    </div>
  );
}