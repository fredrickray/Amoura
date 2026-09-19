import type { Metadata } from "next";
import { CataloguePage } from "@/components/CataloguePage";
import { products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Store",
};

export default function StorePage() {
  return (
    <CataloguePage
      active="all"
      products={products}
      eyebrow="Store"
      title="Browse Our"
      titleMuted="Product Line Up"
      description="Explore perfumes, custom magazines, and lash sets — with details and inspiring picks for every ritual."
    />
  );
}
