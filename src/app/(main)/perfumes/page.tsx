import type { Metadata } from "next";
import { CataloguePage } from "@/components/CataloguePage";
import { getByCatalogue } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Perfumes",
  description:
    "Discover Amoura signature fragrances — hand-blended scents designed to linger softly.",
};

export default function PerfumesPage() {
  return (
    <CataloguePage
      active="perfume"
      products={getByCatalogue("perfume")}
      eyebrow="Perfumes"
      title="Signature"
      titleMuted="Fragrances"
      description="Hand-blended eaux de parfum and body mists — luminous, intimate, and made for presence without excess."
    />
  );
}
