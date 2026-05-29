import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import en from "@/locales/en.json";
import ta from "@/locales/ta.json";

export type Lang = "en" | "ta";

const LOCALES: Record<Lang, Record<string, string>> = { en, ta };
const STORAGE_KEY = "sam_lang";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

/** Detect browser language and return "ta" if Tamil, else "en" */
function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const nav = navigator.language || (navigator as any).userLanguage || "";
  return nav.startsWith("ta") ? "ta" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof localStorage === "undefined") return "en";
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "en" || stored === "ta") return stored;
    // First visit: auto-detect browser language
    return detectBrowserLang();
  });

  // Sync html[lang] and body class on every change
  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.toggle("lang-ta", lang === "ta");
    // Smooth fade on switch
    document.body.style.opacity = "0.92";
    const t = setTimeout(() => { document.body.style.opacity = "1"; }, 120);
    return () => clearTimeout(t);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  /** Translate a key; replace {var} placeholders */
  const t = (key: string, vars?: Record<string, string | number>): string => {
    let str = LOCALES[lang][key] ?? LOCALES["en"][key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      });
    }
    return str;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

/** Shorthand hook — returns only the t() function */
export function useT() {
  return useLanguage().t;
}
