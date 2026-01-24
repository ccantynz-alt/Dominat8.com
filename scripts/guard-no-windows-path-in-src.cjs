/* scripts/guard-no-windows-path-in-src.cjs */
const fs = require("fs");

function firstLine(p) {
  const buf = fs.readFileSync(p);
  // Strip UTF-8 BOM if present
  let s = buf.toString("utf8");
  if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
  return s.split(/\r?\n/)[0] || "";
}

const targets = [
  "src/app/page.tsx",
];

for (const t of targets) {
  if (!fs.existsSync(t)) continue;
  const line1 = firstLine(t).trim();
  if (/^[A-Za-z]:\\/.test(line1)) {
    console.error("GUARD FAIL: " + t + " starts with a Windows path:");
    console.error("  " + line1);
    process.exit(1);
  }
}

console.log("GUARD OK: no Windows-path corruption detected.");