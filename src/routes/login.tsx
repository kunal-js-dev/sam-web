import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { AuthShell } from "@/components/site/AuthShell";
import { useAuth, type Role } from "@/lib/auth-context";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/language-context";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign in — SAM Foods" }] }),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const t = useT();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [role, setRole] = useState<Role>("customer");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const ROLES: { value: Role; label: string }[] = [
    { value: "customer", label: t("login.role.customer") },
    { value: "admin",    label: t("login.role.admin") },
    { value: "delivery", label: t("login.role.delivery") },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr(t("login.err.email"));
    if (password.length < 6) return setErr(t("login.err.password"));
    setLoading(true);
    const u = await login(email, password, role);
    setLoading(false);
    navigate({ to: u.role === "admin" ? "/admin" : u.role === "delivery" ? "/delivery" : "/" });
  };

  const googleLogin = async () => {
    setErr(null);
    setLoading(true);
    try {
      if (typeof window !== "undefined") window.localStorage.setItem("sam_pending_role", role);
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/login",
        extraParams: { prompt: "select_account" },
      });
      if (result.redirected) return;
      if (result.error) {
        setLoading(false);
        setErr(result.error.message || t("login.err.googleFailed"));
        return;
      }
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) {
        setLoading(false);
        setErr(t("login.err.noSession"));
        return;
      }
      setLoading(false);
      navigate({ to: role === "admin" ? "/admin" : role === "delivery" ? "/delivery" : "/" });
    } catch (e) {
      setLoading(false);
      setErr(e instanceof Error ? e.message : t("login.err.googleFailed"));
    }
  };

  return (
    <AuthShell title={t("login.title")} subtitle={t("login.subtitle")}>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("login.continueAs")}</div>
      <div className="mb-5 grid grid-cols-3 gap-1 rounded-full border border-border bg-card p-1 text-xs font-semibold">
        {ROLES.map((r) => (
          <button key={r.value} onClick={() => setRole(r.value)} className={`rounded-full py-2 capitalize transition ${role === r.value ? "gradient-primary text-primary-foreground shadow-elegant" : "text-muted-foreground hover:text-foreground"}`}>
            {r.label}
          </button>
        ))}
      </div>
      <p className="-mt-3 mb-4 text-xs text-muted-foreground">{t("login.roleNote")}</p>
      <form onSubmit={submit} className="space-y-4">
        <Field icon={<Mail className="h-4 w-4" />} type="email" placeholder={t("login.email")} value={email} onChange={setEmail} />
        <div className="relative">
          <Field icon={<Lock className="h-4 w-4" />} type={show ? "text" : "password"} placeholder={t("login.password")} value={password} onChange={setPassword} />
          <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-primary" /> {t("login.rememberMe")}</label>
          <Link to="/forgot-password" className="font-medium text-primary hover:underline">{t("login.forgotPassword")}</Link>
        </div>
        {err && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
        <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-3 font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95 disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} {t("login.signIn")}
        </button>
        <div className="relative my-2 flex items-center"><div className="h-px flex-1 bg-border" /><span className="px-3 text-xs text-muted-foreground">{t("login.or")}</span><div className="h-px flex-1 bg-border" /></div>
        <button type="button" onClick={googleLogin} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-3 text-sm font-semibold hover:bg-accent disabled:opacity-60">
          <GoogleG /> {t("login.continueGoogle")} <span className="capitalize text-primary">{ROLES.find(r => r.value === role)?.label}</span>
        </button>
        <p className="text-center text-sm text-muted-foreground">
          {t("login.noAccount")} <Link to="/register" className="font-semibold text-primary hover:underline">{t("login.createAccount")}</Link>
        </p>
      </form>
    </AuthShell>
  );
}

type FieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  icon?: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
};
export function Field({ icon, onChange, value, ...rest }: FieldProps) {
  return (
    <label className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 transition focus-within:border-primary focus-within:shadow-glow">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </label>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 7.1 29.3 5 24 5 16.3 5 9.7 9.5 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.6-3.4-11.3-8l-6.5 5C9.6 39.5 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C40 35.7 44 30.4 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}
