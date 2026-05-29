import { Heart, Plus, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { FoodItem } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { useT } from "@/lib/language-context";

export function FoodCard({ item, index = 0 }: { item: FoodItem; index?: number }) {
  const { add } = useCart();
  const [fav, setFav] = useState(false);
  const t = useT();
  const navigate = useNavigate();
  
  const name = t(`item.name.${item.id}`);
  const description = t(`item.desc.${item.id}`);
  const badgeLabel = item.badge ? t(`item.badge.${item.badge}`) : undefined;

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    add(item);
    navigate({ to: "/cart" });
  };

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
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80";
          }}
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
          <h3 className="font-[Fraunces] text-base font-bold leading-snug">{name}</h3>
          <span className="flex items-center gap-1 rounded-md bg-emerald-600/10 px-1.5 py-0.5 text-xs font-semibold text-emerald-600">
            <Star className="h-3 w-3 fill-current" /> {item.rating}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground min-h-[2rem]">{description}</p>
        
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{t("menu.price")}</div>
              <div className="text-xl font-black text-foreground">₹{item.price}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); add(item); }}
              className="inline-flex items-center justify-center gap-1 rounded-full border-2 border-primary/20 bg-background py-2 text-xs font-bold text-primary hover:bg-primary/5 active:scale-95 transition"
            >
              <Plus className="h-3.5 w-3.5" /> {t("card.add")}
            </button>
            <button
              onClick={handleOrderNow}
              className="inline-flex items-center justify-center gap-1 rounded-full gradient-primary py-2 text-xs font-bold text-primary-foreground shadow-elegant hover:brightness-105 active:scale-95 transition"
            >
              <Zap className="h-3.5 w-3.5 fill-current" /> {t("hero.orderNow")}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
