// check-source-images.mjs — reads menu-data.ts and verifies every photo ID
import { readFileSync } from "fs";
import https from "https";

const src = readFileSync("src/lib/menu-data.ts", "utf8");
const ids = [...new Set([...src.matchAll(/photo-[a-z0-9-]+/g)].map((m) => m[0]))];

console.log(`\nFound ${ids.length} unique photo IDs in menu-data.ts\n`);

function check(id) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${id}?w=100&q=10`;
    https
      .get(url, (res) => {
        resolve({ id, code: res.statusCode });
        res.resume();
      })
      .on("error", (e) => resolve({ id, code: "ERR:" + e.message }));
  });
}

const results = await Promise.all(ids.map(check));
let ok = 0, fail = 0;
for (const r of results) {
  if (r.code === 200) { ok++; }
  else { fail++; console.log(`❌ [${r.code}]  ${r.id}`); }
}
console.log(`\n✅ ${ok} OK   ❌ ${fail} FAIL`);
if (fail === 0) console.log("All images verified — 100% working!");
