"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const { items, count, subtotal, setQuantity, removeItem, magazineBalanceDue, hasMagazineDeposit } =
    useCart();
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - discount);

  function applyPromo() {
    const code = promo.trim().toUpperCase();
    if (code === "AMOURA10") {
      setPromoApplied(true);
      setPromoError("");
    } else if (!code) {
      setPromoError("Enter a promo code");
      setPromoApplied(false);
    } else {
      setPromoError("Code not found");
      setPromoApplied(false);
    }
  }

  return (
    <div className="min-h-[70vh] bg-[#f5f5f5]">
      {/* Page header — matches mobile mock */}
      <div className="sticky top-[72px] z-40 border-b border-line/80 bg-[#f5f5f5]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[960px] items-center justify-between px-4 md:px-8">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-white"
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
          <h1 className="text-[17px] font-semibold tracking-tight">My Cart</h1>
          <Link
            href="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative flex size-10 items-center justify-center rounded-full hover:bg-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 7h12l-1 12H7L6 7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M9 7V5.5a3 3 0 0 1 6 0V7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {count > 0 ? (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-star px-1 text-[10px] font-bold text-white">
                {count > 9 ? "9+" : count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 pb-36 pt-5 md:px-8 md:pb-16 md:pt-8">
        {items.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)]">
            <p className="font-display text-3xl tracking-tight">Your cart is empty</p>
            <p className="mt-2 text-sm text-ink-soft">
              Add something beautiful from the store.
            </p>
            <Link
              href="/store"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-8">
            <div className="flex flex-col gap-3">
              {items.map((item) => {
                const product = getProduct(item.slug);
                const isMagazine = item.kind === "magazine";
                const variant = isMagazine
                  ? `${item.magazine?.pages ?? 0} pages · 50% deposit`
                  : product
                    ? product.size
                    : "Standard";
                return (
                  <article
                    key={item.slug}
                    className="relative rounded-3xl bg-white p-4 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)] md:p-5"
                  >
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      aria-label={`Remove ${item.name}`}
                      className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-[#f5f5f5] hover:text-ink"
                    >
                      <TrashIcon />
                    </button>

                    <div className="flex gap-3.5 pr-8">
                      {isMagazine ? (
                        <div className="relative size-[88px] shrink-0 overflow-hidden rounded-2xl bg-[#efefef] md:size-[100px]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="100px"
                            unoptimized={item.image.startsWith("blob:") || item.image.startsWith("/")}
                          />
                        </div>
                      ) : (
                        <Link
                          href={`/product/${item.slug}`}
                          className="relative size-[88px] shrink-0 overflow-hidden rounded-2xl bg-[#efefef] md:size-[100px]"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                            sizes="100px"
                            unoptimized={item.image.startsWith("/")}
                          />
                        </Link>
                      )}

                      <div className="min-w-0 flex-1">
                        {isMagazine ? (
                          <p className="block text-[15px] font-semibold leading-snug tracking-tight text-ink">
                            {item.name}
                          </p>
                        ) : (
                          <Link
                            href={`/product/${item.slug}`}
                            className="block text-[15px] font-semibold leading-snug tracking-tight text-ink hover:underline"
                          >
                            {item.name}
                          </Link>
                        )}
                        <p className="mt-1 text-sm text-ink-muted">{variant}</p>
                        {isMagazine && item.magazine ? (
                          <p className="mt-1 text-xs text-ink-soft">
                            Full {formatPrice(item.magazine.fullPrice)} · Balance{" "}
                            {formatPrice(item.magazine.balance)} after delivery
                          </p>
                        ) : null}

                        <div className="mt-4 flex items-end justify-between gap-3">
                          {isMagazine ? (
                            <span className="rounded-full bg-[#f0f0f0] px-3 py-1.5 text-xs font-medium text-ink-soft">
                              Qty 1
                            </span>
                          ) : (
                            <div className="inline-flex items-center rounded-full bg-[#f0f0f0]">
                              <button
                                type="button"
                                className="flex size-8 items-center justify-center text-ink-soft transition-transform active:scale-95"
                                onClick={() =>
                                  setQuantity(item.slug, item.quantity - 1)
                                }
                                aria-label="Decrease"
                              >
                                −
                              </button>
                              <span className="min-w-6 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="flex size-8 items-center justify-center text-ink-soft transition-transform active:scale-95"
                                onClick={() =>
                                  setQuantity(item.slug, item.quantity + 1)
                                }
                                aria-label="Increase"
                              >
                                +
                              </button>
                            </div>
                          )}
                          <p className="text-[15px] font-semibold">
                            {formatPrice(item.price * item.quantity)}
                            {isMagazine ? (
                              <span className="block text-right text-xs font-normal text-ink-muted">
                                due now
                              </span>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Order note */}
              <div className="rounded-3xl bg-white shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)]">
                {!showNote ? (
                  <button
                    type="button"
                    onClick={() => setShowNote(true)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left text-[15px] text-ink md:px-5"
                  >
                    <NoteIcon />
                    <span className="font-medium">Add order note</span>
                  </button>
                ) : (
                  <div className="px-4 py-4 md:px-5">
                    <label
                      htmlFor="order-note"
                      className="mb-2 flex items-center gap-2 text-sm font-medium"
                    >
                      <NoteIcon />
                      Order note
                    </label>
                    <textarea
                      id="order-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      placeholder="Gift message, delivery preference…"
                      className="w-full resize-none rounded-2xl border border-line bg-[#fafafa] px-4 py-3 text-sm outline-none focus:border-ink/30"
                    />
                  </div>
                )}
              </div>

              {/* Promo — mobile (desktop also in sidebar) */}
              <div className="rounded-3xl bg-white p-4 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)] lg:hidden md:p-5">
                <PromoRow
                  promo={promo}
                  setPromo={setPromo}
                  onApply={applyPromo}
                  error={promoError}
                  applied={promoApplied}
                />
              </div>
            </div>

            {/* Summary — desktop sidebar / mobile bottom block */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)]">
                <PromoRow
                  promo={promo}
                  setPromo={setPromo}
                  onApply={applyPromo}
                  error={promoError}
                  applied={promoApplied}
                />
                <SummaryBlock
                  subtotal={subtotal}
                  discount={discount}
                  total={total}
                  magazineBalanceDue={magazineBalanceDue}
                  hasMagazineDeposit={hasMagazineDeposit}
                />
                <Link
                  href="/checkout"
                  className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
                >
                  Proceed to Checkout · {formatPrice(total)}
                </Link>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
                  <LockIcon /> Secure checkout
                </p>
              </div>
            </aside>

            {/* Mobile summary above sticky CTA */}
            <div className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)] lg:hidden">
              <SummaryBlock
                subtotal={subtotal}
                discount={discount}
                total={total}
                magazineBalanceDue={magazineBalanceDue}
                hasMagazineDeposit={hasMagazineDeposit}
              />
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile checkout bar */}
      {items.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
          <Link
            href="/checkout"
            className="flex h-14 w-full items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Proceed to Checkout · {formatPrice(total)}
          </Link>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
            <LockIcon /> Secure checkout
          </p>
        </div>
      ) : null}
    </div>
  );
}

function SummaryBlock({
  subtotal,
  discount,
  total,
  magazineBalanceDue = 0,
  hasMagazineDeposit = false,
}: {
  subtotal: number;
  discount: number;
  total: number;
  magazineBalanceDue?: number;
  hasMagazineDeposit?: boolean;
}) {
  return (
    <dl className="flex flex-col gap-3 text-[15px]">
      <div className="flex justify-between gap-4">
        <dt className="text-ink-soft">
          {hasMagazineDeposit ? "Due today" : "Subtotal"}
        </dt>
        <dd className="font-semibold">{formatPrice(subtotal)}</dd>
      </div>
      {discount > 0 ? (
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">Promo (AMOURA10)</dt>
          <dd className="font-semibold text-emerald-700">
            −{formatPrice(discount)}
          </dd>
        </div>
      ) : null}
      {magazineBalanceDue > 0 ? (
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">Magazine balance (after delivery)</dt>
          <dd className="font-semibold text-ink-soft">
            {formatPrice(magazineBalanceDue)}
          </dd>
        </div>
      ) : null}
      <div className="flex justify-between gap-4">
        <dt className="text-ink-soft">Shipping</dt>
        <dd className="text-ink-soft">Calculated at checkout</dd>
      </div>
      <div className="flex justify-between gap-4 border-t border-line pt-3">
        <dt className="font-semibold">
          {hasMagazineDeposit ? "Pay now" : "Total"}
        </dt>
        <dd className="font-semibold">{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}

function PromoRow({
  promo,
  setPromo,
  onApply,
  error,
  applied,
}: {
  promo: string;
  setPromo: (v: string) => void;
  onApply: () => void;
  error: string;
  applied: boolean;
}) {
  return (
    <div className="mb-5">
      <div className="flex gap-2">
        <input
          type="text"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Promo code"
          className="h-12 min-w-0 flex-1 rounded-full border border-line bg-[#fafafa] px-4 text-sm outline-none focus:border-ink/30"
        />
        <button
          type="button"
          onClick={onApply}
          className="h-12 shrink-0 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-transform active:scale-[0.97]"
        >
          Apply
        </button>
      </div>
      {applied ? (
        <p className="mt-2 text-sm text-emerald-700">10% off applied</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7h14M10 11v6M14 11v6M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 7h8M8 11h8M8 15h4M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
