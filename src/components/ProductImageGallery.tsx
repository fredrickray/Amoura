"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Product angles / lifestyle shots — click a thumb to change the hero. */
export function ProductImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const gallery =
    images.length > 0 ? images : ["/products/lum-parfum.png"];

  return (
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
      <div className="order-2 flex gap-2 overflow-x-auto pb-1 sm:order-1 sm:w-[68px] sm:shrink-0 sm:flex-col sm:overflow-y-auto sm:overflow-x-visible sm:pb-0 sm:max-h-[520px]">
        {gallery.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-pressed={active === i}
            className={cn(
              "relative size-14 shrink-0 overflow-hidden rounded-xl bg-surface-soft transition-[box-shadow,opacity] duration-200 ease-[var(--ease-out-strong)] sm:size-[68px] sm:w-full",
              active === i
                ? "opacity-100 shadow-[0_0_0_2px_#111]"
                : "opacity-70 hover:opacity-100",
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="68px"
              unoptimized={src.startsWith("/")}
            />
          </button>
        ))}
      </div>

      <div className="order-1 relative aspect-[4/5] min-w-0 flex-1 overflow-hidden rounded-[22px] bg-surface-soft sm:order-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={gallery[active]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={gallery[active]}
              alt={`${alt} — image ${active + 1}`}
              fill
              priority
              className="object-contain p-6 md:p-10"
              sizes="(max-width: 1024px) 100vw, 520px"
              unoptimized={gallery[active].startsWith("/")}
            />
          </motion.div>
        </AnimatePresence>
        <p className="absolute bottom-3 right-4 text-xs text-ink-muted">
          {active + 1} / {gallery.length}
        </p>
      </div>
    </div>
  );
}
