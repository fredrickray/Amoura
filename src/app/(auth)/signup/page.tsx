"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  AuthDivider,
  AuthInput,
  AuthSocialButtons,
  AuthSubmit,
} from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { getAuthErrorMessage, useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    try {
      await register({
        firstName: String(form.get("firstName") || "").trim(),
        lastName: String(form.get("lastName") || "").trim(),
        email: String(form.get("email") || "").trim(),
        password: String(form.get("password") || ""),
      });
      router.push("/account");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Amoura for perfumes, custom magazines, and lash studio bookings."
      imageSrc="/products/hydra-balm.png"
      imageAlt="Beauty atelier atmosphere"
      imageCaption="Start with a scent, a story, or a set — your beauty ritual begins here."
    >
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            id="firstName"
            label="First name"
            placeholder="Ada"
            autoComplete="given-name"
            required
          />
          <AuthInput
            id="lastName"
            label="Last name"
            placeholder="Okoye"
            autoComplete="family-name"
            required
          />
        </div>

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
            placeholder="At least 8 characters"
            autoComplete="new-password"
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

        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-sm leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 size-4 shrink-0 rounded border-line accent-ink"
          />
          <span>
            I agree to the{" "}
            <Link href="/support" className="text-ink underline-offset-2 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/support" className="text-ink underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <AuthSubmit disabled={pending}>
          {pending ? "Creating account…" : "Create account"}
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-ink underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
