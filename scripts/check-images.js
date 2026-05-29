import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const menuPath = path.join(__dirname, '../src/lib/menu-data.ts');

const file = fs.readFileSync(menuPath, 'utf8');

// regex to capture items: id: "si1" ... image: img("photo-..." )
const itemRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?image:\s*img\("([^"]+)"\)[\s\S]*?\}/gm;

const matches = [...file.matchAll(itemRegex)];

if (!matches.length) {
  console.error('No menu items found in', menuPath);
  process.exit(1);
}

const urls = matches.map((m) => {
  const id = m[1];
  const imgId = m[2];
  const url = `https://images.unsplash.com/${imgId}?auto=format&fit=crop&w=900&q=80`;
  return { id, imgId, url };
});

console.log(`Found ${urls.length} items. Checking image URLs...`);

async function check() {
  // detect duplicate image IDs
  const counts = urls.reduce((acc, u) => {
    acc[u.imgId] = (acc[u.imgId] || 0) + 1;
    return acc;
  }, {});

  const duplicates = Object.entries(counts).filter(([, c]) => c > 1);
  if (duplicates.length) {
    console.log('\nDuplicate image usage detected (imgId -> count):');
    duplicates.forEach(([imgId, count]) => console.log(`  ${imgId} -> ${count}`));
    console.log('Consider assigning unique images for better matching.\n');
  }

  for (const u of urls) {
    try {
      const res = await fetch(u.url, { method: 'HEAD' });
      console.log(`${u.id}: ${u.url} -> ${res.status} ${res.statusText}`);
    } catch (err) {
      console.log(`${u.id}: ${u.url} -> ERROR (${err.message})`);
    }
  }
}

check().then(() => process.exit(0));
