import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, ChefHat, IndianRupee, Pencil, Plus, ShoppingBag, Trash2, Users, Utensils } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { useAuth } from "@/lib/auth-context";
import { MENU, type FoodItem } from "@/lib/menu-data";
import { useOrders, updateOrderStatus, STATUS_FLOW, type OrderStatus } from "@/lib/orders-store";
import { useT } from "@/lib/language-context";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin Dashboard — SAM Foods" }] }),
});

const BULK = [
  { id: "B-201", name: "Vinod Wedding", people: 250, date: "12 Dec", status: "Confirmed" },
  { id: "B-202", name: "Acme Corp Lunch", people: 80, date: "18 Dec", status: "Pending" },
];

function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const t = useT();
  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [user, loading, navigate]);

  const [items, setItems] = useState<FoodItem[]>(MENU);
  const [editing, setEditing] = useState<FoodItem | null>(null);
  const liveOrders = useOrders();

  const stats = [
    { label: t("admin.stats.revenue"), value: `₹${liveOrders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: IndianRupee, trend: t("admin.stats.live") },
    { label: t("admin.stats.orders"), value: String(liveOrders.length), icon: ShoppingBag, trend: t("admin.stats.live") },
    { label: t("admin.stats.customers"), value: "1,247", icon: Users, trend: "+24" },
    { label: t("admin.stats.menuItems"), value: String(items.length), icon: Utensils, trend: "" },
  ];

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary">{t("admin.title")}</div>
            <h1 className="font-[Fraunces] text-4xl font-black md:text-5xl">{t("admin.heading")}</h1>
          </div>
          <Link to="/" className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">{t("admin.viewSite")}</Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground"><s.icon className="h-5 w-5" /></span>
                {s.trend && <span className="rounded-full bg-emerald-600/10 px-2 py-0.5 text-xs font-semibold text-emerald-600">{s.trend}</span>}
              </div>
              <div className="mt-3 text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-[Fraunces] text-xl font-bold">{t("admin.liveOrders")}</h2>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600">
                <span className="relative grid h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>
                {t("admin.realTime")}
              </span>
            </div>
            {liveOrders.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                {t("admin.noOrders")}
              </p>
            ) : (
              <div className="space-y-2">
                {liveOrders.map((o) => (
                  <div key={o.id} className="rounded-2xl border border-border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                        <span className="text-sm font-semibold">{o.customer}</span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{t("admin.room", { room: o.room })}</span>
                        <span className="text-[10px] text-muted-foreground">· {o.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">₹{o.total}</span>
                        <StatusPill s={o.status} />
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {o.items.map((i) => `${t(`item.name.${i.id}`)} ×${i.qty}`).join(", ")}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {STATUS_FLOW.map((s) => (
                        <button key={s} onClick={() => updateOrderStatus(o.id, s as OrderStatus)}
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${o.status === s ? "gradient-primary text-primary-foreground" : "border border-border bg-background text-muted-foreground hover:bg-accent"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-5">
            <h2 className="mb-3 font-[Fraunces] text-xl font-bold flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> {t("admin.weeklyRevenue")}</h2>
            <div className="flex h-44 items-end gap-2">
              {[42, 58, 36, 71, 48, 88, 65].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05 }}
                  className="flex-1 rounded-t-lg gradient-primary opacity-90" />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              {["M","T","W","T","F","S","S"].map((d,i)=><span key={i}>{d}</span>)}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-[Fraunces] text-xl font-bold flex items-center gap-2"><ChefHat className="h-5 w-5 text-primary" /> {t("admin.manageMenu")}</h2>
              <button onClick={() => setEditing({ id: "new", name: "", description: "", price: 0, rating: 4.5, category: "Snacks", veg: true, image: "" })}
                className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"><Plus className="h-3.5 w-3.5" /> {t("admin.addItem")}</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.slice(0, 6).map((it) => (
                <div key={it.id} className="flex items-center gap-3 rounded-2xl border border-border p-2">
                  <img src={it.image} alt={it.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold leading-tight">{it.name}</div>
                    <div className="text-xs text-muted-foreground">{it.category} · ₹{it.price}</div>
                  </div>
                  <button onClick={() => setEditing(it)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-accent"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => setItems((p) => p.filter((x) => x.id !== it.id))} className="grid h-8 w-8 place-items-center rounded-full text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5">
            <h2 className="mb-3 font-[Fraunces] text-xl font-bold">{t("admin.bulkBookings")}</h2>
            <div className="space-y-2">
              {BULK.map((b) => (
                <div key={b.id} className="rounded-2xl border border-border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{b.name}</span>
                    <StatusPill s={b.status} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{b.people} guests · {b.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {editing && (
          <div onClick={() => setEditing(null)} className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-elegant">
              <h3 className="font-[Fraunces] text-2xl font-bold">{editing.id === "new" ? t("admin.modal.add") : t("admin.modal.edit")} {t("admin.modal.item")}</h3>
              <div className="mt-4 space-y-3">
                <input className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder={t("admin.modal.name")} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                <input className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder={t("admin.modal.description")} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <input className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" type="number" placeholder={t("admin.modal.price")} value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: +e.target.value })} />
                  <select className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as FoodItem["category"] })}>
                    {["Briyani","Meals","Starters","Drinks","Desserts"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <input className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder={t("admin.modal.imageUrl")} value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
              </div>
              <div className="mt-5 flex gap-3">
                <button onClick={() => setEditing(null)} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold hover:bg-accent">{t("admin.modal.cancel")}</button>
                <button onClick={() => {
                  setItems((prev) => editing.id === "new"
                    ? [{ ...editing, id: `n${Date.now()}` }, ...prev]
                    : prev.map((p) => (p.id === editing.id ? editing : p)));
                  setEditing(null);
                }} className="flex-1 rounded-full gradient-primary py-2.5 text-sm font-semibold text-primary-foreground">{t("admin.modal.save")}</button>
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </SiteShell>
  );
}

function StatusPill({ s }: { s: string }) {
  const t = useT();
  const map: Record<string, string> = {
    Delivered: "bg-emerald-600/10 text-emerald-600",
    Cooking: "bg-amber-500/10 text-amber-600",
    Preparing: "bg-blue-500/10 text-blue-600",
    "Out for delivery": "bg-primary/10 text-primary",
    Confirmed: "bg-emerald-600/10 text-emerald-600",
    Pending: "bg-amber-500/10 text-amber-600",
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${map[s] || "bg-muted text-foreground"}`}>{t(`order.status.${s}`)}</span>;
}
