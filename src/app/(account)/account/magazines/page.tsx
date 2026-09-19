import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  magazineProjects,
  magazineStatusLabel,
} from "@/data/account";
import { StatusPill, magazineTone } from "@/components/account/StatusPill";
import { PillButton } from "@/components/PillButton";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Magazine projects",
};

export default function MagazineProjectsPage() {
  const active = magazineProjects.filter((p) => p.status !== "printed");
  const archived = magazineProjects.filter((p) => p.status === "printed");

  return (
    <div className="min-w-0">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="badge mb-3">Magazines</p>
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
            Your projects
          </h1>
          <p className="mt-2 max-w-lg text-[15px] text-ink-soft">
            Drafts, proofs awaiting approval, and printed keepsakes — all in one
            place.
          </p>
        </div>
        <PillButton href="/magazines" variant="solid">
          Start a magazine
        </PillButton>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink-muted">
          In progress
        </h2>
        {active.length === 0 ? (
          <p className="rounded-[18px] bg-surface-soft/80 px-4 py-8 text-center text-sm text-ink-soft">
            No active magazine projects.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {active.map((project) => (
              <ProjectCard key={project.id} id={project.id} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink-muted">
          Printed
        </h2>
        <div className="flex flex-col gap-4">
          {archived.map((project) => (
            <ProjectCard key={project.id} id={project.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ id }: { id: string }) {
  const project = magazineProjects.find((p) => p.id === id)!;
  return (
    <Link
      href={`/account/magazines/${project.id}`}
      className="group grid overflow-hidden rounded-[24px] border border-line/80 bg-surface/90 shadow-[0_16px_36px_-30px_rgba(17,17,17,0.4)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-strong)] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgba(17,17,17,0.35)] sm:grid-cols-[160px_1fr]"
    >
      <div className="relative min-h-[140px] bg-surface-soft sm:min-h-full">
        <Image
          src={project.coverImage}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="160px"
          unoptimized={project.coverImage.startsWith("/")}
        />
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 p-5 md:p-6">
        <div className="min-w-0">
          <p className="font-medium text-ink">{project.title}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {project.theme} · {project.pages} pages
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Updated {project.updatedAt} · {project.photosUploaded}/
            {project.photosNeeded} photos
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusPill tone={magazineTone(project.status)}>
            {magazineStatusLabel[project.status]}
          </StatusPill>
          <p className="text-sm font-medium">{formatPrice(project.price)}</p>
        </div>
      </div>
    </Link>
  );
}
