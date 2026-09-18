"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/data/catalog";
import { catalogueLabels } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  showMeta = true,
}: {
  product: Product;
  showMeta?: boolean;
}) {
  return (
    <Link href={`/product/${product.slug}`} className="group block cursor-hover">
      <div className="relative overflow-hidden rounded-[22px] bg-surface-soft">
        <div className="aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={720}
            height={900}
            className="product-card-image size-full object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-[var(--ease-out-strong)] group-hover:opacity-100">
          <span className="flex size-12 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:scale-100 scale-90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </div>
      </div>

      {showMeta ? (
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold tracking-tight">{product.name}</p>
            <p className="mt-0.5 text-sm text-ink-soft">
              {catalogueLabels[product.catalogue]} · {product.brand}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-surface-soft px-3 py-1.5 text-sm text-ink-soft">
            {formatPrice(product.price)}
          </span>
        </div>
      ) : null}
    </Link>
  );
}

export function ProductCardMotion({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(24px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <ProductCard product={product} />
    </motion.div>
  );
}
