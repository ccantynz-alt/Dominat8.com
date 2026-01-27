import { kv } from "@vercel/kv";

export const ADMIN_DEFAULT_PROJECT_ID = "demo";

export type AdminProjectItem = {
  projectId: string;
  hasGenerated?: boolean;
  hasPublished?: boolean;
  updatedAt?: string | null;
};

export type BundleRow = {
  agentId: string;
  status: "ok" | "contract_fail" | "error" | string;
  reason?: string;
  bytes?: number;
};

export type LatestBundle = {
  projectId: string;
  runId: string;
  createdAt?: string;
  finishedAt?: string;
  scriptsCount?: number;
  patchKey?: string;
  patchBytes?: number;
  rows?: BundleRow[];
  mode?: string;
};

function uniq(xs: string[]) {
  const s = new Set<string>();
  for (const x of xs) if (x) s.add(x);
  return Array.from(s);
}

function extractProjectIdFromKey(key: string): string | null {
  // examples:
  // generated:project:demo:latest
  // published:project:demo:latest
  const m = /^([a-z]+):project:([^:]+):latest$/i.exec(key);
  if (!m) return null;
  return m[2] || null;
}

async function scanKeys(match: string, count = 250): Promise<string[]> {
  // Vercel KV supports scan; client exposes kv.scan
  // We keep it bounded to avoid runaway.
  try {
    const res: any = await (kv as any).scan({ match, count });
    if (Array.isArray(res)) return res as string[];
    if (res && Array.isArray(res.keys)) return res.keys as string[];
    return [];
  } catch {
    return [];
  }
}

async function safeGet<T>(key: string): Promise<T | null> {
  try {
    const v = await kv.get<T>(key);
    return (v as any) ?? null;
  } catch {
    return null;
  }
}

export async function listProjectsKv(limit = 30): Promise<AdminProjectItem[]> {
  // Preferred: explicit index if you add it later
  const idx = await safeGet<string[]>("projects:index");
  let projectIds: string[] = Array.isArray(idx) ? idx : [];

  // Fallback: infer from known generated/published latest keys
  if (projectIds.length === 0) {
    const genKeys = await scanKeys("generated:project:*:latest", 400);
    const pubKeys = await scanKeys("published:project:*:latest", 400);
    const inferred = [
      ...genKeys.map(extractProjectIdFromKey).filter(Boolean) as string[],
      ...pubKeys.map(extractProjectIdFromKey).filter(Boolean) as string[],
    ];
    projectIds = uniq(inferred);
  }

  // Always include demo as a floor
  if (!projectIds.includes(ADMIN_DEFAULT_PROJECT_ID)) projectIds.unshift(ADMIN_DEFAULT_PROJECT_ID);

  projectIds = projectIds.slice(0, Math.max(1, limit));

  // Determine whether generated/published exists (cheap existence checks)
  const out: AdminProjectItem[] = [];
  for (const id of projectIds) {
    const genKey = `generated:project:${id}:latest`;
    const pubKey = `published:project:${id}:latest`;

    const [gen, pub] = await Promise.all([
      safeGet<any>(genKey),
      safeGet<any>(pubKey),
    ]);

    out.push({
      projectId: id,
      hasGenerated: !!gen,
      hasPublished: !!pub,
      updatedAt: null,
    });
  }

  return out;
}

function keyBundleRecord(projectId: string, runId: string) {
  return `agentBundle:project:${projectId}:${runId}`;
}
function keyBundlePatch(projectId: string, runId: string) {
  return `agentBundlePatch:project:${projectId}:${runId}`;
}

export async function getLatestBundleKv(projectId: string): Promise<LatestBundle | null> {
  const pid = (projectId || ADMIN_DEFAULT_PROJECT_ID).toString();

  // If you later add an explicit pointer key, we’ll use it.
  const pointer = await safeGet<string>(`agentBundleLatest:project:${pid}`);
  if (pointer) {
    const rec = await safeGet<any>(keyBundleRecord(pid, pointer));
    if (rec) {
      return {
        projectId: pid,
        runId: pointer,
        createdAt: rec.createdAt,
        finishedAt: rec.finishedAt,
        scriptsCount: rec.scriptsCount,
        patchKey: rec.patchKey || keyBundlePatch(pid, pointer),
        patchBytes: rec.patchBytes,
        rows: rec.rows || [],
        mode: rec.mode,
      };
    }
  }

  // Fallback: scan for bundle records under this project
  const keys = await scanKeys(`agentBundle:project:${pid}:bundle_*`, 250);
  if (keys.length === 0) return null;

  // Fetch a bounded number of records and pick the newest by createdAt/finishedAt
  const sample = keys.slice(0, 50);
  let best: { runId: string; ts: number; rec: any } | null = null;

  for (const k of sample) {
    const rec = await safeGet<any>(k);
    if (!rec) continue;

    const runId = (rec.runId || k.split(":").slice(-1)[0] || "").toString();
    const t = Date.parse(rec.finishedAt || rec.createdAt || "") || 0;

    if (!best || t > best.ts) best = { runId, ts: t, rec };
  }

  if (!best) return null;

  const rec = best.rec;
  const runId = best.runId;

  return {
    projectId: pid,
    runId,
    createdAt: rec.createdAt,
    finishedAt: rec.finishedAt,
    scriptsCount: rec.scriptsCount,
    patchKey: rec.patchKey || keyBundlePatch(pid, runId),
    patchBytes: rec.patchBytes,
    rows: rec.rows || [],
    mode: rec.mode,
  };
}

export async function getBundlePatchTextKv(projectId: string, runId: string): Promise<string | null> {
  const pid = (projectId || ADMIN_DEFAULT_PROJECT_ID).toString();
  const rid = (runId || "").toString();
  if (!rid) return null;

  const directKey = keyBundlePatch(pid, rid);
  const text = await safeGet<string>(directKey);
  return text || null;
}