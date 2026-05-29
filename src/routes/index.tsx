import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Filter,
  Flame,
  Search,
  Sparkles,
  Star,
  UtensilsCrossed,
  Gift,
  Percent,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { FoodCard } from "@/components/site/FoodCard";
import { CATEGORIES, MENU, REVIEWS, type Category, type FoodItem } from "@/lib/menu-data";
import { useT } from "@/lib/language-context";

export const Route = createFileRoute("/")(({
  component: Index,
  head: () => ({
    meta: [
      { title: "SAM Foods — 100% Pure Veg Hotel Dining & Catering" },
      {
        name: "description",
        content: "Order authentic South Indian dosas, idlis, North Indian paneer gravies, and premium vegetarian event catering from SAM Foods.",
      },
    ],
  }),
} as any));

type Sort = "popular" | "price-low" | "price-high" | "rating";

const CATEGORY_KEYS: Record<string, string> = {
  "South Indian": "category.southIndian",
  "North Indian": "category.northIndian",
  "Chinese": "category.chinese",
  "Snacks": "category.snacks",
  "Beverages": "category.beverages",
  "Desserts": "category.desserts",
};

const COMBOS: FoodItem[] = [
  {
    id: "combo_si",
    name: "Classic South Indian Combo",
    description: "Traditional breakfast deal: Idli (2 pcs) + Medu Vada (1 pc) + authentic Filter Coffee.",
    price: 149,
    rating: 4.9,
    category: "South Indian",
    veg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80",
    badge: "Combo Deal",
  },
  {
    id: "combo_ni",
    name: "North Indian Feast Combo",
    description: "Hearty North Indian lunch: Butter Naan (2 pcs) + Paneer Butter Masala + cooling Sweet Lassi.",
    price: 279,
    rating: 4.8,
    category: "North Indian",
    veg: true,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
    badge: "Combo Deal",
  },
  {
    id: "combo_ch",
    name: "Indo-Chinese Special Combo",
    description: "Classic street style wok: Veg Fried Rice + Gobi Manchurian Dry + Soft Drink.",
    price: 249,
    rating: 4.7,
    category: "Chinese",
    veg: true,
    image: "https://images.unsplash.com/photo-1603133872878-68550a5e2b6a?auto=format&fit=crop&w=900&q=80",
    badge: "Combo Deal",
  },
];

