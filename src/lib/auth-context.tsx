import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Role = "customer" | "admin" | "delivery";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: Role) => Promise<User>;
  register: (data: Omit<User, "id"> & { password: string }) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const KEY = "sam_user";
const ROLE_KEY = "sam_pending_role";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);

    // Sync with Supabase auth session (real Google OAuth)
    const buildUserFromSession = (session: { user: { id: string; email?: string | null; user_metadata?: Record<string, unknown> } } | null) => {
      if (!session?.user) return null;
      const meta = (session.user.user_metadata ?? {}) as Record<string, string | undefined>;
      const email = session.user.email ?? "";
      const role = ((typeof window !== "undefined" && (window.localStorage.getItem(ROLE_KEY) as Role)) || "customer") as Role;
      const name = meta.full_name || meta.name || (email ? email.split("@")[0] : "Guest");
      const u: User = { id: session.user.id, name, email, role };
      return u;
    };

    supabase.auth.getSession().then(({ data }) => {
      const u = buildUserFromSession(data.session);
      if (u) persist(u);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = buildUserFromSession(session);
      if (u) persist(u);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window === "undefined") return;
    if (u) window.localStorage.setItem(KEY, JSON.stringify(u));
    else window.localStorage.removeItem(KEY);
  };

  const login: AuthContextValue["login"] = async (email, _password, role = "customer") => {
    await new Promise((r) => setTimeout(r, 600));
    const u: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role,
    };
    persist(u);
    return u;
  };

  const register: AuthContextValue["register"] = async (data) => {
    await new Promise((r) => setTimeout(r, 700));
    const u: User = { id: crypto.randomUUID(), name: data.name, email: data.email, phone: data.phone, role: data.role };
    persist(u);
    return u;
  };

  const logout = async () => {
    try { await supabase.auth.signOut(); } catch {}
    persist(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
