"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { getProduct, catalogueLabels } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { slugs, remove, clear } = useWishlist();
  const { addItem } = useCart();
  const items = slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="min-w-0">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="badge mb-3">Wishlist</p>
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
            Saved for later
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            {items.length === 0
              ? "Heart products while browsing to keep them here."
              : `${items.length} saved piece${items.length === 1 ? "" : "s"}.`}
          </p>
        </div>
        {items.length > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="text-sm text-ink-muted hover:text-ink"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="rounded-[24px] border border-line/80 bg-surface/90 px-6 py-16 text-center">
          <p className="font-display text-3xl tracking-tight">Nothing saved yet</p>
          <p className="mt-2 text-sm text-ink-soft">
            Browse the store and tap the heart on anything you love.
          </p>
          <Link
            href="/store"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white"
          >
            Explore the store
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <li
              key={product.slug}
              className="overflow-hidden rounded-[22px] border border-line/80 bg-surface shadow-[0_16px_36px_-30px_rgba(17,17,17,0.35)]"
            >
              <Link
                href={`/product/${product.slug}`}
                className="relative block aspect-[4/5] bg-gradient-to-b from-[#f3e9eb] to-[#e8d9dc]"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                  sizes="280px"
                  unoptimized={product.image.startsWith("/")}
                />
              </Link>
              <div className="p-4">
                <Link
                  href={`/product/${product.slug}`}
                  className="font-medium hover:underline"
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-ink-soft">
                  {catalogueLabels[product.catalogue]} ·{" "}
                  {formatPrice(product.price)}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => addItem(product, 1)}
                    className="flex-1 rounded-full bg-ink py-2.5 text-xs font-semibold text-white"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    className="rounded-full border border-line px-3 py-2.5 text-xs font-medium text-ink-soft hover:text-ink"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
