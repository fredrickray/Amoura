"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { StatusPill, magazineTone } from "@/components/account/StatusPill";
import {
  magazineStatusLabel,
  type MagazineProjectStatus,
} from "@/data/account";
import { useAdminStore } from "@/context/AdminStoreContext";
import { cn, formatPrice } from "@/lib/utils";

const STATUSES: MagazineProjectStatus[] = [
  "draft",
  "in_review",
  "changes_requested",
  "approved",
  "printed",
];

export default function AdminRequestDetailPage() {
  const params = useParams<{ id: string }>();
  const { getRequest, updateRequestStatus, ready } = useAdminStore();
  const req = getRequest(params.id);

  const [status, setStatus] = useState<MagazineProjectStatus | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  if (!ready) return null;
  if (!req) notFound();

  const currentStatus = status ?? req.status;
  const currentNote = note ?? req.editorNote ?? "";

  function handleSave() {
    updateRequestStatus(req!.id, currentStatus, currentNote);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-w-0">
      <Link
        href="/admin/requests"
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to requests
      </Link>

      <div className="mt-4 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="badge mb-2">{req.id}</p>
          <h1 className="font-display text-[clamp(1.85rem,3.5vw,2.5rem)] tracking-tight">
            {req.title}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {req.customerName} · {req.customerEmail} · Updated {req.updatedAt}
          </p>
        </div>
        <StatusPill tone={magazineTone(req.status)}>
          {magazineStatusLabel[req.status]}
        </StatusPill>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
            <div className="relative aspect-[16/10] bg-[#f3f1ef]">
              <Image
                src={req.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <div className="p-5">
              <h2 className="font-display text-xl tracking-tight">Brief</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {req.brief}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-ink-muted">Theme</dt>
                  <dd className="font-medium">{req.theme}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Pages</dt>
                  <dd className="font-medium">{req.pages}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Photos</dt>
                  <dd className="font-medium">
                    {req.photosUploaded}/{req.photosNeeded}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Full price</dt>
                  <dd className="font-medium">{formatPrice(req.price)}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
            <h2 className="font-display text-xl tracking-tight">Proof pages</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {req.proofImages.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f3f1ef]"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="200px" />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
            <h2 className="font-display text-xl tracking-tight">Timeline</h2>
            <ol className="mt-4 space-y-3">
              {req.timeline.map((step) => (
                <li key={step.label} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      step.done ? "bg-ink" : "bg-[#ddd8d3]",
                      step.current && "ring-4 ring-blush/40",
                    )}
                  />
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        !step.done && "text-ink-muted",
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-ink-soft">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
            <h2 className="font-display text-xl tracking-tight">Studio actions</h2>
            <label className="mt-4 block text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
              Status
            </label>
            <select
              value={currentStatus}
              onChange={(e) =>
                setStatus(e.target.value as MagazineProjectStatus)
              }
              className="mt-1.5 w-full rounded-xl border border-[#ddd8d3] bg-[#faf8f6] px-3 py-2.5 text-sm outline-none focus:border-ink/40"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {magazineStatusLabel[s]}
                </option>
              ))}
            </select>

            <label className="mt-4 block text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
              Note to customer
            </label>
            <textarea
              value={currentNote}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Proof notes, change requests, print ETA…"
              className="mt-1.5 w-full resize-y rounded-xl border border-[#ddd8d3] bg-[#faf8f6] px-3 py-2.5 text-sm outline-none focus:border-ink/40"
            />

            <button
              type="button"
              onClick={handleSave}
              className="pill pill-solid mt-5 w-full"
            >
              {saved ? "Saved" : "Save request"}
            </button>
          </section>

          <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
            <h2 className="font-display text-xl tracking-tight">Payment</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Full price</dt>
                <dd className="font-medium">{formatPrice(req.price)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Deposit paid</dt>
                <dd className="font-medium">{formatPrice(req.depositPaid)}</dd>
              </div>
              <div className="flex justify-between border-t border-[#eeeae6] pt-2">
                <dt className="text-ink-soft">Balance due</dt>
                <dd className="font-medium">{formatPrice(req.balanceDue)}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
