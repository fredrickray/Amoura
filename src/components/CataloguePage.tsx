import { ProductCardMotion } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import type { Catalogue, Product } from "@/data/catalog";
import Link from "next/link";
import { cn } from "@/lib/utils";

const filters: { href: string; label: string; key: "all" | Catalogue }[] = [
  { href: "/store", label: "All", key: "all" },
  { href: "/perfumes", label: "Perfumes", key: "perfume" },
  { href: "/magazines", label: "Magazines", key: "magazine" },
  { href: "/lashes", label: "Lashes", key: "lashes" },
];

export function CataloguePage({
  active,
  products,
  eyebrow,
  title,
  titleMuted,
  description,
}: {
  active: "all" | Catalogue;
  products: Product[];
  eyebrow: string;
  title: string;
  titleMuted?: string;
  description: string;
}) {
  return (
    <div className="px-5 pb-24 pt-10 md:px-8 md:pt-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="badge mb-4">{eyebrow}</p>
            <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em]">
              <span className="block text-ink">{title}</span>
              {titleMuted ? (
                <span className="block text-ink-soft/80">{titleMuted}</span>
              ) : null}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft md:text-right">
              {description}
            </p>
          </Reveal>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                active === item.key
                  ? "bg-ink text-white"
                  : "bg-surface-soft text-ink-soft hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="py-16 text-center text-ink-soft">
            Nothing in this catalogue yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCardMotion key={product.slug} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
