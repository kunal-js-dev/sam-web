import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { CheckCircle2, Loader2, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { AuthShell } from "@/components/site/AuthShell";
import { Field } from "./login";
import { useT } from "@/lib/language-context";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPage,
  head: () => ({ meta: [{ title: "Reset password — SAM Foods" }] }),
});

type Step = "email" | "otp" | "reset" | "done";

function ForgotPage() {
  const t = useT();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const navigate = useNavigate();

  const sendOtp = async () => {
    setErr(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr(t("forgot.err.email"));
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setStep("otp");
  };

  const verify = async () => {
    if (otp.some((d) => !d)) return setErr(t("forgot.err.otp"));
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setStep("reset");
  };

  const reset = async () => {
    setErr(null);
    if (pw.length < 6) return setErr(t("forgot.err.password"));
    if (pw !== cpw) return setErr(t("forgot.err.match"));
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep("done");
  };

  const setOtpDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    if (d && i < 3) refs[i + 1].current?.focus();
  };

  return (
    <AuthShell title={t("forgot.title")} subtitle={t("forgot.subtitle")}>
      {step === "email" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <Field icon={<Mail className="h-4 w-4" />} type="email" placeholder={t("forgot.email")} value={email} onChange={setEmail} />
          {err && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
          <button onClick={sendOtp} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-3 font-semibold text-primary-foreground shadow-elegant disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} {t("forgot.sendOtp")}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            {t("forgot.remembered")} <Link to="/login" className="font-semibold text-primary hover:underline">{t("forgot.signIn")}</Link>
          </p>
        </motion.div>
      )}

      {step === "otp" && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <p className="text-sm text-muted-foreground">
            {t("forgot.otpSent")} <b className="text-foreground">{email}</b>. {t("forgot.otpHint")} <span className="font-mono">1234</span>)
          </p>
          <div className="flex justify-center gap-3">
            {otp.map((d, i) => (
              <input key={i} ref={refs[i]} value={d} onChange={(e) => setOtpDigit(i, e.target.value)}
                inputMode="numeric" maxLength={1}
                className="h-16 w-14 rounded-2xl border border-border bg-card text-center text-3xl font-bold outline-none transition focus:border-primary focus:shadow-glow" />
            ))}
          </div>
          {err && <p className="text-center text-sm text-destructive">{err}</p>}
          <button onClick={verify} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-3 font-semibold text-primary-foreground shadow-elegant disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} {t("forgot.verify")}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            {t("forgot.didntGet")} <button onClick={sendOtp} className="font-semibold text-primary hover:underline">{t("forgot.resend")}</button>
          </p>
        </motion.div>
      )}

      {step === "reset" && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <Field icon={<Lock className="h-4 w-4" />} type="password" placeholder={t("forgot.newPassword")} value={pw} onChange={setPw} />
          <Field icon={<Lock className="h-4 w-4" />} type="password" placeholder={t("forgot.confirmPassword")} value={cpw} onChange={setCpw} />
          {err && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
          <button onClick={reset} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-3 font-semibold text-primary-foreground shadow-elegant disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} {t("forgot.resetPassword")}
          </button>
        </motion.div>
      )}

      {step === "done" && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
          <h2 className="font-[Fraunces] text-2xl font-bold">{t("forgot.allSet")}</h2>
          <p className="text-muted-foreground">{t("forgot.updated")}</p>
          <button onClick={() => navigate({ to: "/login" })} className="w-full rounded-full gradient-primary py-3 font-semibold text-primary-foreground shadow-elegant">
            {t("forgot.backToSignIn")}
          </button>
        </motion.div>
      )}
    </AuthShell>
  );
}
