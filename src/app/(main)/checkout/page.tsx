"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { customer } from "@/data/account";
import { cn, formatPrice } from "@/lib/utils";

type Step = 1 | 2 | 3;

const steps = [
  { id: 1 as const, label: "Delivery" },
  { id: 2 as const, label: "Payment" },
  { id: 3 as const, label: "Review" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, count, subtotal, clear } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState<"card" | "transfer" | "new">("card");
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    name: `${customer.firstName} ${customer.lastName}`,
    line1: "14 Admiralty Way",
    line2: "Lekki Phase 1",
    city: "Lagos",
    country: "Nigeria",
    phone: customer.phone,
  });

  const shippingFee = delivery === "express" ? 4500 : 0;
  const total = subtotal + shippingFee;

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(address.name && address.line1 && address.city);
    if (step === 2) return payment === "card" || payment === "transfer" || payment === "new";
    return true;
  }, [step, address, payment]);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f5f5f5] px-5 text-center">
        <p className="font-display text-3xl tracking-tight">Nothing to checkout</p>
        <p className="mt-2 text-sm text-ink-soft">Your cart is empty.</p>
        <Link
          href="/store"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white"
        >
          Shop the store
        </Link>
      </div>
    );
  }

  function placeOrder() {
    clear();
    router.push("/account/orders");
  }

  return (
    <div className="min-h-[70vh] bg-[#f5f5f5] pb-36 md:pb-16">
      <div className="sticky top-[72px] z-40 border-b border-line/80 bg-[#f5f5f5]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[960px] items-center justify-between px-4 md:px-8">
          <button
            type="button"
            onClick={() => {
              if (step > 1) setStep((s) => (s - 1) as Step);
              else router.push("/cart");
            }}
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full hover:bg-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 6 9 12l6 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-[17px] font-semibold tracking-tight">Checkout</h1>
          <span className="size-10" aria-hidden />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 pt-5 md:px-8 md:pt-8">
        {/* Progress: Delivery → Payment → Review */}
        <nav aria-label="Checkout progress" className="mb-8">
          <ol className="mx-auto flex max-w-md items-start justify-between">
            {steps.map((s, i) => {
              const active = step === s.id;
              const done = step > s.id;
              return (
                <li key={s.id} className="relative flex flex-1 flex-col items-center">
                  {i < steps.length - 1 ? (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-[calc(50%+18px)] right-[calc(-50%+18px)] top-4 h-px",
                        step > s.id ? "bg-ink" : "bg-[#e0e0e0]",
                      )}
                    />
                  ) : null}
                  <button
                    type="button"
                    disabled={!done && !active}
                    onClick={() => done && setStep(s.id)}
                    className="relative z-[1] flex flex-col items-center gap-2"
                  >
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                        active || done
                          ? "bg-ink text-white"
                          : "bg-[#e5e5e5] text-ink-muted",
                      )}
                    >
                      {done ? "✓" : s.id}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium sm:text-sm",
                        active || done ? "text-ink" : "text-ink-muted",
                      )}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div className="flex flex-col gap-4">
            {/* Step 1 — Delivery */}
            {(step === 1 || step === 3) && (
              <>
                <section className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)] md:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-[17px] font-semibold">Shipping address</h2>
                    {step === 1 ? (
                      <button
                        type="button"
                        onClick={() => setEditingAddress((v) => !v)}
                        className="text-sm font-semibold text-blush-deep"
                      >
                        {editingAddress ? "Done" : "Change"}
                      </button>
                    ) : null}
                  </div>

                  {editingAddress && step === 1 ? (
                    <div className="grid gap-3">
                      {(
                        [
                          ["name", "Full name"],
                          ["line1", "Address line"],
                          ["line2", "Area / landmark"],
                          ["city", "City"],
                          ["country", "Country"],
                          ["phone", "Phone"],
                        ] as const
                      ).map(([key, label]) => (
                        <label key={key} className="block text-sm">
                          <span className="mb-1.5 block text-ink-soft">{label}</span>
                          <input
                            value={address[key]}
                            onChange={(e) =>
                              setAddress((a) => ({ ...a, [key]: e.target.value }))
                            }
                            className="h-12 w-full rounded-2xl border border-line bg-[#fafafa] px-4 outline-none focus:border-ink/30"
                          />
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[15px] leading-relaxed text-ink-soft">
                      <p className="font-semibold text-ink">{address.name}</p>
                      <p>{address.line1}</p>
                      {address.line2 ? <p>{address.line2}</p> : null}
                      <p>
                        {address.city}, {address.country}
                      </p>
                      <p className="mt-1">{address.phone}</p>
                    </div>
                  )}
                </section>

                <section className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)] md:p-6">
                  <h2 className="mb-4 text-[17px] font-semibold">Delivery method</h2>
                  <div className="flex flex-col gap-3">
                    <DeliveryOption
                      selected={delivery === "standard"}
                      onSelect={() => setDelivery("standard")}
                      title="Standard delivery"
                      detail="3–5 business days"
                      price="Free"
                      disabled={step === 3}
                    />
                    <DeliveryOption
                      selected={delivery === "express"}
                      onSelect={() => setDelivery("express")}
                      title="Express delivery"
                      detail="1–2 business days"
                      price={formatPrice(4500)}
                      disabled={step === 3}
                    />
                  </div>
                </section>
              </>
            )}

            {/* Step 2 — Payment */}
            {(step === 2 || step === 3) && (
              <section className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)] md:p-6">
                <h2 className="mb-4 text-[17px] font-semibold">Payment method</h2>
                <div className="flex flex-col gap-3">
                  <PaymentOption
                    selected={payment === "card"}
                    onSelect={() => setPayment("card")}
                    disabled={step === 3}
                    icon={<CardIcon />}
                    title="Visa ···· 4242"
                    detail="Expires 08/28"
                  />
                  <PaymentOption
                    selected={payment === "transfer"}
                    onSelect={() => setPayment("transfer")}
                    disabled={step === 3}
                    icon={<BankIcon />}
                    title="Bank transfer"
                    detail="Pay before shipping"
                  />
                  {step !== 3 ? (
                    <button
                      type="button"
                      onClick={() => setPayment("new")}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors",
                        payment === "new"
                          ? "border-ink bg-[#fafafa]"
                          : "border-line hover:border-ink/30",
                      )}
                    >
                      <span className="flex size-10 items-center justify-center rounded-xl bg-[#f0f0f0]">
                        +
                      </span>
                      <span className="text-[15px] font-medium">Add new card</span>
                    </button>
                  ) : null}
                </div>

                {payment === "new" && step === 2 ? (
                  <div className="mt-4 grid gap-3 border-t border-line pt-4">
                    <input
                      placeholder="Card number"
                      className="h-12 rounded-2xl border border-line bg-[#fafafa] px-4 text-sm outline-none focus:border-ink/30"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="MM / YY"
                        className="h-12 rounded-2xl border border-line bg-[#fafafa] px-4 text-sm outline-none focus:border-ink/30"
                      />
                      <input
                        placeholder="CVC"
                        className="h-12 rounded-2xl border border-line bg-[#fafafa] px-4 text-sm outline-none focus:border-ink/30"
                      />
                    </div>
                  </div>
                ) : null}
              </section>
            )}

            {/* Mobile order summary accordion */}
            <section className="rounded-3xl bg-white shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)] lg:hidden">
              <button
                type="button"
                onClick={() => setSummaryOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="flex items-center gap-2 text-[15px] font-semibold">
                  <ListIcon />
                  Order summary · {count} item{count === 1 ? "" : "s"}
                </span>
                <span
                  className={cn(
                    "text-ink-muted transition-transform",
                    summaryOpen && "rotate-180",
                  )}
                >
                  ↓
                </span>
              </button>
              {summaryOpen ? (
                <div className="border-t border-line px-5 pb-5 pt-4">
                  <OrderLines items={items} />
                  <Totals
                    subtotal={subtotal}
                    shippingFee={shippingFee}
                    total={total}
                    className="mt-4"
                  />
                </div>
              ) : null}
            </section>
          </div>

          {/* Desktop summary */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)]">
              <h2 className="text-[17px] font-semibold">
                Order summary · {count} item{count === 1 ? "" : "s"}
              </h2>
              <div className="mt-5">
                <OrderLines items={items} />
              </div>
              <Totals
                subtotal={subtotal}
                shippingFee={shippingFee}
                total={total}
                className="mt-5 border-t border-line pt-5"
              />
              {step < 3 ? (
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => setStep((s) => (s + 1) as Step)}
                  className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white transition-transform enabled:active:scale-[0.98] disabled:opacity-40"
                >
                  Continue · {formatPrice(total)}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={placeOrder}
                  className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
                >
                  Place order · {formatPrice(total)}
                </button>
              )}
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
                <LockIcon /> Secure checkout
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
        {step < 3 ? (
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => setStep((s) => (s + 1) as Step)}
            className="flex h-14 w-full items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white enabled:active:scale-[0.98] disabled:opacity-40"
          >
            Continue · {formatPrice(total)}
          </button>
        ) : (
          <button
            type="button"
            onClick={placeOrder}
            className="flex h-14 w-full items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white active:scale-[0.98]"
          >
            Place order · {formatPrice(total)}
          </button>
        )}
      </div>
    </div>
  );
}

