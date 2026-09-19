import type { Metadata } from "next";
import Link from "next/link";
import { MagazineBuilder } from "@/components/magazine/MagazineBuilder";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Custom Magazines",
  description:
    "Choose your page count, upload photos, share inspiration, and pay 50% to start — balance after delivery.",
};

const filters = [
  { href: "/store", label: "All", active: false },
  { href: "/perfumes", label: "Perfumes", active: false },
  { href: "/magazines", label: "Magazines", active: true },
  { href: "/lashes", label: "Lashes", active: false },
];

export default function MagazinesPage() {
  return (
    <div className="px-5 pb-24 pt-10 md:px-8 md:pt-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="badge mb-4">Print · Made for you</p>
            <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em]">
              <span className="block text-ink">Custom</span>
              <span className="block text-ink-soft/80">Magazines</span>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft md:text-right">
              You choose the pages. We design and print. Pay half to begin —
              the rest after your magazine is delivered.
            </p>
          </Reveal>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                item.active
                  ? "bg-ink text-white"
                  : "bg-surface-soft text-ink-soft hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mb-10 grid gap-4 rounded-[28px] border border-line/80 bg-surface/90 p-5 sm:grid-cols-3 md:p-6">
          <HowStep n="01" title="Pick even pages" body="Price follows the page tier set by the atelier." />
          <HowStep n="02" title="Upload your photos" body="One image per page — never more than you selected." />
          <HowStep n="03" title="Pay 50% now" body="Balance is due after delivery of your printed magazine." />
        </div>

        <MagazineBuilder />
      </div>
    </div>
  );
}

function HowStep({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-ink-muted">{n}</p>
      <p className="mt-1 font-medium text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{body}</p>
    </div>
  );
}
