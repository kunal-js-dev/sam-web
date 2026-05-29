import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, UtensilsCrossed, X } from "lucide-react";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth-context";

const SESSION_KEY = "sam_welcome_seen";

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 7.1 29.3 5 24 5 16.3 5 9.7 9.5 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.6-3.4-11.3-8l-6.5 5C9.6 39.5 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C40 35.7 44 30.4 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

export function WelcomeModal() {
  const { user, loading } = useAuth();
  const [visible, setVisible] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    // Already signed in — never show
    if (user) return;
    // Already dismissed this session — never show again
    const seen = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);
    if (seen) return;
    // Delay slightly so the page renders first
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, [loading, user]);

  const dismiss = (asGuest: boolean) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "1");
      if (asGuest) localStorage.setItem("sam_guest_mode", "1");
    }
    setVisible(false);
  };

  const handleGoogle = async () => {
    setErr(null);
    setGoogleLoading(true);
    try {
      if (typeof window !== "undefined")
        window.localStorage.setItem("sam_pending_role", "customer");
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/login",
        extraParams: { prompt: "select_account" },
      });
      if (result.redirected) return;
      if (result.error) {
        setGoogleLoading(false);
        setErr(result.error.message || "Google sign-in failed. Please try again.");
      }
    } catch (e) {
      setGoogleLoading(false);
      setErr(e instanceof Error ? e.message : "Google sign-in failed.");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="welcome-overlay"
          aria-modal="true"
          role="dialog"
          aria-label="Welcome to SAM Foods"
        >
          {/* Blurred backdrop */}
          <div className="welcome-backdrop" onClick={() => dismiss(true)} />

          <motion.div
            key="welcome-card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="welcome-card"
          >
            {/* Close / guest shortcut */}
            <button
              onClick={() => dismiss(true)}
              className="welcome-close"
              aria-label="Continue as Guest"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Brand header */}
            <div className="welcome-brand">
              <div className="welcome-logo">
                <UtensilsCrossed className="h-7 w-7 text-white" />
              </div>
              <div className="welcome-veg-badge">🟢 100% Pure Veg</div>
            </div>

            <h1 className="welcome-title">Welcome to SAM Foods</h1>
            <p className="welcome-subtitle">
              Sign in to track your orders, save favourites, and enjoy a personalised experience.
            </p>

            {/* Tamil tagline */}
            <p className="welcome-tamil">
              உங்களை வரவேற்கிறோம் 🙏
            </p>

            <div className="welcome-divider" />

            {/* Google sign in */}
            <button
              id="welcome-google-btn"
              onClick={handleGoogle}
              disabled={googleLoading}
              className="welcome-google-btn"
            >
              {googleLoading
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : <GoogleG />
              }
              <span>
                {googleLoading ? "Redirecting to Google…" : "Continue with Google"}
              </span>
            </button>

            {err && (
              <p className="welcome-error">{err}</p>
            )}

            {/* OR separator */}
            <div className="welcome-or">
              <div className="welcome-or-line" />
              <span>or</span>
              <div className="welcome-or-line" />
            </div>

            {/* Guest option */}
            <button
              id="welcome-guest-btn"
              onClick={() => dismiss(true)}
              className="welcome-guest-btn"
            >
              Browse as Guest
            </button>

            <p className="welcome-hint">
              You can always sign in later from the menu.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
