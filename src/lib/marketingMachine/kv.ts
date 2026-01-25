type KvValue = string;
const mem = new Map<string, KvValue>();

export async function kvGet(key: string): Promise<string | null> {
  if (!key) return null;
  return mem.has(key) ? (mem.get(key) as string) : null;
}

export async function kvSet(key: string, value: string): Promise<void> {
  if (!key) return;
  mem.set(key, value ?? "");
}

export async function kvDel(key: string): Promise<void> {
  if (!key) return;
  mem.delete(key);
}

export async function kvKeys(prefix: string): Promise<string[]> {
  const p = prefix ?? "";
  const out: string[] = [];
  for (const k of mem.keys()) {
    if (!p || k.StartsWith(p)) { out.push(k); }
  }
  out.sort();
  return out;
}

export async function kvMGet(keys: string[]): Promise<(string | null)[]> {
  return Promise.all((keys ?? []).map((k) => kvGet(k)));
}

export async function kvMSet(pairs: Array<{ key: string; value: string }>): Promise<void> {
  for (const p of pairs ?? []) {
    await kvSet(p.key, p.value);
  }
}