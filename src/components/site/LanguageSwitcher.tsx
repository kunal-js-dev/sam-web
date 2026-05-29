import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, useT, type Lang } from "@/lib/language-context";

const OPTIONS: { value: Lang; label: string; flag: string; native: string }[] = [
  { value: "en", label: "English",  flag: "🇬🇧", native: "English" },
  { value: "ta", label: "Tamil",    flag: "🇮🇳", native: "தமிழ்"  },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = OPTIONS.find((o) => o.value === lang) ?? OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        id="language-switcher-btn"
        aria-label={t("lang.selectLanguage")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1.5 text-sm font-medium hover:bg-accent transition"
      >
        <Globe className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">{current.flag} {current.native}</span>
        <span className="sm:hidden">{current.flag}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5 text-muted-foreground hidden sm:block"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </motion.svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-elegant z-50"
          >
            <div className="mb-1 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {t("lang.selectLanguage")}
            </div>
            {OPTIONS.map((opt) => (
              <button
                key={opt.value}
                id={`lang-option-${opt.value}`}
                onClick={() => { setLang(opt.value); setOpen(false); }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
                  lang === opt.value
                    ? "gradient-primary font-semibold text-primary-foreground shadow-glow"
                    : "hover:bg-accent text-foreground"
                }`}
              >
                <span className="text-base">{opt.flag}</span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="font-semibold">{opt.native}</span>
                  {opt.native !== opt.label && (
                    <span className="text-[10px] opacity-70">{opt.label}</span>
                  )}
                </span>
                {lang === opt.value && (
                  <svg className="ml-auto h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
