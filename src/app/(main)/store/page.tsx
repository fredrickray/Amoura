import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CataloguePage } from "@/components/CataloguePage";
import { products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Store",
};

export default function StorePage() {
  const shoppable = products.filter((p) => p.catalogue !== "magazine");

  return (
    <>
      <CataloguePage
        active="all"
        products={shoppable}
        eyebrow="Store"
        title="Browse Our"
        titleMuted="Product Line Up"
        description="Explore perfumes and lash sets. Custom magazines are made to order — start yours on the Magazines page."
      />
      <div className="mx-auto max-w-[1240px] px-5 pb-24 md:px-8">
        <Link
          href="/magazines"
          className="group relative flex min-h-[200px] overflow-hidden rounded-[28px] border border-line/80"
        >
          <Image
            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&q=80"
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="1200px"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="relative z-[1] flex flex-col justify-end p-6 text-white md:p-8">
            <p className="text-sm text-white/80">Not a product on the shelf</p>
            <p className="mt-1 font-display text-3xl tracking-tight md:text-4xl">
              Commission a custom magazine
            </p>
            <p className="mt-2 max-w-md text-sm text-white/85">
              Select even page counts, upload your photos, share inspo, and pay
              50% now — balance after delivery.
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
