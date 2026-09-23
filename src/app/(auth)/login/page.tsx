"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import {
  AuthDivider,
  AuthInput,
  AuthSocialButtons,
  AuthSubmit,
} from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { getAuthErrorMessage, useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    try {
      const user = await login(email, password);
      const next = searchParams.get("next");
      if (next) router.push(next);
      else if (user.role === "ADMIN") router.push("/admin");
      else router.push("/account");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue shopping, booking lashes, or managing your magazine orders."
      imageSrc="/products/lum-parfum.png"
      imageAlt="Amoura perfume bottle"
      imageCaption="Your atelier of scent, story, and lashes — waiting for you."
    >
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <AuthInput
          id="email"
          label="Email"
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          required
        />

        <div className="relative">
          <AuthInput
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="absolute right-4 top-[42px] text-sm text-ink-soft hover:text-ink"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        ) : null}

        <div className="flex items-center justify-between pt-1 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-ink-soft">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded border-line accent-ink"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <AuthSubmit disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </AuthSubmit>
      </form>

      <div className="mt-6 flex flex-col gap-4">
        <AuthDivider />
        <AuthSocialButtons />
        <p className="text-center text-xs text-ink-muted">
          Social sign-in coming soon — use email for now.
        </p>
      </div>

      <p className="mt-8 text-center text-sm text-ink-soft">
        New to Amoura?{" "}
        <Link
          href="/signup"
          className="font-medium text-ink underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-ink-soft">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
