import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bike, IndianRupee, MapPin, Navigation, Package } from "lucide-react";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { useAuth } from "@/lib/auth-context";
import { useOrders, updateOrderStatus } from "@/lib/orders-store";
import { useT } from "@/lib/language-context";

export const Route = createFileRoute("/delivery")({
  component: DeliveryPage,
  head: () => ({ meta: [{ title: "Delivery Partner — SAM Foods" }] }),
});

const INITIAL = [
  { id: "SAM-1030", customer: "Meera K.", address: "12, Ocean Ave, Besant Nagar", items: 5, payout: 62, status: "Picked up" },
  { id: "SAM-1031", customer: "Rahul D.", address: "Flat 4B, Green Towers, T. Nagar", items: 2, payout: 48, status: "Assigned" },
  { id: "SAM-1034", customer: "Priya N.", address: "21, Lake Road, Adyar", items: 3, payout: 55, status: "Assigned" },
];

function DeliveryPage() {
  const t = useT();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [user, loading, navigate]);

  const [list, setList] = useState(INITIAL);
  const liveOrders = useOrders().filter((o) => o.status === "Ready" || o.status === "Out for delivery" || o.status === "Delivered");
  const earnings = list.reduce((s, l) => s + l.payout, 0) + liveOrders.reduce((s, o) => s + Math.round(o.total * 0.08), 0);

  const metrics = [
    { label: t("delivery.earnings"), value: `₹${earnings}`, icon: IndianRupee },
    { label: t("delivery.activeDrops"), value: String(list.filter((l) => l.status !== "Delivered").length), icon: Package },
    { label: t("delivery.distance"), value: "12.4 km", icon: Bike },
  ];

  const statusLabel = (status: string) => t(`order.status.${status}`);
  const actionLabel = (status: string) => status === "Ready" ? t("delivery.pickUp") : t("delivery.markDelivered");

  const advance = (id: string) => {
    const order = ["Assigned", "Picked up", "On the way", "Delivered"];
    setList((p) => p.map((o) => o.id === id ? { ...o, status: order[Math.min(order.indexOf(o.status) + 1, order.length - 1)] } : o));
  };

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="text-xs uppercase tracking-wider text-primary">{t("delivery.partner")}</div>
        <h1 className="font-[Fraunces] text-4xl font-black md:text-5xl">{t("delivery.greeting", { name: user?.name?.split(" ")[0] || t("delivery.rider") })} 👋</h1>
        <p className="mt-1 text-muted-foreground">{t("delivery.pendingCount", { count: 3 })}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {metrics.map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground"><s.icon className="h-5 w-5" /></span>
              <div className="mt-3 text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <h2 className="mt-10 font-[Fraunces] text-2xl font-bold">{t("delivery.assignedDeliveries")}</h2>
        {liveOrders.length > 0 && (
          <div className="mt-4 space-y-3">
            {liveOrders.map((o) => (
              <div key={o.id} className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{t("delivery.room", { room: o.room })}</span>
                      <span className="text-[10px] text-muted-foreground">· {o.deliveryTime}</span>
                    </div>
                    <div className="mt-1 font-semibold">{o.customer} · ₹{o.total}</div>
                    <div className="text-xs text-muted-foreground">{o.items.map((i) => `${t(`item.name.${i.id}`)} ×${i.qty}`).join(", ")}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${o.status === "Delivered" ? "bg-emerald-600/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{statusLabel(o.status)}</span>
                    {o.status !== "Delivered" && (
                      <button onClick={() => updateOrderStatus(o.id, o.status === "Ready" ? "Out for delivery" : "Delivered")}
                        className="rounded-full gradient-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-elegant">
                        {o.status === "Ready" ? t("delivery.pickUp") : t("delivery.markDelivered")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 space-y-3">
          {list.map((o, i) => (
            <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="grid gap-3 rounded-2xl border border-border bg-card p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${o.status === "Delivered" ? "bg-emerald-600/10 text-emerald-600" : "bg-primary/10 text-primary"}`}>{statusLabel(o.status)}</span>
                </div>
                <div className="mt-1 font-semibold">{o.customer} · {o.items} items · ₹{o.payout} payout</div>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {o.address}</div>
              </div>
              <div className="flex gap-2">
                <a href={`https://maps.google.com/?q=${encodeURIComponent(o.address)}`} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold hover:bg-accent">
                  <Navigation className="h-3.5 w-3.5" /> {t("delivery.navigate")}
                </a>
                <button onClick={() => advance(o.id)} disabled={o.status === "Delivered"}
                  className="rounded-full gradient-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-elegant disabled:opacity-50">
                  {o.status === "Delivered" ? t("delivery.done") : actionLabel(o.status)}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
