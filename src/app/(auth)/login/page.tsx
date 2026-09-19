"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AuthDivider,
  AuthInput,
  AuthSocialButtons,
  AuthSubmit,
} from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue shopping, booking lashes, or managing your magazine orders."
      imageSrc="/products/lum-parfum.png"
      imageAlt="Amoura perfume bottle"
      imageCaption="Your atelier of scent, story, and lashes — waiting for you."
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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

        <AuthSubmit>Sign in</AuthSubmit>
      </form>

      <div className="mt-6 flex flex-col gap-4">
        <AuthDivider />
        <AuthSocialButtons />
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
