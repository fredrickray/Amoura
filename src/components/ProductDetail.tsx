"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCardMotion } from "@/components/ProductCard";
import { PillButton } from "@/components/PillButton";
import { Reveal } from "@/components/Reveal";
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
  const [openAcc, setOpenAcc] = useState<number | null>(null);
  const related = getRelated(product.slug);

  return (
    <div className="px-5 pb-24 pt-8 md:px-8 md:pt-12">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-6 text-sm text-ink-muted">
          <Link href="/store" className="hover:text-ink">
            Store
          </Link>
          <span className="mx-2">/</span>
          <span>{catalogueLabels[product.catalogue]}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <div className="grid grid-cols-[1.4fr_0.7fr] gap-3 md:gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-surface-soft">
                <Image
                  src={product.gallery[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 70vw, 520px"
                />
              </div>
              <div className="grid gap-3 md:gap-4">
                {product.gallery.slice(1, 3).map((src) => (
                  <div
                    key={src}
                    className="relative aspect-square overflow-hidden rounded-[18px] bg-surface-soft"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h1 className="font-display text-4xl tracking-tight md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 text-[15px] text-ink-soft">{product.size}</p>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-star">★</span>
                <span className="font-medium">
                  {product.rating.toFixed(1)} ({product.reviews})
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

              <div className="mt-4 divide-y divide-line border-y border-line">
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

              <div className="mt-8">
                <PillButton
                  href="/support"
                  variant="solid"
                  className="w-full sm:w-auto"
                >
                  Available Here
                </PillButton>
              </div>
            </div>
          </Reveal>
        </div>

        <section className="mt-24">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="badge mb-4">Similar items</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
                <span className="block text-ink">Similar Items</span>
                <span className="block text-ink-soft/80">You Might Like</span>
              </h2>
            </div>
            <PillButton href="/store" variant="solid">
              View All
            </PillButton>
          </div>

          <div className="mb-6 flex justify-center">
            <span className="size-1.5 rounded-full bg-ink" />
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
