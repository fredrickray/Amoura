"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCardMotion } from "@/components/ProductCard";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { ProductReviews } from "@/components/ProductReviews";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { getReviewsForProduct } from "@/data/account";
import {
  catalogueLabels,
  getRelated,
  type Product,
} from "@/data/catalog";
import { cn, formatPrice } from "@/lib/utils";

const accordion = [
  {
    title: "Warranty",
    body: "Perfumes are covered for manufacturing defects. Custom magazines include one free revision before print. Lash sets include a 48-hour fill adjustment.",
  },
  {
    title: "Shipping details",
    body: "Goods ship within 2–4 business days. Magazines print after approval. International delivery typically arrives in 5–12 days.",
  },
  {
    title: "Customer support",
    body: "Message the atelier anytime for scent notes, magazine briefs, or lash aftercare. We respond within one business day.",
  },
];

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const [openAcc, setOpenAcc] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const related = getRelated(product.slug, 3);
  const reviews = getReviewsForProduct(product.slug);
  const saved = has(product.slug);

  const gallery =
    product.gallery.length >= 4
      ? product.gallery
      : [
          ...product.gallery,
          "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
        ].filter((v, i, a) => a.indexOf(v) === i);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem(product, qty);
    router.push("/cart");
  }

  return (
    <div className="px-5 pb-24 pt-8 md:px-8 md:pt-12">
      <div className="mx-auto max-w-[1240px] min-w-0">
        <div className="mb-6 text-sm text-ink-muted">
          <Link href="/store" className="hover:text-ink">
            Store
          </Link>
          <span className="mx-2">/</span>
          <span>{catalogueLabels[product.catalogue]}</span>
        </div>

        <div className="grid min-w-0 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal className="min-w-0">
            <ProductImageGallery images={gallery} alt={product.name} />
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <div>
              <h1 className="font-display text-4xl tracking-tight md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 text-[15px] text-ink-soft">{product.size}</p>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-star">★</span>
                <span className="font-medium">
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <p className="font-display text-3xl tracking-tight">
                  {formatPrice(product.price)}
                </p>
                {product.compareAt ? (
                  <p className="text-ink-muted line-through">
                    {formatPrice(product.compareAt)}
                  </p>
                ) : null}
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                {product.description}
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[15px] text-ink"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-soft text-xs">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3">
                <p className="text-sm font-medium">Qty</p>
                <div className="inline-flex items-center rounded-full border border-line bg-surface">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="flex size-10 items-center justify-center text-lg text-ink-soft hover:text-ink"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm font-medium">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="flex size-10 items-center justify-center text-lg text-ink-soft hover:text-ink"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="pill pill-solid flex-1 justify-center py-3.5 text-[15px]"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="pill flex-1 justify-center py-3.5 text-[15px]"
                >
                  {added ? "Added to cart" : "Add to cart"}
                </button>
                <button
                  type="button"
                  onClick={() => toggle(product.slug)}
                  aria-pressed={saved}
                  className={cn(
                    "pill justify-center px-4 py-3.5 text-[15px] sm:px-5",
                    saved && "border-star text-star",
                  )}
                >
                  {saved ? "Saved" : "Save"}
                </button>
              </div>

              <div className="mt-6 divide-y divide-line border-y border-line">
                {accordion.map((item, index) => {
                  const isOpen = openAcc === index;
                  return (
                    <div key={item.title}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium"
                        onClick={() => setOpenAcc(isOpen ? null : index)}
                      >
                        {item.title}
                        <span
                          className={cn(
                            "text-ink-muted transition-transform duration-250 ease-[var(--ease-out-strong)]",
                            isOpen && "rotate-180",
                          )}
                        >
                          ↓
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.28,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="pb-4 text-[15px] leading-relaxed text-ink-soft">
                              {item.body}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <ProductReviews reviews={reviews} />

        <section className="mt-20">
          <div className="mb-8">
            <p className="badge mb-3">You might also like</p>
            <h2 className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-tight">
              Related products
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <ProductCardMotion key={item.slug} product={item} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
