import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { AuthShell } from "@/components/site/AuthShell";
import { useAuth, type Role } from "@/lib/auth-context";
import { Field } from "./login";
import { useT } from "@/lib/language-context";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "Create account — SAM Foods" }] }),
});

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const t = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [role, setRole] = useState<Role>("customer");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ROLES: { value: Role; label: string }[] = [
    { value: "customer", label: t("login.role.customer") },
    { value: "admin",    label: t("login.role.admin") },
    { value: "delivery", label: t("login.role.delivery") },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (name.trim().length < 2) return setErr(t("register.err.name"));
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr(t("register.err.email"));
    if (!/^\+?[0-9\s-]{8,15}$/.test(phone)) return setErr(t("register.err.phone"));
    if (pw.length < 6) return setErr(t("register.err.password"));
    if (pw !== cpw) return setErr(t("register.err.match"));
    if (!agree) return setErr(t("register.err.terms"));
    setLoading(true);
    const u = await register({ name, email, phone, password: pw, role });
    setLoading(false);
    navigate({ to: u.role === "admin" ? "/admin" : u.role === "delivery" ? "/delivery" : "/" });
  };

  return (
    <AuthShell title={t("register.title")} subtitle={t("register.subtitle")}>
      <form onSubmit={submit} className="space-y-4">
        <Field icon={<User className="h-4 w-4" />} placeholder={t("register.fullName")} value={name} onChange={setName} />
        <Field icon={<Mail className="h-4 w-4" />} type="email" placeholder={t("register.email")} value={email} onChange={setEmail} />
        <Field icon={<Phone className="h-4 w-4" />} placeholder={t("register.phone")} value={phone} onChange={setPhone} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field icon={<Lock className="h-4 w-4" />} type="password" placeholder={t("register.password")} value={pw} onChange={setPw} />
          <Field icon={<Lock className="h-4 w-4" />} type="password" placeholder={t("register.confirmPassword")} value={cpw} onChange={setCpw} />
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("register.signUpAs")}</div>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => (
              <button key={r.value} type="button" onClick={() => setRole(r.value)} className={`rounded-2xl border px-3 py-3 text-sm font-semibold capitalize transition ${role === r.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:bg-accent"}`}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 accent-primary" />
          <span>
            {t("register.agreeTerms")}{" "}
            <a className="text-primary hover:underline" href="#">{t("register.terms")}</a>{" "}
            {t("register.and")}{" "}
            <a className="text-primary hover:underline" href="#">{t("register.privacy")}</a>.
          </span>
        </label>
        {err && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
        <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-3 font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95 disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} {t("register.createAccount")}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          {t("register.alreadyHave")} <Link to="/login" className="font-semibold text-primary hover:underline">{t("register.signIn")}</Link>
        </p>
      </form>
    </AuthShell>
  );
}
