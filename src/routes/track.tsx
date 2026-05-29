import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bike, CheckCircle2, ChefHat, Package, PackageCheck, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/site/SiteShell";
import { useT } from "@/lib/language-context";

export const Route = createFileRoute("/track")({
  component: TrackPage,
  head: () => ({ meta: [{ title: "Track your order — SAM Foods" }] }),
});

function TrackPage() {
  const t = useT();
  const [step, setStep] = useState(1);

  const STAGES = [
    { key: "preparing", label: t("track.stage.preparing"), icon: Package,      time: "2 min" },
    { key: "cooking",   label: t("track.stage.cooking"),   icon: ChefHat,      time: "12 min" },
    { key: "packed",    label: t("track.stage.packed"),    icon: PackageCheck, time: "3 min" },
    { key: "out",       label: t("track.stage.out"),       icon: Bike,         time: "8 min" },
    { key: "delivered", label: t("track.stage.delivered"), icon: CheckCircle2, time: "" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s < STAGES.length - 1 ? s + 1 : s)), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {t("track.order")} #SAM-{Math.floor(Math.random() * 9000 + 1000)}
              </div>
              <h1 className="font-[Fraunces] text-3xl font-black md:text-4xl">{t("track.heading")}</h1>
              <p className="mt-1 text-muted-foreground">
                {t("track.eta")} <b className="text-foreground">{t("track.etaTime")}</b>
              </p>
            </div>
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">
              <Phone className="h-4 w-4" /> {t("track.callRider")}
            </a>
          </div>

          <div className="relative mt-10">
            <div className="absolute left-5 top-5 bottom-5 w-1 rounded-full bg-border md:left-1/2 md:-ml-0.5" />
            <motion.div
              className="absolute left-5 top-5 w-1 rounded-full gradient-primary md:left-1/2 md:-ml-0.5"
              initial={{ height: 0 }}
              animate={{ height: `${(step / (STAGES.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <ol className="space-y-8">
              {STAGES.map((s, i) => {
                const active = i <= step;
                const Icon = s.icon;
                return (
                  <li key={s.key} className="relative grid grid-cols-[40px_1fr] items-start gap-4 md:grid-cols-2 md:gap-12">
                    <div className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 transition md:col-span-2 md:mx-auto ${active ? "border-transparent gradient-primary text-primary-foreground shadow-glow" : "border-border bg-card text-muted-foreground"}`}>
                      <Icon className="h-4 w-4" />
                      {i === step && <span className="absolute inset-0 animate-ping rounded-full gradient-primary opacity-40" />}
                    </div>
                    <div className={`md:absolute md:top-0 ${i % 2 === 0 ? "md:right-[calc(50%+40px)] md:text-right" : "md:left-[calc(50%+40px)]"}`}>
                      <div className={`font-[Fraunces] text-lg font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</div>
                      {s.time && <div className="text-sm text-muted-foreground">~ {s.time}</div>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-10 rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            {t("track.orderMore")}{" "}
            <Link to="/" className="font-semibold text-primary hover:underline">{t("track.backToMenu")}</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
