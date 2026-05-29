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

const img = (id: string) =>
  id.startsWith("search:")
    ? `https://source.unsplash.com/900x600/?${encodeURIComponent(
        id.slice(7)
      )}`
    : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const MENU: FoodItem[] = [
  // ───────── South Indian ─────────
  { id: "si1", name: "Idli", description: "Soft steamed rice cakes with sambar & coconut chutney.", price: 60, rating: 4.7, category: "South Indian", veg: true, image: img("search:idli"), badge: "Classic" },
  { id: "si2", name: "Mini Idli", description: "Bite-sized idlis dunked in hot ghee sambar.", price: 80, rating: 4.6, category: "South Indian", veg: true, image: img("search:mini idli") },
  { id: "si3", name: "Ghee Podi Idli", description: "Idlis tossed in gunpowder masala & nutty ghee.", price: 110, rating: 4.8, category: "South Indian", veg: true, image: img("search:ghee idli podi"), badge: "Spicy" },
  { id: "si4", name: "Masala Dosa", description: "Golden crisp dosa stuffed with spiced potato masala.", price: 120, rating: 4.8, category: "South Indian", veg: true, image: img("search:masala dosa"), badge: "Bestseller" },
  { id: "si5", name: "Mysore Masala Dosa", description: "Red chutney smeared crisp dosa with potato filling.", price: 140, rating: 4.7, category: "South Indian", veg: true, image: img("search:mysore masala dosa") },
  { id: "si6", name: "Onion Dosa", description: "Crispy dosa loaded with caramelised onions.", price: 110, rating: 4.5, category: "South Indian", veg: true, image: img("search:onion dosa") },
  { id: "si7", name: "Rava Dosa", description: "Lace-thin semolina dosa with cumin & pepper.", price: 130, rating: 4.6, category: "South Indian", veg: true, image: img("search:rava dosa") },
  { id: "si8", name: "Paneer Dosa", description: "Crisp dosa with spiced paneer & onion stuffing.", price: 160, rating: 4.6, category: "South Indian", veg: true, image: img("search:paneer dosa") },
  { id: "si9", name: "Uttapam", description: "Thick pancake dosa topped with onion, tomato & chilli.", price: 110, rating: 4.5, category: "South Indian", veg: true, image: img("search:uttapam") },
  { id: "si10", name: "Pongal", description: "Creamy rice & moong dal with pepper, ghee & cashews.", price: 90, rating: 4.6, category: "South Indian", veg: true, image: img("search:pongal south indian") },
  { id: "si11", name: "Poori Masala", description: "Fluffy fried pooris with classic potato masala.", price: 100, rating: 4.5, category: "South Indian", veg: true, image: img("search:poori masala") },
  { id: "si12", name: "Vada", description: "Crispy lentil donuts with chutney & sambar.", price: 60, rating: 4.6, category: "South Indian", veg: true, image: img("search:vada medu vada") },
  { id: "si13", name: "Medu Vada", description: "Fluffy urad dal vadas, golden & crisp outside.", price: 70, rating: 4.6, category: "South Indian", veg: true, image: img("search:medu vada") },
  { id: "si14", name: "Sambar Rice", description: "Comforting rice cooked with sambar lentils & veggies.", price: 110, rating: 4.5, category: "South Indian", veg: true, image: img("search:sambar rice") },
  { id: "si15", name: "Curd Rice", description: "Cooling curd rice tempered with mustard & curry leaves.", price: 90, rating: 4.5, category: "South Indian", veg: true, image: img("search:curd rice") },
  { id: "si16", name: "Lemon Rice", description: "Tangy turmeric rice with peanuts & curry leaves.", price: 90, rating: 4.5, category: "South Indian", veg: true, image: img("search:lemon rice") },
  { id: "si17", name: "Coconut Rice", description: "Fragrant rice tossed with fresh coconut & cashews.", price: 100, rating: 4.4, category: "South Indian", veg: true, image: img("search:coconut rice") },
  { id: "si18", name: "Tomato Rice", description: "Spiced tomato rice with a hint of garam masala.", price: 100, rating: 4.5, category: "South Indian", veg: true, image: img("search:tomato rice") },

  // ───────── North Indian ─────────
  { id: "ni1", name: "Paneer Butter Masala", description: "Paneer cubes in silky tomato-butter cashew gravy.", price: 220, rating: 4.8, category: "North Indian", veg: true, image: img("search:paneer butter masala"), badge: "Bestseller" },
  { id: "ni2", name: "Kadai Paneer", description: "Paneer & peppers tossed in roasted kadai masala.", price: 230, rating: 4.7, category: "North Indian", veg: true, image: img("search:kadai paneer") },
  { id: "ni3", name: "Palak Paneer", description: "Soft paneer simmered in creamy spinach gravy.", price: 210, rating: 4.6, category: "North Indian", veg: true, image: img("search:palak paneer") },
  { id: "ni4", name: "Veg Kolhapuri", description: "Mixed veggies in a fiery Kolhapuri spice masala.", price: 200, rating: 4.5, category: "North Indian", veg: true, image: img("search:veg kolhapuri"), badge: "Spicy" },
  { id: "ni5", name: "Mix Veg Curry", description: "Garden vegetables in a mildly spiced onion-tomato gravy.", price: 180, rating: 4.4, category: "North Indian", veg: true, image: img("search:mixed vegetable curry") },
  { id: "ni6", name: "Chole Masala", description: "Slow-cooked chickpeas in a rich Punjabi masala.", price: 170, rating: 4.6, category: "North Indian", veg: true, image: img("search:chole masala") },
  { id: "ni7", name: "Dal Fry", description: "Yellow lentils tempered with cumin, garlic & ghee.", price: 150, rating: 4.5, category: "North Indian", veg: true, image: img("search:dal fry") },
  { id: "ni8", name: "Dal Tadka", description: "Toor & moong dal finished with smoky ghee tadka.", price: 160, rating: 4.6, category: "North Indian", veg: true, image: img("search:dal tadka") },
  { id: "ni9", name: "Jeera Rice", description: "Fragrant basmati rice tempered with cumin & ghee.", price: 140, rating: 4.5, category: "North Indian", veg: true, image: img("search:jeera rice") },
  { id: "ni10", name: "Veg Pulao", description: "Aromatic basmati cooked with garden veggies & whole spices.", price: 180, rating: 4.6, category: "North Indian", veg: true, image: img("search:veg pulao") },
  { id: "ni11", name: "Veg Fried Rice", description: "Wok-tossed rice with mixed veggies & soy.", price: 170, rating: 4.5, category: "North Indian", veg: true, image: img("search:veg fried rice") },
  { id: "ni12", name: "Butter Naan", description: "Soft tandoor naan brushed with melted butter.", price: 50, rating: 4.7, category: "North Indian", veg: true, image: img("search:butter naan") },
  { id: "ni13", name: "Garlic Naan", description: "Naan loaded with fresh garlic & coriander.", price: 60, rating: 4.7, category: "North Indian", veg: true, image: img("search:garlic naan") },
  { id: "ni14", name: "Roti", description: "Whole-wheat tandoor roti, soft & smoky.", price: 25, rating: 4.5, category: "North Indian", veg: true, image: img("search:roti chapati") },
  { id: "ni15", name: "Kulcha", description: "Pillowy stuffed kulcha straight from the tandoor.", price: 70, rating: 4.6, category: "North Indian", veg: true, image: img("search:kulcha") },

  // ───────── Chinese ─────────
  { id: "ch1", name: "Veg Fried Rice", description: "Classic Indo-Chinese fried rice with crunchy veggies.", price: 160, rating: 4.5, category: "Chinese", veg: true, image: img("search:veg fried rice indo chinese") },
  { id: "ch2", name: "Schezwan Fried Rice", description: "Fiery schezwan-tossed rice with garlic & chilli.", price: 180, rating: 4.7, category: "Chinese", veg: true, image: img("search:schezwan fried rice"), badge: "Spicy" },
  { id: "ch3", name: "Veg Noodles", description: "Stir-fried noodles with crunchy garden veggies.", price: 150, rating: 4.5, category: "Chinese", veg: true, image: img("search:veg noodles") },
  { id: "ch4", name: "Hakka Noodles", description: "Classic Hakka-style noodles with soy & pepper.", price: 170, rating: 4.6, category: "Chinese", veg: true, image: img("search:hakka noodles") },
  { id: "ch5", name: "Gobi Manchurian", description: "Crispy cauliflower in tangy Indo-Chinese sauce.", price: 180, rating: 4.7, category: "Chinese", veg: true, image: img("search:gobi manchurian") },
  { id: "ch6", name: "Paneer Manchurian", description: "Crispy paneer cubes glazed in spicy manchurian sauce.", price: 220, rating: 4.7, category: "Chinese", veg: true, image: img("search:paneer manchurian") },
  { id: "ch7", name: "Veg Spring Roll", description: "Crisp rolls stuffed with stir-fried veggies.", price: 140, rating: 4.5, category: "Chinese", veg: true, image: img("search:veg spring roll") },
  { id: "ch8", name: "Chilli Paneer", description: "Paneer tossed with bell peppers in a hot chilli sauce.", price: 230, rating: 4.7, category: "Chinese", veg: true, image: img("search:chilli paneer"), badge: "Spicy" },

  // ───────── Snacks ─────────
  { id: "sn1", name: "Samosa", description: "Crispy triangular pastry with spiced potato filling.", price: 30, rating: 4.7, category: "Snacks", veg: true, image: img("search:samosa") },
  { id: "sn2", name: "Veg Puff", description: "Flaky pastry stuffed with masala veggies.", price: 35, rating: 4.5, category: "Snacks", veg: true, image: img("search:veg puff") },
  { id: "sn3", name: "Sandwich", description: "Grilled veggie sandwich with mint chutney.", price: 90, rating: 4.4, category: "Snacks", veg: true, image: img("search:vegetable sandwich") },
  { id: "sn4", name: "French Fries", description: "Golden crisp fries dusted with peri-peri.", price: 120, rating: 4.6, category: "Snacks", veg: true, image: img("search:french fries") },
  { id: "sn5", name: "Cutlet", description: "Crisp veg cutlets with mint & tamarind chutneys.", price: 80, rating: 4.4, category: "Snacks", veg: true, image: img("search:vegetable cutlet") },
  { id: "sn6", name: "Pav Bhaji", description: "Buttery mashed veggie bhaji with toasted pav.", price: 150, rating: 4.8, category: "Snacks", veg: true, image: img("search:pav bhaji") , badge: "Bestseller" },
  { id: "sn7", name: "Chaat", description: "Tangy, sweet & spicy chaat with sev & chutneys.", price: 100, rating: 4.6, category: "Snacks", veg: true, image: img("search:chaat") },
  { id: "sn8", name: "Bhel Puri", description: "Mumbai-style puffed rice chaat with chutneys.", price: 90, rating: 4.5, category: "Snacks", veg: true, image: img("search:bhel puri") },
  { id: "sn9", name: "Paneer Burger", description: "Grilled paneer burger with onion relish & soft bun.", price: 180, rating: 4.6, category: "Snacks", veg: true, image: img("search:paneer burger") },
  { id: "sn10", name: "Veg Pizza Slice", description: "Cheesy pizza slice loaded with peppers & olives.", price: 150, rating: 4.5, category: "Snacks", veg: true, image: img("search:veg pizza slice") },
  { id: "sn11", name: "Chicken Shawarma", description: "Wrap of spiced chicken, pickles, and garlic sauce.", price: 200, rating: 4.7, category: "Snacks", veg: false, image: img("search:chicken shawarma") },
  { id: "sn12", name: "Chicken Noodles", description: "Wok-fried noodles with chicken, veggies, and soy glaze.", price: 190, rating: 4.6, category: "Snacks", veg: false, image: img("search:chicken noodles") },
  { id: "sn13", name: "Chicken Biryani", description: "Aromatic chicken biryani with saffron, raita, and salad.", price: 260, rating: 4.8, category: "Snacks", veg: false, image: img("search:chicken biryani"), badge: "Bestseller" },

  // ───────── Beverages ─────────
  { id: "bv1", name: "Tea", description: "Classic Indian masala chai brewed with milk.", price: 30, rating: 4.6, category: "Beverages", veg: true, image: img("search:masala chai tea") },
  { id: "bv2", name: "Coffee", description: "Strong South Indian filter coffee.", price: 40, rating: 4.7, category: "Beverages", veg: true, image: img("search:filter coffee south indian") },
  { id: "bv3", name: "Badam Milk", description: "Chilled almond milk with saffron & cardamom.", price: 80, rating: 4.6, category: "Beverages", veg: true, image: img("search:badam milk") },
  { id: "bv4", name: "Fresh Lime Juice", description: "Freshly squeezed lime with mint & rock salt.", price: 60, rating: 4.5, category: "Beverages", veg: true, image: img("search:fresh lime juice") },
  { id: "bv5", name: "Rose Milk", description: "Chilled milk with rose syrup & basil seeds.", price: 70, rating: 4.5, category: "Beverages", veg: true, image: img("search:rose milk") },
  { id: "bv6", name: "Mango Juice", description: "Pulpy alphonso mango juice, chilled.", price: 90, rating: 4.7, category: "Beverages", veg: true, image: img("search:mango juice alphonso") },
  { id: "bv7", name: "Lassi", description: "Thick sweet yogurt drink, cool & creamy.", price: 80, rating: 4.7, category: "Beverages", veg: true, image: img("search:sweet lassi") },
  { id: "bv8", name: "Buttermilk", description: "Spiced chaas with ginger, curry leaves & mint.", price: 40, rating: 4.5, category: "Beverages", veg: true, image: img("search:buttermilk chaas") },

  // ───────── Desserts ─────────
  { id: "ds1", name: "Gulab Jamun", description: "Warm milk dumplings soaked in cardamom syrup.", price: 80, rating: 4.8, category: "Desserts", veg: true, image: img("search:gulab jamun"), badge: "Bestseller" },
  { id: "ds2", name: "Rasgulla", description: "Spongy cottage-cheese balls in light sugar syrup.", price: 80, rating: 4.6, category: "Desserts", veg: true, image: img("search:rasgulla") },
  { id: "ds3", name: "Ice Cream", description: "Scoops of premium kulfi-style ice cream.", price: 100, rating: 4.7, category: "Desserts", veg: true, image: img("search:kulfi ice cream") },
  { id: "ds4", name: "Kesari", description: "Saffron semolina halwa with ghee & cashews.", price: 70, rating: 4.5, category: "Desserts", veg: true, image: img("search:kesari") },
  { id: "ds5", name: "Carrot Halwa", description: "Slow-cooked gajar halwa with khoya & nuts.", price: 120, rating: 4.8, category: "Desserts", veg: true, image: img("search:carrot halwa") },
  { id: "ds6", name: "Payasam", description: "Traditional South Indian kheer with jaggery & coconut.", price: 90, rating: 4.6, category: "Desserts", veg: true, image: img("search:payasam") },
  { id: "ds7", name: "Falooda", description: "Layered rose milk with vermicelli, jelly & ice cream.", price: 130, rating: 4.7, category: "Desserts", veg: true, image: img("search:falooda") },
];

export const REVIEWS = [
  { name: "Aarav S.", rating: 5, text: "The Chicken Biryani is unreal. Hot, spicy, and packed with flavour every single time.", role: "Regular Customer" },
  { name: "Meera K.", rating: 5, text: "Booked SAM for my 50-person event — the catering team was a dream. 10/10.", role: "Event Host" },
  { name: "Rahul D.", rating: 4, text: "Delivery is fast and packaging is premium. Love the live tracker.", role: "Office Order" },
];
