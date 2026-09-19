import { PillButton } from "@/components/PillButton";
import { ProductCardMotion } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/catalog";
import Image from "next/image";
import Link from "next/link";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.catalogue !== "magazine").slice(0, 2);

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
          {featured.map((product, i) => (
            <ProductCardMotion key={product.slug} product={product} index={i} />
          ))}
          <Reveal delay={0.14}>
            <Link
              href="/magazines"
              className="group block overflow-hidden rounded-[22px] bg-surface-soft"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80"
                  alt="Custom magazine"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-sm text-white/80">Made for you</p>
                  <p className="mt-1 font-display text-2xl tracking-tight">
                    Custom magazine
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    Choose pages · upload photos · pay 50% to start
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
