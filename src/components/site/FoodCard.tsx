import { Heart, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { FoodItem } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { useT } from "@/lib/language-context";

export function FoodCard({ item, index = 0 }: { item: FoodItem; index?: number }) {
  const { add } = useCart();
  const [fav, setFav] = useState(false);
  const t = useT();
  const name = t(`item.name.${item.id}`);
  const description = t(`item.desc.${item.id}`);
  const badgeLabel = item.badge ? t(`item.badge.${item.badge}`) : undefined;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: "easeOut" }}
      className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className={`flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-bold backdrop-blur ${item.veg ? "border-emerald-600/50 bg-emerald-50/70 text-emerald-700" : "border-rose-600/50 bg-rose-50/70 text-rose-700"}`}>
            <span className={`h-2 w-2 rounded-full ${item.veg ? "bg-emerald-600" : "bg-rose-600"}`} />
            {item.veg ? t("card.veg") : t("card.nonVeg")}
          </span>
          <button
            aria-label={t("card.favourite")}
            onClick={() => setFav((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur transition hover:scale-110"
          >
            <Heart className={`h-4 w-4 transition ${fav ? "fill-primary text-primary" : "text-foreground"}`} />
          </button>
        </div>
        {item.badge && (
          <span className="absolute bottom-3 left-3 rounded-full gradient-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
            {badgeLabel && !badgeLabel.startsWith("item.badge.") ? badgeLabel : item.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-[Fraunces] text-lg font-bold leading-snug">{name}</h3>
          <span className="flex items-center gap-1 rounded-md bg-emerald-600/10 px-1.5 py-0.5 text-xs font-semibold text-emerald-600">
            <Star className="h-3 w-3 fill-current" /> {item.rating}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase text-muted-foreground">{t("menu.price")}</div>
            <div className="text-xl font-bold">₹{item.price}</div>
          </div>
          <button
            onClick={() => add(item)}
            className="inline-flex items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95 active:scale-95"
          >
            <Plus className="h-4 w-4" /> {t("card.add")}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
