"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  getMagazineBalance,
  getMagazineDeposit,
  getMagazinePrice,
  magazinePageTiers,
  MAGAZINE_INSPO_MAX_IMAGES,
} from "@/data/magazineConfig";
import { cn, formatPrice } from "@/lib/utils";

type LocalFile = {
  id: string;
  file: File;
  url: string;
  kind: "image" | "video";
};

export function MagazineBuilder() {
  const router = useRouter();
  const { addMagazine } = useCart();
  const [pages, setPages] = useState(magazinePageTiers[3]?.pages ?? 32);
  const [pageFiles, setPageFiles] = useState<LocalFile[]>([]);
  const [inspoImages, setInspoImages] = useState<LocalFile[]>([]);
  const [inspoVideo, setInspoVideo] = useState<LocalFile | null>(null);
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const pageInputRef = useRef<HTMLInputElement>(null);
  const inspoImageRef = useRef<HTMLInputElement>(null);
  const inspoVideoRef = useRef<HTMLInputElement>(null);

  const fullPrice = getMagazinePrice(pages) ?? 0;
  const deposit = getMagazineDeposit(fullPrice);
  const balance = getMagazineBalance(fullPrice);

  const canSubmit = useMemo(() => {
    return pageFiles.length > 0 && pageFiles.length <= pages && fullPrice > 0;
  }, [pageFiles.length, pages, fullPrice]);

  function revoke(files: LocalFile[]) {
    files.forEach((f) => URL.revokeObjectURL(f.url));
  }

  function addPageFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setPageFiles((prev) => {
      const room = pages - prev.length;
      if (room <= 0) {
        setError(`You can upload at most ${pages} page images.`);
        return prev;
      }
      const slice = incoming.slice(0, room);
      if (incoming.length > room) {
        setError(`Only ${room} more image${room === 1 ? "" : "s"} allowed for ${pages} pages.`);
      } else {
        setError("");
      }
      return [
        ...prev,
        ...slice.map((file) => ({
          id: `${file.name}-${file.size}-${Math.random()}`,
          file,
          url: URL.createObjectURL(file),
          kind: "image" as const,
        })),
      ];
    });
  }

  function removePageFile(id: string) {
    setPageFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((f) => f.id !== id);
    });
    setError("");
  }

  function addInspoImages(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setInspoImages((prev) => {
      const room = MAGAZINE_INSPO_MAX_IMAGES - prev.length;
      const slice = incoming.slice(0, Math.max(0, room));
      return [
        ...prev,
        ...slice.map((file) => ({
          id: `${file.name}-${Math.random()}`,
          file,
          url: URL.createObjectURL(file),
          kind: "image" as const,
        })),
      ];
    });
  }

  function addInspoVideo(list: FileList | null) {
    if (!list?.[0]) return;
    const file = list[0];
    if (!file.type.startsWith("video/")) return;
    setInspoVideo((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return {
        id: `${file.name}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
        kind: "video",
      };
    });
  }

  function onPagesChange(next: number) {
    setPages(next);
    setPageFiles((prev) => {
      if (prev.length <= next) return prev;
      const keep = prev.slice(0, next);
      revoke(prev.slice(next));
      setError(`Trimmed uploads to ${next} images to match page count.`);
      return keep;
    });
  }

  function proceedToCheckout() {
    if (!canSubmit) {
      setError(
        pageFiles.length === 0
          ? "Upload at least one page image to continue."
          : `You selected ${pages} pages but uploaded ${pageFiles.length} images.`,
      );
      return;
    }
    addMagazine({
      title: title.trim() || `Custom magazine · ${pages} pages`,
      pages,
      fullPrice,
      deposit,
      balance,
      photoCount: pageFiles.length,
      inspoCount: inspoImages.length + (inspoVideo ? 1 : 0),
      notes: notes.trim(),
      previewImage: pageFiles[0]?.url,
    });
    router.push("/cart");
  }

  return (
    <div className="mx-auto max-w-[900px]">
      {/* Step 1 — pages */}
      <section className="rounded-[28px] border border-line/80 bg-surface p-5 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)] md:p-8">
        <p className="text-sm font-medium text-blush-deep">1 · Page count</p>
        <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.35rem)] tracking-tight">
          How many pages?
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Even page counts only. Price is set by our atelier for each tier.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {magazinePageTiers.map((tier) => (
            <button
              key={tier.pages}
              type="button"
              onClick={() => onPagesChange(tier.pages)}
              className={cn(
                "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                pages === tier.pages
                  ? "bg-ink text-white"
                  : "bg-surface-soft text-ink-soft hover:text-ink",
              )}
            >
              {tier.pages}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl bg-[#f7efef] px-4 py-4 sm:grid-cols-3">
          <PriceStat label="Full price" value={formatPrice(fullPrice)} />
          <PriceStat
            label="Pay now (50%)"
            value={formatPrice(deposit)}
            emphasize
          />
          <PriceStat
            label="After delivery (50%)"
            value={formatPrice(balance)}
          />
        </div>
      </section>

      {/* Step 2 — page images */}
      <section className="mt-5 rounded-[28px] border border-line/80 bg-surface p-5 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)] md:p-8">
        <p className="text-sm font-medium text-blush-deep">2 · Page images</p>
        <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.35rem)] tracking-tight">
          Upload photos for your pages
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Up to <span className="font-medium text-ink">{pages}</span> images
          (one per page). Currently{" "}
          <span className="font-medium text-ink">{pageFiles.length}</span> /
          {pages}.
        </p>

        <input
          ref={pageInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            addPageFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <button
          type="button"
          onClick={() => pageInputRef.current?.click()}
          disabled={pageFiles.length >= pages}
          className="mt-5 flex w-full flex-col items-center justify-center gap-2 rounded-[22px] border border-dashed border-ink/25 bg-[#fafafa] px-4 py-10 text-sm text-ink-soft transition-colors hover:border-ink/40 hover:bg-white disabled:opacity-50"
        >
          <span className="text-2xl text-ink">＋</span>
          <span className="font-medium text-ink">Add page images</span>
          <span>JPG, PNG · max {pages} files</span>
        </button>

        {pageFiles.length > 0 ? (
          <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {pageFiles.map((f, i) => (
              <li
                key={f.id}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-soft"
              >
                <Image src={f.url} alt="" fill className="object-cover" unoptimized />
                <span className="absolute left-1.5 top-1.5 rounded-full bg-ink/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removePageFile(f.id)}
                  className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-white/95 text-sm opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Remove"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* Step 3 — inspo optional */}
      <section className="mt-5 rounded-[28px] border border-line/80 bg-surface p-5 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)] md:p-8">
        <p className="text-sm font-medium text-blush-deep">3 · Inspiration (optional)</p>
        <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.35rem)] tracking-tight">
          How should it look?
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Upload up to 2 reference images, or one short video — not both
          required.
        </p>

        <input
          ref={inspoImageRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            addInspoImages(e.target.files);
            e.target.value = "";
          }}
        />
        <input
          ref={inspoVideoRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            addInspoVideo(e.target.files);
            e.target.value = "";
          }}
        />

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => inspoImageRef.current?.click()}
            disabled={inspoImages.length >= MAGAZINE_INSPO_MAX_IMAGES}
            className="rounded-full border border-line px-4 py-2.5 text-sm font-medium disabled:opacity-40"
          >
            Add inspo images ({inspoImages.length}/{MAGAZINE_INSPO_MAX_IMAGES})
          </button>
          <button
            type="button"
            onClick={() => inspoVideoRef.current?.click()}
            className="rounded-full border border-line px-4 py-2.5 text-sm font-medium"
          >
            {inspoVideo ? "Replace inspo video" : "Add inspo video"}
          </button>
        </div>

        {(inspoImages.length > 0 || inspoVideo) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {inspoImages.map((f) => (
              <div
                key={f.id}
                className="relative size-24 overflow-hidden rounded-xl bg-surface-soft"
              >
                <Image src={f.url} alt="" fill className="object-cover" unoptimized />
                <button
                  type="button"
                  className="absolute right-1 top-1 size-6 rounded-full bg-white text-xs"
                  onClick={() => {
                    URL.revokeObjectURL(f.url);
                    setInspoImages((prev) => prev.filter((x) => x.id !== f.id));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            {inspoVideo ? (
              <div className="relative w-40 overflow-hidden rounded-xl bg-ink">
                <video src={inspoVideo.url} className="aspect-video w-full" controls />
                <button
                  type="button"
                  className="absolute right-1 top-1 size-6 rounded-full bg-white text-xs"
                  onClick={() => {
                    URL.revokeObjectURL(inspoVideo.url);
                    setInspoVideo(null);
                  }}
                >
                  ×
                </button>
              </div>
            ) : null}
          </div>
        )}
      </section>

      {/* Step 4 — notes */}
      <section className="mt-5 rounded-[28px] border border-line/80 bg-surface p-5 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)] md:p-8">
        <p className="text-sm font-medium text-blush-deep">4 · Notes</p>
        <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.35rem)] tracking-tight">
          Anything else for the atelier?
        </h2>

        <label className="mt-5 block text-sm">
          <span className="mb-1.5 block text-ink-soft">Project title (optional)</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Ada & Kelechi — Engagement Edit"
            className="h-12 w-full rounded-2xl border border-line bg-[#fafafa] px-4 outline-none focus:border-ink/30"
          />
        </label>

        <label className="mt-4 block text-sm">
          <span className="mb-1.5 block text-ink-soft">
            Additional notes for the seller (optional)
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Tone, captions, cover preference, people to feature…"
            className="w-full resize-none rounded-2xl border border-line bg-[#fafafa] px-4 py-3 outline-none focus:border-ink/30"
          />
        </label>
      </section>

      {error ? (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-6 rounded-[28px] border border-line/80 bg-gradient-to-br from-[#f7efef] to-white p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-ink-soft">Due today (50% deposit)</p>
            <p className="font-display text-3xl tracking-tight">
              {formatPrice(deposit)}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              Remaining {formatPrice(balance)} after delivery · {pages} pages ·{" "}
              {pageFiles.length} photos
            </p>
          </div>
          <button
            type="button"
            onClick={proceedToCheckout}
            className="h-14 rounded-full bg-ink px-8 text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Proceed to checkout · {formatPrice(deposit)}
          </button>
        </div>
      </div>
    </div>
  );
}

function PriceStat({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-ink-muted">{label}</p>
      <p
        className={cn(
          "mt-0.5 font-semibold",
          emphasize ? "text-ink" : "text-ink-soft",
        )}
      >
        {value}
      </p>
    </div>
  );
}
