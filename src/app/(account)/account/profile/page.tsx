"use client";

import { useState } from "react";
import { customer } from "@/data/account";
import { AuthInput, AuthSubmit } from "@/components/auth/AuthForm";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const initials = `${customer.firstName[0]}${customer.lastName[0]}`;

  return (
    <div>
      <div className="mb-8 overflow-hidden rounded-[28px] border border-line/70 bg-surface/80 p-6 shadow-[0_24px_60px_-40px_rgba(17,17,17,0.4)] md:p-8">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#e8d4d7] to-[#c9a3a8] font-display text-2xl text-ink">
            {initials}
          </div>
          <div>
            <p className="badge mb-2">Profile</p>
            <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
              {customer.firstName} {customer.lastName}
            </h1>
            <p className="mt-1 text-[15px] text-ink-soft">
              Member since {customer.memberSince}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-xl rounded-[24px] border border-line/80 bg-surface/90 p-5 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)] md:p-8">
        {saved ? (
          <p className="mb-5 rounded-[14px] bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Profile updated successfully.
          </p>
        ) : null}

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthInput
              id="firstName"
              label="First name"
              placeholder={customer.firstName}
              defaultValue={customer.firstName}
              required
            />
            <AuthInput
              id="lastName"
              label="Last name"
              placeholder={customer.lastName}
              defaultValue={customer.lastName}
              required
            />
          </div>
          <AuthInput
            id="email"
            label="Email"
            type="email"
            defaultValue={customer.email}
            required
          />
          <AuthInput
            id="phone"
            label="Phone"
            type="tel"
            defaultValue={customer.phone}
          />
          <AuthInput
            id="password"
            label="New password"
            type="password"
            placeholder="Leave blank to keep current"
            autoComplete="new-password"
          />

          <label className="mt-1 flex cursor-pointer items-start gap-2.5 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="marketing"
              defaultChecked
              className="mt-0.5 size-4 rounded border-line accent-ink"
            />
            Email me about new scents, magazine drops, and studio openings.
          </label>

          <AuthSubmit>Save changes</AuthSubmit>
        </form>
      </div>
    </div>
  );
}
