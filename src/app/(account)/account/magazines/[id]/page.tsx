import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MagazineProjectDetail } from "@/components/account/MagazineProjectDetail";
import { getMagazineProject, magazineProjects } from "@/data/account";

export function generateStaticParams() {
  return magazineProjects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getMagazineProject(id);
  return { title: project ? project.title : "Magazine project" };
}

export default async function MagazineProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getMagazineProject(id);
  if (!project) notFound();

  return <MagazineProjectDetail project={project} />;
}
