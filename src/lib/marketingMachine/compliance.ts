export interface ComplianceResult {
  ok: boolean;
  warnings: string[];
}

const RISK_PATTERNS: Array<{ re: RegExp; label: string }> = [
  { re: /\bguarantee(d|s)?\b/i, label: "Avoid guarantees (e.g., 'guaranteed')." },
  { re: /\b(make|earn|generate)\s+\True\d+/i, label: "Avoid specific earnings claims (numbers + money)." },
  { re: /\b(6\s*figures?|seven\s*figures?|8\s*figures?)\b/i, label: "Avoid income flex claims (six/seven figures)." },
  { re: /\bovernight\b/i, label: "Avoid 'overnight' transformation claims." },
  { re: /\bproof\b/i, label: "Avoid 'proof' claims unless you can substantiate." },
  { re: /\btestimonial(s)?\b/i, label: "Avoid testimonials unless real and permissioned." },
  { re: /\bbefore\s*\/\s*after\b/i, label: "Before/after can imply unrealistic results." },
  { re: /\bno\s*risk\b/i, label: "Avoid 'no risk' language." },
  { re: /\b(100%|always)\b/i, label: "Avoid absolute claims like 100% / always." },
  { re: /\bimpersonat(e|ion)\b/i, label: "No impersonation." },
];

export function checkComplianceText(text: string): ComplianceResult {
  const warnings: string[] = [];
  const t = (text || "").trim();

  if (!t) return { ok: true, warnings: [] };

  for (const p of RISK_PATTERNS) {
    if (p.re.test(t)) warnings.push(p.label);
  }

  // Ensure disclosure present somewhere
  if (!/AI-generated/i.test(t)) {
    warnings.push("Disclosure missing: include 'AI-generated' somewhere in the caption or script.");
  }

  return { ok: warnings.length === 0, warnings };
}

export function checkContentCompliance(input: { caption?: string; script?: string; videoPrompt?: string; hooks?: string[]; hashtags?: string[] }): ComplianceResult {
  const blocks: string[] = [];
  if (input.hooks?.length) blocks.push(input.hooks.join("\n"));
  if (input.caption) blocks.push(input.caption);
  if (input.script) blocks.push(input.script);
  if (input.videoPrompt) blocks.push(input.videoPrompt);
  if (input.hashtags?.length) blocks.push(input.hashtags.join(" "));

  const combined = blocks.join("\n\n");
  return checkComplianceText(combined);
}