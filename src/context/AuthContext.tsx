"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ApiError,
  fetchMe,
  login as apiLogin,
  register as apiRegister,
  type ApiUser,
} from "@/lib/api";

const TOKEN_KEY = "amoura-access-token";

type AuthContextValue = {
  user: ApiUser | null;
  token: string | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<ApiUser>;
  register: (input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<ApiUser>;
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const applySession = useCallback((accessToken: string, nextUser: ApiUser) => {
    setToken(accessToken);
    setUser(nextUser);
    localStorage.setItem(TOKEN_KEY, accessToken);
  }, []);

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const saved = localStorage.getItem(TOKEN_KEY);
      if (!saved) {
        if (!cancelled) setReady(true);
        return;
      }
      try {
        const me = await fetchMe(saved);
        if (!cancelled) applySession(saved, me);
      } catch {
        if (!cancelled) clearSession();
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [applySession, clearSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await apiLogin({ email, password });
      applySession(res.accessToken, res.user);
      return res.user;
    },
    [applySession],
  );

  const register = useCallback(
    async (input: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      const res = await apiRegister(input);
      applySession(res.accessToken, res.user);
      return res.user;
    },
    [applySession],
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      ready,
      login,
      register,
      logout,
      isAdmin: user?.role === "ADMIN",
    }),
    [user, token, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function getAuthErrorMessage(err: unknown) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Something went wrong. Try again.";
}
