import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function Stats() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[28px] bg-ink px-8 py-16 text-center text-white md:px-16 md:py-24">
        <Reveal>
          <p className="badge mb-6 bg-white/10 text-white/70">Stats</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.03em]">
            1800+ Looks Styled Last Month
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/65">
            &ldquo;At Amoura, we believe beauty should feel effortless and
            empowering — scent, story, and lashes in one atelier.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-8 flex justify-center">
          <a
            href="/store"
            className="pill border border-white bg-transparent text-white transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-strong)] hover:bg-white hover:text-ink active:scale-[0.97]"
          >
            <span>Store</span>
            <span
              aria-hidden
              className="inline-flex size-5 items-center justify-center rounded-full bg-white/15 text-[11px]"
            >
              →
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.25} className="relative mx-auto mt-14 h-40 max-w-lg md:h-52">
          <Image
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80"
            alt=""
            fill
            className="rounded-[20px] object-cover opacity-80"
          />
        </Reveal>
      </div>
    </section>
  );
}
