"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, user, router, pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-ink-soft">
        Loading your account…
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, ready, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/login?next=/admin");
      return;
    }
    if (!isAdmin) {
      router.replace("/account");
    }
  }, [ready, user, isAdmin, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f1ef] text-sm text-ink-soft">
        Checking studio access…
      </div>
    );
  }

  if (!user || !isAdmin) return null;
  return <>{children}</>;
}
