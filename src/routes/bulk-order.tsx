import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, CheckCircle2, MapPin, PartyPopper, Phone, User, Users, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { Field } from "./login";
import { useT } from "@/lib/language-context";

export const Route = createFileRoute("/bulk-order")({
  component: BulkOrderPage,
  head: () => ({ meta: [{ title: "Bulk Catering — SAM Foods" }] }),
});

function BulkOrderPage() {
  const t = useT();
  const [done, setDone] = useState(false);
  const [f, setF] = useState({
    name: "", phone: "", event: "Wedding", people: "50", date: "", location: "",
    menu: "", budget: "₹25,000 - ₹50,000",
  });

  const set = (k: keyof typeof f) => (v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eventOptions = [
    { value: "Wedding",     label: t("bulk.event.wedding") },
    { value: "Birthday",    label: t("bulk.event.birthday") },
    { value: "Corporate",   label: t("bulk.event.corporate") },
    { value: "Festival",    label: t("bulk.event.festival") },
    { value: "House Party", label: t("bulk.event.houseParty") },
    { value: "Other",       label: t("bulk.event.other") },
  ];

  const budgetOptions = [
    "₹10,000 - ₹25,000",
    "₹25,000 - ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000+",
  ];

  const features = [
    { t: t("bulk.feature1.title"), d: t("bulk.feature1.desc") },
    { t: t("bulk.feature2.title"), d: t("bulk.feature2.desc") },
    { t: t("bulk.feature3.title"), d: t("bulk.feature3.desc") },
  ];

  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
            <PartyPopper className="h-3.5 w-3.5 text-primary" /> {t("bulk.badge")}
          </div>
          <h1 className="mt-4 max-w-2xl font-[Fraunces] text-5xl font-black md:text-6xl">
            {t("bulk.headline")} <span className="text-gradient">{t("bulk.headlineAccent")}</span>.
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">{t("bulk.description")}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 md:grid-cols-[1fr_360px] md:px-6">
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-8">
          {done ? (
            <div className="grid place-items-center py-10 text-center">
              <CheckCircle2 className="h-16 w-16 text-emerald-600" />
              <h2 className="mt-4 font-[Fraunces] text-3xl font-bold">{t("bulk.success.title")}</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                {t("bulk.success.msg")} <b className="text-foreground">{f.phone || t("bulk.phone")}</b> {t("bulk.success.msg2")}
              </p>
              <button type="button" onClick={() => { setDone(false); setF({ name: "", phone: "", event: "Wedding", people: "50", date: "", location: "", menu: "", budget: "₹25,000 - ₹50,000" }); }}
                className="mt-6 rounded-full gradient-primary px-5 py-2.5 font-semibold text-primary-foreground">{t("bulk.success.new")}</button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={<User className="h-4 w-4" />} placeholder={t("bulk.name")} value={f.name} onChange={set("name")} required />
              <Field icon={<Phone className="h-4 w-4" />} placeholder={t("bulk.phone")} value={f.phone} onChange={set("phone")} required />
              <SelectBox label={t("bulk.eventType")} icon={<PartyPopper className="h-4 w-4" />} value={f.event} onChange={set("event")} options={eventOptions} />
              <Field icon={<Users className="h-4 w-4" />} type="number" placeholder={t("bulk.people")} value={f.people} onChange={set("people")} min={10} required />
              <Field icon={<CalendarDays className="h-4 w-4" />} type="date" value={f.date} onChange={set("date")} required />
              <Field icon={<MapPin className="h-4 w-4" />} placeholder={t("bulk.location")} value={f.location} onChange={set("location")} required />
              <SelectBox className="sm:col-span-2" label={t("bulk.budget")} icon={<Wallet className="h-4 w-4" />} value={f.budget} onChange={set("budget")}
                options={budgetOptions.map((o) => ({ value: o, label: o }))} />
              <label className="sm:col-span-2">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("bulk.menuRequest")}</span>
                <textarea value={f.menu} onChange={(e) => set("menu")(e.target.value)} rows={4}
                  placeholder={t("bulk.menuPlaceholder")}
                  className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:shadow-glow" />
              </label>
              <button className="rounded-full gradient-primary py-3 font-semibold text-primary-foreground shadow-elegant transition hover:scale-[1.02] sm:col-span-2">{t("bulk.submit")}</button>
            </div>
          )}
        </motion.form>

        <aside className="space-y-4">
          {features.map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-card p-5">
              <div className="font-[Fraunces] text-lg font-bold">{x.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
          <div className="rounded-2xl gradient-primary p-5 text-primary-foreground shadow-elegant">
            <div className="text-xs uppercase tracking-wider opacity-80">{t("bulk.faster")}</div>
            <div className="font-[Fraunces] text-2xl font-bold">{t("bulk.call")}</div>
            <p className="mt-1 text-sm opacity-90">{t("bulk.callNote")}</p>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}

function SelectBox({ label, icon, value, onChange, options, className = "" }: {
  label: string; icon?: React.ReactNode; value: string;
  onChange: (v: string) => void; options: { value: string; label: string }[] | string[]; className?: string;
}) {
  const normalised = (options as any[]).map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  return (
    <label className={className}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 focus-within:border-primary focus-within:shadow-glow">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-sm outline-none">
          {normalised.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </label>
  );
}
