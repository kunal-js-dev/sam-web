import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Tag, Trash2, ShoppingBag, Leaf } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { placeOrder } from "@/lib/orders-store";
import { useT } from "@/lib/language-context";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your Cart — SAM Foods" }] }),
});

function CartPage() {
  const { items, setQty, remove, subtotal, delivery, gst, total, clear } = useCart();
  const { user } = useAuth();
  const t = useT();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const [room, setRoom] = useState("");
  const [whenMode, setWhenMode] = useState<"asap" | "schedule">("asap");
  const [time, setTime] = useState("");
  const [orderErr, setOrderErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const apply = () => {
    if (coupon.toUpperCase() === "SAM50") { setDiscount(50); setMsg(t("cart.coupon.success")); }
    else { setDiscount(0); setMsg(t("cart.coupon.invalid")); }
  };

  const checkout = () => {
    setOrderErr(null);
    if (!room.trim()) return setOrderErr(t("cart.err.noRoom"));
    if (whenMode === "schedule" && !time) return setOrderErr(t("cart.err.noTime"));
    const order = placeOrder({
      customer: user?.name || "Guest",
      email: user?.email,
      room: room.trim(),
      deliveryTime: whenMode === "asap" ? "ASAP" : time,
      items,
      total: Math.max(0, total - discount),
    });
    clear();
    void order;
    navigate({ to: "/track" });
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h1 className="font-[Fraunces] text-4xl font-black md:text-5xl">{t("cart.title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("cart.subtitle")}</p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <span className="grid h-4 w-4 place-items-center rounded-sm border-2 border-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></span>
          <Leaf className="h-3.5 w-3.5" /> {t("cart.pureVeg")}
        </div>

        {items.length === 0 ? (
          <div className="mt-12 grid place-items-center rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">{t("cart.empty.title")}</p>
            <p className="text-muted-foreground">{t("cart.empty.subtitle")}</p>
            <Link to="/" className="mt-6 inline-flex rounded-full gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-elegant">{t("cart.empty.browse")}</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-3">
              <AnimatePresence>
                {items.map((it) => (
                  <motion.div key={it.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3">
                    <img src={it.image} alt={it.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold">{t(`item.name.${it.id}`)}</div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <span className="grid h-3.5 w-3.5 place-items-center rounded-sm border-2 border-emerald-600"><span className="h-1 w-1 rounded-full bg-emerald-600" /></span>
                        ₹{it.price} · {t("cart.pureVegTag")}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-border bg-background p-1">
                      <button onClick={() => setQty(it.id, it.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-accent"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm font-bold">{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full gradient-primary text-primary-foreground"><Plus className="h-3 w-3" /></button>
                    </div>
                    <div className="w-20 text-right font-bold">₹{it.price * it.qty}</div>
                    <button onClick={() => remove(it.id)} className="grid h-9 w-9 place-items-center rounded-full text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">{t("cart.clearCart")}</button>
            </div>

            <aside className="h-fit rounded-3xl border border-border bg-card p-5 shadow-elegant">
              <div className="flex items-center gap-2 rounded-2xl border border-dashed border-border p-2">
                <Tag className="ml-2 h-4 w-4 text-primary" />
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder={t("cart.coupon.placeholder")} className="w-full bg-transparent px-1 text-sm outline-none" />
                <button onClick={apply} className="rounded-full gradient-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">{t("cart.coupon.apply")}</button>
              </div>
              {msg && <p className={`mt-2 text-xs ${discount > 0 ? "text-emerald-600" : "text-destructive"}`}>{msg}</p>}
              <hr className="my-4 border-border" />
              <Row k={t("cart.subtotal")} v={`₹${subtotal}`} />
              <Row k={t("cart.delivery")} v={delivery === 0 ? t("cart.free") : `₹${delivery}`} />
              <Row k={t("cart.gst")} v={`₹${gst}`} />
              {discount > 0 && <Row k={t("cart.discount")} v={`- ₹${discount}`} accent />}
              <hr className="my-3 border-border" />
              <div className="flex items-center justify-between text-lg font-bold">
                <span>{t("cart.total")}</span><span>₹{Math.max(0, total - discount)}</span>
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("cart.roomNumber")}</label>
                  <input value={room} onChange={(e) => setRoom(e.target.value)} placeholder={t("cart.roomPlaceholder")}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("cart.deliveryTime")}</label>
                  <div className="grid grid-cols-2 gap-1 rounded-full border border-border bg-background p-1 text-xs font-semibold">
                    <button type="button" onClick={() => setWhenMode("asap")}
                      className={`rounded-full py-1.5 ${whenMode === "asap" ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}`}>{t("cart.asap")}</button>
                    <button type="button" onClick={() => setWhenMode("schedule")}
                      className={`rounded-full py-1.5 ${whenMode === "schedule" ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}`}>{t("cart.schedule")}</button>
                  </div>
                  {whenMode === "schedule" && (
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
                  )}
                </div>
                {orderErr && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{orderErr}</p>}
              </div>
              <button onClick={checkout} className="mt-4 w-full rounded-full gradient-primary py-3 font-semibold text-primary-foreground shadow-elegant transition hover:scale-[1.02]">
                {t("cart.placeOrder")}
              </button>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">{t("cart.securePayment")}</p>
            </aside>
          </div>
        )}
      </section>
    </SiteShell>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return <div className={`flex items-center justify-between py-1 text-sm ${accent ? "text-emerald-600" : "text-muted-foreground"}`}><span>{k}</span><span className="font-semibold text-foreground">{v}</span></div>;
}
