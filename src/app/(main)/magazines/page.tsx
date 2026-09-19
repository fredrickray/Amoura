import type { Metadata } from "next";
import { CataloguePage } from "@/components/CataloguePage";
import { getByCatalogue } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Custom Magazines",
  description:
    "Personalized editorial magazines by Amoura — keepsakes designed around your photos and story.",
};

export default function MagazinesPage() {
  return (
    <CataloguePage
      active="magazine"
      products={getByCatalogue("magazine")}
      eyebrow="Print"
      title="Custom"
      titleMuted="Magazines"
      description="Editorial keepsakes designed around your photos, milestones, and brand story — printed on premium paper."
    />
  );
}
