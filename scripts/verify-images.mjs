// verify-images.mjs — checks every Unsplash image ID in menu-data.ts
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const https = require("https");

const photoIds = [
  // South Indian
  { id: "photo-1589301760014-d929f3979dbc", item: "Idli" },
  { id: "photo-1630409351241-e90e7c3b1e23", item: "Mini Idli / Masala Dosa" },
  { id: "photo-1606491956689-2ea866880c84", item: "Ghee Podi Idli / Chole / Gulab Jamun" },
  { id: "photo-1668236543090-82eba5ee5976", item: "Dosa / Mysore Dosa" },
  { id: "photo-1567188040759-fb8a883dc6d8", item: "Onion Dosa" },
  { id: "photo-1546069901-ba9599a7e63c", item: "Rava Dosa / Mix Veg Curry" },
  { id: "photo-1631452180519-c014fe946bc7", item: "Paneer Dosa / Paneer Butter Masala / Paneer Manchurian" },
  { id: "photo-1546833999-b9f581a1996d", item: "Pongal / Coconut Rice" },
  { id: "photo-1596797038530-2c107229654b", item: "Poori Masala / Veg Pulao / Pav Bhaji" },
  { id: "photo-1574071318508-1cdbab80d002", item: "Vada / Dal Tadka / Garlic Naan / Chilli Paneer" },
  { id: "photo-1505253716362-afaea1d3d1af", item: "Sambar Rice / Rasgulla" },
  { id: "photo-1626777552726-4a6b54c97e46", item: "Curd Rice" },
  { id: "photo-1516684732162-798a0062be99", item: "Lemon Rice / Jeera Rice" },
  { id: "photo-1547592180-85f173990554", item: "Tomato Rice / Dal Fry" },
  // North Indian
  { id: "photo-1565557623262-b51c2513a641", item: "Kadai Paneer / Gobi Manchurian" },
  { id: "photo-1618219908412-a29a1bb7b86e", item: "Palak Paneer" },
  { id: "photo-1512621776951-a57141f2eefd", item: "Veg Kolhapuri" },
  { id: "photo-1626132647523-66f5bf380027", item: "Butter Naan / Kulcha" },
  { id: "photo-1605291535577-8cca8f3e6e2a", item: "Roti" },
  // Chinese
  { id: "photo-1512058564366-18510be2db19", item: "Veg Fried Rice" },
  { id: "photo-1618449840665-9ed506d73a34", item: "Schezwan Fried Rice" },
  { id: "photo-1585032226651-759b368d7246", item: "Veg Noodles" },
  { id: "photo-1526318896980-cf78c088247c", item: "Hakka Noodles" },
  { id: "photo-1544025162-d76694265947", item: "Veg Spring Roll" },
  // Snacks
  { id: "photo-1601050690597-df0568f70950", item: "Samosa / Carrot Halwa" },
  { id: "photo-1509440159596-0249088772ff", item: "Veg Puff" },
  { id: "photo-1525351484163-7529414344d8", item: "Sandwich" },
  { id: "photo-1630384060421-cb20d0e0649d", item: "French Fries" },
  { id: "photo-1568901346375-23c9450c58cd", item: "Cutlet" },
  { id: "photo-1571167530149-c1105da4c2cb", item: "Chaat / Buttermilk" },
  { id: "photo-1599487488170-d11ec9c172f0", item: "Bhel Puri" },
  // Beverages
  { id: "photo-1576092768241-dec231879fc3", item: "Tea" },
  { id: "photo-1514432324607-a09d9b4aefdd", item: "Coffee" },
  { id: "photo-1550583724-b2692b85b150", item: "Badam Milk" },
  { id: "photo-1513558161293-cdaf765ed2fd", item: "Fresh Lime Juice" },
  { id: "photo-1546173159-315724a31696", item: "Rose Milk" },
  { id: "photo-1534353436294-0dbd4bdac845", item: "Mango Juice" },
  { id: "photo-1553530666-ba11a7da3888", item: "Lassi" },
  // Desserts
  { id: "photo-1501386761578-eac5c94b800a", item: "Ice Cream" },
  { id: "photo-1582716401301-b2407dc7563d", item: "Kesari" },
  { id: "photo-1553979459-d2229ba7433b", item: "Payasam" },
  { id: "photo-1572490122747-3968b75cc699", item: "Falooda" },
];

function checkUrl(photoId) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=100&q=10`;
    https.get(url, (res) => {
      resolve({ photoId, status: res.statusCode });
      res.resume();
    }).on("error", (e) => {
      resolve({ photoId, status: "ERROR: " + e.message });
    });
  });
}

async function main() {
  console.log(`\nChecking ${photoIds.length} unique photo IDs...\n`);
  const results = await Promise.all(photoIds.map(({ id, item }) =>
    checkUrl(id).then(r => ({ ...r, item }))
  ));

  let ok = 0, fail = 0;
  for (const r of results) {
    const pass = r.status === 200 || r.status === 302 || r.status === 301;
    const icon = pass ? "✅" : "❌";
    if (pass) ok++; else fail++;
    console.log(`${icon} [${r.status}] ${r.photoId}  →  ${r.item}`);
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`✅ OK: ${ok}   ❌ FAIL: ${fail}`);
  if (fail > 0) {
    console.log(`\nFAILED IDs — need replacement:`);
    results.filter(r => r.status !== 200 && r.status !== 302 && r.status !== 301)
           .forEach(r => console.log(`  • ${r.photoId}  (${r.item})`));
  }
}

main();