function DeliveryOption({
  selected,
  onSelect,
  title,
  detail,
  price,
  disabled,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  detail: string;
  price: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors",
        selected ? "border-ink bg-[#fafafa]" : "border-line",
        !disabled && "hover:border-ink/30",
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-ink" : "border-[#ccc]",
        )}
      >
        {selected ? <span className="size-2.5 rounded-full bg-ink" /> : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium">{title}</span>
        <span className="block text-sm text-ink-muted">{detail}</span>
      </span>
      <span className="text-sm font-semibold">{price}</span>
    </button>
  );
}

function PaymentOption({
  selected,
  onSelect,
  icon,
  title,
  detail,
  disabled,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  detail: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors",
        selected ? "border-ink bg-[#fafafa]" : "border-line",
        !disabled && "hover:border-ink/30",
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-ink" : "border-[#ccc]",
        )}
      >
        {selected ? <span className="size-2.5 rounded-full bg-ink" /> : null}
      </span>
      <span className="flex size-10 items-center justify-center rounded-xl bg-[#f0f0f0]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium">{title}</span>
        <span className="block text-sm text-ink-muted">{detail}</span>
      </span>
    </button>
  );
}

function OrderLines({
  items,
}: {
  items: { slug: string; name: string; image: string; price: number; quantity: number }[];
}) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.slug} className="flex items-center gap-3">
          <div className="relative size-14 overflow-hidden rounded-xl bg-[#efefef]">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-contain p-1.5"
              sizes="56px"
              unoptimized={item.image.startsWith("/")}
            />
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
              {item.quantity}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.name}</p>
            <p className="text-sm text-ink-soft">{formatPrice(item.price)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Totals({
  subtotal,
  shippingFee,
  total,
  className,
}: {
  subtotal: number;
  shippingFee: number;
  total: number;
  className?: string;
}) {
  return (
    <dl className={cn("flex flex-col gap-2.5 text-[15px]", className)}>
      <div className="flex justify-between gap-4">
        <dt className="text-ink-soft">Subtotal</dt>
        <dd className="font-medium">{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-ink-soft">Shipping</dt>
        <dd className="font-medium">
          {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
        </dd>
      </div>
      <div className="flex justify-between gap-4 pt-1">
        <dt className="font-semibold">Total</dt>
        <dd className="font-semibold">{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}

function CardIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 24 18" fill="none" aria-hidden>
      <rect x="1" y="1" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 6h22" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M2 18h20M12 4l9 6H3l9-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 10V8a4 4 0 1 1 8 0v2M7 10h10v10H7V10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
