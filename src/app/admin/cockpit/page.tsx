"use client";

import React, { useEffect, useMemo, useState } from "react";

type Status = {
  ok: boolean;
  stamp: string;
  nowUtc: string;
  queueMode: "fs" | "disabled";
  queuePath?: string;
  queueCounts?: { queued: number; running: number; done: number; failed: number };
  message?: string;
};

type QueueItem = {
  id: string;
  title: string;
  command: string;
  notes?: string;
  createdUtc?: string;
  startedUtc?: string;
  finishedUtc?: string;
  status: "queued" | "running" | "done" | "failed";
  attempts?: number;
  result?: string;
  logPath?: string;
  noAutoPr?: boolean;
};

type QueueResponse = { ok: boolean; queue: QueueItem[]; message?: string };
type LogsResponse = { ok: boolean; logs: { name: string; mtimeUtc: string; size: number }[]; message?: string };
type LogReadResponse = { ok: boolean; name: string; content: string; message?: string };

function Btn(props: { onClick: () => void; children: React.ReactNode; tone?: "primary" | "soft" }) {
  const tone = props.tone || "soft";
  const style: React.CSSProperties =
    tone === "primary"
      ? { padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)", background: "black", color: "white", cursor: "pointer" }
      : { padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)", background: "white", cursor: "pointer" };
  return (
    <button onClick={props.onClick} style={style}>
      {props.children}
    </button>
  );
}

export default function CockpitPage() {
  const [token, setToken] = useState<string>("");
  const headers = useMemo(() => {
    const h: Record<string, string> = {};
    if (token.trim()) h["x-admin-token"] = token.trim();
    return h;
  }, [token]);

  const [status, setStatus] = useState<Status | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [logs, setLogs] = useState<LogsResponse["logs"]>([]);
  const [selectedLog, setSelectedLog] = useState<string>("");
  const [logContent, setLogContent] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  async function apiGet<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers, cache: "no-store" });
    if (!res.ok) throw new Error(res.status + " " + (await res.text()));
    return (await res.json()) as T;
  }

  async function apiPost<T>(url: string, body: any): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: { ...headers, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(res.status + " " + (await res.text()));
    return (await res.json()) as T;
  }

  async function refreshAll() {
    setErr(null);
    setBusy(true);
    try {
      const s = await apiGet<Status>("/api/admin/cockpit/status");
      setStatus(s);

      const q = await apiGet<QueueResponse>("/api/admin/cockpit/queue");
      setQueue(q.queue || []);

      const l = await apiGet<LogsResponse>("/api/admin/cockpit/logs?limit=20");
      setLogs(l.logs || []);

      if (selectedLog) {
        const r = await apiGet<LogReadResponse>("/api/admin/cockpit/log?name=" + encodeURIComponent(selectedLog));
        setLogContent(r.content || "");
      }
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function enqueue(title: string, command: string, notes?: string, noAutoPr?: boolean) {
    setErr(null);
    setBusy(true);
    try {
      await apiPost("/api/admin/cockpit/enqueue", { title, command, notes: notes || "", noAutoPr: !!noAutoPr });
      await refreshAll();
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setBusy(false);
    }
  }

  async function clearDone() {
    setErr(null);
    setBusy(true);
    try {
      await apiPost("/api/admin/cockpit/clear-done", {});
      await refreshAll();
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setBusy(false);
    }
  }

  async function openLog(name: string) {
    setSelectedLog(name);
    setErr(null);
    setBusy(true);
    try {
      const r = await apiGet<LogReadResponse>("/api/admin/cockpit/log?name=" + encodeURIComponent(name));
      setLogContent(r.content || "");
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setBusy(false);
    }
  }

  const repo = "C:\\Temp\\FARMS\\Dominat8.com";
  const cmdBuild = "Set-Location -LiteralPath '" + repo + "'; npm run build";
  const cmdLint = "Set-Location -LiteralPath '" + repo + "'; npm run lint";
  const cmdType = "Set-Location -LiteralPath '" + repo + "'; npm run typecheck";

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Admin Cockpit</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Enqueue tasks, view queue, view logs. (Admin-only)</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={refreshAll} tone="soft">{busy ? "Refreshing..." : "Refresh"}</Btn>
            <Btn onClick={clearDone} tone="soft">Clear done</Btn>
          </div>
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Admin token (x-admin-token)</div>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste ADMIN_TOKEN"
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)" }}
            />
          </div>

          {err && (
            <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,0,0,0.06)", border: "1px solid rgba(255,0,0,0.18)" }}>
              <div style={{ fontWeight: 800 }}>Error</div>
              <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize: 12, whiteSpace: "pre-wrap" }}>{err}</div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)" }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Quick actions</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <Btn tone="primary" onClick={() => enqueue("Build Dominat8.com", cmdBuild, "Local build", false)}>Build</Btn>
                <Btn onClick={() => enqueue("Lint Dominat8.com", cmdLint, "Local lint", true)}>Lint (no PR)</Btn>
                <Btn onClick={() => enqueue("Typecheck Dominat8.com", cmdType, "Local typecheck", true)}>Typecheck (no PR)</Btn>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
                Notes: Lint/Typecheck default to <code>noAutoPr</code>. Build allows PR if changes exist.
              </div>
            </div>

            <div style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)" }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Status</div>
              <pre style={{ margin: 0, fontSize: 12, overflow: "auto" }}>{JSON.stringify(status, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Queue</div>
          <div style={{ display: "grid", gap: 10 }}>
            {queue.length === 0 ? (
              <div style={{ fontSize: 13, opacity: 0.7 }}>Queue is empty.</div>
            ) : (
              queue.slice(0, 50).map((t) => (
                <div key={t.id} style={{ padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.10)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                    <div style={{ fontWeight: 700 }}>{t.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.75 }}>{t.status}</div>
                  </div>
                  <div style={{ marginTop: 6, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize: 12, whiteSpace: "pre-wrap" }}>
                    {t.command}
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
                    id: <code>{t.id}</code> {t.noAutoPr ? " • noAutoPr" : ""} {t.attempts ? " • attempts: " + t.attempts : ""}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Logs</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {logs.length === 0 ? (
                <div style={{ fontSize: 13, opacity: 0.7 }}>No logs yet.</div>
              ) : (
                logs.map((l) => (
                  <button
                    key={l.name}
                    onClick={() => openLog(l.name)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "1px solid rgba(0,0,0,0.2)",
                      background: selectedLog === l.name ? "rgba(0,0,0,0.08)" : "white",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                    title={l.mtimeUtc + " • " + l.size + " bytes"}
                  >
                    {l.name}
                  </button>
                ))
              )}
            </div>

            {selectedLog && (
              <div style={{ borderRadius: 12, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)", padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                  <div style={{ fontWeight: 800 }}>Log: {selectedLog}</div>
                  <Btn onClick={() => openLog(selectedLog)} tone="soft">Reload</Btn>
                </div>
                <pre style={{ marginTop: 10, marginBottom: 0, fontSize: 12, overflow: "auto", maxHeight: 420, whiteSpace: "pre-wrap" }}>
{logContent || "(empty)"}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}