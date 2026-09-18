import Image from "next/image";
import { PillButton } from "@/components/PillButton";
import { Reveal } from "@/components/Reveal";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
];

export function CTABanner() {
  return (
    <section className="px-5 pb-20 pt-8 md:px-8 md:pb-28">
      <Reveal>
        <div className="relative mx-auto flex max-w-[1240px] flex-col items-center overflow-hidden rounded-[28px] bg-surface-soft px-6 py-20 text-center md:px-12 md:py-28">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=80"
              alt=""
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-soft via-surface-soft/80 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="mb-6 flex justify-center -space-x-2">
              {avatars.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-full border-2 border-surface-soft object-cover"
                />
              ))}
            </div>
            <div className="mb-5 flex items-center justify-center gap-2 text-sm text-ink-soft">
              <span className="text-star">★★★★★</span>
              <span>12k+ Happy clients</span>
            </div>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
              The Perfect Piece Is Just A Click Away
            </h2>
            <div className="mt-8 flex justify-center">
              <PillButton href="/store" variant="solid">
                Store
              </PillButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
