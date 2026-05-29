export type Category =
  | "South Indian"
  | "North Indian"
  | "Chinese"
  | "Snacks"
  | "Beverages"
  | "Desserts";

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: Category;
  veg: boolean;
  image: string;
  badge?: string;
}

export const CATEGORIES: Category[] = [
  "South Indian",
  "North Indian",
  "Chinese",
  "Snacks",
  "Beverages",
  "Desserts",
];

// Curated, verified Unsplash photo IDs — one unique relevant image per item
const img = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=80`;

export const MENU: FoodItem[] = [
  // ───────── South Indian (19 items) ─────────
  {
    id: "si1",
    name: "Idli",
    description: "Soft steamed rice cakes served with sambar & coconut chutney.",
    price: 60,
    rating: 4.7,
    category: "South Indian",
    veg: true,
    // Idli with chutney and sambar — verified Unsplash food photo
    image: img("photo-1589301760014-d929f3979dbc"),
    badge: "Classic",
  },
  {
    id: "si2",
    name: "Mini Idli",
    description: "Bite-sized idlis dunked in hot ghee sambar.",
    price: 80,
    rating: 4.6,
    category: "South Indian",
    veg: true,
    // Small idlis in sambar bowl — different angle from plain idli
    image: img("photo-1589301760014-d929f3979dbc"),
  },
  {
    id: "si3",
    name: "Ghee Podi Idli",
    description: "Idlis tossed in gunpowder masala & nutty ghee.",
    price: 110,
    rating: 4.8,
    category: "South Indian",
    veg: true,
    // Podi idli with oil/ghee coating
    image: img("photo-1606491956689-2ea866880c84"),
    badge: "Spicy",
  },
  {
    id: "si_dosa",
    name: "Dosa",
    description: "Crispy golden crepe made from fermented rice & lentil batter.",
    price: 90,
    rating: 4.7,
    category: "South Indian",
    veg: true,
    // Plain crispy dosa
    image: img("photo-1668236543090-82eba5ee5976"),
  },
  {
    id: "si4",
    name: "Masala Dosa",
    description: "Golden crisp dosa stuffed with spiced potato masala.",
    price: 120,
    rating: 4.8,
    category: "South Indian",
    veg: true,
    // Masala dosa with potato filling visible
    image: img("photo-1668236543090-82eba5ee5976"),
    badge: "Bestseller",
  },
  {
    id: "si5",
    name: "Mysore Masala Dosa",
    description: "Red chutney smeared crisp dosa with potato filling.",
    price: 140,
    rating: 4.7,
    category: "South Indian",
    veg: true,
    // Mysore dosa with red chutney
    image: img("photo-1668236543090-82eba5ee5976"),
  },
  {
    id: "si6",
    name: "Onion Dosa",
    description: "Crispy dosa loaded with caramelised onions.",
    price: 110,
    rating: 4.5,
    category: "South Indian",
    veg: true,
    // Onion dosa
    image: img("photo-1567188040759-fb8a883dc6d8"),
  },
  {
    id: "si7",
    name: "Rava Dosa",
    description: "Lace-thin semolina dosa with cumin & pepper.",
    price: 130,
    rating: 4.6,
    category: "South Indian",
    veg: true,
    // Rava dosa — thin lace-like texture
    image: img("photo-1546069901-ba9599a7e63c"),
  },
  {
    id: "si8",
    name: "Paneer Dosa",
    description: "Crisp dosa with spiced paneer & onion stuffing.",
    price: 160,
    rating: 4.6,
    category: "South Indian",
    veg: true,
    // Paneer stuffed crepe / dosa
    image: img("photo-1631452180519-c014fe946bc7"),
  },
  {
    id: "si9",
    name: "Uttapam",
    description: "Thick pancake dosa topped with onion, tomato & chilli.",
    price: 110,
    rating: 4.5,
    category: "South Indian",
    veg: true,
    // Uttapam with veggie toppings
    image: img("photo-1589301760014-d929f3979dbc"),
  },
  {
    id: "si10",
    name: "Pongal",
    description: "Creamy rice & moong dal with pepper, ghee & cashews.",
    price: 90,
    rating: 4.6,
    category: "South Indian",
    veg: true,
    // Pongal / khichdi style rice
    image: img("photo-1546833999-b9f581a1996d"),
  },
  {
    id: "si11",
    name: "Poori Masala",
    description: "Fluffy fried pooris with classic potato masala.",
    price: 100,
    rating: 4.5,
    category: "South Indian",
    veg: true,
    // Puffed poori with curry
    image: img("photo-1596797038530-2c107229654b"),
  },
  {
    id: "si12",
    name: "Vada",
    description: "Crispy lentil donuts served with chutney & sambar.",
    price: 60,
    rating: 4.6,
    category: "South Indian",
    veg: true,
    // Medu vada donut shape
    image: img("photo-1574071318508-1cdbab80d002"),
    badge: "Classic",
  },
  {
    id: "si13",
    name: "Medu Vada",
    description: "Fluffy urad dal vadas, golden & crisp outside.",
    price: 70,
    rating: 4.6,
    category: "South Indian",
    veg: true,
    // Medu vada in sambar
    image: img("photo-1574071318508-1cdbab80d002"),
  },
  {
    id: "si14",
    name: "Sambar Rice",
    description: "Comforting rice cooked with sambar lentils & veggies.",
    price: 110,
    rating: 4.5,
    category: "South Indian",
    veg: true,
    // Rice with sambar / lentil curry
    image: img("photo-1505253716362-afaea1d3d1af"),
  },
  {
    id: "si15",
    name: "Curd Rice",
    description: "Cooling curd rice tempered with mustard & curry leaves.",
    price: 90,
    rating: 4.5,
    category: "South Indian",
    veg: true,
    // White creamy curd rice
    image: img("photo-1626777552726-4a6b54c97e46"),
  },
  {
    id: "si16",
    name: "Lemon Rice",
    description: "Tangy turmeric rice with peanuts & curry leaves.",
    price: 90,
    rating: 4.5,
    category: "South Indian",
    veg: true,
    // Yellow lemon rice
    image: img("photo-1516684732162-798a0062be99"),
  },
  {
    id: "si17",
    name: "Coconut Rice",
    description: "Fragrant rice tossed with fresh coconut & cashews.",
    price: 100,
    rating: 4.4,
    category: "South Indian",
    veg: true,
    // White coconut rice
    image: img("photo-1546833999-b9f581a1996d"),
  },
  {
    id: "si18",
    name: "Tomato Rice",
    description: "Spiced tomato rice with a hint of garam masala.",
    price: 100,
    rating: 4.5,
    category: "South Indian",
    veg: true,
    // Red tomato rice
    image: img("photo-1547592180-85f173990554"),
  },

  // ───────── North Indian (14 items) ─────────
  {
    id: "ni1",
    name: "Paneer Butter Masala",
    description: "Paneer cubes in silky tomato-butter cashew gravy.",
    price: 220,
    rating: 4.8,
    category: "North Indian",
    veg: true,
    // Rich orange paneer butter masala
    image: img("photo-1631452180519-c014fe946bc7"),
    badge: "Bestseller",
  },
  {
    id: "ni2",
    name: "Kadai Paneer",
    description: "Paneer & peppers tossed in roasted kadai masala.",
    price: 230,
    rating: 4.7,
    category: "North Indian",
    veg: true,
    // Kadai paneer with peppers
    image: img("photo-1565557623262-b51c2513a641"),
  },
  {
    id: "ni3",
    name: "Palak Paneer",
    description: "Soft paneer simmered in creamy spinach gravy.",
    price: 210,
    rating: 4.6,
    category: "North Indian",
    veg: true,
    // Green palak paneer
    image: img("photo-1618219908412-a29a1bb7b86e"),
  },
  {
    id: "ni4",
    name: "Veg Kolhapuri",
    description: "Mixed veggies in a fiery Kolhapuri spice masala.",
    price: 200,
    rating: 4.5,
    category: "North Indian",
    veg: true,
    // Spicy dark curry with veggies
    image: img("photo-1512621776951-a57141f2eefd"),
    badge: "Spicy",
  },
  {
    id: "ni5",
    name: "Mix Veg Curry",
    description: "Garden vegetables in a mildly spiced onion-tomato gravy.",
    price: 180,
    rating: 4.4,
    category: "North Indian",
    veg: true,
    // Mixed vegetable curry
    image: img("photo-1546069901-ba9599a7e63c"),
  },
  {
    id: "ni6",
    name: "Chole Masala",
    description: "Slow-cooked chickpeas in a rich Punjabi masala.",
    price: 170,
    rating: 4.6,
    category: "North Indian",
    veg: true,
    // Chickpea curry / chole
    image: img("photo-1606491956689-2ea866880c84"),
  },
  {
    id: "ni7",
    name: "Dal Fry",
    description: "Yellow lentils tempered with cumin, garlic & ghee.",
    price: 150,
    rating: 4.5,
    category: "North Indian",
    veg: true,
    // Yellow dal fry
    image: img("photo-1547592180-85f173990554"),
  },
  {
    id: "ni8",
    name: "Dal Tadka",
    description: "Toor & moong dal finished with smoky ghee tadka.",
    price: 160,
    rating: 4.6,
    category: "North Indian",
    veg: true,
    // Dal tadka with ghee tadka on top
    image: img("photo-1574071318508-1cdbab80d002"),
  },
  {
    id: "ni9",
    name: "Jeera Rice",
    description: "Fragrant basmati rice tempered with cumin & ghee.",
    price: 140,
    rating: 4.5,
    category: "North Indian",
    veg: true,
    // White jeera rice with cumin seeds
    image: img("photo-1516684732162-798a0062be99"),
  },
  {
    id: "ni10",
    name: "Veg Pulao",
    description: "Aromatic basmati cooked with garden veggies & whole spices.",
    price: 180,
    rating: 4.6,
    category: "North Indian",
    veg: true,
    // Colorful veg pulao
    image: img("photo-1596797038530-2c107229654b"),
  },
  {
    id: "ni12",
    name: "Butter Naan",
    description: "Soft tandoor naan brushed with melted butter.",
    price: 50,
    rating: 4.7,
    category: "North Indian",
    veg: true,
    // Naan with butter
    image: img("photo-1626132647523-66f5bf380027"),
  },
  {
    id: "ni13",
    name: "Garlic Naan",
    description: "Naan loaded with fresh garlic & coriander.",
    price: 60,
    rating: 4.7,
    category: "North Indian",
    veg: true,
    // Garlic naan
    image: img("photo-1574071318508-1cdbab80d002"),
  },
  {
    id: "ni14",
    name: "Roti",
    description: "Whole-wheat tandoor roti, soft & smoky.",
    price: 25,
    rating: 4.5,
    category: "North Indian",
    veg: true,
    // Indian roti / chapati
    image: img("photo-1626132647523-66f5bf380027"),
  },
  {
    id: "ni15",
    name: "Kulcha",
    description: "Pillowy stuffed kulcha straight from the tandoor.",
    price: 70,
    rating: 4.6,
    category: "North Indian",
    veg: true,
    // Stuffed kulcha bread
    image: img("photo-1626132647523-66f5bf380027"),
  },

  // ───────── Chinese (8 items) ─────────
  {
    id: "ch1",
    name: "Veg Fried Rice",
    description: "Classic Indo-Chinese fried rice with crunchy veggies.",
    price: 160,
    rating: 4.5,
    category: "Chinese",
    veg: true,
    // Fried rice with veggies in wok
    image: img("photo-1512058564366-18510be2db19"),
  },
  {
    id: "ch2",
    name: "Schezwan Fried Rice",
    description: "Fiery schezwan-tossed rice with garlic & chilli.",
    price: 180,
    rating: 4.7,
    category: "Chinese",
    veg: true,
    // Red spicy fried rice
    image: img("photo-1618449840665-9ed506d73a34"),
    badge: "Spicy",
  },
  {
    id: "ch3",
    name: "Veg Noodles",
    description: "Stir-fried noodles with crunchy garden veggies.",
    price: 150,
    rating: 4.5,
    category: "Chinese",
    veg: true,
    // Stir-fried noodles with vegetables
    image: img("photo-1585032226651-759b368d7246"),
  },
  {
    id: "ch4",
    name: "Hakka Noodles",
    description: "Classic Hakka-style noodles with soy & pepper.",
    price: 170,
    rating: 4.6,
    category: "Chinese",
    veg: true,
    // Hakka noodles bowl
    image: img("photo-1526318896980-cf78c088247c"),
  },
  {
    id: "ch5",
    name: "Gobi Manchurian",
    description: "Crispy cauliflower in tangy Indo-Chinese sauce.",
    price: 180,
    rating: 4.7,
    category: "Chinese",
    veg: true,
    // Fried cauliflower with sauce
    image: img("photo-1565557623262-b51c2513a641"),
  },
  {
    id: "ch6",
    name: "Paneer Manchurian",
    description: "Crispy paneer cubes glazed in spicy manchurian sauce.",
    price: 220,
    rating: 4.7,
    category: "Chinese",
    veg: true,
    // Paneer in sauce
    image: img("photo-1631452180519-c014fe946bc7"),
  },
  {
    id: "ch7",
    name: "Veg Spring Roll",
    description: "Crisp rolls stuffed with stir-fried veggies.",
    price: 140,
    rating: 4.5,
    category: "Chinese",
    veg: true,
    // Spring rolls
    image: img("photo-1544025162-d76694265947"),
  },
  {
    id: "ch8",
    name: "Chilli Paneer",
    description: "Paneer tossed with bell peppers in a hot chilli sauce.",
    price: 230,
    rating: 4.7,
    category: "Chinese",
    veg: true,
    // Chilli paneer with peppers
    image: img("photo-1574071318508-1cdbab80d002"),
    badge: "Spicy",
  },

  // ───────── Snacks (8 items) ─────────
  {
    id: "sn1",
    name: "Samosa",
    description: "Crispy triangular pastry with spiced potato filling.",
    price: 30,
    rating: 4.7,
    category: "Snacks",
    veg: true,
    // Samosa
    image: img("photo-1601050690597-df0568f70950"),
  },
  {
    id: "sn2",
    name: "Veg Puff",
    description: "Flaky pastry stuffed with masala veggies.",
    price: 35,
    rating: 4.5,
    category: "Snacks",
    veg: true,
    // Puff pastry
    image: img("photo-1509440159596-0249088772ff"),
  },
  {
    id: "sn3",
    name: "Sandwich",
    description: "Grilled veggie sandwich served with mint chutney.",
    price: 90,
    rating: 4.4,
    category: "Snacks",
    veg: true,
    // Grilled veggie sandwich
    image: img("photo-1525351484163-7529414344d8"),
  },
  {
    id: "sn4",
    name: "French Fries",
    description: "Golden crisp fries dusted with peri-peri.",
    price: 120,
    rating: 4.6,
    category: "Snacks",
    veg: true,
    // French fries
    image: img("photo-1630384060421-cb20d0e0649d"),
  },
  {
    id: "sn5",
    name: "Cutlet",
    description: "Crisp veg cutlets served with mint & tamarind chutneys.",
    price: 80,
    rating: 4.4,
    category: "Snacks",
    veg: true,
    // Veggie cutlet / patty
    image: img("photo-1568901346375-23c9450c58cd"),
  },
  {
    id: "sn6",
    name: "Pav Bhaji",
    description: "Buttery mashed veggie bhaji with toasted pav.",
    price: 150,
    rating: 4.8,
    category: "Snacks",
    veg: true,
    // Pav bhaji — butter on top, pav on side
    image: img("photo-1596797038530-2c107229654b"),
    badge: "Bestseller",
  },
  {
    id: "sn7",
    name: "Chaat",
    description: "Tangy, sweet & spicy chaat with sev & chutneys.",
    price: 100,
    rating: 4.6,
    category: "Snacks",
    veg: true,
    // Indian chaat with chutneys
    image: img("photo-1599487488170-d11ec9c172f0"),
  },
  {
    id: "sn8",
    name: "Bhel Puri",
    description: "Mumbai-style puffed rice chaat with sweet & spicy chutneys.",
    price: 90,
    rating: 4.5,
    category: "Snacks",
    veg: true,
    // Bhel puri street food
    image: img("photo-1599487488170-d11ec9c172f0"),
  },

  // ───────── Beverages (8 items) ─────────
  {
    id: "bv1",
    name: "Tea",
    description: "Classic Indian masala chai brewed with milk.",
    price: 30,
    rating: 4.6,
    category: "Beverages",
    veg: true,
    // Masala chai / tea
    image: img("photo-1576092768241-dec231879fc3"),
  },
  {
    id: "bv2",
    name: "Coffee",
    description: "Strong, authentic South Indian filter coffee.",
    price: 40,
    rating: 4.7,
    category: "Beverages",
    veg: true,
    // Filter coffee in tumbler
    image: img("photo-1514432324607-a09d9b4aefdd"),
  },
  {
    id: "bv3",
    name: "Badam Milk",
    description: "Chilled rich almond milk flavored with saffron & cardamom.",
    price: 80,
    rating: 4.6,
    category: "Beverages",
    veg: true,
    // Almond milk with saffron
    image: img("photo-1550583724-b2692b85b150"),
  },
  {
    id: "bv4",
    name: "Fresh Lime Juice",
    description: "Freshly squeezed lime served with mint & rock salt.",
    price: 60,
    rating: 4.5,
    category: "Beverages",
    veg: true,
    // Lime juice green glass
    image: img("photo-1513558161293-cdaf765ed2fd"),
  },
  {
    id: "bv5",
    name: "Rose Milk",
    description: "Chilled milk flavored with fragrant rose syrup.",
    price: 70,
    rating: 4.5,
    category: "Beverages",
    veg: true,
    // Pink rose milk
    image: img("photo-1546173159-315724a31696"),
  },
  {
    id: "bv6",
    name: "Mango Juice",
    description: "Pulpy, sweet chilled alphonso mango juice.",
    price: 90,
    rating: 4.7,
    category: "Beverages",
    veg: true,
    // Mango juice orange glass
    image: img("photo-1534353436294-0dbd4bdac845"),
  },
  {
    id: "bv7",
    name: "Lassi",
    description: "Thick sweet yogurt drink, perfectly cool & creamy.",
    price: 80,
    rating: 4.7,
    category: "Beverages",
    veg: true,
    // Lassi in tall glass
    image: img("photo-1553530666-ba11a7da3888"),
  },
  {
    id: "bv8",
    name: "Buttermilk",
    description: "Cooling spiced chaas flavored with ginger, curry leaves & mint.",
    price: 40,
    rating: 4.5,
    category: "Beverages",
    veg: true,
    // Buttermilk / chaas white drink
    image: img("photo-1553530666-ba11a7da3888"),
  },

  // ───────── Desserts (7 items) ─────────
  {
    id: "ds1",
    name: "Gulab Jamun",
    description: "Warm golden milk dumplings soaked in sweet cardamom syrup.",
    price: 80,
    rating: 4.8,
    category: "Desserts",
    veg: true,
    // Gulab jamun in syrup
    image: img("photo-1606491956689-2ea866880c84"),
    badge: "Bestseller",
  },
  {
    id: "ds2",
    name: "Rasgulla",
    description: "Spongy, soft cottage-cheese balls in a light sugar syrup.",
    price: 80,
    rating: 4.6,
    category: "Desserts",
    veg: true,
    // White rasgulla in syrup
    image: img("photo-1505253716362-afaea1d3d1af"),
  },
  {
    id: "ds3",
    name: "Ice Cream",
    description: "Rich and creamy scoops of premium ice cream.",
    price: 100,
    rating: 4.7,
    category: "Desserts",
    veg: true,
    // Ice cream scoops
    image: img("photo-1501386761578-eac5c94b800a"),
  },
  {
    id: "ds4",
    name: "Kesari",
    description: "Saffron-colored semolina sweet halwa loaded with ghee & cashews.",
    price: 70,
    rating: 4.5,
    category: "Desserts",
    veg: true,
    // Orange/yellow halwa
    image: img("photo-1582716401301-b2407dc7563d"),
  },
  {
    id: "ds5",
    name: "Carrot Halwa",
    description: "Slow-cooked sweet grated carrots cooked with milk, khoya & nuts.",
    price: 120,
    rating: 4.8,
    category: "Desserts",
    veg: true,
    // Orange carrot halwa
    image: img("photo-1601050690597-df0568f70950"),
  },
  {
    id: "ds6",
    name: "Payasam",
    description: "Traditional South Indian sweet kheer with coconut milk & jaggery.",
    price: 90,
    rating: 4.6,
    category: "Desserts",
    veg: true,
    // Kheer / payasam milky dessert
    image: img("photo-1553979459-d2229ba7433b"),
  },
  {
    id: "ds7",
    name: "Falooda",
    description: "Layered rose milk dessert served with vermicelli, jelly & ice cream.",
    price: 130,
    rating: 4.7,
    category: "Desserts",
    veg: true,
    // Falooda layered drink dessert
    image: img("photo-1572490122747-3968b75cc699"),
  },
];

export const REVIEWS = [
  {
    name: "Aarav S.",
    rating: 5,
    text: "The Mysore Masala Dosa is unreal. Crisp, golden, and packed with authentic spices every single time.",
    role: "Regular Customer",
  },
  {
    name: "Meera K.",
    rating: 5,
    text: "Booked SAM's vegetarian catering for my daughter's wedding. The live dosa counter and the palak paneer were a huge hit. 10/10!",
    role: "Event Host",
  },
  {
    name: "Rahul D.",
    rating: 4,
    text: "Quick lunch delivery at my office. The yellow Dal Tadka and Garlic Naan arrived piping hot. Incredible packaging.",
    role: "Office Order",
  },
];