"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductReview } from "@/data/account";

export function ProductReviews({ reviews }: { reviews: ProductReview[] }) {
  const [filter, setFilter] = useState<"all" | "photos">("all");

  const avg =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const photoStrip = useMemo(
    () => reviews.flatMap((r) => r.images).slice(0, 8),
    [reviews],
  );

  const visible =
    filter === "photos" ? reviews.filter((r) => r.images.length > 0) : reviews;

  if (reviews.length === 0) return null;

  return (
    <section className="mt-20 border-t border-line pt-14">
      <div className="mb-6">
        <p className="badge mb-2">Reviews</p>
        <h2 className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-tight">
          Customer reviews
        </h2>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-[22px] border border-line bg-surface px-5 py-4">
        <div>
          <p className="font-display text-4xl tracking-tight">{avg.toFixed(1)}</p>
          <p className="mt-1 text-sm text-star" aria-hidden>
            {"★".repeat(Math.round(avg))}
            <span className="text-ink-muted">
              {"★".repeat(5 - Math.round(avg))}
            </span>
          </p>
        </div>
        <div className="h-10 w-px bg-line" aria-hidden />
        <div>
          <p className="text-sm font-medium text-ink">
            {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </p>
          <p className="text-sm text-ink-soft">From verified purchases</p>
        </div>
      </div>

      {photoStrip.length > 0 ? (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-ink">Customer photos</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {photoStrip.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative size-[88px] shrink-0 overflow-hidden rounded-[14px] bg-surface-soft"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="88px"
                  unoptimized={src.startsWith("/")}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mb-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={
            filter === "all"
              ? "rounded-full bg-ink px-3.5 py-1.5 text-sm font-medium text-white"
              : "rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-soft hover:text-ink"
          }
        >
          All ratings
        </button>
        <button
          type="button"
          onClick={() => setFilter("photos")}
          className={
            filter === "photos"
              ? "rounded-full bg-ink px-3.5 py-1.5 text-sm font-medium text-white"
              : "rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-soft hover:text-ink"
          }
        >
          With images ({reviews.filter((r) => r.images.length).length})
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {visible.map((review) => (
          <article
            key={review.id}
            className="rounded-[22px] border border-line bg-surface p-5 md:p-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-surface-soft text-xs font-medium">
                {review.author
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{review.author}</p>
                <p className="text-xs text-ink-muted">
                  {review.location} · {review.date}
                </p>
              </div>
              <p className="text-sm text-star">
                {"★".repeat(review.rating)}
                <span className="text-ink-muted">
                  {"★".repeat(5 - review.rating)}
                </span>
              </p>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              {review.body}
            </p>
            {review.images.length > 0 ? (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {review.images.map((src) => (
                  <div
                    key={src}
                    className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-surface-soft"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                      unoptimized={src.startsWith("/")}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
