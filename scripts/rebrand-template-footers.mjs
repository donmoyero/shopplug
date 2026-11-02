// Run this inside your TEMPLATES repo (the one GitHub Pages serves), not inside this site.
//   node rebrand-template-footers.mjs <templates-folder>          -> shows what would change
//   node rebrand-template-footers.mjs <templates-folder> --write  -> rewrites the files
// Every "© ... ImpactGrid ..." line in the .html files becomes "© <year> ShopPlug. All rights reserved."
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const [root, flag] = process.argv.slice(2);
if (!root) { console.error("Usage: node rebrand-template-footers.mjs <templates-folder> [--write]"); process.exit(1); }
const write = flag === "--write";
const NEW = "© 2026 ShopPlug. All rights reserved.";
// "© 2024 ImpactGrid Business. All rights reserved." and close variants (&copy;, (c), "Impact Grid", etc.)
const RE = /(?:&copy;|©|\(c\))\s*(?:\d{4}(?:\s*[-–]\s*\d{4})?\s*)?[^<\n]*?impact\s*-?\s*grid[^<\n]*?(?:all rights reserved\.?|(?=<)|$)/gim;

let files = 0, changed = 0;
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.html?$/i.test(name)) continue;
    files++;
    const src = readFileSync(p, "utf8");
    const out = src.replace(RE, NEW);
    if (out !== src) { changed++; console.log((write ? "updated " : "would update ") + p); if (write) writeFileSync(p, out); }
  }
};
walk(root);
console.log(`${changed} of ${files} HTML files ${write ? "updated" : "need changes"}.`);
