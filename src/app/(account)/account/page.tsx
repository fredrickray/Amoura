"use client";

import Image from "next/image";
import Link from "next/link";
import {
  appointmentStatusLabel,
  appointments,
  magazineStatusLabel,
  orderStatusLabel,
} from "@/data/account";
import {
  StatusPill,
  appointmentTone,
  magazineTone,
  orderTone,
} from "@/components/account/StatusPill";
import { PillButton } from "@/components/PillButton";
import { useAccountData } from "@/context/AccountDataContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";

const quickActions = [
  {
    href: "/store",
    label: "Shop products",
    hint: "Perfumes & more",
    image: "/products/lum-parfum.png",
  },
  {
    href: "/lashes",
    label: "Book lashes",
    hint: "Studio sets",
    image: "/methods/soft-volume.png",
  },
  {
    href: "/account/magazines",
    label: "Magazine projects",
    hint: "Proofs & drafts",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
  },
];

export default function AccountHomePage() {
  const { user } = useAuth();
  const { orders, magazines, ready } = useAccountData();
  const latestOrder = orders[0];
  const nextAppointment = appointments.find((a) => a.status === "upcoming");
  const activeMagazine = magazines.find((p) => p.status !== "printed");
  const firstName = user?.firstName ?? "there";

  if (!ready) {
    return <p className="text-sm text-ink-soft">Loading account…</p>;
  }

  return (
    <div>
      <section className="relative mb-8 overflow-hidden rounded-[28px] border border-line/70 bg-surface/80 p-6 shadow-[0_24px_60px_-40px_rgba(17,17,17,0.4)] md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[#e8d4d7]/70 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/3 size-56 rounded-full bg-[#c9a3a8]/25 blur-3xl"
        />
        <p className="badge mb-3">Account</p>
        <h1 className="relative max-w-xl font-display text-[clamp(2.1rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
          Welcome back, {firstName}
        </h1>
        <p className="relative mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
          Your atelier desk — orders in motion, lash bookings ahead, and a few
          shortcuts to keep shopping.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <PillButton href="/account/orders" variant="solid" arrow={false}>
            Track orders
          </PillButton>
          <PillButton href="/lashes" variant="ghost" arrow={false}>
            Book lashes
          </PillButton>
        </div>
      </section>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group relative overflow-hidden rounded-[22px] border border-line/80 bg-surface p-4 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-strong)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(17,17,17,0.35)]"
          >
            <div className="relative z-[1]">
              <p className="font-medium text-ink">{action.label}</p>
              <p className="mt-1 text-sm text-ink-soft">{action.hint}</p>
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-3 size-24 opacity-40 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60">
              <Image
                src={action.image}
                alt=""
                fill
                className="object-contain"
                sizes="96px"
                unoptimized={action.image.startsWith("/")}
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="overflow-hidden rounded-[24px] border border-line/80 bg-surface/90 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)]">
          <div className="flex items-center justify-between gap-3 border-b border-line/70 px-5 py-4 md:px-6">
            <h2 className="font-display text-2xl tracking-tight">Latest order</h2>
            <Link
              href="/account/orders"
              className="text-sm font-medium text-ink-soft hover:text-ink"
            >
              View all
            </Link>
          </div>

          {latestOrder ? (
            <Link
              href={`/account/orders/${latestOrder.id}`}
              className="block p-5 transition-colors hover:bg-[#faf6f6] md:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{latestOrder.id}</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Placed {latestOrder.placedAt}
                  </p>
                </div>
                <StatusPill tone={orderTone(latestOrder.status)}>
                  {orderStatusLabel[latestOrder.status]}
                </StatusPill>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div className="relative size-20 overflow-hidden rounded-2xl bg-gradient-to-b from-[#f0e6e8] to-[#e4d5d8]">
                  <Image
                    src={latestOrder.items[0].image}
                    alt=""
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                unoptimized={
                  latestOrder.items[0].image.startsWith("/") ||
                  latestOrder.items[0].image.startsWith("blob:")
                }
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {latestOrder.items.map((i) => i.name).join(", ")}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {formatPrice(latestOrder.total)}
                  </p>
                  {latestOrder.tracking ? (
                    <p className="mt-2 text-xs text-ink-muted">
                      Tracking {latestOrder.tracking}
                    </p>
                  ) : null}
                </div>
              </div>
            </Link>
          ) : (
            <EmptyCard
              text="No orders yet."
              href="/store"
              cta="Browse the store"
            />
          )}
        </section>

        <section className="overflow-hidden rounded-[24px] border border-line/80 bg-surface/90 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)]">
          <div className="flex items-center justify-between gap-3 border-b border-line/70 px-5 py-4 md:px-6">
            <h2 className="font-display text-2xl tracking-tight">
              Next appointment
            </h2>
            <Link
              href="/account/appointments"
              className="text-sm font-medium text-ink-soft hover:text-ink"
            >
              View all
            </Link>
          </div>

          {nextAppointment ? (
            <Link
              href={`/account/appointments/${nextAppointment.id}`}
              className="block p-5 transition-colors hover:bg-[#faf6f6] md:p-6"
            >
              <div className="flex gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-surface-soft">
                  <Image
                    src={nextAppointment.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                    unoptimized={nextAppointment.image.startsWith("/")}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-ink">
                      {nextAppointment.service}
                    </p>
                    <StatusPill tone={appointmentTone(nextAppointment.status)}>
                      {appointmentStatusLabel[nextAppointment.status]}
                    </StatusPill>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">
                    {nextAppointment.date} · {nextAppointment.time}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    With {nextAppointment.artist} · {nextAppointment.duration}
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            <EmptyCard
              text="No upcoming lash bookings."
              href="/lashes"
              cta="Book a set"
            />
          )}
        </section>
      </div>

      {activeMagazine ? (
        <section className="mt-6 overflow-hidden rounded-[24px] border border-line/80 bg-surface/90 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)]">
          <div className="flex items-center justify-between gap-3 border-b border-line/70 px-5 py-4 md:px-6">
            <h2 className="font-display text-2xl tracking-tight">
              Magazine in progress
            </h2>
            <Link
              href="/account/magazines"
              className="text-sm font-medium text-ink-soft hover:text-ink"
            >
              View all
            </Link>
          </div>
          <Link
            href={`/account/magazines/${activeMagazine.id}`}
            className="flex flex-col gap-4 p-5 transition-colors hover:bg-[#faf6f6] sm:flex-row sm:items-center md:p-6"
          >
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-surface-soft sm:h-24 sm:w-36">
              <Image
                src={activeMagazine.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="144px"
                unoptimized={
                  activeMagazine.coverImage.startsWith("/") ||
                  activeMagazine.coverImage.startsWith("blob:")
                }
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="font-medium text-ink">{activeMagazine.title}</p>
                <StatusPill tone={magazineTone(activeMagazine.status)}>
                  {magazineStatusLabel[activeMagazine.status]}
                </StatusPill>
              </div>
              <p className="mt-2 text-sm text-ink-soft">
                {activeMagazine.theme} · {activeMagazine.pages} pages
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {activeMagazine.status === "in_review"
                  ? "Proof ready — review and approve to print"
                  : `Updated ${activeMagazine.updatedAt}`}
              </p>
            </div>
          </Link>
        </section>
      ) : null}
    </div>
  );
}

function EmptyCard({
  text,
  href,
  cta,
}: {
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="text-sm text-ink-soft">{text}</p>
      <div className="mt-4 flex justify-center">
        <PillButton href={href} variant="solid" arrow={false}>
          {cta}
        </PillButton>
      </div>
    </div>
  );
}
