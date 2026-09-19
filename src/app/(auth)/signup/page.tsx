"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AuthDivider,
  AuthInput,
  AuthSocialButtons,
  AuthSubmit,
} from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Amoura for perfumes, custom magazines, and lash studio bookings."
      imageSrc="/products/hydra-balm.png"
      imageAlt="Beauty atelier atmosphere"
      imageCaption="Start with a scent, a story, or a set — your beauty ritual begins here."
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/account");
        }}
      >
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

        <AuthSubmit>Create account</AuthSubmit>
      </form>

      <div className="mt-6 flex flex-col gap-4">
        <AuthDivider />
        <AuthSocialButtons onContinue={() => router.push("/account")} />
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
