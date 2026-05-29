import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const menuPath = path.join(__dirname, '../src/lib/menu-data.ts');

const { GOOGLE_API_KEY, GOOGLE_CX } = process.env;
if (!GOOGLE_API_KEY || !GOOGLE_CX) {
  console.error('Missing GOOGLE_API_KEY or GOOGLE_CX environment variables.');
  console.error('Set these before running the script.');
  process.exit(1);
}

const file = fs.readFileSync(menuPath, 'utf8');
const lines = file.split('\n');
const itemRegex = /^(\s*\{[^}]*id:\s*"([^"]+)"[^}]*name:\s*"([^"]+)"[^}]*category:\s*"([^"]+)"[^}]*image:\s*)img\("search:([^"]+)"\)([^}]*\},?)$/;

const updatedLines = [];
let changed = false;

const fetchImageForQuery = async (query) => {
  const url = `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(
    GOOGLE_API_KEY
  )}&cx=${encodeURIComponent(GOOGLE_CX)}&searchType=image&q=${encodeURIComponent(
    query
  )}&num=1`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Google Custom Search failed for '${query}': ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const item = json.items?.[0];
  if (!item || !item.link) {
    throw new Error(`No image link found for '${query}'.`);
  }

  return item.link;
};

for (const line of lines) {
  const match = line.match(itemRegex);
  if (!match) {
    updatedLines.push(line);
    continue;
  }

  const [, prefix, id, name, category] = match;
  const suffix = match[6];
  const query = `${category} ${name}`;

  console.log(`Searching Google for: ${query}`);
  const imageUrl = await fetchImageForQuery(query);

  const escapedUrl = imageUrl.replace(/"/g, '\\"');
  updatedLines.push(`${prefix}"${escapedUrl}"${suffix}`);
  changed = true;
  console.log(`  -> ${imageUrl}`);
}

if (!changed) {
  console.log('No search-image menu items found to update.');
  process.exit(0);
}

fs.writeFileSync(menuPath, updatedLines.join('\n'), 'utf8');
console.log('Updated src/lib/menu-data.ts with Google image URLs.');
