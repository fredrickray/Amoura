"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthInput, AuthSubmit } from "@/components/auth/AuthForm";
import { AuthCard } from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <AuthCard
      title="Forgot password?"
      subtitle="Enter the email linked to your Amoura account and we’ll send a reset link."
    >
      {sent ? (
        <div className="flex flex-col gap-4">
          <p className="text-[15px] leading-relaxed text-ink-soft">
            If an account exists for that email, you’ll receive a reset link shortly.
            Check your inbox and spam folder.
          </p>
          <Link
            href="/login"
            className="pill pill-solid w-full cursor-hover justify-center py-3.5 text-[15px]"
          >
            <span>Back to sign in</span>
            <span
              aria-hidden
              className="inline-flex size-5 items-center justify-center rounded-full bg-white/15 text-[11px]"
            >
              →
            </span>
          </Link>
        </div>
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
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
          <AuthSubmit>Send reset link</AuthSubmit>
          <p className="text-center text-sm text-ink-soft">
            Remembered it?{" "}
            <Link
              href="/login"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      )}
    </AuthCard>
  );
}
