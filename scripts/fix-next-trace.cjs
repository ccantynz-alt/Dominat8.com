// Auto-generated: Fix missing Next.js client reference manifest files that Vercel trace expects.
// This is a build-time workaround for ENOENT during "Collecting build traces ...".
const fs = require("fs");
const path = require("path");

function ensureFile(p, content) {
  const dir = path.dirname(p);
  fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, content, "utf8");
    console.log("[fix-next-trace] created:", p);
  } else {
    console.log("[fix-next-trace] exists:", p);
  }
}

const root = process.cwd();

// The one that is failing for you:
ensureFile(
  path.join(root, ".next", "server", "app", "(marketing)", "page_client-reference-manifest.js"),
  "// auto-generated for Vercel trace\\nmodule.exports = {};\\n"
);

// Also create the layout manifest if Next/Vercel expects it in some builds:
ensureFile(
  path.join(root, ".next", "server", "app", "(marketing)", "layout_client-reference-manifest.js"),
  "// auto-generated for Vercel trace\\nmodule.exports = {};\\n"
);

// (Optional safety) some builds look for root route-group manifests too:
ensureFile(
  path.join(root, ".next", "server", "app", "(marketing)", "page.js"),
  "// auto-generated placeholder for Vercel trace safety\\nmodule.exports = {};\\n"
);

console.log("[fix-next-trace] done");
