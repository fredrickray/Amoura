"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PillButton } from "@/components/PillButton";
import { products } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_AT = 150000;

export default function CartPage() {
  const { items, count, subtotal, setQuantity, removeItem, clear } = useCart();
  const shippingProgress = Math.min(1, subtotal / FREE_SHIPPING_AT);
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const suggestions = products
    .filter((p) => !items.some((i) => i.slug === p.slug))
    .slice(0, 3);

  return (
    <div className="relative overflow-hidden px-5 pb-24 pt-10 md:px-8 md:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 10% 0%, rgba(201,163,168,0.2), transparent 55%), radial-gradient(ellipse 45% 35% at 95% 15%, rgba(168,126,134,0.12), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-10 overflow-hidden rounded-[28px] border border-line/70 bg-surface/80 p-6 shadow-[0_24px_60px_-40px_rgba(17,17,17,0.45)] backdrop-blur-sm md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="badge mb-3">Cart</p>
              <h1 className="font-display text-[clamp(2.1rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
                Your bag
              </h1>
              <p className="mt-2 text-[15px] text-ink-soft">
                {count === 0
                  ? "Nothing here yet — your next scent or set is a click away."
                  : `${count} item${count === 1 ? "" : "s"} ready for checkout.`}
              </p>
            </div>
            {count > 0 ? (
              <Link
                href="/store"
                className="text-sm font-medium text-ink-soft underline-offset-4 hover:text-ink hover:underline"
              >
                Continue shopping
              </Link>
            ) : null}
          </div>

          {count > 0 ? (
            <div className="mt-6">
              <div className="mb-2 flex justify-between gap-3 text-sm">
                <span className="text-ink-soft">
                  {remaining === 0
                    ? "You’ve unlocked complimentary shipping"
                    : `${formatPrice(remaining)} away from free shipping`}
                </span>
                <span className="font-medium text-ink">
                  {Math.round(shippingProgress * 100)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-soft">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blush to-blush-deep"
                  initial={false}
                  animate={{ width: `${shippingProgress * 100}%` }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>
            </div>
          ) : null}
        </div>

        {items.length === 0 ? (
          <div className="relative overflow-hidden rounded-[28px] border border-line/80 bg-surface px-6 py-16 text-center md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-[#e8d4d7]/50 blur-3xl"
            />
            <div className="relative mx-auto mb-8 flex max-w-md justify-center gap-3">
              {products.slice(0, 3).map((p, i) => (
                <div
                  key={p.slug}
                  className="relative size-24 overflow-hidden rounded-2xl bg-gradient-to-b from-[#f0e6e8] to-[#e4d5d8] shadow-sm md:size-28"
                  style={{ transform: `rotate(${(i - 1) * 6}deg)` }}
                >
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-contain p-3"
                    sizes="112px"
                    unoptimized={p.image.startsWith("/")}
                  />
                </div>
              ))}
            </div>
            <h2 className="relative font-display text-3xl tracking-tight">
              Your bag is empty
            </h2>
            <p className="relative mx-auto mt-2 max-w-sm text-[15px] text-ink-soft">
              Browse perfumes, magazines, and lash care — add what you love in
              one tap.
            </p>
            <div className="relative mt-8 flex justify-center gap-3">
              <PillButton href="/store" variant="solid">
                Shop the store
              </PillButton>
              <PillButton href="/lashes" variant="ghost" arrow={false}>
                Book lashes
              </PillButton>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <ul className="flex flex-col gap-4">
              {items.map((item, index) => (
                <motion.li
                  key={item.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="group grid overflow-hidden rounded-[24px] border border-line/80 bg-surface/95 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.4)] sm:grid-cols-[140px_1fr]"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative min-h-[140px] bg-gradient-to-b from-[#f0e6e8] to-[#e4d5d8] sm:min-h-full"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-5 transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-105"
                      sizes="140px"
                      unoptimized={item.image.startsWith("/")}
                    />
                  </Link>
                  <div className="flex flex-col justify-between gap-4 p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-display text-2xl tracking-tight hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-ink-soft">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                      <p className="font-medium text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-line bg-canvas/60">
                        <button
                          type="button"
                          className="flex size-10 items-center justify-center text-ink-soft transition-colors hover:text-ink active:scale-95"
                          onClick={() =>
                            setQuantity(item.slug, item.quantity - 1)
                          }
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="flex size-10 items-center justify-center text-ink-soft transition-colors hover:text-ink active:scale-95"
                          onClick={() =>
                            setQuantity(item.slug, item.quantity + 1)
                          }
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        className="text-sm text-ink-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>

            <aside className="h-fit overflow-hidden rounded-[28px] border border-line/80 bg-surface shadow-[0_24px_50px_-36px_rgba(17,17,17,0.45)] lg:sticky lg:top-24">
              <div className="border-b border-line bg-gradient-to-br from-[#f7efef] to-surface px-5 py-5 md:px-6">
                <h2 className="font-display text-2xl tracking-tight">
                  Order summary
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  Ships from the Amoura atelier
                </p>
              </div>

              <div className="px-5 py-5 md:px-6 md:py-6">
                <dl className="flex flex-col gap-3.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-soft">
                      Subtotal ({count} item{count === 1 ? "" : "s"})
                    </dt>
                    <dd className="font-medium">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-soft">Shipping</dt>
                    <dd className="font-medium">
                      {remaining === 0 ? "Complimentary" : "At checkout"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-line pt-3.5">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="font-display text-2xl tracking-tight">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
                </dl>

                <PillButton
                  href="/account"
                  variant="solid"
                  className="mt-6 w-full justify-center"
                  arrow={false}
                >
                  Proceed to checkout
                </PillButton>
                <PillButton
                  href="/store"
                  variant="ghost"
                  className="mt-3 w-full justify-center"
                  arrow={false}
                >
                  Keep shopping
                </PillButton>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm text-ink-soft">
                  <li className="flex gap-2.5">
                    <span className="text-blush-deep">✓</span>
                    Secure checkout · Naira pricing
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-blush-deep">✓</span>
                    Easy returns within 30 days
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-blush-deep">✓</span>
                    Packed by hand at the atelier
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={clear}
                  className="mt-5 w-full text-center text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  Clear bag
                </button>
              </div>
            </aside>
          </div>
        )}

        {suggestions.length > 0 ? (
          <section className="mt-16">
            <div className="mb-6">
              <p className="badge mb-2">Complete the ritual</p>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.35rem)] tracking-tight">
                You may also like
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {suggestions.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group overflow-hidden rounded-[22px] border border-line/80 bg-surface transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-strong)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(17,17,17,0.35)]"
                >
                  <div className="relative aspect-[4/5] bg-gradient-to-b from-[#f3e9eb] to-[#e8d9dc]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="280px"
                      unoptimized={product.image.startsWith("/")}
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-medium">{product.name}</p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
