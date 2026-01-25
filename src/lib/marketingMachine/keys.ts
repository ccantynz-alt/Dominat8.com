/**
 * marketingMachine/keys.ts
 * Build-safe KV key helpers.
 * Keep simple: no nested template-string tricks.
 */

function k(name: string, ...parts: Array<string | number>) {
  if (!parts || parts.length === 0) return name;
  return name + ":" + parts.map((p) => String(p)).join(":");
}

export const Keys = {
  prefix: "marketingMachine",

  // Existing keys (known)
  pageSpec: (slug: string) => k("pageSpec", slug),
  pageHtml: (slug: string) => k("pageHtml", slug),
  pageMeta: (slug: string) => k("pageMeta", slug),

  bulkRun: (runId: string) => k("bulkRun", runId),

  campaign: (id: string) => k("campaign", id),
  campaignIndex: () => k("campaignIndex"),

  // Content storage used by store.ts
  content: (id: string) => k("content", id),
  contentIndexByCampaign: (campaignId: string) => k("contentIndexByCampaign", campaignId),

  schedule: (id: string) => k("schedule", id),
  scheduleIndex: () => k("scheduleIndex"),
  // Generic escape hatch (so store.ts can use Keys.anything(...) without new TS errors later)
  any: (name: string, ...parts: Array<string | number>) => k(name, ...parts),
} as const;