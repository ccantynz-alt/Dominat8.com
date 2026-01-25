export const MM_PREFIX = "marketingMachine:";

export function keyPageSpec(slug: string): string {
  return `${MM_PREFIX}page:${slug}:spec`;
}

export function keyPageHtml(slug: string): string {
  return `${MM_PREFIX}page:${slug}:html`;
}

export function keyPageMeta(slug: string): string {
  return `${MM_PREFIX}page:${slug}:meta`;
}

export function keyBulkRun(runId: string): string {
  return `${MM_PREFIX}bulk:${runId}`;
}