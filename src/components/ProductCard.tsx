"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/data/catalog";
import { catalogueLabels } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  showMeta = true,
}: {
  product: Product;
  showMeta?: boolean;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function stop(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onAdd(e: React.MouseEvent) {
    stop(e);
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  function onBuy(e: React.MouseEvent) {
    stop(e);
    addItem(product, 1);
    router.push("/cart");
  }

  return (
    <div className="group">
      <Link href={`/product/${product.slug}`} className="block cursor-hover">
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

          {/* Quick actions — no need to open the product page */}
          <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-100 transition-opacity duration-250 sm:opacity-0 sm:group-hover:opacity-100">
            <button
              type="button"
              onClick={onBuy}
              className="flex-1 rounded-full bg-ink py-2.5 text-center text-xs font-semibold text-white shadow-sm transition-transform active:scale-[0.97]"
            >
              Buy now
            </button>
            <button
              type="button"
              onClick={onAdd}
              className="flex-1 rounded-full border border-ink/10 bg-white/95 py-2.5 text-center text-xs font-semibold text-ink shadow-sm backdrop-blur-sm transition-transform active:scale-[0.97]"
            >
              {added ? "Added" : "Add to cart"}
            </button>
          </div>
        </div>
      </Link>

      {showMeta ? (
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${product.slug}`}
              className="text-[15px] font-semibold tracking-tight hover:underline"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-sm text-ink-soft">
              {catalogueLabels[product.catalogue]} · {product.brand}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-surface-soft px-3 py-1.5 text-sm text-ink-soft">
            {formatPrice(product.price)}
          </span>
        </div>
      ) : null}
    </div>
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
