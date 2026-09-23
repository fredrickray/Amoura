"use client";

import { use } from "react";
import { MagazineProjectDetail } from "@/components/account/MagazineProjectDetail";

export default function MagazineProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <MagazineProjectDetail projectId={id} />;
}