function Index() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const t = useT();

  // Dynamic lists from database
  const bestSellers = useMemo(() => {
    return MENU.filter((m) => m.badge === "Bestseller").slice(0, 4);
  }, []);

  const list = useMemo(() => {
    let arr = MENU.filter((m) => (cat === "All" ? true : m.category === cat));
    if (q) {
      const query = q.toLowerCase();
      arr = arr.filter((m) => {
        const searchable = `${t(`item.name.${m.id}`)} ${t(
          `item.desc.${m.id}`
        )} ${t(CATEGORY_KEYS[m.category] ?? m.category)}`.toLowerCase();
        return searchable.includes(query);
      });
    }
    if (sort === "price-low") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "price-high") arr = [...arr].sort((a, b) => b.price - a.price);
    if (sort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);
    return arr;
  }, [cat, q, sort]);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-50/70 px-3 py-1 text-xs font-bold text-emerald-800 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> {t("hero.badge")}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-5 text-5xl font-black leading-[1.05] md:text-7xl"
            >
              {t("hero.headline1")} <br />
              <span className="text-gradient">{t("hero.headline2")}</span> {t("hero.headline3")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 max-w-md text-base text-muted-foreground leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-elegant transition hover:scale-105"
              >
                <Flame className="h-4 w-4" /> {t("hero.orderNow")}
              </a>
              <Link
                to="/bulk-order"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3.5 font-semibold backdrop-blur transition hover:bg-accent hover:scale-105"
              >
                <UtensilsCrossed className="h-4 w-4" /> {t("hero.bulkBooking")}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <div className="text-2xl font-bold text-foreground">4.8★</div>
                12k+ {t("hero.ratings")}
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">30 min</div>
                {t("hero.avgDelivery")}
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">100%</div>
                Pure Veg Quality
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80"
              alt="SAM signature dosa"
              className="aspect-square w-full max-w-[480px] rounded-[2rem] object-cover shadow-elegant border-4 border-background"
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute left-0 bottom-10 hidden rounded-2xl border border-border bg-card p-3 shadow-elegant md:block"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-primary-foreground">
                  <Star className="h-4 w-4 fill-current" />
                </span>
                <div>
                  <div className="text-[10px] text-muted-foreground">{t("hero.bestseller")}</div>
                  <div className="text-xs font-bold">{t("hero.chickenBiryani")}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROMO OFFER BANNERS */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Offer 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-3xl border border-orange-500/10 bg-gradient-to-br from-orange-500/5 to-amber-600/10 p-6 flex flex-col justify-between min-h-[140px] group transition-all"
          >
            <div className="absolute right-4 bottom-2 opacity-10 group-hover:scale-110 transition duration-300">
              <Percent className="h-24 w-24 text-orange-600" />
            </div>
            <div>
              <span className="inline-flex rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-orange-700 uppercase">
                WELCOME50
              </span>
              <h3 className="mt-2 text-lg font-black text-foreground">Flat 50% Off</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                On your first order. Use code <span className="font-bold text-foreground">SAM50</span>
              </p>
            </div>
            <a
              href="#menu"
              className="mt-4 text-xs font-bold text-orange-700 flex items-center gap-1 hover:underline"
            >
              Order Now <ArrowRight className="h-3 w-3" />
            </a>
          </motion.div>

          {/* Offer 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-teal-600/10 p-6 flex flex-col justify-between min-h-[140px] group transition-all"
          >
            <div className="absolute right-4 bottom-2 opacity-10 group-hover:scale-110 transition duration-300">
              <Sparkles className="h-24 w-24 text-emerald-600" />
            </div>
            <div>
              <span className="inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                FREE DELIVERY
              </span>
              <h3 className="mt-2 text-lg font-black text-foreground">Zero Delivery Fee</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                On all orders above ₹499. No coupon required.
              </p>
            </div>
            <a
              href="#menu"
              className="mt-4 text-xs font-bold text-emerald-700 flex items-center gap-1 hover:underline"
            >
              Browse Menu <ArrowRight className="h-3 w-3" />
            </a>
          </motion.div>

          {/* Offer 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-3xl border border-rose-500/10 bg-gradient-to-br from-rose-500/5 to-pink-600/10 p-6 flex flex-col justify-between min-h-[140px] group transition-all"
          >
            <div className="absolute right-4 bottom-2 opacity-10 group-hover:scale-110 transition duration-300">
              <Gift className="h-24 w-24 text-rose-500" />
            </div>
            <div>
              <span className="inline-flex rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-rose-700 uppercase">
                CATERING SPECIAL
              </span>
              <h3 className="mt-2 text-lg font-black text-foreground">Bulk Bookings</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Planning a function? Get tailored pure veg menus 24/7.
              </p>
            </div>
            <Link
              to="/bulk-order"
              className="mt-4 text-xs font-bold text-rose-700 flex items-center gap-1 hover:underline"
            >
              Book Catering <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Chef's Special
            </div>
            <h2 className="mt-1 text-3xl font-black md:text-4xl">Best Sellers</h2>
          </div>
          <a
            href="#menu"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 transition"
          >
            View Full Menu <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((m, i) => (
            <FoodCard key={m.id} item={m} index={i} />
          ))}
        </div>
      </section>

      {/* COMBO MEALS */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Curated Deals
          </div>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Special Combo Meals</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Perfect combinations hand-crafted by our head chef to give you the ultimate culinary feast.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {COMBOS.map((combo, i) => (
            <FoodCard key={combo.id} item={combo} index={i} />
          ))}
        </div>
      </section>

      {/* FULL SEARCHABLE MENU */}
      <section id="menu" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-t border-border/60 pt-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {t("menu.title")}
            </div>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">{t("menu.heading")}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("menu.search")}
                className="w-44 bg-transparent text-sm outline-none"
              />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/40 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <span className="grid h-3.5 w-3.5 place-items-center rounded-sm border-2 border-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </span>
              {t("menu.pureVeg")}
            </span>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs">
              <Filter className="h-4 w-4" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-transparent outline-none font-medium"
              >
                <option value="popular">{t("menu.popular")}</option>
                <option value="rating">{t("menu.topRated")}</option>
                <option value="price-low">{t("menu.priceLow")}</option>
                <option value="price-high">{t("menu.priceHigh")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c as any)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                cat === c
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : "border border-border bg-card hover:bg-accent"
              }`}
            >
              {c === "All" ? t("menu.all") : t(CATEGORY_KEYS[c] ?? c)}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((m, i) => (
            <FoodCard key={m.id} item={m} index={i} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">{t("menu.noResults")}</p>
        )}
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            {t("reviews.title")}
          </div>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">{t("reviews.heading")}</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.blockquote
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm relative overflow-hidden"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm text-foreground/90 italic leading-relaxed">"{r.text}"</p>
              <footer className="mt-4 text-xs">
                <span className="font-bold text-foreground">{r.name}</span>
                <span className="text-muted-foreground"> · {r.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
