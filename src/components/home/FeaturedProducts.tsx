import { PillButton } from "@/components/PillButton";
import { ProductCardMotion } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/catalog";

export function FeaturedProducts() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-xl">
            <p className="badge mb-4">Store</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
              <span className="text-ink">Find Pieces That Perfectly Match</span>
              <span className="mt-1 block text-ink-soft/80">Your Lifestyle</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <PillButton href="/store" variant="solid">
              View All
            </PillButton>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCardMotion key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
