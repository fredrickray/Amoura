import type { Metadata } from "next";
import { ProductCardMotion } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Store",
};

export default function StorePage() {
  return (
    <div className="px-5 pb-24 pt-10 md:px-8 md:pt-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="badge mb-4">Store</p>
            <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em]">
              <span className="block text-ink">Browse Our</span>
              <span className="block text-ink-soft/80">Product Line Up</span>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft md:text-right">
              Explore perfumes, custom magazines, and lash sets — with details
              and inspiring picks for every ritual.
            </p>
          </Reveal>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {["All", "Perfumes", "Magazines", "Lashes"].map((label, i) => (
            <span
              key={label}
              className={`rounded-full px-4 py-2 text-sm ${
                i === 0
                  ? "bg-ink text-white"
                  : "bg-surface-soft text-ink-soft"
              }`}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCardMotion key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
