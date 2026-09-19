"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthInput, AuthSubmit } from "@/components/auth/AuthForm";
import { AuthCard } from "@/components/auth/AuthShell";

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <AuthCard
      title="Set a new password"
      subtitle="Choose a strong password you haven’t used with Amoura before."
    >
      {done ? (
        <div className="flex flex-col gap-4">
          <p className="text-[15px] leading-relaxed text-ink-soft">
            Your password has been updated. You can now sign in with your new
            credentials.
          </p>
          <Link
            href="/login"
            className="pill pill-solid w-full cursor-hover justify-center py-3.5 text-[15px]"
          >
            <span>Continue to sign in</span>
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
            setDone(true);
          }}
        >
          <div className="relative">
            <AuthInput
              id="password"
              label="New password"
              type={show ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-[42px] text-sm text-ink-soft hover:text-ink"
              onClick={() => setShow((v) => !v)}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          <AuthInput
            id="confirmPassword"
            label="Confirm password"
            type={show ? "text" : "password"}
            placeholder="Re-enter password"
            autoComplete="new-password"
            required
          />
          <AuthSubmit>Update password</AuthSubmit>
        </form>
      )}
    </AuthCard>
  );
}
