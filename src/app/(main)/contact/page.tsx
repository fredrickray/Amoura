"use client";

import { useState } from "react";
import { AuthInput, AuthSubmit } from "@/components/auth/AuthForm";
import { Reveal } from "@/components/Reveal";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="px-5 pb-24 pt-10 md:px-8 md:pt-16">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <p className="badge mb-4">Contact</p>
          <h1 className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
            Talk to the atelier
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Fragrance notes, magazine briefs, shipping questions, or lash
            bookings — send a message and we&apos;ll reply within one business
            day.
          </p>

          <div className="mt-10 flex flex-col gap-5 text-[15px]">
            <div>
              <p className="text-sm font-medium text-ink-muted">Email</p>
              <a
                href="mailto:hello@amoura.studio"
                className="mt-1 inline-block text-ink underline-offset-4 hover:underline"
              >
                hello@amoura.studio
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-ink-muted">Studio hours</p>
              <p className="mt-1 text-ink-soft">
                Mon–Sat, 10:00–18:00 WAT
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-ink-muted">Catalogues</p>
              <p className="mt-1 text-ink-soft">
                Perfumes · Custom magazines · Lash studio
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[24px] border border-line bg-surface p-6 md:p-8">
            {sent ? (
              <div className="flex min-h-[280px] flex-col justify-center text-center">
                <p className="font-display text-3xl tracking-tight">Message sent</p>
                <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                  Thank you — we&apos;ve received your note and will get back to
                  you shortly.
                </p>
                <button
                  type="button"
                  className="mt-8 text-sm font-medium text-ink underline-offset-4 hover:underline"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <AuthInput id="name" label="Full name" placeholder="Your name" required />
                  <AuthInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <label className="flex flex-col gap-2" htmlFor="topic">
                  <span className="text-sm font-medium text-ink">Topic</span>
                  <select
                    id="topic"
                    name="topic"
                    required
                    className="h-12 rounded-full border border-line bg-surface px-5 text-[15px] outline-none focus:border-ink/40"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option value="perfume">Perfumes</option>
                    <option value="magazine">Custom magazines</option>
                    <option value="lashes">Lash booking</option>
                    <option value="order">Order & shipping</option>
                    <option value="other">Something else</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2" htmlFor="message">
                  <span className="text-sm font-medium text-ink">Message</span>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="How can we help?"
                    className="resize-none rounded-[20px] border border-line bg-surface px-5 py-3.5 text-[15px] outline-none transition-[border-color,box-shadow] focus:border-ink/40 focus:shadow-[0_0_0_4px_rgba(17,17,17,0.06)]"
                  />
                </label>
                <AuthSubmit>Send message</AuthSubmit>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
