"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  magazineStatusLabel,
  type MagazineProject,
  type MagazineProjectStatus,
} from "@/data/account";
import { StatusPill, magazineTone } from "@/components/account/StatusPill";
import { useAccountData } from "@/context/AccountDataContext";
import { cn, formatPrice } from "@/lib/utils";

export function MagazineProjectDetail({ projectId }: { projectId: string }) {
  const { getMagazine, updateMagazineStatus, payMagazineBalance, ready } =
    useAccountData();
  const stored = getMagazine(projectId);
  const [project, setProject] = useState<MagazineProject | null>(stored ?? null);
  const [proofIndex, setProofIndex] = useState(0);
  const [changeNote, setChangeNote] = useState("");
  const [showChanges, setShowChanges] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (stored) setProject(stored);
  }, [stored]);

  const canApprove =
    project?.status === "in_review" || project?.status === "changes_requested";
  const canRequestChanges = project?.status === "in_review";
  const isDraft = project?.status === "draft";
  const needsBalance = Boolean(
    project?.timeline.some(
      (s) => s.label.toLowerCase().includes("balance") && !s.done,
    ),
  );

  const progress = useMemo(() => {
    if (!project) return 0;
    const done = project.timeline.filter((s) => s.done).length;
    return Math.round((done / project.timeline.length) * 100);
  }, [project]);

  if (!ready) {
    return <p className="text-sm text-ink-soft">Loading project…</p>;
  }

  if (!project) {
    return (
      <div>
        <p className="font-display text-2xl">Project not found</p>
        <Link
          href="/account/magazines"
          className="mt-4 inline-block text-sm text-ink-soft"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  function approveToPrint() {
    const next: MagazineProject = {
      ...project!,
      status: "approved",
      updatedAt: "Just now",
      editorNote:
        "Approved — headed to print. We’ll email tracking when it ships.",
      timeline: project!.timeline.map((step) => {
        if (step.label.toLowerCase().includes("proof")) {
          return {
            ...step,
            current: false,
            done: true,
            detail: "Approved by you",
          };
        }
        if (step.label.toLowerCase().includes("approved")) {
          return {
            ...step,
            done: true,
            current: true,
            detail: "Queued for print",
          };
        }
        return { ...step, current: false };
      }),
    };
    setProject(next);
    updateMagazineStatus(next.id, next.status, next.editorNote);
    setShowChanges(false);
    flash("Magazine approved for print");
  }

  function submitChanges() {
    if (!changeNote.trim()) return;
    const note = `Change request received: “${changeNote.trim()}” — editors will revise the proof.`;
    const next: MagazineProject = {
      ...project!,
      status: "changes_requested" as MagazineProjectStatus,
      updatedAt: "Just now",
      editorNote: note,
      timeline: project!.timeline.map((step) =>
        step.current
          ? {
              ...step,
              label: "Changes requested",
              detail: "Editors revising proof",
            }
          : step,
      ),
    };
    setProject(next);
    updateMagazineStatus(next.id, next.status, note);
    setChangeNote("");
    setShowChanges(false);
    flash("Change request sent");
  }

  function payBalance() {
    payMagazineBalance(project!.id);
    flash("Balance marked as paid");
  }

  return (
    <div className="min-w-0">
      <Link
        href="/account/magazines"
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to projects
      </Link>

      <div className="mt-4 mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="badge mb-3">Magazine project</p>
          <h1 className="font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.1] tracking-tight">
            {project.title}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            {project.id} · {project.theme} · Updated {project.updatedAt}
          </p>
        </div>
        <StatusPill tone={magazineTone(project.status)}>
          {magazineStatusLabel[project.status]}
        </StatusPill>
      </div>

      <AnimatePresence>
        {toast ? (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {toast}
          </motion.p>
        ) : null}
      </AnimatePresence>

      {needsBalance ? (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-amber-200 bg-amber-50 px-4 py-4 md:px-5">
          <div>
            <p className="text-sm font-medium text-amber-950">
              Remaining 50% balance
            </p>
            <p className="mt-0.5 text-sm text-amber-900/80">
              Deposit is paid. Settle the balance before print.
            </p>
          </div>
          <button
            type="button"
            onClick={payBalance}
            className="pill pill-solid shrink-0 px-5 py-2.5 text-sm"
          >
            Pay balance
          </button>
        </div>
      ) : null}

      <div className="mb-6 rounded-[22px] border border-line/80 bg-surface/90 p-4 md:p-5">
        <div className="mb-2 flex justify-between gap-3 text-sm">
          <span className="text-ink-soft">Project progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-soft">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blush to-blush-deep transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="min-w-0 rounded-[24px] border border-line/80 bg-surface/90 p-4 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)] md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl tracking-tight">Proof</h2>
            <p className="text-sm text-ink-muted">
              {proofIndex + 1} / {project.proofImages.length}
            </p>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-surface-soft">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.proofImages[proofIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="absolute inset-0"
              >
                <Image
                  src={project.proofImages[proofIndex]}
                  alt={`Proof page ${proofIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  unoptimized={
                    project.proofImages[proofIndex].startsWith("/") ||
                    project.proofImages[proofIndex].startsWith("blob:")
                  }
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {project.proofImages.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setProofIndex(i)}
                aria-label={`View proof ${i + 1}`}
                aria-pressed={proofIndex === i}
                className={cn(
                  "relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface-soft transition-[box-shadow,opacity]",
                  proofIndex === i
                    ? "opacity-100 shadow-[0_0_0_2px_#111]"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized={src.startsWith("/") || src.startsWith("blob:")}
                />
              </button>
            ))}
          </div>

          {project.editorNote ? (
            <div className="mt-5 rounded-2xl bg-[#f7efef] px-4 py-3 text-sm leading-relaxed text-ink-soft">
              <p className="mb-1 font-medium text-ink">From your editor</p>
              {project.editorNote}
            </div>
          ) : null}

          {(canApprove || canRequestChanges || isDraft) && (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {canApprove ? (
                <button
                  type="button"
                  onClick={approveToPrint}
                  className="pill pill-solid justify-center px-5 py-3 text-sm"
                >
                  Approve to print
                </button>
              ) : null}
              {canRequestChanges ? (
                <button
                  type="button"
                  onClick={() => setShowChanges((v) => !v)}
                  className="pill justify-center px-5 py-3 text-sm"
                >
                  Request changes
                </button>
              ) : null}
              {isDraft ? (
                <Link
                  href="/magazines"
                  className="pill pill-solid justify-center px-5 py-3 text-sm"
                >
                  Continue brief
                </Link>
              ) : null}
            </div>
          )}

          {showChanges ? (
            <div className="mt-4 rounded-2xl border border-line bg-canvas/60 p-4">
              <label htmlFor="changes" className="text-sm font-medium">
                What should we revise?
              </label>
              <textarea
                id="changes"
                value={changeNote}
                onChange={(e) => setChangeNote(e.target.value)}
                rows={3}
                placeholder="e.g. Softer cover crop, swap page 8 hero photo…"
                className="mt-2 w-full resize-none rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ink/30"
              />
              <button
                type="button"
                onClick={submitChanges}
                disabled={!changeNote.trim()}
                className="mt-3 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
              >
                Send to editors
              </button>
            </div>
          ) : null}
        </section>

        <div className="flex min-w-0 flex-col gap-6">
          <section className="rounded-[24px] border border-line/80 bg-surface/90 p-5 md:p-6">
            <h2 className="font-display text-2xl tracking-tight">Brief</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              {project.brief}
            </p>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-ink-muted">Pages</dt>
                <dd className="font-medium">{project.pages}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Investment</dt>
                <dd className="font-medium">{formatPrice(project.price)}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Photos</dt>
                <dd className="font-medium">
                  {project.photosUploaded} / {project.photosNeeded}
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">Theme</dt>
                <dd className="font-medium">{project.theme}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-[24px] border border-line/80 bg-surface/90 p-5 md:p-6">
            <h2 className="font-display text-2xl tracking-tight">Timeline</h2>
            <ol className="relative mt-6">
              {project.timeline.map((step, index) => (
                <li
                  key={`${step.label}-${index}`}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {index < project.timeline.length - 1 ? (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-[9px] top-5 h-[calc(100%-8px)] w-px",
                        step.done ? "bg-blush" : "bg-line",
                      )}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-[1] mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2",
                      step.current
                        ? "border-ink bg-ink"
                        : step.done
                          ? "border-blush-deep bg-blush-deep"
                          : "border-line bg-surface",
                    )}
                  >
                    {step.current ? (
                      <span className="size-1.5 rounded-full bg-white" />
                    ) : null}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        step.done || step.current
                          ? "text-ink"
                          : "text-ink-muted",
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-soft">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
