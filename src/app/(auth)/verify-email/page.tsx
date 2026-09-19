"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthSubmit } from "@/components/auth/AuthForm";
import { AuthCard } from "@/components/auth/AuthShell";

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);

  return (
    <AuthCard
      title="Verify your email"
      subtitle="We sent a verification link to your inbox. Open it to activate your Amoura account."
    >
      <div className="flex flex-col gap-5">
        <div className="rounded-[18px] bg-surface-soft px-4 py-4 text-[15px] leading-relaxed text-ink-soft">
          Didn’t get the email? Check spam, or resend a new link below. The link
          expires in 24 hours.
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setResent(true);
          }}
        >
          <AuthSubmit>{resent ? "Link resent" : "Resend verification email"}</AuthSubmit>
        </form>

        {resent ? (
          <p className="text-center text-sm text-ink-soft">
            Another email is on the way. Please wait a minute before requesting
            again.
          </p>
        ) : null}

        <p className="text-center text-sm text-ink-soft">
          Wrong email?{" "}
          <Link
            href="/signup"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            Create a new account
          </Link>
          {" · "}
          <Link
            href="/login"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
