import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct, products } from "@/data/catalog";

export function generateStaticParams() {
  return products
    .filter((p) => p.catalogue !== "magazine")
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.catalogue === "magazine") {
    return { title: "Custom Magazines" };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  if (product.catalogue === "magazine") redirect("/magazines");
  return <ProductDetail product={product} />;
}
